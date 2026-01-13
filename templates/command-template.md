# Command (Slash Command) Template

Use this template to create new slash commands for Claude Code.

---

## File Location

```
commands/
└── [command-name].md
```

---

## Command Definition Template

Copy the content below to create your command:

```markdown
---
description: Brief description shown when user types /command
arguments:
  - name: arg1
    description: "Description of first argument"
    required: true
  - name: arg2
    description: "Description of optional argument"
    required: false
---

# Command Name

[Brief explanation of what this command does]

## Usage
```

/command-name <arg1> [arg2]

```

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `arg1` | Yes | [What it does] |
| `arg2` | No | [What it does, default value] |

## Behavior

When invoked, this command will:

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Implementation

[Instructions for Claude on how to execute this command]

### If arg1 is provided:
[Specific handling]

### If arg2 is provided:
[Specific handling]

## Examples

### Example 1: Basic usage
```

/command-name value1

```
Result: [What happens]

### Example 2: With optional argument
```

/command-name value1 value2

```
Result: [What happens]

## Related

- `/other-command` - [Relationship]
- `Skill(related-skill)` - [When to use instead]
```

---

## Argument Types

### Required Arguments

```yaml
arguments:
  - name: file_path
    description: "Path to the file to process"
    required: true
```

### Optional Arguments

```yaml
arguments:
  - name: verbose
    description: "Show detailed output (default: false)"
    required: false
```

### No Arguments

```yaml
# Simply omit the arguments section
---
description: Command with no arguments
---
```

---

## Command Categories

| Category      | Purpose               | Examples                          |
| ------------- | --------------------- | --------------------------------- |
| **Workflow**  | Task management       | `/start-task`, `/gsd:progress`    |
| **Discovery** | Finding resources     | `/list-skills`, `/skill-finder`   |
| **Quality**   | Code quality          | `/review-code`, `/test`           |
| **Utility**   | System operations     | `/health-check`, `/backup-config` |
| **Research**  | Information gathering | `/discover-skills`                |

---

## Best Practices

### Naming

- Use `kebab-case`: `/review-code` not `/reviewCode`
- Be verb-first: `/run-tests` not `/tests-run`
- Keep short: `/commit` not `/create-git-commit`

### Description

- Under 80 characters
- Start with verb: "Run...", "List...", "Check..."
- Include key functionality

### Arguments

- Minimize required arguments
- Provide sensible defaults
- Use clear, descriptive names

### Implementation

- Include clear step-by-step instructions
- Handle edge cases (empty input, invalid args)
- Provide feedback at each step

---

## Namespaced Commands

For plugin-specific commands, use namespacing:

```
/plugin-name:command-name
```

Example:

```
/gsd:new-project
/taches-cc-resources:check-todos
```

---

## Command vs Skill vs Agent

| Use Case                  | Best Choice |
| ------------------------- | ----------- |
| User-triggered action     | Command     |
| Domain knowledge/guidance | Skill       |
| Autonomous task execution | Agent       |
| Interactive workflow      | Command     |
| Background processing     | Agent       |

---

## Testing Your Command

1. Create the command file in `commands/`
2. Test invocation: `/your-command`
3. Test with arguments: `/your-command arg1 arg2`
4. Verify:
   - Description shows correctly
   - Arguments are parsed
   - Execution follows defined steps
   - Output is helpful

---

## Registering Your Command

After creation:

1. Add to `commands/` directory
2. Update command count in root `README.md`
3. Add to relevant documentation sections

---

## Example Commands

### Simple: No Arguments

```markdown
---
description: Show current git status and recent commits
---

# Status

Display repository status overview.

## Behavior

1. Run `git status`
2. Show last 5 commits
3. Display any stashed changes
```

### Complex: Multiple Arguments

```markdown
---
description: Search codebase for pattern with filters
arguments:
  - name: pattern
    description: "Search pattern (regex supported)"
    required: true
  - name: file_type
    description: "Filter by file type (e.g., ts, py, md)"
    required: false
  - name: path
    description: "Limit search to path"
    required: false
---

# Search

Search codebase with optional filters.

## Usage
```

/search <pattern> [file_type] [path]

```

## Implementation

1. Build grep command with pattern
2. If file_type provided, add --type flag
3. If path provided, limit to that directory
4. Execute and format results
```

---

_Template version: 1.0_
