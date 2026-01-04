---
name: auto-claude
description: Autonomous multi-agent coding with git worktree isolation, QA validation, and memory. Use for complex features requiring autonomous implementation.
tags: [autonomous, development, qa, worktree, memory]
---

# Auto-Claude: Autonomous Coding Framework

Autonomous multi-agent system for complex feature implementation with QA validation.

## When to Use

✅ **Use Auto-Claude for:**
- Complex features with multiple files/components
- Well-defined requirements in established codebases
- Features requiring iterative refinement
- When you want autonomous implementation with QA loops

❌ **Don't use Auto-Claude for:**
- Greenfield projects (no existing codebase)
- Exploratory/research tasks
- Simple typo fixes or config changes
- Tasks requiring human decision-making

## Core Capabilities

1. **Codebase Analysis** - Generates semantic baseline
2. **Spec Generation** - Creates detailed implementation plan
3. **Autonomous Implementation** - Multi-agent coordination
4. **Git Worktree Isolation** - Safe development in separate worktree
5. **QA Validation** - Iterative quality checks
6. **Memory System** - Graphiti-powered context retention

## Workflow

```bash
# From project directory:
/auto-claude Add user authentication with JWT tokens
```

**What Happens:**
1. Analyzes project structure → generates baseline
2. Creates implementation spec → stores in ~/.auto-claude/specs/
3. Creates git worktree → isolated development environment
4. Autonomous agents implement → with QA loops
5. Returns completed code → ready for review

**Output Location:** `~/.auto-claude/` (gitignored)

## Integration with Existing Workflows

**Manual Implementation:**
```
/start-task [description]  → Claude implements step-by-step
```

**Autonomous Implementation:**
```
/auto-claude [description] → Auto-Claude implements autonomously
```

**Multi-Phase Projects:**
```
/gsd:new-project          → GSD for project management
```

## Configuration

**Location:** `~/.auto-claude/.env`

**Required:**
- `CLAUDE_CODE_OAUTH_TOKEN` - Get from `/settings` in Claude Code

**Optional (Recommended):**
- `GRAPHITI_ENABLED=true` - Semantic memory
- `GOOGLE_API_KEY` - For Gemini embeddings (memory feature)
- Alternative: Ollama (local) or disable memory

## Trade-offs

**Strengths:**
- Autonomous with minimal oversight
- QA validation ensures quality
- Git worktree prevents main branch disruption
- Memory learns from previous sessions

**Limitations:**
- Best for established codebases
- Requires clear specifications
- Uses tokens for multi-agent iterations
- Manual merge required after completion

## Related

- `generic-feature-developer` - Manual implementation patterns
- `debug-systematic` - Systematic debugging
- `test-specialist` - Testing strategies
