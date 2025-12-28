---
description: Add missing toolkit sections (Related Global Rules, Quick Start) to existing CLAUDE.md
arguments:
  - name: stack
    description: "Optional: react | nextjs | static | python | automation (for Related Global Rules)"
    required: false
---

# Standardize CLAUDE.md

Adds missing sections to an existing `CLAUDE.md` file while preserving project-specific content.

---

## When to Use

- After running Claude Code's `/init` on a new codebase
- When inheriting a project without toolkit integration
- To retrofit older projects with the standardized pattern

---

## Execution Flow

### Step 1: Verify CLAUDE.md Exists

```bash
[ -f "./CLAUDE.md" ] && echo "EXISTS" || echo "NOT_EXISTS"
```

**If NOT_EXISTS:** Stop and suggest running `/init-project` instead.

---

### Step 2: Check for Missing Sections

Read the current `./CLAUDE.md` and check for:

| Section | Pattern to Find |
|---------|-----------------|
| Global delegation | `Global rules from \`~/.claude/\`` |
| Related Global Rules | `## Related Global Rules` |
| Quick Start | `## Quick Start` |
| Footer | `loaded from \`~/.claude/\`` |

---

### Step 3: Detect Stack (if not provided)

If `{{stack}}` not provided, detect from:
- `package.json` → react or nextjs
- `pyproject.toml` / `requirements.txt` → python
- `index.html` only → static
- Otherwise → ask user

---

### Step 4: Add Missing Sections

**If missing global delegation:** Add after the first heading:
```markdown
> **Global rules from `~/.claude/` apply automatically.**
```

**If missing Related Global Rules:** Add before Quick Start (or at end):
```markdown
---

## Related Global Rules

Load these `~/.claude/` files when relevant:
- `rules/stacks/[stack].md` for [stack] patterns
- `rules/checklists/[checklist].md` for [checklist] work
```

**If missing Quick Start:** Add at end (before footer):
```markdown
---

## Quick Start

| I want to... | Command |
|--------------|---------|
| Start any task | `/start-task [description]` |
| Check project status | `/gsd:progress` |
| Debug an issue | `Skill(debug-like-expert)` |
| Make a decision | `/consider:first-principles` |
```

**If missing footer:** Add at very end:
```markdown
---

*Global workflow, skills, and standards loaded from `~/.claude/`*
*Last Updated: [Today's Date]*
```

---

### Step 5: Preserve and Write

1. Preserve ALL existing content
2. Insert new sections in correct locations
3. Write updated file to `./CLAUDE.md`
4. Report what was added

---

## Output Message

```
Standardized CLAUDE.md for [stack] stack.

Added sections:
- [x] Global delegation statement
- [x] Related Global Rules (pointing to [rules files])
- [x] Quick Start table
- [x] Footer

Your project now integrates with ~/.claude/ toolkit.
```

---

## Common Scenarios

### After /init on new codebase
```
/init                          # Claude analyzes codebase
/standardize-claude-md react   # Add toolkit integration
```

### Retrofit old project
```
/standardize-claude-md         # Auto-detects stack, adds sections
```

### Specific stack
```
/standardize-claude-md python  # Adds Python-specific rules
```

---

*Part of the Ultimate Claude Code Toolkit*
