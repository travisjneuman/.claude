# Agent (Subagent) Template

Use this template to create new subagents for Claude Code.

---

## File Location

```
agents/
└── [agent-name].md
```

---

## Agent Definition Template

Copy the content below to create your agent:

```markdown
---
name: agent-name
description: >-
  Detailed description of what this agent does and when it should be used.
  Include trigger phrases and example scenarios. This description is used
  by the Task tool to determine when to spawn this agent.
tools:
  - Read
  - Grep
  - Glob
  - Bash
  - Write
  - Edit
  - WebSearch
  - WebFetch
model: sonnet
---

# Agent Name

## Role

[1-2 sentences defining this agent's specialized role]

## Capabilities

You are an expert at:

- [Capability 1]
- [Capability 2]
- [Capability 3]

## Approach

When given a task:

1. **Understand** - [How to analyze the request]
2. **Plan** - [How to structure the approach]
3. **Execute** - [How to perform the work]
4. **Verify** - [How to validate results]
5. **Report** - [How to communicate findings]

## Guidelines

### Do

- [Guideline 1]
- [Guideline 2]
- [Guideline 3]

### Don't

- [Anti-pattern 1]
- [Anti-pattern 2]
- [Anti-pattern 3]

## Output Format

[Describe the expected output format]

### Example Output
```

[Example of what the agent should return]

```

## Constraints

- [Constraint 1]
- [Constraint 2]
- [Constraint 3]
```

---

## Available Tools Reference

| Tool        | Use For                          |
| ----------- | -------------------------------- |
| `Read`      | Reading files                    |
| `Grep`      | Searching file contents          |
| `Glob`      | Finding files by pattern         |
| `Bash`      | Running commands                 |
| `Write`     | Creating files                   |
| `Edit`      | Modifying files                  |
| `WebSearch` | Searching the web                |
| `WebFetch`  | Fetching web pages               |
| `TodoWrite` | Tracking progress                |
| `Task`      | Spawning nested agents (limited) |
| `LSP`       | Code intelligence                |

**Note:** Only include tools the agent actually needs. Fewer tools = more focused agent.

---

## Model Selection

| Model    | When to Use         | Token Cost |
| -------- | ------------------- | ---------- |
| `haiku`  | Quick, simple tasks | Low        |
| `sonnet` | Balanced (default)  | Medium     |
| `opus`   | Complex reasoning   | High       |

**Guidelines:**

- Use `haiku` for: file searches, simple formatting, quick lookups
- Use `sonnet` for: code review, feature implementation, debugging
- Use `opus` for: architecture decisions, complex analysis, planning

---

## Agent Categories

| Category          | Focus                 | Examples                                         |
| ----------------- | --------------------- | ------------------------------------------------ |
| **Code Quality**  | Review, lint, test    | `code-reviewer`, `test-generator`                |
| **Architecture**  | Design, planning      | `architecture-analyst`, `api-designer`           |
| **Domain Expert** | Specialized knowledge | `database-expert`, `security-auditor`            |
| **Workflow**      | Process automation    | `documentation-writer`, `refactoring-specialist` |
| **Research**      | Information gathering | `code-explainer`, `performance-optimizer`        |

---

## Best Practices

### Description

- Be verbose - this determines when the agent is invoked
- Include example trigger phrases
- List specific scenarios where this agent helps

### Tools

- Minimal set needed for the task
- Read-only agents shouldn't have Write/Edit
- Research agents don't need Bash

### System Prompt (Content)

- Clear role definition
- Structured approach (numbered steps)
- Explicit do's and don'ts
- Expected output format
- Constraints and boundaries

### Model Choice

- Default to `sonnet` unless you have a reason not to
- Use `haiku` for high-volume, simple tasks
- Reserve `opus` for critical decisions

---

## Testing Your Agent

1. Create the agent file in `agents/`
2. Test invocation:
   ```
   Task tool with subagent_type="your-agent-name"
   ```
3. Verify it:
   - Uses correct tools
   - Follows the defined approach
   - Produces expected output format
   - Respects constraints

---

## Registering Your Agent

After creation:

1. Add to `agents/README.md` in appropriate category
2. Update agent count in root `README.md`
3. Add to Task tool's agent list if using plugin system

---

## Example Agents

### Simple: File Search Agent

```markdown
---
name: file-finder
description: Quickly locates files by name or pattern. Use for "find file", "where is", "locate".
tools:
  - Glob
  - Grep
model: haiku
---

# File Finder

Find files quickly using patterns and content search.

## Approach

1. Use Glob for filename patterns
2. Use Grep for content search
3. Return sorted, deduplicated results
```

### Complex: Architecture Analyst

```markdown
---
name: architecture-analyst
description: >-
  Analyzes system architecture, identifies patterns and anti-patterns,
  provides strategic recommendations. Use for architectural reviews,
  refactoring planning, or system design decisions.
tools:
  - Read
  - Grep
  - Glob
model: opus
---

# Architecture Analyst

Expert at analyzing codebases and providing architectural guidance.

## Approach

1. Map the system structure
2. Identify architectural patterns
3. Detect anti-patterns and tech debt
4. Provide prioritized recommendations
```

---

_Template version: 1.0_
