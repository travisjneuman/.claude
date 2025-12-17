# Foundation Polish & Documentation Audit - Implementation Plan

## Summary

Three-part foundational improvement work for Neuman Brain:

### Part 1: Widget UX Polish (30 min)
**Problem:** Widgets show redundant 6-dot drag handle icon on hover. The cursor change to "grab" hand is sufficient.

**Solution:**
- Remove the SVG icon button from `SortableWidget.tsx`
- Make entire widget header draggable (not just the icon)
- Add `cursor-grab` class to header area
- Keep drag functionality fully working

### Part 2: PageHeader Centralization (1 hour)
**Problem:** Each page manually passes title/subtitle to PageHeader - violates DRY principle.

**Solution:**
- Create `src/config/pageMetadata.ts` - central registry of page titles/subtitles
- Modify `PageHeader.tsx` to auto-detect page from route if props not provided
- Update all 7 pages to use auto-detect mode
- Future pages automatically inherit correct headers

**Registry Example:**
```typescript
export const PAGE_METADATA = {
  '/': { title: 'Dashboard', subtitle: 'Your personal management overview' },
  '/tasks': { title: 'Task Management', subtitle: '...' },
  // ... etc
};
```

### Part 3: Documentation Audit (2-3 hours)
**Problem:** 56+ docs files may be stale, unclear distinction between `/tasks/` and `/docs/plans/`.

**Solution:**
1. Audit all docs for accuracy against current codebase
2. Fix incorrect dates (some show Jan 2026, should be Nov 2025)
3. Clarify folder purposes:
   - `/tasks/` = Active execution work (tactical)
   - `/docs/plans/` = Strategic proposals before implementation
4. Archive completed tasks
5. Create any missing docs
6. Update CLAUDE.md if structure changes

## Files to Modify

### Part 1:
- `src/components/SortableWidget.tsx` - Remove icon, apply drag to header

### Part 2:
- NEW: `src/config/pageMetadata.ts` - Page registry
- `src/components/PageHeader.tsx` - Add auto-detect mode
- All 7 page files - Use auto-detect

### Part 3:
- Multiple docs files across 16 subdirectories

## Estimated Time: 4-6 hours total

## Task File: `tasks/foundation-polish-and-docs-audit.md`
