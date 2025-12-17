---
name: generic-react-ux-designer
description: Professional UI/UX design expertise for React applications. Covers design thinking, user psychology (Hick's/Fitts's/Jakob's Law), visual hierarchy, interaction patterns, accessibility, performance-driven design, and design critique. Use when designing features, improving UX, solving user problems, or conducting design reviews.
---

# React UX Designer

Professional UX expertise for React/TypeScript applications. Apply design thinking to solve real user problems.

**Foundational Reference:** See [UX Principles](./../_shared/UX_PRINCIPLES.md) for core concepts.

## Design Philosophy

**Your Role as UX Designer:**
1. **Critique** - Evaluate designs against professional standards
2. **Improve** - Suggest specific, actionable improvements
3. **Innovate** - Propose solutions based on UX best practices
4. **Educate** - Explain the "why" behind decisions

**Project Constraints (Define in CLAUDE.md):**
- Brand colors and design tokens
- Performance budgets (load time, bundle size, animation fps)
- Privacy requirements
- Accessibility level (AA minimum)

## Design Thinking for React

### Jobs-to-be-Done Framework

Every feature has a "job" the user is hiring it to do:

```
When I [situation]
I want to [motivation]
So I can [expected outcome]
```

**Example:**
```
When I'm quickly capturing a task
I want to add it without leaving my current view
So I can stay focused on what I'm doing
```

**Design Implications:** Inline quick-add, keyboard shortcuts, minimal modal usage.

### Progressive Disclosure

Show only what's necessary, when necessary:

| Level | Visibility | Examples |
|-------|------------|----------|
| Primary | Always visible | Core functionality |
| Secondary | On hover/focus | Supporting actions |
| Tertiary | In menus/modals | Advanced features |

### Cognitive Load Reduction

- **Chunking**: Group related items (max 7 per group)
- **Recognition > Recall**: Show options, don't require memorization
- **Smart Defaults**: Pre-fill with intelligent defaults
- **Consistency**: Same patterns across the app

## Visual Design for React

### Visual Hierarchy

**Typography Scale:**
```
H1: 36-48px - Page titles
H2: 24-30px - Section titles
Body: 16px - Default text
Small: 14px - Captions, metadata
```

**Weight Hierarchy:**
```
Bold (700) - Primary actions, headings
Semibold (600) - Subheadings
Regular (400) - Body text
```

### Gestalt Principles in Components

**Proximity** - Related items close together:
```tsx
// Group related form fields
<div className="space-y-8">
  <div className="space-y-2">
    <h2>Account</h2>
    <Input label="Email" />
    <Input label="Password" />
  </div>
  <div className="space-y-2">
    <h2>Profile</h2>
    <Input label="Name" />
  </div>
</div>
```

**Similarity** - Same styling for related elements:
```tsx
<div className="flex gap-2">
  <button className="btn-secondary">Edit</button>
  <button className="btn-secondary">Share</button>
  <button className="btn-danger">Delete</button> {/* Different = different action type */}
</div>
```

## Interaction Design Patterns

### Affordances

Interactive elements must look interactive:
```tsx
// Clear button affordance
<button className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:-translate-y-1 transition-all cursor-pointer">
  Click Me
</button>

// NOT this (no affordance)
<div onClick={handler}>Click Me</div>
```

### Feedback Timing

| Type | Timing | Example |
|------|--------|---------|
| Instant | < 100ms | Button press, hover |
| Expected | 1-3s | Loading spinner |
| Long | > 3s | Progress bar with % |

### Micro-interactions

**Checkbox animation:**
```tsx
<motion.div
  animate={{ scale: checked ? 1 : 0 }}
  transition={{ type: "spring", stiffness: 500 }}
>
  <Check className="w-4 h-4" />
</motion.div>
```

**Loading skeleton (better than spinners):**
```tsx
<div className="animate-pulse space-y-4">
  <div className="h-8 bg-slate-200 rounded w-3/4" />
  <div className="h-4 bg-slate-200 rounded" />
</div>
```

## Accessibility in React

### Keyboard Navigation

**Required patterns:**
```
Tab         - Move through interactive elements
Shift+Tab   - Move backward
Enter/Space - Activate buttons
Escape      - Close modals
Arrow keys  - Navigate lists/menus
```

**Custom shortcuts:**
```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openCommandPalette();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Screen Reader Support

**Semantic HTML first:**
```tsx
// Good
<nav><ul><li><a href="/dashboard">Dashboard</a></li></ul></nav>

// Bad
<div><div onClick={go}>Dashboard</div></div>
```

**ARIA when necessary:**
```tsx
<div role="dialog" aria-modal="true" aria-labelledby="title">
  <h2 id="title">Confirm</h2>
</div>
```

### Motion Accessibility

Respect `prefers-reduced-motion`:
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
/>
```

## Performance-Driven Design

### Perceived Performance

**Optimistic UI:**
```tsx
const handleLike = async () => {
  setLiked(true); // Update immediately
  try {
    await api.like(id);
  } catch {
    setLiked(false); // Rollback on error
    toast.error('Failed');
  }
};
```

### Animation Performance

**GPU-accelerated only:**
```css
/* DO animate */
transform: translateY(-4px);
opacity: 0.5;

/* AVOID animating */
margin-top: -4px;  /* triggers layout */
width: 100px;      /* triggers layout */
```

## Design Critique Framework

### Usability Heuristics (Nielsen's 10)

1. **System Status** - User always knows what's happening
2. **Real World Match** - Familiar language/concepts
3. **User Control** - Can undo mistakes easily
4. **Consistency** - Same patterns across app
5. **Error Prevention** - Design prevents errors
6. **Recognition > Recall** - Options visible
7. **Flexibility** - Power users can work faster
8. **Minimalist** - Every element necessary
9. **Error Recovery** - Helpful error messages
10. **Help** - Contextual and searchable

### Quick Decision Matrix

| Situation | Design Decision | Why |
|-----------|----------------|-----|
| Primary CTA | Large, prominent | Fitts's Law |
| Destructive action | Red, confirm dialog | Error prevention |
| 10+ form fields | Multi-step wizard | Reduce cognitive load |
| Loading < 1s | Skeleton | Better perception |
| Loading > 3s | Progress bar | Manage expectations |

### Red Flags to Push Back On

- **Dark Patterns**: Hidden unsubscribe, confusing negatives, fake urgency
- **Accessibility Violations**: No keyboard nav, low contrast, missing ARIA
- **Performance Issues**: Layout-triggering animations, blocking main thread
- **Poor Usability**: >7 choices without grouping, >3 clicks for critical actions

## See Also

- [UX Principles](./../_shared/UX_PRINCIPLES.md) - Core psychology and patterns
- [Design Patterns](./../_shared/DESIGN_PATTERNS.md) - Visual design reference
- [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md) - Accessibility requirements
