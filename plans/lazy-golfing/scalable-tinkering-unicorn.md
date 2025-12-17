# Next.js Rounds Page Implementation Plan

**Feature:** Full rounds management in Next.js app
**Unblocks:** 3 Quick Wins (Copy round, Bulk delete, Last modified timestamp)

---

## Overview

Build a complete rounds management page that allows users to:
- View all their rounds in a paginated list
- Create new rounds
- Edit existing rounds
- Delete rounds (with confirmation)
- Copy rounds (Quick Win)
- Bulk delete via multi-select (Quick Win)
- See last modified timestamp (Quick Win)

---

## Architecture Decisions

### 1. Page Structure
```
/rounds           → List all rounds (main page)
/rounds/new       → Create new round (dialog or page?)
/rounds/[id]      → Edit existing round (dialog or page?)
```

**Recommendation:** Use **dialogs** for create/edit rather than separate pages.
- Keeps user in context
- Simpler routing
- Consistent with modern SaaS patterns
- Matches existing ConfirmDialog pattern

### 2. State Management
- Local state with `useState` (matching existing patterns)
- No global state library needed
- Optimistic updates for better UX

### 3. Component Breakdown
```
/rounds/page.tsx              → Main page (list + dialogs)
  ├── RoundsList              → Grid/list of round cards
  ├── RoundCard               → Individual round display
  ├── RoundFormDialog         → Create/edit dialog (shared)
  ├── RoundFilters            → Search, sort, filter controls
  └── BulkActionsBar          → Multi-select actions (Quick Win)
```

---

## Implementation Steps

### Phase 1: Foundation (Required)
1. **Add shadcn components** - Input, Card, Label, Checkbox
2. **Create Round type** - `types/round.ts`
3. **Create rounds list page** - Basic list with loading/error states
4. **Add RoundCard component** - Display individual rounds

### Phase 2: CRUD Operations
5. **Create RoundFormDialog** - Shared create/edit form
6. **Implement create round** - POST to API
7. **Implement edit round** - PUT to API
8. **Implement delete round** - DELETE with ConfirmDialog

### Phase 3: Quick Wins
9. **Add copy round** - Pre-fill form with existing round data
10. **Add bulk select** - Checkbox selection with bulk actions bar
11. **Add last modified** - Display `updatedAt` timestamp on cards

### Phase 4: Polish
12. **Add filtering/sorting** - Search by course, sort by date/score
13. **Add pagination** - Load more or page navigation
14. **Mobile optimization** - Responsive layout

---

## File Structure

```
lzg.home/src/
├── app/(main)/rounds/
│   └── page.tsx                    # Main rounds page
├── components/rounds/
│   ├── round-card.tsx             # Individual round card
│   ├── round-form-dialog.tsx      # Create/edit dialog
│   ├── round-filters.tsx          # Search/sort controls
│   ├── bulk-actions-bar.tsx       # Multi-select actions
│   └── index.ts                   # Barrel export
├── types/
│   └── round.ts                   # Round type definitions
└── components/ui/
    ├── input.tsx                  # shadcn input (add)
    ├── card.tsx                   # shadcn card (add)
    ├── label.tsx                  # shadcn label (add)
    └── checkbox.tsx               # shadcn checkbox (add)
```

---

## Data Types

```typescript
// types/round.ts
export interface Round {
  id: string;
  date: string;
  courseName: string;
  courseId?: string;
  strokes: number;
  front9?: number;
  back9?: number;
  playingPartners?: string;
  teeTime?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;

  // Performance metrics
  girPct?: number;
  firPct?: number;
  approachPct?: number;
  totalPutts?: number;
  front9Putts?: number;
  back9Putts?: number;

  // Scoring breakdown
  holeInOnes?: number;
  eagles?: number;
  birdies?: number;
  pars?: number;
  bogeys?: number;
  doubleBogeys?: number;
  triplePlusBogeys?: number;

  // Metadata
  createdAt: string;
  updatedAt: string;  // For "Last modified" Quick Win
}

export interface RoundsResponse {
  data: Round[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

---

## API Integration

```typescript
// API calls needed
GET  /v1/rounds?page=1&limit=20&sortBy=date&sortOrder=desc
POST /v1/rounds
PUT  /v1/rounds/:id
DELETE /v1/rounds/:id

// For copy round: No new API needed - just pre-fill form
```

---

## UI/UX Considerations

### Round Card Layout
```
┌─────────────────────────────────────────────┐
│ [☐] Pebble Beach           Last modified: │
│     Dec 15, 2025 • 8:30 AM    2 days ago   │
├─────────────────────────────────────────────┤
│  Score: 85    Front: 42    Back: 43        │
│  GIR: 55%     FIR: 64%     Putts: 32       │
├─────────────────────────────────────────────┤
│ Playing with: John, Jane                    │
│ Notes: Great weather...                     │
├─────────────────────────────────────────────┤
│        [Copy] [Edit] [Delete]               │
└─────────────────────────────────────────────┘
```

### Mobile Responsive
- Cards stack vertically on mobile
- Bulk actions bar fixed at bottom when selecting
- Form inputs stack on small screens

---

## Estimated Effort

| Phase | Tasks | Estimate |
|-------|-------|----------|
| Phase 1 | Foundation | 4 items |
| Phase 2 | CRUD | 4 items |
| Phase 3 | Quick Wins | 3 items |
| Phase 4 | Polish | 3 items |
| **Total** | | **14 items** |

---

## Success Criteria

- [ ] Users can view all their rounds
- [ ] Users can create new rounds
- [ ] Users can edit existing rounds
- [ ] Users can delete rounds (with confirmation)
- [ ] Users can copy rounds to create new ones (Quick Win)
- [ ] Users can bulk delete multiple rounds (Quick Win)
- [ ] Rounds show last modified timestamp (Quick Win)
- [ ] Works on mobile devices
- [ ] Loading states for all async operations
- [ ] Error handling with toast notifications
