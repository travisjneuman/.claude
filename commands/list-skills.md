---
description: Browse available skills by domain or list all skills with comprehensive categorization
arguments:
  - name: domain
    description: "Optional domain filter: frontend, backend, devops, design, business, mobile, framework, scientific, testing, etc."
    required: false
disable-model-invocation: true
---

# List Skills Command

Browse all available skills across local and marketplace sources.

## Execution

### If domain specified: `{{domain}}`

Filter and display skills matching the domain:

**Local Skills (~/.claude/skills/):**

```bash
ls ~/.claude/skills/ | grep -v "^_\|README\|MASTER\|EXPERT" | sort
```

**Marketplace Skills:**

- Check `~/.claude/plugins/marketplaces/*/` for matching skills
- Each marketplace may have different organization

### If no domain specified:

Display comprehensive categorized skill overview:

---

## Local Skills (current count: top of `~/.claude/INDEX.md`)

### Foundation

- `core-workflow` - Session protocols, git conventions, testing, debugging (auto-loads for complex tasks)

### Generic Development (Any Stack)

- `generic-code-reviewer` - Multi-stack code review
- `generic-design-system` - Design tokens & patterns
- `generic-feature-developer` - Architecture patterns
- `generic-ux-designer` - UX best practices

### Stack-Specific

- `generic-static-*` - Static site patterns (4 variants: code-reviewer, design-system, feature-developer, ux-designer)
- `generic-react-*` - React/TypeScript patterns (4 variants)
- `generic-fullstack-*` - Next.js/NestJS patterns (4 variants)

### Framework Skills (Modern JS Frameworks)

- `vue-development` - Vue 3, Composition API, Pinia, Nuxt 3, Vitest
- `svelte-development` - Svelte 5 runes, SvelteKit, $state/$derived/$effect

### Platform Development

- `ios-development` - Swift, SwiftUI, UIKit, Apple platforms
- `android-development` - Kotlin, Jetpack Compose, Material Design
- `react-native` - Cross-platform mobile with React Native
- `flutter-development` - Dart, Flutter widgets, state management
- `electron-desktop` - Desktop apps with Electron/Tauri
- `pwa-development` - Progressive web apps, service workers
- `macos-native` - AppKit, Catalyst, macOS system integration
- `game-development` - Unity, Unreal Engine, Godot

### Technical Architecture

- `api-design` - REST/GraphQL API patterns
- `graphql-expert` - Schema design, resolvers, subscriptions
- `microservices-architecture` - Distributed systems patterns
- `websockets-realtime` - Real-time communication (WebSocket, SSE)
- `i18n-localization` - Internationalization, locale handling

### Infrastructure & Operations

- `devops-cloud` - CI/CD, Docker, Kubernetes, AWS/GCP/Azure, Terraform
- `database-expert` - PostgreSQL, MongoDB, Redis, schema design
- `ai-ml-development` - PyTorch, TensorFlow, LLMs, MLOps
- `security` - Authentication, OWASP, encryption, vulnerability analysis

### Creative & Design

- `ui-research` - **PREREQUISITE for UI work** - Research inspiration sources
- `frontend-enhancer` - Modern UI enhancement patterns (requires ui-research)
- `graphic-design` - Color theory, typography, layout, composition
- `video-production` - Pre/post production, camera, lighting, editing
- `audio-production` - Recording, mixing, mastering, sound design
- `brand-identity` - Brand strategy, positioning, visual identity
- `ui-animation` - Animation principles, micro-interactions, easing

### Business & Strategy

- `startup-launch` - Idea validation, MVP, launch phases
- `monetization-strategy` - Pricing psychology, SaaS metrics, revenue models
- `business-strategy` - Strategic planning, competitive analysis
- `finance` - Financial modeling, valuation, analysis
- `marketing` - Brand strategy, digital marketing, analytics
- `sales` - Sales methodologies, pipeline management
- `product-management` - Roadmaps, prioritization, product-market fit

### Domain Expertise

- `leadership`, `hr-talent`, `health-wellness` - People & Leadership
- `operations`, `risk-management`, `legal-compliance` - Operations & Technology
- `innovation`, `rd-management` - Innovation & R&D
- `data-science` - Data analytics, ML pipelines
- `sustainability-esg` - Environmental, Social, Governance
- See `EXPERT-SKILLS-GUIDE.md` for complete coverage

### Development Workflow

- `debug-systematic` - 4-phase debugging (REPRODUCE → ISOLATE → DIAGNOSE → FIX)
- `tdd-workflow` - Test-Driven Development with RED-GREEN-REFACTOR

### Utilities

- `codebase-documenter` - README, API docs, code comments
- `tech-debt-analyzer` - Code health analysis
- `test-specialist` - Testing guidance
- `seo-analytics-auditor` - SEO and analytics analysis

---

## Marketplace Skills (current repo count: top of `~/.claude/INDEX.md`)

### Notable Repos

| Repo                         | Focus                                     |
| ---------------------------- | ----------------------------------------- |
| davila7-templates            | Templates and code patterns               |
| claude-scientific-skills     | Scientific computing (bio, chem, physics) |
| wshobson-agents              | Progressive disclosure architecture       |
| athola-night-market          | General-purpose skill marketplace         |
| madappgang-claude-code       | Full-stack development                    |
| trailofbits-skills           | Professional security auditing            |
| buildwithclaude              | Full-stack + subagents + commands         |
| alirezarezvani-claude-skills | General development                       |
| skillsforge                  | Curated quality skills                    |
| secondsky-sap-skills         | SAP and enterprise                        |
| awesome-claude-skills        | Documents, canvas, forensics              |

### Specialized Repos

- **Security:** trailofbits-skills (professional security auditing)
- **Scientific:** claude-scientific-skills, anthropic-life-sciences, gqy20-biology-plugins
- **Enterprise/SAP:** secondsky-sap-skills
- **Elixir:** bradleygolden-elixir, georgeguimaraes-elixir
- **Terraform/IaC:** hashi-terraform-skills
- **Perl/CPAN:** kfly8-cpan-plugins
- **Finance:** quant-equity-research
- **Context Engineering:** neolab-context-kit, muratcankoylan-agent-skills
- **Planning:** othmanadi-planning
- **Infrastructure:** diet103-infrastructure
- **Meta-Skills:** taches-cc-resources, claude-plugins-official

### Search Marketplace Skills

```bash
find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -li "<keyword>"
```

---

## Quick Reference by Domain

| Domain             | Skills                                                                          |
| ------------------ | ------------------------------------------------------------------------------- |
| **Frontend/React** | `generic-react-*`, `frontend-enhancer`, `ui-research`                           |
| **Vue.js**         | `vue-development`                                                               |
| **Svelte**         | `svelte-development`                                                            |
| **Backend/API**    | `api-design`, `database-expert`, `graphql-expert`                               |
| **Mobile**         | `ios-development`, `android-development`, `react-native`, `flutter-development` |
| **Desktop**        | `electron-desktop`, `macos-native`                                              |
| **DevOps**         | `devops-cloud`, `security`                                                      |
| **Testing**        | `test-specialist`, `tdd-workflow`                                               |
| **Scientific**     | Marketplace: `claude-scientific-skills`                                         |
| **Business**       | `startup-launch`, `business-strategy`, `finance`, `marketing`                   |
| **Design**         | `graphic-design`, `ui-animation`, `brand-identity`                              |
| **AI/ML**          | `ai-ml-development`, `data-science`                                             |

---

## Usage

### Invoke Directly

```
Skill(skill-name)
```

### Via Intelligent Router

```
/start-task [your task description]
```

Auto-detects and loads appropriate skills based on context.

### Standard Prompts

Just describe your task - skills auto-activate based on description matching.

---

## Full Catalog

- **Local Skills:** `~/.claude/skills/MASTER_INDEX.md`
- **Marketplaces:** Browse `~/.claude/plugins/marketplaces/*/`
- **Domain Experts:** `~/.claude/skills/EXPERT-SKILLS-GUIDE.md`

---

_Local skills + marketplaces = coverage for any domain (current counts: `~/.claude/INDEX.md`)_

