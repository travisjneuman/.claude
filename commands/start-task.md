---
description: Universal intelligent router - routes ANY prompt to optimal resources from 103 marketplaces, 119 skills, 67 agents
arguments:
  - name: task_description
    description: "What you want to accomplish. Natural language - just describe it."
    required: false
---

# Start Task - Universal Intelligent Router v3.2

Routes ANY prompt to optimal execution by loading resources on-demand.
Skills and agents auto-match from descriptions. CLAUDE.md routes docs/checklists.

## Execution Protocol

### Step 0: ULTRATHINK (Default)

Apply maximum reasoning depth for non-trivial tasks. Skip only for: typos, single-line fixes.

### Step 1: Environment Context & Research

**Current date from environment:** Use `Today's date` value for temporal reasoning.

**Research triggers (auto-detect):**
- "latest", "current", "recent", "new", "today"
- Any year >= current year from environment
- Version queries ("React 19", "Node 22")
- "best way to", "recommended", "is there a library"
- "investigate", "research", "find information about", "compare approaches"

If research needed: Use `WebSearch` immediately. For complex research: Load `docs/reference/workflows/research-methodology.md`.

Parallel tool usage: When multiple independent searches/reads needed, make ALL calls in single message.

### Step 2: Memory Check

Query persistent memory for context relevant to: `{{task_description}}`

### Step 3: Active GSD Project Check

```bash
[ -f .planning/STATE.md ] && echo "ACTIVE_GSD_PROJECT"
```

If active: Invoke `/gsd:progress` and EXIT.

### Step 4: Domain Detection

Scan `{{task_description}}` and load the matching domain router file:

1. **Meta/Admin** → Read `commands/router/domains-meta.md` → May EXIT immediately
2. **Decision** → Read `commands/router/decision-frameworks.md` → EXIT after framework
3. **Scientific** → Read `commands/router/domains-scientific.md`
4. **Development** → Read `commands/router/domains-development.md`
5. **Business** → Read `commands/router/domains-business.md`
6. **Creative** → Read `commands/router/domains-creative.md`

Extract from the domain file: **skill** to invoke, **agent** to spawn, **contextual rules** to read.

### Step 5: Route Selection

Read `commands/router/routing-logic.md` for complexity scoring.

- Score >= 5 → `/gsd:new-project`
- Score 3-4 → `EnterPlanMode` (or suggest Auto-Claude for well-defined features)
- Score 1-2 → `EnterPlanMode`
- Score <= 0 → Execute directly

### Step 6: Execute

- Invoke identified skill(s) from domain files
- Use `TodoWrite` for multi-step tracking (always for 3+ steps)
- Spawn agents via `Task` tool as needed
- For specialized domains: `find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -li "<keyword>"`

### Step 7: Verify

Load `docs/reference/checklists/verification-template.md` before marking complete.

**If `{{task_description}}` is empty:** Check GSD project → query memory → check todos → ask user.

_v3.2: Trimmed — removed inline duplication with CLAUDE.md auto-routing_
