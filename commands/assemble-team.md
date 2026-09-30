---
description: Assemble a pre-built agent team for parallel work - review, feature, debug, cross-platform, full-stack, or research
disable-model-invocation: true
---

# /assemble-team Command

Assemble an agent team from pre-built templates or a custom description.

Agent teams are experimental and off by default. They only work in a session started with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; if the current session wasn't, say so and offer ordinary subagents instead.

## Syntax

```
/assemble-team <template|description>
```

## Templates

### review - Full Code Review

```
/assemble-team review
```

Spawns 3 teammates for comprehensive PR/code review:

- **Security reviewer**: OWASP vulnerabilities, auth issues, input validation, secrets exposure
- **Performance reviewer**: N+1 queries, memory leaks, unnecessary re-renders, bundle impact
- **Correctness reviewer**: logic errors, edge cases, error paths, and callers affected by the diff

### feature - Feature Development

```
/assemble-team feature [description]
```

Spawns 3 teammates for end-to-end feature development:

- **Architect**: designs approach, identifies files, plans dependencies (plan approval required)
- **Implementer**: writes code following the architect's approved plan
- **Reviewer**: reviews the implementation diff against the request and the code it touches (tests only if the user asks)

### debug - Debug Squad

```
/assemble-team debug [problem description]
```

Spawns 3-5 teammates investigating competing hypotheses:

- Each teammate investigates a different theory
- Teammates challenge each other's findings
- Converges on root cause through adversarial debate

### cross-platform - Mobile Parity

```
/assemble-team cross-platform [feature]
```

Spawns 3 teammates for mobile feature parity:

- **iOS developer**: Swift/SwiftUI implementation
- **Android developer**: Kotlin/Compose implementation
- **Shared architect**: API contracts, consistent behavior

### fullstack - Full-Stack Development

```
/assemble-team fullstack [feature]
```

Spawns 3 teammates for cross-layer changes:

- **Frontend**: React/UI components
- **Backend**: API endpoints and services
- **Database**: schema, migrations, queries

### research - Research Panel

```
/assemble-team research [topic]
```

Spawns 3 teammates for technology evaluation:

- **Simplicity advocate**: evaluates DX, learning curve, maintenance
- **Performance advocate**: evaluates scalability, benchmarks, production readiness
- **Devil's advocate**: finds downsides, risks, hidden costs

## Custom Teams

```
/assemble-team Create a team with 2 reviewers and 1 architect to evaluate our caching strategy
```

Any free-form description works. Claude will compose the optimal team.

## Instructions

When this command is invoked:

1. Read `~/.claude/docs/reference/workflows/agent-teams.md` for the decision framework
2. Read `~/.claude/docs/AGENT-TEAMS.md` for detailed team templates
3. If a known template name is provided, use the matching pre-built prompt from the docs
4. If a custom description is provided, compose an appropriate team
5. Create the agent team with clear spawn prompts including:
   - Role definition for each teammate
   - File ownership boundaries
   - Specific deliverables expected
   - Context about the current project

## Cross-Platform Behavior

- **macOS/Linux**: Suggest `claude --teammate-mode tmux` if tmux is available for split panes
- **Windows**: Use in-process mode (automatic with `auto` setting)
- Display mode is handled automatically by the `auto` teammate mode setting

## Related

- `~/.claude/docs/AGENT-TEAMS.md` - Full documentation
- `~/.claude/docs/reference/workflows/agent-teams.md` - Decision framework
- `~/.claude/agents/README.md` - Available subagents
