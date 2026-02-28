---
description: Universal intelligent router - routes ANY prompt to optimal resources from 91 marketplaces, 119 skills, 59 agents
arguments:
  - name: task_description
    description: "What you want to accomplish. Natural language - just describe it."
    required: false
---

# Start Task - Universal Intelligent Router v3.1

Routes ANY prompt to optimal execution by loading resources on-demand.

**Token-efficient:** Domain-specific content loads only when relevant.
**Philosophy:** No slash commands required. Everything activates dynamically from the prompt.

---

## Execution Protocol

### Step 0: ULTRATHINK (Default)

Apply maximum reasoning depth for non-trivial tasks. Skip only for: typos, single-line fixes.

---

### Step 1: Environment Context & Research

**Current date from environment:** Use `Today's date` value for temporal reasoning.

**Research triggers (auto-detect):**

- "latest", "current", "recent", "new", "today"
- Any year >= current year from environment
- Version queries ("React 19", "Node 22")
- "best way to", "recommended", "is there a library"
- "investigate", "research", "find information about", "compare approaches"

If research needed: Use `WebSearch` immediately. For complex research: Load `rules/workflows/research-methodology.md`.

**Parallel tool usage:** When multiple independent searches/reads needed, make ALL calls in single message.

---

### Step 2: Memory Check

Query persistent memory for context relevant to: `{{task_description}}`

---

### Step 3: Active GSD Project Check

```bash
[ -f .planning/STATE.md ] && echo "ACTIVE_GSD_PROJECT"
```

If active: Invoke `/gsd:progress` and EXIT.

---

### Step 4: Domain Detection

Scan `{{task_description}}` and load the matching domain router file:

1. **Meta/Admin** → Read `commands/router/domains-meta.md` → May EXIT immediately
2. **Decision** → Read `commands/router/decision-frameworks.md` → EXIT after framework
3. **Scientific** → Read `commands/router/domains-scientific.md`
4. **Development** → Read `commands/router/domains-development.md`
5. **Business** → Read `commands/router/domains-business.md`
6. **Creative** → Read `commands/router/domains-creative.md`

CLAUDE.md's auto-routing table handles satellite file loading automatically. Extract from the domain file: **skill** to invoke, **agent** to spawn, **contextual rules** to read.

---

### Step 5: Route Selection

Read `commands/router/routing-logic.md` for complexity scoring.

**Quick reference:**

- Score >= 5 → `/gsd:new-project`
- Score 3-4 → `EnterPlanMode` (or suggest Auto-Claude for well-defined features)
- Score 1-2 → `EnterPlanMode`
- Score <= 0 → Execute directly

---

### Step 6: Execute

- Invoke identified skill(s) from domain files
- Load contextual rules automatically based on patterns (CLAUDE.md handles this)
- Use `TodoWrite` for multi-step tracking (always for 3+ steps)
- Spawn agents via `Task` tool as needed
- For specialized domains, discover marketplace skills: `find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -li "<keyword>"`

---

### Step 7: Verify

**Always load before marking complete:** `rules/checklists/verification-template.md`

- [ ] Primary goal achieved
- [ ] No errors in console/logs
- [ ] Tests pass (if applicable)
- [ ] Solution works for ALL valid inputs, not just test cases
- [ ] No hard-coded values or test-specific logic
- [ ] Explicit constraints met
- [ ] No forbidden patterns (check DO NOT section in CLAUDE.md)
- [ ] Temporary files cleaned up

---

### Step 8: State Persistence

**Memory save** (for significant work): Key decisions, patterns, project context, discoveries.

**File-based state** (for multi-window projects): `progress.md`, `tests.json`, git commits as checkpoints.

**Context approaching limit:** Save state to memory and files before refresh.

---

## Empty Task Handler

If `{{task_description}}` is empty:

1. Check GSD project → `/gsd:progress`
2. Query memory → Resume if found
3. Check todos → `/taches-cc-resources:check-todos`
4. Ask user what they want to work on

---

## Reference Files

| File                                     | Contains                            |
| ---------------------------------------- | ----------------------------------- |
| `commands/router/domains-development.md` | 28 development domains              |
| `commands/router/domains-scientific.md`  | 8 scientific domains                |
| `commands/router/domains-business.md`    | 16 business domains                 |
| `commands/router/domains-creative.md`    | 8 creative domains                  |
| `commands/router/domains-meta.md`        | Admin tasks, quality, exploration   |
| `commands/router/decision-frameworks.md` | 6 decision frameworks               |
| `commands/router/routing-logic.md`       | Complexity scoring, route selection |

---

## Core Principle

**Every prompt gets optimal resources automatically.**

Just describe what you want. The system loads what's needed — no slash commands required.

---

_v3.1: Streamlined — defers to CLAUDE.md auto-routing for satellite file loading_
