# accessibility-a11y: Anti-Patterns

Part of the `accessibility-a11y` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Better Approach |
|---|---|---|
| `<div onclick>` instead of `<button>` | No keyboard access, no role, no focus | Use `<button>` for clickable elements |
| Using ARIA where native HTML works | More complex, more bugs | `<nav>` not `<div role="navigation">` |
| `tabindex="5"` (positive values) | Breaks natural tab order | Use `tabindex="0"` or `tabindex="-1"` only |
| `aria-label` that duplicates visible text | Screen reader hears it twice | Use `aria-label` only for non-visible labels |
| Hiding focus outlines (`outline: none`) | Keyboard users lose their place | Style `:focus-visible` instead of removing |
| `autofocus` on page load | Disorients screen reader users | Let users navigate naturally |
| Images of text | Cannot be resized, not translatable | Use real text with CSS styling |

---
