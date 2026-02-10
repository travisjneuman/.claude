#!/usr/bin/env node
// Cross-platform hook runner for Claude Code
// Resolves hook paths using os.homedir() which works correctly on:
//   - Windows (Git Bash, CMD, PowerShell) → C:\Users\username
//   - macOS → /Users/username
//   - Linux → /home/username
//
// Why this exists:
//   On Windows, Claude Code may invoke WSL's bash which resolves ~ to /root/
//   instead of the actual Windows user home. Node.js os.homedir() is the only
//   reliable cross-platform method since Node.js is guaranteed to be installed.

const { execSync } = require("child_process");
const { join } = require("path");
const { homedir } = require("os");
const { existsSync } = require("fs");

const hookName = process.env.HOOK_NAME;
if (!hookName) process.exit(0);

const home = homedir();
const hookPath = join(home, ".claude", "hooks", hookName);

if (!existsSync(hookPath)) {
  // Hook script not found — exit silently (non-blocking)
  process.exit(0);
}

// Convert Windows backslashes to forward slashes for bash compatibility
const bashPath = hookPath.replace(/\\/g, "/");

try {
  execSync(`bash "${bashPath}"`, {
    stdio: "inherit",
    env: { ...process.env, HOME: home },
    timeout: 30000,
  });
} catch (e) {
  process.exit(e.status || 0);
}
