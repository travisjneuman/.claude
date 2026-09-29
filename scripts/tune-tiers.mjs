#!/usr/bin/env node
// Weekly tier tuning from real usage.
//
//   node scripts/tune-tiers.mjs --usage-dir <dir> [--report <file.md>] [--apply]
//
// Reads every <HOST>.json written by hooks/daily-maintenance.js, totals the last
// 30 days, and adjusts what is always visible to Claude:
//   - skills / commands used >= 3 times become core (full description listed);
//   - core skills / commands unused for 30 days become name-only
//     (only once at least 30 days of data exist; toolkit-router and core-workflow stay);
//   - agent-<name> skills used >= 3 times become core agents (agents/<name>.md);
//   - core agents unused for 30 days become agent-<name> skills again.
// Caps: 30 core skills, 12 core commands, 12 core agents. After applying, the index
// is regenerated and the context budgets checked; if a budget fails, every change
// is undone. Without --apply it only reports.

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : ""; };
const usageDir = arg("--usage-dir");
const reportFile = arg("--report");
const apply = process.argv.includes("--apply");
if (!usageDir) { console.error("usage: tune-tiers.mjs --usage-dir <dir> [--report file] [--apply]"); process.exit(2); }

const WINDOW = 30, MIN = 3, PINNED = new Set(["toolkit-router", "core-workflow"]);
const CAP = { skills: 30, commands: 12, agents: 12 };
const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "");

// ---- usage ----
const today = new Date();
const cutoff = new Date(today - WINDOW * 864e5).toISOString().slice(0, 10);
const totals = { skills: {}, agents: {}, commands: {} };
let earliest = null;
const hosts = [];
for (const f of fs.existsSync(usageDir) ? fs.readdirSync(usageDir).filter((f) => f.endsWith(".json")) : []) {
  let d; try { d = JSON.parse(read(path.join(usageDir, f))); } catch { continue; }
  hosts.push(d.host || f.replace(/\.json$/, ""));
  for (const [day, b] of Object.entries(d.days || {})) {
    if (!earliest || day < earliest) earliest = day;
    if (day < cutoff) continue;
    for (const k of ["skills", "agents", "commands"]) for (const [n, c] of Object.entries(b[k] || {})) totals[k][n] = (totals[k][n] || 0) + c;
  }
}
const spanDays = earliest ? Math.floor((today - new Date(earliest)) / 864e5) : 0;
const canDemote = spanDays >= WINDOW;
// Commands and skills share one namespace in the Skill tool; count both sources.
const used = (n) => (totals.skills[n] || 0) + (totals.commands[n] || 0);

// ---- current state ----
const tiersPath = path.join(root, "index/tiers.json");
const tiers = JSON.parse(read(tiersPath));
const skillDirs = fs.readdirSync(path.join(root, "skills")).filter((d) => fs.existsSync(path.join(root, "skills", d, "SKILL.md")));
const commandNames = fs.readdirSync(path.join(root, "commands")).filter((f) => f.endsWith(".md") && f !== "README.md").map((f) => f.slice(0, -3));
const coreAgents = fs.readdirSync(path.join(root, "agents")).filter((f) => f.endsWith(".md") && f !== "README.md").map((f) => f.slice(0, -3));
const agentSkills = skillDirs.filter((d) => d.startsWith("agent-") && d !== "agent-teams").map((d) => d.slice(6));

const changes = [];
const saved = new Map(); // path -> original content (null = did not exist)
const remember = (p) => { if (!saved.has(p)) saved.set(p, fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null); };

// skills + commands
const newCoreSkills = new Set(tiers.core_skills);
for (const s of skillDirs.filter((d) => !d.startsWith("agent-"))) {
  if (!newCoreSkills.has(s) && used(s) >= MIN && newCoreSkills.size < CAP.skills) { newCoreSkills.add(s); changes.push(`skill ${s}: name-only → core (${used(s)} uses)`); }
}
if (canDemote) for (const s of [...newCoreSkills]) if (!PINNED.has(s) && used(s) === 0) { newCoreSkills.delete(s); changes.push(`skill ${s}: core → name-only (unused ${WINDOW}d)`); }
const newCoreCommands = new Set(tiers.core_commands);
for (const c of commandNames) if (!newCoreCommands.has(c) && used(c) >= MIN && newCoreCommands.size < CAP.commands) { newCoreCommands.add(c); changes.push(`command ${c}: name-only → core (${used(c)} uses)`); }
if (canDemote) for (const c of [...newCoreCommands]) if (used(c) === 0) { newCoreCommands.delete(c); changes.push(`command ${c}: core → name-only (unused ${WINDOW}d)`); }

// agents
const agentUses = (n) => (totals.agents[n] || 0) + used(`agent-${n}`);
const promoteAgents = agentSkills.filter((n) => agentUses(n) >= MIN).slice(0, Math.max(0, CAP.agents - coreAgents.length));
const demoteAgents = canDemote ? coreAgents.filter((n) => agentUses(n) === 0) : [];
promoteAgents.forEach((n) => changes.push(`agent ${n}: on-demand skill → core agent (${agentUses(n)} uses)`));
demoteAgents.forEach((n) => changes.push(`agent ${n}: core agent → on-demand skill (unused ${WINDOW}d)`));

function agentToSkill(n) {
  const src = path.join(root, "agents", `${n}.md`);
  const text = read(src);
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const desc = ((m?.[1] || "").match(/^description:\s*(.*)$/m)?.[1] || "").replace(/^["']|["']$/g, "").replace(/"/g, "'");
  const dst = path.join(root, "skills", `agent-${n}`, "SKILL.md");
  remember(src); remember(dst);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.writeFileSync(dst, `---\nname: agent-${n}\ndescription: "Specialist subagent: ${desc}"\ncontext: fork\nagent: general-purpose\n---\n${(m?.[2] || text).trim()}\n\n## Your task\n\n$ARGUMENTS\n`);
  fs.rmSync(src);
}
function skillToAgent(n) {
  const src = path.join(root, "skills", `agent-${n}`, "SKILL.md");
  const text = read(src);
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const desc = ((m?.[1] || "").match(/^description:\s*"?(.*?)"?$/m)?.[1] || "").replace(/^Specialist subagent:\s*/, "");
  const body = (m?.[2] || "").replace(/\n## Your task\n\n\$ARGUMENTS\n?$/, "").trim();
  const dst = path.join(root, "agents", `${n}.md`);
  remember(src); remember(dst);
  fs.writeFileSync(dst, `---\nname: ${n}\ndescription: ${desc}\n---\n${body}\n`);
  fs.rmSync(path.dirname(src), { recursive: true });
}

let applied = false, reverted = false, budgetOutput = "";
if (apply && changes.length) {
  remember(tiersPath); remember(path.join(root, "settings.json"));
  for (const p of ["INDEX.md", "index/graph.json", "skills/MASTER_INDEX.md"]) remember(path.join(root, p));
  fs.writeFileSync(tiersPath, JSON.stringify({ ...tiers, core_skills: [...newCoreSkills], core_commands: [...newCoreCommands] }, null, 2) + "\n");
  promoteAgents.forEach(skillToAgent);
  demoteAgents.forEach(agentToSkill);
  spawnSync(process.execPath, [path.join(root, "scripts/generate-index.mjs"), "--write"], { stdio: "ignore" });
  const b = spawnSync(process.execPath, [path.join(root, "scripts/check-budgets.mjs")], { encoding: "utf8" });
  budgetOutput = (b.stdout + b.stderr).trim();
  if (b.status !== 0) {
    for (const [p, c] of saved) {
      if (c === null) { if (fs.existsSync(p)) fs.rmSync(p); } else { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c); }
    }
    reverted = true;
  } else applied = true;
}

// ---- report ----
const top = (o, k = 10) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, k).map(([n, c]) => `${n} (${c})`).join(", ") || "none";
const lines = [
  `# Toolkit tier tuning — ${today.toISOString().slice(0, 10)}`, "",
  `Hosts reporting: ${hosts.join(", ") || "none"} · data span ${spanDays} days · window ${WINDOW} days · demotion ${canDemote ? "enabled" : `waits until ${WINDOW} days of data`}`, "",
  "## Most used (last 30 days)", "",
  `- Skills: ${top(totals.skills)}`, `- Agents: ${top(totals.agents)}`, `- Commands: ${top(totals.commands)}`, "",
  "## Changes", "",
  ...(changes.length ? changes.map((c) => `- ${c}`) : ["- none"]), "",
  `Result: ${applied ? "applied" : reverted ? "reverted (budget check failed)" : apply ? "nothing to apply" : "report only"}`,
  ...(budgetOutput ? ["", "```", budgetOutput, "```"] : []), "",
];
const report = lines.join("\n");
if (reportFile) { fs.mkdirSync(path.dirname(reportFile), { recursive: true }); fs.writeFileSync(reportFile, report); }
console.log(report);
process.exit(reverted ? 1 : 0);
