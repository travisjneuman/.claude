# ai-ml-development: Vector Databases

Part of the `ai-ml-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Vector Databases

### Pinecone

```python
import os
from pinecone import Pinecone

pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])
index = pc.Index("my-index")

# Upsert vectors
index.upsert(vectors=[
    {"id": "1", "values": [0.1, 0.2], "metadata": {"text": "..."}},
])

# Query
results = index.query(vector=[0.1, 0.2], top_k=5, include_metadata=True)
```

### ChromaDB (Local)

```python
import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(name="documents")

collection.add(
    documents=["Doc 1", "Doc 2"],
    ids=["doc1", "doc2"],
)

results = collection.query(query_texts=["search query"], n_results=5)
```

---
