---
name: Architecture Overview
description: How CLAUDE.md, rules, skills, agents, hooks, and the website interact as a unified system.
category: reference
---

# Architecture Overview

How the Claude Code Toolkit's components interact, from prompt to execution.

**Last Updated:** February 2026 (v2.3.3)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        User Prompt                                  │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Claude Code CLI    │
                    │   (React/Ink UI)     │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
   ┌──────▼──────┐    ┌───────▼───────┐    ┌──────▼──────┐
   │  Hooks       │    │  Context       │    │  MCP         │
   │  (lifecycle) │    │  (loaded)      │    │  (servers)   │
   └──────┬──────┘    └───────┬───────┘    └──────┬──────┘
          │                    │                    │
          │            ┌───────▼───────┐            │
          │            │  CLAUDE.md     │            │
          │            │  (constitution)│            │
          │            └───────┬───────┘            │
          │                    │                    │
          │    ┌───────────────┼───────────────┐    │
          │    │               │               │    │
   ┌──────▼────▼──┐   ┌───────▼──────┐  ┌────▼────▼────┐
   │  Rules        │   │  Skills       │  │  Agents       │
   │  (contextual) │   │  (knowledge)  │  │  (workers)    │
   └───────────────┘   └──────────────┘  └──────────────┘
```

---

## Component Roles

### CLAUDE.md — The Constitution

The root `~/.claude/CLAUDE.md` file loads into every Claude Code session. It defines:

- **Identity and role** — how Claude should behave
- **P0 non-negotiables** — data integrity, security, coherence
- **Workflow rules** — plan-approve-execute-verify cycle
- **Tool policy** — which tools to use for which operations
- **Auto-routing table** — keyword-to-resource mapping
- **Code standards** — type safety, function size limits

Everything else in the toolkit extends or is referenced by CLAUDE.md.

### Rules — Contextual Guidance

Rules live in `~/.claude/rules/` organized by purpose:

```
rules/
├── checklists/        # Task-type verification (UI, scripts, static sites, API, DB, security, perf)
├── workflows/         # Methodology (research, context, agent teams, deployment CI/CD)
├── stacks/            # Technology patterns (React, Python, Go, Rust, full-stack, Vue, Svelte, Flutter, React Native, Django/FastAPI)
└── tooling/           # Tool setup (git hooks, MCP servers, troubleshooting)
```

Rules load on demand based on the auto-routing table in CLAUDE.md. When a prompt mentions "React," the `rules/stacks/react-typescript.md` file loads. When completing work, `rules/checklists/verification-template.md` loads.

### Skills — Domain Knowledge

Skills in `~/.claude/skills/` are self-contained knowledge packages with a standardized SKILL.md format:

```yaml
---
name: skill-name
description: When to activate this skill
---
# Content: guidelines, patterns, checklists, examples
```

Skills auto-activate when Claude's context matches their description. They provide knowledge but don't execute autonomously.

**Skill categories:**

- Generic (4) — universal code review, design system, feature dev, UX
- Stack-specific (12) — React, static, full-stack variants of the above
- Framework (5) — Vue, Svelte, iOS, Android, Flutter
- Domain expert (16) — business, finance, marketing, legal, data science, etc.
- SaaS lifecycle (6) — authentication, payments, email, analytics, monitoring, serverless
- AI/ML (2) — AI/ML development, LLM app development (RAG, embeddings, agents)
- Infrastructure (4) — event-driven architecture, performance engineering, accessibility, application security
- Platform (3) — Tauri desktop, mobile CI/CD, Kotlin Multiplatform
- Utility (6) — tech debt, testing, documentation, SEO, frontend enhancement
- Agent Teams (1) — team composition and coordination knowledge

### Agents — Autonomous Workers

Agents in `~/.claude/agents/` are spawned via the Task tool with their own context window. Each agent definition specifies:

- Available tools (Read, Write, Bash, etc.)
- Preferred model (haiku/sonnet/opus)
- Domain expertise and instructions

Agents run independently and return results to the caller.

### Hooks — Lifecycle Automation

Hooks in `~/.claude/hooks/` are bash scripts triggered by Claude Code lifecycle events:

```
SessionStart  →  Pull repos, load previous session context
UserPromptSubmit  →  Inject git branch/status into prompt
PreToolUse (Bash)  →  Block dangerous commands, update counts before commit
PostToolUse (Write|Edit)  →  Auto-format modified files
Stop  →  Save session summary for next session
```

Hooks are configured in `settings.json` and execute cross-platform (macOS, Linux, Windows via Git Bash).

### Commands — User-Invoked Workflows

Commands in `~/.claude/commands/` define slash-invoked workflows like `/start-task`, `/auto-claude`, `/gsd:new-project`. They're markdown files with YAML frontmatter that instruct Claude on multi-step processes.

### MCP Servers — Extended Capabilities

MCP (Model Context Protocol) servers add tools beyond Claude's built-in capabilities: sequential thinking, browser automation, persistent memory, database operations. All servers are disabled by default to save context tokens and enabled on-demand.

---

## Data Flow: Prompt to Action

```
1. User types prompt
   │
2. UserPromptSubmit hook fires
   │  └── prompt-context.sh injects git branch, status, recent commits
   │
3. CLAUDE.md loads (always in context)
   │
4. Auto-routing matches keywords in prompt
   │  ├── "React" → loads rules/stacks/react-typescript.md
   │  ├── "bug"   → loads rules/tooling/troubleshooting.md
   │  └── "review"→ activates generic-code-reviewer skill
   │
5. Claude processes prompt with loaded context
   │
6. Tool calls execute
   │  ├── PreToolUse hook: guard-dangerous.sh checks safety
   │  ├── Tool executes (Read, Write, Bash, etc.)
   │  └── PostToolUse hook: format-code.sh auto-formats
   │
7. If git commit detected:
   │  └── pre-commit-counts.sh runs update-counts.sh, stages docs
   │
8. Session ends
   └── session-stop-summary.sh writes last-session.md
```

---

## Website Build Pipeline

The showcase website at `claude.travisjneuman.com` is a Next.js static export that reads toolkit data at build time:

```
~/.claude/ (filesystem)
    │
    ├── docs/*.md          →  getDocs()        →  /docs page
    ├── skills/*/SKILL.md  →  getSkills()      →  /skills page
    ├── agents/*.md        →  getAgents()      →  /agents page
    ├── commands/*.md      →  getCommands()    →  /commands page
    ├── plugins/marketplaces/  →  getMarketplaceStats()  →  /marketplaces page
    └── counts.json        →  API data         →  stats display

    Build: next build → static HTML/CSS/JS
    Deploy: git push → Cloudflare Pages auto-deploy
```

Each data function parses markdown frontmatter with `gray-matter`, extracts content, and returns typed objects for React components.

---

## Configuration Hierarchy

Settings cascade from global to local to project:

```
~/.claude/settings.json          # Global toolkit config (git-tracked)
    ↓ overrides
~/.claude/settings.local.json    # Machine-specific (gitignored)
    ↓ overrides
./CLAUDE.md                      # Project-specific instructions
    ↓ overrides
./.claude/settings.json          # Project-specific settings
```

### What Lives Where

| Setting Type     | File                  | Synced      | Example                              |
| ---------------- | --------------------- | ----------- | ------------------------------------ |
| Permissions      | `settings.json`       | Yes         | Allow/deny tool patterns             |
| Hook definitions | `settings.json`       | Yes         | Which scripts run on which events    |
| Enabled plugins  | `settings.json`       | Yes         | Which marketplace plugins are active |
| MCP servers      | `.mcp.json`           | No          | Platform-specific server commands    |
| Local overrides  | `settings.local.json` | No          | Machine-specific tweaks              |
| Global rules     | `CLAUDE.md`           | Yes         | Behavioral constitution              |
| Project rules    | `./CLAUDE.md`         | Per-project | Project-specific instructions        |

---

## Plugin System

Plugins extend the toolkit with third-party functionality:

```
plugins/
├── local/                    # Your custom plugins
│   └── ralph-wiggum/         # Example: custom notification plugin
│       ├── .claude-plugin/plugin.json
│       ├── commands/
│       ├── hooks/
│       └── scripts/
│
└── marketplaces/             # Community plugins (read-only)
    ├── anthropic-agent-skills/
    ├── claude-code-plugins/
    ├── taches-cc-resources/
    └── ... (67 repos total)
```

Plugins can contribute commands, agents, skills, and hooks. They're registered in `settings.json` under `enabledPlugins`.

---

## Cross-Platform Architecture

The toolkit works identically across macOS, Linux, and Windows:

| Component       | macOS/Linux           | Windows                           |
| --------------- | --------------------- | --------------------------------- |
| Hook execution  | Native bash           | Git Bash (from Git for Windows)   |
| MCP commands    | `npx` directly        | `cmd /c npx` wrapper              |
| File paths      | `/Users/name/.claude` | `C:\Users\name\.claude`           |
| Line endings    | LF                    | LF (enforced by `.gitattributes`) |
| Repo management | `_pull-all-repos.sh`  | Same script via Git Bash          |

Platform detection is handled by individual scripts using `uname` checks.

---

## See Also

- [FOLDER-STRUCTURE.md](./FOLDER-STRUCTURE.md) — Complete file/folder map
- [CONFIGURATION.md](./CONFIGURATION.md) — Settings reference
- [FAQ.md](./FAQ.md) — Common questions answered
- [GLOSSARY.md](./GLOSSARY.md) — Term definitions

---

_The toolkit is a layered system: CLAUDE.md provides the constitution, rules provide contextual guidance, skills provide domain knowledge, agents provide autonomous execution, and hooks provide lifecycle automation._
