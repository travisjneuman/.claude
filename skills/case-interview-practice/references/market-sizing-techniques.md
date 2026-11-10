# case-interview-practice: Market Sizing Techniques

Part of the `case-interview-practice` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Market Sizing Techniques

### Top-Down Approach

```
EXAMPLE: Estimate annual revenue of coffee shops in Chicago

Total US population:               330M
Chicago metro population:           9.5M (2.9% of US)
US coffee shop market:              $48B annual
Chicago share (population-weighted): $48B x 2.9% = ~$1.4B

Adjustment factors:
  - Higher urbanization (more coffee shops per capita): +15%
  - Cold weather (more hot beverage consumption): +10%
Adjusted estimate: $1.4B x 1.25 = ~$1.75B
```

### Bottom-Up Approach

```
EXAMPLE: Same question, bottom-up

Number of coffee shops in Chicago:  ~3,000 (estimate)
Average transactions per day:        200
Average ticket size:                 $5.50
Operating days per year:             360

Revenue per shop: 200 x $5.50 x 360 = $396,000
Total market: 3,000 x $396,000 = ~$1.2B

Sanity check: Within range of top-down estimate (~$1.2B vs ~$1.75B)
```

### Analogy-Based Approach

```
EXAMPLE: Estimate number of gas stations in the US

Known: ~280M registered vehicles in the US
Assume: Average vehicle fills up once per week
Weekly fill-ups nationwide: 280M
Average station serves: ~200 fill-ups per day = 1,400/week
Stations needed: 280M / 1,400 = ~200,000

Actual: ~150,000 (reasonable - some stations are larger)
```
