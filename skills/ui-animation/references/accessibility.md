# ui-animation: Accessibility

Part of the `ui-animation` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Accessibility

### Respecting User Preferences

```css
/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Or provide simpler alternatives */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    /* Replace motion with opacity */
    animation: none;
    transition: opacity 200ms ease;
  }
}
```

### Safe Animation Practices

```
AVOID for vestibular disorders:
✗ Parallax scrolling effects
✗ Zooming/scaling animations
✗ Spinning/rotating elements
✗ Auto-playing animations
✗ Flashing (>3 times/second)

SAFE alternatives:
✓ Opacity fades
✓ Color transitions
✓ Subtle position changes
✓ User-initiated animations
```

### WCAG Guidelines

```
2.2.2 Pause, Stop, Hide:
- Auto-updating content can be paused
- No time limits on reading

2.3.1 Three Flashes:
- Nothing flashes more than 3x per second

2.3.3 Animation from Interactions:
- Motion can be disabled
- Triggered animations respect preferences
```

---
