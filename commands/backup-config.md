---
description: Backup Claude Code configuration files
arguments:
  - name: action
    description: "Action: create, list, restore (default: create)"
    required: false
  - name: name
    description: "Backup name or restore target"
    required: false
disable-model-invocation: true
---

# Backup Config

Backup and restore Claude Code configuration files.

## Usage

```
/backup-config [action] [name]
```

## Platform Compatibility

| Platform | Status | Notes                                             |
| -------- | ------ | ------------------------------------------------- |
| Windows  | ✅     | Requires Git Bash (included with Git for Windows) |
| macOS    | ✅     | Works with bash/zsh                               |
| Linux    | ✅     | Works with bash                                   |

All commands use POSIX utilities (`mkdir`, `cp`, `ls`, `date`).

## Arguments

| Argument | Default            | Options                     |
| -------- | ------------------ | --------------------------- |
| `action` | `create`           | `create`, `list`, `restore` |
| `name`   | `auto-[timestamp]` | Custom backup name          |

## Backup Location

```
~/.claude/.backups/
```

`.backups/` is gitignored in `~/.claude`, so snapshots stay local and are never committed.

## Actions

### create (default)

Create a new backup:

```bash
# Create backup directory
mkdir -p ~/.claude/.backups

# Generate backup name
BACKUP_NAME="${name:-backup-$(date +%Y%m%d-%H%M%S)}"
BACKUP_DIR=~/.claude/.backups/$BACKUP_NAME

mkdir -p "$BACKUP_DIR"

# Backup critical files
cp ~/.claude/settings.json "$BACKUP_DIR/"
cp ~/.claude/CLAUDE.md "$BACKUP_DIR/"
cp ~/.claude/.mcp.json "$BACKUP_DIR/" 2>/dev/null || true

# Create manifest
echo "Backup: $BACKUP_NAME" > "$BACKUP_DIR/manifest.txt"
echo "Created: $(date)" >> "$BACKUP_DIR/manifest.txt"
echo "Files:" >> "$BACKUP_DIR/manifest.txt"
ls -la "$BACKUP_DIR" >> "$BACKUP_DIR/manifest.txt"

echo "Backup created: $BACKUP_DIR"
```

### list

List available backups:

```bash
echo "Available backups:"
echo ""
ls -lt ~/.claude/.backups/ | head -20
echo ""
echo "Total: $(ls ~/.claude/.backups/ | wc -l) backups"
```

### restore

Restore from backup:

```bash
BACKUP_DIR=~/.claude/.backups/$name

if [ ! -d "$BACKUP_DIR" ]; then
  echo "Backup not found: $name"
  echo "Use '/backup-config list' to see available backups"
  exit 1
fi

# Create safety backup first
SAFETY_DIR=~/.claude/.backups/pre-restore-$(date +%Y%m%d-%H%M%S)
mkdir -p "$SAFETY_DIR"
cp ~/.claude/settings.json "$SAFETY_DIR/"
cp ~/.claude/CLAUDE.md "$SAFETY_DIR/" 2>/dev/null || true
cp ~/.claude/.mcp.json "$SAFETY_DIR/" 2>/dev/null || true

# Restore files
cp "$BACKUP_DIR/settings.json" ~/.claude/
cp "$BACKUP_DIR/CLAUDE.md" ~/.claude/ 2>/dev/null || true
cp "$BACKUP_DIR/.mcp.json" ~/.claude/ 2>/dev/null || true

echo "Restored from: $BACKUP_DIR"
echo "Note: Restart Claude Code for changes to take effect"
```

## What Gets Backed Up

| File            | Description                             |
| --------------- | --------------------------------------- |
| `settings.json` | Permissions, hooks, MCP config, plugins |
| `CLAUDE.md`     | Global instructions                     |
| `.mcp.json`     | MCP server definitions                  |

## What Does NOT Get Backed Up

- Skills (too large, use git)
- Agents (tracked in git)
- Marketplaces (submodules, use `git submodule update`)

## Examples

### Create backup with auto-name

```
/backup-config
```

Creates: `backup-20251227-143052`

### Create named backup

```
/backup-config create before-experiment
```

Creates: `before-experiment`

### List backups

```
/backup-config list
```

### Restore specific backup

```
/backup-config restore before-experiment
```

## Best Practices

1. **Before experiments** - Backup before testing new hooks/settings
2. **Before updates** - Backup before updating toolkit
3. **Named backups** - Use descriptive names for important states

## Automation

Backups are manual. Don't add cron jobs or other schedules for this; new schedules need the owner's explicit approval.

## Related

- `/health-check` - Verify configuration
- `docs/reference/tooling/troubleshooting.md` - Fix issues
- `git stash` - For git-tracked changes

---

_Always backup before making significant configuration changes._
