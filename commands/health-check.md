---
description: Run diagnostics on Claude Code toolkit configuration and status
arguments:
  - name: verbose
    description: "Show detailed output (default: false)"
    required: false
---

# Health Check

Comprehensive diagnostics for Claude Code toolkit.

## Usage

```
/health-check [verbose]
```

## Platform Compatibility

| Platform | Status | Notes |
|----------|--------|-------|
| Windows | ✅ | Requires Git Bash (included with Git for Windows) |
| macOS | ✅ | Works with bash/zsh |
| Linux | ✅ | Works with bash |

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

| Directory | Expected | Check |
|-----------|----------|-------|
| `skills/` | 68+ items | `ls ~/.claude/skills/ \| wc -l` |
| `agents/` | 37+ files | `ls ~/.claude/agents/*.md \| wc -l` |
| `commands/` | 10+ files | `ls ~/.claude/commands/*.md \| wc -l` |
| `rules/` | 13+ files | `find ~/.claude/rules -name "*.md" \| wc -l` |
| `templates/` | 5+ files | `ls ~/.claude/templates/ \| wc -l` |
| `plugins/marketplaces/` | 21 repos | `ls ~/.claude/plugins/marketplaces/ \| wc -l` |

### Step 3: Hooks Status

**Verify all 10 hooks:**

```bash
grep -c '"SessionStart"\|"SessionEnd"\|"Stop"\|"PreToolUse"\|"PostToolUse"\|"Notification"\|"PreCompact"\|"UserPromptSubmit"\|"PermissionRequest"\|"SubagentStop"' ~/.claude/settings.json
```

Expected: 10 hooks configured

### Step 4: Git Status

**Check submodules:**
```bash
cd ~/.claude && git submodule status
```

Verify:
- [ ] All submodules initialized
- [ ] No detached heads
- [ ] No uncommitted changes

### Step 5: MCP Servers

**List configured servers:**
```bash
grep -A1 '"disabledMcpjsonServers"' ~/.claude/settings.json
```

### Step 6: Report

**Output format:**

```
╔════════════════════════════════════════════════════════════╗
║  Claude Code Toolkit Health Check                          ║
╠════════════════════════════════════════════════════════════╣
║  Configuration:  ✅ OK                                      ║
║  Structure:      ✅ OK (71 skills, 36 agents, 21 markets)  ║
║  Hooks:          ✅ 10/10 configured                        ║
║  Git:            ✅ Clean, submodules synced               ║
║  MCP Servers:    ✅ 9 available (all disabled by default)  ║
╠════════════════════════════════════════════════════════════╣
║  Status: HEALTHY                                            ║
╚════════════════════════════════════════════════════════════╝
```

**If verbose:**
- List all skills
- List all agents
- Show hook details
- Show git submodule status
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

- `rules/tooling/troubleshooting.md` - Common fixes
- `/session-log` - View session activity
- `/backup-config` - Backup before changes

---

*Run periodically to ensure toolkit integrity.*
