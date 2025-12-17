---
name: generic-static-code-reviewer
description: Review static site code for bugs, security issues, performance problems, accessibility gaps, and CLAUDE.md compliance. Enforces pure HTML/CSS/JS standards, minimal page weight, mobile-first design. Use when completing features, before commits, or reviewing changes.
---

# Static Site Code Reviewer

Review HTML/CSS/JS code against production quality standards.

**Full Standards:** See [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md)

## Pre-Commit Checklist

- [ ] Visual inspection passed
- [ ] Works in all browsers
- [ ] Responsive tested
- [ ] Lighthouse 95+
- [ ] Documentation updated

## Code Quality

### HTML
- Semantic tags (`<h1>`, `<a>`, `<nav>`)
- Self-closing void elements
- Meaningful alt text
- Proper indentation (2 spaces)

### CSS
- Mobile-first approach
- Avoid `!important`
- CSS custom properties for colors
- Comment complex animations
- Consistent naming

### JavaScript
- ES6+ syntax (const, let, arrow functions)
- Event delegation where possible
- No jQuery dependencies
- Comments for non-obvious logic
- Defensive null checks

## Security

- No exposed API keys
- No tracking scripts (if privacy-first)
- Content validation in scripts
- No unsanitized user input

## Performance Requirements

- Total page weight: < 50KB (excluding images)
- Images: Optimized, < 500KB each
- First Contentful Paint: < 1s
- Lighthouse Performance: 95+

## Accessibility (WCAG AA)

- Semantic HTML structure
- Alt text for all images
- Keyboard navigation (Tab, Enter)
- ARIA labels where needed
- Color contrast > 4.5:1
- Focus indicators visible

## Design System

- Use defined color palette only
- Follow typography patterns
- Consistent spacing
- Match established aesthetic

## Surgical Simplicity

- Changes impact minimal code
- Every line intentional
- No commented-out code
- Clean and documented

## See Also

- [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md) - Full requirements
- [Design Patterns](./../_shared/DESIGN_PATTERNS.md) - UI consistency
- Project `CLAUDE.md` - Workflow rules
