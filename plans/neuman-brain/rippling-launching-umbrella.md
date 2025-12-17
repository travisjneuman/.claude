# Notes Folder & Note Management - Full Feature Plan

## Overview

Add comprehensive folder and note management capabilities to the Notes page:
1. **Create folders** - UI to add folders at any level
2. **Drag-and-drop** - Reorder and move folders/notes
3. **Unlimited nesting** - Subfolders/subnotes at any depth (unlike OneNote's 1-level limit)
4. **Move notes** - Drag notes between folders or use context menu
5. **Bug fixes** - TabbedSidebarLayout not showing notes, hover action overlap
6. **UX polish** - Note counts on folders, responsive Three-Column layout

**Key insight**: The backend (useFoldersStore) already supports unlimited nesting via `parentId` relationships, cycle prevention, and depth validation. We just need the **UI**.

---

## Priority Bug Fixes (Phase 0)

### Bug 1: TabbedSidebarLayout "Browse by Folder" Not Showing Notes
**Problem**: When user selects "Folders" tab, only folder tree displays - no notes appear when browsing.
**Root Cause**: `filteredNotes` is calculated but only rendered in "All Notes" tab, not in Folders/Tags tabs.
**Location**: `src/components/notes/TabbedSidebarLayout.tsx` lines 463-498

**Fix**: Add notes list section below folder tree in Folders tab:
```tsx
{activeTab === 'folders' && (
  <div className="space-y-0.5 px-2">
    {/* All Notes option */}
    <div>...</div>

    {/* Folder tree */}
    {rootFolders.map((folder) => renderFolderItem(folder, 0))}

    {/* ADD: Notes list for selected folder */}
    <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark">
      {filteredNotes.map((note) => (
        <NoteListItem key={note.id} note={note} ... />
      ))}
    </div>
  </div>
)}
```

### Bug 2: Hover Actions Overlap Folder Names
**Problem**: Edit/delete icons positioned with `absolute right-2` overlap folder text.
**Location**: `src/components/notes/FolderTreeNode.tsx`

**Fix**: Use flex layout with LEFT-side actions (matching NoteListItem pattern):
```tsx
// ❌ BEFORE: absolute right positioning
<div className="absolute right-2 opacity-0 group-hover:opacity-100">
  <button>Edit</button>
  <button>Trash</button>
</div>

// ✅ AFTER: flex layout with left-side reserved space
<div className="flex items-center gap-2">
  {/* Left-side hover actions (reserve space with shrink-0) */}
  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 shrink-0 w-10">
    <button><Edit className="w-3.5 h-3.5" /></button>
    <button><Trash className="w-3.5 h-3.5" /></button>
  </div>

  {/* Folder icon + name (flex-1 to take remaining space) */}
  <button className="flex-1 min-w-0 flex items-center gap-2">
    <FolderIcon />
    <span className="truncate">{folder.name}</span>
    <span className="text-xs text-tertiary">{noteCount}</span>
  </button>
</div>
```

### Enhancement 1: Note Counts on Folders
**Problem**: "All Notes" and individual folders in File Tree don't show note counts.

**Files to modify**:
- `src/components/notes/TabbedSidebarLayout.tsx` - Add count to "All Notes" item
- `src/components/notes/FileTreeLayout.tsx` - Add count to folder items
- `src/components/notes/FolderTreeNode.tsx` - Add count prop and display

**Implementation**:
```tsx
// Calculate count
const allNotesCount = Object.keys(notes).length;
const folderNoteCount = useMemo(() =>
  Object.values(notes).filter(n => n.folderId === folder.id).length,
  [notes, folder.id]
);

// Display count
<span className="text-xs text-text-light-tertiary dark:text-text-dark-tertiary ml-auto">
  {count}
</span>
```

### Enhancement 2: Responsive Three-Column Layout
**Problem**: Columns too narrow on 4K (32"), will break on 13" laptops.

**Strategy**: Auto-collapse at breakpoints with smooth transitions.

| Breakpoint | Behavior |
|------------|----------|
| < 768px | Stack navigation (mobile drawer) |
| 768-1024px | Folders as drawer, Notes list + Editor visible |
| 1024-1280px | All 3 columns, folders auto-collapse on narrow |
| > 1280px | All 3 columns at full configured widths |

**Files to modify**:
- `src/components/notes/ThreeColumnLayout.tsx`

**Implementation**:
1. Add `useMediaQuery` hook or CSS breakpoints
2. Auto-collapse folders column when < 1024px (show expand button)
3. Auto-collapse both sidebars when < 768px (full-width editor with drawer access)
4. Increase default widths for larger screens:
   - folderPaneWidth: 220 → 260px default
   - notesPaneWidth: 300 → 360px default
5. Add `min-w` constraints based on viewport

---

## Current State

### What Already Works
| Feature | Status | Location |
|---------|--------|----------|
| Folder hierarchy (parentId) | ✅ | useFoldersStore |
| createFolder(parentId) | ✅ | useFoldersStore |
| moveFolder(id, newParentId) | ✅ | useFoldersStore |
| canMoveFolder (cycle prevention) | ✅ | useFoldersStore |
| isDescendantOf (validation) | ✅ | useFoldersStore |
| Depth validation | ✅ | useFoldersStore (will remove limit) |
| Note folderId field | ✅ | useNotesStore |
| @dnd-kit installed | ✅ | package.json |

### What's Missing (UI Only)
| Feature | Status | Notes |
|---------|--------|-------|
| "New Folder" button | ❌ | Need in all 3 layouts |
| Create subfolder UI | ❌ | Context menu or hover action |
| Drag folders to reorder | ❌ | Need DndContext integration |
| Drag folders into folders | ❌ | Drop zone detection |
| Drag notes between folders | ❌ | Note movement UI |
| Context menu (right-click) | ❌ | Move, rename, delete, new subfolder |
| Note sortOrder | ❌ | Currently sorted by updatedAt |

---

## Implementation Plan

### Phase 1: Create Folder UI

**Goal**: Add visible UI for creating folders in all 3 layouts.

**Files to Modify**:
- `src/components/notes/FolderSidebar.tsx` - Add "New Folder" button at top
- `src/components/notes/FolderTreeNode.tsx` - Add "New Subfolder" hover action
- `src/components/notes/FileTreeLayout.tsx` - Add "New Folder" to header + hover actions
- `src/components/notes/TabbedSidebarLayout.tsx` - Add "New Folder" to header + hover actions

**UI Design**:
```
┌─────────────────────────────┐
│ FOLDERS          [+] [⚙]   │  ← [+] creates root folder
├─────────────────────────────┤
│ 📁 Work            [+][✏][🗑] │  ← Hover shows: new subfolder, rename, delete
│   📁 Projects                │
│     📁 Q4 Planning          │  ← Unlimited depth
│   📁 Meetings               │
│ 📁 Personal                  │
└─────────────────────────────┘
```

**Actions**:
1. Add `FolderPlus` icon button in folder list header → calls `createFolder({ parentId: null })`
2. Add hover action on each folder row → "New Subfolder" → calls `createFolder({ parentId: folderId })`
3. Show inline rename input after creation (auto-focus)

---

### Phase 2: Drag-and-Drop Folders

**Goal**: Drag folders to reorder within same parent, or drop into another folder.

**Files to Modify**:
- `src/components/notes/FolderTreeNode.tsx` - Add useSortable hook, drag handle
- `src/components/notes/FolderSidebar.tsx` - Wrap in DndContext, handle onDragEnd
- `src/components/notes/FileTreeLayout.tsx` - Same DnD integration
- `src/components/notes/TabbedSidebarLayout.tsx` - Same DnD integration
- `src/stores/useFoldersStore.ts` - Add `updateFolderOrder()` if custom ordering needed

**Key Patterns (from Sidebar.tsx)**:

1. **Sensors Configuration**:
```typescript
const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: { distance: 5 }, // Prevent accidental drags
  })
);
```

2. **Click-Disable Pattern** (critical for preventing folder selection during drag):
```typescript
const [isDisablingClicks, setIsDisablingClicks] = useState(false);
const disableTimeoutRef = useRef<NodeJS.Timeout | null>(null);

const handleDragStart = () => {
  if (disableTimeoutRef.current) clearTimeout(disableTimeoutRef.current);
  setIsDisablingClicks(true);
};

const handleDragEnd = (event: DragEndEvent) => {
  // ... handle reorder/move ...
  disableTimeoutRef.current = setTimeout(() => {
    setIsDisablingClicks(false);
  }, 150);
};
```

3. **Drag Handle** (on folder icon, not entire row):
```typescript
<span {...listeners} className="cursor-grab active:cursor-grabbing">
  <FolderIcon />
</span>
```

4. **Drop Zone Detection** (folder becomes drop target):
- Track hover state during drag
- If hovering over folder for 500ms, expand it
- Highlight drop zone with accent color

**Drag Behaviors**:
| Action | Result |
|--------|--------|
| Drag folder, drop between siblings | Reorder within same parent |
| Drag folder, drop ON another folder | Move into that folder (as child) |
| Drag folder to root area | Move to root level (parentId: null) |

---

### Phase 3: Drag-and-Drop Notes

**Goal**: Drag notes between folders or to root level.

**Files to Modify**:
- `src/components/notes/NoteListItem.tsx` - Add draggable behavior
- `src/components/notes/NotesList.tsx` - Add DndContext for note ordering
- `src/components/notes/FileTreeLayout.tsx` - Notes in tree need draggable
- `src/stores/useNotesStore.ts` - Add `moveNote(noteId, folderId)` action

**UI Design**:
- Notes can be dragged by their icon/handle
- Drop zones: folders (to move into), "root notes" area, between notes (reorder)
- Visual feedback: folder highlights when valid drop target

**Note Movement**:
```typescript
// useNotesStore
moveNote: (noteId: string, targetFolderId: string | null) => {
  set((state) => ({
    notes: {
      ...state.notes,
      [noteId]: {
        ...state.notes[noteId],
        folderId: targetFolderId,
        updatedAt: new Date(),
      },
    },
  }));
};
```

---

### Phase 4: Context Menu

**Goal**: Right-click context menu for folders and notes.

**Files to Create**:
- `src/components/notes/FolderContextMenu.tsx`
- `src/components/notes/NoteContextMenu.tsx`

**Folder Context Menu Options**:
| Action | Handler |
|--------|---------|
| New Subfolder | `createFolder({ parentId: folderId })` |
| Rename | Toggle inline edit mode |
| Move to... | Open folder picker modal |
| Delete | Confirm dialog → `deleteFolder(id)` |

**Note Context Menu Options**:
| Action | Handler |
|--------|---------|
| Move to Folder... | Open folder picker modal |
| Duplicate | `duplicateNote(id)` |
| Export | Open export modal |
| Delete | Confirm dialog → `deleteNote(id)` |

**Implementation Pattern** (from ProjectContextDropdown):
```typescript
const [contextMenu, setContextMenu] = useState<{x: number, y: number, item: Folder | null} | null>(null);

const handleContextMenu = (e: React.MouseEvent, folder: Folder) => {
  e.preventDefault();
  setContextMenu({ x: e.clientX, y: e.clientY, item: folder });
};

// Click outside to close
useEffect(() => {
  const handleClick = () => setContextMenu(null);
  if (contextMenu) document.addEventListener('click', handleClick);
  return () => document.removeEventListener('click', handleClick);
}, [contextMenu]);
```

---

### Phase 5: Folder Picker Modal

**Goal**: Modal to select destination folder when using "Move to..." action.

**Files to Create**:
- `src/components/notes/FolderPickerModal.tsx`

**UI Design**:
```
┌────────────────────────────────┐
│ Move to Folder          [X]   │
├────────────────────────────────┤
│ 🔍 Search folders...          │
├────────────────────────────────┤
│ 📁 (Root - No folder)         │
│ 📁 Work                       │
│   📁 Projects                 │
│   📁 Meetings                 │
│ 📁 Personal                   │
└────────────────────────────────┤
│              [Cancel] [Move]  │
└────────────────────────────────┘
```

**Features**:
- Search/filter folders
- Show full hierarchy
- Highlight current location
- Disable invalid targets (self, descendants for folders)

---

## Files Summary

### Files to Create
| File | Purpose |
|------|---------|
| `src/components/notes/FolderContextMenu.tsx` | Right-click menu for folders |
| `src/components/notes/NoteContextMenu.tsx` | Right-click menu for notes |
| `src/components/notes/FolderPickerModal.tsx` | "Move to folder" destination picker |

### Files to Modify
| File | Changes |
|------|---------|
| `src/components/notes/FolderSidebar.tsx` | DndContext, "New Folder" button, context menu |
| `src/components/notes/FolderTreeNode.tsx` | useSortable, drag handle, hover actions |
| `src/components/notes/FileTreeLayout.tsx` | DnD integration, "New Folder" in header |
| `src/components/notes/TabbedSidebarLayout.tsx` | DnD integration, "New Folder" in header |
| `src/components/notes/NoteListItem.tsx` | Draggable behavior |
| `src/components/notes/NotesList.tsx` | DndContext for notes |
| `src/stores/useNotesStore.ts` | Add `moveNote()` action |
| `src/stores/useFoldersStore.ts` | Add `sortOrder` field if custom ordering needed |

---

## Implementation Order

### Batch 0: Bug Fixes & Polish (PRIORITY)
1. **Fix TabbedSidebarLayout** - Add notes list to Folders tab
2. **Fix hover action overlap** - Move actions to left side in FolderTreeNode
3. **Add note counts** - "All Notes" count, folder counts in all layouts
4. **Responsive Three-Column** - Add breakpoint handling, increase default widths
5. **Remove MAX_DEPTH limit** - Enable unlimited nesting in useFoldersStore

### Batch 1: Create Folder UI (Foundation)
1. Add "New Folder" button to FolderSidebar header
2. Add "New Subfolder" hover action to FolderTreeNode (on left side with other actions)
3. Add inline rename mode after folder creation
4. Apply same UI to FileTreeLayout and TabbedSidebarLayout

### Batch 2: Folder Drag-and-Drop
1. Add DndContext to FolderSidebar with sensors
2. Implement useSortable in FolderTreeNode
3. Add click-disable pattern
4. Handle onDragEnd for reordering and reparenting
5. Add drop zone highlighting

### Batch 3: Note Movement
1. Add `moveNote()` to useNotesStore
2. Add draggable behavior to NoteListItem
3. Enable dropping notes on folders
4. Handle note reordering within folder

### Batch 4: Context Menus
1. Create FolderContextMenu component
2. Create NoteContextMenu component
3. Wire up right-click handlers in all 3 layouts
4. Create FolderPickerModal for "Move to..."

---

## Success Criteria

### Batch 0: Bug Fixes & Polish
- [ ] TabbedSidebarLayout shows notes when browsing by folder
- [ ] Hover actions don't overlap folder/note names (left-side positioning)
- [ ] "All Notes" shows total note count
- [ ] Folders show their note counts in all layouts
- [ ] Three-Column layout adapts to viewport (auto-collapse at breakpoints)
- [ ] Unlimited nesting works (no MAX_DEPTH limit)

### Batch 1-4: Core Features
- [ ] Users can create folders at root level via button
- [ ] Users can create subfolders at any depth via hover action or context menu
- [ ] Folders can be dragged to reorder within same parent
- [ ] Folders can be dragged INTO other folders (unlimited nesting)
- [ ] Notes can be dragged between folders
- [ ] Right-click context menu works on folders and notes (all 3 layouts)
- [ ] "Move to folder" modal picker works
- [ ] All 3 layouts support these features consistently

### Verification
- [ ] Tests pass, type-check passes, build succeeds
- [ ] Manual test: Create 5+ nested folder levels
- [ ] Manual test: Drag folders into/out of each other
- [ ] Manual test: Right-click context menu in each layout
- [ ] Manual test: Three-Column on narrow viewport (< 1024px)

---

## Key Technical Decisions

1. **Hover action position**: LEFT side of folder/note row (not right) to prevent text overlap
2. **Hover action pattern**: Flex layout with `shrink-0 w-10` reserved space, `opacity-0 group-hover:opacity-100`
3. **Drag handle location**: Folder/note icon (not entire row) to prevent conflicts with expand/select
4. **Click-disable pattern**: Required to prevent accidental navigation during drag
5. **Drop zone detection**: Use @dnd-kit's `useDroppable` for folder targets
6. **Folder ordering**: Add optional `sortOrder` field, fallback to alphabetical
7. **Context menu positioning**: Absolute position at cursor coordinates, click-outside to close
8. **Unlimited nesting**: Remove MAX_DEPTH limit from useFoldersStore (user preference)
9. **Responsive breakpoints**: 768px (mobile), 1024px (tablet), 1280px (desktop) for Three-Column
10. **Note counts**: Calculate via `useMemo` filtering notes by folderId

---

## Status: READY FOR IMPLEMENTATION
