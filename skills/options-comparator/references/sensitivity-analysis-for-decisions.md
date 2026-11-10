# options-comparator: Sensitivity Analysis for Decisions

Part of the `options-comparator` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Sensitivity Analysis for Decisions

### Weight Sensitivity Testing

```
SENSITIVITY ANALYSIS:

PURPOSE: Test if the recommendation changes when weights shift.

BASELINE WEIGHTS:
  Cost: 30% | Quality: 25% | Speed: 20% | Support: 15% | Risk: 10%
  Winner: Option B (score: 3.85)

SCENARIO 1 — Cost-focused (Cost +15%, others proportionally reduced):
  Cost: 45% | Quality: 20% | Speed: 16% | Support: 12% | Risk: 7%
  Winner: [recalculate]

SCENARIO 2 — Quality-focused (Quality +15%):
  Cost: 24% | Quality: 40% | Speed: 16% | Support: 12% | Risk: 8%
  Winner: [recalculate]

SCENARIO 3 — Risk-averse (Risk +20%):
  Cost: 22% | Quality: 19% | Speed: 15% | Support: 14% | Risk: 30%
  Winner: [recalculate]

INTERPRETATION:
  If the same option wins in all scenarios → ROBUST decision
  If winner changes in 1 scenario → Note the sensitivity
  If winner changes in 2+ scenarios → Decision depends on priorities
```

### Score Sensitivity Testing

```
BREAKEVEN ANALYSIS:

"How much would Option A's score on [criterion] need
to improve to overtake Option B?"

Current:
  Option A total: 3.45
  Option B total: 3.85
  Gap: 0.40

Criterion X (weight 25%):
  Option A score: 2
  Required score to close gap: 2 + (0.40 / 0.25) = 3.6 → round to 4
  Is this plausible? [Yes/No]
  If yes → decision is sensitive to this criterion
  If no → decision is robust on this dimension
```
