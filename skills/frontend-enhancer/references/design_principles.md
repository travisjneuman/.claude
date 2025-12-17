# Frontend Design Principles

This reference outlines key design principles for creating aesthetically pleasing and user-friendly interfaces.

## Core Design Principles

### 1. Visual Hierarchy
- Use size, weight, and color to establish importance
- Larger, bolder, or brighter elements attract more attention
- Group related elements together
- Use whitespace to separate different sections

### 2. Spacing and Rhythm
- Consistent spacing creates visual harmony
- Use a spacing scale (e.g., 4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Maintain adequate padding around interactive elements (minimum 44x44px touch targets)
- Use margins to create breathing room between sections

### 3. Typography
- Limit to 2-3 font families maximum
- Establish a clear type scale (e.g., 12px, 14px, 16px, 20px, 24px, 32px, 48px)
- Maintain readable line heights (1.5-1.75 for body text)
- Use font weights strategically (400 for body, 500-600 for emphasis, 700 for headings)
- Ensure sufficient contrast (WCAG AA: 4.5:1 for body text, 3:1 for large text)

### 4. Color Theory
- Use a primary color for main actions and branding
- Choose a secondary color for complementary actions
- Reserve accent colors for highlights and calls-to-action
- Maintain consistent color usage throughout the application
- Use neutral grays for text and backgrounds
- Consider color blindness and accessibility

### 5. Consistency
- Maintain consistent button styles, sizes, and behaviors
- Use the same component patterns throughout
- Keep navigation consistent across pages
- Establish and follow a design system

### 6. Responsiveness
- Design mobile-first, then scale up
- Use fluid typography and spacing
- Ensure touch targets are adequately sized on mobile
- Test across multiple device sizes
- Consider tablet-specific layouts

## Best Practices for Modern UI

### Cards and Containers
- Use subtle shadows for depth (box-shadow: 0 1px 3px rgba(0,0,0,0.1))
- Round corners for a softer feel (border-radius: 8px-12px)
- Add hover states for interactive cards
- Maintain consistent padding inside cards

### Buttons
- Primary buttons should be highly visible
- Use ghost/outline buttons for secondary actions
- Ensure adequate padding (px-4 py-2 minimum)
- Add hover and active states for feedback
- Include loading states for async actions

### Forms
- Label inputs clearly
- Show validation feedback inline
- Use appropriate input types (email, tel, number, etc.)
- Provide helpful placeholder text
- Group related fields together
- Show password requirements upfront

### Navigation
- Keep primary navigation persistent and visible
- Use breadcrumbs for deep hierarchies
- Highlight the active page/section
- Make click targets large enough
- Consider sticky navigation for long pages

### Animations
- Keep animations subtle and purposeful
- Use 200-300ms for micro-interactions
- Use 300-500ms for larger transitions
- Respect prefers-reduced-motion
- Avoid excessive motion that distracts

## Accessibility Guidelines

### Contrast
- WCAG AA: 4.5:1 for normal text, 3:1 for large text
- WCAG AAA: 7:1 for normal text, 4.5:1 for large text
- Test color combinations with contrast checkers

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Provide visible focus indicators
- Maintain logical tab order
- Support escape key for closing modals

### Screen Readers
- Use semantic HTML (nav, main, article, aside)
- Provide alt text for images
- Use ARIA labels when necessary
- Ensure proper heading hierarchy (h1, h2, h3)

### Motion
- Respect prefers-reduced-motion media query
- Provide alternatives to motion-based interactions
- Avoid flashing content (seizure risk)

## Common Layout Patterns

### Hero Section
- Large, attention-grabbing headline
- Concise subheading
- Clear call-to-action
- Optional background image or illustration

### Feature Grid
- 2-3 columns on desktop
- Single column on mobile
- Icons or illustrations for each feature
- Concise descriptions

### Pricing Table
- Clear plan names and prices
- Feature comparison
- Highlighted recommended plan
- Clear call-to-action buttons

### Dashboard Layout
- Summary cards at the top
- Charts and graphs in the main area
- Filters and controls easily accessible
- Responsive grid layout

### Blog/Content Layout
- Wide reading column (60-70 characters per line)
- Clear typography hierarchy
- Adequate line spacing
- Sidebars for supplementary content
