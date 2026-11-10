---
description: Verify and repair the Claude Code toolkit installation
disable-model-invocation: true
---
# Bootstrap - System Configuration & Verification

Verifies and repairs the Claude Code Toolkit installation.

**Use cases:**

- Fresh install verification (after running install.sh)
- Troubleshooting configuration issues
- Ensuring cross-machine sync is working
- Repairing marketplace clone configuration (missing clones, missing `no_push`)

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
| `hooks/run-hook.js`              | Hook dispatcher              | ✓                     |

**Action:** Read and verify each file exists. If missing, report which files need attention.

---

### Step 3: Marketplace Clone Check

Marketplaces are optional plain clones under `plugins/marketplaces/` (gitignored). `.gitmodules` is only the manifest that lists them; nothing is a git submodule. If the folder is empty the user simply hasn't run `scripts/init-marketplaces.sh`, which is fine.

```bash
cd ~/.claude

# Manifest entries that have no clone yet
git config --file .gitmodules --get-regexp path | cut -d' ' -f2 | while read -r p; do
    [ -d "$p/.git" ] || echo "NOT CLONED: $p"
done

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
   ls -la ~/.claude/hooks/run-hook.js ~/.claude/hooks/guard.js
   ```

2. **settings.json has hook configured:**
   Check that `hooks.SessionStart` is defined in settings.json

3. **Hook wiring:** confirm `hooks.PreToolUse` in settings.json points at `guard.js` through `run-hook.js` (read the config; don't run the hooks).

---

### Step 5: MCP Configuration Check

The toolkit ships no MCP servers, so a missing `.mcp.json` is the expected state. Run `claude mcp list` and report what this machine or project has added. If an old `~/.claude/.mcp.json` from a previous installer names `@anthropic-ai/mcp-*` packages, tell the user those package names don't exist and the file can be removed.

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
  ✓ hooks/run-hook.js

Marketplaces (optional):
  ✓ <N> of <M> manifest repos cloned
  ✓ All repos have no_push protection

Resources (from the Step 7 counts; generated totals live at the top of ~/.claude/INDEX.md):
  • <N> local skills
  • <N> local agents
  • <N> marketplace skills (<M> repos)

Hooks:
  ✓ SessionStart: daily pull + repo health banner
  ✓ PreToolUse: guard.js (Bash, PowerShell, file writes)
  ✓ PostToolUse: secret-scan.js

Status: HEALTHY / NEEDS ATTENTION
```

---

### Step 9: Offer Fixes (If Needed)

If any issues were detected, offer to fix them:

1. **Missing no_push:** Run fix script
2. **Missing hook or hook wiring:** Alert user to pull latest from git
3. **Marketplace clones missing or behind:** Offer `bash ~/.claude/scripts/init-marketplaces.sh` (first time) or `bash ~/.claude/_pull-all-repos.sh` (update)

---

## Quick Fixes Reference

**Update all marketplace repos:**

```bash
bash ~/.claude/_pull-all-repos.sh
```

**Repair a broken marketplace clone (non-destructive):**

```bash
cd ~/.claude/plugins/marketplaces/[repo-name]
git fetch --prune origin
git merge --ff-only origin/main  # or origin/master
```

If it cannot fast-forward, or the clone has local changes, stop and report the repo and its `git status`; never reset, clean, or discard changes.


## For Fresh Installs

If you don't have ~/.claude yet, clone it and install the repo's git hooks:

```bash
git clone https://github.com/travisjneuman/.claude.git ~/.claude
bash ~/.claude/scripts/setup-hooks.sh
```

If `~/.claude` already exists and isn't a checkout, use `scripts/install-in-place.sh` instead; it keeps the existing files.

The same commands work on Windows in Git Bash.

---

## Related Commands

| Command         | Purpose                             |
| --------------- | ----------------------------------- |
| `/doctor`       | Claude Code's built-in health check |
| `/mcp`          | View MCP server status              |
| `/health-check` | Extended toolkit health check       |

---

_Run this command anytime you suspect configuration issues or after syncing to a new machine._
