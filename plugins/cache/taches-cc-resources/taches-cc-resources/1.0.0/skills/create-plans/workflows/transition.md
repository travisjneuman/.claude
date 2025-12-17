# Workflow: Transition to Next Phase

<required_reading>
**Read these files NOW:**
1. `.planning/ROADMAP.md`
2. Current phase's plan files (`*-PLAN.md`)
3. Current phase's summary files (`*-SUMMARY.md`)
</required_reading>

<purpose>
Mark current phase complete and advance to next. This is the natural point
where progress tracking happens - implicit via forward motion.

"Planning next phase" = "current phase is done"
</purpose>

<process>

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

**If all plans complete:**
Ask: "Phase [X] complete - all [Y] plans finished. Ready to mark done and move to Phase [X+1]?"

**If plans incomplete:**
Present:
```
Phase [X] has incomplete plans:
- {phase}-01-SUMMARY.md ✓ Complete
- {phase}-02-SUMMARY.md ✗ Missing
- {phase}-03-SUMMARY.md ✗ Missing

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

Pattern matches:
- `.continue-here.md` (legacy)
- `.continue-here-01-02.md` (plan-specific)
</step>

<step name="update_roadmap">
Update `.planning/ROADMAP.md`:
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

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete | 2025-01-15 |
| 2. Authentication | 0/2 | Not started | - |
| 3. Core Features | 0/1 | Not started | - |
```
</step>

<step name="archive_prompts">
If prompts were generated for the phase, they stay in place.
The `completed/` subfolder pattern from create-meta-prompts handles archival.
</step>

<step name="offer_next_phase">
```
Phase [X] marked complete.

Next: Phase [X+1] - [Name]

What would you like to do?
1. Plan Phase [X+1] in detail
2. Review roadmap
3. Take a break (done for now)
```
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
- [ ] Progress table updated
- [ ] User knows next steps
</success_criteria>
