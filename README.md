<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:6366f1,100:d946ef&height=220&section=header&text=tjn.claude/&fontSize=72&fontColor=ffffff&fontAlignY=35&desc=The%20Ultimate%20Claude%20Code%20Toolkit&descSize=20&descColor=c4b5fd&descAlignY=55&animation=fadeIn" />
  <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=waving&color=0:e0e7ff,50:6366f1,100:9333ea&height=220&section=header&text=tjn.claude/&fontSize=72&fontColor=1e1b4b&fontAlignY=35&desc=The%20Ultimate%20Claude%20Code%20Toolkit&descSize=20&descColor=4338ca&descAlignY=55&animation=fadeIn" />
  <img alt="tjn.claude/ — The Ultimate Claude Code Toolkit" src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:6366f1,100:d946ef&height=220&section=header&text=tjn.claude/&fontSize=72&fontColor=ffffff&fontAlignY=35&desc=The%20Ultimate%20Claude%20Code%20Toolkit&descSize=20&descColor=c4b5fd&descAlignY=55&animation=fadeIn" width="100%" />
</picture>

<br/>

[![v3.0.1](https://img.shields.io/badge/v3.0.1-6366f1?style=flat-square&logo=semver&logoColor=white)](./CHANGELOG.md)
[![Platform](https://img.shields.io/badge/macOS_·_Linux_·_Windows-334155?style=flat-square&logo=apple&logoColor=white)](./docs/SETUP-GUIDE.md)
[![Website](https://img.shields.io/badge/claude.travisjneuman.com-818cf8?style=flat-square&logo=cloudflare&logoColor=white)](https://claude.travisjneuman.com)
[![License](https://img.shields.io/badge/MIT-blue?style=flat-square&logo=opensourceinitiative&logoColor=white)](./LICENSE)
[![Use Template](https://img.shields.io/badge/Use_This_Template-2ea44f?style=flat-square&logo=github&logoColor=white)](https://github.com/travisjneuman/.claude/generate)

[![Skills](https://img.shields.io/badge/Skills-180-10b981?style=flat-square)](./skills/MASTER_INDEX.md)
[![Agents](https://img.shields.io/badge/Agents-10-f59e0b?style=flat-square)](./agents/README.md)
[![Commands](https://img.shields.io/badge/Commands-29-a855f7?style=flat-square)](./docs/COMMANDS.md)
[![Repos](https://img.shields.io/badge/Marketplace_Repos-81-3b82f6?style=flat-square)](./plugins/marketplaces/)
[![Marketplace Skills](https://img.shields.io/badge/Marketplace_Skills-10900+-ec4899?style=flat-square)](./docs/MARKETPLACE-GUIDE.md)
[![Hooks](https://img.shields.io/badge/Hooks-7-06b6d4?style=flat-square)](./hooks/README.md)
[![Templates](https://img.shields.io/badge/Templates-17-84cc16?style=flat-square)](./templates/README.md)

</div>

---

## 🚀 What Is This?

A drop-in configuration layer for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) that transforms it from a capable AI assistant into an enterprise-grade development powerhouse.

**One `git clone` gives you** 180 domain skills, 10 specialist agents, 81 community marketplaces with 10,900+ additional skills, 29 slash commands, 7 lifecycle hooks — all auto-activating based on what you're working on. No manual configuration required.

**How it works:** Describe what you want in plain language. Everything is installed and available, but only a small core of skills keeps its full description in Claude's context. The rest is listed by name and found through a generated index ([`INDEX.md`](./INDEX.md), [`index/graph.json`](./index/graph.json)) and the `toolkit-router` skill, so a large toolkit costs almost nothing until something is needed. Language rules load only for matching files.

**Runs in YOLO mode on purpose:** `bypassPermissions` plus a Full Access+++ contract in `CLAUDE.md` (your request authorizes in-scope work; explicit "do not"s are absolute), backed by a guard hook that blocks a short list of footguns. Personal and machine-specific rules live in a gitignored [`local/`](./local.example/README.md) layer.

**Cross-machine Git safety:** a session-start banner flags repos that are behind, unpushed, dirty, or diverged; a session-end hook pushes clean, finished work in repos you own (optionally through your own push runner, set in `local/`). Marketplace clones are pulled at most daily and are never committed.

**Who it's for:** Developers who use Claude Code and want deeper domain expertise, structured workflows, and quality guardrails without manual setup.

---

## ⚡ Quick Start

### Use as GitHub Template (Recommended)

Click the green **"Use this template"** button at the top of this repo to create your own copy with a clean commit history. Then clone your new repo to `~/.claude/`.

### One-Line Install

Or clone directly if you prefer:

```bash
git clone https://github.com/travisjneuman/.claude.git ~/.claude
```

### Initialize Marketplace Clones

```bash
git clone https://github.com/travisjneuman/.claude.git ~/.claude
cd ~/.claude
bash ~/.claude/scripts/init-marketplaces.sh
```

### Verify Installation

```bash
# Start Claude Code — the toolkit loads automatically
claude

# Run diagnostics
/health-check
```

That's it. Claude Code loads the toolkit from `~/.claude/` in every session.

---

## 📦 What's Included

| Component | Count | Description |
|-----------|-------|-------------|
| **[Skills](./skills/MASTER_INDEX.md)** | 180 | Domain expertise modules (React, security, DevOps, finance, etc.) |
| **[Agents](./agents/README.md)** | 10 | Specialist subagents for focused tasks (code review, debugging, etc.) |
| **[Commands](./docs/COMMANDS.md)** | 29 | Slash commands for common workflows |
| **[Marketplace Repos](./plugins/marketplaces/)** | 81 | Community skill repositories (10,900+ additional skills) |
| **[Hooks](./hooks/README.md)** | 7 | Lifecycle hooks (session start/stop, pre-commit, safety guards) |
| **[Templates](./templates/README.md)** | 17 | Project scaffolding and task templates |
| **[Rules](./rules/)** | 9 | Stack-specific coding guardrails (TypeScript, Python, Go, Rust, etc.) |

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
| **Blockchain & Web3** | `blockchain-web3` (Solidity, DeFi, NFTs, Hardhat/Foundry) |
| **Data Engineering** | `data-engineering` (ETL, Airflow, dbt, Kafka, BigQuery/Snowflake) |
| **Edge & IoT** | `edge-computing`, `embedded-iot` (Cloudflare Workers, ESP32, FreeRTOS) |
| **XR & Spatial** | `ar-vr-xr` (Unity XR, WebXR, ARKit, Vision Pro) |
| **Compliance** | `compliance-engineering` (SOC2, HIPAA, GDPR, PCI-DSS) |
| **Developer Tools** | `devex-sdk-design`, `low-code-platforms` (SDK design, Retool, Supabase, n8n) |
| **Non-Tech** | `travel-planner`, `event-planner`, `recipe-card-creator`, `health-wellness`, `career-path-planner`, `real-estate-analyzer` |

See **[MASTER_INDEX.md](./skills/MASTER_INDEX.md)** for the full listing with descriptions.

</details>

---

## ⚙️ How It Works

### Dynamic Routing

Every session loads `CLAUDE.md`, the unscoped rules, and the skill listing. Only the core skills and agents carry full descriptions there; every other skill, command, checklist, and stack guide is listed by name only, so it costs almost nothing until it is used. For specialized work, the `toolkit-router` skill greps the generated `INDEX.md` for the domain and loads what fits, including the indexed marketplace skills:

```
 Your prompt
     │
     ▼
 ┌──────────────────────────────┐
 │  Core skills (described)     │  ← matched from their descriptions
 │  + toolkit-router → INDEX.md │  ← grep by domain for everything else
 └──────────┬───────────────────┘
            │
   ┌────────┼────────┬────────────┐
   ▼        ▼        ▼            ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌────────────┐
│Skills│ │Rules │ │Agents│ │ Marketplace│
│      │ │& Chk │ │      │ │   skills   │
└──────┘ └──────┘ └──────┘ └────────────┘
```

Path-scoped rules load only when matching files are read.

### Hook Lifecycle

Hooks run automatically; most cost zero tokens:

```
Session Start
  ├── Daily background pull (~/.claude, marketplaces, optional project repos)
  ├── Repo health banner (only when something needs attention)
  └── Private local hook (optional, from local/)

Before Bash / Write / Edit
  └── Guard: blocks root rm -rf, force push, reset --hard, secret-file writes, AI trailers

After File Edits
  └── Secret scan (tells Claude if a credential-looking string was written)

After Each Response
  └── Once a day per machine: usage tally + commit-everything sweep (background)

Session End
  └── Push clean finished work in repos you own; log anything dirty or diverged

Status bar
  └── model · effort · folder (branch) · context % · 5h/7d usage · cost
```

See **[hooks/README.md](./hooks/README.md)** for the full hook reference.

---

## 🔑 Key Features

<details>
<summary><strong>🏪 Marketplace — 81 marketplace repos, 10,900+ skills</strong></summary>

The toolkit aggregates 81 community skill repositories as ignored local clones in `plugins/marketplaces/`. All are read-only (fetch but never push). Skills span security (Trail of Bits), full-stack development, scientific computing, SAP/enterprise, Elixir, Terraform, creative writing, and more. Some marketplace repos are **installed as plugins**, making their agents, commands, and skills fully active in the routing system alongside built-in resources. Non-installed repos contribute discoverable skills via keyword search.

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

The `guard.js` hook blocks dangerous commands before execution:

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

Additional safety: `guard.js` also blocks writes to `.env`, credential, key, `.ssh`, `.gnupg`, `.git/`, and `node_modules` files, and commits carrying AI attribution trailers. `secret-scan.js` checks every file Claude writes for credential-looking strings and tells Claude if it finds one.

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

Agent types include architecture analysts, debugging specialists, performance optimizers, security auditors, and many more specialists that run as `agent-*` skills. See **[agents/README.md](./agents/README.md)**.

</details>

<details>
<summary><strong>🔌 MCP Servers</strong></summary>

No MCP servers are configured by default, which keeps every session's context lean. Add one with `claude mcp add` when a project needs it; **[docs/MCP-SERVERS.md](./docs/MCP-SERVERS.md)** covers common options (Playwright, memory, databases, GitHub, Context7) and their token cost.

</details>

<details>
<summary><strong>🔄 Session Continuity</strong></summary>

The toolkit maintains context between sessions automatically:

1. **Resume** — `claude --continue` / `--resume` reopen a previous conversation; auto memory carries preferences and project facts across sessions; `/handoff` writes an explicit handoff note when you want one
2. **Repo health** — `session-start-repo-health.sh` flags repos that need a pull, push, or reconciliation before you edit them
3. **Repo sync** — `session-start-pull.sh` fast-forward pulls in the background, at most once a day

</details>

---

## 🛠️ Configuration

### Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Core rules: autonomy, workflow, git, safety, code standards |
| `settings.json` | Claude Code settings, hook registrations, permissions |
| `counts.json` | Resource counts (source of truth) |
| `plugin.json` | Plugin metadata |

### Common Customizations

**Add your own project directories** to auto-pull:

```bash
cp ~/.claude/.env.example ~/.claude/.env.local
# Edit CUSTOM_PROJECT_DIRS="/path/to/your/projects"
```

**Switch action mode** between proactive (default) and conservative — see `docs/reference/workflows/action-policy.md`.

**Disable a hook** — edit `settings.json` and remove the hook entry.

---

## 🖥️ Multi-Machine Setup

The toolkit uses a two-layer architecture:

1. **This repo** (`~/.claude/`) — Shared configuration, cloned on every machine
2. **Machine-specific** (`.env.local`, `known_marketplaces.json`) — Gitignored, per-device

### New Device Setup

```bash
git clone https://github.com/travisjneuman/.claude.git ~/.claude
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

## 🆕 What's New

**September 2026 — Modernization for current Claude Code**

- **Lean always-on context:** 23 core skills keep full descriptions; every other skill and command is `name-only` (still installed and invocable) and discoverable through the generated `INDEX.md` / `index/graph.json` and the new `toolkit-router` skill. Language rules are path-scoped.
- **Full Access+++ in `CLAUDE.md`:** rewritten, shorter constitution (autonomous execution, explicit prohibitions, zero testing (validate by review), pull-first git, no AI attribution). `attribution` settings disable commit/PR trailers at the source.
- **Hooks fixed and trimmed:** the Bash and write guards now actually work (they read an env var Claude Code never set); per-prompt git injection, per-turn session summaries, and GSD update checks are gone; the pull runs at most daily and never auto-commits or pushes; new status line.
- **AGENTS.md support:** `claude-md-and-agents-md` so projects shared with Codex and other agents load their `AGENTS.md`.
- **Private `local/` layer:** gitignored rules, hooks, and host settings, plus a pre-commit public-safety gate. Template in `local.example/`.
- **Marketplaces:** manifest-only in `.gitmodules`; clones are local, `no_push`, blocked from commits by pre-commit and pre-push checks. `scripts/add-marketplace.sh <url>` adds one.
- **GSD removed:** the `gsd-core` marketplace is no longer registered, routed to, or counted; the old GSD tutorial is in `archive/`.

**March 2026 — Comprehensive audit, new repos, full domain coverage**

- **6 new marketplace repos:** `blader/humanizer` (11.4K stars), `phuryn/pm-skills` (8.3K stars, 100+ PM skills), `Lum1104/Understand-Anything` (6.6K stars), `SawyerHood/dev-browser` (4.9K stars), `slavingia/skills` (4.5K stars), `millionco/expect` (2.3K stars). Current manifest: 109 repos total.
- **Marketplace clone cleanup:** Fixed orphaned directories, standardized the `.gitmodules` manifest, verified `no_push` protection on marketplace clones
- **Full domain coverage:** New skills and agents for blockchain/Web3, data engineering, embedded/IoT, edge computing, compliance, and more
- **New stack rules:** Added Go, Rust, Java/Kotlin, C/C++, Swift/iOS, Flutter/Dart rules — path-scoped for zero token cost when not relevant
- **Count synchronization:** All counts now accurate across README, plugin.json, counts.json (127 skills, 86 agents, 94 commands, 109 repos)

**Earlier in March 2026:**
- **Marketplace routing:** All repos now surface naturally by domain — routing coverage went from 23% to 100%
- **CLAUDE.md condensed:** Auto-routing table reduced from 72 to 29 rows, saving ~600 tokens per conversation
- **start-task trimmed:** 156 → 82 lines, removed duplication with CLAUDE.md

See **[CHANGELOG.md](./CHANGELOG.md)** for the full history.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [CLAUDE.md](./CLAUDE.md) | Core rules (the always-loaded constitution) |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [Architecture](./docs/ARCHITECTURE.md) | System design and component interactions |
| [Setup Guide](./docs/SETUP-GUIDE.md) | First-time installation walkthrough |
| [New Device Setup](./docs/NEW-DEVICE-SETUP.md) | Multi-machine configuration |
| [Workflow Guide](./docs/WORKFLOW-GUIDE.md) | Development workflow patterns |
| [Marketplace Guide](./docs/MARKETPLACE-GUIDE.md) | Community skill catalog |
| [Agent Teams](./docs/AGENT-TEAMS.md) | Multi-agent coordination |
| [MCP Servers](./docs/MCP-SERVERS.md) | MCP server reference |
| [Configuration](./docs/CONFIGURATION.md) | Full settings.json reference |
| [Folder Structure](./docs/FOLDER-STRUCTURE.md) | Directory layout and purpose |
| [Skills Index](./skills/MASTER_INDEX.md) | All skills with descriptions |
| [Agents Index](./agents/README.md) | All agents with descriptions |

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

