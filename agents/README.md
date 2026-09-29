# Agents

Claude Code shows every agent's name and description to the main model in every session, so this folder holds only a small **core** set. All other specialists live as **agent skills** (`skills/agent-<name>/`): skills that run as their own subagent (`context: fork`) when invoked, listed by name only until then. Nothing was removed; see `INDEX.md` or the `toolkit-router` skill to find one.

## Core agents (always listed)

| Agent | Use for |
| --- | --- |
| `deep-code-reviewer` | Thorough review of a change set |
| `debugging-specialist` | Hard or intermittent bugs |
| `security-auditor` | Security review, secrets, dependency risk |
| `architecture-analyst` | Structure, boundaries, design trade-offs |
| `performance-optimizer` | Profiling and speed work |
| `refactoring-specialist` | Large safe refactors |
| `react-expert` | React / frontend work |
| `typescript-expert` | TypeScript typing and patterns |
| `ios-developer` | Swift / SwiftUI / Apple platforms |
| `devops-engineer` | CI/CD, infrastructure, deployment |

Core agents inherit the session's model (no per-agent model pins).

## Specialist agent skills (on demand)

58 more specialists (languages, frameworks, mobile, data/ML, design, business, product, and more) are invoked as `/agent-<name>` or by Claude through the Skill tool, e.g. `/agent-python-expert refactor the settings loader`. Each runs in its own subagent with the full original agent prompt.

## Changing the core set

Promote or demote by moving a file between `agents/<name>.md` and `skills/agent-<name>/SKILL.md` (the conversion is mechanical: same prompt body, `context: fork`, `agent: general-purpose`). The weekly tuning job does this from real usage counts; the pre-commit budget check (`scripts/check-budgets.mjs`) keeps agent descriptions under their limit.
