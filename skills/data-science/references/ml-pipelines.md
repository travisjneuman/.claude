# Machine Learning Pipelines Reference

## Detailed ML Pipeline

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

## Feature Engineering Details

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

## Model Development Process

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

## Model Monitoring

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
