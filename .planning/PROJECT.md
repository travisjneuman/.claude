# Project: Universal Intelligent Router & Documentation Overhaul

## Summary

Transform `/start-task.md` into a comprehensive universal router that automatically leverages ALL available resources (15 marketplaces, 69 skills, 37 agents, research capabilities, memory, scientific tools) based on natural language input. Update all documentation to reflect current state.

## Core Requirements

1. **All-Encompassing Router** - /start-task.md handles ANY prompt type:
   - Development (coding, debugging, testing, deployment)
   - Scientific (bioinformatics, chemistry, physics, research)
   - Business (strategy, marketing, finance, operations)
   - Creative (design, video, audio, branding)
   - Decisions (comparisons, trade-offs, prioritization)
   - Meta (creating skills, hooks, commands, agents)
   - Admin (commits, PRs, status checks)
   - Exploration (understanding codebases, research)

2. **Automatic Resource Loading** - Detect and load relevant:
   - Local skills (69)
   - Local agents (37)
   - Marketplace plugins (15)
   - Scientific skills (125+ from K-Dense)
   - Research tools (WebSearch, WebFetch)
   - Memory system (claude-mem)
   - Skill generation (skill-seekers)

3. **Intelligent Routing** - Based on complexity:
   - GSD for multi-phase projects
   - EnterPlanMode for medium complexity
   - Direct execution for simple tasks

4. **Documentation Accuracy** - All files reflect:
   - 69 local skills
   - 37 local agents
   - 15 marketplaces
   - Current capabilities

## Constraints

- Token efficiency: start-task.md should be comprehensive but not bloated
- Backward compatibility: Existing workflows still work
- Natural language: No special keywords required
- Automatic: Resources load without user specifying them

## Success Criteria

1. Any prompt routes to optimal resources automatically
2. Scientific domains detected and routed to scientific skills
3. Research-heavy tasks trigger WebSearch
4. Complex projects trigger GSD
5. Documentation accurate across all files

## Affected Files

### P0 (Critical)
- `commands/start-task.md` - Complete rewrite

### P1 (High)
- `CLAUDE.md` - Update counts (15 marketplaces)
- `README.md` - Update counts + add marketplace section

### P2 (Medium)
- `skills/README.md` - Update to 69 skills
- `skills/MASTER_INDEX.md` - Update to 69 skills + marketplace reference
- `docs/README.md` - Add marketplace documentation

## Resources Available

### Marketplaces (15)
| Marketplace | Key Capabilities |
|-------------|------------------|
| anthropic-agent-skills | Document skills, examples |
| awesome-claude-skills | 27 skills: canvas, forensics, invoices |
| claude-code-plugins | PR review, commits, feature dev |
| claude-code-plugins-plus-skills | 258 plugins, 185 skills |
| claude-plugins-official | External plugins |
| get-shit-done | GSD project management |
| mhattingpete-skills | Git, testing, code review |
| obra-superpowers | /brainstorm, /write-plan |
| skillsforge | 29 curated skills |
| taches-cc-resources | Decision frameworks, meta-prompting |
| voltagent-subagents | 100+ specialized agents |
| wshobson-agents | 99 agents, 107 skills |
| claude-mem | Persistent memory, semantic search |
| skill-seekers | Auto-generate skills from docs |
| claude-scientific-skills | 125+ scientific skills |

### Local Resources
- 69 skills across all domains
- 37 specialized agents
- GSD command suite
- Decision frameworks

### Built-in Capabilities
- WebSearch: Current information lookup
- WebFetch: Documentation fetching
- Task: Subagent spawning
- TodoWrite: Progress tracking
- EnterPlanMode: Approval-gated planning
