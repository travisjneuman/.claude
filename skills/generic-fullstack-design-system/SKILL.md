---
name: generic-fullstack-design-system
description: Complete design system reference for full-stack applications. Covers colors, typography, spacing, component patterns (shadcn/ui), effects, GPU-accelerated animations, and WCAG AA accessibility. Use when implementing UI, choosing colors, applying spacing, creating components, or ensuring brand consistency.
---

# Fullstack Design System

Design system reference for Next.js/NestJS full-stack applications.

**Foundational Reference:** See [Design Patterns](./../_shared/DESIGN_PATTERNS.md) for core concepts.

## Color System

### Project Colors (Define in theme.ts)

```css
/* Theme-adaptive via CSS variables */
:root {
  --brand-primary: hsl(220, 100%, 55%);
  --brand-secondary: hsl(180, 100%, 50%);
  --brand-accent: hsl(270, 70%, 60%);
  --background: #ffffff;
  --foreground: #0a0a0f;
}

.dark {
  --background: #0a0a0f;
  --foreground: #fafafa;
}
```

### Semantic Colors
```css
--success: #10B981;
--warning: #F59E0B;
--destructive: #EF4444;
--info: #3B82F6;
```

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Type Scale
| Size | Value | Use |
|------|-------|-----|
| xs | 12px | Captions |
| sm | 14px | Secondary |
| base | 16px | Body |
| lg | 18px | Subheadings |
| xl | 20px | Headings |
| 2xl | 24px | Section titles |
| 3xl | 30px | Page titles |

## Spacing

### Scale (4px base)
| Token | Value | Use |
|-------|-------|-----|
| 1 | 4px | Tight |
| 2 | 8px | Compact |
| 4 | 16px | Default padding |
| 6 | 24px | Card padding |
| 8 | 32px | Large gaps |
| 12 | 48px | Sections |

### Border Radius
| Token | Value | Use |
|-------|-------|-----|
| sm | 4px | Subtle |
| md | 8px | Buttons |
| lg | 12px | Cards |
| 2xl | 24px | Containers |
| full | 9999px | Pills |

## Effects

### Glassmorphism
```css
.glass {
  background: hsl(var(--card) / 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid hsl(var(--border) / 0.5);
}
```

### Gradients
```css
.bg-gradient {
  background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
}
```

## Animations

### GPU-Accelerated Only
```css
/* DO animate */
transform: translateY(-4px);
opacity: 0.5;

/* NEVER animate */
width, height, margin, padding
```

### Timing
| Token | Duration | Use |
|-------|----------|-----|
| fast | 100ms | Micro-interactions |
| base | 200ms | Transitions |
| slow | 300ms | Complex animations |

## Component Patterns (shadcn/ui)

### Buttons
```tsx
import { Button } from '@/components/ui/button';

<Button>Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Cancel</Button>
```

### Cards
```tsx
<div className="glass rounded-2xl p-6">
  {/* Content */}
</div>
```

### Loading
```tsx
<div className="animate-pulse space-y-4">
  <div className="h-8 bg-muted rounded w-3/4" />
  <div className="h-4 bg-muted rounded" />
</div>
```

## Accessibility (WCAG AA)

### Focus States
```css
focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
```

### Contrast
- Text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### Keyboard
- Tab to navigate
- Enter/Space to activate
- Escape to close
- Arrow keys for menus

## Asset Organization

```
public/
├── images/        # Logo, OG image
├── favicons/      # Favicon files
└── site.webmanifest
```

## See Also

- [Design Patterns](./../_shared/DESIGN_PATTERNS.md) - Typography, spacing
- [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md) - Accessibility
- [UX Principles](./../_shared/UX_PRINCIPLES.md) - Visual hierarchy
