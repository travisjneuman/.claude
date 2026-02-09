---
description: Universal intelligent router - routes ANY prompt to optimal resources from 72 marketplaces, 89 skills, 47 agents
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

After receiving tool results, reflect on quality and determine optimal next steps before proceeding.

---

### Step 1: Environment Context & Research

**Current date from environment:** Use `Today's date` value for temporal reasoning.

**Research triggers (auto-detect):**

- "latest", "current", "recent", "new", "today"
- Any year >= current year from environment
- Version queries ("React 19", "Node 22")
- "best way to", "recommended", "is there a library"
- "investigate", "research", "find information about", "compare approaches"
- "what are the options for", "how should I"

**Research execution:**

- If research needed: Use `WebSearch` immediately
- For complex research: Load `rules/workflows/research-methodology.md`
- Apply structured hypothesis tracking for multi-faceted questions
- Use multi-source verification for important conclusions
- Track confidence levels and create research-notes.md if appropriate

**Parallel tool usage:**

- When multiple independent searches/reads needed, make ALL calls in single message
- Only call sequentially when tools depend on previous results
- Never use placeholders or guess parameters

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

### Step 4: Domain Detection & Smart Resource Loading (Priority Order)

Scan `{{task_description}}` in this priority order:

1. **Meta/Admin** → Read `commands/router/domains-meta.md` → May EXIT immediately
2. **Decision** → Read `commands/router/decision-frameworks.md` → EXIT after framework
3. **Scientific** → Read `commands/router/domains-scientific.md`
4. **Development** → Read `commands/router/domains-development.md`
5. **Business** → Read `commands/router/domains-business.md`
6. **Creative** → Read `commands/router/domains-creative.md`

**Detection hints by category:**

| Category    | Sample Keywords                                                        |
| ----------- | ---------------------------------------------------------------------- |
| Meta/Admin  | "create skill", "commit", "status", "where was I"                      |
| Decision    | "should I", "which", "vs", "compare", "better"                         |
| Scientific  | "protein", "dna", "molecule", "physics", "clinical"                    |
| Development | "react", "vue", "svelte", "api", "database", "deploy", "test", "debug" |
| Business    | "startup", "pricing", "marketing", "finance", "hr"                     |
| Creative    | "design", "video", "audio", "brand", "animation"                       |

**Smart context-specific loading:**

Auto-load additional resources based on task characteristics:

| Trigger Pattern                                                      | Auto-Load                                               |
| -------------------------------------------------------------------- | ------------------------------------------------------- |
| "research", "investigate", "find out", "what are the options"        | `rules/workflows/research-methodology.md`               |
| "UI", "frontend", "design", "styling", "CSS", "visual"               | `rules/checklists/ui-visual-changes.md`                 |
| "test", "testing", "verify", "validation"                            | `rules/checklists/verification-template.md`             |
| "autonomous", "auto", "implement feature", "build [complex feature]" | Suggest Auto-Claude                                     |
| Complexity score >= 3 + "well-defined feature"                       | Auto-recommend `/auto-claude`                           |
| First window of multi-phase project                                  | Suggest creating `tests.json`, `init.sh`, `progress.md` |
| Continuing after context refresh                                     | Check for `progress.md`, `tests.json`, git logs         |

Load the relevant domain file(s) and extract:

- **Skill** to invoke
- **Agent** to use via Task tool
- **Contextual rules** to read

---

### Step 5: Route Selection

Read `commands/router/routing-logic.md` for complexity scoring.

**Quick reference:**

- Score >= 5 → `/gsd:new-project`
- Score 3-4 → `/auto-claude` (well-defined) or `EnterPlanMode` (exploratory)
- Score 1-2 → `EnterPlanMode`
- Score <= 0 → Execute directly

---

### Step 6: Execute with Full Environment

**1. Load determined resources:**

- Invoke identified skill(s) from domain files
- Load contextual rules automatically based on patterns
- Use `TodoWrite` for multi-step tracking (always for 3+ steps)
- Spawn agents via `Task` tool as needed

**2. Intelligent marketplace skill discovery:**
When domain detection identifies a specialized area, search marketplace skills:

- Search: `find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -li "<keyword>"`
- Priority: Local skills first, then marketplace skills from 72 repos (3,900+ skills)
- Auto-suggest highly relevant marketplace skills when found
- Key marketplace repos by domain:
  - **Security:** trailofbits-skills (50), claude-scientific-skills (144)
  - **Full-stack:** buildwithclaude (43), madappgang-claude-code (110), wshobson-agents (129)
  - **Templates:** davila7-templates (651), athola-night-market (125)
  - **SAP/Enterprise:** secondsky-sap-skills (33)
  - **Elixir:** bradleygolden-elixir (4), georgeguimaraes-elixir (6)
  - **Terraform/IaC:** hashi-terraform-skills (4)
  - **Biology:** gqy20-biology-plugins, claude-scientific-skills
  - **Finance:** quant-equity-research
  - **Worldbuilding/Creative:** worldbuilding-skills (52)
  - **Context Engineering:** neolab-context-kit (11), muratcankoylan-agent-skills (19)
  - **Infrastructure:** diet103-infrastructure (5)
  - **Film/AIGC:** mojito-freeship-skills (4)

**3. Multi-window workflow awareness:**

- First window: Suggest creating `tests.json`, `init.sh`, `progress.md` for complex projects
- Subsequent windows: Check for these files and use them to orient
- Always review git logs and progress notes when continuing work
- Create quality-of-life setup scripts proactively

**4. Execution principles:**

- Default to implementing changes (PROACTIVE mode from CLAUDE.md)
- Read code before proposing changes - never speculate
- Use parallel tool calls for independent operations
- Reflect on tool results before next action

**5. Autonomous implementation detection:**
When task characteristics indicate autonomous coding would be beneficial:

- Well-defined feature in established codebase
- Complexity score >= 3
- Multiple files/components involved
- User preference for autonomous vs manual

Auto-suggest: "This feature could benefit from autonomous implementation. Would you like to use `/auto-claude` for autonomous coding with QA validation, or proceed with manual step-by-step implementation?"

**Never force Auto-Claude** - always give user choice between:

- Manual: Traditional /start-task planning + implementation
- Autonomous: /auto-claude for autonomous coding
- GSD: Multi-phase project management

---

### Step 7: Verify with Quality Checks

**Always load before marking complete:** `rules/checklists/verification-template.md`

**Critical verifications:**

- [ ] Primary goal achieved
- [ ] No errors in console/logs
- [ ] Tests pass (if applicable)
- [ ] Solution works for ALL valid inputs, not just test cases
- [ ] No hard-coded values or test-specific logic
- [ ] Explicit constraints met
- [ ] No forbidden patterns (check DO NOT section in CLAUDE.md)
- [ ] Temporary files cleaned up

**Context-specific verification:**

- UI/visual changes → Also verify with `rules/checklists/ui-visual-changes.md`
- Scripts/automation → Also verify with `rules/checklists/automation-scripts.md`
- Static sites → Also verify with `rules/checklists/static-sites.md`

**Then apply post-work automation:**

- Code review agents (pr-review-toolkit)
- Simplification if needed
- Type design analysis for new types
- Test analysis for new functionality

---

### Step 8: State Persistence

**Memory save** (for significant work):
Save to claude-mem:

- Key decisions made
- Patterns established
- Project context
- Important discoveries

**File-based state** (for multi-window projects):
Update or create:

- `progress.md` - Session notes, completed work, next steps
- `tests.json` - Structured test status (if test-heavy project)
- Git commits - Descriptive commits as state checkpoints

**Context approaching limit:**
Before context refresh, ensure state is saved to memory and files for seamless continuation.

---

## Empty Task Handler

If `{{task_description}}` is empty:

1. Check GSD project → `/gsd:progress`
2. Query claude-mem → Resume if found
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

## Quick Examples

| Prompt                           | Detection              | Route                                     |
| -------------------------------- | ---------------------- | ----------------------------------------- |
| "Build an iOS app"               | development/ios        | GSD                                       |
| "Analyze this protein"           | scientific/proteomics  | Direct                                    |
| "Should I use Redux or Zustand?" | decision               | First-principles framework                |
| "Create a skill for X"           | meta                   | `/taches-cc-resources:create-agent-skill` |
| "What's new in React 19?"        | research + development | WebSearch → Direct                        |

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

_v3.0: Modular architecture with on-demand loading_
