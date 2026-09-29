#!/usr/bin/env node
// PostToolUse (Write/Edit/MultiEdit/NotebookEdit): scan the file Claude just wrote
// for strings that look like real credentials. Never blocks. On a match, tells
// Claude (additionalContext) so it removes them before committing. Silent and
// zero-token otherwise. Runs in-process via run-hook.js.

const fs = require("fs");

let input = {};
try {
  input = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
} catch {}

const file = String(input.tool_input?.file_path || input.tool_input?.notebook_path || "");
const skip = /\.(lock|min\.js|min\.css|map|woff2?|ttf|png|jpe?g|gif|ico|pdf|zip)$|(^|[\\/])(node_modules|\.git|vendor|dist)[\\/]/i;

if (file && !skip.test(file) && fs.existsSync(file)) {
  let text = "";
  try {
    const stat = fs.statSync(file);
    if (stat.isFile() && stat.size < 2_000_000) text = fs.readFileSync(file, "utf8");
  } catch {}
  const pattern = /(AKIA[0-9A-Z]{16}|sk-(?:ant-|proj-)?[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{40,}|glpat-[A-Za-z0-9_-]{20}|xox[bpors]-[A-Za-z0-9-]{10,}|-----BEGIN[A-Z ]*PRIVATE KEY)/;
  const hits = [];
  text.split("\n").forEach((line, i) => {
    if (hits.length < 5 && pattern.test(line)) hits.push(`${i + 1}: ${line.slice(0, 120)}`);
  });
  if (hits.length) {
    const msg = `Possible secret written to ${file} (first matches, truncated):\n${hits.join("\n")}\nIf any of these are real credentials, remove them and use an environment variable or an ignored local file instead.`;
    process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PostToolUse", additionalContext: msg } }) + "\n");
  }
}
process.exit(0);
