# Static Sites Checklist (HTML/CSS/JS)

**When to use:** Any work on static HTML/CSS/JS sites without build tools.

---

## Development Setup

### Local Server Options

```bash
# Python (cross-platform)
python -m http.server 8000   # Windows (and some Linux/Mac)
python3 -m http.server 8000  # macOS/Linux (if python3 symlink exists)

# Node.js (recommended - works identically on all platforms)
npx serve .
npx http-server .

# VS Code Live Server extension (cross-platform)
# Right-click HTML file → "Open with Live Server"
```

**Visit:** http://localhost:8000

---

## Pre-Implementation Checklist

- [ ] Local server running
- [ ] DevTools console open (check for errors)
- [ ] Network tab visible (check for 404s)
- [ ] Responsive mode ready for testing

---

## Code Standards

### HTML
- [ ] Semantic elements used (`<header>`, `<main>`, `<article>`, `<nav>`)
- [ ] Valid HTML (no unclosed tags)
- [ ] `lang` attribute on `<html>`
- [ ] `<meta charset="UTF-8">`
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">`

### CSS
- [ ] CSS variables for colors/spacing (no hardcoded values)
- [ ] Mobile-first responsive design
- [ ] No `!important` unless absolutely necessary
- [ ] Classes follow consistent naming (BEM or similar)

```css
/* Good - CSS variables */
:root {
  --color-primary: #3b82f6;
  --spacing-md: 1rem;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
}

/* Bad - hardcoded */
.button {
  background: #3b82f6;
  padding: 16px;
}
```

### JavaScript
- [ ] ES6+ syntax (const, let, arrow functions)
- [ ] No `var` usage
- [ ] Event delegation for dynamic content
- [ ] `defer` or `async` on script tags
- [ ] No inline `onclick` handlers

```html
<!-- Good -->
<script src="main.js" defer></script>

<!-- Bad -->
<button onclick="handleClick()">Click</button>
```

---

## Testing Checklist

### Console Check
- [ ] No JavaScript errors
- [ ] No 404 resource errors
- [ ] No CORS errors

### Visual Check
- [ ] Renders correctly at 375px (mobile)
- [ ] Renders correctly at 768px (tablet)
- [ ] Renders correctly at 1024px+ (desktop)
- [ ] No horizontal scroll at any size
- [ ] Images load and display correctly

### Interaction Check
- [ ] All links work
- [ ] Forms submit correctly
- [ ] JavaScript features function
- [ ] Hover/focus states visible

---

## Performance Audit

Run Lighthouse in DevTools (F12 → Lighthouse tab):

| Metric | Target | Status |
|--------|--------|--------|
| Performance | 95+ | [ ] |
| Accessibility | 95+ | [ ] |
| Best Practices | 95+ | [ ] |
| SEO | 95+ | [ ] |

### Quick Performance Wins
- [ ] Images optimized (WebP, proper sizing)
- [ ] CSS minified (production)
- [ ] JS minified (production)
- [ ] Unused CSS removed
- [ ] Fonts subset or system fonts used

---

## Accessibility Quick Check

- [ ] All images have `alt` text
- [ ] Heading hierarchy correct (h1 → h2 → h3)
- [ ] Links have descriptive text (not "click here")
- [ ] Color contrast passing (4.5:1 minimum)
- [ ] Tab navigation works logically
- [ ] Focus visible on interactive elements

---

## Browser Testing

| Browser | Status |
|---------|--------|
| Chrome | [ ] |
| Firefox | [ ] |
| Safari | [ ] |
| Edge | [ ] |

---

## Related Skills

| Skill | When to Use |
|-------|-------------|
| `generic-static-code-reviewer` | Code review for static sites |
| `generic-static-design-system` | Design patterns for static sites |
| `generic-static-feature-developer` | Feature implementation |
| `generic-static-ux-designer` | UX for static sites |
| `seo-analytics-auditor` | SEO and analytics |
| `frontend-enhancer` | UI enhancements |

### Invoke with:
```
Skill(generic-static-code-reviewer)
Skill(seo-analytics-auditor)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/rules/checklists/ui-visual-changes.md` - Visual changes checklist

---

## Common Anti-Patterns

- [ ] Hardcoded colors (use CSS variables)
- [ ] Using `var` instead of `const`/`let`
- [ ] Inline event handlers (`onclick`)
- [ ] Missing viewport meta tag
- [ ] Not testing on mobile
- [ ] Ignoring console errors

---

## File Structure (Typical)

```
project/
├── index.html
├── css/
│   ├── reset.css
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   └── ...
└── fonts/ (if custom)
    └── ...
```

---

*Static sites should be simple, fast, and accessible. No build tools = no excuses for complexity.*
