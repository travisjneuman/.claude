# Skills System

How to use, create, and customize Claude Code skills.

---

## What Are Skills?

Skills are domain knowledge packages that extend Claude's capabilities. They provide:

- **Guidelines** - How to approach specific tasks
- **Patterns** - Best practices and examples
- **Rules** - Constraints and requirements
- **Context** - Background information

Skills auto-activate based on conversation context or can be explicitly invoked.

---

## Available Skills

### Generic Skills (Any Project)

| Skill | Purpose | Auto-Activates When |
|-------|---------|---------------------|
| `generic-code-reviewer` | Multi-stack code review | Before commits, PR discussions |
| `generic-design-system` | Design tokens & patterns | UI/styling discussions |
| `generic-feature-developer` | Architecture patterns | Adding features |
| `generic-ux-designer` | UX best practices | Design reviews |

### Utility Skills

| Skill | Purpose | Auto-Activates When |
|-------|---------|---------------------|
| `codebase-documenter` | Generate documentation | README, docs discussions |
| `tech-debt-analyzer` | Code health analysis | Audits, refactoring |
| `test-specialist` | Testing guidance | Test writing, debugging |
| `frontend-enhancer` | Frontend patterns | UI improvements |
| `seo-analytics-auditor` | SEO analysis | Performance audits |
| `document-skills` | Office docs (docx, xlsx, pdf) | Document creation |

### Stack-Specific Skills

Skills tailored for specific tech stacks:

| Prefix | Tech Stack | Includes |
|--------|------------|----------|
| `generic-static-*` | HTML/CSS/JS | code-reviewer, design-system, feature-developer, ux-designer |
| `generic-react-*` | React/TypeScript | code-reviewer, design-system, feature-developer, ux-designer |
| `generic-fullstack-*` | Next.js/NestJS/Prisma | code-reviewer, design-system, feature-developer, ux-designer |

### Domain Expert Skills

Task-focused expertise that auto-activates based on context:

| Domain | Skill | When It Activates |
|--------|-------|-------------------|
| Business & Strategy | `business-strategy`, `finance` | Strategy planning, financial modeling |
| Operations | `operations`, `security`, `risk-management` | Process improvement, security reviews |
| People | `leadership`, `hr-talent`, `health-wellness` | Team management, hiring, wellness |
| Revenue | `marketing`, `sales`, `product-management` | Campaigns, sales strategy, roadmaps |
| Innovation | `innovation`, `rd-management` | R&D planning, innovation programs |
| Data | `data-science` | ML, analytics, data strategy |
| Sustainability | `sustainability-esg` | ESG reporting, sustainability |
| Legal | `legal-compliance` | Contracts, compliance, governance |

---

## Using Skills

### Automatic Activation

Skills activate automatically when relevant context appears:

```
User: "Review this code before I commit"
→ generic-code-reviewer activates
```

### Explicit Invocation

Request skills directly in conversation:

```
Use generic-code-reviewer to review this code
Apply generic-design-system to these color choices
Run tech-debt-analyzer on this codebase
```

### Via Skill Tool

```
Skill(generic-code-reviewer)
Skill(tech-debt-analyzer)
```

---

## Creating Skills

### Step 1: Create Folder

```bash
mkdir -p ~/.claude/skills/my-skill-name
```

### Step 2: Create SKILL.md

```markdown
---
name: my-skill-name
description: Brief description of when Claude should use this skill
---

# My Skill Title

## Purpose
What this skill does and when to use it.

## Guidelines
- Guideline 1
- Guideline 2

## Patterns

### Pattern Name
Description and example.

## Examples

### Good Example
```code
example here
```

### Bad Example (Avoid)
```code
what not to do
```
```

### Step 3: Add References (Optional)

```
skills/my-skill-name/
├── SKILL.md
├── references/
│   ├── style-guide.md
│   └── api-docs.md
├── assets/
│   └── template.tsx
└── scripts/
    └── lint.sh
```

### Step 4: Test

Start a conversation that should trigger the skill and verify it activates.

---

## SKILL.md Format

### Required: YAML Frontmatter

```yaml
---
name: skill-name
description: When Claude should use this skill (1-2 sentences)
---
```

The `description` is critical - Claude uses it to decide when to activate the skill.

### Content Structure

Good skills typically include:

1. **Purpose** - What problem this solves
2. **Guidelines** - Rules and principles
3. **Patterns** - Reusable solutions with examples
4. **Anti-patterns** - What to avoid
5. **Checklists** - Step-by-step validation
6. **References** - Links or file references

### Example: Code Review Skill

```markdown
---
name: generic-code-reviewer
description: Multi-stack code review expertise. Use for PR reviews, pre-commit checks, and code quality analysis.
---

# Generic Code Reviewer

## Review Process
1. Read the code first
2. Understand the intent
3. Check for issues
4. Suggest improvements

## What to Check

### Security
- [ ] No hardcoded secrets
- [ ] Input validation
- [ ] SQL injection prevention

### Performance
- [ ] No N+1 queries
- [ ] Efficient algorithms
- [ ] Proper caching

## Feedback Format
Provide feedback as:
- **Critical**: Must fix before merge
- **Important**: Should fix
- **Minor**: Nice to have
```

---

## Customizing for Projects

### Copy and Modify

1. Copy a `generic-*` skill folder
2. Rename to your project: `myproject-code-reviewer`
3. Edit SKILL.md with project-specific:
   - Tech stack details
   - Coding standards
   - File patterns
   - Design system values

### Example Customizations

**For a Python/FastAPI project:**
```markdown
---
name: myapi-code-reviewer
description: Code review for MyAPI FastAPI project
---

## Tech Stack
- Python 3.11
- FastAPI
- SQLAlchemy
- Pydantic

## Patterns
- Use dependency injection
- Type hints required
- Async/await for I/O
```

**For a React project:**
```markdown
---
name: myapp-design-system
description: Design system for MyApp React application
---

## Colors
- Primary: #3B82F6
- Secondary: #10B981
- Background: #1F2937

## Typography
- Font: Inter
- Headings: font-bold
- Body: font-normal
```

---

## Skills vs Other Features

| Feature | Use For | Location |
|---------|---------|----------|
| **Skills** | Domain knowledge, guidelines | `.claude/skills/` |
| **Slash Commands** | Quick actions, workflows | `.claude/commands/` |
| **CLAUDE.md** | Project context, preferences | `./CLAUDE.md` |
| **Subagents** | Complex multi-step tasks | `.claude/agents/` |
| **Hooks** | Automated event responses | `settings.json` |

---

## Best Practices

### Do

- Keep descriptions specific and actionable
- Include concrete examples
- Use checklists for validation
- Reference specific patterns

### Don't

- Make descriptions too vague
- Include outdated information
- Create overlapping skills
- Overload with too much content

### Skill Size Guidelines

| Size | Lines | Use Case |
|------|-------|----------|
| Small | <50 | Single focused concept |
| Medium | 50-200 | Standard skill |
| Large | 200-500 | Comprehensive guide |
| Too Large | >500 | Consider splitting |

---

## Troubleshooting

### Skill Not Activating

1. Check `name` in frontmatter matches folder name
2. Verify `description` contains relevant keywords
3. Try explicit invocation: `Use [skill-name] for this`

### Skill Conflicts

If multiple skills activate unexpectedly:
1. Make descriptions more specific
2. Use different trigger keywords
3. Consider merging related skills

### Testing Skills

Use explicit invocation to test:
```
Use [skill-name] to review this code and tell me what activated
```

---

## See Also

- [../skills/README.md](../skills/README.md) - Skills folder documentation
- [FOLDER-STRUCTURE.md](./FOLDER-STRUCTURE.md) - Where skills live
- [CONFIGURATION.md](./CONFIGURATION.md) - Enabling skills in settings
