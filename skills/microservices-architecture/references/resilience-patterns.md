# microservices-architecture: Resilience Patterns

Part of the `microservices-architecture` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Resilience Patterns

### Circuit Breaker

```
States:
┌────────┐    Failures    ┌────────┐
│ CLOSED │───────────────>│  OPEN  │
│(normal)│                │(reject)│
└────────┘                └────────┘
    ↑                          │
    │      Timeout             │
    │   ┌────────────┐         │
    └───│HALF-OPEN   │<────────┘
        │(test)      │
        └────────────┘

Implementation:
- Track failure count
- Open circuit after threshold
- Reject calls while open
- Periodically test with half-open
- Close circuit on success
```

### Retry Pattern

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  backoff: number = 1000,
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;

      // Exponential backoff with jitter
      const delay = backoff * Math.pow(2, attempt - 1);
      const jitter = delay * 0.1 * Math.random();
      await sleep(delay + jitter);
    }
  }
}
```

### Bulkhead Pattern

```
Isolate resources to prevent cascade:

┌─────────────────────────────────────┐
│           Service A                 │
│  ┌─────────┐  ┌─────────┐          │
│  │Thread   │  │Thread   │          │
│  │Pool 1   │  │Pool 2   │          │
│  │(Service │  │(Service │          │
│  │   B)    │  │   C)    │          │
│  └─────────┘  └─────────┘          │
└─────────────────────────────────────┘

If Service C is slow, only Pool 2 is affected.
Service B calls continue normally.
```

### Timeout Pattern

```typescript
async function withTimeout<T>(fn: () => Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    fn(),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms),
    ),
  ]);
}

// Always set timeouts on external calls
const user = await withTimeout(
  () => userService.getUser(id),
  5000, // 5 second timeout
);
```

---
