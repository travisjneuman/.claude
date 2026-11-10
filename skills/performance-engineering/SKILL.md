---
name: performance-engineering
description: Web Vitals, bundle optimization, CDN, caching, and load analysis. Use when diagnosing slow pages or APIs, reducing bundle size, or designing caching and performance budgets.
---

# Performance Engineering

## Overview

This skill covers measuring, optimizing, and maintaining web application performance across the full stack. It addresses Core Web Vitals (LCP, INP, CLS), bundle analysis and code splitting, image optimization, browser and server-side caching, CDN configuration, database query performance, and load testing with k6 and Artillery.

Use this skill when Core Web Vitals scores are below targets, bundle sizes are growing, page load times are degrading, or when preparing for traffic spikes. Performance work should be measurement-driven: profile first, optimize second, measure the impact third.

---

## Core Principles

1. **Measure before optimizing** - Profile with real data (RUM, Lighthouse, DevTools) before writing any optimization code. Intuition about performance bottlenecks is usually wrong.
2. **Budget everything** - Set performance budgets for bundle size (< 200kb JS), LCP (< 2.5s), INP (< 200ms), CLS (< 0.1). Check changes against them in review.
3. **Optimize the critical path** - Focus on what blocks the user from seeing and interacting with content. Everything else can load later.
4. **Cache aggressively, invalidate precisely** - Use immutable hashes for static assets, short TTLs for dynamic content, and stale-while-revalidate for the best of both worlds.
5. **Reason at realistic scale** - Judge designs against production-like data volumes and traffic, not toy datasets with 10 concurrent users; run load tests only when the user asks for them.

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/performance-engineering/`).

| Topic | File | Covers |
| --- | --- | --- |
| Key Patterns | [`references/key-patterns.md`](references/key-patterns.md) | Pattern 1: Core Web Vitals Monitoring; Pattern 2: Bundle Optimization and Code Splitting; Pattern 3: Image Optimization; Pattern 4: Caching Strategy; Pattern 5: Load Testing with k6 |
| Performance Budget Reference | [`references/performance-budget-reference.md`](references/performance-budget-reference.md) | 14 lines |
| Anti-Patterns | [`references/anti-patterns.md`](references/anti-patterns.md) | 14 lines |
| Checklist | [`references/checklist.md`](references/checklist.md) | 16 lines |

## Related Resources

- **Skills:** `monitoring-observability` (performance monitoring), `serverless-development` (cold start optimization)
- **Rules:** `docs/reference/checklists/ui-visual-changes.md` (visual performance)
- **Rules:** `docs/reference/stacks/react-typescript.md` (React performance patterns)
