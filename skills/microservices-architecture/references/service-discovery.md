# microservices-architecture: Service Discovery

Part of the `microservices-architecture` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Service Discovery

### Client-Side Discovery

```
┌──────┐     ┌──────────────┐
│Client│────>│Service       │────> Service A (10.0.1.10)
│      │     │Registry      │────> Service A (10.0.1.11)
│      │<────│(Consul, etcd)│────> Service A (10.0.1.12)
└──────┘     └──────────────┘

Client queries registry, then calls service directly.
Client handles load balancing.
```

### Server-Side Discovery

```
┌──────┐     ┌─────────────┐     ┌──────────────┐
│Client│────>│Load Balancer│────>│Service       │
│      │     │             │     │Registry      │
└──────┘     └─────────────┘     └──────────────┘
                                        │
                               ┌────────┴────────┐
                               ↓        ↓        ↓
                            Service  Service  Service

Load balancer handles discovery and routing.
Simpler for clients.
```

---
