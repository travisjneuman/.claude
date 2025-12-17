---
name: generic-static-feature-developer
description: Guide feature development for static HTML/CSS/JS sites. Covers patterns, automation workflows, and content validation. Use when adding features, modifying automation, or planning changes.
---

# Static Site Feature Developer

Guide feature development for minimalist static sites.

## Architecture Overview

### Typical Structure
```
project/
├── index.html          # Main page
├── style.css           # Styling
├── script.js           # Interactions
├── assets/             # Images, fonts
├── .github/
│   └── workflows/      # GitHub Actions (if used)
├── automation/         # Scripts (if used)
└── docs/               # Documentation
```

### No Build Tools
- Edit → Save → Deploy
- Pure HTML/CSS/JS
- Simple development workflow

## Feature Development Guidelines

### Landing Page Changes

**Process:**
1. Test locally: `python3 -m http.server 8000`
2. Screenshot before/after
3. Test all browsers (Chrome, Firefox, Safari)
4. Test responsiveness (375px, 768px, 1024px)
5. Get approval before committing

**Acceptable (with approval):**
- Performance optimizations
- SEO metadata updates
- Accessibility improvements

### Automation Changes (if applicable)

**Adding/Modifying Scripts:**
1. Test with dry run flag
2. Verify output matches expectations
3. Check edge cases
4. Update documentation

**GitHub Actions:**
1. Use secrets for API keys
2. Test with workflow_dispatch
3. Consider rate limits

## Feature Checklist

### Before Starting
- [ ] Sync with main branch
- [ ] Read affected files
- [ ] Check for similar patterns

### For Page Changes
- [ ] Screenshot current state
- [ ] Make ONE change at a time
- [ ] Test locally in multiple browsers
- [ ] Compare to baseline
- [ ] Get approval before committing

### For Script Changes
- [ ] Test with dry run
- [ ] Verify outputs
- [ ] Check validation works
- [ ] Test edge cases
- [ ] Update docs if behavior changes

### Before Completion
- [ ] All tests pass (visual)
- [ ] Documentation updated

## Common Patterns

### Adding a Link
1. Add to HTML
2. Update CSS if needed (stagger animation)
3. Test interaction

### Adding Validation Rule
```python
def validate_new_rule(content):
    return not "bad_pattern" in content.lower()
```

### Adding GitHub Action Step
```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

## Performance Guidelines

- Total < 50KB (excluding images)
- Images < 500KB
- Lighthouse 95+
- First Contentful Paint < 1s

## See Also

- [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md) - Quality
- [Design Patterns](./../_shared/DESIGN_PATTERNS.md) - UI patterns
- Project `CLAUDE.md` - Workflow rules
