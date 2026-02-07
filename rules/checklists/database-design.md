# Database Design Checklist

**When to use:** Designing schemas, writing migrations, or optimizing database performance.

---

## Schema Design

### Normalization Guidelines

| Normal Form | Rule                                                | When to Break It                        |
| ----------- | --------------------------------------------------- | --------------------------------------- |
| 1NF         | Atomic values, no repeating groups                  | Almost never                            |
| 2NF         | No partial dependencies on composite keys           | Almost never                            |
| 3NF         | No transitive dependencies                          | Read-heavy analytics, reporting tables  |
| BCNF        | Every determinant is a candidate key                | Rarely needed beyond 3NF               |

### Denormalization Trade-offs

| Denormalize When...                   | Keep Normalized When...                 |
| ------------------------------------- | --------------------------------------- |
| Read-heavy, write-light workload      | Write-heavy workload                    |
| Query joins are a bottleneck          | Data consistency is critical            |
| Caching is impractical                | Storage costs are a concern             |
| Analytics/reporting tables            | Transactional (OLTP) tables             |

### Column Design

```sql
-- Good: explicit types, constraints, defaults
CREATE TABLE users (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE,
    name        TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 150),
    role        TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
    is_active   BOOLEAN NOT NULL DEFAULT true,
    metadata    JSONB DEFAULT '{}',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bad: missing constraints, vague types
CREATE TABLE users (
    id          SERIAL,
    email       VARCHAR(255),
    name        VARCHAR(255),
    role        VARCHAR(50),
    is_active   INTEGER,
    metadata    TEXT,
    created_at  TIMESTAMP
);
```

- [ ] All columns have appropriate `NOT NULL` constraints
- [ ] Default values set where sensible
- [ ] `CHECK` constraints for enum-like fields
- [ ] `UNIQUE` constraints on natural keys (email, slug, etc.)
- [ ] `TIMESTAMPTZ` used instead of `TIMESTAMP` (timezone-aware)
- [ ] Primary keys use `BIGINT` or `UUID` (not `SERIAL`/`INT` for new projects)

### Relationship Patterns

```sql
-- One-to-many
CREATE TABLE posts (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id   BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    content     TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Many-to-many (junction table)
CREATE TABLE post_tags (
    post_id     BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    tag_id      BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Polymorphic (avoid if possible, prefer separate tables)
-- If needed, use a discriminator column:
CREATE TABLE comments (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    commentable_type TEXT NOT NULL CHECK (commentable_type IN ('post', 'photo')),
    commentable_id   BIGINT NOT NULL,
    body            TEXT NOT NULL
);
CREATE INDEX idx_comments_target ON comments (commentable_type, commentable_id);
```

- [ ] Foreign keys defined with appropriate `ON DELETE` behavior
- [ ] Junction tables have composite primary keys
- [ ] No circular foreign key dependencies

---

## Index Design

### Index Types

| Type      | Use Case                          | Example                                    |
| --------- | --------------------------------- | ------------------------------------------ |
| B-tree    | Equality, range, sorting (default)| `CREATE INDEX idx_email ON users(email)`    |
| Hash      | Equality only                     | `CREATE INDEX idx_token ON sessions USING hash(token)` |
| GIN       | JSONB, arrays, full-text search   | `CREATE INDEX idx_meta ON users USING gin(metadata)`   |
| GiST      | Geometric, range types            | `CREATE INDEX idx_location ON places USING gist(coords)` |
| BRIN      | Large tables with natural ordering| `CREATE INDEX idx_created ON logs USING brin(created_at)` |

### Composite Index Rules

```sql
-- Index column order matters: leftmost prefix rule
-- This index supports queries filtering on (status), (status, created_at),
-- and (status, created_at, priority) but NOT (created_at) alone
CREATE INDEX idx_tasks_status_date ON tasks (status, created_at, priority);

-- Covering index (includes non-key columns to avoid table lookup)
CREATE INDEX idx_users_email_cover ON users (email) INCLUDE (name, role);

-- Partial index (index only relevant rows)
CREATE INDEX idx_active_users ON users (email) WHERE is_active = true;

-- Expression index
CREATE INDEX idx_users_lower_email ON users (lower(email));
```

- [ ] Indexes exist on all foreign key columns
- [ ] Indexes exist on columns used in `WHERE`, `JOIN`, `ORDER BY`
- [ ] Composite indexes follow leftmost prefix rule
- [ ] Partial indexes used where filtering is common
- [ ] No duplicate or redundant indexes
- [ ] `EXPLAIN ANALYZE` run on critical queries

### Index Checklist

```sql
-- Find missing indexes on foreign keys (PostgreSQL)
SELECT
    c.conrelid::regclass AS table_name,
    a.attname AS column_name,
    c.conname AS constraint_name
FROM pg_constraint c
JOIN pg_attribute a ON a.attnum = ANY(c.conkey) AND a.attrelid = c.conrelid
WHERE c.contype = 'f'
AND NOT EXISTS (
    SELECT 1 FROM pg_index i
    WHERE i.indrelid = c.conrelid
    AND a.attnum = ANY(i.indkey)
);
```

---

## Migration Best Practices

### Zero-Downtime Migrations

| Operation             | Safe Approach                                           |
| --------------------- | ------------------------------------------------------- |
| Add column            | Add with `DEFAULT`, nullable first, backfill, then constrain |
| Remove column         | Stop reading first, deploy, then drop column            |
| Rename column         | Add new column, dual-write, migrate reads, drop old     |
| Add index             | `CREATE INDEX CONCURRENTLY` (PostgreSQL)                |
| Change column type    | Add new column, backfill, swap reads, drop old          |
| Add NOT NULL          | Add CHECK constraint first, then set NOT NULL           |

### Migration Template

```python
# Django example
from django.db import migrations, models

class Migration(migrations.Migration):
    """Add phone_number to users.

    Backward compatible: column is nullable, no reads depend on it yet.
    Next step: backfill data, then add NOT NULL in separate migration.
    """

    dependencies = [
        ("users", "0005_add_role_field"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="phone_number",
            field=models.CharField(max_length=20, null=True, blank=True),
        ),
    ]
```

```python
# Alembic (FastAPI/SQLAlchemy) example
"""add phone_number to users

Revision ID: abc123
Revises: def456
"""
from alembic import op
import sqlalchemy as sa


def upgrade() -> None:
    op.add_column("users", sa.Column("phone_number", sa.String(20), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "phone_number")
```

- [ ] Every migration has a rollback (`downgrade`/reverse)
- [ ] No data-destructive operations without backup confirmation
- [ ] Large data migrations run in batches
- [ ] Migrations tested against production-like data volume
- [ ] `CREATE INDEX CONCURRENTLY` used for large tables
- [ ] Column additions are nullable or have defaults (no table lock)

---

## N+1 Query Prevention

### Detection

```python
# Django: use django-debug-toolbar or nplusone
# pip install nplusone
INSTALLED_APPS = ["nplusone.ext.django"]
MIDDLEWARE = ["nplusone.ext.django.NPlusOneMiddleware"]

# SQLAlchemy: use echo mode or event listeners
engine = create_engine("...", echo=True)  # Log all queries
```

### Prevention

```python
# Django - use select_related (FK, OneToOne) and prefetch_related (ManyToMany, reverse FK)
users = User.objects.select_related("profile").prefetch_related("posts").all()

# SQLAlchemy - use joinedload or selectinload
from sqlalchemy.orm import joinedload, selectinload

query = select(User).options(
    joinedload(User.profile),       # Single JOIN (one-to-one)
    selectinload(User.posts),       # Separate IN query (one-to-many)
)

# Prisma - use include
const users = await prisma.user.findMany({
  include: {
    profile: true,
    posts: { take: 10, orderBy: { createdAt: "desc" } },
  },
});
```

- [ ] All list endpoints checked for N+1 queries
- [ ] Eager loading used for known relationships
- [ ] Query count monitored in development
- [ ] Database query logging enabled in development

---

## Connection Pooling

```python
# SQLAlchemy connection pool
engine = create_async_engine(
    DATABASE_URL,
    pool_size=20,           # Steady-state connections
    max_overflow=10,        # Burst connections above pool_size
    pool_timeout=30,        # Wait time for available connection
    pool_recycle=1800,      # Recycle connections after 30 min
    pool_pre_ping=True,     # Verify connection before use
)

# Django CONN_MAX_AGE
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "CONN_MAX_AGE": 600,  # Reuse connections for 10 min
    }
}
```

| Setting          | Development  | Production        |
| ---------------- | ------------ | ----------------- |
| `pool_size`      | 5            | 20-50             |
| `max_overflow`   | 0            | 10-20             |
| `pool_timeout`   | 30s          | 10-30s            |
| `pool_recycle`   | 3600s        | 1800s             |

- [ ] Connection pooling configured (not new connection per request)
- [ ] Pool size appropriate for workload and database limits
- [ ] `pool_pre_ping` or equivalent enabled
- [ ] Connection limits not exceeding database max_connections

---

## Performance Monitoring

### Key Metrics to Track

| Metric                  | Target           | Alert Threshold    |
| ----------------------- | ---------------- | ------------------ |
| Query response time p95 | < 100ms          | > 500ms            |
| Queries per request     | < 10             | > 20               |
| Connection pool usage   | < 70%            | > 90%              |
| Slow query count        | 0                | > 5/min            |
| Table bloat             | < 20%            | > 50%              |

### Slow Query Detection

```sql
-- PostgreSQL: enable slow query logging
-- postgresql.conf
-- log_min_duration_statement = 100  -- Log queries > 100ms

-- Find slow queries
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 20;
```

- [ ] Slow query logging enabled
- [ ] Query performance monitored in production
- [ ] Regular `EXPLAIN ANALYZE` on critical queries
- [ ] Table statistics up to date (`ANALYZE` run regularly)

---

## Backup and Recovery

- [ ] Automated daily backups configured
- [ ] Backup restoration tested regularly (at least quarterly)
- [ ] Point-in-time recovery (PITR) enabled for production
- [ ] Backup retention policy defined (30 days minimum)
- [ ] Backups stored in separate region/account
- [ ] Backup encryption enabled
- [ ] Recovery time objective (RTO) documented and achievable
- [ ] Recovery point objective (RPO) documented and achievable

---

## Related Skills

| Skill                | When to Use              |
| -------------------- | ------------------------ |
| `api-designer`       | API-database integration |
| `security`           | Data encryption, access  |
| `tech-debt-analyzer` | Schema quality review    |
| `test-specialist`    | Database testing         |

### Invoke with:

```
Skill(api-designer)
Skill(tech-debt-analyzer)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules (Data Integrity)
- `~/.claude/rules/checklists/api-development.md` - API patterns
- `~/.claude/rules/checklists/performance-optimization.md` - Performance

---

## Anti-Patterns

- [ ] No foreign key constraints (relying on application logic alone)
- [ ] Missing indexes on frequently queried columns
- [ ] `SELECT *` in application queries
- [ ] Storing JSON blobs when relational columns would be better
- [ ] No migration rollback plan
- [ ] Running destructive migrations during peak traffic
- [ ] Ignoring query plans (`EXPLAIN ANALYZE`)
- [ ] No connection pooling (new connection per request)

---

_Good schema design prevents problems. Migrations must be reversible. Monitor query performance continuously._
