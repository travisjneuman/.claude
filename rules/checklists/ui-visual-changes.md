# UI/Visual Changes Checklist

**When to use:** Any task involving visual changes, styling, animations, or UI modifications.

---

## Pre-Change Requirements

- [ ] **Screenshot current state** before making ANY changes
- [ ] **Identify baseline** - what should remain unchanged?
- [ ] **Check design tokens** - are CSS variables defined for colors/spacing?

---

## During Implementation

### Golden Rule: ONE Change at a Time

Never batch multiple visual changes. Make one change, verify, then proceed.

```
WRONG: Change color, font, AND spacing → then test
RIGHT: Change color → test → Change font → test → Change spacing → test
```

### Change Verification Loop

1. Make single change
2. Screenshot after
3. Compare to baseline
4. Verify no unintended side effects
5. Get user approval if significant
6. Proceed to next change

---

## Browser Testing Matrix

| Browser | Status |
|---------|--------|
| Chrome (latest) | [ ] |
| Firefox (latest) | [ ] |
| Safari (latest) | [ ] |
| Edge (latest) | [ ] |

---

## Responsive Testing

| Breakpoint | Device | Status |
|------------|--------|--------|
| 375px | Mobile (iPhone SE) | [ ] |
| 768px | Tablet (iPad) | [ ] |
| 1024px | Small Desktop | [ ] |
| 1440px+ | Large Desktop | [ ] |

### Test at each breakpoint:
- [ ] Layout doesn't break
- [ ] Text remains readable
- [ ] Touch targets >= 44x44px (mobile)
- [ ] No horizontal scroll
- [ ] Images scale correctly

---

## Animation Checklist

- [ ] Animations run at **60fps** (use DevTools Performance tab)
- [ ] Use GPU-accelerated properties only: `transform`, `opacity`
- [ ] Avoid animating: `width`, `height`, `top`, `left`, `margin`, `padding`
- [ ] `prefers-reduced-motion` respected
- [ ] Duration appropriate (150-300ms for micro-interactions)

---

## Visual Diff Verification

Before committing:

1. [ ] Side-by-side comparison: before vs after
2. [ ] Only intended changes visible
3. [ ] No unexpected color shifts
4. [ ] No layout drift in unrelated areas
5. [ ] Hover/focus/active states still work

---

## Accessibility (Visual)

- [ ] Color contrast >= 4.5:1 (text) / 3:1 (large text)
- [ ] Focus indicators visible and clear
- [ ] No information conveyed by color alone
- [ ] Icons have labels or aria-labels

---

## Related Skills

Use these skills for UI work:

| Skill | When to Use |
|-------|-------------|
| `generic-design-system` | Color choices, spacing, typography |
| `generic-ux-designer` | User flow, interaction patterns |
| `generic-react-design-system` | React-specific patterns |
| `generic-static-design-system` | Static site patterns |
| `generic-fullstack-design-system` | Full-stack app patterns |
| `frontend-enhancer` | Modern UI enhancements |

### Invoke with:
```
Skill(generic-design-system)
Skill(frontend-enhancer)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules (Performance Targets, Accessibility)
- `~/.claude/templates/task-template.md` - Task planning

---

## Common Anti-Patterns

- [ ] Making multiple changes before testing
- [ ] Not taking before screenshots
- [ ] Testing only in Chrome
- [ ] Hardcoded colors instead of CSS variables
- [ ] Animating layout properties (causes jank)
- [ ] Ignoring mobile breakpoints

---

*Reference this checklist for ANY visual change, no matter how small.*
