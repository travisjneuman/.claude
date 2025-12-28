# Project CLAUDE.md Template

> Copy to project root as `CLAUDE.md`. Customize placeholders in brackets.

---

## Template

```markdown
# CLAUDE.md - [Project Name]

> [One-line description of what this project does]
> **Global rules from `~/.claude/` apply automatically.**

---

## Project Identity

| Field | Value |
|-------|-------|
| **Type** | [Static site / React app / Next.js / NestJS / Python / Monorepo] |
| **Stack** | [e.g., React 19, TypeScript 5.9, Vite 7, Tailwind 4] |
| **Status** | [Active / Alpha / Maintenance / Stable] |
| **Priority** | [P0 / P1 / P2 / P3] |
| **Live URL** | [URL or N/A] |

---

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run test` | Run tests |
| `npm run lint` | Lint code |

---

## Architecture

```
src/
├── components/     # [Reusable UI components]
├── hooks/          # [Custom React hooks]
├── services/       # [API/business logic]
├── stores/         # [State management]
├── types/          # [TypeScript types]
└── utils/          # [Utility functions]
```

---

## Project-Specific Rules

[Only rules unique to THIS project - e.g., brand colors, naming conventions, domain logic]

---

## Key Files

| File | Purpose |
|------|---------|
| `src/config.ts` | App configuration |
| `src/types/index.ts` | Shared types |

---

## Environment

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Database connection |
| `API_KEY` | External API key |

---

## Related Global Rules

Load these `~/.claude/` files when relevant:
- `rules/stacks/[stack].md` for [stack] patterns
- `rules/checklists/[checklist].md` for [checklist] work

---

## Quick Start

| I want to... | Command |
|--------------|---------|
| Start any task | `/start-task [description]` |
| Check project status | `/gsd:progress` |
| Debug an issue | `Skill(debug-like-expert)` |
| Make a decision | `/consider:first-principles` |

---

*Global workflow, skills, and standards loaded from `~/.claude/`*
*Last Updated: [Date]*
```

---

## Stack-Specific Related Global Rules

Copy the appropriate section based on your project type:

### React + TypeScript
```markdown
## Related Global Rules

Load these `~/.claude/` files when relevant:
- `rules/stacks/react-typescript.md` for React/TypeScript patterns
- `rules/checklists/ui-visual-changes.md` for UI changes
```

### Next.js + NestJS (Full-Stack)
```markdown
## Related Global Rules

Load these `~/.claude/` files when relevant:
- `rules/stacks/fullstack-nextjs-nestjs.md` for full-stack patterns
- `rules/stacks/react-typescript.md` for React/TypeScript patterns
- `rules/checklists/ui-visual-changes.md` for frontend changes
```

### Static HTML/CSS/JS
```markdown
## Related Global Rules

Load these `~/.claude/` files when relevant:
- `rules/checklists/static-sites.md` for HTML/CSS/JS patterns
- `rules/checklists/ui-visual-changes.md` for UI changes
```

### Python
```markdown
## Related Global Rules

Load these `~/.claude/` files when relevant:
- `rules/stacks/python.md` for Python patterns
- `rules/checklists/automation-scripts.md` for scripts/automation
```

### Automation/Scripts
```markdown
## Related Global Rules

Load these `~/.claude/` files when relevant:
- `rules/checklists/automation-scripts.md` for automation patterns
```

---

## Hierarchy

```
Global ~/.claude/CLAUDE.md    # Always applies (constitution)
         ↓
Project ./CLAUDE.md           # Project-specific (this template)
         ↓
Directory ./src/CLAUDE.md     # Directory-specific (rare)
```

Lower levels can override higher levels for conflicting rules.

---

*Template version: 2.0 — Optimized for global toolkit integration*
