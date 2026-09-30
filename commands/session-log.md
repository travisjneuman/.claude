---
description: Explain where session history lives now that the toolkit keeps no session log
disable-model-invocation: true
---

# Session Log (retired)

The toolkit no longer keeps a session log. No hook writes `~/.claude/.session-log`, so there is nothing to tail, view, clear, or count. If an old `.session-log` file exists, leave it alone; it is stale.

When invoked, tell the user this and point them to what replaced it:

| Need                          | Use                                                        |
| ----------------------------- | ---------------------------------------------------------- |
| Reopen or review a session    | `claude --resume` (pick a past session) or `claude --continue` (most recent) |
| Token and cost usage          | `/usage` in the current session                            |
| Usage across sessions/hosts   | The Claude usage rollup in the owner's notes vault         |
| Carry context to next session | `/handoff`, which writes `~/.claude/last-session.md`       |

## Related

- `/health-check` - System diagnostics
- `/handoff` - Session handoff document
