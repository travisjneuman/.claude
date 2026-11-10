# database-expert: Query Optimization Checklist

Part of the `database-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Query Optimization Checklist

### PostgreSQL

- [ ] Use EXPLAIN ANALYZE for slow queries
- [ ] Create indexes for WHERE, JOIN, ORDER BY columns
- [ ] Use partial indexes for filtered queries
- [ ] Use connection pooling (pgbouncer)
- [ ] Regular VACUUM and ANALYZE

### MongoDB

- [ ] Create compound indexes matching query patterns
- [ ] Use covered queries when possible
- [ ] Avoid large array fields in documents
- [ ] Monitor with explain()

### Redis

- [ ] Use appropriate data structures
- [ ] Set TTL on cache keys
- [ ] Use pipelining for bulk operations
- [ ] Monitor memory usage

---
