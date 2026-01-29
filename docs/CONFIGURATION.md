# Configuration Files

Detailed documentation of all configuration files and their settings.

**Last Updated:** January 2026 (v2.2)

---

## Configuration Hierarchy

Claude Code loads settings from multiple locations, merged in order:

1. **System defaults** (built into Claude Code)
2. **User settings** (`~/.claude/settings.json`)
3. **User local** (`~/.claude/settings.local.json`)
4. **Project settings** (`.claude/settings.json` in project)
5. **Project local** (`.claude/settings.local.json` in project)

Later files override earlier ones.

---

## File: `settings.json`

**Location:** `~/.claude/settings.json`

**Purpose:** Main configuration for permissions, plugins, and preferences.

### Current Configuration

```json
{
  "permissions": {
    "allow": [
      "SlashCommand(/run-prompt:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(npm run test)",
      "WebSearch",
      ...
    ],
    "deny": [],
    "ask": [],
    "defaultMode": "bypassPermissions"
  },
  "enabledPlugins": {
    "agent-sdk-dev@claude-code-plugins": true,
    "pr-review-toolkit@claude-code-plugins": true,
    ...
  },
  "enableAllProjectMcpServers": false,
  "alwaysThinkingEnabled": true,
  "outputStyle": "default",
  "spinnerTipsEnabled": false
}
```

### Key Settings Explained

#### `permissions.defaultMode`

| Value                 | Behavior                               |
| --------------------- | -------------------------------------- |
| `"bypassPermissions"` | Skip most permission prompts (current) |
| `"default"`           | Ask for permissions as normal          |
| `"plan"`              | Always use plan mode                   |

#### `permissions.allow`

Pre-approved tool patterns. Format: `ToolName(pattern:*)`

**Examples:**

```json
"Bash(git commit:*)"      // Any git commit command
"Bash(npm run test)"      // Exact command
"WebSearch"               // Any web search
"Skill(debug-like-expert)" // Specific skill
"WebFetch(domain:docs.anthropic.com)" // Specific domain
```

#### `enableAllProjectMcpServers`

| Value   | Behavior                                                     |
| ------- | ------------------------------------------------------------ |
| `false` | MCP servers only load when explicitly called (saves context) |
| `true`  | All MCP servers load on startup                              |

**Current:** `false` - Recommended for context efficiency.

#### `enabledPlugins`

Map of plugin IDs to enabled status.

**Format:** `"plugin-name@marketplace": true/false`

#### `alwaysThinkingEnabled`

When `true`, Claude uses extended thinking for all responses.

#### `spinnerTipsEnabled`

When `false`, disables tip messages during loading spinners.

---

## File: `settings.local.json`

**Location:** `~/.claude/settings.local.json`

**Purpose:** Local overrides that shouldn't be shared.

**Current state:** Identical to `settings.json` (they were synced).

**Use cases:**

- Machine-specific permissions
- Personal preferences
- Testing different configs

---

## File: `.claude.json` (MCP Servers)

**Location:** `~/.claude.json` (NOT inside .claude/)

**Purpose:** MCP server configurations

### Portable Backup

A clean copy is maintained at `~/.claude/.claude.json` containing only MCP servers.

### Current MCP Servers

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    },
    "memory": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    },
    "sqlite": {
      "type": "stdio",
      "command": "uvx",
      "args": ["mcp-server-sqlite"]
    }
  }
}
```

### Other Fields (Auto-Generated)

The real `~/.claude.json` also contains (all auto-generated):

- `numStartups` - Startup counter
- `cachedChangelog` - Release notes cache (~55KB)
- `projects` - Machine-specific project data
- `oauthAccount` - Login info
- `tipsHistory` - Seen tips
- Various caches and trackers

**These regenerate automatically** - don't copy them to new machines.

---

## File: `CLAUDE.md`

**Location:** `~/.claude/CLAUDE.md` (global) or `./CLAUDE.md` (project)

**Purpose:** Persistent memory and instructions for Claude.

### How It Works

- Claude reads this file at the start of each session
- Add instructions you repeat often
- Use `#` in Claude Code to quickly add notes

### Recommended Content

```markdown
# Global Preferences

## Coding Standards

- Use TypeScript for all new code
- Prefer functional patterns

## Common Tasks

- Build: `npm run build`
- Test: `npm test`

## Things That Work

- Pattern X for problem Y

## Things To Avoid

- Don't use library Z (broken)
```

---

## Permission Patterns

### Tool Types

| Tool         | Pattern Format         | Example                       |
| ------------ | ---------------------- | ----------------------------- |
| Bash         | `Bash(command:*)`      | `Bash(git commit:*)`          |
| Read         | `Read(path:*)`         | `Read(//c/Users/**)`          |
| Write        | `Write(path:*)`        | `Write(./src/**)`             |
| Edit         | `Edit(path:*)`         | `Edit(./src/**)`              |
| Glob         | `Glob(pattern:*)`      | `Glob(**/*.ts)`               |
| Grep         | `Grep(pattern:*)`      | `Grep(TODO:*)`                |
| WebFetch     | `WebFetch(domain:*)`   | `WebFetch(domain:github.com)` |
| WebSearch    | `WebSearch`            | `WebSearch`                   |
| Skill        | `Skill(name)`          | `Skill(debug-like-expert)`    |
| SlashCommand | `SlashCommand(/cmd:*)` | `SlashCommand(/run-prompt:*)` |

### Wildcards

| Pattern | Meaning                         |
| ------- | ------------------------------- |
| `*`     | Match anything in this position |
| `**`    | Match any path depth            |
| `:*`    | Match any arguments             |

---

## Modifying Settings

### Via Claude Code Commands

```bash
/permissions          # Manage tool permissions
/config              # General configuration
/model               # Change model
/statusline          # Configure status line
/output-style        # Change output formatting
```

### Via Direct Edit

Edit `~/.claude/settings.json` directly. Changes take effect immediately (no restart needed).

### Via CLI

```bash
claude config set <key> <value>
claude allow "Bash(npm run build)"
```

---

## Validation

Run `/doctor` to check for configuration issues.

Common problems:

- Invalid JSON syntax
- Unknown setting keys
- Permission patterns with typos

---

## See Also

- [MCP-SERVERS.md](./MCP-SERVERS.md) - MCP server details
- [SETUP-GUIDE.md](./SETUP-GUIDE.md) - Initial setup
- [MAINTENANCE.md](./MAINTENANCE.md) - Ongoing maintenance
