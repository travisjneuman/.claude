# Folder Structure

Complete map of the `.claude/` folder and related files.

**Last Updated:** January 3, 2026 (v2.0)

---

## Important: Settings Files & VSCode Folders

### Settings Files (READ THIS FIRST)

This toolkit has multiple settings files with different purposes:

| File                   | Purpose                                                  | Tracked?   | Why                                 |
| ---------------------- | -------------------------------------------------------- | ---------- | ----------------------------------- |
| `settings.json`        | Claude Code toolkit config (permissions, hooks, plugins) | **Yes** ✅ | Core toolkit functionality - shared |
| `settings.local.json`  | Personal overrides                                       | **No**     | Machine-specific customizations     |
| `vscode/settings.json` | VSCode IDE settings                                      | **No**     | Contains local paths, network IPs   |
| `.mcp.json`            | MCP server config                                        | **No**     | Platform-specific commands          |
| `.claude.json`         | MCP backup                                               | **No**     | Machine-specific                    |

### Two VSCode Folders (CRITICAL DISTINCTION)

| Folder                | Description                          | Tracked?   |
| --------------------- | ------------------------------------ | ---------- |
| `vscode/` (no dot)    | Our custom folder with setup scripts | **Yes** ✅ |
| `.vscode/` (with dot) | Standard VSCode workspace folder     | **No**     |

**Why this matters:**

- `.vscode/` is auto-created by VSCode when opening any folder
- It contains machine-specific workspace settings (paths, IPs, preferences)
- If tracked, it would expose local network configuration
- Our `vscode/` folder provides portable setup scripts instead

### Security Audit (December 2025)

This repo underwent a security audit before being made public. The following were removed:

1. **`.archive/` folder** - Contained 139 files with personal project data, client emails
2. **`vscode/settings.json`** - Contained hardcoded paths (`C:\Users\tjn\.claude`) and local network IPs
3. **`.vscode/settings.json`** - Same issue (VSCode workspace folder)
4. **Git history** - Rewrote history using `git-filter-repo` to purge all traces

**DO NOT revert these .gitignore entries** - they protect user privacy.

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
    ├── .archive/                   ← GITIGNORED - created at runtime by workflows
    │   ├── plans/                  ← Completed plan files
    │   ├── skills/                 ← Archived skills
    │   ├── todos/                  ← Old todo history
    │   └── completed-tasks/        ← Archived task files
    │
    ├── plans/                      ← GITIGNORED - planning documents
    │   └── <project-name>/         ← Organized by project
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
    │   ├── Framework Skills/       ← Framework-specific development
    │   │   ├── vue-development/    ← Vue 3, Composition API, Pinia, Nuxt 3
    │   │   ├── svelte-development/ ← Svelte 5 runes, SvelteKit
    │   │   ├── ios-development/    ← Swift, SwiftUI, UIKit
    │   │   ├── android-development/← Kotlin, Jetpack Compose
    │   │   └── flutter-development/← Dart, Flutter widgets
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
    ├── tasks/                      ← Active task files (gitignored)
    │
    ├── templates/                  ← Task templates
    │   └── task-template.md        ← Generic task planning template
    │
    ├── vscode/                     ← VSCode setup scripts (TRACKED)
    │   ├── README.md               ← Setup instructions
    │   ├── setup-vscode-settings.ps1  ← Windows setup script
    │   └── settings.json           ← VSCode settings (GITIGNORED - has local paths)
    │
    └── .vscode/                    ← VSCode workspace folder (GITIGNORED - auto-created)
        └── settings.json           ← Machine-specific workspace settings
```

---

## Folder Details

### `/commands/` - Custom Slash Commands

Custom commands that appear as `/command-name` in Claude Code.

| File            | Command       | Purpose                                     |
| --------------- | ------------- | ------------------------------------------- |
| `run.md`        | `/run`        | Execute prompts with auto-archiving         |
| `start-task.md` | `/start-task` | Intelligent task router (v3.0 modular)      |
| `router/*.md`   | (reference)   | Domain detection tables (on-demand loading) |

**Note:** GSD commands (`/gsd:*`) come from the `get-shit-done` marketplace plugin.

**To add a command:** Create a `.md` file with YAML frontmatter.

---

### GSD Workflow Commands (from marketplace)

**Source:** `plugins/marketplaces/get-shit-done/commands/gsd/`

Complete workflow system for multi-phase projects:

| Command             | Purpose                                            |
| ------------------- | -------------------------------------------------- |
| `/gsd:new-project`  | Initialize new project with deep context gathering |
| `/gsd:progress`     | Check project status, route to next action         |
| `/gsd:plan-phase`   | Create detailed execution plan for a phase         |
| `/gsd:execute-plan` | Execute a PLAN.md file                             |
| `/gsd:pause-work`   | Create context handoff when pausing                |
| `/gsd:resume-work`  | Resume work with full context restoration          |
| `/gsd:help`         | Show available GSD commands                        |

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

| Category       | Examples                                                     |
| -------------- | ------------------------------------------------------------ |
| Generic        | `generic-code-reviewer`, `generic-design-system`             |
| Stack-specific | `generic-react-*`, `generic-static-*`, `generic-fullstack-*` |
| Domain Expert  | `marketing`, `sales`, `finance`, `leadership`                |
| Utility        | `tech-debt-analyzer`, `codebase-documenter`                  |

---

### `/templates/` - Task Templates

| Template           | Purpose                                 |
| ------------------ | --------------------------------------- |
| `task-template.md` | Comprehensive task planning with phases |

---

### `/docs/` - Documentation

This folder contains all documentation for understanding and maintaining this configuration.

---

### `/plans/` - Planning Documents (Gitignored)

Stores planning documents organized by project. This folder is **gitignored** as contents are user-specific.

**Example structure:**

- `<project-name>/` - Project-specific plans
- `meta/` - Cross-project documents

---

### `/.archive/` - Centralized Archive (Gitignored)

**Purpose:** Single location for all archived content. This folder is **gitignored** and created at runtime by workflows. Files here are NOT loaded into Claude's context.

**Created automatically when:**

- Completed tasks are archived via `mv tasks/<task>.md .archive/completed-tasks/`
- Plans are completed and moved to archive
- Other workflow archiving operations

**Contents (user-specific, not in repo):**

- Completed plan files
- Archived skills
- Old todo history
- Completed task files

---

### `/vscode/` vs `/.vscode/` - VSCode Folders

⚠️ **These are TWO DIFFERENT folders. Do not confuse them.**

#### `/vscode/` (Our Custom Folder - TRACKED)

This folder contains portable VSCode setup resources:

| File                        | Purpose                      | Tracked?            |
| --------------------------- | ---------------------------- | ------------------- |
| `README.md`                 | Setup instructions           | Yes                 |
| `setup-vscode-settings.ps1` | Windows symlink setup script | Yes                 |
| `settings.json`             | Template VSCode settings     | **No** (gitignored) |

**Why `vscode/settings.json` is gitignored:**

- Contains machine-specific paths (e.g., `C:\Users\tjn\.claude`)
- Contains local network IPs (e.g., `192.168.1.40`)
- Users should create their own from the template or use the symlink script

#### `/.vscode/` (VSCode Workspace Folder - GITIGNORED)

This folder is **automatically created by VSCode** when you open `.claude/` as a workspace.

- Created by: VSCode (not us)
- Contains: Workspace-specific settings, launch configs, etc.
- Tracked: **No** (entire folder gitignored)

**Why it's gitignored:**

- Auto-generated by IDE
- Contains machine-specific configuration
- Would conflict between users/machines
- Standard practice for public repos

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

| Path                       | Purpose                  | Safe to Delete |
| -------------------------- | ------------------------ | -------------- |
| `debug/`                   | Debug logs               | Yes            |
| `file-history/`            | Edit history for /rewind | Yes            |
| `projects/`                | Project trust hashes     | Yes            |
| `shell-snapshots/`         | Shell state backups      | Yes            |
| `statsig/`                 | Feature flag cache       | Yes            |
| `telemetry/`               | Telemetry data           | Yes            |
| `todos/`                   | Agent task history       | Yes            |
| `security_warnings_*.json` | Session warnings         | Yes            |
| `history.jsonl`            | Conversation history     | Yes            |
| `stats-cache.json`         | Usage statistics         | Yes            |
| `.credentials.json`        | Auth tokens              | Yes (re-login) |
| `sqlite_mcp_server.db`     | SQLite MCP data          | Yes            |

---

## Size Reference

| Path         | Typical Size | Notes                           |
| ------------ | ------------ | ------------------------------- |
| `skills/`    | ~500KB       | Core configuration              |
| `docs/`      | ~50KB        | Documentation                   |
| `commands/`  | ~100KB       | Slash commands (including gsd/) |
| `templates/` | ~10KB        | Templates                       |

**Total portable size:** ~1MB
**With generated files:** Can grow to 100MB+

---

## See Also

- [CONFIGURATION.md](./CONFIGURATION.md) - Settings details
- [MAINTENANCE.md](./MAINTENANCE.md) - Cleanup procedures
- [SECURITY.md](./SECURITY.md) - Security audit decisions and what's gitignored
