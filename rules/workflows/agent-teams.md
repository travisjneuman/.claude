# Agent Teams Workflow Guide

**When to use:** Deciding between single session, subagents, agent teams, or Auto-Claude for a task.

---

## Decision Framework

```
Is the task sequential with same-file edits?
  YES → Single session

Can the work be split into independent, focused subtasks?
  NO  → Single session
  YES ↓

Do the workers need to communicate with each other?
  NO  → Subagents (Task tool) - lower token cost, results return to caller
  YES ↓

Is it fully autonomous feature implementation needing QA validation?
  YES → Auto-Claude (/auto-claude)
  NO  → Agent Teams
```

---

## Quick Reference

| Approach           | Context                    | Communication               | Token Cost | Best For                           |
| ------------------ | -------------------------- | --------------------------- | ---------- | ---------------------------------- |
| **Single session** | Shared                     | N/A                         | Lowest     | Sequential work, same-file edits   |
| **Subagents**      | Own window, results return | One-way (to caller)         | Low-Medium | Focused tasks, parallel search     |
| **Agent Teams**    | Own window, independent    | Two-way (between teammates) | High       | Research, review, cross-layer work |
| **Auto-Claude**    | Isolated worktree          | Multi-agent coordination    | Highest    | Autonomous feature implementation  |

---

## When to Use Agent Teams

**Strong use cases:**

- PR review from multiple angles (security, performance, tests)
- Debugging with competing hypotheses tested in parallel
- Technology evaluation with multiple research perspectives
- Cross-layer features (frontend + backend + database)
- New modules where teammates each own separate files

**Avoid for:**

- Sequential tasks where step N depends on step N-1
- Same-file modifications (causes overwrites between teammates)
- Simple tasks where a single session or subagent suffices
- Tasks where coordination overhead exceeds the benefit

---

## Team Composition Guidelines

### Optimal Team Size

| Team Size | Use Case                                        |
| --------- | ----------------------------------------------- |
| 2-3       | Focused review, simple cross-layer work         |
| 3-5       | Comprehensive review, feature development       |
| 5+        | Large-scale investigation, competing hypotheses |

More teammates = higher token cost. Only spawn what you need.

### Spawn Prompt Best Practices

Include in every spawn prompt:

1. **Clear role definition** - what this teammate is responsible for
2. **File ownership** - which files/directories this teammate owns
3. **Specific focus** - what to look for or implement
4. **Output expectations** - what deliverable to produce

```
# Good spawn prompt
"Review the authentication module at src/auth/ for security vulnerabilities.
Focus on token handling, session management, and input validation.
The app uses JWT tokens stored in httpOnly cookies.
Report issues with severity ratings (critical/high/medium/low)."

# Bad spawn prompt
"Review the code for security issues."
```

### Model Selection for Teammates

```
Create a team with 4 teammates. Use Sonnet for each teammate.
```

Use Sonnet for most teammates (balanced speed/quality). Specify Opus only for teammates doing complex architectural analysis.

---

## Task Assignment Patterns

### Lead Assigns (Explicit)

Tell the lead exactly what each teammate should work on:

```
Assign the security review to teammate 1.
Assign the performance review to teammate 2.
Assign the test coverage review to teammate 3.
```

### Self-Claim (Autonomous)

Create a task list and let teammates claim tasks:

```
Create these tasks:
1. Review authentication flow
2. Review database queries
3. Review error handling
4. Review input validation
Have teammates self-assign and work through them.
```

### Plan-Before-Implement

For risky changes, require plan approval:

```
Spawn an architect teammate to refactor the auth module.
Require plan approval before they make any changes.
Only approve plans that include test coverage.
```

---

## File Ownership Rules

Two teammates editing the same file causes overwrites. Always assign clear file ownership:

```
Frontend teammate owns: src/components/, src/hooks/, src/styles/
Backend teammate owns:  src/api/, src/services/, src/middleware/
Database teammate owns: prisma/, src/repositories/
```

If files must be shared, coordinate via the task dependency system -- teammate B starts their file edits only after teammate A marks their task as complete.

---

## Token Cost Awareness

Each teammate runs as a full Claude Code instance:

| Team Size          | Approximate Token Multiplier |
| ------------------ | ---------------------------- |
| Lead only          | 1x                           |
| Lead + 2 teammates | ~3x                          |
| Lead + 4 teammates | ~5x                          |

Use subagents instead of agent teams when you only need results returned to the caller without inter-teammate communication.

---

## Cross-Platform Notes

| Platform   | Display Mode              | tmux Required?             |
| ---------- | ------------------------- | -------------------------- |
| macOS      | In-process or split panes | Optional (for split panes) |
| Arch Linux | In-process or split panes | Optional (for split panes) |
| Windows 11 | In-process only           | N/A (not supported)        |

The `auto` teammate mode handles detection automatically across all platforms.

---

## Related Skills

| Skill         | When to Use                              |
| ------------- | ---------------------------------------- |
| `agent-teams` | Team composition knowledge, auto-routing |

## Related Documentation

- `~/.claude/docs/AGENT-TEAMS.md` - Comprehensive guide with templates
- `~/.claude/agents/README.md` - Subagent catalog (47 agents)
- `~/.claude/docs/AUTO-CLAUDE-GUIDE.md` - Autonomous alternative
- `~/.claude/rules/workflows/context-management.md` - Context window management

---

_Choose the right parallelism level: single session < subagents < agent teams < Auto-Claude._
