# Force Sync Script

Auto-discovers and force-syncs all git repositories to match remote state.

---

## Quick Start

```bash
# Preview what would happen (safe)
~/.claude/scripts/force-sync-repos.sh --dry-run

# Force sync all repos
~/.claude/scripts/force-sync-repos.sh

# Force sync without prompts (for automation)
~/.claude/scripts/force-sync-repos.sh --force

# Just list discovered repos
~/.claude/scripts/force-sync-repos.sh --list
```

---

## How It Works

The script **automatically scans** configured directories for git repos.

**No manual config needed:**
- New repos are found automatically
- Removed repos cause no errors (gracefully skipped)
- Submodules handled by their parent repos
- External/read-only repos excluded via patterns

**Default scan directories:**
- `~/web-dev`
- `~/.claude`

**Excluded patterns:**
- `node_modules`
- `/plugins/marketplaces/` (read-only external repos)
- `/vendor/`
- `/.cache/`

---

## Customization

Edit the script header to change:

```bash
# Directories to scan
SCAN_DIRS=(
    "$HOME/web-dev"
    "$HOME/.claude"
    "$HOME/other-projects"  # Add more directories
)

# How deep to scan (default: 3)
SCAN_DEPTH=3

# Patterns to exclude
EXCLUDE_PATTERNS=(
    "node_modules"
    "/plugins/marketplaces/"
    # Add more patterns
)
```

---

## What It Does

For each discovered repo:

1. **Fetch** from origin
2. **Check** for uncommitted changes and ahead/behind status
3. **Discard** all local changes
4. **Reset** to remote branch
5. **Update** submodules (if any)

---

## Warning

⚠️ **This is destructive!**

- All uncommitted changes will be lost
- All unpushed commits will be lost
- The script assumes **remote is the source of truth**

**Always push your work before switching machines.**

---

## Automation Options

### Run on login (launchd)

Create `~/Library/LaunchAgents/com.user.sync-repos.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.user.sync-repos</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>/Users/tjn/.claude/scripts/force-sync-repos.sh</string>
        <string>--force</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
```

```bash
launchctl load ~/Library/LaunchAgents/com.user.sync-repos.plist
```

### Create an alias

Add to `~/.zshrc` or `~/.bashrc`:

```bash
alias sync-repos="~/.claude/scripts/force-sync-repos.sh"
alias sync-repos-force="~/.claude/scripts/force-sync-repos.sh --force"
```

---

## Logs

Sync logs are saved to:
```
~/.claude/logs/sync-YYYYMMDD-HHMMSS.log
```

---

## Troubleshooting

**"Permission denied"**
```bash
chmod +x ~/.claude/scripts/force-sync-repos.sh
```

**Repo not being found**
- Check it's under a scanned directory
- Check scan depth (default: 3 levels)
- Check it's not matching an exclude pattern

**Submodule issues**
```bash
cd ~/path/to/parent-repo
git submodule update --init --recursive
```
