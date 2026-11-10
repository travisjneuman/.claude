# Agents

Claude Code shows every agent's name and description to the main model in every session, so this folder holds only a small **core** set. All other specialists live as **agent skills** (`skills/agent-<name>/`): skills that run as their own subagent (`context: fork`) when invoked, listed by name only until then. Nothing was removed; see `INDEX.md` or the `toolkit-router` skill to find one.

Up: [README](../README.md) · Not here: agent skills (`agent-<name>`) are listed in [`skills/MASTER_INDEX.md`](../skills/MASTER_INDEX.md) and [`INDEX.md`](../INDEX.md); multi-session teams are in [AGENT-TEAMS.md](../docs/AGENT-TEAMS.md).

## Routes

| Need / keywords | Open | Notes |
| --- | --- | --- |
| core agent, review, security, performance | [Core agents](#core-agents-always-listed) below | Always listed to the main model |
| specialist agent, `agent-<name>`, language or domain expert | [`INDEX.md`](../INDEX.md), [`skills/MASTER_INDEX.md`](../skills/MASTER_INDEX.md) | Run as their own subagent when invoked |
| write a new agent | [`templates/agent-template.md`](../templates/agent-template.md) | |
| promote or demote an agent | [Changing the core set](#changing-the-core-set) below | |
| agent teams, parallel sessions | [AGENT-TEAMS.md](../docs/AGENT-TEAMS.md), [workflows/agent-teams.md](../docs/reference/workflows/agent-teams.md) | |

## Map

```mermaid
graph LR
  A[agents/README] --> CORE[agents/name.md core set]
  A --> SPEC[skills/agent-name specialists]
  SPEC --> IDX[INDEX.md]
  A --> TPL[templates/agent-template.md]
  A --> TEAMS[docs/AGENT-TEAMS.md]
  CORE ---|promote or demote| SPEC
```

## Contents

### Core agents (always listed)

| Agent | Use for |
| --- | --- |
| [`deep-code-reviewer`](./deep-code-reviewer.md) | Thorough review of a change set |
| [`security-auditor`](./security-auditor.md) | Security review, secrets, dependency risk |
| [`performance-optimizer`](./performance-optimizer.md) | Profiling and speed work |

The core set changes with use: the weekly tuning job moves an agent that went unused for 30 days to an on-demand skill, and promotes an agent skill that is used often. The files in this folder are the current set. Moved out by tuning and still available on demand: [`agent-debugging-specialist`](../skills/agent-debugging-specialist/SKILL.md), [`agent-architecture-analyst`](../skills/agent-architecture-analyst/SKILL.md), [`agent-refactoring-specialist`](../skills/agent-refactoring-specialist/SKILL.md), [`agent-react-expert`](../skills/agent-react-expert/SKILL.md), [`agent-typescript-expert`](../skills/agent-typescript-expert/SKILL.md), [`agent-ios-developer`](../skills/agent-ios-developer/SKILL.md), [`agent-devops-engineer`](../skills/agent-devops-engineer/SKILL.md).

Core agents inherit the session's model (no per-agent model pins).

### Specialist agent skills (on demand)

Dozens more specialists (languages, frameworks, mobile, data/ML, design, business, product, and more) are invoked as `/agent-<name>` or by Claude through the Skill tool, e.g. `/agent-python-expert refactor the settings loader`. Each runs in its own subagent with the full original agent prompt.

## Changing the core set

Promote or demote by moving a file between `agents/<name>.md` and `skills/agent-<name>/SKILL.md` (the conversion is mechanical: same prompt body, `context: fork`, `agent: general-purpose`). The separately configured weekly tuning job can do this from real usage counts. Pre-commit runs safety gates only: no budget tests, generation or automatic staging. Review public source changes, then explicitly refresh the index and [count snapshot](../docs/COUNT-PIPELINE.md) when publication is authorized.
