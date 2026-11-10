# performance-engineering: Key Patterns

Part of the `performance-engineering` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Key Patterns

### Pattern 1: Core Web Vitals Monitoring

**When to use:** Every production web application. These metrics directly affect SEO ranking and user experience.

**Implementation:**

```typescript
// Real User Monitoring (RUM) with web-vitals library
import { onLCP, onINP, onCLS, onFCP, onTTFB } from "web-vitals";

interface VitalMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  navigationType: string;
}

function sendToAnalytics(metric: VitalMetric) {
  // Send to your analytics endpoint
  navigator.sendBeacon("/api/vitals", JSON.stringify({
    ...metric,
    url: window.location.href,
    userAgent: navigator.userAgent,
    connectionType: (navigator as unknown as { connection?: { effectiveType: string } })
      .connection?.effectiveType ?? "unknown",
    timestamp: Date.now(),
  }));
}

// Capture all Core Web Vitals
onLCP((metric) => sendToAnalytics({
  name: "LCP",
  value: metric.value,
  rating: metric.rating,
  navigationType: metric.navigationType,
}));

onINP((metric) => sendToAnalytics({
  name: "INP",
  value: metric.value,
  rating: metric.rating,
  navigationType: metric.navigationType,
}));

onCLS((metric) => sendToAnalytics({
  name: "CLS",
  value: metric.value,
  rating: metric.rating,
  navigationType: metric.navigationType,
}));

onFCP((metric) => sendToAnalytics({
  name: "FCP",
  value: metric.value,
  rating: metric.rating,
  navigationType: metric.navigationType,
}));

onTTFB((metric) => sendToAnalytics({
  name: "TTFB",
  value: metric.value,
  rating: metric.rating,
  navigationType: metric.navigationType,
}));
```

Lighthouse CI and other new CI jobs are added only when the user asks for them.

```typescript
// Lighthouse CI configuration
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/dashboard",
        "http://localhost:3000/pricing",
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 1800 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "interactive": ["error", { maxNumericValue: 3800 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-byte-weight": ["warn", { maxNumericValue: 500000 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
```

**Why:** Lab metrics (Lighthouse) catch regressions before deployment. Field metrics (RUM) show real user experience across diverse devices and networks. You need both: lab for prevention, field for truth.

---

### Pattern 2: Bundle Optimization and Code Splitting

**When to use:** When JavaScript bundle size exceeds 200kb gzipped, or when initial load includes code for routes the user hasn't visited.

**Implementation:**

```typescript
// Next.js - Dynamic imports for route-based code splitting
import dynamic from "next/dynamic";

// Heavy component loaded only when needed
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  loading: () => <div className="editor-skeleton" aria-busy="true">Loading editor...</div>,
  ssr: false, // Client-only component
});

const ChartDashboard = dynamic(() => import("@/components/ChartDashboard"), {
  loading: () => <ChartSkeleton />,
});

// Conditional feature loading
function ProjectPage({ project }: { project: Project }) {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div>
      <h1>{project.name}</h1>
      <button onClick={() => setShowEditor(true)}>Edit Description</button>
      {showEditor && <RichTextEditor content={project.description} />}
    </div>
  );
}
```

```javascript
// webpack-bundle-analyzer integration
// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Analyze specific packages for tree-shaking
  experimental: {
    optimizePackageImports: ["lodash-es", "date-fns", "@mui/material", "lucide-react"],
  },
});
```

```bash
# Analyze bundle
ANALYZE=true npm run build

# Check specific import costs
npx import-cost  # VS Code extension alternative
npx source-map-explorer .next/static/chunks/*.js
```

**Why:** Every kilobyte of JavaScript costs parse time, compile time, and execution time on the user's device. Code splitting ensures users only download the code needed for their current view. Lazy loading heavy components (editors, charts, maps) keeps initial bundle lean.

---

### Pattern 3: Image Optimization

**When to use:** Any page with images (which is most pages). Images are typically the largest assets on a page.

**Implementation:**

```tsx
// Next.js Image component with proper optimization
import Image from "next/image";

// Responsive hero image
function HeroSection() {
  return (
    <section>
      <Image
        src="/hero.jpg"
        alt="Team collaborating on a project"
        width={1920}
        height={1080}
        priority  // LCP element - skip lazy loading
        sizes="100vw"
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."  // Low-quality placeholder
      />
    </section>
  );
}

// Responsive card image
function ProductCard({ product }: { product: Product }) {
  return (
    <article>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={300}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"  // Below the fold
      />
      <h3>{product.name}</h3>
    </article>
  );
}
```

```typescript
// Sharp-based image processing pipeline for user uploads
import sharp from "sharp";

interface ImageVariant {
  width: number;
  suffix: string;
  quality: number;
}

const variants: ImageVariant[] = [
  { width: 320, suffix: "sm", quality: 80 },
  { width: 640, suffix: "md", quality: 80 },
  { width: 1280, suffix: "lg", quality: 85 },
  { width: 1920, suffix: "xl", quality: 85 },
];

async function processUploadedImage(
  buffer: Buffer,
  filename: string
): Promise<string[]> {
  const urls: string[] = [];

  for (const variant of variants) {
    // Generate WebP (best compression)
    const webp = await sharp(buffer)
      .resize(variant.width, null, { withoutEnlargement: true })
      .webp({ quality: variant.quality })
      .toBuffer();

    // Generate AVIF (even better compression, slower to encode)
    const avif = await sharp(buffer)
      .resize(variant.width, null, { withoutEnlargement: true })
      .avif({ quality: variant.quality - 10 })
      .toBuffer();

    const webpUrl = await uploadToStorage(webp, `${filename}-${variant.suffix}.webp`);
    const avifUrl = await uploadToStorage(avif, `${filename}-${variant.suffix}.avif`);

    urls.push(webpUrl, avifUrl);
  }

  return urls;
}
```

**Why:** Images account for 50%+ of page weight on most sites. Modern formats (WebP, AVIF) reduce size by 25-50% over JPEG. Responsive `sizes` attribute prevents mobile devices from downloading desktop-sized images. `priority` on LCP images eliminates lazy-load delay for the most important visual element.

---

### Pattern 4: Caching Strategy

**When to use:** Every application benefits from caching. The question is which layer and what TTL.

**Implementation:**

```typescript
// HTTP cache headers for different asset types
// next.config.js
module.exports = {
  async headers() {
    return [
      // Static assets with content hashes - cache forever
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // API responses - short cache with revalidation
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
      // HTML pages - always revalidate
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};
```

```typescript
// Server-side caching with Redis
import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

interface CacheOptions {
  ttlSeconds: number;
  staleSeconds?: number; // Serve stale while revalidating
}

async function cached<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions
): Promise<T> {
  const cached = await redis.get(key);

  if (cached) {
    const { data, expiry } = JSON.parse(cached);
    const isStale = Date.now() > expiry;

    if (!isStale) {
      return data as T;
    }

    // Stale-while-revalidate: return stale data, refresh in background
    if (options.staleSeconds) {
      const staleDeadline = expiry + options.staleSeconds * 1000;
      if (Date.now() < staleDeadline) {
        // Revalidate in background (fire-and-forget)
        refreshCache(key, fetcher, options).catch(console.error);
        return data as T;
      }
    }
  }

  return refreshCache(key, fetcher, options);
}

async function refreshCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions
): Promise<T> {
  const data = await fetcher();
  const expiry = Date.now() + options.ttlSeconds * 1000;
  const totalTtl = options.ttlSeconds + (options.staleSeconds ?? 0);

  await redis.setex(key, totalTtl, JSON.stringify({ data, expiry }));
  return data;
}

// Usage
const products = await cached(
  `products:category:${categoryId}`,
  () => db.products.findMany({ where: { categoryId } }),
  { ttlSeconds: 300, staleSeconds: 600 }
);
```

**Why:** Caching eliminates redundant computation and network requests. Immutable static assets with content hashes can be cached forever safely. `stale-while-revalidate` gives users instant responses while keeping data fresh in the background, providing the best perceived performance.

---

### Pattern 5: Load Testing with k6

**When to use:** When the user asks for a load test, for example before a major launch or migration or to establish a performance baseline.

**Implementation:**

```javascript
// load-test.js - k6 load test script
import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

const errorRate = new Rate("errors");
const apiDuration = new Trend("api_duration", true);

export const options = {
  stages: [
    { duration: "2m", target: 50 },   // Ramp up
    { duration: "5m", target: 50 },   // Steady state
    { duration: "2m", target: 200 },  // Spike
    { duration: "5m", target: 200 },  // Sustained spike
    { duration: "2m", target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500", "p(99)<1000"], // 95th < 500ms, 99th < 1s
    errors: ["rate<0.01"],                          // Error rate < 1%
    api_duration: ["avg<200"],                      // Average API < 200ms
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  // Simulate realistic user journey
  const homeRes = http.get(`${BASE_URL}/`);
  check(homeRes, {
    "home status 200": (r) => r.status === 200,
    "home load < 2s": (r) => r.timings.duration < 2000,
  });
  errorRate.add(homeRes.status >= 400);

  sleep(1);

  // API call
  const apiRes = http.get(`${BASE_URL}/api/products?category=electronics`, {
    headers: { "Content-Type": "application/json" },
  });
  check(apiRes, {
    "api status 200": (r) => r.status === 200,
    "api has results": (r) => JSON.parse(r.body).length > 0,
  });
  apiDuration.add(apiRes.timings.duration);
  errorRate.add(apiRes.status >= 400);

  sleep(Math.random() * 3); // Random think time
}
```

```bash
# Run load test
k6 run load-test.js

# Run with custom base URL
k6 run -e BASE_URL=https://staging.example.com load-test.js

# Output results to JSON for analysis
k6 run --out json=results.json load-test.js
```

**Why:** Load testing reveals bottlenecks that only appear under concurrency: database connection pool exhaustion, memory leaks, lock contention, and cascading timeouts. Testing with realistic traffic patterns (ramp-up, sustained load, spikes) ensures your system handles real-world conditions.

---
