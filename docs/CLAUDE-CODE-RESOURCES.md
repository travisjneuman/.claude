---
name: Quick Reference
description: Essential Claude Code optimization tips, keyboard shortcuts, and productivity patterns.
category: reference
---

# Claude Code Resources

Quick reference for Claude Code optimization.

**Last Updated:** February 2026 (v2.9.2)

---

## File Locations

| Purpose    | Project                 | Global                    |
| ---------- | ----------------------- | ------------------------- |
| Memory     | `./CLAUDE.md`           | `~/.claude/CLAUDE.md`     |
| Settings   | `.claude/settings.json` | `~/.claude/settings.json` |
| Commands   | `.claude/commands/`     | `~/.claude/commands/`     |
| Agents     | `.claude/agents/`       | `~/.claude/agents/`       |
| Skills     | `.claude/skills/`       | `~/.claude/skills/`       |
| MCP Config | -                       | `~/.claude.json`          |

## Essential Commands

| Command       | Purpose                         |
| ------------- | ------------------------------- |
| `/init`       | Generate CLAUDE.md from project |
| `/clear`      | Clear context                   |
| `/compact`    | Summarize conversation          |
| `/statusline` | Configure status line           |
| `/plugin`     | Browse/install plugins          |

## Subagent Configuration

```yaml
---
name: agent-name
description: When to use
tools: [Read, Write, Edit, Bash, Glob, Grep]
model: sonnet # sonnet, opus, haiku, inherit
---
System prompt here...
```

## Hook Types

| Hook             | Trigger              |
| ---------------- | -------------------- |
| PreToolUse       | Before tool executes |
| PostToolUse      | After tool completes |
| Stop             | Session ends         |
| UserPromptSubmit | User submits prompt  |

## MCP Servers

| Server              | Purpose              |
| ------------------- | -------------------- |
| sequential-thinking | Complex reasoning    |
| playwright          | Browser automation   |
| memory              | Persistent memory    |
| filesystem          | File operations      |
| sqlite              | Database queries     |
| context7            | Context management   |
| chrome-devtools     | Browser debugging    |
| puppeteer           | Browser automation   |
| browserbase         | Cloud browser        |
| github              | GitHub API via MCP   |
| postgres            | PostgreSQL access    |
| git                 | Git operations       |

## Context Management

- Monitor with status line (stop ~60%, auto-compacts 80%)
- Use subagents for complex tasks
- `/clear` for fresh context
- 200K token window

## Keyboard Shortcuts

| Action            | Key            |
| ----------------- | -------------- |
| Stop Claude       | `Escape`       |
| Previous messages | `Escape` twice |
| Paste images      | `Ctrl+V`       |

## Thinking Depth

| Phrase       | Depth    |
| ------------ | -------- |
| "think"      | Standard |
| "think hard" | Deeper   |
| "ultrathink" | Maximum  |

## Portable .claude Files

**Include when copying:**

- `settings.json`, `settings.local.json`
- `commands/`, `skills/`, `templates/`, `plans/`
- `CLAUDE.md`, `*.md` docs

**Exclude (machine-specific):**

- `debug/`, `file-history/`, `ide/`, `projects/`
- `shell-snapshots/`, `statsig/`, `telemetry/`
- `history.jsonl`, `.credentials.json`

---

## Official Anthropic Documentation

### Core Documentation

| Resource           | URL                                          | Purpose                         |
| ------------------ | -------------------------------------------- | ------------------------------- |
| Claude Code Docs   | https://code.claude.com/docs/en/             | Official documentation hub      |
| Settings Reference | https://code.claude.com/docs/en/settings     | All configuration options       |
| Hooks Guide        | https://code.claude.com/docs/en/hooks        | Hook events, patterns, examples |
| MCP Guide          | https://code.claude.com/docs/en/mcp          | MCP server configuration        |
| Subagents Guide    | https://code.claude.com/docs/en/sub-agents   | Custom agent creation and usage |
| Skills Guide       | https://code.claude.com/docs/en/skills       | Skills system and SKILL.md spec |
| Plugins Guide      | https://code.claude.com/docs/en/plugins      | Plugin marketplace architecture |
| Memory Guide       | https://code.claude.com/docs/en/memory       | CLAUDE.md, auto-memory, context |
| Model Config       | https://code.claude.com/docs/en/model-config | Model selection and routing     |

### Engineering Blog Posts

| Article                    | URL                                                              | Topic                      |
| -------------------------- | ---------------------------------------------------------------- | -------------------------- |
| Claude Code Best Practices | https://www.anthropic.com/engineering/claude-code-best-practices | Official workflow patterns |

### Official GitHub Repositories

| Repository                    | URL                                              | Contents                    |
| ----------------------------- | ------------------------------------------------ | --------------------------- |
| anthropics/claude-code        | https://github.com/anthropics/claude-code        | Plugins marketplace, issues |
| anthropics/skills             | https://github.com/anthropics/skills             | Official skills examples    |
| anthropics/courses            | https://github.com/anthropics/courses            | Learning materials          |
| anthropics/anthropic-cookbook | https://github.com/anthropics/anthropic-cookbook | API code examples           |
| anthropics/life-sciences      | https://github.com/anthropics/life-sciences      | Life sciences skills        |

---

## Community Guides & Tutorials

| Resource                     | URL                                                                    | Focus                               |
| ---------------------------- | ---------------------------------------------------------------------- | ----------------------------------- |
| How I Use Every Feature      | https://blog.sshh.io/p/how-i-use-every-claude-code-feature             | Feature-by-feature walkthrough      |
| Full Stack Guide             | https://alexop.dev/posts/understanding-claude-code-full-stack/         | Full-stack development patterns     |
| Frameworks & Subagents Guide | https://www.medianeth.dev/blog/claude-code-frameworks-subagents-2025   | Framework comparison, agent setup   |
| Subagent Best Practices      | https://www.pubnub.com/blog/best-practices-for-claude-code-sub-agents/ | Subagent patterns and anti-patterns |
| zebbern/claude-code-guide    | https://github.com/zebbern/claude-code-guide                           | Hidden commands, undocumented tips  |
| ClaudeLog                    | https://claudelog.com/                                                 | Guides and tutorials collection     |
| Awesome Claude (website)     | https://awesomeclaude.ai/                                              | Cheatsheets, curated resources      |

---

## Awesome Lists & Collections

| Repository                              | URL                                                        | Focus                        |
| --------------------------------------- | ---------------------------------------------------------- | ---------------------------- |
| hesreallyhim/awesome-claude-code        | https://github.com/hesreallyhim/awesome-claude-code        | Commands, workflows, configs |
| alvinunreal/awesome-claude              | https://github.com/alvinunreal/awesome-claude              | General Claude resources     |
| travisvn/awesome-claude-skills          | https://github.com/travisvn/awesome-claude-skills          | Skills library               |
| BehiSecc/awesome-claude-skills          | https://github.com/BehiSecc/awesome-claude-skills          | Categorized skills           |
| VoltAgent/awesome-claude-code-subagents | https://github.com/VoltAgent/awesome-claude-code-subagents | 100+ subagents               |
| ccplugins/awesome-claude-code-plugins   | https://github.com/ccplugins/awesome-claude-code-plugins   | Plugin directory             |
| jqueryscript/awesome-claude-code        | https://github.com/jqueryscript/awesome-claude-code        | Tools, extensions, resources |
| ComposioHQ/awesome-claude-skills        | https://github.com/ComposioHQ/awesome-claude-skills        | Community skills collection  |
| punkpeye/awesome-mcp-servers            | https://github.com/punkpeye/awesome-mcp-servers            | MCP server collection        |

---

## MCP Server Resources

### Official MCP Documentation

| Resource          | URL                                              | Purpose                   |
| ----------------- | ------------------------------------------------ | ------------------------- |
| MCP Official Site | https://modelcontextprotocol.io/                 | Protocol specification    |
| MCP Registry      | https://registry.modelcontextprotocol.io/        | Official server registry  |
| MCP Servers Repo  | https://github.com/modelcontextprotocol/servers  | Reference implementations |
| MCP Registry Repo | https://github.com/modelcontextprotocol/registry | Registry source code      |

### MCP Directories

| Resource       | URL                     | Features                 |
| -------------- | ----------------------- | ------------------------ |
| MCPServers.org | https://mcpservers.org/ | Server listings, ratings |
| MCPCat         | https://mcpcat.io/      | Guides, recommendations  |

### Recommended MCP Servers for Claude Code

| Server              | Purpose                    | Install Command                                        |
| ------------------- | -------------------------- | ------------------------------------------------------ |
| sequential-thinking | Structured problem-solving | `npx @modelcontextprotocol/server-sequential-thinking` |
| playwright          | Browser automation         | `npx @playwright/mcp@latest`                           |
| memory              | Persistent memory          | `npx @modelcontextprotocol/server-memory`              |
| filesystem          | File operations            | `npx @modelcontextprotocol/server-filesystem`          |
| context7            | Real-time documentation    | `https://mcp.context7.com/mcp`                         |
| sentry              | Error tracking             | `npx @modelcontextprotocol/server-sentry`              |

---

## Plugin & Skills Development

### Plugin Marketplace Ecosystem

This setup includes 101 marketplace repositories providing access to 7,400+ community skills. Key marketplaces for plugin development reference:

| Repository                        | URL                                                  | Specialization                |
| --------------------------------- | ---------------------------------------------------- | ----------------------------- |
| anthropics/claude-code            | https://github.com/anthropics/claude-code            | Official plugin format        |
| obra/superpowers                  | https://github.com/obra/superpowers                  | TDD, debugging workflows      |
| glittercowboy/taches-cc-resources | https://github.com/glittercowboy/taches-cc-resources | Prompts, meta-prompting       |
| glittercowboy/get-shit-done       | https://github.com/glittercowboy/get-shit-done       | Workflow automation framework |
| AndyMik90/Auto-Claude             | https://github.com/AndyMik90/Auto-Claude             | Autonomous multi-agent system |

### Skill File Structure

Every skill lives in its own directory under `~/.claude/skills/` and must contain a `SKILL.md` with frontmatter:

```yaml
---
name: skill-name
description: What this skill does
version: 1.0.0
tags: [category, domain]
---
```

This installation has 119 local skills and 59 custom agents. Run `bash ~/.claude/scripts/regenerate-index.sh` to refresh the master index.

### Agent Development

Agents are defined in `~/.claude/agents/` as markdown files with YAML frontmatter specifying name, description, allowed tools, and model. Agents can be scoped by tool access (read-only for research, full access for implementation). See `~/.claude/agents/README.md` for the full catalog of 59 agents.

---

## Agent Teams Resources

Agent Teams coordinate multiple Claude Code sessions working in parallel. This is an experimental feature requiring the `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` environment variable.

### Internal Documentation

| File                                       | Purpose                               |
| ------------------------------------------ | ------------------------------------- |
| `~/.claude/docs/AGENT-TEAMS.md`            | Comprehensive guide with templates    |
| `~/.claude/docs/reference/workflows/agent-teams.md` | Decision framework: when to use teams |
| `~/.claude/skills/agent-teams/SKILL.md`    | Team composition skill                |

### Key Concepts

- **Team lead** creates the team, spawns teammates, assigns tasks, synthesizes results
- **Teammates** are full Claude Code sessions with independent 200K context windows
- **Task lists** at `~/.claude/tasks/{team-name}/` coordinate shared work
- **Messaging** enables two-way communication between all team members
- File ownership prevents concurrent edits to the same file

### When to Use

| Approach       | Best For                                        |
| -------------- | ----------------------------------------------- |
| Single session | Sequential tasks, same-file edits               |
| Subagents      | Focused tasks where only the result matters     |
| Agent Teams    | Parallel work needing inter-agent communication |

---

## Internal Documentation Map

This installation's `~/.claude/docs/` directory contains:

| Document                   | Purpose                               |
| -------------------------- | ------------------------------------- |
| `WORKFLOW-GUIDE.md`        | End-to-end workflow patterns          |
| `AGENT-TEAMS.md`           | Agent Teams comprehensive guide       |
| `AUTO-CLAUDE-GUIDE.md`     | Autonomous multi-agent system guide   |
| `MCP-SERVERS.md`           | MCP server capabilities and details   |
| `RESOURCES.md`             | External resources and learning links |
| `CLAUDE-CODE-RESOURCES.md` | This file -- quick reference          |
| `DOCUMENTATION-COUNTS.md`  | Ecosystem metrics and counts          |

### Rules & Checklists

| Directory           | Contents                                  |
| ------------------- | ----------------------------------------- |
| `docs/reference/checklists/` | Verification, UI, automation, static site |
| `docs/reference/workflows/`  | Research, action policy, context, teams   |
| `docs/reference/stacks/`     | React/TS, Python, Go, Rust, fullstack     |
| `docs/reference/tooling/`    | Git hooks, troubleshooting, MCP, repos    |

---

## Quick Tips

1. **Read before modifying** -- Never propose changes to unread code
2. **Use subagents early** -- Preserves main context window
3. **Structured prompts** -- Use XML-like tags for clarity
4. **Fresh sessions** -- Reduce prompt-drift with `/clear`
5. **Less is more** -- Each MCP server tool loads into context
6. **CLAUDE.md is king** -- Project-level overrides global settings
7. **Hooks for automation** -- PreToolUse/PostToolUse for formatting, linting
8. **Slash commands** -- 30 custom commands available via `~/.claude/commands/`
9. **Skill discovery** -- Check `skills/MASTER_INDEX.md` before writing from scratch
10. **Agent Teams for parallel work** -- When subagents are not enough

---

## Ecosystem At a Glance

| Component                | Count  |
| ------------------------ | ------ |
| Local skills             | 119    |
| Custom agents            | 59     |
| Marketplace repos        | 101    |
| Marketplace skills       | 7,400+ |
| Custom commands          | 30     |
| MCP servers (configured) | 12     |

---

_See `~/.claude/docs/RESOURCES.md` for the full external resources collection._
