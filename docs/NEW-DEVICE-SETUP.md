# New Device Setup Guide

**CRITICAL: Run this process on EVERY new device to ensure correct configuration.**

Works identically on: **Arch Linux** | **macOS** | **Windows (Git Bash)**

---

## Quick Start (TL;DR)

```bash
# 1. Clone the repo
git clone https://github.com/travisjneuman/.claude.git ~/.claude

# 2. Initialize marketplace repos with correct upstreams
bash ~/.claude/scripts/init-marketplaces.sh

# 3. Complete setup
bash ~/.claude/scripts/setup-new-machine.sh
```

That's it. The scripts handle everything cross-platform.

---

## Why This Matters

The `~/.claude` repo contains 51 marketplace repositories as nested git repos. When you clone `~/.claude` to a new device:

1. **Problem**: Nested repos may have incorrect remote URLs (pointing to your personal repo instead of the original upstreams)
2. **Solution**: `init-marketplaces.sh` re-clones each marketplace from its original upstream with push disabled

### Expected Configuration After Setup

| Repository               | Fetch From              | Push To                           |
| ------------------------ | ----------------------- | --------------------------------- |
| `~/.claude` (main)       | `travisjneuman/.claude` | `travisjneuman/.claude` (enabled) |
| `plugins/marketplaces/*` | Original upstreams      | `no_push` (blocked)               |

---

## Platform-Specific Instructions

### Arch Linux / Linux

```bash
# Clone
git clone https://github.com/travisjneuman/.claude.git ~/.claude

# Initialize (uses bash)
bash ~/.claude/scripts/init-marketplaces.sh
bash ~/.claude/scripts/setup-new-machine.sh
```

### macOS

```bash
# Clone
git clone https://github.com/travisjneuman/.claude.git ~/.claude

# Initialize (uses bash)
bash ~/.claude/scripts/init-marketplaces.sh
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
bash ~/.claude/scripts/init-marketplaces.sh
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
```

Or run the verification script:

```bash
bash ~/.claude/scripts/fix-remotes.sh
```

---

## Troubleshooting

### "Marketplace repos have wrong remote URLs"

Run the initializer to re-clone from upstreams:

```bash
bash ~/.claude/scripts/init-marketplaces.sh
```

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

The configuration is correct - you cannot push to upstream repos.

### "Bash scripts not working on Windows"

Ensure you're using Git Bash, not PowerShell or CMD:

1. Install [Git for Windows](https://git-scm.com/download/win)
2. Run scripts from Git Bash terminal

---

## Scripts Reference

| Script                     | Purpose                                                    |
| -------------------------- | ---------------------------------------------------------- |
| `init-marketplaces.sh`     | Clone/reinitialize all 51 marketplace repos from upstreams |
| `fix-remotes.sh`           | Fix remote URLs without re-cloning                         |
| `setup-new-machine.sh`     | Complete setup (plugins, hooks, etc.)                      |
| `update-external-repos.sh` | Pull latest from all upstreams                             |

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
bash ~/.claude/scripts/fix-remotes.sh  # Ensure remotes are correct after pull
```

---

_Last updated: January 2026_
