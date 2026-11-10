---
name: llm-app-development
description: LLM app development with RAG, prompt engineering, vector databases, and AI agents
---

# LLM Application Development

## Overview

This skill covers the full spectrum of building applications powered by large language models. It addresses retrieval-augmented generation (RAG) pipelines, vector database integration, prompt engineering techniques, structured output generation, tool use and agentic patterns, evaluation frameworks, cost optimization, and streaming response handling.

Use this skill when building chatbots, AI assistants, knowledge retrieval systems, content generation tools, autonomous agents, or any application that integrates LLM capabilities into its core functionality.

---

## Core Principles

1. **Retrieval over memorization** - Use RAG to ground LLM responses in real data rather than relying on model parametric memory. This reduces hallucination and keeps answers current.
2. **Structured I/O boundaries** - Define strict schemas for both inputs (system prompts, context) and outputs (typed responses via function calling or Zod schemas). Never trust raw LLM text for downstream logic.
3. **Evaluate before shipping** - Every LLM feature needs automated evaluation. Model outputs are non-deterministic; without eval, you cannot measure regressions or improvements.
4. **Cost-aware architecture** - Token usage drives cost. Cache aggressively, choose the smallest model that meets quality requirements, and batch where possible.
5. **Fail gracefully** - LLMs can refuse, hallucinate, or timeout. Every call path needs fallback behavior, retry logic, and user-visible error states.

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/llm-app-development/`).

| Topic | File | Covers |
| --- | --- | --- |
| Key Patterns | [`references/key-patterns.md`](references/key-patterns.md) | Pattern 1: RAG Pipeline Architecture; Pattern 2: Structured Output with Zod Schemas; Pattern 3: Tool Use and AI Agents; Pattern 4: Semantic Caching for Cost Optimization; Pattern 5: Streaming Responses; Pattern 6: LLM Output Evaluation |
| Vector Database Selection Guide | [`references/vector-database-selection-guide.md`](references/vector-database-selection-guide.md) | 12 lines |
| Prompt Engineering Quick Reference | [`references/prompt-engineering-quick-reference.md`](references/prompt-engineering-quick-reference.md) | 12 lines |
| Anti-Patterns | [`references/anti-patterns.md`](references/anti-patterns.md) | 15 lines |
| Checklist | [`references/checklist.md`](references/checklist.md) | 17 lines |

## Related Resources

- **Skills:** `application-security` (prompt injection), `monitoring-observability` (LLM call tracing)
- **Rules:** `docs/reference/stacks/react-typescript.md` (frontend patterns for chat UI)
- **Rules:** `docs/reference/checklists/verification-template.md` (eval checklist)
