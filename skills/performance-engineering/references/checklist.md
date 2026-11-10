# performance-engineering: Checklist

Part of the `performance-engineering` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Checklist

- [ ] Core Web Vitals measured in field (RUM) and lab (Lighthouse)
- [ ] Performance budgets defined and checked in review
- [ ] Bundle analyzed and code-split by route
- [ ] Images optimized (WebP/AVIF, responsive sizes, lazy loading)
- [ ] LCP image uses `priority` / `fetchpriority="high"`
- [ ] Cache headers configured per asset type
- [ ] Server-side caching for expensive queries (Redis or in-memory)
- [ ] Third-party scripts audited and loaded asynchronously
- [ ] Database queries analyzed (no N+1, proper indexes)
- [ ] Load behavior reasoned through for realistic traffic (load tests only on request)
- [ ] `font-display: swap` set for custom web fonts

---
