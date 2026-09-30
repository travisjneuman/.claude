---
description: Execute prompt(s) from ./prompts/ with automatic archiving - for structured prompt-based work
arguments:
  - name: prompt_ids
    description: "Prompt number(s) or name(s) to run. Examples: '001', '5 6 7', 'user-auth'. Use --parallel or --sequential for multiple prompts."
    required: false
disable-model-invocation: true
---

# Run Prompt with Auto-Archive

Execute one or more prompts from `./prompts/` directory, then automatically archive completed prompts to `.archive/completed-prompts/` per CLAUDE.md session protocol.

---

## When to Use This Command

| Use `/run` when...                           | Use `/start-task` when...                       |
| -------------------------------------------- | ----------------------------------------------- |
| You have pre-written prompts in `./prompts/` | Describing a task naturally                     |
| Executing structured workflows               | Need intelligent skill/agent routing            |
| Running batch prompt sequences               | Need complexity scoring (GSD vs Plan vs Direct) |
| Following established prompt files           | Starting fresh work                             |

**Note:** Both approaches leverage the full skill ecosystem. `/run` is for pre-defined prompts; `/start-task` is for natural language routing.

---

## Workflow

1. Resolve and execute the prompt(s) directly (the `taches-cc-resources` plugin that used to provide `/run-prompt` is not enabled)
2. After successful completion, move executed prompt(s) to `.archive/completed-prompts/`
3. Clean up any temporary directories

---

## Implementation

**Step 1:** Resolve `{{prompt_ids}}` against `./prompts/*.md`:

- Empty: the most recently modified prompt
- A number: the file with that zero-padded prefix (`5` matches `005-*.md`)
- Text: files whose name contains it; if several match, list them and ask which one

**Step 2:** Execute. One prompt: read it and carry it out. Several prompts: run them in order by default (`--sequential`); with `--parallel`, give each independent prompt to its own subagent via the Agent tool, in one message. As each prompt finishes, move it to `./prompts/completed/`.

**Step 3:** After completion, check if `./prompts/completed/` exists and move contents to archive

```bash
# If prompts/completed/ exists, move all files to archive and cleanup
if [ -d "./prompts/completed" ]; then
  mkdir -p ".archive/completed-prompts"
  mv ./prompts/completed/* .archive/completed-prompts/ 2>/dev/null || true
  rmdir ./prompts/completed 2>/dev/null || true
fi
```

**Step 4:** Report final location of archived prompts

---

## Notes

- This wrapper ensures CLAUDE.md compliance (prompts archived to `.archive/completed-prompts/`)
- Supports single, parallel, and sequential execution
- Skills auto-activate based on prompt content (same as standard prompts)

---

## GSD Projects

If working in a GSD project (has `.planning/STATE.md`), use GSD commands instead:

| This Command | GSD Equivalent                   |
| ------------ | -------------------------------- |
| `/run`       | `/gsd-core:execute-phase`        |
| `./prompts/` | `.planning/phases/XX-XX-PLAN.md` |

Use `/gsd-core:progress` to see current project status and next plan to execute.

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

| Command                           | Purpose                          |
| --------------------------------- | -------------------------------- |
| `/start-task`                     | Intelligent routing for any task |
| `/gsd-core:execute-phase`         | Execute GSD phase plans          |

---

_Structured prompt execution with automatic archiving_
