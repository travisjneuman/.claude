# Action Policy Configuration Guide

**Purpose:** Define how Claude should behave when user intent is ambiguous - default to action vs default to suggestion.

**Current Setting:** PROACTIVE (defined in CLAUDE.md)

---

## Overview

Claude 4.5 models can be configured for different action behaviors depending on your preferences and project context. This guide provides both patterns and instructions for switching between them.

---

## Current Configuration: PROACTIVE

As defined in `CLAUDE.md`, the current behavior is:

```markdown
**Action Philosophy:** PROACTIVE WITH INTELLIGENCE

- Default to implementing changes rather than only suggesting them
- When user intent is unclear, infer the most useful likely action and proceed
- Use tools to discover missing details instead of guessing or asking prematurely
- Read code before proposing changes - never speculate about unread files
- For ambiguous requests: gather context first, then act with informed judgment
```

**Best for:**

- Experienced users who want fast iteration
- Projects where you trust Claude to make good decisions
- Workflow optimization (fewer back-and-forth exchanges)
- Prototyping and rapid development

**Characteristics:**

- Implements changes directly when intent is reasonably clear
- Explores code/context to inform decisions
- Acts on inference rather than asking for clarification
- Suggests only when truly uncertain or risky

---

## Alternative: CONSERVATIVE

For users who prefer more control and explicit confirmation:

```markdown
**Action Philosophy:** CONSERVATIVE WITH THOUGHTFULNESS

- Default to providing information, research, and recommendations first
- Only implement changes when user explicitly requests action
- When intent is ambiguous, explain options and ask for direction
- Always read code before suggesting changes - never speculate
- For ambiguous requests: present multiple approaches and ask user to choose
```

**Best for:**

- Learning and education (see reasoning before action)
- Critical systems where mistakes are costly
- Teams where multiple stakeholders review decisions
- Users who prefer explicit control

**Characteristics:**

- Suggests changes and explains reasoning
- Implements only when explicitly requested
- Presents options for user to choose
- More verbose in explaining trade-offs

---

## How to Switch Modes

### To Switch to CONSERVATIVE:

1. **Edit `CLAUDE.md`** (line 24-29)
2. **Replace the Action Philosophy section** with:

```markdown
**Action Philosophy:** CONSERVATIVE WITH THOUGHTFULNESS

- Default to providing information, research, and recommendations first
- Only implement changes when user explicitly requests action
- When intent is ambiguous, explain options and ask for direction
- Always read code before suggesting changes - never speculate
- For ambiguous requests: present multiple approaches and ask user to choose
```

3. **Restart Claude Code** or use `/clear` to load new configuration

### To Switch Back to PROACTIVE:

1. **Edit `CLAUDE.md`** (line 24-29)
2. **Restore original text:**

```markdown
**Action Philosophy:** PROACTIVE WITH INTELLIGENCE

- Default to implementing changes rather than only suggesting them
- When user intent is unclear, infer the most useful likely action and proceed
- Use tools to discover missing details instead of guessing or asking prematurely
- Read code before proposing changes - never speculate about unread files
- For ambiguous requests: gather context first, then act with informed judgment
```

3. **Restart Claude Code** or use `/clear` to load new configuration

---

## Project-Level Overrides

For per-project configuration, create a project-specific `CLAUDE.md`:

```markdown
# Project Action Policy

**Override Global Setting:** CONSERVATIVE

This project requires explicit approval for all changes due to:

- Production system with high stakes
- Team review process required
- Complex domain requiring expert validation

**Action Philosophy:** CONSERVATIVE WITH THOUGHTFULNESS

- Default to providing information, research, and recommendations first
- Only implement changes when user explicitly requests action
- When intent is ambiguous, explain options and ask for direction
```

Place in project root, and it will override the global setting.

---

## Hybrid Approach: Context-Specific

You can also use ad-hoc instructions for specific tasks:

**Make Claude more proactive for a task:**

```
For this task, default to implementing changes rather than just suggesting.
If you're uncertain, use tools to discover missing context instead of asking me.
```

**Make Claude more conservative for a task:**

```
For this task, explain your proposed approach and get my approval before
implementing any changes. Present options when there are multiple valid approaches.
```

---

## Examples: PROACTIVE vs CONSERVATIVE

### Example 1: "Add validation to the login form"

**PROACTIVE behavior:**

1. Reads login form code
2. Identifies validation needs (email format, password length, etc.)
3. Implements validation with appropriate library/pattern
4. Shows what was added

**CONSERVATIVE behavior:**

1. Reads login form code
2. Explains validation needs identified
3. Suggests 2-3 approaches (client-side, server-side, library options)
4. Asks which approach to implement
5. Implements after user chooses

---

### Example 2: "The build is failing"

**PROACTIVE behavior:**

1. Runs build to see error
2. Investigates error in relevant files
3. Identifies root cause
4. Implements fix
5. Verifies build passes

**CONSERVATIVE behavior:**

1. Runs build to see error
2. Investigates error in relevant files
3. Identifies root cause
4. Explains the issue and proposed fix
5. Asks for confirmation
6. Implements after approval

---

### Example 3: "Can you improve the performance of this function?"

**PROACTIVE behavior:**

1. Reads function and usage context
2. Profiles or analyzes performance
3. Identifies bottleneck
4. Refactors with performance improvement
5. Explains what changed and why

**CONSERVATIVE behavior:**

1. Reads function and usage context
2. Profiles or analyzes performance
3. Identifies bottleneck
4. Suggests 2-3 optimization strategies
5. Explains trade-offs
6. Asks which approach to take
7. Implements after user chooses

---

## Language-Specific Cues

How Claude interprets different phrasings:

| User Says                | PROACTIVE Interprets As | CONSERVATIVE Interprets As           |
| ------------------------ | ----------------------- | ------------------------------------ |
| "Add error handling"     | Implement it            | Suggest approaches first             |
| "Fix the bug in X"       | Find and fix it         | Find it, explain fix, ask to proceed |
| "Improve the UI"         | Make improvements       | Suggest specific improvements        |
| "Can you refactor this?" | Do the refactor         | Explain refactor plan, get approval  |
| "Make this faster"       | Optimize it             | Analyze and suggest optimizations    |
| "Please add validation"  | Add validation          | Suggest validation approach          |

**To be explicit in either mode:**

- PROACTIVE: Use direct commands ("Add...", "Fix...", "Implement...")
- CONSERVATIVE: Same - explicit commands still trigger action

**To force suggestion mode:**

- "What would you suggest for..."
- "How should I..."
- "What are the options for..."

---

## Best Practices

### For PROACTIVE Mode:

- Trust Claude's judgment on implementation details
- Review changes after implementation (code review)
- Use "suggest first" language when you want options
- Provide context about constraints upfront

### For CONSERVATIVE Mode:

- Be prepared for more back-and-forth
- Appreciate seeing reasoning before action
- Use "just do it" language when you want direct action
- Leverage detailed explanations for learning

### For Either Mode:

- Be specific when you have strong preferences
- Claude always reads code before changing it
- Complex/risky changes prompt confirmation even in PROACTIVE mode
- You can override behavior per-task with explicit instructions

---

## Troubleshooting

### "Claude is too cautious (in PROACTIVE mode)"

This might happen if:

- Task seems high-risk (data loss, security)
- Multiple valid approaches exist
- User language suggests uncertainty ("maybe", "could you", "what if")

**Solutions:**

- Use more direct language ("Add...", not "Could you add...")
- Provide constraints upfront to narrow options
- Say "use your best judgment" for implementation details

### "Claude is too aggressive (in CONSERVATIVE mode)"

This shouldn't happen in CONSERVATIVE mode. If it does:

- Verify CLAUDE.md has CONSERVATIVE language
- Restart Claude Code to load config
- Check for project-level CLAUDE.md overriding global

### "I want different behavior per project"

Use project-level CLAUDE.md files:

- Production projects → CONSERVATIVE
- Personal projects → PROACTIVE
- Learning projects → CONSERVATIVE (for explanations)

---

## Related Documentation

- `~/.claude/CLAUDE.md` - Core configuration (line 24-29)
- `~/.claude/docs/reference/workflows/research-methodology.md` - Research approach
- `~/.claude/docs/WORKFLOW-GUIDE.md` - Workflow patterns

---

## Quick Reference

**Current Setting:** PROACTIVE (check CLAUDE.md:24-29)

**To verify current setting:**

```bash
grep -A5 "Action Philosophy" ~/.claude/CLAUDE.md
```

**To switch modes:**

1. Edit `~/.claude/CLAUDE.md` line 24-29
2. Replace Action Philosophy section with desired mode
3. Restart or `/clear`

---

_Action policy is a personal preference. Choose what works best for your workflow and risk tolerance._
