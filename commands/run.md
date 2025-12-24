---
description: Execute prompt(s) from ./prompts/ with automatic archiving - for structured prompt-based work
arguments:
  - name: prompt_ids
    description: "Prompt number(s) or name(s) to run. Examples: '001', '5 6 7', 'user-auth'. Use --parallel or --sequential for multiple prompts."
    required: false
---

# Run Prompt with Auto-Archive

Execute one or more prompts from `./prompts/` directory, then automatically archive completed prompts to `.archive/completed-prompts/` per CLAUDE.md session protocol.

---

## When to Use This Command

| Use `/run` when... | Use `/start-task` when... |
|-------------------|---------------------------|
| You have pre-written prompts in `./prompts/` | Describing a task naturally |
| Executing structured workflows | Need intelligent skill/agent routing |
| Running batch prompt sequences | Need complexity scoring (GSD vs Plan vs Direct) |
| Following established prompt files | Starting fresh work |

**Note:** Both approaches leverage the full skill ecosystem. `/run` is for pre-defined prompts; `/start-task` is for natural language routing.

---

## Workflow

1. Delegate to `/taches-cc-resources:run-prompt` to execute the prompt(s)
2. After successful completion, move prompt(s) from `./prompts/completed/` to `.archive/completed-prompts/`
3. Clean up any temporary directories

---

## Implementation

**Step 1:** Execute the tache run-prompt command with all arguments passed through

```
/taches-cc-resources:run-prompt {{prompt_ids}}
```

**Step 2:** After completion, check if `./prompts/completed/` exists and move contents to archive

```bash
# If prompts/completed/ exists, move all files to archive and cleanup
if [ -d "./prompts/completed" ]; then
  mkdir -p ".archive/completed-prompts"
  mv ./prompts/completed/* .archive/completed-prompts/ 2>/dev/null || true
  rmdir ./prompts/completed 2>/dev/null || true
fi
```

**Step 3:** Report final location of archived prompts

---

## Notes

- This wrapper ensures CLAUDE.md compliance (prompts archived to `.archive/completed-prompts/`)
- Transparent to user - just use `/run [prompt-id]` instead of `/run-prompt`
- Supports all `/run-prompt` features: single, parallel, sequential execution
- Skills auto-activate based on prompt content (same as standard prompts)

---

## GSD Projects

If working in a GSD project (has `.planning/STATE.md`), use GSD commands instead:

| This Command | GSD Equivalent |
|--------------|----------------|
| `/run` | `/gsd:execute-plan` |
| `./prompts/` | `.planning/phases/XX-XX-PLAN.md` |

Use `/gsd:progress` to see current project status and next plan to execute.

---

## Creating Prompts

Store prompts in `./prompts/` directory:

```
prompts/
├── 001-setup.md           # Sequential numbering
├── 002-implement-auth.md
├── user-dashboard.md      # Or descriptive names
└── README.md              # Optional: prompt overview
```

Each prompt file should contain clear instructions for Claude to execute.

---

## Related Commands

| Command | Purpose |
|---------|---------|
| `/start-task` | Intelligent routing for any task |
| `/gsd:execute-plan` | Execute GSD phase plans |
| `/taches-cc-resources:run-prompt` | Underlying prompt executor |

---

*Structured prompt execution with automatic archiving*
