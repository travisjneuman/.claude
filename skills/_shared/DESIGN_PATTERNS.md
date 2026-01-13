# Design Patterns

Shared reference for typography, spacing, colors, and visual design.

## Atomic Design Framework

### Atoms

Basic building blocks: buttons, inputs, labels, icons, colors, typography

### Molecules

Simple groups: form field (label + input + error), search bar (input + button)

### Organisms

Complex components: navigation header, form section, product card grid

### Templates

Page layouts: how organisms combine into complete screens

## Design Token Structure

### Colors

- **Primary**: Main brand color (action, links)
- **Secondary**: Supporting color
- **Accent**: Highlight/CTA
- **Background/Foreground**: Base colors
- **Destructive/Success/Warning**: State colors
- **Contrast**: >= 4.5:1 for text (WCAG AA)

### Typography

- Font family, size scale, weights, line heights
- Semantic naming (heading-1, body, caption)

### Spacing

- 4px or 8px base unit
- Consistent scale for margins, padding, gaps

### Shadows

- Elevation levels (sm, md, lg)
- Consistent depth system

## Typography Scale

| Name | Size | Line Height | Use              |
| ---- | ---- | ----------- | ---------------- |
| xs   | 12px | 16px        | Captions, labels |
| sm   | 14px | 20px        | Secondary text   |
| base | 16px | 24px        | Body text        |
| lg   | 18px | 28px        | Lead paragraphs  |
| xl   | 20px | 28px        | Section headers  |
| 2xl  | 24px | 32px        | Page headers     |
| 3xl  | 30px | 36px        | Hero text        |
| 4xl  | 36px | 40px        | Display          |

### Font Weights

| Weight   | Value | Use         |
| -------- | ----- | ----------- |
| Normal   | 400   | Body text   |
| Medium   | 500   | UI elements |
| Semibold | 600   | Subheadings |
| Bold     | 700   | Headings    |

## Spacing System

Use 4px or 8px base unit for consistency.

| Token | 4px Base | 8px Base | Use             |
| ----- | -------- | -------- | --------------- |
| 1     | 4px      | 8px      | Tight spacing   |
| 2     | 8px      | 16px     | Default gap     |
| 3     | 12px     | 24px     | Section padding |
| 4     | 16px     | 32px     | Card padding    |
| 6     | 24px     | 48px     | Page margins    |
| 8     | 32px     | 64px     | Large sections  |

## Responsive Breakpoints

| Token | Min Width | Devices        |
| ----- | --------- | -------------- |
| sm    | 640px     | Large phones   |
| md    | 768px     | Tablets        |
| lg    | 1024px    | Laptops        |
| xl    | 1280px    | Desktops       |
| 2xl   | 1536px    | Large desktops |

## Border Radius

| Token   | Value  | Use             |
| ------- | ------ | --------------- |
| sm      | 2px    | Subtle rounding |
| DEFAULT | 4px    | Buttons, inputs |
| md      | 6px    | Cards           |
| lg      | 8px    | Modals          |
| full    | 9999px | Pills, avatars  |

## Animation Principles

### GPU-Accelerated Properties

**DO animate:** transform, opacity
**AVOID:** width, height, top/left/right/bottom, margin, padding

### Duration Guidelines

| Token   | Duration  | Use                                  |
| ------- | --------- | ------------------------------------ |
| fast    | 150-200ms | Micro-interactions (hover, focus)    |
| DEFAULT | 200-300ms | Most transitions                     |
| slow    | 300-500ms | Complex animations, page transitions |

### Performance

- 60fps target (16.67ms per frame)
- Use `requestAnimationFrame` for JS animations
- Prefer CSS transitions/animations
- Use `will-change` sparingly (only during animation)

## Visual Hierarchy

- Size indicates importance
- Contrast draws attention
- Whitespace groups elements
- F-pattern/Z-pattern reading

## Component Documentation Standard

Document each component with:

1. **Name**: Clear, descriptive (e.g., "Primary Button")
2. **Props**: Type, default, description
3. **States**: Default, hover, active, disabled, loading, error
4. **Code snippet**: Usage example

Example:

```typescript
interface ButtonProps {
  variant: "primary" | "secondary" | "ghost";
  size: "sm" | "md" | "lg";
  disabled?: boolean;
}
```

## Component Patterns

### Buttons

| Variant     | Use                 | Touch Target |
| ----------- | ------------------- | ------------ |
| Primary     | Main actions        | >= 44x44px   |
| Secondary   | Alternative actions | >= 44x44px   |
| Ghost       | Subtle actions      | >= 44x44px   |
| Destructive | Delete/remove       | >= 44x44px   |

### Form Inputs

- Clear focus states (2px outline, high contrast)
- Error states with messages
- Label always visible
- Required indicator
- Touch targets >= 44x44px

### Modals

- Focus trapped inside
- Escape to close
- Dark overlay (50-80% opacity)
- Centered or slide-in

### Cards

- Consistent padding (16-24px)
- Subtle shadow for depth
- Rounded corners (4-8px)
- Hover state for interactive cards

## Accessibility Thresholds

| Requirement         | Threshold              | Standard      |
| ------------------- | ---------------------- | ------------- |
| Text contrast       | >= 4.5:1               | WCAG AA       |
| Large text contrast | >= 3:1                 | WCAG AA       |
| Touch targets       | >= 44x44px             | WCAG 2.1      |
| Focus indicator     | >= 2px outline         | WCAG 2.1      |
| Tap spacing         | >= 8px between targets | Best practice |
