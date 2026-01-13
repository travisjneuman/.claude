# Skill Template

Use this template to create new skills for Claude Code.

---

## File Structure

```
skills/
└── [skill-name]/
    ├── SKILL.md          # Main skill file (required)
    ├── references/       # Reference materials (optional)
    │   └── *.md
    └── assets/           # Templates, examples (optional)
        └── *
```

---

## SKILL.md Template

Copy the content below to create your skill:

````markdown
---
name: skill-name
description: Brief description (shown in skill list and used for auto-activation matching)
---

# Skill Title

## Overview

[1-2 paragraphs explaining what this skill covers and when to use it]

---

## Core Principles

1. **Principle 1** - Description
2. **Principle 2** - Description
3. **Principle 3** - Description

---

## Key Patterns

### Pattern 1: [Name]

**When to use:** [Context]

**Implementation:**

```[language]
// Code example
```
````

**Why:** [Explanation]

### Pattern 2: [Name]

**When to use:** [Context]

**Implementation:**

```[language]
// Code example
```

---

## Anti-Patterns

| Anti-Pattern   | Why It's Bad | Better Approach    |
| -------------- | ------------ | ------------------ |
| [Bad practice] | [Reason]     | [Good alternative] |

---

## Checklist

Before completing work with this skill:

- [ ] [Verification step 1]
- [ ] [Verification step 2]
- [ ] [Verification step 3]

---

## Related Resources

- **Skills:** `related-skill-1`, `related-skill-2`
- **Agents:** `related-agent`
- **Rules:** `rules/path/to/relevant.md`

---

## Examples

### Example 1: [Scenario]

**Input:** [What the user might ask]

**Approach:** [How to handle it]

**Output:** [Expected result]

---

_Last updated: [Date]_

```

---

## Best Practices for Skills

### Naming
- Use `kebab-case` for skill names
- Be descriptive but concise: `react-performance` not `rp`
- Prefix with domain if needed: `ios-accessibility`

### Description
- Keep under 100 characters
- Include keywords for auto-activation
- Describe the skill's purpose, not its contents

### Content
- Be comprehensive but focused on ONE domain
- Include concrete examples, not just theory
- Reference other skills/rules rather than duplicating
- Keep files under 500 lines (split if larger)

### References Directory
Use for:
- External documentation excerpts
- Detailed API references
- Long code examples
- Historical context

### Assets Directory
Use for:
- Code templates
- Configuration file examples
- Starter files

---

## Skill Categories

| Category | Prefix | Example |
|----------|--------|---------|
| Framework | `[framework]-` | `vue-development` |
| Platform | `[platform]-` | `ios-development` |
| Domain | `[domain]-` | `security` |
| Stack | `generic-[stack]-` | `generic-react-code-reviewer` |
| Workflow | `[workflow]-` | `tdd-workflow` |

---

## Testing Your Skill

1. Create the skill file
2. Restart Claude Code or start new session
3. Test auto-activation with relevant prompts
4. Test explicit invocation: `Skill(your-skill-name)`
5. Verify the skill provides correct guidance

---

## Registering Your Skill

After creation:
1. Add to `skills/MASTER_INDEX.md`
2. Update category count in `README.md`
3. Add to relevant `commands/router/domains-*.md` if applicable

---

*Template version: 1.0*
```
