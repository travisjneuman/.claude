---
name: New Device Setup
description: One-command deployment to any new machine with cross-platform sync and marketplace initialization.
category: setup
---

# New Device Setup Guide

**CRITICAL: Run this process on EVERY new device to ensure correct configuration.**

**Last Updated:** February 2026 (v2.3.3)

Works identically on: **Arch Linux** | **macOS** | **Windows (Git Bash)**

---

## Quick Start (TL;DR)

```bash
# 1. Clone the repo
git clone https://github.com/travisjneuman/.claude.git ~/.claude

# 2. Fetch all 72 marketplace repos from their upstreams
bash ~/.claude/_pull-all-repos.sh

# 3. Complete setup
bash ~/.claude/scripts/setup-new-machine.sh
```

That's it. The scripts handle everything cross-platform.

---

## How Marketplace Repos Work

The `~/.claude` repo references 72 marketplace repositories. These are **not** tracked as git submodule content in the parent repo. Instead, each machine independently fetches the marketplace repos from their original upstreams using `_pull-all-repos.sh`.

This means:

- **Gitlinks are not tracked** -- the parent repo does not commit submodule SHAs
- **Each machine fetches independently** -- `_pull-all-repos.sh` clones or pulls each marketplace from its upstream URL
- **Push is blocked** -- all marketplace repos get `no_push` set automatically
- **No merge conflicts** -- since submodule state is not committed, different machines never conflict on marketplace versions

### Expected Configuration After Setup

| Repository               | Fetch From              | Push To                           |
| ------------------------ | ----------------------- | --------------------------------- |
| `~/.claude` (parent)     | `travisjneuman/.claude` | `travisjneuman/.claude` (enabled) |
| `plugins/marketplaces/*` | Original upstreams      | `no_push` (blocked)               |

### What `_pull-all-repos.sh` Does

1. Pulls the parent repo (`~/.claude`)
2. Clones or pulls all 72 marketplace repos from their original upstreams
3. Enforces `no_push` on every marketplace repo
4. Fixes detached HEAD states automatically
5. Pulls custom project directories (if configured via `.env.local`)
6. Updates documentation counts if repos changed

---

## Platform-Specific Instructions

### Arch Linux / Linux

```bash
git clone https://github.com/travisjneuman/.claude.git ~/.claude
bash ~/.claude/_pull-all-repos.sh
bash ~/.claude/scripts/setup-new-machine.sh
```

### macOS

```bash
git clone https://github.com/travisjneuman/.claude.git ~/.claude
bash ~/.claude/_pull-all-repos.sh
bash ~/.claude/scripts/setup-new-machine.sh
```

### Windows

**Requires Git for Windows (includes Git Bash)**

```powershell
# In PowerShell: Clone to user home
git clone https://github.com/travisjneuman/.claude.git $env:USERPROFILE\.claude
```

```bash
# In Git Bash: Initialize
bash ~/.claude/_pull-all-repos.sh
bash ~/.claude/scripts/setup-new-machine.sh
```

**Important Windows Notes:**

- All scripts use bash syntax and require Git Bash
- `~/.claude` maps to `C:\Users\<username>\.claude`
- MCP config needs `cmd /c` wrapper (see MCP-SERVERS.md)

---

## Verification

After setup, verify your configuration:

```bash
# Check main repo can push
cd ~/.claude
git remote -v
# Should show: origin https://github.com/travisjneuman/.claude.git (fetch)
#              origin https://github.com/travisjneuman/.claude.git (push)

# Check marketplace repos cannot push
cd ~/.claude/plugins/marketplaces/get-shit-done
git remote -v
# Should show: origin https://github.com/glittercowboy/get-shit-done.git (fetch)
#              origin no_push (push)

# Check marketplace count
ls -d ~/.claude/plugins/marketplaces/*/ | wc -l
# Should show: 67
```

Or run the health check in Claude Code:

```
/health-check
```

---

## Troubleshooting

### "Marketplace repos missing or empty"

Run the pull script to fetch them:

```bash
bash ~/.claude/_pull-all-repos.sh
```

This will clone any missing repos and pull updates for existing ones.

### "Main repo cannot push"

Fix the main repo remote:

```bash
cd ~/.claude
git remote set-url origin https://github.com/travisjneuman/.claude.git
git remote set-url --push origin https://github.com/travisjneuman/.claude.git
```

### "Permission denied trying to push to marketplace repo"

This is **expected behavior**. Marketplace repos are read-only. If you see:

```
fatal: 'no_push' does not appear to be a git repository
```

The configuration is correct -- you cannot push to upstream repos.

### "Bash scripts not working on Windows"

Ensure you're using Git Bash, not PowerShell or CMD:

1. Install [Git for Windows](https://git-scm.com/download/win)
2. Run scripts from Git Bash terminal

### "Old device had init-marketplaces.sh -- is that still needed?"

No. The `_pull-all-repos.sh` script replaces the old `init-marketplaces.sh` approach. It handles both initial cloning and subsequent updates in a single script. Just run `_pull-all-repos.sh` on any new or existing device.

---

## Scripts Reference

| Script                 | Purpose                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| `_pull-all-repos.sh`   | **Primary:** Pull/clone all 72 marketplace repos + parent repo            |
| `setup-new-machine.sh` | Complete setup (plugins, hooks, etc.)                                     |
| `fix-remotes.sh`       | Fix remote URLs without re-cloning                                        |
| `init-marketplaces.sh` | Legacy: clone/reinitialize marketplaces (use \_pull-all-repos.sh instead) |

---

## Configure Custom Project Directories (Optional)

If you have project directories you want the pull script to include:

```bash
cp ~/.claude/.env.example ~/.claude/.env.local
# Edit .env.local with your directories
```

Example `.env.local`:

```bash
CUSTOM_PROJECT_DIRS="/e/Web Development"
```

`.env.local` is gitignored -- each machine has its own.

---

## After Setup

1. **Start Claude Code**: `claude`
2. **Verify health**: Run `/bootstrap` or `/health-check`
3. **Test a command**: Run `/start-task test`

---

## Syncing Changes Across Devices

### Push from current device:

```bash
cd ~/.claude
git add -A
git commit -m "Update: description"
git push origin master
```

### Pull on other devices:

```bash
cd ~/.claude
git pull origin master
bash ~/.claude/_pull-all-repos.sh  # Also update marketplace repos
```

Note: since marketplace repos are fetched independently per machine, `git pull` only syncs your custom configuration. Run `_pull-all-repos.sh` to also update marketplace content.

---

_Last updated: February 2026 (v2.3.3)_
