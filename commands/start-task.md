---
description: Universal intelligent router - routes ANY prompt to optimal resources from 15 marketplaces, 71 skills, 37 agents
arguments:
  - name: task_description
    description: "What you want to accomplish. Natural language - just describe it."
    required: false
---

# Start Task - Universal Intelligent Router v3.0

Routes ANY prompt to optimal execution by loading resources on-demand.

**Token-efficient:** Domain-specific content loads only when relevant.

---

## Execution Protocol

### Step 0: ULTRATHINK (Default)

Apply maximum reasoning depth for non-trivial tasks. Skip only for: typos, single-line fixes.

---

### Step 1: Environment Context

**Current date from environment:** Use `Today's date` value for temporal reasoning.

**Research triggers (dynamic):**
- "latest", "current", "recent", "new", "today"
- Any year >= current year from environment
- Version queries ("React 19", "Node 22")
- "best way to", "recommended", "is there a library"

If research needed: Use `WebSearch` first, then continue routing.

---

### Step 2: Memory Check (claude-mem)

Query persistent memory for context relevant to: `{{task_description}}`

If relevant past context exists, load and reference it.

---

### Step 3: Active GSD Project Check

```bash
[ -f .planning/STATE.md ] && echo "ACTIVE_GSD_PROJECT"
```

If active: Invoke `/gsd:progress` and EXIT.

---

### Step 4: Domain Detection (Priority Order)

Scan `{{task_description}}` in this priority order:

1. **Meta/Admin** → Read `commands/router/domains-meta.md` → May EXIT immediately
2. **Decision** → Read `commands/router/decision-frameworks.md` → EXIT after framework
3. **Scientific** → Read `commands/router/domains-scientific.md`
4. **Development** → Read `commands/router/domains-development.md`
5. **Business** → Read `commands/router/domains-business.md`
6. **Creative** → Read `commands/router/domains-creative.md`

**Detection hints by category:**

| Category | Sample Keywords |
|----------|-----------------|
| Meta/Admin | "create skill", "commit", "status", "where was I" |
| Decision | "should I", "which", "vs", "compare", "better" |
| Scientific | "protein", "dna", "molecule", "physics", "clinical" |
| Development | "react", "vue", "svelte", "api", "database", "deploy", "test", "debug" |
| Business | "startup", "pricing", "marketing", "finance", "hr" |
| Creative | "design", "video", "audio", "brand", "animation" |

Load the relevant domain file(s) and extract:
- **Skill** to invoke
- **Agent** to use via Task tool
- **Contextual rules** to read

---

### Step 5: Route Selection

Read `commands/router/routing-logic.md` for complexity scoring.

**Quick reference:**
- Score >= 3 → `/gsd:new-project`
- Score 1-2 → `EnterPlanMode`
- Score <= 0 → Execute directly

---

### Step 6: Execute

1. Load determined skill(s)
2. Use `TodoWrite` for multi-step tracking
3. Spawn agents via `Task` tool as needed

---

### Step 7: Verify

Before marking complete, load `rules/checklists/verification-template.md`:
- [ ] Primary goal achieved
- [ ] No errors in console/logs
- [ ] Tests pass (if applicable)
- [ ] Explicit constraints met
- [ ] No forbidden patterns (check DO NOT section)

Then apply post-work automation (code review, commit).

---

### Step 8: Memory Save

After significant work, save to claude-mem:
- Key decisions made
- Patterns established
- Project context

---

## Empty Task Handler

If `{{task_description}}` is empty:
1. Check GSD project → `/gsd:progress`
2. Query claude-mem → Resume if found
3. Check todos → `/taches-cc-resources:check-todos`
4. Ask user what they want to work on

---

## Reference Files

| File | Contains |
|------|----------|
| `commands/router/domains-development.md` | 23 development domains |
| `commands/router/domains-scientific.md` | 8 scientific domains |
| `commands/router/domains-business.md` | 16 business domains |
| `commands/router/domains-creative.md` | 6 creative domains |
| `commands/router/domains-meta.md` | Admin tasks, quality, exploration |
| `commands/router/decision-frameworks.md` | 6 decision frameworks |
| `commands/router/routing-logic.md` | Complexity scoring, route selection |

---

## Quick Examples

| Prompt | Detection | Route |
|--------|-----------|-------|
| "Build an iOS app" | development/ios | GSD |
| "Analyze this protein" | scientific/proteomics | Direct |
| "Should I use Redux or Zustand?" | decision | First-principles framework |
| "Create a skill for X" | meta | `/taches-cc-resources:create-agent-skill` |
| "What's new in React 19?" | research + development | WebSearch → Direct |

---

## Core Principle

**Every prompt gets optimal resources automatically.**

The router ensures:
- Only relevant domain content loads (token efficiency)
- Research triggers use current date from environment
- Memory provides continuity across sessions
- Complexity determines workflow (GSD/Planning/Direct)

Just describe what you want. The system loads what's needed.

---

*v3.0: Modular architecture with on-demand loading*
