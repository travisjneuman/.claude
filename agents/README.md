# Claude Code Subagents

Specialized AI agents for focused, expert-level assistance across all domains.

**59 agents available** - Covering code quality, development, architecture, languages, platforms, creative, product & strategy, SaaS, and infrastructure.

---

## Parallel Execution Capabilities

| Capability            | Limit                                              |
| --------------------- | -------------------------------------------------- |
| **Concurrent agents** | Up to 10 simultaneous                              |
| **Context per agent** | Independent (up to 1M tokens with Opus 4.6)        |
| **Nesting**           | Single-level only (agents cannot spawn sub-agents) |
| **Overhead**          | ~20k tokens per Task tool invocation               |

### Parallel Execution Pattern

```
Main Claude (Orchestrator)
├── Task(code-reviewer)     ─┐
├── Task(test-generator)     │ Run simultaneously
├── Task(security-auditor)  ─┘
└── Collect results when all complete
```

### When to Use Parallel Agents

- **Code review + test generation** - Run code-reviewer and test-generator in parallel
- **Multi-platform builds** - Run ios-developer and android-developer simultaneously
- **Comprehensive audits** - Run security-auditor, performance-optimizer, and accessibility-expert together
- **Documentation blitz** - Run documentation-writer on multiple modules

---

## Agent Teams

Agent Teams coordinate multiple full Claude Code sessions working in parallel, each with its own context window and inter-agent messaging. Unlike subagents (Task tool), teammates communicate directly with each other and persist independently.

| Approach        | Context    | Communication               | Token Cost | Best For                           |
| --------------- | ---------- | --------------------------- | ---------- | ---------------------------------- |
| **Subagents**   | Own window | One-way (to caller)         | Low-Medium | Focused tasks, parallel search     |
| **Agent Teams** | Own window | Two-way (between teammates) | High       | Research, review, cross-layer work |

Use `/assemble-team` to quickly spawn a pre-built team, or describe the composition in natural language.

See `~/.claude/docs/AGENT-TEAMS.md` for the full guide and `~/.claude/rules/workflows/agent-teams.md` for the decision framework.

---

## Available Agents

### Code Quality

| Agent                    | Purpose                                    | Model  |
| ------------------------ | ------------------------------------------ | ------ |
| `deep-code-reviewer`     | Comprehensive 6-aspect code review         | opus   |
| `security-auditor`       | OWASP Top 10 and security analysis         | sonnet |
| `refactoring-specialist` | Safe, incremental code improvement         | sonnet |
| `performance-optimizer`  | Bottleneck identification and optimization | sonnet |

### Development

| Agent                        | Purpose                                   | Model  |
| ---------------------------- | ----------------------------------------- | ------ |
| `test-generator`             | TDD-focused test suite generation         | sonnet |
| `e2e-test-specialist`        | Playwright/Cypress E2E and visual testing | sonnet |
| `api-designer`               | REST/GraphQL API design                   | sonnet |
| `api-integration-specialist` | Third-party APIs, OAuth flows, webhooks   | sonnet |
| `database-expert`            | Schema design, query optimization, ops    | sonnet |
| `devops-engineer`            | CI/CD, containers, cloud, IaC             | sonnet |

### Architecture

| Agent                      | Purpose                                     | Model  |
| -------------------------- | ------------------------------------------- | ------ |
| `architecture-analyst`     | System design and pattern analysis          | opus   |
| `cloud-architect`          | Multi-cloud, serverless, DR planning        | opus   |
| `debugging-specialist`     | Systematic 4-phase debugging                | sonnet |
| `devsecops-engineer`       | CI/CD security, SAST/DAST, supply chain     | sonnet |
| `graphql-architect`        | GraphQL schema and resolver design          | sonnet |
| `microservices-architect`  | Distributed systems and service design      | sonnet |
| `migration-specialist`     | Framework upgrades, codebase migrations     | opus   |
| `observability-engineer`   | OpenTelemetry, SLOs, distributed tracing    | sonnet |
| `realtime-specialist`      | WebSockets and live data systems            | sonnet |

### Language & Framework Experts

| Agent                     | Purpose                            | Model  |
| ------------------------- | ---------------------------------- | ------ |
| `typescript-expert`       | Type system mastery                | sonnet |
| `python-expert`           | Python best practices              | sonnet |
| `react-expert`            | React patterns and hooks           | sonnet |
| `next-js-expert`          | Next.js App Router, Server Actions | sonnet |
| `vue-nuxt-expert`         | Vue 3, Nuxt 3, Pinia, VueUse      | sonnet |
| `svelte-expert`           | Svelte 5 runes, SvelteKit routing  | sonnet |
| `django-fastapi-expert`   | Django ORM/DRF, FastAPI, Pydantic  | sonnet |
| `kotlin-expert`           | KMP, Compose, coroutines, Ktor    | sonnet |
| `rust-expert`             | Ownership, async Rust, Axum/WASM  | sonnet |
| `go-expert`               | Concurrency, stdlib, Chi/Echo     | sonnet |

### Platform Development

| Agent                    | Purpose                                      | Model  |
| ------------------------ | -------------------------------------------- | ------ |
| `ios-developer`          | iOS/iPadOS/tvOS with Swift and SwiftUI       | sonnet |
| `android-developer`      | Android with Kotlin and Jetpack Compose      | sonnet |
| `mobile-architect`       | Cross-platform mobile architecture decisions | sonnet |
| `flutter-developer`      | Flutter/Dart, Riverpod, platform channels    | sonnet |
| `mobile-release-manager` | App store submissions, mobile CI/CD, ASO     | sonnet |
| `desktop-developer`      | Electron and desktop app development         | sonnet |
| `macos-developer`        | Native macOS AppKit, Catalyst development    | sonnet |
| `game-developer`         | Unity, Unreal Engine, Godot development      | sonnet |
| `cli-developer`          | CLI tools, argument parsing, terminal UI     | sonnet |
| `pwa-specialist`         | Service workers, offline-first, installable  | sonnet |
| `i18n-specialist`        | Internationalization and localization        | sonnet |

### SaaS & Product

| Agent                          | Purpose                                    | Model  |
| ------------------------------ | ------------------------------------------ | ------ |
| `auth-specialist`              | OAuth, JWT, SSO, MFA, NextAuth/Clerk       | sonnet |
| `payment-billing-specialist`   | Stripe, subscriptions, webhooks, PCI       | sonnet |
| `email-specialist`             | Transactional email, templates, delivery   | sonnet |
| `seo-specialist`               | Technical SEO, structured data, Web Vitals | sonnet |
| `product-analytics-specialist` | PostHog, Mixpanel, A/B testing, funnels    | sonnet |

### Data & AI

| Agent           | Purpose                                       | Model  |
| --------------- | --------------------------------------------- | ------ |
| `ml-engineer`   | PyTorch, TensorFlow, LLM integration, MLOps   | sonnet |
| `data-engineer` | ETL pipelines, data warehousing, stream processing | sonnet |

### Creative & Design

| Agent              | Purpose                             | Model  |
| ------------------ | ----------------------------------- | ------ |
| `graphic-designer` | Visual design, color, typography    | sonnet |
| `video-producer`   | Video production and editing        | sonnet |
| `audio-engineer`   | Audio production and sound design   | sonnet |
| `brand-strategist` | Brand identity and positioning      | sonnet |
| `motion-designer`  | UI animation and micro-interactions | sonnet |

### Product & Strategy

| Agent                 | Purpose                             | Model  |
| --------------------- | ----------------------------------- | ------ |
| `product-manager`     | PRDs, user stories, roadmaps        | sonnet |
| `startup-advisor`     | Startup launch and validation       | sonnet |
| `monetization-expert` | Revenue models and pricing strategy | sonnet |

### Support

| Agent                  | Purpose                        | Model  |
| ---------------------- | ------------------------------ | ------ |
| `documentation-writer` | Docs, READMEs, API specs       | haiku  |
| `technical-writer`     | ADRs, migration guides, runbooks | sonnet |
| `code-explainer`       | Clear code explanations        | haiku  |
| `accessibility-expert` | WCAG compliance                | sonnet |

## Usage

Agents are automatically invoked by Claude when their description matches the task.

### Explicit Invocation

```
Use the security-auditor agent to review this authentication code
Use the auth-specialist agent to implement OAuth login
Use the payment-billing-specialist agent to set up Stripe subscriptions
Use the next-js-expert agent to optimize my App Router setup
Use the e2e-test-specialist agent to write Playwright tests
```

### Via Task Tool

Claude will spawn these as subagents when appropriate for parallel work.

## Model Selection Guide

- **opus**: Complex analysis, architecture, thorough reviews
- **sonnet**: Standard development tasks, balanced speed/quality
- **haiku**: Quick tasks, documentation, explanations

## Creating New Agents

1. Create `.md` file in `~/.claude/agents/`
2. Include YAML frontmatter:
   ```yaml
   ---
   name: agent-name
   description: When to use this agent
   tools:
     - Read
     - Write
     - Grep
     - Glob
   model: sonnet
   ---
   ```
3. Write system prompt below frontmatter

## Best Practices

- One expertise area per agent
- Minimal tool access (only what's needed)
- Clear, actionable output formats
- Include reference skills where helpful
- Match model to task complexity

---

## Related Documentation

- `~/.claude/CLAUDE.md` - Global constitution (Skills & Agents trigger guide)
- `~/.claude/skills/MASTER_INDEX.md` - Complete skills navigation
- `~/.claude/skills/README.md` - Skills usage guide
- `~/.claude/README.md` - Installation guide

---

_Agents execute tasks. Skills provide knowledge. Use agents for doing, skills for guidance._
