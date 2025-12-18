# Ultimate Claude Code Toolkit

A comprehensive Claude Code enhancement toolkit with 100+ skills, 30+ specialized agents, and complete development workflows for full-stack development across all platforms.

---

## Quick Start

### Installation

```bash
# Option 1: Clone as your .claude directory (fresh install)
mv ~/.claude ~/.claude-backup  # Backup existing if needed
git clone https://github.com/YOURREPO/claude-toolkit.git ~/.claude

# Option 2: Merge with existing setup
git clone https://github.com/YOURREPO/claude-toolkit.git /tmp/claude-toolkit
cp -r /tmp/claude-toolkit/skills/* ~/.claude/skills/
cp -r /tmp/claude-toolkit/agents/* ~/.claude/agents/
cp -r /tmp/claude-toolkit/rules/* ~/.claude/rules/
```

### Verify Installation

```bash
claude  # Start Claude Code
# Test: "Use the graphic-designer agent to suggest a color palette"
```

---

## What's Included

### 100+ Skills

| Category | Coverage |
|----------|----------|
| **Platform Development** | iOS, Android, React Native, Flutter, Electron, PWA |
| **Creative Domain** | Graphic Design, Video, Audio, Branding, Motion |
| **Business Strategy** | Startup Launch, Monetization, Marketing, Finance |
| **Technical Depth** | GraphQL, Microservices, i18n, Real-time |
| **Code Quality** | Testing, Security, Performance, Debugging |
| **UX/Design Systems** | React, Static, Full-stack patterns |

### 30+ Specialized Agents

| Category | Agents |
|----------|--------|
| **Code Quality** | deep-code-reviewer, security-auditor, refactoring-specialist |
| **Platform** | ios-developer, android-developer, mobile-architect, desktop-developer |
| **Creative** | graphic-designer, video-producer, audio-engineer, brand-strategist, motion-designer |
| **Architecture** | graphql-architect, microservices-architect, realtime-specialist |
| **Business** | startup-advisor, monetization-expert |

### Complete Workflow System
- GSD (Get Shit Done) project management
- Task templates and planning tools
- Git hooks and automation
- Contextual rules and checklists

---

## Directory Structure

```
.claude/
├── CLAUDE.md               # Core configuration (constitution)
├── plugin.json             # Plugin manifest
├── README.md               # This file
├── settings.json           # Claude Code settings
│
├── skills/                 # Domain expertise (100+)
│   ├── MASTER_INDEX.md     # Full skill navigation
│   ├── README.md           # Skills documentation
│   ├── ios-development/    # Platform skills
│   ├── graphic-design/     # Creative skills
│   ├── startup-launch/     # Business skills
│   └── ...
│
├── agents/                 # Specialized AI agents (30+)
│   ├── README.md           # Agent documentation
│   └── *.md                # Individual agent files
│
├── rules/                  # Contextual guidelines
│   ├── checklists/         # Task-type checklists
│   ├── stacks/             # Technology-specific rules
│   └── tooling/            # Tool setup guides
│
├── commands/               # Custom slash commands
├── templates/              # Project templates
├── docs/                   # Additional documentation
│
├── # Session files (auto-generated)
├── history.jsonl           # Conversation history
├── plans/                  # Project planning documents
├── tasks/                  # Active task files
└── projects/               # Per-project state
```

---

## Usage Guide

### Using Skills

Skills are automatically loaded. Just ask about a topic:

```
"I'm building an iOS app with SwiftUI. What architecture should I use?"
→ Uses ios-development skill

"Help me design pricing tiers for my SaaS"
→ Uses monetization-strategy skill

"Create a color palette for a fintech app"
→ Uses graphic-design skill
```

### Using Agents

Invoke agents explicitly for specialized assistance:

```
"Use the security-auditor agent to review this auth code"
"Use the ios-developer agent to implement push notifications"
"Use the startup-advisor agent to validate my business idea"
"Use the graphic-designer agent for brand colors"
```

### Slash Commands

```
/gsd:progress              # Check project progress
/gsd:plan-phase           # Plan implementation
/commit-commands:commit    # Create git commit
/code-review:code-review   # Review code
```

---

## Platform Coverage

### Mobile Development
| Platform | Skill | Agent |
|----------|-------|-------|
| iOS/iPadOS/tvOS | `ios-development` | `ios-developer` |
| Android | `android-development` | `android-developer` |
| React Native | `react-native` | `mobile-architect` |
| Flutter | `flutter-development` | `mobile-architect` |

### Desktop & Web
| Platform | Skill | Agent |
|----------|-------|-------|
| Electron/Desktop | `electron-desktop` | `desktop-developer` |
| PWA | `pwa-development` | (uses web skills) |

### Creative & Business
| Domain | Skill | Agent |
|--------|-------|-------|
| Visual Design | `graphic-design` | `graphic-designer` |
| Video | `video-production` | `video-producer` |
| Audio | `audio-production` | `audio-engineer` |
| Branding | `brand-identity` | `brand-strategist` |
| Startups | `startup-launch` | `startup-advisor` |
| Pricing | `monetization-strategy` | `monetization-expert` |

---

## MCP Server Management

MCP servers are **disabled by default** to save context tokens.

### Available Servers

| Server | Purpose | Tokens |
|--------|---------|--------|
| `playwright` | Browser automation, testing | ~14,446 |
| `filesystem` | Extended file operations | ~9,220 |
| `memory` | Persistent knowledge graph | ~5,795 |
| `context7` | Up-to-date documentation | ~TBD |
| `chrome-devtools` | Performance profiling | ~18,000 |

### Enable a Server

Edit `settings.json` and remove from `disabledMcpjsonServers`:

```json
{
  "disabledMcpjsonServers": [
    "sequential-thinking",
    // "playwright",  <-- remove to enable
    "memory"
  ]
}
```

---

## Customization

### Adding Skills

Create `skills/my-skill/SKILL.md`:

```yaml
---
name: my-skill
description: When to use this skill
---

# Skill content here
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

# Agent system prompt here
```

---

## Maintenance

### Updates

```bash
cd ~/.claude && git pull
```

### Cleanup (Optional)

```bash
# Delete auto-generated cruft
rm -rf debug file-history shell-snapshots statsig telemetry
rm stats-cache.json sqlite_mcp_server.db
```

### Backup

```bash
# Essential files only
tar -czf claude-backup.tar.gz \
  CLAUDE.md settings.json .mcp.json \
  skills/ agents/ rules/ commands/ templates/
```

---

## Platform Notes

### Windows
MCP servers use `cmd /c` wrapper (pre-configured).

### Linux/Mac
Edit `.mcp.json` to change:
```json
"command": "cmd", "args": ["/c", "npx", ...]
```
To:
```json
"command": "npx", "args": [...]
```

---

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [awesome-claude-md](https://github.com/josix/awesome-claude-md)

---

## License

MIT License - Use, modify, and distribute freely.

---

*Last Updated: December 2025*
