# Templates

Standardized templates for creating Claude Code toolkit components.

---

## Available Templates

| Template              | Purpose                                | Usage                                    |
| :-------------------- | :------------------------------------- | :--------------------------------------- |
| `skill-template.md`   | Create new skills                      | Copy to `skills/[name]/SKILL.md`         |
| `agent-template.md`   | Create subagents                       | Copy to `agents/[name].md`               |
| `command-template.md` | Create slash commands                  | Copy to `commands/[name].md`             |
| `plugin-template/`    | Create distributable plugins           | Copy entire directory                    |
| `project-CLAUDE.md`   | Per-project instructions               | Copy to project root as `CLAUDE.md`      |
| `task-template.md`    | Task planning documents                | Copy to `tasks/[name].md`                |
| **NEW in v2.0:**      | **Multi-Window Workflows**             | **Claude 4.5 Best Practices**            |
| `research-notes.md`   | Research tracking with hypothesis tree | Copy to project for research tasks       |
| `tests.json`          | Structured test status tracking        | Copy to project root for test-heavy work |
| `init.sh`             | Project initialization script          | Copy to project root, make executable    |
| `progress.md`         | Session notes and state tracking       | Copy to project for multi-session work   |
| **NEW in v2.3:**      | **Project Starters**                   | **Full-stack scaffolding guides**        |
| `saas-project.md`     | SaaS starter (Next.js + auth + Stripe + DB + email + analytics) | Comprehensive SaaS scaffold |
| `mobile-app-project.md` | Mobile app starter (React Native/Expo or Flutter) | Mobile app scaffold |
| `api-project.md`      | API-only starter (NestJS/FastAPI + auth + DB + docs) | Backend API scaffold |
| `landing-page-project.md` | Landing page (Next.js/Astro + Tailwind + SEO + analytics) | Marketing page scaffold |
| **NEW in v2.6:**      | **Operational Templates**                                  | **Production readiness**                |
| `incident-response-template.md` | Incident playbook with severity levels, timeline, RCA     | Incident response scaffold     |
| `architecture-decision-template.md` | ADR template with context, options, consequences        | Architecture decision record   |
| `release-checklist-template.md` | Release verification with pre/post checks, rollback plan  | Release process scaffold       |

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

**Recommended: Use `/init-project` command** (auto-detects stack, fills template):

```bash
# In your project directory
/init-project              # Auto-detects from package.json, etc.
/init-project react        # Or specify stack explicitly
/init-project nextjs
/init-project static
/init-project python
```

**Alternative: Manual copy**

```bash
# Copy to your project root
cp ~/.claude/templates/project-CLAUDE.md /path/to/project/CLAUDE.md

# Edit with project-specific instructions
```

**For existing CLAUDE.md files (add toolkit sections):**

```bash
# Adds Related Global Rules, Quick Start, footer
/standardize-claude-md         # Auto-detects stack
/standardize-claude-md react   # Or specify stack
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

### project-CLAUDE.md (v2.0)

- Per-project instructions template optimized for global toolkit
- Project Identity table (type, stack, status, priority, URL)
- Commands, Architecture, Project-Specific Rules sections
- **Related Global Rules** - points to appropriate `rules/stacks/` and `rules/checklists/`
- **Quick Start** table with common commands
- Stack-specific examples (React, Next.js, Static, Python, Automation)
- Global delegation statement pattern

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
- `~/.claude/commands/init-project.md` - Project initialization command
- `~/.claude/commands/standardize-claude-md.md` - Standardize existing CLAUDE.md

---

_Templates ensure consistency across the toolkit. Use `/init-project` for automatic setup._
