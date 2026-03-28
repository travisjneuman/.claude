---
name: data-engineering
description: ETL/ELT pipelines, data warehousing (BigQuery, Snowflake, Redshift), stream processing (Kafka, Spark Streaming), orchestration (Airflow, Dagster, Prefect), dbt transformations, and data lake architecture. Use when building data pipelines, designing warehouse schemas, or implementing real-time data processing.
---

# Data Engineering

## Pipeline Architecture

### ETL vs ELT
| Pattern | When to Use | Tools |
|---------|-------------|-------|
| **ETL** | Transform before loading, data quality critical | Airflow + custom, Spark |
| **ELT** | Raw → warehouse → transform in-place | Fivetran + dbt, Airbyte + dbt |

### Orchestration

**Apache Airflow:**
```python
from airflow.decorators import dag, task
from datetime import datetime

@dag(schedule="@daily", start_date=datetime(2024, 1, 1), catchup=False)
def my_pipeline():
    @task()
    def extract() -> dict:
        return {"data": "extracted"}

    @task()
    def transform(data: dict) -> dict:
        return {"transformed": True}

    @task()
    def load(data: dict):
        # Load to warehouse
        pass

    raw = extract()
    transformed = transform(raw)
    load(transformed)

my_pipeline()
```

**Dagster (recommended for new projects):**
```python
from dagster import asset, Definitions

@asset
def raw_users():
    return extract_from_source()

@asset
def cleaned_users(raw_users):
    return clean_and_validate(raw_users)
```

## dbt Transformations

```sql
-- models/marts/dim_customers.sql
{{ config(materialized='table', schema='marts') }}

WITH source AS (
    SELECT * FROM {{ ref('stg_customers') }}
),
orders AS (
    SELECT customer_id, COUNT(*) as order_count, SUM(amount) as total_spent
    FROM {{ ref('stg_orders') }}
    GROUP BY customer_id
)
SELECT
    s.customer_id,
    s.name,
    s.email,
    COALESCE(o.order_count, 0) as lifetime_orders,
    COALESCE(o.total_spent, 0) as lifetime_value
FROM source s
LEFT JOIN orders o ON s.customer_id = o.customer_id
```

## Stream Processing

**Apache Kafka:**
```python
from confluent_kafka import Producer, Consumer

# Producer
producer = Producer({'bootstrap.servers': 'localhost:9092'})
producer.produce('events', key='user_123', value=json.dumps(event))
producer.flush()

# Consumer
consumer = Consumer({
    'bootstrap.servers': 'localhost:9092',
    'group.id': 'my-group',
    'auto.offset.reset': 'earliest'
})
consumer.subscribe(['events'])
```

## Data Warehouse Schema Design

### Star Schema
- **Fact tables:** Measurable events (orders, clicks, transactions)
- **Dimension tables:** Descriptive context (customers, products, dates)
- **Slowly Changing Dimensions:** Type 1 (overwrite), Type 2 (versioned rows), Type 3 (previous column)

### Data Quality
- **Great Expectations:** Schema validation, statistical tests, custom expectations
- **dbt tests:** `not_null`, `unique`, `accepted_values`, `relationships`, custom SQL tests
- **Data contracts:** Schema evolution policies, backward compatibility requirements

## Key Patterns
- **Idempotent pipelines:** Same input always produces same output, safe to rerun
- **Incremental models:** Process only new/changed data, use `updated_at` watermarks
- **Dead letter queues:** Route failed records for inspection without blocking pipeline
- **Backfill strategy:** Time-partitioned tables enable targeted historical reprocessing
