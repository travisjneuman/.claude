---
description: Display context window usage and token statistics
---

# Context Stats

Display current context window usage and provide optimization recommendations.

## Usage

```
/context-stats
```

## Platform Compatibility

| Platform | Status | Notes |
|----------|--------|-------|
| Windows | ✅ | Fully supported |
| macOS | ✅ | Fully supported |
| Linux | ✅ | Fully supported |

This command uses Claude's internal estimation - no platform-specific code.

## Behavior

### Step 1: Gather Statistics

**Context window info:**
- Model context limit (varies by model)
- Approximate current usage
- Available headroom

**Session activity:**
- Messages in conversation
- Tools invoked
- Files read

### Step 2: Display Report

```
╔═══════════════════════════════════════════════════════════════╗
║  Context Window Statistics                                     ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Model: claude-opus-4-5-20251101                               ║
║  Context Limit: 200,000 tokens                                  ║
║                                                                 ║
║  ┌─────────────────────────────────────────────────────────┐   ║
║  │ [████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] │   ║
║  │                    ~40% used                            │   ║
║  └─────────────────────────────────────────────────────────┘   ║
║                                                                 ║
║  Breakdown (estimated):                                         ║
║  ├── System prompt:     ~15,000 tokens (7.5%)                  ║
║  ├── CLAUDE.md:         ~1,100 tokens (0.5%)                   ║
║  ├── Loaded skills:     ~3,000 tokens (1.5%)                   ║
║  ├── Conversation:      ~60,000 tokens (30%)                   ║
║  └── Available:         ~120,900 tokens (60.5%)                ║
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

Based on usage level:

**If > 80% used:**
```
⚠️  Context window nearly full!

Recommendations:
1. Use /compact to summarize conversation
2. Use /clear to start fresh session
3. Consider breaking task into smaller parts
```

**If > 50% used:**
```
ℹ️  Context window at moderate usage.

Tips:
- Use /compact if conversation feels slow
- Avoid reading large files unless necessary
- Consider disabling unused MCP servers
```

**If < 50% used:**
```
✅ Context window healthy.

Current session has plenty of headroom for complex tasks.
```

### Step 4: MCP Impact

If MCP servers are enabled, show their token cost:

```
MCP Server Token Impact:
├── sequential-thinking: ~500 tokens
├── playwright: ~2,000 tokens (ENABLED)
└── Total MCP overhead: ~2,500 tokens

💡 Tip: Disable unused MCP servers to save ~2,000 tokens
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

| Command | Purpose |
|---------|---------|
| `/compact` | Summarize to reduce context |
| `/clear` | Clear conversation history |
| `/mcp` | Manage MCP servers |
| `/health-check` | Full system diagnostics |

## When to Use

- Before starting large tasks
- When responses feel slow
- After reading many files
- To decide if /compact is needed

---

*Monitor context usage to maintain optimal Claude Code performance.*
