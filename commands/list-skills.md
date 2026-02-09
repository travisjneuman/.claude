---
description: Browse available skills by domain or list all skills with comprehensive categorization
arguments:
  - name: domain
    description: "Optional domain filter: frontend, backend, devops, design, business, mobile, framework, scientific, testing, etc."
    required: false
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

## Local Skills (102 total)

### Foundation

- `core-workflow` - Session protocols, git conventions, testing, debugging (auto-loads for complex tasks)

### Generic Development (Any Stack)

- `generic-code-reviewer` - Multi-stack code review
- `generic-design-system` - Design tokens & patterns
- `generic-feature-developer` - Architecture patterns
- `generic-ux-designer` - UX best practices

### Stack-Specific (12 skills)

- `generic-static-*` - Static site patterns (4 variants: code-reviewer, design-system, feature-developer, ux-designer)
- `generic-react-*` - React/TypeScript patterns (4 variants)
- `generic-fullstack-*` - Next.js/NestJS patterns (4 variants)

### Framework Skills (Modern JS Frameworks)

- `vue-development` - Vue 3, Composition API, Pinia, Nuxt 3, Vitest
- `svelte-development` - Svelte 5 runes, SvelteKit, $state/$derived/$effect

### Platform Development (8 skills)

- `ios-development` - Swift, SwiftUI, UIKit, Apple platforms
- `android-development` - Kotlin, Jetpack Compose, Material Design
- `react-native` - Cross-platform mobile with React Native
- `flutter-development` - Dart, Flutter widgets, state management
- `electron-desktop` - Desktop apps with Electron/Tauri
- `pwa-development` - Progressive web apps, service workers
- `macos-native` - AppKit, Catalyst, macOS system integration
- `game-development` - Unity, Unreal Engine, Godot

### Technical Architecture (5 skills)

- `api-design` - REST/GraphQL API patterns
- `graphql-expert` - Schema design, resolvers, subscriptions
- `microservices-architecture` - Distributed systems patterns
- `websockets-realtime` - Real-time communication (WebSocket, SSE)
- `i18n-localization` - Internationalization, locale handling

### Infrastructure & Operations (4 skills)

- `devops-cloud` - CI/CD, Docker, Kubernetes, AWS/GCP/Azure, Terraform
- `database-expert` - PostgreSQL, MongoDB, Redis, schema design
- `ai-ml-development` - PyTorch, TensorFlow, LLMs, MLOps
- `security` - Authentication, OWASP, encryption, vulnerability analysis

### Creative & Design (7 skills)

- `ui-research` - **PREREQUISITE for UI work** - Research inspiration sources
- `frontend-enhancer` - Modern UI enhancement patterns (requires ui-research)
- `graphic-design` - Color theory, typography, layout, composition
- `video-production` - Pre/post production, camera, lighting, editing
- `audio-production` - Recording, mixing, mastering, sound design
- `brand-identity` - Brand strategy, positioning, visual identity
- `ui-animation` - Animation principles, micro-interactions, easing

### Business & Strategy (7 skills)

- `startup-launch` - Idea validation, MVP, launch phases
- `monetization-strategy` - Pricing psychology, SaaS metrics, revenue models
- `business-strategy` - Strategic planning, competitive analysis
- `finance` - Financial modeling, valuation, analysis
- `marketing` - Brand strategy, digital marketing, analytics
- `sales` - Sales methodologies, pipeline management
- `product-management` - Roadmaps, prioritization, product-market fit

### Domain Expertise (10 skills)

- `leadership`, `hr-talent`, `health-wellness` - People & Leadership
- `operations`, `risk-management`, `legal-compliance` - Operations & Technology
- `innovation`, `rd-management` - Innovation & R&D
- `data-science` - Data analytics, ML pipelines
- `sustainability-esg` - Environmental, Social, Governance
- See `EXPERT-SKILLS-GUIDE.md` for complete coverage

### Development Workflow (2 skills)

- `debug-systematic` - 4-phase debugging (REPRODUCE → ISOLATE → DIAGNOSE → FIX)
- `tdd-workflow` - Test-Driven Development with RED-GREEN-REFACTOR

### Utilities (5 skills)

- `codebase-documenter` - README, API docs, code comments
- `tech-debt-analyzer` - Code health analysis
- `test-specialist` - Testing guidance
- `seo-analytics-auditor` - SEO and analytics analysis
- `document-skills` - Office formats (docx, pdf, pptx, xlsx)

---

## Marketplace Skills (3,900+ total across 68 repos)

### Top Repos by Skill Count

| Repo                         | Skills | Focus                                     |
| ---------------------------- | ------ | ----------------------------------------- |
| davila7-templates            | 651    | Templates and code patterns               |
| claude-scientific-skills     | 144    | Scientific computing (bio, chem, physics) |
| wshobson-agents              | 129    | Progressive disclosure architecture       |
| athola-night-market          | 125    | General-purpose skill marketplace         |
| madappgang-claude-code       | 110    | Full-stack development                    |
| worldbuilding-skills         | 52     | Creative worldbuilding                    |
| trailofbits-skills           | 50     | Professional security auditing            |
| buildwithclaude              | 43     | Full-stack + subagents + commands         |
| alirezarezvani-claude-skills | 42     | General development                       |
| skillsforge                  | 34     | Curated quality skills                    |
| secondsky-sap-skills         | 33     | SAP and enterprise                        |
| awesome-claude-skills        | 32     | Documents, canvas, forensics              |

### Specialized Repos

- **Security:** trailofbits-skills (50 professional security skills)
- **Scientific:** claude-scientific-skills (144), anthropic-life-sciences (6), gqy20-biology-plugins
- **Enterprise/SAP:** secondsky-sap-skills (33)
- **Elixir:** bradleygolden-elixir (4), georgeguimaraes-elixir (6)
- **Terraform/IaC:** hashi-terraform-skills (4)
- **Perl/CPAN:** kfly8-cpan-plugins (3)
- **Film/AIGC:** mojito-freeship-skills (4)
- **Finance:** quant-equity-research
- **Context Engineering:** neolab-context-kit (11), muratcankoylan-agent-skills (19)
- **Planning:** othmanadi-planning (12)
- **Infrastructure:** diet103-infrastructure (5)
- **Meta-Skills:** taches-cc-resources (11), claude-plugins-official (13)
- **Workflow:** get-shit-done, auto-claude

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

_102 local skills + 68 marketplaces (3,900+ skills) = comprehensive coverage for any domain_
