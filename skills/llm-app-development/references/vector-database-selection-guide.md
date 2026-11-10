# llm-app-development: Vector Database Selection Guide

Part of the `llm-app-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Vector Database Selection Guide

| Database | Best For | Scaling | Managed | Local Dev |
|---|---|---|---|---|
| **pgvector** | Existing Postgres users, < 10M vectors | Vertical | Via Supabase/Neon | Docker |
| **Pinecone** | Serverless, large-scale production | Horizontal | Yes (only) | Mock client |
| **Chroma** | Prototyping, small datasets | Limited | Chroma Cloud | In-memory |
| **Weaviate** | Hybrid search (vector + BM25) | Horizontal | Yes + self-host | Docker |
| **Qdrant** | Performance-critical, filtering | Horizontal | Yes + self-host | Docker |

---
