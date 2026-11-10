# llm-app-development: Checklist

Part of the `llm-app-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Checklist

- [ ] RAG pipeline: chunking strategy chosen and tested (size, overlap, separators)
- [ ] Vector database selected and connection pooling configured
- [ ] Embedding model chosen (dimension, cost, quality tradeoff)
- [ ] Structured output schemas defined for all LLM-to-code boundaries
- [ ] Streaming implemented for user-facing responses
- [ ] Evaluation suite with at least 20 test cases per feature
- [ ] Semantic or exact caching for repeated queries
- [ ] Error handling: retries, fallbacks, user-visible error states
- [ ] Cost tracking: per-query token usage logged
- [ ] Rate limiting on LLM API calls
- [ ] System prompts versioned and stored outside code
- [ ] Prompt injection defenses (input validation, output filtering)

---
