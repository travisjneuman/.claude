# Skills Documentation - Master Index

Navigate all 71 local skills + 1,328 marketplace skills from this central hub.

---

## Documentation Files

| File | Purpose | When to Read |
|------|---------|--------------|
| [README.md](./README.md) | Skills library overview | Starting with skills system |
| [EXPERT-SKILLS-GUIDE.md](./EXPERT-SKILLS-GUIDE.md) | 16 domain expert skills | Domain expertise |

---

## Skills by Category

### Foundation Skills (Core Workflow)
| Skill | Description |
|-------|-------------|
| `core-workflow` | **Session protocols, git conventions, testing, debugging, communication standards** - Auto-loads for complex tasks |

### Generic Skills (Any Project)
| Skill | Description |
|-------|-------------|
| `generic-code-reviewer` | Multi-stack code review |
| `generic-design-system` | Design tokens & patterns |
| `generic-feature-developer` | Architecture patterns |
| `generic-ux-designer` | UX best practices |

### Stack-Specific Skills
| Prefix | Stack | Skills |
|--------|-------|--------|
| `generic-static-*` | HTML/CSS/JS | code-reviewer, design-system, feature-developer, ux-designer |
| `generic-react-*` | React/TypeScript | code-reviewer, design-system, feature-developer, ux-designer |
| `generic-fullstack-*` | Next.js/NestJS | code-reviewer, design-system, feature-developer, ux-designer |

### Framework Skills (Modern JS Frameworks)
| Skill | Framework | Key Technologies |
|-------|-----------|------------------|
| `vue-development` | Vue.js 3 | Composition API, TypeScript, Pinia, Vue Router, Nuxt 3, Vitest |
| `svelte-development` | Svelte 5 | Runes ($state, $derived, $effect, $props), SvelteKit, TypeScript |

### Platform Development Skills
| Skill | Platform | Description |
|-------|----------|-------------|
| `ios-development` | iOS/iPadOS/tvOS | Swift, SwiftUI, UIKit, Apple ecosystem |
| `android-development` | Android | Kotlin, Jetpack Compose, Material Design |
| `react-native` | Cross-platform | React Native patterns, native modules |
| `flutter-development` | Cross-platform | Dart, Flutter widgets, state management |
| `electron-desktop` | Desktop | Electron, Tauri, cross-platform desktop |
| `pwa-development` | Web | Progressive Web Apps, service workers |
| `macos-native` | macOS | AppKit, Catalyst, macOS system integration |
| `game-development` | Gaming | Unity, Unreal Engine, Godot |

### Creative & Design Skills
| Skill | Domain | Description |
|-------|--------|-------------|
| `ui-research` | **Research** | **PREREQUISITE for UI work** - Research inspiration sources, avoid AI look |
| `frontend-enhancer` | Enhancement | Modern UI patterns (requires ui-research first) |
| `graphic-design` | Visual Design | Color theory, typography, layout, composition |
| `video-production` | Video | Pre/post production, camera, lighting, editing |
| `audio-production` | Audio | Recording, mixing, mastering, sound design |
| `brand-identity` | Branding | Brand strategy, positioning, visual identity |
| `ui-animation` | Motion | Animation principles, micro-interactions, easing |

### Business & Startup Skills
| Skill | Domain | Description |
|-------|--------|-------------|
| `startup-launch` | Startups | Idea validation, MVP, launch phases |
| `monetization-strategy` | Revenue | Pricing psychology, SaaS metrics, models |
| `business-strategy` | Strategy | Strategic planning, competitive analysis |
| `finance` | Finance | Financial modeling, valuation, analysis |
| `marketing` | Growth | Brand strategy, digital marketing, analytics |
| `sales` | Revenue | Sales methodologies, pipeline management |
| `product-management` | Product | Roadmaps, prioritization, product-market fit |

### Technical Architecture Skills
| Skill | Domain | Description |
|-------|--------|-------------|
| `api-design` | APIs | REST/GraphQL design, OpenAPI specs |
| `graphql-expert` | APIs | Schema design, resolvers, subscriptions |
| `microservices-architecture` | Architecture | Service design, resilience, observability |
| `i18n-localization` | Internationalization | ICU format, RTL, locale handling |
| `websockets-realtime` | Real-time | WebSocket, SSE, Socket.IO, scaling |

### Infrastructure & Operations Skills
| Skill | Domain | Description |
|-------|--------|-------------|
| `devops-cloud` | DevOps | AWS, GCP, Azure, Kubernetes, Terraform, CI/CD |
| `database-expert` | Databases | PostgreSQL, MongoDB, Redis advanced patterns |
| `ai-ml-development` | AI/ML | PyTorch, TensorFlow, LLM integration, MLOps |
| `security` | Security | Authentication, OWASP, encryption, vulnerability analysis |

### Domain Expert Skills
| Domain | Skills |
|--------|--------|
| Business & Strategy | `business-strategy`, `finance` |
| Operations & Technology | `operations`, `security`, `risk-management`, `legal-compliance` |
| People & Leadership | `leadership`, `hr-talent`, `health-wellness` |
| Revenue & Growth | `marketing`, `sales`, `product-management` |
| Innovation & R&D | `innovation`, `rd-management` |
| Data & Analytics | `data-science` |
| Sustainability | `sustainability-esg` |

### Development Workflow Skills
| Skill | Description |
|-------|-------------|
| `debug-systematic` | 4-phase debugging methodology (REPRODUCE -> ISOLATE -> DIAGNOSE -> FIX) |
| `tdd-workflow` | Test-Driven Development with RED-GREEN-REFACTOR cycle |

### Utility Skills
| Skill | Description |
|-------|-------------|
| `codebase-documenter` | Generate documentation |
| `tech-debt-analyzer` | Code health analysis |
| `test-specialist` | Testing guidance |
| `seo-analytics-auditor` | SEO analysis |
| `document-skills` | Office formats (docx, pdf, pptx, xlsx) |

---

## Marketplace Skills (1,328+)

21 marketplace plugins provide additional specialized skills:

| Marketplace | Skills | Specialty |
|-------------|--------|-----------|
| `claude-scientific-skills` | 125+ | Bioinformatics, chemistry, physics, proteomics |
| `claude-code-plugins-plus-skills` | 185 | Production-ready skills across all domains |
| `wshobson-agents` | 107 | Full-stack development skills |
| `obra-superpowers` | ~30 | Battle-tested /brainstorm, /write-plan |
| `skillsforge` | 29 | Curated quality skills |
| `awesome-claude-skills` | 27 | Documents, canvas, forensics, invoices |
| `voltagent-subagents` | 100+ | Full-stack, DevOps, data science agents |
| `taches-cc-resources` | Various | Prompt engineering, hooks, skill creation |
| `skill-seekers` | Various | Skill discovery tools |
| `mhattingpete-skills` | 10+ | Git automation, testing, code review |

Access via `/start-task` universal router - automatically detects and loads relevant marketplace skills.

---

## Subagents (37)

Located in `~/.claude/agents/`. See [agents/README.md](../agents/README.md).

### Code Quality
| Agent | Purpose | Model |
|-------|---------|-------|
| `deep-code-reviewer` | Comprehensive 6-aspect code review | opus |
| `security-auditor` | OWASP Top 10 and security analysis | sonnet |
| `refactoring-specialist` | Safe, incremental code improvement | sonnet |
| `performance-optimizer` | Bottleneck identification | sonnet |

### Development
| Agent | Purpose | Model |
|-------|---------|-------|
| `test-generator` | TDD-focused test suite generation | sonnet |
| `api-designer` | REST/GraphQL API design | sonnet |
| `database-expert` | Schema design and query optimization | sonnet |
| `devops-specialist` | CI/CD, containers, infrastructure | sonnet |
| `debugging-specialist` | Systematic 4-phase debugging | sonnet |

### Architecture
| Agent | Purpose | Model |
|-------|---------|-------|
| `architecture-analyst` | System design and pattern analysis | opus |
| `graphql-architect` | GraphQL schema and resolver design | sonnet |
| `microservices-architect` | Distributed systems and service design | sonnet |
| `realtime-specialist` | WebSockets and live data systems | sonnet |

### Platform Development
| Agent | Purpose | Model |
|-------|---------|-------|
| `ios-developer` | iOS/iPadOS/tvOS with Swift, SwiftUI | sonnet |
| `android-developer` | Android with Kotlin, Jetpack Compose | sonnet |
| `mobile-architect` | Cross-platform mobile decisions | sonnet |
| `desktop-developer` | Electron, Tauri, desktop apps | sonnet |
| `i18n-specialist` | Internationalization and localization | sonnet |

### Creative & Design
| Agent | Purpose | Model |
|-------|---------|-------|
| `graphic-designer` | Visual design, color, typography | sonnet |
| `video-producer` | Video production and editing | sonnet |
| `audio-engineer` | Audio production and sound design | sonnet |
| `brand-strategist` | Brand identity and positioning | sonnet |
| `motion-designer` | UI animation and micro-interactions | sonnet |

### Business & Strategy
| Agent | Purpose | Model |
|-------|---------|-------|
| `startup-advisor` | Startup launch and validation | sonnet |
| `monetization-expert` | Revenue models and pricing strategy | sonnet |

### Infrastructure & Specialized
| Agent | Purpose | Model |
|-------|---------|-------|
| `devops-engineer` | Cloud infrastructure, Kubernetes, CI/CD | sonnet |
| `ml-engineer` | Machine learning, LLM integration, MLOps | sonnet |
| `game-developer` | Unity, Unreal, Godot game development | sonnet |
| `macos-developer` | Native macOS AppKit development | sonnet |
| `database-architect` | Schema design, query optimization | sonnet |

### Language Experts
| Agent | Purpose | Model |
|-------|---------|-------|
| `typescript-expert` | Type system mastery | sonnet |
| `python-expert` | Python best practices | sonnet |
| `react-expert` | React patterns and hooks | sonnet |

### Support
| Agent | Purpose | Model |
|-------|---------|-------|
| `documentation-writer` | Docs, READMEs, API specs | haiku |
| `code-explainer` | Clear code explanations | haiku |
| `accessibility-expert` | WCAG compliance | sonnet |

---

## Quick Start

**New to skills?** Read [README.md](./README.md) first.

**Need domain expertise?** Jump to [EXPERT-SKILLS-GUIDE.md](./EXPERT-SKILLS-GUIDE.md).

### By Task Type

| Task | Skills/Agents |
|------|---------------|
| **UI/Frontend work** | `ui-research` skill (FIRST), then `frontend-enhancer`, `generic-design-system` |
| **Vue.js development** | `vue-development` skill |
| **Svelte development** | `svelte-development` skill |
| Building iOS app | `ios-development` skill, `ios-developer` agent |
| Building Android app | `android-development` skill, `android-developer` agent |
| Cross-platform mobile | `react-native` or `flutter-development` skill, `mobile-architect` agent |
| Desktop app | `electron-desktop` skill, `desktop-developer` agent |
| macOS native app | `macos-native` skill, `macos-developer` agent |
| Real-time features | `websockets-realtime` skill, `realtime-specialist` agent |
| API design | `api-design` or `graphql-expert` skill, `graphql-architect` agent |
| Microservices | `microservices-architecture` skill, `microservices-architect` agent |
| DevOps / Cloud | `devops-cloud` skill, `devops-engineer` agent |
| Database design | `database-expert` skill, `database-architect` agent |
| AI / Machine Learning | `ai-ml-development` skill, `ml-engineer` agent |
| Game development | `game-development` skill, `game-developer` agent |
| Internationalization | `i18n-localization` skill, `i18n-specialist` agent |
| Visual design | `graphic-design` skill, `graphic-designer` agent |
| Video work | `video-production` skill, `video-producer` agent |
| Audio work | `audio-production` skill, `audio-engineer` agent |
| Branding | `brand-identity` skill, `brand-strategist` agent |
| UI animations | `ui-animation` skill, `motion-designer` agent |
| Starting a startup | `startup-launch` skill, `startup-advisor` agent |
| Pricing strategy | `monetization-strategy` skill, `monetization-expert` agent |
| Debugging | `debug-systematic` skill, `debugging-specialist` agent |
| Writing tests | `tdd-workflow` skill, `test-generator` agent |
| Code review | `generic-code-reviewer` skill, `deep-code-reviewer` agent |
| Security audit | `security` skill, `security-auditor` agent |
| Scientific work | Check `claude-scientific-skills` marketplace |

---

## Related Documentation

- `~/.claude/docs/RESOURCES.md` - External resources and learning
- `~/.claude/docs/workflow-automation.md` - Workflow automation
- `~/.claude/agents/README.md` - Subagents reference
- `~/.claude/CLAUDE.md` - Global instructions
- `~/.claude/README.md` - Installation guide

---

*Last updated: December 2025*
