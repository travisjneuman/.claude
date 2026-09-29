#!/usr/bin/env node
// Cross-platform hook runner for Claude Code.
//
// Usage (from settings.json):
//   node -e "process.env.HOOK_NAME='guard.js';require(require('path').join(require('os').homedir(),'.claude','hooks','run-hook'))"
//
// Resolution order for HOOK_NAME:
//   1. ~/.claude/hooks/<name>          (public toolkit hook)
//   2. ~/.claude/local/hooks/<name>    (private per-user hook, gitignored)
// A missing hook exits 0 silently, so public users without a local/ layer
// are unaffected by entries that only exist to dispatch private hooks.
//
// Interpreter is chosen by extension: .js -> node, .py -> python3/python,
// anything else -> bash (Git Bash preferred on Windows over WSL bash, which
// resolves ~ incorrectly and fails on network drives).
//
// stdin/stdout/stderr are inherited, so the hook receives Claude Code's JSON
// payload on stdin and its JSON/exit code flows straight back to Claude Code.

const { spawnSync } = require("child_process");
const { join } = require("path");
const { homedir, platform } = require("os");
const { existsSync } = require("fs");

const hookName = process.env.HOOK_NAME || process.argv[2];
if (!hookName) process.exit(0);

const home = homedir();
const candidates = [
  join(home, ".claude", "hooks", hookName),
  join(home, ".claude", "local", "hooks", hookName),
];
const hookPath = candidates.find((p) => existsSync(p));
if (!hookPath) process.exit(0);

const isWin = platform() === "win32";

function interpreter(path) {
  if (path.endsWith(".js") || path.endsWith(".cjs") || path.endsWith(".mjs")) {
    return [process.execPath, [path]];
  }
  if (path.endsWith(".py")) {
    return [isWin ? "python" : "python3", [path]];
  }
  let bash = "bash";
  if (isWin) {
    const gitBash = "C:\\Program Files\\Git\\usr\\bin\\bash.exe";
    if (existsSync(gitBash)) bash = gitBash;
  }
  return [bash, [path.replace(/\\/g, "/")]];
}

const [cmd, args] = interpreter(hookPath);
const result = spawnSync(cmd, args, {
  stdio: "inherit",
  env: { ...process.env, HOME: home },
  timeout: Number(process.env.HOOK_TIMEOUT_MS || 30000),
});

if (result.error) process.exit(0); // interpreter missing or timed out: never block
process.exit(result.status ?? 0);
