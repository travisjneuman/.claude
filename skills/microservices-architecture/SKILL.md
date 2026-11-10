---
name: microservices-architecture
description: Microservices architecture patterns and best practices. Use when designing distributed systems, breaking down monoliths, or implementing service communication.
---

# Microservices Architecture

Comprehensive guide for designing and implementing microservices-based systems.

## Microservices Fundamentals

### What are Microservices?

```
MICROSERVICES = Independently deployable services
               that do one thing well

Characteristics:
┌─────────────────────────────────────────┐
│ ✓ Single responsibility                 │
│ ✓ Own their data                        │
│ ✓ Independently deployable              │
│ ✓ Communicate via APIs                  │
│ ✓ Technology agnostic                   │
│ ✓ Owned by small teams                  │
└─────────────────────────────────────────┘
```

### Monolith vs Microservices

```
MONOLITH:
┌─────────────────────────────────────────┐
│           Single Application            │
│  ┌──────┬──────┬──────┬──────┐         │
│  │ Users│Orders│ Cart │Search│         │
│  └──────┴──────┴──────┴──────┘         │
│           Single Database               │
└─────────────────────────────────────────┘

MICROSERVICES:
┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│Users │  │Orders│  │ Cart │  │Search│
│ DB   │  │ DB   │  │ DB   │  │ DB   │
└──────┘  └──────┘  └──────┘  └──────┘
    │         │         │         │
    └─────────┴─────────┴─────────┘
              API Gateway
```

### When to Use Microservices

```
USE WHEN:
✓ Large, complex domain
✓ Need independent scaling
✓ Multiple teams working in parallel
✓ Different technology needs per service
✓ Fault isolation is critical
✓ Frequent, independent deployments

DON'T USE WHEN:
✗ Small team/application
✗ Simple domain
✗ Tight latency requirements
✗ Limited DevOps maturity
✗ Unclear domain boundaries
```

---

## Service Design

### Domain-Driven Design

```
BOUNDED CONTEXTS:
┌─────────────────┐  ┌─────────────────┐
│   Orders        │  │   Shipping      │
│  Context        │  │   Context       │
│ ┌─────────────┐ │  │ ┌─────────────┐ │
│ │ Order       │ │  │ │ Shipment    │ │
│ │ LineItem    │ │  │ │ Carrier     │ │
│ │ Customer(ID)│ │  │ │ Address     │ │
│ └─────────────┘ │  │ └─────────────┘ │
└─────────────────┘  └─────────────────┘

Each context has its own:
- Ubiquitous language
- Data model
- Business rules
```

### Service Boundaries

```
GOOD boundaries follow:
┌─────────────────────────────────────────┐
│ Business Capability                     │
│ - What the business does                │
│ - e.g., Payment Processing, Inventory   │
├─────────────────────────────────────────┤
│ Subdomain                               │
│ - Area of expertise                     │
│ - e.g., Pricing, Catalog, Customer      │
├─────────────────────────────────────────┤
│ Single Responsibility                   │
│ - Does one thing well                   │
│ - Can explain in one sentence           │
└─────────────────────────────────────────┘

BAD boundaries:
✗ Technical layers (UI service, DB service)
✗ CRUD operations (User CRUD service)
✗ Too granular (EmailSender service)
```

### Service Size Guidelines

```
Right-sized service:
- 2-pizza team can own it (5-8 people)
- Rewrite in 2-4 weeks if needed
- Clear, single business purpose
- Minimal external dependencies
- Own its data completely

Too big: Multiple teams needed, mixed concerns
Too small: Can't function independently
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/microservices-architecture/`).

| Topic | File | Covers |
| --- | --- | --- |
| Communication Patterns | [`references/communication-patterns.md`](references/communication-patterns.md) | Synchronous (Request/Response); Asynchronous (Event-Driven); Communication Comparison |
| Data Management | [`references/data-management.md`](references/data-management.md) | Database per Service; Data Consistency Patterns; Event Sourcing |
| API Gateway | [`references/api-gateway.md`](references/api-gateway.md) | Gateway Pattern; BFF (Backend for Frontend) |
| Service Discovery | [`references/service-discovery.md`](references/service-discovery.md) | Client-Side Discovery; Server-Side Discovery |
| Resilience Patterns | [`references/resilience-patterns.md`](references/resilience-patterns.md) | Circuit Breaker; Retry Pattern; Bulkhead Pattern; Timeout Pattern |
| Observability | [`references/observability.md`](references/observability.md) | The Three Pillars; Distributed Tracing; Health Checks |
| Deployment | [`references/deployment.md`](references/deployment.md) | Containerization; Kubernetes Basics |
| Testing Strategies | [`references/testing-strategies.md`](references/testing-strategies.md) | Test Pyramid for Microservices; Contract Testing |
| Best Practices | [`references/best-practices.md`](references/best-practices.md) | DO:; DON'T: |
| Migration Checklist | [`references/migration-checklist.md`](references/migration-checklist.md) | Monolith to Microservices |
