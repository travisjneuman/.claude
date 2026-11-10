# ui-animation: Animation Patterns

Part of the `ui-animation` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Animation Patterns

### Micro-interactions

```
BUTTON STATES:
┌─────────────────────────────────────────┐
│ Rest → Hover: scale(1.02), 100ms        │
│ Hover → Active: scale(0.98), 50ms       │
│ Active → Rest: scale(1), 150ms ease-out │
└─────────────────────────────────────────┘

TOGGLE SWITCH:
┌─────────────────────────────────────────┐
│ Thumb: translateX, 200ms ease-out       │
│ Track: background-color, 200ms          │
│ State: slight bounce at end             │
└─────────────────────────────────────────┘

CHECKBOX:
┌─────────────────────────────────────────┐
│ Check mark: stroke-dashoffset animation │
│ Background: scale from center, 150ms    │
│ Ripple: expanding circle, 300ms         │
└─────────────────────────────────────────┘
```

### Loading States

```
SKELETON SCREENS:
┌──────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░  │ Shimmer effect
│ ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░  │ Linear gradient
│ ▓▓▓▓▓▓░░░░░░░░░░░░░░░░  │ Moving left to right
└──────────────────────────┘

CSS:
background: linear-gradient(
  90deg,
  #f0f0f0 25%,
  #e0e0e0 50%,
  #f0f0f0 75%
);
background-size: 200% 100%;
animation: shimmer 1.5s infinite;

SPINNER:
- Duration: 1-2 seconds per rotation
- Easing: linear (consistent motion)
- Style: Match brand identity
```

### Page Transitions

```
CROSSFADE:
├──────────────────────────────────────────┤
│ Old page: opacity 1 → 0, 200ms           │
│ New page: opacity 0 → 1, 200ms           │
│ Timing: Sequential or overlapping        │
└──────────────────────────────────────────┘

SLIDE:
├──────────────────────────────────────────┤
│ Direction follows navigation hierarchy   │
│ Forward: Slide left (new from right)     │
│ Back: Slide right (prev from left)       │
│ Duration: 300-400ms                      │
└──────────────────────────────────────────┘

SHARED ELEMENT:
├──────────────────────────────────────────┤
│ Element morphs between states            │
│ Position, size, border-radius change     │
│ Creates continuity between screens       │
│ Duration: 300-500ms                      │
└──────────────────────────────────────────┘
```

### List Animations

```
STAGGERED ENTRANCE:
┌─ Item 1 ────────────────┐  delay: 0ms
├─ Item 2 ────────────────┤  delay: 50ms
├─ Item 3 ────────────────┤  delay: 100ms
├─ Item 4 ────────────────┤  delay: 150ms
└─ Item 5 ────────────────┘  delay: 200ms

Max total duration: 500ms
Stagger: 30-50ms per item
Animation: translateY + opacity

REORDER:
- Use FLIP technique
- Duration: 200-300ms
- Ease: ease-out
```

---
