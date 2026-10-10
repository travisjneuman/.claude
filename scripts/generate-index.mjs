#!/usr/bin/env node
// Builds the toolkit's discovery layer from what is actually on disk:
//
//   INDEX.md                       Table of contents by domain (skills, agents,
//                                  commands, rules, reference docs, marketplaces)
//   index/graph.json               Nodes + edges (skill <-> agent <-> rule <-> doc)
//   skills/MASTER_INDEX.md         Skills-only table (kept for older references)
//   settings.json skillOverrides   Non-core skills/commands -> "name-only"
//   index/marketplace-catalog.json Searchable list of marketplace skills
//                                  (only when clones exist; gitignored)
//
// Usage:
//   node scripts/generate-index.mjs --write   regenerate everything
//   node scripts/generate-index.mjs --check   exit 1 if tracked outputs are stale
//
// Core vs name-only tiers live in index/tiers.json.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { collectCore, readManifest } from "./count-inventory.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const write = args.has("--write");
if (write && args.has("--check")) throw new Error("--write and --check are mutually exclusive.");
const publicInventory = collectCore(root).inventory;
const rel = (p) => path.relative(root, p).split(path.sep).join("/");
const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "");

// ---------- frontmatter ----------
function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const out = {};
  if (!m) return out;
  const lines = m[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let [, key, val] = kv;
    if (/^[>|][-+]?$/.test(val.trim())) {
      const block = [];
      while (i + 1 < lines.length && (/^\s+/.test(lines[i + 1]) || lines[i + 1] === "")) block.push(lines[++i].trim());
      val = block.join(" ").trim();
    } else if (val === "" ) {
      const items = [];
      while (i + 1 < lines.length && /^\s+-\s+/.test(lines[i + 1])) items.push(lines[++i].replace(/^\s+-\s+/, "").replace(/^["']|["']$/g, ""));
      val = items.length ? items : "";
    } else {
      val = val.trim().replace(/^["']|["']$/g, "");
    }
    out[key] = val;
  }
  return out;
}

const firstLine = (text) =>
  (text.replace(/^---[\s\S]*?---/, "").split(/\r?\n/).find((l) => l.trim() && !l.startsWith("#")) || "").trim();
const clip = (s, n = 110) => {
  s = String(s || "").replace(/\s+/g, " ").replace(/\|/g, "/").trim();
  return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
};

// ---------- domains ----------
const DOMAINS = [
  ["workflow", "Workflow & toolkit", /\b(milestone|phase|backlog|handoff|session|workstream|router|routing|toolkit|index|counts|bootstrap|backup|standardi[sz]e|skill[- ]finder|discover|workspace|todo|plan(ning)?|roadmap|changelog|decision log|log-decision|context|scaffold|init-project|list-skills|pull-repos|repos|auto-claude|autonomous|agent teams?|team composition)\b/i],
  ["security", "Security & compliance", /\b(security|owasp|secure|secret|vulnerab|compliance|soc ?2|hipaa|gdpr|pci|threat|pentest|devsecops|harden)/i],
  ["mobile", "Mobile", /\b(ios|ipados|android|swift(ui)?|kotlin|flutter|dart|react native|expo|mobile|testflight|app store)\b/i],
  ["frontend", "Frontend, UI & UX", /\b(react|vue|nuxt|svelte|next\.?js|css|tailwind|ui|ux|design system|animation|accessib|a11y|wcag|frontend|pwa|seo|i18n|locali[sz]|browser extension)\b/i],
  ["backend", "Backend, APIs & data stores", /\b(api|graphql|rest|openapi|database|sql|postgres|mongo|redis|microservices?|monolith|low-code|internal tools?|event[- ]driven|kafka|websocket|realtime|serverless|edge|lambda|workers|payment|stripe|email|auth(entication)?|oauth|jwt|django|fastapi|nestjs|backend)\b/i],
  ["infra", "DevOps, cloud & observability", /\b(devops|cloud|docker|kubernetes|k8s|terraform|ci\/?cd|pipeline|deploy|monitoring|observab|opentelemetry|sre|infrastructure)\b/i],
  ["data-ai", "Data, ML & AI", /\b(machine learning|ml|llm|rag|ai agents?|prompt|vector|data (science|engineering)|analytics|statistic|etl|warehouse|pytorch|tensorflow)\b/i],
  ["quality", "Quality, testing & maintenance", /\b(test(ing|s)?|tdd|e2e|review|debug|refactor|performance|profil|tech[- ]debt|document(ation|er)|migrat|dependenc|lint|code quality|explain)/i],
  ["systems", "Desktop, systems & languages", /\b(electron|tauri|macos|desktop|embedded|iot|firmware|rust|golang|go expert|c\+\+|cpp|cli|wasm|webassembly|game|unity|unreal|godot|blockchain|web3|solidity|ar\/vr|xr|spatial|python|typescript|javascript|java)\b/i],
  ["creative", "Creative & content", /\b(brand|graphic|visual design|video|audio|podcast|motion|content|newsletter|copywrit|storytelling|presentation|document|docx|pdf|pptx|xlsx|spreadsheet)\b/i],
  ["business", "Business & product", /\b(business|strategy|sales|marketing|finance|financial|hr|talent|legal|contract|product manag|startup|fundrais|grant|investment|real estate|operations|supply chain|esg|sustainab|leadership|risk|customer|monetiz|pricing|growth|nonprofit|decision|comparison|compare|flowchart|process map)/i],
  ["research", "Research, learning & life", /\b(research|literature|course|learning|debate|interview|career|travel|recipe|event plan|volunteer|health|wellness|onboarding)/i],
];
function domainOf(text) {
  let best = ["other", -1];
  for (const [id, , re] of DOMAINS) {
    const hits = (String(text).match(new RegExp(re.source, "gi")) || []).length;
    if (hits > best[1]) best = [id, hits];
  }
  return best[1] > 0 ? best[0] : "other";
}
const domainLabel = Object.fromEntries([...DOMAINS.map(([id, label]) => [id, label]), ["other", "Other"]]);

// ---------- collect ----------
const tiers = JSON.parse(read(path.join(root, "index/tiers.json")) || "{}");
const coreSkills = new Set(tiers.core_skills || []);
const coreCommands = new Set(tiers.core_commands || []);
const nodes = [];
// Skills linked in from outside the repo (vendored per host) stay out of the public index.
const linkedSkills = [];

for (const dir of fs.readdirSync(path.join(root, "skills")).sort()) {
  if (fs.lstatSync(path.join(root, "skills", dir)).isSymbolicLink()) linkedSkills.push(dir);
}
for (const relative of publicInventory.skills) {
  const file = path.join(root, relative);
  const dir = relative.slice("skills/".length).replace(/\/SKILL\.md$/, "");
  const t = read(file);
  const fm = frontmatter(t);
  const name = fm.name || dir;
  const desc = [fm.description, fm.when_to_use].filter(Boolean).join(" ") || firstLine(t);
  nodes.push({ id: `skill:${name}`, type: "skill", name, path: rel(file), description: desc,
    tier: coreSkills.has(name) ? "core" : "name-only", manual: String(fm["disable-model-invocation"]) === "true",
    domain: domainOf(`${name} ${desc}`) });
}

for (const relative of publicInventory.agents) {
  const f = path.posix.basename(relative);
  const file = path.join(root, relative);
  const t = read(file);
  const fm = frontmatter(t);
  const name = fm.name || f.replace(/\.md$/, "");
  const desc = fm.description || firstLine(t);
  nodes.push({ id: `agent:${name}`, type: "agent", name, path: rel(file), description: desc, model: fm.model || "",
    domain: domainOf(`${name} ${desc}`) });
}

for (const relative of [...publicInventory.commands, ...publicInventory.routerCommands]) {
  const full = path.join(root, relative);
  const t = read(full);
  const fm = frontmatter(t);
  const name = relative.slice("commands/".length).replace(/\.md$/, "").replace(/\//g, ":");
  const desc = fm.description || firstLine(t);
  nodes.push({ id: `command:${name}`, type: "command", name, path: rel(full), description: desc,
    tier: coreCommands.has(name) ? "core" : "name-only", manual: String(fm["disable-model-invocation"]) === "true",
    domain: domainOf(`${name} ${desc}`) });
}

for (const relative of publicInventory.rules) {
  const f = path.posix.basename(relative);
  const file = path.join(root, relative);
  const t = read(file);
  const fm = frontmatter(t);
  const paths = Array.isArray(fm.paths) ? fm.paths : fm.paths ? String(fm.paths).split(",").map((s) => s.trim()) : [];
  const title = (t.match(/^#\s+(.+)$/m) || [, f])[1];
  nodes.push({ id: `rule:${f.replace(/\.md$/, "")}`, type: "rule", name: f.replace(/\.md$/, ""), path: rel(file),
    description: title, loads: paths.length ? `when reading ${paths.join(", ")}` : "every session", domain: domainOf(`${f} ${title}`) });
}

const refRoot = path.join(root, "docs/reference");
for (const group of fs.existsSync(refRoot) ? fs.readdirSync(refRoot).sort() : []) {
  const gdir = path.join(refRoot, group);
  if (!fs.statSync(gdir).isDirectory()) continue;
  for (const f of fs.readdirSync(gdir).sort()) {
    if (!f.endsWith(".md")) continue;
    const file = path.join(gdir, f);
    const t = read(file);
    const title = (t.match(/^#\s+(.+)$/m) || [, f])[1];
    nodes.push({ id: `doc:${group}/${f.replace(/\.md$/, "")}`, type: "doc", group, name: `${group}/${f.replace(/\.md$/, "")}`,
      path: rel(file), description: title, domain: domainOf(`${f} ${title}`) });
  }
}

// Marketplaces: manifest in .gitmodules (clones are local-only, never committed)
const marketplaces = readManifest(root).map(({ name, path: p, githubUrl }) => ({
  name, path: p, url: githubUrl, cloned: fs.existsSync(path.join(root, p)),
}));

// ---------- edges ----------
const tokens = (s) => new Set(String(s).toLowerCase().match(/[a-z][a-z0-9+#.]{2,}/g) || []);
const STOP = new Set(["use", "when", "and", "the", "for", "with", "this", "that", "from", "into", "patterns", "development", "expert", "specialist", "using", "including", "any", "all", "best", "practices"]);
const tok = new Map(nodes.map((n) => [n.id, new Set([...tokens(`${n.name} ${n.description}`)].filter((t) => !STOP.has(t)))]));
const overlap = (a, b) => { let c = 0; for (const t of tok.get(a)) if (tok.get(b).has(t)) c++; return c; };
const edges = [];
const byType = (t) => nodes.filter((n) => n.type === t);
for (const s of byType("skill")) {
  const pick = (type, k) => byType(type)
    .map((n) => [n, overlap(s.id, n.id) + (n.domain === s.domain ? 1 : 0)])
    .filter(([, score]) => score >= 3).sort((a, b) => b[1] - a[1]).slice(0, k);
  for (const [n] of pick("agent", 3)) edges.push({ from: s.id, to: n.id, rel: "pairs-with" });
  for (const [n] of pick("rule", 2)) edges.push({ from: s.id, to: n.id, rel: "rules" });
  for (const [n] of pick("doc", 2)) edges.push({ from: s.id, to: n.id, rel: "reference" });
}
const related = (id) => edges.filter((e) => e.from === id).map((e) => e.to.split(":").slice(1).join(":"));

// ---------- render INDEX.md ----------
const count = (t) => byType(t).length;
const L = [];
L.push("# Toolkit Index", "");
L.push("<!-- Generated by scripts/generate-index.mjs. Do not edit by hand. -->", "");
L.push(`${count("skill")} skills · ${count("agent")} agents · ${publicInventory.commands.length} base commands + ${publicInventory.routerCommands.length} router commands · ${count("rule")} rules · ${count("doc")} reference docs · ${marketplaces.length} marketplace repos`, "");
L.push("## How to use this index", "");
L.push("This explicit source refresh lists public toolkit definitions; marketplace membership is the manifest, not a guarantee every clone/plugin is installed. Only the **core** tier keeps its full description in Claude's context every turn; the rest are listed by name only and found through this index, so a large toolkit costs almost nothing until something is needed.", "");
L.push("1. Find the task's domain below (or search this file / `index/graph.json`).");
L.push("2. Invoke the skill with the Skill tool or `/name`, delegate to the agent, or read the rule/doc.");
L.push("3. Nothing local fits: search the marketplace catalog (`index/marketplace-catalog.json`, present once marketplaces are pulled) or `/skill-finder`.", "");
L.push("## Contents", "");
const present = [...DOMAINS.map(([id]) => id), "other"].filter((d) => nodes.some((n) => n.domain === d && ["skill", "agent", "command"].includes(n.type)));
for (const d of present) L.push(`- [${domainLabel[d]}](#${domainLabel[d].toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/ /g, "-")})`);
L.push("- [Rules](#rules)", "- [Reference docs](#reference-docs)", "- [Marketplaces](#marketplaces)", "");
for (const d of present) {
  L.push(`## ${domainLabel[d]}`, "");
  const sk = byType("skill").filter((n) => n.domain === d);
  if (sk.length) {
    L.push("| Skill | Tier | Purpose | Related |", "| --- | --- | --- | --- |");
    for (const n of sk) L.push(`| \`${n.name}\` | ${n.manual ? "manual" : n.tier} | ${clip(n.description)} | ${related(n.id).slice(0, 4).map((r) => `\`${r}\``).join(" ")} |`);
    L.push("");
  }
  const ag = byType("agent").filter((n) => n.domain === d);
  if (ag.length) {
    L.push("| Agent | Purpose |", "| --- | --- |");
    for (const n of ag) L.push(`| \`${n.name}\` | ${clip(n.description)} |`);
    L.push("");
  }
  const cm = byType("command").filter((n) => n.domain === d);
  if (cm.length) {
    L.push("| Command | Tier | Purpose |", "| --- | --- | --- |");
    for (const n of cm) L.push(`| \`/${n.name}\` | ${n.tier} | ${clip(n.description)} |`);
    L.push("");
  }
}
L.push("## Rules", "", "| Rule | Loads | Topic |", "| --- | --- | --- |");
for (const n of byType("rule")) L.push(`| \`${n.path}\` | ${clip(n.loads, 60)} | ${clip(n.description)} |`);
L.push("", "## Reference docs", "", "| Doc | Topic |", "| --- | --- |");
for (const n of byType("doc")) L.push(`| \`${n.path}\` | ${clip(n.description)} |`);
L.push("", "## Marketplaces", "");
L.push("Manifest: `.gitmodules` (entries only; clones live in the gitignored `plugins/marketplaces/`, are fast-forward pulled at most daily, and are never committed). Add one with `bash scripts/add-marketplace.sh <git-url>`.", "");
L.push("| Marketplace | Source |", "| --- | --- |");
for (const m of marketplaces) L.push(`| \`${m.name}\` | ${m.url} |`);
L.push("");
const indexMd = L.join("\n");

// ---------- MASTER_INDEX.md (skills only, compatibility) ----------
const M = ["# Skills Master Index", "", "<!-- Generated by scripts/generate-index.mjs. The full index is ../INDEX.md. -->", "",
  "Full cross-reference (skills, agents, commands, rules, docs, marketplaces): [`INDEX.md`](../INDEX.md).", "",
  "| Skill | Domain | Tier | Description |", "| --- | --- | --- | --- |"];
for (const n of byType("skill")) M.push(`| \`${n.name}\` | ${domainLabel[n.domain]} | ${n.tier} | ${clip(n.description, 140)} |`);
const masterMd = M.join("\n") + "\n";

// ---------- graph.json ----------
const graph = JSON.stringify({
  generatedBy: "scripts/generate-index.mjs",
  domains: Object.fromEntries(Object.entries(domainLabel)),
  nodes: nodes.map(({ id, type, name, path: p, domain, tier, description, loads }) => ({ id, type, name, path: p, domain, ...(tier ? { tier } : {}), ...(loads ? { loads } : {}), description: clip(description, 200) })),
  marketplaces: marketplaces.map(({ name, url, path: p }) => ({ name, url, path: p })),
  edges,
}, null, 1) + "\n";

// ---------- settings.json skillOverrides ----------
const settingsPath = path.join(root, "settings.json");
const settings = JSON.parse(read(settingsPath));
const prev = settings.skillOverrides || {};
const overrides = {};
for (const [k, v] of Object.entries(prev)) if (v === "off" || v === "user-invocable-only") overrides[k] = v; // keep explicit user choices
// Skills the toolkit doesn't ship (claude.ai-synced, bundled) listed in tiers.json.
for (const k of tiers.external_name_only || []) if (!overrides[k]) overrides[k] = "name-only";
for (const k of linkedSkills) if (!overrides[k] && !coreSkills.has(k)) overrides[k] = "name-only";
for (const n of nodes.filter((n) => (n.type === "skill" || n.type === "command") && n.tier === "name-only" && !n.manual)) {
  if (!overrides[n.name]) overrides[n.name] = "name-only";
}
const sorted = Object.fromEntries(Object.keys(overrides).sort().map((k) => [k, overrides[k]]));
const settingsOut = JSON.stringify({ ...settings, skillOverrides: sorted }, null, 2) + "\n";

// ---------- write / check ----------
const outputs = [
  [path.join(root, "INDEX.md"), indexMd],
  [path.join(root, "index/graph.json"), graph],
  [path.join(root, "skills/MASTER_INDEX.md"), masterMd],
  [settingsPath, settingsOut],
];
const stale = outputs.filter(([p, c]) => read(p) !== c).map(([p]) => rel(p));
if (write) {
  for (const [p, c] of outputs) { fs.mkdirSync(path.dirname(p), { recursive: true }); if (read(p) !== c) fs.writeFileSync(p, c); }
  // Local-only marketplace catalog
  const cat = [];
  for (const m of marketplaces.filter((m) => m.cloned)) {
    const stack = [path.join(root, m.path)];
    while (stack.length) {
      const d = stack.pop();
      let entries = [];
      try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { continue; }
      for (const e of entries) {
        if (e.name === ".git" || e.name === "node_modules") continue;
        const full = path.join(d, e.name);
        if (e.isDirectory()) stack.push(full);
        else if (e.name === "SKILL.md") {
          const fm = frontmatter(read(full));
          cat.push({ marketplace: m.name, name: fm.name || path.basename(d), description: clip(fm.description || "", 200), path: rel(full) });
        }
      }
    }
  }
  // One entry per distinct skill body; the copy from the most canonical source wins.
  const CANONICAL = ["anthropic-agent-skills", "claude-plugins-official", "anthropic-life-sciences", "vercel-agent-skills",
    "expo-skills", "trailofbits-skills", "trailofbits-skills-curated", "hashicorp-agent-skills", "obra-superpowers"];
  const rank = (m) => { const i = CANONICAL.indexOf(m); return i === -1 ? CANONICAL.length : i; };
  cat.sort((a, b) => rank(a.marketplace) - rank(b.marketplace) || a.marketplace.localeCompare(b.marketplace));
  const seen = new Map();
  for (const c of cat) {
    const body = read(path.join(root, c.path)).replace(/^---[\s\S]*?---/, "").replace(/\s+/g, " ").trim().toLowerCase();
    const key = createHash("sha1").update(body).digest("hex");
    if (seen.has(key)) seen.get(key).copies++;
    else seen.set(key, { ...c, copies: 1 });
  }
  const unique = [...seen.values()];
  if (unique.length) fs.writeFileSync(path.join(root, "index/marketplace-catalog.json"), JSON.stringify(unique) + "\n");
  cat.length = unique.length;
  console.log(`index: ${stale.length ? "updated " + stale.join(", ") : "up to date"}${cat.length ? `; catalog ${cat.length} marketplace skills` : ""}`);
} else {
  if (stale.length) { console.error(`index stale: ${stale.join(", ")} (run node scripts/generate-index.mjs --write)`); process.exit(1); }
  console.log("index: up to date");
}
