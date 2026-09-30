---
description: Display context window usage and token statistics
disable-model-invocation: true
---

# Context Stats

Display current context window usage and provide optimization recommendations.

## Usage

```
/context-stats
```

## Platform Compatibility

| Platform | Status | Notes           |
| -------- | ------ | --------------- |
| Windows  | ✅     | Fully supported |
| macOS    | ✅     | Fully supported |
| Linux    | ✅     | Fully supported |

This command uses Claude's internal estimation - no platform-specific code.

## Behavior

### Step 1: Gather Statistics

**Context window info:**

- Current session model and its context window (Opus 5.5 and Sonnet 5.5 have a native 1M-token window)
- Auto-compaction point: this toolkit sets `autoCompactWindow: 300000` in `settings.json`, so compaction triggers near 300K tokens, well before the 1M limit
- Approximate current usage and headroom before compaction

**Session activity:**

- Messages in conversation
- Tools invoked
- Files read

### Step 2: Display Report

Fill in the real session model and numbers; the values below are an example.

```
╔═══════════════════════════════════════════════════════════════╗
║  Context Window Statistics                                     ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Model: <current session model, e.g. claude-opus-5-5>          ║
║  Context Window: 1,000,000 tokens                               ║
║  Auto-compact at: ~300,000 tokens (autoCompactWindow)           ║
║                                                                 ║
║  ┌─────────────────────────────────────────────────────────┐   ║
║  │ [████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] │   ║
║  │          ~120,000 tokens (~40% of compaction point)     │   ║
║  └─────────────────────────────────────────────────────────┘   ║
║                                                                 ║
║  Breakdown (estimated):                                         ║
║  ├── System prompt:     ~15,000 tokens                         ║
║  ├── CLAUDE.md + rules: ~5,000 tokens                          ║
║  ├── Loaded skills:     ~3,000 tokens                          ║
║  ├── Conversation:      ~97,000 tokens                         ║
║  └── Until compaction:  ~180,000 tokens                        ║
║                                                                 ║
║  Session Activity:                                              ║
║  ├── Messages: 24                                               ║
║  ├── Tool calls: 47                                            ║
║  ├── Files read: 12                                            ║
║  └── Duration: 45 minutes                                      ║
║                                                                 ║
╚═══════════════════════════════════════════════════════════════╝
```

### Step 3: Recommendations

Based on usage relative to the ~300K auto-compaction point:

**If > 80% of the compaction point:**

```
Context nearly at the auto-compaction point.

Recommendations:
1. Use /compact now to summarize on your terms
2. Use /clear to start fresh session
3. Consider breaking task into smaller parts
```

**If > 50%:**

```
Context at moderate usage.

Tips:
- Use /compact at a natural break point
- Avoid reading large files unless necessary
- Consider disabling unused MCP servers
```

**If < 50%:**

```
Context healthy.

Current session has plenty of headroom for complex tasks.
```

### Step 4: MCP Impact

If MCP servers are enabled, show their token cost:

```
MCP Server Token Impact:
├── sequential-thinking: ~500 tokens
├── playwright: ~2,000 tokens (ENABLED)
└── Total MCP overhead: ~2,500 tokens

Tip: Disable unused MCP servers to save ~2,000 tokens
```

## Technical Notes

**Token estimation:**

- Rough estimate: ~4 characters per token
- System prompt is fixed overhead
- Conversation grows with each exchange
- Files read add to context

**Accuracy:**

- Estimates are approximate
- Actual tokenization varies
- Use as guidance, not precise measurement

## Related Commands

| Command         | Purpose                     |
| --------------- | --------------------------- |
| `/compact`      | Summarize to reduce context |
| `/clear`        | Clear conversation history  |
| `/mcp`          | Manage MCP servers          |
| `/health-check` | Full system diagnostics     |

## When to Use

- Before starting large tasks
- When responses feel slow
- After reading many files
- To decide if /compact is needed

---

_Monitor context usage to maintain optimal Claude Code performance._
