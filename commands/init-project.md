---
description: Initialize project with CLAUDE.md template - adaptive detection for new or existing projects
arguments:
  - name: stack
    description: "Optional: react | nextjs | static | python | automation (auto-detected if not provided)"
    required: false
---

# Initialize Project CLAUDE.md

Creates a properly configured `CLAUDE.md` file using the optimized template with global toolkit integration.

---

## Execution Flow

### Step 1: Check Current State

```bash
# Check if CLAUDE.md already exists
[ -f "./CLAUDE.md" ] && echo "EXISTS" || echo "NOT_EXISTS"
```

**If EXISTS:** Stop and suggest running `/standardize-claude-md` instead.

---

### Step 2: Detect or Ask Stack

**If `{{stack}}` argument provided:** Use that stack directly.

**If no argument:** Check for project files:

```bash
# Detection priority
[ -f "package.json" ] && grep -q '"next"' package.json && echo "nextjs"
[ -f "package.json" ] && grep -q '"react"' package.json && echo "react"
[ -f "pyproject.toml" ] || [ -f "requirements.txt" ] && echo "python"
[ -f "index.html" ] && ! [ -f "package.json" ] && echo "static"
```

**If no files detected:** Use `AskUserQuestion` to ask:
- "What tech stack will this project use?"
- Options: React + TypeScript, Next.js + NestJS, Static HTML/CSS/JS, Python, Automation/Scripts

---

### Step 3: Stack → Rules Mapping

| Detected Stack | Type | Related Global Rules |
|----------------|------|---------------------|
| `react` | React app | `react-typescript.md`, `ui-visual-changes.md` |
| `nextjs` | Next.js | `fullstack-nextjs-nestjs.md`, `react-typescript.md`, `ui-visual-changes.md` |
| `static` | Static site | `static-sites.md`, `ui-visual-changes.md` |
| `python` | Python | `python.md`, `automation-scripts.md` |
| `automation` | Scripts | `automation-scripts.md` |

---

### Step 4: Generate CLAUDE.md

Read template from `~/.claude/templates/project-CLAUDE.md`.

Fill in the **Related Global Rules** section based on detected stack:

**For React:**
```markdown
## Related Global Rules

Load these `~/.claude/` files when relevant:
- `rules/stacks/react-typescript.md` for React/TypeScript patterns
- `rules/checklists/ui-visual-changes.md` for UI changes
```

**For Next.js:**
```markdown
## Related Global Rules

Load these `~/.claude/` files when relevant:
- `rules/stacks/fullstack-nextjs-nestjs.md` for full-stack patterns
- `rules/stacks/react-typescript.md` for React/TypeScript patterns
- `rules/checklists/ui-visual-changes.md` for frontend changes
```

**For Static:**
```markdown
## Related Global Rules

Load these `~/.claude/` files when relevant:
- `rules/checklists/static-sites.md` for HTML/CSS/JS patterns
- `rules/checklists/ui-visual-changes.md` for UI changes
```

**For Python:**
```markdown
## Related Global Rules

Load these `~/.claude/` files when relevant:
- `rules/stacks/python.md` for Python patterns
- `rules/checklists/automation-scripts.md` for scripts/automation
```

**For Automation:**
```markdown
## Related Global Rules

Load these `~/.claude/` files when relevant:
- `rules/checklists/automation-scripts.md` for automation patterns
```

---

### Step 5: Write and Prompt

1. Write the filled template to `./CLAUDE.md`
2. Display message:

```
Created CLAUDE.md with [stack] configuration.

Please customize:
- [ ] Project name and description
- [ ] Commands table (npm scripts)
- [ ] Architecture section (directory structure)
- [ ] Project-specific rules
- [ ] Key files table
- [ ] Environment variables

Your project now leverages the global ~/.claude/ toolkit.
```

---

## Quick Reference

| Stack | Command |
|-------|---------|
| React | `/init-project react` |
| Next.js | `/init-project nextjs` |
| Static | `/init-project static` |
| Python | `/init-project python` |
| Scripts | `/init-project automation` |
| Auto-detect | `/init-project` |

---

## When to Use This vs /init

| Use `/init-project` when... | Use `/init` when... |
|-----------------------------|---------------------|
| Starting YOUR projects | Analyzing unfamiliar OSS code |
| Want consistent toolkit integration | Need Claude to discover patterns |
| Know the tech stack | Don't know what the codebase uses |

---

*Part of the Ultimate Claude Code Toolkit*
