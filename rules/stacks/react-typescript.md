# React + TypeScript Stack Guide

**When to use:** Any React application with TypeScript.

---

## Project Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run test         # Run tests
npm run type-check   # TypeScript validation
npm run lint         # Lint code

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
  children?: React.ReactNode;
}

// Functional components only (no class components)
export function MyComponent({ title, onAction, children }: Props) {
  // Hooks at top
  const [state, setState] = useState<string>('');

  // Event handlers
  const handleClick = () => {
    onAction();
  };

  // Render
  return (
    <div>
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

### Error Boundaries

```typescript
class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
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
- `~/.claude/rules/checklists/ui-visual-changes.md` - Visual changes

---

## Anti-Patterns

- [ ] Using `any` type
- [ ] Class components
- [ ] Missing Props interface
- [ ] Inline functions in JSX (performance)
- [ ] Direct DOM manipulation
- [ ] Not memoizing expensive operations

---

_React + TypeScript = type-safe, maintainable components._
