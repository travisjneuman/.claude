# llm-app-development: Anti-Patterns

Part of the `llm-app-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Better Approach |
|---|---|---|
| Stuffing entire documents into context | Wastes tokens, dilutes relevance | Use RAG with chunking and retrieval |
| Parsing LLM text output with regex | Brittle, breaks on format changes | Use structured outputs (function calling, Zod) |
| No evaluation before production | Cannot measure quality or catch regressions | Build eval suite with scoring functions |
| Single huge prompt for everything | Hard to debug, expensive, slow | Decompose into smaller focused prompts |
| Ignoring token costs during development | Surprise bills at scale | Track costs per query, set budgets, cache |
| Synchronous LLM calls in request path | Slow user experience, timeout risk | Stream responses, use background jobs for heavy work |
| Hardcoded model names everywhere | Painful to upgrade or A/B test | Config-driven model selection |
| No retry logic on API calls | Transient failures cause user-visible errors | Exponential backoff with jitter |

---
