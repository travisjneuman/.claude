# Folder Structure

Complete map of the `.claude/` folder and related files.

**Last Updated:** December 17, 2025

---

## Overview

```
~/                                  ← Home directory (cross-platform)
│
├── .claude.json                    ← MCP servers (OUTSIDE .claude/)
│
└── .claude/                        ← Main configuration folder
    │
    ├── .claude.json                ← Portable MCP backup
    ├── .mcp.json                   ← MCP server definitions
    │
    ├── settings.json               ← Main settings (permissions, plugins)
    ├── settings.local.json         ← Local overrides
    │
    ├── CLAUDE.md                   ← Global memory/instructions
    ├── README.md                   ← Folder overview
    │
    ├── commands/                   ← Custom slash commands
    │   ├── run.md                  ← /run - Execute prompts
    │   ├── start-task.md           ← /start-task - Intelligent router
    │   └── gsd/                    ← GSD (Get Shit Done) workflow commands
    │       ├── add-phase.md
    │       ├── complete-milestone.md
    │       ├── consider-issues.md
    │       ├── create-roadmap.md
    │       ├── discuss-milestone.md
    │       ├── discuss-phase.md
    │       ├── execute-plan.md
    │       ├── help.md
    │       ├── insert-phase.md
    │       ├── list-phase-assumptions.md
    │       ├── new-milestone.md
    │       ├── new-project.md
    │       ├── pause-work.md
    │       ├── plan-phase.md
    │       ├── progress.md
    │       ├── research-phase.md
    │       ├── research-project.md
    │       └── resume-work.md
    │
    ├── docs/                       ← This documentation
    │   ├── README.md
    │   ├── FOLDER-STRUCTURE.md     ← (this file)
    │   ├── CONFIGURATION.md
    │   ├── SKILLS.md
    │   ├── MCP-SERVERS.md
    │   ├── SETUP-GUIDE.md
    │   ├── MAINTENANCE.md
    │   └── workflow-automation.md
    │
    ├── .archive/                   ← Centralized archive (not loaded into context)
    │   ├── plans/                  ← Completed plan files
    │   ├── skills/                 ← Archived skills
    │   ├── todos/                  ← Old todo history
    │   ├── document-schemas/       ← Document schemas
    │   └── project-claude-snapshots-2025-12-13/
    │
    ├── plans/                      ← Planning documents (organized by project)
    │   ├── CLAUDE.md               ← Organization guidelines
    │   ├── neuman-brain/           ← Neuman Brain platform plans
    │   ├── oakstone-properties/    ← OakStone rental website plans
    │   ├── thedeadrobot/           ← TDR Portfolio / X automation plans
    │   ├── lazy-golfing/           ← Lazy Golfing platform plans
    │   ├── claude-config/          ← .claude folder optimization plans
    │   └── meta/                   ← Cross-project / general planning
    │
    ├── plugins/                    ← Plugins and external repos
    │   ├── cache/                  ← Plugin cache (regenerated, gitignored)
    │   ├── local/                  ← Your custom plugins
    │   └── marketplaces/           ← External repos (submodules, read-only)
    │       ├── anthropic-agent-skills/
    │       ├── claude-code-plugins/
    │       ├── claude-plugins-official/
    │       ├── taches-cc-resources/
    │       └── get-shit-done/      ← GSD workflow system
    │
    ├── skills/                     ← Custom skills
    │   ├── README.md               ← Skills documentation
    │   ├── MASTER_INDEX.md         ← Navigation hub for all skills docs
    │   ├── EXPERT-SKILLS-GUIDE.md  ← All 16 domain expert skills guide
    │   │
    │   ├── _shared/                ← Shared skill resources
    │   │
    │   ├── generic-*/              ← Universal skills (any project)
    │   │   ├── generic-code-reviewer/
    │   │   ├── generic-design-system/
    │   │   ├── generic-feature-developer/
    │   │   └── generic-ux-designer/
    │   │
    │   ├── generic-static-*/       ← HTML/CSS/JS stack skills
    │   ├── generic-react-*/        ← React/TypeScript stack skills
    │   ├── generic-fullstack-*/    ← Next.js/NestJS stack skills
    │   │
    │   ├── Domain Expert Skills/   ← Task-focused expertise
    │   │   ├── business-strategy/
    │   │   ├── data-science/
    │   │   ├── finance/
    │   │   ├── health-wellness/
    │   │   ├── hr-talent/
    │   │   ├── innovation/
    │   │   ├── leadership/
    │   │   ├── legal-compliance/
    │   │   ├── marketing/
    │   │   ├── operations/
    │   │   ├── product-management/
    │   │   ├── rd-management/
    │   │   ├── risk-management/
    │   │   ├── sales/
    │   │   ├── security/
    │   │   └── sustainability-esg/
    │   │
    │   └── Utility Skills/
    │       ├── codebase-documenter/
    │       ├── document-skills/
    │       ├── frontend-enhancer/
    │       ├── seo-analytics-auditor/
    │       ├── tech-debt-analyzer/
    │       └── test-specialist/
    │
    ├── tasks/                      ← Active task files
    │
    └── templates/                  ← Task templates
        └── task-template.md        ← Generic task planning template
```

---

## Folder Details

### `/commands/` - Custom Slash Commands

Custom commands that appear as `/command-name` in Claude Code.

| File | Command | Purpose |
|------|---------|---------|
| `run.md` | `/run` | Execute prompts with auto-archiving |
| `start-task.md` | `/start-task` | Intelligent task router (v3.0 modular) |
| `router/*.md` | (reference) | Domain detection tables (on-demand loading) |

**Note:** GSD commands (`/gsd:*`) come from the `get-shit-done` marketplace plugin.

**To add a command:** Create a `.md` file with YAML frontmatter.

---

### GSD Workflow Commands (from marketplace)

**Source:** `plugins/marketplaces/get-shit-done/commands/gsd/`

Complete workflow system for multi-phase projects:

| Command | Purpose |
|---------|---------|
| `/gsd:new-project` | Initialize new project with deep context gathering |
| `/gsd:progress` | Check project status, route to next action |
| `/gsd:plan-phase` | Create detailed execution plan for a phase |
| `/gsd:execute-plan` | Execute a PLAN.md file |
| `/gsd:pause-work` | Create context handoff when pausing |
| `/gsd:resume-work` | Resume work with full context restoration |
| `/gsd:help` | Show available GSD commands |

---

### `/skills/` - Domain Knowledge

Skills provide specialized knowledge and guidelines. They auto-activate based on context.

**Skill Structure:**
```
skills/
└── skill-name/
    ├── SKILL.md          ← Required: Main skill file
    ├── references/       ← Optional: Reference materials
    ├── assets/           ← Optional: Templates, examples
    └── scripts/          ← Optional: Helper scripts
```

**Skill Categories:**

| Category | Examples |
|----------|----------|
| Generic | `generic-code-reviewer`, `generic-design-system` |
| Stack-specific | `generic-react-*`, `generic-static-*`, `generic-fullstack-*` |
| Domain Expert | `marketing`, `sales`, `finance`, `leadership` |
| Utility | `tech-debt-analyzer`, `codebase-documenter` |

---

### `/templates/` - Task Templates

| Template | Purpose |
|----------|---------|
| `task-template.md` | Comprehensive task planning with phases |

---

### `/docs/` - Documentation

This folder contains all documentation for understanding and maintaining this configuration.

---

### `/plans/` - Planning Documents

Stores planning documents organized by project.

**Current projects:**
- `neuman-brain/` - Neuman Brain platform
- `oakstone-properties/` - OakStone rental website
- `thedeadrobot/` - TDR Portfolio + X automation
- `lazy-golfing/` - Lazy Golfing platform
- `claude-config/` - This .claude folder
- `meta/` - Cross-project documents

---

### `/.archive/` - Centralized Archive

**Purpose:** Single location for all archived content. Files here are NOT loaded into Claude's context.

**When to archive:**
- Plans that have been fully executed
- Historical reference documents no longer actively needed
- Project snapshots for reference

---

## Files Outside `.claude/`

### `~/.claude.json`

**Location:** `~/.claude.json` (NOT inside .claude/)

**Purpose:** MCP server configurations

**Platform paths:**
- Windows: `C:\Users\username\.claude.json`
- macOS: `/Users/username/.claude.json`
- Linux: `/home/username/.claude.json`

---

## Files That Get Generated (Don't Copy)

| Path | Purpose | Safe to Delete |
|------|---------|----------------|
| `debug/` | Debug logs | Yes |
| `file-history/` | Edit history for /rewind | Yes |
| `projects/` | Project trust hashes | Yes |
| `shell-snapshots/` | Shell state backups | Yes |
| `statsig/` | Feature flag cache | Yes |
| `telemetry/` | Telemetry data | Yes |
| `todos/` | Agent task history | Yes |
| `security_warnings_*.json` | Session warnings | Yes |
| `history.jsonl` | Conversation history | Yes |
| `stats-cache.json` | Usage statistics | Yes |
| `.credentials.json` | Auth tokens | Yes (re-login) |
| `sqlite_mcp_server.db` | SQLite MCP data | Yes |

---

## Size Reference

| Path | Typical Size | Notes |
|------|--------------|-------|
| `skills/` | ~500KB | Core configuration |
| `docs/` | ~50KB | Documentation |
| `commands/` | ~100KB | Slash commands (including gsd/) |
| `templates/` | ~10KB | Templates |

**Total portable size:** ~1MB
**With generated files:** Can grow to 100MB+

---

## See Also

- [CONFIGURATION.md](./CONFIGURATION.md) - Settings details
- [MAINTENANCE.md](./MAINTENANCE.md) - Cleanup procedures
