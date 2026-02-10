---
name: FAQ
description: Answers to common questions about skills vs agents, marketplace usage, hooks, Agent Teams, and toolkit architecture.
category: reference
---

# Frequently Asked Questions

Common questions about the Claude Code Toolkit, organized by topic.

**Last Updated:** February 2026 (v2.6.0)

---

## Skills, Agents, and Commands

### What's the difference between a skill, an agent, and a command?

They serve different purposes and activate differently:

| Component   | What It Is               | How It Works                               | Example                                         |
| ----------- | ------------------------ | ------------------------------------------ | ----------------------------------------------- |
| **Skill**   | Domain knowledge package | Auto-activates by context or explicit call | `generic-code-reviewer` loads during PR reviews |
| **Agent**   | Autonomous worker        | Spawned via Task tool, runs independently  | `debugging-specialist` investigates a bug       |
| **Command** | Slash-invoked action     | User types `/command-name` to trigger      | `/start-task` routes work intelligently         |

**Skills** teach Claude _how_ to think about a domain. They load guidelines, patterns, and checklists into context. They don't execute autonomously.

**Agents** are independent Claude sessions that _do work_ — they have their own context window, can read/write files, and return results. Think of them as specialized coworkers you delegate to.

**Commands** are user-initiated workflows. They structure a multi-step process (like routing a task to the right skill/agent combination).

### When should I create a skill vs an agent?

Create a **skill** when you have domain knowledge that should influence how Claude works (coding standards, design patterns, review checklists). Skills are lightweight and load into context.

Create an **agent** when you need an autonomous worker that operates independently (a security auditor that scans files, a test generator that writes specs). Agents consume their own context window.

### How do skills auto-activate?

Claude reads the `description` field in each skill's YAML frontmatter and matches it against the current conversation context. If you're discussing code review, the `generic-code-reviewer` skill activates because its description mentions "code review" and "PR reviews."

You can also force activation: `Use generic-code-reviewer to review this code`.

### Can I have project-specific skills?

Yes. Create a `.claude/skills/` directory in your project root with project-specific SKILL.md files. These override or supplement the global skills in `~/.claude/skills/`.

---

## Marketplace

### What is the marketplace?

The marketplace is a collection of 84 community-maintained GitHub repositories containing over 4,500+ additional skills, agents, and commands. They're cloned into `~/.claude/plugins/marketplaces/` and configured as read-only (you can fetch updates but can't accidentally push changes).

### How do I find marketplace skills?

Several approaches:

1. **Search locally:** The skills are already cloned. Use `/discover-skills <query>` or `/skill-finder <query>`.
2. **Browse online:** Visit [skillsmp.com](https://skillsmp.com) for 4,500+ community skills.
3. **Manual search:** `find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -li "keyword"`

### Are marketplace repos safe?

Marketplace repos are community-contributed and not audited by this toolkit. They're configured as read-only (push blocked via `no_push` remote URL) to prevent accidental modifications. Review any marketplace skill before relying on it for security-sensitive work.

### How do I update marketplace repos?

Run `~/.claude/_pull-all-repos.sh` or use `/pull-repos` in Claude Code. This fetches the latest from all 84 upstream repositories, fixes detached HEAD states, and updates documentation counts.

---

## Hooks

### What are hooks and how do they work?

Hooks are bash scripts that run automatically at specific points during a Claude Code session. They're configured in `settings.json` under the `hooks` key and execute via the Claude Code lifecycle system.

There are 5 lifecycle events that can trigger hooks:

| Event              | When It Fires                        | Example Use                     |
| ------------------ | ------------------------------------ | ------------------------------- |
| `SessionStart`     | When Claude Code session begins      | Pull repos, load previous state |
| `Stop`             | When Claude Code session ends        | Save session summary            |
| `UserPromptSubmit` | Before each user prompt is processed | Inject git context              |
| `PreToolUse`       | Before a tool executes               | Block dangerous commands        |
| `PostToolUse`      | After a tool completes               | Auto-format written files       |

### Can hooks block actions?

Yes. `PreToolUse` hooks can exit with code 2 to block the tool from executing. The `guard-dangerous.sh` hook uses this to prevent commands like `rm -rf /`, `git push --force`, and `DROP TABLE`.

### How do I add a new hook?

1. Create a bash script in `~/.claude/hooks/`
2. Add the hook entry to `settings.json` under the appropriate event
3. Include a `matcher` if the hook should only trigger for specific tools

See `~/.claude/hooks/README.md` for detailed examples.

---

## Agent Teams

### What are Agent Teams?

Agent Teams are multiple Claude Code sessions that work together on a shared task list with real-time messaging. A lead agent coordinates teammates, assigns tasks, and synthesizes results.

This is an experimental feature requiring `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in settings.json env vars (already configured in this toolkit).

### How are Agent Teams different from subagents?

| Aspect        | Subagents (Task tool)     | Agent Teams                 |
| ------------- | ------------------------- | --------------------------- |
| Communication | One-way (results return)  | Two-way (messaging)         |
| Context       | Own window, results back  | Own window, independent     |
| Coordination  | Caller manages            | Shared task list            |
| Token cost    | Low-medium                | High                        |
| Best for      | Focused, independent work | Cross-cutting collaboration |

Use subagents when you just need results back. Use Agent Teams when teammates need to communicate with each other or the lead.

### When should I use Agent Teams vs Auto-Claude?

**Agent Teams** are best for research, review, and investigation — work where multiple perspectives add value and results feed into human decisions.

**Auto-Claude** is best for autonomous feature implementation — it creates an isolated git worktree, implements the feature with QA validation, and returns completed code.

---

## Configuration

### What files control Claude Code's behavior?

| File                  | Purpose                       | Synced?     |
| --------------------- | ----------------------------- | ----------- |
| `CLAUDE.md`           | Global instructions and rules | Yes (git)   |
| `settings.json`       | Permissions, hooks, plugins   | Yes (git)   |
| `settings.local.json` | Machine-specific overrides    | No          |
| `.mcp.json`           | MCP server definitions        | No          |
| Project `CLAUDE.md`   | Per-project overrides         | Per project |

### How does the auto-routing system work?

When you type a prompt, Claude automatically matches keywords against a routing table defined in `CLAUDE.md`. For example, mentioning "React" loads `rules/stacks/react-typescript.md`, mentioning "bug" loads `rules/tooling/troubleshooting.md`. This happens without any slash commands — it's keyword-driven context loading.

### What's the difference between `settings.json` and `settings.local.json`?

`settings.json` is tracked in git and shared across all machines. It contains toolkit-wide configuration: permissions, hooks, enabled plugins.

`settings.local.json` is gitignored and machine-specific. Use it for local overrides that shouldn't sync (like disabling a hook on one machine).

---

## Counts and Accuracy

### Why do counts sometimes drift?

Counts are hardcoded in multiple places (README.md, CLAUDE.md, plugin.json, docs, website components). When skills or repos are added/removed, not all locations get updated. The `update-counts.sh` script reconciles counts across all known locations, and the `pre-commit-counts.sh` hook runs it automatically before every git commit.

### What are the current accurate counts?

Run `cat ~/.claude/counts.json` for the source of truth, or check `~/.claude/README.md` which is updated by the count script.

---

## Cross-Platform

### Does this toolkit work on Windows?

Yes. The toolkit supports macOS, Linux (including Arch), and Windows. On Windows, hooks execute via Git Bash (included with Git for Windows). MCP server commands need `cmd /c` wrappers. See `docs/SETUP-GUIDE.md` for platform-specific notes.

### How do I sync between machines?

The toolkit syncs via git. Push from one machine, pull on another. Machine-specific files (`.mcp.json`, `settings.local.json`) are gitignored and must be configured per-machine. Run `~/.claude/_pull-all-repos.sh` after pulling to update marketplace repos.

---

## Website

### What is the showcase website?

A Next.js static site at [claude.travisjneuman.com](https://claude.travisjneuman.com) that displays the toolkit's skills, agents, commands, marketplace stats, and documentation. It's deployed via Cloudflare Pages from the GitHub repo.

### How does the website get its data?

The website reads directly from the filesystem at build time. Data functions in `website/src/lib/data/` parse markdown files, YAML frontmatter, and JSON files to generate the static pages.

---

## See Also

- [ARCHITECTURE.md](./ARCHITECTURE.md) — How all the pieces fit together
- [GLOSSARY.md](./GLOSSARY.md) — Definitions of all toolkit terms
- [SETUP-GUIDE.md](./SETUP-GUIDE.md) — Installation and deployment
- [CONFIGURATION.md](./CONFIGURATION.md) — Settings reference

---

_Can't find your answer? Open an issue at https://github.com/travisjneuman/.claude/issues_
