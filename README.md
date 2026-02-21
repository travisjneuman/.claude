<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:6366f1,100:d946ef&height=220&section=header&text=tjn.claude/&fontSize=72&fontColor=ffffff&fontAlignY=35&desc=The%20Ultimate%20Claude%20Code%20Toolkit&descSize=20&descColor=c4b5fd&descAlignY=55&animation=fadeIn" />
  <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=waving&color=0:e0e7ff,50:6366f1,100:9333ea&height=220&section=header&text=tjn.claude/&fontSize=72&fontColor=1e1b4b&fontAlignY=35&desc=The%20Ultimate%20Claude%20Code%20Toolkit&descSize=20&descColor=4338ca&descAlignY=55&animation=fadeIn" />
  <img alt="tjn.claude/ — The Ultimate Claude Code Toolkit" src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:6366f1,100:d946ef&height=220&section=header&text=tjn.claude/&fontSize=72&fontColor=ffffff&fontAlignY=35&desc=The%20Ultimate%20Claude%20Code%20Toolkit&descSize=20&descColor=c4b5fd&descAlignY=55&animation=fadeIn" width="100%" />
</picture>

<br/>

[![v2.8.0](https://img.shields.io/badge/v2.8.0-6366f1?style=flat-square&logo=semver&logoColor=white)](./CHANGELOG.md)
[![Platform](https://img.shields.io/badge/macOS_·_Linux_·_Windows-334155?style=flat-square&logo=apple&logoColor=white)](./docs/SETUP-GUIDE.md)
[![Website](https://img.shields.io/badge/claude.travisjneuman.com-818cf8?style=flat-square&logo=cloudflare&logoColor=white)](https://claude.travisjneuman.com)
[![License](https://img.shields.io/badge/MIT-blue?style=flat-square&logo=opensourceinitiative&logoColor=white)](./LICENSE)

[![Skills](https://img.shields.io/badge/Skills-119-10b981?style=flat-square)](./skills/MASTER_INDEX.md)
[![Agents](https://img.shields.io/badge/Agents-59-f59e0b?style=flat-square)](./agents/README.md)
[![Commands](https://img.shields.io/badge/Commands-30-a855f7?style=flat-square)](./commands/README.md)
[![Repos](https://img.shields.io/badge/Marketplace_Repos-84-3b82f6?style=flat-square)](./plugins/marketplaces/)
[![Marketplace Skills](https://img.shields.io/badge/Marketplace_Skills-5400+-ec4899?style=flat-square)](./docs/MARKETPLACE-GUIDE.md)
[![Hooks](https://img.shields.io/badge/Hooks-10-06b6d4?style=flat-square)](./hooks/README.md)
[![Templates](https://img.shields.io/badge/Templates-17-84cc16?style=flat-square)](./templates/README.md)
[![MCP](https://img.shields.io/badge/MCP_Servers-12-f97316?style=flat-square)](./docs/MCP-SERVERS.md)

</div>

---

## 🚀 What Is This?

A drop-in configuration layer for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) that transforms it from a capable AI assistant into an enterprise-grade development powerhouse.

**One `git clone` gives you** 119 domain skills, 59 specialist agents, 84 community marketplaces with 5,400+ additional skills, 30 slash commands, 10 lifecycle hooks, and 12 MCP server configs — all auto-activating based on what you're working on. No manual configuration required.

**How it works:** Describe what you want in plain language. The toolkit's dynamic router detects context from your prompt and loads the right skills, agents, rules, and checklists automatically. No slash commands needed (though they're available if you prefer).

**Who it's for:** Developers who use Claude Code and want deeper domain expertise, structured workflows, and quality guardrails without manual setup.

---

## ⚡ Quick Start

### One-Line Install

```bash
git clone --recurse-submodules https://github.com/travisjneuman/.claude.git ~/.claude
```

### Manual Clone (if submodules fail)

```bash
git clone https://github.com/travisjneuman/.claude.git ~/.claude
cd ~/.claude
git submodule update --init --recursive
```

### Verify Installation

```bash
# Start Claude Code — the toolkit loads automatically
claude

# Run diagnostics
/health-check
```

That's it. The toolkit auto-activates from `~/.claude/` on every Claude Code session.

---

## 📦 What's Included

| Component | Count | Description |
|-----------|-------|-------------|
| **[Skills](./skills/MASTER_INDEX.md)** | 119 | Domain expertise modules (React, security, DevOps, finance, etc.) |
| **[Agents](./agents/README.md)** | 59 | Specialist subagents for focused tasks (code review, debugging, etc.) |
| **[Commands](./commands/README.md)** | 30 | Slash commands for common workflows (`/commit`, `/review-code`, etc.) |
| **[Marketplace Repos](./plugins/marketplaces/)** | 84 | Community skill repositories (5,400+ additional skills) |
| **[Hooks](./hooks/README.md)** | 10 | Lifecycle hooks (session start/stop, pre-commit, safety guards) |
| **[Templates](./templates/README.md)** | 17 | Project scaffolding and task templates |
| **[MCP Servers](./docs/MCP-SERVERS.md)** | 12 | Model Context Protocol server configurations |
| **[Rules](./rules/README.md)** | 30 | Checklists, stack guides, and workflow references |

<details>
<summary><strong>📋 Skills by Category</strong></summary>

| Category | Skills |
|----------|--------|
| **Web Development** | `react-native`, `vue-development`, `svelte-development`, `flutter-development`, `pwa-development`, `electron-desktop`, `tauri-desktop`, `frontend-enhancer` |
| **Backend & API** | `api-design`, `graphql-expert`, `database-expert`, `microservices-architecture`, `event-driven-architecture`, `websockets-realtime`, `serverless-development` |
| **DevOps & Cloud** | `devops-cloud`, `monitoring-observability`, `performance-engineering`, `mobile-cicd` |
| **AI & Data** | `ai-ml-development`, `llm-app-development`, `data-science` |
| **Security** | `application-security`, `authentication-patterns` |
| **Mobile** | `android-development`, `ios-development`, `macos-native`, `kotlin-multiplatform`, `react-native`, `flutter-development` |
| **Quality** | `generic-code-reviewer`, `generic-feature-developer`, `generic-design-system`, `generic-ux-designer`, `test-specialist`, `tdd-workflow`, `debug-systematic`, `tech-debt-analyzer` |
| **Business** | `business-strategy`, `finance`, `marketing`, `sales`, `product-management`, `hr-talent`, `legal-compliance`, `risk-management`, `operations`, `innovation` |
| **Creative** | `brand-identity`, `graphic-design`, `video-production`, `audio-production`, `ui-animation`, `ui-research` |
| **Productivity** | `codebase-documenter`, `document-skills`, `content-repurposer`, `status-report-generator`, `core-workflow` |
| **Specialized** | `game-development`, `i18n-localization`, `seo-analytics-auditor`, `email-systems`, `payment-integration`, `product-analytics`, `growth-engineering`, `monetization-strategy` |
| **Non-Tech** | `travel-planner`, `event-planner`, `recipe-card-creator`, `health-wellness`, `career-path-planner`, `real-estate-analyzer` |

See **[MASTER_INDEX.md](./skills/MASTER_INDEX.md)** for the full listing with descriptions.

</details>

---

## ⚙️ How It Works

### Dynamic Routing

Every prompt flows through a routing system that loads the best-fit resources on-demand — drawing from 119 built-in skills, 59 agents, 30 rules/checklists, and 5,300+ community marketplace skills across 84 repos:

```
 Your prompt
     │
     ▼
 ┌──────────────────────────────┐
 │  CLAUDE.md Auto-Routing      │  ← Keyword detection table
 │  (always loaded)             │
 └──────────┬───────────────────┘
            │
   ┌────────┼────────┬───────────────┐
   ▼        ▼        ▼               ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌──────────────┐
│Skills│ │Rules │ │Agents│ │ Marketplace  │
│(119) │ │& Chk │ │ (59) │ │  84 repos    │
│      │ │      │ │      │ │  5,400+ more │
└──────┘ └──────┘ └──────┘ └──────────────┘
```

**Example:** Type "review this React component for security issues" and the router automatically loads the React/TypeScript stack guide, the security hardening checklist, and spawns the code reviewer agent — without any slash commands.

### Auto-Routing Table (from CLAUDE.md)

| Your prompt mentions... | Toolkit loads... |
|------------------------|------------------|
| React, TypeScript | React/TS stack guide + React skills |
| Security, OWASP, auth | Security checklist + auth patterns |
| Deploy, CI/CD | Deployment workflow + DevOps skill |
| Database, schema | Database design checklist |
| Performance, optimize | Performance checklist |
| UI, visual, CSS | UI/visual changes checklist |
| Test, testing | Verification template + test specialist |
| Research, investigate | Research methodology workflow |
| Any specialized domain | Best-fit skill from MASTER_INDEX + marketplace (5,400+ skills) |
| Installed plugins | Active agents, commands, and skills from community repos |

### Hook Lifecycle

Hooks run automatically at key points in every session:

```
Session Start
  ├── Pull all repos (background, 60s timeout)
  └── Load previous session context

Every Prompt
  └── Inject git branch + status into context

Before Bash Commands
  ├── Block dangerous commands (rm -rf /, force push, etc.)
  └── Update doc counts before git commit

After File Edits
  └── Scan for leaked secrets

Session Stop
  └── Save session summary for next time
```

See **[hooks/README.md](./hooks/README.md)** for the full hook reference.

---

## 🔑 Key Features

<details>
<summary><strong>🏪 Marketplace — 84 repos, 5,400+ skills</strong></summary>

The toolkit aggregates 84 community skill repositories as git submodules in `plugins/marketplaces/`. All are read-only (fetch but never push). Skills span security (Trail of Bits), full-stack development, scientific computing, SAP/enterprise, Elixir, Terraform, creative writing, and more. Some marketplace repos are **installed as plugins**, making their agents, commands, and skills fully active in the routing system alongside built-in resources. Non-installed repos contribute discoverable skills via keyword search.

```bash
# Search marketplace skills
find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -li "kubernetes"

# Update all marketplace repos
bash ~/.claude/_pull-all-repos.sh
```

See **[docs/MARKETPLACE-GUIDE.md](./docs/MARKETPLACE-GUIDE.md)** for the full catalog.

</details>

<details>
<summary><strong>🛡️ Safety Guards</strong></summary>

The `guard-dangerous.sh` hook blocks dangerous commands before execution:

| Blocked Pattern | Risk |
|----------------|------|
| `rm -rf /` / `rm -rf ~` | Filesystem destruction |
| `git push --force` | Overwrite remote history |
| `DROP TABLE` / `TRUNCATE TABLE` | Database destruction |
| `git reset --hard origin` | Discard all local changes |
| `git clean -fd` | Delete untracked files |
| `curl ... \| sh` | Pipe-to-shell (RCE) |
| `npm publish` | Accidental package publication |
| `chmod -R 777` | Overly permissive permissions |
| `docker system prune -a` | Destroy all Docker resources |

Additional safety: `pre-write-validate.sh` blocks writes to `.env`, `.ssh`, `.gnupg`, `*.pem`, and `*.key` files. `secret-scan.sh` scans every file edit for leaked API keys and tokens.

</details>

<details>
<summary><strong>🖥️ Cross-Platform</strong></summary>

All hooks use a Node.js-based runner (`hooks/run-hook.js`) that resolves paths via `os.homedir()`. This avoids WSL path issues on Windows where `~` resolves to `/root/` instead of the Windows user home.

On Windows, the runner explicitly prefers Git Bash (`C:\Program Files\Git\usr\bin\bash.exe`) over WSL bash to prevent drive mount failures on network drives.

| Platform | Shell | Notes |
|----------|-------|-------|
| macOS | `/bin/bash` | Standard bash via Git or Homebrew |
| Linux | `/bin/bash` | Standard bash |
| Windows | Git Bash (preferred) | Avoids WSL drive mount errors |

</details>

<details>
<summary><strong>🤖 Agent Teams</strong></summary>

For complex tasks, spawn multiple specialist agents to work in parallel:

- **Code review from multiple angles** — security, performance, tests
- **Cross-layer features** — frontend + backend + database agents
- **Competing hypotheses** — debug with parallel investigation

Agent types include architecture analysts, debugging specialists, performance optimizers, security auditors, test generators, and 50+ more. See **[agents/README.md](./agents/README.md)**.

</details>

<details>
<summary><strong>🔌 MCP Servers</strong></summary>

12 MCP server configurations available (all disabled by default for token efficiency):

| Server | Purpose |
|--------|---------|
| `sequential-thinking` | Structured reasoning chains |
| `playwright` | Browser testing & automation |
| `memory` | Persistent memory across sessions |
| `sqlite` / `postgres` | Database operations |
| `github` / `git` | Enhanced GitHub/git operations |
| `chrome-devtools` | Browser debugging & profiling |
| `context7` | Enhanced context retrieval |

Enable on-demand via `/mcp`. See **[docs/MCP-SERVERS.md](./docs/MCP-SERVERS.md)**.

</details>

<details>
<summary><strong>🔄 Session Continuity</strong></summary>

The toolkit maintains context between sessions automatically:

1. **Session stop** — `session-stop-summary.sh` saves working directory, branch, recent commits, active tasks, and pending todos to `~/.claude/last-session.md`
2. **Session start** — `session-start-context.sh` injects the previous session context (if < 24 hours old)
3. **Repo sync** — `session-start-pull.sh` pulls all repos in the background on startup

</details>

---

## 🛠️ Configuration

### Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Core rules, auto-routing table, code standards |
| `settings.json` | Claude Code settings, hook registrations, permissions |
| `.mcp.json` | MCP server definitions |
| `counts.json` | Resource counts (source of truth) |
| `plugin.json` | Plugin metadata |

### Common Customizations

**Add your own project directories** to auto-pull:

```bash
cp ~/.claude/.env.example ~/.claude/.env.local
# Edit CUSTOM_PROJECT_DIRS="/path/to/your/projects"
```

**Switch action mode** between proactive (default) and conservative — see `rules/workflows/action-policy.md`.

**Disable a hook** — edit `settings.json` and remove the hook entry.

---

## 🖥️ Multi-Machine Setup

The toolkit uses a two-layer architecture:

1. **This repo** (`~/.claude/`) — Shared configuration, cloned on every machine
2. **Machine-specific** (`.env.local`, `known_marketplaces.json`) — Gitignored, per-device

### New Device Setup

```bash
git clone --recurse-submodules https://github.com/travisjneuman/.claude.git ~/.claude
cp ~/.claude/.env.example ~/.claude/.env.local
# Edit .env.local with machine-specific paths
bash ~/.claude/scripts/fix-marketplace-paths.sh
```

See **[docs/NEW-DEVICE-SETUP.md](./docs/NEW-DEVICE-SETUP.md)** for the full walkthrough.

---

## 💻 Platform Support

| Platform | Status | Shell | Notes |
|----------|--------|-------|-------|
| **macOS** | Full support | bash/zsh | Notifications via osascript |
| **Linux** | Full support | bash | Notifications via notify-send |
| **Windows 11** | Full support | Git Bash | Hooks use Node.js runner to avoid WSL issues |
| **WSL** | Works | bash | Native Linux behavior inside WSL |

**Requirements:** Node.js (comes with Claude Code), Git, bash (Git Bash on Windows).

---

## 🆕 What's New in v2.8.0

Released February 11, 2026.

- **P0 fix:** Resolved invalid JSON in `settings.json` that caused auto-compact and hook failures on Opus 4.6
- **Hook registration:** Registered missing hooks (`pre-commit-counts.sh`, `secret-scan.sh`)
- **Token optimization:** Removed redundant CLAUDE.md sections, consolidated bash permissions (20 entries → 2 wildcards)
- **Cross-platform fix:** Hook runner now prefers Git Bash on Windows to avoid WSL drive mount errors
- **Streamlined commands:** `start-task.md` reduced from 296 → 156 lines

See **[CHANGELOG.md](./CHANGELOG.md)** for the full history.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [CLAUDE.md](./CLAUDE.md) | Core rules and auto-routing table |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [Architecture](./docs/ARCHITECTURE.md) | System design and component interactions |
| [Setup Guide](./docs/SETUP-GUIDE.md) | First-time installation walkthrough |
| [New Device Setup](./docs/NEW-DEVICE-SETUP.md) | Multi-machine configuration |
| [Workflow Guide](./docs/WORKFLOW-GUIDE.md) | Development workflow patterns |
| [Marketplace Guide](./docs/MARKETPLACE-GUIDE.md) | Community skill catalog |
| [Agent Teams](./docs/AGENT-TEAMS.md) | Multi-agent coordination |
| [Auto-Claude Guide](./docs/AUTO-CLAUDE-GUIDE.md) | Autonomous coding framework |
| [MCP Servers](./docs/MCP-SERVERS.md) | MCP server reference |
| [Configuration](./docs/CONFIGURATION.md) | Full settings.json reference |
| [Folder Structure](./docs/FOLDER-STRUCTURE.md) | Directory layout and purpose |
| [Skills Index](./skills/MASTER_INDEX.md) | All 119 skills with descriptions |
| [Agents Index](./agents/README.md) | All 59 agents with descriptions |

---

## 💡 Philosophy

This toolkit follows three core principles:

1. **Everything activates dynamically.** Describe what you want — the system loads what's needed. No memorizing commands.
2. **Token efficiency over completeness.** Domain content loads on-demand, not upfront. Unused skills cost zero tokens.
3. **Safety by default.** Dangerous commands are blocked, secrets are scanned, protected files are guarded — all before you make a mistake.

---

<div align="center">

**Maintained by [Travis Neuman](https://travisjneuman.com)** · **[claude.travisjneuman.com](https://claude.travisjneuman.com)** · **MIT License**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:6366f1,100:d946ef&height=120&section=footer" />
  <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=waving&color=0:e0e7ff,50:6366f1,100:9333ea&height=120&section=footer" />
  <img alt="" src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:6366f1,100:d946ef&height=120&section=footer" width="100%" />
</picture>

</div>
