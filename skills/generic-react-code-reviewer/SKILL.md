---
name: generic-react-code-reviewer
description: Review React/TypeScript code for bugs, security vulnerabilities, performance issues, accessibility gaps, and CLAUDE.md workflow compliance. Enforces TypeScript strict mode, GPU-accelerated animations, WCAG AA accessibility, bundle size limits, and surgical simplicity. Use when completing features, before commits, or reviewing pull requests.
---

# React Code Reviewer

Review React/TypeScript code against production quality standards.

**Full Standards:** See [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md)

## Pre-Commit Checklist

- [ ] Tests passing: `npm run test`
- [ ] TypeScript passing: `npm run type-check`
- [ ] Lint passing: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors/warnings

## React-Specific Checks

### Type Safety
- TypeScript strict mode enabled
- No `any` types for user input
- Validate all external data with `unknown` first

### State Management
- Zustand/Redux state properly typed
- Actions return void (update state directly)
- Large data in IndexedDB (not localStorage)

### Component Patterns
- Use existing design system components
- Follow 4px base spacing
- Support dark mode
- Lazy load heavy components (>20KB)

## Performance Requirements

- Bundle size < 100KB gzipped initial
- GPU-accelerated animations only (transform/opacity)
- Code splitting for large features
- Memoize expensive calculations

## Accessibility (WCAG AA)

- Focus indicators on all interactive elements
- Keyboard navigation (Tab, Enter, Escape, Arrows)
- Color contrast >= 4.5:1
- ARIA labels on icon-only buttons
- Focus trapped in modals

## Surgical Simplicity

Changes should impact minimal code relevant to task only:
- Every line intentional
- No commented-out code
- No dead code
- Follow existing patterns

## See Also

- [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md) - Full security/performance/accessibility
- [Design Patterns](./../_shared/DESIGN_PATTERNS.md) - UI consistency
- Project `CLAUDE.md` - Workflow rules
