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
//
// Windows bash resolution:
//   Bare `bash` may resolve to WSL's bash (C:\Windows\System32\bash.exe)
//   which tries to mount all drives and fails on network drives (e.g. Z:\).
//   We prefer Git Bash (C:\Program Files\Git\usr\bin\bash.exe) on Windows.

const { execSync } = require("child_process");
const { join } = require("path");
const { homedir, platform } = require("os");
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

// On Windows, prefer Git Bash over WSL bash to avoid drive mount errors
let bashCmd = "bash";
if (platform() === "win32") {
  const gitBash = "C:\\Program Files\\Git\\usr\\bin\\bash.exe";
  if (existsSync(gitBash)) {
    bashCmd = `"${gitBash}"`;
  }
}

try {
  execSync(`${bashCmd} "${bashPath}"`, {
    stdio: "inherit",
    env: { ...process.env, HOME: home },
    timeout: 30000,
  });
} catch (e) {
  process.exit(e.status || 0);
}
