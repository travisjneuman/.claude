# Plugin Management Guide

**Last Updated:** February 2026 (v2.3.3)

---

## Directory Structure

```
plugins/
├── cache/              # Auto-generated, gitignored
├── installed_plugins.json
├── known_marketplaces.json
├── local/              # YOUR customized plugins (tracked in git)
│   └── ralph-wiggum/   # Example: customized version
└── marketplaces/       # Read-only upstream repos (submodules)
    ├── anthropic-agent-skills/
    ├── claude-code-plugins/
    └── taches-cc-resources/
```

## Philosophy

- **Marketplaces = read-only reference** - Pull upstream updates, never modify
- **Local = your customizations** - Tracked in your repo, synced to your GitHub
- **Separation of concerns** - Upstream stays pristine, customizations stay safe

---

## Updating Upstream Plugins

### 1. Pull Latest from Marketplace

```bash
cd ~/.claude/plugins/marketplaces/claude-code-plugins
git fetch origin
git pull origin main
```

### 2. Review Changes to Plugins You've Customized

```bash
# See what changed in a plugin you've customized
git log --oneline -10 -- plugins/ralph-wiggum/

# Diff your local version against upstream
diff -r plugins/local/ralph-wiggum \
     plugins/marketplaces/claude-code-plugins/plugins/ralph-wiggum
```

### 3. Merge Relevant Changes

If upstream improved something you want:

```bash
# Option A: Copy specific files
cp plugins/marketplaces/claude-code-plugins/plugins/ralph-wiggum/NEW_FILE.md \
   plugins/local/ralph-wiggum/

# Option B: Use a diff tool to merge changes
code --diff plugins/marketplaces/claude-code-plugins/plugins/ralph-wiggum/README.md \
            plugins/local/ralph-wiggum/README.md
```

### 4. Commit Your Merged Changes

```bash
git add plugins/local/
git commit -m "feat(plugins): Merge upstream updates into ralph-wiggum"
```

---

## Creating a New Custom Plugin

### Option A: Fork from Marketplace

```bash
# Copy from marketplace to local
cp -r plugins/marketplaces/claude-code-plugins/plugins/PLUGIN_NAME \
      plugins/local/

# Make your modifications
code plugins/local/PLUGIN_NAME/

# Commit
git add plugins/local/PLUGIN_NAME/
git commit -m "feat(plugins): Add customized PLUGIN_NAME"
```

### Option B: Create from Scratch

```bash
mkdir -p plugins/local/my-plugin/.claude-plugin
# Create plugin structure...
```

---

## Marketplace Submodule Configuration

The marketplace repos are configured as read-only:

```bash
# Verify configuration
cd plugins/marketplaces/claude-code-plugins
git remote -v
# Should show:
# origin  https://github.com/anthropics/claude-code.git (fetch)
# origin  no_push (push)
```

If you accidentally modify a marketplace repo:

```bash
# Reset to pristine state
cd plugins/marketplaces/claude-code-plugins
git checkout .
git clean -fd
```

---

## Quick Reference

| Task                   | Command                                              |
| ---------------------- | ---------------------------------------------------- |
| Update marketplace     | `cd plugins/marketplaces/X && git pull`              |
| Diff local vs upstream | `diff -r plugins/local/X plugins/marketplaces/.../X` |
| Reset marketplace      | `git checkout . && git clean -fd`                    |
| Commit customizations  | `git add plugins/local/ && git commit`               |

---

## Workflow Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    UPDATE WORKFLOW                          │
├─────────────────────────────────────────────────────────────┤
│  1. git pull (in marketplace)                               │
│  2. diff (compare local vs upstream)                        │
│  3. merge (selectively copy improvements)                   │
│  4. commit (your local/ changes)                            │
│  5. push (to YOUR GitHub repo)                              │
└─────────────────────────────────────────────────────────────┘
```

This keeps upstream updates accessible while preserving your customizations.
