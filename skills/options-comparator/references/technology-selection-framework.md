# options-comparator: Technology Selection Framework

Part of the `options-comparator` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Technology Selection Framework

### Technology Evaluation Criteria

```
TECHNOLOGY SELECTION MATRIX:

FUNCTIONAL FIT:
- [ ] Meets core requirements (pass/fail list)
- [ ] Handles expected scale (users, data, transactions)
- [ ] Integrates with existing stack
- [ ] Supports required platforms/environments

DEVELOPER EXPERIENCE:
- [ ] Documentation quality and completeness
- [ ] Community size and activity (GitHub stars, forums)
- [ ] Learning curve for the team
- [ ] Tooling and IDE support
- [ ] Error messages and debugging experience

OPERATIONAL:
- [ ] Deployment model fits infrastructure
- [ ] Monitoring and observability support
- [ ] Backup and disaster recovery
- [ ] Security track record and patching cadence

STRATEGIC:
- [ ] Aligned with technology direction
- [ ] Vendor/project longevity (not abandonware)
- [ ] Hiring market (can you find people who know it?)
- [ ] Exit strategy (migration path if you switch later)

TOTAL COST:
- [ ] License / subscription fees
- [ ] Infrastructure costs
- [ ] Training and ramp-up time
- [ ] Maintenance and operations
- [ ] Opportunity cost of alternatives
```

### Build vs Buy Decision

| Factor | Build | Buy | Hybrid |
| --- | --- | --- | --- |
| Core differentiator? | Yes — build it | No — buy it | Customize a platform |
| Team has expertise? | Yes | No | Partial |
| Time to value | Months | Weeks | Weeks-Months |
| Long-term cost | Higher (maintenance) | Predictable (subscription) | Mixed |
| Control | Full | Limited | Moderate |
| Risk | Technical debt | Vendor dependency | Both |
| Best when | Unique requirements, strategic IP | Commodity functionality | 80/20 fit |
