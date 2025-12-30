# Workflow Guide

Detailed patterns for getting work done with Claude Code.

**Last Updated:** December 2025

**Quick Start:** Just describe what you want. Skills auto-activate. Use `/start-task` for complex work.

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

| Scenario | Use |
|----------|-----|
| "Fix the typo in header.tsx" | Standard prompt |
| "Build a new feature with API and UI" | `/start-task` |
| "Should I use Redux or Zustand?" | `/start-task` (triggers decision framework) |
| "Debug why tests are failing" | Standard prompt (skill auto-activates) |
| "Create a full authentication system" | `/start-task` (routes to GSD) |
| "Update the README" | Standard prompt |

---

## Always Available Capabilities

These can be used **anytime**, regardless of workflow stage or GSD phase:

| Capability | When to Use | How to Invoke |
|------------|-------------|---------------|
| **WebSearch** | Current info, docs, best practices, versions | Use tool directly |
| **Skills** | Domain expertise needed | `Skill(name)` or auto-activates |
| **Agents** | Deep specialized work | `Task` tool with subagent |
| **Research** | Explore codebase, find patterns | `Task` with Explore agent |
| **Decision Frameworks** | Complex choices, trade-offs | `/consider:first-principles` |
| **TodoWrite** | Track multi-step progress | Use tool directly |

**Philosophy:** GSD provides *structure*, not *gates*. Use every tool that helps.

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

   | Domain | Marketplace |
   |--------|-------------|
   | Scientific work | `claude-scientific-skills/scientific-skills/` |
   | Full-stack dev | `wshobson-agents/`, `voltagent-subagents/` |
   | Documents/invoices | `awesome-claude-skills/` |
   | Meta-prompting | `taches-cc-resources/` |

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

| Within GSD Phase | Still Use |
|------------------|-----------|
| **Planning** | WebSearch for research, Explore agent for codebase discovery |
| **Execution** | Skills for domain expertise, agents for specialized work |
| **Any phase** | TodoWrite for tracking, Decision frameworks for choices |

**Key principle:** If a tool, skill, agent, or research would help accomplish the current phase's goals, **use it immediately**. Don't wait for a specific GSD command.

See [GSD-TUTORIAL.md](./GSD-TUTORIAL.md) for complete GSD documentation.

---

## Complexity Routing

The `/start-task` command scores complexity to determine workflow:

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

## Decision Frameworks

When facing choices, use structured frameworks:

| Framework | When to Use | Command |
|-----------|-------------|---------|
| First-Principles | Technical decisions, architecture | `/consider:first-principles` |
| Eisenhower Matrix | Prioritization, urgency | `/consider:eisenhower-matrix` |
| 5-Whys | Root cause analysis | `/consider:5-whys` |
| Pros/Cons | Trade-off evaluation | `/consider:pros-cons` |
| SWOT | Strategic analysis | `/consider:swot` |
| Decision Matrix | Multi-criteria decisions | `/consider:decision-matrix` |

---

## Automation Hooks

The toolkit includes lifecycle hooks that automate common tasks:

| Hook | Trigger | Action |
|------|---------|--------|
| **SessionStart** | New session begins | Displays toolkit status (71 skills, 36 agents, 21 marketplaces) |
| **Stop** | Claude awaits input | Windows toast notification |
| **PreToolUse** | Before Bash execution | Blocks dangerous commands (rm -rf /, format c:, etc.) |
| **PostToolUse** | After Write/Edit | Auto-runs Prettier for formatting |
| **Notification** | System notifications | Logs to ~/.claude/.session-log |

### Hook Configuration

Hooks are configured in `~/.claude/settings.json` under the `hooks` key. No Python required - all hooks use bash.

---

## Project Initialization

When starting a new project, set up your CLAUDE.md with the toolkit's project initialization:

| Scenario | Command |
|----------|---------|
| New project (your code) | `/init-project` → auto-detects stack, creates CLAUDE.md |
| External/OSS codebase | `/init` (Claude's) → `/standardize-claude-md` |
| Existing project missing sections | `/standardize-claude-md` → adds toolkit sections |

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

*The workflow adapts to your task. Simple tasks execute directly. Complex tasks get structure.*
