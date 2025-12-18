# Changelog

All notable changes to the Ultimate Claude Code Toolkit.

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
