# Changelog

All notable changes to the Ultimate Claude Code Toolkit.

## [1.4.2] - December 30, 2025

### Added

#### Verification Workflow (KERNEL-Inspired)
Based on research into prompt engineering best practices:
- **`rules/checklists/verification-template.md`** - Reusable verification checklist based on KERNEL "Easy to verify" principle
- **Step 7 (Verify)** added to `/start-task` router between Execute and Memory Save
- **"Task completion"** trigger added to CLAUDE.md "Load When Relevant" table

#### Superpowers Plugin
- Installed `superpowers@obra-superpowers` for TDD and git worktree workflows
- Adds RED-GREEN-REFACTOR enforcement, systematic debugging, design-first skills

### Changed

#### Documentation Updates
- **CLAUDE.md** - "Anti-Patterns" renamed to "DO NOT (Hard Constraints)" with explicit `**DO NOT**` prefixes
- **CLAUDE.md** - Skill counts updated (1,328 → 1,496 marketplace skills, 37 → 36 agents)
- **external-repos.md** - Complete list of all 21 marketplaces (was 9)
- **All 21 marketplaces** - Synced to latest upstream commits

#### Skill Count Update
- Marketplace skills: 1,328 → **1,496** (+168 new skills from upstream syncs)
- Largest contributor: `claude-code-plugins-plus-skills` (+2,947 files)

### Notes
- Research documented in `plans/snuggly-brewing-alpaca.md`
- Key finding: Explicit constraints reduce unwanted outputs by 91%
- Duplicate `superpowers-marketplace` removed (now uses `obra-superpowers` submodule)

---

## [1.4.1] - December 2025

### Changed

#### Cross-Platform Compatibility Overhaul
Complete cross-platform support for Windows, macOS, and Linux:

- **Stop hook** - Now OS-aware: PowerShell notifications (Windows), osascript (macOS), notify-send (Linux)
- **All hooks** - Use POSIX-compatible bash syntax that works in Git Bash on Windows
- **All commands** - Added Platform Compatibility sections with OS-specific notes
- **All scripts** - Verified to work in Git Bash (Windows), bash (macOS/Linux)
- **Python commands** - Updated to show both `python` (Windows) and `python3` (macOS/Linux) options

#### Documentation Updates
- **README.md** - Added comprehensive "Platform Compatibility" section with:
  - Platform requirements table (Windows 10/11, macOS, Linux)
  - Detailed OS-specific setup notes (collapsible sections)
  - Cross-platform command reference table
- **Updated TOC** - Added Platform Compatibility link
- **Commands** - Each command now includes Platform Compatibility table
- **Skills** - Updated `generic-static-*` skills with cross-platform local server commands
- **Checklists** - Updated `static-sites.md` with cross-platform python options
- **Bumped version** - 1.4.0 → 1.4.1

### Verified Cross-Platform
- **Git hooks** (`scripts/hooks/`) - All use POSIX bash, work on all platforms
- **Shell scripts** - All use `#!/bin/bash` shebang, work in Git Bash
- **MCP config** - `.mcp.json` not tracked (in .gitignore), templates in docs for each OS
- **Templates** - All markdown, no OS-specific code

### Notes
- Windows users need Git for Windows (provides Git Bash)
- macOS notifications use native `osascript`
- Linux notifications use `notify-send` (optional, graceful fallback)
- All toolkit scripts use POSIX bash, not PowerShell directly
- MCP server config must be created per-machine using templates in `docs/MCP-SERVERS.md`

---

## [1.4.0] - December 2025

### Added

#### New Templates (5 total)
Comprehensive templates for creating toolkit components:
- **skill-template.md** - Complete guide for creating new skills
- **agent-template.md** - Template for subagent definitions
- **command-template.md** - Slash command creation guide
- **plugin-template/** - Full plugin scaffolding with plugin.json, commands, agents, skills
- **project-CLAUDE.md** - Per-project CLAUDE.md starter template

#### New Utility Commands (5 total)
- **`/review-code [target]`** - Comprehensive code review workflow with stack detection
- **`/health-check [verbose]`** - System diagnostics for toolkit configuration
- **`/context-stats`** - Token usage report with optimization recommendations
- **`/session-log [action]`** - View and analyze session log (view/tail/clear/stats)
- **`/backup-config [action]`** - Backup and restore configuration files

#### MCP Wildcard Permissions
New granular MCP tool permissions using wildcard syntax:
- `mcp__memory__*` - All memory tools auto-allowed
- `mcp__filesystem__read_file` - Read-only filesystem access
- `mcp__sqlite__read_query` - Read-only database queries
- `mcp__sequential-thinking__*` - All reasoning tools
- `mcp__filesystem__write_file` - Explicitly denied for safety

### Changed

#### Documentation
- **Updated README.md** - Added Templates section with quick start guide
- **Updated README.md** - Added Utility & Diagnostics command section
- **Updated README.md** - Table of contents includes new sections
- **Bumped version** - 1.3.3 → 1.4.0 across all files

### Notes
- Templates reduce boilerplate when creating new components
- Utility commands provide essential toolkit management
- MCP permissions follow least-privilege principle (read allowed, write denied)
- Total command count: 10 (5 existing + 5 new)
- Total template count: 6 (1 existing + 5 new)

---

## [1.3.3] - December 2025

### Added

#### Complete Hook Implementation (10/10 Hooks)
All 10 available Claude Code lifecycle hooks are now implemented:
- **SessionEnd hook** - Logs session termination with timestamp and separator
- **PreCompact hook** - Logs context compaction events for checkpoint tracking
- **UserPromptSubmit hook** - Logs user prompts (first 100 chars) for session history
- **PermissionRequest hook** - Logs tool permission requests for audit trail
- **SubagentStop hook** - Logs subagent completion events

### Changed

#### Documentation Updates
- **Updated README.md** - All hooks now marked as implemented with descriptions
- **Updated README.md** - Added documentation sections for all 5 new hooks

### Notes
- All hooks write to `~/.claude/.session-log` for unified session tracking
- Hooks use bash for cross-platform compatibility (Git Bash on Windows)
- Session log provides complete audit trail of Claude Code interactions

---

## [1.3.2] - December 2025

### Added

#### New Claude Code Lifecycle Hooks
- **SessionStart hook** - Displays toolkit status on session start (71 skills, 37 agents, 21 marketplaces)
- **Notification hook** - Logs system notifications to ~/.claude/.session-log for debugging

#### New Stack Guides
- **rules/stacks/go.md** - Comprehensive Go project patterns (modules, testing, concurrency, error handling)
- **rules/stacks/rust.md** - Comprehensive Rust project patterns (ownership, lifetimes, async, cargo)

### Changed

#### Documentation Overhaul
- **Corrected marketplace skill count** - Updated from "550+" to "1,328+" across all documentation
- **Updated CLAUDE.md** - Added Go and Rust to "Load When Relevant" triggers
- **Updated agents/README.md** - Added parallel execution documentation (max 10 concurrent, 200k context each)
- **Updated skills/MASTER_INDEX.md** - Corrected skill counts (71 local + 1,328 marketplace)
- **Updated docs/MARKETPLACE-GUIDE.md** - Corrected skill counts
- **Updated docs/WORKFLOW-GUIDE.md** - Added automation hooks section
- **Updated README.md** - Version bump, hook documentation, stack guide additions

#### Strategic Analysis Findings (Documented)
- **Skills overlap analysis** - 70% of local skills are UNIQUE with no marketplace equivalent
- **Agent capabilities** - Confirmed parallel execution (up to 10), single-level nesting only
- **Python NOT required** - All hooks use bash, hookify plugin disabled

### Notes
- 5 of 10 hook events implemented in this version (see v1.3.3 for complete implementation)
- No changes to skills or agents - current counts provide comprehensive coverage
- Marketplace submodule architecture fully prepared for expansion

---

## [1.3.1] - December 2025

### Added

#### Git Hooks (Workflow Automation)
- **pre-commit hook** - Secret detection, CHANGELOG reminder, SKILL.md validation, gitignore enforcement
- **commit-msg hook** - Conventional commit format validation (feat|fix|docs|chore|...)
- **pre-push hook** - Force-push protection, remote validation, submodule awareness

#### Claude Code Lifecycle Hooks
- **Stop hook** - Windows toast notification when Claude awaits input
- **PreToolUse hook** - Dangerous command blocking (rm -rf /, format c:, etc.)
- **PostToolUse hook** - Prettier auto-formatting on Edit operations (added to existing Write)

### Changed

#### .gitignore Cleanup
- Removed 6 redundant marketplace entries
- Fixed duplicate entries (*.code-workspace, *~)
- Moved misplaced entries to proper sections
- Fixed header accuracy (.planning/ removed from tracked list)

#### Organization
- Moved CLAUDE.md backup to `.archive/claude-md-versions/`
- Removed ephemeral shell-snapshots from tracking

### Notes
- hookify plugin remains disabled (uses `python3` incompatible with Windows)
- Native hooks in settings.json replicate hookify functionality

---

## [1.3.0] - December 2025

### Changed

#### Architecture Refactoring (Token Optimization)
- **CLAUDE.md trimmed** from 355 to 194 lines (45% reduction)
- **Token savings** of ~1,400 tokens per session (56% reduction)
- Follows Anthropic's recommendation: "concise guardrails and pointers"

#### New Satellite Guides
- `docs/WORKFLOW-GUIDE.md` - Detailed workflow patterns, prompt types, discovery
- `docs/MARKETPLACE-GUIDE.md` - Complete marketplace reference (21 repos)

#### CLAUDE.md Restructure
- Kept essential guardrails (Identity, P0s, Workflow, Safety)
- Expanded "Load When Relevant" triggers (14 context-based file loads)
- Added "Skill Discovery" section with search commands
- Moved detailed content to satellite files for on-demand loading

#### Philosophy
- CLAUDE.md = essential guardrails (always loaded, ~1,100 tokens)
- Satellites = detailed patterns (loaded on-demand when context matches)
- Discovery triggers ensure right content loads automatically

---

## [1.2.0] - December 2025

### Added

#### New Marketplaces (6)
- `travisvn-awesome-claude-skills` - Curated skills list
- `hesreallyhim-awesome-claude-code` - Slash commands and CLI tools
- `alirezarezvani-claude-skills` - Skills and subagents collection
- `behisecc-awesome-claude-skills` - Categorized skills
- `alvinunreal-awesome-claude` - Broader Claude resources
- `voltagent-awesome-claude-skills` - VoltAgent skills collection

#### New Documentation
- `docs/GSD-TUTORIAL.md` - Comprehensive GSD usage guide
- `docs/DOMAIN-ROUTING.md` - How /start-task routes requests to skills/agents

#### New Commands
- `/discover-skills` - Search skillsmp.com API for community skills

### Changed

#### Workflow Enhancement
- Added "Always Available" section to CLAUDE.md clarifying tools/skills/agents are never blocked by GSD
- Added "GSD + Tools Integration" section explaining how to use capabilities within GSD phases
- Updated Quick Start Commands with research and agent invocation examples

#### Documentation Accuracy
- Fixed marketplace count: 15 → 21
- Verified skill count: 67 local skills
- Verified agent count: 36 local agents
- Added "Last Updated" dates to 7 documentation files
- Cross-linked MCP documentation (docs and rules/tooling)

#### Infrastructure
- Converted 6 manual clones to proper git submodules
- Added 6 new marketplace repositories as submodules
- All 21 marketplaces now tracked with no_push configuration

---

## [1.1.0] - December 2025

### Added

#### New Skills (5)
- `devops-cloud` - AWS, GCP, Azure, Kubernetes, Terraform, CI/CD
- `ai-ml-development` - PyTorch, TensorFlow, LLM integration, MLOps
- `game-development` - Unity, Unreal Engine, Godot
- `macos-native` - AppKit, Catalyst, macOS system integration
- `database-expert` - PostgreSQL, MongoDB, Redis advanced patterns

#### New Agents (5)
- `devops-engineer` - Cloud infrastructure and CI/CD specialist
- `ml-engineer` - Machine learning and LLM integration
- `game-developer` - Game engine development
- `macos-developer` - Native macOS development
- `database-architect` - Schema design and query optimization

#### GSD Integration
- Installed [Get Shit Done](https://github.com/glittercowboy/get-shit-done) v1.3.5
- Added GSD section to CLAUDE.md
- Updated `/start-task` command with GSD routing
- Full `/gsd:*` command suite available

#### Documentation
- Added CHANGELOG.md (this file)
- Added CONTRIBUTING.md
- Updated all README files with cross-references
- Updated MASTER_INDEX.md with new skills and agents

### Changed
- Enhanced Skills & Agents section in CLAUDE.md with Quick Trigger Guide
- Updated `/start-task` with Requirements section referencing CLAUDE.md

---

## [1.0.0] - December 2025

### Initial Release

#### Skills (60+)
- **Platform Development**: iOS, Android, React Native, Flutter, Electron, PWA
- **Creative**: Graphic design, video, audio, branding, UI animation
- **Business**: Startup launch, monetization, marketing, sales, finance
- **Technical**: GraphQL, microservices, i18n, WebSockets
- **Domain Expert**: 16 business domain skills
- **Stack-Specific**: Static, React, Full-stack variants
- **Utilities**: Testing, debugging, documentation, SEO

#### Agents (30+)
- Code quality: deep-code-reviewer, security-auditor, refactoring-specialist
- Development: test-generator, api-designer, database-expert
- Architecture: architecture-analyst, graphql-architect, microservices-architect
- Platform: ios-developer, android-developer, mobile-architect, desktop-developer
- Creative: graphic-designer, video-producer, audio-engineer, brand-strategist
- Business: startup-advisor, monetization-expert
- Support: documentation-writer, code-explainer, accessibility-expert

#### Rules & Checklists
- UI/Visual changes checklist
- Automation scripts checklist
- Static sites checklist
- Stack-specific guides (React, Python, Full-stack)
- Git hooks setup guide
- Troubleshooting guide

#### Core Configuration
- CLAUDE.md global constitution
- plugin.json for marketplace distribution
- Comprehensive README with installation guide

---

## Version Format

This project uses [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes to skill/agent interfaces
- MINOR: New skills, agents, or features
- PATCH: Bug fixes, documentation updates

---

## Upgrade Guide

### From 1.0.0 to 1.1.0

No breaking changes. To get new features:

```bash
# If using git
cd ~/.claude && git pull

# If manual install
# Download and copy new skill/agent folders
```

To enable GSD:
```bash
npx get-shit-done-cc
# Select 1 for global install
```
