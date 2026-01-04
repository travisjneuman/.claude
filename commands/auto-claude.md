---
description: Invoke Auto-Claude autonomous coding framework for complex feature implementation
---

# /auto-claude Command

Invoke Auto-Claude autonomous coding framework for complex feature implementation.

## Syntax

```
/auto-claude [feature description]
```

## Examples

```
/auto-claude Add user authentication with JWT tokens

/auto-claude Implement dark mode toggle with local storage persistence

/auto-claude Refactor API layer to use async/await patterns
```

## What It Does

1. Analyzes current project structure
2. Generates detailed implementation specification
3. Creates isolated git worktree for safe development
4. Autonomously implements feature with multi-agent coordination
5. Runs QA validation loops until tests pass
6. Returns completed implementation for review

## Prerequisites

- ✅ Python 3.12+ installed
- ✅ `CLAUDE_CODE_OAUTH_TOKEN` set in `~/.auto-claude/.env`
- ✅ Git repository initialized
- ✅ `claude-agent-sdk` Python package installed

## Output

All analysis, specs, and implementations saved to:
- `~/.auto-claude/baselines/` - Codebase analysis
- `~/.auto-claude/specs/` - Feature specifications
- Git worktree directory - Actual implementation

## Behind the Scenes

Executes:
```bash
python ~/.claude/plugins/marketplaces/auto-claude/apps/backend/run.py
```

With context from current conversation and working directory.

## When to Use

**Auto-Claude is best for:**
- Complex, well-defined features
- Established codebases with clear patterns
- Features requiring multiple files/components
- When you want autonomous implementation

**Use `/start-task` instead for:**
- Planning and manual implementation
- Exploratory work
- Simple changes
- When you prefer step-by-step control

## Related Commands

- `/start-task` - Manual implementation with planning
- `/gsd:new-project` - Multi-phase project management
- `Skill(generic-code-reviewer)` - Code review after completion
