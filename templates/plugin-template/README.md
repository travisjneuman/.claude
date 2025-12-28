# Plugin Template

Use this template to create distributable Claude Code plugins.

---

## Quick Start

1. Copy this directory to create your plugin:
   ```bash
   cp -r ~/.claude/templates/plugin-template ~/my-plugin
   cd ~/my-plugin
   ```

2. Edit `plugin.json` with your plugin details

3. Add your commands, agents, and skills

4. Test locally:
   ```bash
   claude plugin install file://~/my-plugin
   ```

5. Publish to GitHub and share:
   ```bash
   claude plugin install github:username/my-plugin
   ```

---

## Directory Structure

```
plugin-name/
├── plugin.json           # Plugin manifest (required)
├── README.md             # Documentation
├── commands/             # Slash commands
│   └── example-command.md
├── agents/               # Subagents
│   └── example-agent.md
├── skills/               # Skills
│   └── example-skill/
│       └── SKILL.md
└── hooks/                # (Optional) Hook scripts
```

---

## plugin.json Reference

```json
{
  "$schema": "https://cdn.jsdelivr.net/npm/@anthropic/claude-code-plugin-schema@latest/schema.json",
  "name": "plugin-name",           // Unique identifier
  "version": "1.0.0",              // Semantic versioning
  "description": "What it does",   // Shown in plugin list
  "author": "Your Name",
  "repository": "https://github.com/...",
  "license": "MIT",
  "commands": [...],               // Slash commands
  "agents": [...],                 // Subagents
  "skills": [...],                 // Skills
  "hooks": {...},                  // Lifecycle hooks
  "mcp_servers": [...]             // MCP server configs
}
```

---

## Adding Components

### Commands

Create `commands/my-command.md`:

```markdown
---
description: What this command does
arguments:
  - name: arg1
    description: "Argument description"
    required: true
---

# My Command

[Implementation instructions]
```

Register in `plugin.json`:
```json
"commands": [
  {
    "name": "my-command",
    "description": "Description",
    "file": "commands/my-command.md"
  }
]
```

### Agents

Create `agents/my-agent.md`:

```markdown
---
name: my-agent
description: When to use this agent
tools:
  - Read
  - Grep
model: sonnet
---

# My Agent

[Agent system prompt]
```

Register in `plugin.json`:
```json
"agents": [
  {
    "name": "my-agent",
    "description": "Agent description",
    "file": "agents/my-agent.md"
  }
]
```

### Skills

Create `skills/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: When to activate this skill
---

# My Skill

[Skill content]
```

Register in `plugin.json`:
```json
"skills": [
  {
    "name": "my-skill",
    "description": "Skill description",
    "file": "skills/my-skill/SKILL.md"
  }
]
```

---

## Hooks

Add hooks to run on lifecycle events:

```json
"hooks": {
  "SessionStart": [...],
  "SessionEnd": [...],
  "PreToolUse": [...],
  "PostToolUse": [...],
  "Stop": [...],
  "Notification": [...],
  "PreCompact": [...],
  "UserPromptSubmit": [...],
  "PermissionRequest": [...],
  "SubagentStop": [...]
}
```

---

## Testing

### Local Installation

```bash
# Install from local directory
claude plugin install file:///path/to/plugin

# Verify installation
claude plugin list

# Test commands
/plugin-name:command-name
```

### Uninstall

```bash
claude plugin uninstall plugin-name
```

---

## Publishing

### GitHub (Recommended)

1. Push to GitHub repository
2. Users install with:
   ```bash
   claude plugin install github:username/repo-name
   ```

### npm (Alternative)

1. Publish to npm
2. Users install with:
   ```bash
   claude plugin install npm:package-name
   ```

---

## Best Practices

### Naming
- Use unique, descriptive names
- Avoid conflicts with existing plugins
- Use kebab-case: `my-awesome-plugin`

### Versioning
- Follow semantic versioning
- Update version on changes
- Document changes in README

### Documentation
- Clear README with usage examples
- Document all commands/agents/skills
- Include prerequisites

### Quality
- Test thoroughly before publishing
- Keep dependencies minimal
- Handle errors gracefully

---

## Example Plugins

- [claude-code-plugins](https://github.com/anthropics/claude-code) - Official Anthropic plugins
- [taches-cc-resources](https://github.com/glittercowboy/taches-cc-resources) - Community toolkit
- [wshobson/agents](https://github.com/wshobson/agents) - Agent collection

---

*Template version: 1.0*
