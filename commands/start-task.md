---
description: Intelligent task router - analyzes your request and automatically routes to optimal workflow
arguments:
  - name: task_description
    description: "What you want to accomplish. Natural language - just describe it."
    required: false
---

# Start Task - Intelligent Workflow Router

Analyzes ANY prompt and automatically routes to the optimal execution strategy.

**No special keywords required.** Just describe what you want naturally.

---

## Execution Protocol

When this command is invoked, IMMEDIATELY perform these steps:

### Step 1: Check for Active GSD Project

```bash
[ -f .planning/STATE.md ] && echo "ACTIVE_GSD_PROJECT"
```

**If active GSD project exists:**
- Route to `/gsd:progress` (it will show status and suggest next action)
- The GSD system handles everything from there

**If no active project, continue to Step 2.**

### Step 2: Analyze Task Complexity

Evaluate the task description: `{{task_description}}`

**Complexity Scoring:**

| Signal | Points | Examples |
|--------|--------|----------|
| Multiple components/systems | +3 | "API and frontend", "database and UI" |
| Multiple steps implied | +2 | "first... then...", "set up... configure... deploy" |
| New feature/system | +3 | "build", "create", "implement", "add [feature]" |
| Architecture/design work | +2 | "design", "architect", "structure" |
| Cross-cutting concerns | +2 | "refactor", "migrate", "upgrade" |
| Research required | +1 | "figure out", "explore", "investigate options" |
| Bug/issue (singular) | -1 | "fix the bug", "resolve the error" |
| Single file mentioned | -2 | "update README", "fix typo in X" |
| Quick/small qualifier | -2 | "quick", "small", "minor", "simple" |

**Thresholds:**
- **Score ≥ 3** → GSD (multi-phase project management)
- **Score 1-2** → Planning or direct execution with TodoWrite
- **Score ≤ 0** → Direct execution (simple task)

### Step 3: Route to Optimal Workflow

**GSD Route (Score ≥ 3):**
```
Invoke: /gsd:new-project
```
The GSD system will:
- Gather context through discussion
- Create PROJECT.md and roadmap
- Break into phases with PLAN.md files
- Track state across sessions

**Planning Route (Score 1-2):**
- Use `EnterPlanMode` for approval-gated planning
- OR execute directly with `TodoWrite` tracking
- Invoke relevant skills based on task type

**Direct Route (Score ≤ 0):**
- Execute immediately in current context
- No formal planning needed
- Simple TodoWrite tracking if multiple steps

### Step 4: Invoke Appropriate Skills

Based on task analysis, ALSO invoke relevant skills:

| Task Type | Skill to Load |
|-----------|---------------|
| Debugging | `Skill(debug-like-expert)` |
| UI/Visual | `Skill(frontend-enhancer)` |
| Code review | `Skill(generic-code-reviewer)` |
| Testing | `Skill(test-specialist)` |
| Documentation | `Skill(codebase-documenter)` |

---

## Examples (Natural Language → Route)

| User Says | Analysis | Route |
|-----------|----------|-------|
| "I need to add user authentication to my app" | New feature, multiple components (+6) | `/gsd:new-project` |
| "Build a dashboard with charts and filters" | New feature, multiple components (+6) | `/gsd:new-project` |
| "Refactor the payment system" | Cross-cutting, multiple files (+4) | `/gsd:new-project` |
| "Set up CI/CD pipeline" | Multiple steps, new system (+5) | `/gsd:new-project` |
| "Add dark mode" | New feature, cross-cutting (+4) | `/gsd:new-project` |
| "Fix the login bug" | Single issue (-1), bug fix (+0) | Direct + debug skill |
| "Update the README" | Single file (-2) | Direct execution |
| "Add a comment to this function" | Single file, simple (-3) | Direct execution |
| "Check project status" | Meta-task | `/gsd:progress` |

---

## Decision Framework Routing

If the task involves making a decision (not implementation):

| Decision Type | Route |
|---------------|-------|
| Technical choice between options | `/taches-cc-resources:consider/first-principles` |
| What to prioritize | `/taches-cc-resources:consider/eisenhower-matrix` |
| Understanding consequences | `/taches-cc-resources:consider/second-order` |
| Root cause analysis | `/taches-cc-resources:consider/5-whys` |

---

## Empty Task Handling

If `{{task_description}}` is empty:

1. Check for active GSD project → `/gsd:progress`
2. Check for existing todos → `/taches-cc-resources:check-todos`
3. If nothing pending → Ask user what they want to work on

---

## Core Principle

**GSD is the default for real work.** Most tasks that require more than a quick edit benefit from:
- Structured phases
- Persistent state (STATE.md)
- Clear planning (PLAN.md)
- Progress tracking

Only bypass GSD for genuinely trivial tasks (typos, single-line fixes, quick lookups).

---

## Integration

This command integrates with:
- **GSD System** (`~/.claude/commands/gsd/`) - Multi-phase project management
- **Taches Resources** (`~/.claude/plugins/marketplaces/taches-cc-resources/`) - Skills, frameworks
- **Local Skills** (`~/.claude/skills/`) - Domain-specific expertise
- **CLAUDE.md** (`~/.claude/CLAUDE.md`) - Core rules and standards
