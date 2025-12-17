# Scope Estimation & Quality-Driven Plan Splitting

Plans must maintain consistent quality from first task to last. This requires understanding the **quality degradation curve** and splitting aggressively to stay in the peak quality zone.

## The Quality Degradation Curve

**Critical insight:** Claude doesn't degrade at arbitrary percentages - it degrades when it *perceives* context pressure and enters "completion mode."

```
Context Usage  │  Quality Level   │  Claude's Mental State
─────────────────────────────────────────────────────────
0-30%          │  ████████ PEAK   │  "I can be thorough and comprehensive"
               │                  │  No anxiety, full detail, best work

30-50%         │  ██████ GOOD     │  "Still have room, maintaining quality"
               │                  │  Engaged, confident, solid work

50-70%         │  ███ DEGRADING   │  "Getting tight, need to be efficient"
               │                  │  Efficiency mode, compression begins

70%+           │  █ POOR          │  "Running out, must finish quickly"
               │                  │  Self-lobotomization, rushed, minimal
```

**The 40-50% inflection point:**

This is where quality breaks. Claude sees context mounting and thinks "I'd better conserve now or I won't finish." Result: The classic mid-execution statement "I'll complete the remaining tasks more concisely" = quality crash.

**The fundamental rule:** Stop BEFORE quality degrades, not at context limit.

## Target: 50% Context Maximum

**Plans should complete within ~50% of context usage.**

Why 50% not 80%?
- Huge safety buffer
- No context anxiety possible
- Quality maintained from start to finish
- Room for unexpected complexity
- Space for iteration and fixes

**If you target 80%, you're planning for failure.** By the time you hit 80%, you've already spent 40% in degradation mode.

## The 2-3 Task Rule

**Each plan should contain 2-3 tasks maximum.**

Why this number?

**Task 1 (0-15% context):**
- Fresh context
- Peak quality
- Comprehensive implementation
- Full testing
- Complete documentation

**Task 2 (15-35% context):**
- Still in peak zone
- Quality maintained
- Buffer feels safe
- No anxiety

**Task 3 (35-50% context):**
- Beginning to feel pressure
- Quality still good but managing it
- Natural stopping point
- Better to commit here

**Task 4+ (50%+ context):**
- DEGRADATION ZONE
- "I'll do this concisely" appears
- Quality crashes
- Should have split before this

**The principle:** Each task is independently committable. 2-3 focused changes per commit creates beautiful, surgical git history.

## Signals to Split Into Multiple Plans

### Always Split If:

**1. More than 3 tasks**
- Even if tasks seem small
- Each additional task increases degradation risk
- Split into logical groups of 2-3

**2. Multiple subsystems**
```
❌ Bad (1 plan):
- Database schema (3 files)
- API routes (5 files)
- UI components (8 files)
Total: 16 files, 1 plan → guaranteed degradation

✅ Good (3 plans):
- 01-01-PLAN.md: Database schema (3 files, 2 tasks)
- 01-02-PLAN.md: API routes (5 files, 3 tasks)
- 01-03-PLAN.md: UI components (8 files, 3 tasks)
Total: 16 files, 3 plans → consistent quality
```

**3. Any task with >5 file modifications**
- Large tasks burn context fast
- Split by file groups or logical units
- Better: 3 plans of 2 files each vs 1 plan of 6 files

**4. Checkpoint + implementation work**
- Checkpoints require user interaction (context preserved)
- Implementation after checkpoint should be separate plan
```
✅ Good split:
- 02-01-PLAN.md: Setup (checkpoint: decision on auth provider)
- 02-02-PLAN.md: Implement chosen auth solution
```

**5. Research + implementation**
- Research produces FINDINGS.md (separate plan)
- Implementation consumes FINDINGS.md (separate plan)
- Clear boundary, clean handoff

### Consider Splitting If:

**1. Estimated >5 files modified total**
- Context from reading existing code
- Context from diffs
- Context from responses
- Adds up faster than expected

**2. Complex domains (auth, payments, data modeling)**
- These require careful thinking
- Burns more context per task than simple CRUD
- Split more aggressively

**3. Any uncertainty about approach**
- "Figure out X" phase separate from "implement X" phase
- Don't mix exploration and implementation

**4. Natural semantic boundaries**
- Setup → Core → Features
- Backend → Frontend
- Configuration → Implementation → Testing

## Splitting Strategies

### By Subsystem

**Phase:** "Authentication System"

**Split:**
```
- 03-01-PLAN.md: Database models (User, Session tables + relations)
- 03-02-PLAN.md: Auth API (register, login, logout endpoints)
- 03-03-PLAN.md: Protected routes (middleware, JWT validation)
- 03-04-PLAN.md: UI components (login form, registration form)
```

Each plan: 2-3 tasks, single subsystem, clean commits.

### By Dependency

**Phase:** "Payment Integration"

**Split:**
```
- 04-01-PLAN.md: Stripe setup (webhook endpoints via API, env vars, test mode)
- 04-02-PLAN.md: Subscription logic (plans, checkout, customer portal)
- 04-03-PLAN.md: Frontend integration (pricing page, payment flow)
```

Later plans depend on earlier completion. Sequential execution, fresh context each time.

### By Complexity

**Phase:** "Dashboard Buildout"

**Split:**
```
- 05-01-PLAN.md: Layout shell (simple: sidebar, header, routing)
- 05-02-PLAN.md: Data fetching (moderate: TanStack Query setup, API integration)
- 05-03-PLAN.md: Data visualization (complex: charts, tables, real-time updates)
```

Complex work gets its own plan with full context budget.

### By Verification Points

**Phase:** "Deployment Pipeline"

**Split:**
```
- 06-01-PLAN.md: Vercel setup (deploy via CLI, configure domains)
  → Ends with checkpoint:human-verify "check xyz.vercel.app loads"

- 06-02-PLAN.md: Environment config (secrets via CLI, env vars)
  → Autonomous (no checkpoints) → subagent execution

- 06-03-PLAN.md: CI/CD (GitHub Actions, preview deploys)
  → Ends with checkpoint:human-verify "check PR preview works"
```

Verification checkpoints create natural boundaries. Autonomous plans between checkpoints execute via subagent with fresh context.

## Autonomous vs Interactive Plans

**Critical optimization:** Plans without checkpoints don't need main context.

### Autonomous Plans (No Checkpoints)
- Contains only `type="auto"` tasks
- No user interaction needed
- **Execute via subagent with fresh 200k context**
- Impossible to degrade (always starts at 0%)
- Creates SUMMARY, commits, reports back
- Can run in parallel (multiple subagents)

### Interactive Plans (Has Checkpoints)
- Contains `checkpoint:human-verify` or `checkpoint:decision` tasks
- Requires user interaction
- Must execute in main context
- Still target 50% context (2-3 tasks)

**Planning guidance:** If splitting a phase, try to:
- Group autonomous work together (→ subagent)
- Separate interactive work (→ main context)
- Maximize autonomous plans (more fresh contexts)

Example:
```
Phase: Feature X
- 07-01-PLAN.md: Backend (autonomous) → subagent
- 07-02-PLAN.md: Frontend (autonomous) → subagent
- 07-03-PLAN.md: Integration test (has checkpoint:human-verify) → main context
```

Two fresh contexts, one interactive verification. Perfect.

## Anti-Patterns

### ❌ The "Comprehensive Plan" Anti-Pattern

```
Plan: "Complete Authentication System"
Tasks:
1. Database models
2. Migration files
3. Auth API endpoints
4. JWT utilities
5. Protected route middleware
6. Password hashing
7. Login form component
8. Registration form component

Result: 8 tasks, 80%+ context, degradation at task 4-5
```

**Why this fails:**
- Task 1-3: Good quality
- Task 4-5: "I'll do these concisely" = degradation begins
- Task 6-8: Rushed, minimal, poor quality

### ✅ The "Atomic Plan" Pattern

```
Split into 4 plans:

Plan 1: "Auth Database Models" (2 tasks)
- Database schema (User, Session)
- Migration files

Plan 2: "Auth API Core" (3 tasks)
- Register endpoint
- Login endpoint
- JWT utilities

Plan 3: "Auth API Protection" (2 tasks)
- Protected route middleware
- Logout endpoint

Plan 4: "Auth UI Components" (2 tasks)
- Login form
- Registration form
```

**Why this succeeds:**
- Each plan: 2-3 tasks, 30-40% context
- All tasks: Peak quality throughout
- Git history: 4 focused commits
- Easy to verify each piece
- Rollback is surgical

### ❌ The "Efficiency Trap" Anti-Pattern

```
Thinking: "These tasks are small, let's do 6 to be efficient"

Result: Task 1-2 are good, task 3-4 begin degrading, task 5-6 are rushed
```

**Why this fails:** You're optimizing for fewer plans, not quality. The "efficiency" is false - poor quality requires more rework.

### ✅ The "Quality First" Pattern

```
Thinking: "These tasks are small, but let's do 2-3 to guarantee quality"

Result: All tasks peak quality, clean commits, no rework needed
```

**Why this succeeds:** You optimize for quality, which is true efficiency. No rework = faster overall.

## Estimating Context Usage

**Rough heuristics for plan size:**

### File Counts
- 0-3 files modified: Small task (~10-15% context)
- 4-6 files modified: Medium task (~20-30% context)
- 7+ files modified: Large task (~40%+ context) - split this

### Complexity
- Simple CRUD: ~15% per task
- Business logic: ~25% per task
- Complex algorithms: ~40% per task
- Domain modeling: ~35% per task

### 2-Task Plan (Safe)
- 2 simple tasks: ~30% total ✅ Plenty of room
- 2 medium tasks: ~50% total ✅ At target
- 2 complex tasks: ~80% total ❌ Too tight, split

### 3-Task Plan (Risky)
- 3 simple tasks: ~45% total ✅ Good
- 3 medium tasks: ~75% total ⚠️ Pushing it
- 3 complex tasks: 120% total ❌ Impossible, split

**Conservative principle:** When in doubt, split. Better to have an extra plan than degraded quality.

## The Atomic Commit Philosophy

**What we're optimizing for:** Beautiful git history where each commit is:
- Focused (2-3 related changes)
- Complete (fully implemented, tested)
- Documented (clear commit message)
- Reviewable (small enough to understand)
- Revertable (surgical rollback possible)

**Bad git history (large plans):**
```
feat(auth): Complete authentication system
- Added 16 files
- Modified 8 files
- 1200 lines changed
- Contains: models, API, UI, middleware, utilities
```

Impossible to review, hard to understand, can't revert without losing everything.

**Good git history (atomic plans):**
```
feat(auth-01): Add User and Session database models
- Added schema files
- Added migration
- 45 lines changed

feat(auth-02): Implement register and login API endpoints
- Added /api/auth/register
- Added /api/auth/login
- Added JWT utilities
- 120 lines changed

feat(auth-03): Add protected route middleware
- Added middleware/auth.ts
- Added tests
- 60 lines changed

feat(auth-04): Build login and registration forms
- Added LoginForm component
- Added RegisterForm component
- 90 lines changed
```

Each commit tells a story. Each is reviewable. Each is revertable. This is craftsmanship.

## Quality Assurance Through Scope Control

**The guarantee:** When you follow the 2-3 task rule with 50% context target:

1. **Consistency:** First task has same quality as last task
2. **Thoroughness:** No "I'll complete X concisely" degradation
3. **Documentation:** Full context budget for comments/tests
4. **Error handling:** Space for proper validation and edge cases
5. **Testing:** Room for comprehensive test coverage

**The cost:** More plans to manage.

**The benefit:** Consistent excellence. No rework. Clean history. Maintainable code.

**The trade-off is worth it.**

## Summary

**Old way (3-6 tasks, 80% target):**
- Tasks 1-2: Good
- Tasks 3-4: Degrading
- Tasks 5-6: Poor
- Git: Large, unreviewable commits
- Quality: Inconsistent

**New way (2-3 tasks, 50% target):**
- All tasks: Peak quality
- Git: Atomic, surgical commits
- Quality: Consistent excellence
- Autonomous plans: Subagent execution (fresh context)

**The principle:** Aggressive atomicity. More plans, smaller scope, consistent quality.

**The rule:** If in doubt, split. Quality over consolidation. Always.
