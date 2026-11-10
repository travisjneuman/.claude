---
name: ui-animation
description: Motion design and animation for user interfaces. Use when creating micro-interactions, page transitions, loading states, or any UI animation across web and mobile platforms.
---

# UI Animation & Motion Design

Comprehensive guide for creating purposeful, performant animations in user interfaces.

## Animation Principles

### The 12 Principles of Animation (Applied to UI)

| Principle            | UI Application                        |
| -------------------- | ------------------------------------- |
| **Timing**           | Duration reflects importance/distance |
| **Easing**           | Natural acceleration/deceleration     |
| **Anticipation**     | Visual preparation for action         |
| **Follow-through**   | Momentum continues after stop         |
| **Secondary Action** | Supporting elements respond           |
| **Staging**          | Draw attention to key element         |
| **Squash & Stretch** | Bouncy, playful interactions          |
| **Exaggeration**     | Emphasize important feedback          |
| **Arc**              | Natural curved motion paths           |
| **Overlap**          | Elements move at different rates      |
| **Solid Drawing**    | Maintain consistent 3D space          |
| **Appeal**           | Engaging, delightful motion           |

### Why Animate?

```
FUNCTIONAL PURPOSES:
✓ Guide attention to important changes
✓ Show relationships between elements
✓ Provide feedback for actions
✓ Communicate system status
✓ Ease cognitive load
✓ Create spatial orientation

NOT FOR:
✗ Pure decoration
✗ Showing off skills
✗ Making things "feel modern"
✗ Distracting from content
```

---

## Timing & Duration

### Duration Guidelines

```
INSTANT (0-100ms):
└─→ Button state changes
└─→ Toggle switches
└─→ Micro-feedback

FAST (100-200ms):
└─→ Hover effects
└─→ Simple fades
└─→ Small movements

STANDARD (200-300ms):
└─→ Most UI transitions
└─→ Modal open/close
└─→ Dropdown menus

SLOW (300-500ms):
└─→ Complex transitions
└─→ Page transitions
└─→ Large element movement

DELIBERATE (500ms+):
└─→ Hero animations
└─→ Skeleton loading
└─→ Onboarding sequences
```

### Distance-Based Timing

```
Rule: Longer distance = Longer duration

Small (< 100px):   150-200ms
Medium (100-300px): 200-300ms
Large (300-500px):  300-400ms
Full screen:        400-500ms

Formula:
duration = baseTime + (distance × factor)
```

---

## Easing Functions

### Standard Easings

```
LINEAR
├────────────────────────────┤
Constant speed. Rarely natural.
Use: Progress bars, clock hands

EASE-OUT (Deceleration)
├═══════════────────────────┤
Fast start, slow end.
Use: Elements entering the screen

EASE-IN (Acceleration)
├────────────────═══════════┤
Slow start, fast end.
Use: Elements leaving the screen

EASE-IN-OUT (S-curve)
├────═══════════════────────┤
Slow start and end, fast middle.
Use: On-screen transitions

EASE-OUT-BACK (Overshoot)
├═══════════────────────╗───┤
Overshoots, settles back.
Use: Playful entrances, bounces
```

### CSS Easing Values

```css
/* Built-in keywords */
linear: cubic-bezier(0, 0, 1, 1)
ease: cubic-bezier(0.25, 0.1, 0.25, 1)
ease-in: cubic-bezier(0.42, 0, 1, 1)
ease-out: cubic-bezier(0, 0, 0.58, 1)
ease-in-out: cubic-bezier(0.42, 0, 0.58, 1)

/* Material Design standard */
standard: cubic-bezier(0.4, 0, 0.2, 1)
decelerate: cubic-bezier(0, 0, 0.2, 1)
accelerate: cubic-bezier(0.4, 0, 1, 1)

/* Custom: Snappy */
snappy: cubic-bezier(0.5, 0, 0, 1)

/* Custom: Bouncy */
bouncy: cubic-bezier(0.68, -0.55, 0.27, 1.55)

/* Spring-like (use JS libraries) */
spring: { stiffness: 300, damping: 20 }
```

### When to Use Each

| Scenario           | Easing        | Why                            |
| ------------------ | ------------- | ------------------------------ |
| Element entering   | ease-out      | Arrives energetically, settles |
| Element leaving    | ease-in       | Gathers momentum to exit       |
| On-screen change   | ease-in-out   | Smooth state change            |
| Attention grabbing | bounce/spring | Playful, noticeable            |
| Background/subtle  | ease-out      | Unobtrusive                    |

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/ui-animation/`).

| Topic | File | Covers |
| --- | --- | --- |
| Animation Patterns | [`references/animation-patterns.md`](references/animation-patterns.md) | Micro-interactions; Loading States; Page Transitions; List Animations |
| Performance | [`references/performance.md`](references/performance.md) | GPU-Accelerated Properties; Performance Guidelines; FLIP Technique |
| CSS Animation Techniques | [`references/css-animation-techniques.md`](references/css-animation-techniques.md) | Keyframe Animation; Transition; Animation Shorthand |
| JavaScript Animation Libraries | [`references/javascript-animation-libraries.md`](references/javascript-animation-libraries.md) | Comparison; Framer Motion (React); GSAP |
| Accessibility | [`references/accessibility.md`](references/accessibility.md) | Respecting User Preferences; Safe Animation Practices; WCAG Guidelines |
| Mobile Considerations | [`references/mobile-considerations.md`](references/mobile-considerations.md) | Touch Feedback; Platform Conventions |
| Design System Integration | [`references/design-system-integration.md`](references/design-system-integration.md) | Animation Tokens |
| Best Practices | [`references/best-practices.md`](references/best-practices.md) | DO:; DON'T: |
| Animation Checklist | [`references/animation-checklist.md`](references/animation-checklist.md) | Pre-Implementation; Implementation; Quality Check |
