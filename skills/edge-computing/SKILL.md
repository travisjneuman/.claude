---
name: edge-computing
description: Edge computing with Cloudflare Workers, Deno Deploy, Bun, Vercel Edge Functions, AWS Lambda@Edge, and edge databases (Turso, D1, DynamoDB Global Tables). Use when building low-latency edge applications, edge-side rendering, or globally distributed compute.
---

# Edge Computing

## Platforms

| Platform | Runtime | Cold Start | Limits |
|----------|---------|------------|--------|
| **Cloudflare Workers** | V8 isolates | ~0ms | 128MB, 30s CPU |
| **Deno Deploy** | V8 isolates | ~0ms | 512MB, 50ms CPU |
| **Vercel Edge Functions** | V8 isolates | ~0ms | 128MB, 25s |
| **AWS Lambda@Edge** | Node.js | ~100ms | 128MB, 5s (viewer) |
| **Bun** | JavaScriptCore | N/A (server) | No hard limits |

## Cloudflare Workers

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // KV storage
    const cached = await env.KV.get(url.pathname);
    if (cached) return new Response(cached, { headers: { 'Cache-Control': 'max-age=60' } });

    // D1 database
    const { results } = await env.DB.prepare('SELECT * FROM users WHERE id = ?')
      .bind(url.searchParams.get('id'))
      .all();

    // Durable Objects for state
    const id = env.COUNTER.idFromName('global');
    const obj = env.COUNTER.get(id);
    const count = await obj.fetch(request);

    return new Response(JSON.stringify(results));
  }
};
```

## Edge Databases

| Database | Type | Best For |
|----------|------|----------|
| **Cloudflare D1** | SQLite | Workers-native, SQL at edge |
| **Turso** | libSQL (SQLite) | Multi-region replicas, embedded |
| **Cloudflare KV** | Key-value | Simple caching, config |
| **Durable Objects** | Stateful | Real-time, coordination, counters |
| **Upstash Redis** | Redis | Rate limiting, sessions at edge |

## Deno Deploy

```typescript
Deno.serve(async (req: Request) => {
  const kv = await Deno.openKv();
  const url = new URL(req.url);

  if (req.method === "POST") {
    const body = await req.json();
    await kv.set(["items", crypto.randomUUID()], body);
    return new Response("Created", { status: 201 });
  }

  const entries = kv.list({ prefix: ["items"] });
  const items = [];
  for await (const entry of entries) items.push(entry.value);
  return Response.json(items);
});
```

## Patterns
- **Edge-side rendering:** SSR at the edge for <50ms TTFB globally
- **Smart routing:** Geo-aware request routing based on `request.cf.country`
- **Edge caching:** Cache API for fine-grained control, stale-while-revalidate
- **Rate limiting:** Sliding window counters with Durable Objects or Upstash
- **A/B testing:** Edge-side feature flags without origin round-trips
- **Image optimization:** On-the-fly transforms at edge (Cloudflare Images, Imgproxy)

## Constraints & Gotchas
- No Node.js APIs (fs, net, etc.) in V8 isolate runtimes
- No native modules or binaries (use WASM for compute-heavy work)
- Limited CPU time per request — offload heavy work to queues
- Cold starts are near-zero for isolates but real for Lambda@Edge
- Database connections: use HTTP-based clients, not TCP connection pools
