---
name: accessibility-a11y
description: WCAG 2.2 compliance, ARIA patterns, keyboard navigation, screen readers, automated testing
---

# Accessibility (a11y)

## Overview

This skill covers building accessible web applications that work for everyone, including people using screen readers, keyboard-only navigation, switch devices, and other assistive technologies. It addresses WCAG 2.2 compliance at AA and AAA levels, correct ARIA usage, focus management, color contrast, reduced motion support, and automated testing integration.

Use this skill when building new UI components, reviewing existing interfaces for accessibility compliance, fixing a11y audit findings, or integrating automated accessibility testing into CI/CD pipelines.

---

## Core Principles

1. **Semantic HTML first** - Native HTML elements (`<button>`, `<nav>`, `<dialog>`) provide accessibility for free. ARIA is a repair tool for when semantics are insufficient, not a replacement for proper HTML.
2. **Keyboard is the baseline** - If it doesn't work with a keyboard alone, it doesn't work. Every interactive element must be focusable, operable, and have visible focus indicators.
3. **Test with real assistive technology** - Automated tools catch ~30% of accessibility issues. The rest require manual testing with screen readers (VoiceOver, NVDA) and keyboard-only navigation.
4. **Progressive enhancement** - Build the accessible version first, then layer on visual enhancements. Never hide content from assistive technology that sighted users can see.
5. **No information by color alone** - Color can reinforce meaning but never be the sole indicator. Use icons, text labels, and patterns alongside color.

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/accessibility-a11y/`).

| Topic | File | Covers |
| --- | --- | --- |
| Key Patterns | [`references/key-patterns.md`](references/key-patterns.md) | Pattern 1: Accessible Modal Dialog; Pattern 2: Accessible Form with Error Handling; Pattern 3: Keyboard Navigation for Custom Widgets; Pattern 4: Live Regions for Dynamic Content; Pattern 5: Automated Accessibility Testing |
| ARIA Quick Reference | [`references/aria-quick-reference.md`](references/aria-quick-reference.md) | 13 lines |
| Anti-Patterns | [`references/anti-patterns.md`](references/anti-patterns.md) | 14 lines |
| Checklist | [`references/checklist.md`](references/checklist.md) | 17 lines |

## Color Contrast Quick Reference

| Text Size | WCAG AA | WCAG AAA |
|---|---|---|
| Normal text (< 18px / 14px bold) | 4.5:1 | 7:1 |
| Large text (>= 18px / 14px bold) | 3:1 | 4.5:1 |
| UI components & graphical objects | 3:1 | 3:1 |
| Decorative / disabled elements | No requirement | No requirement |

---

## Related Resources

- **Skills:** `performance-engineering` (intersection of performance and a11y), `growth-engineering` (accessible onboarding)
- **Rules:** `docs/reference/checklists/ui-visual-changes.md` (visual change accessibility checks)
- **Rules:** `docs/reference/stacks/react-typescript.md` (React component patterns)
