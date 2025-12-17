# Plans Folder — Organization Guidelines

> **Purpose:** Central repository for project plans stored outside their source codebases.
> **When to use:** Plans that apply to projects where you don't want to clutter the project repo, or cross-project planning documents.

---

## CRITICAL RULE: No Root-Level Plans

**NEVER place plan files directly in `plans/` root.** Every plan MUST go in a project folder.

| Plan Type | Destination |
|-----------|-------------|
| Project-specific plans | `plans/[project-name]/` |
| .claude folder work | `plans/claude-config/` |
| Cross-project/general | `plans/meta/` |
| Unknown project | Read plan content → identify project → place accordingly |

**Only `CLAUDE.md` (this file) belongs in root.**

---

## Folder Structure

```
plans/
├── CLAUDE.md              # This file
├── neuman-brain/          # Neuman Brain productivity platform
├── oakstone-properties/   # OakStone rental property website
├── thedeadrobot/          # TDR Portfolio / X automation
├── lazy-golfing/          # Lazy Golfing platform (LZG)
├── notes-migration/       # Personal notes conversion projects
├── claude-config/         # .claude folder optimization
├── meta/                  # Cross-project or meta-planning docs
└── [new-project]/         # Create as needed
```

---

## File Placement Rules

### When Adding a New Plan

1. **Identify the project** from the plan's content (look for project names, file paths, feature references)
2. **Place in existing folder** if project folder exists
3. **Create new folder** if project is new (use kebab-case: `project-name/`)
4. **Use `meta/`** for cross-project or general planning documents

### Project Identification Hints

| Keywords/Paths in Document | Project Folder |
|---------------------------|----------------|
| `Neuman Brain`, `useStore`, `widgets`, `Dashboard`, `src/pages` | `neuman-brain/` |
| `OakStone`, `rental`, `property`, `Astro`, `Decap CMS` | `oakstone-properties/` |
| `thedeadrobot`, `TDR`, `X automation`, `Post-to-X`, `GitHub Actions` | `thedeadrobot/` |
| `LZG`, `Lazy Golfing`, `rounds`, `golf`, `lzghome`, `lzgbackend` | `lazy-golfing/` |
| `Notability`, `.note`, `OneNote`, `notebooks migration` | `notes-migration/` |
| `.claude/`, `skills`, `CLAUDE.md optimization`, `context reduction` | `claude-config/` |
| Cross-project, task inventory, general workflow | `meta/` |

---

## Naming Conventions

### Plan Files
- Use the auto-generated creative names (e.g., `velvet-brewing-sun.md`)
- Or use descriptive names: `feature-name-plan.md`, `phase-2-implementation.md`
- Prefix with date if time-sensitive: `2025-12-feature-plan.md`

### Project Folders
- Use kebab-case: `project-name/`
- Match the project's common reference name
- Keep names short but recognizable

---

## When to Store Plans Here vs. In Project Repo

### Store HERE (in `.claude/plans/`) when:
- Plan is exploratory and may not be implemented
- You want to keep the project repo clean
- Plan references multiple external systems
- Plan is for personal reference, not team collaboration

### Store IN PROJECT REPO when:
- Plan will be actively tracked by the team
- Plan relates to a specific PR or feature branch
- Plan needs version control alongside code changes
- Project has its own `tasks/` or `.planning/` directory

---

## Maintenance

### Quarterly Review
- Archive completed plans to `~/.claude/.archive/plans/`
- Update project folder list if new projects added
- Consolidate related plans if they've grown stale

### When a Project Completes
- Move plans to `~/.claude/.archive/plans/`
- Or delete if no longer needed for reference

### Archive Location
All archived content goes to the centralized `~/.claude/.archive/` folder:
- `~/.claude/.archive/plans/` - Completed plan files
- `~/.claude/.archive/project-*` - Historical project snapshots

---

## Quick Reference: Current Projects

| Folder | Description | Active? |
|--------|-------------|---------|
| `neuman-brain/` | Personal productivity platform (React/TypeScript) | Yes |
| `oakstone-properties/` | Rental property website (Astro/Tailwind) | Yes |
| `thedeadrobot/` | Portfolio + X automation | Yes |
| `lazy-golfing/` | Golf platform (Next.js) | Yes |
| `notes-migration/` | One-time migration project | Paused |
| `claude-config/` | This .claude folder optimization | Ongoing |
| `meta/` | General/cross-project docs | Always |
