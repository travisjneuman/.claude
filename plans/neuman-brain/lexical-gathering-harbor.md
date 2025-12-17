# Global Project/Context Filter Feature - Design Plan

## Feature Overview

A platform-wide project context switcher that allows users to:
- **Default to "All"** - see everything across the platform
- **Select a specific project** to filter all content to that context
- **Navigate hierarchical projects** (e.g., Work > Client A > Website Redesign)
- **Assign items to multiple projects** when needed
- **Persist selection** across pages and sessions
- **Quick-switch** between contexts without losing work

The filter scopes: Tasks, Notes, Calendar Events, Time Entries, Links, and future entities.

---

## Design Decisions (Confirmed)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Project structure** | Hierarchical (nested) | Maximum flexibility; users can create simple flat lists or deep hierarchies |
| **Multi-project items** | Yes, multiple allowed | Items can belong to several projects for cross-cutting concerns |
| **Auto-assign on create** | Default to current, easily changeable | Pre-fills current project context but simple to modify before saving |
| **Dropdown location** | Page header (centered) | Between page title and date/time; prominent and always visible on desktop |

---

## Current State

### Existing Data Model Support

| Entity | Has `projectId`? | Has Tags? |
|--------|------------------|-----------|
| **Task** | ❌ No | ✅ Flat tags |
| **Note** | ❌ No | ✅ Hierarchical tags |
| **CalendarEvent** | ❌ No | ❌ No |
| **TimeEntry** | ✅ Optional | ✅ Flat tags |
| **Link** | ❌ No | ✅ Flat tags |

### Layout Architecture

- **Layout:** `src/components/Layout.tsx`
- **PageHeader:** `src/components/PageHeader.tsx` - displays title, subtitle, date/time
- **Global State:** Zustand with `persist` middleware

---

## Architecture

### New Store: `useProjectContextStore`

**Location:** `src/stores/useProjectContextStore.ts`

```typescript
interface Project {
  id: string;
  name: string;
  parentId: string | null;  // null = root project (enables hierarchy)
  color: string;            // Accent color for visual identification
  icon?: string;            // Optional emoji/icon
  description?: string;
  archivedAt?: string;      // Soft delete
  createdAt: string;
  updatedAt: string;
}

interface ProjectContextState {
  // Projects CRUD
  projects: Project[];
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateProject: (id: string, updates: Partial<Project>) => void;
  archiveProject: (id: string) => void;
  moveProject: (id: string, newParentId: string | null) => void;

  // Global filter state
  activeProjectIds: string[];      // Empty = "All"; multiple = union filter
  setActiveProjects: (ids: string[]) => void;
  toggleActiveProject: (id: string) => void;

  // Helpers
  getProjectPath: (id: string) => Project[];  // Returns [root, ..., project]
  getChildProjects: (parentId: string | null) => Project[];
  getRootProjects: () => Project[];
}
```

### Schema Changes to Entities

Add to each entity type:
```typescript
projectIds: string[];  // Array for multi-project support; empty = uncategorized
```

**Files to modify:**
- `src/types/index.ts` - Task, CalendarEvent
- `src/types/notes.ts` - Note
- `src/stores/useLinkLibraryStore.ts` - Link interface
- (TimeEntry already has `projectId` - migrate to `projectIds` array)

### Filtering Logic

Each store adds filtered getters that respect the global context:

```typescript
// Example pattern for all stores
getFilteredItems: () => {
  const { activeProjectIds } = useProjectContextStore.getState();
  const { items } = get();

  if (activeProjectIds.length === 0) return items;  // "All" mode

  // Include items that have ANY of the active projects
  return items.filter(item =>
    item.projectIds.some(pid => activeProjectIds.includes(pid))
  );
}
```

### UI Component: `ProjectContextDropdown`

**Location:** `src/components/ProjectContextDropdown.tsx`

**Placement:** Centered in `PageHeader.tsx`, between title and date/time

```
Page Header Layout:
┌────────────────────────────────────────────────────────────┐
│  📋 Tasks          [🌐 All Projects ▼]       Sat Dec 6    │
│  Manage your work                            12:45 PM      │
└────────────────────────────────────────────────────────────┘

Dropdown expanded (hierarchical tree):
┌─────────────────────────────┐
│ ✓ All Projects              │
│ ─────────────────────────── │
│ ▶ 🔵 Work                   │  ← Expandable
│   └ 🔷 Client A             │
│     └ 🔹 Website Redesign   │
│ ▶ 🟣 Personal               │
│ 🟢 Side Project             │  ← No children (leaf)
│ ─────────────────────────── │
│ + New Project...            │
│ ⚙ Manage Projects           │
└─────────────────────────────┘
```

---

## Files to Create/Modify

### New Files
| File | Purpose |
|------|---------|
| `src/stores/useProjectContextStore.ts` | Project CRUD + global filter state |
| `src/components/ProjectContextDropdown.tsx` | Dropdown UI component |
| `src/components/ProjectPicker.tsx` | Reusable picker for entity modals |
| `src/components/ProjectTree.tsx` | Hierarchical tree view component |

### Modified Files
| File | Changes |
|------|---------|
| `src/types/index.ts` | Add `projectIds: string[]` to Task, CalendarEvent |
| `src/types/notes.ts` | Add `projectIds: string[]` to Note |
| `src/stores/useLinkLibraryStore.ts` | Add `projectIds: string[]` to Link |
| `src/stores/useKanbanStore.ts` | Add `getFilteredTasks()`, update CRUD to handle projectIds |
| `src/stores/useNotesStore.ts` | Add `getFilteredNotes()`, update CRUD |
| `src/stores/useCalendarStore.ts` | Add `getFilteredEvents()`, update CRUD |
| `src/stores/useLinkLibraryStore.ts` | Add `getFilteredLinks()`, update CRUD |
| `src/stores/useTimeTrackingStore.ts` | Migrate `projectId` → `projectIds[]` |
| `src/components/PageHeader.tsx` | Add ProjectContextDropdown integration |
| Entity creation modals | Add ProjectPicker with current context as default |

---

## Implementation Phases

### Phase 1: Core Infrastructure (Foundation)
1. Create `Project` type in `src/types/index.ts`
2. Create `useProjectContextStore` with CRUD + filtering state
3. Add `projectIds: string[]` to Task, Note, CalendarEvent, Link types
4. Create reversible migrations for existing data (`projectIds: []`)
5. Update store versions and migrate functions

### Phase 2: UI Components
1. Build `ProjectTree` component (hierarchical view with expand/collapse)
2. Build `ProjectContextDropdown` component (header dropdown)
3. Build `ProjectPicker` component (for entity modals)
4. Integrate dropdown into `PageHeader.tsx`

### Phase 3: Store Integration
1. Add `getFilteredX()` methods to each domain store
2. Update list views/pages to use filtered data
3. Update entity creation flows to default to current project context
4. Update entity edit modals to include ProjectPicker

### Phase 4: Polish & Settings
1. Add Project Management section to Settings page
2. Keyboard shortcuts (Cmd+Shift+P to open switcher)
3. Bulk project assignment for existing items
4. Visual breadcrumb indicator in header showing active project path
5. Mobile-responsive design review

---

## PageHeader Integration Detail

Current PageHeader structure (from `src/components/PageHeader.tsx`):
```
┌──────────────────────────────────────────────────────┐
│ flex items-start justify-between gap-4              │
│                                                      │
│ [Left: flex-1]              [Right: flex-shrink-0]  │
│ - title                     - time + timezone       │
│ - subtitle                  - full date             │
│ - children (actions)                                 │
└──────────────────────────────────────────────────────┘
```

Proposed modification:
```
┌──────────────────────────────────────────────────────┐
│ flex items-start justify-between gap-4              │
│                                                      │
│ [Left]     [Center: flex-shrink-0]     [Right]      │
│ - title    - ProjectContextDropdown    - time       │
│ - subtitle                             - date       │
│ - actions                                            │
└──────────────────────────────────────────────────────┘
```

The dropdown will be a new centered section with:
- Fixed width to prevent layout shift
- Responsive: hidden on mobile initially (or smaller variant)
- Keyboard accessible (Tab, Arrow keys, Enter, Escape)

---

## Data Migration Strategy

When adding `projectIds: string[]` to existing entities:

1. **Default value:** `projectIds: []` (uncategorized)
2. **Migration approach:** Zustand's `migrate` function handles schema upgrades
3. **Reversibility:** Empty array is semantically equivalent to "no project" - no data loss
4. **TimeEntry migration:** Convert `projectId: string | null` → `projectIds: string[]`

Example migration:
```typescript
migrate: (persisted: any, version: number) => {
  if (version < NEXT_VERSION) {
    // Add projectIds to all items that don't have it
    return {
      ...persisted,
      items: persisted.items?.map((item: any) => ({
        ...item,
        projectIds: item.projectIds ?? [],
      })),
    };
  }
  return persisted;
}
```

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Performance with many projects | Lazy render tree nodes; virtualize if >100 projects |
| Filtering complexity | Memoize filtered results; index by projectId |
| Schema migration failures | Reversible migrations; backup/restore already handles versioning |
| UI clutter in header | Compact dropdown; hide on mobile initially; revisit in mobile UX review |

---

## Out of Scope (Future Phases)
- Project templates (pre-configured color/icon sets)
- Project-specific settings (e.g., default Kanban columns per project)
- Team/collaboration features
- Project-level permissions
- Cross-project dependencies
