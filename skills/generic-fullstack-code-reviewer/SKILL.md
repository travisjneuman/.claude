---
name: generic-fullstack-code-reviewer
description: Review full-stack code for bugs, security vulnerabilities, performance issues, accessibility gaps, and CLAUDE.md compliance. Enforces TypeScript strict mode, input validation, GPU-accelerated animations, and design system consistency. Use when completing features, before commits, or reviewing pull requests.
---

# Fullstack Code Reviewer

Review Next.js/NestJS code against production quality standards.

**Full Standards:** See [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md)

## Pre-Commit Checklist

- [ ] Frontend build: `npm run build`
- [ ] Backend tests: `npm run test`
- [ ] No TypeScript errors
- [ ] No console errors/warnings
- [ ] Lint passing: `npm run lint`

## Security Checks

### Backend (NestJS)
- Protected routes use auth guards
- Input validated via DTOs (class-validator)
- No raw SQL (use Prisma/ORM)
- Secrets in `.env`, never committed

### Frontend (Next.js)
- Sanitize user input
- Use `unknown` type for external data
- No dynamic code execution
- Proper auth cookie handling

## Performance Requirements

- Images optimized (OG < 1MB)
- Lazy load non-essential components
- GPU-accelerated animations only
- Bundle size awareness

## Accessibility (WCAG AA)

- Focus indicators on interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Color contrast >= 4.5:1
- ARIA labels on icon-only buttons
- Focus trapped in modals

## Type Safety

- TypeScript strict mode
- No `any` for user input
- Validate external API data
- ORM types for database models

## Design System

- Use theme colors only
- Follow component patterns
- Dark/light mode support
- Consistent spacing (4px base)

## Code Organization

- Assets in organized folders
- Single source of truth
- Minimal changes per task
- Follow existing patterns

## See Also

- [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md) - Full requirements
- [Design Patterns](./../_shared/DESIGN_PATTERNS.md) - UI consistency
- Project `CLAUDE.md` - Workflow rules
