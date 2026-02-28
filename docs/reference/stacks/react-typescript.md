# React + TypeScript Stack Guide

**When to use:** Any React application with TypeScript.

---

## Project Commands

```bash
# Development (Vite 6 as default bundler)
npm run dev          # Start dev server (Vite)
npm run build        # Production build
npm run test         # Run tests (Vitest)
npm run type-check   # TypeScript validation
npm run lint         # Lint code (ESLint or Biome)

# Biome alternative (faster linting + formatting)
npx @biomejs/biome check .        # Lint
npx @biomejs/biome format .       # Format
npx @biomejs/biome check --fix .  # Lint + fix

# Verify before committing
npm run test && npm run type-check
```

---

## Code Standards

### Component Structure

```typescript
// Always define Props interface
interface Props {
  title: string;
  onAction: () => void;
  ref?: React.Ref<HTMLDivElement>; // React 19: ref as prop (no forwardRef needed)
  children?: React.ReactNode;
}

// Functional components only (no class components)
// React 19: ref is a regular prop, forwardRef is no longer needed
export function MyComponent({ title, onAction, ref, children }: Props) {
  // Hooks at top
  const [state, setState] = useState<string>('');

  // React 19: use() hook for promises and context
  // const data = use(fetchPromise);
  // const theme = use(ThemeContext);

  // Event handlers
  const handleClick = () => {
    onAction();
  };

  // Render
  return (
    <div ref={ref}>
      <h1>{title}</h1>
      <button onClick={handleClick}>Action</button>
      {children}
    </div>
  );
}
```

### TypeScript Rules

| Rule             | Enforcement                     |
| ---------------- | ------------------------------- |
| No `any`         | Use `unknown` for external data |
| Strict mode      | Always enabled in tsconfig      |
| Props interfaces | Required for all components     |
| Return types     | Explicit for complex functions  |

```typescript
// WRONG
const data: any = fetchData();

// RIGHT
const data: unknown = fetchData();
if (isValidData(data)) {
  // Now typed
}
```

### State Management (Zustand Pattern)

```typescript
interface State {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((s) => ({
          items: [...s.items, item],
        })),
      removeItem: (id) =>
        set((s) => ({
          items: s.items.filter((i) => i.id !== id),
        })),
    }),
    { name: "store-name", version: 1 },
  ),
);
```

---

## File Organization

```
src/
├── components/        # Reusable UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── ...
├── hooks/             # Custom hooks
├── stores/            # Zustand stores
├── services/          # API/business logic
├── types/             # Shared TypeScript types
├── utils/             # Utility functions
└── pages/ or app/     # Route pages
```

### File Naming

| Type       | Convention | Example             |
| ---------- | ---------- | ------------------- |
| Components | PascalCase | `UserCard.tsx`      |
| Hooks      | use prefix | `useAuth.ts`        |
| Utilities  | camelCase  | `formatDate.ts`     |
| Types      | PascalCase | `User.ts`           |
| Tests      | .test.ts   | `UserCard.test.tsx` |

---

## Testing Checklist

- [ ] `npm run test` passes
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Bundle size acceptable

### Test Structure

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  it('renders user name', () => {
    render(<UserCard name="John" />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<UserCard name="John" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

## Performance Patterns

### Memoization

```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(items);
}, [items]);

// Memoize callbacks passed to children
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize components (sparingly)
const MemoizedComponent = memo(MyComponent);
```

### Lazy Loading

```typescript
// Lazy load routes/heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

## Common Patterns

### Error Boundaries (react-error-boundary)

```typescript
// Prefer react-error-boundary library over class components
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

// Usage
<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={() => queryClient.clear()}
>
  <App />
</ErrorBoundary>
```

### Custom Hooks

```typescript
// Extract reusable logic into hooks
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

---

## Related Skills

| Skill                             | When to Use            |
| --------------------------------- | ---------------------- |
| `generic-react-code-reviewer`     | Code review            |
| `generic-react-design-system`     | Design patterns        |
| `generic-react-feature-developer` | Feature implementation |
| `generic-react-ux-designer`       | UX design              |
| `test-specialist`                 | Testing guidance       |
| `tech-debt-analyzer`              | Code health            |

### Invoke with:

```
Skill(generic-react-code-reviewer)
Skill(generic-react-feature-developer)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/docs/reference/checklists/ui-visual-changes.md` - Visual changes

---

## Anti-Patterns

- [ ] Using `any` type
- [ ] Class components
- [ ] Missing Props interface
- [ ] Inline functions in JSX (performance)
- [ ] Direct DOM manipulation
- [ ] Not memoizing expensive operations

---

## Modern React Patterns (React 19+)

### React 19 Features

| Feature                  | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| `use()` hook             | Read promises and context directly in render                   |
| `ref` as prop            | Pass refs as regular props, no `forwardRef` needed             |
| React Compiler           | Auto-memoization, no manual `useMemo`/`useCallback` needed    |
| Server Components        | Default in frameworks like Next.js, zero client JS             |
| Actions                  | `useActionState`, `useFormStatus` for form handling            |
| `useOptimistic`          | Optimistic UI updates                                          |

### use() Hook

```typescript
// Read a promise (suspends until resolved)
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);
  return <h1>{user.name}</h1>;
}

// Read context (replaces useContext)
function ThemedButton() {
  const theme = use(ThemeContext);
  return <button style={{ color: theme.primary }}>Click</button>;
}
```

### React Compiler

When using React Compiler (babel plugin), manual memoization is handled automatically. Remove unnecessary `useMemo`, `useCallback`, and `memo` wrappers -- the compiler optimizes them for you.

### Server State with TanStack Query

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorDisplay error={error} />;
  return <ul>{data?.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}
```

### Tailwind CSS (Default Styling)

```typescript
// Tailwind CSS is the default styling approach
// Use cn() utility for conditional classes
import { cn } from '@/lib/utils';

function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        className,
      )}
      {...props}
    />
  );
}
```

### Modern Tooling

| Tool               | Purpose                      | Replaces            |
| ------------------- | ---------------------------- | ------------------- |
| **Vite 6**          | Bundler + dev server         | Webpack, CRA        |
| **Vitest**          | Test runner                  | Jest                 |
| **Biome**           | Linter + formatter           | ESLint + Prettier    |
| **TanStack Query**  | Server state management      | SWR, manual fetch    |
| **TanStack Router** | Type-safe routing            | React Router         |
| **Tailwind CSS**    | Utility-first styling        | CSS Modules, styled  |

---

_React + TypeScript = type-safe, maintainable components._
