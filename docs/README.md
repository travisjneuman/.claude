---
name: Documentation Index
description: Navigation hub for all 23 guides covering setup, workflows, architecture, and operations.
category: reference
---

# Claude Code Toolkit Documentation

**Last Updated:** February 2026 (v2.9.2)
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
| [MCP-SERVERS.md](./MCP-SERVERS.md)           | 12 MCP servers: when to enable, token cost  |
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
| [MARKETPLACE-GUIDE.md](./MARKETPLACE-GUIDE.md)         | 101 marketplace repos, 7,400+ skills |
| [PLUGIN-MANAGEMENT.md](./PLUGIN-MANAGEMENT.md)         | Plugin lifecycle, customization     |
| [AUTO-CLAUDE-GUIDE.md](./AUTO-CLAUDE-GUIDE.md)         | Autonomous multi-agent coding       |
| [CLAUDE-CODE-RESOURCES.md](./CLAUDE-CODE-RESOURCES.md) | Community resources and tips        |
| [RESOURCES.md](./RESOURCES.md)                         | External links and references       |

---

## Toolkit at a Glance

| Component           | Count  | Location                       |
| ------------------- | ------ | ------------------------------ |
| Local skills        | 119    | `skills/`                      |
| Agents              | 59     | `agents/`                      |
| Commands            | 30     | `commands/`                    |
| Rules files         | 30     | `rules/`                       |
| Templates           | 17     | `templates/`                   |
| Hooks               | 10     | `hooks/`                       |
| MCP servers         | 12     | `.mcp.json`                    |
| Marketplace repos   | 101    | `plugins/marketplaces/`        |
| Marketplace skills  | 7,400+ | (across all marketplace repos) |
| **Total git repos** | **102** | 1 parent + 101 submodules     |

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

- **119 local skills** for code review, design systems, feature development, domain expertise, and more
- **59 agents** for specialized autonomous workflows
- **30 slash commands** for workflow automation
- **12 MCP server configurations** for extended capabilities (disabled by default to save context)
- **101 marketplace repos** providing 7,400+ additional skills from the community
- **10 hooks** for session lifecycle, safety guards, path validation, and auto-lint
- **2 rules files** for contextual guidance (checklists, stack patterns, workflows, tooling)
- **17 templates** for task planning, component creation, and project scaffolding

---

## History

### v2.9.2 (February 2026)

- Comprehensive audit: fixed all stale counts, broken path references, and version drift
- Fixed `update-counts.sh`: added 10+ missing sed patterns (badge URLs, ASCII art, table counts, community marketplace text)
- Fixed `regenerate-index.sh`: added EXCLUDE_SKILL_DIRS array to exclude backups, tests, examples, planned-skills (1,388 non-skill files) — fixes inflated MASTER_INDEX.md count
- Fixed 62 broken path references: `rules/stacks/` → `docs/reference/stacks/`, `rules/tooling/` → `docs/reference/tooling/`, `rules/checklists/` → `docs/reference/checklists/` for moved files
- Updated `plugin.json` version from 2.3.0 to 2.9.2
- Updated version strings in 22 docs files from v2.6.0–v2.8.0 to v2.9.2
- Added `website/src/lib/data/scripts.ts` to update-counts.sh file list

### v2.9.1 (February 2026)

- Post-audit fixes: fixed malformed `.gitmodules`, added `ignore = all` to 45 submodules
- Removed stale `mojito-freeship` references from `.gitmodules` and submodule config
- Added 10 new marketplace repos: sickn33-antigravity, heilcheng, libukai, skillmatic, jayzeedesign, skillcreatorai-awesome, abubakarsiddik31, agentskills, skillcreatorai-agent-skills, francyjg

### v2.9.0 (February 2026)

- Marketplace audit: added 11 repos, removed 2 dead repos, optimized token loading
- All 101 marketplace submodules verified with `ignore = all` and `no_push`

### v2.8.0 (February 2026)

- P0 Bug Fix: Fixed invalid JSON in settings.json (trailing comma) causing auto-compact errors and hook failures since Opus 4.6
- Registered 2 hooks: pre-commit-counts.sh (PreToolUse), secret-scan.sh (PostToolUse); fixed secret-scan .md false positives
- Token optimization: removed "Auto-use tools" section from CLAUDE.md, consolidated 20 bash permissions into 2, streamlined start-task.md from 296 to 156 lines
- Dynamic operation: all resources now activate from prompt context alone, no slash commands required
- Replaced 8,849-line README with streamlined ~400-line version; archived original to `archive/README-original.md`

### v2.7.2 (February 2026)

- Website Audit: Fixed inflated marketplace count (EXCLUDE_SKILL_DIRS), stale hooks, stale repo counts, added on-demand rules scanning
- Fixed bash/Node.js marketplace count discrepancy (dot-directory exclusion in update-counts.sh)
- Added "always commit and push" rule to CLAUDE.md Workflow section

### v2.7.0 (February 2026)

- Agent Expansion: 12 new custom agents (47 → 60), covering Vue/Nuxt, Svelte, Django/FastAPI, Kotlin, technical writing, product management, DevSecOps, observability, migrations, API integration, CLI development, PWA
- Added game-developer to agents/README.md (file existed but was unlisted)
- Renamed "Business & Strategy" agent category to "Product & Strategy"

### v2.6.0 (February 2026)

- Comprehensive Platform Enhancement: 18 new marketplace repos (+16 net), 12 MCP servers, 3 hooks, 3 commands, 1 checklists, 3 templates
- Marketplace: 68 → 84 repos, 5,800+ → 7,400+ skills
- Removed 2 dead repos (claude-market, netresearch-marketplace)

### v2.5.0 (February 2026)

- Feature Enhancement from URL & Ecosystem Audit: mined REFERENCE-URLS.md and 5 research vectors
- 17 new skills across 3 tiers: domain gaps, Anthropic use-cases, ecosystem-wide needs
- Tier 1 (8 skills): ai-policy-generator, content-repurposer, financial-scenario-planner, course-material-creator, learning-gap-analyzer, impact-report-writer, process-flowchart-designer, debate-practice-coach
- Tier 2 (5 skills): fundraising-analyzer, statistics-verifier, volunteer-coordinator, research-presenter, options-comparator
- Tier 3 (4 skills): real-estate-analyzer, supply-chain-optimizer, event-planner, podcast-producer
- New skill categories: Education & Learning, Nonprofit & Impact, Analysis & Decisions, Industry & Domain
- Skills count: 102 → 119

### v2.4.0 (February 2026)

- Anthropic Use-Cases Audit: audited all 74 use-cases, identified gaps, built 13 new skills
- New skills: investment-memo-generator, battle-card-builder, customer-persona-builder, onboarding-guide-creator, newsletter-creator, status-report-generator, literature-review-planner, case-interview-practice, contract-redliner, grant-proposal-builder, travel-planner, career-path-planner, recipe-card-creator
- Created `docs/REFERENCE-URLS.md` with 80+ audited URLs
- Skills count: 89 → 102

### v2.3.8 (February 2026)

- Scripts showcase: new `/scripts` page, homepage category grid, navigation link
- Data layer: `scripts.ts` reads 19 scripts from `scripts/`, `scripts/hooks/`, and root level

### v2.3.7 (February 2026)

- Fixed prebuild script deleting 1,366 legitimate skill files (narrowed to broken axiom gitlink only)
- Re-cloned cpps from upstream, restoring marketplace skills from 2,500+ back to 5,800+
- Root cause: prebuild `rmSync` targeted entire `plugins/` instead of `plugins/skill-enhancers/axiom`

### v2.3.6 (February 2026)

- Complete submodule cleanup: removed ghost registration from `.gitmodules`, `.git/config`, `.git/modules/`
- Cross-repo count sync: rules 27→28, hooks health-check 7→8
- Synced counts to GitHub Profile README and Portfolio repo
- Pulled 101 marketplace repos with upstream updates (196 total commits)

### v2.3.5 (February 2026)

- Cloudflare Pages deploy fix: prebuild script removes broken nested submodule
- Dynamic website counts: footer, console, metadata now use `getCounts()` utility
- Added post-change documentation workflow rule

### v2.3.3 (February 2026)

- Documentation overhaul: added FAQ, Architecture Overview, Glossary
- Expanded hooks README with detailed per-hook documentation
- Added frontmatter metadata to all docs for website display
- Count reconciliation: skills 68→73, marketplace repos 67→72, marketplace skills 1,900+→5,800+
- Agent Teams integration with docs, skill, command, and auto-routing

### v2.3.1 (February 2026)

- Updated counts across documentation (101 marketplace repos, 7,400+ skills, 7 hooks)
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
