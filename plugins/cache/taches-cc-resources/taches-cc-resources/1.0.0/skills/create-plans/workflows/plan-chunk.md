# Workflow: Plan Next Chunk

<required_reading>
**Read the current phase's PLAN.md**
</required_reading>

<purpose>
Identify the immediate next 1-3 tasks to work on. This is for when you want
to focus on "what's next" without replanning the whole phase.
</purpose>

<process>

<step name="find_current_position">
Read the phase plan:
```bash
cat .planning/phases/XX-current/PLAN.md
```

Identify:
- Which tasks are complete (marked or inferred)
- Which task is next
- Dependencies between tasks
</step>

<step name="identify_chunk">
Select 1-3 tasks that:
- Are next in sequence
- Have dependencies met
- Form a coherent chunk of work

Present:
```
Current phase: [Phase Name]
Progress: [X] of [Y] tasks complete

Next chunk:
1. Task [N]: [Name] - [Brief description]
2. Task [N+1]: [Name] - [Brief description]

Ready to work on these?
```
</step>

<step name="offer_execution">
Options:
1. **Start working** - Begin with Task N
2. **Generate prompt** - Create meta-prompt for this chunk
3. **See full plan** - Review all remaining tasks
4. **Different chunk** - Pick different tasks
</step>

</process>

<chunk_sizing>
Good chunks:
- 1-3 tasks
- Can complete in one session
- Deliver something testable

If user asks "what's next" - give them ONE task.
If user asks "plan my session" - give them 2-3 tasks.
</chunk_sizing>

<success_criteria>
Chunk planning is complete when:
- [ ] Current position identified
- [ ] Next 1-3 tasks selected
- [ ] User knows what to work on
</success_criteria>
