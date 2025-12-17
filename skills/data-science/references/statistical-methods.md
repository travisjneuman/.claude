# Statistical Methods Reference

## Inferential Statistics

| Test | Use Case | Assumptions |
|------|----------|-------------|
| **t-test (1 sample)** | Mean vs. target | Normal distribution |
| **t-test (2 sample)** | Compare two means | Independence, normality |
| **Paired t-test** | Before/after | Paired observations |
| **Chi-square** | Categorical association | Expected counts > 5 |
| **ANOVA** | Compare 3+ means | Normality, homogeneity |
| **Correlation** | Linear relationship | Linear, continuous |
| **Regression** | Predict continuous | Linearity, independence |

## Hypothesis Testing

```
HYPOTHESIS TESTING PROCESS:

1. State hypotheses
   H0: Null hypothesis (no effect)
   H1: Alternative hypothesis (effect exists)

2. Choose significance level
   α = 0.05 (typically)

3. Calculate test statistic
   (depends on test type)

4. Find p-value
   P(observed | H0 true)

5. Make decision
   p < α → Reject H0
   p ≥ α → Fail to reject H0

COMMON ERRORS:
Type I (False Positive): Reject H0 when true
Type II (False Negative): Fail to reject when false

EFFECT SIZE:
Cohen's d = (M1 - M2) / SD_pooled
Small: 0.2, Medium: 0.5, Large: 0.8
```

## Model Evaluation Metrics

```
CLASSIFICATION:

Accuracy = (TP + TN) / Total
Precision = TP / (TP + FP) - Of predicted positive, how many correct?
Recall = TP / (TP + FN) - Of actual positive, how many found?
F1 = 2 * (Precision * Recall) / (Precision + Recall)
AUC-ROC = Area under ROC curve

REGRESSION:

MAE = Mean(|actual - predicted|)
MSE = Mean((actual - predicted)²)
RMSE = √MSE
R² = 1 - (SS_res / SS_tot)
MAPE = Mean(|actual - predicted| / actual) * 100

RANKING:

Precision@K = Relevant in top K / K
Recall@K = Relevant in top K / Total Relevant
MAP = Mean of Average Precision across queries
NDCG = Normalized Discounted Cumulative Gain
```
