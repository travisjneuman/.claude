#!/usr/bin/env node
// Status line: rendered by the Claude Code client, never sent to the model
// (zero tokens). Receives session JSON on stdin, prints one line:
//   Opus · xhigh · .claude (master) · ctx 118k · cache 91% · 5h 23% · 7d 41% · $0.42
// ctx is the absolute token count in context (a % of a 1M window hides real
// size); cache shows the prompt-cache hit ratio, or "cold" once it expires.
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
const kTok = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(2)}M` : `${Math.round(n / 1000)}k`);
function ctx(w) {
  const u = w?.current_usage;
  const n = u ? (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0) : 0;
  return n > 0 ? `ctx ${kTok(n)}` : "";
}
function cache(c) {
  if (!c?.caching_observed) return "";
  if (!c.warm) return "cache cold";
  return typeof c.hit_ratio === "number" ? `cache ${Math.round(c.hit_ratio * 100)}%` : "";
}
const parts = [
  d.model?.display_name || "Claude",
  d.effort?.level || "",
  path.basename(dir) + (branch ? ` (${branch})` : ""),
  ctx(d.context_window),
  cache(d.prompt_cache),
  d.rate_limits?.five_hour ? `5h ${pct(d.rate_limits.five_hour.used_percentage)}` : "",
  d.rate_limits?.seven_day ? `7d ${pct(d.rate_limits.seven_day.used_percentage)}` : "",
  typeof d.cost?.total_cost_usd === "number" && d.cost.total_cost_usd > 0 ? `$${d.cost.total_cost_usd.toFixed(2)}` : "",
].filter(Boolean);

process.stdout.write(parts.join(" · ") + "\n");
