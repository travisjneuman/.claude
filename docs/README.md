---
name: Documentation Index
description: Navigation hub for all 23 guides covering setup, workflows, architecture, and operations.
category: reference
---

# Claude Code Toolkit Documentation

**Last Updated:** February 2026 (v2.3.5)
**Maintainer:** Travis J. Neuman
**Purpose:** Portable, optimized Claude Code configuration for any project

---

## Start Here

New to this toolkit? Follow this path:

1. **[SETUP-GUIDE.md](./SETUP-GUIDE.md)** -- Deploy to your machine (or a new device)
2. **[FOLDER-STRUCTURE.md](./FOLDER-STRUCTURE.md)** -- Understand what lives where
3. **[CONFIGURATION.md](./CONFIGURATION.md)** -- Tweak settings, permissions, hooks
4. **[WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md)** -- How to work effectively with Claude Code

Already set up? Jump to the section you need below.

---

## Documentation Map

### Core References

| Document                                     | What it covers                              |
| -------------------------------------------- | ------------------------------------------- |
| [FOLDER-STRUCTURE.md](./FOLDER-STRUCTURE.md) | Complete file/folder map                    |
| [CONFIGURATION.md](./CONFIGURATION.md)       | Settings, permissions, hooks, env files     |
| [SKILLS.md](./SKILLS.md)                     | Skills system: creation, activation, format |
| [MCP-SERVERS.md](./MCP-SERVERS.md)           | 9 MCP servers: when to enable, token cost   |
| [ARCHITECTURE.md](./ARCHITECTURE.md)         | How all components interact as a system     |
| [GLOSSARY.md](./GLOSSARY.md)                 | Definitions of all toolkit terms            |
| [FAQ.md](./FAQ.md)                           | Common questions answered                   |

### Workflows and Guides

| Document                                           | What it covers                              |
| -------------------------------------------------- | ------------------------------------------- |
| [WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md)           | Development workflow patterns and standards |
| [workflow-automation.md](./workflow-automation.md) | Git hooks, templates, task enforcement      |
| [GSD-TUTORIAL.md](./GSD-TUTORIAL.md)               | Get Shit Done multi-phase project system    |
| [DOMAIN-ROUTING.md](./DOMAIN-ROUTING.md)           | How prompts route to skills/agents          |
| [AGENT-TEAMS.md](./AGENT-TEAMS.md)                 | Agent teams: parallel sessions, composition |

### Setup and Operations

| Document                                       | What it covers                             |
| ---------------------------------------------- | ------------------------------------------ |
| [SETUP-GUIDE.md](./SETUP-GUIDE.md)             | Installation, cross-platform sync          |
| [NEW-DEVICE-SETUP.md](./NEW-DEVICE-SETUP.md)   | Cloning to a new machine, marketplace init |
| [MAINTENANCE.md](./MAINTENANCE.md)             | Cleanup, repo pulls, space audits          |
| [BACKUP-STRATEGIES.md](./BACKUP-STRATEGIES.md) | Backup procedures and recovery             |
| [SECURITY.md](./SECURITY.md)                   | Security audit decisions, gitignore policy |

### Ecosystem

| Document                                               | What it covers                      |
| ------------------------------------------------------ | ----------------------------------- |
| [MARKETPLACE-GUIDE.md](./MARKETPLACE-GUIDE.md)         | 68 marketplace repos, 3,900+ skills |
| [PLUGIN-MANAGEMENT.md](./PLUGIN-MANAGEMENT.md)         | Plugin lifecycle, customization     |
| [AUTO-CLAUDE-GUIDE.md](./AUTO-CLAUDE-GUIDE.md)         | Autonomous multi-agent coding       |
| [CLAUDE-CODE-RESOURCES.md](./CLAUDE-CODE-RESOURCES.md) | Community resources and tips        |
| [RESOURCES.md](./RESOURCES.md)                         | External links and references       |

---

## Toolkit at a Glance

| Component           | Count  | Location                       |
| ------------------- | ------ | ------------------------------ |
| Local skills        | 89     | `skills/`                      |
| Agents              | 47     | `agents/`                      |
| Commands            | 27     | `commands/`                    |
| Rules files         | 27     | `rules/`                       |
| Templates           | 14     | `templates/`                   |
| Hooks               | 8      | `hooks/`                       |
| MCP servers         | 9      | `.mcp.json`                    |
| Marketplace repos   | 68     | `plugins/marketplaces/`        |
| Marketplace skills  | 3,900+ | (across all marketplace repos) |
| **Total git repos** | **69** | 1 parent + 68 submodules       |

---

## Common Tasks

| Task                     | How To                                          |
| ------------------------ | ----------------------------------------------- |
| Sync all repos           | `~/.claude/_pull-all-repos.sh` or `/pull-repos` |
| Add a new skill          | Create folder in `skills/`, add `SKILL.md`      |
| Add a slash command      | Create `.md` file in `commands/`                |
| Add MCP server           | Edit `~/.claude/.mcp.json`                      |
| Change permissions       | Edit `settings.json` or use `/permissions`      |
| Run diagnostics          | `/health-check` or `/bootstrap`                 |
| Find a marketplace skill | `/discover-skills` or `/skill-finder`           |

---

## What Is This?

This `~/.claude/` folder is a fully configured, portable Claude Code environment containing:

- **89 local skills** for code review, design systems, feature development, domain expertise, and more
- **47 agents** for specialized autonomous workflows
- **27 slash commands** for workflow automation
- **9 MCP server configurations** for extended capabilities (disabled by default to save context)
- **68 marketplace repos** providing 3,900+ additional skills from the community
- **8 hooks** for session lifecycle, safety guards, and auto-formatting
- **27 rules files** for contextual guidance (checklists, stack patterns, workflows, tooling)
- **14 templates** for task planning, component creation, and project scaffolding

---

## History

### v2.3.5 (February 2026)

- Cloudflare Pages deploy fix: prebuild script removes broken nested submodule
- Dynamic website counts: footer, console, metadata now use `getCounts()` utility
- Added post-change documentation workflow rule

### v2.3.3 (February 2026)

- Documentation overhaul: added FAQ, Architecture Overview, Glossary
- Expanded hooks README with detailed per-hook documentation
- Added frontmatter metadata to all docs for website display
- Count reconciliation: skills 68→73, marketplace repos 67→72, marketplace skills 1,900+→3,900+
- Agent Teams integration with docs, skill, command, and auto-routing

### v2.3.1 (February 2026)

- Updated counts across documentation (68 marketplace repos, 3,900+ skills, 7 hooks)
- Documentation navigation overhaul

### v2.2 (January 2026)

- Showcase website at [claude.travisjneuman.com](https://claude.travisjneuman.com)
- Pull-all-repos script, documentation overhaul, tjn.claude/ branding

### v2.1 (January 2026)

- One-line installation, bootstrap command, SessionStart hook, cross-platform support

### v2.0 (January 2026)

- Research methodology, frontend aesthetics, PROACTIVE mode, multi-window state management

### v1.x (December 2025)

- Initial setup: merged duplicates, created docs, installed MCP servers

See [CHANGELOG.md](../CHANGELOG.md) for full details.

---

## Philosophy

- **Less is more** -- each skill/command loads into context window
- **Generic over specific** -- make things reusable across projects
- **Document everything** -- future you will thank present you
- **Clean regularly** -- temporary files accumulate fast

---

## Questions?

- **Claude Code docs:** https://code.claude.com/docs
- **Community resources:** See [CLAUDE-CODE-RESOURCES.md](./CLAUDE-CODE-RESOURCES.md)
- **FAQ:** See [FAQ.md](./FAQ.md)
- **Diagnostics:** Run `/health-check` in Claude Code
