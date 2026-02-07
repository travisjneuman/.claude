# Slash Commands Index

Slash commands are shortcuts you invoke in Claude Code with `/<command-name>`. They load structured prompts that guide Claude through specific workflows.

**Usage:** Type `/<command-name>` in Claude Code. Some commands accept arguments.

---

## Commands by Category

### Workflow

| Command       | Description                                                                                                 | Usage                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `start-task`  | Universal intelligent router — routes any prompt to optimal resources from skills, agents, and marketplaces | `/start-task refactor the auth module` |
| `auto-claude` | Invoke Auto-Claude autonomous coding framework for complex feature implementation                           | `/auto-claude`                         |
| `run`         | Execute prompt(s) from `./prompts/` with automatic archiving                                                | `/run 001` or `/run 5 6 7`             |

### Discovery

| Command           | Description                                                                                         | Usage                                               |
| ----------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `skill-finder`    | AI-powered skill recommendation based on problem description — searches local skills + marketplaces | `/skill-finder I need to optimize database queries` |
| `list-skills`     | Browse available skills by domain or list all with categorization                                   | `/list-skills frontend`                             |
| `discover-skills` | Search skillsmp.com for Claude Code skills via public API                                           | `/discover-skills`                                  |

### Maintenance

| Command         | Description                                                             | Usage                   |
| --------------- | ----------------------------------------------------------------------- | ----------------------- |
| `health-check`  | Run diagnostics on toolkit configuration and status                     | `/health-check`         |
| `backup-config` | Backup Claude Code configuration files                                  | `/backup-config create` |
| `update-counts` | Sync all hardcoded counts across documentation with filesystem          | `/update-counts`        |
| `update-docs`   | Scan for recently modified files and update corresponding documentation | `/update-docs`          |
| `pull-repos`    | Pull all repos (parent + marketplace submodules)                        | `/pull-repos`           |
| `bootstrap`     | Verify and repair Claude Code Toolkit installation                      | `/bootstrap`            |

### Session

| Command         | Description                                               | Usage               |
| --------------- | --------------------------------------------------------- | ------------------- |
| `handoff`       | Create a handoff document for seamless session continuity | `/handoff`          |
| `session-log`   | View and analyze the Claude Code session log              | `/session-log tail` |
| `context-stats` | Display context window usage and token statistics         | `/context-stats`    |

### Code

| Command                 | Description                                                                                  | Usage                                             |
| ----------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `review-code`           | Comprehensive code review on recent changes or specified files                               | `/review-code staged` or `/review-code src/auth/` |
| `init-project`          | Initialize project with CLAUDE.md template — adaptive detection for new or existing projects | `/init-project react`                             |
| `standardize-claude-md` | Add missing toolkit sections to existing CLAUDE.md                                           | `/standardize-claude-md`                          |
| `scaffold`              | Scaffold project components from templates (API endpoint, component, service, middleware)     | `/scaffold api-endpoint users`                    |
| `test-suite`            | Run tests, analyze failures, report coverage, suggest missing tests                          | `/test-suite`                                     |

### DevOps & Security

| Command         | Description                                                                       | Usage                |
| --------------- | --------------------------------------------------------------------------------- | -------------------- |
| `deploy`        | Deploy application with pre/post-deploy checks to Vercel/AWS/Netlify/Docker       | `/deploy production` |
| `security-scan` | Run OWASP checks, npm audit, secret scanning, dependency vulnerability analysis   | `/security-scan`     |
| `deps-update`   | Audit dependencies for security advisories, breaking changes, and safe updates    | `/deps-update`       |
| `perf-audit`    | Performance audit — bundle size, render perf, API times, database queries         | `/perf-audit`        |
| `migrate`       | Generate and manage database migrations with validation and rollback strategies   | `/migrate`           |

### Collaboration

| Command         | Description                                                                   | Usage            |
| --------------- | ----------------------------------------------------------------------------- | ---------------- |
| `assemble-team` | Spawn an Agent Team with role-based teammates for parallel collaborative work | `/assemble-team` |

### Decision

| Command        | Description                                                     | Usage           |
| -------------- | --------------------------------------------------------------- | --------------- |
| `log-decision` | Append an architectural decision to the persistent decision log | `/log-decision` |

---

## Quick Examples

```
# Start any task with intelligent routing
/start-task add JWT authentication to the API

# Find the right skill for a problem
/skill-finder I need to write E2E tests for a React app

# Review staged changes before committing
/review-code staged

# Create a session handoff before ending work
/handoff

# Check toolkit health
/health-check
```

---

## Related Documentation

- `~/.claude/CLAUDE.md` - Core rules (always loaded)
- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/agents/README.md` - Agents directory
- `~/.claude/rules/README.md` - Rules and guidelines index
- `~/.claude/docs/WORKFLOW-GUIDE.md` - Workflow patterns

---

_27 commands across 8 categories. Type `/<name>` to invoke._
