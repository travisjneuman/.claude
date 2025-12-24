# Ultimate Claude Code Toolkit

A comprehensive Claude Code enhancement toolkit with **69 local skills**, **37 specialized agents**, **15 plugin marketplaces**, and complete development workflows for full-stack development across all platforms.

**Features:**
- Universal intelligent router that handles ANY prompt automatically
- Persistent memory across sessions (claude-mem)
- Research integration (WebSearch for current info)
- 125+ scientific domain skills
- Decision frameworks for structured thinking
- GSD (Get Shit Done) project management

---

## Quick Start

### Starting a Task

```
/start-task [describe what you want]
```

The universal router automatically:
1. Checks persistent memory for relevant context
2. Detects the domain(s) from your description
3. Loads appropriate skills, agents, and resources
4. Routes to optimal workflow (GSD/Planning/Direct)

**No special keywords required.** Just describe what you want naturally.

### Examples

| You Say | Router Detects | Resources Loaded |
|---------|----------------|------------------|
| "Build an iOS app with SwiftUI" | development/ios | ios-development skill, ios-developer agent, GSD |
| "Analyze this protein sequence" | scientific/proteomics | claude-scientific-skills |
| "What's new in React 19?" | research + development/react | WebSearch + react skill |
| "Should I use Redux or Zustand?" | decision/choice | first-principles framework |
| "Create a pricing strategy" | business/monetization | monetization-strategy skill |

---

## What's Included

### 69 Local Skills

| Category | Coverage |
|----------|----------|
| **Platform Development** | iOS, Android, React Native, Flutter, Electron, PWA, macOS |
| **Creative Domain** | Graphic Design, Video, Audio, Branding, Motion, UI/UX |
| **Business Strategy** | Startup, Monetization, Marketing, Finance, HR, Legal, Operations |
| **Technical Depth** | GraphQL, Microservices, i18n, Real-time, WebSockets |
| **Code Quality** | Testing, Security, Performance, Debugging, Code Review |
| **Design Systems** | React, Static, Full-stack patterns |

### 37 Specialized Agents

| Category | Agents |
|----------|--------|
| **Code Quality** | deep-code-reviewer, security-auditor, refactoring-specialist, performance-optimizer |
| **Platform** | ios-developer, android-developer, mobile-architect, desktop-developer, macos-developer |
| **Creative** | graphic-designer, video-producer, audio-engineer, brand-strategist, motion-designer |
| **Architecture** | graphql-architect, microservices-architect, realtime-specialist, database-architect |
| **Business** | startup-advisor, monetization-expert |
| **Specialized** | typescript-expert, python-expert, react-expert, debugging-specialist |

### 15 Plugin Marketplaces

| Marketplace | Key Capabilities |
|-------------|------------------|
| `anthropic-agent-skills` | Document skills, examples |
| `awesome-claude-skills` | 27 skills: canvas, forensics, invoices |
| `claude-code-plugins` | PR review, commits, feature dev |
| `claude-code-plugins-plus-skills` | 258 plugins, 185 production-ready skills |
| `claude-plugins-official` | External plugins |
| `get-shit-done` | GSD multi-phase project management |
| `mhattingpete-skills` | Git automation, testing, code review |
| `obra-superpowers` | /brainstorm, /write-plan |
| `skillsforge` | 29 curated quality skills |
| `taches-cc-resources` | Decision frameworks, meta-prompting, debugging |
| `voltagent-subagents` | 100+ specialized agents for full-stack dev |
| `wshobson-agents` | 99 agents, 107 skills, 15 orchestrators |
| `claude-mem` | Persistent memory, semantic search, session continuity |
| `skill-seekers` | Auto-generate skills from docs/repos/PDFs |
| `claude-scientific-skills` | 125+ scientific skills: bioinformatics, chemistry, physics |

**Total Available:** 350+ skills, 200+ agents

---

## Core Capabilities

### Universal Router (`/start-task`)

The router detects and loads resources for ANY prompt type:

**Development:** iOS, Android, React, Backend, Database, DevOps, Testing, Security, GraphQL, Microservices, AI/ML, Desktop, PWA, Flutter, React Native

**Scientific:** Bioinformatics, Chemistry, Proteomics, Clinical, Physics, Astronomy, Materials Science, Lab Automation

**Business:** Startup, Finance, Marketing, Sales, Product, Strategy, Operations, HR, Leadership, Legal, Risk, Innovation, Sustainability, Monetization

**Creative:** Graphic Design, Video, Audio, Brand Identity, Motion Design, UI/UX

**Decision Making:** 5-Whys, Eisenhower Matrix, First Principles, Second-Order Thinking, Occam's Razor, SWOT

**Meta/Admin:** Create skills, hooks, commands, agents; commit/PR; status checks

### Persistent Memory (claude-mem)

Context continuity across sessions:
- Key decisions remembered
- Architectural choices preserved
- Project state maintained
- Semantic search for relevant past context

### Research Integration (WebSearch)

Automatically triggered for:
- Current information ("latest", "2025", "what's new")
- Best practices queries
- Technology version questions
- Library/package discovery
- External documentation

### GSD Project Management

Multi-phase project tracking:

| Command | Purpose |
|---------|---------|
| `/gsd:new-project` | Initialize new multi-phase project |
| `/gsd:progress` | Check status, route to next action |
| `/gsd:plan-phase [n]` | Create execution plan for phase |
| `/gsd:execute-plan` | Execute a PLAN.md file |
| `/gsd:resume-work` | Resume with context restoration |

---

## Directory Structure

```
.claude/
├── CLAUDE.md               # Core configuration (constitution)
├── README.md               # This file
├── settings.json           # Claude Code settings
├── plugin.json             # Plugin manifest
│
├── skills/                 # Domain expertise (69)
│   ├── MASTER_INDEX.md     # Full skill navigation
│   ├── README.md           # Skills documentation
│   └── [domain]/SKILL.md   # Individual skills
│
├── agents/                 # Specialized AI agents (37)
│   ├── README.md           # Agent documentation
│   └── *.md                # Individual agent definitions
│
├── commands/               # Custom slash commands
│   ├── start-task.md       # Universal router (v2.0)
│   └── *.md                # Other commands
│
├── rules/                  # Contextual guidelines
│   ├── checklists/         # Task-type checklists
│   ├── stacks/             # Technology-specific rules
│   └── tooling/            # Tool setup guides
│
├── plugins/                # External plugins
│   └── marketplaces/       # 15 marketplace repos
│
├── templates/              # Project templates
├── docs/                   # Additional documentation
│
└── .planning/              # GSD project files (auto-generated)
    ├── PROJECT.md
    ├── ROADMAP.md
    ├── STATE.md
    └── phases/
```

---

## Usage Patterns

### Skills (Automatic Loading)

Skills load automatically based on your prompt:

```
"I'm building an iOS app with SwiftUI"
→ Loads ios-development skill

"Help me design pricing tiers for my SaaS"
→ Loads monetization-strategy skill

"Analyze this gene sequence for mutations"
→ Loads claude-scientific-skills/bioinformatics
```

### Agents (Explicit Invocation)

Invoke agents for specialized deep work:

```
"Use the security-auditor agent to review this auth code"
"Use the ios-developer agent to implement push notifications"
"Use the startup-advisor agent to validate my business idea"
```

### Decision Frameworks

Structured thinking for complex decisions:

```
/consider:first-principles   # Break down to fundamentals
/consider:5-whys            # Find root cause
/consider:eisenhower-matrix # Prioritize by urgency/importance
/consider:swot              # Analyze trade-offs
```

### Meta Commands

Create Claude Code resources:

```
/taches-cc-resources:create-agent-skill   # Create new skill
/taches-cc-resources:create-hook          # Create automation hook
/taches-cc-resources:create-slash-command # Create command
/taches-cc-resources:create-subagent      # Create agent
```

---

## Key Commands Reference

| I want to... | Use |
|--------------|-----|
| Start any task | `/start-task [description]` |
| Check project status | `/gsd:progress` |
| Start new project | `/gsd:new-project` |
| Debug an issue | `Skill(debug-like-expert)` |
| Review my code | `/code-review:code-review` |
| Create a commit | `/commit-commands:commit` |
| Create a PR | `/commit-commands:commit-push-pr` |
| Make a decision | `/consider:first-principles` |
| Brainstorm ideas | `/obra:brainstorm` |
| Check outstanding work | `/taches-cc-resources:check-todos` |

---

## Installation

### Fresh Install

```bash
mv ~/.claude ~/.claude-backup  # Backup existing if needed
git clone https://github.com/YOURREPO/claude-toolkit.git ~/.claude
cd ~/.claude && git submodule update --init --recursive
```

### Update Marketplaces

```bash
cd ~/.claude
git submodule update --remote --merge
```

### Verify Installation

```bash
claude  # Start Claude Code
# Test: "/start-task Build a simple todo app"
```

---

## MCP Server Management

MCP servers are **disabled by default** to save context tokens.

| Server | Purpose | Enable When |
|--------|---------|-------------|
| `playwright` | Browser automation | E2E testing |
| `memory` | Persistent knowledge | Long projects |
| `chrome-devtools` | Performance profiling | Frontend debugging |

Enable via: `/mcp enable playwright`
Disable after: `/mcp disable playwright`

---

## Customization

### Adding Skills

Create `skills/my-skill/SKILL.md`:

```yaml
---
name: my-skill
description: When to use this skill
---

# My Skill

[Skill content here]
```

### Adding Agents

Create `agents/my-agent.md`:

```yaml
---
name: my-agent
description: Agent purpose
model: sonnet
tools:
  - Read
  - Write
---

# Agent System Prompt

[Agent instructions here]
```

---

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [MCP Protocol](https://modelcontextprotocol.io)
- Full skill catalog: `~/.claude/skills/MASTER_INDEX.md`
- Full agent catalog: `~/.claude/agents/README.md`

---

## License

MIT License - Use, modify, and distribute freely.

---

*Last Updated: December 2025 | Version 2.0 - Universal Router*
