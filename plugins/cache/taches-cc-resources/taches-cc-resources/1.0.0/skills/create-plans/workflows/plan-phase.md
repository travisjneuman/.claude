# Workflow: Plan Phase

<required_reading>
**Read these files NOW:**
1. templates/phase-prompt.md
2. references/plan-format.md
3. references/scope-estimation.md
4. references/checkpoints.md
5. Read `.planning/ROADMAP.md`
6. Read `.planning/BRIEF.md`

**If domain expertise should be loaded (determined by intake):**
7. Read domain SKILL.md: `~/.claude/skills/expertise/[domain]/SKILL.md`
8. Determine phase type from ROADMAP (UI, database, API, etc.)
9. Read ONLY relevant references from domain's `<references_index>` section
</required_reading>

<purpose>
Create an executable phase prompt (PLAN.md). This is where we get specific:
objective, context, tasks, verification, success criteria, and output specification.

**Key insight:** PLAN.md IS the prompt that Claude executes. Not a document that
gets transformed into a prompt.
</purpose>

<process>

<step name="identify_phase">
Check roadmap for phases:
```bash
cat .planning/ROADMAP.md
ls .planning/phases/
```

If multiple phases available, ask which one to plan.
If obvious (first incomplete phase), proceed.

Read any existing PLAN.md or FINDINGS.md in the phase directory.
</step>

<step name="check_research_needed">
For this phase, assess:
- Are there technology choices to make?
- Are there unknowns about the approach?
- Do we need to investigate APIs or libraries?

If yes: Route to workflows/research-phase.md first.
Research produces FINDINGS.md, then return here.

If no: Proceed with planning.
</step>

<step name="gather_phase_context">
For this specific phase, understand:
- What's the phase goal? (from roadmap)
- What exists already? (scan codebase if mid-project)
- What dependencies are met? (previous phases complete?)
- Any research findings? (FINDINGS.md)

```bash
# If mid-project, understand current state
ls -la src/ 2>/dev/null
cat package.json 2>/dev/null | head -20
```
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

**Identify checkpoints:**
- Claude automated work needing visual/functional verification? → checkpoint:human-verify
- Implementation choices to make? → checkpoint:decision
- Truly unavoidable manual action (email link, 2FA)? → checkpoint:human-action (rare)

**Critical:** If external resource has CLI/API (Vercel, Stripe, Upstash, GitHub, etc.), use type="auto" to automate it. Only checkpoint for verification AFTER automation.

See references/checkpoints.md and references/cli-automation.md for checkpoint structure and automation guidance.
</step>

<step name="estimate_scope">
After breaking into tasks, assess scope against the **quality degradation curve**.

**ALWAYS split if:**
- >3 tasks total
- Multiple subsystems (DB + API + UI = separate plans)
- >5 files modified in any single task
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

See references/scope-estimation.md for complete splitting guidance and quality degradation analysis.
</step>

<step name="confirm_breakdown">
Present the breakdown inline:

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

This phase requires 3 plans to maintain quality:

### Plan 1: {phase}-01-PLAN.md - [Subsystem/Component Name]
1. [Task name] - [brief description] [type]
2. [Task name] - [brief description] [type]
3. [Task name] - [brief description] [type]

### Plan 2: {phase}-02-PLAN.md - [Subsystem/Component Name]
1. [Task name] - [brief description] [type]
2. [Task name] - [brief description] [type]

### Plan 3: {phase}-03-PLAN.md - [Subsystem/Component Name]
1. [Task name] - [brief description] [type]
2. [Task name] - [brief description] [type]

Each plan is independently executable and scoped to ~80% context.

Does this breakdown look right? (yes / adjust / start over)
```

Wait for confirmation before proceeding.

If "adjust": Ask what to change, revise, present again.
If "start over": Return to gather_phase_context step.
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
After breakdown confirmed:

Use AskUserQuestion:
- header: "Ready"
- question: "Ready to create the phase prompt, or would you like me to ask more questions?"
- options:
  - "Create phase prompt" - I have enough context
  - "Ask more questions" - There are details to clarify
  - "Let me add context" - I want to provide more information

Loop until "Create phase prompt" selected.
</step>

<step name="write_phase_prompt">
Use template from `templates/phase-prompt.md`.

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
plan: {plan-number}
type: execute
domain: [if domain expertise loaded]
---

<objective>
[Plan-specific goal - what this plan accomplishes]

Purpose: [Why this plan matters for the phase]
Output: [What artifacts will be created by this plan]
</objective>

<execution_context>
@~/.claude/skills/create-plans/workflows/execute-phase.md
@~/.claude/skills/create-plans/templates/summary.md
[If plan has ANY checkpoint tasks (type="checkpoint:*"), add:]
@~/.claude/skills/create-plans/references/checkpoints.md
</execution_context>

<context>
@.planning/BRIEF.md
@.planning/ROADMAP.md
[If research done:]
@.planning/phases/XX-name/FINDINGS.md
[If continuing from previous plan:]
@.planning/phases/XX-name/{phase}-{prev}-SUMMARY.md
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

What's next?
1. Execute plan
2. Review/adjust tasks
3. Done for now
```

**If multiple plans:**
```
Phase plans created:
- {phase}-01-PLAN.md ([X] tasks) - [Subsystem name]
- {phase}-02-PLAN.md ([X] tasks) - [Subsystem name]
- {phase}-03-PLAN.md ([X] tasks) - [Subsystem name]

Total: [X] tasks across [Y] focused plans.

What's next?
1. Execute first plan ({phase}-01)
2. Review/adjust tasks
3. Done for now
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
- [ ] One or more PLAN files exist with XML structure ({phase}-{plan}-PLAN.md)
- [ ] Each plan has: Objective, context, tasks, verification, success criteria, output
- [ ] @context references included
- [ ] Each plan has 3-6 tasks (scoped to ~80% context)
- [ ] Each task has: Type, Files (if auto), Action, Verify, Done
- [ ] Checkpoints identified and properly structured
- [ ] Tasks are specific enough for Claude to execute
- [ ] If multiple plans: logical split by subsystem/dependency/complexity
- [ ] User knows next steps
</success_criteria>
