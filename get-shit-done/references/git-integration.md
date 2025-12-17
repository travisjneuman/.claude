<overview>
Git integration for GSD framework.
</overview>

<core_principle>

**Commit outcomes, not process.**

The git log should read like a changelog of what shipped, not a diary of planning activity.
</core_principle>

<commit_points>

| Event                   | Commit? | Why                                   |
| ----------------------- | ------- | ------------------------------------- |
| BRIEF + ROADMAP created | YES     | Project initialization                |
| PLAN.md created         | NO      | Intermediate - commit with completion |
| RESEARCH.md created     | NO      | Intermediate                          |
| DISCOVERY.md created    | NO      | Intermediate                          |
| **Phase completed**     | YES     | Actual code shipped                   |
| Handoff created         | YES     | WIP state preserved                   |

</commit_points>

<git_check>

```bash
[ -d .git ] && echo "GIT_EXISTS" || echo "NO_GIT"
```

If NO_GIT: Run `git init` silently. GSD projects always get their own repo.
</git_check>

<commit_formats>

<format name="initialization">
## Project Initialization (brief + roadmap together)

```
docs: initialize [project-name] ([N] phases)

[One-liner from PROJECT.md]

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

</format>

<format name="phase-completion">
## Phase Completion

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

</format>

<format name="handoff">
## Handoff (WIP)

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

</format>
</commit_formats>

<example_log>

```
a]7f2d1 feat(checkout): Stripe payments with webhook verification
b]3e9c4 feat(products): catalog with search, filters, and pagination
c]8a1b2 feat(auth): JWT with refresh rotation using jose
d]5c3d7 feat(foundation): Next.js 15 + Prisma + Tailwind scaffold
e]2f4a8 docs: initialize ecommerce-app (5 phases)
```

</example_log>

<anti_patterns>

- PLAN.md creation (wait for phase completion)
- RESEARCH.md (intermediate)
- DISCOVERY.md (intermediate)
- Minor planning tweaks
- "Fixed typo in roadmap"

These create noise. Commit outcomes, not process.
</anti_patterns>
