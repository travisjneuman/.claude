---
description: View and analyze the Claude Code session log
arguments:
  - name: action
    description: "Action: view, tail, clear, stats (default: tail)"
    required: false
  - name: lines
    description: "Number of lines to show (default: 50)"
    required: false
---

# Session Log

View and manage the session log created by lifecycle hooks.

## Usage

```
/session-log [action] [lines]
```

## Platform Compatibility

| Platform | Status | Notes |
|----------|--------|-------|
| Windows | ✅ | Requires Git Bash (included with Git for Windows) |
| macOS | ✅ | Works with bash/zsh |
| Linux | ✅ | Works with bash |

All commands use standard POSIX utilities (`tail`, `head`, `wc`, `grep`).

## Arguments

| Argument | Default | Options |
|----------|---------|---------|
| `action` | `tail` | `view`, `tail`, `clear`, `stats` |
| `lines` | `50` | Any positive integer |

## Log Location

```
~/.claude/.session-log
```

## Actions

### tail (default)

Show the most recent log entries:

```bash
tail -n [lines] ~/.claude/.session-log
```

### view

Open full log in pager:

```bash
less ~/.claude/.session-log
```

### clear

Clear the session log (with confirmation):

```bash
# Backup first
cp ~/.claude/.session-log ~/.claude/.session-log.bak

# Clear
> ~/.claude/.session-log
echo "[$(date '+%Y-%m-%d %H:%M:%S')] SESSION LOG CLEARED" >> ~/.claude/.session-log
```

### stats

Show log statistics:

```bash
echo "=== Session Log Statistics ==="
echo "File size: $(du -h ~/.claude/.session-log | cut -f1)"
echo "Total entries: $(wc -l < ~/.claude/.session-log)"
echo ""
echo "By type:"
echo "  Sessions: $(grep -c 'SESSION' ~/.claude/.session-log)"
echo "  User prompts: $(grep -c 'USER:' ~/.claude/.session-log)"
echo "  Permissions: $(grep -c 'PERMISSION:' ~/.claude/.session-log)"
echo "  Agents: $(grep -c 'AGENT' ~/.claude/.session-log)"
echo "  Compactions: $(grep -c 'COMPACTION' ~/.claude/.session-log)"
echo "  Notifications: $(grep -c '\[.*\]' ~/.claude/.session-log)"
echo ""
echo "Date range:"
echo "  First: $(head -1 ~/.claude/.session-log)"
echo "  Last: $(tail -1 ~/.claude/.session-log)"
```

## Log Format

The session log captures events from all 10 lifecycle hooks:

```
[HH:MM:SS] USER: First 100 chars of user prompt...
[HH:MM:SS] PERMISSION: ToolName requested
[HH:MM:SS] AGENT COMPLETE: agent-name
[HH:MM:SS] Notification message
[YYYY-MM-DD HH:MM:SS] CONTEXT COMPACTION - saving checkpoint
[YYYY-MM-DD HH:MM:SS] SESSION END
───────────────────────────────────────
```

## Examples

### View recent activity
```
/session-log
```

### View last 100 lines
```
/session-log tail 100
```

### Show statistics
```
/session-log stats
```

### Clear log
```
/session-log clear
```

## Use Cases

1. **Debug issues** - Track what happened before an error
2. **Audit activity** - See what tools were used
3. **Monitor compaction** - Track context usage
4. **Review sessions** - See conversation history

## Related

- `/health-check` - System diagnostics
- `rules/tooling/troubleshooting.md` - Debug guide
- Settings: `settings.json` hooks section

---

*Session log provides complete audit trail of Claude Code interactions.*
