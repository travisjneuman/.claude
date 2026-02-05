# Agent Teams Guide

Coordinate multiple Claude Code sessions working together as a team.

**Status:** Experimental (enabled via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` env var)
**Last Updated:** February 2026

---

## What Are Agent Teams?

Agent Teams let you run multiple Claude Code instances in parallel, coordinated by a team lead. Unlike subagents (Task tool), each teammate is a full independent Claude Code session with its own 200k context window, able to message other teammates directly.

One session acts as the **team lead** -- it creates the team, spawns teammates, assigns tasks, and synthesizes results. Teammates work independently and communicate via a shared messaging system.

---

## When to Use Agent Teams

| Approach                  | Best For                                        | Token Cost |
| ------------------------- | ----------------------------------------------- | ---------- |
| **Single session**        | Sequential tasks, same-file edits, simple work  | Lowest     |
| **Subagents (Task tool)** | Focused tasks where only the result matters     | Low-Medium |
| **Agent Teams**           | Parallel work needing inter-agent communication | High       |
| **Auto-Claude**           | Fully autonomous feature implementation with QA | Highest    |

**Agent Teams excel at:**

- Research and review from multiple angles simultaneously
- Debugging with competing hypotheses tested in parallel
- Cross-layer coordination (frontend + backend + database)
- New modules/features where teammates each own separate files

**Avoid Agent Teams for:**

- Sequential tasks with dependencies
- Same-file edits (causes overwrites)
- Simple tasks where coordination overhead exceeds benefit

See `rules/workflows/agent-teams.md` for the full decision framework.

---

## Setup

### Automatic (Already Done)

Agent Teams are enabled globally via `settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

This setting syncs across all machines via the `~/.claude` repo.

### Display Mode

Agent Teams support two display modes:

| Mode                     | How It Works                                                | Platform Support  |
| ------------------------ | ----------------------------------------------------------- | ----------------- |
| **In-process** (default) | All teammates in one terminal. Navigate with Shift+Up/Down. | All platforms     |
| **Split panes**          | Each teammate gets its own tmux/iTerm2 pane.                | macOS, Linux only |

The default is `"auto"` -- uses split panes if already inside a tmux session, otherwise in-process.

To force a specific mode per session:

```bash
claude --teammate-mode in-process   # Force single terminal
claude --teammate-mode tmux         # Force split panes (requires tmux)
```

### tmux Installation (macOS and Linux only)

Split-pane mode requires tmux. Not supported on Windows.

```bash
# macOS
brew install tmux

# Arch Linux
sudo pacman -S tmux

# Debian/Ubuntu
sudo apt install tmux
```

**Not supported in:** Windows Terminal, VS Code integrated terminal, Ghostty.

---

## Starting a Team

Tell Claude to create a team in natural language. Describe the task and the team structure you want:

```
Create an agent team to review PR #142. Spawn three reviewers:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them each review and report findings.
```

Claude creates the team, spawns teammates, assigns tasks, and coordinates work.

---

## Pre-Built Team Templates

Use `/assemble-team <template>` to quickly spawn a team, or describe the composition manually.

### Full Review Team

```
Create an agent team for comprehensive code review:
- Security reviewer: check for OWASP vulnerabilities, auth issues, input validation
- Performance reviewer: check for N+1 queries, memory leaks, unnecessary re-renders
- Test coverage reviewer: verify edge cases, check for missing test scenarios
Have each reviewer report findings with severity ratings.
```

### Feature Development Team

```
Create an agent team for building [feature]:
- Architect teammate: design the approach, identify files to modify, plan dependencies
- Implementer teammate: write the code following the architect's plan
- Test writer teammate: write tests for the implementation
Require plan approval from the architect before implementation begins.
```

### Debug Squad

```
Create an agent team to investigate [bug description].
Spawn 3-5 teammates, each investigating a different hypothesis:
- Hypothesis 1: [theory A]
- Hypothesis 2: [theory B]
- Hypothesis 3: [theory C]
Have them challenge each other's findings like a scientific debate.
Update findings as consensus emerges.
```

### Cross-Platform Team

```
Create an agent team for mobile feature parity:
- iOS teammate: implement in Swift/SwiftUI at [ios path]
- Android teammate: implement in Kotlin/Compose at [android path]
- Shared architect: ensure consistent behavior and API contracts
Each platform teammate owns their own files. Architect coordinates.
```

### Full-Stack Team

```
Create an agent team for [feature] spanning the full stack:
- Frontend teammate: React components at src/components/
- Backend teammate: API endpoints at src/api/
- Database teammate: schema and queries at prisma/
Coordinate on API contracts before implementing.
```

### Research Panel

```
Create an agent team to evaluate [technology/approach]:
- Researcher 1: investigate from a simplicity/DX perspective
- Researcher 2: investigate from a performance/scalability perspective
- Researcher 3: play devil's advocate, find downsides and risks
Have them share findings and challenge each other's conclusions.
```

---

## Controlling Your Team

### Navigate Teammates (In-Process Mode)

| Action                  | Shortcut              |
| ----------------------- | --------------------- |
| Select teammate         | Shift+Up / Shift+Down |
| View teammate's session | Enter                 |
| Interrupt teammate      | Escape                |
| Toggle task list        | Ctrl+T                |
| Cycle to delegate mode  | Shift+Tab             |

### Delegate Mode

Prevents the lead from implementing tasks itself. The lead only coordinates: spawning teammates, assigning tasks, messaging, and synthesizing results.

Press **Shift+Tab** after starting a team to enable delegate mode.

### Talk to Teammates Directly

Each teammate is a full Claude Code session. Select a teammate with Shift+Up/Down and type to send instructions, ask follow-up questions, or redirect their approach.

### Task Management

The shared task list coordinates work. Tasks have three states: pending, in progress, and completed. Tasks can depend on other tasks.

- **Lead assigns**: tell the lead which task to give to which teammate
- **Self-claim**: after finishing, a teammate picks up the next unassigned, unblocked task

### Shut Down

```
Ask the researcher teammate to shut down
```

When done with all work:

```
Clean up the team
```

Always use the lead to clean up. Shut down all teammates first.

---

## Architecture

| Component     | Location                                                         |
| ------------- | ---------------------------------------------------------------- |
| Team config   | `~/.claude/teams/{team-name}/config.json`                        |
| Task list     | `~/.claude/tasks/{team-name}/`                                   |
| Communication | Automatic message delivery between agents                        |
| Permissions   | Teammates inherit lead's permission settings                     |
| Context       | Each teammate loads CLAUDE.md, MCP servers, skills independently |

Teammates do NOT inherit the lead's conversation history. Include task-specific details in the spawn prompt.

---

## Best Practices

**Give teammates enough context.** They load project context (CLAUDE.md, skills) but not the lead's conversation. Include relevant details in spawn prompts.

**Size tasks appropriately.** Too small = coordination overhead exceeds benefit. Too large = teammates drift without check-ins. Aim for self-contained units with clear deliverables. 5-6 tasks per teammate keeps everyone productive.

**Avoid file conflicts.** Two teammates editing the same file causes overwrites. Break work so each teammate owns different files.

**Monitor and steer.** Check in on progress, redirect approaches that aren't working, synthesize findings as they come in.

**Start with research and review.** If new to agent teams, begin with non-code tasks that have clear boundaries: reviewing a PR, researching a library, investigating a bug.

---

## Cross-Platform Behavior

| Platform       | In-Process | Split Panes         | Notes                               |
| -------------- | ---------- | ------------------- | ----------------------------------- |
| **macOS**      | Yes        | Yes (tmux + iTerm2) | Full support                        |
| **Arch Linux** | Yes        | Yes (tmux)          | Full support                        |
| **Windows 11** | Yes        | No                  | tmux not available, in-process only |

The `auto` teammate mode handles all platforms automatically. No per-machine config needed.

---

## Limitations

Agent Teams are experimental. Current limitations:

- **No session resumption**: `/resume` and `/rewind` don't restore in-process teammates
- **Task status can lag**: teammates sometimes fail to mark tasks as completed
- **One team per session**: clean up before starting a new team
- **No nested teams**: teammates cannot spawn their own teams
- **Lead is fixed**: can't promote a teammate to lead
- **Permissions set at spawn**: teammates start with lead's permission mode
- **High token cost**: each teammate is a separate Claude instance

---

## Troubleshooting

| Issue                                 | Fix                                                                        |
| ------------------------------------- | -------------------------------------------------------------------------- |
| Teammates not appearing               | Press Shift+Down to cycle through. Verify task complexity warrants a team. |
| Too many permission prompts           | Pre-approve common operations in settings.json permissions.                |
| Teammates stopping on errors          | Select them and give additional instructions, or spawn a replacement.      |
| Lead implements instead of delegating | Say "Wait for teammates to finish" or enable delegate mode (Shift+Tab).    |
| Orphaned tmux sessions                | `tmux ls` then `tmux kill-session -t <name>`                               |

---

## Related Documentation

- `~/.claude/rules/workflows/agent-teams.md` - Decision framework
- `~/.claude/agents/README.md` - Subagent catalog
- `~/.claude/docs/AUTO-CLAUDE-GUIDE.md` - Autonomous multi-agent alternative
- `~/.claude/skills/agent-teams/SKILL.md` - Team composition knowledge
- [Official docs](https://code.claude.com/docs/en/agent-teams) - Anthropic documentation

---

_Agent Teams: parallel sessions for work that benefits from multiple perspectives._
