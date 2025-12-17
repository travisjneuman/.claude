---
name: generic-react-design-system
description: Complete design system reference for React applications. Covers colors, typography, spacing, component patterns, glassmorphism effects, GPU-accelerated animations, and WCAG AA accessibility. Use when implementing UI, choosing colors, applying spacing, creating components, or ensuring brand consistency.
---

# React Design System

Complete design system reference for React/TypeScript applications.

**Foundational Reference:** See [Design Patterns](./../_shared/DESIGN_PATTERNS.md) for core concepts.

## Color System

### Project Colors (Define in CLAUDE.md or tailwind.config.js)

```css
/* Brand colors - customize per project */
--primary: #3b82f6;      /* Main brand color */
--secondary: #10b981;    /* Supporting color */
--accent: #8b5cf6;       /* Highlight/CTA */

/* Surfaces */
--background: #ffffff;   /* Light mode */
--background-dark: #121212; /* Dark mode (not pure black) */
--foreground: #000000;
--muted: #64748b;

/* Semantic */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Dark Mode Strategy

```css
:root { --background: #ffffff; --foreground: #000000; }

[data-theme="dark"] {
  --background: #121212;  /* Dark gray, easier on eyes */
  --foreground: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root { --background: #121212; --foreground: #ffffff; }
}
```

## Typography

### Font Stack

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'SF Mono', 'Fira Code', monospace;
```

### Type Scale

| Size | Value | Use |
|------|-------|-----|
| xs | 12px | Captions, labels |
| sm | 14px | Secondary text |
| base | 16px | Body (default) |
| lg | 18px | Subheadings |
| xl | 20px | Headings |
| 2xl | 24px | Section titles |
| 3xl | 30px | Page titles |
| 4xl | 36px | Hero |

## Spacing System

### 4px Base Unit

| Token | Value | Use |
|-------|-------|-----|
| 1 | 4px | Tight (icon + text) |
| 2 | 8px | Compact elements |
| 3 | 12px | Form field spacing |
| 4 | 16px | Component padding |
| 6 | 24px | Card padding |
| 8 | 32px | Large gaps |
| 12 | 48px | Section dividers |

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| sm | 4px | Subtle |
| md | 8px | Buttons, inputs |
| lg | 12px | Cards |
| xl | 16px | Modals |
| full | 9999px | Pills, avatars |

## Visual Effects

### Glassmorphism

```css
.glass {
  backdrop-filter: blur(12px) saturate(180%);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.25);
}

.glass-dark {
  background: rgba(255, 255, 255, 0.05);
}
```

### Shadows

```css
--shadow-soft: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-medium: 0 10px 15px rgba(0, 0, 0, 0.15);
--shadow-floating: 0 25px 50px rgba(0, 0, 0, 0.3);

/* Glow effects for accents */
--shadow-glow: 0 0 20px rgba(var(--primary-rgb), 0.4);
```

## Animations

### Performance Requirements (Non-negotiable)

**GPU-accelerated properties ONLY:**
```css
/* DO animate */
transform: translateY(-4px);
opacity: 0.5;
filter: blur(10px);

/* NEVER animate */
width, height, margin, padding, top, left
```

### Timing

| Token | Duration | Use |
|-------|----------|-----|
| fast | 100ms | Micro-interactions |
| base | 200ms | Most transitions |
| slow | 300ms | Complex animations |

### Easing

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Hover Pattern

```css
.hover-lift {
  transform: translateZ(0);
  transition: transform 200ms, box-shadow 200ms;
}

.hover-lift:hover {
  transform: translateY(-4px) translateZ(0);
  box-shadow: var(--shadow-floating);
}
```

## Component Patterns

### Buttons

```tsx
// Primary
<button className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:shadow-lg transition-all">
  Primary
</button>

// Secondary
<button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all">
  Secondary
</button>

// Ghost
<button className="px-4 py-2 text-muted hover:bg-slate-100 rounded-lg transition-all">
  Ghost
</button>
```

### Input Fields

```tsx
<input
  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
  placeholder="Enter text..."
/>
```

### Cards

```tsx
<div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-soft">
  {/* Card content */}
</div>
```

### Modals

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  className="glass p-8 rounded-2xl max-w-md"
  role="dialog"
  aria-modal="true"
>
  {/* Modal content */}
</motion.div>
```

### Loading Skeleton

```tsx
<div className="animate-pulse space-y-4">
  <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded" />
</div>
```

## Accessibility (WCAG AA)

### Focus States

```css
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

### Contrast Requirements

| Use Case | Minimum |
|----------|---------|
| Body text | 4.5:1 |
| Large text (18pt+) | 3:1 |
| UI components | 3:1 |

### ARIA Requirements

```tsx
// Icon-only buttons
<button aria-label="Close modal"><X className="w-5 h-5" /></button>

// Dialogs
<div role="dialog" aria-modal="true" aria-labelledby="title">
  <h2 id="title">Title</h2>
</div>
```

## Responsive Breakpoints

| Token | Min Width | Devices |
|-------|-----------|---------|
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |

## Implementation

### Tailwind Config Example

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
      },
      spacing: {
        '18': '72px',
      },
      borderRadius: {
        'xl': '16px',
      }
    }
  }
}
```

### CSS Variables Setup

```css
:root {
  --primary: #3b82f6;
  --primary-rgb: 59, 130, 246;
  --spacing-unit: 4px;
}
```

## See Also

- [Design Patterns](./../_shared/DESIGN_PATTERNS.md) - Typography, spacing, colors reference
- [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md) - Accessibility, performance
- [UX Principles](./../_shared/UX_PRINCIPLES.md) - Visual hierarchy, interaction patterns
