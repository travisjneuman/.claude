# Workflow: Create Handoff

<required_reading>
**Read these files NOW:**
1. templates/continue-here.md
</required_reading>

<purpose>
Create a context handoff file when pausing work. This preserves full context
so a fresh Claude session can pick up exactly where you left off.

**Handoff is a parking lot, not a journal.** Create when leaving, delete when returning.
</purpose>

<when_to_create>
- User says "pack it up", "stopping for now", "save my place"
- Context window at 15% or below (offer to create)
- Context window at 10% (auto-create)
- Switching to different project
</when_to_create>

<process>

<step name="identify_location">
Determine which phase we're in:

```bash
# Find current phase (most recently modified PLAN.md)
ls -lt .planning/phases/*/PLAN.md 2>/dev/null | head -1
```

Handoff goes in the current phase directory.
</step>

<step name="gather_context">
Collect everything needed for seamless resumption:

1. **Current position**: Which phase, which task
2. **Work completed**: What's done this session
3. **Work remaining**: What's left
4. **Decisions made**: Why things were done this way
5. **Blockers/issues**: Anything stuck
6. **Mental context**: The "vibe" - what you were thinking
</step>

<step name="write_handoff">
Use template from `templates/continue-here.md`.

Write to `.planning/phases/XX-name/.continue-here.md`:

```yaml
---
phase: XX-name
task: 3
total_tasks: 7
status: in_progress
last_updated: [ISO timestamp]
---
```

Then markdown body with full context.
</step>

<step name="git_commit_wip">
Commit handoff as WIP:

```bash
git add .planning/
git commit -m "$(cat <<'EOF'
wip: [phase-name] paused at task [X]/[Y]

Current: [task name]
[If blocked:] Blocked: [reason]
EOF
)"
```

Confirm: "Committed: wip: [phase] paused at task [X]/[Y]"
</step>

<step name="handoff_confirmation">
Require acknowledgment:

"Handoff created: .planning/phases/[XX]/.continue-here.md

Current state:
- Phase: [XX-name]
- Task: [X] of [Y]
- Status: [in_progress/blocked/etc]
- Committed as WIP

To resume: Invoke this skill in a new session.

Confirmed?"

Wait for acknowledgment before ending.
</step>

</process>

<context_trigger>
**Auto-handoff at 10% context:**

When system warning shows ~20k tokens remaining:
1. Complete current atomic operation (don't leave broken state)
2. Create handoff automatically
3. Tell user: "Context limit reached. Handoff created at [location]."
4. Stop working - don't start new tasks

**Warning at 15%:**
"Context getting low (~30k remaining). Create handoff now or push through?"
</context_trigger>

<handoff_lifecycle>
```
Working           → No handoff exists
"Pack it up"      → CREATE .continue-here.md
[Session ends]
[New session]
"Resume"          → READ handoff, then DELETE it
Working           → No handoff (context is fresh)
Phase complete    → Ensure no stale handoff exists
```

Handoff is temporary. If it persists after resuming, it's stale.
</handoff_lifecycle>

<success_criteria>
Handoff is complete when:
- [ ] .continue-here.md exists in current phase
- [ ] YAML frontmatter has phase, task, status, timestamp
- [ ] Body has: completed work, remaining work, decisions, context
- [ ] User knows how to resume
</success_criteria>
