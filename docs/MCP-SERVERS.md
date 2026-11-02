---
name: MCP Servers
description: Optional MCP servers (none configured by default) for memory, databases, library docs, and structured reasoning; browser work uses the app's built-in browser lanes, not a browser MCP server.
category: reference
---

# MCP Servers

Model Context Protocol servers extend Claude's capabilities with external tools.

**Last Updated:** February 2026 (v2.10.1)

**See also:** [MCP Server Management Guide](./reference/tooling/mcp-servers.md) for lifecycle management.

## Contents

[What Is MCP?](#what-is-mcp) · [Currently Installed Servers](#currently-installed-servers) · [Server Details](#server-details) · [Browser Work: No Browser MCP Server](#browser-work-no-browser-mcp-server) · [Configuration](#configuration) · [Adding New Servers](#adding-new-servers) · [Removing Servers](#removing-servers) · [Lazy Loading](#lazy-loading) · [Troubleshooting](#troubleshooting) · [Available MCP Servers (Not Installed)](#available-mcp-servers-not-installed) · [Security Considerations](#security-considerations) · [Portable Backup](#portable-backup) · [See Also](#see-also)

---

## What Is MCP?

MCP (Model Context Protocol) is a standard for connecting AI models to external tools and services. MCP servers provide Claude with capabilities like:

- Database queries
- File system access
- Memory persistence
- Complex reasoning chains

---

## Currently Installed Servers

None. The toolkit ships no MCP server configuration: no `.mcp.json` and no user-scope servers. The servers below are documented options; add one with `claude mcp add` when a project needs it (see [Adding New Servers](#adding-new-servers)).

---

## Server Details

| Server              | Package                                            | Purpose                            |
| ------------------- | -------------------------------------------------- | ---------------------------------- |
| sequential-thinking | `@modelcontextprotocol/server-sequential-thinking` | Complex reasoning chains           |
| memory              | `@modelcontextprotocol/server-memory`              | Persistent memory                  |
| filesystem          | `@modelcontextprotocol/server-filesystem`          | File operations                    |
| sqlite              | `uvx mcp-server-sqlite`                            | Database queries                   |
| context7            | `@upstash/context7-mcp`                            | Up-to-date library docs            |
| github              | `@modelcontextprotocol/server-github`              | GitHub API operations              |
| postgres            | `@crystaldba/postgres-mcp`                         | PostgreSQL read-only access        |
| git                 | `@modelcontextprotocol/server-git`                 | Git operations via MCP             |

### sequential-thinking

**Purpose:** Enables multi-step reasoning with explicit thought chains.

**When to use:**

- Complex problem solving
- Multi-step analysis
- Decision trees

**Invocation:** Automatic when complex reasoning needed.

---

### memory

**Purpose:** Persistent memory across sessions.

**Capabilities:**

- Store key-value data
- Retrieve stored information
- Persist across conversations

**When to use:**

- Remembering project context
- Storing preferences
- Tracking state

---

### filesystem

**Purpose:** File system operations.

**Capabilities:**

- List directories
- Read files
- Write files
- File metadata

**Current Scope:** `.` (current working directory)

**Note:** This is scoped for portability. On each machine, it operates relative to where Claude Code is run.

---

### sqlite

**Purpose:** SQLite database operations.

**Capabilities:**

- Create databases
- Execute queries
- Manage schemas

**When to use:**

- Local data storage
- Query testing
- Data analysis

**Note:** Uses `uvx` (Python) instead of npm because the npm version had connection issues.

---

### context7

**Purpose:** Fetches up-to-date, version-specific documentation for libraries and frameworks.

**Capabilities:**

- Resolve library names to IDs
- Retrieve current documentation
- Get version-specific code examples
- Pagination for large docs

**When to use:**

- Working with new frameworks you're learning
- Libraries that update frequently (React, Next.js, etc.)
- Avoiding deprecated API calls
- Getting accurate code examples instead of stale training data

**Status:** Disabled by default (enable when needed).

**Invocation:** Add "use context7" to prompts, or enable and ask about library docs.

**Example:**

```
use context7 - how do I set up a Next.js 15 app router?
```

**Setup (API key required):** Since 2026-11 the remote server answers tokenless clients with a 401 sign-in challenge, so connect with a key. Keep the key in a private file (mode 0600) that your shell profile loads into `CONTEXT7_API_KEY`, then add the server at user scope:

```bash
claude mcp add --scope user --transport http context7 https://mcp.context7.com/mcp \
  --header 'Authorization: Bearer ${CONTEXT7_API_KEY}'
```

The single quotes keep the variable for Claude Code to expand at launch. Codex uses `bearer_token_env_var = "CONTEXT7_API_KEY"` under `[mcp_servers.context7]`; Grok uses `bearer_token_file` pointing at the key file. The `context7@claude-plugins-official` plugin stays disabled in `settings.json`: it cannot carry a key, and Grok's Claude-compatibility import treats its 401 as fatal.

---

### github

**Purpose:** Full GitHub API access beyond the gh CLI.

**When to use:**
- PR reviews, commenting, and management
- GitHub Actions workflow management
- Repository operations (create, fork, manage)
- Issue tracking and project management
- Release management and tagging

**Status:** Disabled by default.

**Requirements:** GitHub personal access token. Set GITHUB_PERSONAL_ACCESS_TOKEN in environment.

**Example:**



---

### postgres

**Purpose:** Read-only PostgreSQL database access for schema introspection and query analysis.

**When to use:**
- Database schema exploration and documentation
- Query performance analysis and tuning
- Data exploration and ad-hoc queries
- Migration planning and impact analysis

**Status:** Disabled by default.

**Requirements:** PostgreSQL connection string. Set POSTGRES_CONNECTION_STRING in environment.

**Example:**



---

### git

**Purpose:** Git operations via MCP protocol.

**When to use:**
- Repository cloning and initialization
- Branch management and diffing
- Commit history analysis
- When built-in git tools are insufficient for complex operations

**Status:** Disabled by default.

**Requirements:** Git installed on system. No additional API keys needed.

**Example:**



---

## Browser Work: No Browser MCP Server

The toolkit documents no browser automation MCP server. Browser work follows one lane order:

1. **The active app's built-in browser** — the default for all web work: local dev servers, rendered pages, UI checks, screenshots, and public pages.
2. **A managed `agent-browser` CLI** (see the `agent-browser` skill) when the built-in browser is blocked; for native desktop apps, `agent-desktop` instead.
3. **Codex Computer Use.**
4. **Claude computer use.**

Move down a lane only after recording why the one above cannot serve the task. Shared, social, and authenticated sources stay read-only in every lane.

Prohibited, with no exceptions: Playwright in any form (`playwright`, `playwright-core`, `@playwright/test`, the Playwright MCP server, Playwright browser downloads), Puppeteer and Puppeteer-based servers (including the Chrome DevTools MCP server), Selenium/WebDriver, cloud browser services built on them, and any standalone browser driven from a shell. Performance measurement uses the hosted PageSpeed Insights or Search Console reports, or the built-in browser's own tools.

---

## Configuration

### File Location

MCP servers are configured in `~/.claude/.mcp.json`.

**IMPORTANT:** The `.mcp.json` file is **platform-specific** and is NOT synced via git.
Each machine must maintain its own `.mcp.json` file manually.

### Platform-Specific Templates

The `command` field differs between Windows and Linux/Mac:

#### Windows Template

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "type": "stdio",
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@modelcontextprotocol/server-sequential-thinking"
      ],
      "env": {}
    },
    "memory": {
      "type": "stdio",
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-memory"],
      "env": {}
    },
    "filesystem": {
      "type": "stdio",
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "."
      ],
      "env": {}
    },
    "sqlite": {
      "type": "stdio",
      "command": "uvx",
      "args": ["mcp-server-sqlite"],
      "env": {}
    }
  }
}
```

#### Linux/Mac Template

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      "env": {}
    },
    "memory": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {}
    },
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."],
      "env": {}
    },
    "sqlite": {
      "type": "stdio",
      "command": "uvx",
      "args": ["mcp-server-sqlite"],
      "env": {}
    }
  }
}
```

### Key Difference

| Platform  | Command | Args                              |
| --------- | ------- | --------------------------------- |
| Windows   | `"cmd"` | `["/c", "npx", "-y", "@package"]` |
| Linux/Mac | `"npx"` | `["-y", "@package"]`              |

### Configuration Format

```json
{
  "mcpServers": {
    "server-name": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@package/name"],
      "env": {}
    }
  }
}
```

### Fields

| Field     | Required | Description                             |
| --------- | -------- | --------------------------------------- |
| `type`    | Yes      | Transport type (`stdio`, `sse`, `http`) |
| `command` | Yes      | Command to run (`npx`, `uvx`, `node`)   |
| `args`    | Yes      | Command arguments                       |
| `env`     | No       | Environment variables                   |

---

## Adding New Servers

### Step 1: Find the Package

Search for MCP servers:

- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)
- [MCP Hub](https://mcphub.io/)

### Step 2: Add to Configuration

Edit `~/.claude.json`:

```json
{
  "mcpServers": {
    "new-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@package/new-server"],
      "env": {}
    }
  }
}
```

### Step 3: Test

Restart Claude Code and verify:

```
/mcp
```

Or use the server in conversation.

### Step 4: Update Backup

Copy updated config to `.claude/.claude.json` for portability.

---

## Removing Servers

### Via CLI

```bash
claude mcp remove server-name
```

### Via Direct Edit

Remove the server entry from `~/.claude.json`.

---

## Lazy Loading

**Current setting:** `enableAllProjectMcpServers: false`

This means MCP servers only load when explicitly called, not at startup.

**Benefits:**

- Reduced startup time
- Lower context usage
- Only loads what you need

**Trade-off:**

- First use of a server has slight delay

To change, edit `settings.json`:

```json
{
  "enableAllProjectMcpServers": true
}
```

---

## Troubleshooting

### Server Won't Connect

1. Check package name is correct
2. Verify command (`npx`, `uvx`) is available
3. Check network connectivity for package download
4. Run `/doctor` for diagnostics

### Server Times Out

Increase timeout with environment variable:

```bash
MCP_TIMEOUT=60000 claude
```

### Server Errors

Check logs:

```bash
claude --mcp-debug
```

### Common Issues

| Problem              | Solution                        |
| -------------------- | ------------------------------- |
| "Package not found"  | Verify package name on npm/PyPI |
| "Command not found"  | Install npx/uvx                 |
| "Connection refused" | Check if server requires auth   |
| "Timeout"            | Increase MCP_TIMEOUT            |

---

## Available MCP Servers (Not Installed)

These are commonly used but not currently installed:

| Server       | Package                                     | Purpose                       |
| ------------ | ------------------------------------------- | ----------------------------- |
| fetch        | `@modelcontextprotocol/server-fetch`        | Web fetching                  |
| brave-search | `@modelcontextprotocol/server-brave-search` | Web search (requires API key) |
| slack        | `@modelcontextprotocol/server-slack`        | Slack integration             |
| google-drive | `@modelcontextprotocol/server-google-drive` | Google Drive access           |

---

## Security Considerations

### API Keys

Some servers require API keys:

- Store in environment variables, not config files
- Use `env` field in server config
- Never commit API keys to repositories

### File System Access

The `filesystem` server has access to files. Current scope is `.` (current directory).

**For broader access:**

```json
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "~"]
  }
}
```

**Note:** Replace `~` with your actual home path if needed:

- Windows: `C:/Users/username`
- macOS: `/Users/username`
- Linux: `/home/username`

**Warning:** Broader access means Claude can read/write more files.

### Network Access

Servers like `fetch` and `brave-search` have network access. Be cautious about:

- Visiting untrusted URLs
- Sending data to external services
- Automated form submissions

---

## Portable Backup

User-scope MCP servers live in `~/.claude.json` (`mcpServers`). When you add servers you want on every machine, prefer project-scope `.mcp.json` files in the projects that need them, or re-add them with `claude mcp add --scope user` on each machine.

---

## See Also

- [CONFIGURATION.md](./CONFIGURATION.md) - Settings including enableAllProjectMcpServers
- [SETUP-GUIDE.md](./SETUP-GUIDE.md) - Installing on new machines
- [CLAUDE-CODE-RESOURCES.md](./CLAUDE-CODE-RESOURCES.md) - More MCP server options
