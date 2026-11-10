# llm-app-development: Prompt Engineering Quick Reference

Part of the `llm-app-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Prompt Engineering Quick Reference

| Technique | When to Use | Example Prefix |
|---|---|---|
| **Zero-shot** | Simple, well-defined tasks | "Classify this email as spam or not:" |
| **Few-shot** | Pattern demonstration needed | "Here are examples:\n..." |
| **Model thinking** | Reasoning tasks | Enable the provider's thinking/effort setting instead of a "think step by step" prefix |
| **System prompt** | Persistent behavior rules | `role: "system"` message |
| **Delimiters** | Separating context from instructions | `"""context"""` or `<context>` tags |

---
