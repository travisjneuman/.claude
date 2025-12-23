---
description: Browse available skills by domain or list all skills
arguments:
  - name: domain
    description: "Optional domain filter: frontend, backend, devops, design, business, testing, etc."
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

Display categorized skill overview:

---

## Local Skills (65 total)

### Frontend & UI
- `frontend-enhancer` - Modern UI enhancement patterns
- `ui-research` - UI/UX research and patterns
- `ui-animation` - Animation and motion design
- `generic-react-*` - React-specific patterns (4 variants)
- `generic-static-*` - Static site patterns (4 variants)

### Backend & Systems
- `api-design` - REST/GraphQL API patterns
- `database-expert` - Schema and query optimization
- `devops-cloud` - CI/CD and infrastructure
- `graphql-expert` - GraphQL schema design
- `microservices-architecture` - Distributed systems
- `websockets-realtime` - Real-time communication

### Quality & Testing
- `generic-code-reviewer` - Code review patterns
- `test-specialist` - Testing strategies
- `tdd-workflow` - Test-driven development
- `debug-systematic` - 4-phase debugging
- `tech-debt-analyzer` - Code health analysis

### Platform Development
- `ios-development` - Swift, SwiftUI, Apple platforms
- `android-development` - Kotlin, Jetpack Compose
- `react-native` - Cross-platform mobile
- `flutter-development` - Dart, Flutter
- `electron-desktop` - Desktop apps
- `game-development` - Unity, Unreal, Godot
- `pwa-development` - Progressive web apps

### Business & Strategy (17 skills)
- `startup-launch`, `business-strategy`, `finance`
- `monetization-strategy`, `product-management`
- `leadership`, `hr-talent`, `marketing`, `sales`
- And more...

### AI/ML & Data
- `ai-ml-development` - PyTorch, TensorFlow, LLMs
- `data-science` - Analytics and ML pipelines

### Documentation
- `codebase-documenter` - Code documentation
- `document-skills` - Office format handling (docx, pdf, pptx, xlsx)

---

## Marketplace Skills (550+ total)

### claude-code-plugins-plus-skills (185 skills)
Production-ready skills across 18 domains.

### wshobson-agents (107 skills)
Progressive disclosure architecture skills.

### obra-superpowers (20+ skills)
Battle-tested: /brainstorm, /write-plan, /execute-plan

### voltagent-subagents (100+ agents)
Full-stack, DevOps, data science, business ops.

### mhattingpete-skills (10+ skills)
Git automation, testing, code review.

### skillsforge (29 skills)
Curated quality skills.

---

## Usage

Invoke any skill directly:
```
Skill(skill-name)
```

Or let `/start-task` auto-detect and load appropriate skills.

---

## Full Catalog

- Local: `~/.claude/skills/MASTER_INDEX.md`
- Marketplaces: Browse `~/.claude/plugins/marketplaces/*/`
