---
name: Plugin Management
description: Create custom plugins, manage marketplace installations, and troubleshoot plugin discovery issues.
category: ecosystem
---

# Plugin Management Guide

**Last Updated:** February 2026 (v2.6.0)

---

## Overview

Plugins extend Claude Code with reusable skills, agents, commands, and hooks. This setup manages 101 marketplace repos containing 7,400+ community skills alongside 119 local skills. Marketplace repos are read-only references pulled from upstream, while local plugins are your own customizations tracked in your personal repo.

---

## Directory Structure

```
plugins/
├── cache/                     # Auto-generated install cache (gitignored)
│   ├── claude-code-plugins/
│   │   └── pr-review-toolkit/
│   │       └── 1.0.0/        # Versioned snapshot
│   └── superpowers-marketplace/
│       └── superpowers/
│           └── 4.0.3/
├── installed_plugins.json     # Tracks what you have installed
├── known_marketplaces.json    # Registry of marketplace sources
├── local/                     # YOUR customized plugins (tracked in git)
│   └── ralph-wiggum/
│       ├── .claude-plugin/
│       │   └── plugin.json
│       ├── commands/
│       ├── hooks/
│       └── scripts/
└── marketplaces/              # Read-only upstream repos (submodules)
    ├── anthropic-agent-skills/
    ├── claude-code-plugins/
    │   └── plugins/           # Each subdirectory is one plugin
    ├── get-shit-done/
    ├── obra-superpowers/
    └── ... (101 marketplace repos total)
```

| Directory       | Purpose                                  | Git Tracked? |
| --------------- | ---------------------------------------- | ------------ |
| `cache/`        | Versioned snapshots of installed plugins | No (ignored) |
| `local/`        | Your customized plugin copies            | Yes          |
| `marketplaces/` | Read-only upstream repos (submodules)    | As gitlinks  |

---

## Plugin Anatomy

Every plugin lives inside a directory containing a `.claude-plugin/plugin.json` manifest and one or more capability directories.

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json        # REQUIRED: plugin manifest
├── README.md              # Recommended: human-readable docs
├── agents/                # Optional: subagent definitions
│   └── my-specialist.md
├── commands/              # Optional: slash commands
│   └── my-command.md
├── hooks/                 # Optional: lifecycle hooks
│   ├── hooks.json
│   └── stop-hook.sh
└── scripts/               # Optional: supporting scripts
    └── setup.sh
```

### plugin.json Schema

The manifest at `.claude-plugin/plugin.json` defines plugin identity and metadata.

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A concise description of what this plugin provides",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "homepage": "https://github.com/you/my-plugin",
  "repository": "https://github.com/you/my-plugin",
  "license": "MIT",
  "keywords": ["skills", "testing", "debugging"]
}
```

**Required fields:** `name`, `description`. **Recommended:** `version`, `author`. **Optional:** `homepage`, `repository`, `license`, `keywords`. The `name` must match the plugin directory name. The `version` follows semver and is used by the cache system for versioned snapshots.

---

## Plugin Discovery and Loading

Claude Code discovers plugins through three mechanisms:

**1. Installed Plugins (`installed_plugins.json`).** When you run `claude plugins install`, Claude Code copies plugin files into `cache/` and records the installation. Each entry tracks the source marketplace, version, install path, git commit SHA, and scope (`user` for all projects, `project` for current project only).

**2. Known Marketplaces (`known_marketplaces.json`).** Registers marketplace sources that `claude plugins` commands can browse and install from. Each entry points to a local directory or GitHub repo. Marketplaces are registered via `claude plugins add-marketplace` or auto-detected from `plugins/marketplaces/`.

**3. Local Plugins (`plugins/local/`).** Plugins placed directly in `plugins/local/` are available without installation. This is the path for your own customized plugins maintained in version control.

---

## Installing Plugins from Marketplaces

```bash
# Browse available plugins
claude plugins list-marketplaces
claude plugins list --marketplace claude-code-plugins
claude plugins search "review"

# Install a plugin
claude plugins install pr-review-toolkit --marketplace claude-code-plugins
claude plugins install superpowers --marketplace superpowers-marketplace --scope user

# Register a new marketplace
claude plugins add-marketplace --source github --repo anthropics/claude-code
claude plugins add-marketplace --source directory --path ~/.claude/plugins/marketplaces/obra-superpowers

# Verify installation
claude plugins list
claude doctor
```

---

## The Marketplace Ecosystem

This setup aggregates 101 marketplace repos containing 7,400+ community-contributed skills across many domains.

### Notable Marketplaces

| Marketplace                | Focus Area                              |
| -------------------------- | --------------------------------------- |
| `claude-code-plugins`      | Official Anthropic plugins (13 plugins) |
| `anthropic-agent-skills`   | Official agent skill definitions        |
| `obra-superpowers`         | TDD, debugging, collaboration patterns  |
| `get-shit-done`            | GSD productivity workflow               |
| `trailofbits-skills`       | Security analysis and auditing          |
| `expo-skills`              | React Native / Expo development         |
| `vercel-agent-skills`      | Vercel deployment and Next.js           |
| `hashi-terraform-skills`   | HashiCorp Terraform infrastructure      |
| `claude-scientific-skills` | Scientific computing and analysis       |

### Marketplace Repo Conventions

Repos follow one of two layouts. Single-plugin repos place `.claude-plugin/plugin.json` at the root. Multi-plugin repos (like `claude-code-plugins`) host multiple plugins in a `plugins/` subdirectory, each with its own `.claude-plugin/plugin.json`.

All marketplace repos are configured as read-only with `no_push` set on the push URL. See `rules/tooling/external-repos.md` for the full list of 84 repos.

---

## Creating Plugins

### Skills (Agents)

Agent files are markdown documents placed in the `agents/` directory that define a role, instructions, and constraints. Claude Code loads them when users reference the agent by name or when auto-routing detects a matching domain.

### Commands

Slash commands are markdown files in the `commands/` directory. The filename (minus `.md`) becomes the command name. For example, `commands/review-pr.md` creates the `/review-pr` command.

### Hooks

Hooks execute shell commands in response to lifecycle events. Define them in `hooks/hooks.json`:

```json
{
  "hooks": [{ "event": "stop", "command": "bash ./hooks/stop-hook.sh" }]
}
```

---

## Updating Upstream Plugins

```bash
# 1. Pull latest from marketplace
cd ~/.claude/plugins/marketplaces/claude-code-plugins
git fetch origin && git pull origin main

# 2. Review changes to plugins you've customized
diff -r plugins/local/ralph-wiggum \
     plugins/marketplaces/claude-code-plugins/plugins/ralph-wiggum

# 3. Merge relevant changes
cp plugins/marketplaces/claude-code-plugins/plugins/ralph-wiggum/NEW_FILE.md \
   plugins/local/ralph-wiggum/

# 4. Commit your merged changes
git add plugins/local/ && git commit -m "feat(plugins): merge upstream updates"
```

Or update all marketplaces at once with `~/.claude/_pull-all-repos.sh`.

---

## Creating a New Custom Plugin

### Fork from Marketplace

```bash
cp -r plugins/marketplaces/claude-code-plugins/plugins/PLUGIN_NAME plugins/local/
# Make modifications, then commit
git add plugins/local/PLUGIN_NAME/ && git commit -m "feat(plugins): add customized PLUGIN_NAME"
```

### Create from Scratch

```bash
mkdir -p plugins/local/my-plugin/.claude-plugin
cat > plugins/local/my-plugin/.claude-plugin/plugin.json << 'EOF'
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "What this plugin does",
  "author": { "name": "Your Name" }
}
EOF

mkdir -p plugins/local/my-plugin/{agents,commands}
git add plugins/local/my-plugin/ && git commit -m "feat(plugins): create my-plugin"
```

---

## Marketplace Submodule Configuration

Marketplace repos are configured as read-only:

```bash
cd plugins/marketplaces/claude-code-plugins
git remote -v
# origin  https://github.com/anthropics/claude-code.git (fetch)
# origin  no_push (push)
```

If you accidentally modify a marketplace repo, reset with `git checkout . && git clean -fd`.

---

## Troubleshooting

### `claude doctor` Shows Plugin Errors

OS-specific paths in `known_marketplaces.json` break when shared across macOS, Linux, and Windows. Fix with `bash ~/.claude/scripts/fix-marketplace-paths.sh`.

### Push Rejected on Marketplace Repo

The error `fatal: 'no_push' does not appear to be a git repository` is expected. Marketplace repos are read-only by design.

### Submodule Not Updating

```bash
git submodule init && git submodule update --remote
```

### Detached HEAD in Submodule

```bash
cd ~/.claude/plugins/marketplaces/get-shit-done
git checkout main && git pull origin main
```

### Plugin Not Appearing After Install

Verify the plugin has a valid `.claude-plugin/plugin.json`, check `installed_plugins.json` for the entry, restart Claude Code to reload the registry, and run `claude doctor` for diagnostics.

### Cache Corruption

Clear and reinstall: `rm -rf ~/.claude/plugins/cache/marketplace/plugin/ && claude plugins install plugin --marketplace marketplace`.

---

## Quick Reference

| Task                    | Command                                              |
| ----------------------- | ---------------------------------------------------- |
| Update marketplace      | `cd plugins/marketplaces/X && git pull`              |
| Update all marketplaces | `~/.claude/_pull-all-repos.sh`                       |
| Diff local vs upstream  | `diff -r plugins/local/X plugins/marketplaces/.../X` |
| Reset marketplace       | `git checkout . && git clean -fd`                    |
| Commit customizations   | `git add plugins/local/ && git commit`               |
| Install a plugin        | `claude plugins install NAME --marketplace MARKET`   |
| List installed plugins  | `claude plugins list`                                |
| Run diagnostics         | `claude doctor`                                      |
| Fix marketplace paths   | `bash ~/.claude/scripts/fix-marketplace-paths.sh`    |

---

## Workflow Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    UPDATE WORKFLOW                           │
├─────────────────────────────────────────────────────────────┤
│  1. git pull (in marketplace)                               │
│  2. diff (compare local vs upstream)                        │
│  3. merge (selectively copy improvements)                   │
│  4. commit (your local/ changes)                            │
│  5. push (to YOUR GitHub repo)                              │
└─────────────────────────────────────────────────────────────┘
```

This keeps upstream updates accessible while preserving your customizations.

---

## Related Documentation

- `~/.claude/CLAUDE.md` -- Core rules and plugin philosophy
- `~/.claude/docs/MARKETPLACE-GUIDE.md` -- Marketplace browsing and discovery
- `~/.claude/rules/tooling/external-repos.md` -- Full list of 101 marketplace repos
- `~/.claude/rules/tooling/troubleshooting.md` -- General troubleshooting
- `~/.claude/skills/README.md` -- Skills overview (119 local skills)
