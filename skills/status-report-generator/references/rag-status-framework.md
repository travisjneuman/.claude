# status-report-generator: RAG Status Framework

Part of the `status-report-generator` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## RAG Status Framework

### Status Definitions

| Color | Meaning | Criteria | Action Required |
| --- | --- | --- | --- |
| **GREEN** | On Track | Milestones on schedule, no blockers, metrics healthy | Continue as planned |
| **YELLOW** | At Risk | Minor delays, emerging risks, metrics declining | Monitor closely, mitigation plan |
| **RED** | Off Track | Milestones missed, active blockers, critical metrics failing | Immediate escalation, intervention |

### RAG Assessment Matrix

```
ASSESS EACH DIMENSION:

SCHEDULE:
  GREEN:  All milestones on track or ahead
  YELLOW: 1-2 items slipping, recoverable within sprint
  RED:    Major milestone at risk, recovery plan needed

SCOPE:
  GREEN:  Scope stable, requirements clear
  YELLOW: Minor scope additions, managed through backlog
  RED:    Significant scope creep, re-prioritization needed

QUALITY:
  GREEN:  Bug rate normal, test coverage stable, no incidents
  YELLOW: Bug rate elevated, test gaps identified
  RED:    Critical bugs in production, quality declining

TEAM:
  GREEN:  Team capacity sufficient, morale good
  YELLOW: Key person risk or capacity constraints
  RED:    Critical staffing gap, team burnout risk

OVERALL STATUS = worst dimension status
(If any dimension is RED, overall is RED)
```

### Status Change Triggers

```
GREEN → YELLOW TRIGGERS:
- Sprint velocity drops > 20% from average
- Blocker unresolved for > 2 business days
- Unplanned work exceeds 30% of sprint capacity
- Key dependency delayed by partner team
- New risk identified without mitigation plan

YELLOW → RED TRIGGERS:
- Milestone will be missed by > 1 week
- Critical path blocked with no workaround
- Stakeholder escalation required
- Team capacity < 70% of planned
- Quality metrics below acceptable threshold
```
