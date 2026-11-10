# status-report-generator: Risk and Blocker Escalation

Part of the `status-report-generator` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Risk and Blocker Escalation

### Blocker Escalation Format

```
BLOCKER REPORT:

BLOCKER: [Clear description of what is blocked]
IMPACT:  [What work cannot proceed]
OWNER:   [Who is responsible for resolving]
STATUS:  [New / Escalated / In Progress / Resolved]
AGE:     [Days since identified]

ROOT CAUSE: [Why this is blocked]
ATTEMPTED: [What has been tried]
NEEDED:    [Specific action or decision needed]
FROM:      [Who needs to act]
BY:        [Date needed to avoid milestone impact]

ESCALATION PATH:
Day 1:   Raised with team lead
Day 2:   Escalated to manager
Day 3+:  Escalated to director/VP
Day 5+:  Executive escalation
```

### Risk Register Template

| Risk | Likelihood | Impact | Severity | Mitigation | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| [Description] | H/M/L | H/M/L | [LxI] | [Plan] | [Name] | [Open/Mitigated] |

```
SEVERITY MATRIX:

              LOW Impact   MED Impact   HIGH Impact
HIGH Likely:  MEDIUM       HIGH         CRITICAL
MED Likely:   LOW          MEDIUM       HIGH
LOW Likely:   LOW          LOW          MEDIUM

CRITICAL: Immediate action, executive visibility
HIGH:     Active mitigation required this sprint
MEDIUM:   Monitor, mitigation plan documented
LOW:      Accept, review quarterly
```
