# Marketplace Guide

Complete reference for the 22 plugin marketplaces and how to use them.

**Last Updated:** January 2026 (v2.0)

**Location:** `~/.claude/plugins/marketplaces/`

---

## Quick Start

1. **Search for skills:** `find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -l "<keyword>"`
2. **Read discovered skill:** Use Read tool on the SKILL.md file
3. **Apply the guidance:** Follow the skill's patterns
4. **For commands:** Check marketplace README for slash commands

---

## Installed Marketplaces (22)

### Official (Anthropic)

| Marketplace | Contents | Key Features |
|-------------|----------|--------------|
| `anthropic-agent-skills` | Document skills, example skills | Official Anthropic patterns |
| `claude-code-plugins` | PR review, commit commands, feature dev | Core development plugins |
| `claude-plugins-official` | External plugins collection | Curated official plugins |

### Taches/GlitterCowboy

| Marketplace | Contents | Key Features |
|-------------|----------|--------------|
| `taches-cc-resources` | Meta-prompting, debugging, hooks, agents | Prompt engineering, skill creation |
| `get-shit-done` | Multi-phase project management | GSD system for complex projects |

### Community - Large Collections

| Marketplace | Contents | Key Features |
|-------------|----------|--------------|
| `claude-code-plugins-plus-skills` | 258 plugins, 185 skills | Production-ready, 18 domains |
| `wshobson-agents` | 99 agents, 107 skills, 15 orchestrators | Progressive disclosure architecture |
| `voltagent-subagents` | 100+ specialized agents | Full-stack, DevOps focus |
| `voltagent-awesome-claude-skills` | Awesome Claude skills collection | VoltAgent curation |
| `claude-scientific-skills` | 125+ scientific skills | Bioinformatics, chemistry, physics, proteomics |

### Community - Curated

| Marketplace | Contents | Key Features |
|-------------|----------|--------------|
| `awesome-claude-skills` | 27 skills | Documents, canvas, forensics, invoices |
| `skillsforge` | 29 curated skills | Quality-focused curation |
| `mhattingpete-skills` | Git automation, testing, code review | Development workflow |
| `obra-superpowers` | Battle-tested skills | /brainstorm, /write-plan, /execute-plan |

### Community - Collections

| Marketplace | Contents | Key Features |
|-------------|----------|--------------|
| `travisvn-awesome-claude-skills` | Curated skills, resources, tools | Broad coverage |
| `hesreallyhim-awesome-claude-code` | Slash-commands, CLAUDE.md files, CLI tools | CLI tooling focus |
| `alirezarezvani-claude-skills` | Skills + subagents | Mixed collection |
| `behisecc-awesome-claude-skills` | Categorized skills | Domain organization |
| `alvinunreal-awesome-claude` | Broader Claude resources | Resource compilation |

### Specialized

| Marketplace | Contents | Key Features |
|-------------|----------|--------------|
| `claude-mem` | Persistent memory, semantic search | Session continuity |
| `skill-seekers` | Auto-generate skills from docs/repos/PDFs | Skill creation tools |

### Autonomous Development

| Marketplace | Contents | Key Features |
|-------------|----------|--------------|
| `auto-claude` | Autonomous coding framework | Multi-agent development, QA validation, git worktrees, semantic memory |

---

## Key Commands by Marketplace

### taches-cc-resources

| Command | Purpose |
|---------|---------|
| `/taches-cc-resources:create-prompt` | Create optimized prompts |
| `/taches-cc-resources:create-meta-prompt` | Multi-stage prompt chains |
| `/taches-cc-resources:whats-next` | Intelligent next-step routing |
| `/taches-cc-resources:check-todos` | Review outstanding work |
| `/consider:first-principles` | First-principles decision framework |
| `/consider:eisenhower-matrix` | Priority matrix |
| `/consider:5-whys` | Root cause analysis |
| `/consider:pros-cons` | Trade-off evaluation |

### get-shit-done (GSD)

| Command | Purpose |
|---------|---------|
| `/gsd:new-project` | Initialize multi-phase project |
| `/gsd:progress` | Check status, get next action |
| `/gsd:plan-phase [n]` | Create phase execution plan |
| `/gsd:execute-plan` | Work through current plan |
| `/gsd:resume-work` | Restore session context |
| `/gsd:pause-work` | Save state before break |
| `/gsd:help` | Full command reference |

### obra-superpowers

| Command | Purpose |
|---------|---------|
| `/obra:brainstorm` | Structured brainstorming |
| `/obra:write-plan` | Create detailed plans |
| `/obra:execute-plan` | Execute a plan step-by-step |

### auto-claude

| Command | Purpose |
|---------|---------|
| `/auto-claude [description]` | Autonomous feature implementation with QA validation |

**Backend CLI:**
```bash
python ~/.claude/plugins/marketplaces/auto-claude/apps/backend/run.py
```

---

## Taches Skills (Load on Demand)

| Skill | Purpose | Invoke |
|-------|---------|--------|
| `debug-like-expert` | Systematic 4-phase debugging | `Skill(debug-like-expert)` |
| `create-meta-prompts` | Build prompt chains | `Skill(create-meta-prompts)` |
| `create-slash-commands` | Create custom commands | `Skill(create-slash-commands)` |
| `create-subagents` | Design specialized agents | `Skill(create-subagents)` |
| `create-hooks` | Build automation hooks | `Skill(create-hooks)` |

---

## Domain Quick Reference

| If working on... | Check these marketplaces |
|------------------|-------------------------|
| **Scientific/Research** | `claude-scientific-skills` (125+ skills) |
| **Full-stack development** | `wshobson-agents`, `voltagent-subagents` |
| **DevOps/Infrastructure** | `voltagent-subagents`, `claude-code-plugins-plus-skills` |
| **Documents/Office** | `awesome-claude-skills` |
| **Prompt engineering** | `taches-cc-resources` |
| **Git/Testing/Review** | `mhattingpete-skills` |
| **Project management** | `get-shit-done` |
| **Brainstorming/Planning** | `obra-superpowers` |
| **Autonomous coding** | `auto-claude` |

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

Example:
```
/discover-skills git automation
/discover-skills react hooks
/discover-skills database optimization
```

---

## Updating Marketplaces

```bash
# Update all marketplace submodules
cd ~/.claude
git submodule update --remote --merge

# Or use the update script
bash ~/.claude/scripts/update-external-repos.sh
```

All marketplaces are configured with `no_push` - read-only access.

---

## Related Documentation

- [WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md) - Workflow patterns
- [GSD-TUTORIAL.md](./GSD-TUTORIAL.md) - GSD system guide
- [../skills/MASTER_INDEX.md](../skills/MASTER_INDEX.md) - Local skills catalog
- [../CLAUDE.md](../CLAUDE.md) - Core rules

---

*22 marketplaces, 1,496+ skills, discovered proactively when domain expertise is needed.*
