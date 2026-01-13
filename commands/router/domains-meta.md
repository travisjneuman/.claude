# Meta/Admin Domain Reference

Load this file for Claude Code resource creation and admin tasks.

## Immediate Routes (Highest Priority)

These bypass normal routing - execute immediately.

| User Intent              | Keywords                                                   | Route                                       |
| ------------------------ | ---------------------------------------------------------- | ------------------------------------------- |
| Create skill             | "create skill", "new skill", "make skill"                  | `/taches-cc-resources:create-agent-skill`   |
| Create hook              | "create hook", "new hook", "make hook"                     | `/taches-cc-resources:create-hook`          |
| Create command           | "create command", "slash command"                          | `/taches-cc-resources:create-slash-command` |
| Create agent             | "create agent", "new agent"                                | `/taches-cc-resources:create-subagent`      |
| Generate skill from docs | "generate skill from", "skill from docs", "skill from URL" | Use skill-seekers marketplace               |
| Commit work              | "commit", "save work", "save changes"                      | `/commit-commands:commit`                   |
| Create PR                | "pull request", "create pr", "push pr"                     | `/commit-commands:commit-push-pr`           |
| Check status             | "status", "where was I", "what's left"                     | `/gsd:progress`                             |
| Check todos              | "remaining", "outstanding", "pending"                      | `/taches-cc-resources:check-todos`          |

## Skill Generation (skill-seekers)

For creating skills from external documentation:

1. Provide URL or documentation path
2. skill-seekers analyzes and generates SKILL.md
3. Review and refine generated skill

## Quality/Process Tasks

| Domain          | Keywords                                  | Skill                          | Agent                               |
| --------------- | ----------------------------------------- | ------------------------------ | ----------------------------------- |
| `code-review`   | review, pr, pull request, code quality    | `Skill(generic-code-reviewer)` | `pr-review-toolkit:code-reviewer`   |
| `refactoring`   | refactor, clean up, simplify, restructure | -                              | `pr-review-toolkit:code-simplifier` |
| `documentation` | document, docs, readme, jsdoc, comment    | `Skill(codebase-documenter)`   | `documentation-writer`              |
| `architecture`  | architecture, pattern, structure          | -                              | `feature-dev:code-architect`        |
| `tech-debt`     | tech debt, legacy, cleanup, deprecate     | `Skill(tech-debt-analyzer)`    | -                                   |
| `accessibility` | accessibility, a11y, wcag, screen reader  | -                              | `accessibility-expert`              |

## Exploration Tasks

| Intent              | Keywords                             | Action                                  |
| ------------------- | ------------------------------------ | --------------------------------------- |
| Understand codebase | "explore codebase", "understand how" | `Task` with `feature-dev:code-explorer` |
| Find location       | "find where", "locate", "which file" | `Task` with `Explore` subagent_type     |
| Learn concept       | "learn about", "explain", "teach me" | WebSearch + relevant Skill              |
