# ui-animation: Performance

Part of the `ui-animation` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Performance

### GPU-Accelerated Properties

```
FAST (Compositor only):
✓ transform: translate, scale, rotate
✓ opacity
✓ filter (with will-change)

SLOW (Triggers layout/paint):
✗ width, height
✗ margin, padding
✗ top, left, right, bottom
✗ border, border-radius
✗ font-size
✗ box-shadow (repaints)

OPTIMIZATION:
will-change: transform, opacity;
/* Use sparingly! */
```

### Performance Guidelines

```css
/* Good: GPU-accelerated */
.animated-element {
  transform: translateX(0);
  transition: transform 300ms ease-out;
}
.animated-element.moved {
  transform: translateX(100px);
}

/* Bad: Layout thrashing */
.animated-element {
  left: 0;
  transition: left 300ms ease-out;
}
.animated-element.moved {
  left: 100px;
}
```

### FLIP Technique

```javascript
// First: Get initial position
const first = element.getBoundingClientRect();

// Last: Apply change, get final position
element.classList.add("moved");
const last = element.getBoundingClientRect();

// Invert: Calculate delta, apply inverse transform
const deltaX = first.left - last.left;
const deltaY = first.top - last.top;
element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

// Play: Remove transform with transition
requestAnimationFrame(() => {
  element.style.transition = "transform 300ms ease-out";
  element.style.transform = "";
});
```

---
