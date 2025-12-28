# Changelog

All notable changes to the Ultimate Claude Code Toolkit.

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
