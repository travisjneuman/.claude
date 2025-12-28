# Ultimate Claude Code Toolkit

> **The most comprehensive Claude Code enhancement system available** - A complete development environment with **71 local skills**, **37 specialized agents**, **21 plugin marketplaces** (1,328+ additional skills), intelligent task routing, multi-phase project management, and full automation for professional software development.

**Version:** 1.3.2 | **Last Updated:** December 2025 | **Author:** Travis Neuman

[![Claude Code](https://img.shields.io/badge/Claude-Code-6366f1)](https://claude.com/claude-code)
[![Skills](https://img.shields.io/badge/Skills-71+-10b981)](./skills/MASTER_INDEX.md)
[![Agents](https://img.shields.io/badge/Agents-37+-f59e0b)](./agents/README.md)
[![Marketplaces](https://img.shields.io/badge/Marketplaces-21-3b82f6)](./docs/MARKETPLACE-GUIDE.md)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

---

## Table of Contents

- [Executive Summary](#executive-summary)
- [What Problem Does This Solve?](#what-problem-does-this-solve)
- [Who Is This For?](#who-is-this-for)
- [Key Features at a Glance](#key-features-at-a-glance)
- [Quick Start Guide](#quick-start-guide)
- [Installation](#installation)
- [Architecture Overview](#architecture-overview)
- [How It Works](#how-it-works)
- [Complete Directory Structure](#complete-directory-structure)
- [Configuration Reference](#configuration-reference)
- [Complete Skills Reference (71 Skills)](#complete-skills-reference-71-skills)
- [Complete Agents Reference (37 Agents)](#complete-agents-reference-37-agents)
- [Complete Marketplaces Reference (21 Marketplaces)](#complete-marketplaces-reference-21-marketplaces)
- [Git Hooks System](#git-hooks-system)
- [Claude Code Lifecycle Hooks](#claude-code-lifecycle-hooks)
- [MCP Servers](#mcp-servers)
- [Workflow Patterns](#workflow-patterns)
- [The Universal Router (start-task)](#the-universal-router-start-task)
- [GSD Project Management System](#gsd-project-management-system)
- [Decision Frameworks](#decision-frameworks)
- [Complete Commands Reference](#complete-commands-reference)
- [Customization Guide](#customization-guide)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Glossary of Terms](#glossary-of-terms)
- [Contributing](#contributing)
- [Version History](#version-history)
- [Resources & Links](#resources--links)
- [License](#license)

---

## Executive Summary

The **Ultimate Claude Code Toolkit** transforms Claude Code from a capable AI coding assistant into a comprehensive, enterprise-grade development environment. This is a complete configuration system for `~/.claude/` that provides:

### What You Get

| Component | Count | Description |
|-----------|-------|-------------|
| **Skills** | 71 | Domain expertise modules covering iOS, Android, React, Vue, Svelte, DevOps, AI/ML, scientific computing, business strategy, and more |
| **Agents** | 37 | Specialized AI subagents for deep expertise in code review, security auditing, architecture analysis, platform development, and creative work |
| **Marketplaces** | 21 | External repositories containing 1,328+ additional skills from the community |
| **Commands** | 30+ | Custom slash commands for task routing, skill discovery, decision frameworks, and workflow automation |
| **Rules** | 17+ | Contextual guidelines for different tech stacks (React, Python, Go, Rust), checklists, and automation |
| **Hooks** | 8 | Git hooks (pre-commit, commit-msg, pre-push) and Claude Code lifecycle hooks (SessionStart, Stop, PreToolUse, PostToolUse, Notification) |

### The Core Philosophy

1. **Token Efficiency** - CLAUDE.md is lean (~1,100 tokens). Detailed content loads on-demand only when relevant.
2. **Proactive Discovery** - Skills, agents, and resources auto-activate based on task context.
3. **Workflow Flexibility** - Both natural language prompts and explicit `/start-task` routing work identically.
4. **Safety First** - Git hooks prevent secrets commits, enforce conventions, and block dangerous operations.
5. **Zero Configuration** - Install once, everything works. No manual setup required for basic usage.

---

## What Problem Does This Solve?

### The Challenge with Vanilla Claude Code

Claude Code out-of-the-box is powerful but generic. Every session starts fresh. There's no:
- Accumulated domain expertise
- Consistent coding standards enforcement
- Project continuity across sessions
- Specialized workflows for different tech stacks
- Automated safety checks

### What This Toolkit Provides

| Challenge | Solution |
|-----------|----------|
| "Claude doesn't know my project's patterns" | CLAUDE.md constitution loads every session with your standards |
| "I repeat the same instructions every time" | Skills auto-load domain expertise when context matches |
| "Complex projects get disorganized" | GSD system tracks multi-phase projects across sessions |
| "I forget to check for security issues" | Git hooks auto-block secrets, security-auditor agent catches vulnerabilities |
| "Each task requires different expertise" | 37 specialized agents spawn for deep work automatically |
| "I don't know what tools are available" | Universal router detects domains and loads relevant resources |
| "Claude gives generic advice" | 1,328+ marketplace skills provide production-tested patterns |

---

## Who Is This For?

### Primary Audience

| User Type | How They Benefit |
|-----------|------------------|
| **Professional Developers** | Production-ready patterns, security enforcement, code quality automation |
| **Full-Stack Engineers** | Stack-specific skills (React, Next.js, NestJS, etc.) with consistent patterns |
| **Platform Engineers** | iOS, Android, Flutter, React Native, Electron skills and agents |
| **DevOps/SRE** | AWS, GCP, Azure, Kubernetes, Terraform, CI/CD expertise |
| **Technical Leads** | Architecture analysis, code review, refactoring patterns |
| **Startup Founders** | Business strategy, monetization, product management skills |
| **AI/ML Engineers** | PyTorch, TensorFlow, LLM integration, MLOps patterns |
| **Scientific Researchers** | 125+ scientific skills for bioinformatics, chemistry, physics |

### Prerequisites

- Claude Code CLI installed ([installation guide](https://docs.anthropic.com/en/docs/claude-code))
- Git (for submodule management)
- Node.js (for Prettier formatting hooks)
- Basic command line familiarity

---

## Key Features at a Glance

### Intelligent Task Routing

```
You say: "Build a login form with validation"
System automatically:
├── Loads CLAUDE.md context
├── Detects: Development domain, React/Web context
├── Activates: generic-react-feature-developer skill
├── Scores complexity: 2 (medium)
├── Routes to: EnterPlanMode
└── After completion: Triggers code-reviewer agent
```

### Multi-Phase Project Management

```
You say: "Build a complete authentication system"
System:
├── Scores complexity: 5 (high)
├── Routes to: GSD (Get Shit Done)
├── Creates: .planning/STATE.md
├── Breaks into phases:
│   ├── Phase 1: Database & Models
│   ├── Phase 2: API Endpoints
│   ├── Phase 3: Frontend Integration
│   └── Phase 4: Testing & Documentation
└── Tracks progress across sessions
```

### Automatic Safety Enforcement

```
Git hooks enforce:
├── pre-commit: Block secrets, validate SKILL.md files
├── commit-msg: Require conventional commit format
└── pre-push: Block force-push to protected branches

Claude Code hooks enforce:
├── PreToolUse: Block dangerous commands (rm -rf /, format c:)
├── PostToolUse: Auto-run Prettier on Write/Edit
└── Stop: Send notification when awaiting input
```

---

## Quick Start Guide

### 5-Minute Setup

```bash
# 1. Backup existing config
mv ~/.claude ~/.claude-backup 2>/dev/null

# 2. Clone the toolkit
git clone https://github.com/travisjneuman/.claude.git ~/.claude

# 3. Initialize marketplaces
cd ~/.claude && git submodule update --init --recursive

# 4. Install git hooks
bash scripts/setup-hooks.sh

# 5. Start Claude Code
claude
```

### Your First Task

Just describe what you want:

```
"Build a REST API with user authentication"
```

The system automatically:
1. Detects development domain
2. Loads relevant skills (api-design, security)
3. Scores complexity (routes to GSD or Planning)
4. Tracks progress with TodoWrite
5. Reviews code when complete

### Alternative: Explicit Routing

```
/start-task Build a REST API with user authentication
```

Same result, but shows the routing process explicitly.

---

## Installation

### Fresh Installation

```bash
# Step 1: Backup existing Claude Code config
mv ~/.claude ~/.claude-backup 2>/dev/null

# Step 2: Clone this repository
git clone https://github.com/travisjneuman/.claude.git ~/.claude

# Step 3: Navigate to the directory
cd ~/.claude

# Step 4: Initialize all marketplace submodules (21 repos, ~200MB)
git submodule update --init --recursive

# Step 5: Install git hooks
bash scripts/setup-hooks.sh

# Step 6: Verify installation
claude --version
```

### Update Existing Installation

```bash
cd ~/.claude

# Pull latest changes
git pull origin master

# Update all marketplace submodules
git submodule update --remote --merge

# Or use the convenience script
bash scripts/update-external-repos.sh
```

### Verify Installation

```bash
# Start Claude Code
claude

# Test the router
/start-task Create a simple todo app

# List available skills
/list-skills
```

### Platform-Specific Notes

#### Windows

Git hooks run in Git Bash. Ensure:
- Git Bash is installed (comes with Git for Windows)
- Line endings are LF (not CRLF)
- Scripts are executable in Git Bash context

#### macOS/Linux

Standard installation works out of the box.

---

## Architecture Overview

### System Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER PROMPT                                      │
│                    "Build an iOS app with SwiftUI"                       │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       CLAUDE.MD (Constitution)                           │
│                   ~1,100 tokens, always loaded                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│  │   Identity  │ │     P0s     │ │  Workflow   │ │   Safety    │        │
│  │    & Role   │ │ (Security,  │ │  Patterns   │ │   Rules     │        │
│  │             │ │ Data, etc.) │ │             │ │             │        │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘        │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    UNIVERSAL ROUTER (/start-task)                        │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  Step 1: Research Triggers     Step 2: Memory Check              │   │
│  │  - "latest", "current"         - Query claude-mem                │   │
│  │  - Version queries             - Load relevant context           │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  Step 3: Domain Detection      Step 4: Complexity Scoring        │   │
│  │  - Development (23 domains)    - Multiple components: +3         │   │
│  │  - Scientific (8 domains)      - Architecture work: +2           │   │
│  │  - Business (16 domains)       - Single file fix: -2             │   │
│  │  - Creative (6 domains)        - Quick/simple: -2                │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
           ┌───────────┐  ┌───────────┐  ┌───────────┐
           │   GSD     │  │  PLANNING │  │  DIRECT   │
           │ Score ≥3  │  │ Score 1-2 │  │ Score ≤0  │
           └─────┬─────┘  └─────┬─────┘  └─────┬─────┘
                 │              │              │
                 ▼              ▼              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         RESOURCE LOADING                                 │
│                                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   SKILLS    │  │   AGENTS    │  │    RULES    │  │ MARKETPLACES│     │
│  │  71 local   │  │ 37 experts  │  │  Checklists │  │ 1,328+ more │     │
│  │             │  │  (Task tool)│  │  & stacks   │  │             │     │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           EXECUTION                                      │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  1. Load skills     2. Track with TodoWrite                     │    │
│  │  3. Spawn agents    4. Apply post-work automation               │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      POST-WORK AUTOMATION                                │
│                                                                          │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐             │
│  │  Code Review   │  │ Type Analysis  │  │   Commit       │             │
│  │  (automatic)   │  │  (if types)    │  │  (on request)  │             │
│  └────────────────┘  └────────────────┘  └────────────────┘             │
└─────────────────────────────────────────────────────────────────────────┘
```

### Component Relationships

```
~/.claude/
│
├── CLAUDE.md (Constitution)
│   └── Always loaded, references other files contextually
│
├── skills/ (71 skills)
│   └── Loaded when domain context matches
│
├── agents/ (37 agents)
│   └── Spawned via Task tool for deep expertise
│
├── commands/ (30+ commands)
│   └── Invoked explicitly via /command-name
│
├── rules/ (contextual guidelines)
│   ├── checklists/ (task-type specific)
│   ├── stacks/ (technology-specific)
│   └── tooling/ (setup guides)
│
├── plugins/marketplaces/ (21 repos, 1,328+ skills)
│   └── Searched when local skills insufficient
│
└── docs/ (extended documentation)
    └── Loaded for detailed reference
```

---

## How It Works

### The Loading Hierarchy

1. **Always Loaded (Every Session)**
   - `CLAUDE.md` (~1,100 tokens) - Core constitution
   - `settings.json` - Permissions and hooks

2. **Loaded on Domain Match**
   - Relevant skill(s) from `skills/`
   - Relevant rule(s) from `rules/`

3. **Loaded on Request**
   - Specific agent via Task tool
   - Marketplace skills via search
   - Decision frameworks via `/consider:*`

4. **Loaded for Reference**
   - Documentation files in `docs/`
   - Templates in `templates/`

### Token Efficiency Design

| Component | Token Cost | When Loaded |
|-----------|------------|-------------|
| CLAUDE.md | ~1,100 | Every session |
| Single skill | ~500-1,500 | On domain match |
| Agent definition | ~300-800 | When spawned |
| Rule/checklist | ~400-1,000 | On context match |
| Marketplace skill | ~500-2,000 | On explicit search |

**Comparison:** Loading everything would cost ~50,000+ tokens. This system typically uses ~2,000-5,000 tokens for context.

---

## Complete Directory Structure

```
~/.claude/
│
├── CLAUDE.md                          # Core constitution (always loaded)
│   - Identity & Role definition
│   - P0 Non-Negotiables (security, data integrity)
│   - Workflow patterns
│   - Anti-patterns to avoid
│   - Tool policies
│   - Git safety rules
│   - Skill discovery instructions
│
├── README.md                          # This comprehensive documentation
├── CHANGELOG.md                       # Version history and changes
├── CONTRIBUTING.md                    # How to contribute
├── plugin.json                        # Plugin manifest for distribution
├── settings.json                      # Claude Code settings & hooks
├── .mcp.json                          # MCP server definitions
│
├── skills/                            # 71 domain expertise modules
│   ├── MASTER_INDEX.md                # Complete skill navigation
│   ├── README.md                      # Skills usage guide
│   ├── EXPERT-SKILLS-GUIDE.md         # 16 domain expert skills
│   ├── _shared/                       # Shared skill resources
│   │
│   │ ─── FOUNDATION ───
│   ├── core-workflow/SKILL.md         # Session protocols, git, testing
│   │
│   │ ─── GENERIC (Any Stack) ───
│   ├── generic-code-reviewer/SKILL.md
│   ├── generic-design-system/SKILL.md
│   ├── generic-feature-developer/SKILL.md
│   ├── generic-ux-designer/SKILL.md
│   │
│   │ ─── STACK-SPECIFIC ───
│   ├── generic-static-*/SKILL.md      # 4 skills for HTML/CSS/JS
│   ├── generic-react-*/SKILL.md       # 4 skills for React/TypeScript
│   ├── generic-fullstack-*/SKILL.md   # 4 skills for Next.js/NestJS
│   │
│   │ ─── FRAMEWORKS ───
│   ├── vue-development/SKILL.md       # Vue.js 3, Composition API, Nuxt
│   ├── svelte-development/SKILL.md    # Svelte 5, Runes, SvelteKit
│   │
│   │ ─── PLATFORMS ───
│   ├── ios-development/SKILL.md       # Swift, SwiftUI, UIKit
│   ├── android-development/SKILL.md   # Kotlin, Jetpack Compose
│   ├── react-native/SKILL.md          # Cross-platform mobile
│   ├── flutter-development/SKILL.md   # Dart, Flutter widgets
│   ├── electron-desktop/SKILL.md      # Electron, Tauri
│   ├── pwa-development/SKILL.md       # Progressive Web Apps
│   ├── macos-native/SKILL.md          # AppKit, Catalyst
│   ├── game-development/SKILL.md      # Unity, Unreal, Godot
│   │
│   │ ─── ARCHITECTURE ───
│   ├── api-design/SKILL.md            # REST/GraphQL design
│   ├── graphql-expert/SKILL.md        # Schema, resolvers
│   ├── microservices-architecture/SKILL.md
│   ├── websockets-realtime/SKILL.md   # WebSocket, SSE, Socket.IO
│   ├── i18n-localization/SKILL.md     # ICU, RTL, locales
│   │
│   │ ─── INFRASTRUCTURE ───
│   ├── devops-cloud/SKILL.md          # AWS, GCP, Azure, K8s, Terraform
│   ├── database-expert/SKILL.md       # PostgreSQL, MongoDB, Redis
│   ├── ai-ml-development/SKILL.md     # PyTorch, TensorFlow, LLMs
│   ├── security/SKILL.md              # Auth, OWASP, encryption
│   │
│   │ ─── CREATIVE ───
│   ├── ui-research/SKILL.md           # Research before UI work
│   ├── frontend-enhancer/SKILL.md     # Modern UI patterns
│   ├── graphic-design/SKILL.md        # Color, typography, layout
│   ├── video-production/SKILL.md      # Pre/post production
│   ├── audio-production/SKILL.md      # Recording, mixing, mastering
│   ├── brand-identity/SKILL.md        # Brand strategy, visual identity
│   ├── ui-animation/SKILL.md          # Motion design, micro-interactions
│   │
│   │ ─── BUSINESS ───
│   ├── startup-launch/SKILL.md        # Validation, MVP, launch
│   ├── monetization-strategy/SKILL.md # Pricing, SaaS metrics
│   ├── business-strategy/SKILL.md     # Planning, competitive analysis
│   ├── finance/SKILL.md               # Modeling, valuation
│   ├── marketing/SKILL.md             # Brand, digital, analytics
│   ├── sales/SKILL.md                 # Methodologies, pipeline
│   ├── product-management/SKILL.md    # Roadmaps, prioritization
│   │
│   │ ─── DOMAIN EXPERTISE (16) ───
│   ├── leadership/SKILL.md
│   ├── hr-talent/SKILL.md
│   ├── operations/SKILL.md
│   ├── risk-management/SKILL.md
│   ├── legal-compliance/SKILL.md
│   ├── innovation/SKILL.md
│   ├── rd-management/SKILL.md
│   ├── data-science/SKILL.md
│   ├── sustainability-esg/SKILL.md
│   ├── health-wellness/SKILL.md
│   │
│   │ ─── WORKFLOW ───
│   ├── debug-systematic/SKILL.md      # 4-phase debugging
│   ├── tdd-workflow/SKILL.md          # Test-driven development
│   │
│   │ ─── UTILITIES ───
│   ├── codebase-documenter/SKILL.md
│   ├── tech-debt-analyzer/SKILL.md
│   ├── test-specialist/SKILL.md
│   ├── seo-analytics-auditor/SKILL.md
│   └── document-skills/SKILL.md       # Office formats
│
├── agents/                            # 37 specialized AI subagents
│   ├── README.md                      # Agent usage guide
│   │
│   │ ─── CODE QUALITY ───
│   ├── deep-code-reviewer.md          # 6-aspect review (opus)
│   ├── security-auditor.md            # OWASP, vulnerabilities
│   ├── refactoring-specialist.md      # Safe improvements
│   ├── performance-optimizer.md       # Bottleneck identification
│   │
│   │ ─── DEVELOPMENT ───
│   ├── test-generator.md              # TDD test suites
│   ├── api-designer.md                # REST/GraphQL APIs
│   ├── database-expert.md             # Schema, queries
│   ├── devops-specialist.md           # CI/CD, containers
│   ├── debugging-specialist.md        # 4-phase debugging
│   │
│   │ ─── ARCHITECTURE ───
│   ├── architecture-analyst.md        # System design (opus)
│   ├── graphql-architect.md           # Schema design
│   ├── microservices-architect.md     # Distributed systems
│   ├── realtime-specialist.md         # WebSockets, live data
│   ├── database-architect.md          # Advanced DB design
│   │
│   │ ─── PLATFORM ───
│   ├── ios-developer.md               # Swift, SwiftUI
│   ├── android-developer.md           # Kotlin, Compose
│   ├── mobile-architect.md            # Cross-platform decisions
│   ├── desktop-developer.md           # Electron, Tauri
│   ├── macos-developer.md             # AppKit, Catalyst
│   ├── game-developer.md              # Unity, Unreal, Godot
│   │
│   │ ─── LANGUAGE EXPERTS ───
│   ├── typescript-expert.md           # Type system mastery
│   ├── python-expert.md               # Python best practices
│   ├── react-expert.md                # React patterns, hooks
│   │
│   │ ─── CREATIVE ───
│   ├── graphic-designer.md            # Visual design
│   ├── video-producer.md              # Video production
│   ├── audio-engineer.md              # Sound design
│   ├── brand-strategist.md            # Brand identity
│   ├── motion-designer.md             # UI animation
│   │
│   │ ─── BUSINESS ───
│   ├── startup-advisor.md             # Launch, validation
│   ├── monetization-expert.md         # Revenue, pricing
│   │
│   │ ─── INFRASTRUCTURE ───
│   ├── devops-engineer.md             # Cloud, K8s, CI/CD
│   ├── ml-engineer.md                 # PyTorch, TensorFlow, MLOps
│   ├── i18n-specialist.md             # Internationalization
│   │
│   │ ─── SUPPORT ───
│   ├── documentation-writer.md        # Docs, READMEs (haiku)
│   ├── code-explainer.md              # Explanations (haiku)
│   └── accessibility-expert.md        # WCAG compliance
│
├── commands/                          # Custom slash commands
│   ├── start-task.md                  # Universal router v3.0
│   ├── list-skills.md                 # Browse skills
│   ├── skill-finder.md                # Problem-to-skill matcher
│   ├── discover-skills.md             # skillsmp.com search
│   ├── run.md                         # Run arbitrary commands
│   └── router/                        # Domain routing files
│       ├── domains-development.md     # 23 development domains
│       ├── domains-scientific.md      # 8 scientific domains
│       ├── domains-business.md        # 16 business domains
│       ├── domains-creative.md        # 6 creative domains
│       ├── domains-meta.md            # Admin tasks
│       ├── decision-frameworks.md     # 6 decision frameworks
│       └── routing-logic.md           # Complexity scoring
│
├── rules/                             # Contextual guidelines
│   ├── README.md                      # Rules index
│   ├── checklists/                    # Task-type specific
│   │   ├── ui-visual-changes.md       # Visual/UI work
│   │   ├── automation-scripts.md      # Scripts, automation
│   │   └── static-sites.md            # HTML/CSS/JS sites
│   ├── stacks/                        # Technology-specific
│   │   ├── react-typescript.md        # React + TypeScript
│   │   ├── fullstack-nextjs-nestjs.md # Full-stack patterns
│   │   ├── python.md                  # Python projects
│   │   ├── go.md                      # Go projects
│   │   └── rust.md                    # Rust projects
│   └── tooling/                       # Tool setup guides
│       ├── git-hooks-setup.md         # Git hook configuration
│       ├── mcp-servers.md             # MCP lifecycle management
│       ├── external-repos.md          # Marketplace updates
│       └── troubleshooting.md         # Common issue fixes
│
├── docs/                              # Extended documentation
│   ├── WORKFLOW-GUIDE.md              # Workflow patterns
│   ├── MARKETPLACE-GUIDE.md           # Marketplace reference
│   ├── GSD-TUTORIAL.md                # GSD system guide
│   ├── DOMAIN-ROUTING.md              # Routing internals
│   └── MCP-SERVERS.md                 # MCP server details
│
├── plugins/                           # Plugin system
│   ├── local/                         # Custom local plugins
│   └── marketplaces/                  # 21 external repositories
│       ├── anthropic-agent-skills/    # Official Anthropic
│       ├── claude-code-plugins/       # Official Anthropic
│       ├── claude-plugins-official/   # Official Anthropic
│       ├── taches-cc-resources/       # Meta-prompting, debugging
│       ├── get-shit-done/             # GSD project management
│       ├── claude-scientific-skills/  # 125+ scientific skills
│       ├── claude-code-plugins-plus-skills/ # 258 plugins, 185 skills
│       ├── wshobson-agents/           # 99 agents, 107 skills
│       ├── voltagent-subagents/       # 100+ specialized agents
│       ├── awesome-claude-skills/     # Documents, canvas, forensics
│       ├── skillsforge/               # 29 curated skills
│       ├── obra-superpowers/          # /brainstorm, /write-plan
│       ├── mhattingpete-skills/       # Git automation, testing
│       ├── claude-mem/                # Persistent memory
│       ├── skill-seekers/             # Skill generation
│       ├── travisvn-awesome-claude-skills/
│       ├── hesreallyhim-awesome-claude-code/
│       ├── alirezarezvani-claude-skills/
│       ├── behisecc-awesome-claude-skills/
│       ├── alvinunreal-awesome-claude/
│       └── voltagent-awesome-claude-skills/
│
├── scripts/                           # Utility scripts
│   ├── setup-hooks.sh                 # Install git hooks
│   ├── update-external-repos.sh       # Update marketplaces
│   └── hooks/                         # Trackable hook scripts
│       ├── pre-commit.sh              # Secret detection, validation
│       ├── commit-msg.sh              # Conventional commits
│       └── pre-push.sh                # Force-push protection
│
├── templates/                         # Project templates
│   └── task-template.md               # Task file template
│
├── vscode/                            # VS Code settings
│   ├── settings.json
│   └── setup-vscode-settings.ps1
│
├── .archive/                          # Archived files
│   └── claude-md-versions/            # Previous CLAUDE.md versions
│
└── .planning/                         # GSD project files (gitignored)
    ├── PROJECT.md                     # Project definition
    ├── ROADMAP.md                     # Full project plan
    ├── STATE.md                       # Current status
    └── phases/                        # Phase-specific files
```

---

## Configuration Reference

### settings.json

The main Claude Code configuration file:

```json
{
  "permissions": {
    "allow": [
      // Slash commands - all GSD and plugin commands
      "SlashCommand(/gsd:*)",
      "SlashCommand(/taches-cc-resources:*)",
      "SlashCommand(/commit-commands:*)",
      "SlashCommand(/feature-dev:*)",
      "SlashCommand(/pr-review-toolkit:*)",

      // Git operations
      "Bash(git add:*)", "Bash(git commit:*)", "Bash(git push:*)",
      "Bash(git status:*)", "Bash(git diff:*)", "Bash(git log:*)",

      // Package managers
      "Bash(npm *:*)", "Bash(npx:*)", "Bash(pnpm:*)", "Bash(yarn:*)",

      // Languages
      "Bash(node:*)", "Bash(python:*)", "Bash(pip:*)",

      // Tools
      "Bash(docker:*)", "Bash(gh:*)", "Bash(curl:*)",

      // File operations
      "Bash(ls:*)", "Bash(cat:*)", "Bash(mkdir:*)",

      // Skills
      "Skill(debug-like-expert)",
      "Skill(generic-code-reviewer)",
      "Skill(test-specialist)",

      // Web access
      "WebSearch",
      "WebFetch(domain:docs.anthropic.com)",
      "WebFetch(domain:react.dev)",
      "WebFetch(domain:github.com)",
      // ... 15+ more domains
    ],
    "defaultMode": "bypassPermissions"
  },

  "hooks": {
    "Stop": [...],           // Notification when awaiting input
    "PreToolUse": [...],     // Block dangerous commands
    "PostToolUse": [...]     // Auto-format with Prettier
  },

  "enableAllProjectMcpServers": false,
  "disabledMcpjsonServers": [
    "sequential-thinking", "playwright", "memory",
    "filesystem", "sqlite", "chrome-devtools", "puppeteer"
  ],

  "enabledPlugins": {
    "agent-sdk-dev@claude-code-plugins": true,
    "pr-review-toolkit@claude-code-plugins": true,
    "commit-commands@claude-code-plugins": true,
    "feature-dev@claude-code-plugins": true,
    "taches-cc-resources@taches-cc-resources": true,
    // ... more plugins
  },

  "alwaysThinkingEnabled": true,
  "spinnerTipsEnabled": false
}
```

### CLAUDE.md (Constitution)

Core rules loaded every session (~1,100 tokens):

| Section | Purpose |
|---------|---------|
| **Identity & Role** | "Lead Autonomous Engineer" with explicit thinking mode |
| **P0 Non-Negotiables** | Data integrity, security, coherence, atomic delivery |
| **Workflow** | Plan → Approval → Execute → Verify → Commit → Push |
| **Always Available** | WebSearch, Skills, Agents, Research, Decision Frameworks |
| **Tool Policy** | Prefer Read/Grep/Glob over bash equivalents |
| **Code Standards** | Strict types, function limits, DRY after 3 repetitions |
| **Git Safety** | Never force-push, never commit secrets |
| **Anti-Patterns** | Using `any`, `innerHTML`, proposing unread code changes |
| **Load When Relevant** | 14 contextual file triggers |
| **Skill Discovery** | Local skills + marketplace search instructions |

### .mcp.json

MCP server definitions (all disabled by default):

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-sequential-thinking"],
      "description": "Structured reasoning chains"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"],
      "description": "Browser testing and automation"
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-memory"],
      "description": "Persistent knowledge base"
    },
    // ... more servers
  }
}
```

---

## Complete Skills Reference (71 Skills)

### Foundation Skills

| Skill | Description | Auto-Loads When |
|-------|-------------|-----------------|
| `core-workflow` | Session protocols, git conventions, testing, debugging, communication standards | Complex tasks, planning, debugging |

### Generic Skills (Any Project)

| Skill | Description | Use For |
|-------|-------------|---------|
| `generic-code-reviewer` | Multi-stack code review patterns | Any code review |
| `generic-design-system` | Design tokens, colors, spacing, typography | UI/design work |
| `generic-feature-developer` | Architecture patterns for new features | Feature implementation |
| `generic-ux-designer` | UX best practices, user psychology | UX design work |

### Stack-Specific Skills (12 Skills)

#### Static Sites (HTML/CSS/JS)

| Skill | Description |
|-------|-------------|
| `generic-static-code-reviewer` | Pure HTML/CSS/JS review patterns |
| `generic-static-design-system` | Static site design tokens |
| `generic-static-feature-developer` | Static site architecture |
| `generic-static-ux-designer` | Static site UX patterns |

#### React + TypeScript

| Skill | Description |
|-------|-------------|
| `generic-react-code-reviewer` | React/TS strict mode, hooks patterns |
| `generic-react-design-system` | React component design system |
| `generic-react-feature-developer` | React architecture patterns |
| `generic-react-ux-designer` | React UX/interaction patterns |

#### Full-Stack (Next.js + NestJS)

| Skill | Description |
|-------|-------------|
| `generic-fullstack-code-reviewer` | Full-stack review patterns |
| `generic-fullstack-design-system` | Full-stack design tokens |
| `generic-fullstack-feature-developer` | Full-stack architecture |
| `generic-fullstack-ux-designer` | Full-stack UX patterns |

### Framework Skills

| Skill | Framework | Key Technologies |
|-------|-----------|------------------|
| `vue-development` | Vue.js 3 | Composition API, TypeScript, Pinia, Vue Router, Nuxt 3, Vitest |
| `svelte-development` | Svelte 5 | Runes ($state, $derived, $effect, $props), SvelteKit, TypeScript |

### Platform Development Skills (8 Skills)

| Skill | Platform | Technologies |
|-------|----------|--------------|
| `ios-development` | iOS/iPadOS/tvOS | Swift, SwiftUI, UIKit, Core Data, CloudKit |
| `android-development` | Android | Kotlin, Jetpack Compose, Material Design 3, Room, Coroutines |
| `react-native` | Cross-platform | React Native, Expo, native modules, bridge |
| `flutter-development` | Cross-platform | Dart, Flutter widgets, Provider/Riverpod, Platform channels |
| `electron-desktop` | Desktop | Electron, Tauri, IPC, native APIs |
| `pwa-development` | Web | Service workers, Web App Manifest, offline-first |
| `macos-native` | macOS | AppKit, Catalyst, sandboxing, notarization |
| `game-development` | Gaming | Unity (C#), Unreal Engine (C++), Godot (GDScript) |

### Creative & Design Skills (7 Skills)

| Skill | Domain | Coverage |
|-------|--------|----------|
| `ui-research` | Research | **PREREQUISITE for UI work** - Research inspiration, avoid AI look |
| `frontend-enhancer` | Enhancement | Modern UI patterns (requires ui-research first) |
| `graphic-design` | Visual Design | Color theory, typography, layout, composition, grids |
| `video-production` | Video | Pre-production, shooting, editing, color grading, sound |
| `audio-production` | Audio | Recording, mixing, mastering, sound design, DAWs |
| `brand-identity` | Branding | Brand strategy, positioning, visual identity, guidelines |
| `ui-animation` | Motion | Animation principles, easing, micro-interactions, Lottie |

### Business & Startup Skills (7 Skills)

| Skill | Domain | Coverage |
|-------|--------|----------|
| `startup-launch` | Startups | Idea validation, MVP definition, launch phases, metrics |
| `monetization-strategy` | Revenue | Pricing psychology, SaaS metrics, models, A/B testing |
| `business-strategy` | Strategy | Competitive analysis, SWOT, Porter's Five Forces, OKRs |
| `finance` | Finance | Financial modeling, DCF, valuation, cash flow, forecasting |
| `marketing` | Growth | Brand strategy, digital marketing, content, analytics |
| `sales` | Revenue | SPIN, Challenger, MEDDIC, pipeline, CRM optimization |
| `product-management` | Product | Roadmaps, prioritization (RICE/MoSCoW), user stories, PRDs |

### Technical Architecture Skills (5 Skills)

| Skill | Domain | Coverage |
|-------|--------|----------|
| `api-design` | APIs | REST best practices, OpenAPI/Swagger, versioning, pagination |
| `graphql-expert` | GraphQL | Schema design, resolvers, subscriptions, federation |
| `microservices-architecture` | Architecture | Service design, resilience, observability, event-driven |
| `websockets-realtime` | Real-time | WebSocket, SSE, Socket.IO, scaling, presence |
| `i18n-localization` | i18n | ICU MessageFormat, RTL, pluralization, date/number formats |

### Infrastructure & Operations Skills (4 Skills)

| Skill | Domain | Coverage |
|-------|--------|----------|
| `devops-cloud` | DevOps | AWS, GCP, Azure, Kubernetes, Terraform, Ansible, CI/CD |
| `database-expert` | Databases | PostgreSQL, MongoDB, Redis, indexing, query optimization |
| `ai-ml-development` | AI/ML | PyTorch, TensorFlow, LLM integration, MLOps, vector DBs |
| `security` | Security | Authentication (OAuth, JWT), OWASP Top 10, encryption, SAST |

### Domain Expert Skills (16 Skills)

| Skill | Domain | Focus Areas |
|-------|--------|-------------|
| `leadership` | Management | Team dynamics, delegation, performance management |
| `hr-talent` | HR | Talent acquisition, compensation, succession planning |
| `operations` | Operations | Process optimization, supply chain, quality management |
| `risk-management` | Risk | Enterprise risk, compliance, business continuity |
| `legal-compliance` | Legal | Contracts, IP, data privacy (GDPR/CCPA), licensing |
| `innovation` | Innovation | Design thinking, R&D management, patent strategy |
| `rd-management` | R&D | Research planning, technology roadmaps, lab management |
| `data-science` | Data | Statistical analysis, ML pipelines, visualization |
| `sustainability-esg` | ESG | Carbon accounting, ESG reporting, sustainable practices |
| `health-wellness` | Wellness | Workplace safety, mental health, ergonomics |

### Development Workflow Skills (2 Skills)

| Skill | Methodology | Process |
|-------|-------------|---------|
| `debug-systematic` | Debugging | REPRODUCE → ISOLATE → DIAGNOSE → FIX with evidence |
| `tdd-workflow` | Testing | RED → GREEN → REFACTOR cycle, test-first development |

### Utility Skills (5 Skills)

| Skill | Purpose | Output |
|-------|---------|--------|
| `codebase-documenter` | Documentation | READMEs, API docs, architecture docs, inline comments |
| `tech-debt-analyzer` | Code health | Technical debt audit, prioritized remediation plan |
| `test-specialist` | Testing | Test strategy, coverage analysis, test architecture |
| `seo-analytics-auditor` | SEO | Lighthouse audits, Core Web Vitals, structured data |
| `document-skills` | Office formats | .docx, .pdf, .pptx, .xlsx reading and creation |

---

## Complete Agents Reference (37 Agents)

### Code Quality Agents

| Agent | Model | Purpose | Invocation Example |
|-------|-------|---------|-------------------|
| `deep-code-reviewer` | opus | Comprehensive 6-aspect review (correctness, security, performance, maintainability, testing, documentation) | "Use the deep-code-reviewer agent to review my authentication module" |
| `security-auditor` | sonnet | OWASP Top 10, auth vulnerabilities, secrets exposure, dependency risks | "Use the security-auditor agent to audit this API endpoint" |
| `refactoring-specialist` | sonnet | Safe, incremental improvements with comprehensive test coverage | "Use the refactoring-specialist agent to improve this legacy code" |
| `performance-optimizer` | sonnet | Bottleneck identification, profiling analysis, optimization recommendations | "Use the performance-optimizer agent to speed up this function" |

### Development Agents

| Agent | Model | Purpose | Invocation Example |
|-------|-------|---------|-------------------|
| `test-generator` | sonnet | TDD-focused test suite generation with edge cases | "Use the test-generator agent to create tests for this service" |
| `api-designer` | sonnet | REST/GraphQL API design, OpenAPI specs, versioning | "Use the api-designer agent to design endpoints for users" |
| `database-expert` | sonnet | Schema design, query optimization, indexing strategies | "Use the database-expert agent to optimize these queries" |
| `devops-specialist` | sonnet | CI/CD pipelines, containerization, deployment automation | "Use the devops-specialist agent to set up GitHub Actions" |
| `debugging-specialist` | sonnet | Systematic 4-phase debugging for complex issues | "Use the debugging-specialist agent to find this memory leak" |

### Architecture Agents

| Agent | Model | Purpose | Invocation Example |
|-------|-------|---------|-------------------|
| `architecture-analyst` | opus | System design, pattern analysis, strategic recommendations | "Use the architecture-analyst agent to review our microservices" |
| `graphql-architect` | sonnet | Schema design, resolver patterns, federation strategies | "Use the graphql-architect agent to design the schema" |
| `microservices-architect` | sonnet | Service boundaries, resilience patterns, observability | "Use the microservices-architect agent to plan the migration" |
| `realtime-specialist` | sonnet | WebSockets, SSE, live data, presence, scaling | "Use the realtime-specialist agent to implement live updates" |
| `database-architect` | sonnet | Advanced schema design, sharding, replication | "Use the database-architect agent to design the data model" |

### Platform Development Agents

| Agent | Model | Purpose | Invocation Example |
|-------|-------|---------|-------------------|
| `ios-developer` | sonnet | Swift, SwiftUI, UIKit, Apple ecosystem integration | "Use the ios-developer agent to build the settings screen" |
| `android-developer` | sonnet | Kotlin, Jetpack Compose, Material Design 3 | "Use the android-developer agent to implement navigation" |
| `mobile-architect` | sonnet | Cross-platform decisions, React Native vs Flutter | "Use the mobile-architect agent to evaluate our options" |
| `desktop-developer` | sonnet | Electron, Tauri, native integrations | "Use the desktop-developer agent to add system tray" |
| `macos-developer` | sonnet | AppKit, Catalyst, macOS-specific features | "Use the macos-developer agent to add menu bar app" |
| `game-developer` | sonnet | Unity, Unreal, Godot game development | "Use the game-developer agent to implement physics" |

### Language Expert Agents

| Agent | Model | Purpose | Invocation Example |
|-------|-------|---------|-------------------|
| `typescript-expert` | sonnet | Type system mastery, generics, conditional types | "Use the typescript-expert agent to fix these type errors" |
| `python-expert` | sonnet | Best practices, type hints, async patterns | "Use the python-expert agent to review this module" |
| `react-expert` | sonnet | Hooks, state management, performance optimization | "Use the react-expert agent to optimize renders" |

### Creative Agents

| Agent | Model | Purpose | Invocation Example |
|-------|-------|---------|-------------------|
| `graphic-designer` | sonnet | Color theory, typography, layout, composition | "Use the graphic-designer agent to choose a color palette" |
| `video-producer` | sonnet | Video production workflow, editing, color grading | "Use the video-producer agent to plan the tutorial video" |
| `audio-engineer` | sonnet | Recording, mixing, mastering, sound design | "Use the audio-engineer agent to mix the podcast" |
| `brand-strategist` | sonnet | Brand identity, positioning, guidelines | "Use the brand-strategist agent to define our brand voice" |
| `motion-designer` | sonnet | UI animation, micro-interactions, easing curves | "Use the motion-designer agent to design the transitions" |

### Business Agents

| Agent | Model | Purpose | Invocation Example |
|-------|-------|---------|-------------------|
| `startup-advisor` | sonnet | Launch strategy, validation, MVP, growth | "Use the startup-advisor agent to validate my idea" |
| `monetization-expert` | sonnet | Revenue models, pricing strategy, metrics | "Use the monetization-expert agent to design pricing tiers" |

### Infrastructure Agents

| Agent | Model | Purpose | Invocation Example |
|-------|-------|---------|-------------------|
| `devops-engineer` | sonnet | AWS, GCP, Azure, Kubernetes, Terraform | "Use the devops-engineer agent to set up Kubernetes" |
| `ml-engineer` | sonnet | PyTorch, TensorFlow, LLM integration, MLOps | "Use the ml-engineer agent to fine-tune the model" |
| `i18n-specialist` | sonnet | Internationalization, localization, RTL | "Use the i18n-specialist agent to add French support" |

### Support Agents

| Agent | Model | Purpose | Invocation Example |
|-------|-------|---------|-------------------|
| `documentation-writer` | haiku | READMEs, API docs, guides, tutorials | "Use the documentation-writer agent to document this API" |
| `code-explainer` | haiku | Clear explanations of complex code | "Use the code-explainer agent to explain this algorithm" |
| `accessibility-expert` | sonnet | WCAG compliance, screen readers, keyboard nav | "Use the accessibility-expert agent to audit this form" |

### Model Selection Guide

| Model | Use For | Token Cost |
|-------|---------|------------|
| **opus** | Complex analysis, architecture, thorough reviews | Highest |
| **sonnet** | Standard tasks, balanced speed/quality | Medium |
| **haiku** | Quick tasks, documentation, explanations | Lowest |

---

## Complete Marketplaces Reference (21 Marketplaces)

### Official Anthropic (3 Marketplaces)

| Marketplace | Contents | Skills/Plugins | Key Features |
|-------------|----------|----------------|--------------|
| `anthropic-agent-skills` | Official skills | Document skills, example patterns | Canonical skill format, Anthropic-maintained |
| `claude-code-plugins` | Official plugins | PR review, commit commands, feature dev, security | Production-tested, regularly updated |
| `claude-plugins-official` | Curated plugins | External plugin collection | Vetted by Anthropic team |

### Taches/GlitterCowboy (2 Marketplaces)

| Marketplace | Contents | Skills/Plugins | Key Features |
|-------------|----------|----------------|--------------|
| `taches-cc-resources` | Meta-prompting | Debugging, hooks, agents, skill creation | `/consider:*` decision frameworks, prompt engineering |
| `get-shit-done` | Project management | GSD multi-phase system | `/gsd:*` commands, session continuity |

### Large Collections (5 Marketplaces)

| Marketplace | Contents | Count | Key Features |
|-------------|----------|-------|--------------|
| `claude-code-plugins-plus-skills` | Mixed | 258 plugins, 185 skills | 18 domains, production-ready |
| `wshobson-agents` | Agents & skills | 99 agents, 107 skills, 15 orchestrators | Progressive disclosure architecture |
| `voltagent-subagents` | Agents | 100+ specialized agents | Full-stack, DevOps focus |
| `voltagent-awesome-claude-skills` | Skills | Curated collection | VoltAgent curation |
| `claude-scientific-skills` | Scientific | 125+ skills | Bioinformatics, chemistry, physics, proteomics |

### Curated Collections (4 Marketplaces)

| Marketplace | Contents | Count | Key Features |
|-------------|----------|-------|--------------|
| `awesome-claude-skills` | Documents | 27 skills | Documents, canvas, forensics, invoices |
| `skillsforge` | Curated | 29 skills | Quality-focused curation |
| `mhattingpete-skills` | Dev workflow | 10+ skills | Git automation, testing, code review |
| `obra-superpowers` | Battle-tested | ~30 skills | /brainstorm, /write-plan, /execute-plan |

### Community Collections (6 Marketplaces)

| Marketplace | Contents | Key Features |
|-------------|----------|--------------|
| `travisvn-awesome-claude-skills` | Curated list | Broad coverage, resources, tools |
| `hesreallyhim-awesome-claude-code` | CLI tools | Slash-commands, CLAUDE.md examples |
| `alirezarezvani-claude-skills` | Mixed | Skills + subagents collection |
| `behisecc-awesome-claude-skills` | Categorized | Domain organization |
| `alvinunreal-awesome-claude` | Resources | Broader Claude resources |
| `skill-seekers` | Generators | Auto-generate skills from docs/repos/PDFs |

### Specialized (1 Marketplace)

| Marketplace | Contents | Key Features |
|-------------|----------|--------------|
| `claude-mem` | Memory | Persistent memory, semantic search, session continuity |

### Searching Marketplaces

```bash
# Find skills by keyword
find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -l "react"

# Find commands
find ~/.claude/plugins/marketplaces -name "*.md" -path "*/commands/*"

# Find agents
find ~/.claude/plugins/marketplaces -name "*.md" -path "*/agents/*"
```

### External Discovery: skillsmp.com

Search 35,530+ community skills:

```
/discover-skills react hooks
/discover-skills database optimization
/discover-skills kubernetes deployment
```

---

## Git Hooks System

### Overview

Three git hooks enforce workflow compliance automatically:

```
.git/hooks/
├── pre-commit     # Runs before commit
├── commit-msg     # Validates commit message
└── pre-push       # Runs before push
```

### Pre-Commit Hook

**Purpose:** Prevent secrets, validate files, enforce standards

| Check | Action | Bypass |
|-------|--------|--------|
| Secret Detection | BLOCKS commit if API keys, passwords, tokens found | `--no-verify` |
| CHANGELOG Reminder | WARNS if significant changes without CHANGELOG update | - |
| SKILL.md Validation | WARNS if skill files missing required headers | - |
| Gitignore Enforcement | BLOCKS if trying to commit ignored files | `--no-verify` |

**Detected Patterns:**

```
API keys:       sk-[a-zA-Z0-9]{20,}
                api[_-]?key.*=.*['\"][a-zA-Z0-9]
Passwords:      password.*=.*['\"][^'\"]+['\"]
Tokens:         token.*=.*['\"][a-zA-Z0-9]
Private keys:   -----BEGIN.*PRIVATE KEY-----
AWS:            AKIA[0-9A-Z]{16}
```

### Commit-Msg Hook

**Purpose:** Enforce conventional commit format

**Required Format:**
```
type(scope): description

type: feat|fix|docs|style|refactor|perf|test|chore|build|ci
scope: optional, e.g., (auth), (api)
description: imperative mood, lowercase
```

**Examples:**
```bash
git commit -m "feat: add user authentication"        # Valid
git commit -m "feat(auth): implement JWT tokens"     # Valid
git commit -m "fix: resolve memory leak in cache"   # Valid
git commit -m "Added new feature"                   # BLOCKED
git commit -m "WIP"                                 # BLOCKED
```

### Pre-Push Hook

**Purpose:** Protect branches, validate remotes

| Check | Action | Bypass |
|-------|--------|--------|
| Force-Push Protection | BLOCKS force push to master/main | `--force --no-verify` |
| Remote Validation | WARNS if pushing to unexpected remote | - |
| Submodule Awareness | Notes marketplace submodule changes | - |

### Installation

```bash
# Install hooks
bash ~/.claude/scripts/setup-hooks.sh

# Verify installation
ls -la ~/.claude/.git/hooks/

# Test pre-commit manually
bash ~/.claude/.git/hooks/pre-commit
```

### Emergency Bypass

**Use only for genuine emergencies:**

```bash
# Skip all hooks
git commit --no-verify -m "hotfix: critical security patch"
git push --no-verify

# Skip specific hook
git push --force --no-verify  # Skip pre-push only
```

---

## Claude Code Lifecycle Hooks

### Overview

Claude Code hooks run at specific lifecycle events. **No Python required** - all hooks use bash.

```json
{
  "hooks": {
    "SessionStart": [...],  // When session begins (NEW)
    "Stop": [...],          // When Claude awaits input
    "PreToolUse": [...],    // Before tool execution
    "PostToolUse": [...],   // After tool execution
    "Notification": [...]   // System notifications (NEW)
  }
}
```

### Available Hook Events (10 Total)

| Hook | Trigger | Our Usage |
|------|---------|-----------|
| **SessionStart** | New session begins | ✅ Display toolkit status |
| **SessionEnd** | Session terminates | Not implemented |
| **Stop** | Claude awaits input | ✅ Toast notification |
| **PreToolUse** | Before any tool | ✅ Dangerous command blocking |
| **PostToolUse** | After tool completes | ✅ Prettier formatting |
| **Notification** | System notifications | ✅ Session logging |
| **PreCompact** | Before context compact | Not implemented |
| **UserPromptSubmit** | User sends message | Not implemented |
| **PermissionRequest** | Tool needs approval | Not implemented |
| **SubagentStop** | Subagent completes | Not implemented |

### SessionStart Hook (NEW)

**Purpose:** Display toolkit status when session begins

**Configuration:**
```json
{
  "SessionStart": [{
    "matcher": "",
    "hooks": [{
      "type": "command",
      "command": "echo 'Claude Code Toolkit v1.3.2 Initialized: 71 Skills | 37 Agents | 21 Marketplaces'",
      "statusMessage": "Initializing toolkit"
    }]
  }]
}
```

### Stop Hook (Notification)

**Purpose:** Alert user when Claude completes and awaits input

**Configuration:**
```json
{
  "Stop": [{
    "matcher": "",
    "hooks": [{
      "type": "command",
      "command": "powershell -Command \"[Windows.UI.Notifications...]\"",
      "statusMessage": "Sending notification"
    }]
  }]
}
```

**Platform Notes:**
- Windows: Uses Windows Toast Notifications
- macOS: Replace with `osascript -e 'display notification'`
- Linux: Replace with `notify-send`

### PreToolUse Hook (Safety)

**Purpose:** Block dangerous commands before execution

**Configuration:**
```json
{
  "PreToolUse": [{
    "matcher": "Bash",
    "hooks": [{
      "type": "command",
      "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -qE '(rm -rf /|rm -rf ~|format c:|del /s /q c:)'; then echo 'BLOCKED: Dangerous command detected' >&2; exit 2; fi",
      "statusMessage": "Validating command safety"
    }]
  }]
}
```

**Blocked Commands:**
- `rm -rf /` - Delete root filesystem
- `rm -rf ~` - Delete home directory
- `format c:` - Format Windows drive
- `del /s /q c:` - Delete Windows drive

### PostToolUse Hook (Formatting)

**Purpose:** Auto-format files after Write/Edit

**Configuration:**
```json
{
  "PostToolUse": [
    {
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "npx prettier --write \"$CLAUDE_FILE_PATH\" 2>/dev/null || true",
        "statusMessage": "Running Prettier"
      }]
    },
    {
      "matcher": "Edit",
      "hooks": [{
        "type": "command",
        "command": "npx prettier --write \"$CLAUDE_FILE_PATH\" 2>/dev/null || true",
        "statusMessage": "Running Prettier"
      }]
    }
  ]
}
```

### Notification Hook (Session Logging)

**Purpose:** Log notifications to session file for debugging

**Configuration:**
```json
{
  "Notification": [{
    "matcher": "",
    "hooks": [{
      "type": "command",
      "command": "echo \"[$(date +%H:%M:%S)] $CLAUDE_NOTIFICATION\" >> ~/.claude/.session-log 2>/dev/null || true",
      "statusMessage": "Logging notification"
    }]
  }]
}
```

**Use Cases:**
- Debug session issues
- Track tool usage patterns
- Monitor for errors

---

## MCP Servers

### Overview

Model Context Protocol (MCP) servers extend Claude Code capabilities. **All disabled by default** to save tokens.

### Available Servers

| Server | Purpose | Token Cost | Enable When |
|--------|---------|------------|-------------|
| `sequential-thinking` | Structured reasoning chains | ~500 | Complex decisions, architecture |
| `playwright` | Browser testing/automation | ~2,000 | E2E tests, web scraping |
| `memory` | Persistent knowledge base | ~800 | Multi-session projects |
| `filesystem` | Enhanced file operations | ~1,500 | Bulk file work |
| `sqlite` | Database operations | ~1,000 | SQLite work |
| `chrome-devtools` | Browser debugging | ~500 | Frontend debugging |
| `puppeteer` | Browser automation | ~1,500 | Alternative to Playwright |

### Management

```bash
# View all servers
/mcp

# Enable for task
/mcp enable playwright

# Disable after use (important!)
/mcp disable playwright
```

### Best Practice

1. Keep all disabled by default
2. Enable only when needed
3. Disable immediately after use
4. Saves ~6,000+ tokens per session

---

## Workflow Patterns

### Pattern 1: Standard Prompts

Just describe what you want:

```
"Build a login form with validation"
"Fix the API timeout issue"
"Review my authentication code"
```

**How it works:**
1. CLAUDE.md loads
2. Skills auto-activate based on keywords
3. Executes directly with loaded context

**Best for:** Single-focus tasks, quick fixes, clear scope

### Pattern 2: /start-task Router

Explicit intelligent routing:

```
/start-task Build an iOS app with SwiftUI
/start-task Set up CI/CD with testing
```

**How it works:**
1. Scores complexity (see routing logic)
2. Detects domains (development, scientific, etc.)
3. Routes to GSD, Planning, or Direct
4. Loads all relevant resources

**Best for:** Complex tasks, multi-phase work, when unsure

### Pattern 3: GSD for Projects

Multi-phase project management:

```
/gsd:new-project Build complete authentication system
/gsd:progress
/gsd:plan-phase 1
/gsd:execute-plan
```

**Creates:**
```
.planning/
├── STATE.md      # Current status
├── ROADMAP.md    # Full plan
└── phases/       # Phase details
```

**Best for:** Multi-session work, complex features, team coordination

### Pattern 4: Decision Frameworks

Structured decision-making:

```
/consider:first-principles Should I use Redux or Zustand?
/consider:5-whys Why is the build failing?
/consider:eisenhower-matrix Prioritize these features
```

**Best for:** Technical decisions, root cause analysis, prioritization

---

## The Universal Router (start-task)

### Execution Protocol

```
Step 0: ULTRATHINK
        Apply maximum reasoning depth for non-trivial tasks

Step 1: Environment Context
        Check current date, research triggers

Step 2: Memory Check
        Query claude-mem for relevant past context

Step 3: GSD Project Check
        If .planning/STATE.md exists → /gsd:progress

Step 4: Domain Detection (Priority Order)
        1. Meta/Admin → domains-meta.md
        2. Decision → decision-frameworks.md
        3. Scientific → domains-scientific.md
        4. Development → domains-development.md
        5. Business → domains-business.md
        6. Creative → domains-creative.md

Step 5: Complexity Scoring
        Score >= 3 → GSD
        Score 1-2 → EnterPlanMode
        Score <= 0 → Direct execution

Step 6: Execute
        Load skills, track with TodoWrite, spawn agents

Step 7: Memory Save
        Save key decisions to claude-mem
```

### Complexity Scoring

| Signal | Points | Examples |
|--------|--------|----------|
| Multiple components/systems | +3 | "API and frontend", "database and UI" |
| Multiple steps implied | +2 | "first... then...", "set up... deploy" |
| New feature/system | +3 | "build", "create", "implement" |
| Architecture/design work | +2 | "design", "architect", "structure" |
| Cross-cutting concerns | +2 | "refactor", "migrate", "upgrade" |
| Research required | +1 | "figure out", "explore", "investigate" |
| Scientific/specialized | +2 | Any scientific domain |
| Bug/issue (singular) | -1 | "fix the bug", "resolve error" |
| Single file mentioned | -2 | "update README", "fix typo" |
| Quick/small qualifier | -2 | "quick", "small", "minor", "simple" |

### Examples

| Prompt | Score | Route |
|--------|-------|-------|
| "Build an iOS app with SwiftUI" | 5 | GSD |
| "Add user authentication to the API" | 4 | GSD |
| "Create a REST endpoint for users" | 2 | Planning |
| "Fix the typo in the header" | -2 | Direct |
| "What's new in React 19?" | 0 | Direct (with research) |

---

## GSD Project Management System

### What is GSD?

"Get Shit Done" - A multi-phase project management framework that:
- Tracks project phases and milestones
- Maintains progress across sessions
- Provides structure without blocking capabilities

### When to Use GSD

| Use GSD | Don't Use GSD |
|---------|---------------|
| Multiple phases | Single task |
| Multi-session work | Quick fix |
| Complex features | Simple question |
| Architectural overhaul | Documentation update |

### Core Commands

| Command | Purpose |
|---------|---------|
| `/gsd:new-project` | Initialize new multi-phase project |
| `/gsd:progress` | Check status, get next action |
| `/gsd:plan-phase [n]` | Create detailed plan for phase |
| `/gsd:execute-plan` | Work through current plan |
| `/gsd:resume-work` | Restore session context |
| `/gsd:pause-work` | Save state before break |
| `/gsd:add-phase` | Add new phase to project |
| `/gsd:complete-milestone` | Mark milestone done |
| `/gsd:help` | Full command reference |

### Project Structure

```
.planning/
├── PROJECT.md      # Project definition
│   - Name, description
│   - Goals, constraints
│   - Stakeholders
│
├── ROADMAP.md      # Full project plan
│   - All phases
│   - Dependencies
│   - Timeline (if specified)
│
├── STATE.md        # Current status
│   - Active phase
│   - Progress percentage
│   - Next action
│   - Blockers
│
└── phases/
    ├── phase-1.md  # Phase details
    └── phase-2.md  # Tasks, acceptance criteria
```

### STATE.md Example

```markdown
# Project State

## Project Summary
**Building:** User Authentication System
**Status: ACTIVE**

## Current Position
Phase: 2 of 4 (API Implementation)
Status: **IN PROGRESS**
Progress: ████████░░░░░ 60%

## Phases Overview
| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Database Schema | ✓ COMPLETE |
| 2 | API Implementation | IN PROGRESS |
| 3 | Frontend Integration | PENDING |
| 4 | Testing & Docs | PENDING |

## Next Action
Implement JWT refresh token endpoint

## Recent Activity
- Completed user registration endpoint
- Completed login endpoint
- Started token refresh implementation
```

---

## Decision Frameworks

### Available Frameworks

| Framework | Purpose | Command |
|-----------|---------|---------|
| **First-Principles** | Break problems to fundamentals | `/consider:first-principles` |
| **5-Whys** | Root cause analysis | `/consider:5-whys` |
| **Eisenhower Matrix** | Urgency/importance prioritization | `/consider:eisenhower-matrix` |
| **Pros/Cons** | Trade-off evaluation | `/consider:pros-cons` |
| **SWOT** | Strategic analysis | `/consider:swot` |
| **Decision Matrix** | Multi-criteria decisions | `/consider:decision-matrix` |

### When to Use Each

| Situation | Framework |
|-----------|-----------|
| "Should I use X or Y?" | First-Principles |
| "Why does this keep failing?" | 5-Whys |
| "What should I work on first?" | Eisenhower Matrix |
| "What are the trade-offs?" | Pros/Cons |
| "Evaluate this strategy" | SWOT |
| "Compare multiple options" | Decision Matrix |

---

## Complete Commands Reference

### Task Management

| Command | Purpose | Example |
|---------|---------|---------|
| `/start-task [desc]` | Universal router | `/start-task Build login API` |
| `/gsd:new-project` | Start GSD project | `/gsd:new-project Auth system` |
| `/gsd:progress` | Check status | `/gsd:progress` |
| `/gsd:plan-phase [n]` | Plan specific phase | `/gsd:plan-phase 2` |
| `/gsd:execute-plan` | Execute current plan | `/gsd:execute-plan` |
| `/gsd:resume-work` | Resume with context | `/gsd:resume-work` |
| `/gsd:pause-work` | Save state | `/gsd:pause-work` |

### Skills & Discovery

| Command | Purpose | Example |
|---------|---------|---------|
| `/list-skills [domain]` | Browse skills | `/list-skills ios` |
| `/skill-finder [problem]` | Find skill for problem | `/skill-finder debug memory` |
| `/discover-skills [query]` | Search skillsmp.com | `/discover-skills react hooks` |

### Code & Git

| Command | Purpose | Example |
|---------|---------|---------|
| `/commit-commands:commit` | Create commit | After code changes |
| `/commit-commands:commit-push-pr` | Full PR flow | When ready for review |
| `/code-review:code-review` | Review code | Before commit |

### Meta & Creation

| Command | Purpose | Example |
|---------|---------|---------|
| `/taches-cc-resources:create-agent-skill` | Create skill | New domain expertise |
| `/taches-cc-resources:create-hook` | Create hook | New automation |
| `/taches-cc-resources:create-slash-command` | Create command | New shortcut |
| `/taches-cc-resources:create-subagent` | Create agent | New specialist |
| `/taches-cc-resources:check-todos` | Review todos | Check outstanding |
| `/taches-cc-resources:whats-next` | Next suggestion | When stuck |

### Decision Making

| Command | Purpose |
|---------|---------|
| `/consider:first-principles` | Fundamental analysis |
| `/consider:5-whys` | Root cause |
| `/consider:eisenhower-matrix` | Priority matrix |
| `/consider:pros-cons` | Trade-offs |
| `/consider:swot` | SWOT analysis |
| `/consider:decision-matrix` | Multi-criteria |

### Obra Superpowers

| Command | Purpose |
|---------|---------|
| `/obra:brainstorm` | Structured brainstorming |
| `/obra:write-plan` | Detailed planning |
| `/obra:execute-plan` | Step-by-step execution |

---

## Customization Guide

### Adding a New Skill

1. Create directory: `skills/my-skill/`
2. Create `SKILL.md`:

```markdown
---
name: my-skill
description: When to use this skill (one sentence)
---

# My Skill

## Overview
[What this skill provides]

## When to Use
[Trigger conditions]

## Patterns

### Pattern 1: [Name]
[Code examples, guidelines]

### Pattern 2: [Name]
[More patterns]

## Anti-Patterns
[What to avoid]

## Related
- [Other skills]
- [Agents]
```

### Adding a New Agent

1. Create `agents/my-agent.md`:

```yaml
---
name: my-agent
description: Agent purpose and when to use
model: sonnet  # or opus, haiku
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
[Agent role and expertise area]

## Approach
[How the agent works]

## Output Format
[Expected outputs]

## Guidelines
[Behavioral rules]
```

### Adding a New Command

1. Create `commands/my-command.md`:

```markdown
---
description: What this command does (shown in help)
arguments:
  - name: arg1
    description: First argument
    required: true
  - name: arg2
    description: Optional argument
    required: false
---

# My Command

[Instructions for Claude on what to do when command is invoked]

## Parameters
- `arg1`: [How to use]
- `arg2`: [How to use]

## Execution Steps
1. [Step 1]
2. [Step 2]

## Examples
[Usage examples]
```

### Adding a New Rule

1. Determine category: `checklists/`, `stacks/`, or `tooling/`
2. Create `rules/[category]/my-rule.md`:

```markdown
# My Rule

**When to use:** [Trigger condition]

---

## Overview
[What this rule covers]

## Checklist
- [ ] Item 1
- [ ] Item 2

## Examples
[Good and bad examples]

## Related
- [Other rules]
- [Skills]
- [Agents]
```

3. Add trigger to CLAUDE.md "Load When Relevant" section

---

## Best Practices

### For Daily Use

1. **Start with natural language** - Just describe what you want
2. **Use `/start-task` for complex work** - Leverages full routing
3. **Let skills auto-load** - Don't manually invoke unless specific need
4. **Check `/gsd:progress` for ongoing projects** - Maintains continuity
5. **Use decision frameworks for choices** - Structured thinking

### For Token Efficiency

1. **Keep MCP servers disabled** - Enable only when needed
2. **Use `/compact` at 50% context** - Compresses conversation
3. **Use `/clear` between unrelated tasks** - Fresh context
4. **Let skills load on-demand** - Don't pre-load

### For Code Quality

1. **Agents auto-trigger after code changes** - Don't skip reviews
2. **Run security-auditor on auth code** - Explicit security check
3. **Use deep-code-reviewer for PRs** - Comprehensive review
4. **Trust the git hooks** - They catch secrets

### For Multi-Session Work

1. **Use GSD for multi-phase projects** - Tracks across sessions
2. **Save to claude-mem** - Key decisions persist
3. **Use `/gsd:pause-work` before ending** - Saves state
4. **Use `/gsd:resume-work` when returning** - Restores context

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
| Commit blocked | Check for secrets, use `--no-verify` if intentional |

### Git Hook Issues

```bash
# Check hook is executable
ls -la ~/.claude/.git/hooks/pre-commit

# Test hook manually
bash ~/.claude/.git/hooks/pre-commit

# Reinstall hooks
bash ~/.claude/scripts/setup-hooks.sh

# Windows: Fix line endings
# In Git Bash:
dos2unix ~/.claude/.git/hooks/pre-commit
```

### Context Management

```bash
# Clear context (fresh start)
/clear

# Compact context (save space)
/compact

# Check context usage
/context
```

### Marketplace Issues

```bash
# Re-initialize submodules
cd ~/.claude
git submodule update --init --recursive

# Update all marketplaces
bash scripts/update-external-repos.sh

# Check submodule status
git submodule status
```

---

## Frequently Asked Questions

### General

**Q: Do I need to use `/start-task` for everything?**
A: No. Natural language prompts work identically. `/start-task` just makes routing explicit.

**Q: How do I know which skill is loading?**
A: Skills load silently based on context. Use `/list-skills` to browse available skills.

**Q: Can I use multiple skills at once?**
A: Yes. Multiple relevant skills can load simultaneously.

**Q: What happens if there's no matching skill?**
A: Claude uses general knowledge. Consider creating a skill for repeated needs.

### Skills & Agents

**Q: What's the difference between skills and agents?**
A: Skills provide knowledge/patterns. Agents execute tasks. Use skills for guidance, agents for doing.

**Q: How do I invoke an agent?**
A: "Use the [agent-name] agent to [task]" or the system spawns automatically.

**Q: Can agents use other agents?**
A: Not directly. Complex tasks should use GSD phases or orchestrating prompts.

### GSD

**Q: Am I "locked into" GSD once I start a project?**
A: No. GSD provides structure but doesn't block anything. You can always execute directly.

**Q: How do I abandon a GSD project?**
A: Delete `.planning/STATE.md` or start a new project with `/gsd:new-project`.

**Q: Can I have multiple GSD projects?**
A: One at a time per working directory. Different directories can have different projects.

### Marketplaces

**Q: Are marketplace skills as good as local skills?**
A: Quality varies. Official Anthropic and large collections tend to be well-maintained.

**Q: Can I contribute to marketplaces?**
A: Yes, to non-official ones. Each has its own contribution process.

**Q: Why are marketplaces read-only?**
A: `no_push` prevents accidental changes to upstream. Fork if you need to modify.

### Performance

**Q: Why are MCP servers disabled by default?**
A: Each enabled server adds 500-2000 tokens. Keeping them disabled saves ~6000+ tokens.

**Q: How much context does CLAUDE.md use?**
A: ~1,100 tokens. Detailed content loads on-demand.

**Q: What's the maximum context I should use?**
A: Use `/compact` at 50% and `/clear` at 80% for best performance.

---

## Glossary of Terms

| Term | Definition |
|------|------------|
| **Agent** | Specialized AI subagent spawned for deep expertise in a specific domain |
| **CLAUDE.md** | Core constitution file loaded every session with essential rules |
| **GSD** | "Get Shit Done" - Multi-phase project management system |
| **Marketplace** | External repository containing community skills and plugins |
| **MCP** | Model Context Protocol - Extensibility system for Claude Code |
| **Router** | `/start-task` command that detects domains and routes to optimal workflow |
| **Skill** | Domain expertise module providing patterns and guidance |
| **Submodule** | Git submodule linking to external repository |
| **Token** | Unit of text processing; context limit management |
| **ULTRATHINK** | Maximum reasoning depth mode for complex tasks |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on:

- Adding skills (format, requirements, testing)
- Adding agents (model selection, tool access)
- Adding commands (argument handling, execution)
- Submitting pull requests (commit format, review process)
- Code style (markdown, YAML frontmatter)

### Quick Contribution

1. Fork the repository
2. Create feature branch: `git checkout -b feat/my-feature`
3. Make changes following existing patterns
4. Test with Claude Code
5. Commit with conventional format: `feat: add my-feature`
6. Push and create PR

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| **1.3.1** | Dec 2025 | Git hooks (pre-commit, commit-msg, pre-push), Claude Code lifecycle hooks (Stop, PreToolUse, PostToolUse), .gitignore cleanup |
| **1.3.0** | Dec 2025 | CLAUDE.md refactor (45% reduction, ~1,100 tokens), satellite guides, token optimization |
| **1.2.0** | Dec 2025 | 6 new marketplaces (21 total), GSD tutorial, `/discover-skills` command, skillsmp.com integration |
| **1.1.0** | Dec 2025 | 5 new skills (devops-cloud, ai-ml-development, game-development, macos-native, database-expert), 5 new agents, GSD integration |
| **1.0.0** | Dec 2025 | Initial release: 60+ skills, 30+ agents, 15 marketplaces, rules system |

See [CHANGELOG.md](./CHANGELOG.md) for complete history.

---

## Resources & Links

### Official Documentation

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code) - Official docs
- [Claude Code Hooks Guide](https://code.claude.com/docs/en/hooks-guide) - Lifecycle hooks
- [Claude Code Subagents](https://code.claude.com/docs/en/sub-agents) - Agent system
- [MCP Protocol](https://modelcontextprotocol.io) - Model Context Protocol
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) - Engineering blog

### Internal Documentation

- [Skills Catalog](./skills/MASTER_INDEX.md) - All 71 skills
- [Agents Catalog](./agents/README.md) - All 37 agents
- [Workflow Guide](./docs/WORKFLOW-GUIDE.md) - Workflow patterns
- [Marketplace Guide](./docs/MARKETPLACE-GUIDE.md) - All 21 marketplaces
- [GSD Tutorial](./docs/GSD-TUTORIAL.md) - Project management

### Community Resources

- [skillsmp.com](https://skillsmp.com/) - 35,530+ community skills
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) - Community resources
- [Claude Code Subreddit](https://reddit.com/r/ClaudeCode) - Community discussion

---

## License

MIT License - Use, modify, and distribute freely.

See [LICENSE](./LICENSE) for full text.

---

<div align="center">

## Ultimate Claude Code Toolkit

**71 Skills | 37 Agents | 21 Marketplaces | Complete Automation**

Transform Claude Code from a capable assistant into an enterprise-grade development environment.

---

*Built with care by Travis Neuman*

*Last Updated: December 2025*

</div>
