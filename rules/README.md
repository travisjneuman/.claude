# Rules & Guidelines Index

Modular workflow rules, loaded contextually based on task type.

---

## Directory Structure

```
rules/
├── README.md                 # This file
├── checklists/               # Task-type specific checklists
│   ├── ui-visual-changes.md  # Visual/UI work
│   ├── automation-scripts.md # Scripts/automation
│   └── static-sites.md       # HTML/CSS/JS sites
├── stacks/                   # Tech stack patterns
│   ├── react-typescript.md   # React + TypeScript
│   ├── python.md             # Python projects
│   └── fullstack-nextjs-nestjs.md  # Full-stack
└── tooling/                  # Tools & setup
    ├── git-hooks-setup.md    # Git hook configuration
    ├── troubleshooting.md    # Common issue fixes
    └── external-repos.md     # GSD, marketplaces, external deps
```

---

## When to Read Each File

### Checklists

| File | Read When... |
|------|--------------|
| `checklists/ui-visual-changes.md` | Making ANY visual changes |
| `checklists/automation-scripts.md` | Writing scripts, automation |
| `checklists/static-sites.md` | Working on HTML/CSS/JS sites |

### Stacks

| File | Read When... |
|------|--------------|
| `stacks/react-typescript.md` | React + TypeScript project |
| `stacks/python.md` | Python project |
| `stacks/fullstack-nextjs-nestjs.md` | Full-stack Next.js/NestJS |

### Tooling

| File | Read When... |
|------|--------------|
| `tooling/git-hooks-setup.md` | Setting up project automation |
| `tooling/troubleshooting.md` | Diagnosing issues |
| `tooling/external-repos.md` | Updating GSD, marketplaces, external deps |

---

## Relationship to CLAUDE.md

`~/.claude/CLAUDE.md` contains **core rules** that apply to ALL work.

These satellite files contain **contextual guidance** for specific situations.

**Hierarchy:**
1. `CLAUDE.md` - Always applies (constitution)
2. `rules/*` - Apply when relevant (context-specific)
3. Project `CLAUDE.md` - Project-specific overrides

---

## Related Documentation

- `~/.claude/CLAUDE.md` - Core rules (always read)
- `~/.claude/skills/MASTER_INDEX.md` - Skills navigation
- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/agents/README.md` - Agents directory
- `~/.claude/templates/task-template.md` - Task planning

---

## Adding New Rules

1. Determine category: checklist, stack, or tooling
2. Create file in appropriate directory
3. Follow existing file format
4. Include "Related Skills" section
5. Include "Related Documentation" section
6. Update this README

---

*Rules are contextual. Load what you need, when you need it.*
