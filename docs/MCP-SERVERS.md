# MCP Servers

Model Context Protocol servers extend Claude's capabilities with external tools.

**Last Updated:** January 2026 (v2.2)

**See also:** [MCP Server Management Guide](../rules/tooling/mcp-servers.md) for lifecycle management.

---

## What Is MCP?

MCP (Model Context Protocol) is a standard for connecting AI models to external tools and services. MCP servers provide Claude with capabilities like:

- Browser automation
- Database queries
- File system access
- Memory persistence
- Complex reasoning chains

---

## Currently Installed Servers

| Server              | Package                                            | Purpose                            | Status   |
| ------------------- | -------------------------------------------------- | ---------------------------------- | -------- |
| sequential-thinking | `@modelcontextprotocol/server-sequential-thinking` | Complex reasoning chains           | Active   |
| playwright          | `@playwright/mcp@latest`                           | Browser automation (cross-browser) | Active   |
| memory              | `@modelcontextprotocol/server-memory`              | Persistent memory                  | Active   |
| filesystem          | `@modelcontextprotocol/server-filesystem`          | File operations                    | Active   |
| sqlite              | `uvx mcp-server-sqlite`                            | Database queries                   | Active   |
| context7            | `@upstash/context7-mcp`                            | Up-to-date library docs            | Disabled |
| chrome-devtools     | `@anthropic-ai/chrome-devtools-mcp`                | Chrome debugging/performance       | Disabled |
| puppeteer           | `@modelcontextprotocol/server-puppeteer`           | Simple browser automation          | Disabled |
| browserbase         | `@browserbase/mcp-server-browserbase`              | Cloud browser automation           | Disabled |

---

## Server Details

### sequential-thinking

**Purpose:** Enables multi-step reasoning with explicit thought chains.

**When to use:**

- Complex problem solving
- Multi-step analysis
- Decision trees

**Invocation:** Automatic when complex reasoning needed.

---

### playwright

**Purpose:** Browser automation and testing.

**Capabilities:**

- Navigate web pages
- Click elements
- Fill forms
- Take screenshots
- Extract content

**When to use:**

- Web scraping
- UI testing
- Form automation
- Screenshot capture

**Example:**

```
Navigate to example.com and take a screenshot
```

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

**Note:** No API key required for basic use. Optional API key for higher rate limits and private repos.

---

### chrome-devtools

**Purpose:** Deep Chrome debugging and performance profiling using Chrome DevTools Protocol.

**Capabilities:**

- Core Web Vitals measurement (LCP, CLS, INP)
- DevTools performance traces
- Network inspection and debugging
- Console access and JavaScript execution
- DOM inspection and manipulation

**When to use:**

- Performance optimization and profiling
- Debugging complex frontend issues
- Measuring Core Web Vitals
- Network request analysis
- When you need your existing Chrome session (cookies, login state)

**Status:** Disabled by default.

**Token usage:** ~18k tokens (26 tools)

**Example:**

```
Analyze the performance of example.com and suggest improvements
```

**Note:** Uses your installed Chrome browser, preserving existing sessions.

---

### puppeteer

**Purpose:** Simple, lightweight browser automation via headless Chrome.

**Capabilities:**

- Navigate web pages
- Click and interact with elements
- Take screenshots and generate PDFs
- Fill forms
- Execute JavaScript

**When to use:**

- Simple browser automation tasks
- Quick screenshots or PDF generation
- Basic web scraping
- When you want a lighter alternative to Playwright

**Status:** Disabled by default.

**Example:**

```
Take a screenshot of example.com
```

**Note:** Simpler API than Playwright or Chrome DevTools, but Chrome-only.

---

### browserbase

**Purpose:** Cloud-based browser automation with anti-detection and scaling.

**Capabilities:**

- Cloud browser sessions (no local browser needed)
- 50-1000+ concurrent sessions
- Built-in anti-bot detection bypass
- CAPTCHA solving
- 195+ country IP coverage
- Works across Playwright, Puppeteer, and Patchright

**When to use:**

- Large-scale scraping or testing
- CI/CD pipeline browser testing
- Sites with anti-bot protection
- When you need concurrent browser sessions
- Testing from different geographic locations

**Status:** Disabled by default.

**Requirements:** API key required. Set `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID` in environment.

**Example:**

```
Scrape product prices from 100 pages concurrently using Browserbase
```

---

## Browser Automation: Which Server to Use?

We have four browser automation servers. Here's when to use each:

### Decision Matrix

| Use Case                            | Best Choice     | Why                                |
| ----------------------------------- | --------------- | ---------------------------------- |
| **Cross-browser testing**           | Playwright      | Supports Chromium, Firefox, WebKit |
| **Performance profiling**           | Chrome DevTools | Core Web Vitals, DevTools traces   |
| **Simple automation**               | Puppeteer       | Lighter weight, simpler API        |
| **Scale/anti-bot**                  | Browserbase     | Cloud-based, concurrent sessions   |
| **Debugging with existing session** | Chrome DevTools | Uses your logged-in Chrome         |
| **LLM-friendly (no vision)**        | Playwright      | Accessibility tree approach        |
| **Quick screenshots**               | Puppeteer       | Fast, minimal overhead             |
| **CI/CD pipelines**                 | Browserbase     | Cloud-native, no local browser     |

### Comparison Table

| Feature                 | Playwright              | Chrome DevTools | Puppeteer   | Browserbase    |
| ----------------------- | ----------------------- | --------------- | ----------- | -------------- |
| **Browser Support**     | Chrome, Firefox, Safari | Chrome only     | Chrome only | Chrome (cloud) |
| **Token Usage**         | ~14k                    | ~18k            | ~8k         | ~12k           |
| **Local/Cloud**         | Local                   | Local           | Local       | Cloud          |
| **Performance Tools**   | Basic                   | Excellent       | None        | Basic          |
| **LLM Approach**        | Accessibility tree      | Pixel-based     | Pixel-based | Stagehand AI   |
| **Anti-bot**            | None                    | None            | None        | Built-in       |
| **Concurrent Sessions** | Limited                 | 1               | Limited     | 50-1000+       |
| **API Key Required**    | No                      | No              | No          | Yes            |

### Recommended Workflow

1. **Start with Playwright** (default) — Best balance of capability and LLM-friendliness
2. **Add Chrome DevTools** for performance work — When optimizing Core Web Vitals
3. **Use Puppeteer** for simple tasks — Quick screenshots, basic automation
4. **Use Browserbase** for scale — CI/CD, bulk operations, anti-bot sites

### Example Scenarios

**"Test my app works in Safari"**
→ Use **Playwright** (only option with WebKit support)

**"Why is my page slow? Measure LCP."**
→ Use **Chrome DevTools** (Core Web Vitals profiling)

**"Take a quick screenshot of this URL"**
→ Use **Puppeteer** (simplest, fastest)

**"Scrape 500 product pages with rate limiting"**
→ Use **Browserbase** (cloud scale, anti-detection)

**"Fill out a form on a site I'm logged into"**
→ Use **Chrome DevTools** (preserves your Chrome session)

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
    "playwright": {
      "type": "stdio",
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@playwright/mcp@latest"],
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
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"],
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
| github       | `@modelcontextprotocol/server-github`       | GitHub API (requires token)   |
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

Servers like `playwright` and `fetch` have network access. Be cautious about:

- Visiting untrusted URLs
- Sending data to external services
- Automated form submissions

---

## Portable Backup

A clean copy of MCP config is maintained at:

```
~/.claude/.claude.json
```

This contains ONLY `mcpServers` - no machine-specific data.

When setting up a new machine:

1. Copy `.claude/.claude.json` to `~/.claude.json`
2. Claude Code will add its own tracking data as you use it

---

## See Also

- [CONFIGURATION.md](./CONFIGURATION.md) - Settings including enableAllProjectMcpServers
- [SETUP-GUIDE.md](./SETUP-GUIDE.md) - Installing on new machines
- [../CLAUDE-CODE-RESOURCES.md](../CLAUDE-CODE-RESOURCES.md) - More MCP server options
