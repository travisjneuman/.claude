# Claude Code Skills Library

Custom skills for Claude Code - reusable across any project.

**Version:** 3.0 (Domain-Named)
**Last Updated:** December 17, 2025

---

## Generic Skills (Use for Any Project)

### Development Skills

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| **generic-code-reviewer** | Multi-stack code review | Before commits, PR reviews |
| **generic-feature-developer** | Architecture patterns | Adding features, planning changes |
| **generic-design-system** | Design tokens & patterns | UI implementation, styling |
| **generic-ux-designer** | UX best practices | Design reviews, user flows |

### Utility Skills

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| **codebase-documenter** | Generate documentation | README, API docs, comments |
| **tech-debt-analyzer** | Code health analysis | Audits, refactoring planning |
| **test-specialist** | Testing guidance | Writing tests, debugging |
| **frontend-enhancer** | Frontend patterns | UI improvements |
| **document-skills** | Office docs (docx, xlsx, pptx, pdf) | Document creation |
| **seo-analytics-auditor** | SEO analysis | Performance audits |

---

## Stack-Specific Skills

These skills provide stack-specific guidance. Use them when working with particular tech stacks.

### generic-static-* (Static HTML/CSS/JS Sites)
- **generic-static-code-reviewer** - Pure HTML/CSS/JS, performance focus
- **generic-static-design-system** - Minimalist design patterns
- **generic-static-feature-developer** - Landing page patterns
- **generic-static-ux-designer** - Lightweight UX constraints

### generic-react-* (React/TypeScript Applications)
- **generic-react-code-reviewer** - React/TypeScript, privacy-first
- **generic-react-design-system** - Dark mode, accessibility focus
- **generic-react-feature-developer** - Local-first architecture
- **generic-react-ux-designer** - Productivity app UX

### generic-fullstack-* (Full-Stack Next.js/NestJS)
- **generic-fullstack-code-reviewer** - Next.js + NestJS, Prisma
- **generic-fullstack-design-system** - Modern theme patterns
- **generic-fullstack-feature-developer** - Full-stack patterns
- **generic-fullstack-ux-designer** - SaaS app UX

---

## How to Use Skills

### Automatic Activation
Skills activate when relevant context appears in conversation.

### Explicit Invocation
Request skills directly:
```
Use generic-code-reviewer to review this code
Use generic-design-system for the color choices
Use tech-debt-analyzer on this codebase
```

### Skill Tool
```
Skill(generic-code-reviewer)
Skill(tech-debt-analyzer)
```

---

## Skill Structure

Each skill follows this structure:

```
skills/
└── [skill-name]/
    ├── SKILL.md          # Main skill file (required)
    ├── references/       # Reference materials (optional)
    ├── assets/           # Templates, examples (optional)
    └── scripts/          # Helper scripts (optional)
```

### SKILL.md Format

```yaml
---
name: skill-name
description: Brief description for when Claude should use this skill
---

# Skill Title

Content with guidance, rules, patterns, examples...
```

---

## Creating New Skills

### 1. Create Folder
```bash
mkdir -p .claude/skills/[skill-name]
```

### 2. Create SKILL.md
- YAML frontmatter with name and description
- Comprehensive content for Claude to follow
- Examples and patterns

### 3. Add References (Optional)
Place in `references/` folder for additional context.

### 4. Test
Verify skill activates when expected context appears.

---

## Skill Categories

### By Tech Stack

| Stack | Recommended Skills |
|-------|-------------------|
| HTML/CSS/JS | generic-*, generic-static-* |
| React/TypeScript | generic-*, generic-react-* |
| Next.js/NestJS | generic-*, generic-fullstack-* |
| Python | generic-code-reviewer, tech-debt-analyzer |
| Any | codebase-documenter, test-specialist |

### Domain Expert Skills

| Domain | Skills |
|--------|--------|
| Business & Strategy | `business-strategy`, `finance` |
| Operations & Technology | `operations`, `security`, `risk-management`, `legal-compliance` |
| People & Leadership | `leadership`, `hr-talent`, `health-wellness` |
| Revenue & Growth | `marketing`, `sales`, `product-management` |
| Innovation & R&D | `innovation`, `rd-management` |
| Data & Analytics | `data-science` |
| Sustainability | `sustainability-esg` |

### By Task Type

| Task | Recommended Skills |
|------|-------------------|
| Code review | generic-code-reviewer, [project]-code-reviewer |
| New feature | generic-feature-developer |
| UI/Styling | generic-design-system |
| UX design | generic-ux-designer |
| Documentation | codebase-documenter |
| Code health | tech-debt-analyzer |
| Testing | test-specialist |
| Documents | document-skills |

---

## Skills vs Other Claude Code Features

| Feature | Use For |
|---------|---------|
| **Skills** | Domain knowledge, guidelines, patterns |
| **Slash Commands** | Quick actions, workflows |
| **Hooks** | Automated responses to events |
| **Subagents** | Complex multi-step tasks |
| **MCP Servers** | External tool integration |

---

## Best Practices

### When to Create a Skill
- Repeated guidance needed
- Project-specific standards
- Complex domain knowledge
- Reusable patterns

### When NOT to Create a Skill
- One-time instructions
- Simple preferences (use CLAUDE.md)
- External tool integration (use MCP)

### Skill Content Tips
- Be comprehensive but focused
- Include concrete examples
- Reference other skills when relevant
- Keep updated as project evolves

---

## See Also

- `.claude/docs/workflow-automation.md` - Workflow automation & checklists
- `.claude/skills/MASTER_INDEX.md` - Skills navigation hub
- `.claude/skills/EXPERT-SKILLS-GUIDE.md` - Domain expert skills guide
- `.claude/commands/` - Custom slash commands
- `.claude/templates/` - Task templates
- `CLAUDE.md` - Project workflow rules

---

## Questions?

- Skills not activating? Check skill name and description match context
- Need new skill? Follow existing patterns in this folder
- Skill conflicts? Review descriptions for proper use cases
