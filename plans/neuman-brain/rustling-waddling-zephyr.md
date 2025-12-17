# Plan: Fix Modal Content Overflow - Aggressive 20%+ Scale Down

## Problem Statement
**VISUALLY CONFIRMED**: CardDetailPanel modal content extends beyond modal boundaries. The screenshot shows content overflowing past the visible modal area with no scrollbar. Content is too large and spaced out.

## Root Cause (Confirmed via Screenshot)

### CardDetailPanel.tsx - CRITICAL
Looking at the screenshot:
1. **Massive decorative "Blocked By" / "Blocks" sections** with huge emoji boxes taking up 1/3 of the modal
2. **Title input too large** - `text-2xl` font size
3. **Description textarea too tall** - `min-h-[120px]` with 6 rows
4. **`space-y-6` (24px)** gaps between all 13+ sections
5. **Redundant badges** - Priority shown twice (select + "Medium Priority" badge)
6. **No scroll on inner content** - Modal has max-h but content overflows

### TerminalHelpModal.tsx - LOOKS OK
Screenshot shows it fits within bounds. Minor density improvements only.

## Solution: Aggressive 20%+ Content Scaling

### CardDetailPanel.tsx - Complete Overhaul

**1. Spacing Reduction (50% cut):**
```
space-y-6 → space-y-2  (24px → 8px)
gap-6 → gap-3         (24px → 12px)
mb-2 → mb-1           (8px → 4px)
p-3 → p-2             (12px → 8px)
```

**2. Font/Size Reduction (20%+):**
```
Title: text-2xl → text-base (24px → 16px = 33% smaller)
Labels: text-xs stays text-xs (already small)
Description: min-h-[120px] → min-h-[48px], rows={6} → rows={2}
Inputs: p-3 → p-1.5
```

**3. Remove Redundant Elements:**
- DELETE priority badge under select (lines 314-318)
- DELETE custom status badge (lines 376-387)
- DELETE effort badge (lines 345-351)
- REPLACE large emoji empty states with single-line text

**4. Compact Dependency Sections:**
```
BEFORE (lines 533-538):
<div className="text-center py-6 px-4 mb-2 bg-neutral-50...">
  <div className="text-2xl mb-2">🔓</div>
  <div className="text-xs...">No blockers...</div>
</div>

AFTER:
<div className="text-xs text-text-light-secondary py-1">
  🔓 No blockers
</div>
```

**5. Tab Content Scaling:**
- Tab buttons: `pb-2 px-1 text-sm` → `pb-1 px-1 text-xs`
- Tab content padding: `py-4` → `py-2`
- Empty states: Remove 4xl emojis, use inline text

## Files to Modify

| File | Priority | Changes |
|------|----------|---------|
| `src/widgets/Kanban/CardDetailPanel.tsx` | **P0** | Major - spacing, sizes, remove redundant UI |
| `src/components/TerminalHelpModal.tsx` | P2 | Minor - already works |

## Implementation Checklist

### CardDetailPanel.tsx (1238 lines - surgical edits)
- [ ] Line 231: `gap-6` → `gap-3`
- [ ] Line 233: `space-y-6` → `space-y-2`
- [ ] Line 244: Title input `text-2xl` → `text-base`
- [ ] Line 259-260: Description `min-h-[120px]` → `min-h-[48px]`, `rows={6}` → `rows={2}`
- [ ] Lines 314-318: DELETE priority badge div
- [ ] Lines 345-351: DELETE effort badge div
- [ ] Lines 376-387: DELETE custom status badge div
- [ ] Lines 533-538: Compact "No blockers" empty state
- [ ] Lines 606-612: Compact "Not blocking" empty state
- [ ] Line 664: Tab nav `gap-4` → `gap-2`
- [ ] Lines 667-714: Tab buttons `pb-2 text-sm` → `pb-1 text-xs`
- [ ] Line 719: Tab content `py-4` → `py-2`
- [ ] Lines 809-823, 968-970, 1024-1027, 1083-1086, 1213-1218: Compact empty states
- [ ] Run type-check and build
- [ ] Visual verification in browser

## Expected Outcome
- All content visible within modal bounds
- Proper scrolling when content exceeds modal
- Dense, professional appearance like VS Code settings
- No text wrapping unnecessarily
