# Plan: GitHub Backup Setup for Web Development Workspace

## Summary

Create two new GitHub repos:
1. **`ndc.oakstone.properties`** (private) - The Oakstone Properties Astro project
2. **`.webdev`** (private) - Workspace-level config and documentation backup

---

## Repo 1: ndc.oakstone.properties

**Path:** `D:\Proton Drive\My files\Documents\Professional\Programming\Web Development\oakstone.properties`
**Remote:** `https://github.com/travisjneuman/ndc.oakstone.properties.git`
**Visibility:** Private

### Steps

1. Create private repo on GitHub via `gh repo create`
2. Initialize git in oakstone.properties folder
3. Add all files (existing `.gitignore` already present)
4. Initial commit and push

### Commands

```bash
cd "D:\Proton Drive\My files\Documents\Professional\Programming\Web Development\oakstone.properties"
gh repo create travisjneuman/ndc.oakstone.properties --private --source=. --remote=origin --push
```

---

## Repo 2: .webdev

**Path:** `D:\Proton Drive\My files\Documents\Professional\Programming\Web Development`
**Remote:** `https://github.com/travisjneuman/.webdev.git`
**Visibility:** Private

### What Gets Backed Up

| Include | Description |
|---------|-------------|
| `_meta.notes/` | Obsidian documentation vault |
| `.obsidian/` | Obsidian editor settings |
| `.claude/` | Claude Code workspace config (excluding marketplace repos) |
| `CLAUDE.md` | Workspace master configuration |
| `*.code-workspace` | VS Code workspace files |
| `.mcp.json` | MCP server configuration |
| `.claude.json` | Claude configuration |

### What Gets Excluded

| Exclude | Reason |
|---------|--------|
| `system.knowledgebase/` | Has own repo |
| `tdr.portfolio/` | Has own repo |
| `tjn.home/` | Has own repo |
| `tjn.portfolio/` | Has own repo |
| `tkl.home/` | Has own repo |
| `.lzg_platform/` | Contains sub-repos |
| `oakstone.properties/` | Will have own repo (ndc.oakstone.properties) |
| `.claude/plugins/marketplaces/` | Contains 4 managed repos |
| `node_modules/` | Dependencies |

### Steps

1. Create `.gitignore` at workspace root
2. Create private repo on GitHub
3. Initialize git, add files, commit, push

### Files to Create

**`.gitignore`** at workspace root:
```gitignore
# Project repositories (have their own remotes)
system.knowledgebase/
tdr.portfolio/
tjn.home/
tjn.portfolio/
tkl.home/
oakstone.properties/

# Monorepo with sub-repos
.lzg_platform/

# Plugin marketplace repos (managed separately)
.claude/plugins/marketplaces/

# Standard ignores
node_modules/
.DS_Store
*.log
Thumbs.db
```

### Commands

```bash
cd "D:\Proton Drive\My files\Documents\Professional\Programming\Web Development"
# Create .gitignore first (done via Write tool)
gh repo create travisjneuman/.webdev --private --source=. --remote=origin --push
```

---

## Execution Order

1. **First:** Create `ndc.oakstone.properties` repo (oakstone.properties folder)
2. **Second:** Create `.gitignore` at workspace root
3. **Third:** Create `.webdev` repo (workspace root)

---

## Prerequisites

- GitHub CLI (`gh`) authenticated
- Git installed and configured

---

## Verification

After completion:
- [ ] `ndc.oakstone.properties` visible at github.com/travisjneuman/ndc.oakstone.properties
- [ ] `.webdev` visible at github.com/travisjneuman/.webdev
- [ ] `_meta.notes/` content visible in `.webdev` repo
- [ ] No nested repos accidentally included in `.webdev`
