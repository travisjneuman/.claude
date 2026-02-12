---
name: Marketplace Guide
description: Browse, install, and manage 84 community plugin marketplaces with 5,300+ additional skills.
category: ecosystem
---

# Marketplace Guide

Complete reference for the 84 plugin marketplaces and how to use them.

**Last Updated:** February 2026 (v2.6.0)

**Location:** `~/.claude/plugins/marketplaces/`

---

## Quick Start

1. **Search for skills:** `find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -l "<keyword>"`
2. **Read discovered skill:** Use Read tool on the SKILL.md file
3. **Apply the guidance:** Follow the skill's patterns
4. **For commands:** Check marketplace README for slash commands

---

## Installed Marketplaces (84)

### Official (Anthropic)

| Marketplace               | Contents                                | Key Features                   |
| ------------------------- | --------------------------------------- | ------------------------------ |
| `anthropic-agent-skills`  | Document skills, example skills         | Official Anthropic patterns    |
| `anthropic-life-sciences` | Life sciences tools                     | Official scientific tools      |
| `claude-code-plugins`     | PR review, commit commands, feature dev | Core development plugins       |
| `claude-plugins-official` | External plugins collection             | Curated official plugins       |
| `vercel-agent-skills`     | Vercel deployment skills                | Vercel Labs official           |
| `expo-skills`             | Expo app design, deployment, upgrading  | Official Expo team (815 stars) |

### Taches/GlitterCowboy

| Marketplace           | Contents                                 | Key Features                       |
| --------------------- | ---------------------------------------- | ---------------------------------- |
| `taches-cc-resources` | Meta-prompting, debugging, hooks, agents | Prompt engineering, skill creation |
| `get-shit-done`       | Multi-phase project management           | GSD system for complex projects    |

### Large Collections

| Marketplace                          | Contents                                | Key Features                                    |
| ------------------------------------ | --------------------------------------- | ----------------------------------------------- |
| `wshobson-agents`                    | 36 agents, 129 skills, 15 orchestrators | Progressive disclosure architecture             |
| `voltagent-subagents`                | 126+ specialized agents                 | Full-stack, DevOps focus                        |
| `claude-scientific-skills`           | 144 scientific skills                   | Bioinformatics, chemistry, physics, proteomics  |
| `davila7-templates`                  | 651 templates                           | Broad template coverage                         |
| `madappgang-claude-code`             | 110 resources                           | Full-stack development                          |
| `athola-night-market`                | 125 skills                              | Curated night market                            |
| `voltagent-agent-skills`             | 200+ official dev team skills           | Stripe, Cloudflare, Sentry, HuggingFace, Expo  |
| `kivilaid-marketplace`               | 87 plugins from 10+ sources             | Aggregated plugin marketplace                   |
| `behisecc-awesome-claude-skills`     | 100+ skills across domains              | Docs, dev tools, data, scientific, media, health |
| `rohitg00-claude-code-toolkit`       | 35 skills + 135 agents                  | Comprehensive toolkit across 10 categories      |
| `rshah515-claude-code-subagents`     | 165+ subagents                          | Full SDLC coverage: languages, frameworks, infra |
| `jeffallan-claude-skills`            | 66 skills + 9 commands                  | 12 categories: languages, frameworks, security  |
| `lodetomasi-agents-claude-code`      | 100 agents                              | Frontend, backend, cloud, data, testing, security |
| `manutej-luxor-marketplace`          | 67 skills + 28 commands + 30 agents     | DevOps, Testing, Full-stack, 10 plugins         |
| `zircote-dot-claude`                 | 100+ agents + 60+ skills + commands     | Multi-domain agents, Opus 4.5 optimized         |

### Curated Collections

| Marketplace                    | Contents                               | Key Features                            |
| ------------------------------ | -------------------------------------- | --------------------------------------- |
| `awesome-claude-skills`        | Documents, canvas, forensics, invoices | ComposioHQ curation                     |
| `skillsforge`                  | 29 curated skills                      | Quality-focused curation                |
| `mhattingpete-skills`          | Git automation, testing, code review   | Development workflow                    |
| `obra-superpowers`             | Battle-tested skills                   | /brainstorm, /write-plan, /execute-plan |
| `alirezarezvani-claude-skills` | Skills + subagents                     | Mixed collection                        |
| `affaan-everything-claude`     | Everything Claude resources            | Comprehensive collection                |
| `chat2anyllm-awesome-plugins`  | Awesome plugins                        | Chat2AnyLLM curation                    |
| `hesreallyhim-awesome`         | Curated awesome list (18.2k stars)     | Comprehensive Claude Code directory     |
| `travisvn-awesome`             | Curated skills list                    | Awesome Claude Skills reference         |
| `quemsah-awesome`              | 3,979 repos indexed                    | Plugin adoption metrics                 |
| `karanb192-awesome-claude-skills` | 50+ skills                          | TDD, debugging, git workflows, doc processing |

### Development-Focused

| Marketplace               | Contents               | Key Features                             |
| ------------------------- | ---------------------- | ---------------------------------------- |
| `buildwithclaude`         | 43 resources           | Full-stack development                   |
| `sivalabs-marketplace`    | Java/Spring skills     | JVM ecosystem                            |
| `gmickel-marketplace`     | General development    | Mixed development tools                  |
| `devgom-marketplace`      | Development tools      | Dev marketplace                          |
| `henkisdabro-marketplace` | Development tools      | Claude Code marketplace                  |
| `p47phoenix-plugins`      | Plugins collection     | Claude plugins                           |
| `sawyerhood-mart`         | Development tools      | Sawyer's mart                            |
| `numman-ali-openskills`   | Open skills            | Open source skills                       |
| `numman-ali-skills`       | N-skills               | Additional skills                        |
| `zai-coding-plugins`      | Coding plugins         | Zai organization                         |
| `piebald-lsps`            | LSP integrations       | Language Server Protocol                 |
| `daymade-skills`          | Production skills      | Dev workflow marketplace                 |
| `DustyWalker-marketplace` | 16 production agents   | Code review, security, testing agents    |
| `ykdojo-tips`             | dx plugin, 45 tips     | GHA analysis, handoff, DX workflow       |
| `EveryInc-compound`       | Compound engineering   | 100+ framework support, pragmatic agents |
| `giuseppe-developer-kit`  | Multi-language skills   | Java, TypeScript, Python, PHP, AWS       |
| `levnikolaevich-claude-code-skills` | SDLC workflow skills | Research, planning, implementation, quality gates |
| `mrgoonie-claudekit-skills` | 40+ skills           | Cloud/DevOps, Cloudflare, Docker, Stripe, Three.js |
| `chriswiles-claude-code-showcase` | Skills + agents + hooks | Code-reviewer agent, JIRA integration, GitHub Actions |

### Language/Framework Specific

| Marketplace              | Contents  | Key Features                               |
| ------------------------ | --------- | ------------------------------------------ |
| `bradleygolden-elixir`   | 4 skills  | Elixir/Phoenix                             |
| `georgeguimaraes-elixir` | 6 skills  | Elixir ecosystem                           |
| `kfly8-cpan-plugins`     | 3 skills  | Perl/CPAN                                  |
| `hashi-terraform-skills` | 4 skills  | HashiCorp/Terraform                        |
| `expo-skills`            | 3 plugins | Expo/React Native (official)               |
| `akin-ozer-devops`                   | 31 skills | DevOps (K8s, Terraform, CI/CD, monitoring)                       |
| `aaronontheweb-dotnet-skills`        | ~30 skills | .NET/C#: Akka.NET, EF Core, ASP.NET, testing                   |
| `onmax-nuxt-skills`                  | 18 skills  | Vue 3, Nuxt 4+, NuxtHub, Vitest, Vite (auto-maintained)        |
| `actionbook-rust-skills`             | 31+ skills | Rust: 3-layer meta-cognition, 400+ hook patterns                |
| `interstellar-code-claud-skills`     | 14 agents + 11 skills | JS, TS, PHP, Laravel, React, Python (61-88% token savings) |
| `ahmedasmar-devops-skills`           | 6 modules  | DevOps: Terraform, K8s troubleshooting, AWS cost, GitOps        |

### SDLC & Project Management

| Marketplace          | Contents                             | Key Features                                |
| -------------------- | ------------------------------------ | ------------------------------------------- |
| `scopecraft-command` | Comprehensive SDLC commands          | Feature, bug, planning, release workflows   |
| `danielscholl-sdlc`  | SDLC automation + GitHub webhooks    | Feature/bug/chore specs, webhook automation |
| `automazeio-ccpm`    | Project management via GitHub Issues | PRD → Epic → Task pipeline, parallel agents |

### Scientific/Research

| Marketplace                | Contents        | Key Features                    |
| -------------------------- | --------------- | ------------------------------- |
| `claude-scientific-skills` | 144 skills      | Broad scientific coverage       |
| `anthropic-life-sciences`  | 6 skills        | Official life sciences          |
| `gqy20-biology-plugins`    | Biology plugins | Evolutionary biology, genomics  |
| `quant-equity-research`    | Equity research | Financial quantitative analysis |

### Specialized

| Marketplace                 | Contents                                  | Key Features                                          |
| --------------------------- | ----------------------------------------- | ----------------------------------------------------- |
| `claude-mem`                | Persistent memory, semantic search        | Session continuity                                    |
| `skill-seekers`             | Auto-generate skills from docs/repos/PDFs | Skill creation tools                                  |
| `secondsky-sap-skills`      | 33 SAP skills                             | Enterprise SAP                                        |
| `trailofbits-skills`        | 50 security skills                        | Professional security auditing                        |
| `diet103-infrastructure`    | 5 infrastructure skills                   | Infrastructure patterns                               |
| `worldbuilding-skills`      | 52 worldbuilding skills                   | Creative worldbuilding, narrative                     |
| `mojito-freeship-skills`    | 4 film/AIGC skills                        | AI-generated film production                          |
| `mvanhorn-last30days-skill` | 1 research skill                          | Research any topic from last 30 days (Reddit, X, web) |
| `ananddtyagi-marketplace`   | CC marketplace                            | Community marketplace                                 |
| `disler-hooks-mastery`      | All 13 hook types + agents + commands     | Hook reference implementation, TTS, Python hooks      |

### Context Engineering & Planning

| Marketplace                   | Contents           | Key Features                 |
| ----------------------------- | ------------------ | ---------------------------- |
| `neolab-context-kit`          | 11 context skills  | Context engineering patterns |
| `muratcankoylan-agent-skills` | 19 agent skills    | Agent/context patterns       |
| `othmanadi-planning`          | 12 planning skills | File-based planning          |

### Autonomous Development

| Marketplace   | Contents                    | Key Features                                                           |
| ------------- | --------------------------- | ---------------------------------------------------------------------- |
| `auto-claude` | Autonomous coding framework | Multi-agent development, QA validation, git worktrees, semantic memory |

---

## Key Commands by Marketplace

### taches-cc-resources

| Command                                   | Purpose                             |
| ----------------------------------------- | ----------------------------------- |
| `/taches-cc-resources:create-prompt`      | Create optimized prompts            |
| `/taches-cc-resources:create-meta-prompt` | Multi-stage prompt chains           |
| `/taches-cc-resources:whats-next`         | Intelligent next-step routing       |
| `/taches-cc-resources:check-todos`        | Review outstanding work             |
| `/taches-cc-resources:debug`              | Expert debugging methodology        |
| `/consider:first-principles`              | First-principles decision framework |
| `/consider:eisenhower-matrix`             | Priority matrix                     |
| `/consider:5-whys`                        | Root cause analysis                 |
| `/consider:swot`                          | Trade-off evaluation (SWOT)         |

### get-shit-done (GSD)

| Command               | Purpose                        |
| --------------------- | ------------------------------ |
| `/gsd:new-project`    | Initialize multi-phase project |
| `/gsd:progress`       | Check status, get next action  |
| `/gsd:plan-phase [n]` | Create phase execution plan    |
| `/gsd:execute-plan`   | Work through current plan      |
| `/gsd:resume-work`    | Restore session context        |
| `/gsd:pause-work`     | Save state before break        |
| `/gsd:help`           | Full command reference         |

### obra-superpowers

| Command              | Purpose                     |
| -------------------- | --------------------------- |
| `/obra:brainstorm`   | Structured brainstorming    |
| `/obra:write-plan`   | Create detailed plans       |
| `/obra:execute-plan` | Execute a plan step-by-step |

### auto-claude

| Command                      | Purpose                                              |
| ---------------------------- | ---------------------------------------------------- |
| `/auto-claude [description]` | Autonomous feature implementation with QA validation |

---

## Domain Quick Reference

| If working on...           | Check these marketplaces                                                                                          |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Scientific/Research**    | `claude-scientific-skills` (144), `anthropic-life-sciences`, `gqy20-biology-plugins`                              |
| **Full-stack development** | `wshobson-agents`, `voltagent-subagents`, `buildwithclaude`, `madappgang-claude-code`, `giuseppe-developer-kit`   |
| **DevOps/Infrastructure**  | `voltagent-subagents`, `diet103-infrastructure`, `hashi-terraform-skills`, `akin-ozer-devops`, `ahmedasmar-devops-skills` |
| **Security**               | `trailofbits-skills` (50 skills)                                                                                  |
| **Documents/Office**       | `awesome-claude-skills`                                                                                           |
| **Prompt engineering**     | `taches-cc-resources`                                                                                             |
| **Git/Testing/Review**     | `mhattingpete-skills`, `karanb192-awesome-claude-skills`                                                          |
| **Project management**     | `get-shit-done`, `automazeio-ccpm`, `scopecraft-command`                                                          |
| **SDLC/Automation**        | `danielscholl-sdlc`, `scopecraft-command`, `EveryInc-compound`, `levnikolaevich-claude-code-skills`               |
| **Brainstorming/Planning** | `obra-superpowers`, `othmanadi-planning`                                                                          |
| **Autonomous coding**      | `auto-claude`                                                                                                     |
| **Expo/React Native**      | `expo-skills` (official)                                                                                          |
| **Templates**              | `davila7-templates` (651), `athola-night-market` (125)                                                            |
| **SAP/Enterprise**         | `secondsky-sap-skills` (33)                                                                                       |
| **Elixir**                 | `bradleygolden-elixir`, `georgeguimaraes-elixir`                                                                  |
| **.NET/C#**                | `aaronontheweb-dotnet-skills` (~30 skills)                                                                        |
| **Rust**                   | `actionbook-rust-skills` (31+ skills)                                                                             |
| **Vue/Nuxt**               | `onmax-nuxt-skills` (18 skills)                                                                                   |
| **Hooks/Reference**        | `disler-hooks-mastery` (all 13 hook types)                                                                        |
| **Finance/Equity**         | `quant-equity-research`                                                                                           |
| **Worldbuilding/Creative** | `worldbuilding-skills` (52), `mojito-freeship-skills`                                                             |
| **Context Engineering**    | `neolab-context-kit`, `muratcankoylan-agent-skills`                                                               |

---

## How to Search Marketplaces

### Find skills by keyword

```bash
find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -l "react"
find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -l "database"
find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -l "testing"
```

### Find commands

```bash
find ~/.claude/plugins/marketplaces -name "*.md" -path "*/commands/*" | head -20
```

### Find agents

```bash
find ~/.claude/plugins/marketplaces -name "*.md" -path "*/agents/*" | head -20
```

---

## External Discovery

### skillsmp.com

Search 35,530+ community skills:

```
/discover-skills <query>
```

---

## Updating Marketplaces

```bash
# Use the pull-repos command
/pull-repos

# Or use the update script
bash ~/.claude/scripts/update-external-repos.sh

# Or manually
cd ~/.claude && git submodule update --remote --merge
```

All marketplaces are configured with `no_push` - read-only access.

---

## Related Documentation

- [WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md) - Workflow patterns
- [GSD-TUTORIAL.md](./GSD-TUTORIAL.md) - GSD system guide
- [../skills/MASTER_INDEX.md](../skills/MASTER_INDEX.md) - Local skills catalog
- [../CLAUDE.md](../CLAUDE.md) - Core rules

---

_84 marketplaces, 5,300+ skills, discovered proactively when domain expertise is needed._
