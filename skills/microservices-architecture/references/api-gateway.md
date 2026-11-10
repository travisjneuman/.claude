# microservices-architecture: API Gateway

Part of the `microservices-architecture` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## API Gateway

### Gateway Pattern

```
               ┌─────────────┐
               │ API Gateway │
               └──────┬──────┘
        ┌──────────┬──┴──┬──────────┐
        ↓          ↓     ↓          ↓
   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
   │Users   │ │Orders  │ │Products│ │Auth    │
   │Service │ │Service │ │Service │ │Service │
   └────────┘ └────────┘ └────────┘ └────────┘

Gateway responsibilities:
- Request routing
- Authentication/Authorization
- Rate limiting
- Load balancing
- Request/Response transformation
- Caching
- Monitoring
```

### BFF (Backend for Frontend)

```
              Mobile App        Web App
                  │                │
                  ↓                ↓
          ┌────────────┐   ┌────────────┐
          │ Mobile BFF │   │  Web BFF   │
          └─────┬──────┘   └─────┬──────┘
                │                │
         ┌──────┴────────────────┴──────┐
         │         Internal APIs         │
         └───────────────────────────────┘

Each BFF:
- Optimized for its client
- Aggregates multiple services
- Handles client-specific logic
```

---
