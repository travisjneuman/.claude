---
description: Create roadmap with phases for the project
allowed-tools:
  - Read
  - Write
  - Bash
  - AskUserQuestion
  - Glob
---

<objective>
Create project roadmap, optionally incorporating research findings from /gsd:research-project.

Roadmaps define the phase breakdown - what work happens in what order. This command can be used:
1. After /gsd:new-project (without research)
2. After /gsd:research-project (with domain research incorporated)
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/create-roadmap.md
@~/.claude/get-shit-done/templates/roadmap.md
@~/.claude/get-shit-done/templates/state.md
</execution_context>

<context>
@.planning/PROJECT.md

**Check for research:**
!`ls .planning/research/*.md 2>/dev/null || echo "NO_RESEARCH"`

**Load config:**
@.planning/config.json
</context>

<process>

<step name="validate">
```bash
# Verify project exists
[ -f .planning/PROJECT.md ] || { echo "ERROR: No PROJECT.md found. Run /gsd:new-project first."; exit 1; }
```
</step>

<step name="check_existing">
Check if roadmap already exists:

```bash
[ -f .planning/ROADMAP.md ] && echo "ROADMAP_EXISTS" || echo "NO_ROADMAP"
```

**If ROADMAP_EXISTS:**
Use AskUserQuestion:
- header: "Roadmap exists"
- question: "A roadmap already exists. What would you like to do?"
- options:
  - "View existing" - Show current roadmap
  - "Replace" - Create new roadmap (will overwrite)
  - "Cancel" - Keep existing roadmap

If "View existing": `cat .planning/ROADMAP.md` and exit
If "Cancel": Exit
If "Replace": Continue with workflow
</step>

<step name="check_research">
Check for project research:

```bash
ls .planning/research/*.md 2>/dev/null
```

**If research found:**
Load and summarize each research file:
- ecosystem.md → Key libraries/frameworks recommended
- architecture.md → Architectural patterns to follow
- pitfalls.md → Top 2-3 critical pitfalls to avoid
- standards.md → Standards and conventions to follow

Present summary:
```
Found project research:

Ecosystem: [key libraries/frameworks]
Architecture: [key patterns]
Pitfalls: [top 2-3 to avoid]
Standards: [key conventions]

This will inform phase structure.
```

**If no research found:**
```
No project research found.
Creating roadmap based on PROJECT.md alone.
(Optional: Run /gsd:research-project first for niche/complex domains)
```
</step>

<step name="create_roadmap">
Follow the create-roadmap.md workflow starting from detect_domain step.

The workflow handles:
- Domain expertise detection
- Phase identification (informed by research if present)
- Research flags for each phase
- Confirmation gates (respecting config mode)
- ROADMAP.md creation
- STATE.md initialization
- Phase directory creation
- Git commit
</step>

<step name="done">
```
Roadmap created:
- Roadmap: .planning/ROADMAP.md
- State: .planning/STATE.md
- [N] phases defined

## To Continue

Run `/clear`, then paste one of:

**To discuss Phase 1 context first:**
```
/gsd:discuss-phase 1
```

**To plan Phase 1 directly:**
```
/gsd:plan-phase 1
```
```
</step>

</process>

<output>
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/phases/XX-name/` directories
</output>

<success_criteria>
- [ ] PROJECT.md validated
- [ ] Research incorporated if present
- [ ] ROADMAP.md created with phases
- [ ] STATE.md initialized
- [ ] Phase directories created
- [ ] Changes committed
</success_criteria>
