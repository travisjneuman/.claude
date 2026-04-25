# Skill Creation Guide

> Step-by-step guide for adding a new local skill to `~/.claude/skills/`. Pairs with the [skill template](../templates/skill-template.md) (which is the file structure you copy from) and the [Skills overview](./SKILLS.md) (which explains the system itself).

This guide answers:

- **When** to add a skill (vs. use a marketplace skill, a rule, an agent, or do nothing).
- **How** Claude Code auto-activates skills, so you can write descriptions that route correctly.
- **What** the structure looks like and where each piece lives.
- **How** to register, test, and maintain the skill after creation.

If you came here looking for the file template, jump straight to `~/.claude/templates/skill-template.md` and skim the "Best Practices" sections at the bottom of this guide.

---

## When to Add a Skill

Local skills are domain-knowledge modules that Claude loads on demand. Use them for:

- **Recurring expertise** that you reach for across multiple projects (e.g., `react-native`, `application-security`, `ai-ml-development`).
- **Opinionated patterns** specific to your workflow that the broader marketplace doesn't capture.
- **Reference material** that benefits from auto-loading on keyword match.

Don't add a skill when:

| Situation                                                  | Better fit                                                              |
| :--------------------------------------------------------- | :---------------------------------------------------------------------- |
| You need a one-off prompt for a single project             | Project-specific `CLAUDE.md` or a `.claude/commands/<name>.md` slash command |
| The expertise is generic and well-covered by the marketplace | `find ~/.claude/plugins/marketplaces -name "SKILL.md" \| xargs grep -li <keyword>` and install the plugin instead |
| You want a stack-specific code-style enforcement           | A rule under `~/.claude/rules/<lang>.md` (auto-loads on file path/extension) |
| You want Claude to take a specific action                  | A slash command under `~/.claude/commands/<name>.md`                    |
| You need a specialist agent                                | An agent definition under `~/.claude/agents/<name>.md`                  |

**Rule of thumb**: skills are *knowledge*. Rules are *constraints*. Commands are *actions*. Agents are *workers*. Pick the right tier.

---

## How Auto-Activation Works

Claude Code loads skills into context based on the **`description`** field in each `SKILL.md`'s YAML frontmatter. The matcher:

1. Reads the user's prompt, the open file, and the recent conversation.
2. Searches every local skill's description for keyword overlap.
3. Loads the highest-scoring matches (typically 0–3) for the current turn.

Implications for you:

- **Description is everything.** A great skill with a vague description never activates. A mediocre skill with a sharp description activates often.
- **Include the keywords your future self will actually use.** Frame around verbs and concrete tools, not vague nouns. "OAuth 2.0, JWT, NextAuth" outperforms "auth and security".
- **One skill = one domain.** A skill that tries to cover both "frontend performance" and "backend caching" will lose to two narrower skills.
- **Less is more.** A 100-character description with high keyword density beats a 300-character description that buries the same keywords.

Examples of strong descriptions (from existing skills):

```
authentication-patterns: OAuth 2.0, JWT, SSO, MFA, NextAuth/Clerk/Supabase Auth implementation patterns

monitoring-observability: OpenTelemetry, structured logging, distributed tracing, alerting, and dashboards

debug-systematic: Systematic 4-phase debugging methodology for complex, intermittent, or mysterious issues. Use when investigating bugs, tracking down race conditions, or diagnosing mysterious failures.
```

Note the pattern: comma-separated keywords first, optional "Use when…" clause second.

---

## Step-by-Step Creation

### 1. Pick a name

Use `kebab-case`. Be descriptive but concise. Prefix with a domain when ambiguity matters:

| Type      | Pattern                  | Example                       |
| :-------- | :----------------------- | :---------------------------- |
| Framework | `<framework>-<thing>`    | `vue-development`             |
| Platform  | `<platform>-<thing>`     | `ios-development`             |
| Stack     | `generic-<stack>-<role>` | `generic-react-code-reviewer` |
| Workflow  | `<workflow>-workflow`    | `tdd-workflow`                |
| Domain    | `<domain>`               | `security`, `accessibility-a11y` |

### 2. Create the directory and SKILL.md

```bash
cd ~/.claude/skills
mkdir <skill-name>
cd <skill-name>
cp ../../templates/skill-template.md ./SKILL.md
```

The template's literal text (`name: skill-name`, `Brief description`, etc.) is meant to be replaced. Keep the structure (Overview / Core Principles / Key Patterns / Anti-Patterns / Checklist / Related Resources / Examples) — Claude has been trained on this layout.

### 3. Write the YAML frontmatter

```yaml
---
name: my-skill-name
description: Concrete keywords here. Use when the user mentions X, Y, or Z.
---
```

**Description checklist:**

- [ ] Under ~150 characters.
- [ ] Contains the specific tool/framework names you want to match (`PostgreSQL` not just `database`).
- [ ] States the trigger condition naturally (`Use when…`).
- [ ] Avoids generic words that match too many other skills (`good`, `best`, `code`).

Then run `bash ~/.claude/scripts/regenerate-index.sh` and read your skill's row in the resulting `MASTER_INDEX.md`. If your description is truncated to garbage in the index, rewrite it.

### 4. Write the body

Aim for **focused** rather than **complete**. The skill's job is to give Claude the context it doesn't already have. Don't re-explain things Claude already knows.

Suggested structure (per the template):

- **Overview** (1–2 paragraphs). What this is. When to use it.
- **Core Principles** (3–7 numbered items). The non-negotiables.
- **Key Patterns** (the meat). Each pattern: when to use, code example, why.
- **Anti-Patterns** (table). What looks right but isn't, with a better alternative.
- **Checklist** (verification steps).
- **Related Resources** (skills, agents, rules to cross-reference).
- **Examples** (concrete scenarios).

Keep `SKILL.md` under 500 lines. If you have more material, split it into `references/` files inside the skill directory and link from the main file.

### 5. (Optional) Add references and assets

```
skills/<your-skill>/
├── SKILL.md              # Required, the entry point
├── references/           # Long-form material Claude can read on demand
│   └── deep-dive.md
└── assets/               # Templates, starter files, configs to copy
    └── eslintrc.json
```

Use `references/` for content that's important but bulky — Claude will only load `SKILL.md` by default; the references should be linked from `SKILL.md` so Claude knows when to read them.

### 6. Register the skill

```bash
# Regenerate the index (auto-walks the skills/ directory)
bash ~/.claude/scripts/regenerate-index.sh

# Refresh all hardcoded counts across docs (skills count goes up by 1)
bash ~/.claude/scripts/update-counts.sh
```

Both scripts are idempotent. Run them whenever you add or rename a skill.

If your skill belongs to a routable domain, add a row to the relevant `~/.claude/commands/router/domains-*.md` file so the router surfaces it. Most skills don't need this — they get found via the description match alone.

### 7. Test

1. **Restart Claude Code** (skills load at session start).
2. **Test auto-activation**. Open a fresh session, type a prompt that should hit your skill, and check whether Claude's response shows it loaded. The `/list-skills` slash command shows currently loaded skills.
3. **Test explicit invocation**: `Skill(your-skill-name)`. The skill should respond with relevant content.
4. **Test that it doesn't over-fire**. Run prompts in adjacent domains. Your skill shouldn't load every time someone says "code".

If your skill loads too often, narrow the description. If it loads too rarely, add the keywords your prompts actually use.

---

## Best Practices

### Naming

- `kebab-case`, no spaces, no underscores.
- Be specific: `react-performance` beats `rp`. `database-expert` beats `db`.
- Domain prefix when collision risk: `ios-accessibility` not just `accessibility`.

### Description

- Lead with the most distinctive keywords.
- Include framework versions only when they materially change the content (`Svelte 5 runes` is meaningful; `React 18.2` is not).
- End with `Use when…` for non-obvious triggers.

### Content depth

- Be **comprehensive but focused** on one domain.
- **Concrete examples** beat theory. Code blocks beat prose.
- **Reference, don't duplicate**. Link to sibling skills, rules, or external docs.
- **Anti-patterns are gold**. The single most useful section in any skill is "what looks right but isn't, and what to do instead".

### What to leave out

- Generic explanations of things Claude already knows (HTTP, REST, Git).
- Marketing copy ("modern", "elegant", "best-in-class").
- Historical context unless it changes current decisions.

---

## Maintenance

Skills drift like all docs. Re-read your skills quarterly and update when:

- Framework versions you target hit a major version bump with breaking changes.
- A pattern you documented as "best" has been superseded.
- Marketplace skills now cover the same ground at higher quality (consider deprecating yours and pointing at the marketplace one).

When deprecating a skill: don't delete it — set its description to `[DEPRECATED] See <new-skill> instead. <original keywords>` so existing references resolve and search still finds it. Move the body to a `legacy/` subfolder if you want to preserve historical context.

---

## Related Tooling

| Tool                                                  | Purpose                                                              |
| :---------------------------------------------------- | :------------------------------------------------------------------- |
| `~/.claude/templates/skill-template.md`               | The literal file structure you copy from in step 2.                  |
| `~/.claude/scripts/regenerate-index.sh`               | Rebuilds `skills/MASTER_INDEX.md` from on-disk skills.               |
| `~/.claude/scripts/update-counts.sh`                  | Syncs the skill count across all docs and `counts.json`.             |
| `~/.claude/commands/list-skills.md` (`/list-skills`)  | Browse the current local skill set.                                  |
| `~/.claude/commands/skill-finder.md` (`/skill-finder`) | AI-powered skill recommendation across local + marketplace.         |
| `~/.claude/commands/discover-skills.md`               | Marketplace skill discovery.                                         |

---

## Reference

- Skills system overview: [`docs/SKILLS.md`](./SKILLS.md).
- Auto-routing keyword table: top of [`CLAUDE.md`](../CLAUDE.md).
- Marketplace skills: [`docs/MARKETPLACE-GUIDE.md`](./MARKETPLACE-GUIDE.md).
- Agent vs. skill vs. rule decision: [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md).

---

_Created 2026-04-25 to fill the documentation gap noted in the toolkit audit. Pairs with the existing `templates/skill-template.md` (file structure) and `docs/SKILLS.md` (system overview). Runtime tooling: `regenerate-index.sh` + `update-counts.sh`._
