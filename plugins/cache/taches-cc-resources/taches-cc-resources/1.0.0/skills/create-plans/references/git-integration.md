# Git Integration Reference

## Core Principle

**Commit outcomes, not process.**

The git log should read like a changelog of what shipped, not a diary of planning activity.

## Commit Points (Only 3)

| Event | Commit? | Why |
|-------|---------|-----|
| BRIEF + ROADMAP created | YES | Project initialization |
| PLAN.md created | NO | Intermediate - commit with completion |
| RESEARCH.md created | NO | Intermediate |
| FINDINGS.md created | NO | Intermediate |
| **Phase completed** | YES | Actual code shipped |
| Handoff created | YES | WIP state preserved |

## Git Check on Invocation

```bash
git rev-parse --git-dir 2>/dev/null || echo "NO_GIT_REPO"
```

If NO_GIT_REPO:
- Inline: "No git repo found. Initialize one? (Recommended for version control)"
- If yes: `git init`

## Commit Message Formats

### 1. Project Initialization (brief + roadmap together)

```
docs: initialize [project-name] ([N] phases)

[One-liner from BRIEF.md]

Phases:
1. [phase-name]: [goal]
2. [phase-name]: [goal]
3. [phase-name]: [goal]
```

What to commit:
```bash
git add .planning/
git commit
```

### 2. Phase Completion

```
feat([domain]): [one-liner from SUMMARY.md]

- [Key accomplishment 1]
- [Key accomplishment 2]
- [Key accomplishment 3]

[If issues encountered:]
Note: [issue and resolution]
```

Use `fix([domain])` for bug fix phases.

What to commit:
```bash
git add .planning/phases/XX-name/  # PLAN.md + SUMMARY.md
git add src/                        # Actual code created
git commit
```

### 3. Handoff (WIP)

```
wip: [phase-name] paused at task [X]/[Y]

Current: [task name]
[If blocked:] Blocked: [reason]
```

What to commit:
```bash
git add .planning/
git commit
```

## Example Clean Git Log

```
a]7f2d1 feat(checkout): Stripe payments with webhook verification
b]3e9c4 feat(products): catalog with search, filters, and pagination
c]8a1b2 feat(auth): JWT with refresh rotation using jose
d]5c3d7 feat(foundation): Next.js 15 + Prisma + Tailwind scaffold
e]2f4a8 docs: initialize ecommerce-app (5 phases)
```

## What NOT To Commit Separately

- PLAN.md creation (wait for phase completion)
- RESEARCH.md (intermediate)
- FINDINGS.md (intermediate)
- Minor planning tweaks
- "Fixed typo in roadmap"

These create noise. Commit outcomes, not process.
