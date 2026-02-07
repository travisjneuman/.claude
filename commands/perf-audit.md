---
description: Performance audit for web applications
arguments:
  - name: focus
    description: "Audit focus: bundle | rendering | api | database | all (default: all)"
    required: false
---

# Performance Audit

Analyzes application performance across bundle size, rendering, API response times, and database queries. Provides actionable optimization recommendations.

---

## Execution Flow

### Step 1: Detect Application Type

```bash
# Frontend frameworks
[ -f "next.config.js" ] || [ -f "next.config.mjs" ] || [ -f "next.config.ts" ] && echo "NEXTJS"
[ -f "vite.config.ts" ] || [ -f "vite.config.js" ] && echo "VITE"
[ -f "webpack.config.js" ] && echo "WEBPACK"

# Backend frameworks
[ -f "package.json" ] && grep -qE '"(express|fastify|koa)"' package.json && echo "NODE_API"
[ -f "requirements.txt" ] && grep -qE "(fastapi|django|flask)" requirements.txt && echo "PYTHON_API"
[ -f "go.mod" ] && echo "GO_API"

# Database
[ -d "prisma" ] && echo "PRISMA"
[ -f "drizzle.config.ts" ] && echo "DRIZZLE"
[ -f "alembic.ini" ] && echo "ALEMBIC"
```

---

### Step 2: Run Audits by Focus

**Focus:** `{{focus}}` (default: `all`)

#### bundle - Bundle Size Analysis

```bash
# Next.js
ANALYZE=true npm run build 2>/dev/null

# Vite
npx vite-bundle-visualizer 2>/dev/null

# Check raw sizes
du -sh .next/ dist/ build/ 2>/dev/null
ls -lhS .next/static/chunks/*.js 2>/dev/null | head -20
```

**Analyze source code for bundle bloat:**

- Search for large library imports that could be tree-shaken
- Find full-library imports that should be specific named imports
- Identify duplicate dependencies in lock file
- Check for unneeded polyfills

```
Bundle Analysis
---------------
Total bundle:     542 KB (gzipped)
Target:           < 200 KB

Largest chunks:
  vendor.js        312 KB  (lodash: 72KB, moment: 67KB, chart.js: 45KB)
  main.js          128 KB
  pages/dashboard  102 KB

Optimization opportunities:
  1. Replace moment.js (67KB) with date-fns (12KB)      -> Save 55KB
  2. Import specific lodash functions                     -> Save ~60KB
  3. Lazy-load chart.js (only used on dashboard)          -> Save 45KB initial
  4. Enable tree-shaking for UI library                   -> Save ~30KB

  Estimated savings: ~190KB (35% reduction)
```

#### rendering - Render Performance

Analyze React/component rendering patterns:

**Search for common performance issues:**

- Inline object/array creation in JSX (causes unnecessary re-renders)
- Components receiving complex props without React.memo
- Expensive array operations (.map, .filter, .reduce, .sort) without useMemo
- Large component files (likely doing too much, should be split)
- Overuse of useContext causing unnecessary re-renders

**Report format:**

```
Rendering Performance
---------------------
Issues found: 12

High Impact:
  1. src/components/DataTable.tsx:45
     Inline style object causes re-render on every parent update
     Fix: Extract to useMemo or constant outside component

  2. src/pages/Dashboard.tsx:23
     Expensive .filter().map() chain runs on every render
     Fix: Wrap in useMemo with proper dependencies

  3. src/contexts/AppContext.tsx
     Single context provides 15 values - any change re-renders all consumers
     Fix: Split into focused contexts (AuthContext, ThemeContext, etc.)
```

#### api - API Performance

Analyze API route handlers and middleware:

- N+1 queries: loops with await inside, forEach with async operations
- Missing pagination: findMany/find/SELECT without take/limit
- Missing caching headers: JSON responses without Cache-Control
- Large payloads: Prisma includes without field selection
- Missing compression: no gzip/brotli middleware

**Report format:**

```
API Performance
---------------
Issues found: 7

Critical:
  1. src/api/users/route.ts:34
     N+1 query: Fetching related posts in a loop
     Fix: Use include/join to batch the query

  2. src/services/report.ts:56
     Unbounded query: findMany() without limit
     Fix: Add pagination (take/skip or cursor)
```

#### database - Database Performance

- Check for missing indexes on frequently queried fields
- Detect N+1 patterns in ORM queries
- Count migrations (too many = slow startup)
- Check eager/lazy loading configuration
- Find raw queries that may lack parameterization

**Report format:**

```
Database Performance
--------------------
ORM: Prisma
Models: 12
Migrations: 34

Issues:
  1. User model: email field queried frequently but no index
     Fix: Add @@index([email]) to schema.prisma

  2. Order -> OrderItem: No include in 3 queries (N+1 risk)
     Files: src/services/order.ts:23, 45, 67

Recommendations:
  - [ ] Add composite index for (userId, createdAt) on Order model
  - [ ] Enable Prisma query logging in development
  - [ ] Consider connection pooling (PgBouncer) for production
  - [ ] Squash migrations (34 -> consolidate old ones)
```

---

### Step 3: Summary Report

```
Performance Audit Report
========================
Focus:    {{focus}}
Project:  <detected type>

Score:    68/100

Category Breakdown:
  Bundle:     C (542KB, target <200KB)
  Rendering:  B (12 issues, 3 high-impact)
  API:        B- (7 issues, 2 critical)
  Database:   C+ (missing indexes, N+1 risks)

Top 5 Quick Wins:
  1. Replace moment.js with date-fns          -> 55KB saved, 15min effort
  2. Add missing database indexes             -> 10x query speedup, 5min
  3. Fix N+1 query in orders API              -> 50x fewer queries, 30min
  4. Lazy-load dashboard chart component      -> 45KB less initial JS, 10min
  5. Add response compression middleware      -> 60-70% transfer reduction, 5min

Estimated Impact: 40% faster page load, 60% fewer database queries
```

---

## Performance Targets

| Metric              | Target    | Tool                      |
| ------------------- | --------- | ------------------------- |
| Bundle size (gzip)  | < 200 KB  | webpack-bundle-analyzer   |
| First Contentful    | < 1.8s    | Lighthouse                |
| Largest Contentful  | < 2.5s    | Lighthouse                |
| Time to Interactive | < 3.8s    | Lighthouse                |
| API p95 latency     | < 200ms   | Application monitoring    |
| Database query time | < 50ms    | Query logging             |

---

_Part of the Ultimate Claude Code Toolkit_
