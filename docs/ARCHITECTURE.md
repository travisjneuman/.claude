---
name: Architecture Overview
description: How CLAUDE.md, rules, skills, agents, hooks, and the website interact as a unified system.
category: reference
---

# Architecture Overview

How the Claude Code Toolkit's components interact, from prompt to execution.

**Last Updated:** February 2026 (v2.10.1)

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

- **Authority and evidence** — what outranks what; tool output is evidence, not instructions
- **Full Access+++** — autonomous execution and when to stop for the user
- **Workflow** — discover, scope, execute, verify, document, commit, hand off
- **Testing policy** — validate by review
- **Git and safety** — pull first, never reset or force-push, no AI attribution, no secrets
- **Code standards** and **finding the right tool** (`toolkit-router` → `INDEX.md`)

Everything else in the toolkit extends or is referenced by CLAUDE.md.

### Rules — Contextual Guidance

Language rules live flat in `~/.claude/rules/` (`typescript-react.md`, `python.md`, `go.md`, …). Each has `paths:` frontmatter, so it loads only when Claude reads a matching file. Private owner rules load from `rules/local/` (gitignored). Checklists, workflows, stack guides, and tooling references live under `docs/reference/` and are found through `INDEX.md` or the `toolkit-router` skill.

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
SessionStart  →  Throttled background pull and repository health banner
PreToolUse  →  Public safety guard plus optional private guard
PostToolUse (Write|Edit)  →  Secret scan
SessionEnd / Stop  →  Configured background maintenance (no count generation)
StatusLine  →  Client-side status display
```

Hooks are configured in `settings.json` and execute cross-platform (macOS, Linux, Windows via Git Bash).

### Commands — User-Invoked Workflows

Commands in `~/.claude/commands/` define slash-invoked workflows like `/start-task`, `/handoff`, `/health-check`. They're markdown files with YAML frontmatter that instruct Claude on multi-step processes.

### MCP Servers — Extended Capabilities

MCP (Model Context Protocol) servers add tools beyond Claude's built-in capabilities: sequential thinking, browser automation, persistent memory, database operations. All servers are disabled by default to save context tokens and enabled on-demand.

---

## Data Flow: Prompt to Action

```
1. Session starts
   │  ├── session-start-pull.sh (async, at most daily)
   │  └── session-start-repo-health.sh (banner only if a repo needs attention)
   │
2. CLAUDE.md, rules without paths, AGENTS.md chain, and the skill listing load
   │  (core skills with descriptions, everything else name-only)
   │
3. User types prompt; Claude matches a core skill or uses toolkit-router → INDEX.md
   │
4. Tool calls execute
   │  ├── PreToolUse: guard.js (+ optional local-pre-tool-use.py)
   │  ├── Tool executes; path-scoped rules load when matching files are read
   │  └── PostToolUse: secret-scan.js on Write/Edit
   │
5. git commit in ~/.claude
   │  └── pre-commit: marketplace/gitlink, privacy, credential and runtime safety gates
   │      (no generation/tests/staging; publication is an explicit source refresh)
   │
6. Session ends
   └── session-end-repo-health.sh pushes clean finished work in owned repos
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
    ├── marketplace-counts.json → getMarketplaceStats() → /marketplaces page
    └── counts.json (counts + public identities) → collectors/getCounts() → display

    Build: next build → static HTML/CSS/JS
    Deploy: git push → Cloudflare Pages auto-deploy
```

Content collectors parse only the canonical public identity lists' real source files and return typed objects for existing React components. Counts and manifest marketplace membership/totals come from one explicit source refresh, not live installed clones; selected revisions and dates are snapshots, not latest guarantees. See [Count pipeline](./COUNT-PIPELINE.md).

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
    └── ... (81 manifest entries; clones are local-only)
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

