---
description: Route any task to the right skills, agents, rules, and marketplace resources via INDEX.md, then execute it
arguments:
  - name: task_description
    description: "What you want to accomplish. Natural language - just describe it."
    required: false
---

# Start Task - Universal Intelligent Router v3.2

Routes ANY prompt to optimal execution by loading resources on-demand.
Skills and agents auto-match from descriptions. CLAUDE.md routes docs/checklists.

## Execution Protocol

### Step 0: Effort

Use the effort level selected for the session. Think harder on architecture and hard debugging, not on routine edits.

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

Grep `~/.claude/INDEX.md` for the task's keywords (see the `toolkit-router` skill). For multi-domain requests, load the matching route file:

1. **Meta/Admin** → Read `skills/toolkit-router/routes/domains-meta.md` → May EXIT immediately
2. **Decision** → Read `skills/toolkit-router/routes/decision-frameworks.md` → EXIT after framework
3. **Scientific** → Read `skills/toolkit-router/routes/domains-scientific.md`
4. **Development** → Read `skills/toolkit-router/routes/domains-development.md`
5. **Business** → Read `skills/toolkit-router/routes/domains-business.md`
6. **Creative** → Read `skills/toolkit-router/routes/domains-creative.md`

Extract from the domain file: **skill** to invoke, **agent** to spawn, **contextual rules** to read.

### Step 5: Route Selection

- Diff describable in one sentence → execute directly.
- Ambiguous scope or multiple systems → short plan (plan mode only when a real choice needs the user), then execute.
- Long multi-phase project with an existing `.planning/` directory → `/gsd:progress`; otherwise do not start GSD unprompted.
- Full Access+++ applies: do not ask for approval of in-scope steps. See CLAUDE.md.

### Step 6: Execute

- Invoke identified skill(s) from domain files
- Use `TodoWrite` for multi-step tracking (always for 3+ steps)
- Spawn agents via `Task` tool as needed
- For specialized domains: `find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -li "<keyword>"`

### Step 7: Verify

Review the task-owned diff against the request. Run a check only for a specific issue (issue-driven testing, see CLAUDE.md); load `docs/reference/checklists/verification-template.md` for release-style work.

**If `{{task_description}}` is empty:** Check GSD project → query memory → check todos → ask user.

_v3.2: Trimmed — removed inline duplication with CLAUDE.md auto-routing_
