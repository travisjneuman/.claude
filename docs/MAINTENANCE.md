---
name: Maintenance
description: Ongoing maintenance procedures for keeping skills, agents, marketplace repos, and configs up to date.
category: operations
---

# Maintenance Guide

Ongoing maintenance procedures to keep your Claude Code configuration clean and efficient.

**Last Updated:** February 2026 (v2.3.3)

---

## Regular Maintenance Schedule

| Task                  | Frequency               | Impact                      |
| --------------------- | ----------------------- | --------------------------- |
| **Pull all repos**    | **Before each session** | **Keeps all repos current** |
| Clear debug logs      | Weekly                  | Frees disk space            |
| Clear shell snapshots | Weekly                  | Frees disk space            |
| Clear old todos       | Monthly                 | Frees disk space            |
| Update MCP backup     | After changes           | Keeps backup current        |
| Review permissions    | Monthly                 | Security hygiene            |
| Update skills         | As needed               | Keep patterns current       |

---

## Pull All Repos (Do This First)

Before starting work, always sync all repositories:

```bash
# Using slash command (in Claude Code)
/pull-repos

# Or run script directly
~/.claude/_pull-all-repos.sh

# Check status without pulling
~/.claude/_pull-all-repos.sh --status
```

**What it does:**

1. Initializes any new/unregistered submodules
2. Pulls parent repo (`~/.claude` - travisjneuman/.claude)
3. Pulls all 68 marketplace submodules in `plugins/marketplaces/`
4. Enforces `no_push` on marketplace submodules (read-only protection)
5. Pulls custom project directories (if configured)
6. Fixes detached HEAD state automatically
7. Updates documentation counts if any repos changed (skills, agents, marketplace skills)

**Location-based push access:**
| Location | Push Access |
|----------|-------------|
| `~/.claude` (parent) | ✅ Enabled |
| `plugins/marketplaces/*` | ❌ Blocked (no_push) |
| Custom directories | ✅ Enabled |

The script determines push access by **location**, not ownership. Your repos and custom directories retain full push capability.

**Adding custom directories:** Edit `~/.claude/_pull-all-repos.sh` and uncomment/edit the `CUSTOM_PROJECT_DIRS` array at the top.

**Tip:** If you add personal directories that shouldn't be committed to the repo, use `git update-index --skip-worktree _pull-all-repos.sh` after committing the clean version. This lets you keep local customizations without git tracking them. To undo: `git update-index --no-skip-worktree _pull-all-repos.sh`.

---

## Quick Cleanup Commands

### Windows (PowerShell)

```powershell
# Clear all temporary/generated files
Remove-Item -Path "$env:USERPROFILE\.claude\debug\*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$env:USERPROFILE\.claude\shell-snapshots\*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$env:USERPROFILE\.claude\todos\*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$env:USERPROFILE\.claude\file-history\*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$env:USERPROFILE\.claude\security_warnings_*.json" -Force -ErrorAction SilentlyContinue

Write-Host "Cleanup complete"
```

### Mac/Linux (Bash)

```bash
# Clear all temporary/generated files
rm -rf ~/.claude/debug/*
rm -rf ~/.claude/shell-snapshots/*
rm -rf ~/.claude/todos/*
rm -rf ~/.claude/file-history/*
rm -f ~/.claude/security_warnings_*.json

echo "Cleanup complete"
```

---

## Detailed Cleanup Tasks

### Clear Debug Logs

**What:** Session debug logs
**Location:** `~/.claude/debug/`
**Size:** Can grow to 100MB+
**Safe to delete:** Yes, always

```bash
rm -rf ~/.claude/debug/*
```

### Clear Shell Snapshots

**What:** Shell state backups for Bash tool
**Location:** `~/.claude/shell-snapshots/`
**Size:** Usually 1-10MB
**Safe to delete:** Yes, always

```bash
rm -rf ~/.claude/shell-snapshots/*
```

### Clear Old Todos

**What:** Historical agent task data (JSON files)
**Location:** `~/.claude/todos/`
**Size:** Can grow to 50MB+ (hundreds of files)
**Safe to delete:** Yes, historical only

```bash
rm -rf ~/.claude/todos/*
```

### Clear File History

**What:** Edit history for `/rewind` command
**Location:** `~/.claude/file-history/`
**Size:** Can grow to 50MB+
**Safe to delete:** Yes, but loses rewind ability for old sessions

```bash
rm -rf ~/.claude/file-history/*
```

### Clear Security Warnings

**What:** Session-specific warning acknowledgments
**Location:** `~/.claude/security_warnings_*.json`
**Size:** Small (few KB each)
**Safe to delete:** Yes, warnings will re-appear if relevant

```bash
rm -f ~/.claude/security_warnings_*.json
```

### Clear IDE Lock Files

**What:** VS Code integration lock files
**Location:** `~/.claude/ide/`
**Safe to delete:** Yes, if Claude Code not running

```bash
rm -rf ~/.claude/ide/*
```

### Clear Stats Cache

**What:** Usage statistics cache
**Location:** `~/.claude/stats-cache.json`
**Safe to delete:** Yes

```bash
rm -f ~/.claude/stats-cache.json
```

---

## Configuration Maintenance

### Update MCP Backup

After changing MCP servers in `~/.claude.json`:

```bash
# Keep backup in sync
cp ~/.claude.json ~/.claude/.claude.json
```

**Then edit backup to remove machine-specific data** (keep only `mcpServers`).

### Review Permissions

Monthly, review your allowed tools:

```
/permissions
```

Remove any you no longer need:

```bash
claude deny "Bash(dangerous-command:*)"
```

### Check for Issues

Run diagnostics:

```
/doctor
```

Fix any reported issues.

### Update Claude Code

```bash
claude update
```

Or if using npm:

```bash
npm update -g @anthropic-ai/claude-code
```

---

## Skill Maintenance

### Remove Unused Skills

If a skill folder exists but isn't used:

1. Check if it's referenced anywhere
2. Delete the folder if truly unused
3. Update `skills/README.md`

### Update Outdated Skills

Skills may need updates when:

- Tech stack changes
- Best practices evolve
- Patterns become outdated

Review and update SKILL.md content periodically.

### Consolidate Similar Skills

If you have multiple similar skills:

1. Identify overlapping content
2. Merge into one comprehensive skill
3. Delete redundant skills

---

## Space Usage Audit

Check what's using space:

### Windows

```powershell
Get-ChildItem -Path "$env:USERPROFILE\.claude" -Recurse |
    Group-Object DirectoryName |
    Select-Object Name, @{N='Size(MB)';E={[math]::Round(($_.Group | Measure-Object -Property Length -Sum).Sum/1MB,2)}}
```

### Mac/Linux

```bash
du -sh ~/.claude/*/
```

**Expected sizes:**
| Folder | Normal | Needs Cleanup |
|--------|--------|---------------|
| skills/ | <1MB | - |
| commands/ | <100KB | - |
| docs/ | <100KB | - |
| debug/ | <10MB | >50MB |
| file-history/ | <10MB | >50MB |
| shell-snapshots/ | <5MB | >20MB |
| todos/ | <5MB | >20MB |

---

## Backup Procedures

### What to Backup

**Always backup:**

- `settings.json`
- `settings.local.json`
- `commands/`
- `skills/`
- `templates/`
- `docs/`
- `.claude.json` (inside .claude/)
- `CLAUDE.md`
- `*.md` reference files

**Don't backup:**

- `debug/`
- `file-history/`
- `shell-snapshots/`
- `todos/`
- `ide/`
- `projects/`
- `statsig/`
- `telemetry/`

### Backup Script

```bash
#!/bin/bash
# backup-claude-config.sh

BACKUP_DIR="$HOME/claude-config-backup-$(date +%Y%m%d)"
SOURCE="$HOME/.claude"

mkdir -p "$BACKUP_DIR"

# Copy essential files
cp "$SOURCE/settings.json" "$BACKUP_DIR/"
cp "$SOURCE/settings.local.json" "$BACKUP_DIR/" 2>/dev/null
cp "$SOURCE/.claude.json" "$BACKUP_DIR/"
cp "$SOURCE/CLAUDE.md" "$BACKUP_DIR/" 2>/dev/null
cp "$SOURCE/"*.md "$BACKUP_DIR/" 2>/dev/null

# Copy directories
cp -r "$SOURCE/commands" "$BACKUP_DIR/"
cp -r "$SOURCE/skills" "$BACKUP_DIR/"
cp -r "$SOURCE/templates" "$BACKUP_DIR/"
cp -r "$SOURCE/docs" "$BACKUP_DIR/"

echo "Backup created at: $BACKUP_DIR"
```

---

## Troubleshooting Common Issues

### Disk Space Low

1. Run cleanup commands above
2. Check `du -sh ~/.claude/*/` for large folders
3. Clear any unexpected large files

### Slow Startup

1. Check if too many MCP servers enabled
2. Set `enableAllProjectMcpServers: false`
3. Remove unused skills (each loads into context)

### Configuration Conflicts

1. Check for project-level settings overriding user settings
2. Review `settings.local.json` for local overrides
3. Use `/config` to see effective settings

### MCP Servers Failing

1. Run `/mcp` to check status
2. Try restarting Claude Code
3. Check network connectivity
4. Verify package names haven't changed

---

## Annual Review

Once a year, do a comprehensive review:

1. **Update skills** - Remove outdated, update patterns
2. **Review permissions** - Remove unnecessary allowances
3. **Check MCP servers** - Remove unused, update packages
4. **Clean documentation** - Update for accuracy
5. **Test portability** - Verify setup works on clean machine

---

## See Also

- [FOLDER-STRUCTURE.md](./FOLDER-STRUCTURE.md) - What files exist
- [CONFIGURATION.md](./CONFIGURATION.md) - Settings details
- [SETUP-GUIDE.md](./SETUP-GUIDE.md) - Fresh setup
