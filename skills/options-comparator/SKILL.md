---
name: options-comparator
description: Structured comparison of competing options with weighted scoring matrices, trade-off analysis, decision frameworks, and recommendation templates. Use when evaluating alternatives, making purchase decisions, or comparing strategies.
---

# Options Comparator

Structured frameworks for systematically comparing alternatives, scoring options, and producing defensible recommendations.

## Weighted Scoring Matrix

### Standard Weighted Matrix Template

```
WEIGHTED SCORING MATRIX:

STEP 1: Define criteria and weights (must sum to 100%)

| Criterion       | Weight | Option A | Option B | Option C |
|-----------------|--------|----------|----------|----------|
| [Criterion 1]   |   25%  |   [1-5]  |   [1-5]  |   [1-5]  |
| [Criterion 2]   |   20%  |   [1-5]  |   [1-5]  |   [1-5]  |
| [Criterion 3]   |   20%  |   [1-5]  |   [1-5]  |   [1-5]  |
| [Criterion 4]   |   15%  |   [1-5]  |   [1-5]  |   [1-5]  |
| [Criterion 5]   |   10%  |   [1-5]  |   [1-5]  |   [1-5]  |
| [Criterion 6]   |   10%  |   [1-5]  |   [1-5]  |   [1-5]  |
|-----------------|--------|----------|----------|----------|
| WEIGHTED TOTAL  |  100%  |  [sum]   |  [sum]   |  [sum]   |

STEP 2: Calculate weighted scores
  Weighted score = Raw score x Weight
  Total = Sum of all weighted scores

STEP 3: Interpret results
  4.5-5.0: Excellent fit
  3.5-4.4: Good fit
  2.5-3.4: Acceptable with trade-offs
  1.5-2.4: Poor fit — significant concerns
  1.0-1.4: Disqualified

SCORING RUBRIC:
  5 = Exceeds requirements / best in class
  4 = Fully meets requirements
  3 = Partially meets requirements
  2 = Significant gaps
  1 = Does not meet requirements / disqualifying
```

### Weight Assignment Methods

| Method | How It Works | Best For |
| --- | --- | --- |
| **Direct assignment** | Stakeholders allocate 100 points across criteria | Small groups, quick decisions |
| **Pairwise comparison** | Compare criteria two at a time, derive weights | Rigorous prioritization |
| **MoSCoW ranking** | Must/Should/Could/Won't, then assign within tiers | Requirements-driven decisions |
| **Swing weighting** | Rate criteria by how much best-to-worst matters | Complex multi-attribute decisions |
| **Stakeholder voting** | Each stakeholder distributes 10 votes | Democratic team decisions |

### Weight Validation Checklist

```
BEFORE FINALIZING WEIGHTS:

- [ ] Weights sum to exactly 100%
- [ ] No single criterion exceeds 40% (unless justified)
- [ ] No criterion is below 5% (drop it if irrelevant)
- [ ] Weights reflect stated priorities (not just habit)
- [ ] Stakeholders reviewed and approved weights
- [ ] Weights were set BEFORE scoring options
      (prevents reverse-engineering to a preferred choice)
```

## Pairwise Comparison

### Pairwise Comparison Matrix

```
PAIRWISE COMPARISON TEMPLATE:

Compare criteria A through E. For each pair, indicate
which is more important (mark the winner):

         A      B      C      D      E    WINS  WEIGHT
A  [--]   [ ]    [A]    [ ]    [A]     2     25%
B  [B]    [--]   [B]    [B]    [B]     4     40%
C  [ ]    [ ]    [--]   [ ]    [C]     1     10%
D  [D]    [ ]    [D]    [--]   [D]     3     25%
E  [ ]    [ ]    [ ]    [ ]    [--]    0      0%

Weight = Wins / Total comparisons x 100
Total comparisons = n(n-1)/2 = 5(4)/2 = 10

INSTRUCTIONS:
1. Compare each pair: "Is criterion X more important than Y?"
2. Mark the winner in the matrix
3. Count wins for each criterion
4. Calculate weights from win percentages
5. Adjust if any criterion has 0% but should remain
```

### Forced Ranking

```
FORCED RANKING METHOD:

List all options and rank from best to worst on each criterion.
No ties allowed (forces differentiation).

| Criterion     | Rank 1 (Best) | Rank 2 | Rank 3 | Rank 4 (Worst) |
|---------------|---------------|--------|--------|-----------------|
| Price         | Option C      | Option A| Option D| Option B       |
| Quality       | Option B      | Option D| Option A| Option C       |
| Speed         | Option A      | Option B| Option C| Option D       |
| Support       | Option D      | Option C| Option B| Option A       |

SCORING:
  Rank 1 = 4 points, Rank 2 = 3, Rank 3 = 2, Rank 4 = 1
  (Or weight the ranking scores by criterion importance)
```

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/options-comparator/`).

| Topic | File | Covers |
| --- | --- | --- |
| Pros/Cons with Weights | [`references/pros-cons-with-weights.md`](references/pros-cons-with-weights.md) | Structured Pros/Cons Template; Comparative Pros/Cons |
| Decision Matrix Template | [`references/decision-matrix-template.md`](references/decision-matrix-template.md) | Comprehensive Decision Matrix |
| Trade-Off Analysis Framework | [`references/trade-off-analysis-framework.md`](references/trade-off-analysis-framework.md) | Trade-Off Mapping; Trade-Off Decision Rules |
| Sensitivity Analysis for Decisions | [`references/sensitivity-analysis-for-decisions.md`](references/sensitivity-analysis-for-decisions.md) | Weight Sensitivity Testing; Score Sensitivity Testing |
| Recommendation Memo Template | [`references/recommendation-memo-template.md`](references/recommendation-memo-template.md) | Executive Decision Memo |
| Vendor Evaluation Scorecard | [`references/vendor-evaluation-scorecard.md`](references/vendor-evaluation-scorecard.md) | Vendor Assessment Template |
| Technology Selection Framework | [`references/technology-selection-framework.md`](references/technology-selection-framework.md) | Technology Evaluation Criteria; Build vs Buy Decision |
| Decision Anti-Patterns | [`references/decision-anti-patterns.md`](references/decision-anti-patterns.md) | 38 lines |

## See Also

- [Business Strategy](../business-strategy/SKILL.md)
- [Product Management](../product-management/SKILL.md)
- [Risk Management](../risk-management/SKILL.md)
