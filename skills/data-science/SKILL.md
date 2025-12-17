---
name: data-science
description: Data science and analytics expertise for statistical analysis, machine learning pipelines, data governance, business intelligence, predictive modeling, and analytics strategy. Use when building ML models, analyzing data, creating dashboards, or designing data architectures.
---

# Data Science Expert

Comprehensive data science frameworks for analytics, machine learning, and data-driven decision making.

## Data Strategy

### Data Maturity Model

| Level | Name | Characteristics |
|-------|------|-----------------|
| 1 | **Ad Hoc** | Manual, inconsistent, siloed |
| 2 | **Opportunistic** | Some automation, point solutions |
| 3 | **Systematic** | Defined processes, governance emerging |
| 4 | **Differentiating** | Data-driven decisions, advanced analytics |
| 5 | **Transformative** | AI-first, competitive advantage |

### Analytics Value Chain

```
DATA → INFORMATION → INSIGHT → ACTION → VALUE

PROGRESSION:
Descriptive: What happened?
Diagnostic: Why did it happen?
Predictive: What will happen?
Prescriptive: What should we do?
Autonomous: Self-optimizing systems
```

### Data Strategy Framework

```
STRATEGY COMPONENTS:

VISION:
- How will data create value?
- What decisions will data enable?

PEOPLE:
- Data literacy programs
- Talent acquisition
- Operating model

PROCESS:
- Data governance
- Data quality management
- Analytics workflow

TECHNOLOGY:
- Data architecture
- Analytics platforms
- AI/ML infrastructure

USE CASES:
- Prioritized opportunities
- Quick wins vs. transformational
- Business alignment
```

## Statistical Analysis

### Descriptive Statistics

```
CENTRAL TENDENCY:
- Mean: Sum / Count (sensitive to outliers)
- Median: Middle value (robust to outliers)
- Mode: Most frequent value

DISPERSION:
- Range: Max - Min
- Variance: Average squared deviation
- Standard Deviation: √Variance
- IQR: Q3 - Q1 (robust)

DISTRIBUTION SHAPE:
- Skewness: Asymmetry (0 = symmetric)
- Kurtosis: Tail heaviness (3 = normal)
```

### Inferential Statistics

| Test | Use Case | Assumptions |
|------|----------|-------------|
| **t-test (1 sample)** | Mean vs. target | Normal distribution |
| **t-test (2 sample)** | Compare two means | Independence, normality |
| **Paired t-test** | Before/after | Paired observations |
| **Chi-square** | Categorical association | Expected counts > 5 |
| **ANOVA** | Compare 3+ means | Normality, homogeneity |
| **Correlation** | Linear relationship | Linear, continuous |
| **Regression** | Predict continuous | Linearity, independence |

### Hypothesis Testing

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

## Machine Learning

### ML Pipeline

```
PIPELINE STAGES:

1. PROBLEM DEFINITION
   - Business objective
   - Success metrics
   - Constraints

2. DATA COLLECTION
   - Data sources
   - Sampling strategy
   - Labeling (if supervised)

3. DATA PREPARATION
   - Cleaning
   - Feature engineering
   - Train/validation/test split

4. MODEL DEVELOPMENT
   - Algorithm selection
   - Training
   - Hyperparameter tuning

5. EVALUATION
   - Performance metrics
   - Cross-validation
   - Error analysis

6. DEPLOYMENT
   - Integration
   - Monitoring
   - Maintenance
```

### Algorithm Selection

| Task | Algorithms | When to Use |
|------|------------|-------------|
| **Classification** | Logistic Regression, Random Forest, XGBoost, Neural Networks | Categorical outcomes |
| **Regression** | Linear Regression, Ridge/Lasso, Random Forest, XGBoost | Continuous outcomes |
| **Clustering** | K-Means, Hierarchical, DBSCAN | Group discovery |
| **Dimensionality Reduction** | PCA, t-SNE, UMAP | Feature reduction, visualization |
| **Anomaly Detection** | Isolation Forest, One-Class SVM, Autoencoders | Outlier detection |
| **Time Series** | ARIMA, Prophet, LSTM | Sequential data |
| **Recommendation** | Collaborative Filtering, Content-Based, Matrix Factorization | Personalization |
| **NLP** | Transformers, BERT, GPT | Text understanding/generation |

### Model Evaluation Metrics

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

### Feature Engineering

```
NUMERICAL FEATURES:
- Scaling (StandardScaler, MinMaxScaler)
- Log transformation (skewed data)
- Binning (continuous to categorical)
- Polynomial features
- Interaction terms

CATEGORICAL FEATURES:
- One-hot encoding
- Label encoding
- Target encoding
- Frequency encoding
- Embedding (high cardinality)

TEXT FEATURES:
- Bag of words
- TF-IDF
- Word embeddings (Word2Vec, GloVe)
- Transformers (BERT embeddings)

TIME FEATURES:
- Cyclical encoding (sin/cos)
- Lag features
- Rolling statistics
- Time since events

DOMAIN-SPECIFIC:
- Domain knowledge features
- Aggregations (customer-level from transactions)
- Ratios and differences
```

## Data Governance

### Data Governance Framework

```
GOVERNANCE PILLARS:

POLICIES:
- Data ownership
- Data classification
- Data retention
- Data access
- Data quality standards

ROLES:
- Data Owner: Accountable for data domain
- Data Steward: Day-to-day quality management
- Data Custodian: Technical implementation
- Data Consumer: End user

PROCESSES:
- Data cataloging
- Metadata management
- Data lineage
- Issue resolution
- Change management

METRICS:
- Data quality scores
- Policy compliance
- Data access requests
- Issue resolution time
```

### Data Quality Dimensions

| Dimension | Definition | Measurement |
|-----------|------------|-------------|
| **Accuracy** | Correct representation of reality | % records matching source |
| **Completeness** | All required data present | % non-null values |
| **Consistency** | Same across systems | % matching across sources |
| **Timeliness** | Available when needed | Latency, freshness |
| **Validity** | Conforms to format/rules | % passing validation |
| **Uniqueness** | No unwanted duplicates | Duplicate rate |

### Data Catalog Components

```
CATALOG ELEMENTS:

TECHNICAL METADATA:
- Schema, data types
- Source system
- Update frequency
- Row counts

BUSINESS METADATA:
- Business definition
- Owner, steward
- Use cases
- Related datasets

OPERATIONAL METADATA:
- Last updated
- Data quality scores
- Access statistics
- Lineage

SEARCH & DISCOVERY:
- Tags, categories
- Business glossary links
- Related datasets
- Popular queries
```

## Business Intelligence

### BI Architecture

```
ARCHITECTURE LAYERS:

DATA SOURCES:
- Operational systems
- External data
- IoT/streaming

DATA INTEGRATION:
- ETL/ELT pipelines
- Data lakes
- Data warehouses

SEMANTIC LAYER:
- Business definitions
- Calculated metrics
- Hierarchies
- Relationships

PRESENTATION:
- Dashboards
- Reports
- Ad-hoc analysis
- Embedded analytics
```

### Dashboard Design Principles

```
DESIGN PRINCIPLES:

PURPOSE:
- One clear objective per dashboard
- Know your audience
- Enable decisions

LAYOUT:
- Most important top-left
- Related items grouped
- Progressive disclosure
- Whitespace for clarity

VISUALS:
- Right chart for data type
- Consistent formatting
- Minimal decoration
- Color with purpose

INTERACTIVITY:
- Filters for exploration
- Drill-down capability
- Cross-filtering
- Tooltip details
```

### Metric Design

```
METRIC DEFINITION TEMPLATE:

NAME: [Metric name]
DEFINITION: [Clear business definition]
FORMULA: [Precise calculation]
OWNER: [Responsible person]
DATA SOURCE: [Where it comes from]
GRAIN: [Level of detail]
FREQUENCY: [Update cadence]
DIMENSIONS: [Slicing attributes]
TARGETS: [Goals/benchmarks]
RELATED: [Related metrics]
```

## Predictive Modeling

### Use Case Framework

| Use Case | Business Application | Approach |
|----------|---------------------|----------|
| **Churn Prediction** | Retention programs | Classification |
| **Demand Forecasting** | Inventory planning | Time series |
| **Lead Scoring** | Sales prioritization | Classification |
| **Price Optimization** | Revenue management | Regression/RL |
| **Fraud Detection** | Risk mitigation | Anomaly detection |
| **Recommendation** | Personalization | Collaborative filtering |
| **Customer Segmentation** | Marketing targeting | Clustering |
| **Lifetime Value** | Customer investment | Regression |

### Model Development Process

```
MODEL LIFECYCLE:

1. DEFINE
   - Business problem
   - Success metrics
   - Constraints
   - Timeline

2. EXPLORE
   - Data assessment
   - EDA
   - Feature candidates
   - Baseline model

3. DEVELOP
   - Feature engineering
   - Model selection
   - Hyperparameter tuning
   - Validation

4. VALIDATE
   - Holdout test set
   - Business validation
   - Bias testing
   - Stress testing

5. DEPLOY
   - Production integration
   - A/B testing
   - Monitoring setup
   - Documentation

6. MONITOR
   - Performance tracking
   - Data drift detection
   - Model retraining
   - Feedback loop
```

### Model Monitoring

```
MONITORING DIMENSIONS:

DATA DRIFT:
- Input feature distributions changing
- Detect with KS test, PSI
- Triggers: retraining

MODEL DRIFT:
- Model performance degrading
- Track prediction accuracy
- Triggers: investigation, retraining

CONCEPT DRIFT:
- Underlying relationships changing
- Harder to detect
- Requires domain knowledge

OPERATIONAL:
- Latency
- Error rates
- Resource usage
- API health
```

## Data Ethics & Privacy

### Ethical AI Framework

```
PRINCIPLES:

FAIRNESS:
- No discriminatory outcomes
- Bias testing across groups
- Regular auditing

ACCOUNTABILITY:
- Clear ownership
- Decision audit trails
- Escalation process

TRANSPARENCY:
- Explainable decisions
- Clear documentation
- User communication

PRIVACY:
- Data minimization
- Consent management
- Security controls
```

### Bias Detection

```
BIAS TYPES:

HISTORICAL: Reflects past discrimination
REPRESENTATION: Training data not representative
MEASUREMENT: Proxy variables correlate with protected attributes
AGGREGATION: Single model for diverse populations
EVALUATION: Inappropriate benchmarks

FAIRNESS METRICS:
- Demographic Parity: Equal positive rates
- Equalized Odds: Equal TPR and FPR
- Individual Fairness: Similar inputs, similar outputs
- Calibration: Equal accuracy across groups
```

## Analytics Team Structure

### Team Roles

| Role | Focus | Skills |
|------|-------|--------|
| **Data Engineer** | Pipelines, infrastructure | SQL, Python, Spark, Cloud |
| **Data Analyst** | Reporting, ad-hoc analysis | SQL, BI tools, Statistics |
| **Data Scientist** | Modeling, ML | Python/R, ML, Statistics |
| **ML Engineer** | Model deployment | MLOps, Software Engineering |
| **Analytics Engineer** | Data modeling | dbt, SQL, Data Modeling |

### Operating Models

| Model | Description | Best For |
|-------|-------------|----------|
| **Centralized** | Single analytics team | Consistency, efficiency |
| **Decentralized** | Embedded in business units | Business alignment |
| **Hub & Spoke** | Central CoE + embedded | Balance of both |
| **Federated** | Shared platform, domain teams | Scale with autonomy |

## See Also

- [Fortune 50 Product Management](../fortune50-product-management/SKILL.md)
- [Fortune 50 Business Strategy](../fortune50-business-strategy/SKILL.md)
- [Fortune 50 Finance](../fortune50-finance/SKILL.md)
