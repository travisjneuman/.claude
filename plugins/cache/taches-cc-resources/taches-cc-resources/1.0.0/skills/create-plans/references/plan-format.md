<overview>
Claude-executable plans have a specific format that enables Claude to implement without interpretation. This reference defines what makes a plan executable vs. vague.

**Key insight:** PLAN.md IS the executable prompt. It contains everything Claude needs to execute the phase, including objective, context references, tasks, verification, success criteria, and output specification.
</overview>

<core_principle>
A plan is Claude-executable when Claude can read the PLAN.md and immediately start implementing without asking clarifying questions.

If Claude has to guess, interpret, or make assumptions - the task is too vague.
</core_principle>

<prompt_structure>
Every PLAN.md follows this XML structure:

```markdown
---
phase: XX-name
type: execute
domain: [optional]
---

<objective>
[What and why]
Purpose: [...]
Output: [...]
</objective>

<context>
@.planning/BRIEF.md
@.planning/ROADMAP.md
@relevant/source/files.ts
</context>

<tasks>
<task type="auto">
  <name>Task N: [Name]</name>
  <files>[paths]</files>
  <action>[what to do, what to avoid and WHY]</action>
  <verify>[command/check]</verify>
  <done>[criteria]</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>[what Claude automated]</what-built>
  <how-to-verify>[numbered verification steps]</how-to-verify>
  <resume-signal>[how to continue - "approved" or describe issues]</resume-signal>
</task>

<task type="checkpoint:decision" gate="blocking">
  <decision>[what needs deciding]</decision>
  <context>[why this matters]</context>
  <options>
    <option id="option-a"><name>[Name]</name><pros>[pros]</pros><cons>[cons]</cons></option>
    <option id="option-b"><name>[Name]</name><pros>[pros]</pros><cons>[cons]</cons></option>
  </options>
  <resume-signal>[how to indicate choice]</resume-signal>
</task>
</tasks>

<verification>
[Overall phase checks]
</verification>

<success_criteria>
[Measurable completion]
</success_criteria>

<output>
[SUMMARY.md specification]
</output>
```
</prompt_structure>

<task_anatomy>
Every task has four required fields:

<field name="files">
**What it is**: Exact file paths that will be created or modified.

**Good**: `src/app/api/auth/login/route.ts`, `prisma/schema.prisma`
**Bad**: "the auth files", "relevant components"

Be specific. If you don't know the file path, figure it out first.
</field>

<field name="action">
**What it is**: Specific implementation instructions, including what to avoid and WHY.

**Good**: "Create POST endpoint that accepts {email, password}, validates using bcrypt against User table, returns JWT in httpOnly cookie with 15-min expiry. Use jose library (not jsonwebtoken - CommonJS issues with Next.js Edge runtime)."

**Bad**: "Add authentication", "Make login work"

Include: technology choices, data structures, behavior details, pitfalls to avoid.
</field>

<field name="verify">
**What it is**: How to prove the task is complete.

**Good**:
- `npm test` passes
- `curl -X POST /api/auth/login` returns 200 with Set-Cookie header
- Build completes without errors

**Bad**: "It works", "Looks good", "User can log in"

Must be executable - a command, a test, an observable behavior.
</field>

<field name="done">
**What it is**: Acceptance criteria - the measurable state of completion.

**Good**: "Valid credentials return 200 + JWT cookie, invalid credentials return 401"

**Bad**: "Authentication is complete"

Should be testable without subjective judgment.
</field>
</task_anatomy>

<task_types>
Tasks have a `type` attribute that determines how they execute:

<type name="auto">
**Default task type** - Claude executes autonomously.

**Structure:**
```xml
<task type="auto">
  <name>Task 3: Create login endpoint with JWT</name>
  <files>src/app/api/auth/login/route.ts</files>
  <action>POST endpoint accepting {email, password}. Query User by email, compare password with bcrypt. On match, create JWT with jose library, set as httpOnly cookie (15-min expiry). Return 200. On mismatch, return 401.</action>
  <verify>curl -X POST localhost:3000/api/auth/login returns 200 with Set-Cookie header</verify>
  <done>Valid credentials → 200 + cookie. Invalid → 401.</done>
</task>
```

Use for: Everything Claude can do independently (code, tests, builds, file operations).
</type>

<type name="checkpoint:human-action">
**RARELY USED** - Only for actions with NO CLI/API. Claude automates everything possible first.

**Structure:**
```xml
<task type="checkpoint:human-action" gate="blocking">
  <action>[Unavoidable manual step - email link, 2FA code]</action>
  <instructions>
    [What Claude already automated]
    [The ONE thing requiring human action]
  </instructions>
  <verification>[What Claude can check afterward]</verification>
  <resume-signal>[How to continue]</resume-signal>
</task>
```

Use ONLY for: Email verification links, SMS 2FA codes, manual approvals with no API, 3D Secure payment flows.

Do NOT use for: Anything with a CLI (Vercel, Stripe, Upstash, Railway, GitHub), builds, tests, file creation, deployments.

See: references/cli-automation.md for what Claude can automate.

**Execution:** Claude automates everything with CLI/API, stops only for truly unavoidable manual steps.
</type>

<type name="checkpoint:human-verify">
**Human must verify Claude's work** - Visual checks, UX testing.

**Structure:**
```xml
<task type="checkpoint:human-verify" gate="blocking">
  <what-built>Responsive dashboard layout</what-built>
  <how-to-verify>
    1. Run: npm run dev
    2. Visit: http://localhost:3000/dashboard
    3. Desktop (>1024px): Verify sidebar left, content right
    4. Tablet (768px): Verify sidebar collapses to hamburger
    5. Mobile (375px): Verify single column, bottom nav
    6. Check: No layout shift, no horizontal scroll
  </how-to-verify>
  <resume-signal>Type "approved" or describe issues</resume-signal>
</task>
```

Use for: UI/UX verification, visual design checks, animation smoothness, accessibility testing.

**Execution:** Claude builds the feature, stops, provides testing instructions, waits for approval/feedback.
</type>

<type name="checkpoint:decision">
**Human must make implementation choice** - Direction-setting decisions.

**Structure:**
```xml
<task type="checkpoint:decision" gate="blocking">
  <decision>Select authentication provider</decision>
  <context>We need user authentication. Three approaches with different tradeoffs:</context>
  <options>
    <option id="supabase">
      <name>Supabase Auth</name>
      <pros>Built-in with Supabase, generous free tier</pros>
      <cons>Less customizable UI, tied to ecosystem</cons>
    </option>
    <option id="clerk">
      <name>Clerk</name>
      <pros>Beautiful pre-built UI, best DX</pros>
      <cons>Paid after 10k MAU</cons>
    </option>
    <option id="nextauth">
      <name>NextAuth.js</name>
      <pros>Free, self-hosted, maximum control</pros>
      <cons>More setup, you manage security</cons>
    </option>
  </options>
  <resume-signal>Select: supabase, clerk, or nextauth</resume-signal>
</task>
```

Use for: Technology selection, architecture decisions, design choices, feature prioritization.

**Execution:** Claude presents options with balanced pros/cons, waits for decision, proceeds with chosen direction.
</type>

**When to use checkpoints:**
- Visual/UX verification (after Claude builds) → `checkpoint:human-verify`
- Implementation direction choice → `checkpoint:decision`
- Truly unavoidable manual actions (email links, 2FA) → `checkpoint:human-action` (rare)

**When NOT to use checkpoints:**
- Anything with CLI/API (Claude automates it) → `type="auto"`
- Deployments (Vercel, Railway, Fly) → `type="auto"` with CLI
- Creating resources (Upstash, Stripe, GitHub) → `type="auto"` with CLI/API
- File operations, tests, builds → `type="auto"`

**Golden rule:** If Claude CAN automate it, Claude MUST automate it. See: references/cli-automation.md

See `references/checkpoints.md` for comprehensive checkpoint guidance.
</task_types>

<context_references>
Use @file references to load context for the prompt:

```markdown
<context>
@.planning/BRIEF.md           # Project vision
@.planning/ROADMAP.md         # Phase structure
@.planning/phases/02-auth/FINDINGS.md  # Research results
@src/lib/db.ts                # Existing database setup
@src/types/user.ts            # Existing type definitions
</context>
```

Reference files that Claude needs to understand before implementing.
</context_references>

<verification_section>
Overall phase verification (beyond individual task verification):

```markdown
<verification>
Before declaring phase complete:
- [ ] `npm run build` succeeds without errors
- [ ] `npm test` passes all tests
- [ ] No TypeScript errors
- [ ] Feature works end-to-end manually
</verification>
```
</verification_section>

<success_criteria_section>
Measurable criteria for phase completion:

```markdown
<success_criteria>
- All tasks completed
- All verification checks pass
- No errors or warnings introduced
- JWT auth flow works end-to-end
- Protected routes redirect unauthenticated users
</success_criteria>
```
</success_criteria_section>

<output_section>
Specify the SUMMARY.md structure:

```markdown
<output>
After completion, create `.planning/phases/XX-name/SUMMARY.md`:

# Phase X: Name Summary

**[Substantive one-liner]**

## Accomplishments
## Files Created/Modified
## Decisions Made
## Issues Encountered
## Next Phase Readiness
</output>
```
</output_section>

<specificity_levels>
<too_vague>
```xml
<task type="auto">
  <name>Task 1: Add authentication</name>
  <files>???</files>
  <action>Implement auth</action>
  <verify>???</verify>
  <done>Users can authenticate</done>
</task>
```

Claude: "How? What type? What library? Where?"
</too_vague>

<just_right>
```xml
<task type="auto">
  <name>Task 1: Create login endpoint with JWT</name>
  <files>src/app/api/auth/login/route.ts</files>
  <action>POST endpoint accepting {email, password}. Query User by email, compare password with bcrypt. On match, create JWT with jose library, set as httpOnly cookie (15-min expiry). Return 200. On mismatch, return 401. Use jose instead of jsonwebtoken (CommonJS issues with Edge).</action>
  <verify>curl -X POST localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"test123"}' returns 200 with Set-Cookie header containing JWT</verify>
  <done>Valid credentials → 200 + cookie. Invalid → 401. Missing fields → 400.</done>
</task>
```

Claude can implement this immediately.
</just_right>

<too_detailed>
Writing the actual code in the plan. Trust Claude to implement from clear instructions.
</too_detailed>
</specificity_levels>

<anti_patterns>
<vague_actions>
- "Set up the infrastructure"
- "Handle edge cases"
- "Make it production-ready"
- "Add proper error handling"

These require Claude to decide WHAT to do. Specify it.
</vague_actions>

<unverifiable_completion>
- "It works correctly"
- "User experience is good"
- "Code is clean"
- "Tests pass" (which tests? do they exist?)

These require subjective judgment. Make it objective.
</unverifiable_completion>

<missing_context>
- "Use the standard approach"
- "Follow best practices"
- "Like the other endpoints"

Claude doesn't know your standards. Be explicit.
</missing_context>
</anti_patterns>

<sizing_tasks>
Good task size: 15-60 minutes of Claude work.

**Too small**: "Add import statement for bcrypt" (combine with related task)
**Just right**: "Create login endpoint with JWT validation" (focused, specific)
**Too big**: "Implement full authentication system" (split into multiple plans)

If a task takes multiple sessions, break it down.
If a task is trivial, combine with related tasks.

**Note on scope:** If a phase has >7 tasks or spans multiple subsystems, split into multiple plans using the naming convention `{phase}-{plan}-PLAN.md`. See `references/scope-estimation.md` for guidance.
</sizing_tasks>
