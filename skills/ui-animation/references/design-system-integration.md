# ui-animation: Design System Integration

Part of the `ui-animation` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Design System Integration

### Animation Tokens

```css
:root {
  /* Durations */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;

  /* Easings */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.27, 1.55);

  /* Combined */
  --transition-default: var(--duration-normal) var(--ease-default);
  --transition-fast: var(--duration-fast) var(--ease-out);
}

/* Usage */
.element {
  transition: transform var(--transition-default);
}
```

---
