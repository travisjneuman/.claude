# Code Review Standards

Shared reference for security, performance, accessibility, and quality requirements.

## Priority Tiers

### P0: Blocking - Must Fix

**Type Safety**

- No `any` types (use explicit types or `unknown`)
- TypeScript strict mode enabled
- Proper type guards for external data

**Security**

- No `innerHTML` for user content (use `textContent`)
- No exposed secrets/API keys in code
- Input sanitization on all user data
- No dynamic code execution (eval, Function constructor)

**Error Handling**

- Try/catch on async operations
- No dangling promises (all awaited or caught)
- Proper error boundaries (React) or error handling

**Data Integrity**

- Immutable state updates (no mutations)
- Atomic operations for critical data
- Validation before persistence

### P1: Should Fix

**Function Size**

- Target: <50 lines per function
- Flag: >75 lines requires justification
- Single responsibility principle

**Accessibility Basics**

- Color contrast >= 4.5:1 for text
- Keyboard navigation (Tab, Enter, Escape)
- ARIA labels on icon-only buttons
- Focus indicators visible

**Performance**

- No obvious N+1 queries
- Avoid unnecessary re-renders
- Lazy load non-critical resources

**Code Organization**

- No duplicate code (DRY principle)
- Meaningful names (no magic numbers/strings)
- Consistent patterns with codebase

### P2: Nice to Have

**Documentation**

- Complex logic explained
- Public APIs documented
- Non-obvious decisions noted

**Code Style**

- Consistent formatting
- Named exports preferred
- Modern syntax (ES6+, optional chaining)

**Micro-Optimizations**

- Memoization for expensive calculations
- Debounce/throttle where appropriate

## When to Flex Rules

**Valid exceptions** (document why):

- Performance critical paths (justify with metrics)
- Third-party library constraints
- Legacy system integration
- Tight deadlines (add tech debt ticket)

**Never flex**:

- Security requirements
- Data integrity rules
- Critical accessibility (WCAG AA minimum)

## Security Checks

### Frontend

- Sanitize user input (textContent, not innerHTML)
- Use `unknown` type for external data, validate before use
- No API keys in client code
- HTTPS for external requests

### Backend

- Input validation on all endpoints
- Authentication on protected routes
- No raw SQL (use ORM/parameterized queries)
- Secrets in environment variables
- Rate limiting on public endpoints

### General

- No tracking without consent
- Privacy-first data handling
- WebCrypto API for encryption (no custom crypto)

## Performance Requirements

### Bundle Size Targets

| Project Type | Target          |
| ------------ | --------------- |
| Static site  | < 50KB          |
| SPA/React    | < 100KB gzipped |
| Full-stack   | < 200KB gzipped |

### Animation

- GPU-accelerated only (transform, opacity)
- 60fps target
- Avoid layout thrashing
- Use requestAnimationFrame

### Loading

- Lazy load non-essential code/images
- Code splitting for large features
- Optimize images (WebP, responsive)

## Accessibility (WCAG AA)

### Required

- Focus indicators on all interactive elements
- Keyboard navigation (Tab, Enter, Escape, Arrows)
- Color contrast >= 4.5:1 for text
- ARIA labels on icon-only buttons
- Alt text for meaningful images
- Semantic HTML structure
- Touch targets >= 44x44px

### Interactive Elements

- Focus trapped in modals
- Escape closes dialogs
- Skip links for navigation
- Form errors announced

## Review Output Format

Report issues using this structure:

```
## P0: Blocking Issues
- [FILE:LINE] Brief description
  - Impact: What could go wrong
  - Fix: Specific solution

## P1: Should Fix
- [FILE:LINE] Brief description
  - Why: Reasoning
  - Suggestion: How to improve

## P2: Nice to Have
- [FILE:LINE] Brief description
  - Benefit: What it improves
```

Example:

```
## P0: Blocking Issues
- [auth.ts:45] Using `any` type for user data
  - Impact: No type safety, runtime errors possible
  - Fix: Define UserData interface with required fields
```

## Review Checklist

### Pre-Commit

- [ ] Tests pass
- [ ] Type check passes
- [ ] Lint passes
- [ ] Build succeeds
- [ ] No console errors

### Security

- [ ] Input sanitized
- [ ] Auth on protected routes
- [ ] No exposed secrets

### Performance

- [ ] Bundle size acceptable
- [ ] Images optimized
- [ ] Lazy loading used

### Accessibility

- [ ] Keyboard navigable
- [ ] Focus indicators visible
- [ ] Contrast sufficient
- [ ] ARIA labels present
