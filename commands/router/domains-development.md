# Development Domain Reference

Load this file when development-related keywords detected.

## Domain Detection Keywords

| Domain          | Keywords                                                                                |
| --------------- | --------------------------------------------------------------------------------------- |
| `ios`           | ios, swift, swiftui, iphone, ipad, apple, xcode, cocoa, uikit                           |
| `android`       | android, kotlin, jetpack, compose, gradle, material design                              |
| `react`         | react, frontend, component, jsx, tsx, next.js, vite, tailwind, shadcn                   |
| `vue`           | vue, vuejs, nuxt, pinia, composition api, options api, vueuse                           |
| `svelte`        | svelte, sveltekit, runes, $state, $derived, svelte 5                                    |
| `backend`       | api, backend, server, endpoint, rest, express, nestjs, fastify                          |
| `database`      | database, db, sql, postgres, mongodb, redis, prisma, schema, query, migration           |
| `devops`        | deploy, ci/cd, docker, kubernetes, aws, gcp, azure, terraform, pipeline, github actions |
| `testing`       | test, testing, jest, vitest, pytest, coverage, tdd, unit test, e2e, cypress, playwright |
| `security`      | security, auth, authentication, oauth, jwt, vulnerability, owasp, encryption, ssl       |
| `debugging`     | debug, bug, fix, error, crash, issue, broken, not working, failing                      |
| `performance`   | performance, slow, optimize, speed, latency, bottleneck, profiling, memory leak         |
| `graphql`       | graphql, schema, resolver, apollo, relay, subscription                                  |
| `microservices` | microservice, service mesh, distributed, kafka, rabbitmq, event-driven                  |
| `i18n`          | internationalization, i18n, localization, translate, language, rtl, locale              |
| `realtime`      | realtime, websocket, live, socket, streaming, sse, pubsub                               |
| `game`          | game, unity, unreal, godot, physics, sprite, 3d, game engine                            |
| `desktop`       | electron, tauri, desktop app, native app, cross-platform, menubar                       |
| `pwa`           | pwa, service worker, offline, manifest, progressive, installable                        |
| `ai-ml`         | ai, ml, machine learning, model, llm, pytorch, tensorflow, openai, huggingface          |
| `flutter`       | flutter, dart, widget, material, cupertino                                              |
| `react-native`  | react native, expo, metro                                                               |
| `macos`         | macos, appkit, catalyst, mac app                                                        |
| `python`        | python, pip, poetry, django, flask, fastapi                                             |
| `typescript`    | typescript, types, generics, strict, inference                                          |
| `go`            | go, golang, goroutine, channel, gin, fiber, cobra                                       |
| `rust`          | rust, cargo, crate, tokio, async, wasm, lifetime, borrow                                |
| `data-science`  | data science, pandas, numpy, statistics, visualization, jupyter, notebook               |

## Resource Mapping

| Domain          | Skill                                    | Agent                     | Also Consider                         |
| --------------- | ---------------------------------------- | ------------------------- | ------------------------------------- |
| `ios`           | `Skill(ios-development)`                 | `ios-developer`           | mobile-architect                      |
| `android`       | `Skill(android-development)`             | `android-developer`       | mobile-architect                      |
| `react`         | `Skill(generic-react-feature-developer)` | `react-expert`            | frontend-enhancer                     |
| `vue`           | `Skill(vue-development)`                 | -                         | frontend-enhancer                     |
| `svelte`        | `Skill(svelte-development)`              | -                         | frontend-enhancer                     |
| `backend`       | `Skill(api-design)`                      | `api-designer`            | database-expert                       |
| `database`      | `Skill(database-expert)`                 | `database-architect`      | -                                     |
| `devops`        | `Skill(devops-cloud)`                    | `devops-engineer`         | -                                     |
| `testing`       | `Skill(test-specialist)`                 | `test-generator`          | -                                     |
| `security`      | `Skill(security)`                        | `security-auditor`        | -                                     |
| `debugging`     | `Skill(debug-systematic)`                | `debugging-specialist`    | -                                     |
| `performance`   | -                                        | `performance-optimizer`   | -                                     |
| `graphql`       | `Skill(graphql-expert)`                  | `graphql-architect`       | -                                     |
| `microservices` | `Skill(microservices-architecture)`      | `microservices-architect` | -                                     |
| `i18n`          | `Skill(i18n-localization)`               | `i18n-specialist`         | -                                     |
| `realtime`      | `Skill(websockets-realtime)`             | `realtime-specialist`     | -                                     |
| `game`          | `Skill(game-development)`                | `game-developer`          | -                                     |
| `desktop`       | `Skill(electron-desktop)`                | `desktop-developer`       | -                                     |
| `pwa`           | `Skill(pwa-development)`                 | -                         | -                                     |
| `ai-ml`         | `Skill(ai-ml-development)`               | `ml-engineer`             | -                                     |
| `flutter`       | `Skill(flutter-development)`             | `mobile-architect`        | -                                     |
| `react-native`  | `Skill(react-native)`                    | `mobile-architect`        | -                                     |
| `macos`         | `Skill(macos-native)`                    | `macos-developer`         | -                                     |
| `python`        | -                                        | `python-expert`           | Read rules/stacks/python.md           |
| `typescript`    | -                                        | `typescript-expert`       | Read rules/stacks/react-typescript.md |
| `go`            | -                                        | -                         | Read rules/stacks/go.md               |
| `rust`          | -                                        | -                         | Read rules/stacks/rust.md             |
| `data-science`  | `Skill(data-science)`                    | -                         | -                                     |

## Feature Implementation Routing

### Complex Feature Implementation

**When:** Building well-defined features in established codebases

**Skills:**

- `generic-feature-developer` - Manual implementation patterns
- `auto-claude` - Autonomous multi-agent implementation

**Routing Logic:**

- Complexity < 3: Manual implementation (generic-feature-developer)
- Complexity 3-4 + clear spec: **Suggest Auto-Claude**
- Complexity 3-4 + unclear spec: EnterPlanMode first
- Complexity >= 5: Route to GSD (`/gsd:new-project`)

**Keywords:** "implement", "add feature", "build", "create [complex feature]", "autonomous"

**Auto-Claude Benefits:**

- Git worktree isolation (safe development)
- QA validation loops
- Multi-agent coordination
- Semantic memory across sessions

**Example suggestion:**

> "This feature appears complex (score: 3+) with a clear specification. Would you like to use `/auto-claude` for autonomous implementation with QA validation, or proceed with manual step-by-step development?"

## Marketplace Repos by Development Domain

| Domain         | Marketplace Repos                                                                | Notes                          |
| -------------- | -------------------------------------------------------------------------------- | ------------------------------ |
| General dev    | davila7-templates (651), athola-night-market (125), madappgang-claude-code (110) | Broad coverage                 |
| Full-stack     | buildwithclaude (43), wshobson-agents (129)                                      | Includes subagents + commands  |
| Security       | trailofbits-skills (50)                                                          | Professional security auditing |
| Terraform/IaC  | hashi-terraform-skills (4)                                                       | HashiCorp Cloud Platform       |
| Infrastructure | diet103-infrastructure (5)                                                       | Infrastructure patterns        |
| Elixir         | bradleygolden-elixir (4), georgeguimaraes-elixir (6)                             | Elixir/Phoenix                 |
| Perl/CPAN      | kfly8-cpan-plugins (3)                                                           | Perl ecosystem                 |
| Context eng.   | neolab-context-kit (11), muratcankoylan-agent-skills (19)                        | Agent/context patterns         |
| Planning       | othmanadi-planning (12)                                                          | File-based planning            |

Search for domain-specific marketplace skills:

```bash
find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -li "<keyword>"
```

## Contextual Rules

| Domain                | Rule File                                           |
| --------------------- | --------------------------------------------------- |
| `python`              | `~/.claude/rules/stacks/python.md`                  |
| `react`, `typescript` | `~/.claude/rules/stacks/react-typescript.md`        |
| `go`                  | `~/.claude/rules/stacks/go.md`                      |
| `rust`                | `~/.claude/rules/stacks/rust.md`                    |
| Full-stack            | `~/.claude/rules/stacks/fullstack-nextjs-nestjs.md` |
