---
name: toolkit-router
description: Find the right skill, agent, command, rule, checklist, or marketplace skill in this ~/.claude toolkit for the current task. Use when a task falls in a specialized domain (mobile, security, data/ML, infra, business, creative, research) and no listed skill obviously fits, or when asked what the toolkit offers.
---

# Toolkit router

Most of this toolkit's skills and commands are listed to you by name only, to keep context small. They are all installed and invocable. This skill is how you find them.

## Procedure

1. **Search the index, don't read it whole.** `~/.claude/INDEX.md` is grouped by domain; grep it for the task's keywords and read only the matching section:
   `rg -n -i "<keyword>" ~/.claude/INDEX.md`
   For relationships (which agent pairs with a skill, which rule or checklist applies), query `~/.claude/index/graph.json`.
2. **Pick at most one primary skill plus one specialist.** Invoke with the Skill tool (or `/name`). Specialist agents are skills named `agent-<name>` that run in their own subagent: invoke them with the task as the argument when the work benefits from a separate context (broad research, independent review, a language/framework expert).
3. **Apply matching rules and checklists** listed in the index row (`rules/*.md`, `docs/reference/**`). Path-scoped rules load automatically when you read matching files.
4. **Nothing local fits:** search the marketplace catalog (present once marketplaces have been pulled):
   `rg -i "<keyword>" ~/.claude/index/marketplace-catalog.json | head -20`
   Read the chosen marketplace `SKILL.md` directly from `~/.claude/plugins/marketplaces/…` and follow it.
5. **Still nothing:** proceed with general knowledge. Do not invent skill names.

## Domain routes

For multi-domain or ambiguous requests, the route files in `routes/` map intents to resources:

| Route | File |
| --- | --- |
| Development (web, mobile, backend, infra) | `routes/domains-development.md` |
| Business & product | `routes/domains-business.md` |
| Creative & content | `routes/domains-creative.md` |
| Scientific & research | `routes/domains-scientific.md` |
| Toolkit / meta | `routes/domains-meta.md` |
| Decisions & trade-offs | `routes/decision-frameworks.md` |
| Complexity scoring | `routes/routing-logic.md` |

## Keeping the index current

The index is generated. After adding or changing skills, agents, commands, rules, or marketplaces run `node ~/.claude/scripts/generate-index.mjs --write` (the pre-commit hook does this automatically). Promote a skill to full-description "core" by adding it to `index/tiers.json`.
