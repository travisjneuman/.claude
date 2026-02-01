# Context Management Guide

**When to use:** Managing context window, multi-window workflows, and state persistence.

---

## Context Window Awareness

- This environment uses automatic context compaction, allowing indefinite continuation
- Never stop tasks early due to token budget concerns
- As context approaches limit, save progress and state before refresh
- Complete tasks fully, even if nearing context budget

---

## Context Hygiene

- `/clear` between unrelated tasks
- `/compact` at 50% usage (add focus: `/compact Focus on code samples and API usage`)
- `/context` to monitor current usage
- Disable unused MCP servers to free token space

---

## Multi-Window Workflows

- **First window:** Set up framework (write tests, create setup scripts, establish patterns)
- **Subsequent windows:** Iterate on structured todo lists, use git logs to understand progress
- Create quality-of-life tools (init.sh, run-tests.sh) for graceful restarts
- Use structured formats (tests.json) for critical state, plain text for progress notes
- Leverage git commits as state checkpoints

---

## State Persistence

| Data Type | Storage |
| --------- | ------- |
| Structured data | JSON files (tests.json, metrics.json) |
| Progress notes | Markdown files (progress.md, research-notes.md) |
| State checkpoints | Git commits with descriptive messages |
| Session handoffs | `~/.claude/last-session.md` |
| Key decisions | `~/.claude/decisions.log` |

---

## Session Handoff

When ending a session with work in progress:
1. Summarize current state to `last-session.md`
2. Commit any in-progress work
3. Note next steps clearly

When starting a new session:
1. Check `last-session.md` for recent context
2. Review git log for recent changes
3. Check todo lists for pending work

---

_Keep context fresh. Save state before refresh. Use structured formats for critical data._
