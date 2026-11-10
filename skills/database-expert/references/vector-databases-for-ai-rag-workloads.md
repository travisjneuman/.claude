# database-expert: Vector Databases for AI/RAG Workloads

Part of the `database-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Vector Databases for AI/RAG Workloads

### Overview

Vector databases store high-dimensional embeddings and enable similarity search, which is the foundation of RAG (Retrieval-Augmented Generation) and semantic search applications.

| Database        | Type                  | Best For                                 |
| --------------- | --------------------- | ---------------------------------------- |
| **pgvector**    | PostgreSQL extension  | Existing Postgres stacks, hybrid queries |
| **Pinecone**    | Managed cloud         | Production scale, serverless             |
| **Weaviate**    | Self-hosted/cloud     | Multimodal, GraphQL interface            |
| **Chroma**      | Embedded/local        | Prototyping, small datasets              |
| **Qdrant**      | Self-hosted/cloud     | High performance, rich filtering         |
| **Milvus**      | Self-hosted/cloud     | Large-scale, distributed                 |

### pgvector (PostgreSQL Extension)

```sql
-- Enable extension
CREATE EXTENSION vector;

-- Create table with vector column
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    embedding VECTOR(1536),  -- OpenAI text-embedding-3-small dimension
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create HNSW index (faster search, more memory)
CREATE INDEX idx_documents_embedding ON documents
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Or IVFFlat index (less memory, requires training)
CREATE INDEX idx_documents_embedding_ivf ON documents
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Similarity search (cosine distance)
SELECT id, content, metadata,
       1 - (embedding <=> $1::vector) AS similarity
FROM documents
WHERE metadata @> '{"category": "technical"}'  -- Combine with metadata filter
ORDER BY embedding <=> $1::vector
LIMIT 10;

-- Hybrid search: combine full-text + vector
SELECT id, content,
       ts_rank(search_vector, plainto_tsquery($1)) AS text_score,
       1 - (embedding <=> $2::vector) AS vector_score
FROM documents
WHERE search_vector @@ plainto_tsquery($1)
ORDER BY (0.3 * ts_rank(search_vector, plainto_tsquery($1))
        + 0.7 * (1 - (embedding <=> $2::vector))) DESC
LIMIT 10;
```

### Pinecone (Managed)

```python
from pinecone import Pinecone, ServerlessSpec

pc = Pinecone(api_key="xxx")

# Create index
pc.create_index(
    name="documents",
    dimension=1536,
    metric="cosine",
    spec=ServerlessSpec(cloud="aws", region="us-east-1"),
)

index = pc.Index("documents")

# Upsert with metadata
index.upsert(vectors=[
    {
        "id": "doc1",
        "values": embedding_vector,
        "metadata": {"source": "manual", "category": "faq"},
    },
])

# Query with metadata filter
results = index.query(
    vector=query_embedding,
    top_k=5,
    include_metadata=True,
    filter={"category": {"$eq": "faq"}},
)
```

### Chroma (Local/Embedded)

```python
import chromadb

client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(
    name="documents",
    metadata={"hnsw:space": "cosine"},
)

# Add documents (auto-embeds with default model)
collection.add(
    documents=["Document text 1", "Document text 2"],
    metadatas=[{"source": "web"}, {"source": "pdf"}],
    ids=["doc1", "doc2"],
)

# Or add pre-computed embeddings
collection.add(
    embeddings=[vector1, vector2],
    metadatas=[{"source": "web"}, {"source": "pdf"}],
    ids=["doc1", "doc2"],
)

# Query
results = collection.query(
    query_texts=["search query"],
    n_results=5,
    where={"source": "web"},
)
```

### Embedding Storage and Indexing Best Practices

| Consideration        | Recommendation                                         |
| -------------------- | ------------------------------------------------------ |
| **Embedding model**  | text-embedding-3-small (1536d) or nomic-embed (768d)   |
| **Index type**       | HNSW for <1M vectors, IVFFlat for >1M                  |
| **Dimensionality**   | Lower dims = faster search, slightly less accuracy      |
| **Batch inserts**    | Batch 100-1000 vectors per upsert call                  |
| **Metadata**         | Store filterable attributes alongside vectors           |
| **Hybrid search**    | Combine keyword (BM25) + vector for best results        |
| **Reranking**        | Use cross-encoder reranker on top-k results             |
| **Chunking**         | 500-1000 tokens per chunk with 100-200 overlap          |
