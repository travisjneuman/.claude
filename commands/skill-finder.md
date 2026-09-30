---
description: AI-powered skill recommendation based on your problem description - finds the best local skills, agents, and marketplace resources
arguments:
  - name: problem
    description: "Describe what you're trying to accomplish or the problem you're facing"
    required: true
---

# Skill Finder - AI-Powered Recommendation

Analyzes your problem and recommends the best skills, agents, and marketplace resources from the complete ecosystem.

## Analysis: `{{problem}}`

### Step 1: Problem Classification

Classify the problem into categories:

| Category           | Indicators                                                  |
| ------------------ | ----------------------------------------------------------- |
| **Build/Create**   | "build", "create", "implement", "add", "new", "develop"     |
| **Fix/Debug**      | "fix", "debug", "error", "broken", "not working", "crash"   |
| **Optimize**       | "slow", "performance", "improve", "optimize", "speed up"    |
| **Review/Quality** | "review", "check", "quality", "audit", "security"           |
| **Design/Plan**    | "design", "architecture", "plan", "structure", "how should" |
| **Learn/Explore**  | "understand", "how does", "explain", "explore", "what is"   |
| **Research**       | "latest", "best way", "recommended", "compare", "vs"        |

### Step 2: Domain Detection

Scan for domain keywords (aligned with `/start-task` router):

**Development:**

- Frontend: react, vue, svelte, frontend, component, jsx, tsx
- Backend: api, backend, server, endpoint, rest, nestjs, express
- Database: database, sql, postgres, mongodb, redis, prisma
- DevOps: deploy, docker, kubernetes, ci/cd, aws, terraform

**Frameworks:**

- Vue.js: vue, vuejs, nuxt, pinia, composition api, vueuse
- Svelte: svelte, sveltekit, runes, $state, $derived, svelte 5

**Mobile:**

- iOS: ios, swift, swiftui, iphone, xcode, apple
- Android: android, kotlin, jetpack, compose
- Cross-platform: react native, flutter, expo

**Scientific:**

- Bioinformatics: protein, dna, rna, sequence, blast, genomics
- Chemistry: molecule, compound, reaction, spectroscopy
- Physics: quantum, particle, astrophysics
- Clinical: drug, clinical trial, medical imaging

**Business:**

- Startup: startup, mvp, launch, validate
- Finance: pricing, revenue, financial model
- Marketing: marketing, growth, analytics

**Creative:**

- Design: design, color, typography, brand
- Video: video, camera, editing
- Audio: audio, podcast, mixing

### Step 3: Recommend Resources

**Based on analysis, recommend:**

#### Primary Skill

The most relevant skill for this exact problem.

#### Supporting Skills

Additional skills that may help.

#### Relevant Agents

Core agents (listed in `~/.claude/agents/README.md`) via the Agent tool; every other specialist is an `agent-<name>` skill invoked via the Skill tool.

#### Marketplace Resources

Skills from the marketplace repositories in `~/.claude/plugins/marketplaces/` (current counts: top of `~/.claude/INDEX.md`).

Search for relevant marketplace skills:

```bash
find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -li "<keyword>"
```

#### Decision Frameworks (if applicable)

See `~/.claude/skills/toolkit-router/routes/decision-frameworks.md` (first principles, prioritization, 5 whys, SWOT, and others).

---

## Quick Match Reference

Agent column: plain names are core agents (Agent tool); `agent-*` names are skills (Skill tool).

| If problem involves...  | Primary Skill                | Agent                     | Marketplace Repos                                  |
| ----------------------- | ---------------------------- | ------------------------- | -------------------------------------------------- |
| **Frontend/React**      | `generic-react-*`            | `react-expert`            | wshobson-agents, madappgang-claude-code, buildwithclaude       |
| **Vue.js**              | `vue-development`            | -                         | davila7-templates, athola-night-market             |
| **Svelte**              | `svelte-development`         | -                         | davila7-templates                                  |
| **API/backend**         | `api-design`                 | `agent-api-designer`            | buildwithclaude, madappgang-claude-code                        |
| **Database**            | `database-expert`            | `agent-database-expert`      | buildwithclaude                                    |
| **GraphQL**             | `graphql-expert`             | `agent-graphql-architect`       | -                                                  |
| **iOS**                 | `ios-development`            | `ios-developer`           | -                                                  |
| **Android**             | `android-development`        | `agent-android-developer`       | -                                                  |
| **React Native**        | `react-native`               | `agent-mobile-architect`        | -                                                  |
| **Flutter**             | `flutter-development`        | `agent-mobile-architect`        | -                                                  |
| **Desktop**             | `electron-desktop`           | `agent-desktop-developer`       | -                                                  |
| **Testing**             | `test-specialist`            | `agent-test-generator`          | mhattingpete-skills                                |
| **Performance**         | -                            | `performance-optimizer`   | -                                                  |
| **Security**            | `security`                   | `security-auditor`        | trailofbits-skills                     |
| **Debugging**           | `debug-systematic`           | `debugging-specialist`    | -                                                  |
| **Documentation**       | `codebase-documenter`        | `agent-documentation-writer`    | -                                                  |
| **Chemistry**           | -                            | -                         | claude-scientific-skills                           |
| **Physics**             | -                            | -                         | claude-scientific-skills                           |
| **Proteomics**          | -                            | -                         | claude-scientific-skills                           |
| **Life Sciences**       | -                            | -                         | anthropic-life-sciences                            |
| **AI/ML**               | `ai-ml-development`          | `agent-ml-engineer`             | affaan-everything-claude                           |
| **Data Science**        | `data-science`               | -                         | -                                                  |
| **Elixir**              | -                            | -                         | bradleygolden-elixir, georgeguimaraes-elixir       |
| **SAP/Enterprise**      | -                            | -                         | secondsky-sap-skills                   |
| **Finance/Equity**      | `finance`                    | -                         | quant-equity-research                              |
| **Startup**             | `startup-launch`             | `agent-startup-advisor`         | -                                                  |
| **Pricing**             | `monetization-strategy`      | `agent-monetization-expert`     | -                                                  |
| **Marketing**           | `marketing`                  | -                         | -                                                  |
| **Branding**            | `brand-identity`             | `agent-brand-strategist`        | -                                                  |
| **Visual Design**       | `graphic-design`             | `agent-graphic-designer`        | -                                                  |
| **Video/Film**          | `video-production`           | `agent-video-producer`          | -                                                  |
| **Audio**               | `audio-production`           | `agent-audio-engineer`          | -                                                  |
| **Animation**           | `ui-animation`               | `agent-motion-designer`         | -                                                  |
| **Context Engineering** | -                            | -                         | neolab-context-kit, muratcankoylan-agent-skills    |
| **Planning/Files**      | -                            | -                         | othmanadi-planning                     |
| **Microservices**       | `microservices-architecture` | `agent-microservices-architect` | -                                                  |
| **Real-time**           | `websockets-realtime`        | `agent-realtime-specialist`     | -                                                  |
| **i18n**                | `i18n-localization`          | `agent-i18n-specialist`         | -                                                  |
| **Game Dev**            | `game-development`           | `agent-game-developer`          | -                                                  |
| **General/Templates**   | -                            | -                         | davila7-templates, athola-night-market |

---

## Example Recommendations

### Problem: "My React app is slow"

**Primary:** `generic-react-code-reviewer`
**Agent:** `performance-optimizer` (Agent tool)
**Supporting:** Check for unnecessary re-renders, bundle size
**Marketplace:** Check wshobson-agents for react-performance

### Problem: "Build a Vue 3 dashboard with Pinia"

**Primary:** `Skill(vue-development)`
**Supporting:** `generic-design-system` for UI patterns
**Route:** May need GSD for complex multi-phase work

### Problem: "Create a Svelte 5 app with runes"

**Primary:** `Skill(svelte-development)`
**Supporting:** `frontend-enhancer` for UI patterns
**Focus:** Use $state, $derived, $effect for reactivity

### Problem: "Analyze this protein sequence"

**Primary:** None local - use marketplace
**Marketplace:** `claude-scientific-skills` (proteomics, bioinformatics)
**Route:** Direct execution with WebSearch for latest methods

### Problem: "Design a REST API for users"

**Primary:** `Skill(api-design)`
**Supporting:** `Skill(database-expert)`, `Skill(security)`
**Agent:** `Skill(agent-api-designer)`
**Decision:** first-principles framework from `decision-frameworks.md` for API style

### Problem: "Set up CI/CD for my project"

**Primary:** `Skill(devops-cloud)`
**Agent:** `devops-engineer` (Agent tool)
**Marketplace:** voltagent-subagents has CI/CD specialists
**Route:** Consider `/gsd-core:new-project` for multi-step setup

---

## Complexity Routing

After identifying skills, determine execution route:

| Complexity   | Route              | Criteria                                           |
| ------------ | ------------------ | -------------------------------------------------- |
| High (3+)    | `/gsd-core:new-project` | Multi-phase, architecture decisions, 3+ file types |
| Medium (1-2) | `EnterPlanMode`    | Single feature, some planning needed               |
| Low (0)      | Direct execution   | Single file, clear task, immediate                 |

---

## After Recommendation

Once skills are identified:

1. Load primary skill: `Skill(name)`
2. Use `/start-task` for intelligent routing (recommended)
3. Or invoke a core agent directly via the Agent tool, or an `agent-<name>` skill via the Skill tool
4. For scientific work, check marketplace skills first

---

## Reference

- **Domain routing logic:** `~/.claude/skills/toolkit-router/routes/domains-*.md`
- **Full skill catalog:** `~/.claude/skills/MASTER_INDEX.md`
- **Marketplace plugins:** `~/.claude/plugins/marketplaces/`

---

_Intelligent skill discovery across local skills and marketplaces (current counts: `~/.claude/INDEX.md`)_

