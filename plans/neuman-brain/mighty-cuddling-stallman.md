# Codebase Audit Phase 2: Path to 10/10 Health

**Goal:** Split large files, optimize bundle, add security headers
**Current Health:** 9/10 → **Target:** 10/10

---

## Phase 2A: Settings.tsx Split (828 → ~400 lines)

### Current State
- **File:** `src/pages/Settings.tsx` (828 lines)
- **Already extracted:** 14 components in `src/widgets/Settings/`
- **Remaining inline:** ~400 lines across 5 sections

### New Components to Extract

| Component | Lines | Location | State Pattern |
|-----------|-------|----------|---------------|
| `DashboardSettingsSection` | ~35 | 438-465 | Props from parent |
| `CalendarImportExportSection` | ~50 | 500-533 | Props + handlers |
| `CalendarNotificationsSection` | ~50 | 536-577 | Props + handlers |
| `AITerminalSettingsSection` | ~60 | 662-718 | Read-only display |
| `StorageInfoSection` | ~70 | 745-809 | Props + collapse state |

### Execution Order
1. Extract `AITerminalSettingsSection` (read-only, zero risk)
2. Extract `StorageInfoSection` (self-contained collapse state)
3. Extract `DashboardSettingsSection` (modal state moves with it)
4. Extract `CalendarNotificationsSection` (parent handlers via props)
5. Extract `CalendarImportExportSection` (parent handlers via props)
6. Update Settings.tsx to import and compose components
7. Verify all settings tabs still work

### Files to Modify
- `src/pages/Settings.tsx` (reduce to ~400 lines)
- `src/widgets/Settings/AITerminalSettingsSection.tsx` (new)
- `src/widgets/Settings/StorageInfoSection.tsx` (new)
- `src/widgets/Settings/DashboardSettingsSection.tsx` (new)
- `src/widgets/Settings/CalendarNotificationsSection.tsx` (new)
- `src/widgets/Settings/CalendarImportExportSection.tsx` (new)

---

## Phase 2B: CardDetailPanel.tsx Split (1,750 → ~400 lines)

### Current State
- **File:** `src/widgets/Kanban/CardDetailPanel.tsx` (1,750 lines)
- **25 useState hooks**, 4 stores connected
- **6 tabs** with independent state

### Strategy: Create `useTaskEditor` Hook + Extract Tab Components

#### Step 1: Create `useTaskEditor` Hook
Encapsulates all task editing state and handlers:
```
src/widgets/Kanban/hooks/useTaskEditor.ts (~250 lines)
├── 15 task metadata state variables
├── 8 UI control state variables
├── 4 subtask form state variables
├── 12 handler functions
└── 4 useEffect subscriptions
```

#### Step 2: Extract Tab Components
| Component | Lines | State | Store |
|-----------|-------|-------|-------|
| `SubtasksTabContent` | 184 | Form state (4 vars) | Kanban |
| `ChecklistTabContent` | 86 | `newChecklistItem` | Kanban |
| `CommentsTabContent` | 47 | `newCommentText` | Kanban |
| `ActivityTabContent` | 33 | None (read-only) | None |
| `TimeTrackingTabContent` | 130 | None (from store) | TimeTracking |
| `AttachmentsTabContent` | 66 | `previewAttachment` | Kanban |

#### Step 3: Extract Metadata Sections (Left Panel)
| Component | Lines | Complexity |
|-----------|-------|------------|
| `TaskDateSection` | 124 | High (inline editing, NL input) |
| `TaskDependenciesSection` | 116 | High (dependency picker, overdue) |
| `TaskRecurrenceSection` | 98 | Medium (picker modal) |
| `TaskProgressSection` | 57 | Low |
| `TaskTagsSection` | 43 | Low |

### Execution Order
1. Create `useTaskEditor` hook (consolidate state + handlers)
2. Extract read-only tabs: `ActivityTabContent`
3. Extract simple tabs: `ChecklistTabContent`, `CommentsTabContent`
4. Extract complex tabs: `SubtasksTabContent`, `TimeTrackingTabContent`, `AttachmentsTabContent`
5. Extract metadata sections: `TaskProgressSection`, `TaskTagsSection`
6. Extract complex sections: `TaskDateSection`, `TaskDependenciesSection`, `TaskRecurrenceSection`
7. Update CardDetailPanel to use hook and compose components
8. Verify all Kanban functionality works

### Files to Modify/Create
- `src/widgets/Kanban/CardDetailPanel.tsx` (reduce to ~400 lines)
- `src/widgets/Kanban/hooks/useTaskEditor.ts` (new)
- `src/widgets/Kanban/tabs/SubtasksTabContent.tsx` (new)
- `src/widgets/Kanban/tabs/ChecklistTabContent.tsx` (new)
- `src/widgets/Kanban/tabs/CommentsTabContent.tsx` (new)
- `src/widgets/Kanban/tabs/ActivityTabContent.tsx` (new)
- `src/widgets/Kanban/tabs/TimeTrackingTabContent.tsx` (new)
- `src/widgets/Kanban/tabs/AttachmentsTabContent.tsx` (new)
- `src/widgets/Kanban/sections/TaskDateSection.tsx` (new)
- `src/widgets/Kanban/sections/TaskDependenciesSection.tsx` (new)
- `src/widgets/Kanban/sections/TaskRecurrenceSection.tsx` (new)
- `src/widgets/Kanban/sections/TaskProgressSection.tsx` (new)
- `src/widgets/Kanban/sections/TaskTagsSection.tsx` (new)

---

## Phase 2C: Bundle Optimization & Security

### Bundle Analysis
1. Run `npx vite-bundle-visualizer`
2. Review entry chunk (currently ~160KB, target <120KB)
3. Identify lazy-loading opportunities

### Store Subscription Cleanup
Fix remaining full-store destructures for micro-optimization:
- `src/pages/Settings.tsx:114` - `useCalendarStore()`
- `src/pages/Settings.tsx:121` - `useTerminalStore()`
- `src/pages/LinkLibrary.tsx:55` - `useLinkLibraryStore()`

### CSP Headers
Add Content-Security-Policy to Cloudflare or index.html:
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https:;
connect-src 'self' https://api.openai.com https://api.anthropic.com;
```

---

## Verification Checklist

### After Each Phase
- [ ] `npm run type-check` passes
- [ ] `npm run test` passes
- [ ] `npm run build` succeeds

### Phase 2A Verification
- [ ] All Settings tabs render correctly
- [ ] Calendar import/export works
- [ ] Notification permissions work
- [ ] Storage info displays correctly
- [ ] AI Terminal info displays

### Phase 2B Verification
- [ ] CardDetailPanel opens/closes
- [ ] All 6 tabs work correctly
- [ ] Task metadata saves properly
- [ ] Subtasks CRUD works
- [ ] Dependencies add/remove works
- [ ] Time tracking timer works
- [ ] Attachments upload/delete works

### Phase 2C Verification
- [ ] Bundle size improved or maintained
- [ ] No console errors on load
- [ ] CSP doesn't break functionality

---

## Success Criteria

| Metric | Before | After |
|--------|--------|-------|
| Settings.tsx | 828 lines | <400 lines |
| CardDetailPanel.tsx | 1,750 lines | <400 lines |
| Entry chunk | ~160KB | <120KB (stretch) |
| Codebase health | 9/10 | 10/10 |

---

## Risk Assessment

| Change | Risk | Mitigation |
|--------|------|------------|
| Settings split | Low | Components already partially extracted |
| CardDetailPanel split | Medium-High | Critical Kanban path; thorough testing |
| useTaskEditor hook | Medium | State management complexity |
| Bundle optimization | Low | Performance only, no functionality |
| CSP headers | Low | Test in dev first |

---

## Execution Summary

**Recommended order:**
1. **Phase 2A first** (lower risk, establishes pattern)
2. **Phase 2B second** (higher complexity, more files)
3. **Phase 2C last** (optimization, can be done incrementally)

**Estimated sessions:** 2-3 focused sessions
