<purpose>
Define the phases of implementation. Each phase is a coherent chunk of work
that delivers value. The roadmap provides structure, not detailed tasks.
</purpose>

<required_reading>
**Read these files NOW:**

1. ~/.claude/get-shit-done/templates/roadmap.md
2. ~/.claude/get-shit-done/templates/state.md
3. Read `.planning/PROJECT.md` if it exists
   </required_reading>

<process>

<step name="check_brief">
```bash
cat .planning/PROJECT.md 2>/dev/null || echo "No brief found"
```

**If no brief exists:**
Ask: "No brief found. Want to create one first, or proceed with roadmap?"

If proceeding without brief, gather quick context:

- What are we building?
- What's the rough scope?
</step>

<step name="check_research">
Check for project research from /gsd:research-project:

```bash
ls .planning/research/*.md 2>/dev/null
```

**If research files found:**

Load and extract key findings from each file:

1. **ecosystem.md** → Standard stack recommendations
   - Which libraries/frameworks to use
   - Why they're recommended for this domain

2. **architecture.md** → Architectural patterns
   - Recommended project structure
   - Key patterns to follow

3. **pitfalls.md** → Critical pitfalls
   - Top 2-3 things that commonly go wrong
   - How to avoid them

4. **standards.md** → Domain standards
   - Conventions and best practices
   - Compliance requirements (if any)

Present summary to user:
```
Found project research:

**Ecosystem:**
[Key libraries/frameworks from ecosystem.md]

**Architecture:**
[Key patterns from architecture.md]

**Pitfalls to Avoid:**
[Top 2-3 from pitfalls.md]

**Standards:**
[Key conventions from standards.md]

This research will inform phase structure and planning.
Continue with roadmap creation? (yes / review research first)
```

If user wants to review research, show relevant files.

**If no research found:**
```
No project research found.
Creating roadmap based on PROJECT.md.

(For niche/complex domains, consider running /gsd:research-project first)
```

Continue with roadmap creation.

**Store research context** for use in identify_phases and write_roadmap steps.
</step>

<step name="detect_domain">
Scan for available domain expertise:

```bash
ls ~/.claude/skills/expertise/ 2>/dev/null
```

**Inference:** Based on the brief/user request, infer applicable domains:

| Keywords                                 | Domain                   |
| ---------------------------------------- | ------------------------ |
| "macOS", "Mac app", "menu bar", "AppKit" | expertise/macos-apps     |
| "iPhone", "iOS", "iPad", "mobile app"    | expertise/iphone-apps    |
| "Unity", "game", "C#", "3D game"         | expertise/unity-games    |
| "MIDI", "sequencer", "music app"         | expertise/midi           |
| "ISF", "shader", "GLSL", "visual effect" | expertise/isf-shaders    |
| "UI", "design", "frontend", "Tailwind"   | expertise/ui-design      |
| "Agent SDK", "Claude SDK", "agentic"     | expertise/with-agent-sdk |

**If domain inferred:**

```
Detected: [domain] project → expertise/[name]
Include this domain expertise? (Y / see options / none)
```

**If multiple domains apply** (e.g., ISF shaders for a macOS app):

```
Detected multiple domains:
- expertise/isf-shaders (shader development)
- expertise/macos-apps (native app)

Include both? (Y / select one / none)
```

**If no domain obvious:**

```
Available domain expertise:
1. macos-apps
2. iphone-apps
[... others found ...]

N. None - proceed without domain expertise

Select (comma-separate for multiple):
```

**Store selected paths** for inclusion in ROADMAP.md.
</step>

<step name="identify_phases">
Derive phases from the actual work needed. The phase count emerges from the project—don't impose a number.

**Incorporate research if available:**

If research was found in check_research step, use findings to inform phase structure:

- **ecosystem.md recommendations** → Inform technology choices in phases
  - If research recommends specific libraries, plan phases that set them up properly
  - Add foundation phases for recommended architectural patterns

- **architecture.md patterns** → Inform phase ordering
  - If research identifies layered architecture, order phases accordingly
  - Include phases for recommended project structure setup

- **pitfalls.md warnings** → Add phases to address risks
  - If research identifies common failure modes, add phases that mitigate them
  - Consider early validation phases for risky integrations

- **standards.md conventions** → Inform phase content
  - Ensure phases follow domain conventions
  - Add phases for compliance requirements if applicable

**Phase Numbering System:**

Use integer phases (1, 2, 3) for planned milestone work.

Use decimal phases (2.1, 2.2) for urgent insertions:

- Decimal phases inserted between integers (2.1 between 2 and 3)
- Mark with "(INSERTED)" in phase title
- Created when urgent work discovered after planning
- Examples: bugfixes, hotfixes, critical patches

**When to use decimals:**

- Urgent work that can't wait for next milestone
- Critical bugs blocking progress
- Security patches needing immediate attention
- NOT for scope creep or "nice to haves" (those go in ISSUES.md)

**Phase execution order:**
Numeric sort: 1 → 1.1 → 1.2 → 2 → 2.1 → 3

**Deriving phases:**

1. List all distinct systems/features/capabilities required
2. Group related work into coherent deliverables
3. Each phase should deliver ONE complete, verifiable thing
4. If a phase delivers multiple unrelated capabilities: split it
5. If a phase can't stand alone as a complete deliverable: merge it
6. Order by dependencies

Good phases are:

- **Coherent**: Each delivers one complete, verifiable capability
- **Sequential**: Later phases build on earlier
- **Independent**: Can be verified and committed on its own

Common phase patterns:

- Foundation → Core Feature → Enhancement → Polish
- Setup → MVP → Iteration → Launch
- Infrastructure → Backend → Frontend → Integration
  </step>

<step name="detect_research_needs">
**For each phase, determine if research is likely needed.**

Scan the brief and phase descriptions for research triggers:

<research_triggers>
**Likely (flag the phase):**

| Trigger Pattern                                       | Why Research Needed                     |
| ----------------------------------------------------- | --------------------------------------- |
| "integrate [service]", "connect to [API]"             | External API - need current docs        |
| "authentication", "auth", "login", "JWT"              | Architectural decision + library choice |
| "payment", "billing", "Stripe", "subscription"        | External API + compliance patterns      |
| "email", "SMS", "notifications", "SendGrid", "Twilio" | External service integration            |
| "database", "Postgres", "MongoDB", "Supabase"         | If new to project - setup patterns      |
| "real-time", "websocket", "sync", "live updates"      | Architectural decision                  |
| "deploy", "Vercel", "Railway", "hosting"              | If first deployment - config patterns   |
| "choose between", "select", "evaluate", "which"       | Explicit decision needed                |
| "AI", "OpenAI", "Claude", "LLM", "embeddings"         | Fast-moving APIs - need current docs    |
| Any technology not already in codebase                | New integration                         |
| Explicit questions in brief                           | Unknowns flagged by user                |

**Unlikely (no flag needed):**

| Pattern                                     | Why No Research         |
| ------------------------------------------- | ----------------------- |
| "add button", "create form", "update UI"    | Internal patterns       |
| "CRUD operations", "list/detail views"      | Standard patterns       |
| "refactor", "reorganize", "clean up"        | Internal work           |
| "following existing patterns"               | Conventions established |
| Technology already in package.json/codebase | Patterns exist          |

</research_triggers>

**For each phase, assign:**

- `Research: Likely ([reason])` + `Research topics: [what to investigate]`
- `Research: Unlikely ([reason])`

**Important:** These are hints, not mandates. The mandatory_discovery step during phase planning will validate.

Present research assessment:

```
Research needs detected:

Phase 1: Foundation
  Research: Unlikely (project setup, established patterns)

Phase 2: Authentication
  Research: Likely (new system, technology choice)
  Topics: JWT library for [stack], session strategy, auth provider options

Phase 3: Stripe Integration
  Research: Likely (external API)
  Topics: Current Stripe API, webhook patterns, checkout flow

Phase 4: Dashboard
  Research: Unlikely (internal UI using patterns from earlier phases)

Does this look right? (yes / adjust)
```

</step>

<step name="confirm_phases">
<config-check>
```bash
cat .planning/config.json 2>/dev/null
```
Note: Config may not exist yet (project initialization). If missing, default to interactive mode.
</config-check>

<if mode="yolo">
```
⚡ Auto-approved: Phase breakdown ([N] phases)

1. [Phase name] - [goal]
2. [Phase name] - [goal]
3. [Phase name] - [goal]

Proceeding to research detection...
```

Proceed directly to detect_research_needs step.
</if>

<if mode="interactive" OR="missing OR custom with gates.confirm_phases true">
Present the phase breakdown inline:

"Here's how I'd break this down:

1. [Phase name] - [goal]
2. [Phase name] - [goal]
3. [Phase name] - [goal]
   ...

Does this feel right? (yes / adjust)"

If "adjust": Ask what to change, revise, present again.
</step>

<step name="decision_gate">
<if mode="yolo">
```
⚡ Auto-approved: Create roadmap with [N] phases

Proceeding to create .planning/ROADMAP.md...
```

Proceed directly to create_structure step.
</if>

<if mode="interactive" OR="missing OR custom with gates.confirm_roadmap true">
Use AskUserQuestion:

- header: "Ready"
- question: "Ready to create the roadmap, or would you like me to ask more questions?"
- options:
  - "Create roadmap" - I have enough context
  - "Ask more questions" - There are details to clarify
  - "Let me add context" - I want to provide more information

Loop until "Create roadmap" selected.
</step>

<step name="create_structure">
```bash
mkdir -p .planning/phases
```
</step>

<step name="write_roadmap">
Use template from `~/.claude/get-shit-done/templates/roadmap.md`.

Initial roadmaps use integer phases (1, 2, 3...).
Decimal phases added later via /gsd:insert-phase command (if it exists).

Write to `.planning/ROADMAP.md` with:

- Domain Expertise section (paths from detect_domain step, or "None" if skipped)
- **Research Context section** (if research found in check_research step)
- Phase list with names and one-line descriptions
- Dependencies (what must complete before what)
- **Research flags** (from detect_research_needs step):
  - `Research: Likely ([reason])` with `Research topics:` for flagged phases
  - `Research: Unlikely ([reason])` for unflagged phases
- Status tracking (all start as "not started")

**Research Context section format (if research exists):**

```markdown
## Research Context

Pre-planning research was conducted for this domain. Key findings incorporated into phase planning:

**Source:** .planning/research/

**Key Ecosystem Choices:**
- [Library/framework from ecosystem.md and why]

**Architectural Patterns:**
- [Pattern from architecture.md]

**Critical Pitfalls Addressed:**
- [Pitfall from pitfalls.md and which phase addresses it]

See .planning/research/*.md for full research findings.
```

**If no research:** Omit the Research Context section entirely.

Create phase directories:

```bash
mkdir -p .planning/phases/01-{phase-name}
mkdir -p .planning/phases/02-{phase-name}
# etc.
```

</step>

<step name="initialize_project_state">
Create STATE.md - the project's living memory.

Use template from `~/.claude/get-shit-done/templates/state.md`.

Write to `.planning/STATE.md`:

```markdown
# Project State

## Brief Summary

**Building:** [Copy one-liner from PROJECT.md]

**Core requirements:**
[Copy 3-5 key requirements from PROJECT.md]

**Constraints:**
[Copy key constraints from PROJECT.md]

## Current Position

Phase: 1 of [N] ([First phase name])
Plan: Not started
Status: Ready to plan
Last activity: [today's date] - Project initialized

Progress: ░░░░░░░░░░ 0%

## Accumulated Context

### Decisions Made

| Phase | Decision | Rationale |
| ----- | -------- | --------- |

### Deferred Issues

None yet.

### Blockers/Concerns Carried Forward

None yet.

## Brief Alignment

Last checked: Project start
Status: ✓ Aligned
Assessment: No work done yet - baseline alignment.
Drift notes: None

## Session Continuity

Last session: [today's date and time]
Stopped at: Project initialization complete
Resume file: None
```

**Key points:**

- Brief Summary section is IMMUTABLE after creation - never edit it
- Copy verbatim from PROJECT.md to ensure fidelity
- This file will be read first in every future operation
- This file will be updated after every execution
  </step>

<step name="git_commit_initialization">
Commit project initialization (brief + roadmap + state together):

```bash
git add .planning/PROJECT.md .planning/ROADMAP.md .planning/STATE.md
git add .planning/phases/
# config.json if exists
git add .planning/config.json 2>/dev/null
git commit -m "$(cat <<'EOF'
docs: initialize [project-name] ([N] phases)

[One-liner from PROJECT.md]

Phases:
1. [phase-name]: [goal]
2. [phase-name]: [goal]
3. [phase-name]: [goal]
EOF
)"
```

Confirm: "Committed: docs: initialize [project] ([N] phases)"
</step>

<step name="offer_next">
```
Project initialized:
- Brief: .planning/PROJECT.md
- Roadmap: .planning/ROADMAP.md
- State: .planning/STATE.md
- Committed as: docs: initialize [project] ([N] phases)

## To Continue

Run `/clear`, then paste one of:

**To discuss Phase 1 context first:**
```
/gsd:discuss-phase 1
```

**To plan Phase 1 directly:**
```
/gsd:plan-phase 1
```
```
</step>

</process>

<phase_naming>
Use `XX-kebab-case-name` format:
- `01-foundation`
- `02-authentication`
- `03-core-features`
- `04-polish`

Numbers ensure ordering. Names describe content.
</phase_naming>

<anti_patterns>
- Don't add time estimates
- Don't create Gantt charts
- Don't add resource allocation
- Don't include risk matrices
- Don't impose arbitrary phase counts (let the work determine the count)

Phases are buckets of work, not project management artifacts.
</anti_patterns>

<success_criteria>
Roadmap is complete when:
- [ ] `.planning/ROADMAP.md` exists
- [ ] `.planning/STATE.md` exists (project memory initialized)
- [ ] Phases defined with clear names (count derived from work, not imposed)
- [ ] **Research flags assigned** (Likely/Unlikely for each phase)
- [ ] **Research topics listed** for Likely phases
- [ ] Phase directories created
- [ ] Dependencies noted if any
- [ ] Status tracking in place
</success_criteria>
```
