# Spreadsheet Editor - Phase 4 Implementation Plan

## Summary
Implement a full-featured spreadsheet editor using HyperFormula (400+ Excel-compatible formulas) with a custom virtualized React grid. This completes Phase 4 of the Docs System plan.

## Implementation Phases

### Phase 4.1: Core Grid (4-5 hours)
- Install HyperFormula package
- Create SpreadsheetEditor wrapper component
- Create SpreadsheetGrid with virtualization (only render visible cells)
- Implement cell selection and editing
- Create formula bar
- Auto-save with debounce

### Phase 4.2: Formatting & Styles (3-4 hours)
- Create formatting toolbar (bold, italic, underline, alignment)
- Implement cell background/text color pickers
- Implement border controls
- Implement number formatting (currency, percentage)
- Store and apply cell styles

### Phase 4.3: Multiple Sheets (2 hours)
- Create sheet tab bar at bottom
- Add/rename/delete sheets
- Sheet reorder via drag
- Sync HyperFormula with multiple sheets

### Phase 4.4: Charts Integration (2-3 hours)
- Create "Insert Chart" dialog
- Support Bar, Line, Pie, Scatter charts (via Recharts)
- Embed charts with live data updates
- Store chart config in sheet data

### Phase 4.5: Import/Export (2 hours)
- Install SheetJS (lazy loaded)
- Export to XLSX and CSV
- Import from XLSX and CSV

## Files to Create
1. `src/components/docs/SpreadsheetEditor.tsx` - Main editor
2. `src/components/docs/SpreadsheetGrid.tsx` - Virtualized grid
3. `src/components/docs/SpreadsheetCell.tsx` - Cell component
4. `src/components/docs/SpreadsheetToolbar.tsx` - Toolbar
5. `src/components/docs/SpreadsheetFormulaBar.tsx` - Formula input
6. `src/components/docs/SpreadsheetSheetTabs.tsx` - Sheet tabs
7. `src/components/docs/SpreadsheetChartDialog.tsx` - Chart creation
8. `src/components/docs/spreadsheetExport.ts` - Export utilities
9. `src/components/docs/spreadsheetUtils.ts` - Cell utilities

## Files to Modify
1. `src/pages/Docs.tsx` - Replace placeholder with SpreadsheetEditor
2. `src/components/docs/index.ts` - Add exports

## Dependencies to Install
- `hyperformula` (~80-120KB, GPLv3)
- `xlsx` (~400KB lazy loaded, Apache 2.0)

## Existing Infrastructure Used
- SpreadsheetDoc/SpreadsheetSheet types already defined
- createEmptySheet() in useDocsStore.ts
- Recharts already bundled for charts
- Project context filtering already implemented

## Estimated Effort: 12-16 hours

## Detailed task file: `tasks/spreadsheet-editor-phase4.md`
