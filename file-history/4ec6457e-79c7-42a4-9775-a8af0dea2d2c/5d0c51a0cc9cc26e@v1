---
name: generic-fullstack-feature-developer
description: Guide feature development for full-stack applications with architecture focus. Covers Next.js App Router patterns, NestJS backend services, database models, data workflows, and seamless integration. Use when adding new features, refactoring existing code, or planning major changes.
---

# Fullstack Feature Developer

Guide feature development with Next.js/NestJS architecture patterns.

## Architecture Overview

### Frontend (Next.js App Router)

```
src/
├── app/                    # App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── [route]/            # Route folders
├── components/
│   ├── layout/             # Header, Footer
│   └── ui/                 # shadcn/ui
└── lib/
    ├── theme.ts            # Colors
    └── utils.ts            # Utilities
```

**Best Practices:**
- App Router conventions
- Single source of truth (layout.tsx for Header/Footer)
- shadcn/ui for components
- Theme colors from lib/theme.ts

### Backend (NestJS)

```
src/
├── auth/           # Authentication
├── [module]/       # Feature modules
├── prisma/         # Database service
└── common/         # Shared utilities
```

**Best Practices:**
- Auth guards for protected routes
- Validate with class-validator DTOs
- Keep services focused
- `npx prisma generate` after schema changes

## Feature Checklist

### Before Starting
- [ ] Read existing code in affected areas
- [ ] Check for similar patterns
- [ ] Plan data flow: UI → API → Database

### During Development
- [ ] Follow design system
- [ ] Add TypeScript types
- [ ] Implement keyboard navigation
- [ ] Add ARIA labels
- [ ] Test dark mode

### Before Completion
- [ ] Write tests
- [ ] Verify builds pass
- [ ] Run linter
- [ ] Update CLAUDE.md if new patterns

## Common Patterns

### Adding API Endpoint
1. Create DTO in `src/[module]/dto/`
2. Add service method
3. Add controller route with auth guard
4. Add validation decorators
5. Write tests

### Adding Page (Frontend)
1. Create in `src/app/[route]/page.tsx`
2. Export metadata
3. Follow component patterns
4. Use theme colors
5. Test responsive behavior

### Database Schema Changes
1. Edit `schema.prisma`
2. Run `npx prisma migrate dev`
3. Run `npx prisma generate`
4. Update affected services
5. Add tests

## Performance Guidelines

- Bundle size awareness
- Lazy load non-essential code
- GPU-accelerated animations
- Use Next.js Image component
- Memoize expensive calculations

## See Also

- [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md) - Quality requirements
- [Design Patterns](./../_shared/DESIGN_PATTERNS.md) - UI patterns
- Project `CLAUDE.md` - Workflow rules
