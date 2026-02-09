---
name: Folder Structure
description: Complete directory map of the .claude/ toolkit with file purposes, security notes, and organization rationale.
category: reference
---

# Folder Structure

Complete map of the `.claude/` folder and related files.

**Last Updated:** February 2026 (v2.3.8)

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
    ├── commands/                   ← Custom slash commands (21 + 7 router)
    │   ├── README.md               ← Commands index
    │   ├── assemble-team.md        ← /assemble-team - Agent Teams setup
    │   ├── auto-claude.md          ← /auto-claude - Autonomous mode
    │   ├── backup-config.md        ← /backup-config - Configuration backup
    │   ├── bootstrap.md            ← /bootstrap - Project bootstrapping
    │   ├── context-stats.md        ← /context-stats - Context usage
    │   ├── discover-skills.md      ← /discover-skills - Skill discovery
    │   ├── handoff.md              ← /handoff - Session handoff
    │   ├── health-check.md         ← /health-check - System health
    │   ├── init-project.md         ← /init-project - Project initialization
    │   ├── list-skills.md          ← /list-skills - List available skills
    │   ├── log-decision.md         ← /log-decision - Decision logging
    │   ├── pull-repos.md           ← /pull-repos - Update external repos
    │   ├── review-code.md          ← /review-code - Code review
    │   ├── run.md                  ← /run - Execute prompts
    │   ├── session-log.md          ← /session-log - Session logging
    │   ├── skill-finder.md         ← /skill-finder - Find skills
    │   ├── standardize-claude-md.md ← /standardize-claude-md - CLAUDE.md format
    │   ├── start-task.md           ← /start-task - Intelligent task router
    │   ├── update-counts.md        ← /update-counts - Update doc counts
    │   ├── update-docs.md          ← /update-docs - Update documentation
    │   └── router/                 ← Domain detection tables (on-demand)
    │       ├── decision-frameworks.md
    │       ├── domains-business.md
    │       ├── domains-creative.md
    │       ├── domains-development.md
    │       ├── domains-meta.md
    │       ├── domains-scientific.md
    │       └── routing-logic.md
    │
    ├── docs/                       ← Documentation (23 files)
    │   ├── README.md               ← Docs index
    │   ├── AGENT-TEAMS.md          ← Agent Teams comprehensive guide
    │   ├── ARCHITECTURE.md         ← System architecture overview
    │   ├── AUTO-CLAUDE-GUIDE.md    ← Autonomous Claude setup guide
    │   ├── BACKUP-STRATEGIES.md    ← Backup and recovery strategies
    │   ├── CLAUDE-CODE-RESOURCES.md ← Claude Code ecosystem resources
    │   ├── CONFIGURATION.md        ← Settings and configuration details
    │   ├── DOMAIN-ROUTING.md       ← Domain detection and routing
    │   ├── FAQ.md                   ← Frequently asked questions
    │   ├── FOLDER-STRUCTURE.md     ← (this file)
    │   ├── GLOSSARY.md             ← Terminology definitions
    │   ├── GSD-TUTORIAL.md         ← GSD workflow tutorial
    │   ├── MAINTENANCE.md          ← Cleanup and maintenance procedures
    │   ├── MARKETPLACE-GUIDE.md    ← Plugin marketplace guide
    │   ├── MCP-SERVERS.md          ← MCP server capabilities
    │   ├── NEW-DEVICE-SETUP.md     ← New device/machine setup
    │   ├── PLUGIN-MANAGEMENT.md    ← Plugin management guide
    │   ├── RESOURCES.md            ← General resources and links
    │   ├── SECURITY.md             ← Security audit and gitignore decisions
    │   ├── SETUP-GUIDE.md          ← Initial setup guide
    │   ├── SKILLS.md               ← Skills documentation
    │   ├── WORKFLOW-GUIDE.md       ← Workflow patterns guide
    │   └── workflow-automation.md  ← Automation workflows
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
    │       ├── get-shit-done/      ← GSD workflow system
    │       ├── obra-superpowers/
    │       ├── wshobson-agents/
    │       ├── voltagent-subagents/
    │       ├── trailofbits-skills/
    │       ├── claude-scientific-skills/
    │       └── ... (69 total repos, 1 parent + 68 submodules)
    │
    ├── skills/                     ← Custom skills (85 directories, 89 SKILL.md files)
    │   ├── README.md               ← Skills documentation
    │   ├── MASTER_INDEX.md         ← Navigation hub for all skills docs
    │   ├── EXPERT-SKILLS-GUIDE.md  ← All 16 domain expert skills guide
    │   │
    │   ├── _shared/                ← Shared skill resources
    │   │
    │   ├── Generic (Universal) ────────────────────────────
    │   │   ├── generic-code-reviewer/
    │   │   ├── generic-design-system/
    │   │   ├── generic-feature-developer/
    │   │   └── generic-ux-designer/
    │   │
    │   ├── Stack-Specific ─────────────────────────────────
    │   │   ├── generic-static-*/       ← HTML/CSS/JS (4 skills)
    │   │   ├── generic-react-*/        ← React/TypeScript (4 skills)
    │   │   └── generic-fullstack-*/    ← Next.js/NestJS (4 skills)
    │   │
    │   ├── Framework/Platform ─────────────────────────────
    │   │   ├── android-development/    ← Kotlin, Jetpack Compose
    │   │   ├── electron-desktop/       ← Electron desktop apps
    │   │   ├── flutter-development/    ← Dart, Flutter widgets
    │   │   ├── ios-development/        ← Swift, SwiftUI, UIKit
    │   │   ├── macos-native/           ← macOS native development
    │   │   ├── pwa-development/        ← Progressive Web Apps
    │   │   ├── react-native/           ← React Native mobile
    │   │   ├── svelte-development/     ← Svelte 5 runes, SvelteKit
    │   │   └── vue-development/        ← Vue 3, Composition API
    │   │
    │   ├── Architecture/Infrastructure ────────────────────
    │   │   ├── ai-ml-development/      ← AI/ML pipelines
    │   │   ├── api-design/             ← API design patterns
    │   │   ├── database-expert/        ← Database design
    │   │   ├── devops-cloud/           ← DevOps and cloud
    │   │   ├── graphql-expert/         ← GraphQL APIs
    │   │   ├── microservices-architecture/ ← Microservices
    │   │   └── websockets-realtime/    ← WebSocket/realtime
    │   │
    │   ├── Domain Expert ──────────────────────────────────
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
    │   ├── Creative ───────────────────────────────────────
    │   │   ├── audio-production/       ← Audio engineering
    │   │   ├── brand-identity/         ← Brand design
    │   │   ├── graphic-design/         ← Graphic design
    │   │   ├── ui-animation/           ← UI motion design
    │   │   ├── ui-research/            ← UX research
    │   │   └── video-production/       ← Video production
    │   │
    │   ├── Utility ────────────────────────────────────────
    │   │   ├── agent-teams/            ← Agent Teams coordination
    │   │   ├── auto-claude/            ← Autonomous Claude
    │   │   ├── codebase-documenter/    ← Code documentation
    │   │   ├── core-workflow/          ← Core workflow patterns
    │   │   ├── debug-systematic/       ← Systematic debugging
    │   │   ├── document-skills/        ← Document generation (docx/pdf/pptx/xlsx)
    │   │   ├── frontend-enhancer/      ← Frontend improvements
    │   │   ├── i18n-localization/      ← Internationalization
    │   │   ├── monetization-strategy/  ← Monetization planning
    │   │   ├── seo-analytics-auditor/  ← SEO auditing
    │   │   ├── startup-launch/         ← Startup guidance
    │   │   ├── tdd-workflow/           ← Test-driven development
    │   │   ├── tech-debt-analyzer/     ← Tech debt analysis
    │   │   └── test-specialist/        ← Testing expertise
    │
    ├── tasks/                      ← Active task files (gitignored)
    │
    ├── templates/                  ← Templates (10 files + plugin-template/)
    │   ├── README.md               ← Templates index
    │   ├── agent-template.md       ← Agent definition template
    │   ├── command-template.md     ← Command creation template
    │   ├── init.sh                 ← Project initialization script
    │   ├── progress.md             ← Progress tracking template
    │   ├── project-CLAUDE.md       ← Project CLAUDE.md template
    │   ├── research-notes.md       ← Research notes template
    │   ├── skill-template.md       ← Skill creation template
    │   ├── task-template.md        ← Task planning template
    │   ├── tests.json              ← Test tracking format
    │   └── plugin-template/        ← Plugin scaffolding
    │       ├── README.md
    │       ├── plugin.json
    │       ├── agents/example-agent.md
    │       ├── commands/example-command.md
    │       └── skills/example-skill/SKILL.md
    │
    ├── agents/                     ← Subagent definitions (47 agents)
    │   ├── README.md               ← Agents index
    │   ├── accessibility-expert.md
    │   ├── android-developer.md
    │   ├── api-designer.md
    │   ├── architecture-analyst.md
    │   ├── audio-engineer.md
    │   ├── brand-strategist.md
    │   ├── code-explainer.md
    │   ├── database-architect.md
    │   ├── database-expert.md
    │   ├── debugging-specialist.md
    │   ├── deep-code-reviewer.md
    │   ├── desktop-developer.md
    │   ├── devops-engineer.md
    │   ├── devops-specialist.md
    │   ├── documentation-writer.md
    │   ├── game-developer.md
    │   ├── graphic-designer.md
    │   ├── graphql-architect.md
    │   ├── i18n-specialist.md
    │   ├── ios-developer.md
    │   ├── macos-developer.md
    │   ├── microservices-architect.md
    │   ├── ml-engineer.md
    │   ├── mobile-architect.md
    │   ├── monetization-expert.md
    │   ├── motion-designer.md
    │   ├── performance-optimizer.md
    │   ├── python-expert.md
    │   ├── react-expert.md
    │   ├── realtime-specialist.md
    │   ├── refactoring-specialist.md
    │   ├── security-auditor.md
    │   ├── startup-advisor.md
    │   ├── test-generator.md
    │   ├── typescript-expert.md
    │   └── video-producer.md
    │
    ├── hooks/                      ← Event hooks (7 scripts)
    │   ├── README.md               ← Hooks index
    │   ├── format-code.sh          ← PostToolUse: auto-format on file write
    │   ├── guard-dangerous.sh      ← PreToolUse: block dangerous operations
    │   ├── pre-commit-counts.sh    ← Pre-commit: update doc counts
    │   ├── prompt-context.sh       ← PreToolUse: prompt context injection
    │   ├── session-start-context.sh ← SessionStart: load context
    │   ├── session-start-pull.sh   ← SessionStart: pull repos
    │   └── session-stop-summary.sh ← SessionStop: save session summary
    │
    ├── rules/                      ← Contextual rules (17 files across 4 dirs)
    │   ├── README.md               ← Rules index
    │   ├── checklists/             ← Task-type checklists
    │   │   ├── automation-scripts.md
    │   │   ├── static-sites.md
    │   │   ├── ui-visual-changes.md
    │   │   └── verification-template.md
    │   ├── stacks/                 ← Tech stack patterns
    │   │   ├── fullstack-nextjs-nestjs.md
    │   │   ├── go.md
    │   │   ├── python.md
    │   │   ├── react-typescript.md
    │   │   └── rust.md
    │   ├── tooling/                ← Tool configuration
    │   │   ├── external-repos.md
    │   │   ├── git-hooks-setup.md
    │   │   ├── mcp-servers.md
    │   │   └── troubleshooting.md
    │   └── workflows/              ← Workflow methodologies
    │       ├── action-policy.md
    │       ├── agent-teams.md
    │       ├── context-management.md
    │       └── research-methodology.md
    │
    ├── scripts/                    ← Automation scripts (16 + 4 hook scripts)
    │   ├── README.md               ← Scripts index
    │   ├── README-sync-scripts.md  ← Sync scripts documentation
    │   ├── fix-marketplace-paths.sh ← Fix plugin path issues
    │   ├── fix-plugin-line-endings.ps1 ← Fix line endings (Windows)
    │   ├── fix-plugin-line-endings.sh  ← Fix line endings (Unix)
    │   ├── fix-remotes.sh          ← Fix git remote URLs
    │   ├── force-sync-repos.sh     ← Force sync all repos
    │   ├── init-marketplaces.sh    ← Initialize marketplace repos
    │   ├── install.sh              ← Installation script
    │   ├── regenerate-index.sh     ← Regenerate skill indexes
    │   ├── setup-hooks.sh          ← Install git hooks
    │   ├── setup-new-machine.sh    ← New machine setup
    │   ├── update-counts.sh        ← Update documentation counts
    │   ├── update-external-repos.sh ← Update external repos
    │   ├── update-marketplaces.sh  ← Update marketplace repos
    │   ├── update-plugins.sh       ← Update plugins
    │   └── hooks/                  ← Git hook scripts
    │       ├── commit-msg.sh
    │       ├── pre-commit.sh
    │       ├── pre-push.sh
    │       └── session-start.sh
    │
    ├── vscode/                     ← VSCode setup scripts (TRACKED)
    │   ├── README.md               ← Setup instructions
    │   ├── setup-vscode-settings.ps1  ← Windows setup script
    │   └── settings.json           ← VSCode settings (GITIGNORED - has local paths)
    │
    ├── website/                    ← Showcase website (SvelteKit, Cloudflare Pages)
    │   ├── scripts/
    │   │   └── fix-submodules.mjs  ← Prebuild: removes broken nested submodule
    │   └── src/
    │       └── lib/
    │           └── data/
    │               └── counts.ts   ← Dynamic counts utility (getCounts())
    │
    └── .vscode/                    ← VSCode workspace folder (GITIGNORED - auto-created)
        └── settings.json           ← Machine-specific workspace settings
```

---

## Folder Details

### `/commands/` - Custom Slash Commands (27 commands + 7 router files)

Custom commands that appear as `/command-name` in Claude Code.

| File                       | Command                  | Purpose                             |
| -------------------------- | ------------------------ | ----------------------------------- |
| `assemble-team.md`         | `/assemble-team`         | Set up Agent Teams                  |
| `auto-claude.md`           | `/auto-claude`           | Launch autonomous mode              |
| `backup-config.md`         | `/backup-config`         | Back up configuration               |
| `bootstrap.md`             | `/bootstrap`             | Bootstrap a new project             |
| `context-stats.md`         | `/context-stats`         | Show context window usage           |
| `discover-skills.md`       | `/discover-skills`       | Discover available skills           |
| `handoff.md`               | `/handoff`               | Create session handoff              |
| `health-check.md`          | `/health-check`          | Run system health check             |
| `init-project.md`          | `/init-project`          | Initialize project configuration    |
| `list-skills.md`           | `/list-skills`           | List all available skills           |
| `log-decision.md`          | `/log-decision`          | Log an architectural decision       |
| `pull-repos.md`            | `/pull-repos`            | Pull updates for external repos     |
| `review-code.md`           | `/review-code`           | Code review workflow                |
| `run.md`                   | `/run`                   | Execute prompts with auto-archiving |
| `session-log.md`           | `/session-log`           | Create session log                  |
| `skill-finder.md`          | `/skill-finder`          | Find skills by keyword              |
| `standardize-claude-md.md` | `/standardize-claude-md` | Standardize CLAUDE.md format        |
| `start-task.md`            | `/start-task`            | Intelligent task router (modular)   |
| `update-counts.md`         | `/update-counts`         | Update documentation counts         |
| `update-docs.md`           | `/update-docs`           | Update documentation files          |
| `router/*.md`              | (reference)              | Domain detection tables (7 files)   |

**Note:** GSD commands (`/gsd:*`) come from the `get-shit-done` marketplace plugin.

**To add a command:** Create a `.md` file with YAML frontmatter. See `templates/command-template.md`.

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

### `/agents/` - Subagent Definitions (47 agents)

Agent definitions for the Task tool's `subagent_type` parameter. Each agent is a markdown file that defines a specialized role with constrained tools.

| Category       | Examples                                                                      |
| -------------- | ----------------------------------------------------------------------------- |
| Code Review    | `deep-code-reviewer`, `refactoring-specialist`                                |
| Development    | `react-expert`, `python-expert`, `typescript-expert`                          |
| Architecture   | `architecture-analyst`, `microservices-architect`, `api-designer`             |
| Testing        | `test-generator`, `debugging-specialist`                                      |
| DevOps         | `devops-engineer`, `devops-specialist`                                        |
| Mobile/Desktop | `ios-developer`, `android-developer`, `mobile-architect`, `desktop-developer` |
| Data/ML        | `database-expert`, `database-architect`, `ml-engineer`                        |
| Creative       | `graphic-designer`, `motion-designer`, `audio-engineer`, `video-producer`     |
| Business       | `brand-strategist`, `monetization-expert`, `startup-advisor`                  |
| Specialized    | `security-auditor`, `accessibility-expert`, `i18n-specialist`                 |

---

### `/hooks/` - Event Hooks (7 scripts)

Shell scripts triggered by Claude Code events (configured in `settings.json`).

| Hook                       | Event        | Purpose                         |
| -------------------------- | ------------ | ------------------------------- |
| `format-code.sh`           | PostToolUse  | Auto-format files after writing |
| `guard-dangerous.sh`       | PreToolUse   | Block dangerous operations      |
| `pre-commit-counts.sh`     | Pre-commit   | Update doc counts before commit |
| `prompt-context.sh`        | PreToolUse   | Inject context into prompts     |
| `session-start-context.sh` | SessionStart | Load context at session start   |
| `session-start-pull.sh`    | SessionStart | Pull repos at session start     |
| `session-stop-summary.sh`  | SessionStop  | Save summary at session end     |

---

### `/rules/` - Contextual Rules (17 files across 4 subdirectories)

Modular workflow rules loaded based on task type. See `rules/README.md` for when to load each file.

| Subdirectory  | Files | Purpose                                                                |
| ------------- | ----- | ---------------------------------------------------------------------- |
| `checklists/` | 4     | Task-type checklists (automation, static sites, UI, verification)      |
| `stacks/`     | 5     | Tech stack patterns (Go, Python, React, Rust, Fullstack)               |
| `tooling/`    | 4     | Tool configuration (external repos, git hooks, MCP, troubleshooting)   |
| `workflows/`  | 4     | Workflow methodologies (action policy, agent teams, context, research) |

---

### `/scripts/` - Automation Scripts (16 scripts + 4 hook scripts)

Shell scripts for setup, maintenance, and automation.

| Script                      | Purpose                                                            |
| --------------------------- | ------------------------------------------------------------------ |
| `install.sh`                | Full installation                                                  |
| `setup-new-machine.sh`      | New machine/device setup                                           |
| `setup-hooks.sh`            | Install git hooks                                                  |
| `init-marketplaces.sh`      | Initialize marketplace repos                                       |
| `update-external-repos.sh`  | Update external repos                                              |
| `update-marketplaces.sh`    | Update marketplace repos                                           |
| `update-plugins.sh`         | Update plugins                                                     |
| `update-counts.sh`          | Update documentation counts                                        |
| `force-sync-repos.sh`       | Force sync all repos                                               |
| `fix-remotes.sh`            | Fix git remote URLs                                                |
| `fix-marketplace-paths.sh`  | Fix plugin path issues (cross-platform)                            |
| `fix-plugin-line-endings.*` | Fix line endings (sh + ps1)                                        |
| `regenerate-index.sh`       | Regenerate skill indexes                                           |
| `hooks/`                    | Git hook scripts (commit-msg, pre-commit, pre-push, session-start) |

---

### `/skills/` - Domain Knowledge (89 SKILL.md files across 85 directories)

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

| Category            | Count | Examples                                                     |
| ------------------- | ----- | ------------------------------------------------------------ |
| Generic (Universal) | 4     | `generic-code-reviewer`, `generic-design-system`             |
| Stack-Specific      | 12    | `generic-react-*`, `generic-static-*`, `generic-fullstack-*` |
| Framework/Platform  | 9     | `vue-development`, `ios-development`, `react-native`         |
| Architecture/Infra  | 7     | `api-design`, `database-expert`, `devops-cloud`              |
| Domain Expert       | 16    | `marketing`, `sales`, `finance`, `leadership`                |
| Creative            | 6     | `audio-production`, `graphic-design`, `video-production`     |
| Utility             | 14    | `tech-debt-analyzer`, `document-skills`, `agent-teams`       |

---

### `/templates/` - Templates (10 files + plugin-template/)

| Template              | Purpose                       |
| --------------------- | ----------------------------- |
| `agent-template.md`   | Agent definition template     |
| `command-template.md` | Command creation template     |
| `init.sh`             | Project initialization script |
| `progress.md`         | Progress tracking template    |
| `project-CLAUDE.md`   | Project CLAUDE.md template    |
| `research-notes.md`   | Research notes template       |
| `skill-template.md`   | Skill creation template       |
| `task-template.md`    | Task planning template        |
| `tests.json`          | Test tracking format          |
| `plugin-template/`    | Complete plugin scaffolding   |

---

### `/docs/` - Documentation (23 files)

All documentation for understanding and maintaining this configuration.

| File                       | Purpose                                |
| -------------------------- | -------------------------------------- |
| `README.md`                | Docs index                             |
| `AGENT-TEAMS.md`           | Agent Teams comprehensive guide        |
| `ARCHITECTURE.md`          | System architecture overview           |
| `AUTO-CLAUDE-GUIDE.md`     | Autonomous Claude setup guide          |
| `BACKUP-STRATEGIES.md`     | Backup and recovery strategies         |
| `CLAUDE-CODE-RESOURCES.md` | Claude Code ecosystem resources        |
| `CONFIGURATION.md`         | Settings and configuration details     |
| `DOMAIN-ROUTING.md`        | Domain detection and routing           |
| `FAQ.md`                   | Frequently asked questions             |
| `FOLDER-STRUCTURE.md`      | Directory map (this file)              |
| `GLOSSARY.md`              | Terminology definitions                |
| `GSD-TUTORIAL.md`          | GSD workflow tutorial                  |
| `MAINTENANCE.md`           | Cleanup and maintenance procedures     |
| `MARKETPLACE-GUIDE.md`     | Plugin marketplace guide               |
| `MCP-SERVERS.md`           | MCP server capabilities                |
| `NEW-DEVICE-SETUP.md`      | New device/machine setup               |
| `PLUGIN-MANAGEMENT.md`     | Plugin management guide                |
| `RESOURCES.md`             | General resources and links            |
| `SECURITY.md`              | Security audit and gitignore decisions |
| `SETUP-GUIDE.md`           | Initial setup guide                    |
| `SKILLS.md`                | Skills documentation                   |
| `WORKFLOW-GUIDE.md`        | Workflow patterns guide                |
| `workflow-automation.md`   | Automation workflows                   |

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

| Path         | Typical Size | Notes                            |
| ------------ | ------------ | -------------------------------- |
| `skills/`    | ~800KB       | 89 SKILL.md files across 90 dirs |
| `docs/`      | ~200KB       | 24 documentation files           |
| `commands/`  | ~150KB       | 27 commands + 7 router files     |
| `agents/`    | ~150KB       | 47 agent definitions             |
| `rules/`     | ~150KB       | 27 rule files across 4 subdirs   |
| `scripts/`   | ~50KB        | 16 scripts + 4 hook scripts      |
| `hooks/`     | ~25KB        | 8 event hook scripts             |
| `templates/` | ~40KB        | 15 templates + plugin-template/  |

**Total portable size:** ~1MB
**With generated files:** Can grow to 100MB+

---

## See Also

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture overview
- [CONFIGURATION.md](./CONFIGURATION.md) - Settings details
- [MAINTENANCE.md](./MAINTENANCE.md) - Cleanup procedures
- [NEW-DEVICE-SETUP.md](./NEW-DEVICE-SETUP.md) - New device setup
- [SECURITY.md](./SECURITY.md) - Security audit decisions and what's gitignored
- [SETUP-GUIDE.md](./SETUP-GUIDE.md) - Initial setup guide
