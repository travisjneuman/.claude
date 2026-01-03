# Claude Code Resources

Quick reference for Claude Code optimization.

**Last Updated:** January 2026 (v2.0)

---

## File Locations

| Purpose | Project | Global |
|---------|---------|--------|
| Memory | `./CLAUDE.md` | `~/.claude/CLAUDE.md` |
| Settings | `.claude/settings.json` | `~/.claude/settings.json` |
| Commands | `.claude/commands/` | `~/.claude/commands/` |
| Agents | `.claude/agents/` | `~/.claude/agents/` |
| Skills | `.claude/skills/` | `~/.claude/skills/` |
| MCP Config | - | `~/.claude.json` |

## Essential Commands

| Command | Purpose |
|---------|---------|
| `/init` | Generate CLAUDE.md from project |
| `/clear` | Clear context |
| `/compact` | Summarize conversation |
| `/statusline` | Configure status line |
| `/plugin` | Browse/install plugins |

## Subagent Configuration

```yaml
---
name: agent-name
description: When to use
tools: [Read, Write, Edit, Bash, Glob, Grep]
model: sonnet  # sonnet, opus, haiku, inherit
---
System prompt here...
```

## Hook Types

| Hook | Trigger |
|------|---------|
| PreToolUse | Before tool executes |
| PostToolUse | After tool completes |
| Stop | Session ends |
| UserPromptSubmit | User submits prompt |

## MCP Servers

| Server | Purpose |
|--------|---------|
| sequential-thinking | Complex reasoning |
| playwright | Browser automation |
| memory | Persistent memory |
| filesystem | File operations |
| sqlite | Database queries |

## Context Management

- Monitor with status line (stop ~60%, auto-compacts 80%)
- Use subagents for complex tasks
- `/clear` for fresh context
- 200K token window

## Keyboard Shortcuts

| Action | Key |
|--------|-----|
| Stop Claude | `Escape` |
| Previous messages | `Escape` twice |
| Paste images | `Ctrl+V` |

## Thinking Depth

| Phrase | Depth |
|--------|-------|
| "think" | Standard |
| "think hard" | Deeper |
| "ultrathink" | Maximum |

## Portable .claude Files

**Include when copying:**
- `settings.json`, `settings.local.json`
- `commands/`, `skills/`, `templates/`, `plans/`
- `CLAUDE.md`, `*.md` docs

**Exclude (machine-specific):**
- `debug/`, `file-history/`, `ide/`, `projects/`
- `shell-snapshots/`, `statsig/`, `telemetry/`
- `history.jsonl`, `.credentials.json`

## Key Resources

**Official:**
- [Claude Code Docs](https://code.claude.com/docs)
- [Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)

**Collections:**
- [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins)
- [jqueryscript/awesome-claude-code](https://github.com/jqueryscript/awesome-claude-code)
- [awesomeclaude.ai](https://awesomeclaude.ai/)

## Quick Tips

1. **Read before modifying** - Never propose changes to unread code
2. **Use subagents early** - Preserves main context
3. **Structured prompts** - Use XML-like tags
4. **Fresh sessions** - Reduce prompt-drift
5. **Less is more** - Each tool loads into context

---

*See full resources at the above URLs when needed.*
