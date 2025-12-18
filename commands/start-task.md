---
description: Intelligent task router - analyzes your request and automatically delegates to optimal workflow (plan/prompt/gsd/meta-prompt/direct execution)
arguments:
  - name: task_description
    description: "Describe what you want to accomplish. Can be empty to check todos, or a full task description."
    required: false
---

# Start Task - Intelligent Workflow Router

Analyzes your task and automatically routes to the optimal execution strategy.

## Requirements

**ALWAYS read and follow these before executing any routed workflow:**

1. **`~/.claude/CLAUDE.md`** - Global constitution (P0 non-negotiables, workflow rules, code standards)
2. **GSD System** - For multi-phase projects, uses `/gsd:*` commands from [get-shit-done](https://github.com/glittercowboy/get-shit-done)

## Integration Points

- **CLAUDE.md Workflow Section** - Standard 5-step workflow (Plan → Approve → Execute → Verify → Close)
- **CLAUDE.md GSD Section** - When to use GSD vs standard workflow
- **CLAUDE.md Skills & Agents** - Available skills/agents for task execution
- **CLAUDE.md Contextual Rules** - Stack-specific and task-type checklists

## Pre-Routing: Project Detection

**Before analyzing task, check for active GSD project:**

```bash
# Check for GSD project (STATE.md is the marker)
[ -f .planning/STATE.md ] && echo "GSD_PROJECT"
```

**If GSD project detected:**
- No task provided → `/gsd:progress` (shows status, suggests next action)
- Task relates to current project → `/gsd:progress` (will route to execute/plan)
- Unrelated quick task → Continue to standard routing below

---

## Routing Logic

**If no task description provided:**
- If GSD project detected → `/gsd:progress`
- Otherwise → `/check-todos` to list outstanding work

**If task description provided, analyze and route:**

### 0. GSD Multi-Phase Projects → `/gsd:*` commands
**Keywords:** "new project", "start project", "build [app/system]", "where was I", "project status", "resume"
**Complexity:** Multi-phase features spanning days/weeks, persistent state needed
**Examples:**
- "New project for my app" → `/gsd:new-project`
- "Where was I" → `/gsd:progress`
- "Plan phase 2" → `/gsd:plan-phase 2`

**Auto-detect signals:**
- Multiple components mentioned ("API, database, frontend")
- Sequential dependencies ("first X, then Y, then Z")
- Large scope ("overhaul", "rewrite", "major feature")

→ Invoke: `/gsd:new-project` or `/gsd:progress` based on context

### 1. Planning Tasks → `/create-plan`
**Keywords:** "plan", "design", "architecture", "multi-phase", "roadmap"
**Complexity:** Multi-phase features, complex architecture (when NOT starting a new project)
**Example:** "Plan the analytics dashboard feature"

→ Invoke: `/create-plan {{task_description}}`

### 2. Decision-Making → `/consider:*` frameworks
**Keywords:** "should we", "which approach", "evaluate", "compare", "decide"
**Examples:**
- "Should we use Redux or Zustand?" → `/consider:first-principles`
- "Which features to prioritize?" → `/consider:eisenhower-matrix`
- "Is this the right architecture?" → `/consider:second-order`

→ Analyze decision type and invoke appropriate framework

### 3. Debugging Tasks → `debug-like-expert` skill
**Keywords:** "debug", "intermittent", "mysterious", "sometimes fails", "race condition"
**Example:** "Debug the intermittent calendar sync issue"

→ Invoke: `Skill(debug-like-expert)` with task description

### 4. Moderate Complexity → `/create-prompt` + `/run`
**Criteria:**
- 30min - 2hr estimated work
- 3-10 files to modify
- Clear scope but needs fresh context
**Example:** "Refactor the widget loading system"

→ Invoke: `/create-prompt {{task_description}}` then offer to `/run`

### 5. Multi-Stage Features → `/create-meta-prompt`
**Keywords:** "research then implement", "explore options then build", multi-stage
**Example:** "Research authentication options then implement the best one"

→ Invoke: `/create-meta-prompt {{task_description}}`

### 6. Simple/Direct Tasks → Execute directly
**Criteria:**
- 1-2 files
- <30min work
- Clear, straightforward
**Example:** "Fix the typo in the README"

→ Execute directly in current context

---

## Implementation

**Step 1: Check for GSD Project**
```javascript
const hasGsdProject = fileExists(".planning/STATE.md");
const taskDescription = "{{task_description}}".trim();

if (hasGsdProject && !taskDescription) {
  return "/gsd:progress";
}
```

**Step 2: Parse Arguments**
```javascript
if (!taskDescription) {
  // No task provided, no GSD project - check todos
  return "/check-todos";
}
```

**Step 3: Analyze Task**

Examine task description for:
- **GSD signals** indicating multi-phase project scope
- **Keywords** indicating task type
- **Complexity signals** (file count, time estimate, scope)
- **Execution pattern** (single-stage, multi-stage, research-heavy)

**Step 4: Route to Optimal Workflow**

Based on analysis:

```javascript
// GSD multi-phase projects (check first)
if (matches("new project|start project|build.*app|build.*system")) {
  invoke("/gsd:new-project");
}
else if (matches("where was I|project status|project progress|resume|continue work")) {
  invoke("/gsd:progress");
}
else if (matches("plan phase|next phase")) {
  invoke("/gsd:plan-phase");
}
else if (detectsMultiPhaseComplexity(taskDescription)) {
  // Multiple components, sequential dependencies, large scope
  invoke("/gsd:new-project");
}

// Planning tasks (single-phase)
else if (matches("plan|design|architecture|roadmap") && !hasGsdProject) {
  invoke("/create-plan {{task_description}}");
}

// Decision-making tasks
else if (matches("should we|which|evaluate|compare|decide")) {
  determineFramework(); // first-principles, eisenhower-matrix, etc.
  invoke("/consider:[framework] {{task_description}}");
}

// Debugging tasks
else if (matches("debug|intermittent|mysterious|race condition")) {
  invoke("Skill(debug-like-expert)");
}

// Moderate complexity - delegate to fresh context
else if (estimatedComplexity === "moderate") {
  invoke("/create-prompt {{task_description}}");
  // Offer to run after creation
}

// Multi-stage features
else if (matches("research then|explore then|multi-stage")) {
  invoke("/create-meta-prompt {{task_description}}");
}

// Simple/direct - execute in current context
else {
  executeDirectly();
}
```

**Step 5: Follow Through**

After routing:
- If GSD: follow GSD workflow (progress → plan → execute → complete)
- If created prompt/plan: offer to execute with `/run` or `/run-plan`
- If direct execution: follow standard workflow (plan → approve → implement)
- If framework: present analysis and next steps

---

## Decision Framework Selection

| Decision Type | Framework |
|---------------|-----------|
| Technical choice | `/consider:first-principles` |
| Priority/urgency | `/consider:eisenhower-matrix` |
| Consequences | `/consider:second-order` |
| Root cause | `/consider:5-whys` |

---

## Workflow Spectrum

```
Simple              Moderate            Multi-Stage         Multi-Phase (GSD)
(Direct)            (/create-prompt)    (/create-meta)      (/gsd:*)
   │                     │                   │                   │
<30 min              30min-2hr            2-8 hours          Days/Weeks
1-2 files            3-10 files           10+ files          Phases
Clear scope          Defined scope        Research needed    Vision → Execution
No state             Stateless            Stateless          STATE.md (persistent)
```

---

## Examples

```bash
# GSD Routes (multi-phase projects)
/start-task                                        # → /gsd:progress (if in GSD project)
/start-task new project for my app                 # → /gsd:new-project
/start-task where was I                            # → /gsd:progress
/start-task implement auth, profiles, and social   # → /gsd:new-project (multi-phase detected)

# Standard Routes
/start-task                                        # → /check-todos (if no GSD project)
/start-task Plan the auth system                   # → /create-plan
/start-task Should we use WebSockets or SSE?       # → /consider:first-principles
/start-task Debug intermittent widget failure      # → debug-like-expert
/start-task Refactor calendar components           # → /create-prompt
/start-task Research GraphQL then implement        # → /create-meta-prompt
/start-task Fix typo in README                     # → direct execution
```

---

## Notes

- **Transparent routing:** User just describes task naturally
- **GSD detection:** Automatically detects active GSD projects via `.planning/STATE.md`
- **Smart escalation:** Multi-phase complexity signals auto-route to GSD
- **Zero configuration:** Analysis and routing happen automatically
- **Optimal execution:** Each task routed to best-fit workflow
- **CLAUDE.md compliant:** Follows Intelligent Prompt Routing specification
- **Composable:** Routes to other slash commands and skills as needed
