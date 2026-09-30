---
name: core-workflow
description: Detailed development workflow patterns, checklists, and standards. Auto-loads for complex tasks, planning, debugging, or when explicit patterns are needed. Contains session protocols, git conventions, security checklists, review-based validation, and communication standards.
---

# Core Workflow Patterns

Comprehensive development workflow reference. This loads on-demand for detailed patterns.

**Quick links to rules:** `~/.claude/rules/` for stack-specific and task-type checklists.

---

## Session Protocol

### Start Checklist

```bash
# 1. Sync first: default branch from origin/HEAD, fetch + prune, fast-forward
git fetch --prune origin && git merge --ff-only "$(git symbolic-ref --short refs/remotes/origin/HEAD)"

# 2. Get context
git log -3

# 3. Check for existing work
ls tasks/*.md 2>/dev/null || echo "No active tasks"
```

Take today's date from the environment context rather than inferring it.

### End Checklist

```bash
# 1. Verify by review: re-read the request and the whole diff (no test/type-check ladder)

# 2. Archive completed work
mv tasks/<completed-task>.md .archive/completed-tasks/

# 3. Commit with comprehensive message
git add -A  # all pending changes, any session's
git commit  # See Git Conventions below
git push    # or the configured push runner, when one is defined; never force
```

**Stop any dev server you started:** `lsof -ti:PORT | xargs kill` (or Windows equivalent)

---

## GSD (Get Shit Done) - Multi-Phase Projects

For complex features spanning days/weeks, use **GSD**.

### When to Use GSD

| Complexity                 | Use GSD? | Workflow              |
| -------------------------- | -------- | --------------------- |
| Simple fix (<30 min)       | No       | Direct execution      |
| Single feature (30min-2hr) | No       | Task file + TodoWrite |
| Multi-phase feature (days) | **Yes**  | GSD workflow          |
| New project/app            | **Yes**  | GSD from start        |

### GSD Quick Start

```bash
/gsd-core:new-project       # Initialize with brief + config
/gsd-core:create-roadmap    # Create phases and state tracking
/gsd-core:plan-phase 1      # Create detailed plan for phase
/gsd-core:execute-plan <path>  # Execute the plan
```

### GSD Commands Reference

| Command                            | Purpose                            |
| ---------------------------------- | ---------------------------------- |
| `/gsd-core:progress`                    | Check status, route to next action |
| `/gsd-core:resume-work`                 | Resume from previous session       |
| `/gsd-core:pause-work`                  | Create handoff when pausing        |
| `/gsd-core:plan-phase <n>`              | Create detailed phase plan         |
| `/gsd-core:execute-plan <path>`         | Execute a PLAN.md                  |
| `/gsd-core:add-phase <desc>`            | Add phase to roadmap               |
| `/gsd-core:insert-phase <after> <desc>` | Insert urgent work                 |
| `/gsd-core:complete-milestone <ver>`    | Archive and tag release            |
| `/gsd-core:help`                        | Full command reference             |

### GSD File Structure

```
.planning/
├── PROJECT.md          # Vision and requirements
├── ROADMAP.md          # Phase breakdown
├── STATE.md            # Project memory (context accumulation)
├── config.json         # Workflow mode (interactive/yolo)
└── phases/
    └── 01-foundation/
        ├── 01-01-PLAN.md
        └── 01-01-SUMMARY.md
```

---

## Git Conventions

### Commit Types

`feat` | `fix` | `refactor` | `perf` | `test` | `docs` | `chore`

### Commit Message Format

```
type: Short summary (50 chars max)

## What Changed
- File X: Added feature Y
- File Z: Updated config for A

## Why
- User requested feature Y
- Config A needed update

## Verification
- Diff reviewed against the request, callers, and edge cases
```

### Auto-Commit on Task Completion

**When a task or plan is complete, automatically commit without being asked.**

#### Pre-Commit Checks

```bash
# 1. Check this is a user-owned repo (not external)
git remote get-url origin | grep -q "travisjneuman" && echo "OK: User repo"

# 2. Check push is not blocked
git remote get-url --push origin | grep -q "no_push" && echo "SKIP: External repo"
```

#### Rules

| Condition                    | Action                       |
| ---------------------------- | ---------------------------- |
| User's own repo              | Auto-commit + push           |
| External repo (`no_push`)    | **Never commit** - read-only |
| Submodule (external)         | **Never commit** - read-only |
| Uncommitted secrets detected | **Block** - warn user        |

---

## Security Checklist

### Frontend

- [ ] `textContent` not `innerHTML`
- [ ] `unknown` type for external data
- [ ] No exposed API keys
- [ ] HTTPS for external requests
- [ ] Input sanitization

### Backend

- [ ] Input validation on all endpoints
- [ ] Auth guards on protected routes
- [ ] Parameterized queries (no raw SQL)
- [ ] Secrets in environment variables

---

## Performance Targets

| Metric                 | Target          |
| ---------------------- | --------------- |
| Initial bundle         | <100KB gzipped  |
| Page load              | <1s             |
| Interaction latency    | <100ms          |
| Lighthouse Performance | 95+             |
| Accessibility          | WCAG AA minimum |

---

## Accessibility (WCAG AA)

- [ ] Semantic HTML structure
- [ ] Alt text for meaningful images
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Color contrast >= 4.5:1
- [ ] ARIA labels on interactive elements
- [ ] Touch targets >= 44x44px

---

## Thinking Frameworks

Use structured decision-making for complex choices:

| Decision Type          | Framework                     |
| ---------------------- | ----------------------------- |
| Long-term implications | `/consider:10-10-10`          |
| Root cause analysis    | `/consider:5-whys`            |
| Prioritization         | `/consider:eisenhower-matrix` |
| Innovation             | `/consider:first-principles`  |
| Risk identification    | `/consider:inversion`         |
| Simplification         | `/consider:occams-razor`      |
| Focus                  | `/consider:one-thing`         |
| Tradeoffs              | `/consider:opportunity-cost`  |
| Optimization           | `/consider:pareto`            |
| Consequences           | `/consider:second-order`      |

---

## Debugging Protocol

### Standard Issues

1. Reproduce the issue
2. Read relevant code
3. Identify root cause
4. Fix the root cause
5. Verify by review of the diff and the output the fix already produces

### Intermittent/Complex Issues

Use the `debug-systematic` skill for a systematic approach.

---

## Build vs Buy Philosophy

**We build features. We use utilities.**

- **Build:** All feature logic, business rules, UI/UX, data models
- **Use:** Low-level abstractions (D3, Recharts, Lexical, Konva)
- **Criterion:** We own the feature, library handles complexity

### License Requirements

- **Must use:** MIT, Apache 2.0, BSD
- **Never use:** GPL, AGPL (blocks commercialization)

---

## Communication Standards

### Progress Updates

Give high-level updates, not spam:

"Added authentication middleware (3 files) and updated the user store with the new
fields; now reviewing the login flow."

### When to Ask

Use `AskUserQuestion` only when:

- An essential choice is missing and changes the outcome
- Instructions conflict and precedence doesn't settle it
- A destructive or external target can't be identified exactly
- The step needs authority the request didn't give

Otherwise pick the reasonable option, proceed, and state the assumption.

### Directness Protocol

- Logic over feelings
- Correctness over validation
- Direct feedback over diplomacy
- Best solution over agreement

---

## Context Hygiene

### Reduce Token Usage

- Short, high-signal summaries over long logs
- Don't `@`-embed large docs by default
- Reference paths + when to read them
- Use `/clear` after completing work units

### Delegation Patterns

| Situation            | Action                                    |
| -------------------- | ----------------------------------------- |
| Context >100k tokens | Create prompt → delegate to fresh context |
| Moderate complexity  | `/create-prompt` → `/run-prompt`          |
| Multi-stage features | `/create-meta-prompt`                     |
| Approaching limits   | `/whats-next` for handoff document        |

---

## Quick Reference

### Common Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run test         # Run tests (only when the user asks)
npm run type-check   # TypeScript check (only when the user asks)
```

### File Naming

| Type       | Convention | Example         |
| ---------- | ---------- | --------------- |
| Components | PascalCase | `UserCard.tsx`  |
| Hooks      | use prefix | `useAuth.ts`    |
| Utilities  | camelCase  | `utils.ts`      |
| Tests      | .test.ts   | `utils.test.ts` |

---

## Resources

### Official

- [Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code)
- [Anthropic Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)

### Community

- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [awesome-claude-md](https://github.com/josix/awesome-claude-md)

---

## See Also

- `~/.claude/docs/reference/checklists/` - Task-type specific checklists
- `~/.claude/docs/reference/stacks/` - Stack-specific patterns
- `~/.claude/docs/reference/tooling/` - Tool configuration guides
- `~/.claude/skills/MASTER_INDEX.md` - Full skills catalog
- `~/.claude/agents/README.md` - Agents directory
