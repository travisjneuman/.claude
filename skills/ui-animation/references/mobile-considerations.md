# ui-animation: Mobile Considerations

Part of the `ui-animation` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Mobile Considerations

### Touch Feedback

```css
/* iOS-style tap feedback */
.button {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.button:active {
  opacity: 0.7;
  transition: opacity 50ms;
}

/* Ripple effect */
.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: "";
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 400ms ease-out;
}
```

### Platform Conventions

| Platform    | Animation Style                        |
| ----------- | -------------------------------------- |
| **iOS**     | Spring physics, 300-500ms, subtle      |
| **Android** | Material motion, 200-300ms, emphasized |
| **Web**     | Varies, typically 200-400ms            |

---
