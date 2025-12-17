# Dashboard Polish & Features Plan

## Current Status

### ✅ COMPLETED
1. **Weather forecast date bug** - Fixed using `slice(1, 6)` to skip today, uses `useWeatherStore` coords
2. **Background selection** - Fixed z-index stacking with `isolate` class, `z-0`/`z-10` layers
3. **Widget resize buttons** - Removed `WidgetResizeHandle` component entirely
4. **Page layout standardization** - TimeTracking now uses full viewport width
5. **Default widget preset** - Added to PresetManager with Core4+Weather widgets
6. **Weather header enhancement** - Added feelsLike and precipProbability to display
7. **Background smart contrast** - Added luminance detection + content contrast classes
8. **Global settings store** - Created `useSettingsStore.ts` with time format + temperature unit
9. **Temperature unit in weather** - Updated all 3 weather widgets to use global setting
10. **Enhanced Uptime Widget** - Added sparklines, uptime percentages, IndexedDB history
11. **PageHeader component** - Created reusable header with Date & Time clock on right
12. **Quick Add Task Widget Fix** - Root cause analysis + min-h-[160px] on all 4 core widgets

### 🔄 IN PROGRESS
- **Bookmark Sync System** - Next up

---

## ✅ COMPLETED: Quick Add Task Widget Layout Fix

### Root Cause
Dashboard grid uses `auto-rows-min` → rows collapse to minimum content height → breaks flexbox height chain. QuickAddWidget had minimal content (just input + button), so it collapsed while other widgets with more content appeared to work.

### Solution Applied
Added `min-h-[160px]` to all 4 core widgets for consistency:

| File | Change |
|------|--------|
| `TasksQuickAddWidget.tsx` | Wrapper: `flex flex-col h-full min-h-[160px]`, added `mb-4` to input, `mt-auto` to button |
| `TasksSummaryWidget.tsx` | Added `min-h-[160px]` to wrapper |
| `UpcomingEventsWidget.tsx` | Added `min-h-[160px]` to wrapper |
| `RecentNotesWidget.tsx` | Added `min-h-[160px]` to wrapper |

**Result:** All 4 core widgets now have identical height, button positioning, and margins.

---

### 📋 REMAINING TASKS (From User Screenshot Feedback)

---

## Task 1: Complete PageHeader Integration
**Status:** 90% complete - only Settings.tsx remaining

### What's Done
- Created `src/components/PageHeader.tsx` with Date & Time on right side
- Updated: Dashboard.tsx, Tasks.tsx, TimeTracking.tsx, Notes.tsx

### Remaining
- Update Settings.tsx to use PageHeader component

---

## Task 2: Weather Widget Spacing Fix
**Priority:** High (User Feedback)

### Problem
Gap between map and forecast section is too large (2-3x what it should be).

### Solution
Reduce margin/padding between WeatherMap and WeatherForecast sections to match edge margins.

### Files to Modify
- `src/widgets/WeatherMap.tsx` - Adjust internal spacing

---

## Task 3: Weather Forecast Row Spacing Fix
**Priority:** High (User Feedback)

### Problem
Spacing between forecast day rows is too tight.

### Solution
Increase vertical spacing between day rows to match side margin proportions.

### Files to Modify
- `src/widgets/WeatherMap.tsx` - Adjust forecast row gap

---

## Task 4: Widget Button Standardization
**Priority:** High (User Feedback)

### Problem
Widget buttons have inconsistent height, size, padding, and margins.

### Solution
Create consistent button styling:
- Same height across all widgets
- Same padding (horizontal and vertical)
- Same margins around buttons
- Colors can vary by purpose

### Files to Review/Modify
- All widget files with action buttons
- Possibly create shared button component or CSS class

---

## Task 5: Link Library System (formerly "Bookmark Sync")
**Priority:** Current - IN PROGRESS

### Vision
A personal link management system inspired by [gethomepage.dev](https://gethomepage.dev) and the user's [custom homepage](https://home.travisjneuman.com). Users can:
- Import browser bookmarks (Netscape HTML format)
- Use AI to auto-categorize large collections
- Curate and organize links into collections
- Export back to browser with new organization
- Quick-access frequently used links

### Architecture

#### 1. Data Model
```typescript
interface Link {
  id: string;
  url: string;
  title: string;
  description?: string;
  favicon?: string;           // Google Favicon API
  category?: string;          // AI-suggested or manual
  tags: string[];
  isFavorite: boolean;
  isArchived: boolean;
  lastVisited?: Date;
  visitCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface LinkCollection {
  id: string;
  name: string;
  icon?: string;              // Emoji or custom
  color?: string;             // Accent color
  linkIds: string[];          // Ordered list
  isExpanded: boolean;
  sortOrder: number;
}
```

#### 2. Routing Structure
Add nested routing under Dashboard:
- `/` - Dashboard Overview (existing)
- `/links` - Link Library (new sub-page)

#### 2b. Expandable Sidebar Architecture (FOUNDATIONAL)

Create a **reusable** expandable navigation system that can be applied to any top-level page:

```typescript
// Extended NavItem interface (in Sidebar.tsx or types)
interface NavItem {
  icon: string;
  label: string;
  path: string;
  shortcut?: string;
  hasSettings?: boolean;
  // NEW: Expandable support
  children?: NavItem[];        // Sub-pages
  defaultExpanded?: boolean;   // Initial state
}

// Example usage - easily add sub-pages to any section
const fixedNavigation: NavItem[] = [
  {
    icon: '🏠',
    label: 'Dashboard',
    path: '/',
    hasSettings: true,
    defaultExpanded: true,
    children: [
      { icon: '🔗', label: 'Link Library', path: '/links' },
      // Future: { icon: '📊', label: 'Analytics', path: '/analytics' },
    ]
  },
];
```

**New Store:** `src/stores/useNavExpansionStore.ts`
```typescript
interface NavExpansionStore {
  expandedPaths: string[];     // Array of expanded parent paths
  toggleExpanded: (path: string) => void;
  isExpanded: (path: string) => boolean;
}
```

This architecture allows any page to have sub-pages by simply adding `children` to its NavItem.

#### 3. Files to Create/Modify

**New Files:**
| File | Purpose |
|------|---------|
| `src/stores/useNavExpansionStore.ts` | **FOUNDATIONAL** - Track expanded sidebar sections |
| `src/stores/useLinkLibraryStore.ts` | Zustand store with IndexedDB persistence |
| `src/pages/LinkLibrary.tsx` | Full page for link management |
| `src/utils/bookmarkParser.ts` | Parse Netscape HTML format |
| `src/utils/bookmarkExporter.ts` | Export to Netscape HTML format |
| `src/services/linkCategorizer.ts` | AI categorization using provider router |
| `src/components/LinkCard.tsx` | Individual link display component |
| `src/components/LinkImportModal.tsx` | Import wizard modal |
| `src/components/LinkExportModal.tsx` | Export options modal |
| `src/components/CollectionSidebar.tsx` | Collection navigation panel |

**Files to Modify:**
| File | Change |
|------|--------|
| `src/App.tsx` | Add `/links` route (lazy loaded) |
| `src/components/Sidebar.tsx` | **FOUNDATIONAL** - Extend NavItem interface, add expandable rendering, integrate expansion store |

#### 4. Feature Phases

**Phase 0: Foundational Sidebar Architecture** ✅ COMPLETE
- [x] Create `useNavExpansionStore.ts` with localStorage persistence
- [x] Extend `NavItem` interface in `Sidebar.tsx` with `children` and `defaultExpanded`
- [x] Add expandable rendering logic to sidebar (chevron icon, indented children)
- [x] Update Dashboard nav item to use new expandable structure

**Phase 1: Core Infrastructure** ✅ COMPLETE
- [x] Create `useLinkLibraryStore.ts` with IndexedDB persistence
- [x] Create `bookmarkParser.ts` for Netscape HTML import
- [x] Create basic `LinkLibrary.tsx` page with PageHeader
- [x] Add `/links` route in App.tsx (lazy loaded)
- [x] Add Link Library as child of Dashboard in sidebar

**Phase 2: Link Management UI** ✅ COMPLETE
- [x] Create `LinkCard.tsx` component (inline in LinkLibrary.tsx)
- [x] Implement grid/list view toggle
- [x] Add search and filter functionality
- [x] Import functionality with drag-drop (inline, no modal needed)
- [x] Implement bulk selection for curation

**Phase 3: Collections & Organization** ✅ COMPLETE
- [x] Create `CollectionSidebar.tsx` with collapsible design
- [x] Add collection CRUD operations (add, edit, delete)
- [x] Implement favorites and archive filter views
- [ ] Drag-drop reordering (deferred - can add later)

**Phase 4: AI Categorization** 🔄 CURRENT
- [ ] Fix Link Library layout (PageHeader position must match other pages exactly)
- [x] Create `linkCategorizer.ts` using AI provider router ✅
- [x] Add "Auto-categorize" button in Link Library page ✅
- [x] Show AI suggestions with accept/reject UI ✅
- [x] Batch categorization for large imports ✅

### Phase 4 Implementation Details

#### 1. Layout Fix (PageHeader Position Must Match Other Pages)
**Problem:** User reports "if staring only at the date and time you shouldn't even be able to tell you are changing pages" - the PageHeader is in a different position on Link Library than other pages.

**Root Cause:** LinkLibrary.tsx wraps PageHeader in an extra div with padding:
```jsx
// Current (WRONG) - LinkLibrary.tsx lines 269-274:
<div className="flex flex-col h-full">
  <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">  ← EXTRA WRAPPER
    <PageHeader title="Link Library" ... />
  </div>
  ...
</div>

// Correct pattern (Tasks.tsx lines 25-30):
<div className="tasks-page">
  <PageHeader  ← NO WRAPPER, DIRECT CHILD
    title="Task Management"
    ...
  />
  ...
</div>
```

**Solution:** Remove the wrapper div around PageHeader and use a page class:
```jsx
// Fixed (correct):
<div className="link-library-page">
  <PageHeader title="Link Library" subtitle="Manage your bookmarks and collections" />

  {/* Sidebar + Content row */}
  <div className="flex min-h-0" style={{ height: 'calc(100vh - 120px)' }}>
    <CollectionSidebar ... />
    <div className="flex-1 flex flex-col min-h-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      ...content...
    </div>
  </div>
</div>
```

**Key changes:**
1. Remove outer `<div className="flex flex-col h-full">`
2. Remove padding wrapper `<div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">`
3. Use simple `link-library-page` class like other pages
4. PageHeader as direct first child (no wrapper)

#### 2. AI Categorization Service
**File:** `src/services/linkCategorizer.ts`

Uses the existing AI provider router:
```typescript
import { createDefaultRouter } from '@/services/ai/providerRouter';

export interface CategorySuggestion {
  linkId: string;
  category: string;
  tags: string[];
  confidence: number;
}

export async function categorizeLinks(links: Link[]): Promise<CategorySuggestion[]> {
  const router = createDefaultRouter();

  // Check for configured providers
  if (router.getConfiguredProviders().length === 0) {
    throw new Error('No AI provider configured');
  }

  const response = await router.sendMessage({
    prompt: buildCategorizationPrompt(links),
    systemPrompt: CATEGORIZATION_SYSTEM_PROMPT,
    temperature: 0.2, // Low for consistent categorization
    maxTokens: 2000,
  });

  return parseCategorizations(response.content, links);
}
```

#### 3. UI Integration
- Add "Auto-categorize" button to action bar
- Show progress indicator during categorization
- Display results with accept/reject per link
- Batch processing for large imports (10 links at a time)

**Phase 6: Browser Extension (Future)**
> **Note:** Direct browser bookmark sync requires a browser extension (Chrome/Firefox).
> Web apps cannot access browser bookmarks directly due to security restrictions.
> This is a future enhancement requiring a separate `neuman-brain-extension` project.
> For now: Export bookmarks from browser → Import HTML file (current workflow)

**Phase 5: Export & Polish** ✅ COMPLETE
- [x] Create `bookmarkExporter.ts` for Netscape HTML export
- [x] Add Export button to LinkLibrary page
- [x] Google Favicon API (already integrated in LinkCard)
- [ ] Keyboard shortcuts (deferred for future polish)

#### 5. AI Categorization Integration

```typescript
// src/services/linkCategorizer.ts
import { createDefaultRouter } from '@/services/ai/providerRouter';

export async function categorizeLinks(links: Link[]): Promise<CategorySuggestion[]> {
  const router = createDefaultRouter();

  // Check if any provider is configured
  const configured = router.getConfiguredProviders();
  if (configured.length === 0) {
    throw new Error('No AI provider configured. Add one in AI Terminal settings.');
  }

  const response = await router.sendMessage({
    prompt: buildCategorizationPrompt(links),
    systemPrompt: CATEGORIZATION_SYSTEM_PROMPT,
    temperature: 0.3, // Lower for consistent categorization
  });

  return parseCategorizationResponse(response.content);
}
```

#### 6. Import/Export Format

Using **Netscape Bookmark File Format** (standard for all browsers):
```html
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3>Category Name</H3>
    <DL><p>
        <DT><A HREF="https://example.com" ADD_DATE="1234567890">Link Title</A>
    </DL><p>
</DL><p>
```

#### 7. UI Inspiration

**From gethomepage.dev:**
- Grid of cards with favicons
- Category headers with icons
- Clean, minimal aesthetic
- Search bar at top

**From user's homepage (home.travisjneuman.com):**
- Click clock to reveal bookmarks
- Categorized sections
- Quick access design

**Neuman Brain Adaptation:**
- Full page under Dashboard
- Collection sidebar on left (collapsible)
- Grid of link cards in main area
- Import/Export buttons in header
- AI categorize button during import
- Bulk selection mode for curation

---

## Implementation Order

1. ~~Phase 1: Bug Fixes~~ ✅ COMPLETE
2. ~~Phase 2: UI Polish~~ ✅ COMPLETE
3. **Phase 3: Current Session**
   - ✅ Background smart contrast detection
   - ✅ Header clock + global settings + temperature unit
   - ✅ Enhanced uptime widget
   - 🔄 PageHeader integration (Settings.tsx pending)
   - Weather spacing fixes
   - Widget button standardization
   - Bookmark sync system (future)

---

## Files Modified (Session Summary)

| File | Change |
|------|--------|
| `src/widgets/Dashboard/WeatherForecastWidget.tsx` | Fixed slice(1,6), useWeatherStore coords |
| `src/widgets/WeatherMap.tsx` | Fixed slice(1,6), added feelsLike/precipProbability |
| `src/types/index.ts` | Added feelsLike, precipProbability to WeatherData |
| `src/pages/Dashboard.tsx` | Fixed background z-index with isolate class |
| `src/components/SortableWidget.tsx` | Removed WidgetResizeHandle |
| `src/components/WidgetResizeHandle.tsx` | DELETED |
| `src/pages/TimeTracking.tsx` | Removed max-w-7xl |
| `src/components/PresetManager.tsx` | Added Default preset |
| `src/widgets/Dashboard/TasksQuickAddWidget.tsx` | min-h-[160px], mb-4 on input, mt-auto on button |
| `src/widgets/Dashboard/TasksSummaryWidget.tsx` | Added min-h-[160px] to wrapper |
| `src/widgets/Dashboard/UpcomingEventsWidget.tsx` | Added min-h-[160px] to wrapper |
| `src/widgets/Dashboard/RecentNotesWidget.tsx` | Added min-h-[160px] to wrapper |
