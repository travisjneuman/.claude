# Project CLAUDE.md Template

Use this template to create project-specific CLAUDE.md files.

---

## Usage

Copy the template below to your project root as `CLAUDE.md`.

---

## Template

```markdown
# CLAUDE.md - [Project Name]

> Project-specific instructions for Claude Code. These extend the global ~/.claude/CLAUDE.md.

---

## Project Overview

**Name:** [Project Name]
**Type:** [Web App / CLI / Library / Mobile App / etc.]
**Stack:** [Primary technologies]
**Status:** [Active Development / Maintenance / etc.]

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run test` | Run tests |
| `npm run lint` | Lint code |

---

## Architecture

### Directory Structure

```
src/
├── components/     # [Description]
├── hooks/          # [Description]
├── services/       # [Description]
├── stores/         # [Description]
├── types/          # [Description]
└── utils/          # [Description]
```

### Key Patterns

- **State Management:** [Zustand / Redux / Context / etc.]
- **Styling:** [Tailwind / CSS Modules / Styled Components / etc.]
- **Data Fetching:** [React Query / SWR / fetch / etc.]
- **Routing:** [React Router / Next.js App Router / etc.]

---

## Conventions

### Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserCard.tsx` |
| Hooks | camelCase with use prefix | `useAuth.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |

### File Organization

- One component per file
- Co-locate tests: `Component.test.tsx`
- Co-locate styles: `Component.module.css`

---

## Code Standards

### TypeScript

- Strict mode enabled
- No `any` - use `unknown` for external data
- Explicit return types for public functions
- Interface over type for objects

### Components

```typescript
// Preferred component structure
interface Props {
  // Props interface required
}

export function ComponentName({ prop1, prop2 }: Props) {
  // Hooks at top
  // Event handlers
  // Render
}
```

### Testing

- Test files next to source: `*.test.ts`
- Use [Jest / Vitest / etc.]
- Minimum coverage: [X]%

---

## Environment

### Required Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | Database connection | `postgresql://...` |
| `API_KEY` | External API | `sk-...` |

### Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development
npm run dev
```

---

## Important Files

| File | Purpose | Notes |
|------|---------|-------|
| `src/config.ts` | App configuration | Environment-based |
| `src/types/index.ts` | Shared types | Export all types |
| `prisma/schema.prisma` | Database schema | Run migrate after changes |

---

## Do NOT

- [ ] Commit `.env` files
- [ ] Use `any` type
- [ ] Skip tests for new features
- [ ] Direct DOM manipulation (use React)
- [ ] [Project-specific anti-pattern]

---

## Common Tasks

### Adding a New Feature

1. Create component in `src/components/`
2. Add types to `src/types/`
3. Write tests
4. Update this file if architecture changes

### Database Changes

1. Modify `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name [description]`
3. Run `npx prisma generate`

---

## Known Issues

- [ ] [Issue 1] - [Workaround]
- [ ] [Issue 2] - [Workaround]

---

## Related Documentation

- [Link to API docs]
- [Link to design system]
- [Link to architecture decision records]

---

*Last updated: [Date]*
```

---

## Best Practices

### Keep It Concise
- Project CLAUDE.md should be < 200 lines
- Reference external docs rather than duplicating
- Focus on project-specific deviations from global rules

### Update Regularly
- Update when architecture changes
- Update when new patterns emerge
- Remove outdated information

### What to Include
- Project-specific commands
- Architecture overview
- Naming conventions
- Environment setup
- Common tasks
- Known issues

### What NOT to Include
- General coding best practices (covered in global CLAUDE.md)
- Full API documentation (link to it)
- Detailed tutorials (create separate docs)

---

## Hierarchy

```
Global ~/.claude/CLAUDE.md    # Always applies (constitution)
         ↓
Project ./CLAUDE.md           # Project-specific (this template)
         ↓
Directory ./src/CLAUDE.md     # Directory-specific (rare)
```

Lower levels override higher levels for conflicting rules.

---

*Template version: 1.0*
