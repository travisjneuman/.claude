# Plan: GSD System Integration

**Date:** December 17, 2025
**Scope:** Integrate GSD (Get Shit Done) system into existing /start-task and /run workflows

---

## Findings

### GSD Installation Status: CORRECT

| Component | Location | Status |
|-----------|----------|--------|
| Reference library | `~/.claude/get-shit-done/` | Correct placement |
| Slash commands | `~/.claude/commands/gsd/` | 18 commands installed |
| Templates | `get-shit-done/templates/` | 14 templates |
| Workflows | `get-shit-done/workflows/` | 14 workflows |
| References | `get-shit-done/references/` | 9 reference docs |

**No changes needed to folder structure.**

---

## Integration Design

### Key Insight: Different Systems for Different Scales

| System | Scope | Structure | State |
|--------|-------|-----------|-------|
| Direct execution | <30 min | None | None |
| `/create-prompt` → `/run` | 30min-2hr | `./prompts/` | Stateless |
| `/create-meta-prompt` | 2-8hr | Multi-prompt | Stateless |
| **GSD** | Days/weeks | `.planning/` | STATE.md (persistent) |

### Smart Routing (Auto-Detect & Route Optimally)

The system will automatically detect project type AND complexity:

1. **Project Detection:**
   - `.planning/STATE.md` exists → GSD project
   - `.planning/BRIEF.md` (no STATE.md) → Taches project

2. **Complexity Detection (for new tasks):**
   - Multiple components mentioned → likely GSD
   - Sequential dependencies → likely GSD
   - Large scope indicators ("overhaul", "rewrite") → likely GSD
   - Single component, clear scope → prompt or direct

3. **Optimal Routing:** Route automatically to best system, no user prompt needed

---

## Changes Required

### 1. Enhance `/start-task` (Primary Change)

**File:** `~/.claude/commands/start-task.md`

**Add:**

1. **Pre-routing detection:**
   ```
   IF .planning/STATE.md exists:
     IF no task provided → /gsd:progress
     IF task is project-related → /gsd:progress (will route to next action)
   ```

2. **Smart complexity analysis:**
   - Analyze task for scope signals
   - Auto-route to GSD for multi-phase work
   - Auto-route to prompt for moderate work
   - Auto-route to direct for simple work

3. **New GSD keyword routes:**
   | Keywords | Route To |
   |----------|----------|
   | "new project", "start project" | `/gsd:new-project` |
   | "project status", "project progress" | `/gsd:progress` |
   | "resume", "continue work", "where was I" | `/gsd:progress` |
   | "plan phase", "next phase" | `/gsd:plan-phase` |

### 2. Update `/run` (Minor Note)

**File:** `~/.claude/commands/run.md`

**Add note:** GSD projects use `/gsd:execute-plan` instead of `/run`

### 3. Update GSD Help (Context)

**File:** `~/.claude/commands/gsd/help.md`

**Add section:** Integration with /start-task explaining automatic detection

### 4. Add to workflow-automation.md (New Section)

**File:** `~/.claude/docs/workflow-automation.md`

**Add new section:** "Workflow Selection Guide" explaining the task complexity spectrum and when each system is used. This extends the existing compliance doc with routing guidance.

---

## Implementation Tasks

### Task 1: Update start-task.md
- Add GSD project detection at top
- Add smart complexity analysis
- Add GSD keywords to routing table
- Update examples to show GSD routes

### Task 2: Update run.md
- Add note about GSD distinction

### Task 3: Update gsd/help.md
- Add integration section

### Task 4: Add section to workflow-automation.md
- "Workflow Selection Guide" section
- Task complexity spectrum diagram
- When to use each system
- Transition scenarios

---

## Files to Modify

| File | Change Type |
|------|-------------|
| `~/.claude/commands/start-task.md` | Major update |
| `~/.claude/commands/run.md` | Minor note |
| `~/.claude/commands/gsd/help.md` | Add section |
| `~/.claude/docs/workflow-automation.md` | Add section |

---

## Verification

After implementation:
1. `/start-task` in GSD project → routes to `/gsd:progress`
2. `/start-task new project` → routes to `/gsd:new-project`
3. `/start-task implement auth, profiles, and social` → auto-routes to GSD
4. `/start-task fix typo` → auto-routes to direct execution
5. `/start-task refactor modal component` → auto-routes to /create-prompt
6. `/gsd:help` shows integration info
