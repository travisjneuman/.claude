---
description: Record an architectural decision in its existing owning subject note
disable-model-invocation: true
---
# Log Decision

Record an architectural decision in its existing owning subject note.

## Instructions

First follow [Memory and documentation](../CLAUDE.md#memory-and-documentation) to resolve the existing owning subject note (local layer routing rules when a private layer is configured, otherwise the project's docs or ADRs).

1. Summarize the decision made in the current conversation
2. Include: context, alternatives considered, rationale, and outcome
3. Update that note's decision section in this format; link related documents instead of maintaining a duplicate toolkit-home decision log:

```
## [DATE] - [SHORT TITLE]
**Context:** [Why this decision was needed]
**Decision:** [What was decided]
**Alternatives:** [What else was considered]
**Rationale:** [Why this choice]
```

If the user provided arguments, use them as the decision topic: $ARGUMENTS

If no arguments, review the current conversation and identify the most significant architectural or technical decision made.
