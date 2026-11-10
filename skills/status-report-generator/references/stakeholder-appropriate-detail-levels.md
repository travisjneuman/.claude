# status-report-generator: Stakeholder-Appropriate Detail Levels

Part of the `status-report-generator` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Stakeholder-Appropriate Detail Levels

### Executive Summary (C-Level / VP)

```
EXECUTIVE STATUS REPORT:

Format: 1 page max, bullet points, RAG indicators
Frequency: Weekly or biweekly
Audience: VP+, C-suite, board

TEMPLATE:

PROJECT: [Name]
PERIOD:  [Date Range]
STATUS:  [GREEN / YELLOW / RED]

HIGHLIGHTS:
- [Biggest win / accomplishment]
- [Key metric improvement]
- [Important milestone reached]

RISKS:
- [Top risk + mitigation status]
- [Second risk if applicable]

DECISIONS NEEDED:
- [Specific ask with options and recommendation]

NEXT MILESTONE: [What] by [When]
CONFIDENCE: [High / Medium / Low]
```

### Team Status (Engineering / Product)

```
TEAM STATUS REPORT:

Format: 1-2 pages, moderate detail, links to tickets
Frequency: Weekly (or per sprint)
Audience: Engineering team, product managers, designers

TEMPLATE:

SPRINT: [Number] | [Date Range]
VELOCITY: [X] points / [Y] planned ([Z]%)

COMPLETED:
- [Feature/Fix] - [PR #link] (@owner)
- [Feature/Fix] - [PR #link] (@owner)
- [Feature/Fix] - [PR #link] (@owner)

IN PROGRESS:
- [Task] - [X]% complete - ETA [date] (@owner)
- [Task] - [X]% complete - ETA [date] (@owner)

BLOCKED:
- [Task] - Blocked by [reason] - Escalated to [who]

BUGS:
- [X] new bugs filed
- [Y] bugs fixed
- [Z] bugs remaining (P0: _, P1: _, P2: _)

CARRY-OVER:
- [Task not completed] - Reason: [why] - New ETA: [date]

NEXT SPRINT PLAN:
- [Planned item 1]
- [Planned item 2]
- [Planned item 3]

RETRO NOTES:
- What went well: [brief]
- What to improve: [brief]
```

### Detailed Technical Report

```
DETAILED STATUS REPORT:

Format: 2-4 pages, full technical detail
Frequency: Per sprint or biweekly
Audience: Tech leads, architects, senior engineers

TEMPLATE:

ARCHITECTURE / INFRASTRUCTURE:
- Changes deployed: [list]
- Performance impact: [metrics]
- Incidents: [count, severity, resolution]

CODE METRICS:
- PRs merged: [count]
- Avg review time: [hours]
- Test coverage: [current] (delta: [+/-X%])
- Build success rate: [%]
- Deploy frequency: [count this period]
- Mean time to recovery: [hours/minutes]

TECHNICAL DEBT:
- Debt added: [items]
- Debt resolved: [items]
- Net debt trend: [increasing/decreasing/stable]

DEPENDENCY UPDATES:
- [Package] updated from [v1] to [v2] - [reason]
- [Security patch] applied - [CVE reference]

PERFORMANCE:
- p50 latency: [Xms] (target: [Yms])
- p95 latency: [Xms] (target: [Yms])
- Error rate: [X%] (target: < [Y%])
- Uptime: [X%] (target: [Y%])
```
