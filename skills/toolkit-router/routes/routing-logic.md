# Routing Logic Reference

Load this file for complexity scoring and route selection.

## Complexity Scoring

| Signal                      | Points | Examples                                            |
| --------------------------- | ------ | --------------------------------------------------- |
| Multiple components/systems | +3     | "API and frontend", "database and UI"               |
| Multiple steps implied      | +2     | "first... then...", "set up... configure... deploy" |
| New feature/system          | +3     | "build", "create", "implement", "add [feature]"     |
| Architecture/design work    | +2     | "design", "architect", "structure"                  |
| Cross-cutting concerns      | +2     | "refactor", "migrate", "upgrade"                    |
| Research required           | +1     | "figure out", "explore", "investigate options"      |
| Scientific/specialized      | +2     | Any scientific domain detected                      |
| Bug/issue (singular)        | -1     | "fix the bug", "resolve the error"                  |
| Single file mentioned       | -2     | "update README", "fix typo in X"                    |
| Quick/small qualifier       | -2     | "quick", "small", "minor", "simple"                 |

## Routing Thresholds

| Score | Route                                   | Action                    |
| ----- | --------------------------------------- | ------------------------- |
| >= 5  | **Phased Planning Route**               | Use `EnterPlanMode`, split into phases |
| 3-4   | **Direct Route** (if well-defined)      | Execute with `TodoWrite`  |
| 3-4   | **Planning Route** (if exploratory)     | Use `EnterPlanMode`       |
| 1-2   | **Direct Route**                        | Execute; plan mode only if genuinely ambiguous |
| <= 0  | **Direct Route**                        | Execute immediately       |

**Note on 3-4 complexity:**

- Well-defined feature + established codebase → **Execute directly** (plan mode only if a choice is genuinely open)
- Exploratory/unclear requirements → **Use EnterPlanMode**
- User choice always honored

## Removed: Auto-Claude Route

`/auto-claude` and its worktree-based autonomous route were removed from the toolkit (its guide is gone and worktrees conflict with the canonical-checkout rule). Route well-defined 3-4 work directly, or delegate independent pieces to subagents in the same checkout.

---

## Phased Planning Route (Score >= 5)

Multi-phase work:

1. Use `EnterPlanMode` with the task description
2. Break the work into phases, one task file per phase in `tasks/`
3. Execute one phase at a time with `TodoWrite` tracking
4. Commit at the end of each phase so a later session can resume from git history and the task files

## Planning Route (exploratory or genuinely ambiguous work)

Approval-gated planning (`~/.claude/CLAUDE.md`: a diff you can describe in a sentence doesn't need a plan):

1. Use `EnterPlanMode`
2. Create plan with loaded skills as context
3. Execute with `TodoWrite` tracking
4. Use loaded agents via `Task` tool

## Direct Route (Score <= 2, or well-defined 3-4)

Immediate execution:

1. Execute using loaded skills as guidance
2. Use `TodoWrite` if multiple steps
3. Invoke domain agent if deep expertise needed

## Post-Work Automation

After completing code changes (validate by review; no tests unless the user asks):

| Trigger                  | Action                                                                 |
| ------------------------ | ---------------------------------------------------------------------- |
| Code written/modified    | Review the whole diff yourself; for a deeper pass, `deep-code-reviewer` agent or `/review-code` |
| Complex code added       | `simplify` skill                                                       |
| Security-sensitive code  | `security-auditor` agent                                               |
| Tests explicitly requested | `test-specialist` skill (only on the user's request for that scope)  |
| Ready to commit          | Follow the git workflow in `~/.claude/CLAUDE.md` (the `commit-commands` plugin is off by design) |
