---
name: codebase-documenter
description: This skill should be used when writing documentation for codebases, including README files, architecture documentation, code comments, and API documentation. Use this skill when users request help documenting their code, creating getting-started guides, explaining project structure, or making codebases more accessible to new developers. The skill provides templates, best practices, and structured approaches for creating clear, beginner-friendly documentation.
---

# Codebase Documenter

Create comprehensive, beginner-friendly documentation for any codebase.

## Core Principles

1. **Start with "Why"** - Explain purpose before implementation
2. **Progressive Disclosure** - Simple to complex
3. **Provide Context** - Why code exists, not just what it does
4. **Include Examples** - Concrete usage for every concept
5. **Assume No Prior Knowledge** - Define terms, avoid jargon
6. **Visual Aids** - Diagrams, file trees, flowcharts
7. **Quick Wins** - Get something running in 5 minutes

## Documentation Types

### README (Project Entry Point)
```markdown
# Project Name

## What This Does
[1-2 sentence explanation]

## Quick Start
[< 5 minute setup]

## Project Structure
[Visual file tree]

## Key Concepts
[Core abstractions]

## Common Tasks
[Step-by-step guides]
```

### Architecture Documentation
```markdown
# Architecture Overview

## System Design
[High-level diagram]

## Data Flow
[How data moves through system]

## Key Design Decisions
[Why certain choices were made]

## Extension Points
[Where to add new features]
```

### Code Comments
```typescript
// ✅ GOOD - Explains WHY and context
// IndexedDB quota check: Prevents silent failures when storage is full.
// Without this, writes fail with cryptic QuotaExceededError.
if (quota.percentUsed > 80) showStorageWarning();

// ❌ BAD - Just repeats what code does
// Check if quota is over 80
```

### API Documentation
```markdown
## Endpoint: POST /api/resource

### What It Does
[Plain-English purpose]

### Request/Response
[JSON examples]

### Common Errors
[Error codes and meanings]
```

## Documentation Workflow

1. **Analyze** - Entry points, dependencies, core concepts, configuration
2. **Choose Type** - README → Architecture → API → Comments
3. **Generate** - Use templates, customize for project
4. **Review** - Read as beginner, verify examples work

## File Tree Pattern
```
project/
├── src/                    # Source code
│   ├── components/        # Reusable UI
│   ├── services/          # Business logic
│   └── types/             # TypeScript types
├── tests/                 # Test files
└── package.json           # Dependencies
```

## Data Flow Pattern
```
User Request Flow:
1. User submits → 2. Validation → 3. API → 4. Database → 5. Response

[1] components/Form.tsx
    ↓ validates
[2] services/validation.ts
    ↓ calls API
[3] services/api.ts
    ↓ queries
[4] Database
    ↓ returns
[5] Form.tsx (updates UI)
```

## Design Decision Pattern
```markdown
## Why We Use [Technology]

**Decision:** [What we chose]
**Context:** [Why we needed to choose]
**Reasoning:** [Why this option]
**Trade-offs:** [What we gave up]
```

## See Also

- [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md) - Documentation quality
- Project `CLAUDE.md` - Documentation rules
