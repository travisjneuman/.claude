# Ultimate Claude Code Toolkit

> A comprehensive Claude Code enhancement toolkit with **71 local skills**, **37 specialized agents**, **21 plugin marketplaces**, and complete development workflows for full-stack development across all platforms.

**Version:** 1.3.1 | **Last Updated:** December 2025

[![Claude Code](https://img.shields.io/badge/Claude-Code-6366f1)](https://claude.com/claude-code)
[![Skills](https://img.shields.io/badge/Skills-71+-10b981)](./skills/MASTER_INDEX.md)
[![Agents](https://img.shields.io/badge/Agents-37+-f59e0b)](./agents/README.md)
[![Marketplaces](https://img.shields.io/badge/Marketplaces-21-3b82f6)](./docs/MARKETPLACE-GUIDE.md)

---

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Configuration](#configuration)
- [Git Hooks](#git-hooks)
- [Claude Code Hooks](#claude-code-hooks)
- [MCP Servers](#mcp-servers)
- [Skills & Agents](#skills--agents)
- [Plugin Marketplaces](#plugin-marketplaces)
- [Workflow Patterns](#workflow-patterns)
- [Commands Reference](#commands-reference)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Resources](#resources)

---

## Overview

This toolkit transforms Claude Code into a comprehensive development environment with:

- **Universal Intelligent Router** - Automatically detects domains and loads relevant skills/agents
- **71 Local Skills** - Platform, creative, business, technical, and domain expertise
- **37 Specialized Agents** - Deep-dive experts for specific tasks
- **21 Plugin Marketplaces** - 550+ additional community skills and agents
- **GSD Project Management** - Multi-phase project tracking and execution
- **Persistent Memory** - Context continuity across sessions (claude-mem)
- **Research Integration** - Real-time web search for current information
- **Decision Frameworks** - Structured thinking for complex choices
- **Automation Hooks** - Git hooks and Claude Code lifecycle automation

### Philosophy

- **Token Efficiency** - CLAUDE.md is lean (~1,100 tokens); detailed content loads on-demand
- **Proactive Discovery** - Skills and resources auto-activate based on context
- **Workflow Flexibility** - Both `/start-task` routing and natural prompts work identically
- **Safety First** - Git hooks prevent secrets, enforce conventions, block dangerous operations

---

## Quick Start

### Starting Any Task

Just describe what you want:

```
Build a login form with validation
Fix the API timeout issue
Review my authentication code
```

Or use the explicit router:

```
/start-task Build an iOS app with SwiftUI
```

**The system automatically:**
1. Loads CLAUDE.md context
2. Detects domain(s) from your description
3. Activates appropriate skills
4. Routes to optimal workflow (GSD/Planning/Direct)

### Quick Examples

| You Say | System Loads |
|---------|--------------|
| "Build an iOS app with SwiftUI" | ios-development skill, ios-developer agent, GSD |
| "Analyze this protein sequence" | claude-scientific-skills (bioinformatics) |
| "What's new in React 19?" | WebSearch + react-expert agent |
| "Should I use Redux or Zustand?" | first-principles decision framework |
| "Create a pricing strategy" | monetization-strategy skill |
| "Debug why tests are failing" | debug-like-expert skill |

---

## Installation

### Prerequisites

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed
- Git (for submodules)
- Node.js (for Prettier hooks)

### Fresh Install

```bash
# Backup existing config if needed
mv ~/.claude ~/.claude-backup

# Clone this repository
git clone https://github.com/travisjneuman/.claude.git ~/.claude

# Initialize all marketplace submodules
cd ~/.claude
git submodule update --init --recursive

# Install git hooks
bash scripts/setup-hooks.sh

# Verify installation
claude --version
```

### Update Existing Installation

```bash
cd ~/.claude

# Pull latest changes
git pull origin master

# Update all marketplace submodules
git submodule update --remote --merge

# Or use the update script
bash scripts/update-external-repos.sh
```

### Verify Installation

```bash
# Start Claude Code
claude

# Test the router
/start-task Create a simple todo app
```

---

## Features

### Universal Intelligent Router

The `/start-task` command (or just natural prompts) detects and routes across:

| Category | Domains |
|----------|---------|
| **Development** | iOS, Android, React, Vue, Svelte, Backend, Database, DevOps, Testing, Security, GraphQL, Microservices, AI/ML, Desktop, PWA, Flutter, React Native |
| **Scientific** | Bioinformatics, Chemistry, Proteomics, Clinical, Physics, Astronomy, Materials Science, Lab Automation |
| **Business** | Startup, Finance, Marketing, Sales, Product, Strategy, Operations, HR, Leadership, Legal, Risk, Innovation, Sustainability |
| **Creative** | Graphic Design, Video, Audio, Brand Identity, Motion Design, UI/UX |
| **Decision** | 5-Whys, Eisenhower Matrix, First Principles, Second-Order Thinking, SWOT, Pros/Cons |

### Complexity-Based Routing

| Complexity Score | Workflow |
|------------------|----------|
| >= 3 | GSD (multi-phase project) |
| 1-2 | EnterPlanMode (planning first) |
| <= 0 | Direct execution |

### Persistent Memory (claude-mem)

- Key decisions remembered across sessions
- Architectural choices preserved
- Project state maintained
- Semantic search for relevant past context

### Research Integration

Automatically triggered for:
- "latest", "current", "new in 2025"
- Best practices queries
- Version-specific documentation
- Library discovery

---

## Directory Structure

```
~/.claude/
├── CLAUDE.md                    # Core constitution (always loaded, ~1,100 tokens)
├── README.md                    # This file
├── CHANGELOG.md                 # Version history
├── CONTRIBUTING.md              # Contribution guidelines
├── plugin.json                  # Plugin manifest for marketplace
├── settings.json                # Claude Code settings & permissions
│
├── skills/                      # Domain expertise (71 skills)
│   ├── MASTER_INDEX.md          # Full skill navigation and catalog
│   ├── README.md                # Skills documentation
│   ├── EXPERT-SKILLS-GUIDE.md   # Domain expert skills reference
│   ├── core-workflow/           # Session protocols, git, testing
│   ├── ios-development/         # Platform skills
│   ├── android-development/
│   ├── vue-development/         # Framework skills
│   ├── svelte-development/
│   ├── generic-react-*/         # Stack-specific patterns (4 variants)
│   ├── generic-fullstack-*/     # Full-stack patterns (4 variants)
│   ├── generic-static-*/        # Static site patterns (4 variants)
│   └── [domain]/SKILL.md        # Individual skill files
│
├── agents/                      # Specialized AI agents (37 agents)
│   ├── README.md                # Agent documentation
│   ├── ios-developer.md         # Platform agents
│   ├── android-developer.md
│   ├── security-auditor.md      # Code quality agents
│   ├── deep-code-reviewer.md
│   └── *.md                     # Individual agent definitions
│
├── commands/                    # Custom slash commands
│   ├── start-task.md            # Universal router (v3.0)
│   ├── list-skills.md           # Skill browser
│   ├── skill-finder.md          # Problem-to-skill matcher
│   ├── discover-skills.md       # skillsmp.com search
│   └── router/                  # Domain routing files
│       ├── domains-development.md
│       ├── domains-scientific.md
│       ├── domains-business.md
│       ├── domains-creative.md
│       ├── domains-meta.md
│       ├── decision-frameworks.md
│       └── routing-logic.md
│
├── rules/                       # Contextual guidelines
│   ├── README.md                # Rules index
│   ├── checklists/              # Task-type checklists
│   │   ├── ui-visual-changes.md
│   │   ├── automation-scripts.md
│   │   └── static-sites.md
│   ├── stacks/                  # Technology-specific rules
│   │   ├── react-typescript.md
│   │   ├── fullstack-nextjs-nestjs.md
│   │   └── python.md
│   └── tooling/                 # Tool setup guides
│       ├── git-hooks-setup.md
│       ├── mcp-servers.md
│       ├── external-repos.md
│       └── troubleshooting.md
│
├── docs/                        # Extended documentation
│   ├── WORKFLOW-GUIDE.md        # Workflow patterns and routing
│   ├── MARKETPLACE-GUIDE.md     # Full marketplace reference
│   ├── GSD-TUTORIAL.md          # GSD system guide
│   └── DOMAIN-ROUTING.md        # How routing works
│
├── plugins/                     # Plugin system
│   ├── local/                   # Custom local plugins
│   └── marketplaces/            # 21 marketplace submodules (read-only)
│       ├── anthropic-agent-skills/
│       ├── claude-code-plugins/
│       ├── taches-cc-resources/
│       ├── get-shit-done/
│       ├── claude-scientific-skills/
│       └── ... (16 more)
│
├── scripts/                     # Utility scripts
│   ├── setup-hooks.sh           # Install git hooks
│   ├── update-external-repos.sh # Update marketplace submodules
│   └── hooks/                   # Trackable hook scripts
│       ├── pre-commit.sh
│       ├── commit-msg.sh
│       └── pre-push.sh
│
├── templates/                   # Project templates
│   └── task-template.md         # Task file template
│
├── vscode/                      # VS Code global settings
│   ├── settings.json
│   └── setup-vscode-settings.ps1
│
├── .archive/                    # Archived files
│   └── claude-md-versions/      # Previous CLAUDE.md versions
│
└── .planning/                   # GSD project files (gitignored)
    ├── PROJECT.md
    ├── ROADMAP.md
    ├── STATE.md
    └── phases/
```

---

## Configuration

### settings.json

Main Claude Code configuration with:

```json
{
  "permissions": {
    "allow": [
      "SlashCommand(/gsd:*)",
      "SlashCommand(/taches-cc-resources:*)",
      "Bash(git *:*)",
      "Bash(npm *:*)",
      "Skill(debug-like-expert)",
      "WebSearch",
      "WebFetch(domain:docs.anthropic.com)",
      // ... 60+ permission rules
    ],
    "defaultMode": "bypassPermissions"
  },
  "hooks": {
    "Stop": [...],
    "PreToolUse": [...],
    "PostToolUse": [...]
  },
  "enableAllProjectMcpServers": false,
  "disabledMcpjsonServers": [
    "sequential-thinking",
    "playwright",
    "memory",
    // ... all disabled by default
  ],
  "enabledPlugins": {...},
  "alwaysThinkingEnabled": true
}
```

### .mcp.json

MCP server definitions (all disabled by default for token efficiency):

```json
{
  "mcpServers": {
    "sequential-thinking": {...},
    "playwright": {...},
    "memory": {...},
    "filesystem": {...},
    "sqlite": {...},
    "chrome-devtools": {...},
    "puppeteer": {...}
  }
}
```

### CLAUDE.md

Core constitution file (~1,100 tokens) containing:
- Identity & Role
- P0 Non-Negotiables (Data Integrity, Security, Coherence)
- Workflow patterns
- Anti-patterns to avoid
- Tool policies
- Git safety rules

---

## Git Hooks

Three git hooks enforce workflow compliance:

### Pre-Commit Hook

**Location:** `.git/hooks/pre-commit` (installed via `scripts/setup-hooks.sh`)

| Check | Action |
|-------|--------|
| Secret Detection | BLOCKS if API keys, passwords, tokens found |
| CHANGELOG Reminder | WARNS if significant changes without CHANGELOG update |
| SKILL.md Validation | WARNS if skill files missing headers |
| Gitignore Enforcement | BLOCKS if trying to commit ignored files |

### Commit-Msg Hook

**Location:** `.git/hooks/commit-msg`

Enforces conventional commit format:

```
feat: add new feature
fix: fix bug
docs: update documentation
chore: maintenance
style: formatting
refactor: code restructuring
perf: performance improvement
test: add tests
build: build system
ci: CI/CD changes
```

### Pre-Push Hook

**Location:** `.git/hooks/pre-push`

| Check | Action |
|-------|--------|
| Force-Push Protection | BLOCKS force push to master/main |
| Remote Validation | WARNS if pushing to unexpected remote |
| Submodule Awareness | Notes marketplace submodule changes |

### Installing Hooks

```bash
cd ~/.claude
bash scripts/setup-hooks.sh
```

### Bypass (Emergency Only)

```bash
git commit --no-verify -m "hotfix: critical fix"
git push --no-verify
```

---

## Claude Code Hooks

Lifecycle hooks in `settings.json`:

### Stop Hook (Windows Notification)

Sends Windows toast notification when Claude completes and awaits input:

```json
{
  "Stop": [{
    "hooks": [{
      "type": "command",
      "command": "powershell -Command \"[Windows.UI.Notifications...]\"",
      "statusMessage": "Sending notification"
    }]
  }]
}
```

### PreToolUse Hook (Safety)

Blocks dangerous commands:

```json
{
  "PreToolUse": [{
    "matcher": "Bash",
    "hooks": [{
      "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -qE '(rm -rf /|format c:)'; then exit 2; fi"
    }]
  }]
}
```

### PostToolUse Hook (Formatting)

Auto-runs Prettier on Write and Edit operations:

```json
{
  "PostToolUse": [
    {"matcher": "Write", "hooks": [{"command": "npx prettier --write \"$CLAUDE_FILE_PATH\""}]},
    {"matcher": "Edit", "hooks": [{"command": "npx prettier --write \"$CLAUDE_FILE_PATH\""}]}
  ]
}
```

---

## MCP Servers

Model Context Protocol servers are **disabled by default** to save ~6,000+ tokens.

### Available Servers

| Server | Purpose | Token Cost |
|--------|---------|------------|
| `sequential-thinking` | Structured reasoning chains | ~500 |
| `playwright` | Browser testing/automation | ~2000 |
| `memory` | Persistent knowledge base | ~800 |
| `filesystem` | Enhanced file operations | ~1500 |
| `sqlite` | Database operations | ~1000 |
| `chrome-devtools` | Browser debugging | ~500 |
| `puppeteer` | Browser automation | ~1500 |

### Usage

```bash
# View status
/mcp

# Enable for a task
/mcp enable playwright

# Disable after use (important!)
/mcp disable playwright
```

### Best Practice

Enable only when needed, disable immediately after use.

---

## Skills & Agents

### 71 Local Skills

| Category | Skills |
|----------|--------|
| **Foundation** | core-workflow (auto-loads for complex tasks) |
| **Generic (Any Stack)** | generic-code-reviewer, generic-design-system, generic-feature-developer, generic-ux-designer |
| **Stack-Specific** | generic-react-*, generic-fullstack-*, generic-static-* (12 variants) |
| **Frameworks** | vue-development, svelte-development |
| **Platform** | ios-development, android-development, react-native, flutter-development, electron-desktop, pwa-development, macos-native, game-development |
| **Architecture** | api-design, graphql-expert, microservices-architecture, websockets-realtime, i18n-localization |
| **Infrastructure** | devops-cloud, database-expert, ai-ml-development, security |
| **Creative** | ui-research, frontend-enhancer, graphic-design, video-production, audio-production, brand-identity, ui-animation |
| **Business** | startup-launch, monetization-strategy, business-strategy, finance, marketing, sales, product-management |
| **Domain Expertise** | 16 expert skills (leadership, hr-talent, operations, etc.) |
| **Workflow** | debug-systematic, tdd-workflow |
| **Utilities** | codebase-documenter, tech-debt-analyzer, test-specialist, seo-analytics-auditor, document-skills |

### 37 Specialized Agents

| Category | Agents |
|----------|--------|
| **Code Quality** | deep-code-reviewer, security-auditor, refactoring-specialist, performance-optimizer |
| **Platform** | ios-developer, android-developer, mobile-architect, desktop-developer, macos-developer |
| **Creative** | graphic-designer, video-producer, audio-engineer, brand-strategist, motion-designer |
| **Architecture** | graphql-architect, microservices-architect, realtime-specialist, database-architect |
| **Specialized** | typescript-expert, python-expert, react-expert, debugging-specialist, test-generator |
| **Business** | startup-advisor, monetization-expert |
| **Documentation** | documentation-writer, code-explainer, accessibility-expert |

### Invocation

```
# Skills (auto-load based on context, or explicit)
Skill(debug-like-expert)
Skill(ios-development)

# Agents (via Task tool)
Use the security-auditor agent to review this code
Use the ios-developer agent to implement notifications
```

---

## Plugin Marketplaces

21 marketplace repositories as git submodules (read-only):

### Official (Anthropic)

| Marketplace | Contents |
|-------------|----------|
| `anthropic-agent-skills` | Document skills, example skills |
| `claude-code-plugins` | PR review, commit commands, feature dev |
| `claude-plugins-official` | External plugins collection |

### Core Workflow

| Marketplace | Contents |
|-------------|----------|
| `taches-cc-resources` | Meta-prompting, debugging, hooks, agents |
| `get-shit-done` | GSD multi-phase project management |

### Large Collections

| Marketplace | Contents |
|-------------|----------|
| `claude-code-plugins-plus-skills` | 258 plugins, 185 skills |
| `wshobson-agents` | 99 agents, 107 skills, 15 orchestrators |
| `voltagent-subagents` | 100+ specialized agents |
| `claude-scientific-skills` | 125+ scientific skills |

### Discovery

Search 35,530+ community skills:

```
/discover-skills react hooks
/discover-skills database optimization
```

Full marketplace reference: [docs/MARKETPLACE-GUIDE.md](./docs/MARKETPLACE-GUIDE.md)

---

## Workflow Patterns

### Standard Prompts

Just describe what you want naturally:

```
Build a login form with validation
Fix the API timeout issue
Review my authentication code
```

### /start-task Router

Explicit routing with complexity analysis:

```
/start-task Build an iOS app with SwiftUI
/start-task Set up CI/CD with testing
```

### GSD for Multi-Phase Projects

```
/gsd:new-project     # Initialize project
/gsd:progress        # Check status, get next action
/gsd:plan-phase 1    # Plan phase execution
/gsd:execute-plan    # Work through plan
/gsd:resume-work     # Resume with context
```

### Decision Frameworks

```
/consider:first-principles   # Break to fundamentals
/consider:5-whys             # Root cause analysis
/consider:eisenhower-matrix  # Priority by urgency
/consider:pros-cons          # Trade-off evaluation
/consider:swot               # Strategic analysis
```

Full workflow guide: [docs/WORKFLOW-GUIDE.md](./docs/WORKFLOW-GUIDE.md)

---

## Commands Reference

### Task Management

| Command | Purpose |
|---------|---------|
| `/start-task [description]` | Start any task with intelligent routing |
| `/gsd:new-project` | Initialize multi-phase project |
| `/gsd:progress` | Check status, route to next action |
| `/gsd:plan-phase [n]` | Create phase execution plan |
| `/gsd:execute-plan` | Execute current plan |
| `/gsd:resume-work` | Resume with context restoration |

### Skills & Discovery

| Command | Purpose |
|---------|---------|
| `/list-skills [domain]` | Browse available skills |
| `/skill-finder [problem]` | Find skill for problem |
| `/discover-skills [query]` | Search skillsmp.com |

### Code & Git

| Command | Purpose |
|---------|---------|
| `/commit-commands:commit` | Create commit with message |
| `/commit-commands:commit-push-pr` | Commit, push, and create PR |
| `/code-review:code-review` | Review code for issues |

### Meta & Creation

| Command | Purpose |
|---------|---------|
| `/taches-cc-resources:create-agent-skill` | Create new skill |
| `/taches-cc-resources:create-hook` | Create automation hook |
| `/taches-cc-resources:create-slash-command` | Create command |
| `/taches-cc-resources:create-subagent` | Create agent |
| `/taches-cc-resources:check-todos` | Review outstanding work |
| `/taches-cc-resources:whats-next` | Get next step suggestion |

### Decision Making

| Command | Purpose |
|---------|---------|
| `/consider:first-principles` | First-principles analysis |
| `/consider:5-whys` | Root cause analysis |
| `/consider:eisenhower-matrix` | Priority matrix |
| `/consider:pros-cons` | Trade-off evaluation |
| `/consider:swot` | SWOT analysis |
| `/consider:decision-matrix` | Multi-criteria decision |

---

## Customization

### Adding Skills

Create `skills/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: When to use this skill
---

# My Skill

## Overview
[What this skill does]

## Patterns
[Specific patterns to follow]

## Examples
[Code examples]
```

### Adding Agents

Create `agents/my-agent.md`:

```yaml
---
name: my-agent
description: Agent purpose and when to use
model: sonnet
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# My Agent

## Role
[Agent role and expertise]

## Guidelines
[How the agent should behave]
```

### Adding Commands

Create `commands/my-command.md`:

```markdown
---
description: What this command does
arguments:
  - name: arg1
    description: Argument description
    required: true
---

# My Command

[Command instructions for Claude]
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Skills not loading | Check CLAUDE.md exists, run `/list-skills` |
| Marketplace not found | Run `git submodule update --init` |
| Hooks not running | Run `bash scripts/setup-hooks.sh` |
| MCP server fails | Check `.mcp.json` configuration |
| Permission denied | Check `settings.json` allow list |

### Git Hook Issues

```bash
# Check hook is executable
ls -la .git/hooks/pre-commit

# Reinstall hooks
bash scripts/setup-hooks.sh

# Check for line ending issues (Windows)
dos2unix .git/hooks/pre-commit
```

### Context Limits

```bash
# Clear context
/clear

# Compact context
/compact

# Check context usage
/context
```

Full troubleshooting: [rules/tooling/troubleshooting.md](./rules/tooling/troubleshooting.md)

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on:

- Adding skills
- Adding agents
- Adding commands
- Submitting pull requests
- Code style

---

## Resources

### Official Documentation

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [MCP Protocol](https://modelcontextprotocol.io)
- [Claude Code Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
- [Claude Code Subagents](https://code.claude.com/docs/en/sub-agents)

### Internal Documentation

- [Skills Catalog](./skills/MASTER_INDEX.md)
- [Agents Catalog](./agents/README.md)
- [Workflow Guide](./docs/WORKFLOW-GUIDE.md)
- [Marketplace Guide](./docs/MARKETPLACE-GUIDE.md)
- [GSD Tutorial](./docs/GSD-TUTORIAL.md)

### Community Resources

- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [skillsmp.com](https://skillsmp.com/) - 35,530+ community skills
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.3.1 | Dec 2025 | Git hooks, lifecycle hooks, .gitignore cleanup |
| 1.3.0 | Dec 2025 | CLAUDE.md refactor (45% reduction), satellite guides |
| 1.2.0 | Dec 2025 | 6 new marketplaces, GSD tutorial, discover-skills |
| 1.1.0 | Dec 2025 | 5 new skills, 5 new agents, GSD integration |
| 1.0.0 | Dec 2025 | Initial release: 60+ skills, 30+ agents |

See [CHANGELOG.md](./CHANGELOG.md) for full history.

---

## License

MIT License - Use, modify, and distribute freely.

---

<div align="center">

**Ultimate Claude Code Toolkit**

*71 skills | 37 agents | 21 marketplaces | Comprehensive automation*

</div>
