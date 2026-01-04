# Routing Logic Reference

Load this file for complexity scoring and route selection.

## Complexity Scoring

| Signal | Points | Examples |
|--------|--------|----------|
| Multiple components/systems | +3 | "API and frontend", "database and UI" |
| Multiple steps implied | +2 | "first... then...", "set up... configure... deploy" |
| New feature/system | +3 | "build", "create", "implement", "add [feature]" |
| Architecture/design work | +2 | "design", "architect", "structure" |
| Cross-cutting concerns | +2 | "refactor", "migrate", "upgrade" |
| Research required | +1 | "figure out", "explore", "investigate options" |
| Scientific/specialized | +2 | Any scientific domain detected |
| Bug/issue (singular) | -1 | "fix the bug", "resolve the error" |
| Single file mentioned | -2 | "update README", "fix typo in X" |
| Quick/small qualifier | -2 | "quick", "small", "minor", "simple" |

## Routing Thresholds

| Score | Route | Action |
|-------|-------|--------|
| >= 5 | **GSD Route** | Invoke `/gsd:new-project` |
| 3-4 | **Auto-Claude Route** (if well-defined) | Suggest `/auto-claude` |
| 3-4 | **Planning Route** (if exploratory) | Use `EnterPlanMode` |
| 1-2 | **Planning Route** | Use `EnterPlanMode` |
| <= 0 | **Direct Route** | Execute immediately |

**Note on 3-4 complexity:**
- Well-defined feature + established codebase → **Suggest Auto-Claude**
- Exploratory/unclear requirements → **Use EnterPlanMode**
- User choice always honored

## Auto-Claude Route (Score 3-4, Well-Defined)

Autonomous multi-agent implementation:
1. Suggest `/auto-claude [description]` to user
2. If user accepts:
   - Auto-Claude analyzes codebase
   - Generates implementation spec
   - Creates isolated git worktree
   - Autonomous implementation with QA loops
3. If user declines, fall back to EnterPlanMode

**When to suggest:**
- Clear, well-defined requirements
- Established codebase with patterns
- Multiple files/components involved
- User prefers autonomous vs step-by-step

**When NOT to suggest:**
- Greenfield projects
- Exploratory/research tasks
- User explicitly requests manual control

See `docs/AUTO-CLAUDE-GUIDE.md` for full documentation.

---

## GSD Route (Score >= 5)

Multi-phase project management:
1. Invoke `/gsd:new-project` with task description
2. GSD gathers context through discussion
3. Creates PROJECT.md and roadmap
4. Breaks into phases with PLAN.md files
5. Tracks state across sessions

## Planning Route (Score 1-2)

Approval-gated planning:
1. Use `EnterPlanMode`
2. Create plan with loaded skills as context
3. Execute with `TodoWrite` tracking
4. Use loaded agents via `Task` tool

## Direct Route (Score <= 0)

Immediate execution:
1. Execute using loaded skills as guidance
2. Use `TodoWrite` if multiple steps
3. Invoke domain agent if deep expertise needed

## Post-Work Automation

After completing code changes:

| Trigger | Action |
|---------|--------|
| Code written/modified | `Task` with `pr-review-toolkit:code-reviewer` |
| Complex code added | `Task` with `pr-review-toolkit:code-simplifier` |
| Types/interfaces created | `Task` with `pr-review-toolkit:type-design-analyzer` |
| Error handling added | `Task` with `pr-review-toolkit:silent-failure-hunter` |
| Tests needed | `Task` with `pr-review-toolkit:pr-test-analyzer` |
| Ready to commit | `/commit-commands:commit` |
