#!/usr/bin/env node
// Status line: rendered by the Claude Code client, never sent to the model
// (zero tokens). Receives session JSON on stdin, prints one line:
//   Opus · xhigh · .claude (master) · ctx 12% · 5h 23% · 7d 41% · $0.42
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

let d = {};
try {
  d = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
} catch {}

const dir = d.workspace?.current_dir || d.cwd || process.cwd();
let branch = "";
try {
  branch = execFileSync("git", ["-C", dir, "branch", "--show-current"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
    timeout: 1000,
  }).trim();
} catch {}

const pct = (v) => (typeof v === "number" ? `${Math.round(v)}%` : "");
const parts = [
  d.model?.display_name || "Claude",
  d.effort?.level || "",
  path.basename(dir) + (branch ? ` (${branch})` : ""),
  d.context_window?.used_percentage != null ? `ctx ${pct(d.context_window.used_percentage)}` : "",
  d.rate_limits?.five_hour ? `5h ${pct(d.rate_limits.five_hour.used_percentage)}` : "",
  d.rate_limits?.seven_day ? `7d ${pct(d.rate_limits.seven_day.used_percentage)}` : "",
  typeof d.cost?.total_cost_usd === "number" && d.cost.total_cost_usd > 0 ? `$${d.cost.total_cost_usd.toFixed(2)}` : "",
].filter(Boolean);

process.stdout.write(parts.join(" · ") + "\n");
