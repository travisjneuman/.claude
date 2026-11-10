---
description: Run diagnostics on Claude Code toolkit configuration and status
argument-hint: "[verbose]"
---

# Health Check

**Arguments:** `verbose` (optional): Show detailed output (default: false).

Comprehensive diagnostics for Claude Code toolkit.

## Usage

```
/health-check [verbose]
```

## Platform Compatibility

| Platform | Status | Notes                                             |
| -------- | ------ | ------------------------------------------------- |
| Windows  | OK     | Requires Git Bash (included with Git for Windows) |
| macOS    | OK     | Works with bash/zsh                               |
| Linux    | OK     | Works with bash                                   |

All commands use POSIX-compatible syntax that works across platforms.

## Behavior

### Step 1: Configuration Check

**Check settings.json:**

```bash
# Cross-platform: works in Git Bash (Windows), bash (macOS/Linux)
[ -f ~/.claude/settings.json ] && echo "OK" || echo "MISSING"
```

Verify:

- [ ] File exists
- [ ] Valid JSON
- [ ] Hooks configured
- [ ] Permissions set
- [ ] MCP servers listed

### Step 2: Structure Verification

**Check directory structure:**

Compare each count with the generated counts line at the top of `~/.claude/INDEX.md` (don't hard-code expected numbers here; they go stale).

| Directory               | Expected         | Check                                         |
| ----------------------- | ---------------- | --------------------------------------------- |
| `skills/`               | per INDEX.md     | `ls ~/.claude/skills/ \| wc -l`               |
| `agents/`               | per INDEX.md (+ README.md) | `ls ~/.claude/agents/*.md \| wc -l` |
| `commands/`             | per INDEX.md     | `ls ~/.claude/commands/*.md \| wc -l`         |
| `templates/`            | non-empty        | `ls ~/.claude/templates/ \| wc -l`            |
| `plugins/marketplaces/` | per INDEX.md     | `ls ~/.claude/plugins/marketplaces/ \| wc -l` |

### Step 3: Hooks Status

**Verify registered hooks:**

```bash
grep -c '"type": "command"' ~/.claude/settings.json
```

Expected: 7 hook commands across 5 events (SessionStart, PreToolUse, PostToolUse, SessionEnd, Stop), plus the status line command.

### Step 4: Git Status

**Check the toolkit checkout and its marketplace clones** (plain gitignored clones listed in `.gitmodules`; nothing is a git submodule):

```bash
cd ~/.claude && git status -sb && bash _pull-all-repos.sh --status
```

Verify:

- [ ] Toolkit checkout is on its default branch and not behind or diverged
- [ ] No uncommitted changes that shouldn't be there
- [ ] Marketplace clones (if any were initialized) are not detached

### Step 5: MCP Servers

**List configured servers:**

```bash
claude mcp list
```

The toolkit configures none by default; any listed server was added on this machine or by the current project.

### Step 6: Report

**Output format:**

```
╔════════════════════════════════════════════════════════════╗
║  Claude Code Toolkit Health Check                          ║
╠════════════════════════════════════════════════════════════╣
║  Configuration:  OK OK                                      ║
║  Structure:      OK OK (N skills, N agents, N markets)      ║
║  Hooks:          OK N hooks wired in settings.json          ║
║  Git:            OK Clean, marketplace clones current      ║
║  MCP Servers:    OK N configured (none by default)          ║
╠════════════════════════════════════════════════════════════╣
║  Status: HEALTHY                                            ║
╚════════════════════════════════════════════════════════════╝
```

**If verbose:**

- List all skills
- List all agents
- Show hook details
- Show marketplace clone status (`_pull-all-repos.sh --status`)
- Show MCP server details

### Step 7: Recommendations

If issues found, provide:

- Specific fix commands
- Documentation references
- Troubleshooting steps

## Examples

### Basic check

```
/health-check
```

### Detailed report

```
/health-check verbose
```

## Related

- `docs/reference/tooling/troubleshooting.md` - Common fixes
- `/backup-config` - Backup before changes

---

_Run periodically to ensure toolkit integrity._
