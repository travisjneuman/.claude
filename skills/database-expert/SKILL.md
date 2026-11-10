---
name: database-expert
description: Advanced database design and administration for PostgreSQL, MongoDB, and Redis. Use when designing schemas, optimizing queries, managing database performance, or implementing data patterns.
---

# Database Expert

Comprehensive guide for database design, optimization, and administration.

## Database Selection

| Database       | Type       | Best For                            |
| -------------- | ---------- | ----------------------------------- |
| **PostgreSQL** | Relational | Complex queries, ACID, JSON support |
| **MongoDB**    | Document   | Flexible schemas, rapid iteration   |
| **Redis**      | Key-Value  | Caching, sessions, real-time        |
| **SQLite**     | Embedded   | Mobile, desktop, testing            |

---

## PostgreSQL

### Schema Design

```sql
-- Users table with proper constraints
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for common queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status) WHERE status = 'active';

-- Automatic updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Posts with full-text search
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    search_vector TSVECTOR,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Full-text search index
CREATE INDEX idx_posts_search ON posts USING GIN(search_vector);
```

### Query Optimization

```sql
-- EXPLAIN ANALYZE for query analysis
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT u.full_name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON p.author_id = u.id
WHERE u.status = 'active'
GROUP BY u.id
ORDER BY post_count DESC
LIMIT 10;

-- Partial index for filtered queries
CREATE INDEX idx_posts_published
ON posts(published_at)
WHERE published_at IS NOT NULL;

-- Covering index (index-only scan)
CREATE INDEX idx_posts_author_title
ON posts(author_id)
INCLUDE (title, published_at);

-- Expression index
CREATE INDEX idx_users_email_lower
ON users(LOWER(email));
```

### Advanced Features

```sql
-- Common Table Expression (CTE)
WITH active_authors AS (
    SELECT DISTINCT author_id
    FROM posts
    WHERE published_at > NOW() - INTERVAL '30 days'
),
author_stats AS (
    SELECT
        u.id,
        u.full_name,
        COUNT(p.id) as total_posts
    FROM users u
    JOIN active_authors aa ON aa.author_id = u.id
    LEFT JOIN posts p ON p.author_id = u.id
    GROUP BY u.id
)
SELECT * FROM author_stats
ORDER BY total_posts DESC;

-- Window functions
SELECT
    id,
    title,
    author_id,
    published_at,
    ROW_NUMBER() OVER (PARTITION BY author_id ORDER BY published_at DESC) as author_rank,
    LAG(published_at) OVER (PARTITION BY author_id ORDER BY published_at) as prev_post_date
FROM posts
WHERE published_at IS NOT NULL;

-- JSON operations
SELECT
    id,
    metadata->>'source' as source,
    metadata->'stats'->>'views' as views
FROM posts
WHERE metadata @> '{"featured": true}';

-- Recursive CTE (for hierarchies)
WITH RECURSIVE category_tree AS (
    SELECT id, name, parent_id, 0 as depth
    FROM categories
    WHERE parent_id IS NULL
    UNION ALL
    SELECT c.id, c.name, c.parent_id, ct.depth + 1
    FROM categories c
    JOIN category_tree ct ON c.parent_id = ct.id
    WHERE ct.depth < 10
)
SELECT * FROM category_tree ORDER BY depth;
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/database-expert/`).

| Topic | File | Covers |
| --- | --- | --- |
| MongoDB | [`references/mongodb.md`](references/mongodb.md) | Schema Design Patterns; Aggregation Pipeline; Indexes |
| Redis | [`references/redis.md`](references/redis.md) | Data Structures; Caching Patterns; Pub/Sub |
| Query Optimization Checklist | [`references/query-optimization-checklist.md`](references/query-optimization-checklist.md) | PostgreSQL; MongoDB; Redis |
| Vector Databases for AI/RAG Workloads | [`references/vector-databases-for-ai-rag-workloads.md`](references/vector-databases-for-ai-rag-workloads.md) | Overview; pgvector (PostgreSQL Extension); Pinecone (Managed); Chroma (Local/Embedded); Embedding Storage and Indexing Best Practices |
