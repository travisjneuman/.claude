#!/usr/bin/env node
// Builds settings.json from two layers, so the public repo can carry toolkit
// behaviour only and each person keeps their own choices privately:
//
//   settings.base.json           tracked: hooks, permissions, shipped-skill tiers
//   local/settings.overlay.json  private (gitignored local/ layer), optional:
//                                your plugins, env, model, theme, extra overrides
//
//   node scripts/build-settings.mjs            write settings.json when it would change
//   node scripts/build-settings.mjs --check    exit 1 when settings.json is out of date
//   node scripts/build-settings.mjs --stdout   print the result, write nothing
//   (--quiet suppresses the one-line status)
//
// DORMANT UNTIL THE SPLIT SHIPS. While settings.json is still tracked by git, or
// while settings.base.json does not exist, this script does nothing and exits 0.
// It is wired in ahead of time (the pull script, the post-merge git hook, the
// installer) so that on the day settings.json stops being tracked, the pull that
// removes it from every checkout is followed at once by a rebuild.
// Plan and remaining steps: advisor-plans/README.md, item 10.
//
// Merge rules: objects merge key by key, the overlay winning; an overlay value of
// null removes the key; arrays are replaced, except the permission lists and
// claudeMdExcludes, which are combined. Top-level keys that are in the existing
// settings.json but in neither layer are kept, so a preference Claude Code wrote
// itself (for example through /config) survives a rebuild.

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const flags = new Set(process.argv.slice(2));
const say = (m) => { if (!flags.has("--quiet")) console.log(m); };
const target = path.join(root, "settings.json");
const basePath = path.join(root, "settings.base.json");
const overlayPath = path.join(root, "local", "settings.overlay.json");

const readJson = (p, required) => {
  if (!fs.existsSync(p)) { if (required) throw new Error(`${path.basename(p)} is missing`); return null; }
  try { return JSON.parse(fs.readFileSync(p, "utf8")); }
  catch (e) { throw new Error(`${path.relative(root, p)} is not valid JSON: ${e.message}`); }
};

if (!fs.existsSync(basePath)) { say("build-settings: no settings.base.json yet; nothing to do."); process.exit(0); }
const tracked = spawnSync("git", ["-C", root, "ls-files", "--error-unmatch", "settings.json"], { stdio: "ignore" }).status === 0;
if (tracked && !flags.has("--stdout")) { say("build-settings: settings.json is still tracked by git; nothing to do."); process.exit(0); }

const COMBINED = new Set(["permissions.allow", "permissions.deny", "permissions.ask", "claudeMdExcludes"]);
const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
function merge(base, over, at = "") {
  const out = { ...base };
  for (const [k, v] of Object.entries(over)) {
    const here = at ? `${at}.${k}` : k;
    if (v === null) delete out[k];
    else if (isObject(v) && isObject(out[k])) out[k] = merge(out[k], v, here);
    else if (Array.isArray(v) && Array.isArray(out[k]) && COMBINED.has(here)) out[k] = [...new Set([...out[k], ...v])];
    else out[k] = v;
  }
  return out;
}

try {
  const base = readJson(basePath, true);
  const overlay = readJson(overlayPath, false) || {};
  const existing = readJson(target, false) || {};
  if (!isObject(base) || !isObject(overlay)) throw new Error("settings layers must be JSON objects");
  const built = merge(base, overlay);
  for (const [k, v] of Object.entries(existing)) if (!(k in base) && !(k in overlay)) built[k] = v;
  const text = JSON.stringify(built, null, 2) + "\n";
  if (flags.has("--stdout")) { process.stdout.write(text); process.exit(0); }
  const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";
  if (current === text) { say("build-settings: settings.json is up to date."); process.exit(0); }
  if (flags.has("--check")) { say("build-settings: settings.json is out of date."); process.exit(1); }
  fs.writeFileSync(target, text);
  say("build-settings: wrote settings.json.");
} catch (e) {
  // Never leave a machine without settings because a layer is malformed: report and keep the old file.
  console.error(`build-settings: ${e.message}; settings.json left as it is.`);
  process.exit(flags.has("--check") ? 1 : 0);
}
