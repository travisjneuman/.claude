---
description: Intelligent task router - analyzes your request and automatically routes to optimal workflow with skills/agents
arguments:
  - name: task_description
    description: "What you want to accomplish. Natural language - just describe it."
    required: false
---

# Start Task - Intelligent Workflow Router

Analyzes ANY prompt and automatically routes to the optimal execution strategy, loading appropriate skills and agents.

**No special keywords required.** Just describe what you want naturally.

---

## Execution Protocol

When this command is invoked, perform these steps IN ORDER:

### Step 0: Apply ULTRATHINK Mode (DEFAULT)

**For ALL non-trivial tasks, apply maximum reasoning depth automatically.**

Detection: If task description contains ANY of these signals, ULTRATHINK is mandatory:
- Architecture/design keywords: "build", "create", "implement", "design", "architect"
- Debug keywords: "debug", "fix", "error", "broken", "not working"
- Review keywords: "review", "check", "audit", "analyze"
- Planning keywords: "plan", "how to", "strategy", "approach"
- Complex indicators: multiple steps, multiple systems, research needed

**Only skip ultrathink for trivial tasks:** typos, single-line fixes, quick lookups.

---

### Step 1: Check for Active GSD Project

```bash
[ -f .planning/STATE.md ] && echo "ACTIVE_GSD_PROJECT"
```

**If active GSD project exists:**
- Invoke `/gsd:progress` to show status and route to next action
- The GSD system handles everything from there

**If no active project, continue to Step 2.**

---

### Step 2: Detect Domain from Task Description

Scan `{{task_description}}` for domain keywords and set the PRIMARY DOMAIN:

| Domain | Detection Keywords |
|--------|-------------------|
| `ios` | ios, swift, swiftui, iphone, ipad, apple, xcode, cocoa, uikit |
| `android` | android, kotlin, jetpack, compose, gradle, material design |
| `react` | react, frontend, component, jsx, tsx, next.js, vite, tailwind |
| `backend` | api, backend, server, endpoint, rest, graphql, nestjs, express |
| `database` | database, db, sql, postgres, mongodb, redis, prisma, schema, query |
| `devops` | deploy, ci/cd, docker, kubernetes, aws, gcp, azure, terraform, pipeline |
| `testing` | test, testing, jest, vitest, pytest, coverage, tdd, unit test, e2e |
| `security` | security, auth, authentication, oauth, jwt, vulnerability, owasp |
| `debugging` | debug, bug, fix, error, crash, issue, broken, not working |
| `performance` | performance, slow, optimize, speed, latency, bottleneck, profil |
| `documentation` | document, docs, readme, comment, explain, jsdoc |
| `code-review` | review, pr, pull request, code quality, check my code |
| `refactoring` | refactor, clean up, improve code, restructure, simplify |
| `architecture` | architecture, design system, pattern, structure, how should I |
| `startup` | startup, launch, mvp, pricing, monetize, business model, validate |
| `creative` | design, brand, visual, color, typography, logo, ui design |
| `video` | video, edit, premiere, final cut, youtube, recording |
| `audio` | audio, podcast, music, sound, mixing, mastering |
| `ai-ml` | ai, ml, machine learning, model, llm, pytorch, tensorflow, openai |
| `i18n` | internationalization, i18n, localization, translate, language, rtl |
| `realtime` | realtime, websocket, live, socket, streaming, sse |
| `graphql` | graphql, schema, resolver, apollo, relay |
| `microservices` | microservice, service mesh, distributed, kafka, rabbitmq |
| `game` | game, unity, unreal, godot, physics, sprite |
| `desktop` | electron, tauri, desktop app, native app, cross-platform |
| `pwa` | pwa, service worker, offline, manifest, progressive |

**Multiple domains detected?** Use the FIRST match as primary, note others as secondary.

---

### Step 3: Load Domain Resources

Based on detected domain, IMMEDIATELY load these resources:

#### Development Domains

| Domain | Skill (invoke) | Agent (Task tool subagent_type) | Also Consider |
|--------|----------------|--------------------------------|---------------|
| `ios` | `Skill(ios-development)` | `ios-developer` | mobile-architect |
| `android` | `Skill(android-development)` | `android-developer` | mobile-architect |
| `react` | `Skill(generic-react-feature-developer)` | `react-expert` | frontend-enhancer |
| `backend` | `Skill(api-design)` | `api-designer` | database-expert |
| `database` | `Skill(database-expert)` | `database-architect` | - |
| `devops` | `Skill(devops-cloud)` | `devops-engineer` | - |
| `testing` | `Skill(test-specialist)` | `test-generator` | tdd-workflow |
| `security` | `Skill(security)` | `security-auditor` | - |
| `debugging` | `Skill(debug-systematic)` | `debugging-specialist` | - |
| `performance` | - | `performance-optimizer` | - |
| `graphql` | `Skill(graphql-expert)` | `graphql-architect` | - |
| `microservices` | `Skill(microservices-architecture)` | `microservices-architect` | - |
| `i18n` | `Skill(i18n-localization)` | `i18n-specialist` | - |
| `realtime` | `Skill(websockets-realtime)` | `realtime-specialist` | - |
| `game` | `Skill(game-development)` | `game-developer` | - |
| `desktop` | `Skill(electron-desktop)` | `desktop-developer` | - |
| `pwa` | `Skill(pwa-development)` | - | - |
| `ai-ml` | `Skill(ai-ml-development)` | `ml-engineer` | - |

#### Quality & Process Domains

| Domain | Skill (invoke) | Agent (Task tool subagent_type) | Marketplace Plugin |
|--------|----------------|--------------------------------|-------------------|
| `code-review` | `Skill(generic-code-reviewer)` | `pr-review-toolkit:code-reviewer` | pr-review-toolkit |
| `refactoring` | - | `refactoring-specialist` | code-simplifier |
| `documentation` | `Skill(codebase-documenter)` | `documentation-writer` | - |
| `architecture` | - | `architecture-analyst` | feature-dev:code-architect |

#### Business & Creative Domains

| Domain | Skill (invoke) | Agent (Task tool subagent_type) |
|--------|----------------|--------------------------------|
| `startup` | `Skill(startup-launch)` | `startup-advisor` |
| `creative` | `Skill(graphic-design)` | `graphic-designer` |
| `video` | `Skill(video-production)` | `video-producer` |
| `audio` | `Skill(audio-production)` | `audio-engineer` |

---

### Step 4: Detect Decision vs Implementation

**If task is about MAKING A DECISION** (contains: "should I", "which", "compare", "choose", "decide", "vs", "or"):

Invoke the appropriate decision framework:

| Decision Type | Keywords | Framework |
|---------------|----------|-----------|
| Root cause | "why", "cause", "reason" | Invoke `/taches-cc-resources:consider/5-whys` |
| Prioritization | "priority", "first", "important", "urgent" | Invoke `/taches-cc-resources:consider/eisenhower-matrix` |
| Technical choice | "which", "vs", "compare", "better" | Invoke `/taches-cc-resources:consider/first-principles` |
| Consequences | "impact", "effect", "result", "if I" | Invoke `/taches-cc-resources:consider/second-order` |
| Simplification | "simplify", "reduce", "essential" | Invoke `/taches-cc-resources:consider/occams-razor` |
| Trade-offs | "trade-off", "pros cons", "swot" | Invoke `/taches-cc-resources:consider/swot` |

**After decision framework, EXIT** - the framework handles the rest.

---

### Step 5: Analyze Task Complexity

Score the task for routing:

| Signal | Points | Examples |
|--------|--------|----------|
| Multiple components/systems | +3 | "API and frontend", "database and UI" |
| Multiple steps implied | +2 | "first... then...", "set up... configure... deploy" |
| New feature/system | +3 | "build", "create", "implement", "add [feature]" |
| Architecture/design work | +2 | "design", "architect", "structure" |
| Cross-cutting concerns | +2 | "refactor", "migrate", "upgrade" |
| Research required | +1 | "figure out", "explore", "investigate options" |
| Bug/issue (singular) | -1 | "fix the bug", "resolve the error" |
| Single file mentioned | -2 | "update README", "fix typo in X" |
| Quick/small qualifier | -2 | "quick", "small", "minor", "simple" |

**Thresholds:**
- **Score >= 3** -> GSD Route
- **Score 1-2** -> Planning Route
- **Score <= 0** -> Direct Route

---

### Step 6: Route Based on Score

#### GSD Route (Score >= 3)

Invoke `/gsd:new-project` with the task description.

The GSD system will:
- Gather context through discussion
- Create PROJECT.md and roadmap
- Break into phases with PLAN.md files
- Track state across sessions

**Skills and agents loaded in Step 3 remain available throughout GSD execution.**

#### Planning Route (Score 1-2)

1. Use `EnterPlanMode` for approval-gated planning
2. Create plan with loaded skills as context
3. Execute with `TodoWrite` tracking
4. Use loaded agents via `Task` tool for specialized work

#### Direct Route (Score <= 0)

1. Execute immediately using loaded skills as guidance
2. Use `TodoWrite` if multiple steps
3. Invoke agent from Step 3 if deep expertise needed

---

### Step 7: Post-Work Automation

**After completing code changes**, PROACTIVELY invoke:

| Trigger | Action |
|---------|--------|
| Code written/modified | `Task` with `pr-review-toolkit:code-reviewer` |
| Complex code added | `Task` with `pr-review-toolkit:code-simplifier` |
| Types/interfaces created | `Task` with `pr-review-toolkit:type-design-analyzer` |
| Error handling added | `Task` with `pr-review-toolkit:silent-failure-hunter` |
| Tests needed | `Task` with `pr-review-toolkit:pr-test-analyzer` |
| Ready to commit | Invoke `/commit-commands:commit` |

---

## Special Cases

### Empty Task Description

If `{{task_description}}` is empty:

1. Check for active GSD project -> `/gsd:progress`
2. Check for existing todos -> `/taches-cc-resources:check-todos`
3. If nothing pending -> Ask user what they want to work on

### Meta/Admin Tasks

| User Says | Route |
|-----------|-------|
| "check status", "where was I" | `/gsd:progress` |
| "what's left", "remaining work" | `/taches-cc-resources:check-todos` |
| "commit", "save my work" | `/commit-commands:commit` |
| "create a PR" | `/commit-commands:commit-push-pr` |

### Exploration Tasks

| User Says | Action |
|-----------|--------|
| "explore the codebase" | `Task` with `feature-dev:code-explorer` |
| "understand how X works" | `Task` with `feature-dev:code-explorer` |
| "find where X is" | `Task` with `Explore` subagent_type |

### Creation Tasks (Claude Code Resources)

| User Says | Route |
|-----------|-------|
| "create a skill" | `/taches-cc-resources:create-agent-skill` |
| "create a hook" | `/taches-cc-resources:create-hook` |
| "create a slash command" | `/taches-cc-resources:create-slash-command` |
| "create an agent" | `/taches-cc-resources:create-subagent` |

---

## Examples

| User Says | Domain | Resources Loaded | Route |
|-----------|--------|-----------------|-------|
| "Build an iOS app with SwiftUI" | ios | `Skill(ios-development)`, `ios-developer` agent | GSD |
| "Fix the login bug" | debugging | `Skill(debug-systematic)`, `debugging-specialist` agent | Direct |
| "Should I use Redux or Zustand?" | react + decision | `Skill(generic-react-feature-developer)` + first-principles | Decision |
| "Review my PR" | code-review | `Skill(generic-code-reviewer)`, `code-reviewer` agent | Direct |
| "Set up CI/CD for my project" | devops | `Skill(devops-cloud)`, `devops-engineer` agent | GSD |
| "Why is the API slow?" | debugging + performance | `Skill(debug-systematic)`, `performance-optimizer` agent | Direct |
| "Design the database schema" | database + architecture | `Skill(database-expert)`, `database-architect` agent | Planning |
| "Add authentication" | security + backend | `Skill(security)`, `security-auditor` agent | GSD |

---

## Resource Reference

### Marketplace Plugins Available

| Plugin | Use For |
|--------|---------|
| `pr-review-toolkit` | Code review, simplification, type analysis, test coverage |
| `feature-dev` | Feature architecture, code exploration |
| `commit-commands` | Git commits, PRs |
| `taches-cc-resources` | Decision frameworks, meta-prompting, debugging |
| `get-shit-done` | Multi-phase project management |

### Local Skills (67)

Full catalog: `~/.claude/skills/MASTER_INDEX.md`

### Local Agents (36)

Full catalog: `~/.claude/agents/README.md`

---

## Core Principle

**Every task gets the right resources automatically.** Domain detection ensures:
- Relevant skills provide guidance
- Specialized agents handle complex work
- Marketplace plugins augment capabilities
- GSD manages multi-phase projects

You just describe what you want. The system loads what's needed.
