---
description: AI-powered skill recommendation based on your problem description - finds optimal resources from 71 local skills + 21 marketplaces (1,496+ skills)
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

| Category | Indicators |
|----------|------------|
| **Build/Create** | "build", "create", "implement", "add", "new", "develop" |
| **Fix/Debug** | "fix", "debug", "error", "broken", "not working", "crash" |
| **Optimize** | "slow", "performance", "improve", "optimize", "speed up" |
| **Review/Quality** | "review", "check", "quality", "audit", "security" |
| **Design/Plan** | "design", "architecture", "plan", "structure", "how should" |
| **Learn/Explore** | "understand", "how does", "explain", "explore", "what is" |
| **Research** | "latest", "best way", "recommended", "compare", "vs" |

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
Specialized agents via Task tool.

#### Marketplace Resources
Skills from 21 marketplace repositories in `~/.claude/plugins/marketplaces/`.

#### Decision Frameworks (if applicable)
- `/consider:first-principles` - Technical choices
- `/consider:eisenhower-matrix` - Prioritization
- `/consider:5-whys` - Root cause analysis
- `/consider:pros-cons` - Trade-off evaluation

---

## Quick Match Reference

| If problem involves... | Primary Skill | Agent | Marketplace |
|------------------------|---------------|-------|-------------|
| **Frontend/React** | `generic-react-*` | `react-expert` | wshobson-agents |
| **Vue.js** | `vue-development` | - | - |
| **Svelte** | `svelte-development` | - | - |
| **API/backend** | `api-design` | `api-designer` | - |
| **Database** | `database-expert` | `database-architect` | - |
| **GraphQL** | `graphql-expert` | `graphql-architect` | - |
| **iOS** | `ios-development` | `ios-developer` | - |
| **Android** | `android-development` | `android-developer` | - |
| **React Native** | `react-native` | `mobile-architect` | - |
| **Flutter** | `flutter-development` | `mobile-architect` | - |
| **Desktop** | `electron-desktop` | `desktop-developer` | - |
| **DevOps** | `devops-cloud` | `devops-specialist` | voltagent |
| **Testing** | `test-specialist` | `test-generator` | mhattingpete |
| **Performance** | - | `performance-optimizer` | - |
| **Security** | `security` | `security-auditor` | - |
| **Debugging** | `debug-systematic` | `debugging-specialist` | - |
| **Documentation** | `codebase-documenter` | `documentation-writer` | - |
| **Bioinformatics** | - | - | claude-scientific-skills |
| **Chemistry** | - | - | claude-scientific-skills |
| **Physics** | - | - | claude-scientific-skills |
| **Proteomics** | - | - | claude-scientific-skills |
| **AI/ML** | `ai-ml-development` | `ml-engineer` | - |
| **Data Science** | `data-science` | - | - |
| **Startup** | `startup-launch` | `startup-advisor` | - |
| **Pricing** | `monetization-strategy` | `monetization-expert` | - |
| **Marketing** | `marketing` | - | - |
| **Finance** | `finance` | - | - |
| **Branding** | `brand-identity` | `brand-strategist` | - |
| **Visual Design** | `graphic-design` | `graphic-designer` | - |
| **Video** | `video-production` | `video-producer` | - |
| **Audio** | `audio-production` | `audio-engineer` | - |
| **Animation** | `ui-animation` | `motion-designer` | - |
| **Microservices** | `microservices-architecture` | `microservices-architect` | - |
| **Real-time** | `websockets-realtime` | `realtime-specialist` | - |
| **i18n** | `i18n-localization` | `i18n-specialist` | - |
| **Game Dev** | `game-development` | `game-developer` | - |

---

## Example Recommendations

### Problem: "My React app is slow"
**Primary:** `generic-react-code-reviewer`
**Agent:** `Task(performance-optimizer)`
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
**Agent:** `Task(api-designer)`
**Decision:** `/consider:first-principles` for API style

### Problem: "Set up CI/CD for my project"
**Primary:** `Skill(devops-cloud)`
**Agent:** `Task(devops-specialist)`
**Marketplace:** voltagent-subagents has CI/CD specialists
**Route:** Consider `/gsd:new-project` for multi-step setup

---

## Complexity Routing

After identifying skills, determine execution route:

| Complexity | Route | Criteria |
|------------|-------|----------|
| High (3+) | `/gsd:new-project` | Multi-phase, architecture decisions, 3+ file types |
| Medium (1-2) | `EnterPlanMode` | Single feature, some planning needed |
| Low (0) | Direct execution | Single file, clear task, immediate |

---

## After Recommendation

Once skills are identified:
1. Load primary skill: `Skill(name)`
2. Use `/start-task` for intelligent routing (recommended)
3. Or invoke agent directly via Task tool
4. For scientific work, check marketplace skills first

---

## Reference

- **Domain routing logic:** `~/.claude/commands/router/domains-*.md`
- **Full skill catalog:** `~/.claude/skills/MASTER_INDEX.md`
- **Marketplace plugins:** `~/.claude/plugins/marketplaces/`

---

*Intelligent skill discovery across 71 local skills + 21 marketplaces (1,496+ skills)*
