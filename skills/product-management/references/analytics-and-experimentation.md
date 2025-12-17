# Product Analytics & Experimentation

Deep dive into analytics strategy, retention analysis, and A/B testing methodology.

## Retention Analysis Deep Dive

### Cohort Retention Tables

**Example Cohort Analysis:**

| Cohort | M0 | M1 | M2 | M3 | M4 | M5 | M6 | M12 |
|--------|-----|-----|-----|-----|-----|-----|-----|------|
| Jan 2024 | 100%| 40% | 30% | 25% | 22% | 20% | 19% | 15% |
| Feb 2024 | 100%| 42% | 32% | 27% | 24% | 21% | 20% | - |
| Mar 2024 | 100%| 45% | 35% | 29% | 26% | 23% | - | - |
| Apr 2024 | 100%| 47% | 37% | 31% | 28% | - | - | - |
| May 2024 | 100%| 48% | 38% | 32% | - | - | - | - |

**Interpretation:**
- **Improving Cohorts**: Later cohorts retaining better = product improvements working
- **Flattening Curve**: Retention stabilizing = finding product-market fit
- **Declining Curve**: Continuous drop = engagement problem

### Retention Curve Patterns

**1. Smile Curve (Best):**
```
Retention %
100% |●
 80% |  ●
 60% |    ●___●___●___●  ← Flattens, indicating sticky product
 40% |
  0% |___________________
     M0 M1 M2 M3 M4 M5 M6
```

**2. Declining Curve (Problem):**
```
Retention %
100% |●
 80% |  ●
 60% |    ●
 40% |      ●
 20% |        ●___●___●  ← Never flattens, users keep churning
  0% |___________________
     M0 M1 M2 M3 M4 M5 M6
```

**3. Rising Curve (Rare, Excellent):**
```
Retention %
100% |●
 80% |  ●_●
 60% |      ●___●___●  ← Resurrection, users coming back
 40% |
  0% |___________________
     M0 M1 M2 M3 M4 M5 M6
```

### Retention Benchmarks

**B2B SaaS:**
- Month 1: 80-90%
- Month 3: 70-80%
- Month 6: 65-75%
- Month 12: 60-70%
- Annual logo retention: 85-95%
- Annual revenue retention (NRR): 100-120%+

**Consumer Products:**
- Week 1: 30-50%
- Week 4: 20-40%
- Month 3: 15-30%
- Month 6: 10-25%

**E-commerce:**
- 30-day: 20-40%
- 60-day: 15-30%
- 90-day: 10-25%
- Focus on repeat purchase rate

### Behavioral Cohort Analysis

**Segmentation Approaches:**

**By Onboarding Completion:**
| Segment | M1 Retention | M6 Retention |
|---------|--------------|--------------|
| Completed onboarding | 65% | 45% |
| Incomplete onboarding | 25% | 8% |

**By Acquisition Channel:**
| Channel | M1 Retention | CAC | LTV |
|---------|--------------|-----|-----|
| Organic | 55% | $50 | $800 |
| Paid social | 35% | $100 | $350 |
| Referral | 60% | $25 | $900 |

**By Feature Adoption:**
| Users Who... | M3 Retention |
|--------------|--------------|
| Used core feature 3+ times | 70% |
| Invited team member | 75% |
| Integrated with tool | 80% |
| None of above | 20% |

**Insights:**
- Identify activation moments that predict retention
- Find "aha moments" to emphasize in onboarding
- Understand which channels drive quality users

## A/B Testing Deep Dive

### Statistical Concepts

**Statistical Significance (p-value):**
- p < 0.05: Less than 5% chance result is random
- Common thresholds: 0.05 (95% confidence), 0.01 (99% confidence)
- Lower p-value = stronger evidence of real effect

**Statistical Power:**
- Probability of detecting real effect if it exists
- Typical target: 80%
- Higher power = need larger sample size

**Sample Size Calculation:**

```
Formula (simplified):
n = 16 × σ² / δ²

Where:
- n = sample size per variant
- σ = standard deviation of metric
- δ = minimum detectable effect (MDE)

Example:
Baseline conversion: 10%
Minimum detectable effect: 2% (absolute)
Required sample size: ~3,500 per variant
```

**Use online calculators:**
- Evan's Awesome A/B Tools
- Optimizely Sample Size Calculator
- VWO Sample Size Calculator

### Minimum Detectable Effect (MDE)

**Definition:** Smallest change worth detecting

**Considerations:**
- Business value: Is 1% lift worth the effort?
- Practical constraints: Smaller MDE = larger sample needed
- Typical ranges:
  - Critical metrics: 1-3% MDE
  - Secondary metrics: 5-10% MDE
  - Nice-to-have: 10-20% MDE

### Experiment Duration

**Factors:**
- Achieve required sample size
- Run at least 1 full business cycle (week)
- Account for weekly patterns
- Minimum: 1 week
- Maximum: 4 weeks (diminishing returns, opportunity cost)

**Avoid:**
- Stopping early when results look good (peeking problem)
- Running indefinitely waiting for significance
- Testing during anomalous periods (holidays, outages)

### Segmentation Analysis

**Why Segment:**
- Effect may vary by user type
- May win overall but hurt key segment
- May lose overall but win for strategic segment

**Common Segments:**
- New vs. returning users
- Mobile vs. desktop
- Geography
- Customer tier
- User tenure

**Example:**
```
Overall: +5% conversion (p=0.03) ✓ Ship

By Device:
- Desktop: +8% conversion (p=0.01) ✓
- Mobile: -2% conversion (p=0.25) ?

Decision: Ship desktop only, investigate mobile issue
```

### Common Pitfalls

**1. Peeking Problem:**
- Issue: Checking results repeatedly before reaching sample size
- Effect: Inflates false positive rate (Type I error)
- Solution: Wait until target sample size reached

**2. Multiple Comparisons:**
- Issue: Testing many metrics increases false positives
- Effect: 1 in 20 metrics will be "significant" by chance at p<0.05
- Solution: Bonferroni correction, or designate primary metric

**3. Sample Ratio Mismatch:**
- Issue: Unequal distribution to variants (expected 50/50, got 53/47)
- Effect: Indicates implementation bug
- Solution: Investigate before analyzing results

**4. Novelty Effect:**
- Issue: Users react to change itself, not sustained value
- Effect: Short-term lift that doesn't persist
- Solution: Run longer tests, check cohort retention

**5. Interaction Effects:**
- Issue: Multiple overlapping experiments affecting same users
- Effect: Can't isolate which change caused effect
- Solution: Avoid overlapping experiments or use factorial design

**6. Network Effects:**
- Issue: Treatment affects control group (e.g., social features)
- Effect: Dilutes measured effect
- Solution: Cluster randomization or accept limitation

### Decision Framework

**Ship:**
- ✓ Statistically significant (p < 0.05)
- ✓ Practical significance (effect size meaningful)
- ✓ No negative guardrail metrics
- ✓ Positive across key segments

**Iterate:**
- ~ Directionally positive but not stat sig
- ~ Mixed results across segments
- ~ Negative secondary metrics
- Action: Refine and re-test

**Kill:**
- ✗ No effect (p > 0.10)
- ✗ Negative primary metric
- ✗ Significant degradation of guardrails
- Action: Document learnings, move on

**Investigate:**
- ? Unexpected results
- ? Large variance in segments
- ? Sample ratio mismatch
- Action: Debug before deciding

## Advanced Analytics Techniques

### Funnel Analysis

**Conversion Funnel Example:**
```
1000 visitors → Landing page
  ↓ 40%
400 sign-ups → Registration
  ↓ 60%
240 activated → First use
  ↓ 50%
120 retained → Week 2 return
  ↓ 30%
36 converted → Paid user

Overall conversion: 3.6%
```

**Optimize:**
1. Identify biggest drop-off
2. Hypothesize why (analytics, research)
3. A/B test improvements
4. Iterate

### Engagement Scoring

**RFM Model (Recency, Frequency, Monetary):**

| Metric | Scoring |
|--------|---------|
| **Recency** | Days since last use (lower = better) |
| **Frequency** | Times used in last 30 days (higher = better) |
| **Monetary** | Revenue generated (higher = better) |

**Engagement Score:**
```
Weighted sum:
Score = (Recency × 0.3) + (Frequency × 0.5) + (Monetary × 0.2)

Segments:
- Champions: High F, High R, High M
- Loyal: High F, High R
- At Risk: High F, Low R
- Hibernating: Low F, Low R
- Lost: Very Low R
```

### Predictive Analytics

**Churn Prediction:**
- Features: Usage frequency, feature adoption, support tickets, billing issues
- Model: Logistic regression, random forest, gradient boosting
- Output: Churn probability score
- Action: Intervene with high-risk users

**Propensity to Convert:**
- Features: Engagement, feature usage, company size, industry
- Output: Conversion likelihood
- Action: Target high-propensity users for sales outreach

**LTV Prediction:**
- Features: Early engagement, acquisition channel, firmographics
- Output: Predicted lifetime value
- Action: Optimize CAC based on predicted LTV

## Event Tracking Best Practices

### Event Naming Convention

**Format:** `[Object]_[Action]`

**Examples:**
- `report_generated`
- `filter_applied`
- `user_invited`
- `document_shared`
- `payment_completed`

**Avoid:**
- `clicked_button` (too generic)
- `Button Click` (inconsistent casing)
- `reportGenerated` (camelCase, use snake_case)

### Properties to Capture

**User Properties:**
- `user_id` (required)
- `user_tier` (free, pro, enterprise)
- `account_age_days`
- `account_mrr`
- `company_size`
- `industry`

**Event Properties:**
- `feature_name`
- `method_used` (e.g., keyboard shortcut, button click)
- `outcome` (success, error, timeout)
- `duration_ms`
- `item_count`

**Context:**
- `platform` (web, ios, android)
- `app_version`
- `ab_variant`
- `timestamp`
- `session_id`

### Implementation Checklist

**Before Launch:**
- [ ] Document events in tracking plan
- [ ] Implement events in code
- [ ] Validate events fire correctly
- [ ] Test edge cases and error states
- [ ] Set up analytics dashboards
- [ ] Define alert thresholds
- [ ] Train team on interpreting data

**After Launch:**
- [ ] Monitor event volumes
- [ ] Check for anomalies
- [ ] Validate data quality
- [ ] Create saved segments
- [ ] Build retention cohorts
- [ ] Set up automated reports

## Dashboards and Reporting

### Product Health Dashboard

**Daily Metrics:**
- DAU, WAU, MAU
- New sign-ups
- Activation rate
- Critical errors

**Weekly Metrics:**
- Cohort retention
- Feature adoption
- NPS score
- Support ticket volume

**Monthly Metrics:**
- MRR/ARR
- Churn rate
- NRR
- CAC payback period

### Executive Dashboard (1-Pager)

**Format:**
```
PRODUCT HEALTH SNAPSHOT - [Month Year]

GROWTH
- MAU: 50,000 (+12% MoM)
- New Users: 8,000 (+5% MoM)

ENGAGEMENT
- DAU/MAU: 32% (stable)
- Activation Rate: 58% (+3pp)

RETENTION
- M1 Retention: 65% (+2pp)
- Annual Retention: 88% (+1pp)

REVENUE
- MRR: $500K (+8% MoM)
- NRR: 115% (stable)

TOP INITIATIVES
1. [Initiative]: [Status] - [Key metric impact]
2. [Initiative]: [Status] - [Key metric impact]
3. [Initiative]: [Status] - [Key metric impact]

RISKS & ISSUES
- [Issue]: [Mitigation plan]
```

### Experiment Results Template

```
EXPERIMENT: [Name]
Duration: [Start] to [End]
Sample Size: [N per variant]

HYPOTHESIS:
If we [change], then [metric] will [improve] because [reason]

RESULTS:
Primary Metric: [Conversion rate]
- Control: 10.2% (n=5,000)
- Treatment: 11.5% (n=5,000)
- Lift: +12.7% (p=0.03) ✓

Secondary Metrics:
- Revenue per user: +8% (p=0.08)
- Time on site: +5% (p=0.15)

Guardrails:
- Load time: No change
- Error rate: No change

DECISION: SHIP
Rationale: Stat sig lift to primary metric, no guardrail issues

ROLLOUT PLAN:
- Week 1: 10% rollout, monitor
- Week 2: 50% rollout if stable
- Week 3: 100% rollout
```
