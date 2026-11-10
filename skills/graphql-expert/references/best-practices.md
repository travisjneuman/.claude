# graphql-expert: Best Practices

Part of the `graphql-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Best Practices

### DO:

- Design schema from client perspective
- Use input types for mutations
- Return payloads with errors from mutations
- Implement DataLoader for N+1 prevention
- Use cursor-based pagination
- Add query complexity limits
- Version schemas carefully

### DON'T:

- Expose database schema directly
- Create deeply nested types unnecessarily
- Forget about authorization
- Allow unbounded queries
- Skip error handling
- Ignore caching strategies
- Mutate data in queries

---
