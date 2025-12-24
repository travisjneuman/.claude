# Development Domain Reference

Load this file when development-related keywords detected.

## Domain Detection Keywords

| Domain | Keywords |
|--------|----------|
| `ios` | ios, swift, swiftui, iphone, ipad, apple, xcode, cocoa, uikit |
| `android` | android, kotlin, jetpack, compose, gradle, material design |
| `react` | react, frontend, component, jsx, tsx, next.js, vite, tailwind, shadcn |
| `backend` | api, backend, server, endpoint, rest, express, nestjs, fastify |
| `database` | database, db, sql, postgres, mongodb, redis, prisma, schema, query, migration |
| `devops` | deploy, ci/cd, docker, kubernetes, aws, gcp, azure, terraform, pipeline, github actions |
| `testing` | test, testing, jest, vitest, pytest, coverage, tdd, unit test, e2e, cypress, playwright |
| `security` | security, auth, authentication, oauth, jwt, vulnerability, owasp, encryption, ssl |
| `debugging` | debug, bug, fix, error, crash, issue, broken, not working, failing |
| `performance` | performance, slow, optimize, speed, latency, bottleneck, profiling, memory leak |
| `graphql` | graphql, schema, resolver, apollo, relay, subscription |
| `microservices` | microservice, service mesh, distributed, kafka, rabbitmq, event-driven |
| `i18n` | internationalization, i18n, localization, translate, language, rtl, locale |
| `realtime` | realtime, websocket, live, socket, streaming, sse, pubsub |
| `game` | game, unity, unreal, godot, physics, sprite, 3d, game engine |
| `desktop` | electron, tauri, desktop app, native app, cross-platform, menubar |
| `pwa` | pwa, service worker, offline, manifest, progressive, installable |
| `ai-ml` | ai, ml, machine learning, model, llm, pytorch, tensorflow, openai, huggingface |
| `flutter` | flutter, dart, widget, material, cupertino |
| `react-native` | react native, expo, metro |
| `macos` | macos, appkit, catalyst, mac app |
| `python` | python, pip, poetry, django, flask, fastapi |
| `typescript` | typescript, types, generics, strict, inference |

## Resource Mapping

| Domain | Skill | Agent | Also Consider |
|--------|-------|-------|---------------|
| `ios` | `Skill(ios-development)` | `ios-developer` | mobile-architect |
| `android` | `Skill(android-development)` | `android-developer` | mobile-architect |
| `react` | `Skill(generic-react-feature-developer)` | `react-expert` | frontend-enhancer |
| `backend` | `Skill(api-design)` | `api-designer` | database-expert |
| `database` | `Skill(database-expert)` | `database-architect` | - |
| `devops` | `Skill(devops-cloud)` | `devops-engineer` | - |
| `testing` | `Skill(test-specialist)` | `test-generator` | - |
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
| `flutter` | `Skill(flutter-development)` | `mobile-architect` | - |
| `react-native` | `Skill(react-native)` | `mobile-architect` | - |
| `macos` | `Skill(macos-native)` | `macos-developer` | - |
| `python` | `Skill(python-expert)` | `python-expert` | Read rules/stacks/python.md |
| `typescript` | `Skill(typescript-expert)` | `typescript-expert` | Read rules/stacks/react-typescript.md |

## Contextual Rules

| Domain | Rule File |
|--------|-----------|
| `python` | `~/.claude/rules/stacks/python.md` |
| `react`, `typescript` | `~/.claude/rules/stacks/react-typescript.md` |
| Full-stack | `~/.claude/rules/stacks/fullstack-nextjs-nestjs.md` |
