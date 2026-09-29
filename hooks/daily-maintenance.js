#!/usr/bin/env node
// Stop hook (fires after every Claude response). At most once per 24 hours per
// machine it starts a detached background job; every other time it exits within
// a few milliseconds. Works for sessions that stay open for days, which never
// reach SessionEnd.
//
// The background job:
//   1. Usage counts: reads Claude Code transcripts (~/.claude/projects/**.jsonl)
//      written since the last run and counts which skills, agents (subagent types)
//      and slash commands were used, by name only (no conversation content).
//      Daily buckets go to <USAGE_DIR>/<HOST>.json, pruned after USAGE_RETENTION_DAYS.
//      USAGE_DIR defaults to ~/.claude/logs/usage (gitignored).
//   2. Commit-everything sweep: runs hooks/session-end-repo-health.sh, which commits
//      and pushes pending work in repos you own (see that file).
//
// Settings (local layer): USAGE_DIR, USAGE_RETENTION_DAYS (default 90),
// DAILY_MAINTENANCE=0 to disable.

const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawn, spawnSync } = require("child_process");

const HOME = os.homedir();
const CLAUDE = path.join(HOME, ".claude");
const LOGS = path.join(CLAUDE, "logs");
const STAMP = path.join(LOGS, ".last-daily-maintenance");

function envGet(key) {
  for (const f of [path.join(CLAUDE, ".env.local"), path.join(CLAUDE, "local", "shared.env")]) {
    try {
      const m = fs.readFileSync(f, "utf8").match(new RegExp(`^${key}=(.*)$`, "m"));
      if (m) return m[1].trim().replace(/^["']|["']$/g, "");
    } catch {}
  }
  return "";
}

function scheduleIfDue() {
  try { fs.readFileSync(0); } catch {} // drain stdin
  if (envGet("DAILY_MAINTENANCE") === "0") return;
  let last = 0;
  try { last = Number(fs.readFileSync(STAMP, "utf8")) || 0; } catch {}
  if (Date.now() - last < 24 * 3600 * 1000) return;
  fs.mkdirSync(LOGS, { recursive: true });
  fs.writeFileSync(STAMP, String(Date.now()));
  const child = spawn(process.execPath, [__filename, "--run"], { detached: true, stdio: "ignore", env: { ...process.env, HOME } });
  child.unref();
}

function rollupUsage() {
  const host = envGet("TJN_HOST_NAME") || os.hostname();
  const dir = envGet("USAGE_DIR") || path.join(LOGS, "usage");
  const retention = Number(envGet("USAGE_RETENTION_DAYS")) || 90;
  const file = path.join(dir, `${host}.json`);
  let data = { host, lastScan: 0, days: {} };
  try { data = { ...data, ...JSON.parse(fs.readFileSync(file, "utf8")) }; } catch {}
  const since = data.lastScan || Date.now() - 30 * 24 * 3600 * 1000;
  const bump = (day, kind, name) => {
    if (!name) return;
    const d = (data.days[day] ||= { skills: {}, agents: {}, commands: {} });
    d[kind][name] = (d[kind][name] || 0) + 1;
  };

  const files = [];
  const walk = (p) => {
    let entries = [];
    try { entries = fs.readdirSync(p, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const full = path.join(p, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith(".jsonl")) {
        try { if (fs.statSync(full).mtimeMs >= since) files.push(full); } catch {}
      }
    }
  };
  walk(path.join(CLAUDE, "projects"));

  for (const f of files) {
    let text = "";
    try { text = fs.readFileSync(f, "utf8"); } catch { continue; }
    for (const line of text.split("\n")) {
      if (!line.includes('"Skill"') && !line.includes('"Agent"') && !line.includes('"Task"') && !line.includes("<command-name>")) continue;
      let rec;
      try { rec = JSON.parse(line); } catch { continue; }
      const t = Date.parse(rec.timestamp || "");
      if (!t || t < since) continue;
      const day = new Date(t).toISOString().slice(0, 10);
      const content = rec.message?.content;
      if (Array.isArray(content)) {
        for (const b of content) {
          if (b?.type !== "tool_use") continue;
          if (b.name === "Skill") bump(day, "skills", b.input?.skill || b.input?.command);
          if (b.name === "Agent" || b.name === "Task") bump(day, "agents", b.input?.subagent_type || "general-purpose");
        }
      } else if (typeof content === "string" && rec.type === "user") {
        const m = content.match(/<command-name>\/?([^<]+)<\/command-name>/);
        if (m) bump(day, "commands", m[1].trim());
      }
    }
  }

  const cutoff = new Date(Date.now() - retention * 24 * 3600 * 1000).toISOString().slice(0, 10);
  for (const day of Object.keys(data.days)) if (day < cutoff) delete data.days[day];
  data.lastScan = Date.now();
  data.retentionDays = retention;
  data.days = Object.fromEntries(Object.keys(data.days).sort().map((k) => [k, data.days[k]]));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 1) + "\n");
}

function run() {
  const log = path.join(LOGS, "daily-maintenance.log");
  const note = (m) => fs.appendFileSync(log, `${new Date().toISOString()} ${m}\n`);
  try { rollupUsage(); note("usage rollup ok"); } catch (e) { note(`usage rollup failed: ${e.message}`); }
  const sweep = path.join(CLAUDE, "hooks", "session-end-repo-health.sh");
  if (fs.existsSync(sweep)) {
    let bash = "bash";
    const gitBash = "C:\\Program Files\\Git\\bin\\bash.exe";
    if (process.platform === "win32" && fs.existsSync(gitBash)) bash = gitBash;
    const r = spawnSync(bash, [sweep.replace(/\\/g, "/")], { env: { ...process.env, HOME, SESSION_END_DETACHED: "1" }, stdio: "ignore", timeout: 15 * 60 * 1000 });
    note(`commit-everything sweep exit ${r.status}`);
  }
}

if (process.argv.includes("--run")) run();
else scheduleIfDue();
process.exit(0);
