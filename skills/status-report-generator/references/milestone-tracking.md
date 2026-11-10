# status-report-generator: Milestone Tracking

Part of the `status-report-generator` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Milestone Tracking

### Milestone Dashboard Template

```
PROJECT MILESTONES:

Milestone           Target Date   Status    Confidence
────────────────────────────────────────────────────────
Alpha release        [date]        [RAG]     [H/M/L]
Beta release         [date]        [RAG]     [H/M/L]
Feature freeze       [date]        [RAG]     [H/M/L]
QA complete          [date]        [RAG]     [H/M/L]
Launch               [date]        [RAG]     [H/M/L]

KEY DEPENDENCIES:
- [Milestone X] depends on [Team Y] completing [Task Z] by [Date]
- [Milestone A] depends on [External vendor] delivering [Thing] by [Date]

CRITICAL PATH:
[Task 1] → [Task 2] → [Task 3] → [Launch]
         ↗ [Task 4] ↗
```

### Burn-Down Narrative

```
BURN-DOWN SUMMARY:

PLANNED: [X] story points for this milestone
COMPLETED: [Y] story points ([Z]% of planned)
REMAINING: [W] story points
DAYS LEFT: [N] days

VELOCITY (last 3 sprints): [A], [B], [C] = avg [D] points/sprint
SPRINTS REMAINING: [M]
PROJECTED COMPLETION: [points remaining / avg velocity] = [N] sprints

AT CURRENT VELOCITY:
- Will complete [on time / X days early / X days late]
- Confidence: [HIGH / MEDIUM / LOW]

IF BEHIND:
- Option A: Reduce scope by [X] points (cut [features])
- Option B: Add [X] capacity (hire/borrow)
- Option C: Extend deadline by [X] days
- Recommendation: [which option and why]
```
