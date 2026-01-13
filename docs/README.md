# Claude Code Configuration Documentation

**Last Updated:** January 2026 (v2.1)
**Maintainer:** Travis J. Neuman
**Purpose:** Portable, optimized Claude Code configuration for any project

**New in v2.1:** One-line installation, bootstrap command, SessionStart hook for automatic routing, cross-platform support. See [CHANGELOG.md](../CHANGELOG.md#210---january-13-2026).

**v2.0 features:** Research methodology, frontend aesthetics, PROACTIVE mode, multi-window state management. See [CHANGELOG.md](../CHANGELOG.md#200---january-3-2026).

---

## Quick Links

| Document                                     | Purpose                                 |
| -------------------------------------------- | --------------------------------------- |
| [FOLDER-STRUCTURE.md](./FOLDER-STRUCTURE.md) | Complete map of all files and folders   |
| [CONFIGURATION.md](./CONFIGURATION.md)       | Settings, permissions, and config files |
| [SKILLS.md](./SKILLS.md)                     | Skills system and customization         |
| [MCP-SERVERS.md](./MCP-SERVERS.md)           | Model Context Protocol servers          |
| [SETUP-GUIDE.md](./SETUP-GUIDE.md)           | How to deploy to a new machine          |
| [MAINTENANCE.md](./MAINTENANCE.md)           | Ongoing maintenance and cleanup         |

---

## What Is This?

This `.claude/` folder contains a fully configured, portable Claude Code environment that includes:

- **Custom skills** for code review, design systems, feature development, and UX
- **Slash commands** for workflow automation
- **MCP server configurations** for extended capabilities
- **Templates** for task planning
- **Documentation and guides** for Claude Code optimization

---

## History & Context

### What Was Done (January 2026 - v2.1)

**Version 2.1 Release:**

- One-line installation script (`scripts/install.sh`)
- Bootstrap verification command (`/bootstrap`)
- SessionStart hook for automatic skill/agent routing
- Cross-platform support (macOS, Linux, Windows via Git Bash)
- Updated documentation with installation guides

### What Was Done (January 2026 - v2.0)

**Version 2.0 Release:**

- Integrated Claude 4.5 best practices (research methodology, frontend aesthetics)
- Added PROACTIVE WITH INTELLIGENCE action mode
- Created multi-window workflow templates (research-notes.md, tests.json, progress.md)
- Enhanced verification with solution quality checks
- Enhanced UI checklist with anti-"AI slop" design guidance (+230 lines)
- All features auto-activate based on context (no slash commands needed)

### What Was Done (December 2025 - v1.x)

1. **Merged duplicate files** - Combined 4+ versions of workflow docs into single authoritative files
2. **Made project-specific content generic** - Renamed project-specific skills to `example-*` templates
3. **Cleaned up temporary files** - Removed debug logs, shell snapshots, old todos, security warnings
4. **Optimized configurations** - Streamlined settings.json and created portable .claude.json
5. **Installed MCP servers** - sequential-thinking, playwright, memory, filesystem, sqlite
6. **Researched best practices** - Compiled comprehensive resource guide from community sources
7. **Created documentation** - This docs folder

### Key Decisions Made

| Decision                             | Reasoning                                                    |
| ------------------------------------ | ------------------------------------------------------------ |
| `enableAllProjectMcpServers: false`  | MCP servers only load when explicitly called (saves context) |
| `defaultMode: bypassPermissions`     | Streamlined workflow without constant permission prompts     |
| Generic skills over project-specific | Portable across any project type                             |
| Minimal .claude.json                 | Only MCP servers; everything else regenerates                |

---

## File Relationships

```
~/                               (Home Directory - cross-platform)
├── .claude.json                 ← MCP servers config (SIBLING to .claude/)
│
└── .claude/                     ← This folder (skills, commands, settings)
    ├── .claude.json             ← Portable backup of MCP config
    ├── settings.json            ← Permissions, plugins, preferences
    ├── settings.local.json      ← Local overrides (usually same as settings.json)
    ├── commands/                ← Custom slash commands
    ├── skills/                  ← Domain knowledge and guidelines
    ├── templates/               ← Task planning templates
    ├── plans/                   ← Planning documents
    ├── docs/                    ← This documentation
    └── ...
```

**Platform-specific paths:**

- Windows: `C:\Users\username\`
- macOS: `/Users/username/`
- Linux: `/home/username/`

**Critical:** The `.claude.json` at `~/.claude.json` is NOT inside `.claude/`. They are siblings.

---

## For New Engineers

### Quick Start

1. Read [SETUP-GUIDE.md](./SETUP-GUIDE.md) to deploy this config to your machine
2. Review [FOLDER-STRUCTURE.md](./FOLDER-STRUCTURE.md) to understand what's here
3. Check [CONFIGURATION.md](./CONFIGURATION.md) for settings details
4. See [../CLAUDE-CODE-RESOURCES.md](../CLAUDE-CODE-RESOURCES.md) for comprehensive Claude Code tips

### Common Tasks

| Task                  | How To                                     |
| --------------------- | ------------------------------------------ |
| Add a new skill       | Create folder in `skills/`, add `SKILL.md` |
| Add a slash command   | Create `.md` file in `commands/`           |
| Add MCP server        | Edit `~/.claude.json`, add to `mcpServers` |
| Change permissions    | Edit `settings.json` → `permissions.allow` |
| Configure status line | Run `/statusline` in Claude Code           |

### Philosophy

- **Less is more** - Each skill/command loads into context window
- **Generic over specific** - Make things reusable across projects
- **Document everything** - Future you will thank present you
- **Clean regularly** - Temporary files accumulate fast

---

## Questions?

- **Claude Code docs:** https://code.claude.com/docs
- **Community resources:** See `CLAUDE-CODE-RESOURCES.md`
- **Issues:** Check `/doctor` command for diagnostics

---

## Version History

| Date     | Version | Changes                                          |
| -------- | ------- | ------------------------------------------------ |
| Jan 2026 | v2.1    | One-line install, bootstrap, SessionStart hook   |
| Jan 2026 | v2.0    | Research methodology, PROACTIVE mode, aesthetics |
| Dec 2025 | v1.x    | Initial setup, merged duplicates, created docs   |
