---
description: Route any task to the right skills, agents, rules, and marketplace resources via INDEX.md, then execute it
argument-hint: "[task_description]"
---

# Start Task - Universal Intelligent Router v3.2

**Arguments:** `task_description` (optional): What you want to accomplish. Natural language - just describe it.

Routes ANY prompt to optimal execution by loading resources on-demand.
Skills and agents auto-match from descriptions. CLAUDE.md routes docs/checklists.

## Execution Protocol

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

### Step 2: Context Check

Read the project's `CLAUDE.md` / `AGENTS.md` and any handoff note the user points to for context relevant to: `$ARGUMENTS`. The toolkit keeps no automatic memory (auto memory is off, no memory server is configured).

### Step 3: Domain Detection

Grep `~/.claude/INDEX.md` for the task's keywords (see the `toolkit-router` skill). For multi-domain requests, load the matching route file:

1. **Meta/Admin** → Read `skills/toolkit-router/routes/domains-meta.md` → May EXIT immediately
2. **Decision** → Read `skills/toolkit-router/routes/decision-frameworks.md` → EXIT after framework
3. **Scientific** → Read `skills/toolkit-router/routes/domains-scientific.md`
4. **Development** → Read `skills/toolkit-router/routes/domains-development.md`
5. **Business** → Read `skills/toolkit-router/routes/domains-business.md`
6. **Creative** → Read `skills/toolkit-router/routes/domains-creative.md`

Extract from the domain file: **skill** to invoke, **agent** to spawn, **contextual rules** to read.

### Step 4: Route Selection

- Diff describable in one sentence → execute directly.
- Ambiguous scope or multiple systems → short plan (plan mode only when a real choice needs the user), then execute.
- Full Access+++ applies: do not ask for approval of in-scope steps. See CLAUDE.md.

### Step 5: Execute

- Invoke identified skill(s) from domain files
- Track multi-step work (3+ steps) with the session's task list tools
- Spawn core agents via the Agent tool, or invoke `agent-<name>` skills via the Skill tool, as needed
- For specialized domains: `find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -li "<keyword>"`

### Step 6: Verify

Validate by review: re-read the request and review the whole diff and the code it touches. No tests (see CLAUDE.md); tests only if the user explicitly asks.

**If `$ARGUMENTS` is empty:** check the session's task list, then ask the user.

_v3.2: Trimmed — removed inline duplication with CLAUDE.md auto-routing_
