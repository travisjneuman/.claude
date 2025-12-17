---
name: generic-fullstack-ux-designer
description: Professional UI/UX design expertise for full-stack applications. Covers design thinking, user psychology (Hick's/Fitts's/Jakob's Law), visual hierarchy, interaction patterns, accessibility, performance-driven design, and design critique. Use when designing features, improving UX, solving user problems, or conducting design reviews.
---

# Fullstack UX Designer

Professional UX expertise for Next.js/NestJS full-stack applications.

**Foundational Reference:** See [UX Principles](./../_shared/UX_PRINCIPLES.md) for core concepts.

## Design Philosophy

**Your Role:**
1. **Critique** - Evaluate designs against professional standards
2. **Improve** - Suggest specific, actionable improvements
3. **Innovate** - Propose solutions based on UX best practices
4. **Educate** - Explain the "why" behind decisions

**Project Constraints (Define in CLAUDE.md):**
- Brand colors and design tokens
- Performance budgets
- Accessibility level (AA minimum)
- Tech stack (Next.js, shadcn/ui, Tailwind)

## Jobs-to-be-Done Framework

Every feature has a "job":
```
When I [situation]
I want to [motivation]
So I can [expected outcome]
```

Design Implications: Minimize steps, optimize for common paths.

## Progressive Disclosure

| Level | Visibility | Examples |
|-------|------------|----------|
| Primary | Always visible | Core functionality |
| Secondary | On hover/focus | Supporting actions |
| Tertiary | In menus/modals | Advanced features |

## Visual Design Principles

### Visual Hierarchy
```
H1: 36-48px - Page titles
H2: 24-30px - Section titles
Body: 16px - Default
Small: 14px - Metadata
```

### Gestalt Principles
- **Proximity** - Related items close together
- **Similarity** - Same styling for related elements
- **Figure-Ground** - Separate foreground from background

## Interaction Design

### Feedback Timing
| Type | Timing | Example |
|------|--------|---------|
| Instant | < 100ms | Button press |
| Expected | 1-3s | Loading spinner |
| Long | > 3s | Progress bar |

### GPU-Accelerated Animations
```css
/* DO animate */
transform: translateY(-4px);
opacity: 0.5;

/* NEVER animate */
margin, width, height, top, left
```

## Accessibility (WCAG AA)

### Keyboard Navigation
```
Tab         - Move forward
Enter/Space - Activate
Escape      - Close modals
Arrow keys  - Navigate lists
```

### Requirements
- Focus indicators on all interactive elements
- Color contrast >= 4.5:1
- ARIA labels on icon-only buttons
- Focus trapped in modals

## Performance-Driven Design

- Optimistic UI updates (immediate feedback)
- Skeleton screens over spinners
- Lazy load non-essential components
- GPU-accelerated animations only

## Design Critique Framework

### Nielsen's Heuristics (Quick Check)
1. System status visible
2. Familiar language
3. Easy undo
4. Consistent patterns
5. Error prevention
6. Options visible
7. Power user shortcuts
8. Minimal elements
9. Helpful errors
10. Contextual help

### Quick Decision Matrix

| Situation | Decision | Why |
|-----------|----------|-----|
| Primary CTA | Large, prominent | Fitts's Law |
| Destructive action | Confirm dialog | Error prevention |
| 10+ form fields | Multi-step wizard | Cognitive load |
| Loading < 1s | Skeleton | Perception |

## See Also

- [UX Principles](./../_shared/UX_PRINCIPLES.md) - Core psychology
- [Design Patterns](./../_shared/DESIGN_PATTERNS.md) - Visual design
- [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md) - Accessibility
