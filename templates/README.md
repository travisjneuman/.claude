# Templates

Standardized templates for creating Claude Code toolkit components.

---

## Available Templates

| Template | Purpose | Usage |
|:---------|:--------|:------|
| `skill-template.md` | Create new skills | Copy to `skills/[name]/SKILL.md` |
| `agent-template.md` | Create subagents | Copy to `agents/[name].md` |
| `command-template.md` | Create slash commands | Copy to `commands/[name].md` |
| `plugin-template/` | Create distributable plugins | Copy entire directory |
| `project-CLAUDE.md` | Per-project instructions | Copy to project root as `CLAUDE.md` |
| `task-template.md` | Task planning documents | Copy to `tasks/[name].md` |

---

## Quick Start

### Create a Skill

```bash
# 1. Create skill directory
mkdir -p ~/.claude/skills/my-new-skill

# 2. Copy template
cp ~/.claude/templates/skill-template.md ~/.claude/skills/my-new-skill/SKILL.md

# 3. Edit the SKILL.md with your content
```

### Create an Agent

```bash
# 1. Copy template
cp ~/.claude/templates/agent-template.md ~/.claude/agents/my-new-agent.md

# 2. Edit the agent definition
```

### Create a Command

```bash
# 1. Copy template
cp ~/.claude/templates/command-template.md ~/.claude/commands/my-command.md

# 2. Define the command behavior
```

### Create a Plugin

```bash
# 1. Copy entire plugin template
cp -r ~/.claude/templates/plugin-template ~/my-plugin

# 2. Edit plugin.json with your details
# 3. Add your commands, agents, skills

# 4. Test locally
claude plugin install file://~/my-plugin

# 5. Publish (optional)
# Push to GitHub, then: claude plugin install github:username/my-plugin
```

### Create Project CLAUDE.md

```bash
# Copy to your project root
cp ~/.claude/templates/project-CLAUDE.md /path/to/project/CLAUDE.md

# Edit with project-specific instructions
```

---

## Template Contents

### skill-template.md
- SKILL.md format with YAML frontmatter
- Sections: Overview, Principles, Patterns, Anti-patterns, Checklist
- Best practices for skill creation
- Registration instructions

### agent-template.md
- Agent definition format
- Tool selection guide
- Model selection (haiku/sonnet/opus)
- System prompt structure
- Testing and registration

### command-template.md
- Slash command format
- Argument handling
- Implementation structure
- Examples and testing

### plugin-template/
- `plugin.json` - Plugin manifest
- `README.md` - Plugin documentation
- `commands/` - Sample command
- `agents/` - Sample agent
- `skills/` - Sample skill

### project-CLAUDE.md
- Per-project instructions template
- Architecture section
- Conventions section
- Environment setup
- Common tasks

### task-template.md
- Task planning structure
- Implementation checklist
- Review section
- Lessons learned

---

## Best Practices

1. **Start from templates** - Don't create from scratch
2. **Follow naming conventions** - kebab-case for files
3. **Include examples** - Concrete usage examples
4. **Test before registering** - Verify functionality
5. **Update documentation** - Register in appropriate index files

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/agents/README.md` - Agents directory
- `~/.claude/CLAUDE.md` - Global configuration
- `~/.claude/docs/WORKFLOW-GUIDE.md` - Workflow patterns

---

*Templates ensure consistency across the toolkit.*
