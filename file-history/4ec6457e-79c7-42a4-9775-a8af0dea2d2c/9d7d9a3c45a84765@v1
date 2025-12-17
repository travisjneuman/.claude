---
name: generic-static-design-system
description: Complete design system reference for static HTML/CSS/JS sites. Covers colors, typography, component patterns, animations, and accessibility. Use when implementing UI, choosing colors, or ensuring brand consistency.
---

# Static Site Design System

Design system reference for minimalist static sites (HTML/CSS/JS).

**Foundational Reference:** See [Design Patterns](./../_shared/DESIGN_PATTERNS.md) for core concepts.

## Color Palette

**Define per project (typically limited):**
```css
:root {
  --bg-primary: #000000;
  --text-primary: #FFFFFF;
  --text-accent: #00FF00;  /* Brand accent */
}
```

**Color Usage:**
- Background: Primary bg
- Default text: Primary text
- Hover/active: Accent color
- Minimal palette = high impact

## Typography

### System Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Size Scale
```css
font-size: clamp(1rem, 3vw, 1.5rem);     /* Responsive body */
font-size: clamp(1.5rem, 5vw, 2.5rem);   /* Responsive heading */
```

### Styling
- Letter-spacing for impact
- Text-transform for consistency
- Line-height for readability

## Component Patterns

### Interactive Container
```html
<div id="title-container">
  <h1 id="title">Title</h1>
  <span id="arrow">&#9662;</span>
</div>
```

### Dropdown Menu
```html
<div id="menu" class="hidden">
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
  <a href="#">Link 3</a>
</div>
```

### CSS Structure
```css
.hidden {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.visible {
  max-height: 300px;
}
```

## Animations

### Pulse Animation
```css
@keyframes pulse {
  0%, 100% { color: var(--text-primary); }
  50% { color: var(--text-accent); }
}

.pulse {
  animation: pulse 1s infinite;
}
```

### Rotation
```css
.rotate {
  transition: transform 0.3s ease;
}

.rotated {
  transform: rotate(180deg);
}
```

### Stagger Fade
```css
.menu a {
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.menu.visible a:nth-child(1) { transition-delay: 0.1s; }
.menu.visible a:nth-child(2) { transition-delay: 0.2s; }
.menu.visible a:nth-child(3) { transition-delay: 0.3s; }

.menu.visible a {
  opacity: 1;
  transform: translateY(0);
}
```

## Layout

### Page Structure
```
body
├── #container (centered)
│   ├── #title
│   └── #arrow
├── #menu (hidden by default)
│   └── links
└── #content
```

### Responsive Breakpoints
- Mobile: 375px (base)
- Tablet: 768px
- Desktop: 1024px+

## Accessibility

### Color Contrast
- Verify 4.5:1 minimum for text
- Verify 3:1 for large text

### Keyboard Navigation
- Tab to interactive elements
- Enter/Space to activate
- Focus indicators visible

### Screen Reader
- Semantic HTML (`<h1>`, `<a>`, `<nav>`)
- Alt text on images
- ARIA labels where needed

## Performance

### Page Weight Targets
- HTML: < 5KB
- CSS: < 10KB
- JS: < 5KB
- Total: < 50KB (excluding images)

### Lighthouse
- Performance: 95+
- Accessibility: 90+
- Best Practices: 100
- SEO: 100

## See Also

- [Design Patterns](./../_shared/DESIGN_PATTERNS.md) - Core patterns
- [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md) - Accessibility
- [UX Principles](./../_shared/UX_PRINCIPLES.md) - User psychology
