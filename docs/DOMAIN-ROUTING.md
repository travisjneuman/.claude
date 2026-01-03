# Domain Routing: How /start-task Works

Understanding how your prompts get routed to the right resources.

**Last Updated:** January 2026 (v2.0)

---

## Overview

When you use `/start-task` (or just type naturally), the Universal Router:

1. **Detects domains** from your description
2. **Loads resources** (skills, agents, rules)
3. **Determines workflow** (GSD vs Planning vs Direct)
4. **Executes** with optimal tooling

---

## Domain Categories

The router recognizes 8 major domain categories:

### 1. Meta/Admin (Highest Priority)
Creating Claude Code resources, status checks, exploration.

| Keywords | Action |
|----------|--------|
| "create skill", "create hook" | Load skill creation tools |
| "commit", "push", "PR" | Git workflow |
| "where was I", "status" | Resume/context check |
| "explore codebase" | Launch Explore agent |

### 2. Decision
Structured decision-making frameworks.

| Keywords | Framework |
|----------|-----------|
| "should I", "vs", "or" | First-principles analysis |
| "which is better" | Trade-off comparison |
| "prioritize", "urgent" | Eisenhower matrix |
| "why", "root cause" | 5-Whys analysis |

### 3. Research
Current information, documentation, best practices.

| Triggers | Action |
|----------|--------|
| "latest", "2025", "current" | WebSearch |
| "best way to", "recommended" | WebSearch + skills |
| Version queries ("React 19") | WebSearch |
| "is there a library for" | WebSearch |

### 4. Development (23 domains)
Software development across all platforms.

| Sub-domain | Skills/Agents |
|------------|---------------|
| iOS/Android | ios-development, android-development |
| React/Vue/Svelte | Framework-specific skills |
| Backend/API | api-design, database-expert |
| DevOps | devops-cloud, devops-specialist |
| Testing | test-specialist, test-generator |
| Security | security-auditor, security skill |
| GraphQL | graphql-expert, graphql-architect |
| Microservices | microservices-architect |
| Desktop | electron-desktop, desktop-developer |
| AI/ML | ai-ml-development, ml-engineer |

### 5. Scientific (8 domains)
Scientific computing and research.

| Domain | Source |
|--------|--------|
| Bioinformatics | claude-scientific-skills |
| Chemistry | claude-scientific-skills |
| Proteomics | claude-scientific-skills |
| Clinical | claude-scientific-skills |
| Physics | claude-scientific-skills |
| Astronomy | claude-scientific-skills |
| Materials Science | claude-scientific-skills |
| Lab Automation | claude-scientific-skills |

### 6. Business (16 domains)
Strategy, operations, and business functions.

| Domain | Skills |
|--------|--------|
| Startup | startup-advisor |
| Finance | finance skill |
| Marketing | marketing skills |
| Sales | sales skills |
| Product | product skills |
| HR/Talent | hr-talent |
| Operations | operations skills |
| Monetization | monetization-strategy |

### 7. Creative (6 domains)
Design, media, and creative work.

| Domain | Skills/Agents |
|--------|---------------|
| Graphic Design | graphic-design, graphic-designer |
| Video | video-producer |
| Audio | audio-production, audio-engineer |
| Branding | brand-identity, brand-strategist |
| Motion | motion-designer |
| UI/UX | generic-ux-designer, ui-research |

### 8. Quality/Process
Code quality and development process.

| Domain | Skills/Agents |
|--------|---------------|
| Code Review | generic-code-reviewer, deep-code-reviewer |
| Debugging | debug-like-expert, debugging-specialist |
| Refactoring | refactoring-specialist |
| Performance | performance-optimizer |
| Architecture | architecture-analyst |

---

## Complexity Scoring

The router calculates complexity to determine workflow:

| Factor | Points |
|--------|--------|
| Multiple components/files | +1 |
| Unknown codebase area | +1 |
| Architecture decisions | +1 |
| External integrations | +1 |
| Multi-phase work | +1 |
| Clear, simple task | -1 |

### Route Selection

| Score | Workflow |
|-------|----------|
| >= 3 | GSD (multi-phase project) |
| 1-2 | EnterPlanMode (planning first) |
| <= 0 | Direct execution |

---

## Resource Loading

When a domain is detected, the router loads:

### 1. Skills
Domain expertise that guides responses.
```
Detected: iOS development
Loads: Skill(ios-development)
```

### 2. Agents
Specialized deep work via Task tool.
```
Detected: Security concern
Available: security-auditor agent
```

### 3. Rules
Contextual checklists and guidelines.
```
Detected: UI changes
Loads: rules/checklists/ui-visual-changes.md
```

### 4. Research
Current information via WebSearch.
```
Detected: "React 19 features"
Action: WebSearch automatically triggered
```

---

## Examples

### Example 1: Simple Bug Fix
```
User: Fix the null check in user.ts line 42

Detected: Development/general
Complexity: 0 (specific file, clear task)
Workflow: Direct execution
Resources: None needed (simple fix)
```

### Example 2: New Feature
```
User: Add user notifications with email and push

Detected: Development/backend + development/mobile
Complexity: 3 (multiple components, integration)
Workflow: GSD
Resources: api-design skill, notification patterns
```

### Example 3: Decision
```
User: Should I use PostgreSQL or MongoDB for this?

Detected: Decision + database
Complexity: N/A (decision mode)
Workflow: First-principles framework
Resources: database-expert skill
```

### Example 4: Research + Development
```
User: What's new in Next.js 15 and how do I upgrade?

Detected: Research trigger + development/react
Complexity: 2
Workflow: EnterPlanMode after research
Resources: WebSearch, react-expert skill
```

### Example 5: Scientific
```
User: Analyze this protein sequence for mutations

Detected: Scientific/proteomics
Complexity: 1
Workflow: Direct execution
Resources: claude-scientific-skills
```

---

## Router Files

The router configuration lives in:

```
commands/router/
├── domains-development.md   # 23 development domains
├── domains-scientific.md    # 8 scientific domains
├── domains-business.md      # 16 business domains
├── domains-creative.md      # 6 creative domains
├── domains-meta.md          # Admin tasks, exploration
├── decision-frameworks.md   # 6 decision frameworks
└── routing-logic.md         # Complexity scoring
```

---

## Customizing Detection

To add new domain detection:

1. **Add keywords** to relevant `domains-*.md` file
2. **Map to skills/agents** in the domain file
3. **Test with** `/start-task [your keyword]`

---

## Bypassing the Router

You can always bypass routing:

```
# Direct skill invocation
Skill(ios-development)

# Direct agent spawning
"Use the security-auditor agent to..."

# Direct research
"Search for latest React patterns"

# Direct execution
"Just implement this function..."
```

---

## Related Documentation

- `CLAUDE.md` - Workflow overview
- `README.md` - Full toolkit capabilities
- `skills/README.md` - Available skills
- `agents/README.md` - Available agents

---

*The router optimizes resource loading. You control the execution.*
