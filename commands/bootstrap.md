# Bootstrap - System Configuration & Verification

Verifies and repairs the Claude Code Toolkit installation.

**Use cases:**

- Fresh install verification (after running install.sh)
- Troubleshooting configuration issues
- Ensuring cross-machine sync is working
- Repairing broken submodule configurations

---

## Execution Protocol

### Step 1: System Information

Report the current environment:

```bash
echo "Platform: $(uname -s)"
echo "Shell: $SHELL"
echo "Claude Dir: $HOME/.claude"
echo "Git version: $(git --version)"
echo "Node version: $(node --version)"
```

---

### Step 2: Core Files Verification

Check that essential files exist:

| File                             | Purpose                      | Required              |
| -------------------------------- | ---------------------------- | --------------------- |
| `CLAUDE.md`                      | Core rules and configuration | ✓                     |
| `settings.json`                  | Permissions, hooks, plugins  | ✓                     |
| `scripts/hooks/session-start.sh` | Auto-routing injection       | ✓                     |
| `.mcp.json`                      | MCP server configuration     | ✓ (platform-specific) |

**Action:** Read and verify each file exists. If missing, report which files need attention.

---

### Step 3: Submodule Health Check

Verify all marketplace repos are properly configured:

```bash
cd ~/.claude

# Check submodule status
git submodule status

# Verify no_push on all marketplace repos
for repo in plugins/marketplaces/*/; do
    push_url=$(cd "$repo" && git remote get-url --push origin 2>/dev/null)
    if [ "$push_url" != "no_push" ]; then
        echo "FIX NEEDED: $repo needs no_push configured"
    fi
done
```

**If issues found:** Offer to fix automatically:

```bash
# Fix no_push for all marketplace repos
for repo in ~/.claude/plugins/marketplaces/*/; do
    (cd "$repo" && git remote set-url --push origin no_push)
done
```

---

### Step 4: Hook Verification

Check that hooks are properly configured:

1. **SessionStart hook exists and is executable:**

   ```bash
   ls -la ~/.claude/scripts/hooks/session-start.sh
   ```

2. **settings.json has hook configured:**
   Check that `hooks.SessionStart` is defined in settings.json

3. **Test hook output is valid JSON:**
   ```bash
   bash ~/.claude/scripts/hooks/session-start.sh | python3 -m json.tool > /dev/null
   ```

---

### Step 5: MCP Configuration Check

Verify `.mcp.json` exists and matches the platform:

**For macOS/Linux:** Commands should use `npx` directly
**For Windows:** Commands should use `cmd /c npx` wrapper

If missing or incorrect, offer to create/fix it.

---

### Step 6: Plugin Verification

Check enabled plugins in settings.json:

```bash
cat ~/.claude/settings.json | grep -A50 '"enabledPlugins"'
```

Verify the plugin directories exist for each enabled plugin.

---

### Step 7: Skill & Agent Count

Report available resources:

```bash
# Count local skills
find ~/.claude/skills -name "SKILL.md" | wc -l

# Count local agents
find ~/.claude/agents -name "*.md" | wc -l

# Count marketplace skills
find ~/.claude/plugins/marketplaces -name "SKILL.md" | wc -l
```

---

### Step 8: Generate Health Report

Output a summary:

```
╔═══════════════════════════════════════════════════════════════╗
║              Claude Code Toolkit - Health Report              ║
╚═══════════════════════════════════════════════════════════════╝

Platform: [macOS/Linux/Windows]
Installation: [~/.claude]

Core Files:
  ✓ CLAUDE.md
  ✓ settings.json
  ✓ SessionStart hook
  ✓ .mcp.json

Submodules:
  ✓ 68 marketplace repos configured
  ✓ All repos have no_push protection

Resources:
  • 89 local skills
  • 47 local agents
  • 5,200+ marketplace skills (67 repos)

Hooks:
  ✓ SessionStart: Auto-routing enabled
  ✓ PostToolUse: Prettier formatting enabled

Status: HEALTHY / NEEDS ATTENTION
```

---

### Step 9: Offer Fixes (If Needed)

If any issues were detected, offer to fix them:

1. **Missing no_push:** Run fix script
2. **Missing .mcp.json:** Create platform-appropriate template
3. **Missing hook:** Alert user to pull latest from git
4. **Outdated submodules:** Offer to update

---

## Quick Fixes Reference

**Update all marketplace repos:**

```bash
bash ~/.claude/scripts/update-external-repos.sh
```

**Reset a broken submodule:**

```bash
cd ~/.claude/plugins/marketplaces/[repo-name]
git fetch origin
git reset --hard origin/main  # or origin/master
git clean -fd
```

**Recreate .mcp.json:**

```bash
bash ~/.claude/scripts/install.sh  # Will skip clone, just reconfigure
```

**Force sync everything:**

```bash
bash ~/.claude/scripts/force-sync-repos.sh
```

---

## For Fresh Installs

If you don't have ~/.claude yet, run:

```bash
curl -fsSL https://raw.githubusercontent.com/travisjneuman/.claude/master/scripts/install.sh | bash
```

Or for Windows (in Git Bash):

```bash
curl -fsSL https://raw.githubusercontent.com/travisjneuman/.claude/master/scripts/install.sh | bash
```

---

## Related Commands

| Command         | Purpose                             |
| --------------- | ----------------------------------- |
| `/doctor`       | Claude Code's built-in health check |
| `/mcp`          | View MCP server status              |
| `/health-check` | Extended toolkit health check       |

---

_Run this command anytime you suspect configuration issues or after syncing to a new machine._
