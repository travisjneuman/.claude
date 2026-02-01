# Session Handoff

Create a handoff document for seamless session continuity.

## Instructions

Write `~/.claude/last-session.md` with:

1. **Current task:** What was being worked on
2. **Status:** What's done and what remains
3. **Key decisions:** Any architectural or design decisions made
4. **Files modified:** List of files changed in this session
5. **Next steps:** Concrete actions for the next session
6. **Blockers:** Anything that needs resolution

Use `git diff --name-only` and `git log --oneline -5` to gather context.

If arguments provided, include this context: $ARGUMENTS

After writing the handoff, confirm it was saved and remind the user they can start a new session — the SessionStart hook will inject this context automatically.
