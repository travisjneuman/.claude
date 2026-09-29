#!/usr/bin/env node
// Always-on context budgets. Run by the pre-commit hook; exits 1 with a clear
// message when a commit would grow what Claude loads every session past a limit.
//
//   node scripts/check-budgets.mjs          check (default)
//   node scripts/check-budgets.mjs --report print usage without failing
//
// Adjust limits here deliberately; don't bypass the hook.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const report = process.argv.includes("--report");
const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "");

const LIMITS = {
  agentDescriptionChars: 3000,   // every agent description loads every session
  coreDescriptionChars: 8000,    // core-tier skill + command descriptions
  coreDescriptionEach: 400,      // one core description
  nameOnlyEntries: 260,          // names in the listing (~25 chars each)
  claudeMdLines: 150,            // global CLAUDE.md
  alwaysOnRuleLines: 60,         // rules without `paths:` frontmatter, combined
};

function description(file) {
  const fm = (read(file).match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ""])[1];
  const m = fm.match(/^description:\s*([\s\S]*?)(?=^\w[\w-]*:|$(?![\s\S]))/m);
  return m ? m[1].replace(/^[>|]-?\s*/, "").replace(/\s+/g, " ").trim().replace(/^["']|["']$/g, "") : "";
}

const tiers = JSON.parse(read(path.join(root, "index/tiers.json")) || "{}");
const problems = [];
const usage = {};

const agents = fs.readdirSync(path.join(root, "agents")).filter((f) => f.endsWith(".md") && f !== "README.md");
usage.agentDescriptionChars = agents.reduce((n, f) => n + description(path.join(root, "agents", f)).length, 0);

let core = 0;
for (const name of tiers.core_skills || []) {
  const d = description(path.join(root, "skills", name, "SKILL.md"));
  if (d.length > LIMITS.coreDescriptionEach) problems.push(`core skill ${name}: description ${d.length} chars (limit ${LIMITS.coreDescriptionEach})`);
  core += d.length;
}
for (const name of tiers.core_commands || []) core += description(path.join(root, "commands", `${name}.md`)).length;
usage.coreDescriptionChars = core;

const overrides = JSON.parse(read(path.join(root, "settings.json")) || "{}").skillOverrides || {};
usage.nameOnlyEntries = Object.values(overrides).filter((v) => v === "name-only").length;

usage.claudeMdLines = read(path.join(root, "CLAUDE.md")).split("\n").length;

let ruleLines = 0;
for (const f of fs.readdirSync(path.join(root, "rules")).filter((f) => f.endsWith(".md"))) {
  const t = read(path.join(root, "rules", f));
  if (!/^---[\s\S]*?\bpaths:/m.test(t)) ruleLines += t.split("\n").length;
}
usage.alwaysOnRuleLines = ruleLines;

for (const [k, v] of Object.entries(usage)) {
  if (v > LIMITS[k]) problems.push(`${k}: ${v} (limit ${LIMITS[k]})`);
}

if (report || problems.length === 0) {
  console.log("context budgets: " + Object.entries(usage).map(([k, v]) => `${k} ${v}/${LIMITS[k]}`).join(", "));
}
if (problems.length && !report) {
  console.error("Context budget exceeded (these load into every session):\n  - " + problems.join("\n  - "));
  console.error("Shorten descriptions, move procedures into name-only skills, or add `paths:` to rules. Limits live in scripts/check-budgets.mjs.");
  process.exit(1);
}
