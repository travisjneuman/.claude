<required_reading>
**Read these files NOW:**

1. `.planning/STATE.md`
2. `.planning/ROADMAP.md`
3. Current phase's plan files (`*-PLAN.md`)
4. Current phase's summary files (`*-SUMMARY.md`)
   </required_reading>

<purpose>
Mark current phase complete and advance to next. This is the natural point
where progress tracking happens - implicit via forward motion.

"Planning next phase" = "current phase is done"
</purpose>

<process>

<step name="load_project_state" priority="first">
Before transition, read project state:

```bash
cat .planning/STATE.md 2>/dev/null
```

Parse current position to verify we're transitioning the right phase.
Note accumulated context that may need updating after transition.
</step>

<step name="verify_completion">
Check current phase has all plan summaries:

```bash
ls .planning/phases/XX-current/*-PLAN.md 2>/dev/null | sort
ls .planning/phases/XX-current/*-SUMMARY.md 2>/dev/null | sort
```

**Verification logic:**

- Count PLAN files
- Count SUMMARY files
- If counts match: all plans complete
- If counts don't match: incomplete

<config-check>
```bash
cat .planning/config.json 2>/dev/null
```
</config-check>

**If all plans complete:**

<if mode="yolo">
```
⚡ Auto-approved: Transition Phase [X] → Phase [X+1]
Phase [X] complete - all [Y] plans finished.

Proceeding to mark done and advance...
```

Proceed directly to cleanup_handoff step.
</if>

<if mode="interactive" OR="custom with gates.confirm_transition true">
Ask: "Phase [X] complete - all [Y] plans finished. Ready to mark done and move to Phase [X+1]?"

Wait for confirmation before proceeding.
</if>

**If plans incomplete:**

**SAFETY RAIL: always_confirm_destructive applies here.**
Skipping incomplete plans is destructive - ALWAYS prompt regardless of mode.

Present:

```
Phase [X] has incomplete plans:
- {phase}-01-SUMMARY.md ✓ Complete
- {phase}-02-SUMMARY.md ✗ Missing
- {phase}-03-SUMMARY.md ✗ Missing

⚠️ Safety rail: Skipping plans requires confirmation (destructive action)

Options:
1. Continue current phase (execute remaining plans)
2. Mark complete anyway (skip remaining plans)
3. Review what's left
```

Wait for user decision.
</step>

<step name="cleanup_handoff">
Check for lingering handoffs:

```bash
ls .planning/phases/XX-current/.continue-here*.md 2>/dev/null
```

If found, delete them - phase is complete, handoffs are stale.
  </step>

<step name="update_roadmap">
Update the roadmap file:

```bash
ROADMAP_FILE=".planning/ROADMAP.md"
```

Update the file:

- Mark current phase: `[x] Complete`
- Add completion date
- Update plan count to final (e.g., "3/3 plans complete")
- Update Progress table
- Keep next phase as `[ ] Not started`

**Example:**

```markdown
## Phases

- [x] Phase 1: Foundation (completed 2025-01-15)
- [ ] Phase 2: Authentication ← Next
- [ ] Phase 3: Core Features

## Progress

| Phase             | Plans Complete | Status      | Completed  |
| ----------------- | -------------- | ----------- | ---------- |
| 1. Foundation     | 3/3            | Complete    | 2025-01-15 |
| 2. Authentication | 0/2            | Not started | -          |
| 3. Core Features  | 0/1            | Not started | -          |
```

</step>

<step name="archive_prompts">
If prompts were generated for the phase, they stay in place.
The `completed/` subfolder pattern from create-meta-prompts handles archival.
</step>

<step name="update_current_position_after_transition">
Update Current Position section in STATE.md to reflect phase completion and transition.

**Format:**

```markdown
Phase: [next] of [total] ([Next phase name])
Plan: Not started
Status: Ready to plan
Last activity: [today] - Phase [X] complete, transitioned to Phase [X+1]

Progress: [updated progress bar]
```

**Instructions:**

- Increment phase number to next phase
- Reset plan to "Not started"
- Set status to "Ready to plan"
- Update last activity to describe transition
- Recalculate progress bar based on completed plans

**Example - transitioning from Phase 2 to Phase 3:**

Before:

```markdown
## Current Position

Phase: 2 of 4 (Authentication)
Plan: 2 of 2 in current phase
Status: Phase complete
Last activity: 2025-01-20 - Completed 02-02-PLAN.md

Progress: ███████░░░ 60%
```

After:

```markdown
## Current Position

Phase: 3 of 4 (Core Features)
Plan: Not started
Status: Ready to plan
Last activity: 2025-01-20 - Phase 2 complete, transitioned to Phase 3

Progress: ███████░░░ 60%
```

**Step complete when:**

- [ ] Phase number incremented to next phase
- [ ] Plan status reset to "Not started"
- [ ] Status shows "Ready to plan"
- [ ] Last activity describes the transition
- [ ] Progress bar still reflects total completed plans
      </step>

<step name="review_accumulated_context">
Review and update Accumulated Context section in STATE.md.

**Blockers/Concerns:**

- Review blockers from completed phase
- If addressed in this phase: Remove from list
- If still relevant for future: Keep with note "Carried from Phase X"
- Add any new concerns from completed phase's summaries

**Deferred Issues:**

- Count open issues in ISSUES.md
- Update count: "[N] open issues - see ISSUES.md"
- If many accumulated, note: "Consider addressing ISS-XXX, ISS-YYY in next phase"

**Example:**

Before:

```markdown
### Blockers/Concerns Carried Forward

- ⚠️ [Phase 1] Database schema not indexed for common queries
- ⚠️ [Phase 2] WebSocket reconnection behavior on flaky networks unknown

### Deferred Issues

- ISS-001: Rate limiting on sync endpoint (Phase 2) - Medium
```

After (if database indexing was addressed in Phase 2):

```markdown
### Blockers/Concerns Carried Forward

- ⚠️ [Phase 2] WebSocket reconnection behavior on flaky networks unknown

### Deferred Issues

- ISS-001: Rate limiting on sync endpoint (Phase 2) - Medium
- ISS-002: Better sync error messages (Phase 2) - Quick
```

**Step complete when:**

- [ ] Resolved blockers removed from list
- [ ] Unresolved blockers kept with phase prefix
- [ ] New concerns from completed phase added
- [ ] Deferred issues count updated
      </step>

<step name="update_brief_alignment">
Perform brief alignment check after phase completion to verify work matches original vision.

**Instructions:**

1. Re-read PROJECT.md core requirements
2. Assess what was built in completed phase
3. Compare against project's problem statement and success criteria
4. Determine alignment status:
   - ✓ Aligned: Work delivers on project goals, no scope drift
   - ⚠️ Drift detected: Some divergence from original vision
   - ✗ Misaligned: Work doesn't serve the project

**Format:**

```markdown
## Brief Alignment

Last checked: [today] (Phase [X] completion)
Status: [✓ Aligned / ⚠️ Drift detected / ✗ Misaligned]
Assessment: [One sentence describing alignment state]
Drift notes: [Details if drift detected, otherwise "None"]
```

**Example - transitioning after Phase 2 completion:**

Before:

```markdown
## Brief Alignment

Last checked: Project start
Status: ✓ Aligned
Assessment: No work done yet - baseline alignment.
Drift notes: None
```

After:

```markdown
## Brief Alignment

Last checked: 2025-01-20 (Phase 2 completion)
Status: ✓ Aligned
Assessment: Auth phase delivered JWT-based authentication as specified. Sync phase next aligns with project's real-time requirements.
Drift notes: None
```

**Alternative example - drift detected:**

After (with drift):

```markdown
## Brief Alignment

Last checked: 2025-01-20 (Phase 2 completion)
Status: ⚠️ Drift detected
Assessment: Auth phase added OAuth2 support beyond project's JWT requirement.
Drift notes: OAuth2 adds complexity not in original scope. Consider if this serves user needs or gold-plating.
```

**Step complete when:**

- [ ] PROJECT.md core requirements reviewed
- [ ] Completed phase work assessed against project goals
- [ ] Last checked updated to current date with phase reference
- [ ] Status reflects actual alignment (Aligned/Drift/Misaligned)
- [ ] Assessment explains the alignment state in one sentence
- [ ] Drift notes document any divergence from project goals
      </step>

<step name="update_session_continuity_after_transition">
Update Session Continuity section in STATE.md to reflect transition completion.

**Format:**

```markdown
Last session: [today]
Stopped at: Phase [X] complete, ready to plan Phase [X+1]
Resume file: None
```

**Example - after completing Phase 2 transition:**

Before:

```markdown
## Session Continuity

Last session: 2025-01-20
Stopped at: Completed 02-02-PLAN.md
Resume file: None
```

After:

```markdown
## Session Continuity

Last session: 2025-01-20 16:45
Stopped at: Phase 2 complete, ready to plan Phase 3
Resume file: None
```

**Step complete when:**

- [ ] Last session timestamp updated to current date and time
- [ ] Stopped at describes phase completion and next phase
- [ ] Resume file confirmed as None (transitions don't use resume files)
      </step>

<step name="offer_next_phase">
**Check if there's a next phase in the current milestone:**

Re-read the ROADMAP file:

- Parse current milestone version (e.g., "v1.0" from "## Current Milestone: v1.0 Foundation")
- Look for phases after the current one in the current milestone section
- If next phase exists: offer to plan it
- If no next phase (milestone 100% complete): offer to complete milestone with parsed version

**If next phase exists:**

<if mode="yolo">
```
Phase [X] marked complete.

Next: Phase [X+1] - [Name]

⚡ Auto-continuing: Plan Phase [X+1] in detail
```

Exit skill and invoke SlashCommand("/gsd:plan-phase [X+1]")
</if>

<if mode="interactive" OR="custom with gates.confirm_transition true">
```
Phase [X] marked complete.

Next: Phase [X+1] - [Name]

## To Continue

Run `/clear`, then paste one of:

**To discuss Phase [X+1] context first:**
```
/gsd:discuss-phase [X+1]
```

**To plan Phase [X+1] directly:**
```
/gsd:plan-phase [X+1]
```

Other options:
- Review roadmap before continuing
```
</if>

**If no next phase (milestone 100% complete):**

<if mode="yolo">
```
Phase [X] marked complete.

🎉 Milestone [version] is 100% complete - all phases finished!

⚡ Auto-continuing: Complete milestone and archive
```

Exit skill and invoke SlashCommand("/gsd:complete-milestone [version]")
</if>

<if mode="interactive" OR="custom with gates.confirm_transition true">
```
Phase [X] marked complete.

🎉 Milestone [version] is 100% complete - all phases finished!

## To Continue

Run `/clear`, then paste:
```
/gsd:complete-milestone [version]
```

Other options:
- Review accomplishments before archiving
```
</if>

</step>

</process>

<implicit_tracking>
Progress tracking is IMPLICIT:

- "Plan phase 2" → Phase 1 must be done (or ask)
- "Plan phase 3" → Phases 1-2 must be done (or ask)
- Transition workflow makes it explicit in ROADMAP.md

No separate "update progress" step. Forward motion IS progress.
</implicit_tracking>

<partial_completion>
If user wants to move on but phase isn't fully complete:

```
Phase [X] has incomplete plans:
- {phase}-02-PLAN.md (not executed)
- {phase}-03-PLAN.md (not executed)

Options:
1. Mark complete anyway (plans weren't needed)
2. Defer work to later phase
3. Stay and finish current phase
```

Respect user judgment - they know if work matters.

**If marking complete with incomplete plans:**

- Update ROADMAP: "2/3 plans complete" (not "3/3")
- Note in transition message which plans were skipped
  </partial_completion>

<success_criteria>
Transition is complete when:

- [ ] Current phase plan summaries verified (all exist or user chose to skip)
- [ ] Any stale handoffs deleted
- [ ] ROADMAP.md updated with completion status and plan count
- [ ] STATE.md updated (position, blockers, alignment, session)
- [ ] Brief alignment check performed
- [ ] Progress table updated
- [ ] User knows next steps
      </success_criteria>
