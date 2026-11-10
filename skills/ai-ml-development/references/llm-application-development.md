# ai-ml-development: LLM Application Development

Part of the `ai-ml-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## LLM Application Development

### RAG Architecture (Retrieval-Augmented Generation)

```python
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

# 1. Load and chunk documents
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n\n", "\n", ". ", " "],
)
chunks = text_splitter.split_documents(documents)

# 2. Embed and store in vector database
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vectorstore = Chroma.from_documents(chunks, embeddings, persist_directory="./db")

# 3. Create retrieval chain
retriever = vectorstore.as_retriever(
    search_type="mmr",          # Maximal Marginal Relevance
    search_kwargs={"k": 5},
)

prompt = ChatPromptTemplate.from_template("""
Answer based on the following context. If the answer is not in the context, say so.

Context: {context}

Question: {question}
""")

chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | ChatOpenAI(model="gpt-4o")
)

result = chain.invoke("What is the refund policy?")
```

### Vector Databases

| Database        | Type        | Best For                          |
| --------------- | ----------- | --------------------------------- |
| **pgvector**    | PostgreSQL extension | Existing Postgres, hybrid queries |
| **Pinecone**    | Managed cloud | Production scale, serverless      |
| **Chroma**      | Local/embedded | Prototyping, small-medium datasets |
| **Weaviate**    | Self-hosted/cloud | Multimodal, GraphQL interface    |
| **Qdrant**      | Self-hosted/cloud | High performance, filtering      |

```python
# pgvector with SQLAlchemy
from pgvector.sqlalchemy import Vector

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True)
    content = Column(Text)
    embedding = Column(Vector(1536))  # OpenAI embedding dimension

# Similarity search
from sqlalchemy import text
results = session.execute(text("""
    SELECT content, embedding <=> :query_embedding AS distance
    FROM documents
    ORDER BY embedding <=> :query_embedding
    LIMIT 5
"""), {"query_embedding": str(query_vector)})
```

### Prompt Engineering Patterns

```python
# System prompt pattern
SYSTEM_PROMPT = """You are a helpful assistant that answers questions about {domain}.

Rules:
- Only answer based on provided context
- If uncertain, say "I don't know"
- Cite sources when possible
- Be concise and factual
"""

# Few-shot prompting
FEW_SHOT_PROMPT = """
Classify the sentiment of the following text.

Text: "The product arrived on time and works perfectly!"
Sentiment: positive

Text: "Terrible customer service, waited 3 hours."
Sentiment: negative

Text: "{user_input}"
Sentiment:"""

# Reasoning tasks: on current Claude models, enable thinking/effort
# (e.g. output_config={"effort": "high"}) instead of a "step by step" prefix.
# The prompt states the task and the answer format.
REASONING_PROMPT = """
Solve the problem below. Give the final answer on its own line, prefixed "Answer:".

Problem: {problem}
"""
```

### Structured Outputs

```python
# Anthropic Claude structured output
import anthropic
from pydantic import BaseModel

class ExtractedEntity(BaseModel):
    name: str
    type: str  # person, org, location
    confidence: float

class ExtractionResult(BaseModel):
    entities: list[ExtractedEntity]
    summary: str

client = anthropic.Anthropic()
# Structured outputs (not forced tool_choice, which current models reject)
response = client.messages.parse(
    model="claude-sonnet-5-5",
    max_tokens=16000,
    messages=[{"role": "user", "content": f"Extract entities from: {text}"}],
    output_format=ExtractionResult,
)
result = response.parsed_output  # validated ExtractionResult

# OpenAI structured output
from openai import OpenAI

client = OpenAI()
response = client.beta.chat.completions.parse(
    model="gpt-4o",
    messages=[{"role": "user", "content": f"Extract entities from: {text}"}],
    response_format=ExtractionResult,
)
result = response.choices[0].message.parsed
```

### Tool Use / Function Calling

```python
# Claude tool use
tools = [
    {
        "name": "search_database",
        "description": "Search the product database",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search query"},
                "category": {"type": "string", "enum": ["electronics", "clothing", "books"]},
            },
            "required": ["query"],
        },
    },
    {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {"type": "string"},
            },
            "required": ["location"],
        },
    },
]

# Agentic loop: call LLM, execute tools, feed results back
while True:
    response = client.messages.create(
        model="claude-sonnet-5-5",
        max_tokens=16000,
        messages=messages,
        tools=tools,
    )

    if response.stop_reason != "tool_use":
        break

    # Execute tool calls; return all results in one user message
    messages.append({"role": "assistant", "content": response.content})
    tool_results = []
    for block in response.content:
        if block.type == "tool_use":
            result = execute_tool(block.name, block.input)
            tool_results.append({"type": "tool_result", "tool_use_id": block.id, "content": str(result)})
    messages.append({"role": "user", "content": tool_results})
```

### Claude API / Anthropic SDK Patterns

```python
import anthropic

client = anthropic.Anthropic()

# Basic message
response = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=4096,
    system="You are a helpful coding assistant.",
    messages=[
        {"role": "user", "content": "Explain async/await in Python"},
    ],
)

# Streaming
with client.messages.stream(
    model="claude-sonnet-5-5",
    max_tokens=4096,
    messages=[{"role": "user", "content": prompt}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)

# Vision (image input)
import base64

with open("screenshot.png", "rb") as f:
    image_data = base64.standard_b64encode(f.read()).decode()

response = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": [
            {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": image_data}},
            {"type": "text", "text": "Describe this UI and suggest improvements"},
        ],
    }],
)
```

### LangChain / LlamaIndex

```python
# LangChain LCEL (LangChain Expression Language)
from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatAnthropic(model="claude-sonnet-5-5")

chain = (
    ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant."),
        ("user", "{input}"),
    ])
    | llm
    | StrOutputParser()
)

# LlamaIndex for document Q&A
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader("data/").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
response = query_engine.query("What are the key findings?")
```

### Evaluation Frameworks

```python
# RAGAS for RAG evaluation
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision

result = evaluate(
    dataset=eval_dataset,
    metrics=[faithfulness, answer_relevancy, context_precision],
)
print(result)

# LangSmith for tracing and evaluation
import langsmith

client = langsmith.Client()
# Traces are automatically captured when LANGCHAIN_TRACING_V2=true

# Custom evaluation
def evaluate_response(prediction: str, reference: str) -> dict:
    """Score response quality."""
    # Use LLM-as-judge pattern
    judge_prompt = f"""Rate the following response on a scale of 1-5:
    Reference: {reference}
    Response: {prediction}
    Score (1-5):"""
    score = llm.invoke(judge_prompt)
    return {"score": int(score.content.strip())}
```

### LLM App Architecture Patterns

| Pattern               | Use Case                                   |
| --------------------- | ------------------------------------------ |
| **RAG**               | Q&A over documents, knowledge bases        |
| **Agent**             | Multi-step tasks requiring tool use        |
| **Chain-of-Thought**  | Complex reasoning, math, logic             |
| **Map-Reduce**        | Summarizing long documents                 |
| **Router**            | Directing queries to specialized handlers  |
| **Reflection**        | Self-correcting outputs                    |
| **Multi-Agent**       | Collaborative problem solving              |
