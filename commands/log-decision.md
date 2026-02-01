# Log Decision

Append an architectural decision to the persistent decision log.

## Instructions

1. Summarize the decision made in the current conversation
2. Include: context, alternatives considered, rationale, and outcome
3. Append to `~/.claude/decisions.log` in this format:

```
## [DATE] - [SHORT TITLE]
**Context:** [Why this decision was needed]
**Decision:** [What was decided]
**Alternatives:** [What else was considered]
**Rationale:** [Why this choice]
```

If the user provided arguments, use them as the decision topic: $ARGUMENTS

If no arguments, review the current conversation and identify the most significant architectural or technical decision made.
