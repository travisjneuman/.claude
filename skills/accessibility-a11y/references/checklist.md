# accessibility-a11y: Checklist

Part of the `accessibility-a11y` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Checklist

- [ ] All interactive elements are keyboard accessible (Tab, Enter, Space, Escape, Arrow keys)
- [ ] Focus indicators are visible on all focusable elements (`:focus-visible`)
- [ ] All images have descriptive `alt` text (or `alt=""` for decorative)
- [ ] Form inputs have associated `<label>` elements
- [ ] Error messages are programmatically associated with inputs (`aria-describedby`)
- [ ] Color contrast meets WCAG AA (4.5:1 normal text, 3:1 large text)
- [ ] No information conveyed by color alone
- [ ] `prefers-reduced-motion` media query respected for animations
- [ ] Page has correct heading hierarchy (h1 > h2 > h3, no skips)
- [ ] Language is declared (`<html lang="en">`)
- [ ] axe-core checks in CI (only when the user asks for automated a11y tests)
- [ ] Manual testing done with VoiceOver (macOS) or NVDA (Windows)

---
