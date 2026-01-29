# Marketplace Guide

Complete reference for the 50 plugin marketplaces and how to use them.

**Last Updated:** January 2026 (v2.2)

**Location:** `~/.claude/plugins/marketplaces/`

---

## Quick Start

1. **Search for skills:** `find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -l "<keyword>"`
2. **Read discovered skill:** Use Read tool on the SKILL.md file
3. **Apply the guidance:** Follow the skill's patterns
4. **For commands:** Check marketplace README for slash commands

---

## Installed Marketplaces (50)

### Official (Anthropic)

| Marketplace               | Contents                                | Key Features                |
| ------------------------- | --------------------------------------- | --------------------------- |
| `anthropic-agent-skills`  | Document skills, example skills         | Official Anthropic patterns |
| `anthropic-life-sciences` | Life sciences tools                     | Official scientific tools   |
| `claude-code-plugins`     | PR review, commit commands, feature dev | Core development plugins    |
| `claude-plugins-official` | External plugins collection             | Curated official plugins    |
| `vercel-agent-skills`     | Vercel deployment skills                | Vercel Labs official        |

### Taches/GlitterCowboy

| Marketplace           | Contents                                 | Key Features                       |
| --------------------- | ---------------------------------------- | ---------------------------------- |
| `taches-cc-resources` | Meta-prompting, debugging, hooks, agents | Prompt engineering, skill creation |
| `get-shit-done`       | Multi-phase project management           | GSD system for complex projects    |

### Large Collections

| Marketplace                | Contents                                 | Key Features                                   |
| -------------------------- | ---------------------------------------- | ---------------------------------------------- |
| `wshobson-agents`          | 108 agents, 129 skills, 15 orchestrators | Progressive disclosure architecture            |
| `voltagent-subagents`      | 126+ specialized agents                  | Full-stack, DevOps focus                       |
| `claude-scientific-skills` | 144 scientific skills                    | Bioinformatics, chemistry, physics, proteomics |
| `davila7-templates`        | 651 templates                            | Broad template coverage                        |
| `madappgang-claude-code`   | 110 resources                            | Full-stack development                         |
| `athola-night-market`      | 125 skills                               | Curated night market                           |

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

### Development-Focused

| Marketplace               | Contents            | Key Features             |
| ------------------------- | ------------------- | ------------------------ |
| `buildwithclaude`         | 43 resources        | Full-stack development   |
| `sivalabs-marketplace`    | Java/Spring skills  | JVM ecosystem            |
| `gmickel-marketplace`     | General development | Mixed development tools  |
| `devgom-marketplace`      | Development tools   | Dev marketplace          |
| `henkisdabro-marketplace` | Development tools   | Claude Code marketplace  |
| `p47phoenix-plugins`      | Plugins collection  | Claude plugins           |
| `sawyerhood-mart`         | Development tools   | Sawyer's mart            |
| `numman-ali-openskills`   | Open skills         | Open source skills       |
| `numman-ali-skills`       | N-skills            | Additional skills        |
| `zai-coding-plugins`      | Coding plugins      | Zai organization         |
| `piebald-lsps`            | LSP integrations    | Language Server Protocol |

### Language/Framework Specific

| Marketplace              | Contents | Key Features        |
| ------------------------ | -------- | ------------------- |
| `bradleygolden-elixir`   | 4 skills | Elixir/Phoenix      |
| `georgeguimaraes-elixir` | 6 skills | Elixir ecosystem    |
| `kfly8-cpan-plugins`     | 3 skills | Perl/CPAN           |
| `hashi-terraform-skills` | 4 skills | HashiCorp/Terraform |

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

| If working on...           | Check these marketplaces                                                              |
| -------------------------- | ------------------------------------------------------------------------------------- |
| **Scientific/Research**    | `claude-scientific-skills` (144), `anthropic-life-sciences`, `gqy20-biology-plugins`  |
| **Full-stack development** | `wshobson-agents`, `voltagent-subagents`, `buildwithclaude`, `madappgang-claude-code` |
| **DevOps/Infrastructure**  | `voltagent-subagents`, `diet103-infrastructure`, `hashi-terraform-skills`             |
| **Security**               | `trailofbits-skills` (50 skills)                                                      |
| **Documents/Office**       | `awesome-claude-skills`                                                               |
| **Prompt engineering**     | `taches-cc-resources`                                                                 |
| **Git/Testing/Review**     | `mhattingpete-skills`                                                                 |
| **Project management**     | `get-shit-done`                                                                       |
| **Brainstorming/Planning** | `obra-superpowers`, `othmanadi-planning`                                              |
| **Autonomous coding**      | `auto-claude`                                                                         |
| **Templates**              | `davila7-templates` (651), `athola-night-market` (125)                                |
| **SAP/Enterprise**         | `secondsky-sap-skills` (33)                                                           |
| **Elixir**                 | `bradleygolden-elixir`, `georgeguimaraes-elixir`                                      |
| **Finance/Equity**         | `quant-equity-research`                                                               |
| **Worldbuilding/Creative** | `worldbuilding-skills` (52), `mojito-freeship-skills`                                 |
| **Context Engineering**    | `neolab-context-kit`, `muratcankoylan-agent-skills`                                   |

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

_56 marketplaces, 4,600+ skills, discovered proactively when domain expertise is needed._
