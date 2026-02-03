# Scripts

Helper scripts for setup, maintenance, and automation of the Claude Code toolkit.

**Location:** `~/.claude/scripts/`

---

## Quick Reference

### Setup (run once per machine)

| Script                 | Purpose                                       | When to Run                                    |
| ---------------------- | --------------------------------------------- | ---------------------------------------------- |
| `install.sh`           | One-line installer (curl-pipe)                | First-time setup on any machine                |
| `setup-new-machine.sh` | Complete setup (plugins, hooks, verification) | After cloning the repo                         |
| `init-marketplaces.sh` | Clone all 67 marketplace repos from upstreams | After cloning, or to fix broken submodules     |
| `setup-hooks.sh`       | Install git hooks into `.git/hooks/`          | After cloning (called by setup-new-machine.sh) |

### Maintenance (run periodically)

| Script                | Purpose                                 | When to Run                                                |
| --------------------- | --------------------------------------- | ---------------------------------------------------------- |
| `update-counts.sh`    | Update all hardcoded counts across docs | After adding/removing skills, agents, or marketplace repos |
| `regenerate-index.sh` | Regenerate `skills/MASTER_INDEX.md`     | After adding/removing skills                               |
| `update-plugins.sh`   | Update plugin registrations             | After enabling/disabling plugins                           |
| `fix-remotes.sh`      | Fix remote URLs on marketplace repos    | If remotes are misconfigured after a pull                  |

### Repo Management

| Script                     | Purpose                               | When to Run                                    |
| -------------------------- | ------------------------------------- | ---------------------------------------------- |
| `update-external-repos.sh` | Pull all marketplace repos            | Use `_pull-all-repos.sh` instead (recommended) |
| `update-marketplaces.sh`   | Update marketplace submodule pointers | After upstream changes                         |
| `force-sync-repos.sh`      | Force-sync all repos (nuclear option) | When repos are severely broken                 |

### Utilities

| Script                        | Purpose                                        |
| ----------------------------- | ---------------------------------------------- |
| `fix-plugin-line-endings.sh`  | Convert CRLF to LF in plugin files (Linux/Mac) |
| `fix-plugin-line-endings.ps1` | Same, for Windows PowerShell                   |

---

## Git Hooks (scripts/hooks/)

These are git hooks installed into `.git/hooks/` by `setup-hooks.sh`:

| Hook               | Purpose                                                                       |
| ------------------ | ----------------------------------------------------------------------------- |
| `pre-commit.sh`    | Block secrets, validate SKILL.md files, check .gitignore                      |
| `commit-msg.sh`    | Enforce conventional commit message format                                    |
| `pre-push.sh`      | Block force-push to master/main, warn about submodule changes                 |
| `session-start.sh` | SessionStart hook template (legacy — current hooks are in `~/.claude/hooks/`) |

These are different from the Claude Code lifecycle hooks in `~/.claude/hooks/`. See [hooks/README.md](../hooks/README.md) for that system.

---

## Root-Level Script

`~/.claude/_pull-all-repos.sh` lives at root level (not in scripts/) because it's the primary user-facing script. It:

1. Initializes any unregistered submodules
2. Pulls the parent repo
3. Pulls all 67 marketplace repos
4. Enforces `no_push` on marketplace repos
5. Protects parent repo push URL
6. Pulls custom project directories (from `.env.local`)
7. Updates documentation counts if repos changed

```bash
# Pull everything
~/.claude/_pull-all-repos.sh

# Check status without pulling
~/.claude/_pull-all-repos.sh --status
```

---

## Common Workflows

### New machine setup

```bash
git clone https://github.com/travisjneuman/.claude.git ~/.claude
bash ~/.claude/scripts/init-marketplaces.sh
bash ~/.claude/scripts/setup-new-machine.sh
```

### After adding a new skill

```bash
bash ~/.claude/scripts/update-counts.sh
# Counts in README, plugin.json, and all docs updated automatically
```

### Fixing broken marketplace repos

```bash
# Try fix-remotes first (lightweight)
bash ~/.claude/scripts/fix-remotes.sh

# If that doesn't work, re-initialize from upstreams
bash ~/.claude/scripts/init-marketplaces.sh
```

---

## See Also

- [Setup Guide](../docs/SETUP-GUIDE.md) — Full setup instructions
- [New Device Setup](../docs/NEW-DEVICE-SETUP.md) — Cross-platform guide
- [Maintenance](../docs/MAINTENANCE.md) — Ongoing maintenance
- [Hooks README](../hooks/README.md) — Claude Code lifecycle hooks
- [External Repos](../rules/tooling/external-repos.md) — Marketplace repo management
