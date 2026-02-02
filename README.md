<div align="center">

```
              ##                                   mmmm                                mm                  mm
   ##         ""                                   ""##                                ##                 ##
 #######    ####     ##m####m             m#####m    ##       m#####m  ##    ##   m###m##   m####m       ##
   ##         ##     ##"   ##            ##"    "    ##       " mmm##  ##    ##  ##"  "##  ##mmmm##     ##
   ##         ##     ##    ##            ##          ##      m##"""##  ##    ##  ##    ##  ##""""""    m#"
   ##mmm      ##     ##    ##     ##     "##mmmm#    ##mmm   ##mmm###  ##mmm###  "##mm###  "##mmmm#   m#"
    """"      ##     ""    ""     ""       """""      """"    """" ""   """" ""    """ ""    """""   m#"
           ####"

```

### 🚀 The Most Comprehensive Claude Code Enhancement System Available

**Transform Claude Code from a capable AI assistant into an enterprise-grade development environment**

</div>

---

<div align="center">

[![Claude Code](https://img.shields.io/badge/Claude_Code-6366f1?style=for-the-badge&logo=anthropic&logoColor=white)](https://claude.com/claude-code)
[![Skills](https://img.shields.io/badge/Skills-72+-10b981?style=for-the-badge&logo=sparkles&logoColor=white)](./skills/MASTER_INDEX.md)
[![Agents](https://img.shields.io/badge/Agents-36+-f59e0b?style=for-the-badge&logo=robot&logoColor=white)](./agents/README.md)
[![Marketplaces](https://img.shields.io/badge/Marketplaces-67-3b82f6?style=for-the-badge&logo=store&logoColor=white)](./docs/MARKETPLACE-GUIDE.md)
[![Marketplace Skills](https://img.shields.io/badge/Marketplace_Skills-1900+-ec4899?style=for-the-badge&logo=package&logoColor=white)](./plugins/marketplaces/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](./LICENSE)

**Version 2.3.0** • **Last Updated: February 1, 2026** • **Author: [Travis Neuman](https://travisjneuman.com)**

</div>

---

## 📑 Table of Contents

<details>
<summary><strong>🔍 Click to expand full navigation</strong></summary>

### 🎯 Getting Started

- [📋 Executive Summary](#-executive-summary)
- [❓ What Problem Does This Solve?](#-what-problem-does-this-solve)
- [👥 Who Is This For?](#-who-is-this-for)
- [✨ Key Features at a Glance](#-key-features-at-a-glance)
- [🌐 Platform Compatibility](#-platform-compatibility)
- [⚡ Quick Start Guide](#-quick-start-guide)
- [📦 Installation](#-installation)
- [🔄 Multi-Machine Setup & Synchronization](#-multi-machine-setup--synchronization)

### 🏗️ Architecture

- [🏛️ Architecture Overview](#️-architecture-overview)
- [⚙️ How It Works](#️-how-it-works)
- [📁 Complete Directory Structure](#-complete-directory-structure)
- [🔧 Configuration Reference](#-configuration-reference)

### 📚 Complete References

- [🎓 Complete Skills Reference (72 Skills)](#-complete-skills-reference-72-skills)
- [🤖 Complete Agents Reference (36 Agents)](#-complete-agents-reference-36-agents)
- [🏪 Complete Marketplaces Reference (67 Marketplaces)](#-complete-marketplaces-reference-67-marketplaces)

### 🔒 Automation & Safety

- [🪝 Git Hooks System](#-git-hooks-system)
- [⚡ Claude Code Lifecycle Hooks](#-claude-code-lifecycle-hooks)
- [🔌 MCP Servers](#-mcp-servers)

### 🔄 Workflows

- [📊 Workflow Patterns](#-workflow-patterns)
- [🎯 The Universal Router (start-task)](#-the-universal-router-start-task)
- [📈 GSD Project Management System](#-gsd-project-management-system)
- [🧠 Decision Frameworks](#-decision-frameworks)
- [⌨️ Complete Commands Reference](#️-complete-commands-reference)

### 🛠️ Customization & Help

- [✏️ Customization Guide](#️-customization-guide)
- [💡 Best Practices](#-best-practices)
- [🔧 Troubleshooting](#-troubleshooting)
- [❓ Frequently Asked Questions](#-frequently-asked-questions)
- [📖 Glossary of Terms](#-glossary-of-terms)
- [📋 Templates](#-templates)

### 📎 Resources

- [🤝 Contributing](#-contributing)
- [📜 Version History](#-version-history)
- [🔗 Resources & Links](#-resources--links)
- [📄 License](#-license)

</details>

---

## 📋 Executive Summary

The **Ultimate Claude Code Toolkit** transforms [Claude Code](https://docs.anthropic.com/en/docs/claude-code) from a capable AI coding assistant into a comprehensive, enterprise-grade development environment. This is a complete configuration system for `~/.claude/` that provides:

### 📊 What You Get

|      Component      |  Count  | Description                                                                                                                                                                                 |
| :-----------------: | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|    🎓 **Skills**    | **72**  | Domain expertise modules covering iOS, Android, React, Vue, Svelte, DevOps, AI/ML, scientific computing, business strategy, and more                                                        |
|    🤖 **Agents**    | **36**  | Specialized AI subagents for deep expertise in code review, security auditing, architecture analysis, platform development, and creative work                                               |
| 🏪 **Marketplaces** | **67**  | External repositories containing **1,900+** additional skills from the community                                                                                                            |
|   ⌨️ **Commands**   | **30+** | Custom slash commands for task routing, skill discovery, decision frameworks, and workflow automation                                                                                       |
|    📋 **Rules**     | **17+** | Contextual guidelines for different tech stacks ([React](https://react.dev), [Python](https://python.org), [Go](https://go.dev), [Rust](https://rust-lang.org)), checklists, and automation |
|    🪝 **Hooks**     |  **5**  | Git hooks (pre-commit, commit-msg, pre-push) and Claude Code lifecycle hooks (PostToolUse for Prettier formatting)                                                                          |

### 💎 The Core Philosophy

|  #  | Principle                | Description                                                                             |
| :-: | :----------------------- | :-------------------------------------------------------------------------------------- |
| 🎯  | **Token Efficiency**     | CLAUDE.md is lean (~1,100 tokens). Detailed content loads on-demand only when relevant. |
| 🔍  | **Proactive Discovery**  | Skills, agents, and resources auto-activate based on task context.                      |
| 🔄  | **Workflow Flexibility** | Both natural language prompts and explicit `/start-task` routing work identically.      |
| 🔒  | **Safety First**         | Git hooks prevent secrets commits, enforce conventions, and block dangerous operations. |
| ⚡  | **Zero Configuration**   | Install once, everything works. No manual setup required for basic usage.               |

### 🆕 What's New in v2.0 (January 2026)

**Major Enhancements:** Complete integration of [Anthropic's Claude 4.5 best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices) with intelligent auto-activation PLUS autonomous coding framework.

| Feature                      | Description                                                                       | Auto-Activates When...                                                   |
| :--------------------------- | :-------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| 🤖 **Auto-Claude Framework** | Autonomous multi-agent coding with QA validation loops and git worktree isolation | Complexity 3-4 with well-defined requirements, or `/auto-claude` command |
| 🔬 **Research Methodology**  | Structured hypothesis tracking with confidence calibration                        | You say "research", "investigate", "compare approaches"                  |
| 🎨 **Frontend Aesthetics**   | Anti-"AI slop" design guidance (avoid generic fonts, colors)                      | You work on UI/frontend tasks                                            |
| ✅ **Solution Quality**      | Ensures code works for ALL inputs, not just tests                                 | You write implementations                                                |
| 🎯 **PROACTIVE Mode**        | Implements by default (vs suggesting), reads code first                           | Always active (configurable to CONSERVATIVE)                             |
| 📊 **Multi-Window State**    | Seamless continuation across context refreshes                                    | Complex projects with tests.json, progress.md                            |
| ⚡ **Parallel Tool Calls**   | Maximum efficiency by calling independent tools simultaneously                    | All operations                                                           |

**Result:** Autonomous feature implementation, more calibrated research, distinctive frontends, general solutions, faster iteration, perfect state persistence. See [CHANGELOG.md](CHANGELOG.md#200---january-3-2026) for complete details.

### 🆕 What's New in v2.1 (January 2026)

**Installation & Setup Improvements:** Zero-friction onboarding for new machines and users.

| Feature                  | Description                                               | Usage                                                                                                  |
| :----------------------- | :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| 🚀 **One-Line Install**  | Single curl command sets up everything automatically      | `curl -fsSL https://raw.githubusercontent.com/travisjneuman/.claude/master/scripts/install.sh \| bash` |
| 🔧 **Bootstrap Command** | Verifies and repairs configuration on any machine         | Run `/bootstrap` in Claude Code                                                                        |
| ⚡ **SessionStart Hook** | Automatic skill/agent routing without explicit invocation | Always active - domain keywords trigger routing                                                        |
| 🌐 **Cross-Platform**    | Full support for macOS, Linux, and Windows (via Git Bash) | Platform auto-detected during install                                                                  |

**Result:** New users get a fully working setup in under 1 minute. Existing users get automatic routing without needing `/start-task`. See [CHANGELOG.md](CHANGELOG.md#210---january-13-2026) for complete details.

### 🆕 What's New in v2.2 (January 2026)

**Showcase Website & Polish:** Live website at [claude.travisjneuman.com](https://claude.travisjneuman.com) plus documentation and tooling improvements.

| Feature                       | Description                                                                    | Details                                                          |
| :---------------------------- | :----------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| 🌐 **Showcase Website**       | Next.js site with 3D hero, interactive modals, and curated featured content    | Deployed on Cloudflare Pages at `claude.travisjneuman.com`       |
| 📦 **Pull All Repos Script**  | Cross-platform script to sync parent, marketplace, and custom project repos    | `~/.claude/_pull-all-repos.sh` with no_push enforcement          |
| 📝 **Documentation Overhaul** | Updated all docs for accuracy — agent counts, setup instructions, branding     | Fixed 37→36 agent count, updated setup flow, added skip-worktree |
| 🎨 **Branding: tjn.claude/**  | Consistent "tjn.claude/" branding across nav, hero, metadata, and social cards | OG image, Twitter cards, Discord embeds all working              |
| 🔧 **Setup Improvements**     | Get Started flow uses `setup-new-machine.sh` for complete automated setup      | Handles submodules, no_push, plugin registration, and hooks      |

**Result:** Professional web presence, accurate documentation, streamlined setup for new users. See [CHANGELOG.md](CHANGELOG.md) for complete details.

### 🆕 What's New in v2.3 (February 2026)

**Reliability & Automation:** Fixed broken Anthropic submodules, automated count updates, and comprehensive documentation pass.

| Feature                          | Description                                                                       | Details                                                               |
| :------------------------------- | :-------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| 🔧 **Submodule Fixes**          | Fixed broken `claude-code-plugins` and `claude-plugins-official` submodules       | Both Anthropic repos now initialize and pull correctly                 |
| 📊 **Auto Count Updates**       | `_pull-all-repos.sh` now automatically updates documentation counts after pulling | Skills, agents, and marketplace counts stay in sync with filesystem   |
| 📝 **Documentation Accuracy**   | Updated all docs with correct repo counts, step numbering, and script references  | Fixed stale references across SETUP-GUIDE, MAINTENANCE, FOLDER-STRUCTURE |
| 🔄 **68 Total Repos**           | All 68 repos (1 parent + 67 marketplace) pulling cleanly with zero failures       | Includes 4 official Anthropic repos and `superpowers-marketplace`     |

**Result:** Zero-failure repo syncing, self-maintaining documentation counts, accurate setup guides. See [CHANGELOG.md](CHANGELOG.md) for complete details.

---

## ❓ What Problem Does This Solve?

### 😕 The Challenge with Vanilla Claude Code

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) out-of-the-box is powerful but generic. Every session starts fresh. There's no:

- 📚 Accumulated domain expertise
- 📏 Consistent coding standards enforcement
- 🔗 Project continuity across sessions
- 🛤️ Specialized workflows for different tech stacks
- 🛡️ Automated safety checks

### ✅ What This Toolkit Provides

| Challenge                                      | Solution                                                                        |
| :--------------------------------------------- | :------------------------------------------------------------------------------ |
| 😤 "Claude doesn't know my project's patterns" | 📜 CLAUDE.md constitution loads every session with your standards               |
| 🔁 "I repeat the same instructions every time" | 🎓 Skills auto-load domain expertise when context matches                       |
| 📂 "Complex projects get disorganized"         | 📈 GSD system tracks multi-phase projects across sessions                       |
| 🔓 "I forget to check for security issues"     | 🔒 Git hooks auto-block secrets, security-auditor agent catches vulnerabilities |
| 🤔 "Each task requires different expertise"    | 🤖 36 specialized agents spawn for deep work automatically                      |
| ❓ "I don't know what tools are available"     | 🎯 Universal router detects domains and loads relevant resources                |
| 📝 "Claude gives generic advice"               | 🏪 1,900+ marketplace skills provide production-tested patterns                 |

---

## 👥 Who Is This For?

### 🎯 Primary Audience

| User Type                      | How They Benefit                                                                                                                                                                              |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 👨‍💻 **Professional Developers** | Production-ready patterns, security enforcement, code quality automation                                                                                                                      |
| 🔧 **Full-Stack Engineers**    | Stack-specific skills ([React](https://react.dev), [Next.js](https://nextjs.org), [NestJS](https://nestjs.com), etc.) with consistent patterns                                                |
| 📱 **Platform Engineers**      | iOS, Android, [Flutter](https://flutter.dev), [React Native](https://reactnative.dev), [Electron](https://electronjs.org) skills and agents                                                   |
| ☁️ **DevOps/SRE**              | [AWS](https://aws.amazon.com), [GCP](https://cloud.google.com), [Azure](https://azure.microsoft.com), [Kubernetes](https://kubernetes.io), [Terraform](https://terraform.io), CI/CD expertise |
| 👔 **Technical Leads**         | Architecture analysis, code review, refactoring patterns                                                                                                                                      |
| 🚀 **Startup Founders**        | Business strategy, monetization, product management skills                                                                                                                                    |
| 🧠 **AI/ML Engineers**         | [PyTorch](https://pytorch.org), [TensorFlow](https://tensorflow.org), LLM integration, MLOps patterns                                                                                         |
| 🔬 **Scientific Researchers**  | 125+ scientific skills for bioinformatics, chemistry, physics                                                                                                                                 |

### 📋 Prerequisites

| Requirement            | Description                                                          |
| :--------------------- | :------------------------------------------------------------------- |
| 🤖 **Claude Code CLI** | [Installation guide](https://docs.anthropic.com/en/docs/claude-code) |
| 🔀 **Git**             | For submodule management                                             |
| 📦 **Node.js**         | For Prettier formatting hooks                                        |
| 💻 **Command Line**    | Basic familiarity                                                    |

---

## ✨ Key Features at a Glance

### 🎯 Intelligent Task Routing

```
You say: "Build a login form with validation"
System automatically:
├── 📜 Loads CLAUDE.md context
├── 🔍 Detects: Development domain, React/Web context
├── 🎓 Activates: generic-react-feature-developer skill
├── 📊 Scores complexity: 2 (medium)
├── 🎯 Routes to: EnterPlanMode
└── ✅ After completion: Triggers code-reviewer agent
```

### 📈 Multi-Phase Project Management

```
You say: "Build a complete authentication system"
System:
├── 📊 Scores complexity: 5 (high)
├── 📈 Routes to: GSD (Get Shit Done)
├── 📁 Creates: .planning/STATE.md
├── 📋 Breaks into phases:
│   ├── Phase 1: Database & Models
│   ├── Phase 2: API Endpoints
│   ├── Phase 3: Frontend Integration
│   └── Phase 4: Testing & Documentation
└── 🔄 Tracks progress across sessions
```

### 🤖 Autonomous Coding (Auto-Claude)

**The 22nd marketplace integration** - Autonomous multi-agent framework for complex feature implementation.

```
You say: "/auto-claude Add user authentication with JWT tokens"
System:
├── 📊 Analyzes codebase structure (30 seconds)
├── 📝 Generates implementation specification (1-2 minutes)
├── 🌿 Creates isolated git worktree (safe development)
├── 🤖 Autonomous multi-agent implementation (5-15 minutes):
│   ├── Planner agent creates subtask plan
│   ├── Coder agent implements features
│   ├── QA agent validates acceptance criteria
│   └── Fixer agent resolves issues in loop
├── 🧠 Uses Graphiti memory for context retention (optional)
└── ✅ Returns completed code for review (5-10 minutes)

Total time: 15-30 minutes for most features
Configuration: ~/.auto-claude/.env (OAuth token from /settings)
See: docs/AUTO-CLAUDE-GUIDE.md
```

**When to Use Auto-Claude:**

- ✅ Complexity 3-4: Well-defined features in established codebases
- ✅ Repetitive tasks (CRUD, forms, API endpoints, auth flows)
- ✅ You prefer autonomous implementation with review-at-end
- ❌ Complexity 1-2: Use manual `/start-task` instead
- ❌ Complexity 5+: Use GSD for multi-phase projects
- ❌ Greenfield projects or exploratory work

**Workflow Comparison:**

| Aspect         | Manual (/start-task)  | Auto-Claude      | GSD            |
| -------------- | --------------------- | ---------------- | -------------- |
| **Complexity** | 1-2                   | 3-4              | 5+             |
| **Control**    | Maximum               | Medium           | Structured     |
| **Speed**      | Slower                | Faster           | Phased         |
| **Review**     | Each step             | End              | Per phase      |
| **Isolation**  | Main branch           | Git worktree     | .planning/     |
| **Best for**   | Learning, exploration | Defined features | Large projects |

### 🔒 Automatic Safety Enforcement

```
🪝 Git hooks enforce:
├── 📝 pre-commit: Block secrets, validate SKILL.md files
├── 💬 commit-msg: Require conventional commit format
└── 🚀 pre-push: Block force-push to protected branches

⚡ Claude Code hooks enforce:
├── 🛡️ PreToolUse: Block dangerous commands (rm -rf /, format c:)
├── ✨ PostToolUse: Auto-run Prettier on Write/Edit
├── 📣 Stop: Send notification when awaiting input
└── 📊 SessionStart: Display toolkit status
```

---

## 🌐 Platform Compatibility

This toolkit is **fully cross-platform** and works on Windows, macOS, and Linux.

| Platform                                 | Status | Requirements                        |
| :--------------------------------------- | :----: | :---------------------------------- |
| **Windows 10/11**                        |   ✅   | Git for Windows (includes Git Bash) |
| **macOS** (Intel/Apple Silicon)          |   ✅   | Git, Xcode CLI Tools                |
| **Linux** (Ubuntu, Debian, Fedora, etc.) |   ✅   | Git, bash                           |

### 🔧 Platform-Specific Notes

<details>
<summary><strong>🪟 Windows</strong></summary>

**Requirements:**

- [Git for Windows](https://git-scm.com/download/win) - includes Git Bash which provides POSIX compatibility
- Claude Code CLI installed via npm

**Notes:**

- All bash scripts run in Git Bash automatically
- PowerShell toast notifications work natively
- Path: `C:\Users\<username>\.claude\`

**Verification:**

```powershell
# Check Git Bash is available
where bash

# Verify Claude Code
claude --version
```

</details>

<details>
<summary><strong>🍎 macOS</strong></summary>

**Requirements:**

- Git (via Xcode CLI Tools or Homebrew)
- Claude Code CLI installed via npm

**Notes:**

- Native `osascript` notifications supported
- Works with both bash and zsh shells
- Path: `~/.claude/`

**Verification:**

```bash
# Check git is available
git --version

# Verify Claude Code
claude --version
```

</details>

<details>
<summary><strong>🐧 Linux</strong></summary>

**Requirements:**

- Git
- Claude Code CLI installed via npm
- Optional: `notify-send` for desktop notifications

**Notes:**

- All scripts use POSIX-compatible bash
- Notifications via `notify-send` (install: `apt install libnotify-bin`)
- Path: `~/.claude/`

**Verification:**

```bash
# Check git is available
git --version

# Verify Claude Code
claude --version

# Optional: Check notification support
which notify-send
```

</details>

### 🔄 Cross-Platform Commands

All toolkit commands use cross-platform syntax:

| Component          | Cross-Platform Approach                                             |
| :----------------- | :------------------------------------------------------------------ |
| **Shell scripts**  | POSIX bash (Git Bash on Windows)                                    |
| **Git operations** | Native git commands                                                 |
| **File paths**     | `~/.claude/` expands correctly on all platforms                     |
| **Notifications**  | OS-detected: PowerShell (Win), osascript (Mac), notify-send (Linux) |
| **Date/time**      | Standard `date` command (GNU/BSD compatible)                        |

---

## ⚡ Quick Start Guide

### 🏃 5-Minute Setup

**Works on: Arch Linux | macOS | Windows (Git Bash)**

```bash
# 1️⃣ Backup existing config
mv ~/.claude ~/.claude-backup 2>/dev/null

# 2️⃣ Clone the toolkit
git clone https://github.com/travisjneuman/.claude.git ~/.claude

# 3️⃣ Initialize marketplace repos with correct upstream remotes (CRITICAL!)
bash ~/.claude/scripts/init-marketplaces.sh

# 4️⃣ Complete setup (plugins, hooks, verification)
bash ~/.claude/scripts/setup-new-machine.sh

# 5️⃣ Start Claude Code
claude
```

> **⚠️ IMPORTANT:** Always run `init-marketplaces.sh` on new devices. This ensures marketplace repos fetch from their original upstreams (not your personal repo) and have push disabled.

### 🎬 Your First Task

Just describe what you want:

```
"Build a REST API with user authentication"
```

The system automatically:

1. 🔍 Detects development domain
2. 🎓 Loads relevant skills (api-design, security)
3. 📊 Scores complexity (routes to GSD or Planning)
4. ✅ Tracks progress with TodoWrite
5. 🔎 Reviews code when complete

### 🔀 Alternative: Explicit Routing

```
/start-task Build a REST API with user authentication
```

Same result, but shows the routing process explicitly.

---

## 📦 Installation

### 🚀 One-Line Install (Recommended)

**macOS / Linux / Windows (Git Bash):**

```bash
curl -fsSL https://raw.githubusercontent.com/travisjneuman/.claude/master/scripts/install.sh | bash
```

This script:

- ✅ Checks prerequisites (git, node, claude-code)
- ✅ Clones with all submodules
- ✅ Configures marketplace repos as read-only (no accidental pushes)
- ✅ Creates platform-specific MCP configuration
- ✅ Verifies installation

After install, run `/bootstrap` to verify everything is configured correctly.

### 🆕 Manual Installation

```bash
# Step 1️⃣: Backup existing Claude Code config
mv ~/.claude ~/.claude-backup 2>/dev/null

# Step 2️⃣: Clone this repository with submodules
git clone --recurse-submodules https://github.com/travisjneuman/.claude.git ~/.claude

# Step 3️⃣: Configure marketplace repos as read-only
for repo in ~/.claude/plugins/marketplaces/*/; do
    (cd "$repo" && git remote set-url --push origin no_push)
done

# Step 4️⃣: Verify installation
claude
```

### 🔄 Update Existing Installation

```bash
cd ~/.claude

# Pull latest changes
git pull origin master

# Update all marketplace submodules
git submodule update --remote --merge

# Or use the convenience script
bash scripts/update-external-repos.sh
```

### ✅ Verify Installation

```bash
# Start Claude Code
claude

# Test the router
/start-task Create a simple todo app

# List available skills
/list-skills
```

### 💻 Platform-Specific Notes

#### 🪟 Windows

Git hooks run in Git Bash. Ensure:

- ✅ Git Bash is installed (comes with [Git for Windows](https://git-scm.com/download/win))
- ✅ Line endings are LF (not CRLF)
- ✅ Scripts are executable in Git Bash context

#### 🍎 macOS / 🐧 Linux

Standard installation works out of the box.

---

## 🔄 Multi-Machine Setup & Synchronization

This toolkit is designed to be **cloned and synced across any number of development machines**. This section explains the architecture and setup process for engineers working across multiple systems.

### 🏗️ Two-Layer Architecture

The plugin system has **two distinct layers** that work together:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        LAYER 1: GIT SUBMODULES                               │
│                     (Your repo's external dependencies)                      │
│                                                                              │
│  ~/.claude/plugins/marketplaces/                                            │
│  ├── anthropic-agent-skills/     ← submodule (ignore=all, no_push)          │
│  ├── claude-code-plugins/        ← submodule (ignore=all, no_push)          │
│  ├── taches-cc-resources/        ← submodule (ignore=all, no_push)          │
│  ├── obra-superpowers/           ← submodule (ignore=all, no_push)          │
│  └── ... (50 total external repos)                                          │
│                                                                              │
│  • Updated via: git submodule update --remote --merge                       │
│  • Changes NOT tracked in parent repo (ignore=all)                          │
│  • Push BLOCKED to upstream (no_push configured)                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     LAYER 2: CLAUDE CODE PLUGIN SYSTEM                       │
│                    (Claude's internal plugin registry)                       │
│                                                                              │
│  ~/.claude/plugins/                                                         │
│  ├── known_marketplaces.json     ← Registered marketplaces                  │
│  ├── installed_plugins.json      ← Installed plugins                        │
│  └── cache/                      ← Plugin file cache                        │
│                                                                              │
│  • Managed via: claude plugin marketplace add/install                       │
│  • Points TO the submodule directories                                      │
│  • Must be configured on each new machine                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🆕 Setting Up on a New Machine

**Works on: Arch Linux | macOS | Windows (Git Bash)**

> **See also:** [docs/NEW-DEVICE-SETUP.md](./docs/NEW-DEVICE-SETUP.md) for detailed cross-platform instructions.

When you clone this repo to a new development machine, follow these steps:

```bash
# ═══════════════════════════════════════════════════════════════════════════
# STEP 1: Clone the repository
# ═══════════════════════════════════════════════════════════════════════════
git clone https://github.com/travisjneuman/.claude.git ~/.claude
cd ~/.claude

# ═══════════════════════════════════════════════════════════════════════════
# STEP 2: Initialize marketplace repos with correct upstream remotes (CRITICAL!)
# ═══════════════════════════════════════════════════════════════════════════
# This script clones all 67 marketplace repos from their ORIGINAL upstreams
# and configures no_push to prevent accidental modifications.
#
# ⚠️ This is the most important step! Without it, marketplace repos may have
# wrong remote URLs (pointing to your personal repo instead of upstreams).
bash scripts/init-marketplaces.sh

# ═══════════════════════════════════════════════════════════════════════════
# STEP 3: Complete setup (optional but recommended)
# ═══════════════════════════════════════════════════════════════════════════
# Registers marketplaces, installs plugins, sets up hooks
bash scripts/setup-new-machine.sh

# ═══════════════════════════════════════════════════════════════════════════
# STEP 4: Configure machine-specific settings (optional)
# ═══════════════════════════════════════════════════════════════════════════
# Create a .env.local file for directories and settings unique to this machine.
# This file is gitignored — it won't affect other users.
cp .env.example .env.local
# Edit .env.local and set your custom project directories:
#   CUSTOM_PROJECT_DIRS="/path/to/your/projects"

# ═══════════════════════════════════════════════════════════════════════════
# STEP 5: Register marketplaces with Claude Code's plugin system
# ═══════════════════════════════════════════════════════════════════════════
# These commands tell Claude Code where to find the plugins

# Required marketplaces (used by settings.json enabledPlugins)
claude plugin marketplace add anthropics/claude-code
claude plugin marketplace add ~/.claude/plugins/marketplaces/anthropic-agent-skills
claude plugin marketplace add ~/.claude/plugins/marketplaces/taches-cc-resources
claude plugin marketplace add ~/.claude/plugins/marketplaces/obra-superpowers

# ═══════════════════════════════════════════════════════════════════════════
# STEP 6: Install enabled plugins
# ═══════════════════════════════════════════════════════════════════════════
# Install plugins that are enabled in settings.json

# From claude-code-plugins (official Anthropic)
claude plugin install agent-sdk-dev@claude-code-plugins
claude plugin install pr-review-toolkit@claude-code-plugins
claude plugin install commit-commands@claude-code-plugins
claude plugin install feature-dev@claude-code-plugins
claude plugin install security-guidance@claude-code-plugins
claude plugin install code-review@claude-code-plugins
claude plugin install frontend-design@claude-code-plugins
claude plugin install claude-opus-4-5-migration@claude-code-plugins
claude plugin install plugin-dev@claude-code-plugins
claude plugin install ralph-wiggum@claude-code-plugins

# From anthropic-agent-skills
claude plugin install document-skills@anthropic-agent-skills
claude plugin install example-skills@anthropic-agent-skills

# From taches-cc-resources
claude plugin install taches-cc-resources@taches-cc-resources

# From superpowers-marketplace
claude plugin install superpowers@superpowers-marketplace

# ═══════════════════════════════════════════════════════════════════════════
# STEP 7: Restore no_push (Claude may have overwritten during marketplace add)
# ═══════════════════════════════════════════════════════════════════════════
bash scripts/update-external-repos.sh

# ═══════════════════════════════════════════════════════════════════════════
# STEP 8: Verify setup
# ═══════════════════════════════════════════════════════════════════════════
claude doctor
```

### 📜 Quick Setup Script

For convenience, you can create a setup script for new machines. Save this as `scripts/setup-new-machine.sh`:

```bash
#!/bin/bash
# Setup script for new machines
# Run from ~/.claude directory

set -e
echo "=== Setting up Claude Code toolkit on new machine ==="

# Step 1: Submodules
echo "Initializing submodules..."
git submodule update --init --recursive

# Step 2: No-push protection
echo "Configuring no_push protection..."
for dir in plugins/marketplaces/*/; do
    (cd "$dir" && git remote set-url --push origin no_push 2>/dev/null) || true
done

# Step 3: Register marketplaces
echo "Registering marketplaces with Claude Code..."
claude plugin marketplace add anthropics/claude-code 2>/dev/null || true
claude plugin marketplace add ~/.claude/plugins/marketplaces/anthropic-agent-skills 2>/dev/null || true
claude plugin marketplace add ~/.claude/plugins/marketplaces/taches-cc-resources 2>/dev/null || true
claude plugin marketplace add ~/.claude/plugins/marketplaces/obra-superpowers 2>/dev/null || true

# Step 4: Install plugins
echo "Installing enabled plugins..."
claude plugin install agent-sdk-dev@claude-code-plugins 2>/dev/null || true
claude plugin install pr-review-toolkit@claude-code-plugins 2>/dev/null || true
claude plugin install commit-commands@claude-code-plugins 2>/dev/null || true
claude plugin install feature-dev@claude-code-plugins 2>/dev/null || true
claude plugin install security-guidance@claude-code-plugins 2>/dev/null || true
claude plugin install code-review@claude-code-plugins 2>/dev/null || true
claude plugin install frontend-design@claude-code-plugins 2>/dev/null || true
claude plugin install claude-opus-4-5-migration@claude-code-plugins 2>/dev/null || true
claude plugin install plugin-dev@claude-code-plugins 2>/dev/null || true
claude plugin install ralph-wiggum@claude-code-plugins 2>/dev/null || true
claude plugin install document-skills@anthropic-agent-skills 2>/dev/null || true
claude plugin install example-skills@anthropic-agent-skills 2>/dev/null || true
claude plugin install taches-cc-resources@taches-cc-resources 2>/dev/null || true
claude plugin install superpowers@superpowers-marketplace 2>/dev/null || true

# Step 5: Re-apply no_push (Claude overwrites during marketplace add)
echo "Re-applying no_push protection..."
bash scripts/update-external-repos.sh

echo "=== Setup complete! Run 'claude doctor' to verify ==="
```

### 🔒 Security: The no_push Protection

**Critical:** All 67 external repositories are configured with `no_push` to prevent accidental pushes to upstream repos you don't own.

```bash
# Check no_push configuration on any repo
cd ~/.claude/plugins/marketplaces/claude-code-plugins
git remote -v

# Expected output:
# origin  https://github.com/anthropics/claude-code.git (fetch)
# origin  no_push (push)

# If push URL is NOT "no_push", fix it:
git remote set-url --push origin no_push
```

**What this protects against:**

- ❌ Accidentally pushing local changes to Anthropic's repos
- ❌ Pushing to community repos you don't maintain
- ❌ Git credential issues causing unexpected pushes

**The only repo you should ever push to:** Your own `~/.claude` repo (e.g., `travisjneuman/.claude`)

### 🔄 Updating External Repos

To pull latest changes from all external marketplace repos:

```bash
# Use the convenience script (recommended)
bash ~/.claude/scripts/update-external-repos.sh

# This script:
# 1. Updates all submodules from their remotes
# 2. Verifies/restores no_push on each repo
# 3. Shows status of each update
```

**Manual update (if needed):**

```bash
cd ~/.claude
git submodule update --remote --merge
```

### ⚠️ Known Quirk: Claude Code Marketplace Updates

When Claude Code updates a GitHub-sourced marketplace (like `claude-code-plugins`), it may **re-clone** the repo, overwriting your submodule and removing `no_push`.

**After running `claude plugin marketplace update`:**

```bash
# Always run this after Claude marketplace updates
bash ~/.claude/scripts/update-external-repos.sh
```

This restores the submodule state and re-applies `no_push` protection.

### 📁 External Repositories Reference

All external repos in `~/.claude/plugins/marketplaces/`:

| Repository                        | Source                             | Description                                       |
| :-------------------------------- | :--------------------------------- | :------------------------------------------------ |
| `anthropic-agent-skills`          | anthropics/skills                  | Official Anthropic skills (PDF, DOCX, XLSX, PPTX) |
| `claude-code-plugins`             | anthropics/claude-code             | Official plugins (PR review, commit, feature-dev) |
| `claude-plugins-official`         | anthropics/claude-plugins-official | Official plugin marketplace                       |
| `taches-cc-resources`             | glittercowboy/taches-cc-resources  | Skills & commands for productivity                |
| `get-shit-done`                   | glittercowboy/get-shit-done        | GSD project management system                     |
| `obra-superpowers`                | obra/superpowers-marketplace       | Superpowers skills collection                     |
| `auto-claude`                     | AndyMik90/Auto-Claude              | Autonomous coding framework                       |
| `claude-mem`                      | thedotmack/claude-mem              | Persistent memory system                          |
| `awesome-claude-skills`           | ComposioHQ/awesome-claude-skills   | Community skills collection                       |
| `skill-seekers`                   | yusufkaraaslan/Skill_Seekers       | Skill discovery                                   |
| `claude-scientific-skills`        | K-Dense-AI/...                     | Scientific computing skills                       |
| + 10 more                         | Various                            | Community marketplaces                            |

### 🔧 Troubleshooting Multi-Machine Setup

#### ❌ Marketplace repos have wrong remote URLs

This is the most common issue when cloning to a new device. Marketplace repos may point to your personal repo instead of the original upstreams.

```bash
# Fix all remotes at once (recommended)
bash ~/.claude/scripts/fix-remotes.sh

# Or reinitialize all marketplace repos from scratch
bash ~/.claude/scripts/init-marketplaces.sh
```

#### ❌ Main repo cannot push to GitHub

```bash
# Check current remotes
cd ~/.claude
git remote -v

# Fix if pointing to wrong URL or has no_push
git remote set-url origin https://github.com/travisjneuman/.claude.git
git remote set-url --push origin https://github.com/travisjneuman/.claude.git
```

#### ❌ "Plugin not found in marketplace"

```bash
# Verify marketplace is registered
claude plugin marketplace list

# If missing, re-add it
claude plugin marketplace add ~/.claude/plugins/marketplaces/[name]

# Then install the plugin
claude plugin install [plugin]@[marketplace]
```

#### ❌ Submodule directory is empty

```bash
# Reinitialize marketplace repos
bash ~/.claude/scripts/init-marketplaces.sh
```

#### ❌ "no_push" is missing on marketplace repo

```bash
# Fix single repo
cd ~/.claude/plugins/marketplaces/[name]
git remote set-url --push origin no_push

# Or fix all repos at once
bash ~/.claude/scripts/fix-remotes.sh
```

#### ❌ Claude doctor shows plugin errors

Run the full setup sequence:

```bash
bash ~/.claude/scripts/init-marketplaces.sh
bash ~/.claude/scripts/setup-new-machine.sh
```

### 📋 Files That Sync vs Don't Sync

| Syncs with Git (in your repo)    | Does NOT sync (machine-specific)  |
| :------------------------------- | :-------------------------------- |
| `CLAUDE.md`                      | `plugins/known_marketplaces.json` |
| `settings.json`                  | `plugins/installed_plugins.json`  |
| `rules/`, `skills/`, `commands/` | `plugins/cache/`                  |
| `.gitmodules`                    | Submodule working directories     |
| `scripts/`                       | Claude Code's internal state      |

**Key insight:** Your repo tracks the **configuration** (settings.json, .gitmodules), but each machine must **initialize** the submodules and **register** marketplaces with Claude Code locally.

---

## 🏛️ Architecture Overview

### 📊 System Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            👤 USER PROMPT                                    │
│                      "Build an iOS app with SwiftUI"                         │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      📜 CLAUDE.MD (Constitution)                             │
│                     ~1,100 tokens, always loaded                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │  🎭 Identity │ │   🔒 P0s    │ │ 🔄 Workflow │ │ 🛡️ Safety   │            │
│  │    & Role   │ │  (Security, │ │   Patterns  │ │   Rules     │            │
│  │             │ │  Data, etc.)│ │             │ │             │            │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘            │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                  🎯 UNIVERSAL ROUTER (/start-task)                           │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  🔍 Step 1: Research Triggers    🧠 Step 2: Memory Check              │   │
│  │  - "latest", "current"           - Query claude-mem                   │   │
│  │  - Version queries               - Load relevant context              │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  🏷️ Step 3: Domain Detection     📊 Step 4: Complexity Scoring        │   │
│  │  - Development (23 domains)      - Multiple components: +3            │   │
│  │  - Scientific (8 domains)        - Architecture work: +2              │   │
│  │  - Business (16 domains)         - Single file fix: -2                │   │
│  │  - Creative (6 domains)          - Quick/simple: -2                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
           ┌───────────┐  ┌───────────┐  ┌───────────┐
           │ 📈 GSD    │  │ 📝 PLANNING│  │ ⚡ DIRECT │
           │ Score ≥5  │  │ Score 3-4 │  │ Score ≤0  │
           └─────┬─────┘  └─────┬─────┘  └─────┬─────┘
                 │              │              │
                 ▼              ▼              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        📦 RESOURCE LOADING                                   │
│                                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ 🎓 SKILLS   │  │ 🤖 AGENTS   │  │ 📋 RULES    │  │ 🏪 MARKET-  │         │
│  │  72 local   │  │ 36 experts  │  │  Checklists │  │   PLACES    │         │
│  │             │  │  (Task tool)│  │  & stacks   │  │ 1,900+ more │         │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ⚙️ EXECUTION                                       │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  1️⃣ Load skills    2️⃣ Track with TodoWrite                          │    │
│  │  3️⃣ Spawn agents   4️⃣ Apply post-work automation                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ✅ POST-WORK AUTOMATION                                 │
│                                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                 │
│  │ 🔎 Code Review │  │ 📊 Type Check  │  │ 💾 Commit      │                 │
│  │  (automatic)   │  │  (if types)    │  │  (on request)  │                 │
│  └────────────────┘  └────────────────┘  └────────────────┘                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🔗 Component Relationships

```
~/.claude/
│
├── 📜 CLAUDE.md (Constitution)
│   └── Always loaded, references other files contextually
│
├── 🎓 skills/ (72 skills)
│   └── Loaded when domain context matches
│
├── 🤖 agents/ (36 agents)
│   └── Spawned via Task tool for deep expertise
│
├── ⌨️ commands/ (30+ commands)
│   └── Invoked explicitly via /command-name
│
├── 📋 rules/ (contextual guidelines)
│   ├── 📝 checklists/ (task-type specific)
│   ├── 🛠️ stacks/ (technology-specific)
│   └── 🔧 tooling/ (setup guides)
│
├── 🏪 plugins/marketplaces/ (67 repos, 1,900+ skills)
│   └── Searched when local skills insufficient
│
└── 📚 docs/ (extended documentation)
    └── Loaded for detailed reference
```

---

## ⚙️ How It Works

### 📊 The Loading Hierarchy

1. **🔄 Always Loaded (Every Session)**
   - `CLAUDE.md` (~1,100 tokens) - Core constitution
   - `settings.json` - Permissions and hooks

2. **🎯 Loaded on Domain Match**
   - Relevant skill(s) from `skills/`
   - Relevant rule(s) from `rules/`

3. **📝 Loaded on Request**
   - Specific agent via Task tool
   - Marketplace skills via search
   - Decision frameworks via `/consider:*`

4. **📚 Loaded for Reference**
   - Documentation files in `docs/`
   - Templates in `templates/`

### 💰 Token Efficiency Design

| Component            | Token Cost | When Loaded        |
| :------------------- | :--------: | :----------------- |
| 📜 CLAUDE.md         |   ~1,100   | Every session      |
| 🎓 Single skill      | ~500-1,500 | On domain match    |
| 🤖 Agent definition  |  ~300-800  | When spawned       |
| 📋 Rule/checklist    | ~400-1,000 | On context match   |
| 🏪 Marketplace skill | ~500-2,000 | On explicit search |

**📈 Comparison:** Loading everything would cost ~50,000+ tokens. This system typically uses ~2,000-5,000 tokens for context.

---

## 🏛️ Deep Architecture

This section provides an in-depth technical analysis of how the toolkit functions internally. Understanding these mechanisms enables advanced customization and optimization.

### 📊 Token Economy Deep Dive

The toolkit is architected around a fundamental constraint: **Claude Code's context window is finite**. Every design decision prioritizes token efficiency.

#### 💰 Token Budget Analysis

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CONTEXT WINDOW BUDGET                                 │
│                      (Typical 200,000 token limit)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ SYSTEM PROMPT + CLAUDE.MD (~1,100 tokens)                    ██      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ SETTINGS.JSON (~500 tokens)                                   █      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ LOADED SKILLS (0-72 skills × 500-1500 each)               ████████    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ MCP SERVER DEFINITIONS (if enabled, ~500-2000 each)       ██████     │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ CONVERSATION HISTORY (grows with interaction)                        │   │
│  │ ████████████████████████████████████████████████████████████████████ │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ TOOL RESULTS & FILE CONTENT                                          │   │
│  │ ████████████████████████████████████████████████████████████         │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ AVAILABLE HEADROOM FOR OUTPUT                           ████████     │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 📐 Token Cost Reference Table

| Component                   | Min Tokens | Max Tokens | Typical | Notes                           |
| :-------------------------- | :--------: | :--------: | :-----: | :------------------------------ |
| **CLAUDE.md**               |   1,000    |   1,200    |  1,100  | Always loaded, highly optimized |
| **settings.json**           |    400     |    600     |   500   | Permissions and hooks           |
| **Single Skill**            |    300     |   2,000    |   800   | Varies by domain complexity     |
| **Single Agent Definition** |    200     |    500     |   350   | Spawning adds more              |
| **Rule/Checklist**          |    300     |   1,500    |   600   | Contextual guidelines           |
| **MCP Server (disabled)**   |     0      |     0      |    0    | Zero cost when disabled         |
| **MCP Server (enabled)**    |    400     |   2,500    |  1,200  | Tools add to definition         |
| **Marketplace Skill**       |    300     |   3,000    |  1,000  | External, varies widely         |

#### 🧮 Budget Scenarios

**Scenario A: Minimal Session (Simple Task)**

```
CLAUDE.md:                    1,100 tokens
settings.json:                  500 tokens
1 auto-loaded skill:            800 tokens
────────────────────────────────────────────
TOTAL CONTEXT COST:           2,400 tokens  ✅ Excellent
Available for work:         197,600 tokens
```

**Scenario B: Standard Session (Feature Development)**

```
CLAUDE.md:                    1,100 tokens
settings.json:                  500 tokens
3 auto-loaded skills:         2,400 tokens
1 rule/checklist:               600 tokens
────────────────────────────────────────────
TOTAL CONTEXT COST:           4,600 tokens  ✅ Good
Available for work:         195,400 tokens
```

**Scenario C: Heavy Session (Complex Multi-Domain)**

```
CLAUDE.md:                    1,100 tokens
settings.json:                  500 tokens
5 loaded skills:              4,000 tokens
2 rules/checklists:           1,200 tokens
2 MCP servers enabled:        2,400 tokens
────────────────────────────────────────────
TOTAL CONTEXT COST:           9,200 tokens  ⚠️ Heavy
Available for work:         190,800 tokens
```

**Scenario D: Anti-Pattern (Everything Enabled)**

```
CLAUDE.md:                    1,100 tokens
settings.json:                  500 tokens
All 72 skills loaded:        56,800 tokens  ❌ Never do this!
All 36 agents defined:       12,950 tokens
All MCP servers:              8,400 tokens
────────────────────────────────────────────
TOTAL CONTEXT COST:          79,750 tokens  🚫 UNACCEPTABLE
Available for work:         120,250 tokens
```

### 🔄 Component Interaction Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                          USER MESSAGE                                         │
│                     "Build a login form"                                      │
└────────────────────────────────┬─────────────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                      1️⃣ CLAUDE.MD PROCESSING                                  │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  📜 IDENTITY & ROLE                                                      │ │
│  │  - "Lead Autonomous Engineer"                                            │ │
│  │  - Default thinking: ULTRATHINK                                          │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  🔒 P0 NON-NEGOTIABLES CHECK                                             │ │
│  │  - ✅ Data integrity: OK (creating, not modifying)                       │ │
│  │  - ✅ Security: Will validate inputs                                     │ │
│  │  - ✅ Coherence: Check existing patterns first                           │ │
│  │  - ✅ Atomic delivery: Small diffs planned                               │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  🔄 WORKFLOW DETERMINATION                                               │ │
│  │  - Is this complex? → Check complexity score                             │ │
│  │  - Existing project? → Check .planning/STATE.md                          │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────┬─────────────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                       2️⃣ CONTEXT DETECTION                                    │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  📁 PROJECT DETECTION                                                    │ │
│  │  - package.json exists? → Node.js project                                │ │
│  │  - tsconfig.json? → TypeScript                                           │ │
│  │  - react in dependencies? → React project                                │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  🏷️ KEYWORD ANALYSIS                                                     │ │
│  │  - "login form" → auth-related, UI-related                               │ │
│  │  - "build" → new feature, implementation work                            │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  📊 COMPLEXITY SCORING                                                   │ │
│  │  - "build" → +3 (new feature)                                            │ │
│  │  - Single component → no modifier                                        │ │
│  │  - "form" → implies validation → +1                                      │ │
│  │  - TOTAL: 4 → Routes to Planning Mode                                    │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────┬─────────────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                      3️⃣ SKILL ACTIVATION                                      │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  🔍 SKILL MATCHING (Priority Order)                                      │ │
│  │                                                                          │ │
│  │  1. Check: React project detected?                                       │ │
│  │     → ✅ YES: Activate generic-react-feature-developer                   │ │
│  │                                                                          │ │
│  │  2. Check: Form/UI work?                                                 │ │
│  │     → ✅ YES: Activate generic-react-design-system                       │ │
│  │                                                                          │ │
│  │  3. Check: Auth/security mentioned?                                      │ │
│  │     → ✅ YES: Activate security skill (for best practices)               │ │
│  │                                                                          │ │
│  │  4. Check: Need to understand existing patterns?                         │ │
│  │     → Read existing form components first                                │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  📦 SKILLS LOADED                                                        │ │
│  │  [generic-react-feature-developer] + 800 tokens                          │ │
│  │  [generic-react-design-system]     + 650 tokens                          │ │
│  │  [security]                        + 500 tokens                          │ │
│  │  ─────────────────────────────────────────                               │ │
│  │  TOTAL SKILL COST:                 1,950 tokens                          │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────┬─────────────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                       4️⃣ RULE ACTIVATION                                      │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  📋 RULE MATCHING                                                        │ │
│  │                                                                          │ │
│  │  - UI/Visual work detected                                               │ │
│  │    → Load: rules/checklists/ui-visual-changes.md                         │ │
│  │                                                                          │ │
│  │  - React + TypeScript stack                                              │ │
│  │    → Load: rules/stacks/react-typescript.md                              │ │
│  │                                                                          │ │
│  │  TOTAL RULE COST:                  1,100 tokens                          │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────┬─────────────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                     5️⃣ EXECUTION BEGINS                                       │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  📝 PLANNING MODE ACTIVATED (complexity score ≥ 3)                       │ │
│  │                                                                          │ │
│  │  1. Create plan file: tasks/login-form.md                                │ │
│  │  2. Research existing patterns in codebase                               │ │
│  │  3. Document approach with reasoning                                     │ │
│  │  4. Request user approval                                                │ │
│  │  5. (After approval) Execute implementation                              │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  📊 TODOWRITE TRACKING                                                   │ │
│  │                                                                          │ │
│  │  [ ] Review existing form patterns                                       │ │
│  │  [ ] Create LoginForm component                                          │ │
│  │  [ ] Add form validation logic                                           │ │
│  │  [ ] Integrate with auth API                                             │ │
│  │  [ ] Add error handling                                                  │ │
│  │  [ ] Write tests                                                         │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────┬─────────────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                     6️⃣ POST-WORK AUTOMATION                                   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  ✨ POSTTOOLUSE HOOK (after each Write/Edit)                             │ │
│  │  → Run Prettier formatting                                               │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  🔍 AUTO CODE REVIEW (after significant work)                            │ │
│  │  → Spawn code-reviewer agent                                             │ │
│  │  → Check for security issues                                             │ │
│  │  → Verify patterns compliance                                            │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  💾 OPTIONAL COMMIT (if user requests)                                   │ │
│  │  → Pre-commit hook validates                                             │ │
│  │  → Commit-msg hook formats message                                       │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 🧠 Skill Activation Decision Tree

```
                                ┌────────────────┐
                                │  USER MESSAGE  │
                                └───────┬────────┘
                                        │
                                        ▼
                         ┌──────────────────────────────┐
                         │   Extract Keywords & Intent   │
                         └──────────────┬───────────────┘
                                        │
              ┌─────────────────────────┼─────────────────────────┐
              │                         │                         │
              ▼                         ▼                         ▼
    ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
    │   DEVELOPMENT   │      │    BUSINESS     │      │    CREATIVE     │
    │    keywords?    │      │    keywords?    │      │    keywords?    │
    └────────┬────────┘      └────────┬────────┘      └────────┬────────┘
             │                        │                        │
    ┌────────┴────────┐      ┌────────┴────────┐      ┌────────┴────────┐
    │                 │      │                 │      │                 │
    ▼                 ▼      ▼                 ▼      ▼                 ▼
┌───────┐        ┌───────┐ ┌───────┐     ┌───────┐ ┌───────┐      ┌───────┐
│ React?│        │ iOS?  │ │Startup│     │Finance│ │ UI?   │      │ Brand?│
└───┬───┘        └───┬───┘ └───┬───┘     └───┬───┘ └───┬───┘      └───┬───┘
    │                │         │             │         │              │
    ▼                ▼         ▼             ▼         ▼              ▼
┌─────────┐    ┌─────────┐  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ generic-│    │ ios-    │  │ startup-│ │ finance │ │frontend-│ │ brand-  │
│ react-* │    │develop- │  │ launch  │ │         │ │enhancer │ │identity │
│ skills  │    │ ment    │  │         │ │         │ │         │ │         │
└─────────┘    └─────────┘  └─────────┘ └─────────┘ └─────────┘ └─────────┘

                              SKILL SELECTION PRIORITY
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  Priority 1: PROJECT CONTEXT                                                 │
│  ─────────────────────────────                                               │
│  - Read package.json, tsconfig.json, requirements.txt, etc.                  │
│  - Determine primary language/framework                                      │
│  - This OVERRIDES keyword matching in most cases                             │
│                                                                              │
│  Priority 2: EXPLICIT SKILL INVOCATION                                       │
│  ─────────────────────────────────────                                       │
│  - User says "use the X skill" → Load X directly                             │
│  - Skill(name) invocation → Load immediately                                 │
│                                                                              │
│  Priority 3: KEYWORD MATCHING                                                │
│  ───────────────────────────                                                 │
│  - Match user message against skill descriptions                             │
│  - Higher specificity wins (ios-development > generic-code-reviewer)         │
│                                                                              │
│  Priority 4: TASK TYPE MATCHING                                              │
│  ────────────────────────────                                                │
│  - "review" → code-reviewer skills                                           │
│  - "design" → design-system skills                                           │
│  - "fix bug" → debug-systematic skill                                        │
│                                                                              │
│  Priority 5: FALLBACK                                                        │
│  ────────────────────                                                        │
│  - If no match: Use generic skills appropriate to detected stack             │
│  - If unknown stack: Use core-workflow only                                  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 🤖 Agent Orchestration Patterns

Agents are spawned via the `Task` tool and operate with their own context. Understanding their orchestration is key to effective use.

#### 🎭 Agent Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          AGENT LIFECYCLE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1️⃣ SPAWN                                                                   │
│  ──────────────────────────────────────────────────────────                  │
│                                                                              │
│  User/Claude: "Use the security-auditor agent to review auth.ts"            │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Claude Code (Parent) executes:                                      │    │
│  │                                                                      │    │
│  │  Task(                                                               │    │
│  │    subagent_type="security-auditor",                                 │    │
│  │    prompt="Review auth.ts for security vulnerabilities",            │    │
│  │    model="sonnet"                                                    │    │
│  │  )                                                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  2️⃣ CONTEXT SETUP                                                           │
│  ──────────────────────────────────────────────────────────                  │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Agent receives:                                                     │    │
│  │  - 📝 Agent definition (from agents/security-auditor.md)             │    │
│  │  - 🛠️ Allowed tools (Read, Grep, Glob as specified)                  │    │
│  │  - 📋 The prompt describing the task                                 │    │
│  │  - 🔗 Access to current working directory                            │    │
│  │                                                                      │    │
│  │  Agent does NOT receive:                                             │    │
│  │  - ❌ Full conversation history (unless using resume)                │    │
│  │  - ❌ Parent's loaded skills                                         │    │
│  │  - ❌ Parent's MCP servers                                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  3️⃣ EXECUTION                                                               │
│  ──────────────────────────────────────────────────────────                  │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Agent operates autonomously:                                        │    │
│  │                                                                      │    │
│  │  - Reads auth.ts file                                                │    │
│  │  - Searches for related files (Grep, Glob)                           │    │
│  │  - Applies security audit checklist                                  │    │
│  │  - Identifies vulnerabilities                                        │    │
│  │  - Formulates findings                                               │    │
│  │                                                                      │    │
│  │  Agent has own context window (~200,000 tokens)                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  4️⃣ RETURN                                                                  │
│  ──────────────────────────────────────────────────────────                  │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Agent returns single message to parent:                             │    │
│  │                                                                      │    │
│  │  ## Security Audit: auth.ts                                          │    │
│  │                                                                      │    │
│  │  ### 🚨 Critical Issues                                              │    │
│  │  1. SQL injection vulnerability in line 42                           │    │
│  │  2. Password stored in plain text (line 78)                          │    │
│  │                                                                      │    │
│  │  ### ⚠️ Warnings                                                     │    │
│  │  1. JWT secret hardcoded (line 15)                                   │    │
│  │                                                                      │    │
│  │  ### ✅ Recommendations                                              │    │
│  │  [...]                                                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  5️⃣ PARENT CONTINUES                                                        │
│  ──────────────────────────────────────────────────────────                  │
│                                                                              │
│  Parent receives findings and can:                                           │
│  - Present to user                                                           │
│  - Take action on findings                                                   │
│  - Spawn another agent for remediation                                       │
│  - Resume the agent for follow-up (using agent ID)                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 📊 Parallel Agent Execution

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PARALLEL AGENT EXECUTION                                │
│                      (Max 10 concurrent agents)                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  User: "Review security, performance, and accessibility of my app"          │
│                                                                              │
│                              PARENT CLAUDE                                   │
│                                   │                                          │
│                    ┌──────────────┼──────────────┐                          │
│                    │              │              │                          │
│                    ▼              ▼              ▼                          │
│            ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                  │
│            │  SECURITY   │ │ PERFORMANCE │ │ACCESSIBILITY│                  │
│            │   AUDITOR   │ │  OPTIMIZER  │ │   EXPERT    │                  │
│            │   (Agent)   │ │   (Agent)   │ │   (Agent)   │                  │
│            └──────┬──────┘ └──────┬──────┘ └──────┬──────┘                  │
│                   │              │              │                           │
│              Runs in         Runs in        Runs in                         │
│              parallel        parallel       parallel                        │
│                   │              │              │                           │
│                   ▼              ▼              ▼                           │
│            ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                  │
│            │ OWASP scan  │ │ Profile     │ │ WCAG audit  │                  │
│            │ Auth review │ │ bottlenecks │ │ Screen      │                  │
│            │ Secret scan │ │ Memory use  │ │ reader test │                  │
│            └──────┬──────┘ └──────┬──────┘ └──────┬──────┘                  │
│                   │              │              │                           │
│                   └──────────────┼──────────────┘                           │
│                                  │                                          │
│                                  ▼                                          │
│                        AGGREGATED RESULTS                                   │
│                    (Parent combines all findings)                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

IMPLEMENTATION:

// In a single message, Claude can spawn multiple agents:
Task(subagent_type="security-auditor", prompt="...", run_in_background=true)
Task(subagent_type="performance-optimizer", prompt="...", run_in_background=true)
Task(subagent_type="accessibility-expert", prompt="...", run_in_background=true)

// Then collect results:
TaskOutput(task_id="agent1_id")
TaskOutput(task_id="agent2_id")
TaskOutput(task_id="agent3_id")
```

#### 🔄 Agent Resume Pattern

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AGENT RESUME PATTERN                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SESSION 1: Initial Analysis                                                 │
│  ────────────────────────────                                               │
│                                                                              │
│  User: "Use the architecture-analyst agent to review our microservices"     │
│                                                                              │
│  Task(subagent_type="architecture-analyst", prompt="Review microservices")  │
│                           │                                                  │
│                           ▼                                                  │
│              ┌─────────────────────────────┐                                │
│              │  Agent runs analysis...      │                               │
│              │  Returns: Agent ID abc123    │                               │
│              │  + Initial findings          │                               │
│              └─────────────────────────────┘                                │
│                                                                              │
│  SESSION 2: Follow-up Questions                                              │
│  ──────────────────────────────                                              │
│                                                                              │
│  User: "What about the database connections specifically?"                   │
│                                                                              │
│  Task(                                                                       │
│    subagent_type="architecture-analyst",                                    │
│    resume="abc123",                           ← Resume previous agent       │
│    prompt="Focus on database connections"                                   │
│  )                                                                          │
│                           │                                                  │
│                           ▼                                                  │
│              ┌─────────────────────────────┐                                │
│              │  Agent resumes WITH full    │                                │
│              │  context from previous run  │                                │
│              │  + Knows about services     │                                │
│              │  + Focuses on DBs           │                                │
│              └─────────────────────────────┘                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🗄️ State Management

The toolkit maintains state through several mechanisms:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           STATE MANAGEMENT                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  📊 SESSION STATE (In-Memory, Conversation Context)                     │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  Stored in conversation context:                                        │ │
│  │  - Current todo list (TodoWrite)                                        │ │
│  │  - Files read this session                                              │ │
│  │  - Decisions made                                                       │ │
│  │  - Commands executed                                                    │ │
│  │                                                                         │ │
│  │  Lifecycle: Exists until /clear or session ends                         │ │
│  │  Size: Grows with conversation, managed by /compact                     │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  📁 PROJECT STATE (File System)                                         │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  .planning/                                                             │ │
│  │  ├── STATE.md      ← Current phase, progress %, blockers                │ │
│  │  ├── ROADMAP.md    ← All phases, dependencies                          │ │
│  │  └── phases/*.md   ← Detailed phase plans                               │ │
│  │                                                                         │ │
│  │  tasks/                                                                 │ │
│  │  └── *.md          ← Task-specific planning documents                   │ │
│  │                                                                         │ │
│  │  Lifecycle: Persists across sessions until manually cleared             │ │
│  │  Size: Typically < 50KB total                                           │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  🧠 PERSISTENT MEMORY (claude-mem MCP Server)                           │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  Stored in vector database:                                             │ │
│  │  - Key decisions and their rationale                                    │ │
│  │  - User preferences learned                                             │ │
│  │  - Project-specific context                                             │ │
│  │  - Important facts to remember                                          │ │
│  │                                                                         │ │
│  │  Lifecycle: Persists indefinitely                                       │ │
│  │  Size: Limited by vector DB, typically megabytes                        │ │
│  │                                                                         │ │
│  │  Requires: MCP memory server enabled                                    │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  📜 SESSION LOG (Append-Only File)                                      │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  Location: ~/.claude/.session-log                                       │ │
│  │                                                                         │ │
│  │  Contents (via hooks):                                                  │ │
│  │  - [2025-12-27 10:30:45] SESSION START                                  │ │
│  │  - [2025-12-27 10:31:02] USER: "Build a login form..."                  │ │
│  │  - [2025-12-27 10:45:00] NOTIFICATION: Task complete                    │ │
│  │  - [2025-12-27 10:50:00] PERMISSION: Write tool requested               │ │
│  │  - [2025-12-27 11:00:00] SESSION END                                    │ │
│  │                                                                         │ │
│  │  Lifecycle: Persists until manually cleared                             │ │
│  │  Size: Grows over time, use /session-log clear                          │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🔌 Hook Execution Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       HOOK EXECUTION ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                          ┌─────────────────┐                                │
│                          │   HOOK EVENT    │                                │
│                          │    Triggered    │                                │
│                          └────────┬────────┘                                │
│                                   │                                         │
│                                   ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      MATCHER EVALUATION                              │   │
│  │                                                                      │   │
│  │  For each hook definition in settings.json:                          │   │
│  │                                                                      │   │
│  │  ┌─────────────────────────────────────────────────────────────┐    │   │
│  │  │  "matcher": "Write"                                          │    │   │
│  │  │                                                              │    │   │
│  │  │  Matches if:                                                 │    │   │
│  │  │  - Tool name CONTAINS "Write" (case-sensitive)               │    │   │
│  │  │  - Empty matcher "" matches ALL events                       │    │   │
│  │  └─────────────────────────────────────────────────────────────┘    │   │
│  │                                                                      │   │
│  └───────────────────────────────────┬─────────────────────────────────┘   │
│                                      │                                      │
│               ┌──────────────────────┴──────────────────────┐              │
│               │                                             │              │
│               ▼                                             ▼              │
│       ┌──────────────┐                              ┌──────────────┐       │
│       │  MATCHED     │                              │  NOT MATCHED │       │
│       │  Execute     │                              │  Skip hook   │       │
│       └──────┬───────┘                              └──────────────┘       │
│              │                                                              │
│              ▼                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       HOOK EXECUTION                                 │   │
│  │                                                                      │   │
│  │  ┌───────────────────────────────────────────────────────────────┐  │   │
│  │  │  Hook Type: "command"                                          │  │   │
│  │  │                                                                │  │   │
│  │  │  Execution Environment:                                        │  │   │
│  │  │  - Shell: bash (Git Bash on Windows)                           │  │   │
│  │  │  - Working Directory: Current project                          │  │   │
│  │  │  - Environment Variables: Inherited + special                  │  │   │
│  │  │                                                                │  │   │
│  │  │  Special Variables Available:                                  │  │   │
│  │  │  - $TOOL_NAME    → Name of tool (e.g., "Write")                │  │   │
│  │  │  - $FILE_PATH    → Path to affected file                       │  │   │
│  │  │  - $HOOK_EVENT   → Event type (e.g., "PostToolUse")            │  │   │
│  │  └───────────────────────────────────────────────────────────────┘  │   │
│  │                                                                      │   │
│  │  ┌───────────────────────────────────────────────────────────────┐  │   │
│  │  │  Timeout Handling:                                             │  │   │
│  │  │                                                                │  │   │
│  │  │  - "timeout": 10000 (10 seconds default)                       │  │   │
│  │  │  - If exceeded, hook is killed                                 │  │   │
│  │  │  - Claude continues (hooks are non-blocking by design)         │  │   │
│  │  └───────────────────────────────────────────────────────────────┘  │   │
│  │                                                                      │   │
│  └───────────────────────────────────┬─────────────────────────────────┘   │
│                                      │                                      │
│                                      ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       OUTPUT HANDLING                                │   │
│  │                                                                      │   │
│  │  stdout → Displayed to user via statusMessage (if configured)       │   │
│  │  stderr → Logged but typically not shown                            │   │
│  │  exit 0 → Success, continue                                         │   │
│  │  exit 1 → Failure, logged but Claude continues                      │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

                            HOOK CHAINING EXAMPLE

PreToolUse("Bash") → Check command safety → If dangerous, BLOCK
                                                    │
                                                    ▼
                                          Tool execution blocked
                                          Claude informed
                                          User sees error

PostToolUse("Write") → Run Prettier → Format file
                                           │
                                           ▼
                                    File formatted
                                    Claude continues
```

### 🏗️ Permission System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PERMISSION SYSTEM ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         PERMISSION LAYERS                               │ │
│  │                                                                         │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│  │  │  LAYER 1: GLOBAL SETTINGS (~/.claude/settings.json)             │   │ │
│  │  │                                                                  │   │ │
│  │  │  "permissions": {                                                │   │ │
│  │  │    "allow": [...],      ← Always allowed                        │   │ │
│  │  │    "deny": [...],       ← Always denied                         │   │ │
│  │  │    "defaultMode": "bypassPermissions"                           │   │ │
│  │  │  }                                                               │   │ │
│  │  └─────────────────────────────────────────────────────────────────┘   │ │
│  │                              │                                          │ │
│  │                              ▼                                          │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│  │  │  LAYER 2: PROJECT SETTINGS (.claude/settings.json)              │   │ │
│  │  │                                                                  │   │ │
│  │  │  - Overrides global for this project                            │   │ │
│  │  │  - Can add or remove permissions                                 │   │ │
│  │  │  - Scoped to project directory                                   │   │ │
│  │  └─────────────────────────────────────────────────────────────────┘   │ │
│  │                              │                                          │ │
│  │                              ▼                                          │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│  │  │  LAYER 3: RUNTIME APPROVAL                                       │   │ │
│  │  │                                                                  │   │ │
│  │  │  - If not in allow list and not in deny list                    │   │ │
│  │  │  - Prompts user for approval                                     │   │ │
│  │  │  - User can allow once or always                                 │   │ │
│  │  └─────────────────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                       PERMISSION SYNTAX                                 │ │
│  │                                                                         │ │
│  │  TOOL PERMISSIONS:                                                      │ │
│  │  ─────────────────                                                      │ │
│  │  "Bash(git *)"           → Allow all git commands                      │ │
│  │  "Bash(npm run:*)"       → Allow npm run with any script               │ │
│  │  "Read"                  → Allow all file reads                         │ │
│  │  "Write"                 → Allow all file writes (dangerous!)           │ │
│  │                                                                         │ │
│  │  SKILL PERMISSIONS:                                                     │ │
│  │  ──────────────────                                                     │ │
│  │  "Skill(debug-like-expert)"  → Allow specific skill                    │ │
│  │  "Skill(*)"                  → Allow all skills (dangerous!)           │ │
│  │                                                                         │ │
│  │  WEB PERMISSIONS:                                                       │ │
│  │  ────────────────                                                       │ │
│  │  "WebSearch"                     → Allow web search                    │ │
│  │  "WebFetch(domain:github.com)"   → Allow fetching from GitHub          │ │
│  │  "WebFetch(domain:*)"            → Allow any domain (dangerous!)       │ │
│  │                                                                         │ │
│  │  MCP PERMISSIONS:                                                       │ │
│  │  ────────────────                                                       │ │
│  │  "mcp__memory__*"                → Allow all memory server tools       │ │
│  │  "mcp__filesystem__read_file"    → Allow only read operations          │ │
│  │  "mcp__sqlite__read_query"       → Allow only read queries             │ │
│  │                                                                         │ │
│  │  SLASH COMMANDS:                                                        │ │
│  │  ───────────────                                                        │ │
│  │  "SlashCommand(/gsd:*)"          → Allow all GSD commands              │ │
│  │  "SlashCommand(/commit-commands:*)" → Allow commit commands            │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                    PERMISSION EVALUATION FLOW                           │ │
│  │                                                                         │ │
│  │     Tool Request: Bash("git commit -m 'feat: add login'")              │ │
│  │                              │                                          │ │
│  │                              ▼                                          │ │
│  │     ┌────────────────────────────────────────────┐                     │ │
│  │     │  Check DENY list first                     │                     │ │
│  │     │  Is "Bash(git commit:*)" in deny?          │                     │ │
│  │     │                                            │                     │ │
│  │     │  NO → Continue checking                    │                     │ │
│  │     │  YES → BLOCKED (return error to Claude)    │                     │ │
│  │     └──────────────────────┬─────────────────────┘                     │ │
│  │                            │ NO                                         │ │
│  │                            ▼                                            │ │
│  │     ┌────────────────────────────────────────────┐                     │ │
│  │     │  Check ALLOW list                          │                     │ │
│  │     │  Is "Bash(git commit:*)" in allow?         │                     │ │
│  │     │                                            │                     │ │
│  │     │  YES → EXECUTE (no user prompt)            │                     │ │
│  │     │  NO → Continue checking                    │                     │ │
│  │     └──────────────────────┬─────────────────────┘                     │ │
│  │                            │ NO                                         │ │
│  │                            ▼                                            │ │
│  │     ┌────────────────────────────────────────────┐                     │ │
│  │     │  Check defaultMode                         │                     │ │
│  │     │                                            │                     │ │
│  │     │  "bypassPermissions" → EXECUTE             │                     │ │
│  │     │  "askUser" → PROMPT USER                   │                     │ │
│  │     └────────────────────────────────────────────┘                     │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Complete Directory Structure

<details>
<summary><strong>📂 Click to expand full directory tree</strong></summary>

```
~/.claude/
│
├── 📜 CLAUDE.md                          # Core constitution (always loaded)
│   - 🎭 Identity & Role definition
│   - 🔒 P0 Non-Negotiables (security, data integrity)
│   - 🔄 Workflow patterns
│   - ⛔ Anti-patterns to avoid
│   - 🔧 Tool policies
│   - 🔀 Git safety rules
│   - 🔍 Skill discovery instructions
│
├── 📖 README.md                          # This comprehensive documentation
├── 📋 CHANGELOG.md                       # Version history and changes
├── 🤝 CONTRIBUTING.md                    # How to contribute
├── 📦 plugin.json                        # Plugin manifest for distribution
├── ⚙️ settings.json                      # Claude Code settings & hooks
├── 🔌 .mcp.json                          # MCP server definitions
│
├── 🎓 skills/                            # 72 domain expertise modules
│   ├── 📑 MASTER_INDEX.md                # Complete skill navigation
│   ├── 📖 README.md                      # Skills usage guide
│   ├── 👔 EXPERT-SKILLS-GUIDE.md         # 16 domain expert skills
│   ├── 📁 _shared/                       # Shared skill resources
│   │
│   │ ─── 🏛️ FOUNDATION ───
│   ├── 📋 core-workflow/SKILL.md         # Session protocols, git, testing
│   │
│   │ ─── 🌐 GENERIC (Any Stack) ───
│   ├── 🔍 generic-code-reviewer/SKILL.md
│   ├── 🎨 generic-design-system/SKILL.md
│   ├── 🛠️ generic-feature-developer/SKILL.md
│   ├── 👤 generic-ux-designer/SKILL.md
│   │
│   │ ─── 📚 STACK-SPECIFIC ───
│   ├── 🌐 generic-static-*/SKILL.md      # 72 skills for HTML/CSS/JS
│   ├── ⚛️ generic-react-*/SKILL.md       # 72 skills for React/TypeScript
│   ├── 🔧 generic-fullstack-*/SKILL.md   # 72 skills for Next.js/NestJS
│   │
│   │ ─── 🧩 FRAMEWORKS ───
│   ├── 💚 vue-development/SKILL.md       # Vue.js 3, Composition API, Nuxt
│   ├── 🧡 svelte-development/SKILL.md    # Svelte 5, Runes, SvelteKit
│   │
│   │ ─── 📱 PLATFORMS ───
│   ├── 🍎 ios-development/SKILL.md       # Swift, SwiftUI, UIKit
│   ├── 🤖 android-development/SKILL.md   # Kotlin, Jetpack Compose
│   ├── 📱 react-native/SKILL.md          # Cross-platform mobile
│   ├── 💙 flutter-development/SKILL.md   # Dart, Flutter widgets
│   ├── 🖥️ electron-desktop/SKILL.md      # Electron, Tauri
│   ├── 🌐 pwa-development/SKILL.md       # Progressive Web Apps
│   ├── 🍏 macos-native/SKILL.md          # AppKit, Catalyst
│   ├── 🎮 game-development/SKILL.md      # Unity, Unreal, Godot
│   │
│   │ ─── 🏗️ ARCHITECTURE ───
│   ├── 🔌 api-design/SKILL.md            # REST/GraphQL design
│   ├── 📊 graphql-expert/SKILL.md        # Schema, resolvers
│   ├── 🏢 microservices-architecture/SKILL.md
│   ├── ⚡ websockets-realtime/SKILL.md   # WebSocket, SSE, Socket.IO
│   ├── 🌍 i18n-localization/SKILL.md     # ICU, RTL, locales
│   │
│   │ ─── ☁️ INFRASTRUCTURE ───
│   ├── 🚀 devops-cloud/SKILL.md          # AWS, GCP, Azure, K8s, Terraform
│   ├── 🗄️ database-expert/SKILL.md       # PostgreSQL, MongoDB, Redis
│   ├── 🧠 ai-ml-development/SKILL.md     # PyTorch, TensorFlow, LLMs
│   ├── 🔒 security/SKILL.md              # Auth, OWASP, encryption
│   │
│   │ ─── 🎨 CREATIVE ───
│   ├── 🔍 ui-research/SKILL.md           # Research before UI work
│   ├── ✨ frontend-enhancer/SKILL.md     # Modern UI patterns
│   ├── 🖌️ graphic-design/SKILL.md        # Color, typography, layout
│   ├── 🎬 video-production/SKILL.md      # Pre/post production
│   ├── 🎵 audio-production/SKILL.md      # Recording, mixing, mastering
│   ├── 🏷️ brand-identity/SKILL.md        # Brand strategy, visual identity
│   ├── 🎭 ui-animation/SKILL.md          # Motion design, micro-interactions
│   │
│   │ ─── 💼 BUSINESS ───
│   ├── 🚀 startup-launch/SKILL.md        # Validation, MVP, launch
│   ├── 💰 monetization-strategy/SKILL.md # Pricing, SaaS metrics
│   ├── 📈 business-strategy/SKILL.md     # Planning, competitive analysis
│   ├── 📊 finance/SKILL.md               # Modeling, valuation
│   ├── 📣 marketing/SKILL.md             # Brand, digital, analytics
│   ├── 🤝 sales/SKILL.md                 # Methodologies, pipeline
│   ├── 📋 product-management/SKILL.md    # Roadmaps, prioritization
│   │
│   │ ─── 👔 DOMAIN EXPERTISE (16) ───
│   ├── 👑 leadership/SKILL.md
│   ├── 👥 hr-talent/SKILL.md
│   ├── ⚙️ operations/SKILL.md
│   ├── ⚠️ risk-management/SKILL.md
│   ├── 📜 legal-compliance/SKILL.md
│   ├── 💡 innovation/SKILL.md
│   ├── 🔬 rd-management/SKILL.md
│   ├── 📊 data-science/SKILL.md
│   ├── 🌱 sustainability-esg/SKILL.md
│   ├── 💚 health-wellness/SKILL.md
│   │
│   │ ─── 🔄 WORKFLOW ───
│   ├── 🐛 debug-systematic/SKILL.md      # 4-phase debugging
│   ├── ✅ tdd-workflow/SKILL.md          # Test-driven development
│   │
│   │ ─── 🔧 UTILITIES ───
│   ├── 📚 codebase-documenter/SKILL.md
│   ├── 🔍 tech-debt-analyzer/SKILL.md
│   ├── 🧪 test-specialist/SKILL.md
│   ├── 📈 seo-analytics-auditor/SKILL.md
│   └── 📄 document-skills/SKILL.md       # Office formats
│
├── 🤖 agents/                            # 36 specialized AI subagents
│   ├── 📖 README.md                      # Agent usage guide
│   │
│   │ ─── ✅ CODE QUALITY ───
│   ├── 🔍 deep-code-reviewer.md          # 6-aspect review (opus)
│   ├── 🔒 security-auditor.md            # OWASP, vulnerabilities
│   ├── 🔧 refactoring-specialist.md      # Safe improvements
│   ├── ⚡ performance-optimizer.md       # Bottleneck identification
│   │
│   │ ─── 💻 DEVELOPMENT ───
│   ├── 🧪 test-generator.md              # TDD test suites
│   ├── 🔌 api-designer.md                # REST/GraphQL APIs
│   ├── 🗄️ database-expert.md             # Schema, queries
│   ├── 🚀 devops-specialist.md           # CI/CD, containers
│   ├── 🐛 debugging-specialist.md        # 4-phase debugging
│   │
│   │ ─── 🏗️ ARCHITECTURE ───
│   ├── 🏛️ architecture-analyst.md        # System design (opus)
│   ├── 📊 graphql-architect.md           # Schema design
│   ├── 🏢 microservices-architect.md     # Distributed systems
│   ├── ⚡ realtime-specialist.md         # WebSockets, live data
│   ├── 🗄️ database-architect.md          # Advanced DB design
│   │
│   │ ─── 📱 PLATFORM ───
│   ├── 🍎 ios-developer.md               # Swift, SwiftUI
│   ├── 🤖 android-developer.md           # Kotlin, Compose
│   ├── 📱 mobile-architect.md            # Cross-platform decisions
│   ├── 🖥️ desktop-developer.md           # Electron, Tauri
│   ├── 🍏 macos-developer.md             # AppKit, Catalyst
│   ├── 🎮 game-developer.md              # Unity, Unreal, Godot
│   │
│   │ ─── 📝 LANGUAGE EXPERTS ───
│   ├── 📘 typescript-expert.md           # Type system mastery
│   ├── 🐍 python-expert.md               # Python best practices
│   ├── ⚛️ react-expert.md                # React patterns, hooks
│   │
│   │ ─── 🎨 CREATIVE ───
│   ├── 🖌️ graphic-designer.md            # Visual design
│   ├── 🎬 video-producer.md              # Video production
│   ├── 🎵 audio-engineer.md              # Sound design
│   ├── 🏷️ brand-strategist.md            # Brand identity
│   ├── 🎭 motion-designer.md             # UI animation
│   │
│   │ ─── 💼 BUSINESS ───
│   ├── 🚀 startup-advisor.md             # Launch, validation
│   ├── 💰 monetization-expert.md         # Revenue, pricing
│   │
│   │ ─── ☁️ INFRASTRUCTURE ───
│   ├── 🛠️ devops-engineer.md             # Cloud, K8s, CI/CD
│   ├── 🧠 ml-engineer.md                 # PyTorch, TensorFlow, MLOps
│   ├── 🌍 i18n-specialist.md             # Internationalization
│   │
│   │ ─── 📚 SUPPORT ───
│   ├── 📖 documentation-writer.md        # Docs, READMEs (haiku)
│   ├── 💡 code-explainer.md              # Explanations (haiku)
│   └── ♿ accessibility-expert.md        # WCAG compliance
│
├── ⌨️ commands/                          # Custom slash commands
│   ├── 🎯 start-task.md                  # Universal router v3.0
│   ├── 📋 list-skills.md                 # Browse skills
│   ├── 🔍 skill-finder.md                # Problem-to-skill matcher
│   ├── 🔎 discover-skills.md             # skillsmp.com search
│   ├── ▶️ run.md                         # Run arbitrary commands
│   └── 🗂️ router/                        # Domain routing files
│       ├── 💻 domains-development.md     # 23 development domains
│       ├── 🔬 domains-scientific.md      # 8 scientific domains
│       ├── 💼 domains-business.md        # 16 business domains
│       ├── 🎨 domains-creative.md        # 6 creative domains
│       ├── ⚙️ domains-meta.md            # Admin tasks
│       ├── 🧠 decision-frameworks.md     # 6 decision frameworks
│       └── 📊 routing-logic.md           # Complexity scoring
│
├── 📋 rules/                             # Contextual guidelines
│   ├── 📖 README.md                      # Rules index
│   ├── ✅ checklists/                    # Task-type specific
│   │   ├── 🎨 ui-visual-changes.md       # Visual/UI work
│   │   ├── 🤖 automation-scripts.md      # Scripts, automation
│   │   └── 🌐 static-sites.md            # HTML/CSS/JS sites
│   ├── 🛠️ stacks/                        # Technology-specific
│   │   ├── ⚛️ react-typescript.md        # React + TypeScript
│   │   ├── 🔧 fullstack-nextjs-nestjs.md # Full-stack patterns
│   │   ├── 🐍 python.md                  # Python projects
│   │   ├── 🐹 go.md                      # Go projects
│   │   └── 🦀 rust.md                    # Rust projects
│   └── 🔧 tooling/                       # Tool setup guides
│       ├── 🪝 git-hooks-setup.md         # Git hook configuration
│       ├── 🔌 mcp-servers.md             # MCP lifecycle management
│       ├── 📦 external-repos.md          # Marketplace updates
│       └── 🔧 troubleshooting.md         # Common issue fixes
│
├── 📚 docs/                              # Extended documentation
│   ├── 🔄 WORKFLOW-GUIDE.md              # Workflow patterns
│   ├── 🏪 MARKETPLACE-GUIDE.md           # Marketplace reference
│   ├── 📈 GSD-TUTORIAL.md                # GSD system guide
│   ├── 🎯 DOMAIN-ROUTING.md              # Routing internals
│   └── 🔌 MCP-SERVERS.md                 # MCP server details
│
├── 🏪 plugins/                           # Plugin system
│   ├── 📁 local/                         # Custom local plugins
│   └── 📦 marketplaces/                  # 67 external repositories
│       └── (see Marketplaces section)
│
├── 📜 scripts/                           # Utility scripts
│   ├── 🪝 setup-hooks.sh                 # Install git hooks
│   ├── 🔄 update-external-repos.sh       # Update marketplaces
│   └── 📁 hooks/                         # Trackable hook scripts
│       ├── 📝 pre-commit.sh              # Secret detection, validation
│       ├── 💬 commit-msg.sh              # Conventional commits
│       └── 🚀 pre-push.sh                # Force-push protection
│
├── 📄 templates/                         # Project templates
│   └── 📋 task-template.md               # Task file template
│
├── 🎨 vscode/                            # VS Code settings
│   └── 📜 setup-vscode-settings.ps1     # Setup script (settings.json is gitignored)
│
└── 📋 .planning/                         # GSD project files (gitignored)
    ├── 📝 PROJECT.md                     # Project definition
    ├── 🗺️ ROADMAP.md                     # Full project plan
    ├── 📊 STATE.md                       # Current status
    └── 📁 phases/                        # Phase-specific files
```

</details>

---

## 🔧 Configuration Reference

### ⚙️ settings.json

The main Claude Code configuration file:

```json
{
  "permissions": {
    "allow": [
      // 📌 Slash commands - all GSD and plugin commands
      "SlashCommand(/gsd:*)",
      "SlashCommand(/taches-cc-resources:*)",
      "SlashCommand(/commit-commands:*)",
      "SlashCommand(/feature-dev:*)",
      "SlashCommand(/pr-review-toolkit:*)",

      // 🔀 Git operations
      "Bash(git add:*)", "Bash(git commit:*)", "Bash(git push:*)",
      "Bash(git status:*)", "Bash(git diff:*)", "Bash(git log:*)",

      // 📦 Package managers
      "Bash(npm *:*)", "Bash(npx:*)", "Bash(pnpm:*)", "Bash(yarn:*)",

      // 💻 Languages
      "Bash(node:*)", "Bash(python:*)", "Bash(pip:*)",

      // 🔧 Tools
      "Bash(docker:*)", "Bash(gh:*)", "Bash(curl:*)",

      // 📁 File operations
      "Bash(ls:*)", "Bash(cat:*)", "Bash(mkdir:*)",

      // 🎓 Skills
      "Skill(debug-like-expert)",
      "Skill(generic-code-reviewer)",
      "Skill(test-specialist)",

      // 🌐 Web access
      "WebSearch",
      "WebFetch(domain:docs.anthropic.com)",
      "WebFetch(domain:react.dev)",
      "WebFetch(domain:github.com)",
      // ... 15+ more domains
    ],
    "defaultMode": "bypassPermissions"
  },

  "hooks": {
    "SessionStart": [...],   // 📊 Display toolkit status
    "Stop": [...],           // 📣 Notification when awaiting input
    "PreToolUse": [...],     // 🛡️ Block dangerous commands
    "PostToolUse": [...],    // ✨ Auto-format with Prettier
    "Notification": [...]    // 📝 Session logging
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
    "taches-cc-resources@taches-cc-resources": true
  },

  "alwaysThinkingEnabled": true,
  "spinnerTipsEnabled": false
}
```

### 📜 CLAUDE.md (Constitution)

Core rules loaded every session (~1,100 tokens):

| Section                   | Purpose                                                  |
| :------------------------ | :------------------------------------------------------- |
| 🎭 **Identity & Role**    | "Lead Autonomous Engineer" with explicit thinking mode   |
| 🔒 **P0 Non-Negotiables** | Data integrity, security, coherence, atomic delivery     |
| 🔄 **Workflow**           | Plan → Approval → Execute → Verify → Commit → Push       |
| 🔧 **Always Available**   | WebSearch, Skills, Agents, Research, Decision Frameworks |
| 🛠️ **Tool Policy**        | Prefer Read/Grep/Glob over bash equivalents              |
| 📏 **Code Standards**     | Strict types, function limits, DRY after 3 repetitions   |
| 🔀 **Git Safety**         | Never force-push, never commit secrets                   |
| ⛔ **Anti-Patterns**      | Using `any`, `innerHTML`, proposing unread code changes  |
| 📂 **Load When Relevant** | 14 contextual file triggers                              |
| 🔍 **Skill Discovery**    | Local skills + marketplace search instructions           |

---

## 🎓 Complete Skills Reference (72 Skills)

### 🏛️ Foundation Skills

| Skill              | Description                                                                     | Auto-Loads When                    |
| :----------------- | :------------------------------------------------------------------------------ | :--------------------------------- |
| 📋 `core-workflow` | Session protocols, git conventions, testing, debugging, communication standards | Complex tasks, planning, debugging |

### 🌐 Generic Skills (Any Project)

| Skill                          | Description                                | Use For                |
| :----------------------------- | :----------------------------------------- | :--------------------- |
| 🔍 `generic-code-reviewer`     | Multi-stack code review patterns           | Any code review        |
| 🎨 `generic-design-system`     | Design tokens, colors, spacing, typography | UI/design work         |
| 🛠️ `generic-feature-developer` | Architecture patterns for new features     | Feature implementation |
| 👤 `generic-ux-designer`       | UX best practices, user psychology         | UX design work         |

### 📚 Stack-Specific Skills (72 Skills)

#### 🌐 Static Sites (HTML/CSS/JS)

| Skill                                 | Description                      |
| :------------------------------------ | :------------------------------- |
| 🔍 `generic-static-code-reviewer`     | Pure HTML/CSS/JS review patterns |
| 🎨 `generic-static-design-system`     | Static site design tokens        |
| 🛠️ `generic-static-feature-developer` | Static site architecture         |
| 👤 `generic-static-ux-designer`       | Static site UX patterns          |

#### ⚛️ React + TypeScript

| Skill                                | Description                          |
| :----------------------------------- | :----------------------------------- |
| 🔍 `generic-react-code-reviewer`     | React/TS strict mode, hooks patterns |
| 🎨 `generic-react-design-system`     | React component design system        |
| 🛠️ `generic-react-feature-developer` | React architecture patterns          |
| 👤 `generic-react-ux-designer`       | React UX/interaction patterns        |

#### 🔧 Full-Stack (Next.js + NestJS)

| Skill                                    | Description                |
| :--------------------------------------- | :------------------------- |
| 🔍 `generic-fullstack-code-reviewer`     | Full-stack review patterns |
| 🎨 `generic-fullstack-design-system`     | Full-stack design tokens   |
| 🛠️ `generic-fullstack-feature-developer` | Full-stack architecture    |
| 👤 `generic-fullstack-ux-designer`       | Full-stack UX patterns     |

### 🧩 Framework Skills

| Skill                   | Framework                      | Key Technologies                                                                                                                    |
| :---------------------- | :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| 💚 `vue-development`    | [Vue.js 3](https://vuejs.org)  | Composition API, TypeScript, [Pinia](https://pinia.vuejs.org), Vue Router, [Nuxt 3](https://nuxt.com), [Vitest](https://vitest.dev) |
| 🧡 `svelte-development` | [Svelte 5](https://svelte.dev) | Runes ($state, $derived, $effect, $props), [SvelteKit](https://kit.svelte.dev), TypeScript                                          |

### 📱 Platform Development Skills (72 Skills)

| Skill                    | Platform        | Technologies                                                                                                                            |
| :----------------------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| 🍎 `ios-development`     | iOS/iPadOS/tvOS | [Swift](https://swift.org), SwiftUI, UIKit, Core Data, CloudKit                                                                         |
| 🤖 `android-development` | Android         | [Kotlin](https://kotlinlang.org), [Jetpack Compose](https://developer.android.com/jetpack/compose), Material Design 3, Room, Coroutines |
| 📱 `react-native`        | Cross-platform  | [React Native](https://reactnative.dev), [Expo](https://expo.dev), native modules, bridge                                               |
| 💙 `flutter-development` | Cross-platform  | [Dart](https://dart.dev), [Flutter](https://flutter.dev) widgets, Provider/Riverpod, Platform channels                                  |
| 🖥️ `electron-desktop`    | Desktop         | [Electron](https://electronjs.org), [Tauri](https://tauri.app), IPC, native APIs                                                        |
| 🌐 `pwa-development`     | Web             | Service workers, Web App Manifest, offline-first                                                                                        |
| 🍏 `macos-native`        | macOS           | AppKit, Catalyst, sandboxing, notarization                                                                                              |
| 🎮 `game-development`    | Gaming          | [Unity](https://unity.com) (C#), [Unreal Engine](https://unrealengine.com) (C++), [Godot](https://godotengine.org) (GDScript)           |

### 🎨 Creative & Design Skills (72 Skills)

| Skill                  | Domain        | Coverage                                                                            |
| :--------------------- | :------------ | :---------------------------------------------------------------------------------- |
| 🔍 `ui-research`       | Research      | **PREREQUISITE for UI work** - Research inspiration, avoid AI look                  |
| ✨ `frontend-enhancer` | Enhancement   | Modern UI patterns (requires ui-research first)                                     |
| 🖌️ `graphic-design`    | Visual Design | Color theory, typography, layout, composition, grids                                |
| 🎬 `video-production`  | Video         | Pre-production, shooting, editing, color grading, sound                             |
| 🎵 `audio-production`  | Audio         | Recording, mixing, mastering, sound design, DAWs                                    |
| 🏷️ `brand-identity`    | Branding      | Brand strategy, positioning, visual identity, guidelines                            |
| 🎭 `ui-animation`      | Motion        | Animation principles, easing, micro-interactions, [Lottie](https://lottiefiles.com) |

### 💼 Business & Startup Skills (72 Skills)

| Skill                      | Domain   | Coverage                                                   |
| :------------------------- | :------- | :--------------------------------------------------------- |
| 🚀 `startup-launch`        | Startups | Idea validation, MVP definition, launch phases, metrics    |
| 💰 `monetization-strategy` | Revenue  | Pricing psychology, SaaS metrics, models, A/B testing      |
| 📈 `business-strategy`     | Strategy | Competitive analysis, SWOT, Porter's Five Forces, OKRs     |
| 📊 `finance`               | Finance  | Financial modeling, DCF, valuation, cash flow, forecasting |
| 📣 `marketing`             | Growth   | Brand strategy, digital marketing, content, analytics      |
| 🤝 `sales`                 | Revenue  | SPIN, Challenger, MEDDIC, pipeline, CRM optimization       |
| 📋 `product-management`    | Product  | Roadmaps, prioritization (RICE/MoSCoW), user stories, PRDs |

### 🏗️ Technical Architecture Skills (72 Skills)

| Skill                           | Domain                         | Coverage                                                                                                                             |
| :------------------------------ | :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| 🔌 `api-design`                 | APIs                           | REST best practices, [OpenAPI](https://openapis.org)/Swagger, versioning, pagination                                                 |
| 📊 `graphql-expert`             | [GraphQL](https://graphql.org) | Schema design, resolvers, subscriptions, federation                                                                                  |
| 🏢 `microservices-architecture` | Architecture                   | Service design, resilience, observability, event-driven                                                                              |
| ⚡ `websockets-realtime`        | Real-time                      | [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), SSE, [Socket.IO](https://socket.io), scaling, presence |
| 🌍 `i18n-localization`          | i18n                           | ICU MessageFormat, RTL, pluralization, date/number formats                                                                           |

### ☁️ Infrastructure & Operations Skills (72 Skills)

| Skill                  | Domain    | Coverage                                                                                                                                                                                                            |
| :--------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🚀 `devops-cloud`      | DevOps    | [AWS](https://aws.amazon.com), [GCP](https://cloud.google.com), [Azure](https://azure.microsoft.com), [Kubernetes](https://kubernetes.io), [Terraform](https://terraform.io), [Ansible](https://ansible.com), CI/CD |
| 🗄️ `database-expert`   | Databases | [PostgreSQL](https://postgresql.org), [MongoDB](https://mongodb.com), [Redis](https://redis.io), indexing, query optimization                                                                                       |
| 🧠 `ai-ml-development` | AI/ML     | [PyTorch](https://pytorch.org), [TensorFlow](https://tensorflow.org), LLM integration, MLOps, vector DBs                                                                                                            |
| 🔒 `security`          | Security  | Authentication (OAuth, JWT), OWASP Top 10, encryption, SAST                                                                                                                                                         |

### 👔 Domain Expert Skills (72 Skills)

| Skill                   | Domain     | Focus Areas                                             |
| :---------------------- | :--------- | :------------------------------------------------------ |
| 👑 `leadership`         | Management | Team dynamics, delegation, performance management       |
| 👥 `hr-talent`          | HR         | Talent acquisition, compensation, succession planning   |
| ⚙️ `operations`         | Operations | Process optimization, supply chain, quality management  |
| ⚠️ `risk-management`    | Risk       | Enterprise risk, compliance, business continuity        |
| 📜 `legal-compliance`   | Legal      | Contracts, IP, data privacy (GDPR/CCPA), licensing      |
| 💡 `innovation`         | Innovation | Design thinking, R&D management, patent strategy        |
| 🔬 `rd-management`      | R&D        | Research planning, technology roadmaps, lab management  |
| 📊 `data-science`       | Data       | Statistical analysis, ML pipelines, visualization       |
| 🌱 `sustainability-esg` | ESG        | Carbon accounting, ESG reporting, sustainable practices |
| 💚 `health-wellness`    | Wellness   | Workplace safety, mental health, ergonomics             |

### 🔄 Development Workflow Skills (72 Skills)

| Skill                 | Methodology | Process                                              |
| :-------------------- | :---------- | :--------------------------------------------------- |
| 🐛 `debug-systematic` | Debugging   | REPRODUCE → ISOLATE → DIAGNOSE → FIX with evidence   |
| ✅ `tdd-workflow`     | Testing     | RED → GREEN → REFACTOR cycle, test-first development |

### 🔧 Utility Skills (72 Skills)

| Skill                      | Purpose        | Output                                                |
| :------------------------- | :------------- | :---------------------------------------------------- |
| 📚 `codebase-documenter`   | Documentation  | READMEs, API docs, architecture docs, inline comments |
| 🔍 `tech-debt-analyzer`    | Code health    | Technical debt audit, prioritized remediation plan    |
| 🧪 `test-specialist`       | Testing        | Test strategy, coverage analysis, test architecture   |
| 📈 `seo-analytics-auditor` | SEO            | Lighthouse audits, Core Web Vitals, structured data   |
| 📄 `document-skills`       | Office formats | .docx, .pdf, .pptx, .xlsx reading and creation        |

---

## 🤖 Complete Agents Reference (36 Agents)

### ✅ Code Quality Agents

| Agent                       |   Model   | Purpose                                                                                                     | Invocation Example                                                    |
| :-------------------------- | :-------: | :---------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| 🔍 `deep-code-reviewer`     |  🟣 opus  | Comprehensive 6-aspect review (correctness, security, performance, maintainability, testing, documentation) | "Use the deep-code-reviewer agent to review my authentication module" |
| 🔒 `security-auditor`       | 🔵 sonnet | OWASP Top 10, auth vulnerabilities, secrets exposure, dependency risks                                      | "Use the security-auditor agent to audit this API endpoint"           |
| 🔧 `refactoring-specialist` | 🔵 sonnet | Safe, incremental improvements with comprehensive test coverage                                             | "Use the refactoring-specialist agent to improve this legacy code"    |
| ⚡ `performance-optimizer`  | 🔵 sonnet | Bottleneck identification, profiling analysis, optimization recommendations                                 | "Use the performance-optimizer agent to speed up this function"       |

### 💻 Development Agents

| Agent                     |   Model   | Purpose                                                  | Invocation Example                                              |
| :------------------------ | :-------: | :------------------------------------------------------- | :-------------------------------------------------------------- |
| 🧪 `test-generator`       | 🔵 sonnet | TDD-focused test suite generation with edge cases        | "Use the test-generator agent to create tests for this service" |
| 🔌 `api-designer`         | 🔵 sonnet | REST/GraphQL API design, OpenAPI specs, versioning       | "Use the api-designer agent to design endpoints for users"      |
| 🗄️ `database-expert`      | 🔵 sonnet | Schema design, query optimization, indexing strategies   | "Use the database-expert agent to optimize these queries"       |
| 🚀 `devops-specialist`    | 🔵 sonnet | CI/CD pipelines, containerization, deployment automation | "Use the devops-specialist agent to set up GitHub Actions"      |
| 🐛 `debugging-specialist` | 🔵 sonnet | Systematic 4-phase debugging for complex issues          | "Use the debugging-specialist agent to find this memory leak"   |

### 🏗️ Architecture Agents

| Agent                        |   Model   | Purpose                                                    | Invocation Example                                               |
| :--------------------------- | :-------: | :--------------------------------------------------------- | :--------------------------------------------------------------- |
| 🏛️ `architecture-analyst`    |  🟣 opus  | System design, pattern analysis, strategic recommendations | "Use the architecture-analyst agent to review our microservices" |
| 📊 `graphql-architect`       | 🔵 sonnet | Schema design, resolver patterns, federation strategies    | "Use the graphql-architect agent to design the schema"           |
| 🏢 `microservices-architect` | 🔵 sonnet | Service boundaries, resilience patterns, observability     | "Use the microservices-architect agent to plan the migration"    |
| ⚡ `realtime-specialist`     | 🔵 sonnet | WebSockets, SSE, live data, presence, scaling              | "Use the realtime-specialist agent to implement live updates"    |
| 🗄️ `database-architect`      | 🔵 sonnet | Advanced schema design, sharding, replication              | "Use the database-architect agent to design the data model"      |

### 📱 Platform Development Agents

| Agent                  |   Model   | Purpose                                            | Invocation Example                                         |
| :--------------------- | :-------: | :------------------------------------------------- | :--------------------------------------------------------- |
| 🍎 `ios-developer`     | 🔵 sonnet | Swift, SwiftUI, UIKit, Apple ecosystem integration | "Use the ios-developer agent to build the settings screen" |
| 🤖 `android-developer` | 🔵 sonnet | Kotlin, Jetpack Compose, Material Design 3         | "Use the android-developer agent to implement navigation"  |
| 📱 `mobile-architect`  | 🔵 sonnet | Cross-platform decisions, React Native vs Flutter  | "Use the mobile-architect agent to evaluate our options"   |
| 🖥️ `desktop-developer` | 🔵 sonnet | Electron, Tauri, native integrations               | "Use the desktop-developer agent to add system tray"       |
| 🍏 `macos-developer`   | 🔵 sonnet | AppKit, Catalyst, macOS-specific features          | "Use the macos-developer agent to add menu bar app"        |
| 🎮 `game-developer`    | 🔵 sonnet | Unity, Unreal, Godot game development              | "Use the game-developer agent to implement physics"        |

### 📝 Language Expert Agents

| Agent                  |   Model   | Purpose                                           | Invocation Example                                         |
| :--------------------- | :-------: | :------------------------------------------------ | :--------------------------------------------------------- |
| 📘 `typescript-expert` | 🔵 sonnet | Type system mastery, generics, conditional types  | "Use the typescript-expert agent to fix these type errors" |
| 🐍 `python-expert`     | 🔵 sonnet | Best practices, type hints, async patterns        | "Use the python-expert agent to review this module"        |
| ⚛️ `react-expert`      | 🔵 sonnet | Hooks, state management, performance optimization | "Use the react-expert agent to optimize renders"           |

### 🎨 Creative Agents

| Agent                 |   Model   | Purpose                                           | Invocation Example                                         |
| :-------------------- | :-------: | :------------------------------------------------ | :--------------------------------------------------------- |
| 🖌️ `graphic-designer` | 🔵 sonnet | Color theory, typography, layout, composition     | "Use the graphic-designer agent to choose a color palette" |
| 🎬 `video-producer`   | 🔵 sonnet | Video production workflow, editing, color grading | "Use the video-producer agent to plan the tutorial video"  |
| 🎵 `audio-engineer`   | 🔵 sonnet | Recording, mixing, mastering, sound design        | "Use the audio-engineer agent to mix the podcast"          |
| 🏷️ `brand-strategist` | 🔵 sonnet | Brand identity, positioning, guidelines           | "Use the brand-strategist agent to define our brand voice" |
| 🎭 `motion-designer`  | 🔵 sonnet | UI animation, micro-interactions, easing curves   | "Use the motion-designer agent to design the transitions"  |

### 💼 Business Agents

| Agent                    |   Model   | Purpose                                   | Invocation Example                                          |
| :----------------------- | :-------: | :---------------------------------------- | :---------------------------------------------------------- |
| 🚀 `startup-advisor`     | 🔵 sonnet | Launch strategy, validation, MVP, growth  | "Use the startup-advisor agent to validate my idea"         |
| 💰 `monetization-expert` | 🔵 sonnet | Revenue models, pricing strategy, metrics | "Use the monetization-expert agent to design pricing tiers" |

### ☁️ Infrastructure Agents

| Agent                |   Model   | Purpose                                     | Invocation Example                                    |
| :------------------- | :-------: | :------------------------------------------ | :---------------------------------------------------- |
| 🛠️ `devops-engineer` | 🔵 sonnet | AWS, GCP, Azure, Kubernetes, Terraform      | "Use the devops-engineer agent to set up Kubernetes"  |
| 🧠 `ml-engineer`     | 🔵 sonnet | PyTorch, TensorFlow, LLM integration, MLOps | "Use the ml-engineer agent to fine-tune the model"    |
| 🌍 `i18n-specialist` | 🔵 sonnet | Internationalization, localization, RTL     | "Use the i18n-specialist agent to add French support" |

### 📚 Support Agents

| Agent                     |   Model   | Purpose                                       | Invocation Example                                        |
| :------------------------ | :-------: | :-------------------------------------------- | :-------------------------------------------------------- |
| 📖 `documentation-writer` | 🟢 haiku  | READMEs, API docs, guides, tutorials          | "Use the documentation-writer agent to document this API" |
| 💡 `code-explainer`       | 🟢 haiku  | Clear explanations of complex code            | "Use the code-explainer agent to explain this algorithm"  |
| ♿ `accessibility-expert` | 🔵 sonnet | WCAG compliance, screen readers, keyboard nav | "Use the accessibility-expert agent to audit this form"   |

### 🎨 Model Selection Guide

| Model         | Use For                                          | Token Cost |
| :------------ | :----------------------------------------------- | :--------: |
| 🟣 **opus**   | Complex analysis, architecture, thorough reviews | ⬆️ Highest |
| 🔵 **sonnet** | Standard tasks, balanced speed/quality           | ➡️ Medium  |
| 🟢 **haiku**  | Quick tasks, documentation, explanations         | ⬇️ Lowest  |

---

## 🏪 Complete Marketplaces Reference (67 Marketplaces)

> **📊 Total: 1,900+ additional skills** from 67 external repositories

### 🏛️ Official Anthropic (67 Marketplaces)

| Marketplace                  | GitHub                                                                                      | Contents                                          | Key Features                                 |
| :--------------------------- | :------------------------------------------------------------------------------------------ | :------------------------------------------------ | :------------------------------------------- |
| 📘 `anthropic-agent-skills`  | [anthropics/skills](https://github.com/anthropics/skills)                                   | Document skills, example patterns                 | Canonical skill format, Anthropic-maintained |
| 🔧 `claude-code-plugins`     | [anthropics/claude-code](https://github.com/anthropics/claude-code)                         | PR review, commit commands, feature dev, security | Production-tested, regularly updated         |
| 📦 `claude-plugins-official` | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Curated plugins                                   | Vetted by Anthropic team                     |

### ⚡ Taches/GlitterCowboy (67 Marketplaces)

| Marketplace              | GitHub                                                                                    | Contents                                                 | Key Features                                          |
| :----------------------- | :---------------------------------------------------------------------------------------- | :------------------------------------------------------- | :---------------------------------------------------- |
| 🧠 `taches-cc-resources` | [glittercowboy/taches-cc-resources](https://github.com/glittercowboy/taches-cc-resources) | Meta-prompting, debugging, hooks, agents, skill creation | `/consider:*` decision frameworks, prompt engineering |
| 📈 `get-shit-done`       | [glittercowboy/get-shit-done](https://github.com/glittercowboy/get-shit-done)             | GSD multi-phase project management                       | `/gsd:*` commands, session continuity                 |

### 📚 Large Collections (67 Marketplaces)

| Marketplace                          | GitHub                                                                                                                |                  Count                  | Key Features                                   |
| :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :-------------------------------------: | :--------------------------------------------- |
| 🤖 `wshobson-agents`                 | [wshobson/agents](https://github.com/wshobson/agents)                                                                 | 36 agents, 72 skills, 15 orchestrators | Progressive disclosure architecture            |
| ⚡ `voltagent-subagents`             | [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)                 |         100+ specialized agents         | Full-stack, DevOps focus                       |
| 🎯 `voltagent-awesome-claude-skills` | [VoltAgent/awesome-claude-skills](https://github.com/VoltAgent/awesome-claude-skills)                                 |           Curated collection            | VoltAgent curation                             |
| 🔬 `claude-scientific-skills`        | [K-Dense-AI/claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills)                         |               125+ skills               | Bioinformatics, chemistry, physics, proteomics |

### ⭐ Curated Collections (67 Marketplaces)

| Marketplace                | GitHub                                                                                              |   Count    | Key Features                            |
| :------------------------- | :-------------------------------------------------------------------------------------------------- | :--------: | :-------------------------------------- |
| 📄 `awesome-claude-skills` | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)             | 72 skills  | Documents, canvas, forensics, invoices  |
| 🛠️ `skillsforge`           | [rawveg/skillsforge-marketplace](https://github.com/rawveg/skillsforge-marketplace)                 | 72 skills  | Quality-focused curation                |
| 🔀 `mhattingpete-skills`   | [mhattingpete/claude-skills-marketplace](https://github.com/mhattingpete/claude-skills-marketplace) | 10+ skills | Git automation, testing, code review    |
| 💪 `obra-superpowers`      | [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace)                     | ~72 skills | /brainstorm, /write-plan, /execute-plan |

### 🌐 Community Collections (67 Marketplaces)

| Marketplace                           | GitHub                                                                                  | Key Features                              |
| :------------------------------------ | :-------------------------------------------------------------------------------------- | :---------------------------------------- |
| 📋 `travisvn-awesome-claude-skills`   | [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills)     | Broad coverage, resources, tools          |
| ⌨️ `hesreallyhim-awesome-claude-code` | [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | Slash-commands, CLAUDE.md examples        |
| 🔧 `alirezarezvani-claude-skills`     | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)         | Skills + subagents collection             |
| 📂 `behisecc-awesome-claude-skills`   | [BehiSecc/awesome-claude-skills](https://github.com/BehiSecc/awesome-claude-skills)     | Domain organization                       |
| 📚 `alvinunreal-awesome-claude`       | [alvinunreal/awesome-claude](https://github.com/alvinunreal/awesome-claude)             | Broader Claude resources                  |
| 🔍 `skill-seekers`                    | [yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers)         | Auto-generate skills from docs/repos/PDFs |

### 🤖 Autonomous Development (1 Marketplace)

| Marketplace      | GitHub                                                            | Key Features                                                                                |
| :--------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| 🤖 `auto-claude` | [AndyMik90/Auto-Claude](https://github.com/AndyMik90/Auto-Claude) | Multi-agent autonomous coding, QA validation loops, git worktree isolation, Graphiti memory |

**Setup:** Requires Python 3.12+, OAuth token from `/settings`, optional Graphiti embeddings (Gemini/Ollama/Sentence Transformers)
**Usage:** `/auto-claude [description]` or direct CLI
**Documentation:** [docs/AUTO-CLAUDE-GUIDE.md](./docs/AUTO-CLAUDE-GUIDE.md)

### 🧠 Specialized (67 Marketplaces)

| Marketplace                    | GitHub                                                                    | Key Features                                           |
| :----------------------------- | :------------------------------------------------------------------------ | :----------------------------------------------------- |
| 💾 `claude-mem`                | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)         | Persistent memory, semantic search, session continuity |
| 🔬 `mvanhorn-last30days-skill` | [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | Research any topic from the last 30 days               |

### 🔍 Searching Marketplaces

```bash
# Find skills by keyword
find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -l "react"

# Find commands
find ~/.claude/plugins/marketplaces -name "*.md" -path "*/commands/*"

# Find agents
find ~/.claude/plugins/marketplaces -name "*.md" -path "*/agents/*"
```

### 🌐 External Discovery: skillsmp.com

Search **35,530+** community skills on [skillsmp.com](https://skillsmp.com):

```
/discover-skills react hooks
/discover-skills database optimization
/discover-skills kubernetes deployment
```

---

## 🪝 Git Hooks System

### 📋 Overview

Three git hooks enforce workflow compliance automatically:

```
.git/hooks/
├── 📝 pre-commit     # Runs before commit
├── 💬 commit-msg     # Validates commit message
└── 🚀 pre-push       # Runs before push
```

### 📝 Pre-Commit Hook

**Purpose:** Prevent secrets, validate files, enforce standards

| Check                    | Action                                                |    Bypass     |
| :----------------------- | :---------------------------------------------------- | :-----------: |
| 🔐 Secret Detection      | BLOCKS commit if API keys, passwords, tokens found    | `--no-verify` |
| 📋 CHANGELOG Reminder    | WARNS if significant changes without CHANGELOG update |       -       |
| 📝 SKILL.md Validation   | WARNS if skill files missing required headers         |       -       |
| 📁 Gitignore Enforcement | BLOCKS if trying to commit ignored files              | `--no-verify` |

**🔍 Detected Patterns:**

```
API keys:       sk-[a-zA-Z0-9]{20,}
                api[_-]?key.*=.*['\"][a-zA-Z0-9]
Passwords:      password.*=.*['\"][^'\"]+['\"]
Tokens:         token.*=.*['\"][a-zA-Z0-9]
Private keys:   -----BEGIN.*PRIVATE KEY-----
AWS:            AKIA[0-9A-Z]{16}
```

### 💬 Commit-Msg Hook

**Purpose:** Enforce conventional commit format

**📏 Required Format:**

```
type(scope): description

type: feat|fix|docs|style|refactor|perf|test|chore|build|ci
scope: optional, e.g., (auth), (api)
description: imperative mood, lowercase
```

**✅ Examples:**

```bash
git commit -m "feat: add user authentication"        # ✅ Valid
git commit -m "feat(auth): implement JWT tokens"     # ✅ Valid
git commit -m "fix: resolve memory leak in cache"   # ✅ Valid
git commit -m "Added new feature"                   # ❌ BLOCKED
git commit -m "WIP"                                 # ❌ BLOCKED
```

### 🚀 Pre-Push Hook

**Purpose:** Protect branches, validate remotes

| Check                    | Action                                |        Bypass         |
| :----------------------- | :------------------------------------ | :-------------------: |
| 🛡️ Force-Push Protection | BLOCKS force push to master/main      | `--force --no-verify` |
| 🔗 Remote Validation     | WARNS if pushing to unexpected remote |           -           |
| 📦 Submodule Awareness   | Notes marketplace submodule changes   |           -           |

### 🔧 Installation

```bash
# Install hooks
bash ~/.claude/scripts/setup-hooks.sh

# Verify installation
ls -la ~/.claude/.git/hooks/

# Test pre-commit manually
bash ~/.claude/.git/hooks/pre-commit
```

### ⚠️ Emergency Bypass

**Use only for genuine emergencies:**

```bash
# Skip all hooks
git commit --no-verify -m "hotfix: critical security patch"
git push --no-verify

# Skip specific hook
git push --force --no-verify  # Skip pre-push only
```

---

## ⚡ Claude Code Lifecycle Hooks

### 📋 Overview

Claude Code hooks run at specific lifecycle events. This toolkit uses **PostToolUse** hooks for auto-formatting.

```json
{
  "hooks": {
    "PostToolUse": [...]   // ✨ Auto-format after Write/Edit
  }
}
```

### 📊 Active Hooks (v1.4.3+)

| Hook                       | Trigger             | Action                            |
| :------------------------- | :------------------ | :-------------------------------- |
| ✨ **PostToolUse (Write)** | After file creation | Auto-runs Prettier for formatting |
| ✨ **PostToolUse (Edit)**  | After file edit     | Auto-runs Prettier for formatting |

### ✨ PostToolUse Hook (Formatting)

**Purpose:** Auto-format files after Write/Edit using [Prettier](https://prettier.io)

```json
{
  "PostToolUse": [
    {
      "matcher": "Write",
      "hooks": [
        {
          "type": "command",
          "command": "npx prettier --write \"$CLAUDE_FILE_PATH\"",
          "statusMessage": "Formatting with Prettier"
        }
      ]
    },
    {
      "matcher": "Edit",
      "hooks": [
        {
          "type": "command",
          "command": "npx prettier --write \"$CLAUDE_FILE_PATH\"",
          "statusMessage": "Formatting with Prettier"
        }
      ]
    }
  ]
}
```

### ⚠️ Removed Hooks (v1.4.3)

The following hooks were removed for Windows compatibility:

| Hook              | Previous Purpose         | Why Removed                |
| :---------------- | :----------------------- | :------------------------- | --- | ------ |
| SessionStart      | Display toolkit banner   | Unix syntax (`             |     | true`) |
| Stop              | Desktop notification     | Platform-specific commands |
| SessionEnd        | Log session end          | Unix `$(date)` syntax      |
| PreCompact        | Log context compaction   | Unix syntax                |
| Notification      | Log notifications        | Unix `~/.claude/` paths    |
| UserPromptSubmit  | Log prompts              | Unix syntax                |
| PermissionRequest | Log permissions          | Unix syntax                |
| SubagentStop      | Log agent completion     | Unix syntax                |
| PreToolUse        | Block dangerous commands | Unix `grep` syntax         |

**Reason:** These hooks used Unix-specific syntax (`|| true`, `$(date)`, `~/.claude/`, `2>/dev/null`) that fails on Windows PowerShell/CMD. The logging hooks provided minimal value anyway.

See [CHANGELOG.md](CHANGELOG.md) for full details

---

## 🔌 MCP Servers

### 📋 Overview

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) servers extend Claude Code capabilities. **All disabled by default** to save tokens.

### 📊 Available Servers

| Server                   | Purpose                     | Token Cost | Enable When                     |
| :----------------------- | :-------------------------- | :--------: | :------------------------------ |
| 🧠 `sequential-thinking` | Structured reasoning chains |    ~500    | Complex decisions, architecture |
| 🎭 `playwright`          | Browser testing/automation  |   ~2,000   | E2E tests, web scraping         |
| 💾 `memory`              | Persistent knowledge base   |    ~800    | Multi-session projects          |
| 📁 `filesystem`          | Enhanced file operations    |   ~1,500   | Bulk file work                  |
| 🗄️ `sqlite`              | Database operations         |   ~1,000   | SQLite work                     |
| 🔍 `chrome-devtools`     | Browser debugging           |    ~500    | Frontend debugging              |
| 🤖 `puppeteer`           | Browser automation          |   ~1,500   | Alternative to Playwright       |

### 🔧 Management

```bash
# View all servers
/mcp

# Enable for task
/mcp enable playwright

# Disable after use (important!)
/mcp disable playwright
```

### 💡 Best Practice

1. ⬜ Keep all disabled by default
2. ✅ Enable only when needed
3. ⬜ Disable immediately after use
4. 💰 Saves ~6,000+ tokens per session

---

## 🔬 Technical Deep Dives

This section provides comprehensive technical details for power users who want to understand or extend the toolkit.

### 📜 CLAUDE.md Anatomy

The CLAUDE.md file is the **constitution** of the toolkit - loaded every session and defining core behavior.

#### 📊 Section-by-Section Analysis

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CLAUDE.MD STRUCTURE                                  │
│                         (~1,100 tokens total)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  SECTION 1: Identity & Role (~150 tokens)                               │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  **Role:** Lead Autonomous Engineer & Architect                        │ │
│  │                                                                         │ │
│  │  PURPOSE:                                                               │ │
│  │  - Establishes Claude's persona for the project                        │ │
│  │  - Sets expectations for autonomy level                                │ │
│  │  - Defines default thinking mode (ULTRATHINK)                          │ │
│  │                                                                         │ │
│  │  KEY PRINCIPLES:                                                        │ │
│  │  - Projects are ~1% complete → build primitives that scale             │ │
│  │  - Fix root causes, not symptoms                                        │ │
│  │  - Explicit > clever                                                    │ │
│  │  - Direct communication                                                 │ │
│  │                                                                         │ │
│  │  WHY THIS MATTERS:                                                      │ │
│  │  Claude behaves differently with different identity framings.           │ │
│  │  "Lead Engineer" produces more thorough, production-quality work       │ │
│  │  than generic "assistant" framing.                                      │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  SECTION 2: P0 Non-Negotiables (~100 tokens)                            │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  Priority 0 requirements that MUST be met:                              │ │
│  │                                                                         │ │
│  │  🛡️ DATA INTEGRITY                                                      │ │
│  │  - Never lose user data                                                 │ │
│  │  - Reversible migrations only                                           │ │
│  │  - Backup before destructive operations                                 │ │
│  │                                                                         │ │
│  │  🔒 SECURITY                                                             │ │
│  │  - Sanitize all inputs                                                  │ │
│  │  - No innerHTML for user content                                        │ │
│  │  - No committed secrets                                                 │ │
│  │                                                                         │ │
│  │  🎯 COHERENCE                                                            │ │
│  │  - Follow existing patterns                                             │ │
│  │  - No competing paradigms                                               │ │
│  │  - Consistency over cleverness                                          │ │
│  │                                                                         │ │
│  │  📦 ATOMIC DELIVERY                                                      │ │
│  │  - Small diffs                                                          │ │
│  │  - Explain the "why"                                                    │ │
│  │  - Reviewable changes                                                   │ │
│  │                                                                         │ │
│  │  WHY THIS MATTERS:                                                      │ │
│  │  These are the "never violate" rules. Even under time pressure,        │ │
│  │  Claude will not take shortcuts that violate these principles.          │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  SECTION 3: Workflow (~150 tokens)                                      │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  Standard workflow phases:                                              │ │
│  │                                                                         │ │
│  │  1. 📝 PLAN FIRST                                                       │ │
│  │     - Create tasks/<name>.md for non-trivial work                       │ │
│  │     - Document approach before implementation                           │ │
│  │                                                                         │ │
│  │  2. ✅ APPROVAL GATE                                                    │ │
│  │     - Use ExitPlanMode before code changes                              │ │
│  │     - User sees and approves the plan                                   │ │
│  │                                                                         │ │
│  │  3. ⚙️ EXECUTE                                                          │ │
│  │     - Use TodoWrite to track progress                                   │ │
│  │     - Small, atomic changes                                             │ │
│  │                                                                         │ │
│  │  4. ✔️ VERIFY                                                            │ │
│  │     - Tests + manual checks                                             │ │
│  │     - Code review (automatic or requested)                              │ │
│  │                                                                         │ │
│  │  5. 💾 AUTO-COMMIT                                                       │ │
│  │     - Commit when task complete (user repos only)                       │ │
│  │                                                                         │ │
│  │  6. 🚀 AUTO-PUSH                                                         │ │
│  │     - Push when commit complete (user repos only)                       │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  SECTION 4: Always Available (~100 tokens)                              │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  These tools are ALWAYS accessible, never blocked:                      │ │
│  │                                                                         │ │
│  │  🌐 WebSearch      - Current info, docs                                │ │
│  │  🎓 Skills         - Auto-activates on context                         │ │
│  │  🤖 Agents         - Task tool with specialist                         │ │
│  │  🔍 Research       - Task tool with Explore agent                      │ │
│  │  🧠 Decisions      - /consider:* frameworks                            │ │
│  │  📊 TodoWrite      - Progress tracking                                 │ │
│  │                                                                         │ │
│  │  WHY THIS MATTERS:                                                      │ │
│  │  Prevents Claude from getting "stuck" waiting for permission.           │ │
│  │  Research and discovery are always unblocked.                           │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  SECTION 5: Tool Policy (~80 tokens)                                    │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  Prefer specialized tools over bash equivalents:                        │ │
│  │                                                                         │ │
│  │  ┌──────────────┬───────────────────────────────────────┐              │ │
│  │  │ Instead of   │ Use                                   │              │ │
│  │  ├──────────────┼───────────────────────────────────────┤              │ │
│  │  │ cat, head    │ Read tool                             │              │ │
│  │  │ grep, rg     │ Grep tool                             │              │ │
│  │  │ find, ls     │ Glob tool                             │              │ │
│  │  └──────────────┴───────────────────────────────────────┘              │ │
│  │                                                                         │ │
│  │  WHY THIS MATTERS:                                                      │ │
│  │  - Specialized tools are faster                                         │ │
│  │  - Better output formatting                                             │ │
│  │  - Cross-platform compatible                                            │ │
│  │  - More context-aware                                                   │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  SECTION 6: Code Standards (~100 tokens)                                │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  📏 TYPES                                                               │ │
│  │  - Strict mode always                                                   │ │
│  │  - No "any" type                                                        │ │
│  │  - Use "unknown" for external data                                      │ │
│  │                                                                         │ │
│  │  📐 FUNCTIONS                                                           │ │
│  │  - < 50 lines each                                                      │ │
│  │  - < 5 parameters                                                       │ │
│  │                                                                         │ │
│  │  📄 FILES                                                               │ │
│  │  - < 300 lines                                                          │ │
│  │                                                                         │ │
│  │  🔄 DRY                                                                 │ │
│  │  - Extract after 3rd repetition                                         │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  SECTION 7: Git Safety (~80 tokens)                                     │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  🚫 NEVER do:                                                           │ │
│  │  - Push unapproved work                                                 │ │
│  │  - Use --force without explicit request                                 │ │
│  │  - Commit secrets                                                       │ │
│  │                                                                         │ │
│  │  ✅ ALWAYS:                                                              │ │
│  │  - Auto-commit to user repos only                                       │ │
│  │  - Use main/master branch                                               │ │
│  │  - Treat external repos as read-only                                    │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  SECTION 8: Anti-Patterns (~60 tokens)                                  │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  Things to actively avoid:                                              │ │
│  │                                                                         │ │
│  │  ❌ Using "any" type                                                    │ │
│  │  ❌ innerHTML for user content                                          │ │
│  │  ❌ Proposing changes to unread code                                    │ │
│  │  ❌ Leaving dev server running                                          │ │
│  │  ❌ Generic task names (todo.md)                                        │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  SECTION 9: Load When Relevant (~150 tokens)                            │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  Contextual file loading triggers:                                      │ │
│  │                                                                         │ │
│  │  ┌────────────────────────┬────────────────────────────────┐           │ │
│  │  │ Context                │ Load File                      │           │ │
│  │  ├────────────────────────┼────────────────────────────────┤           │ │
│  │  │ Visual/UI changes      │ ui-visual-changes.md           │           │ │
│  │  │ Scripts/automation     │ automation-scripts.md          │           │ │
│  │  │ Static HTML/CSS/JS     │ static-sites.md                │           │ │
│  │  │ React + TypeScript     │ react-typescript.md            │           │ │
│  │  │ Python                 │ python.md                      │           │ │
│  │  │ Go projects            │ go.md                          │           │ │
│  │  │ Rust projects          │ rust.md                        │           │ │
│  │  │ Full-stack Next/Nest   │ fullstack-nextjs-nestjs.md     │           │ │
│  │  │ MCP server usage       │ mcp-servers.md                 │           │ │
│  │  │ Git hooks              │ git-hooks-setup.md             │           │ │
│  │  │ Troubleshooting        │ troubleshooting.md             │           │ │
│  │  │ External repos         │ external-repos.md              │           │ │
│  │  │ Multi-phase projects   │ GSD-TUTORIAL.md                │           │ │
│  │  │ Marketplace skills     │ MARKETPLACE-GUIDE.md           │           │ │
│  │  └────────────────────────┴────────────────────────────────┘           │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  SECTION 10: Skill Discovery (~130 tokens)                              │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                         │ │
│  │  LOCAL SKILLS (71 total)                                                │ │
│  │  - Full catalog: skills/MASTER_INDEX.md                                 │ │
│  │  - Domain experts: skills/EXPERT-SKILLS-GUIDE.md                        │ │
│  │                                                                         │ │
│  │  MARKETPLACE SKILLS (1,900+)                                            │ │
│  │  - Location: plugins/marketplaces/                                      │ │
│  │  - Guide: docs/MARKETPLACE-GUIDE.md                                     │ │
│  │  - Search command provided                                              │ │
│  │                                                                         │ │
│  │  EXTERNAL DISCOVERY                                                     │ │
│  │  - /discover-skills <query> for skillsmp.com                            │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### ⚙️ settings.json Complete Reference

The settings.json file controls Claude Code behavior, permissions, and hooks.

#### 📋 Complete Schema

```json
{
  // ═══════════════════════════════════════════════════════════════════════════
  // PERMISSIONS SECTION
  // Controls what Claude can do without asking
  // ═══════════════════════════════════════════════════════════════════════════
  "permissions": {
    // ALLOW LIST: Tools Claude can use without prompting
    "allow": [
      // ─────────────────────────────────────────────────────────────────────
      // SLASH COMMANDS - Marketplace and plugin commands
      // ─────────────────────────────────────────────────────────────────────
      "SlashCommand(/gsd:*)", // All GSD commands
      "SlashCommand(/taches-cc-resources:*)", // Decision frameworks, creation
      "SlashCommand(/commit-commands:*)", // Commit automation
      "SlashCommand(/feature-dev:*)", // Feature development
      "SlashCommand(/pr-review-toolkit:*)", // PR review tools
      "SlashCommand(/run-prompt:*)", // Run prompts

      // ─────────────────────────────────────────────────────────────────────
      // GIT OPERATIONS - Version control
      // ─────────────────────────────────────────────────────────────────────
      "Bash(git add:*)", // Stage files
      "Bash(git rm:*)", // Remove files
      "Bash(git commit:*)", // Create commits
      "Bash(git worktree:*)", // Worktree management
      "Bash(git fetch:*)", // Fetch from remote
      "Bash(git merge:*)", // Merge branches
      "Bash(git reset:*)", // Reset changes
      "Bash(git status:*)", // Check status
      "Bash(git log:*)", // View history
      "Bash(git diff:*)", // View changes
      "Bash(git branch:*)", // Branch operations
      "Bash(git checkout:*)", // Switch branches
      "Bash(git stash:*)", // Stash changes
      "Bash(git show:*)", // Show commits

      // ─────────────────────────────────────────────────────────────────────
      // PACKAGE MANAGERS - Dependency management
      // ─────────────────────────────────────────────────────────────────────
      "Bash(npm run:*)", // Run npm scripts
      "Bash(npm test:*)", // Run tests
      "Bash(npm install:*)", // Install packages
      "Bash(npm uninstall:*)", // Remove packages
      "Bash(npm audit:*)", // Security audit
      "Bash(npm ci:*)", // Clean install
      "Bash(npx:*)", // Run package binaries
      "Bash(pnpm:*)", // pnpm operations
      "Bash(yarn:*)", // yarn operations

      // ─────────────────────────────────────────────────────────────────────
      // LANGUAGES & RUNTIMES
      // ─────────────────────────────────────────────────────────────────────
      "Bash(node:*)", // Node.js
      "Bash(python:*)", // Python
      "Bash(python3:*)", // Python 3
      "Bash(pip:*)", // pip
      "Bash(uv:*)", // uv (fast Python)
      "Bash(ruff:*)", // Ruff linter
      "Bash(mypy:*)", // Type checker
      "Bash(pytest:*)", // Python tests

      // ─────────────────────────────────────────────────────────────────────
      // DEVOPS TOOLS
      // ─────────────────────────────────────────────────────────────────────
      "Bash(docker:*)", // Docker
      "Bash(docker-compose:*)", // Docker Compose
      "Bash(gh:*)", // GitHub CLI

      // ─────────────────────────────────────────────────────────────────────
      // NETWORK & UTILITIES
      // ─────────────────────────────────────────────────────────────────────
      "Bash(curl:*)", // HTTP requests
      "Bash(wget:*)", // File download
      "Bash(test:*)", // Test conditions

      // ─────────────────────────────────────────────────────────────────────
      // FILE OPERATIONS
      // ─────────────────────────────────────────────────────────────────────
      "Bash(cat:*)", // Read files
      "Bash(ls:*)", // List files
      "Bash(dir:*)", // Windows list
      "Bash(find:*)", // Find files
      "Bash(findstr:*)", // Windows search
      "Bash(tree:*)", // Directory tree
      "Bash(head:*)", // File head
      "Bash(tail:*)", // File tail
      "Bash(wc:*)", // Word count
      "Bash(mkdir:*)", // Create directory
      "Bash(cp:*)", // Copy files
      "Bash(mv:*)", // Move files

      // ─────────────────────────────────────────────────────────────────────
      // WINDOWS POWERSHELL
      // ─────────────────────────────────────────────────────────────────────
      "Bash(powershell -Command:*)",
      "Bash(Get-ChildItem:*)",
      "Bash(Get-NetTCPConnection:*)",
      "Bash(Select-Object:*)",
      "Bash(ForEach-Object:*)",
      "Bash(Format-Table:*)",

      // ─────────────────────────────────────────────────────────────────────
      // SKILLS
      // ─────────────────────────────────────────────────────────────────────
      "Skill(tech-debt-analyzer)",
      "Skill(debug-like-expert)",
      "Skill(generic-code-reviewer)",
      "Skill(generic-feature-developer)",
      "Skill(test-specialist)",
      "Skill(codebase-documenter)",

      // ─────────────────────────────────────────────────────────────────────
      // WEB ACCESS
      // ─────────────────────────────────────────────────────────────────────
      "WebSearch", // Search engine
      "WebFetch(domain:docs.anthropic.com)", // Anthropic docs
      "WebFetch(domain:react.dev)", // React docs
      "WebFetch(domain:nextjs.org)", // Next.js docs
      "WebFetch(domain:typescriptlang.org)", // TypeScript docs
      "WebFetch(domain:nodejs.org)", // Node.js docs
      "WebFetch(domain:developer.mozilla.org)", // MDN
      "WebFetch(domain:github.com)", // GitHub
      // ... more domains

      // ─────────────────────────────────────────────────────────────────────
      // MCP TOOLS (granular permissions)
      // ─────────────────────────────────────────────────────────────────────
      "mcp__memory__*", // All memory tools
      "mcp__filesystem__read_file", // Read only
      "mcp__filesystem__list_directory", // List only
      "mcp__sqlite__read_query", // Read only
      "mcp__sequential-thinking__*" // All thinking tools
    ],

    // DENY LIST: Tools Claude cannot use even if asked
    "deny": [
      "mcp__filesystem__write_file" // No file writes via MCP
    ],

    // DEFAULT MODE: What to do for unlisted tools
    // "bypassPermissions" - Allow without asking (⚠️ use with caution)
    // "askUser" - Prompt for each new tool
    "defaultMode": "bypassPermissions"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HOOKS SECTION
  // Lifecycle event handlers (v1.4.3+ - simplified for Windows compatibility)
  // ═══════════════════════════════════════════════════════════════════════════
  "hooks": {
    // POST-TOOL USE - Auto-format after Write/Edit
    // Only high-value, Windows-compatible hooks are kept
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \"$CLAUDE_FILE_PATH\"",
            "statusMessage": "Formatting with Prettier"
          }
        ]
      },
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \"$CLAUDE_FILE_PATH\"",
            "statusMessage": "Formatting with Prettier"
          }
        ]
      }
    ]

    // NOTE: Other hooks (SessionStart, Stop, PreToolUse, etc.) were removed
    // in v1.4.3 because they used Unix-specific syntax incompatible with
    // Windows PowerShell/CMD. See CHANGELOG.md for details.
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MCP CONFIGURATION
  // Model Context Protocol servers
  // ═══════════════════════════════════════════════════════════════════════════

  // Whether to auto-enable all MCP servers defined in .mcp.json
  "enableAllProjectMcpServers": false,

  // Explicitly disabled servers (even if in .mcp.json)
  "disabledMcpjsonServers": [
    "sequential-thinking",
    "playwright",
    "memory",
    "filesystem",
    "sqlite",
    "context7",
    "chrome-devtools",
    "puppeteer",
    "browserbase"
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // PLUGINS
  // Enabled marketplace plugins
  // ═══════════════════════════════════════════════════════════════════════════
  "enabledPlugins": {
    "agent-sdk-dev@claude-code-plugins": true,
    "pr-review-toolkit@claude-code-plugins": true,
    "commit-commands@claude-code-plugins": true,
    "feature-dev@claude-code-plugins": true,
    "taches-cc-resources@taches-cc-resources": true
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BEHAVIOR
  // Claude Code behavior settings
  // ═══════════════════════════════════════════════════════════════════════════

  // Always show thinking (extended reasoning)
  "alwaysThinkingEnabled": true,

  // Spinner tips while processing
  "spinnerTipsEnabled": false
}
```

### 🪝 Hook Development Guide

Creating custom hooks requires understanding the hook system architecture.

#### 📋 Hook Types Reference

| Hook Event          | Trigger                | Can Block? | Use Case                         |
| :------------------ | :--------------------- | :--------: | :------------------------------- |
| `SessionStart`      | New session begins     |   ❌ No    | Display status, initialize state |
| `SessionEnd`        | Session terminates     |   ❌ No    | Cleanup, logging                 |
| `Stop`              | Claude awaits input    |   ❌ No    | Notifications                    |
| `PreToolUse`        | Before tool runs       |   ✅ Yes   | Validation, safety               |
| `PostToolUse`       | After tool completes   |   ❌ No    | Formatting, logging              |
| `Notification`      | System notification    |   ❌ No    | Logging                          |
| `PreCompact`        | Before context compact |   ❌ No    | Checkpointing                    |
| `UserPromptSubmit`  | User sends message     |   ❌ No    | Logging, preprocessing           |
| `PermissionRequest` | Tool needs approval    |   ❌ No    | Audit logging                    |
| `SubagentStop`      | Agent completes        |   ❌ No    | Agent tracking                   |

#### 📝 Creating a Custom Hook

```json
{
  "hooks": {
    "PostToolUse": [
      {
        // MATCHER: Which tools trigger this hook
        // Empty string "" matches ALL tools
        // "Write" matches tool names containing "Write"
        // "Bash" matches all Bash commands
        "matcher": "Write",

        "hooks": [
          {
            // TYPE: Currently only "command" is supported
            "type": "command",

            // COMMAND: Shell command to run
            // Available variables:
            // - $FILE_PATH: Path to affected file
            // - $TOOL_NAME: Name of the tool
            // - $TOOL_INPUT: Tool input (be careful with large inputs)
            "command": "npx prettier --write \"$FILE_PATH\" 2>/dev/null || true",

            // STATUS MESSAGE: Shown in Claude Code UI
            "statusMessage": "Formatting file",

            // TIMEOUT: Max execution time in ms (default: 10000)
            "timeout": 5000
          }
        ]
      }
    ]
  }
}
```

#### 🔒 Creating a Blocking Hook (PreToolUse)

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'DANGEROUS_PATTERNS=\"rm -rf /|rm -rf ~|format c:|del /s /q c:\"; INPUT=\"$TOOL_INPUT\"; if echo \"$INPUT\" | grep -qiE \"$DANGEROUS_PATTERNS\"; then echo \"BLOCKED: Dangerous command detected\"; exit 1; fi; exit 0'",
            "statusMessage": "Checking command safety",
            "timeout": 1000
          }
        ]
      }
    ]
  }
}

// HOW BLOCKING WORKS:
// - exit 0 → Tool proceeds normally
// - exit 1 → Tool is BLOCKED, Claude sees error message
// - Only PreToolUse can block; other hooks always continue
```

#### 🌐 Cross-Platform Hook Example

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "if [[ \"$OSTYPE\" == \"darwin\"* ]]; then osascript -e 'display notification \"Task complete\" with title \"Claude Code\"' 2>/dev/null; elif [[ \"$OSTYPE\" == \"msys\" ]] || [[ \"$OSTYPE\" == \"cygwin\" ]]; then powershell -Command \"[Windows.UI.Notifications.ToastNotificationManager...]\" 2>/dev/null; elif command -v notify-send &>/dev/null; then notify-send 'Claude Code' 'Task complete'; fi",
            "statusMessage": "Sending notification",
            "timeout": 5000
          }
        ]
      }
    ]
  }
}
```

### 🔌 MCP Server Development

MCP (Model Context Protocol) servers extend Claude's capabilities. Here's how they work:

#### 📊 MCP Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          MCP ARCHITECTURE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         CLAUDE CODE                                   │   │
│  │                                                                       │   │
│  │  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐             │   │
│  │  │   Built-in  │     │    Skill    │     │   Custom    │             │   │
│  │  │   Tools     │     │   System    │     │   Commands  │             │   │
│  │  └─────────────┘     └─────────────┘     └─────────────┘             │   │
│  │         │                   │                   │                    │   │
│  │         └───────────────────┼───────────────────┘                    │   │
│  │                             │                                        │   │
│  │                     ┌───────┴───────┐                                │   │
│  │                     │  MCP CLIENT   │                                │   │
│  │                     │  (in Claude)  │                                │   │
│  │                     └───────┬───────┘                                │   │
│  │                             │                                        │   │
│  └─────────────────────────────┼────────────────────────────────────────┘   │
│                                │                                            │
│                    ┌───────────┼───────────┐                               │
│                    │           │           │                               │
│                    ▼           ▼           ▼                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       MCP SERVERS                                    │   │
│  │                       (Separate Processes)                           │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │  sequential │  │  playwright │  │   memory    │  │  filesystem │ │   │
│  │  │  -thinking  │  │             │  │             │  │             │ │   │
│  │  │             │  │  🎭 Browser │  │  🧠 Vector  │  │  📁 File    │ │   │
│  │  │  🧠 Reason  │  │  Automation │  │  Database   │  │  Operations │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  │                                                                      │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │   │
│  │  │   sqlite    │  │   chrome-   │  │  puppeteer  │                  │   │
│  │  │             │  │   devtools  │  │             │                  │   │
│  │  │  🗄️ Database│  │  🔍 Debug   │  │  🤖 Browser │                  │   │
│  │  │  Queries    │  │  Frontend   │  │  Control    │                  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

COMMUNICATION PROTOCOL:
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  Claude: "I need to run a browser test"                                     │
│                 │                                                            │
│                 ▼                                                            │
│  MCP Client: Find server with "playwright" capability                       │
│                 │                                                            │
│                 ▼                                                            │
│  MCP Server (playwright): Receives JSON-RPC request                         │
│  {                                                                          │
│    "method": "tools/call",                                                  │
│    "params": {                                                              │
│      "name": "browser_navigate",                                            │
│      "arguments": { "url": "https://example.com" }                          │
│    }                                                                        │
│  }                                                                          │
│                 │                                                            │
│                 ▼                                                            │
│  MCP Server: Executes, returns result                                       │
│  {                                                                          │
│    "content": [{ "type": "text", "text": "Page loaded successfully" }]     │
│  }                                                                          │
│                 │                                                            │
│                 ▼                                                            │
│  Claude: Receives result, continues conversation                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 📋 .mcp.json Configuration

```json
{
  "mcpServers": {
    // ─────────────────────────────────────────────────────────────────────
    // SEQUENTIAL THINKING - Structured reasoning
    // ─────────────────────────────────────────────────────────────────────
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-sequential-thinking"],
      "disabled": true // Enable with /mcp enable sequential-thinking
    },

    // ─────────────────────────────────────────────────────────────────────
    // PLAYWRIGHT - Browser automation
    // ─────────────────────────────────────────────────────────────────────
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"],
      "env": {
        "PLAYWRIGHT_BROWSERS_PATH": "0" // Use system browsers
      },
      "disabled": true
    },

    // ─────────────────────────────────────────────────────────────────────
    // MEMORY - Persistent knowledge base
    // ─────────────────────────────────────────────────────────────────────
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-memory"],
      "env": {
        "MEMORY_DB_PATH": "~/.claude/memory.db"
      },
      "disabled": true
    },

    // ─────────────────────────────────────────────────────────────────────
    // FILESYSTEM - Enhanced file operations
    // ─────────────────────────────────────────────────────────────────────
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-filesystem"],
      "disabled": true
    },

    // ─────────────────────────────────────────────────────────────────────
    // SQLITE - Database operations
    // ─────────────────────────────────────────────────────────────────────
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-sqlite"],
      "disabled": true
    }
  }
}
```

#### 🛠️ Platform-Specific Configuration

**Windows (.mcp.json):**

```json
{
  "mcpServers": {
    "playwright": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@anthropic/mcp-playwright"]
    }
  }
}
```

**macOS/Linux (.mcp.json):**

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"]
    }
  }
}
```

### 📦 Submodule Management

The toolkit uses git submodules for external repositories. Understanding this is key for maintenance.

#### 📊 Submodule Architecture

```
~/.claude/
├── .gitmodules                    ← Submodule declarations
├── plugins/
│   └── marketplaces/
│       ├── anthropic-agent-skills/     ← Submodule (read-only)
│       ├── awesome-claude-skills/      ← Submodule (read-only)
│       ├── auto-claude/                ← Submodule (read-only)
│       ├── claude-code-plugins/        ← Submodule (read-only)
│       ├── get-shit-done/              ← Submodule (read-only)
│       └── ... (50 total)              ← All read-only
```

#### 📋 Submodule Commands Reference

```bash
# ═══════════════════════════════════════════════════════════════════════════
# INITIALIZATION
# ═══════════════════════════════════════════════════════════════════════════

# Initialize all submodules after fresh clone
git submodule update --init --recursive

# ═══════════════════════════════════════════════════════════════════════════
# UPDATING
# ═══════════════════════════════════════════════════════════════════════════

# Update all submodules to latest
git submodule update --remote --merge

# Update specific submodule
git submodule update --remote --merge plugins/marketplaces/get-shit-done

# Convenience script (updates all)
bash ~/.claude/scripts/update-external-repos.sh

# ═══════════════════════════════════════════════════════════════════════════
# STATUS & DIAGNOSTICS
# ═══════════════════════════════════════════════════════════════════════════

# Check submodule status
git submodule status

# Check for changes in submodules
git submodule foreach 'git status'

# See submodule remotes (should show no_push)
git submodule foreach 'git remote -v'

# ═══════════════════════════════════════════════════════════════════════════
# ADDING NEW SUBMODULES
# ═══════════════════════════════════════════════════════════════════════════

# Add a new marketplace
cd ~/.claude
git submodule add https://github.com/owner/repo.git plugins/marketplaces/repo-name

# Set no-push to prevent accidental modifications
cd plugins/marketplaces/repo-name
git remote set-url --push origin no_push

# ═══════════════════════════════════════════════════════════════════════════
# REMOVING SUBMODULES
# ═══════════════════════════════════════════════════════════════════════════

# Remove a submodule
git submodule deinit -f plugins/marketplaces/repo-name
rm -rf .git/modules/plugins/marketplaces/repo-name
git rm -f plugins/marketplaces/repo-name

# ═══════════════════════════════════════════════════════════════════════════
# TROUBLESHOOTING
# ═══════════════════════════════════════════════════════════════════════════

# Submodule shows as modified but nothing changed
git submodule update --init plugins/marketplaces/repo-name

# Detached HEAD in submodule
cd plugins/marketplaces/repo-name
git checkout main  # or master

# Submodule points to old commit
cd ~/.claude
git submodule update --remote --merge
git add plugins/marketplaces
git commit -m "chore: update submodules"
```

#### 🔒 Why Read-Only (no_push)?

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          NO_PUSH PROTECTION                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PROBLEM: User accidentally modifies marketplace file                        │
│                                                                              │
│  Without no_push:                                                            │
│  ─────────────────                                                           │
│  1. User edits plugins/marketplaces/get-shit-done/README.md                  │
│  2. User runs: git add . && git commit -m "update"                           │
│  3. User runs: git push                                                      │
│  4. ❌ Changes pushed to glittercowboy/get-shit-done (wrong!)               │
│  5. User doesn't own that repo → Push fails with permission error            │
│  6. Confusion ensues                                                         │
│                                                                              │
│  With no_push:                                                               │
│  ─────────────                                                               │
│  1. User edits plugins/marketplaces/get-shit-done/README.md                  │
│  2. User runs: git add . && git commit -m "update"                           │
│  3. User runs: git push                                                      │
│  4. ✅ Push to ~/.claude repo succeeds                                      │
│  5. Submodule records new commit SHA (pointing to user's change)             │
│  6. But pushing INTO the submodule fails with:                               │
│     "fatal: 'no_push' does not appear to be a git repository"               │
│  7. This is EXPECTED - changes stay local                                    │
│                                                                              │
│  EFFECT:                                                                     │
│  - Can pull updates from upstream ✅                                        │
│  - Cannot push changes to upstream ✅                                       │
│  - Local modifications work for personal use ✅                              │
│  - Fork required to contribute back ✅                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📚 Usage Examples & Real-World Scenarios

This section provides **50+ real-world scenarios** with complete walkthroughs, showing exactly how to use the toolkit for common (and not-so-common) development tasks.

### 🚀 Quick Start Scenarios

#### Scenario 1: First-Time Setup Verification

**Situation:** You just installed the toolkit and want to verify everything works.

```bash
# Step 1: Verify directory structure
ls ~/.claude/
# Expected: CLAUDE.md, skills/, agents/, commands/, plugins/, rules/, docs/

# Step 2: Start Claude Code
claude

# Step 3: Run health check
/health-check verbose
```

**Expected Output:**

```
✓ CLAUDE.md loaded (194 lines, ~1,100 tokens)
✓ 72 skills available
✓ 36 agents available
✓ 67 marketplace repos synced
✓ 2 hooks configured (PostToolUse for Prettier)
✓ MCP servers: all disabled (optimal)
```

**Troubleshooting:**

- If skills count is 0: Check `~/.claude/skills/` directory exists
- If agents missing: Check `~/.claude/agents/` directory
- If hooks not working: Verify `settings.json` has hooks array

---

#### Scenario 2: Understanding What's Available

**Situation:** You want to explore what the toolkit can do.

```bash
# List all skills by domain
/list-skills

# Search for specific capability
/skill-finder "API design"

# Browse marketplace skills
find ~/.claude/plugins/marketplaces -name "SKILL.md" | head -20

# Count total available
echo "Local: $(find ~/.claude/skills -name 'SKILL.md' | wc -l)"
echo "Marketplace: $(find ~/.claude/plugins/marketplaces -name 'SKILL.md' | wc -l)"
```

**Pro Tips:**

- Skills auto-activate based on context, so you rarely need to invoke manually
- Use `/discover-skills <query>` to search skillsmp.com (1,900+ skills)
- Check `skills/MASTER_INDEX.md` for categorized local skill list

---

### 💻 Development Scenarios

#### Scenario 3: Starting a New React Project

**Situation:** Building a new React + TypeScript application from scratch.

**Prompt:**

```
/start-task Create a new React TypeScript app with:
- Vite as build tool
- Zustand for state management
- React Router for navigation
- TailwindCSS for styling
- Vitest for testing
```

**What Happens:**

1. `/start-task` routes to Planning Mode (complexity: high)
2. Skills auto-load: `generic-react-feature-developer`, `generic-react-design-system`
3. Claude creates a plan file for approval
4. After approval, executes with full context

**Expected Artifacts:**

```
project/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── stores/
│   ├── pages/
│   └── App.tsx
├── tests/
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

#### Scenario 4: Adding Authentication to Existing App

**Situation:** Your app needs user authentication.

**Prompt:**

```
/start-task Add authentication with:
- JWT tokens stored in httpOnly cookies
- Login/Register/Logout flows
- Protected routes
- Refresh token rotation
```

**Skills Activated:**

- `generic-react-feature-developer` - For React components
- `security` - For auth best practices
- `api-design` - For auth endpoints

**Key Security Checks (automatic):**

```
✓ Passwords hashed with bcrypt (cost factor 12+)
✓ JWT secret from environment variable
✓ httpOnly, Secure, SameSite=Strict cookies
✓ CSRF protection via double-submit pattern
✓ Rate limiting on auth endpoints
✓ Account lockout after failed attempts
```

---

#### Scenario 5: Debugging a Complex Issue

**Situation:** Your app crashes intermittently with no clear stack trace.

**Prompt:**

```
Skill(debug-like-expert)
The app crashes randomly when users submit forms. No consistent reproduction steps.
Error: "Cannot read property 'id' of undefined"
```

**Debugging Process (4-Phase Methodology):**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: GATHER                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ • What error message exactly?                                                │
│ • What user actions precede the crash?                                       │
│ • Is it environment-specific?                                                │
│ • What changed recently?                                                     │
└──────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2: HYPOTHESIZE                                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ H1: Race condition in form submission                                        │
│ H2: API returns null under certain conditions                                │
│ H3: State not properly initialized on component mount                        │
│ H4: Cached data mismatch after update                                        │
└──────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3: TEST                                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│ Test H1: Add logging around async operations                                 │
│ Test H2: Check API response handling for edge cases                          │
│ Test H3: Review useEffect dependencies and initialization                    │
│ Test H4: Clear cache and test, compare with cached behavior                  │
└──────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4: FIX & VERIFY                                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│ • Implement fix for confirmed hypothesis                                     │
│ • Add guard clauses for undefined access                                     │
│ • Write regression test                                                      │
│ • Verify in all environments                                                 │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

#### Scenario 6: Performance Optimization

**Situation:** Your React app is sluggish, especially on data-heavy pages.

**Prompt:**

```
My React app is slow when rendering large lists (1000+ items).
Bundle size is 2.5MB.
Time to Interactive is 8+ seconds.
Help me optimize performance.
```

**Analysis Steps:**

1. Bundle analysis with `npx vite-bundle-visualizer`
2. Lighthouse audit for Core Web Vitals
3. React Profiler for render bottlenecks
4. Network waterfall analysis

**Common Fixes Applied:**

```typescript
// BEFORE: Rendering all 1000 items
function ItemList({ items }: { items: Item[] }) {
  return (
    <div>
      {items.map(item => <ItemCard key={item.id} item={item} />)}
    </div>
  );
}

// AFTER: Virtualized list (only renders visible items)
import { useVirtualizer } from '@tanstack/react-virtual';

function ItemList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <ItemCard
            key={items[virtualRow.index].id}
            item={items[virtualRow.index]}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualRow.start}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

**Performance Results:**
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Bundle Size | 2.5MB | 850KB | 66% smaller |
| Time to Interactive | 8s | 2.1s | 74% faster |
| List Render | 2.3s | 16ms | 99% faster |
| Memory Usage | 180MB | 45MB | 75% less |

---

### 🔧 API & Backend Scenarios

#### Scenario 7: Designing a REST API

**Situation:** You need to design a REST API for a task management app.

**Prompt:**

```
Skill(api-design)
Design a REST API for task management with:
- Users, Projects, Tasks
- Task assignments and comments
- Due dates and priorities
- Search and filtering
```

**Generated API Specification:**

```yaml
openapi: 3.0.0
info:
  title: Task Management API
  version: 1.0.0

paths:
  /api/v1/projects:
    get:
      summary: List user's projects
      parameters:
        - name: page
          in: query
          schema: { type: integer, default: 1 }
        - name: limit
          in: query
          schema: { type: integer, default: 20, maximum: 100 }
        - name: sort
          in: query
          schema: { type: string, enum: [created_at, updated_at, name] }
      responses:
        200:
          description: Paginated project list
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    {
                      type: array,
                      items: { $ref: "#/components/schemas/Project" },
                    }
                  pagination: { $ref: "#/components/schemas/Pagination" }

  /api/v1/projects/{projectId}/tasks:
    get:
      summary: List tasks in project
      parameters:
        - name: projectId
          in: path
          required: true
          schema: { type: string, format: uuid }
        - name: status
          in: query
          schema: { type: string, enum: [todo, in_progress, done] }
        - name: priority
          in: query
          schema: { type: string, enum: [low, medium, high, urgent] }
        - name: assignee
          in: query
          schema: { type: string, format: uuid }
        - name: due_before
          in: query
          schema: { type: string, format: date }
        - name: search
          in: query
          schema: { type: string }
      responses:
        200:
          description: Filtered task list
    post:
      summary: Create task
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/CreateTaskInput" }
      responses:
        201:
          description: Task created

components:
  schemas:
    Project:
      type: object
      properties:
        id: { type: string, format: uuid }
        name: { type: string }
        description: { type: string }
        owner_id: { type: string, format: uuid }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }

    Task:
      type: object
      properties:
        id: { type: string, format: uuid }
        title: { type: string }
        description: { type: string }
        status: { type: string, enum: [todo, in_progress, done] }
        priority: { type: string, enum: [low, medium, high, urgent] }
        assignee_id: { type: string, format: uuid, nullable: true }
        due_date: { type: string, format: date, nullable: true }
        project_id: { type: string, format: uuid }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }
```

---

#### Scenario 8: Database Schema Design

**Situation:** Designing a database for an e-commerce platform.

**Prompt:**

```
Task(database-architect)
Design a PostgreSQL schema for e-commerce:
- Products with variants (size, color)
- Inventory tracking
- Orders and order items
- Customer accounts
- Discount codes and promotions
```

**Generated Schema:**

```sql
-- ═══════════════════════════════════════════════════════════════════════════
-- CUSTOMERS
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE customers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    first_name      VARCHAR(100),
    last_name       VARCHAR(100),
    phone           VARCHAR(20),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Indexes
    CONSTRAINT email_lowercase CHECK (email = LOWER(email))
);

CREATE INDEX idx_customers_email ON customers(email);

-- ═══════════════════════════════════════════════════════════════════════════
-- PRODUCTS
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE products (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku             VARCHAR(50) UNIQUE NOT NULL,
    name            VARCHAR(255) NOT NULL,
    description     TEXT,
    base_price      DECIMAL(10,2) NOT NULL CHECK (base_price >= 0),
    category_id     UUID REFERENCES categories(id),
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id) WHERE is_active;
CREATE INDEX idx_products_sku ON products(sku);

-- Product Variants (size, color combinations)
CREATE TABLE product_variants (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku             VARCHAR(50) UNIQUE NOT NULL,
    size            VARCHAR(20),
    color           VARCHAR(50),
    price_modifier  DECIMAL(10,2) DEFAULT 0,
    weight_grams    INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(product_id, size, color)
);

CREATE INDEX idx_variants_product ON product_variants(product_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- INVENTORY
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE inventory (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_id      UUID UNIQUE NOT NULL REFERENCES product_variants(id),
    quantity        INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    reserved        INTEGER NOT NULL DEFAULT 0 CHECK (reserved >= 0),
    low_stock_threshold INTEGER DEFAULT 10,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_reserved CHECK (reserved <= quantity)
);

-- Inventory Transactions (audit trail)
CREATE TABLE inventory_transactions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_id      UUID NOT NULL REFERENCES product_variants(id),
    quantity_change INTEGER NOT NULL,  -- positive = add, negative = remove
    reason          VARCHAR(50) NOT NULL,  -- 'sale', 'return', 'adjustment', 'restock'
    reference_id    UUID,  -- order_id or adjustment_id
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inv_trans_variant ON inventory_transactions(variant_id, created_at DESC);

-- ═══════════════════════════════════════════════════════════════════════════
-- ORDERS
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE orders (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id     UUID REFERENCES customers(id),
    status          VARCHAR(20) NOT NULL DEFAULT 'pending',
    subtotal        DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount      DECIMAL(10,2) NOT NULL,
    shipping_amount DECIMAL(10,2) NOT NULL,
    total           DECIMAL(10,2) NOT NULL,
    discount_code_id UUID REFERENCES discount_codes(id),
    shipping_address JSONB NOT NULL,
    billing_address  JSONB NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'))
);

CREATE INDEX idx_orders_customer ON orders(customer_id, created_at DESC);
CREATE INDEX idx_orders_status ON orders(status) WHERE status NOT IN ('delivered', 'cancelled');

CREATE TABLE order_items (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    variant_id      UUID NOT NULL REFERENCES product_variants(id),
    quantity        INTEGER NOT NULL CHECK (quantity > 0),
    unit_price      DECIMAL(10,2) NOT NULL,
    total_price     DECIMAL(10,2) NOT NULL
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- PROMOTIONS
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE discount_codes (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code            VARCHAR(50) UNIQUE NOT NULL,
    discount_type   VARCHAR(20) NOT NULL,  -- 'percentage', 'fixed_amount'
    discount_value  DECIMAL(10,2) NOT NULL,
    min_order_value DECIMAL(10,2),
    max_uses        INTEGER,
    current_uses    INTEGER DEFAULT 0,
    valid_from      TIMESTAMPTZ NOT NULL,
    valid_until     TIMESTAMPTZ NOT NULL,
    is_active       BOOLEAN DEFAULT true,

    CONSTRAINT valid_discount_type CHECK (discount_type IN ('percentage', 'fixed_amount')),
    CONSTRAINT valid_percentage CHECK (
        discount_type != 'percentage' OR (discount_value > 0 AND discount_value <= 100)
    )
);

CREATE INDEX idx_discount_codes_active ON discount_codes(code)
    WHERE is_active AND valid_until > NOW();
```

---

### 🧪 Testing Scenarios

#### Scenario 9: Writing Comprehensive Tests

**Situation:** Your component needs thorough test coverage.

**Prompt:**

```
Skill(test-specialist)
Write tests for this UserProfile component:
- Render states (loading, error, success)
- User interactions (edit, save, cancel)
- Form validation
- API integration
```

**Generated Tests:**

```typescript
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { UserProfile } from './UserProfile';
import { userApi } from '@/services/api';

// Mock the API module
vi.mock('@/services/api');

const mockUser = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Software developer',
};

describe('UserProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER STATES
  // ═══════════════════════════════════════════════════════════════════════
  describe('Render States', () => {
    it('shows loading skeleton while fetching', () => {
      vi.mocked(userApi.getUser).mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      render(<UserProfile userId="123" />);

      expect(screen.getByTestId('profile-skeleton')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('displays user data after successful fetch', async () => {
      vi.mocked(userApi.getUser).mockResolvedValue(mockUser);

      render(<UserProfile userId="123" />);

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Software developer')).toBeInTheDocument();
    });

    it('shows error message on fetch failure', async () => {
      vi.mocked(userApi.getUser).mockRejectedValue(new Error('Network error'));

      render(<UserProfile userId="123" />);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Failed to load profile');
      });
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('shows empty state for new users', async () => {
      vi.mocked(userApi.getUser).mockResolvedValue({
        ...mockUser,
        bio: null,
      });

      render(<UserProfile userId="123" />);

      await waitFor(() => {
        expect(screen.getByText('No bio yet')).toBeInTheDocument();
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════════════
  // USER INTERACTIONS
  // ═══════════════════════════════════════════════════════════════════════
  describe('User Interactions', () => {
    it('enters edit mode when clicking edit button', async () => {
      vi.mocked(userApi.getUser).mockResolvedValue(mockUser);

      render(<UserProfile userId="123" />);

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /edit/i }));

      expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
      expect(screen.getByLabelText(/bio/i)).toHaveValue('Software developer');
    });

    it('saves changes and exits edit mode', async () => {
      vi.mocked(userApi.getUser).mockResolvedValue(mockUser);
      vi.mocked(userApi.updateUser).mockResolvedValue({
        ...mockUser,
        name: 'Jane Doe',
      });

      render(<UserProfile userId="123" />);

      // Wait for load and enter edit mode
      await waitFor(() => screen.getByText('John Doe'));
      await userEvent.click(screen.getByRole('button', { name: /edit/i }));

      // Change name
      const nameInput = screen.getByLabelText(/name/i);
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, 'Jane Doe');

      // Save
      await userEvent.click(screen.getByRole('button', { name: /save/i }));

      await waitFor(() => {
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      });
      expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
    });

    it('cancels edit and restores original values', async () => {
      vi.mocked(userApi.getUser).mockResolvedValue(mockUser);

      render(<UserProfile userId="123" />);

      await waitFor(() => screen.getByText('John Doe'));
      await userEvent.click(screen.getByRole('button', { name: /edit/i }));

      // Change name but don't save
      const nameInput = screen.getByLabelText(/name/i);
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, 'Changed Name');

      // Cancel
      await userEvent.click(screen.getByRole('button', { name: /cancel/i }));

      // Original name should be displayed
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Changed Name')).not.toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════
  // FORM VALIDATION
  // ═══════════════════════════════════════════════════════════════════════
  describe('Form Validation', () => {
    it('shows error when name is empty', async () => {
      vi.mocked(userApi.getUser).mockResolvedValue(mockUser);

      render(<UserProfile userId="123" />);

      await waitFor(() => screen.getByText('John Doe'));
      await userEvent.click(screen.getByRole('button', { name: /edit/i }));

      // Clear name
      await userEvent.clear(screen.getByLabelText(/name/i));

      // Try to save
      await userEvent.click(screen.getByRole('button', { name: /save/i }));

      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(userApi.updateUser).not.toHaveBeenCalled();
    });

    it('shows error when name exceeds max length', async () => {
      vi.mocked(userApi.getUser).mockResolvedValue(mockUser);

      render(<UserProfile userId="123" />);

      await waitFor(() => screen.getByText('John Doe'));
      await userEvent.click(screen.getByRole('button', { name: /edit/i }));

      // Type very long name
      const nameInput = screen.getByLabelText(/name/i);
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, 'A'.repeat(101));

      await userEvent.click(screen.getByRole('button', { name: /save/i }));

      expect(screen.getByText('Name must be 100 characters or less')).toBeInTheDocument();
    });

    it('shows error for invalid email format', async () => {
      vi.mocked(userApi.getUser).mockResolvedValue(mockUser);

      render(<UserProfile userId="123" />);

      await waitFor(() => screen.getByText('John Doe'));
      await userEvent.click(screen.getByRole('button', { name: /edit/i }));

      const emailInput = screen.getByLabelText(/email/i);
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'not-an-email');

      await userEvent.click(screen.getByRole('button', { name: /save/i }));

      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════
  // API INTEGRATION
  // ═══════════════════════════════════════════════════════════════════════
  describe('API Integration', () => {
    it('calls API with correct user ID on mount', async () => {
      vi.mocked(userApi.getUser).mockResolvedValue(mockUser);

      render(<UserProfile userId="456" />);

      await waitFor(() => {
        expect(userApi.getUser).toHaveBeenCalledWith('456');
      });
    });

    it('sends updated data to API on save', async () => {
      vi.mocked(userApi.getUser).mockResolvedValue(mockUser);
      vi.mocked(userApi.updateUser).mockResolvedValue({
        ...mockUser,
        bio: 'Updated bio',
      });

      render(<UserProfile userId="123" />);

      await waitFor(() => screen.getByText('John Doe'));
      await userEvent.click(screen.getByRole('button', { name: /edit/i }));

      const bioInput = screen.getByLabelText(/bio/i);
      await userEvent.clear(bioInput);
      await userEvent.type(bioInput, 'Updated bio');

      await userEvent.click(screen.getByRole('button', { name: /save/i }));

      await waitFor(() => {
        expect(userApi.updateUser).toHaveBeenCalledWith('123', {
          name: 'John Doe',
          email: 'john@example.com',
          bio: 'Updated bio',
        });
      });
    });

    it('shows save error and keeps form open', async () => {
      vi.mocked(userApi.getUser).mockResolvedValue(mockUser);
      vi.mocked(userApi.updateUser).mockRejectedValue(new Error('Save failed'));

      render(<UserProfile userId="123" />);

      await waitFor(() => screen.getByText('John Doe'));
      await userEvent.click(screen.getByRole('button', { name: /edit/i }));
      await userEvent.click(screen.getByRole('button', { name: /save/i }));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Failed to save');
      });
      // Form should still be open
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });

    it('retries fetch when clicking retry button', async () => {
      vi.mocked(userApi.getUser)
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(mockUser);

      render(<UserProfile userId="123" />);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /retry/i }));

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });
      expect(userApi.getUser).toHaveBeenCalledTimes(2);
    });
  });
});
```

---

### 📱 Mobile & Cross-Platform Scenarios

#### Scenario 10: Building an iOS App

**Situation:** Starting an iOS app with SwiftUI.

**Prompt:**

```
Task(ios-developer)
Build an iOS app for habit tracking:
- Daily habits with streaks
- Weekly/monthly views
- Notifications for reminders
- iCloud sync
- Widgets
```

**Architecture Generated:**

```swift
// ═══════════════════════════════════════════════════════════════════════════
// MODELS
// ═══════════════════════════════════════════════════════════════════════════

import Foundation
import CloudKit

struct Habit: Identifiable, Codable {
    let id: UUID
    var name: String
    var emoji: String
    var targetFrequency: Frequency
    var reminderTime: Date?
    var createdAt: Date
    var completions: [Completion]

    enum Frequency: String, Codable, CaseIterable {
        case daily, weekdays, weekends, custom
    }

    struct Completion: Codable {
        let date: Date
        let note: String?
    }

    var currentStreak: Int {
        // Calculate consecutive days of completion
        guard !completions.isEmpty else { return 0 }
        // ... streak calculation logic
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// VIEWS
// ═══════════════════════════════════════════════════════════════════════════

import SwiftUI

struct HabitListView: View {
    @StateObject private var viewModel = HabitViewModel()
    @State private var showingAddSheet = false

    var body: some View {
        NavigationStack {
            List {
                ForEach(viewModel.habits) { habit in
                    HabitRow(habit: habit) {
                        viewModel.toggleCompletion(habit)
                    }
                }
                .onDelete(perform: viewModel.deleteHabits)
            }
            .navigationTitle("Habits")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button(action: { showingAddSheet = true }) {
                        Image(systemName: "plus")
                    }
                }
            }
            .sheet(isPresented: $showingAddSheet) {
                AddHabitView(viewModel: viewModel)
            }
        }
    }
}

struct HabitRow: View {
    let habit: Habit
    let onToggle: () -> Void

    private var isCompletedToday: Bool {
        habit.completions.contains { Calendar.current.isDateInToday($0.date) }
    }

    var body: some View {
        HStack {
            Text(habit.emoji)
                .font(.largeTitle)

            VStack(alignment: .leading) {
                Text(habit.name)
                    .font(.headline)

                HStack {
                    Image(systemName: "flame.fill")
                        .foregroundColor(.orange)
                    Text("\(habit.currentStreak) day streak")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }

            Spacer()

            Button(action: onToggle) {
                Image(systemName: isCompletedToday ? "checkmark.circle.fill" : "circle")
                    .font(.title)
                    .foregroundColor(isCompletedToday ? .green : .gray)
            }
            .buttonStyle(.plain)
        }
        .padding(.vertical, 4)
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// VIEWMODEL
// ═══════════════════════════════════════════════════════════════════════════

import Combine

@MainActor
class HabitViewModel: ObservableObject {
    @Published var habits: [Habit] = []

    private let cloudKitService: CloudKitService
    private var cancellables = Set<AnyCancellable>()

    init(cloudKitService: CloudKitService = .shared) {
        self.cloudKitService = cloudKitService
        loadHabits()
        setupCloudKitSync()
    }

    func toggleCompletion(_ habit: Habit) {
        guard let index = habits.firstIndex(where: { $0.id == habit.id }) else { return }

        if habits[index].completions.contains(where: { Calendar.current.isDateInToday($0.date) }) {
            // Remove today's completion
            habits[index].completions.removeAll { Calendar.current.isDateInToday($0.date) }
        } else {
            // Add completion
            habits[index].completions.append(Habit.Completion(date: Date(), note: nil))
        }

        saveHabits()
    }

    // ... more methods
}
```

---

### 🔐 Security Scenarios

#### Scenario 11: Security Audit

**Situation:** You need to review code for security vulnerabilities.

**Prompt:**

```
Task(security-auditor)
Audit this Express.js authentication code for vulnerabilities:
[paste code]
```

**Audit Report Generated:**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        SECURITY AUDIT REPORT                                  │
│                        Date: 2025-01-15                                       │
│                        Auditor: security-auditor agent                        │
└──────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
CRITICAL FINDINGS (P0 - Fix Immediately)
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│ VULN-001: SQL Injection in Login Query                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ Location: src/auth/login.ts:45                                              │
│ Severity: CRITICAL                                                          │
│ CVSS: 9.8                                                                   │
│                                                                              │
│ VULNERABLE CODE:                                                             │
│ const user = await db.query(                                                │
│   `SELECT * FROM users WHERE email = '${email}' AND password = '${pass}'`  │
│ );                                                                           │
│                                                                              │
│ ATTACK VECTOR:                                                               │
│ email: "admin'--"                                                            │
│ This bypasses password check entirely                                        │
│                                                                              │
│ REMEDIATION:                                                                 │
│ const user = await db.query(                                                │
│   'SELECT * FROM users WHERE email = $1',                                   │
│   [email]                                                                    │
│ );                                                                           │
│ // Then verify password with bcrypt.compare()                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ VULN-002: Plain Text Password Storage                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ Location: src/auth/register.ts:23                                            │
│ Severity: CRITICAL                                                          │
│ CVSS: 9.1                                                                   │
│                                                                              │
│ VULNERABLE CODE:                                                             │
│ await db.query('INSERT INTO users (email, password) VALUES ($1, $2)',       │
│   [email, password]                                                          │
│ );                                                                           │
│                                                                              │
│ REMEDIATION:                                                                 │
│ const hashedPassword = await bcrypt.hash(password, 12);                     │
│ await db.query('INSERT INTO users (email, password) VALUES ($1, $2)',       │
│   [email, hashedPassword]                                                    │
│ );                                                                           │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
HIGH FINDINGS (P1 - Fix This Sprint)
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│ VULN-003: JWT Secret Hardcoded                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ Location: src/auth/jwt.ts:5                                                  │
│ Severity: HIGH                                                              │
│                                                                              │
│ VULNERABLE CODE:                                                             │
│ const JWT_SECRET = 'super-secret-key-123';                                  │
│                                                                              │
│ REMEDIATION:                                                                 │
│ const JWT_SECRET = process.env.JWT_SECRET;                                  │
│ if (!JWT_SECRET) throw new Error('JWT_SECRET required');                    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ VULN-004: Missing Rate Limiting                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ Location: src/routes/auth.ts                                                 │
│ Severity: HIGH                                                              │
│                                                                              │
│ ISSUE: No rate limiting on login endpoint allows brute force attacks        │
│                                                                              │
│ REMEDIATION:                                                                 │
│ import rateLimit from 'express-rate-limit';                                 │
│                                                                              │
│ const authLimiter = rateLimit({                                             │
│   windowMs: 15 * 60 * 1000, // 15 minutes                                   │
│   max: 5, // 5 attempts per window                                          │
│   message: 'Too many login attempts'                                        │
│ });                                                                          │
│                                                                              │
│ router.post('/login', authLimiter, loginHandler);                           │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
SUMMARY
═══════════════════════════════════════════════════════════════════════════════

│ Severity │ Count │ Status    │
├──────────┼───────┼───────────┤
│ CRITICAL │ 2     │ Must Fix  │
│ HIGH     │ 2     │ Must Fix  │
│ MEDIUM   │ 3     │ Should Fix│
│ LOW      │ 1     │ Consider  │

RECOMMENDATION: Block deployment until P0 and P1 issues are resolved.
```

---

### 🤖 AI & Automation Scenarios

#### Scenario 12: Building an AI-Powered Feature

**Situation:** Adding AI capabilities to your app.

**Prompt:**

```
Skill(ai-ml-development)
Add AI-powered document summarization:
- Upload PDF/DOCX files
- Extract text content
- Generate summaries using Claude API
- Store summaries for search
```

**Implementation:**

```typescript
// ═══════════════════════════════════════════════════════════════════════════
// DOCUMENT SERVICE
// ═══════════════════════════════════════════════════════════════════════════

import Anthropic from "@anthropic-ai/sdk";
import * as pdfParse from "pdf-parse";
import mammoth from "mammoth";

interface DocumentSummary {
  id: string;
  originalName: string;
  textContent: string;
  summary: string;
  keyPoints: string[];
  wordCount: number;
  createdAt: Date;
}

class DocumentSummarizer {
  private anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async processDocument(
    file: Buffer,
    filename: string,
  ): Promise<DocumentSummary> {
    // 1. Extract text based on file type
    const text = await this.extractText(file, filename);

    // 2. Generate summary using Claude
    const { summary, keyPoints } = await this.generateSummary(text);

    // 3. Store and return
    return {
      id: crypto.randomUUID(),
      originalName: filename,
      textContent: text,
      summary,
      keyPoints,
      wordCount: text.split(/\s+/).length,
      createdAt: new Date(),
    };
  }

  private async extractText(file: Buffer, filename: string): Promise<string> {
    const ext = filename.split(".").pop()?.toLowerCase();

    switch (ext) {
      case "pdf":
        const pdfData = await pdfParse(file);
        return pdfData.text;

      case "docx":
        const docxResult = await mammoth.extractRawText({ buffer: file });
        return docxResult.value;

      case "txt":
        return file.toString("utf-8");

      default:
        throw new Error(`Unsupported file type: ${ext}`);
    }
  }

  private async generateSummary(text: string): Promise<{
    summary: string;
    keyPoints: string[];
  }> {
    // Truncate if too long (Claude has context limits)
    const truncatedText = text.slice(0, 100000);

    const response = await this.anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Analyze this document and provide:
1. A concise summary (2-3 paragraphs)
2. 5-7 key points as bullet points

Document:
${truncatedText}

Respond in JSON format:
{
  "summary": "...",
  "keyPoints": ["point1", "point2", ...]
}`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return JSON.parse(content.text);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// API ENDPOINT
// ═══════════════════════════════════════════════════════════════════════════

import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    cb(null, allowed.includes(file.mimetype));
  },
});

const summarizer = new DocumentSummarizer();

router.post("/summarize", upload.single("document"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await summarizer.processDocument(
      req.file.buffer,
      req.file.originalname,
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
```

---

### 📦 DevOps & Deployment Scenarios

#### Scenario 13: Setting Up CI/CD

**Situation:** You need a complete CI/CD pipeline.

**Prompt:**

```
Skill(devops-cloud)
Set up GitHub Actions CI/CD for a Next.js app:
- Run tests and type-check
- Build and deploy to Vercel
- Preview deployments for PRs
- Production deploys on main
- Slack notifications
```

**Generated Workflow:**

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: "20"
  PNPM_VERSION: "8"

jobs:
  # ═══════════════════════════════════════════════════════════════════════════
  # QUALITY CHECKS
  # ═══════════════════════════════════════════════════════════════════════════
  quality:
    name: Quality Checks
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Type check
        run: pnpm type-check

      - name: Lint
        run: pnpm lint

      - name: Run tests
        run: pnpm test:ci
        env:
          CI: true

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: false

  # ═══════════════════════════════════════════════════════════════════════════
  # BUILD
  # ═══════════════════════════════════════════════════════════════════════════
  build:
    name: Build
    runs-on: ubuntu-latest
    needs: quality

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: .next
          retention-days: 1

  # ═══════════════════════════════════════════════════════════════════════════
  # PREVIEW DEPLOYMENT (PRs)
  # ═══════════════════════════════════════════════════════════════════════════
  deploy-preview:
    name: Deploy Preview
    runs-on: ubuntu-latest
    needs: build
    if: github.event_name == 'pull_request'

    environment:
      name: preview
      url: ${{ steps.deploy.outputs.url }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Download build
        uses: actions/download-artifact@v3
        with:
          name: build
          path: .next

      - name: Deploy to Vercel Preview
        id: deploy
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Comment PR with preview URL
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `🚀 Preview deployed: ${{ steps.deploy.outputs.url }}`
            })

  # ═══════════════════════════════════════════════════════════════════════════
  # PRODUCTION DEPLOYMENT
  # ═══════════════════════════════════════════════════════════════════════════
  deploy-production:
    name: Deploy Production
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'

    environment:
      name: production
      url: https://myapp.com

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Download build
        uses: actions/download-artifact@v3
        with:
          name: build
          path: .next

      - name: Deploy to Vercel Production
        id: deploy
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"

      - name: Notify Slack
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "🚀 Production deployed!",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Production Deploy Complete*\n<${{ steps.deploy.outputs.url }}|View Deployment>"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

  # ═══════════════════════════════════════════════════════════════════════════
  # FAILURE NOTIFICATION
  # ═══════════════════════════════════════════════════════════════════════════
  notify-failure:
    name: Notify on Failure
    runs-on: ubuntu-latest
    needs: [quality, build, deploy-production]
    if: failure()

    steps:
      - name: Notify Slack of failure
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "❌ CI/CD Pipeline Failed",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Pipeline Failed*\n<${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|View Run>"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

### 📊 Data & Analytics Scenarios

#### Scenario 14: Building a Dashboard

**Situation:** Creating an analytics dashboard.

**Prompt:**

```
/start-task Build a real-time analytics dashboard:
- Page views, sessions, bounce rate
- Geographic heatmap
- Top pages and referrers
- Real-time visitor count
- Date range filtering
```

**Component Structure:**

```typescript
// Dashboard layout with real-time updates

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface DashboardMetrics {
  pageViews: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  realtimeVisitors: number;
}

export function AnalyticsDashboard() {
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState<DateRange>({
    start: subDays(new Date(), 7),
    end: new Date(),
  });

  // Main metrics query
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['analytics', 'metrics', dateRange],
    queryFn: () => analyticsApi.getMetrics(dateRange),
    staleTime: 60_000, // 1 minute
  });

  // Real-time visitor count (WebSocket)
  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'visitor_count') {
        queryClient.setQueryData(['analytics', 'realtime'], data.count);
      }
    };

    return () => ws.close();
  }, [queryClient]);

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      {/* Header with date picker */}
      <div className="col-span-12 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* KPI Cards */}
      <div className="col-span-12 grid grid-cols-4 gap-4">
        <KPICard
          title="Page Views"
          value={metrics.pageViews}
          change={metrics.pageViewsChange}
          icon={<EyeIcon />}
        />
        <KPICard
          title="Sessions"
          value={metrics.sessions}
          change={metrics.sessionsChange}
          icon={<UsersIcon />}
        />
        <KPICard
          title="Bounce Rate"
          value={`${metrics.bounceRate}%`}
          change={metrics.bounceRateChange}
          inverse // Lower is better
          icon={<ArrowDownIcon />}
        />
        <KPICard
          title="Realtime Visitors"
          value={metrics.realtimeVisitors}
          live
          icon={<ActivityIcon />}
        />
      </div>

      {/* Charts Row */}
      <div className="col-span-8">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <TrafficChart data={metrics.trafficByDay} />
          </CardContent>
        </Card>
      </div>

      <div className="col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <SourcesPieChart data={metrics.sources} />
          </CardContent>
        </Card>
      </div>

      {/* Geographic Heatmap */}
      <div className="col-span-6">
        <Card>
          <CardHeader>
            <CardTitle>Visitors by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <GeoHeatmap data={metrics.geoData} />
          </CardContent>
        </Card>
      </div>

      {/* Top Pages & Referrers */}
      <div className="col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <TopList
              items={metrics.topPages}
              renderItem={(page) => (
                <div className="flex justify-between">
                  <span className="truncate">{page.path}</span>
                  <span className="font-mono">{page.views}</span>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <div className="col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <TopList
              items={metrics.topReferrers}
              renderItem={(ref) => (
                <div className="flex justify-between">
                  <span className="truncate">{ref.source}</span>
                  <span className="font-mono">{ref.sessions}</span>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

### 🛠️ Maintenance & Refactoring Scenarios

#### Scenario 15: Technical Debt Reduction

**Situation:** Your codebase has accumulated tech debt.

**Prompt:**

```
Skill(tech-debt-analyzer)
Analyze this codebase for tech debt:
- Code duplication
- Dead code
- Outdated dependencies
- Missing tests
- Security vulnerabilities
```

**Analysis Report:**

````
╔══════════════════════════════════════════════════════════════════════════════╗
║                        TECHNICAL DEBT ANALYSIS                                ║
║                        Repository: my-app                                     ║
║                        Analysis Date: 2025-01-15                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

═══════════════════════════════════════════════════════════════════════════════
SUMMARY
═══════════════════════════════════════════════════════════════════════════════

│ Category              │ Issues │ Effort (days) │ Priority │
├───────────────────────┼────────┼───────────────┼──────────┤
│ Code Duplication      │ 23     │ 3-4           │ Medium   │
│ Dead Code             │ 45     │ 1-2           │ Low      │
│ Outdated Dependencies │ 12     │ 2-3           │ High     │
│ Missing Tests         │ 67%    │ 5-7           │ High     │
│ Security Issues       │ 3      │ 1             │ Critical │
├───────────────────────┼────────┼───────────────┼──────────┤
│ TOTAL                 │        │ 12-17 days    │          │

═══════════════════════════════════════════════════════════════════════════════
CODE DUPLICATION (23 instances)
═══════════════════════════════════════════════════════════════════════════════

🔴 HIGH IMPACT DUPLICATIONS:

1. Authentication check logic (5 files, ~120 lines)
   Files: pages/dashboard.tsx, pages/settings.tsx, pages/profile.tsx,
          pages/admin.tsx, pages/billing.tsx

   RECOMMENDATION: Extract to useAuthRequired() hook or AuthGuard component

   BEFORE (in each file):
   ```tsx
   const { user, isLoading } = useUser();
   if (isLoading) return <Spinner />;
   if (!user) { redirect('/login'); return null; }
````

AFTER (shared hook):

```tsx
const user = useRequireAuth(); // Handles loading/redirect internally
```

2. API error handling (8 files, ~200 lines)
   Pattern repeated: try/catch with toast notification

   RECOMMENDATION: Create shared apiCall() wrapper

3. Form validation schemas (4 files, ~80 lines)
   Duplicate Zod schemas for common fields (email, password, phone)

   RECOMMENDATION: Create shared schemas in lib/validations.ts

═══════════════════════════════════════════════════════════════════════════════
DEAD CODE (45 files/functions)
═══════════════════════════════════════════════════════════════════════════════

Unused exports found:

- src/utils/deprecated-helpers.ts (entire file)
- src/components/OldButton.tsx (entire file)
- src/hooks/useLegacyState.ts (entire file)
- formatCurrency() in src/utils/format.ts
- validateOldSchema() in src/lib/validation.ts
  ... and 40 more

RECOMMENDATION:

1. Run `npx knip` to get full unused code report
2. Delete confirmed dead code
3. Add `// @deprecated` comments if keeping temporarily

═══════════════════════════════════════════════════════════════════════════════
OUTDATED DEPENDENCIES (12 packages)
═══════════════════════════════════════════════════════════════════════════════

🔴 CRITICAL UPDATES (security vulnerabilities):
│ Package │ Current │ Latest │ Vulnerability │
├──────────────────┼─────────┼─────────┼───────────────────┤
│ axios │ 0.21.1 │ 1.6.0 │ CVE-2023-45857 │
│ jsonwebtoken │ 8.5.1 │ 9.0.2 │ CVE-2022-23529 │
│ lodash │ 4.17.20 │ 4.17.21 │ CVE-2021-23337 │

🟡 MAJOR VERSION UPDATES:
│ Package │ Current │ Latest │ Breaking Changes │
├──────────────────┼─────────┼─────────┼───────────────────┤
│ next │ 13.4.0 │ 14.1.0 │ App Router stable │
│ react │ 18.2.0 │ 18.2.0 │ (current) │
│ typescript │ 4.9.5 │ 5.3.3 │ Minor adjustments │

═══════════════════════════════════════════════════════════════════════════════
REMEDIATION PLAN
═══════════════════════════════════════════════════════════════════════════════

WEEK 1 (Critical):
□ Update axios, jsonwebtoken, lodash (security)
□ Fix 3 security audit findings
□ Delete obvious dead code files

WEEK 2 (High):
□ Extract authentication hook
□ Create shared API error handling
□ Add tests for critical paths (auth, checkout)

WEEK 3 (Medium):
□ Extract validation schemas
□ Deduplicate remaining patterns
□ Update to Next.js 14

WEEK 4 (Low):
□ Increase test coverage to 80%
□ Documentation updates
□ Performance optimizations

````

---

### 🎯 Common Pitfall Solutions

#### Pitfall 1: "Skills Not Loading"

**Problem:** You expect a skill to activate but it doesn't seem to be working.

**Solution:**
```bash
# Check if skill exists
find ~/.claude/skills -name "SKILL.md" | xargs grep -l "your-skill-name"

# Check skill triggers by reading SKILL.md
cat ~/.claude/skills/your-skill/SKILL.md

# Force skill activation
Skill(skill-name)

# Check CLAUDE.md for "Load When Relevant" section
grep -A 20 "Load When Relevant" ~/.claude/CLAUDE.md
````

**Common Causes:**

- Skill name typo
- Skill not in local or marketplace directories
- Context keywords don't match skill triggers

---

#### Pitfall 2: "Agent Task Failed"

**Problem:** A Task tool invocation with an agent fails or returns incomplete results.

**Solution:**

```
# Check agent exists
ls ~/.claude/agents/*.json | xargs grep -l "agent-name"

# Use more specific prompt
Task(agent-name)
"Specific task description with clear expected output format"

# Check agent's tool access
cat ~/.claude/agents/agent-name.json | grep -A 10 "tools"
```

**Common Causes:**

- Agent doesn't have access to required tools
- Prompt too vague
- Task exceeds agent's context limit (200k tokens)

---

#### Pitfall 3: "GSD State Conflicts"

**Problem:** GSD commands give unexpected results or state seems corrupted.

**Solution:**

```bash
# Check current state
cat .planning/STATE.md

# View roadmap
cat .planning/ROADMAP.md

# Reset if needed (careful - loses state)
rm -rf .planning/

# Start fresh
/gsd:new-project "Project description"
```

**Common Causes:**

- Multiple concurrent sessions editing state
- Manual edits to state files
- Using GSD commands outside project root

---

#### Pitfall 4: "Hook Not Executing"

**Problem:** A configured hook doesn't run.

**Solution:**

```bash
# Verify hook is in settings.json
cat ~/.claude/settings.json | grep -A 20 "hooks"

# Check hook syntax
# Must be array of objects with "matcher" and "hooks" keys

# Test hook script manually
bash -c 'echo "test" >> ~/.claude/.session-log'

# Check for Windows vs Unix path issues
# Use forward slashes even on Windows in settings.json
```

**Common Causes:**

- Syntax error in settings.json
- Script path doesn't exist
- Script not executable (chmod +x)
- Windows path separators (use / not \\)

---

#### Pitfall 5: "Context Window Overflow"

**Problem:** Claude starts forgetting earlier context or becoming confused.

**Solution:**

```bash
# Check context usage
/context

# Compact if high
/compact

# Clear and restart for new task
/clear

# Use TodoWrite to track state explicitly
# (Survives context compaction)
```

**Prevention:**

- Use `/compact` proactively at 50% usage
- Keep CLAUDE.md lean (~1,100 tokens)
- Let skills load on-demand
- Don't paste massive files - use Read tool

---

### 📋 Quick Reference: When to Use What

| Situation                             | Use This                     |
| ------------------------------------- | ---------------------------- |
| Simple question                       | Just ask directly            |
| Single-file fix                       | Direct prompt                |
| Well-defined feature (complexity 3-4) | `/auto-claude`               |
| New feature (needs planning)          | `/start-task`                |
| Multi-phase project (complexity 5+)   | `/gsd:new-project`           |
| Need specific expertise               | `Skill(name)`                |
| Deep analysis needed                  | `Task(agent-name)`           |
| Stuck on decision                     | `/consider:first-principles` |
| Want current info                     | WebSearch tool               |
| Complex debugging                     | `Skill(debug-like-expert)`   |
| Code review                           | `Task(code-reviewer)`        |
| Security check                        | `Task(security-auditor)`     |
| Before committing                     | `/commit` command            |

---

### 📝 Pattern 1: Standard Prompts

Just describe what you want:

```
"Build a login form with validation"
"Fix the API timeout issue"
"Review my authentication code"
```

**⚙️ How it works:**

1. 📜 CLAUDE.md loads
2. 🎓 Skills auto-activate based on keywords
3. ⚡ Executes directly with loaded context

**✅ Best for:** Single-focus tasks, quick fixes, clear scope

### 🎯 Pattern 2: /start-task Router

Explicit intelligent routing:

```
/start-task Build an iOS app with SwiftUI
/start-task Set up CI/CD with testing
```

**⚙️ How it works:**

1. 📊 Scores complexity (see routing logic)
2. 🏷️ Detects domains (development, scientific, etc.)
3. 🎯 Routes to GSD, Planning, or Direct
4. 📦 Loads all relevant resources

**✅ Best for:** Complex tasks, multi-phase work, when unsure

### 📈 Pattern 3: GSD for Projects

Multi-phase project management:

```
/gsd:new-project Build complete authentication system
/gsd:progress
/gsd:plan-phase 1
/gsd:execute-plan
```

**📁 Creates:**

```
.planning/
├── 📝 STATE.md      # Current status
├── 🗺️ ROADMAP.md    # Full plan
└── 📁 phases/       # Phase details
```

**✅ Best for:** Multi-session work, very complex features, team coordination

### 🤖 Pattern 3.5: Auto-Claude for Autonomous Coding

Autonomous multi-agent implementation:

```
/auto-claude Add user authentication with JWT tokens
```

**⚙️ How it works:**

1. 📊 Analyzes codebase structure (30s)
2. 📝 Generates implementation spec (1-2min)
3. 🌿 Creates isolated git worktree
4. 🤖 Multi-agent implementation (5-15min):
   - Planner creates subtask plan
   - Coder implements features
   - QA validates acceptance criteria
   - Fixer resolves issues in loop
5. ✅ Returns completed code for review

**📁 Creates:**

```
~/.auto-claude/
├── 📊 baselines/           # Codebase analysis
├── 📝 specs/               # Implementation specs
└── 🔀 .worktrees/          # Isolated git worktrees
```

**✅ Best for:** Well-defined features (complexity 3-4), established codebases, repetitive tasks (CRUD, forms, API endpoints), autonomous implementation with review-at-end

**❌ Not for:** Greenfield projects, exploratory work, simple tasks (use manual), very complex projects (use GSD)

**See:** [docs/AUTO-CLAUDE-GUIDE.md](./docs/AUTO-CLAUDE-GUIDE.md) for complete setup and usage

### 🧠 Pattern 4: Decision Frameworks

Structured decision-making:

```
/consider:first-principles Should I use Redux or Zustand?
/consider:5-whys Why is the build failing?
/consider:eisenhower-matrix Prioritize these features
```

**✅ Best for:** Technical decisions, root cause analysis, prioritization

---

## 🎯 The Universal Router (start-task)

### 📋 Execution Protocol

```
Step 0️⃣: 🧠 ULTRATHINK
         Apply maximum reasoning depth for non-trivial tasks

Step 1️⃣: 📅 Environment Context
         Check current date, research triggers

Step 2️⃣: 💾 Memory Check
         Query claude-mem for relevant past context

Step 3️⃣: 📈 GSD Project Check
         If .planning/STATE.md exists → /gsd:progress

Step 4️⃣: 🏷️ Domain Detection (Priority Order)
         1. ⚙️ Meta/Admin → domains-meta.md
         2. 🧠 Decision → decision-frameworks.md
         3. 🔬 Scientific → domains-scientific.md
         4. 💻 Development → domains-development.md
         5. 💼 Business → domains-business.md
         6. 🎨 Creative → domains-creative.md

Step 5️⃣: 📊 Complexity Scoring & Routing
         Score >= 5 → 📈 GSD (multi-phase)
         Score 3-4 (well-defined) → 🤖 Auto-Claude (autonomous)
         Score 3-4 (exploratory) → 📝 EnterPlanMode
         Score 1-2 → 📝 EnterPlanMode
         Score <= 0 → ⚡ Direct execution

Step 6️⃣: ⚙️ Execute
         Load skills, track with TodoWrite, spawn agents

Step 7️⃣: 💾 Memory Save
         Save key decisions to claude-mem
```

### 📊 Complexity Scoring

| Signal                         | Points | Examples                               |
| :----------------------------- | :----: | :------------------------------------- |
| 🔧 Multiple components/systems |   +3   | "API and frontend", "database and UI"  |
| 📋 Multiple steps implied      |   +2   | "first... then...", "set up... deploy" |
| ✨ New feature/system          |   +3   | "build", "create", "implement"         |
| 🏗️ Architecture/design work    |   +2   | "design", "architect", "structure"     |
| 🔄 Cross-cutting concerns      |   +2   | "refactor", "migrate", "upgrade"       |
| 🔍 Research required           |   +1   | "figure out", "explore", "investigate" |
| 🔬 Scientific/specialized      |   +2   | Any scientific domain                  |
| 🐛 Bug/issue (singular)        |   -1   | "fix the bug", "resolve error"         |
| 📄 Single file mentioned       |   -2   | "update README", "fix typo"            |
| ⚡ Quick/small qualifier       |   -2   | "quick", "small", "minor", "simple"    |

### 📋 Routing Examples

| Prompt                                   | Score | Route                | Why                                                |
| :--------------------------------------- | :---: | :------------------- | :------------------------------------------------- |
| "Build complete e-commerce platform"     |   6   | 📈 GSD               | Multi-phase, many systems                          |
| "Add user authentication with JWT"       |   4   | 🤖 Auto-Claude       | Well-defined, multiple files, established codebase |
| "Refactor API to use async/await"        |   4   | 🤖 Auto-Claude       | Clear transformation, many files                   |
| "Explore best state management approach" |   3   | 📝 Planning          | Exploratory, needs research                        |
| "Create a REST endpoint for users"       |   2   | 📝 Planning          | Medium complexity, single feature                  |
| "Fix the typo in the header"             |  -2   | ⚡ Direct            | Simple, single file                                |
| "What's new in React 19?"                |   0   | ⚡ Direct (research) | Info retrieval                                     |

---

## 📈 GSD Project Management System

### ❓ What is GSD?

"**Get Shit Done**" - A multi-phase project management framework that:

- 📋 Tracks project phases and milestones
- 🔄 Maintains progress across sessions
- 📊 Provides structure without blocking capabilities

### 🎯 When to Use GSD

| ✅ Use GSD                | ❌ Don't Use GSD        |
| :------------------------ | :---------------------- |
| 📋 Multiple phases        | 📝 Single task          |
| 🔄 Multi-session work     | ⚡ Quick fix            |
| 🔧 Complex features       | ❓ Simple question      |
| 🏗️ Architectural overhaul | 📖 Documentation update |

### ⌨️ Core Commands

| Command                      | Purpose                            |
| :--------------------------- | :--------------------------------- |
| 📋 `/gsd:new-project`        | Initialize new multi-phase project |
| 📊 `/gsd:progress`           | Check status, get next action      |
| 🗺️ `/gsd:plan-phase [n]`     | Create detailed plan for phase     |
| ⚙️ `/gsd:execute-plan`       | Work through current plan          |
| 🔄 `/gsd:resume-work`        | Restore session context            |
| ⏸️ `/gsd:pause-work`         | Save state before break            |
| ➕ `/gsd:add-phase`          | Add new phase to project           |
| ✅ `/gsd:complete-milestone` | Mark milestone done                |
| ❓ `/gsd:help`               | Full command reference             |

### 📁 Project Structure

```
.planning/
├── 📝 PROJECT.md      # Project definition
│   - Name, description
│   - Goals, constraints
│   - Stakeholders
│
├── 🗺️ ROADMAP.md      # Full project plan
│   - All phases
│   - Dependencies
│   - Timeline (if specified)
│
├── 📊 STATE.md        # Current status
│   - Active phase
│   - Progress percentage
│   - Next action
│   - Blockers
│
└── 📁 phases/
    ├── 📋 phase-1.md  # Phase details
    └── 📋 phase-2.md  # Tasks, acceptance criteria
```

### 📊 STATE.md Example

```markdown
# 📊 Project State

## 📋 Project Summary

**Building:** User Authentication System
**Status: 🟢 ACTIVE**

## 📍 Current Position

Phase: 2 of 4 (API Implementation)
Status: **⚙️ IN PROGRESS**
Progress: ████████░░░░░ 60%

## 📋 Phases Overview

| Phase | Description          |     Status     |
| :---: | :------------------- | :------------: |
|   1   | Database Schema      |  ✅ COMPLETE   |
|   2   | API Implementation   | ⚙️ IN PROGRESS |
|   3   | Frontend Integration |   ⏳ PENDING   |
|   4   | Testing & Docs       |   ⏳ PENDING   |

## ➡️ Next Action

Implement JWT refresh token endpoint

## 📜 Recent Activity

- ✅ Completed user registration endpoint
- ✅ Completed login endpoint
- ⚙️ Started token refresh implementation
```

---

## 🧠 Decision Frameworks

### 📋 Available Frameworks

| Framework                | Purpose                           | Command                       |
| :----------------------- | :-------------------------------- | :---------------------------- |
| 🔍 **First-Principles**  | Break problems to fundamentals    | `/consider:first-principles`  |
| 🔎 **5-Whys**            | Root cause analysis               | `/consider:5-whys`            |
| 📊 **Eisenhower Matrix** | Urgency/importance prioritization | `/consider:eisenhower-matrix` |
| ⚖️ **SWOT**              | Trade-off and strategic analysis  | `/consider:swot`              |
| 🎯 **Opportunity Cost**  | Analyze what you give up          | `/consider:opportunity-cost`  |

### 🎯 When to Use Each

| Situation                      | Framework            |
| :----------------------------- | :------------------- |
| "Should I use X or Y?"         | 🔍 First-Principles  |
| "Why does this keep failing?"  | 🔎 5-Whys            |
| "What should I work on first?" | 📊 Eisenhower Matrix |
| "What are the trade-offs?"     | ⚖️ SWOT              |
| "Compare multiple options"     | 🎯 Opportunity Cost  |

---

## ⌨️ Complete Commands Reference

### 📋 Task Management

| Command                  | Purpose                            | Example                        |
| :----------------------- | :--------------------------------- | :----------------------------- |
| 🎯 `/start-task [desc]`  | Universal router (manual)          | `/start-task Build login API`  |
| 🤖 `/auto-claude [desc]` | Autonomous coding (complexity 3-4) | `/auto-claude Add JWT auth`    |
| 📈 `/gsd:new-project`    | Start GSD project (complexity 5+)  | `/gsd:new-project Auth system` |
| 📊 `/gsd:progress`       | Check GSD status                   | `/gsd:progress`                |
| 🗺️ `/gsd:plan-phase [n]` | Plan specific phase                | `/gsd:plan-phase 2`            |
| ⚙️ `/gsd:execute-plan`   | Execute current plan               | `/gsd:execute-plan`            |
| 🔄 `/gsd:resume-work`    | Resume with context                | `/gsd:resume-work`             |
| ⏸️ `/gsd:pause-work`     | Save state                         | `/gsd:pause-work`              |

**Workflow Selection:**

- **Complexity 1-2:** Use `/start-task` for manual step-by-step implementation
- **Complexity 3-4:** Use `/auto-claude` for autonomous implementation with QA validation
- **Complexity 5+:** Use `/gsd:new-project` for multi-phase project management

### 🔍 Skills & Discovery

| Command                       | Purpose                | Example                        |
| :---------------------------- | :--------------------- | :----------------------------- |
| 📋 `/list-skills [domain]`    | Browse skills          | `/list-skills ios`             |
| 🔍 `/skill-finder [problem]`  | Find skill for problem | `/skill-finder debug memory`   |
| 🌐 `/discover-skills [query]` | Search skillsmp.com    | `/discover-skills react hooks` |

### 🔀 Code & Git

| Command                              | Purpose       | Example               |
| :----------------------------------- | :------------ | :-------------------- |
| 💾 `/commit-commands:commit`         | Create commit | After code changes    |
| 🚀 `/commit-commands:commit-push-pr` | Full PR flow  | When ready for review |
| 🔍 `/code-review:code-review`        | Review code   | Before commit         |

### 🆕 Project Initialization

| Command                             | Purpose                                    | Example                  |
| :---------------------------------- | :----------------------------------------- | :----------------------- |
| 📄 `/init-project [stack]`          | Initialize CLAUDE.md with toolkit          | `/init-project react`    |
| 🔧 `/standardize-claude-md [stack]` | Add toolkit sections to existing CLAUDE.md | `/standardize-claude-md` |

**Workflow:**

- **New project (your code):** `/init-project` → auto-detects or asks stack → creates CLAUDE.md
- **External/OSS code:** `/init` (Claude's) → `/standardize-claude-md` → adds toolkit sections
- **Existing project:** `/standardize-claude-md` → preserves content, adds missing sections

### 🔧 Meta & Creation

| Command                                        | Purpose         | Example              |
| :--------------------------------------------- | :-------------- | :------------------- |
| 🎓 `/taches-cc-resources:create-agent-skill`   | Create skill    | New domain expertise |
| 🪝 `/taches-cc-resources:create-hook`          | Create hook     | New automation       |
| ⌨️ `/taches-cc-resources:create-slash-command` | Create command  | New shortcut         |
| 🤖 `/taches-cc-resources:create-subagent`      | Create agent    | New specialist       |
| ✅ `/taches-cc-resources:check-todos`          | Review todos    | Check outstanding    |
| ➡️ `/taches-cc-resources:whats-next`           | Next suggestion | When stuck           |

### 🛠️ Utility & Diagnostics

| Command                      | Purpose               | Example                 |
| :--------------------------- | :-------------------- | :---------------------- |
| 🔍 `/review-code [target]`   | Code review workflow  | `/review-code staged`   |
| 🏥 `/health-check [verbose]` | System diagnostics    | `/health-check verbose` |
| 📊 `/context-stats`          | Token usage report    | `/context-stats`        |
| 📜 `/session-log [action]`   | View session log      | `/session-log stats`    |
| 💾 `/backup-config [action]` | Backup/restore config | `/backup-config create` |

### 🧠 Decision Making

| Command                          | Purpose              |
| :------------------------------- | :------------------- |
| 🔍 `/consider:first-principles`  | Fundamental analysis |
| 🔎 `/consider:5-whys`            | Root cause           |
| 📊 `/consider:eisenhower-matrix` | Priority matrix      |
| ⚖️ `/consider:swot`              | SWOT / Trade-offs    |
| 🎯 `/consider:decision-matrix`   | Multi-criteria       |

### 💪 Obra Superpowers

| Command                 | Purpose                  |
| :---------------------- | :----------------------- |
| 💡 `/obra:brainstorm`   | Structured brainstorming |
| 📝 `/obra:write-plan`   | Detailed planning        |
| ⚙️ `/obra:execute-plan` | Step-by-step execution   |

---

## ✏️ Customization Guide

### 🎓 Adding a New Skill

1. Create directory: `skills/my-skill/`
2. Create `SKILL.md`:

```markdown
---
name: my-skill
description: When to use this skill (one sentence)
---

# 🎓 My Skill

## 📋 Overview

[What this skill provides]

## 🎯 When to Use

[Trigger conditions]

## 📐 Patterns

### Pattern 1: [Name]

[Code examples, guidelines]

### Pattern 2: [Name]

[More patterns]

## ⛔ Anti-Patterns

[What to avoid]

## 🔗 Related

- [Other skills]
- [Agents]
```

### 🤖 Adding a New Agent

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

# 🤖 My Agent

## 🎭 Role
[Agent role and expertise area]

## 📋 Approach
[How the agent works]

## 📤 Output Format
[Expected outputs]

## 📏 Guidelines
[Behavioral rules]
```

### ⌨️ Adding a New Command

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

# ⌨️ My Command

[Instructions for Claude on what to do when command is invoked]

## 📋 Parameters

- `arg1`: [How to use]
- `arg2`: [How to use]

## ⚙️ Execution Steps

1. [Step 1]
2. [Step 2]

## 📝 Examples

[Usage examples]
```

### 📋 Adding a New Rule

1. Determine category: `checklists/`, `stacks/`, or `tooling/`
2. Create `rules/[category]/my-rule.md`:

```markdown
# 📋 My Rule

**When to use:** [Trigger condition]

---

## 📋 Overview

[What this rule covers]

## ✅ Checklist

- [ ] Item 1
- [ ] Item 2

## 📝 Examples

[Good and bad examples]

## 🔗 Related

- [Other rules]
- [Skills]
- [Agents]
```

3. Add trigger to CLAUDE.md "Load When Relevant" section

---

## 💡 Best Practices

### 📅 For Daily Use

1. 💬 **Start with natural language** - Just describe what you want
2. 🎯 **Use `/start-task` for complex work** - Leverages full routing
3. 🎓 **Let skills auto-load** - Don't manually invoke unless specific need
4. 📊 **Check `/gsd:progress` for ongoing projects** - Maintains continuity
5. 🧠 **Use decision frameworks for choices** - Structured thinking

### 💰 For Token Efficiency

1. 🔌 **Keep MCP servers disabled** - Enable only when needed
2. 📦 **Use `/compact` at 50% context** - Compresses conversation
3. 🧹 **Use `/clear` between unrelated tasks** - Fresh context
4. 📋 **Let skills load on-demand** - Don't pre-load

### ✅ For Code Quality

1. 🤖 **Agents auto-trigger after code changes** - Don't skip reviews
2. 🔒 **Run security-auditor on auth code** - Explicit security check
3. 🔍 **Use deep-code-reviewer for PRs** - Comprehensive review
4. 🪝 **Trust the git hooks** - They catch secrets

### 🔄 For Multi-Session Work

1. 📈 **Use GSD for multi-phase projects** - Tracks across sessions
2. 💾 **Save to claude-mem** - Key decisions persist
3. ⏸️ **Use `/gsd:pause-work` before ending** - Saves state
4. 🔄 **Use `/gsd:resume-work` when returning** - Restores context

---

## 🔧 Troubleshooting

### 🐛 Common Issues

| Issue                    | Solution                                            |
| :----------------------- | :-------------------------------------------------- |
| 🎓 Skills not loading    | Check CLAUDE.md exists, run `/list-skills`          |
| 🏪 Marketplace not found | Run `git submodule update --init`                   |
| 🪝 Hooks not running     | Run `bash scripts/setup-hooks.sh`                   |
| 🔌 MCP server fails      | Check `.mcp.json` configuration                     |
| 🔐 Permission denied     | Check `settings.json` allow list                    |
| 🚫 Commit blocked        | Check for secrets, use `--no-verify` if intentional |

### 🪝 Git Hook Issues

```bash
# Check hook is executable
ls -la ~/.claude/.git/hooks/pre-commit

# Test hook manually
bash ~/.claude/.git/hooks/pre-commit

# Reinstall hooks
bash ~/.claude/scripts/setup-hooks.sh

# Windows: Fix line endings (in Git Bash)
dos2unix ~/.claude/.git/hooks/pre-commit
```

### 📊 Context Management

```bash
# Clear context (fresh start)
/clear

# Compact context (save space)
/compact

# Check context usage
/context
```

### 🏪 Marketplace Issues

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

## ❓ Frequently Asked Questions

### 🌐 General

**Q: Do I need to use `/start-task` for everything?**
A: No. Natural language prompts work identically. `/start-task` just makes routing explicit.

**Q: How do I know which skill is loading?**
A: Skills load silently based on context. Use `/list-skills` to browse available skills.

**Q: Can I use multiple skills at once?**
A: Yes. Multiple relevant skills can load simultaneously.

**Q: What happens if there's no matching skill?**
A: Claude uses general knowledge. Consider creating a skill for repeated needs.

### 🎓 Skills & Agents

**Q: What's the difference between skills and agents?**
A: Skills provide knowledge/patterns. Agents execute tasks. Use skills for guidance, agents for doing.

**Q: How do I invoke an agent?**
A: "Use the [agent-name] agent to [task]" or the system spawns automatically.

**Q: Can agents use other agents?**
A: Not directly. Complex tasks should use GSD phases or orchestrating prompts.

### 📈 GSD

**Q: Am I "locked into" GSD once I start a project?**
A: No. GSD provides structure but doesn't block anything. You can always execute directly.

**Q: How do I abandon a GSD project?**
A: Delete `.planning/STATE.md` or start a new project with `/gsd:new-project`.

**Q: Can I have multiple GSD projects?**
A: One at a time per working directory. Different directories can have different projects.

### 🏪 Marketplaces

**Q: Are marketplace skills as good as local skills?**
A: Quality varies. Official Anthropic and large collections tend to be well-maintained.

**Q: Can I contribute to marketplaces?**
A: Yes, to non-official ones. Each has its own contribution process.

**Q: Why are marketplaces read-only?**
A: `no_push` prevents accidental changes to upstream. Fork if you need to modify.

### ⚡ Performance

**Q: Why are MCP servers disabled by default?**
A: Each enabled server adds 500-2000 tokens. Keeping them disabled saves ~6000+ tokens.

**Q: How much context does CLAUDE.md use?**
A: ~1,100 tokens. Detailed content loads on-demand.

**Q: What's the maximum context I should use?**
A: Use `/compact` at 50% and `/clear` at 80% for best performance.

---

## 📖 Glossary of Terms

| Term               | Definition                                                                                       |
| :----------------- | :----------------------------------------------------------------------------------------------- |
| 🤖 **Agent**       | Specialized AI subagent spawned for deep expertise in a specific domain                          |
| 📜 **CLAUDE.md**   | Core constitution file loaded every session with essential rules                                 |
| 📈 **GSD**         | "Get Shit Done" - Multi-phase project management system                                          |
| 🏪 **Marketplace** | External repository containing community skills and plugins                                      |
| 🔌 **MCP**         | [Model Context Protocol](https://modelcontextprotocol.io) - Extensibility system for Claude Code |
| 🎯 **Router**      | `/start-task` command that detects domains and routes to optimal workflow                        |
| 🎓 **Skill**       | Domain expertise module providing patterns and guidance                                          |
| 📦 **Submodule**   | Git submodule linking to external repository                                                     |
| 💰 **Token**       | Unit of text processing; context limit management                                                |
| 🧠 **ULTRATHINK**  | Maximum reasoning depth mode for complex tasks                                                   |

---

## 📋 Templates

Use these templates to create new skills, agents, commands, and plugins:

| Template                 | Purpose                      | Location                        |
| :----------------------- | :--------------------------- | :------------------------------ |
| 📝 `skill-template.md`   | Create new skills            | `templates/skill-template.md`   |
| 🤖 `agent-template.md`   | Create new subagents         | `templates/agent-template.md`   |
| ⌨️ `command-template.md` | Create slash commands        | `templates/command-template.md` |
| 🔌 `plugin-template/`    | Create distributable plugins | `templates/plugin-template/`    |
| 📄 `project-CLAUDE.md`   | Per-project CLAUDE.md        | `templates/project-CLAUDE.md`   |
| 📋 `task-template.md`    | Task planning documents      | `templates/task-template.md`    |

### 🆕 Project Initialization Workflow

When starting a new project, use the toolkit's project initialization system:

```
┌─────────────────────────────────────────────────────────────┐
│ DECISION: Do you have a CLAUDE.md already?                 │
├─────────────────────────────────────────────────────────────┤
│ YES → /standardize-claude-md [stack]                       │
│       Adds: Related Global Rules, Quick Start, footer      │
│                                                             │
│ NO → What kind of project?                                  │
│      ├── YOUR code → /init-project                         │
│      │   Auto-detects stack or asks, uses YOUR template    │
│      │                                                      │
│      └── External/OSS → /init then /standardize-claude-md  │
│          Claude analyzes first, then add toolkit sections  │
└─────────────────────────────────────────────────────────────┘
```

**Stack options:** `react`, `nextjs`, `static`, `python`, `automation`

**What gets generated:**

- Global delegation statement: `**Global rules from ~/.claude/ apply automatically.**`
- Related Global Rules section pointing to appropriate `rules/stacks/` and `rules/checklists/`
- Quick Start table with common commands
- Standardized footer

### 🚀 Quick Start

```bash
# Initialize a new project (auto-detects or asks stack)
/init-project

# Initialize with specific stack
/init-project react
/init-project nextjs
/init-project static
/init-project python

# Add toolkit sections to existing CLAUDE.md
/standardize-claude-md

# Manual template copy (traditional approach)
cp ~/.claude/templates/project-CLAUDE.md ./CLAUDE.md

# Create a new skill
cp ~/.claude/templates/skill-template.md ~/.claude/skills/my-skill/SKILL.md

# Create a new agent
cp ~/.claude/templates/agent-template.md ~/.claude/agents/my-agent.md

# Create a new command
cp ~/.claude/templates/command-template.md ~/.claude/commands/my-command.md

# Create a new plugin
cp -r ~/.claude/templates/plugin-template ~/my-plugin
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on:

- 🎓 Adding skills (format, requirements, testing)
- 🤖 Adding agents (model selection, tool access)
- ⌨️ Adding commands (argument handling, execution)
- 🔀 Submitting pull requests (commit format, review process)
- 📝 Code style (markdown, YAML frontmatter)

### ⚡ Quick Contribution

1. 🍴 Fork the repository
2. 🌿 Create feature branch: `git checkout -b feat/my-feature`
3. ✏️ Make changes following existing patterns
4. 🧪 Test with Claude Code
5. 💾 Commit with conventional format: `feat: add my-feature`
6. 🚀 Push and create PR

---

## 📜 Version History

|  Version  |   Date   | Changes                                                                                                                                                                           |
| :-------: | :------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **2.2.0** | Jan 2026 | 🌐 Showcase website (claude.travisjneuman.com), 📦 pull-all-repos script, 📝 documentation overhaul, 🎨 tjn.claude/ branding                                                      |
| **1.4.3** | Dec 2025 | 🪝 Hooks simplified for Windows compatibility (removed 9 Unix-specific hooks, kept PostToolUse for Prettier), 🔒 Security audit documentation                                     |
| **1.4.1** | Dec 2025 | 🆕 Project initialization workflow: `/init-project` (adaptive stack detection), `/standardize-claude-md` (retrofit existing projects), 📄 Updated project-CLAUDE.md template v2.0 |
| **1.4.0** | Dec 2025 | 📋 5 new templates, ⌨️ 5 new commands (/review-code, /health-check, /context-stats, /session-log, /backup-config), 🔌 MCP wildcard permissions                                    |
| **1.3.3** | Dec 2025 | 🪝 Original hook implementation (superseded by 1.4.3), 📝 session logging                                                                                                         |
| **1.3.2** | Dec 2025 | 📊 SessionStart + Notification hooks, 🐹 Go + 🦀 Rust stack guides, 📚 documentation overhaul                                                                                     |
| **1.3.1** | Dec 2025 | 🪝 Git hooks (pre-commit, commit-msg, pre-push), ⚡ Claude Code lifecycle hooks (Stop, PreToolUse, PostToolUse), 📋 .gitignore cleanup                                            |
| **1.3.0** | Dec 2025 | 📜 CLAUDE.md refactor (45% reduction, ~1,100 tokens), 📚 satellite guides, 💰 token optimization                                                                                  |
| **1.2.0** | Dec 2025 | 🏪 6 new marketplaces (21 total), 📈 GSD tutorial, 🔍 `/discover-skills` command, 🌐 skillsmp.com integration                                                                     |
| **1.1.0** | Dec 2025 | 🎓 5 new skills (devops-cloud, ai-ml-development, game-development, macos-native, database-expert), 🤖 5 new agents, 📈 GSD integration                                           |
| **1.0.0** | Dec 2025 | 🎉 Initial release: 60+ skills, 30+ agents, 67 marketplaces, rules system                                                                                                         |

See [CHANGELOG.md](./CHANGELOG.md) for complete history.

---

## 🔗 Resources & Links

### 📚 Official Documentation

| Resource                                                                                          | Description            |
| :------------------------------------------------------------------------------------------------ | :--------------------- |
| 📘 [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)                    | Official docs          |
| 🪝 [Claude Code Hooks Guide](https://code.claude.com/docs/en/hooks-guide)                         | Lifecycle hooks        |
| 🤖 [Claude Code Subagents](https://code.claude.com/docs/en/sub-agents)                            | Agent system           |
| 🔌 [MCP Protocol](https://modelcontextprotocol.io)                                                | Model Context Protocol |
| 💡 [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) | Engineering blog       |

### 📁 Internal Documentation

| Resource                                            | Description             |
| :-------------------------------------------------- | :---------------------- |
| 🎓 [Skills Catalog](./skills/MASTER_INDEX.md)       | All 72 skills           |
| 🤖 [Agents Catalog](./agents/README.md)             | All 36 agents           |
| 🔄 [Workflow Guide](./docs/WORKFLOW-GUIDE.md)       | Workflow patterns       |
| 🏪 [Marketplace Guide](./docs/MARKETPLACE-GUIDE.md) | All 67 marketplaces     |
| 🤖 [Auto-Claude Guide](./docs/AUTO-CLAUDE-GUIDE.md) | Autonomous coding setup |
| 📈 [GSD Tutorial](./docs/GSD-TUTORIAL.md)           | Project management      |

### 🌐 Showcase Website

| Resource                                                        | Description                                                                       |
| :-------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| 🌐 [claude.travisjneuman.com](https://claude.travisjneuman.com) | Interactive showcase with skills browser, agent catalog, and marketplace explorer |

### 🌐 Community Resources

| Resource                                                                      | Description              |
| :---------------------------------------------------------------------------- | :----------------------- |
| 🔍 [skillsmp.com](https://skillsmp.com/)                                      | 35,530+ community skills |
| 📚 [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | Community resources      |
| 💬 [Claude Code Subreddit](https://reddit.com/r/ClaudeCode)                   | Community discussion     |

### 🛠️ Technology Links

| Technology                                  | Official Docs           |
| :------------------------------------------ | :---------------------- |
| ⚛️ [React](https://react.dev)               | UI Library              |
| 📦 [Next.js](https://nextjs.org)            | React Framework         |
| 💚 [Vue.js](https://vuejs.org)              | Progressive Framework   |
| 🧡 [Svelte](https://svelte.dev)             | Compiler Framework      |
| 📘 [TypeScript](https://typescriptlang.org) | Typed JavaScript        |
| 🟢 [Node.js](https://nodejs.org)            | JavaScript Runtime      |
| 🐍 [Python](https://python.org)             | Programming Language    |
| 🐹 [Go](https://go.dev)                     | Programming Language    |
| 🦀 [Rust](https://rust-lang.org)            | Systems Language        |
| 🍎 [Swift](https://swift.org)               | Apple Language          |
| 🤖 [Kotlin](https://kotlinlang.org)         | Android Language        |
| 💙 [Flutter](https://flutter.dev)           | Cross-platform UI       |
| 📱 [React Native](https://reactnative.dev)  | Mobile Framework        |
| 🖥️ [Electron](https://electronjs.org)       | Desktop Framework       |
| ☁️ [AWS](https://aws.amazon.com)            | Cloud Platform          |
| ☁️ [GCP](https://cloud.google.com)          | Cloud Platform          |
| ☁️ [Azure](https://azure.microsoft.com)     | Cloud Platform          |
| 🐳 [Docker](https://docker.com)             | Containerization        |
| ☸️ [Kubernetes](https://kubernetes.io)      | Container Orchestration |
| 🏗️ [Terraform](https://terraform.io)        | Infrastructure as Code  |

---

## ⚙️ Advanced Configuration & Customization

This section covers advanced customization for power users who want to extend the toolkit with custom skills, agents, hooks, and integrations.

### 🎨 Creating Custom Skills

Skills are markdown files that provide Claude with domain expertise. Creating effective skills requires understanding Claude's context loading and the SKILL.md format.

#### Skill File Structure

```markdown
---
name: my-custom-skill
description: Brief description (appears in skill listings)
---

# Skill Title

## Overview

High-level description of what this skill provides.

## Core Concepts

Key knowledge areas this skill covers.

## Best Practices

Recommended patterns and approaches.

## Code Examples

Concrete examples demonstrating the concepts.

## Anti-Patterns

What to avoid and why.

## See Also

Links to related skills and documentation.
```

#### Complete Skill Example: Company API Patterns

```markdown
---
name: company-api-patterns
description: Internal API design standards for Acme Corp. Enforces REST conventions, auth patterns, and error handling.
---

# Acme Corp API Patterns

## Overview

This skill enforces Acme Corp's internal API standards for all backend services.
All APIs MUST follow these patterns for consistency and maintainability.

## Authentication

All endpoints MUST use JWT bearer tokens:

\`\`\`typescript
// Required header
Authorization: Bearer <jwt-token>

// Token payload structure
interface TokenPayload {
sub: string; // User ID
email: string; // User email
roles: string[]; // Permission roles
iat: number; // Issued at
exp: number; // Expiration
}
\`\`\`

## Error Response Format

ALL error responses MUST follow this structure:

\`\`\`typescript
interface ErrorResponse {
error: {
code: string; // Machine-readable code (e.g., "VALIDATION_ERROR")
message: string; // Human-readable message
details?: unknown[]; // Optional field-level details
requestId: string; // For support/debugging
};
}

// Example
{
"error": {
"code": "VALIDATION_ERROR",
"message": "Request validation failed",
"details": [
{ "field": "email", "message": "Invalid email format" }
],
"requestId": "req-abc123"
}
}
\`\`\`

## HTTP Status Codes

| Code | Usage                    |
| ---- | ------------------------ |
| 200  | Success with body        |
| 201  | Created (POST success)   |
| 204  | Success no body (DELETE) |
| 400  | Validation error         |
| 401  | Not authenticated        |
| 403  | Not authorized           |
| 404  | Resource not found       |
| 409  | Conflict (duplicate)     |
| 500  | Server error             |

## Pagination

List endpoints MUST support cursor-based pagination:

\`\`\`typescript
// Request
GET /api/v1/users?limit=20&cursor=abc123

// Response
{
"data": [...],
"pagination": {
"hasMore": true,
"nextCursor": "xyz789",
"total": 150
}
}
\`\`\`

## Rate Limiting Headers

All responses MUST include rate limit headers:

\`\`\`
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
\`\`\`

## Anti-Patterns

❌ NEVER use query strings for sensitive data
❌ NEVER return stack traces in production
❌ NEVER use sequential IDs (use UUIDs)
❌ NEVER skip input validation
❌ NEVER log request/response bodies with PII

## See Also

- [Generic API Design Skill](../api-design/SKILL.md)
- [Security Skill](../security/SKILL.md)
```

#### Skill Creation Checklist

```
□ Clear, descriptive name in frontmatter
□ Concise description (appears in listings)
□ Overview section explaining the skill's purpose
□ Concrete code examples (not just concepts)
□ Anti-patterns section (what to avoid)
□ See Also links to related skills
□ Placed in ~/.claude/skills/<name>/SKILL.md
□ Tested by invoking: Skill(my-custom-skill)
```

---

### 🤖 Creating Custom Agents

Agents are autonomous workers that can be spawned to handle complex tasks. They run in their own context and can use specified tools.

#### Agent Definition Structure

```json
{
  "name": "my-agent",
  "description": "What this agent does and when to use it",
  "model": "sonnet",
  "tools": ["Read", "Grep", "Glob", "Write", "Edit", "Bash"],
  "systemPrompt": "You are a specialized agent that...",
  "maxTurns": 50,
  "temperature": 0.7
}
```

#### Complete Agent Example: Documentation Generator

```json
{
  "name": "doc-generator",
  "description": "Generates comprehensive documentation for codebases. Use when creating README files, API docs, or architecture documentation.",
  "model": "sonnet",
  "tools": ["Read", "Write", "Glob", "Grep", "LSP"],
  "systemPrompt": "You are a technical documentation specialist. Your task is to analyze codebases and generate clear, comprehensive documentation.\n\n## Your Approach\n\n1. EXPLORE: Use Glob and Grep to understand the codebase structure\n2. ANALYZE: Read key files to understand functionality\n3. DOCUMENT: Write clear, structured documentation\n\n## Documentation Standards\n\n- Use clear headings and subheadings\n- Include code examples from the actual codebase\n- Explain the 'why' not just the 'what'\n- Add diagrams using ASCII art where helpful\n- Include installation and quick start sections\n- Document configuration options\n- List dependencies and requirements\n\n## Output Format\n\nGenerate documentation in Markdown format with:\n- Table of contents\n- Collapsible sections for detailed content\n- Code blocks with syntax highlighting\n- Tables for reference data",
  "maxTurns": 100,
  "temperature": 0.3
}
```

#### Tool Access Levels

| Tools            | Access Level    | Use Case           |
| ---------------- | --------------- | ------------------ |
| Read, Glob, Grep | Read-only       | Safe exploration   |
| + LSP            | Read + Analysis | Code understanding |
| + Write, Edit    | Read + Write    | Code modification  |
| + Bash           | Full            | System operations  |

#### Agent Invocation

```typescript
// In Claude Code, invoke with Task tool
Task(doc - generator);
("Generate comprehensive documentation for the src/auth/ module");

// Agents run in their own 200k context
// Can spawn up to 10 parallel agents
// Single-level nesting (agents cannot spawn agents)
```

---

### 🪝 Creating Custom Hooks

Hooks allow automation at various lifecycle points. They're defined in `~/.claude/settings.json`.

#### Available Hook Events

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           HOOK EVENT TIMELINE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SESSION                                                                     │
│  ───────                                                                     │
│  SessionStart ──────────────────────────────────────────────> SessionEnd    │
│       │                                                            │         │
│       ▼                                                            │         │
│  TURN LOOP                                                         │         │
│  ─────────                                                         │         │
│  UserPromptSubmit ─────────────────────────────────────────┐       │         │
│       │                                                    │       │         │
│       ▼                                                    │       │         │
│  TOOL CALLS                                                │       │         │
│  ──────────                                                │       │         │
│  PreToolUse ────> [Tool Executes] ────> PostToolUse       │       │         │
│       │                                       │            │       │         │
│       │                                       ▼            │       │         │
│       │                              Notification          │       │         │
│       │                                       │            │       │         │
│       ▼                                       │            │       │         │
│  PermissionRequest (if needed)                │            │       │         │
│       │                                       │            │       │         │
│       └───────────────────────────────────────┴────────────┘       │         │
│                                                                    │         │
│  SPECIAL EVENTS                                                    │         │
│  ──────────────                                                    │         │
│  PreCompact (context management)                                   │         │
│  SubagentStop (agent completion)                                   │         │
│  Stop (awaiting input)                                             │         │
│                                                                    │         │
└────────────────────────────────────────────────────────────────────┴─────────┘
```

#### Hook Configuration Examples

##### 1. Logging Hook (Session Events)

```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "bash -c 'echo \"[$(date +%Y-%m-%d\\ %H:%M:%S)] Session started\" >> ~/.claude/.session-log'"
      }
    ],
    "SessionEnd": [
      {
        "type": "command",
        "command": "bash -c 'echo \"[$(date +%Y-%m-%d\\ %H:%M:%S)] Session ended\" >> ~/.claude/.session-log && echo \"────────────────────────\" >> ~/.claude/.session-log'"
      }
    ]
  }
}
```

##### 2. Safety Hook (Block Dangerous Commands)

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -qE \"rm -rf /|format c:|DROP DATABASE|--no-preserve-root\"; then echo \"BLOCKED: Dangerous command detected\" >&2; exit 1; fi'"
          }
        ]
      }
    ]
  }
}
```

##### 3. Formatting Hook (Auto-Format on Save)

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_FILE_PATH\"; if [[ \"$FILE\" =~ \\.(ts|tsx|js|jsx)$ ]]; then npx prettier --write \"$FILE\" 2>/dev/null; fi'"
          }
        ]
      },
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_FILE_PATH\"; if [[ \"$FILE\" =~ \\.(ts|tsx|js|jsx)$ ]]; then npx prettier --write \"$FILE\" 2>/dev/null; fi'"
          }
        ]
      }
    ]
  }
}
```

##### 4. Notification Hook (Desktop Alerts)

```json
{
  "hooks": {
    "Stop": [
      {
        "type": "command",
        "command": "bash -c 'if [[ \"$OSTYPE\" == \"msys\" ]] || [[ \"$OSTYPE\" == \"cygwin\" ]] || [[ -n \"$WINDIR\" ]]; then powershell -Command \"[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null; $template = [Windows.UI.Notifications.ToastTemplateType]::ToastText01; $xml = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent($template); $xml.GetElementsByTagName(\\\"text\\\")[0].AppendChild($xml.CreateTextNode(\\\"Claude needs your input\\\")) | Out-Null; [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier(\\\"Claude Code\\\").Show([Windows.UI.Notifications.ToastNotification]::new($xml))\"; elif [[ \"$OSTYPE\" == \"darwin\"* ]]; then osascript -e \"display notification \\\"Claude needs your input\\\" with title \\\"Claude Code\\\"\"; elif command -v notify-send &>/dev/null; then notify-send \"Claude Code\" \"Claude needs your input\"; fi'"
      }
    ]
  }
}
```

#### Hook Environment Variables

| Variable             | Available In     | Description                     |
| -------------------- | ---------------- | ------------------------------- |
| `CLAUDE_TOOL_NAME`   | All tool hooks   | Name of the tool being used     |
| `CLAUDE_TOOL_INPUT`  | PreToolUse       | JSON input to the tool          |
| `CLAUDE_TOOL_OUTPUT` | PostToolUse      | JSON output from the tool       |
| `CLAUDE_FILE_PATH`   | Write/Edit hooks | Path of the file being modified |
| `CLAUDE_SESSION_ID`  | All hooks        | Current session identifier      |

#### Hook Return Codes

| Exit Code | Effect                                |
| --------- | ------------------------------------- |
| 0         | Hook succeeded, continue              |
| 1+        | Hook failed                           |
| 2         | (PreToolUse) Block the tool execution |

---

### 📜 Creating Custom Commands

Commands are markdown files that provide complex prompts when invoked via `/command-name`.

#### Command File Structure

```markdown
# Command Title

Brief description of what this command does.

## Usage

/command-name [arguments]

## Arguments

- `arg1`: Description
- `arg2`: Description (optional)

## Implementation

[Detailed prompt that Claude will follow when this command is invoked]
```

#### Complete Command Example: Review PR

```markdown
# Review Pull Request

Comprehensive code review for pull requests.

## Usage

/review-pr [pr-number]

## Arguments

- `pr-number`: GitHub PR number to review (optional - uses current branch if omitted)

## Implementation

You are performing a comprehensive pull request review. Follow this structured process:

### 1. Gather Context

First, understand what's being reviewed:

\`\`\`bash

# Get PR details

gh pr view [pr-number] --json title,body,files,commits

# Get the diff

git diff main...HEAD
\`\`\`

### 2. Review Categories

Evaluate the changes against these criteria:

#### Correctness

- Does the code do what it claims?
- Are edge cases handled?
- Is error handling appropriate?

#### Security

- Input validation present?
- No secrets exposed?
- Auth/authz correct?

#### Performance

- No obvious N+1 queries?
- Appropriate caching?
- Reasonable time/space complexity?

#### Maintainability

- Clear naming?
- Adequate comments for complex logic?
- No unnecessary complexity?

#### Testing

- Tests cover new functionality?
- Edge cases tested?
- Tests are readable?

### 3. Output Format

Provide feedback in this structure:

\`\`\`markdown

## PR Review: [Title]

### Summary

[1-2 sentence summary of the changes]

### Verdict: [APPROVE | REQUEST_CHANGES | COMMENT]

### Critical Issues (Must Fix)

- [ ] Issue 1: Description (file:line)

### Suggestions (Nice to Have)

- [ ] Suggestion 1: Description

### Positive Notes

- What was done well

### Questions

- Any clarifications needed
  \`\`\`

### 4. If Changes Requested

Create a checklist of specific fixes needed. Be constructive and explain WHY each change is important.
```

#### Command Location

Commands should be placed in:

- Global: `~/.claude/commands/command-name.md`
- Plugin: `~/.claude/plugins/plugin-name/commands/command-name.md`

---

### 🔧 MCP Server Configuration

MCP (Model Context Protocol) servers extend Claude's capabilities. Each requires specific configuration.

#### MCP Configuration File

Location: `~/.claude/.mcp.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-filesystem"],
      "disabled": true
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-memory"],
      "disabled": true
    },
    "sqlite": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-sqlite",
        "--db-path",
        "./data.db"
      ],
      "disabled": true
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-playwright"],
      "disabled": true
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-sequential-thinking"],
      "disabled": true
    }
  }
}
```

#### Custom MCP Server

Creating a custom MCP server:

```typescript
// my-mcp-server/index.ts
import { Server } from "@modelcontextprotocol/sdk/server";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";

const server = new Server({
  name: "my-custom-server",
  version: "1.0.0",
});

// Define a tool
server.tool(
  "my_tool",
  "Description of what this tool does",
  {
    // JSON Schema for parameters
    param1: { type: "string", description: "First parameter" },
    param2: { type: "number", description: "Second parameter" },
  },
  async ({ param1, param2 }) => {
    // Tool implementation
    const result = await doSomething(param1, param2);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  },
);

// Define a resource
server.resource("my_resource", "resource://my-server/data", async () => {
  const data = await fetchData();
  return {
    contents: [{ uri: "resource://my-server/data", text: data }],
  };
});

// Start the server
const transport = new StdioServerTransport();
server.connect(transport);
```

Add to `.mcp.json`:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["./my-mcp-server/dist/index.js"],
      "disabled": true
    }
  }
}
```

---

### 📦 Plugin Development

Plugins package skills, agents, commands, and hooks together for distribution.

#### Plugin Structure

```
my-plugin/
├── plugin.json           # Plugin manifest
├── skills/
│   ├── skill-1/
│   │   └── SKILL.md
│   └── skill-2/
│       └── SKILL.md
├── agents/
│   ├── agent-1.json
│   └── agent-2.json
├── commands/
│   ├── command-1.md
│   └── command-2.md
├── hooks/
│   └── hooks.json        # Hook definitions
├── templates/
│   └── ...               # Optional templates
└── README.md
```

#### plugin.json Manifest

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A comprehensive plugin for X development",
  "author": "Your Name",
  "license": "MIT",
  "homepage": "https://github.com/you/my-plugin",
  "keywords": ["claude-code", "plugin", "x-development"],
  "compatibility": {
    "claude-code": ">=1.4.0"
  },
  "components": {
    "skills": [
      {
        "name": "skill-1",
        "path": "skills/skill-1/SKILL.md"
      }
    ],
    "agents": [
      {
        "name": "agent-1",
        "path": "agents/agent-1.json"
      }
    ],
    "commands": [
      {
        "name": "command-1",
        "path": "commands/command-1.md"
      }
    ]
  },
  "hooks": "hooks/hooks.json",
  "dependencies": {
    "prettier": "^3.0.0"
  }
}
```

#### Installation

```bash
# Install from local path
cp -r my-plugin ~/.claude/plugins/

# Or clone from GitHub
git clone https://github.com/author/my-plugin ~/.claude/plugins/my-plugin

# Register in settings.json (automatic for ~/.claude/plugins/)
```

---

### 🎛️ Environment-Specific Configuration

Different configurations for different environments.

#### Environment Detection

```bash
# In hooks or scripts
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS specific
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux specific
elif [[ "$OSTYPE" == "msys" ]] || [[ -n "$WINDIR" ]]; then
    # Windows (Git Bash) specific
fi
```

#### Multi-Machine Setup

```
~/.claude/
├── settings.json              # Machine-specific (not committed)
├── settings.template.json     # Template for new machines
├── .mcp.json                  # Machine-specific (not committed)
├── .mcp.template.json         # Template for new machines
└── CLAUDE.md                  # Shared (committed)
```

#### Profile-Based Configuration

```json
// settings.json with profiles
{
  "profiles": {
    "personal": {
      "model": "claude-opus-4-5-20250514",
      "autoCommit": true
    },
    "work": {
      "model": "claude-sonnet-4-20250514",
      "autoCommit": false,
      "hooks": {...}
    }
  },
  "activeProfile": "personal"
}
```

---

### 🔐 Secrets Management

Never commit secrets. Use these patterns instead.

#### Environment Variables

```bash
# ~/.bashrc or ~/.zshrc
export ANTHROPIC_API_KEY="sk-..."
export GITHUB_TOKEN="ghp_..."
export OPENAI_API_KEY="sk-..."
```

#### Local Secrets File

```bash
# ~/.claude/.secrets (in .gitignore)
ANTHROPIC_API_KEY=sk-...
DATABASE_URL=postgres://...
```

Load in hooks:

```bash
# Load secrets if file exists
if [ -f ~/.claude/.secrets ]; then
    export $(cat ~/.claude/.secrets | xargs)
fi
```

#### Secrets in Commands

```markdown
# My Command

[...]

## Implementation

IMPORTANT: Never include actual secrets in commands.
Reference environment variables:

\`\`\`bash

# Correct: Use environment variable

curl -H "Authorization: Bearer $API_KEY" https://api.example.com

# WRONG: Hardcoded secret

curl -H "Authorization: Bearer sk-abc123..." https://api.example.com
\`\`\`
```

---

### 📊 Configuration Validation

Validate your configuration is correct.

#### Health Check Command

```bash
# Run built-in health check
/health-check verbose

# Manual validation
cat ~/.claude/settings.json | jq .  # Check JSON validity
cat ~/.claude/.mcp.json | jq .      # Check MCP config
```

#### Common Configuration Issues

| Issue             | Symptom                | Fix                               |
| ----------------- | ---------------------- | --------------------------------- |
| Invalid JSON      | Tools fail silently    | Run through `jq`                  |
| Missing skill     | Skill doesn't activate | Check path in `skills/`           |
| Hook not running  | No effect on events    | Check `settings.json` hooks array |
| MCP disabled      | MCP tools unavailable  | Check `disabled: false`           |
| Permission denied | Hook script fails      | `chmod +x script.sh`              |

---

## 🔮 Future Roadmap & Vision

This section outlines the planned evolution of the Ultimate Claude Code Toolkit, from near-term enhancements to long-term architectural vision.

### 📅 Release Schedule

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              RELEASE TIMELINE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Q1 2025          Q2 2025          Q3 2025          Q4 2025                │
│  ─────────        ─────────        ─────────        ─────────              │
│  v1.5.0           v2.0.0           v2.5.0           v3.0.0                 │
│  ├─ Skill Hub     ├─ Plugin 2.0    ├─ Cloud Sync    ├─ AI Advisor         │
│  ├─ Team Mode     ├─ Visual UI     ├─ Analytics     ├─ Self-Improve       │
│  └─ API Access    └─ Marketplace   └─ Enterprise    └─ Full Auto          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 🎯 v1.5.0 — "Team Foundation" (Q1 2025)

**Theme:** Collaboration and sharing capabilities.

#### Planned Features

##### 1. Skill Hub

Centralized skill management with installation, updates, and discovery.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SKILL HUB                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  /skill-hub                                                                  │
│  ├── install <skill-name>     Install from registry                         │
│  ├── update [skill-name]      Update installed skills                       │
│  ├── search <query>           Search all registries                         │
│  ├── info <skill-name>        Detailed skill information                    │
│  ├── list --installed         List installed skills                         │
│  ├── list --available         List all available                            │
│  ├── publish <path>           Publish to registry                           │
│  └── verify <skill-name>      Verify skill integrity                        │
│                                                                              │
│  Registry Sources:                                                           │
│  • Local (~/.claude/skills/)                                                 │
│  • Marketplace (67 repos)                                                    │
│  • skillsmp.com API (1,900+ skills)                                        │
│  • Custom registries (enterprise)                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Implementation Details:**

- Package manifest format (skill.json)
- Dependency resolution between skills
- Version pinning and lockfiles
- Automatic update checks with notifications
- Rollback capability for failed updates

##### 2. Team Mode

Shared configuration and workflows for teams.

```typescript
// ~/.claude/team.json
{
  "team": {
    "name": "Frontend Team",
    "id": "team-abc123",
    "members": [
      { "email": "dev1@company.com", "role": "admin" },
      { "email": "dev2@company.com", "role": "member" }
    ]
  },
  "shared": {
    "skills": ["company-style-guide", "internal-api-patterns"],
    "agents": ["pr-reviewer-strict"],
    "hooks": {
      "PreToolUse": [{ "matcher": "Bash", "script": "validate-command.sh" }]
    },
    "settings": {
      "model": "claude-sonnet-4-20250514",
      "autoCommit": false
    }
  },
  "sync": {
    "enabled": true,
    "interval": "daily",
    "conflictResolution": "ask"
  }
}
```

**Features:**

- Shared skill libraries
- Team-wide CLAUDE.md additions
- Synchronized settings
- Audit logging for compliance
- Role-based access control

##### 3. API Access Layer

Programmatic access to toolkit capabilities.

```typescript
// Example: Using toolkit skills from external scripts

import { ToolkitClient } from "@claude-toolkit/sdk";

const toolkit = new ToolkitClient({
  configPath: "~/.claude",
});

// Invoke a skill programmatically
const result = await toolkit.skill("api-design", {
  context: "Design REST API for user management",
  options: {
    outputFormat: "openapi",
    version: "3.0.0",
  },
});

// Run an agent
const review = await toolkit.agent("security-auditor", {
  files: ["src/auth/*.ts"],
  depth: "thorough",
});

// Execute a command
await toolkit.command("commit", {
  message: "feat: add user API",
  staged: true,
});
```

---

### 🎯 v2.0.0 — "Platform Evolution" (Q2 2025)

**Theme:** Major architecture upgrade with visual interface.

#### Planned Features

##### 1. Plugin System 2.0

Complete plugin architecture with hot-loading and sandboxing.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PLUGIN SYSTEM 2.0                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Plugin Lifecycle:                                                           │
│  ─────────────────                                                           │
│  1. DISCOVERY: Scan plugin directories, read manifests                       │
│  2. VALIDATION: Check compatibility, dependencies, signatures               │
│  3. LOADING: Initialize in isolated sandbox                                  │
│  4. ACTIVATION: Register capabilities with core                             │
│  5. EXECUTION: Run in response to triggers                                   │
│  6. DEACTIVATION: Clean shutdown, state persistence                          │
│                                                                              │
│  Sandbox Features:                                                           │
│  ─────────────────                                                           │
│  • Isolated process with resource limits                                     │
│  • Capability-based permissions                                              │
│  • Network access control                                                    │
│  • File system restrictions                                                  │
│  • Time and memory limits                                                    │
│                                                                              │
│  Plugin Types:                                                               │
│  ─────────────                                                               │
│  • Skills (knowledge and guidance)                                           │
│  • Agents (autonomous task execution)                                        │
│  • Commands (user-invokable actions)                                         │
│  • Hooks (lifecycle event handlers)                                          │
│  • Integrations (external service connectors)                                │
│  • Themes (UI customization - future)                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Manifest Format:**

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "compatibility": ">=2.0.0",
  "permissions": ["read:files", "write:files", "network:api.example.com"],
  "provides": {
    "skills": ["my-skill"],
    "agents": ["my-agent"],
    "commands": ["my-command"]
  },
  "dependencies": {
    "core-utils": "^1.0.0"
  }
}
```

##### 2. Visual Dashboard (Web UI)

Browser-based toolkit management interface.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🏠 Home  │  📦 Skills  │  🤖 Agents  │  ⚙️ Settings  │  📊 Analytics        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ SKILLS OVERVIEW                                                   ⟳ 🔍  ││
│  ├─────────────────────────────────────────────────────────────────────────┤│
│  │                                                                          ││
│  │  Local Skills: 72        Marketplace: 1,900+      Total: 2,000+         ││
│  │  ═══════════════════════════════════════════════════════════════════    ││
│  │                                                                          ││
│  │  ┌──────────────────────┐  ┌──────────────────────┐                     ││
│  │  │ 📊 By Category       │  │ 🔥 Most Used         │                     ││
│  │  ├──────────────────────┤  ├──────────────────────┤                     ││
│  │  │ Development    35    │  │ 1. security          │                     ││
│  │  │ DevOps        15    │  │ 2. test-specialist   │                     ││
│  │  │ Design        12    │  │ 3. api-design        │                     ││
│  │  │ Business       9    │  │ 4. debug-like-expert │                     ││
│  │  └──────────────────────┘  └──────────────────────┘                     ││
│  │                                                                          ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  QUICK ACTIONS                                                               │
│  ─────────────                                                               │
│  [📥 Install Skill]  [📤 Create Skill]  [🔄 Sync Marketplaces]              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Features:**

- Real-time session monitoring
- Drag-and-drop skill configuration
- Visual hook builder
- Agent workflow designer
- Performance dashboards
- Log viewer with filtering

##### 3. Official Marketplace

Curated, verified skill marketplace.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           OFFICIAL MARKETPLACE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Features:                                                                   │
│  ─────────                                                                   │
│  • Verified publishers with signing keys                                     │
│  • Automated security scanning                                               │
│  • Compatibility testing against toolkit versions                            │
│  • User reviews and ratings                                                  │
│  • Download statistics                                                       │
│  • Version history and changelogs                                            │
│  • One-click installation                                                    │
│  • Automatic updates                                                         │
│                                                                              │
│  Categories:                                                                 │
│  ───────────                                                                 │
│  📱 Mobile Development        ☁️ Cloud & DevOps                             │
│  🎨 Design & UI              🔒 Security                                    │
│  📊 Data Science              🧪 Testing                                     │
│  🤖 AI/ML                     💼 Business                                    │
│  🎮 Game Development          📚 Documentation                               │
│                                                                              │
│  Publisher Program:                                                          │
│  ──────────────────                                                          │
│  1. Apply for publisher status                                               │
│  2. Generate signing key                                                     │
│  3. Submit skills for review                                                 │
│  4. Pass automated checks                                                    │
│  5. Manual review for featured status                                        │
│  6. Publish to marketplace                                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 🎯 v2.5.0 — "Enterprise Ready" (Q3 2025)

**Theme:** Enterprise features and cloud integration.

#### Planned Features

##### 1. Cloud Sync & Backup

Seamless synchronization across devices.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CLOUD SYNC                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Sync Strategy:                                                              │
│  ──────────────                                                              │
│                                                                              │
│  Device A ─────┐                                                             │
│                │                                                             │
│  Device B ─────┼────► Cloud Storage ◄──── Version Control                   │
│                │         │                    │                              │
│  Device C ─────┘         │                    │                              │
│                          ▼                    ▼                              │
│                    Conflict Resolution ──► Merge/Ask                         │
│                                                                              │
│  Synced Items:                                                               │
│  ─────────────                                                               │
│  ✓ Skills (local custom skills)                                             │
│  ✓ Agents (custom agent definitions)                                        │
│  ✓ Commands (slash commands)                                                │
│  ✓ Settings (settings.json)                                                 │
│  ✓ CLAUDE.md (constitution)                                                 │
│  ✓ Hooks (lifecycle hooks)                                                  │
│  ✗ Marketplace repos (too large, fetch on demand)                           │
│  ✗ MCP servers (environment-specific)                                       │
│  ✗ Secrets (never synced)                                                   │
│                                                                              │
│  Conflict Resolution:                                                        │
│  ────────────────────                                                        │
│  1. AUTOMATIC: Merge non-conflicting changes                                 │
│  2. TIMESTAMP: Latest wins (configurable)                                    │
│  3. MANUAL: Prompt user for resolution                                       │
│  4. BRANCH: Keep both versions, user decides later                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

##### 2. Usage Analytics Dashboard

Insights into toolkit usage and effectiveness.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ANALYTICS DASHBOARD                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SESSION METRICS (Last 30 days)                                              │
│  ═══════════════════════════════                                             │
│                                                                              │
│  │ Sessions │ Avg Duration │ Tasks Completed │ Context Efficiency │         │
│  ├──────────┼──────────────┼─────────────────┼─────────────────────┤         │
│  │ 142      │ 28 mins      │ 412             │ 78%                 │         │
│                                                                              │
│  SKILL USAGE                                                                 │
│  ═══════════                                                                 │
│                                                                              │
│  security          ████████████████████████████░░░░░░  68 uses              │
│  test-specialist   ██████████████████░░░░░░░░░░░░░░░░  45 uses              │
│  api-design        ███████████████░░░░░░░░░░░░░░░░░░░  38 uses              │
│  generic-react-*   ████████████░░░░░░░░░░░░░░░░░░░░░░  32 uses              │
│  debug-like-expert █████████░░░░░░░░░░░░░░░░░░░░░░░░░  25 uses              │
│                                                                              │
│  CONTEXT USAGE TREND                                                         │
│  ═══════════════════                                                         │
│                                                                              │
│  100% ┤                                                                      │
│   80% ┤       ╭──╮                                                           │
│   60% ┤    ╭──╯  ╰──╮    ╭──╮                                               │
│   40% ┤╭───╯        ╰────╯  ╰───╮                                           │
│   20% ┤                         ╰───                                        │
│    0% ┼─────┬─────┬─────┬─────┬─────                                        │
│       Week1 Week2 Week3 Week4 Week5                                          │
│                                                                              │
│  RECOMMENDATIONS                                                             │
│  ═══════════════                                                             │
│  • Consider using /compact more frequently (avg usage: 72%)                  │
│  • test-specialist skill could replace manual test writing                   │
│  • 72 skills never used - consider removing to reduce load time              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

##### 3. Enterprise Features

Compliance, security, and governance for organizations.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ENTERPRISE FEATURES                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  AUDIT LOGGING                                                               │
│  ═════════════                                                               │
│  • Every tool invocation logged with timestamp                               │
│  • User identity tracking                                                    │
│  • Session recordings (opt-in)                                               │
│  • Export to SIEM systems                                                    │
│  • Retention policies                                                        │
│                                                                              │
│  COMPLIANCE                                                                  │
│  ══════════                                                                  │
│  • SOC 2 Type II compliance                                                  │
│  • GDPR data handling                                                        │
│  • HIPAA compatibility mode                                                  │
│  • Custom data residency                                                     │
│  • PII detection and masking                                                 │
│                                                                              │
│  GOVERNANCE                                                                  │
│  ══════════                                                                  │
│  • Skill approval workflows                                                  │
│  • Command whitelisting/blacklisting                                         │
│  • Usage quotas and limits                                                   │
│  • Cost tracking and budgets                                                 │
│  • Role-based access control (RBAC)                                          │
│                                                                              │
│  SSO & IDENTITY                                                              │
│  ══════════════                                                              │
│  • SAML 2.0 integration                                                      │
│  • OAuth 2.0 / OIDC                                                          │
│  • Azure AD / Okta / Auth0                                                   │
│  • MFA enforcement                                                           │
│  • Session management                                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 🎯 v3.0.0 — "Autonomous Intelligence" (Q4 2025)

**Theme:** AI-powered self-improvement and full automation.

#### Planned Features

##### 1. AI Advisor

Proactive suggestions and learning from usage patterns.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              AI ADVISOR                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PROACTIVE SUGGESTIONS                                                       │
│  ═════════════════════                                                       │
│                                                                              │
│  Based on your recent work, I notice:                                        │
│                                                                              │
│  💡 You've written similar auth code 5 times this week.                     │
│     → Consider creating a custom "auth-patterns" skill.                      │
│     [Create Skill] [Dismiss]                                                 │
│                                                                              │
│  💡 Your context usage often hits 80%+.                                     │
│     → Enable auto-compact at 60% threshold?                                  │
│     [Enable] [Configure] [No Thanks]                                         │
│                                                                              │
│  💡 The "legacy-helper" skill hasn't been used in 30 days.                  │
│     → Archive to reduce load time?                                           │
│     [Archive] [Keep]                                                         │
│                                                                              │
│  LEARNING FROM PATTERNS                                                      │
│  ═════════════════════                                                       │
│                                                                              │
│  Pattern Detected: You always run tests after editing test files.            │
│  → Auto-create hook to run tests on *.test.ts save?                          │
│                                                                              │
│  Pattern Detected: You often search for React patterns after                 │
│  creating new components.                                                    │
│  → Auto-load generic-react-design-system when creating components?           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

##### 2. Self-Improving Skills

Skills that evolve based on feedback and usage.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SELF-IMPROVING SKILLS                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Feedback Loop:                                                              │
│  ──────────────                                                              │
│                                                                              │
│  ┌───────────┐   Use    ┌───────────┐   Feedback   ┌───────────┐           │
│  │   Skill   │ ───────► │   User    │ ───────────► │  Learning │           │
│  └───────────┘          └───────────┘              └───────────┘           │
│        ▲                                                  │                 │
│        │                                                  │                 │
│        └─────────────── Update ◄──────────────────────────┘                 │
│                                                                              │
│  Improvement Mechanisms:                                                     │
│  ───────────────────────                                                     │
│                                                                              │
│  1. EXPLICIT FEEDBACK                                                        │
│     User rates skill output: 👍 👎                                          │
│     Comments on what could be better                                         │
│                                                                              │
│  2. IMPLICIT SIGNALS                                                         │
│     User immediately edits output → skill wasn't quite right                │
│     User asks follow-up questions → incomplete guidance                      │
│     User switches to different skill → wrong skill activated                 │
│                                                                              │
│  3. COMMUNITY CONTRIBUTIONS                                                  │
│     Aggregated feedback from all users (anonymized)                          │
│     Successful patterns propagated to all                                    │
│                                                                              │
│  4. AUTOMATED TESTING                                                        │
│     Skills tested against benchmark prompts                                  │
│     Regression detection on updates                                          │
│                                                                              │
│  Privacy Controls:                                                           │
│  ─────────────────                                                           │
│  • All learning opt-in                                                       │
│  • Local-only mode available                                                 │
│  • Data anonymization for shared learning                                    │
│  • Full data export/deletion                                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

##### 3. Full Automation Mode

End-to-end autonomous development with human oversight.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FULL AUTOMATION MODE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  AUTOMATION LEVELS                                                           │
│  ═════════════════                                                           │
│                                                                              │
│  Level 0: MANUAL                                                             │
│  ───────────────────                                                         │
│  Every action requires explicit user approval                                │
│  Current default behavior                                                    │
│                                                                              │
│  Level 1: ASSISTED                                                           │
│  ────────────────────                                                        │
│  Safe operations auto-approved (reads, searches)                             │
│  Writes and executions require approval                                      │
│                                                                              │
│  Level 2: SUPERVISED                                                         │
│  ────────────────────                                                        │
│  Most operations auto-approved with audit trail                              │
│  Destructive operations require approval                                     │
│  Periodic review checkpoints                                                 │
│                                                                              │
│  Level 3: AUTONOMOUS                                                         │
│  ────────────────────                                                        │
│  Full automation within defined boundaries                                   │
│  Human notified of key decisions                                             │
│  Rollback capability for all changes                                         │
│                                                                              │
│  BOUNDARY CONFIGURATION                                                      │
│  ═════════════════════                                                       │
│                                                                              │
│  {                                                                           │
│    "automationLevel": 2,                                                     │
│    "boundaries": {                                                           │
│      "allowedDirs": ["src/", "tests/"],                                     │
│      "forbiddenDirs": ["node_modules/", ".git/"],                           │
│      "maxFilesPerSession": 50,                                               │
│      "maxLinesChanged": 1000,                                                │
│      "requireReviewAfter": 30, // minutes                                    │
│      "blockPatterns": ["rm -rf", "DROP TABLE"]                              │
│    },                                                                        │
│    "notifications": {                                                        │
│      "onCommit": true,                                                       │
│      "onError": true,                                                        │
│      "dailySummary": true                                                    │
│    }                                                                         │
│  }                                                                           │
│                                                                              │
│  SAFETY GUARANTEES                                                           │
│  ═════════════════                                                           │
│  • All changes recorded with full rollback                                   │
│  • Boundary violations immediately halt automation                           │
│  • Human override always available via kill switch                           │
│  • Regular checkpoint summaries                                              │
│  • Anomaly detection for unusual patterns                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 🌟 Long-Term Vision (2026+)

#### Universal Development Platform

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          2026+ VISION                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  UNIVERSAL DEVELOPMENT PLATFORM                                              │
│  ══════════════════════════════                                              │
│                                                                              │
│  The toolkit evolves into a complete development environment:                │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                         │ │
│  │   ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │   │                     AI Development Brain                          │  │ │
│  │   │  • Understands entire codebase                                    │  │ │
│  │   │  • Predicts developer intent                                      │  │ │
│  │   │  • Suggests optimal approaches                                    │  │ │
│  │   │  • Learns team patterns                                           │  │ │
│  │   └─────────────────────────────────────────────────────────────────┘  │ │
│  │                              │                                          │ │
│  │       ┌──────────────────────┼──────────────────────┐                  │ │
│  │       ▼                      ▼                      ▼                  │ │
│  │  ┌─────────┐           ┌─────────┐           ┌─────────┐              │ │
│  │  │  Code   │           │  Test   │           │ Deploy  │              │ │
│  │  │ Engine  │◄─────────►│ Engine  │◄─────────►│ Engine  │              │ │
│  │  └─────────┘           └─────────┘           └─────────┘              │ │
│  │       │                      │                      │                  │ │
│  │       └──────────────────────┼──────────────────────┘                  │ │
│  │                              ▼                                          │ │
│  │   ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │   │                    Integration Layer                              │  │ │
│  │   │  IDEs • Git • CI/CD • Cloud • Monitoring • Documentation         │  │ │
│  │   └─────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  KEY CAPABILITIES                                                            │
│  ═════════════════                                                           │
│                                                                              │
│  1. CONTEXTUAL UNDERSTANDING                                                 │
│     • Full codebase knowledge graph                                          │
│     • Cross-repository awareness                                             │
│     • Historical decision context                                            │
│     • Team knowledge synthesis                                               │
│                                                                              │
│  2. PREDICTIVE DEVELOPMENT                                                   │
│     • Anticipate next steps                                                  │
│     • Pre-generate likely code                                               │
│     • Prepare relevant context                                               │
│     • Suggest optimizations proactively                                      │
│                                                                              │
│  3. CONTINUOUS IMPROVEMENT                                                   │
│     • Learn from every interaction                                           │
│     • Adapt to team style                                                    │
│     • Evolve best practices                                                  │
│     • Share learnings across teams                                           │
│                                                                              │
│  4. SEAMLESS INTEGRATION                                                     │
│     • Native IDE plugins                                                     │
│     • Git workflow integration                                               │
│     • CI/CD pipeline hooks                                                   │
│     • Cloud deployment automation                                            │
│     • Real-time collaboration                                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 🤝 Contributing to the Roadmap

We welcome community input on the roadmap:

1. **Feature Requests**: Open an issue with `[FEATURE]` prefix
2. **Priority Input**: Vote on existing feature requests
3. **Design Proposals**: Submit RFCs for major features
4. **Implementation**: Contribute code for approved features

**Roadmap Discussions:**

- GitHub Discussions: Feature prioritization
- Monthly Community Calls: Roadmap reviews
- Quarterly Surveys: User priority input

---

### 📊 Feature Request Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FEATURE REQUEST FLOW                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. SUBMISSION                                                               │
│     └── User creates GitHub issue with template                              │
│                                                                              │
│  2. TRIAGE (1-2 days)                                                        │
│     ├── Maintainer reviews for completeness                                  │
│     ├── Labels added (enhancement, p1/p2/p3, area/*)                         │
│     └── Assigned to milestone or backlog                                     │
│                                                                              │
│  3. COMMUNITY INPUT (1-2 weeks)                                              │
│     ├── Upvotes indicate demand                                              │
│     ├── Comments refine requirements                                         │
│     └── Alternative proposals considered                                     │
│                                                                              │
│  4. DESIGN (if approved)                                                     │
│     ├── RFC for major features                                               │
│     ├── Technical design document                                            │
│     └── API/interface decisions                                              │
│                                                                              │
│  5. IMPLEMENTATION                                                           │
│     ├── Assigned to contributor                                              │
│     ├── PR reviewed                                                          │
│     └── Merged to main                                                       │
│                                                                              │
│  6. RELEASE                                                                  │
│     ├── Included in next version                                             │
│     ├── Changelog entry                                                      │
│     └── Documentation updated                                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Performance Optimization

### Context Window Management

The 200,000 token context window is your most precious resource. Optimize ruthlessly:

#### Token Budget Allocation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    OPTIMAL TOKEN BUDGET DISTRIBUTION                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SYSTEM PROMPT & TOOLS (Fixed)          ████████████░░░░░░░░  30,000 (15%)  │
│  ├── Claude Code base system            ████████░░░░░░░░░░░░  15,000        │
│  ├── CLAUDE.md (lean version)           ██░░░░░░░░░░░░░░░░░░   1,100        │
│  ├── Tool definitions                   █████░░░░░░░░░░░░░░░  10,000        │
│  └── Active MCP servers                 ██░░░░░░░░░░░░░░░░░░   4,000        │
│                                                                              │
│  WORKING CONTEXT (Dynamic)              ████████████████████ 120,000 (60%)  │
│  ├── File contents                      ████████████░░░░░░░░  60,000        │
│  ├── Conversation history               ██████░░░░░░░░░░░░░░  30,000        │
│  ├── Loaded skills/rules                ████░░░░░░░░░░░░░░░░  20,000        │
│  └── Tool results                       ██░░░░░░░░░░░░░░░░░░  10,000        │
│                                                                              │
│  RESERVED FOR OUTPUT                    ██████████░░░░░░░░░░  50,000 (25%)  │
│  └── Claude's response generation                                           │
│                                                                              │
│  TOTAL CAPACITY                         ████████████████████ 200,000        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Context Monitoring Commands

```bash
# Check current context usage
/context

# View usage with breakdown
/context-stats

# Clear conversation (preserves files)
/clear

# Compact context (AI-powered summarization)
/compact

# Force compaction at threshold
# Recommended: Compact at 50% (100,000 tokens)
```

#### Context Optimization Strategies

**1. Proactive Cleanup**

```
BEFORE: Read 20 files, never clear → Context full at 150,000 tokens
AFTER: Read 5 files, clear between tasks → Stays under 80,000 tokens
```

**2. Satellite Loading Pattern**

```
Instead of loading everything upfront:

WRONG:
├── Load all skills at startup
├── Load all rules at startup
└── Context exhausted before work begins

RIGHT:
├── Load CLAUDE.md only (1,100 tokens)
├── Load relevant skill when needed (+2,000 tokens)
├── Unload when task complete
└── Context stays manageable
```

**3. File Reading Efficiency**

```bash
# Read specific lines instead of whole file
Read file.ts offset=100 limit=50  # Just lines 100-150

# Use Grep to find relevant sections first
Grep "function handleAuth" --glob "*.ts"
# Then read only the matching file
```

---

### Latency Optimization

#### Tool Selection Impact

| Tool         | Latency | When to Use              |
| ------------ | ------- | ------------------------ |
| Read         | ~50ms   | Reading specific files   |
| Glob         | ~100ms  | Finding files by pattern |
| Grep         | ~200ms  | Searching file contents  |
| Task (Agent) | ~5-30s  | Complex multi-step work  |
| WebSearch    | ~1-3s   | Current information      |
| WebFetch     | ~2-5s   | Specific URL content     |

#### Parallel Execution

```
SEQUENTIAL (Slow):
├── Read file1.ts (200ms)
├── Read file2.ts (200ms)
├── Read file3.ts (200ms)
└── Total: 600ms

PARALLEL (Fast):
├── Read file1.ts ─┬─ All complete
├── Read file2.ts ─┤  in ~200ms
└── Read file3.ts ─┘
```

**Rule**: Always batch independent tool calls in a single message.

#### Agent Parallelization

```
SEQUENTIAL AGENTS:
├── Launch code-reviewer → Wait 15s → Complete
├── Launch test-generator → Wait 20s → Complete
└── Total: 35s

PARALLEL AGENTS (up to 10):
├── Launch code-reviewer ─┬─ Both complete
└── Launch test-generator ─┘  in ~20s (max)
```

---

### Memory Optimization

#### When to Use MCP Memory Server

| Scenario            | Use Memory? | Why                                |
| ------------------- | ----------- | ---------------------------------- |
| Single session task | No          | Context sufficient                 |
| Multi-day project   | Yes         | Preserve decisions across sessions |
| Team knowledge      | Yes         | Share learnings                    |
| Repetitive tasks    | No          | Skills handle this                 |

#### Memory Patterns

```
GOOD MEMORY USAGE:
├── Store architectural decisions
├── Store user preferences learned over time
├── Store project-specific conventions
└── Store debugging insights

BAD MEMORY USAGE:
├── Store file contents (use filesystem)
├── Store task status (use TodoWrite)
├── Store temporary state (use conversation)
└── Store secrets (never!)
```

---

## 🔒 Security Best Practices

### Input Validation

#### OWASP Top 10 Awareness

The toolkit enforces security patterns that prevent common vulnerabilities:

| Vulnerability         | Prevention Pattern                           |
| --------------------- | -------------------------------------------- |
| **SQL Injection**     | Use parameterized queries, ORMs              |
| **XSS**               | Use textContent, sanitize output             |
| **Command Injection** | Validate inputs, use subprocess safely       |
| **Path Traversal**    | Sanitize file paths, use allowlists          |
| **Secrets Exposure**  | Never commit .env, use environment variables |

#### DOM Security Pattern

```javascript
// SAFE: Use textContent for user data
element.textContent = userInput;

// SAFE: Use DOM APIs
const div = document.createElement("div");
div.textContent = userInput;
parent.appendChild(div);

// SAFE: Sanitize if HTML is required
import DOMPurify from "dompurify";
const sanitized = DOMPurify.sanitize(userHtml);
```

#### Input Sanitization Pattern

```typescript
// Always validate at system boundaries
interface UserInput {
  name: string;
  email: string;
  age: number;
}

function validateInput(raw: unknown): UserInput {
  // Use validation library (zod, joi, yup)
  const schema = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    age: z.number().int().positive().max(150),
  });

  return schema.parse(raw); // Throws if invalid
}
```

---

### Secrets Management

#### Never Commit Secrets

The toolkit's pre-commit hook scans for:

```
Blocked patterns:
├── API keys: sk_live_*, AKIA*, api_key=*
├── Tokens: ghp_*, gho_*, github_pat_*
├── Passwords: password=*, passwd=*, pwd=*
├── Secrets: secret=*, SECRET_KEY=*
├── Connection strings: postgresql://, mongodb://
└── Private keys: -----BEGIN.*PRIVATE KEY-----
```

#### Environment Variable Pattern

```bash
# .env (NEVER COMMIT)
DATABASE_URL=postgresql://...
API_KEY=sk-...
SECRET_KEY=random-string-here

# .env.example (COMMIT THIS)
DATABASE_URL=postgresql://user:pass@localhost:5432/db
API_KEY=your-api-key-here
SECRET_KEY=generate-a-random-key

# .gitignore
.env
.env.local
.env.*.local
*.pem
*.key
credentials.json
```

#### Accessing Secrets in Code

```typescript
// Good: Use environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable required");
}

// Good: Use secrets manager for production
import { SecretsManager } from "@aws-sdk/client-secrets-manager";
```

---

### Dangerous Command Protection

The PreToolUse hook blocks dangerous commands:

```
BLOCKED COMMANDS:
├── rm -rf /               # System destruction
├── rm -rf ~               # Home directory destruction
├── format c:              # Windows drive format
├── mkfs                   # Filesystem creation
├── dd if=/dev/zero       # Disk overwrite
├── :(){ :|:& };:          # Fork bomb
├── chmod -R 777 /         # Permission vulnerability
└── > /etc/passwd          # System file overwrite
```

#### Safe Deletion Patterns

```bash
# Good: Specific paths
rm -rf ./build/
rm -rf ./node_modules/

# Good: Interactive mode
rm -ri ./folder/

# Good: Dry run first
find . -name "*.tmp" -print  # Review first
find . -name "*.tmp" -delete  # Then delete
```

---

### Code Execution Safety

#### Subprocess Security

```python
# Good: Use subprocess with shell=False
import subprocess
result = subprocess.run(['ls', '-la', path], capture_output=True)

# Good: Validate paths before use
import os
safe_path = os.path.realpath(user_path)
if not safe_path.startswith('/allowed/directory/'):
    raise ValueError('Path not allowed')
```

#### JavaScript Security

```javascript
// NEVER dynamically execute user-provided code strings
// NEVER pass user strings to timer functions as code
// ALWAYS use data-driven approaches instead

// SAFE: Use lookup tables instead of dynamic execution
const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

// User selects operation by key, not by code
const result = operations[userSelectedOp](x, y);
```

---

### Audit Trail

The toolkit logs security-relevant events:

```
~/.claude/.session-log entries:
├── [PERMISSION_REQUEST] Tool: Bash, Command: rm -rf ./old/
├── [PERMISSION_GRANTED] User approved Bash execution
├── [TOOL_BLOCKED] PreToolUse hook blocked dangerous command
├── [SECRET_DETECTED] Pre-commit blocked: Found API key in config.ts
└── [SUBAGENT_COMPLETE] security-auditor finished review
```

---

## 📚 Appendices

### Appendix A: Complete Glossary

| Term               | Definition                                     |
| ------------------ | ---------------------------------------------- |
| **Agent**          | Autonomous subprocess with specific expertise  |
| **CLAUDE.md**      | Constitution file defining behavior rules      |
| **Command**        | Slash command that expands to a prompt         |
| **Context Window** | 200,000 token limit for conversation           |
| **GSD**            | "Get Shit Done" - project management framework |
| **Hook**           | Lifecycle event handler                        |
| **Marketplace**    | External repository of skills and agents       |
| **MCP**            | Model Context Protocol - server extensions     |
| **Plugin**         | Distributable package of components            |
| **Satellite**      | On-demand documentation                        |
| **Skill**          | Knowledge module for specific domains          |
| **Submodule**      | Git-tracked external repository                |
| **Token**          | Basic unit of text (~4 characters)             |
| **TodoWrite**      | Task tracking tool                             |
| **Ultrathink**     | Maximum reasoning depth mode                   |

---

### Appendix B: Troubleshooting Reference

| Issue                | Cause                 | Solution                    |
| -------------------- | --------------------- | --------------------------- |
| Skill not activating | Context mismatch      | Use `Skill(name)`           |
| Agent timing out     | Task too complex      | Break into smaller parts    |
| Hook not running     | Missing from settings | Add to hooks array          |
| MCP server not found | Not configured        | Check .mcp.json             |
| Context full         | Too many files        | Use /clear or /compact      |
| Git push blocked     | no_push configured    | Expected for external repos |

---

### Appendix C: Command Reference

#### Built-in Commands

| Command    | Description        |
| ---------- | ------------------ |
| `/help`    | Show help          |
| `/clear`   | Clear context      |
| `/compact` | Summarize context  |
| `/context` | Show usage         |
| `/mcp`     | Manage MCP servers |

#### Toolkit Commands

| Command            | Description             |
| ------------------ | ----------------------- |
| `/start-task`      | Initialize work session |
| `/commit`          | Conventional commit     |
| `/review-code`     | Code review             |
| `/health-check`    | Check configuration     |
| `/discover-skills` | Search skillsmp.com     |

---

### Appendix D: Directory Structure

```
~/.claude/
├── CLAUDE.md          # Constitution
├── README.md          # Documentation
├── agents/            # 36 agents
├── skills/            # 72 skills
├── commands/          # Slash commands
├── rules/             # Contextual rules
├── docs/              # Extended docs
├── templates/         # Creation templates
├── plugins/           # External integrations
│   └── marketplaces/  # 50 submodules
└── scripts/           # Automation
```

---

### Appendix E: Version History

| Version   | Highlights                         |
| --------- | ---------------------------------- |
| **1.4.3** | Hooks simplified for Windows       |
| **1.4.1** | Cross-platform compatibility       |
| **1.4.0** | Templates, utility commands        |
| **1.3.3** | Original hook implementation       |
| **1.3.0** | Token optimization (45% reduction) |
| **1.2.0** | 6 new marketplaces, GSD            |
| **1.0.0** | Initial release                    |

---

### Appendix F: Statistics

```
┌─────────────────────────────────────────────────────────────┐
│           TOOLKIT v2.2.0 STATISTICS                          │
├─────────────────────────────────────────────────────────────┤
│  Skills:        72 local + 1,900+ marketplace                 │
│  Agents:        36                                           │
│  Commands:      72 local + plugin commands                    │
│  Hooks:         2 (PostToolUse for Prettier)                 │
│  Marketplaces:  50                                           │
│  Platforms:     Windows, macOS, Linux                        │
└─────────────────────────────────────────────────────────────┘
```

---

### Appendix G: Quick Reference

```
┌─────────────────────────────────────────────────────────────┐
│                    QUICK REFERENCE                           │
├─────────────────────────────────────────────────────────────┤
│  Start:     /start-task [description]                        │
│  Skills:    Skill(name) or auto-activates                    │
│  Agents:    Task tool with subagent_type                     │
│  Context:   /context, /clear, /compact                       │
│  Commit:    /commit                                          │
│  Debug:     Skill(debug-like-expert)                         │
│  Help:      /help                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 📄 License

**MIT License** - Use, modify, and distribute freely.

See [LICENSE](./LICENSE) for full text.

---

<div align="center">

```
  $$\                                $$\                           $$\                 $$\
  $$ |                               $$ |                          $$ |               $$  |
$$$$$$\   $$\ $$$$$$$\      $$$$$$$\ $$ | $$$$$$\  $$\   $$\  $$$$$$$ | $$$$$$\      $$  /
\_$$  _|  \__|$$  __$$\    $$  _____|$$ | \____$$\ $$ |  $$ |$$  __$$ |$$  __$$\    $$  /
  $$ |    $$\ $$ |  $$ |   $$ /      $$ | $$$$$$$ |$$ |  $$ |$$ /  $$ |$$$$$$$$ |  $$  /
  $$ |$$\ $$ |$$ |  $$ |   $$ |      $$ |$$  __$$ |$$ |  $$ |$$ |  $$ |$$   ____| $$  /
  \$$$$  |$$ |$$ |  $$ |$$\\$$$$$$$\ $$ |\$$$$$$$ |\$$$$$$  |\$$$$$$$ |\$$$$$$$\ $$  /
   \____/ $$ |\__|  \__|\__|\_______|\__| \_______| \______/  \_______| \_______|\__/
    $$\   $$ |
    \$$$$$$  |
     \______/
```

### 🚀 **72 Skills** • 🤖 **36 Agents** • 🏪 **67 Marketplaces** • ⚡ **Complete Automation**

**Transform Claude Code from a capable assistant into an enterprise-grade development environment.**

---

**Built with ❤️ by [Travis Neuman](https://travisjneuman.com)**

---

### ⭐ Star this repo if you find it useful!

[![GitHub stars](https://img.shields.io/github/stars/travisjneuman/.claude?style=social)](https://github.com/travisjneuman/.claude)
[![GitHub forks](https://img.shields.io/github/forks/travisjneuman/.claude?style=social)](https://github.com/travisjneuman/.claude/fork)

</div>
