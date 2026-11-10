# ui-animation: CSS Animation Techniques

Part of the `ui-animation` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## CSS Animation Techniques

### Keyframe Animation

```css
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.element {
  animation: fadeSlideIn 300ms ease-out forwards;
}

/* With steps */
@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.typing-text {
  animation: typewriter 2s steps(20) forwards;
}
```

### Transition

```css
.button {
  background: var(--primary);
  transform: scale(1);
  transition:
    background 150ms ease-out,
    transform 100ms ease-out;
}

.button:hover {
  background: var(--primary-hover);
  transform: scale(1.02);
}

.button:active {
  transform: scale(0.98);
  transition-duration: 50ms;
}
```

### Animation Shorthand

```css
/* animation: name duration timing-function delay
              iteration-count direction fill-mode play-state */

animation: slideIn 300ms ease-out 100ms 1 normal forwards running;

/* Common patterns */
animation: spin 1s linear infinite;
animation: pulse 2s ease-in-out infinite alternate;
animation: fadeIn 300ms ease-out forwards;
```

---
