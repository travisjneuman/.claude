# Timer Sidebar + Calendar + Modal Fixes

## Summary
Fix 4 issues with the Schedule page and sidebar navigation:

1. **Add Timer to Sidebar dropdown** - Timer tab missing from Schedule children
2. **Compact Calendar cells** - Calendar tab cells are 140px tall with detailed entries, should be 80px with compact summary like Monthly view
3. **Unify calendar styling** - Both calendars should look identical
4. **Keep DayDetailModal** - Click-to-expand still works for details

## Changes

### 1. Sidebar.tsx (Line 48)
Add Timer as first child under Schedule:
```tsx
children: [
  { icon: '⏱️', label: 'Timer', path: '/schedule?tab=timer' },
  { icon: '📋', label: 'Entries', path: '/schedule?tab=entries' },
  { icon: '📊', label: 'Summary', path: '/schedule?tab=summary' },
  { icon: '📆', label: 'Calendar', path: '/schedule?tab=calendar' },
  { icon: '📁', label: 'Projects', path: '/schedule?tab=projects' },
],
```

### 2. TimeEntryCalendar.tsx
Change day cells from detailed to compact (matching MonthlyTimeReport):

**Before:**
- min-h-[140px]
- Shows 2 full events with titles, times
- Shows 2 full time entries with descriptions, project colors, times
- "+X more" text

**After:**
- min-h-[80px]
- Day number
- Clock icon + total time tracked
- "X entries" count
- "X events" count (if any)
- "X tasks" count (if any)
- Click opens DayDetailModal for full details

## Files Modified
- src/components/Sidebar.tsx
- src/components/TimeEntryCalendar.tsx
