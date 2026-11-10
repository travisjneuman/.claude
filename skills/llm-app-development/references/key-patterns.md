# llm-app-development: Key Patterns

Part of the `llm-app-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Key Patterns

### Pattern 1: RAG Pipeline Architecture

**When to use:** When the LLM needs access to private, large, or frequently updated knowledge that exceeds context window limits.

**Implementation:**

```typescript
import { OpenAIEmbeddings } from "@langchain/openai";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// 1. Chunking - Split documents into retrieval-friendly segments
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
  separators: ["\n\n", "\n", ". ", " "],
});

const chunks = await splitter.splitDocuments(documents);

// 2. Embedding - Convert chunks to vectors
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  dimensions: 1536,
});

// 3. Storage - Index in vector database
const vectorStore = await PGVectorStore.fromDocuments(chunks, embeddings, {
  postgresConnectionOptions: {
    connectionString: process.env.DATABASE_URL,
  },
  tableName: "documents",
  columns: {
    idColumnName: "id",
    vectorColumnName: "embedding",
    contentColumnName: "content",
    metadataColumnName: "metadata",
  },
});

// 4. Retrieval - Find relevant context for a query
async function retrieve(query: string, k: number = 5) {
  const results = await vectorStore.similaritySearchWithScore(query, k);

  // Filter by relevance threshold
  return results
    .filter(([_, score]) => score > 0.7)
    .map(([doc]) => doc);
}

// 5. Generation - Augment prompt with retrieved context
async function generateAnswer(query: string): Promise<string> {
  const context = await retrieve(query);

  const contextText = context
    .map((doc) => doc.pageContent)
    .join("\n---\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `Answer questions using ONLY the provided context. If the context doesn't contain the answer, say "I don't have information about that."

Context:
${contextText}`,
      },
      { role: "user", content: query },
    ],
    temperature: 0.1,
  });

  return response.choices[0].message.content ?? "";
}
```

**Why:** RAG separates knowledge storage from reasoning. The LLM focuses on synthesizing answers while the vector database handles retrieval at scale. This architecture supports updating knowledge without retraining and keeps token costs manageable by only including relevant context.

---

### Pattern 2: Structured Output with Zod Schemas

**When to use:** When LLM output feeds into downstream logic, APIs, or UI rendering that requires typed, validated data.

**Implementation:**

```typescript
import { z } from "zod";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

// Define the output schema
const ProductReviewAnalysis = z.object({
  sentiment: z.enum(["positive", "negative", "neutral", "mixed"]),
  confidence: z.number().min(0).max(1),
  themes: z.array(z.object({
    name: z.string(),
    sentiment: z.enum(["positive", "negative", "neutral"]),
    mentions: z.number(),
  })),
  summary: z.string().max(200),
  actionItems: z.array(z.string()),
});

type ProductReviewAnalysis = z.infer<typeof ProductReviewAnalysis>;

const openai = new OpenAI();

async function analyzeReviews(
  reviews: string[]
): Promise<ProductReviewAnalysis> {
  const response = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content: "Analyze product reviews and extract structured insights.",
      },
      {
        role: "user",
        content: `Analyze these reviews:\n${reviews.join("\n---\n")}`,
      },
    ],
    response_format: zodResponseFormat(ProductReviewAnalysis, "review_analysis"),
  });

  const parsed = response.choices[0].message.parsed;
  if (!parsed) {
    throw new Error("Failed to parse structured output");
  }
  return parsed;
}
```

**Why:** Structured outputs eliminate brittle regex parsing of LLM text. The model is constrained to produce valid JSON matching your schema, giving you type-safe data for rendering UI components, storing in databases, or passing to other services.

---

### Pattern 3: Tool Use and AI Agents

**When to use:** When the LLM needs to take actions (search, calculate, call APIs, modify data) rather than just generate text.

**Implementation:**

```typescript
import OpenAI from "openai";

const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "search_knowledge_base",
      description: "Search the internal knowledge base for relevant articles",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" },
          category: {
            type: "string",
            enum: ["billing", "technical", "account"],
            description: "Category to filter by",
          },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_support_ticket",
      description: "Create a support ticket for unresolved issues",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          priority: { type: "string", enum: ["low", "medium", "high", "urgent"] },
        },
        required: ["title", "description", "priority"],
      },
    },
  },
];

// Tool implementations
const toolHandlers: Record<string, (args: unknown) => Promise<string>> = {
  search_knowledge_base: async (args) => {
    const { query, category } = args as { query: string; category?: string };
    const results = await knowledgeBase.search(query, { category });
    return JSON.stringify(results);
  },
  create_support_ticket: async (args) => {
    const ticket = args as { title: string; description: string; priority: string };
    const created = await ticketSystem.create(ticket);
    return JSON.stringify({ ticketId: created.id, status: "created" });
  },
};

// Agentic loop - let the model decide which tools to call
async function agentLoop(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
): Promise<string> {
  const MAX_ITERATIONS = 10;

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      tools,
      tool_choice: "auto",
    });

    const message = response.choices[0].message;
    messages.push(message);

    // If no tool calls, we have the final answer
    if (!message.tool_calls || message.tool_calls.length === 0) {
      return message.content ?? "";
    }

    // Execute each tool call
    for (const toolCall of message.tool_calls) {
      const handler = toolHandlers[toolCall.function.name];
      if (!handler) {
        throw new Error(`Unknown tool: ${toolCall.function.name}`);
      }

      const args = JSON.parse(toolCall.function.arguments);
      const result = await handler(args);

      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: result,
      });
    }
  }

  throw new Error("Agent exceeded maximum iterations");
}
```

**Why:** Tool use transforms LLMs from text generators into actors that can query databases, call APIs, and orchestrate workflows. The agentic loop pattern gives the model autonomy to decide which tools to use and when, while the iteration limit prevents runaway execution.

---

### Pattern 4: Semantic Caching for Cost Optimization

**When to use:** When similar queries are common and freshness requirements allow caching.

**Implementation:**

```typescript
import { Redis } from "ioredis";
import { createHash } from "crypto";

interface CacheEntry {
  response: string;
  embedding: number[];
  createdAt: number;
}

class SemanticCache {
  private redis: Redis;
  private ttlSeconds: number;
  private similarityThreshold: number;

  constructor(options: {
    redisUrl: string;
    ttlSeconds?: number;
    similarityThreshold?: number;
  }) {
    this.redis = new Redis(options.redisUrl);
    this.ttlSeconds = options.ttlSeconds ?? 3600;
    this.similarityThreshold = options.similarityThreshold ?? 0.95;
  }

  // Exact match cache (fast, cheap)
  private exactKey(prompt: string): string {
    const hash = createHash("sha256").update(prompt).digest("hex");
    return `llm:exact:${hash}`;
  }

  // Check exact cache first, then semantic similarity
  async get(prompt: string): Promise<string | null> {
    // 1. Try exact match
    const exact = await this.redis.get(this.exactKey(prompt));
    if (exact) return exact;

    // 2. Try semantic match (more expensive, but catches paraphrases)
    const embedding = await getEmbedding(prompt);
    const candidates = await this.redis.smembers("llm:semantic:keys");

    for (const candidateKey of candidates) {
      const raw = await this.redis.get(`llm:semantic:${candidateKey}`);
      if (!raw) continue;

      const entry: CacheEntry = JSON.parse(raw);
      const similarity = cosineSimilarity(embedding, entry.embedding);

      if (similarity >= this.similarityThreshold) {
        return entry.response;
      }
    }

    return null;
  }

  async set(prompt: string, response: string): Promise<void> {
    const embedding = await getEmbedding(prompt);
    const key = createHash("sha256").update(prompt).digest("hex");

    // Store exact match
    await this.redis.setex(this.exactKey(prompt), this.ttlSeconds, response);

    // Store semantic entry
    const entry: CacheEntry = {
      response,
      embedding,
      createdAt: Date.now(),
    };
    await this.redis.setex(
      `llm:semantic:${key}`,
      this.ttlSeconds,
      JSON.stringify(entry)
    );
    await this.redis.sadd("llm:semantic:keys", key);
  }
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
```

**Why:** LLM API calls are expensive and slow. Semantic caching catches not just identical queries but paraphrased ones, dramatically reducing costs for applications with repetitive query patterns (FAQ bots, customer support, search).

---

### Pattern 5: Streaming Responses

**When to use:** Any user-facing LLM interaction where perceived latency matters.

**Implementation:**

```typescript
// Server - Next.js Route Handler with streaming
import { OpenAI } from "openai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const openai = new OpenAI();

  const stream = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    stream: true,
  });

  // Convert OpenAI stream to ReadableStream
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? "";
        if (text) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
        }
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// Client - React hook for consuming streams
function useStreamingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = async (content: string) => {
    const userMessage = { role: "user" as const, content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsStreaming(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let assistantContent = "";

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      const lines = text.split("\n").filter((line) => line.startsWith("data: "));

      for (const line of lines) {
        const data = line.slice(6);
        if (data === "[DONE]") break;

        const parsed = JSON.parse(data);
        assistantContent += parsed.text;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantContent,
          };
          return updated;
        });
      }
    }

    setIsStreaming(false);
  };

  return { messages, sendMessage, isStreaming };
}
```

**Why:** Without streaming, users stare at a blank screen for 2-10 seconds. Streaming shows tokens as they arrive, reducing perceived latency to under 500ms for first token. This is table stakes for any user-facing LLM feature.

---

### Pattern 6: LLM Output Evaluation

**When to use:** Before deploying any LLM feature to production, and as ongoing regression testing.

**Implementation:**

```typescript
import { evaluate } from "braintrust";

// Define evaluation dataset
const dataset = [
  {
    input: "What is our refund policy?",
    expected: "30-day money-back guarantee",
    tags: ["policy", "refund"],
  },
  {
    input: "How do I reset my password?",
    expected: "Go to Settings > Security > Reset Password",
    tags: ["account", "password"],
  },
];

// Custom scoring functions
function factualAccuracy(output: string, expected: string): number {
  const expectedFacts = expected.toLowerCase().split(/[,.]/).map((s) => s.trim());
  const matchedFacts = expectedFacts.filter((fact) =>
    output.toLowerCase().includes(fact)
  );
  return matchedFacts.length / expectedFacts.length;
}

function answerRelevance(output: string, input: string): number {
  // Use an LLM as a judge
  // Returns 0-1 score for how relevant the answer is to the question
  return llmJudge(input, output, "relevance");
}

// Run evaluation
const results = await evaluate("support-bot-v2", {
  data: dataset,
  task: async (input) => {
    return await generateAnswer(input.input);
  },
  scores: [
    {
      name: "factual_accuracy",
      scorer: (args) => factualAccuracy(args.output, args.expected),
    },
    {
      name: "answer_relevance",
      scorer: (args) => answerRelevance(args.output, args.input),
    },
    {
      name: "no_hallucination",
      scorer: (args) => {
        const hallucinationCheck = detectHallucination(args.output, args.context);
        return hallucinationCheck ? 0 : 1;
      },
    },
  ],
});

console.log(`Average factual accuracy: ${results.scores.factual_accuracy}`);
console.log(`Average relevance: ${results.scores.answer_relevance}`);
```

**Why:** LLM outputs are probabilistic. Without evaluation, you cannot measure whether prompt changes, model upgrades, or context modifications improve or degrade quality. Evals are the tests of LLM engineering.

---
