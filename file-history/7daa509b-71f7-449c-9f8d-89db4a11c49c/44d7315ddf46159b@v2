# Plan: Create Workspace CLAUDE.md File

## Task
Create a navigation-focused CLAUDE.md file for the `_meta.notes` folder that helps Claude understand the workspace structure and how to navigate it effectively.

## Target File
`D:\Proton Drive\My files\Documents\Professional\Programming\Web Development\_meta.notes\CLAUDE.md`

## Approach: Navigation Focus
Per user preference, the file will:
- Emphasize workspace navigation and discovery
- Provide minimal project details (refer to project files for depth)
- Focus on _meta.notes structure and conventions
- Explain how to find things quickly

## Content Structure

```markdown
# _meta.notes — Workspace Documentation Hub

## Purpose
Brief explanation of this Obsidian vault's role as the central documentation hub.

## Scope
- ONLY edit documentation inside _meta.notes
- Code changes belong in project directories with their own CLAUDE.md
- This workspace contains multiple independent projects

## Quick Navigation

### Find a Project
- `Projects/*.md` - Project metadata and status
- `Home.md` - Dashboard with project table

### Find Documentation
- `Concepts/*.md` - Technology knowledge base
- `Decisions/*.md` - Architecture Decision Records (ADR)
- `Snippets/*.md` - Reusable code examples

### Find Templates
- `Templates/*.md` - Project, Feature Spec, Bug Report, etc.

### Track Work
- `Dashboards/Active Projects.md` - Dataview project overview
- `Dashboards/Task Master.md` - Tasks plugin integration
- `Journal/*.md` - Daily work logs

## Projects Overview (Minimal)

| Directory | Project | Status |
|-----------|---------|--------|
| system.knowledgebase | Neuman Brain | Active |
| .lzg_platform/Lazy Golfing | Lazy Golfing | Alpha |
| tjn.portfolio | TJN Portfolio | Maintenance |
| tdr.portfolio | The Dead Robot | Live |
| tjn.home | TJN Home | Stable |
| tkl.home | Toker League | Maintenance |

→ See `Projects/<name>.md` for details

## File Conventions

### Project Metadata
All project files use YAML frontmatter:
- `type: project`
- `status: active|alpha|maintenance|stable|live|incubating`
- `priority: P0|P1|P2|P3`
- `tech-stack: [list]`
- `repo-path: folder-name`
- `live-url: https://...`

### Obsidian Links
Use `[[wikilinks]]` for internal navigation.

## CLAUDE.md Hierarchy
1. `~/.claude/CLAUDE.md` — Global rules (all projects)
2. `.claude/CLAUDE.md` — Workspace rules
3. `<project>/CLAUDE.md` — Project-specific rules
4. `<project>/src/<folder>/CLAUDE.md` — Folder patterns

## What NOT to Do Here
- Do NOT edit code files
- Do NOT modify project configurations
- Do NOT make commits from _meta.notes
- Changes here are documentation-only
```

## Implementation

1. Write the CLAUDE.md file to `_meta.notes/CLAUDE.md`
2. Keep it lean (~80-100 lines)
3. Focus on "how to find things" over "what things are"

## Verification
- [ ] File is navigation-focused
- [ ] Project details are minimal (table only)
- [ ] Clear scope boundaries defined
- [ ] Obsidian conventions documented
- [ ] Links to detailed project files
