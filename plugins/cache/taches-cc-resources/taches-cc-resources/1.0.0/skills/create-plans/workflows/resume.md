# Workflow: Resume from Handoff

<required_reading>
**Read the handoff file found by context scan.**
</required_reading>

<purpose>
Load context from a handoff file and restore working state.
After loading, DELETE the handoff - it's a parking lot, not permanent storage.
</purpose>

<process>

<step name="locate_handoff">
Context scan already found handoff. Read it:

```bash
cat .planning/phases/*/.continue-here.md 2>/dev/null
```

Parse YAML frontmatter for: phase, task, status, last_updated
Parse markdown body for: context, completed work, remaining work
</step>

<step name="calculate_time_ago">
Convert `last_updated` to human-readable:
- "3 hours ago"
- "Yesterday"
- "5 days ago"

If > 2 weeks, warn: "This handoff is [X] old. Code may have changed."
</step>

<step name="present_summary">
Display to user:

```
Resuming: Phase [X] - [Name]
Last updated: [time ago]

Task [N] of [Total]: [Task name]
Status: [in_progress/blocked/etc]

Completed this phase:
- [task 1]
- [task 2]

Remaining:
- [task 3] ← You are here
- [task 4]

Context notes:
[Key decisions, blockers, mental state from handoff]

Ready to continue? (1) Yes (2) See full handoff (3) Different action
```
</step>

<step name="user_confirms">
**WAIT for user confirmation.** Do not auto-proceed.

On confirmation:
1. Load relevant files mentioned in handoff
2. Delete the handoff file
3. Continue from where we left off
</step>

<step name="delete_handoff">
After user confirms and context is loaded:

```bash
rm .planning/phases/XX-name/.continue-here.md
```

Tell user: "Handoff loaded and cleared. Let's continue."
</step>

<step name="continue_work">
Based on handoff state:
- If mid-task: Continue that task
- If between tasks: Start next task
- If blocked: Address blocker first

Offer: "Continue with [next action]?"
</step>

</process>

<stale_handoff>
If handoff is > 2 weeks old:

```
Warning: This handoff is [X days] old.

The codebase may have changed. Recommend:
1. Review what's changed (git log)
2. Discard handoff, reassess from PLAN.md
3. Continue anyway (risky)
```
</stale_handoff>

<multiple_handoffs>
If multiple `.continue-here.md` files found:

```
Found multiple handoffs:
1. phases/02-auth/.continue-here.md (3 hours ago)
2. phases/01-setup/.continue-here.md (2 days ago)

Which one? (likely want #1, the most recent)
```

Most recent is usually correct. Older ones may be stale/forgotten.
</multiple_handoffs>

<success_criteria>
Resume is complete when:
- [ ] Handoff located and parsed
- [ ] Time-ago displayed
- [ ] Summary presented to user
- [ ] User explicitly confirmed
- [ ] Handoff file deleted
- [ ] Context loaded, ready to continue
</success_criteria>
