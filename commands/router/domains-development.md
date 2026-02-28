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
| `database`      | `Skill(database-expert)`                 | `database-expert`         | -                                     |
| `devops`        | `Skill(devops-cloud)`                    | `devops-engineer`         | -                                     |
| `testing`       | `Skill(test-specialist)`                 | `test-generator`          | e2e-test-specialist                   |
| `security`      | `Skill(security)`                        | `security-auditor`        | application-security skill            |
| `debugging`     | `Skill(debug-systematic)`                | `debugging-specialist`    | -                                     |
| `performance`   | `Skill(performance-engineering)`         | `performance-optimizer`   | -                                     |
| `graphql`       | `Skill(graphql-expert)`                  | `graphql-architect`       | -                                     |
| `microservices` | `Skill(microservices-architecture)`      | `microservices-architect` | -                                     |
| `i18n`          | `Skill(i18n-localization)`               | `i18n-specialist`         | -                                     |
| `realtime`      | `Skill(websockets-realtime)`             | `realtime-specialist`     | -                                     |
| `game`          | `Skill(game-development)`                | `game-developer`          | -                                     |
| `desktop`       | `Skill(electron-desktop)`                | `desktop-developer`       | -                                     |
| `pwa`           | `Skill(pwa-development)`                 | -                         | -                                     |
| `ai-ml`         | `Skill(ai-ml-development)`               | `ml-engineer`             | llm-app-development skill             |
| `llm-app`       | `Skill(llm-app-development)`             | `ml-engineer`             | RAG, embeddings, AI agents            |
| `flutter`       | `Skill(flutter-development)`             | `flutter-developer`       | mobile-architect                      |
| `react-native`  | `Skill(react-native)`                    | `mobile-architect`        | mobile-release-manager                |
| `macos`         | `Skill(macos-native)`                    | `macos-developer`         | -                                     |
| `python`        | -                                        | `python-expert`           | Read docs/reference/stacks/python.md           |
| `django-fastapi`| -                                        | `python-expert`           | Read docs/reference/stacks/django-fastapi.md   |
| `nextjs`        | -                                        | `next-js-expert`          | Read docs/reference/stacks/fullstack-nextjs-nestjs.md |
| `typescript`    | -                                        | `typescript-expert`       | Read docs/reference/stacks/react-typescript.md |
| `go`            | -                                        | `go-expert`               | Read docs/reference/stacks/go.md               |
| `rust`          | -                                        | `rust-expert`             | Read docs/reference/stacks/rust.md             |
| `data-science`  | `Skill(data-science)`                    | `data-engineer`           | -                                     |
| `auth`          | `Skill(authentication-patterns)`         | `auth-specialist`         | -                                     |
| `payments`      | `Skill(payment-integration)`             | `payment-billing-specialist` | -                                  |
| `email`         | `Skill(email-systems)`                   | `email-specialist`        | -                                     |
| `analytics`     | `Skill(product-analytics)`               | `product-analytics-specialist` | -                               |
| `monitoring`    | `Skill(monitoring-observability)`        | -                         | -                                     |
| `serverless`    | `Skill(serverless-development)`          | `cloud-architect`         | -                                     |
| `seo`           | `Skill(seo-analytics-auditor)`           | `seo-specialist`          | -                                     |
| `a11y`          | `Skill(accessibility-a11y)`              | `accessibility-expert`    | -                                     |
| `events`        | `Skill(event-driven-architecture)`       | `microservices-architect` | -                                     |
| `tauri`         | `Skill(tauri-desktop)`                   | `desktop-developer`       | -                                     |
| `mobile-cicd`   | `Skill(mobile-cicd)`                     | `mobile-release-manager`  | -                                     |
| `kmp`           | `Skill(kotlin-multiplatform)`            | `android-developer`       | -                                     |

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
| `python`              | `~/.claude/docs/reference/stacks/python.md`                  |
| `django`, `fastapi`   | `~/.claude/docs/reference/stacks/django-fastapi.md`          |
| `react`, `typescript` | `~/.claude/docs/reference/stacks/react-typescript.md`        |
| `go`                  | `~/.claude/docs/reference/stacks/go.md`                      |
| `rust`                | `~/.claude/docs/reference/stacks/rust.md`                    |
| Full-stack            | `~/.claude/docs/reference/stacks/fullstack-nextjs-nestjs.md` |
| React Native / Expo   | `~/.claude/docs/reference/stacks/react-native-expo.md`       |
| Flutter / Dart        | `~/.claude/docs/reference/stacks/flutter-dart.md`            |
| Vue / Nuxt            | `~/.claude/docs/reference/stacks/vue-nuxt.md`                |
| Svelte / SvelteKit    | `~/.claude/docs/reference/stacks/svelte-sveltekit.md`        |
| API design            | `~/.claude/docs/reference/checklists/api-development.md`     |
| Database              | `~/.claude/docs/reference/checklists/database-design.md`     |
| Security              | `~/.claude/docs/reference/checklists/security-hardening.md`  |
| Performance           | `~/.claude/docs/reference/checklists/performance-optimization.md` |
| Deployment            | `~/.claude/docs/reference/workflows/deployment-cicd.md`      |
