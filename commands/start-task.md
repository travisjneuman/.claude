---
description: Universal intelligent router - routes ANY prompt to optimal resources from 15 marketplaces, 69 skills, 37 agents, research, and memory
arguments:
  - name: task_description
    description: "What you want to accomplish. Natural language - just describe it."
    required: false
---

# Start Task - Universal Intelligent Router v2.0

Routes ANY prompt to optimal execution strategy by automatically loading resources from:
- **15 marketplace plugins** (350+ skills, 200+ agents)
- **69 local skills**
- **37 local agents**
- **Research tools** (WebSearch, WebFetch)
- **Persistent memory** (claude-mem)
- **Skill generation** (skill-seekers)
- **125+ scientific skills** (claude-scientific-skills)

**No special keywords required.** Just describe what you want naturally.

---

## Execution Protocol

Perform these steps IN ORDER when invoked:

---

### Step 0: Apply ULTRATHINK Mode (DEFAULT)

**For ALL non-trivial tasks, apply maximum reasoning depth automatically.**

Detection signals (ANY match = ULTRATHINK mandatory):
- Architecture/design: "build", "create", "implement", "design", "architect"
- Debug: "debug", "fix", "error", "broken", "not working"
- Review: "review", "check", "audit", "analyze"
- Planning: "plan", "how to", "strategy", "approach"
- Research: "research", "investigate", "explore", "understand"
- Complex: multiple steps, multiple systems, research needed

**Only skip for trivial tasks:** typos, single-line fixes, quick lookups.

---

### Step 1: Memory Check (claude-mem)

**ALWAYS check persistent memory at session start:**

```
Query claude-mem for context relevant to: {{task_description}}
```

If relevant past context exists:
- Load key decisions, architectural choices, learnings
- Reference in current work
- Note: "Continuing from previous context..."

If no relevant context, proceed normally.

---

### Step 2: Check for Active GSD Project

```bash
[ -f .planning/STATE.md ] && echo "ACTIVE_GSD_PROJECT"
```

**If active GSD project exists:**
- Invoke `/gsd:progress` to show status and route to next action
- GSD system handles everything from there

**If no active project, continue to Step 3.**

---

### Step 3: Detect Domain (Priority Order)

Scan `{{task_description}}` using this PRIORITY ORDER:

1. **Meta/Admin** (highest - specific commands)
2. **Research** (needs current information)
3. **Decision** (frameworks take over)
4. **Scientific** (specialized domain)
5. **Development** (most common)
6. **Business** (expert skills)
7. **Creative** (specialized)
8. **Quality/Process** (cross-cutting)

---

#### 3A. Meta/Admin Detection (HIGHEST PRIORITY)

| User Intent | Keywords | Route Immediately |
|-------------|----------|-------------------|
| Create skill | "create skill", "new skill", "make skill" | `/taches-cc-resources:create-agent-skill` |
| Create hook | "create hook", "new hook", "make hook" | `/taches-cc-resources:create-hook` |
| Create command | "create command", "slash command" | `/taches-cc-resources:create-slash-command` |
| Create agent | "create agent", "new agent" | `/taches-cc-resources:create-subagent` |
| Generate skill from docs | "generate skill from", "skill from docs", "skill from URL" | Use skill-seekers marketplace |
| Commit work | "commit", "save work", "save changes" | `/commit-commands:commit` |
| Create PR | "pull request", "create pr", "push pr" | `/commit-commands:commit-push-pr` |
| Check status | "status", "where was I", "what's left" | `/gsd:progress` |
| Check todos | "remaining", "outstanding", "pending" | `/taches-cc-resources:check-todos` |

**If meta/admin detected, execute and EXIT.**

---

#### 3B. Research Detection

**Trigger WebSearch when ANY of these present:**

| Trigger | Examples |
|---------|----------|
| Current info needed | "current", "latest", "2024", "2025", "today" |
| Best practices query | "what is the best way to", "recommended approach" |
| Technology versions | "React 19", "latest Node", "current LTS" |
| Library discovery | "is there a library for", "package for", "tool for" |
| External docs needed | Documentation for APIs, services, frameworks |
| News/updates | "what's new in", "recent changes", "announced" |

**If research needed:**
1. Use `WebSearch` to gather current information
2. Synthesize findings
3. Continue to domain detection with enriched context

---

#### 3C. Decision Detection

**If task contains decision signals:** "should I", "which", "compare", "choose", "decide", "vs", "or", "better"

| Decision Type | Keywords | Framework |
|---------------|----------|-----------|
| Root cause | "why", "cause", "reason", "happening" | `/taches-cc-resources:consider/5-whys` |
| Prioritization | "priority", "first", "important", "urgent" | `/taches-cc-resources:consider/eisenhower-matrix` |
| Technical choice | "which", "vs", "compare", "better" | `/taches-cc-resources:consider/first-principles` |
| Consequences | "impact", "effect", "result", "if I" | `/taches-cc-resources:consider/second-order` |
| Simplification | "simplify", "reduce", "essential", "minimal" | `/taches-cc-resources:consider/occams-razor` |
| Trade-offs | "trade-off", "pros cons", "swot", "advantages" | `/taches-cc-resources:consider/swot` |

**After decision framework, EXIT.**

---

#### 3D. Scientific Domain Detection

| Domain | Keywords | Resource |
|--------|----------|----------|
| `bioinformatics` | bioinformatics, genomics, dna, rna, sequence, gene, biopython, scanpy, fasta, blast | claude-scientific-skills/* |
| `chemistry` | chemistry, molecule, compound, rdkit, chembl, drug, molecular, reaction, synthesis | claude-scientific-skills/* |
| `proteomics` | protein, proteomic, uniprot, alphafold, amino acid, peptide | claude-scientific-skills/* |
| `clinical` | clinical, trial, patient, clinvar, medical, healthcare, diagnosis, treatment | claude-scientific-skills/* |
| `physics` | physics, quantum, qiskit, simulation, particle, mechanics, relativity | claude-scientific-skills/* |
| `astronomy` | astronomy, astro, astropy, telescope, celestial, planet, star, galaxy | claude-scientific-skills/* |
| `materials` | materials, material science, polymer, alloy, crystallography | claude-scientific-skills/* |
| `lab-automation` | lab, laboratory, protocol, benchling, automation, experiment | claude-scientific-skills/* |

**If scientific domain detected:**
1. Load relevant skills from `claude-scientific-skills` marketplace
2. These are specialized - use their specific protocols
3. May combine with research (WebSearch) for current papers/data

---

#### 3E. Development Domain Detection

| Domain | Keywords | Skill | Agent | Also Consider |
|--------|----------|-------|-------|---------------|
| `ios` | ios, swift, swiftui, iphone, ipad, apple, xcode, cocoa, uikit | `Skill(ios-development)` | `ios-developer` | mobile-architect |
| `android` | android, kotlin, jetpack, compose, gradle, material design | `Skill(android-development)` | `android-developer` | mobile-architect |
| `react` | react, frontend, component, jsx, tsx, next.js, vite, tailwind, shadcn | `Skill(generic-react-feature-developer)` | `react-expert` | frontend-enhancer |
| `backend` | api, backend, server, endpoint, rest, express, nestjs, fastify | `Skill(api-design)` | `api-designer` | database-expert |
| `database` | database, db, sql, postgres, mongodb, redis, prisma, schema, query, migration | `Skill(database-expert)` | `database-architect` | - |
| `devops` | deploy, ci/cd, docker, kubernetes, aws, gcp, azure, terraform, pipeline, github actions | `Skill(devops-cloud)` | `devops-engineer` | - |
| `testing` | test, testing, jest, vitest, pytest, coverage, tdd, unit test, e2e, cypress, playwright | `Skill(test-specialist)` | `test-generator` | - |
| `security` | security, auth, authentication, oauth, jwt, vulnerability, owasp, encryption, ssl | `Skill(security)` | `security-auditor` | - |
| `debugging` | debug, bug, fix, error, crash, issue, broken, not working, failing | `Skill(debug-systematic)` | `debugging-specialist` | - |
| `performance` | performance, slow, optimize, speed, latency, bottleneck, profiling, memory leak | - | `performance-optimizer` | - |
| `graphql` | graphql, schema, resolver, apollo, relay, subscription | `Skill(graphql-expert)` | `graphql-architect` | - |
| `microservices` | microservice, service mesh, distributed, kafka, rabbitmq, event-driven | `Skill(microservices-architecture)` | `microservices-architect` | - |
| `i18n` | internationalization, i18n, localization, translate, language, rtl, locale | `Skill(i18n-localization)` | `i18n-specialist` | - |
| `realtime` | realtime, websocket, live, socket, streaming, sse, pubsub | `Skill(websockets-realtime)` | `realtime-specialist` | - |
| `game` | game, unity, unreal, godot, physics, sprite, 3d, game engine | `Skill(game-development)` | `game-developer` | - |
| `desktop` | electron, tauri, desktop app, native app, cross-platform, menubar | `Skill(electron-desktop)` | `desktop-developer` | - |
| `pwa` | pwa, service worker, offline, manifest, progressive, installable | `Skill(pwa-development)` | - | - |
| `ai-ml` | ai, ml, machine learning, model, llm, pytorch, tensorflow, openai, huggingface | `Skill(ai-ml-development)` | `ml-engineer` | - |
| `flutter` | flutter, dart, widget, material, cupertino | `Skill(flutter-development)` | `mobile-architect` | - |
| `react-native` | react native, expo, metro | `Skill(react-native)` | `mobile-architect` | - |
| `macos` | macos, appkit, catalyst, mac app | `Skill(macos-native)` | `macos-developer` | - |
| `python` | python, pip, poetry, django, flask, fastapi | `Skill(python-expert)` | `python-expert` | Read rules/stacks/python.md |
| `typescript` | typescript, types, generics, strict, inference | `Skill(typescript-expert)` | `typescript-expert` | Read rules/stacks/react-typescript.md |

---

#### 3F. Business Domain Detection

| Domain | Keywords | Skill | Agent |
|--------|----------|-------|-------|
| `startup` | startup, launch, mvp, validate, pivot, founder | `Skill(startup-launch)` | `startup-advisor` |
| `finance` | finance, financial, valuation, dcf, lbo, investment, roi, budget | `Skill(finance)` | - |
| `marketing` | marketing, campaign, brand awareness, seo, analytics, funnel, growth | `Skill(marketing)` | - |
| `sales` | sales, pipeline, crm, revenue, deals, quota, forecast | `Skill(sales)` | - |
| `product` | product, roadmap, prioritization, backlog, feature, user story, prd | `Skill(product-management)` | - |
| `strategy` | strategy, competitive, market analysis, swot, positioning | `Skill(business-strategy)` | - |
| `operations` | operations, supply chain, logistics, process, efficiency | `Skill(operations)` | - |
| `hr` | hr, hiring, talent, recruiting, culture, onboarding, retention | `Skill(hr-talent)` | - |
| `leadership` | leadership, management, team, org, 1:1, feedback, delegation | `Skill(leadership)` | - |
| `legal` | legal, compliance, gdpr, privacy, terms, contract, ip | `Skill(legal-compliance)` | - |
| `risk` | risk, mitigation, contingency, insurance, audit | `Skill(risk-management)` | - |
| `innovation` | innovation, r&d, patents, ideation, disruption | `Skill(innovation)` | - |
| `sustainability` | sustainability, esg, environmental, carbon, green | `Skill(sustainability-esg)` | - |
| `monetization` | pricing, monetization, revenue model, saas, subscription, freemium | `Skill(monetization-strategy)` | `monetization-expert` |
| `health` | wellness, health, employee, ergonomic, mental health | `Skill(health-wellness)` | - |
| `rd` | r&d, research, development, experiment | `Skill(rd-management)` | - |

---

#### 3G. Creative Domain Detection

| Domain | Keywords | Skill | Agent |
|--------|----------|-------|-------|
| `graphic-design` | design, visual, color, typography, layout, logo, illustration | `Skill(graphic-design)` | `graphic-designer` |
| `video` | video, edit, premiere, final cut, youtube, recording, footage | `Skill(video-production)` | `video-producer` |
| `audio` | audio, podcast, music, sound, mixing, mastering, recording | `Skill(audio-production)` | `audio-engineer` |
| `brand` | brand, identity, positioning, guidelines, brand voice | `Skill(brand-identity)` | `brand-strategist` |
| `motion` | animation, motion, micro-interaction, easing, transition, lottie | `Skill(ui-animation)` | `motion-designer` |
| `ui` | ui, user interface, component, layout, design system | `Skill(ui-research)` + `Skill(frontend-enhancer)` | - |

---

#### 3H. Quality & Process Detection

| Domain | Keywords | Skill | Marketplace Agent |
|--------|----------|-------|-------------------|
| `code-review` | review, pr, pull request, code quality, check my code | `Skill(generic-code-reviewer)` | `pr-review-toolkit:code-reviewer` |
| `refactoring` | refactor, clean up, simplify, improve code, restructure | - | `pr-review-toolkit:code-simplifier` |
| `documentation` | document, docs, readme, jsdoc, comment, explain code | `Skill(codebase-documenter)` | `documentation-writer` |
| `architecture` | architecture, pattern, structure, design system, how should I organize | - | `feature-dev:code-architect` |
| `tech-debt` | tech debt, legacy, cleanup, deprecate, upgrade | `Skill(tech-debt-analyzer)` | - |
| `accessibility` | accessibility, a11y, wcag, screen reader, aria | - | `accessibility-expert` |

---

#### 3I. Exploration Detection

| User Intent | Keywords | Action |
|-------------|----------|--------|
| Understand codebase | "explore codebase", "understand how", "how does X work" | `Task` with `feature-dev:code-explorer` |
| Find location | "find where", "locate", "which file" | `Task` with `Explore` subagent_type |
| Learn concept | "learn about", "explain", "teach me" | WebSearch + relevant Skill |

---

### Step 4: Load Domain Resources

Based on detected domain(s), IMMEDIATELY load:

1. **Skill** - `Skill(skill-name)` for domain expertise
2. **Agent** - Available via `Task` tool with `subagent_type`
3. **Contextual rules** - Read relevant files from `~/.claude/rules/`

**Multiple domains?** Load primary first, note secondary for use during execution.

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
| Scientific/specialized | +2 | Any scientific domain |
| Bug/issue (singular) | -1 | "fix the bug", "resolve the error" |
| Single file mentioned | -2 | "update README", "fix typo in X" |
| Quick/small qualifier | -2 | "quick", "small", "minor", "simple" |

**Thresholds:**
- **Score >= 3** -> GSD Route (multi-phase project)
- **Score 1-2** -> Planning Route (needs approval)
- **Score <= 0** -> Direct Route (execute immediately)

---

### Step 6: Route Based on Score

#### GSD Route (Score >= 3)

Invoke `/gsd:new-project` with the task description.

The GSD system will:
- Gather context through discussion
- Create PROJECT.md and roadmap
- Break into phases with PLAN.md files
- Track state across sessions

**Loaded skills and agents remain available throughout GSD execution.**

#### Planning Route (Score 1-2)

1. Use `EnterPlanMode` for approval-gated planning
2. Create plan with loaded skills as context
3. Execute with `TodoWrite` tracking
4. Use loaded agents via `Task` tool

#### Direct Route (Score <= 0)

1. Execute immediately using loaded skills as guidance
2. Use `TodoWrite` if multiple steps
3. Invoke agent from domain detection if deep expertise needed

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
| Ready to commit | `/commit-commands:commit` |

---

### Step 8: Memory Save (claude-mem)

**After completing SIGNIFICANT work, save to persistent memory:**

| What to Save | When |
|--------------|------|
| Key decisions made | Architecture choices, library selections |
| Patterns established | Code patterns, naming conventions |
| Important learnings | Gotchas, workarounds, discoveries |
| Project context | Current state, next steps |

This enables context continuity across sessions.

---

## Empty Task Description Handler

If `{{task_description}}` is empty:

1. Check for active GSD project -> `/gsd:progress`
2. Query claude-mem for recent context -> Resume if found
3. Check for existing todos -> `/taches-cc-resources:check-todos`
4. If nothing pending -> Ask user what they want to work on

---

## Resource Reference

### Marketplace Plugins (15)

| Marketplace | Key Capabilities |
|-------------|------------------|
| `anthropic-agent-skills` | Document skills, examples |
| `awesome-claude-skills` | 27 skills: canvas, forensics, invoices |
| `claude-code-plugins` | PR review, commits, feature dev |
| `claude-code-plugins-plus-skills` | 258 plugins, 185 skills |
| `claude-plugins-official` | External plugins |
| `get-shit-done` | GSD project management |
| `mhattingpete-skills` | Git, testing, code review |
| `obra-superpowers` | /brainstorm, /write-plan |
| `skillsforge` | 29 curated skills |
| `taches-cc-resources` | Decision frameworks, meta-prompting |
| `voltagent-subagents` | 100+ specialized agents |
| `wshobson-agents` | 99 agents, 107 skills |
| `claude-mem` | Persistent memory, semantic search |
| `skill-seekers` | Auto-generate skills from docs |
| `claude-scientific-skills` | 125+ scientific skills |

### Local Resources

- **69 local skills** - Full catalog: `~/.claude/skills/MASTER_INDEX.md`
- **37 local agents** - Full catalog: `~/.claude/agents/README.md`

### Built-in Tools

| Tool | Use For |
|------|---------|
| `WebSearch` | Current information, documentation lookup |
| `WebFetch` | Specific URL content retrieval |
| `Task` | Spawn specialized agents |
| `TodoWrite` | Track multi-step progress |
| `EnterPlanMode` | Approval-gated planning |

---

## Examples

| User Says | Detection | Resources | Route |
|-----------|-----------|-----------|-------|
| "Analyze this protein sequence" | scientific/proteomics | claude-scientific-skills | Direct |
| "Build an iOS app with SwiftUI" | development/ios | ios-development skill, ios-developer agent | GSD |
| "What's new in React 19?" | research + development/react | WebSearch + react skill | Direct |
| "Create a pricing strategy" | business/monetization | monetization-strategy skill | Planning |
| "Design a microservices architecture" | development/microservices + architecture | microservices skill, code-architect agent | GSD |
| "Create a skill for my workflow" | meta/create-skill | /taches-cc-resources:create-agent-skill | Immediate |
| "Should I use Redux or Zustand?" | decision/choice + react | first-principles framework + react skill | Decision |
| "Fix the login bug" | development/debugging | debug-systematic skill, debugging-specialist agent | Direct |
| "Why is the API slow?" | decision/root-cause + performance | 5-whys framework + performance-optimizer agent | Decision |
| "Generate a skill from the Stripe docs" | meta/generate-skill | skill-seekers marketplace | Immediate |

---

## Core Principle

**Every prompt gets the right resources automatically.**

The router ensures:
- Relevant skills provide domain expertise
- Specialized agents handle complex work
- Marketplace plugins augment capabilities
- Research tools provide current information
- Memory maintains context across sessions
- GSD manages multi-phase projects
- Scientific skills handle specialized domains
- Decision frameworks structure choices

You just describe what you want. The system loads what's needed.

---

## Version History

- v2.0: Universal router with 15 marketplaces, memory, research, scientific domains
- v1.0: Original domain detection and routing
