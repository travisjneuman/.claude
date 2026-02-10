# ADR-[XXXX]: [Short Title of Decision]

**Date:** [YYYY-MM-DD]
**Status:** Proposed | Accepted | Deprecated | Superseded
**Deciders:** [List of people involved in the decision]
**Supersedes:** [ADR-XXXX, if this replaces a previous decision]
**Superseded by:** [ADR-XXXX, if this has been replaced]

---

## Context

[Describe the situation that motivates this decision. Include relevant technical context, business constraints, and any forces at play. This section should give a reader who was not present enough background to understand why a decision needed to be made.]

**Key Questions This Decision Addresses:**
- [Question 1]
- [Question 2]
- [Question 3]

**Constraints:**
- [Constraint 1: e.g., Must be deployable within 2 weeks]
- [Constraint 2: e.g., Budget limited to $X/month for infrastructure]
- [Constraint 3: e.g., Must support 10,000 concurrent users]
- [Constraint 4: e.g., Team has no experience with technology X]

**Current State:**
[Describe what exists today, if anything. What is the baseline we are deciding to change or build upon?]

---

## Decision

[State the decision clearly and concisely. This should be 1-3 sentences that someone can read quickly to understand what was decided.]

**We will [chosen approach] because [primary reason].**

[Optionally expand with 1-2 paragraphs of detail about what this means in practice.]

---

## Decision Criteria

Define the criteria used to evaluate alternatives and how they were weighted.

| Criterion               | Weight | Description                                              |
| ----------------------- | ------ | -------------------------------------------------------- |
| [e.g., Performance]     | High   | [Must handle X requests/second with < Yms latency]      |
| [e.g., Team expertise]  | High   | [How quickly can the team become productive?]            |
| [e.g., Cost]            | Medium | [Total cost of ownership over 2 years]                   |
| [e.g., Ecosystem]       | Medium | [Community support, documentation, third-party tools]    |
| [e.g., Scalability]     | Medium | [Can it grow with our needs over 2-3 years?]            |
| [e.g., Operational complexity] | Low | [How much operational overhead does it add?]        |

**Weight Definitions:**
- **High:** Must-have. A poor score here eliminates the option.
- **Medium:** Important. Influences the decision but not a dealbreaker.
- **Low:** Nice-to-have. Tiebreaker between otherwise equal options.

---

## Alternatives Considered

### Option A: [Name] (Chosen)

**Description:**
[Describe this approach in enough detail that someone could implement it.]

**Pros:**
- [Pro 1]
- [Pro 2]
- [Pro 3]

**Cons:**
- [Con 1]
- [Con 2]

**Evaluation Against Criteria:**

| Criterion           | Score (1-5) | Notes                                    |
| ------------------- | ----------- | ---------------------------------------- |
| [Performance]       | [4]         | [Benchmarks show X req/s]               |
| [Team expertise]    | [3]         | [2 team members have experience]        |
| [Cost]              | [4]         | [$X/month estimated]                    |
| [Ecosystem]         | [5]         | [Large community, extensive docs]       |
| [Scalability]       | [4]         | [Proven at companies of our scale]      |
| **Weighted Total**  | **[X]**     |                                          |

---

### Option B: [Name]

**Description:**
[Describe this approach.]

**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]
- [Con 3]

**Evaluation Against Criteria:**

| Criterion           | Score (1-5) | Notes                                    |
| ------------------- | ----------- | ---------------------------------------- |
| [Performance]       | [3]         | [Notes]                                  |
| [Team expertise]    | [2]         | [No team experience]                    |
| [Cost]              | [5]         | [Free / open source]                    |
| [Ecosystem]         | [3]         | [Growing but smaller community]         |
| [Scalability]       | [3]         | [Unproven at our target scale]          |
| **Weighted Total**  | **[X]**     |                                          |

**Why Not Chosen:**
[Explain in 1-2 sentences why this option was passed over.]

---

### Option C: [Name]

**Description:**
[Describe this approach.]

**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

**Evaluation Against Criteria:**

| Criterion           | Score (1-5) | Notes                                    |
| ------------------- | ----------- | ---------------------------------------- |
| [Performance]       | [5]         | [Notes]                                  |
| [Team expertise]    | [1]         | [Notes]                                  |
| [Cost]              | [2]         | [Notes]                                  |
| [Ecosystem]         | [4]         | [Notes]                                  |
| [Scalability]       | [5]         | [Notes]                                  |
| **Weighted Total**  | **[X]**     |                                          |

**Why Not Chosen:**
[Explain in 1-2 sentences why this option was passed over.]

---

### Option D: Do Nothing

**Description:**
Maintain the current approach and accept the limitations described in the Context section.

**Pros:**
- No migration effort or risk
- No new technology to learn
- No additional cost

**Cons:**
- [Current problem remains unsolved]
- [Technical debt continues to accumulate]
- [Scalability limitation persists]

**Why Not Chosen:**
[Explain why the status quo is unacceptable.]

---

## Comparison Summary

| Criterion           | Weight | Option A | Option B | Option C | Do Nothing |
| ------------------- | ------ | -------- | -------- | -------- | ---------- |
| [Performance]       | High   | 4        | 3        | 5        | 2          |
| [Team expertise]    | High   | 3        | 2        | 1        | 5          |
| [Cost]              | Medium | 4        | 5        | 2        | 5          |
| [Ecosystem]         | Medium | 5        | 3        | 4        | 3          |
| [Scalability]       | Medium | 4        | 3        | 5        | 1          |
| [Ops complexity]    | Low    | 3        | 4        | 2        | 5          |
| **Weighted Total**  |        | **[X]**  | **[X]**  | **[X]**  | **[X]**    |

---

## Consequences

### Positive

- [Positive consequence 1: e.g., Reduces API response time by ~40%]
- [Positive consequence 2: e.g., Enables horizontal scaling beyond current limits]
- [Positive consequence 3: e.g., Simplifies onboarding for new team members]

### Negative

- [Negative consequence 1: e.g., Requires 2 weeks of migration effort]
- [Negative consequence 2: e.g., Adds operational complexity for monitoring]
- [Negative consequence 3: e.g., Lock-in to vendor X for 1-year contract]

### Neutral

- [Neutral consequence 1: e.g., Changes deployment process (neither harder nor easier)]
- [Neutral consequence 2: e.g., Shifts monitoring from tool A to tool B]

### Risks

| Risk                                  | Likelihood | Impact | Mitigation                              |
| ------------------------------------- | ---------- | ------ | --------------------------------------- |
| [e.g., Migration takes longer than 2 weeks] | Medium | Medium | [Phased migration, fallback to old system] |
| [e.g., Performance regression in edge cases] | Low    | High   | [Load testing before cutover]           |
| [e.g., Vendor pricing increases]      | Low        | Medium | [Evaluate exit strategy quarterly]      |

---

## Implementation Plan

### Phase 1: [Name] (Week 1-2)

- [ ] [Task 1]
- [ ] [Task 2]
- [ ] [Task 3]

### Phase 2: [Name] (Week 3-4)

- [ ] [Task 1]
- [ ] [Task 2]

### Phase 3: [Name] (Week 5+)

- [ ] [Task 1]
- [ ] [Task 2]

### Rollback Plan

[Describe how to revert this decision if it does not work as expected. What is the rollback trigger? How long does rollback take?]

---

## Validation

How will we know this decision was the right one?

| Success Metric                        | Target                | Measurement Method          | Timeline    |
| ------------------------------------- | --------------------- | --------------------------- | ----------- |
| [e.g., API latency p99]              | [< 200ms]            | [Monitoring dashboard]      | [30 days]   |
| [e.g., Developer satisfaction]       | [4+ out of 5]        | [Team survey]               | [60 days]   |
| [e.g., Monthly infrastructure cost]  | [< $X/month]         | [Cloud billing dashboard]   | [90 days]   |

### Decision Review

- **Review date:** [Date, typically 30-90 days after implementation]
- **Review owner:** [Name]
- **Review criteria:** [What would cause us to reconsider this decision?]

---

## References

- [Link to relevant research, benchmarks, or documentation]
- [Link to related ADR: ADR-XXXX]
- [Link to RFC or design doc]
- [Link to proof of concept or spike results]

---

## Approval

| Role               | Name         | Date       | Decision          |
| ------------------ | ------------ | ---------- | ----------------- |
| Tech Lead          | [Name]       | [Date]     | Approved/Rejected |
| Engineering Manager| [Name]       | [Date]     | Approved/Rejected |
| Architect          | [Name]       | [Date]     | Approved/Rejected |
| Product Owner      | [Name]       | [Date]     | Approved/Rejected |

---

## ADR Index Convention

Store ADRs in a `docs/adr/` directory with sequential numbering:

```
docs/adr/
├── 0001-use-postgresql-for-primary-database.md
├── 0002-adopt-react-for-frontend.md
├── 0003-implement-event-sourcing-for-orders.md
├── 0004-migrate-to-kubernetes.md
└── README.md  (index of all ADRs with status)
```

### ADR Status Lifecycle

```
Proposed → Accepted → [Deprecated | Superseded]
                           ↓
                    [New ADR created]
```

- **Proposed:** Decision under discussion, not yet approved
- **Accepted:** Decision approved and being implemented
- **Deprecated:** Decision no longer relevant (system removed)
- **Superseded:** Decision replaced by a newer ADR (link to successor)

---

## Related Documentation

- `~/.claude/templates/task-template.md` - Task planning
- `~/.claude/templates/research-notes.md` - Research methodology
- `~/.claude/rules/workflows/research-methodology.md` - Structured research
- `~/.claude/CLAUDE.md` - Core rules

---

_Architecture decisions are investments. Document the reasoning so future engineers understand the "why", not just the "what"._
