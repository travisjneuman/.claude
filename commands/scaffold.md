---
description: Scaffold project components from templates
arguments:
  - name: type
    description: "Component type: component | api | service | page | middleware | project"
    required: true
  - name: name
    description: "Name for the scaffolded component (PascalCase or kebab-case)"
    required: true
---

# Scaffold Component

Generates project files following existing conventions. Detects the project type, creates properly structured files, and updates barrel exports.

---

## Execution Flow

### Step 1: Detect Project Type

```bash
# Detect stack
[ -f "package.json" ] && grep -q '"next"' package.json 2>/dev/null && echo "NEXTJS"
[ -f "package.json" ] && grep -q '"react"' package.json 2>/dev/null && echo "REACT"
[ -f "package.json" ] && grep -q '"@nestjs/core"' package.json 2>/dev/null && echo "NESTJS"
[ -f "pyproject.toml" ] || [ -f "requirements.txt" ] && echo "PYTHON"
[ -f "go.mod" ] && echo "GO"
[ -f "Cargo.toml" ] && echo "RUST"
[ -f "index.html" ] && ! [ -f "package.json" ] && echo "STATIC"
```

Also scan existing files for naming conventions (PascalCase vs kebab-case, file structure patterns).

---

### Step 2: Normalize Name

Convert `{{name}}` to needed formats:

| Format      | Example (from "user-profile") |
| ----------- | ----------------------------- |
| PascalCase  | `UserProfile`                 |
| camelCase   | `userProfile`                 |
| kebab-case  | `user-profile`                |
| snake_case  | `user_profile`                |
| UPPER_SNAKE | `USER_PROFILE`                |

---

### Step 3: Generate Files by Type

#### component (React/Next.js)

**Creates:**

```
src/components/{{PascalCase}}/
  {{PascalCase}}.tsx       # Component implementation
  {{PascalCase}}.test.tsx  # Test file
  index.ts                 # Barrel export
```

**Component template:**

```typescript
interface Props {
  // Define props here
}

export function {{PascalCase}}({}: Props) {
  return (
    <div>
      <h2>{{PascalCase}}</h2>
    </div>
  );
}
```

**Test template:**

```typescript
import { render, screen } from '@testing-library/react';
import { {{PascalCase}} } from './{{PascalCase}}';

describe('{{PascalCase}}', () => {
  it('renders successfully', () => {
    render(<{{PascalCase}} />);
    expect(screen.getByText('{{PascalCase}}')).toBeInTheDocument();
  });
});
```

**Barrel export:**

```typescript
export { {{PascalCase}} } from './{{PascalCase}}';
```

#### api (NestJS / Next.js API route / FastAPI)

**NestJS creates:**

```
src/modules/{{kebab-case}}/
  {{kebab-case}}.module.ts
  {{kebab-case}}.controller.ts
  {{kebab-case}}.service.ts
  {{kebab-case}}.controller.spec.ts
  {{kebab-case}}.service.spec.ts
  dto/
    create-{{kebab-case}}.dto.ts
    update-{{kebab-case}}.dto.ts
```

**Next.js App Router creates:**

```
app/api/{{kebab-case}}/
  route.ts
```

**FastAPI creates:**

```
src/routers/{{snake_case}}.py
src/schemas/{{snake_case}}.py
tests/test_{{snake_case}}_router.py
```

#### service

**TypeScript creates:**

```
src/services/
  {{camelCase}}.service.ts
  {{camelCase}}.service.test.ts
```

**Python creates:**

```
src/services/{{snake_case}}_service.py
tests/services/test_{{snake_case}}_service.py
```

**Go creates:**

```
internal/service/{{snake_case}}.go
internal/service/{{snake_case}}_test.go
```

#### page (Next.js / React Router)

**Next.js App Router creates:**

```
app/{{kebab-case}}/
  page.tsx
  loading.tsx
  error.tsx
  layout.tsx (optional - ask)
```

**React Router creates:**

```
src/pages/{{PascalCase}}/
  {{PascalCase}}Page.tsx
  {{PascalCase}}Page.test.tsx
  index.ts
```

#### middleware

**NestJS creates:**

```
src/common/middleware/
  {{kebab-case}}.middleware.ts
  {{kebab-case}}.middleware.spec.ts
```

**Express creates:**

```
src/middleware/
  {{camelCase}}.ts
  {{camelCase}}.test.ts
```

**FastAPI creates:**

```
src/middleware/{{snake_case}}.py
tests/middleware/test_{{snake_case}}.py
```

#### project

Scaffold an entire new project. Delegates to `/init-project` with the detected or specified stack, then creates the initial directory structure, configuration files, and boilerplate.

---

### Step 4: Update Barrel Exports

After creating files, update the nearest `index.ts` or `__init__.py` barrel file:

```bash
# Find nearest barrel file
# For TypeScript: look for index.ts in parent directories
# For Python: look for __init__.py
```

Add the new export to the barrel file if one exists.

---

### Step 5: Confirmation

Report what was created:

```
Scaffolded: {{type}} "{{name}}"

Created files:
  - src/components/UserProfile/UserProfile.tsx
  - src/components/UserProfile/UserProfile.test.tsx
  - src/components/UserProfile/index.ts

Updated:
  - src/components/index.ts (added export)

Next steps:
  - [ ] Implement component logic
  - [ ] Update Props interface
  - [ ] Write meaningful tests
  - [ ] Add to parent component/route
```

---

## Conventions Detection

Before generating, scan existing files to match project conventions:

- **Import style:** named vs default exports
- **Test location:** co-located vs separate `tests/` directory
- **Naming:** check if project uses `.tsx` vs `.jsx`, `.test.` vs `.spec.`
- **CSS approach:** CSS modules, Tailwind, styled-components
- **State management:** hooks, Zustand, Redux

Match the detected conventions in generated files.

---

## Quick Reference

```
/scaffold component UserProfile
/scaffold api users
/scaffold service authentication
/scaffold page dashboard
/scaffold middleware rate-limiter
/scaffold project my-new-app
```

---

_Part of the Ultimate Claude Code Toolkit_
