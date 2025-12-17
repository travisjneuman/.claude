# Plan: Improve Notes Page UX and Layout

## Problem Summary

Three UX issues identified from screenshots:

1. **Note card titles truncate** - User wants to see full titles with vertical hover actions on left
2. **Editor text area too small** - Editor doesn't fill available vertical space (Image #2)
3. **Placeholder text centered** - "Start writing..." should be top-left like real text (Images #3 vs #4)

## Solutions

### 1. Note Card Layout - Vertical Left-Side Actions

**Current:**
- Horizontal actions on right side
- Title truncates with `flex-1 truncate min-w-0`

**New Design:**
```tsx
<div className="flex items-start gap-2">
  {/* Vertical action column on LEFT - appears on hover */}
  <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity w-6 shrink-0">
    <button><Download /></button>
    <button><FileDown /></button>
    <button><Star /></button>
    <button><Pin /></button>
    <button><Trash2 /></button>
  </div>

  {/* Content - NO truncation */}
  <div className="flex-1 min-w-0">
    <div className="flex items-start gap-2">
      <h4 className="flex-1">{note.title}</h4> {/* No truncate! */}
      <div className="flex gap-1">
        {note.isFavorite && <Star />}
        {note.isPinned && <Pin />}
      </div>
    </div>
    <p>{preview}</p>
    <div>{meta}</div>
  </div>
</div>
```

**Benefits:**
- Full title always visible
- Actions appear where mouse enters (left side)
- Cleaner vertical layout

---

### 2. Expand Editor Text Area

**Current Issue (NotesEditor.tsx:830-832):**
```tsx
<div className="flex-1 overflow-y-auto">
  <div className="w-full h-full px-8 py-6 flex justify-center">
    <div className="... max-w-[70ch] ...">
      {/* Editor here */}
    </div>
  </div>
</div>
```

**Problems:**
- Padding (`px-8 py-6`) and centering containers reduce usable space
- `max-w-[70ch]` limits width unnecessarily for notes

**Solution:**
```tsx
<div className="flex-1 overflow-y-auto p-4">
  <div className="h-full">
    <RichTextPlugin ... />
  </div>
</div>
```

**Changes:**
- Remove centering wrapper
- Reduce padding to `p-4`
- Remove `max-w-[70ch]` constraint (or increase to `max-w-full`)
- Ensure editor fills height with `h-full`

---

### 3. Top-Left Placeholder Position

**Current (NotesEditor.tsx:838-840):**
```tsx
<div className="editor-placeholder text-text-light-secondary ...">
  Start writing...
</div>
```

**Problem:** Lexical's default placeholder positioning is likely centered

**Solution:** Add inline style or className to position top-left
```tsx
<div className="editor-placeholder absolute top-0 left-0 text-text-light-secondary ...">
  Start writing...
</div>
```

**Or ensure parent has relative positioning:**
```tsx
<div className="relative h-full">
  <RichTextPlugin
    contentEditable={...}
    placeholder={
      <div className="absolute top-0 left-0 p-6 text-text-light-secondary ...">
        Start writing...
      </div>
    }
  />
</div>
```

---

## Implementation Plan

### Phase 1: Note Card Vertical Actions (15-20 min)
**File:** `src/pages/Notes.tsx:510-620`

1. Move action buttons from right to left side
2. Change from horizontal to vertical flex layout
3. Remove `truncate` class from title
4. Test hover behavior

### Phase 2: Expand Editor (10-15 min)
**File:** `src/widgets/NotesEditor.tsx:830-832`

1. Simplify container structure (remove centering wrapper)
2. Reduce padding
3. Remove or increase `max-w-[70ch]`
4. Ensure editor uses `h-full`
5. Test at different viewport heights

### Phase 3: Fix Placeholder (5-10 min)
**File:** `src/widgets/NotesEditor.tsx:837-840`

1. Add absolute positioning to placeholder
2. Position at `top-0 left-0`
3. Match padding with editor content (p-6)
4. Test placeholder appearance/disappearance

### Phase 4: Testing (10-15 min)
1. Manual test note cards with various title lengths
2. Manual test editor fills vertical space
3. Manual test placeholder position
4. Run type-check and tests

---

## Files to Modify

1. **src/pages/Notes.tsx** (lines 510-620) - Note card layout
2. **src/widgets/NotesEditor.tsx** (lines 830-840) - Editor container & placeholder

---

## Success Criteria

- Note titles display fully without truncation
- Hover actions appear vertically on left side
- Editor text area fills most of vertical space
- Placeholder "Start writing..." at top-left
- No layout shift on hover
- All tests pass

---

## Time Estimate

**40-60 minutes total**
