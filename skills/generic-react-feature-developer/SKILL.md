---
name: generic-react-feature-developer
description: Guide feature development for React applications with architecture focus. Covers Zustand/Redux patterns, IndexedDB usage, component systems, lazy loading strategies, and seamless integration. Use when adding new features, refactoring existing code, or planning major changes.
---

# React Feature Developer

Guide feature development with React architecture patterns and best practices.

## Architecture Patterns

### State Management (Zustand)

**Store Best Practices:**
- Use persist middleware for localStorage backup
- Migrate large data to IndexedDB (>1MB)
- Keep stores focused (single responsibility)
- Actions return void (update state directly)

**Pattern:**
```typescript
// stores/useFeatureStore.ts
interface FeatureState {
  items: Item[];
  addItem: (item: Item) => void;
}

const useFeatureStore = create<FeatureState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    }),
    { name: 'feature-storage' }
  )
);
```

### Data Persistence (IndexedDB)

**When to use:**
- Large data (images, file attachments)
- > 5MB total (localStorage limit)
- Binary data

**Pattern:**
```typescript
// Use service wrapper, not direct API
await indexedDBService.setItem('key', largeData);
const data = await indexedDBService.getItem('key');
```

### Lazy Loading Strategy

**Lazy load:**
- Pages (Settings, Profile)
- Heavy components (>20KB)
- Rich text editors
- Charts/visualizations

**Pattern:**
```typescript
const Settings = lazy(() => import('./pages/Settings'));
const Chart = lazy(() => import('./components/Chart'));
```

## Feature Integration Checklist

### Before Starting
- [ ] Read existing code in affected areas
- [ ] Check for similar patterns to reuse
- [ ] Plan data flow: UI → Store → Persistence
- [ ] Estimate bundle size impact

### During Development
- [ ] Follow design system
- [ ] Add TypeScript types (strict mode)
- [ ] Implement keyboard navigation
- [ ] Add ARIA labels
- [ ] Test dark mode

### Before Completion
- [ ] Write tests
- [ ] Check bundle size: `npm run build`
- [ ] Verify lazy loading works
- [ ] Review with code reviewer skill

## Common Patterns

### Adding New Store
1. Create `stores/useFeatureStore.ts`
2. Use Zustand with persist
3. Define TypeScript interface
4. Export actions and selectors

### Adding Component
1. Create in appropriate directory
2. Use existing design system patterns
3. Lazy load if heavy
4. Test responsiveness

### IndexedDB Integration
1. Use service wrapper (not direct API)
2. Check quota before large writes
3. Handle QuotaExceededError
4. Provide user feedback

## Performance Guidelines

- Bundle size < 100KB gzipped initial
- Lazy load non-essential code
- GPU-accelerated animations only
- Debounce user input
- Memoize expensive calculations

## See Also

- [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md) - Quality requirements
- [Design Patterns](./../_shared/DESIGN_PATTERNS.md) - UI patterns
- Project `CLAUDE.md` - Workflow rules
