#!/usr/bin/env node
// Weekly tier tuning from real usage.
//
//   node scripts/tune-tiers.mjs --usage-dir <dir> [--report <file.md>] [--apply] [--move-agents]
//
// Reads every <HOST>.json written by hooks/daily-maintenance.js, totals the last
// 30 days, and adjusts what is always visible to Claude:
//   - skills / commands used >= 3 times become core (full description listed);
//   - core skills / commands unused for 30 days become name-only
//     (only once at least 30 days of data exist; toolkit-router and core-workflow stay);
//   - agents are reported, and moved only with --move-agents: agent-<name> skills used
//     >= 3 times become core agents (agents/<name>.md); core agents unused for 30 days
//     become agent-<name> skills. The agent file's own frontmatter is kept beside the
//     skill (agent-frontmatter.yml) and restored on promotion, so a move loses nothing.
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
const moveAgents = process.argv.includes("--move-agents");
if (!usageDir) { console.error("usage: tune-tiers.mjs --usage-dir <dir> [--report file] [--apply]"); process.exit(2); }

const WINDOW = 30, MIN = 3, PINNED = new Set(["toolkit-router", "core-workflow"]);
const CAP = { skills: 30, commands: 12, agents: 12 };
// Normalise CRLF: a Windows checkout would otherwise fail every frontmatter match below.
const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n") : "");

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

// agents: moved only with --move-agents. A move changes what every user of the public
// repo gets, and the website build reads the agent list from counts.json, so a move
// also needs a count refresh (docs/COUNT-PIPELINE.md). Without the flag: report only.
const agentUses = (n) => (totals.agents[n] || 0) + used(`agent-${n}`);
const promoteAgents = agentSkills.filter((n) => agentUses(n) >= MIN).slice(0, Math.max(0, CAP.agents - coreAgents.length));
const demoteAgents = canDemote ? coreAgents.filter((n) => agentUses(n) === 0) : [];
const agentNote = moveAgents ? "" : " [not applied: pass --move-agents]";
promoteAgents.forEach((n) => changes.push(`agent ${n}: on-demand skill → core agent (${agentUses(n)} uses)${agentNote}`));
demoteAgents.forEach((n) => changes.push(`agent ${n}: core agent → on-demand skill (unused ${WINDOW}d)${agentNote}`));

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;
// A description may be one line, quoted, a block scalar (> or |), or continued on indented lines.
function fmDescription(fm) {
  const lines = fm.split("\n");
  const i = lines.findIndex((l) => /^description:/.test(l));
  if (i < 0) return "";
  let first = lines[i].replace(/^description:\s*/, "").trim();
  if (/^[>|][-+]?$/.test(first)) first = "";
  const rest = [];
  for (let j = i + 1; j < lines.length && (/^\s+\S/.test(lines[j]) || lines[j].trim() === ""); j++) rest.push(lines[j].trim());
  return [first, ...rest].filter(Boolean).join(" ").replace(/^["']|["']$/g, "").trim();
}
// An agent file's own frontmatter (tools, memory, background, omitClaudeMd, ...) has no
// equivalent in a skill, so it is kept beside the skill and put back on promotion.
const sidecar = (n) => path.join(root, "skills", `agent-${n}`, "agent-frontmatter.yml");

function agentToSkill(n) {
  const src = path.join(root, "agents", `${n}.md`);
  const m = read(src).match(FRONTMATTER);
  const desc = fmDescription(m?.[1] || "").replace(/"/g, "'");
  // Never write a skill with an empty description or a second frontmatter block.
  if (!m || !desc) throw new Error(`agents/${n}.md: frontmatter or description not readable; left unchanged`);
  const dst = path.join(root, "skills", `agent-${n}`, "SKILL.md");
  remember(src); remember(dst); remember(sidecar(n));
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.writeFileSync(sidecar(n), m[1] + "\n");
  // background: false = the caller waits for the specialist's answer and it keeps the full tool set.
  fs.writeFileSync(dst, `---\nname: agent-${n}\ndescription: "Specialist subagent: ${desc}"\ncontext: fork\nagent: general-purpose\nbackground: false\n---\n${m[2].trim()}\n\n## Your task\n\n$ARGUMENTS\n`);
  fs.rmSync(src);
}
function skillToAgent(n) {
  const src = path.join(root, "skills", `agent-${n}`, "SKILL.md");
  const m = read(src).match(FRONTMATTER);
  const desc = fmDescription(m?.[1] || "").replace(/^Specialist subagent:\s*/, "").trim();
  if (!m || !desc) throw new Error(`skills/agent-${n}/SKILL.md: frontmatter or description not readable; left unchanged`);
  const body = m[2].replace(/\n## Your task\n\n\$ARGUMENTS\n?$/, "").trim();
  const dst = path.join(root, "agents", `${n}.md`);
  const original = read(sidecar(n)).trim();
  remember(src); remember(dst); remember(sidecar(n));
  fs.writeFileSync(dst, `---\n${original || `name: ${n}\ndescription: ${desc}`}\n---\n${body}\n`);
  fs.rmSync(src);
  if (fs.existsSync(sidecar(n))) fs.rmSync(sidecar(n));
  // Other files in the skill folder (references, assets) stay; the folder goes only when empty.
  try { fs.rmdirSync(path.dirname(src)); } catch {}
}

let applied = false, reverted = false, budgetOutput = "";
if (apply && changes.length) {
  remember(tiersPath); remember(path.join(root, "settings.json"));
  for (const p of ["INDEX.md", "index/graph.json", "skills/MASTER_INDEX.md"]) remember(path.join(root, p));
  fs.writeFileSync(tiersPath, JSON.stringify({ ...tiers, core_skills: [...newCoreSkills], core_commands: [...newCoreCommands] }, null, 2) + "\n");
  // One unreadable file skips that agent only; the rest of the tuning still applies.
  const convert = (fn) => (n) => { try { fn(n); } catch (e) { changes.push(`SKIPPED agent ${n}: ${e.message}`); } };
  if (moveAgents) {
    promoteAgents.forEach(convert(skillToAgent));
    demoteAgents.forEach(convert(agentToSkill));
  }
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
