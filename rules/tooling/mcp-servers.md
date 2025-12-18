# MCP Server Management Guide

**When to use:** Understanding when to enable/disable MCP servers for optimal efficiency.

---

## Overview

MCP (Model Context Protocol) servers extend Claude Code's capabilities but consume context tokens when enabled. All servers are **disabled by default** for efficiency.

**Key Limitation:** MCP servers cannot be automatically enabled/disabled programmatically. Use `/mcp` command to manually toggle.

---

## Current MCP Servers

| Server | Purpose | When to Enable |
|--------|---------|----------------|
| `sequential-thinking` | Structured reasoning chains | Complex multi-step problems, architecture decisions |
| `playwright` | Browser testing/automation | E2E testing, UI automation, web scraping |
| `memory` | Persistent memory | Long-running projects needing context between sessions |
| `filesystem` | Enhanced file operations | Bulk file operations (Claude's built-in tools usually suffice) |
| `sqlite` | Database operations | Working with SQLite databases directly |
| `context7` | Context management | Large codebases needing enhanced retrieval |
| `chrome-devtools` | Browser debugging | Frontend debugging, performance profiling |
| `puppeteer` | Browser automation | Similar to Playwright, alternative automation |
| `browserbase` | Cloud browser | Remote browser sessions (requires API keys) |

---

## Management Commands

```bash
# View all servers and their status
/mcp

# Toggle a server via @mention
@sequential-thinking

# Restart to apply config changes
claude restart
```

---

## Optimal Workflow

### Before Starting Work

1. Run `/mcp` to review available servers
2. Enable ONLY servers needed for current task
3. Proceed with work

### After Completing Work

1. Run `/mcp` again
2. Disable any servers you enabled
3. This frees context for future sessions

---

## When to Suggest Each Server

### sequential-thinking

**Enable for:**
- Complex architectural decisions
- Multi-step debugging
- System design analysis
- Trade-off evaluations

**Disable after:** Decision is made

### playwright / puppeteer

**Enable for:**
- Writing E2E tests
- Browser automation scripts
- Web scraping tasks
- UI testing

**Disable after:** Tests are written and passing

### memory

**Enable for:**
- Multi-session projects
- Need to remember decisions across `/clear`
- Long-running feature development

**Disable after:** Project phase complete

### sqlite

**Enable for:**
- Direct SQLite database work
- Schema analysis
- Data queries

**Disable after:** Database work complete

### chrome-devtools

**Enable for:**
- Frontend performance profiling
- JavaScript debugging
- Network analysis

**Disable after:** Debugging complete

### context7

**Enable for:**
- Very large codebases (100k+ lines)
- Complex cross-file relationships
- When built-in search isn't sufficient

**Disable after:** Exploration complete

---

## Token Impact

Each enabled MCP server adds tool definitions to the system prompt:

| Server | Approx. Token Cost |
|--------|-------------------|
| sequential-thinking | ~500 tokens |
| playwright | ~2000 tokens |
| memory | ~800 tokens |
| filesystem | ~1500 tokens |
| sqlite | ~1000 tokens |

**Keeping all servers disabled saves ~6000+ tokens per session.**

---

## Configuration Files

```
~/.claude/settings.json      # Global settings (disabledMcpjsonServers)
~/.claude/.mcp.json          # MCP server definitions
```

### settings.json Key Settings

```json
{
  "enableAllProjectMcpServers": false,
  "disabledMcpjsonServers": [
    "sequential-thinking",
    "playwright",
    "memory",
    "filesystem",
    "sqlite",
    "context7",
    "chrome-devtools",
    "puppeteer",
    "browserbase"
  ]
}
```

---

## Adding New MCP Servers

```bash
# Local scope (this project only)
claude mcp add server-name https://server-url

# User scope (all projects)
claude mcp add server-name --scope user https://server-url

# Project scope (shared with team)
claude mcp add server-name --scope project https://server-url
```

---

## Future Capabilities (Not Yet Available)

The following are feature requests, not current capabilities:

- [ ] CLI commands for enable/disable (`claude mcp disable playwright`)
- [ ] Hook-based activation (auto-enable on SessionStart)
- [ ] Programmatic on-demand activation
- [ ] Time-based auto-disable

Track progress: GitHub #6638, #10447

---

## Related Documentation

- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/rules/README.md` - Rules index
- [MCP Documentation](https://modelcontextprotocol.io/introduction)
- [Claude Code MCP Docs](https://docs.anthropic.com/en/docs/claude-code/mcp)

---

*Keep MCP servers disabled by default. Enable only when needed. Disable after use.*
