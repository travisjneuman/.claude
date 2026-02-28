# Performance Optimization Checklist

**When to use:** Optimizing web performance, analyzing bundle sizes, or improving load times.

---

## Core Web Vitals Targets

| Metric                        | Good       | Needs Improvement | Poor     |
| ----------------------------- | ---------- | ----------------- | -------- |
| **LCP** (Largest Contentful Paint) | < 2.5s | 2.5s - 4.0s       | > 4.0s   |
| **INP** (Interaction to Next Paint) | < 200ms | 200ms - 500ms    | > 500ms  |
| **CLS** (Cumulative Layout Shift)  | < 0.1  | 0.1 - 0.25        | > 0.25   |

### Measuring

```bash
# Lighthouse CLI
npx lighthouse https://example.com --output=html --output-path=./report.html

# Web Vitals in code
import { onLCP, onINP, onCLS } from "web-vitals";

onLCP(console.log);
onINP(console.log);
onCLS(console.log);
```

- [ ] Core Web Vitals measured on real devices (not just Lighthouse)
- [ ] Field data reviewed (CrUX, RUM) alongside lab data
- [ ] Performance budget defined and enforced in CI

---

## Bundle Analysis and Code Splitting

### Bundle Analysis

```bash
# Webpack
npx webpack-bundle-analyzer dist/stats.json

# Vite
npx vite-bundle-visualizer

# Next.js
ANALYZE=true npm run build
# (requires @next/bundle-analyzer)

# General size check
npx bundlephobia <package-name>
```

### Code Splitting

```typescript
// Route-level splitting (React)
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

// Component-level splitting
const HeavyChart = lazy(() => import("./components/HeavyChart"));

function ReportPage({ showChart }: { showChart: boolean }) {
  return (
    <div>
      <h1>Report</h1>
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

### Dynamic Imports for Libraries

```typescript
// Import only what you need (tree-shakeable)
import { format } from "date-fns/format";

// Dynamic import for rarely-used features
async function exportToPDF() {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  // ...
}
```

- [ ] Bundle size analyzed before and after changes
- [ ] Route-level code splitting implemented
- [ ] Heavy libraries loaded dynamically when possible
- [ ] Tree-shaking verified (no dead code in bundle)
- [ ] No duplicate dependencies in bundle

### Bundle Size Targets

| Category       | Budget     |
| -------------- | ---------- |
| Initial JS     | < 200 KB   |
| Initial CSS    | < 50 KB    |
| Per-route JS   | < 100 KB   |
| Total page     | < 500 KB   |
| Hero image     | < 200 KB   |

---

## Image Optimization

### Format Selection

| Format | Use Case                                          | Browser Support |
| ------ | ------------------------------------------------- | --------------- |
| AVIF   | Best compression, photos and illustrations        | Modern browsers |
| WebP   | Good compression, wide support fallback           | 97%+            |
| SVG    | Icons, logos, simple illustrations                 | Universal       |
| PNG    | Transparency needed, no lossy compression allowed | Universal       |
| JPEG   | Fallback for older browsers                       | Universal       |

### Responsive Images

```html
<!-- Art direction with picture element -->
<picture>
  <source
    media="(min-width: 1024px)"
    srcset="/images/hero-large.avif"
    type="image/avif"
  />
  <source
    media="(min-width: 1024px)"
    srcset="/images/hero-large.webp"
    type="image/webp"
  />
  <source
    srcset="/images/hero-small.avif"
    type="image/avif"
  />
  <source
    srcset="/images/hero-small.webp"
    type="image/webp"
  />
  <img
    src="/images/hero-small.jpg"
    alt="Hero image"
    width="800"
    height="400"
    loading="lazy"
    decoding="async"
  />
</picture>

<!-- Responsive srcset -->
<img
  srcset="
    /images/photo-400w.webp 400w,
    /images/photo-800w.webp 800w,
    /images/photo-1200w.webp 1200w
  "
  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
  src="/images/photo-800w.webp"
  alt="Descriptive alt text"
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
/>
```

### Next.js Image Component

```tsx
import Image from "next/image";

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority          // Above the fold: no lazy loading
  placeholder="blur"
  blurDataURL={blurData}
/>
```

- [ ] Images served in modern formats (AVIF/WebP with fallbacks)
- [ ] Responsive `srcset` and `sizes` attributes used
- [ ] `width` and `height` attributes set (prevents CLS)
- [ ] Below-fold images use `loading="lazy"`
- [ ] Above-fold images use `priority` or `fetchpriority="high"`
- [ ] Images properly sized (not serving 4000px for 400px display)

---

## Caching Strategies

### Browser Cache Headers

```
# Immutable assets (hashed filenames)
Cache-Control: public, max-age=31536000, immutable

# HTML pages (revalidate always)
Cache-Control: no-cache

# API responses (short cache with revalidation)
Cache-Control: public, max-age=60, stale-while-revalidate=300

# Private data (no shared cache)
Cache-Control: private, max-age=0, must-revalidate
```

### Service Worker Caching

```typescript
// Workbox strategies
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from "workbox-strategies";

// Static assets: cache first
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({ cacheName: "images", plugins: [/* expiration */] }),
);

// API calls: stale while revalidate
registerRoute(
  ({ url }) => url.pathname.startsWith("/api/"),
  new StaleWhileRevalidate({ cacheName: "api-cache" }),
);

// HTML pages: network first
registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({ cacheName: "pages" }),
);
```

### CDN Configuration

- [ ] Static assets served from CDN
- [ ] Immutable assets have long cache TTL with content hashing
- [ ] HTML has short or no cache (always revalidates)
- [ ] API responses cached where appropriate
- [ ] Cache invalidation strategy defined
- [ ] `ETag` or `Last-Modified` headers set for conditional requests

---

## Database Query Optimization

### Query Patterns

```sql
-- Select only needed columns (never SELECT *)
SELECT id, name, email FROM users WHERE role = 'admin';

-- Batch queries instead of N+1
SELECT * FROM orders WHERE user_id IN (1, 2, 3, 4, 5);

-- Use JOIN for related data in a single query
SELECT u.id, u.name, o.id AS order_id, o.total
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.role = 'admin';
```

### Index Verification

```sql
-- Check if query uses indexes
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- Look for: "Seq Scan" (bad) vs "Index Scan" (good)
-- Look for: actual time and rows
```

- [ ] No `SELECT *` in production queries
- [ ] N+1 queries eliminated (eager loading used)
- [ ] `EXPLAIN ANALYZE` run on slow queries
- [ ] Indexes exist on filtered and joined columns
- [ ] Connection pooling configured
- [ ] Query timeouts set

---

## SSR vs SSG Decision Matrix

| Factor                    | SSG (Static)              | SSR (Server)              | ISR (Incremental)         |
| ------------------------- | ------------------------- | ------------------------- | ------------------------- |
| Build time                | Slow for many pages       | None (on-demand)          | Incremental               |
| TTFB                      | Fastest (CDN-served)      | Slower (server render)    | Fast after first request  |
| Data freshness            | Stale until rebuild       | Always fresh              | Fresh within revalidation |
| Server cost               | Zero (static hosting)     | Continuous                | Minimal                   |
| Dynamic content           | Not supported             | Full support              | Partial (revalidation)    |
| Personalization           | Client-side only          | Full support              | Cache per-variant         |

### Decision Guide

```
Is the content the same for all users?
  YES → Is there < 10,000 pages?
    YES → SSG (Static Generation)
    NO  → ISR (Incremental Static Regeneration)
  NO → Does it change per request?
    YES → SSR (Server-Side Rendering)
    NO  → SSG + Client-side fetching
```

- [ ] Rendering strategy chosen based on data requirements
- [ ] Static pages generated at build time where possible
- [ ] ISR configured with appropriate revalidation intervals
- [ ] SSR used only when personalization or real-time data required
- [ ] Client-side fetching used for non-SEO, user-specific content

---

## React Rendering Optimization

### Preventing Unnecessary Re-renders

```typescript
// Memoize expensive computations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items],
);

// Memoize callbacks passed to child components
const handleDelete = useCallback(
  (id: string) => {
    dispatch({ type: "DELETE_ITEM", id });
  },
  [dispatch],
);

// Memoize components that receive stable props
const MemoizedList = memo(function ItemList({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});
```

### Virtualization for Long Lists

```typescript
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: "400px", overflow: "auto" }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: "relative" }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: "absolute",
              top: 0,
              transform: `translateY(${virtualRow.start}px)`,
              height: `${virtualRow.size}px`,
            }}
          >
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] React DevTools Profiler used to identify re-render bottlenecks
- [ ] `useMemo` used for expensive computations
- [ ] `useCallback` used for callbacks passed to memoized children
- [ ] `memo` used for components receiving stable props
- [ ] Long lists virtualized (> 100 items)
- [ ] State kept as local as possible (not everything in global store)

---

## Server-Side Performance

### Response Time Targets

| Endpoint Type   | Target p95  | Alert Threshold |
| --------------- | ----------- | --------------- |
| API (simple)    | < 100ms     | > 300ms         |
| API (complex)   | < 500ms     | > 1s            |
| SSR page        | < 200ms     | > 500ms         |
| Static page     | < 50ms      | > 100ms         |
| Health check    | < 10ms      | > 50ms          |

### Optimization Techniques

```typescript
// Streaming SSR (Next.js App Router)
import { Suspense } from "react";

export default async function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Shows immediately */}
      <Suspense fallback={<ChartSkeleton />}>
        {/* Streams when ready */}
        <SlowChart />
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <SlowDataTable />
      </Suspense>
    </div>
  );
}
```

```typescript
// Response compression
import compression from "compression";
app.use(compression({ threshold: 1024 })); // Compress responses > 1KB

// Caching frequently accessed data
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

async function getUser(id: string): Promise<User> {
  const cached = cache.get<User>(`user:${id}`);
  if (cached) return cached;

  const user = await db.user.findUnique({ where: { id } });
  if (user) cache.set(`user:${id}`, user);
  return user;
}
```

- [ ] Response compression enabled (gzip/brotli)
- [ ] Hot data cached (in-memory or Redis)
- [ ] Database connection pooling configured
- [ ] Streaming SSR used for slow data fetches
- [ ] Background jobs for non-critical processing
- [ ] Health check endpoint responds quickly

---

## Lighthouse CI Integration

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci && npm run build
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v12
        with:
          urls: |
            http://localhost:3000/
            http://localhost:3000/dashboard
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
```

```json
// lighthouse-budget.json
[
  {
    "path": "/*",
    "timings": [
      { "metric": "interactive", "budget": 3000 },
      { "metric": "first-contentful-paint", "budget": 1500 }
    ],
    "resourceSizes": [
      { "resourceType": "script", "budget": 200 },
      { "resourceType": "total", "budget": 500 }
    ]
  }
]
```

- [ ] Lighthouse CI runs on every PR
- [ ] Performance budgets defined and enforced
- [ ] Regressions block merge

---

## Quick Wins Checklist

### Fonts

- [ ] Font files self-hosted (not loaded from Google Fonts CDN)
- [ ] `font-display: swap` set
- [ ] Font subsetting applied (only needed characters)
- [ ] Preload critical fonts: `<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>`
- [ ] Maximum 2-3 font families used

### Third-Party Scripts

- [ ] Analytics loaded with `async` or `defer`
- [ ] Third-party scripts audited for performance impact
- [ ] Non-critical scripts loaded after page interactive
- [ ] `dns-prefetch` or `preconnect` for known third-party domains

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://analytics.example.com" />
```

### Layout Stability

- [ ] Images have explicit `width` and `height`
- [ ] No content injected above existing content after load
- [ ] Web fonts have fallback with matching metrics
- [ ] Ads and embeds have reserved space

---

## Related Skills

| Skill                   | When to Use               |
| ----------------------- | ------------------------- |
| `performance-optimizer` | Deep performance analysis |
| `tech-debt-analyzer`    | Performance debt          |
| `test-specialist`       | Performance testing       |

### Invoke with:

```
Skill(performance-optimizer)
Skill(tech-debt-analyzer)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/docs/reference/checklists/ui-visual-changes.md` - Visual changes
- `~/.claude/docs/reference/checklists/database-design.md` - Database performance
- `~/.claude/docs/reference/stacks/react-typescript.md` - React patterns

---

## Anti-Patterns

- [ ] Loading entire libraries when only one function is needed
- [ ] No code splitting (single monolithic bundle)
- [ ] Unoptimized images (4MB PNGs where 100KB WebP suffices)
- [ ] Missing `loading="lazy"` on below-fold images
- [ ] No caching strategy (fetching same data repeatedly)
- [ ] `SELECT *` queries in production
- [ ] Premature optimization (measure first, optimize second)
- [ ] Blocking the main thread with synchronous operations

---

_Measure first, optimize second. Use budgets to prevent regressions. Focus on what users actually experience._
