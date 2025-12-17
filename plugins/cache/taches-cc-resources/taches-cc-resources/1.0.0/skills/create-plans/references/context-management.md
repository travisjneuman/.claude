<overview>
Claude has a finite context window. This reference defines how to monitor usage and handle approaching limits gracefully.
</overview>

<context_awareness>
Claude receives system warnings showing token usage:

```
Token usage: 150000/200000; 50000 remaining
```

This information appears in `<system_warning>` tags during the conversation.
</context_awareness>

<thresholds>
<threshold level="comfortable" remaining="50%+">
**Status**: Plenty of room
**Action**: Work normally
</threshold>

<threshold level="getting_full" remaining="25%">
**Status**: Context accumulating
**Action**: Mention to user: "Context getting full. Consider wrapping up or creating handoff soon."
**No immediate action required.**
</threshold>

<threshold level="low" remaining="15%">
**Status**: Running low
**Action**:
1. Pause at next safe point (complete current atomic operation)
2. Ask user: "Running low on context (~30k tokens remaining). Options:
   - Create handoff now and resume in fresh session
   - Push through (risky if complex work remains)"
3. Await user decision

**Do not start new large operations.**
</threshold>

<threshold level="critical" remaining="10%">
**Status**: Must stop
**Action**:
1. Complete current atomic task (don't leave broken state)
2. **Automatically create handoff** without asking
3. Tell user: "Context limit reached. Created handoff at [location]. Start fresh session to continue."
4. **Stop working** - do not start any new tasks

This is non-negotiable. Running out of context mid-task is worse than stopping early.
</threshold>
</thresholds>

<what_counts_as_atomic>
An atomic operation is one that shouldn't be interrupted:

**Atomic (finish before stopping)**:
- Writing a single file
- Running a validation command
- Completing a single task from the plan

**Not atomic (can pause between)**:
- Multiple tasks in sequence
- Multi-file changes (can pause between files)
- Research + implementation (can pause between)

When hitting 10% threshold, finish current atomic operation, then stop.
</what_counts_as_atomic>

<handoff_content_at_limit>
When auto-creating handoff at 10%, include:

```yaml
---
phase: [current phase]
task: [current task number]
total_tasks: [total]
status: context_limit_reached
last_updated: [timestamp]
---
```

Body must capture:
1. What was just completed
2. What task was in progress (and how far)
3. What remains
4. Any decisions/context from this session

Be thorough - the next session starts fresh.
</handoff_content_at_limit>

<preventing_context_bloat>
Strategies to extend context life:

**Don't re-read files unnecessarily**
- Read once, remember content
- Don't cat the same file multiple times

**Summarize rather than quote**
- "The schema has 5 models including User and Session"
- Not: [paste entire schema]

**Use targeted reads**
- Read specific functions, not entire files
- Use grep to find relevant sections

**Clear completed work from "memory"**
- Once a task is done, don't keep referencing it
- Move forward, don't re-explain

**Avoid verbose output**
- Concise responses
- Don't repeat user's question back
- Don't over-explain obvious things
</preventing_context_bloat>

<user_signals>
Watch for user signals that suggest context concern:

- "Let's wrap up"
- "Save my place"
- "I need to step away"
- "Pack it up"
- "Create a handoff"
- "Running low on context?"

Any of these → trigger handoff workflow immediately.
</user_signals>

<fresh_session_guidance>
When user returns in fresh session:

1. They invoke skill
2. Context scan finds handoff
3. Resume workflow activates
4. Load handoff, present summary
5. Delete handoff after confirmation
6. Continue from saved state

The fresh session has full context available again.
</fresh_session_guidance>
