# microservices-architecture: Migration Checklist

Part of the `microservices-architecture` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Migration Checklist

### Monolith to Microservices

- [ ] Map domain boundaries clearly
- [ ] Identify candidate services (start small)
- [ ] Establish CI/CD for new services (new pipelines only with the user's approval)
- [ ] Implement API gateway
- [ ] Set up service discovery
- [ ] Add distributed tracing
- [ ] Implement circuit breakers
- [ ] Extract first service (strangler fig pattern)
- [ ] Verify parity with the monolith path before shifting traffic
- [ ] Monitor and iterate
