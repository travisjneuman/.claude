# microservices-architecture: Communication Patterns

Part of the `microservices-architecture` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Communication Patterns

### Synchronous (Request/Response)

```
REST:
┌──────┐  HTTP GET /users/123  ┌──────┐
│Client│ ─────────────────────>│Server│
│      │<───────────────────── │      │
└──────┘  { "name": "John" }   └──────┘

gRPC:
┌──────┐  Binary/Protobuf      ┌──────┐
│Client│ ─────────────────────>│Server│
│      │<───────────────────── │      │
└──────┘  Strongly typed       └──────┘

GraphQL:
┌──────┐  POST /graphql        ┌──────┐
│Client│ ─────────────────────>│Server│
│      │<───────────────────── │      │
└──────┘  Flexible queries     └──────┘
```

### Asynchronous (Event-Driven)

```
MESSAGE QUEUE:
┌────────┐      ┌─────────┐      ┌────────┐
│Producer│ ───> │  Queue  │ ───> │Consumer│
└────────┘      │(RabbitMQ│      └────────┘
                │ SQS)    │
                └─────────┘

EVENT STREAMING:
┌────────┐      ┌─────────┐      ┌────────┐
│Producer│ ───> │  Topic  │ ───> │Consumer│
└────────┘      │ (Kafka) │ ───> │Consumer│
                └─────────┘ ───> │Consumer│
                                 └────────┘
```

### Communication Comparison

| Pattern             | Use Case                   | Trade-offs             |
| ------------------- | -------------------------- | ---------------------- |
| **REST**            | CRUD, simple queries       | Simple, but chatty     |
| **gRPC**            | High performance, internal | Fast, but complex      |
| **GraphQL**         | Flexible client needs      | Flexible, but overhead |
| **Message Queue**   | Task processing            | Decoupled, but delay   |
| **Event Streaming** | Event sourcing, analytics  | Scalable, but complex  |

---
