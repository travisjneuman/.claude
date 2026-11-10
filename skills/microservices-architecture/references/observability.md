# microservices-architecture: Observability

Part of the `microservices-architecture` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Observability

### The Three Pillars

```
LOGS:
┌─────────────────────────────────────────┐
│ 2024-01-15 10:30:45 [INFO] OrderService │
│ Order created: { id: 123, user: 456 }   │
└─────────────────────────────────────────┘

METRICS:
┌─────────────────────────────────────────┐
│ order_created_total: 1523               │
│ order_processing_seconds: 0.234         │
│ active_connections: 45                  │
└─────────────────────────────────────────┘

TRACES:
┌─────────────────────────────────────────┐
│ [Request ID: abc123]                    │
│ ├─ Gateway: 2ms                         │
│ ├─ OrderService: 150ms                  │
│ │  ├─ UserService: 45ms                 │
│ │  └─ InventoryService: 80ms            │
│ └─ Total: 152ms                         │
└─────────────────────────────────────────┘
```

### Distributed Tracing

```
Trace Context Propagation:
┌──────┐  X-Trace-ID: abc  ┌──────┐
│API   │─────────────────>│Order │
│GW    │                   │Svc   │
└──────┘                   └──────┘
                              │
              X-Trace-ID: abc │
                              ↓
                           ┌──────┐
                           │User  │
                           │Svc   │
                           └──────┘

Tools: Jaeger, Zipkin, AWS X-Ray, Datadog
```

### Health Checks

```typescript
// Liveness: Is the service running?
app.get("/health/live", (req, res) => {
  res.status(200).json({ status: "alive" });
});

// Readiness: Is the service ready to handle traffic?
app.get("/health/ready", async (req, res) => {
  const dbHealthy = await checkDatabase();
  const cacheHealthy = await checkCache();

  if (dbHealthy && cacheHealthy) {
    res.status(200).json({ status: "ready" });
  } else {
    res.status(503).json({
      status: "not ready",
      checks: { database: dbHealthy, cache: cacheHealthy },
    });
  }
});
```

---
