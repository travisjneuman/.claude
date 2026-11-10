# microservices-architecture: Data Management

Part of the `microservices-architecture` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Data Management

### Database per Service

```
SEPARATE DATABASES:
┌────────┐  ┌────────┐  ┌────────┐
│Users   │  │Orders  │  │Products│
│Service │  │Service │  │Service │
├────────┤  ├────────┤  ├────────┤
│PostgreSQL│ │MongoDB │  │MySQL   │
└────────┘  └────────┘  └────────┘

Benefits:
✓ Independent scaling
✓ Technology freedom
✓ No shared schema coupling
✓ Fault isolation

Challenges:
- No joins across services
- Eventual consistency
- Data duplication
```

### Data Consistency Patterns

```
SAGA PATTERN (Choreography):
┌──────┐      ┌──────┐      ┌──────┐
│Order │─────>│Payment│─────>│Ship  │
│Create│      │Process│      │Order │
└──────┘      └──────┘      └──────┘
    │             │             │
    └─────────────┴─────────────┘
    Each service publishes events
    that trigger next step

SAGA PATTERN (Orchestration):
           ┌────────────┐
           │Orchestrator│
           └────────────┘
          /      │      \
         ↓       ↓       ↓
    ┌──────┐ ┌──────┐ ┌──────┐
    │Order │ │Payment│ │Ship  │
    └──────┘ └──────┘ └──────┘
    Central coordinator manages flow
```

### Event Sourcing

```
Instead of storing current state:
┌────────────────────────────┐
│ Account: $500              │
└────────────────────────────┘

Store all events:
┌────────────────────────────┐
│ 1. AccountCreated $0       │
│ 2. Deposited $1000         │
│ 3. Withdrawn $300          │
│ 4. Withdrawn $200          │
│ Current: $500              │
└────────────────────────────┘

Benefits:
✓ Complete audit trail
✓ Temporal queries
✓ Event replay
✓ Natural fit for CQRS
```

---
