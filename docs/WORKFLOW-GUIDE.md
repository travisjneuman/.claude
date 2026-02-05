---
name: Workflow Guide
description: Development patterns, task management, context hygiene, and multi-session coordination strategies.
category: workflow
---

# Workflow Guide

Detailed patterns for getting work done with Claude Code.

**Last Updated:** February 2026 (v2.3.3)

**Quick Start:** Just describe what you want. Skills auto-activate via SessionStart hook. Use `/start-task` for complex work.

**New in v2.1:** SessionStart hook for automatic skill/agent routing on every prompt. See [CHANGELOG.md](../CHANGELOG.md#210---january-13-2026).

**v2.0 features:** Research methodology, frontend aesthetics, PROACTIVE mode, multi-window state management. See [CHANGELOG.md](../CHANGELOG.md#200---january-3-2026).

---

## Prompt Types: Standard vs /start-task

**Both leverage the full skill ecosystem.** Choose based on complexity.

### Standard Prompts (Just Type Naturally)

```
"Build a login form with validation"
"Fix the API timeout issue"
"Review my authentication code"
```

**What Happens:**

1. CLAUDE.md context loads (always)
2. Skills auto-activate based on description matching
3. Relevant domain skills load progressively
4. Direct execution with loaded skills as guidance

**Best For:**

- Single-focus tasks
- Quick fixes and bug fixes
- When you know exactly what you want
- Tasks with clear scope

### /start-task (Intelligent Routing)

```
/start-task Build an iOS app with SwiftUI
/start-task Set up CI/CD with testing and deployment
```

**What Happens:**

1. All of the above, PLUS:
2. Complexity scoring (determines GSD vs Planning vs Direct)
3. Domain-specific resource loading from router files
4. GSD project detection and auto-routing
5. Decision framework invocation (if "should I", "vs", etc.)
6. Post-work automation triggers

**Best For:**

- Multi-phase projects (auto-routes to GSD)
- When unsure about approach (decision frameworks)
- Complex tasks spanning multiple systems
- When you want explicit complexity analysis

### Quick Decision Guide

| Scenario                              | Use                                         |
| ------------------------------------- | ------------------------------------------- |
| "Fix the typo in header.tsx"          | Standard prompt                             |
| "Build a new feature with API and UI" | `/start-task`                               |
| "Should I use Redux or Zustand?"      | `/start-task` (triggers decision framework) |
| "Debug why tests are failing"         | Standard prompt (skill auto-activates)      |
| "Create a full authentication system" | `/start-task` (routes to GSD)               |
| "Update the README"                   | Standard prompt                             |

---

## Always Available Capabilities

These can be used **anytime**, regardless of workflow stage or GSD phase:

| Capability              | When to Use                                  | How to Invoke                   |
| ----------------------- | -------------------------------------------- | ------------------------------- |
| **WebSearch**           | Current info, docs, best practices, versions | Use tool directly               |
| **Skills**              | Domain expertise needed                      | `Skill(name)` or auto-activates |
| **Agents**              | Deep specialized work                        | `Task` tool with subagent       |
| **Research**            | Explore codebase, find patterns              | `Task` with Explore agent       |
| **Decision Frameworks** | Complex choices, trade-offs                  | `/consider:first-principles`    |
| **TodoWrite**           | Track multi-step progress                    | Use tool directly               |
| **Auto-Claude**         | Autonomous feature implementation            | `/auto-claude [description]`    |

**Philosophy:** GSD provides _structure_, not _gates_. Use every tool that helps.

---

## Proactive Resource Discovery

**Before starting specialized work**, automatically search for relevant resources:

### Discovery Order

1. **Local Skills First**
   - Check `~/.claude/skills/` for domain skills
   - Full catalog: `~/.claude/skills/MASTER_INDEX.md`

2. **Marketplace Skills**
   - Search `~/.claude/plugins/marketplaces/*/` for specialized skills
   - See [MARKETPLACE-GUIDE.md](./MARKETPLACE-GUIDE.md) for details

   | Domain             | Marketplace                                   |
   | ------------------ | --------------------------------------------- |
   | Scientific work    | `claude-scientific-skills/scientific-skills/` |
   | Full-stack dev     | `wshobson-agents/`, `voltagent-subagents/`    |
   | Documents/invoices | `awesome-claude-skills/`                      |
   | Meta-prompting     | `taches-cc-resources/`                        |

3. **WebSearch**
   - Current best practices
   - Latest documentation
   - Version-specific info

4. **skillsmp.com**
   - Use `/discover-skills <query>` for 35,530+ community skills

### Trigger Discovery When

- Task involves unfamiliar domain (bioinformatics, game dev, etc.)
- Looking for specialized patterns or templates
- Need domain-specific best practices
- Standard approaches seem insufficient

**Discovery is NOT optional.** Proactively search before implementing specialized work.

---

## GSD + Tools Integration

**GSD provides structure. Tools provide capabilities.** Use them together:

| Within GSD Phase | Still Use                                                    |
| ---------------- | ------------------------------------------------------------ |
| **Planning**     | WebSearch for research, Explore agent for codebase discovery |
| **Execution**    | Skills for domain expertise, agents for specialized work     |
| **Any phase**    | TodoWrite for tracking, Decision frameworks for choices      |

**Key principle:** If a tool, skill, agent, or research would help accomplish the current phase's goals, **use it immediately**. Don't wait for a specific GSD command.

See [GSD-TUTORIAL.md](./GSD-TUTORIAL.md) for complete GSD documentation.

---

## Three Implementation Approaches

When `/start-task` detects a development task, you have three workflow options:

### 1. Manual Implementation (Traditional)

**Process:**

```
/start-task Add user authentication
→ EnterPlanMode (if complex)
→ You + Claude work step-by-step
→ Review each change before applying
→ Manual testing and verification
```

**Best For:**

- Learning new concepts
- Exploratory work
- Unclear requirements
- Maximum control preferred

**Characteristics:**

- Step-by-step with your input
- Review after each change
- Main branch (no isolation)
- Manual QA

---

### 2. Autonomous Implementation (Auto-Claude)

**Process:**

```
/auto-claude Add user authentication
→ Analyzes codebase automatically
→ Generates implementation spec
→ Creates isolated git worktree
→ Multi-agent autonomous implementation
→ QA validation loops
→ Returns completed code for review
```

**Best For:**

- Well-defined features (complexity 3-4)
- Established codebases with clear patterns
- Repetitive tasks (CRUD, forms, API endpoints)
- When you prefer review-at-end vs step-by-step

**Characteristics:**

- Autonomous multi-agent execution
- Review at end (full worktree)
- Git worktree isolation
- Automatic QA validation

**How to Invoke:**

- Direct: `/auto-claude [description]`
- Via router: `/start-task` auto-suggests when complexity >= 3

**See:** [AUTO-CLAUDE-GUIDE.md](./AUTO-CLAUDE-GUIDE.md) for complete documentation

---

### 3. Multi-Phase Projects (GSD)

**Process:**

```
/start-task Build complete e-commerce platform
→ Complexity score: 5+ (high)
→ Routes to GSD automatically
→ Creates .planning/STATE.md
→ Breaks into phases
→ Tracks progress across sessions
```

**Best For:**

- Large projects (complexity 5+)
- Multi-phase work
- Long-term development
- Needs project management

**Characteristics:**

- Phased approach with milestones
- Persistent state (.planning/)
- Multi-session support
- Manual or Auto-Claude per phase

**See:** [GSD-TUTORIAL.md](./GSD-TUTORIAL.md) for complete documentation

---

### Workflow Comparison

| Aspect         | Manual                | Auto-Claude      | GSD            |
| -------------- | --------------------- | ---------------- | -------------- |
| **Complexity** | 1-2                   | 3-4              | 5+             |
| **Control**    | Maximum               | Medium           | Structured     |
| **Speed**      | Slower                | Faster           | Phased         |
| **Review**     | Each step             | End              | Per phase      |
| **Isolation**  | Main branch           | Git worktree     | .planning/     |
| **Best for**   | Learning, exploration | Defined features | Large projects |

**Combining workflows:**

- Use Manual for research → Auto-Claude for implementation
- Use GSD phases → Auto-Claude for individual features within phases
- Switch between approaches as needs change

---

## Complexity Routing

The `/start-task` command scores complexity to determine workflow:

| Factor                    | Points |
| ------------------------- | ------ |
| Multiple components/files | +1     |
| Unknown codebase area     | +1     |
| Architecture decisions    | +1     |
| External integrations     | +1     |
| Multi-phase work          | +1     |
| Clear, simple task        | -1     |

### Route Selection

| Score | Workflow                       |
| ----- | ------------------------------ |
| >= 5  | GSD (multi-phase project)      |
| 3-4   | Auto-Claude or EnterPlanMode   |
| 1-2   | EnterPlanMode (planning first) |
| <= 0  | Direct execution               |

---

## Decision Frameworks

When facing choices, use structured frameworks:

| Framework         | When to Use                       | Command                       |
| ----------------- | --------------------------------- | ----------------------------- |
| First-Principles  | Technical decisions, architecture | `/consider:first-principles`  |
| Eisenhower Matrix | Prioritization, urgency           | `/consider:eisenhower-matrix` |
| 5-Whys            | Root cause analysis               | `/consider:5-whys`            |
| SWOT              | Trade-off and strategic analysis  | `/consider:swot`              |
| Opportunity Cost  | Analyze what you give up          | `/consider:opportunity-cost`  |

---

## Automation Hooks

The toolkit includes PostToolUse hooks that automate formatting:

| Hook                    | Trigger             | Action                            |
| ----------------------- | ------------------- | --------------------------------- |
| **PostToolUse (Write)** | After file creation | Auto-runs Prettier for formatting |
| **PostToolUse (Edit)**  | After file edit     | Auto-runs Prettier for formatting |

### Hook Configuration

Hooks are configured in `~/.claude/settings.json` under the `hooks` key.

**Note:** Other lifecycle hooks (SessionStart, Stop, PreToolUse, etc.) were removed in v1.4.3 for Windows compatibility. The logging hooks provided minimal value and used Unix-specific syntax incompatible with PowerShell/CMD. See [CHANGELOG.md](../CHANGELOG.md) for details.

---

## Project Initialization

When starting a new project, set up your CLAUDE.md with the toolkit's project initialization:

| Scenario                          | Command                                                 |
| --------------------------------- | ------------------------------------------------------- |
| New project (your code)           | `/init-project` → auto-detects stack, creates CLAUDE.md |
| External/OSS codebase             | `/init` (Claude's) → `/standardize-claude-md`           |
| Existing project missing sections | `/standardize-claude-md` → adds toolkit sections        |

This ensures every project has proper integration with `~/.claude/` including Related Global Rules and Quick Start sections.

---

## Related Documentation

- [GSD-TUTORIAL.md](./GSD-TUTORIAL.md) - Multi-phase project management
- [DOMAIN-ROUTING.md](./DOMAIN-ROUTING.md) - How /start-task routes work
- [MARKETPLACE-GUIDE.md](./MARKETPLACE-GUIDE.md) - Marketplace resources
- [../CLAUDE.md](../CLAUDE.md) - Core rules and guardrails
- [../rules/tooling/git-hooks-setup.md](../rules/tooling/git-hooks-setup.md) - Git hooks setup
- [../templates/project-CLAUDE.md](../templates/project-CLAUDE.md) - Project CLAUDE.md template

---

_The workflow adapts to your task. Simple tasks execute directly. Complex tasks get structure._
