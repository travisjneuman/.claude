# Contributing to Ultimate Claude Code Toolkit

Thank you for your interest in contributing! This guide explains how to add skills, agents, and other enhancements.

---

## Quick Start

1. Fork the repository
2. Create a feature branch
3. Make your changes following the guidelines below
4. Submit a pull request

---

## Adding Skills

Skills provide domain knowledge and patterns. Each skill lives in its own directory.

### Directory Structure

```
skills/
└── my-skill/
    ├── SKILL.md          # Required: Main skill file
    ├── references/       # Optional: Reference materials
    ├── assets/           # Optional: Templates, examples
    └── scripts/          # Optional: Helper scripts
```

### SKILL.md Format

```yaml
---
name: my-skill
description: Brief description of when Claude should use this skill. Include "Use when..." trigger phrases.
---

# Skill Title

Comprehensive content for the skill domain.

## Section 1
...

## Section 2
...

## Checklist
- [ ] Item 1
- [ ] Item 2
```

### Guidelines

1. **Name**: Use kebab-case (e.g., `react-native`, `api-design`)
2. **Description**: Include "Use when..." to help auto-activation
3. **Content**: Be comprehensive but focused on one domain
4. **Examples**: Include practical code examples
5. **Checklist**: Add actionable checklists where appropriate

### Testing Your Skill

1. Place in `~/.claude/skills/`
2. Start a Claude Code session
3. Mention the skill's topic and verify it activates
4. Test with explicit invocation: `Skill(my-skill)`

---

## Adding Agents

Agents are specialized subagents for focused task execution.

### Agent File Format

```yaml
---
name: my-agent
description: Brief description of agent's expertise
model: sonnet  # or opus, haiku
tools:
  - Glob
  - Grep
  - Read
  - Write
  - Edit
  - Bash
---

# Agent Title

Description of agent capabilities.

## Capabilities

### Category 1
- Capability A
- Capability B

## When to Use This Agent

- Use case 1
- Use case 2

## Instructions

When working on this domain:
1. First principle
2. Second principle

## Reference Skills

- `related-skill-1` - Description
- `related-skill-2` - Description
```

### Guidelines

1. **Name**: Use kebab-case matching the domain
2. **Model Selection**:
   - `opus`: Complex analysis, architecture
   - `sonnet`: Standard tasks (recommended default)
   - `haiku`: Quick tasks, documentation
3. **Tools**: Only include tools the agent needs
4. **Reference Skills**: Link to related skills for context

---

## Adding Rules

Rules provide contextual guidance for specific situations.

### Rule Categories

| Category | Purpose | Location |
|----------|---------|----------|
| Checklists | Task-type specific | `rules/checklists/` |
| Stacks | Technology patterns | `rules/stacks/` |
| Tooling | Setup and troubleshooting | `rules/tooling/` |

### Rule Format

```markdown
# Rule Title

**When to use:** Description of when to read this rule.

---

## Section 1
...

## Related Skills

| Skill | When to Use |
|-------|-------------|
| `skill-name` | Description |

## Related Documentation

- `~/.claude/path/to/doc.md` - Description

---

*Brief summary or key takeaway.*
```

---

## Adding Slash Commands

Custom commands live in `~/.claude/commands/`.

### Command Format

```yaml
---
description: What this command does
arguments:
  - name: arg_name
    description: Argument description
    required: false
---

# Command documentation and instructions for Claude
```

---

## Documentation Standards

### Cross-References

All documentation should include:
- "Related Skills" section linking to relevant skills
- "Related Documentation" section linking to other docs
- Clear "When to use" guidance

### Consistency

- Use consistent heading levels (# for title, ## for sections)
- Include tables for structured information
- Add checklists for actionable items
- Keep line length reasonable for readability

---

## Pull Request Process

1. **Branch naming**: `feature/add-skill-name` or `fix/issue-description`
2. **Commit messages**: Follow conventional commits (`feat:`, `fix:`, `docs:`)
3. **Update indexes**: Add to MASTER_INDEX.md and relevant README files
4. **Update CHANGELOG**: Add entry under "Unreleased" section
5. **Test**: Verify skill/agent works as expected

### PR Checklist

- [ ] Skill/agent follows format guidelines
- [ ] Description includes "Use when..." trigger
- [ ] Cross-references added
- [ ] MASTER_INDEX.md updated
- [ ] CHANGELOG.md updated
- [ ] Tested in Claude Code session

---

## Code of Conduct

- Be respectful and constructive
- Focus on improving the toolkit
- Provide clear explanations for changes
- Help maintain documentation quality

---

## Questions?

- Open an issue for discussion
- Check existing skills/agents for examples
- Review CLAUDE.md for overall philosophy

---

*Thank you for contributing to making Claude Code more powerful!*
