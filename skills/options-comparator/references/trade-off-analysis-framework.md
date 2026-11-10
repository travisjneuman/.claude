# options-comparator: Trade-Off Analysis Framework

Part of the `options-comparator` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Trade-Off Analysis Framework

### Trade-Off Mapping

```
TRADE-OFF ANALYSIS:

STEP 1: Identify the key trade-off dimensions
  Common trade-offs:
  - Cost vs Quality
  - Speed vs Thoroughness
  - Flexibility vs Standardization
  - Control vs Convenience
  - Short-term vs Long-term
  - Risk vs Reward
  - Simplicity vs Capability

STEP 2: Map options on trade-off axes

              HIGH QUALITY
                  |
                  |    Option B
                  |       *
                  |
  LOW COST -------+--------- HIGH COST
                  |
          Option A|
              *   |
                  |    Option C
                  |       *
              LOW QUALITY

STEP 3: Identify the efficient frontier
  Options on the frontier are rationally competitive.
  Options below the frontier are dominated
  (another option is better on all axes).

STEP 4: Choose based on priorities
  "We are optimizing for [dimension] while keeping
  [other dimension] above [minimum threshold]."
```

### Trade-Off Decision Rules

| Rule | When to Use | How It Works |
| --- | --- | --- |
| **Maximize one, threshold others** | Clear primary objective | Set minimums for secondary criteria, then pick highest on primary |
| **Satisfice** | Time-pressured, good enough is fine | Pick first option that meets all minimum thresholds |
| **Lexicographic** | Clear priority ordering | Sort by most important criterion first, break ties with second |
| **Minimax regret** | High uncertainty | Choose option that minimizes worst-case disappointment |
| **Expected value** | Quantifiable outcomes and probabilities | Probability x payoff for each scenario, pick highest EV |
