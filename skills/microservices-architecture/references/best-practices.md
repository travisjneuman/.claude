# microservices-architecture: Best Practices

Part of the `microservices-architecture` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Best Practices

### DO:

- Start with a monolith, extract services later
- Define clear service boundaries
- Use asynchronous communication where possible
- Implement circuit breakers
- Centralize logging and monitoring
- Automate everything
- Design for failure
- Version your APIs

### DON'T:

- Create too many, too small services
- Share databases between services
- Make synchronous chains too deep
- Ignore distributed system complexities
- Couple services through shared libraries
- Skip contract testing
- Deploy without monitoring

---
