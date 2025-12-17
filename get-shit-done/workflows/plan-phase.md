<decimal_phase_numbering>
Decimal phases enable urgent work insertion without renumbering:

- Integer phases (1, 2, 3) = planned milestone work
- Decimal phases (2.1, 2.2) = urgent insertions between integers

**Rules:**

- Decimals must be between consecutive integers (2.1 between 2 and 3)
- Filesystem sorting works automatically (2 < 2.1 < 2.2 < 3)
- Execution order follows numeric sort
- Directory format: `02.1-description/` (note the dot)
- Plan format: `02.1-01-PLAN.md`

**Example:**

```
Roadmap before insertion:
- Phase 72: Analytics (complete)
- Phase 73: Dashboard (planned)

User: "Need Sentry bugfix before Phase 73"

System creates Phase 72.1:
- Phase 72: Analytics (complete)
- Phase 72.1: Sentry Bugfix (INSERTED)
- Phase 73: Dashboard (planned)

Execution order: 72 → 72.1 → 73
```

**Validation:**
When creating decimal phase X.Y:

1. Integer phase X must exist and be complete
2. Integer phase X+1 must exist in roadmap
3. Decimal X.Y must not already exist
4. Y must be >= 1
   </decimal_phase_numbering>

<required_reading>
**Read these files NOW:**

1. ~/.claude/get-shit-done/templates/phase-prompt.md
2. ~/.claude/get-shit-done/references/plan-format.md
3. ~/.claude/get-shit-done/references/scope-estimation.md
4. ~/.claude/get-shit-done/references/checkpoints.md
5. Read `.planning/ROADMAP.md`
6. Read `.planning/PROJECT.md`

**Load domain expertise from ROADMAP:** 7. Parse ROADMAP.md's `## Domain Expertise` section for paths 8. Read each domain SKILL.md (these serve as indexes) 9. Determine phase type from ROADMAP (UI, database, API, shaders, etc.) 10. Check each SKILL.md's `<references_index>` section 11. Load ONLY references relevant to THIS phase type

**Example:** Planning a UI phase for an ISF shader macOS app:

- ROADMAP says: `expertise/isf-shaders`, `expertise/macos-apps`
- Read both SKILL.md files
- isf-shaders `<references_index>` says: "For UI phases: references/parameter-ui.md"
- macos-apps `<references_index>` says: "For UI phases: references/swiftui-layout.md"
- Load those two references, not everything
  </required_reading>

<purpose>
Create an executable phase prompt (PLAN.md). This is where we get specific:
objective, context, tasks, verification, success criteria, and output specification.

**Key insight:** PLAN.md IS the prompt that Claude executes. Not a document that
gets transformed into a prompt.
</purpose>

<process>

<step name="load_project_state" priority="first">
Before any planning, read project state:

```bash
cat .planning/STATE.md 2>/dev/null
```

**If file exists:** Parse and internalize:

- Current position (which phase we're planning)
- Accumulated decisions (constraints on this phase)
- Deferred issues (candidates for inclusion in this phase)
- Blockers/concerns (things this phase may need to address)
- Brief alignment status (are we on track?)

**If file missing but .planning/ exists:**

```
STATE.md missing but planning artifacts exist.
Options:
1. Reconstruct from existing artifacts
2. Continue without project state (may lose accumulated context)
```

This ensures planning has full project context.
</step>

<step name="identify_phase">
Check roadmap for phases:
```bash
cat .planning/ROADMAP.md
ls .planning/phases/
```

If multiple phases available, ask which one to plan.
If obvious (first incomplete phase), proceed.

**Phase number parsing:**

When user provides phase number, parse using regex: `^(\d+)(?:\.(\d+))?$`

- Group 1: Integer part (required) - e.g., "2" from "2" or "2.1"
- Group 2: Decimal part (optional) - e.g., "1" from "2.1"

**If decimal phase (e.g., 72.1):**

Validate insertion:

1. Check integer phase X (72) exists in roadmap: `grep "Phase 72:" ROADMAP.md`
2. Check integer phase X (72) is complete: Look for "Complete" status
3. Check integer phase X+1 (73) exists in roadmap: `grep "Phase 73:" ROADMAP.md`
4. Check decimal X.Y (72.1) doesn't already exist: `ls .planning/phases/ | grep "^72\.1-"`
5. Decimal part Y must be >= 1

If validation fails, explain issue and suggest correction.

**Directory naming:**

```bash
# Integer phase: 01-foundation
# Decimal phase: 01.1-hotfix

if decimal:
  DIR_NAME="${PHASE_INT}.${PHASE_DEC}-${SLUG}"
else:
  DIR_NAME="${PHASE_INT}-${SLUG}"
fi
```

**Roadmap marking:**

When creating decimal phases, mark them as "(INSERTED)" in roadmap entries.

Read any existing PLAN.md or DISCOVERY.md in the phase directory.
</step>

<step name="mandatory_discovery">
**Discovery is MANDATORY unless you can prove current context exists.**

Claude's training data is 6-18 months stale. Treat pre-existing knowledge as hypothesis, not fact.

<discovery_decision_tree>

````
Starting discovery for Phase [X]...
    ↓
CHECK ROADMAP FLAG FIRST
─────────────────────────────────────
```bash
# Check if roadmap flagged this phase for research
grep -A2 "Phase [X]:" .planning/ROADMAP.md | grep "Research:"
```

→ If `Research: Likely` → Minimum depth is Level 1 (don't skip to Level 0)
→ If `Research: Unlikely` → Level 0 check still runs (might escalate)
→ Flag is a hint, not a mandate - actual depth determined below
↓
LEVEL 0: Pattern Check (30 seconds)
─────────────────────────────────────
**Skip this check if roadmap flagged Research: Likely**

Is this pure internal work using ONLY existing codebase patterns?

Check with:

```bash
# Look for existing patterns in codebase
grep -r "libraryName" src/ 2>/dev/null | head -5
ls src/components/ 2>/dev/null  # existing UI patterns
cat package.json 2>/dev/null | grep -A5 '"dependencies"'
```

→ If ALL work follows established codebase patterns: SKIP discovery, proceed to planning
→ If ANY external dependency, new library, or API integration: Continue to Level 1+
↓
Does fresh DISCOVERY.md exist?
─────────────────────────────────────

```bash
ls .planning/phases/XX-name/DISCOVERY.md 2>/dev/null
```

If exists, check freshness:

- General libraries/frameworks: Valid for 30 days
- Fast-moving APIs (Stripe, OpenAI, etc.): Valid for 7 days
- Check file date vs today

→ If fresh DISCOVERY.md exists covering this phase's topics: SKIP discovery, use existing
→ If missing or stale: Continue to determine depth
↓
Determine Discovery Depth
─────────────────────────────────────
Assess the phase requirements:

**LEVEL 1 - Quick Verification (2-5 min):**
Use when:

- Single known library, just confirming syntax/version
- Low-risk decision (easily changed later)
- "Is X still the right choice?"

Action:

1. Context7: mcp**context7**resolve-library-id → mcp**context7**get-library-docs
2. Verify current version/API matches expectations
3. No DISCOVERY.md needed - proceed with confirmed knowledge

**LEVEL 2 - Standard Research (15-30 min):**
Use when:

- Choosing between 2-3 options
- New external integration (API, service)
- Medium-risk decision

Action:

1. Route to workflows/discovery-phase.md with depth=standard
2. Produces DISCOVERY.md with recommendation
3. Return here after DISCOVERY.md created

**LEVEL 3 - Deep Dive (1+ hour):**
Use when:

- Architectural decision with long-term impact
- Novel problem without clear patterns
- High-risk, hard to change later
- Multiple interacting systems

Action:

1. Route to workflows/discovery-phase.md with depth=deep
2. Full discovery with cross-verification
3. DISCOVERY.md with detailed rationale and validation checkpoints
4. Return here after DISCOVERY.md created

**NOTE:** For niche/complex domains (3D, games, audio, shaders, ML), consider using `/gsd:research-phase` BEFORE plan-phase. This produces comprehensive RESEARCH.md with ecosystem knowledge that goes beyond "which library" to "how do experts build this."

```
</discovery_decision_tree>

<depth_indicators>
**Signals requiring LEVEL 2+:**
- Phase involves new library not in package.json
- Phase involves external API integration
- Phase description includes "choose", "select", "evaluate"
- Roadmap marked this phase with `Research: Yes`
- Technology mentioned that Claude hasn't used in THIS codebase

**Signals requiring LEVEL 3:**
- Words like "architecture", "design", "system"
- Integration between multiple external services
- Data modeling decisions
- Authentication/authorization design
- Real-time, sync, or distributed systems
</depth_indicators>

<skip_conditions>
**Discovery can be skipped (Level 0) ONLY when ALL true:**
□ Pattern already exists in codebase (grep confirms)
□ No new external dependencies
□ Fresh DISCOVERY.md exists (if external deps involved)
□ Pure internal refactoring or feature extension
□ Using established project conventions only

**Examples that skip discovery:**
- "Add delete button" → existing button patterns in codebase
- "Add field to model" → Prisma/schema patterns established
- "Create CRUD endpoint" → existing API patterns to follow

**Examples that REQUIRE discovery:**
- "Add authentication" → Level 2-3 (new system, choices to make)
- "Integrate Stripe" → Level 2 (external API)
- "Add email service" → Level 2 (compare options)
- "Design data sync" → Level 3 (architectural)
</skip_conditions>

Present discovery decision:
```

Phase [X]: [Name]

Discovery assessment:

- Roadmap flag: [Likely / Unlikely] ([reason from roadmap])
- Roadmap topics: [topics if flagged, or N/A]
- New external dependencies: [yes/no - list them]
- Existing DISCOVERY.md: [yes (date) / no]
- Codebase patterns exist: [yes/no]

Discovery depth: [Level 0 (skip) / Level 1 (verify) / Level 2 (standard) / Level 3 (deep)]
Reason: [one line explanation]

[If Level 1: Proceeding with quick verification...]
[If Level 2-3: Routing to research workflow...]
[If Level 0: Skipping discovery, proceeding to planning...]

````

**Note:** If roadmap flagged `Research: Likely`, Level 0 (skip) is not available.
The roadmap flag lowers the bar for triggering research but doesn't guarantee depth.
</step>

<step name="read_project_history">
Before planning, absorb accumulated project wisdom. This is the **context injection** that ensures each phase benefits from all prior phases.

**1. From STATE.md (already loaded):**

- Decisions table → These CONSTRAIN this phase's approach
- Deferred issues → Candidates for inclusion in this phase
- Blockers/concerns → Things this phase may need to address

**2. Read previous phase summaries:**

```bash
# List all summaries from prior phases
ls .planning/phases/*/*-SUMMARY.md 2>/dev/null | sort
```

Don't load ALL summaries into context—scan them looking for:

- Decisions that constrain this phase's approach
- Issues flagged for "later" where "later" is now
- Warnings in "Next Phase Readiness" that apply
- Patterns established that should be maintained

**3. Read ISSUES.md:**

```bash
cat .planning/ISSUES.md 2>/dev/null
```

For each open issue, assess:

- Is this relevant to the phase being planned?
- Has it been waiting long enough to address?
- Would addressing it now be natural (same files/subsystem)?
- Is it blocking something this phase needs?

**4. Synthesize into planning context:**

Before proceeding to task breakdown, answer:

**Q1: What decisions from previous phases constrain this phase?**
→ These become explicit notes in task `<action>` sections
Example: "Use jose (NOT jsonwebtoken - see Phase 1 decision)"

**Q2: Are there deferred issues that should become tasks?**
→ These get added to the task list, marked "Addressing ISS-XXX"
Example: "Task 3: Add rate limiting (ISS-001 from Phase 2)"

**Q3: Are there concerns from "Next Phase Readiness" that apply?**
→ These inform verification criteria or become explicit tasks
Example: "Load test auth endpoints (Phase 2 concern)"

**Q4: Given all context, does the roadmap's description still make sense?**
→ If not, flag: "Phase as described may need adjustment because [X]"

**5. Document what will inform the plan:**

Track for inclusion in PLAN.md `<context>` section:

- Which prior summaries are relevant (will be @referenced)
- Which decisions apply (brief notes)
- Which issues are being addressed (ISS-XXX numbers)
- Which concerns are being verified
  </step>

<step name="gather_phase_context">
For this specific phase, understand:
- What's the phase goal? (from roadmap)
- What exists already? (scan codebase if mid-project)
- What dependencies are met? (previous phases complete?)
- Any ecosystem research? (RESEARCH.md from /gsd:research-phase)
- Any discovery findings? (DISCOVERY.md from mandatory discovery)
- Any phase context? ({phase}-CONTEXT.md from /gsd:discuss-phase)

```bash
# If mid-project, understand current state
ls -la src/ 2>/dev/null
cat package.json 2>/dev/null | head -20

# Check for comprehensive ecosystem research (created by /gsd:research-phase)
cat .planning/phases/XX-name/${PHASE}-RESEARCH.md 2>/dev/null

# Check for phase-specific context (created by /gsd:discuss-phase)
cat .planning/phases/XX-name/${PHASE}-CONTEXT.md 2>/dev/null
```

**If {phase}-RESEARCH.md exists:**
This file contains comprehensive ecosystem research for niche/complex domains. It captures:
- Standard stack (libraries, versions, why they're standard)
- Architecture patterns (how experts structure this type of project)
- Don't hand-roll list (problems with existing solutions - use libraries instead)
- Common pitfalls (mistakes to avoid)
- Code examples (verified patterns from authoritative sources)

**You MUST use this research to inform your planning:**

- `<standard_stack>` → use these libraries, don't pick alternatives without reason
- `<architecture_patterns>` → follow these patterns in task structure
- `<dont_hand_roll>` → NEVER create custom solutions for listed problems
- `<common_pitfalls>` → inform verification criteria, add warnings to task actions
- `<code_examples>` → reference in task actions when applicable

**If {phase}-CONTEXT.md exists:**
This file contains the user's vision gathered through pre-planning discussion. It captures how they imagine this phase working, what's essential, and what's out of scope.

**You MUST use this context to inform your planning:**

- `<vision>` → how the user imagines this working (honor their intent)
- `<essential>` → what must be nailed in this phase (prioritize these)
- `<boundaries>` → what's explicitly out of scope (don't add these)
- `<specifics>` → particular look/feel/behavior mentioned (incorporate these)
- `<notes>` → additional context that informs approach

**If neither RESEARCH.md nor CONTEXT.md exist:**
For niche domains (3D, games, audio, shaders, etc.), suggest `/gsd:research-phase {phase}` first.
For simpler domains, suggest `/gsd:discuss-phase {phase}` or proceed with roadmap description only.

</step>

<step name="break_into_tasks">
Decompose the phase into tasks.

Each task must have:

- **Type**: auto, checkpoint:human-verify, checkpoint:decision (human-action rarely needed)
- **Task name**: Clear, action-oriented
- **Files**: Which files created/modified (for auto tasks)
- **Action**: Specific implementation (including what to avoid and WHY)
- **Verify**: How to prove it worked
- **Done**: Acceptance criteria

**Assess TDD fit for each task:**

TDD produces better design and catches bugs early. Use it when you can define expected behavior upfront.

For each task, ask: Can I write `expect(fn(input)).toBe(output)` before writing `fn`?

→ **Yes** (business logic, APIs, transformations, validation, state machines):
  Structure test-first. Task action: "Implement X with TDD—write failing test, then implement to pass."

→ **No** (UI layout, config, glue code, exploration):
  Standard implementation. Add tests after if coverage needed.

**Identify checkpoints:**

- Claude automated work needing visual/functional verification? → checkpoint:human-verify
- Implementation choices to make? → checkpoint:decision
- Truly unavoidable manual action (email link, 2FA)? → checkpoint:human-action (rare)

**Critical:** If external resource has CLI/API (Vercel, Stripe, Upstash, GitHub, etc.), use type="auto" to automate it. Only checkpoint for verification AFTER automation.

See ~/.claude/get-shit-done/references/checkpoints.md for checkpoint structure and automation guidance.
</step>

<step name="estimate_scope">
After breaking into tasks, assess scope against the **quality degradation curve**.

**ALWAYS split if:**

- > 3 tasks total
- Multiple subsystems (DB + API + UI = separate plans)
- > 5 files modified in any single task
- Complex domains (auth, payments, data modeling)

**Aggressive atomicity principle:** Better to have 10 small, high-quality plans than 3 large, degraded plans.

**If scope is appropriate (2-3 tasks, single subsystem, <5 files per task):**
Proceed to confirm_breakdown for a single plan.

**If scope is large (>3 tasks):**
Split into multiple plans by:

- Subsystem (01-01: Database, 01-02: API, 01-03: UI, 01-04: Frontend)
- Dependency (01-01: Setup, 01-02: Core, 01-03: Features, 01-04: Testing)
- Complexity (01-01: Layout, 01-02: Data fetch, 01-03: Visualization)
- Autonomous vs Interactive (group auto tasks for subagent execution)

**Each plan must be:**

- 2-3 tasks maximum
- ~50% context target (not 80%)
- Independently committable

**Autonomous plan optimization:**

- Plans with NO checkpoints → will execute via subagent (fresh context)
- Plans with checkpoints → execute in main context (user interaction required)
- Try to group autonomous work together for maximum fresh contexts

See ~/.claude/get-shit-done/references/scope-estimation.md for complete splitting guidance and quality degradation analysis.
</step>

<step name="confirm_breakdown">
<config-check>
```bash
cat .planning/config.json 2>/dev/null
```
</config-check>

<if mode="yolo">
```
⚡ Auto-approved: Phase [X] breakdown ([N] tasks, [M] plan(s))

[Brief breakdown summary - task names and types only]

Proceeding to plan creation...
```

Skip directly to write_phase_prompt step.
</if>

<if mode="interactive" OR="custom with gates.confirm_breakdown true">
Present the breakdown inline and wait for confirmation:

**If single plan (2-3 tasks):**

```
Here's the proposed breakdown for Phase [X]:

### Tasks (single plan: {phase}-01-PLAN.md)
1. [Task name] - [brief description] [type: auto/checkpoint]
2. [Task name] - [brief description] [type: auto/checkpoint]
[3. [Task name] - [brief description] [type: auto/checkpoint]] (optional 3rd task if small)

Autonomous: [yes/no] (no checkpoints = subagent execution with fresh context)

Does this breakdown look right? (yes / adjust / start over)
```

**If multiple plans (>3 tasks or multiple subsystems):**

```
Here's the proposed breakdown for Phase [X]:

This phase requires [N] plans to maintain quality:

### Plan 1: {phase}-01-PLAN.md - [Subsystem/Component Name]
1. [Task name] - [brief description] [type]
2. [Task name] - [brief description] [type]
3. [Task name] - [brief description] [type]

### Plan 2: {phase}-02-PLAN.md - [Subsystem/Component Name]
1. [Task name] - [brief description] [type]
2. [Task name] - [brief description] [type]

[Additional plans as needed...]

Each plan is independently executable and scoped to ~50% context.

Does this breakdown look right? (yes / adjust / start over)
```

Wait for confirmation before proceeding.

If "adjust": Ask what to change, revise, present again.
If "start over": Return to gather_phase_context step.
</if>
</step>

<step name="approach_ambiguity">
If multiple valid approaches exist for any task:

Use AskUserQuestion:

- header: "Approach"
- question: "For [task], there are multiple valid approaches:"
- options:
  - "[Approach A]" - [tradeoff description]
  - "[Approach B]" - [tradeoff description]
  - "Decide for me" - Use your best judgment

Only ask if genuinely ambiguous. Don't ask obvious choices.
</step>

<step name="decision_gate">
<if mode="yolo">
```
⚡ Auto-approved: Create phase prompt for Phase [X]
```

Skip directly to write_phase_prompt step.
</if>

<if mode="interactive" OR="custom with gates.confirm_plan true">
Use AskUserQuestion:

- header: "Ready"
- question: "Ready to create the phase prompt, or would you like me to ask more questions?"
- options:
  - "Create phase prompt" - I have enough context
  - "Ask more questions" - There are details to clarify
  - "Let me add context" - I want to provide more information

Loop until "Create phase prompt" selected.
</if>
</step>

<step name="write_phase_prompt">
Use template from `~/.claude/get-shit-done/templates/phase-prompt.md`.

**If single plan:**
Write to `.planning/phases/XX-name/{phase}-01-PLAN.md`

**If multiple plans:**
Write multiple files:

- `.planning/phases/XX-name/{phase}-01-PLAN.md`
- `.planning/phases/XX-name/{phase}-02-PLAN.md`
- `.planning/phases/XX-name/{phase}-03-PLAN.md`

Each file follows the template structure:

```markdown
---
phase: XX-name
plan: { plan-number }
type: execute
domain: [if domain expertise loaded]
---

<objective>
[Plan-specific goal - what this plan accomplishes]

Purpose: [Why this plan matters for the phase]
Output: [What artifacts will be created by this plan]
</objective>

<execution_context>
./execute-phase.md
~/.claude/get-shit-done/templates/summary.md
[If plan has ANY checkpoint tasks (type="checkpoint:*"), add:]
~/.claude/get-shit-done/references/checkpoints.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md

[If comprehensive ecosystem research exists (from /gsd:research-phase):]
@.planning/phases/XX-name/{phase}-RESEARCH.md

[If discovery done (from mandatory discovery):]
@.planning/phases/XX-name/DISCOVERY.md

[If phase context exists (from /gsd:discuss-phase):]
@.planning/phases/XX-name/{phase}-CONTEXT.md

[If continuing from previous plan in same phase:]
@.planning/phases/XX-name/{phase}-{prev}-SUMMARY.md

[Prior phase summaries relevant to this work (from read_project_history):]
@.planning/phases/01-foundation/01-02-SUMMARY.md # If contains relevant decisions
@.planning/phases/02-auth/02-01-SUMMARY.md # If contains relevant patterns

[Document what prior context informed this plan:]
**Prior decisions affecting this phase:**

- [Decision from Phase X that constrains approach]
- [Decision from Phase Y that establishes pattern]

**Deferred issues being addressed:**

- ISS-XXX: [description] (from Phase Z)

**Concerns being verified:**

- [Concern from Phase W's "Next Phase Readiness"]

[Relevant source files:]
@src/path/to/relevant.ts
</context>

<tasks>
[Tasks in XML format with type attribute]
[Mix of type="auto" and type="checkpoint:*" as needed]
</tasks>

<verification>
[Overall plan verification checks]
</verification>

<success_criteria>
[Measurable completion criteria for this plan]
</success_criteria>

<output>
After completion, create `.planning/phases/XX-name/{phase}-{plan}-SUMMARY.md`
[Include summary structure from template]
</output>
```

**For multi-plan phases:**

- Each plan has focused scope (3-6 tasks)
- Plans reference previous plan summaries in context
- Last plan's success criteria includes "Phase X complete"
  </step>

<step name="offer_next">
**If single plan:**
```
Phase plan created: .planning/phases/XX-name/{phase}-01-PLAN.md
[X] tasks defined.

## To Continue

Run `/clear`, then paste:
```
/gsd:execute-plan .planning/phases/XX-name/{phase}-01-PLAN.md
```

Other options:
- Review/adjust tasks before executing
```

**If multiple plans:**
```

Phase plans created:

- {phase}-01-PLAN.md ([X] tasks) - [Subsystem name]
- {phase}-02-PLAN.md ([X] tasks) - [Subsystem name]
- {phase}-03-PLAN.md ([X] tasks) - [Subsystem name]

Total: [X] tasks across [Y] focused plans.

## To Continue

Run `/clear`, then paste:
```
/gsd:execute-plan .planning/phases/XX-name/{phase}-01-PLAN.md
```

Other options:
- Review/adjust tasks before executing
```
</step>

</process>

<task_quality>
Good tasks:
- "Add User model to Prisma schema with email, passwordHash, createdAt"
- "Create POST /api/auth/login endpoint with bcrypt validation"
- "Add protected route middleware checking JWT in cookies"

Bad tasks:
- "Set up authentication" (too vague)
- "Make it secure" (not actionable)
- "Handle edge cases" (which ones?)

If you can't specify Files + Action + Verify + Done, the task is too vague.
</task_quality>

<anti_patterns>
- Don't add story points
- Don't estimate hours
- Don't assign to team members
- Don't add acceptance criteria committees
- Don't create sub-sub-sub tasks

Tasks are instructions for Claude, not Jira tickets.
</anti_patterns>

<success_criteria>
Phase planning is complete when:
- [ ] STATE.md read and project history absorbed
- [ ] **Mandatory discovery completed** (Level 0-3 as appropriate)
- [ ] If Level 2-3: DISCOVERY.md exists with current context
- [ ] If Level 1: Quick verification performed via Context7
- [ ] If RESEARCH.md exists: ecosystem knowledge incorporated into plan
- [ ] Prior decisions, issues, and concerns synthesized
- [ ] One or more PLAN files exist with XML structure ({phase}-{plan}-PLAN.md)
- [ ] Each plan has: Objective, context, tasks, verification, success criteria, output
- [ ] @context references included (including STATE.md, RESEARCH.md if exists, DISCOVERY.md if exists, relevant prior summaries)
- [ ] Prior decisions documented in context section
- [ ] Deferred issues being addressed are noted
- [ ] Each plan has 2-3 tasks (scoped to ~50% context)
- [ ] Each task has: Type, Files (if auto), Action, Verify, Done
- [ ] Checkpoints identified and properly structured
- [ ] Tasks are specific enough for Claude to execute
- [ ] If RESEARCH.md exists: "don't hand-roll" items are NOT being custom-built
- [ ] If multiple plans: logical split by subsystem/dependency/complexity
- [ ] User knows next steps
</success_criteria>
```
