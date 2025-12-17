/**
 * ThreeColumnLayout Component
 *
 * Apple Notes/Bear-inspired 3-column layout for Notes page.
 * Layout: Folders | Notes List | Editor
 *
 * Features:
 * - Three distinct, resizable columns
 * - Folders column for navigation
 * - Notes list column for browsing
 * - Editor fills remaining space (full height)
 * - Clean visual separation without cramped splits
 * - Collapsible columns for focus modes
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeftClose, PanelLeftOpen, Settings2 } from 'lucide-react';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { useFoldersStore } from '../../stores/useFoldersStore';
import { useNotesStore } from '../../stores/useNotesStore';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import { FolderSidebar } from './FolderSidebar';
import { NotesList } from './NotesList';
import { SidebarResizer } from './SidebarResizer';
import { FolderContextMenu } from './FolderContextMenu';
import { NoteContextMenu } from './NoteContextMenu';
import { FolderPickerModal } from './FolderPickerModal';
import { ConfirmDialog } from '../ConfirmDialog';
import type { Note } from '../../types/notes';

export interface ThreeColumnLayoutProps {
  /** Content to render in the editor pane */
  children: React.ReactNode;
  /** Active tag filters */
  activeTags: string[];
  /** Callback to add a tag filter */
  onAddTag: (tag: string) => void;
  /** Callback to remove a tag filter */
  onRemoveTag: (tag: string) => void;
  /** Callback to clear all tag filters */
  onClearAllTags: () => void;
  /** Callback to open tag manager modal */
  onOpenTagManager: () => void;
  /** Callback to open template library modal */
  onOpenTemplateLibrary: () => void;
  /** Callback to open export modal */
  onOpenExportModal: () => void;
  /** Callback to open layout settings */
  onOpenLayoutSettings?: () => void;
}

// Responsive width constraints per breakpoint
const RESPONSIVE_WIDTHS = {
  mobile: {
    folderMin: 0,
    folderMax: 0,
    folderDefault: 0,
    notesMin: 0,
    notesMax: 0,
    notesDefault: 0,
  },
  tablet: {
    folderMin: 0, // Folders collapsed on tablet
    folderMax: 0,
    folderDefault: 0,
    notesMin: 200,
    notesMax: 300,
    notesDefault: 240,
  },
  desktop: {
    folderMin: 180,
    folderMax: 280,
    folderDefault: 220,
    notesMin: 220,
    notesMax: 350,
    notesDefault: 280,
  },
  largeDesktop: {
    folderMin: 200,
    folderMax: 360,
    folderDefault: 260,
    notesMin: 260,
    notesMax: 450,
    notesDefault: 340,
  },
};

export const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({
  children,
  activeTags,
  onAddTag,
  onRemoveTag,
  onClearAllTags,
  onOpenTagManager,
  onOpenTemplateLibrary,
  onOpenExportModal,
  onOpenLayoutSettings,
}) => {
  const folderColumnRef = useRef<HTMLDivElement>(null);
  const notesColumnRef = useRef<HTMLDivElement>(null);

  // Responsive breakpoint detection
  const breakpoint = useBreakpoint();

  // Column visibility state - initialized based on breakpoint
  const [isFolderColumnCollapsed, setIsFolderColumnCollapsed] = useState(false);
  const [isNotesColumnCollapsed, setIsNotesColumnCollapsed] = useState(false);
  const [userOverriddenCollapse, setUserOverriddenCollapse] = useState(false);

  // Context menu state
  const [folderContextMenu, setFolderContextMenu] = useState<{
    x: number;
    y: number;
    folderId: string;
    folderName: string;
  } | null>(null);
  const [noteContextMenu, setNoteContextMenu] = useState<{
    x: number;
    y: number;
    note: Note;
  } | null>(null);
  const [folderPickerState, setFolderPickerState] = useState<{
    isOpen: boolean;
    itemType: 'folder' | 'note';
    itemId: string;
    currentFolderId: string | null;
    excludeFolderId?: string;
  } | null>(null);
  // Renaming state (not currently used in this layout - FolderSidebar has its own dialog)
  const [, setRenamingFolderId] = useState<string | null>(null);
  const [, setRenamingValue] = useState('');

  // Delete confirmation state
  const [folderToDelete, setFolderToDelete] = useState<{ id: string; name: string } | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<{ id: string; title: string } | null>(null);

  // Store actions for context menus
  const foldersObj = useFoldersStore((state) => state.folders);
  const notesObj = useNotesStore((state) => state.notes);
  const createFolder = useFoldersStore((state) => state.createFolder);
  const deleteFolder = useFoldersStore((state) => state.deleteFolder);
  const moveFolder = useFoldersStore((state) => state.moveFolder);
  const canMoveFolder = useFoldersStore((state) => state.canMoveFolder);
  const duplicateNote = useNotesStore((state) => state.duplicateNote);
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const updateNote = useNotesStore((state) => state.updateNote);
  const moveNote = useNotesStore((state) => state.moveNote);

  // Get layout preferences from settings store
  const notesLayout = useSettingsStore((state) => state.notesLayout);
  const setNotesLayout = useSettingsStore((state) => state.setNotesLayout);

  const { folderPaneWidth, notesPaneWidth } = notesLayout;

  // Get responsive constraints
  const constraints = RESPONSIVE_WIDTHS[breakpoint];

  // Auto-collapse based on breakpoint (unless user has manually toggled)
  useEffect(() => {
    if (userOverriddenCollapse) return;

    if (breakpoint === 'mobile') {
      setIsFolderColumnCollapsed(true);
      setIsNotesColumnCollapsed(true);
    } else if (breakpoint === 'tablet') {
      setIsFolderColumnCollapsed(true);
      setIsNotesColumnCollapsed(false);
    } else {
      setIsFolderColumnCollapsed(false);
      setIsNotesColumnCollapsed(false);
    }
  }, [breakpoint, userOverriddenCollapse]);

  // Calculate effective widths with responsive constraints
  const effectiveFolderWidth = Math.max(
    constraints.folderMin,
    Math.min(constraints.folderMax || folderPaneWidth, folderPaneWidth)
  );
  const effectiveNotesWidth = Math.max(
    constraints.notesMin,
    Math.min(constraints.notesMax || notesPaneWidth, notesPaneWidth)
  );

  // Handle column width changes
  const handleFolderWidthChange = useCallback(
    (width: number) => {
      setNotesLayout({ folderPaneWidth: width });
    },
    [setNotesLayout]
  );

  const handleNotesWidthChange = useCallback(
    (width: number) => {
      setNotesLayout({ notesPaneWidth: width });
    },
    [setNotesLayout]
  );

  // Toggle columns (marks user override to prevent auto-collapse)
  const toggleFolderColumn = useCallback(() => {
    setUserOverriddenCollapse(true);
    setIsFolderColumnCollapsed((prev) => !prev);
  }, []);

  const toggleNotesColumn = useCallback(() => {
    setUserOverriddenCollapse(true);
    setIsNotesColumnCollapsed((prev) => !prev);
  }, []);

  // Context menu handlers
  const handleFolderContextMenu = useCallback(
    (e: React.MouseEvent, folderId: string, folderName: string) => {
      e.preventDefault();
      e.stopPropagation();
      setFolderContextMenu({
        x: e.clientX,
        y: e.clientY,
        folderId,
        folderName,
      });
    },
    []
  );

  const handleNoteContextMenu = useCallback(
    (e: React.MouseEvent, note: Note) => {
      e.preventDefault();
      e.stopPropagation();
      setNoteContextMenu({
        x: e.clientX,
        y: e.clientY,
        note,
      });
    },
    []
  );

  const handleFolderContextMenuClose = useCallback(() => {
    setFolderContextMenu(null);
  }, []);

  const handleNoteContextMenuClose = useCallback(() => {
    setNoteContextMenu(null);
  }, []);

  // Folder context menu actions
  const handleCreateSubfolder = useCallback(
    (parentId: string) => {
      createFolder({ parentId });
    },
    [createFolder]
  );

  const handleFolderRename = useCallback((folderId: string, currentName: string) => {
    setRenamingFolderId(folderId);
    setRenamingValue(currentName);
  }, []);

  const handleFolderMoveTo = useCallback((folderId: string) => {
    const folder = foldersObj[folderId];
    if (folder) {
      setFolderPickerState({
        isOpen: true,
        itemType: 'folder',
        itemId: folderId,
        currentFolderId: folder.parentId,
        excludeFolderId: folderId,
      });
    }
  }, [foldersObj]);

  const handleFolderDelete = useCallback(
    (folderId: string, folderName: string) => {
      setFolderToDelete({ id: folderId, name: folderName });
    },
    []
  );

  const confirmFolderDelete = useCallback(() => {
    if (folderToDelete) {
      deleteFolder(folderToDelete.id);
      setFolderToDelete(null);
    }
  }, [folderToDelete, deleteFolder]);

  // Note context menu actions
  const handleNoteMoveTo = useCallback((noteId: string) => {
    const note = notesObj[noteId];
    if (note) {
      setFolderPickerState({
        isOpen: true,
        itemType: 'note',
        itemId: noteId,
        currentFolderId: note.folderId,
      });
    }
  }, [notesObj]);

  const handleNoteDuplicate = useCallback(
    (noteId: string) => {
      duplicateNote(noteId);
    },
    [duplicateNote]
  );

  const handleNoteExportMarkdown = useCallback((note: Note) => {
    const content = `# ${note.title}\n\n${note.content}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title || 'Untitled'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleNoteExportPDF = useCallback((_note: Note) => {
    alert('PDF export coming soon!');
  }, []);

  const handleNoteTogglePin = useCallback(
    (noteId: string) => {
      const note = notesObj[noteId];
      if (note) {
        updateNote(noteId, { isPinned: !note.isPinned });
      }
    },
    [notesObj, updateNote]
  );

  const handleNoteToggleFavorite = useCallback(
    (noteId: string) => {
      const note = notesObj[noteId];
      if (note) {
        updateNote(noteId, { isFavorite: !note.isFavorite });
      }
    },
    [notesObj, updateNote]
  );

  const handleNoteDelete = useCallback(
    (noteId: string) => {
      const note = notesObj[noteId];
      if (note) {
        setNoteToDelete({ id: noteId, title: note.title || 'Untitled Note' });
      }
    },
    [notesObj]
  );

  const confirmNoteDelete = useCallback(() => {
    if (noteToDelete) {
      deleteNote(noteToDelete.id);
      setNoteToDelete(null);
    }
  }, [noteToDelete, deleteNote]);

  // Folder picker handlers
  const handleFolderPickerSelect = useCallback(
    (targetFolderId: string | null) => {
      if (!folderPickerState) return;

      if (folderPickerState.itemType === 'folder') {
        if (canMoveFolder(folderPickerState.itemId, targetFolderId)) {
          moveFolder(folderPickerState.itemId, targetFolderId);
        }
      } else {
        moveNote(folderPickerState.itemId, targetFolderId);
      }
      setFolderPickerState(null);
    },
    [folderPickerState, canMoveFolder, moveFolder, moveNote]
  );

  const handleFolderPickerClose = useCallback(() => {
    setFolderPickerState(null);
  }, []);

  return (
    <div className="flex-1 flex min-h-0 overflow-hidden bg-surface-light dark:bg-surface-dark">
      {/* Column 1: Folders */}
      <AnimatePresence mode="wait">
        {!isFolderColumnCollapsed && constraints.folderMin > 0 && (
          <motion.div
            ref={folderColumnRef}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: effectiveFolderWidth, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex-shrink-0 flex flex-col min-h-0 min-w-0 border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark relative overflow-hidden"
            style={{ width: effectiveFolderWidth }}
          >
            {/* Folder header with controls */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-light dark:border-border-dark flex-shrink-0">
              <span className="text-xs font-medium uppercase tracking-wide text-text-light-tertiary dark:text-text-dark-tertiary">
                Folders
              </span>
              <div className="flex items-center gap-1">
                {onOpenLayoutSettings && (
                  <button
                    onClick={onOpenLayoutSettings}
                    className="p-1.5 rounded-md hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated transition-colors"
                    title="Layout settings"
                    aria-label="Open layout settings"
                  >
                    <Settings2 className="w-3.5 h-3.5 text-text-light-tertiary dark:text-text-dark-tertiary" />
                  </button>
                )}
                <button
                  onClick={toggleFolderColumn}
                  className="p-1.5 rounded-md hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated transition-colors"
                  title="Collapse folders"
                  aria-label="Collapse folder column"
                >
                  <PanelLeftClose className="w-3.5 h-3.5 text-text-light-primary dark:text-text-dark-primary" />
                </button>
              </div>
            </div>

            {/* Folder content */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              <FolderSidebar
                activeTags={activeTags}
                onAddTag={onAddTag}
                onRemoveTag={onRemoveTag}
                onClearAllTags={onClearAllTags}
                onOpenTagManager={onOpenTagManager}
                onFolderContextMenu={handleFolderContextMenu}
              />
            </div>

            {/* Resize handle */}
            <SidebarResizer
              currentWidth={folderPaneWidth}
              minWidth={constraints.folderMin}
              maxWidth={constraints.folderMax}
              defaultWidth={constraints.folderDefault}
              onWidthChange={handleFolderWidthChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand button for folders (shown when collapsed or unavailable at this breakpoint) */}
      {(isFolderColumnCollapsed || constraints.folderMin === 0) && breakpoint !== 'mobile' && (
        <div className="flex-shrink-0 flex flex-col border-r border-border-light dark:border-border-dark">
          <button
            onClick={toggleFolderColumn}
            className="p-2 m-1 rounded-md hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated transition-colors"
            title="Expand folders"
            aria-label="Expand folder column"
          >
            <PanelLeftOpen className="w-4 h-4 text-text-light-primary dark:text-text-dark-primary" />
          </button>
        </div>
      )}

      {/* Column 2: Notes List */}
      <AnimatePresence mode="wait">
        {!isNotesColumnCollapsed && constraints.notesMin > 0 && (
          <motion.div
            ref={notesColumnRef}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: effectiveNotesWidth, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex-shrink-0 flex flex-col min-h-0 min-w-0 border-r border-border-light dark:border-border-dark bg-surface-light-elevated/30 dark:bg-surface-dark-elevated/30 relative overflow-hidden"
            style={{ width: effectiveNotesWidth }}
          >
            {/* Notes header with controls */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-light dark:border-border-dark flex-shrink-0">
              <span className="text-xs font-medium uppercase tracking-wide text-text-light-tertiary dark:text-text-dark-tertiary">
                Notes
              </span>
              <button
                onClick={toggleNotesColumn}
                className="p-1.5 rounded-md hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated transition-colors"
                title="Collapse notes list"
                aria-label="Collapse notes column"
              >
                <PanelLeftClose className="w-3.5 h-3.5 text-text-light-primary dark:text-text-dark-primary" />
              </button>
            </div>

            {/* Notes list content */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <NotesList
                activeTags={activeTags}
                onOpenTemplateLibrary={onOpenTemplateLibrary}
                onOpenExportModal={onOpenExportModal}
                onNoteContextMenu={handleNoteContextMenu}
              />
            </div>

            {/* Resize handle */}
            <SidebarResizer
              currentWidth={notesPaneWidth}
              minWidth={constraints.notesMin}
              maxWidth={constraints.notesMax}
              defaultWidth={constraints.notesDefault}
              onWidthChange={handleNotesWidthChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand button for notes (shown when collapsed or unavailable at this breakpoint) */}
      {(isNotesColumnCollapsed || constraints.notesMin === 0) && breakpoint !== 'mobile' && (
        <div className="flex-shrink-0 flex flex-col border-r border-border-light dark:border-border-dark">
          <button
            onClick={toggleNotesColumn}
            className="p-2 m-1 rounded-md hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated transition-colors"
            title="Expand notes list"
            aria-label="Expand notes column"
          >
            <PanelLeftOpen className="w-4 h-4 text-text-light-primary dark:text-text-dark-primary" />
          </button>
        </div>
      )}

      {/* Column 3: Editor (fills remaining space) */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {children}
      </div>

      {/* Context Menus */}
      {folderContextMenu && (
        <FolderContextMenu
          x={folderContextMenu.x}
          y={folderContextMenu.y}
          folderId={folderContextMenu.folderId}
          folderName={folderContextMenu.folderName}
          onClose={handleFolderContextMenuClose}
          onCreateSubfolder={handleCreateSubfolder}
          onRename={handleFolderRename}
          onMoveTo={handleFolderMoveTo}
          onDelete={handleFolderDelete}
        />
      )}

      {noteContextMenu && (
        <NoteContextMenu
          x={noteContextMenu.x}
          y={noteContextMenu.y}
          note={noteContextMenu.note}
          onClose={handleNoteContextMenuClose}
          onMoveTo={handleNoteMoveTo}
          onDuplicate={handleNoteDuplicate}
          onExportMarkdown={handleNoteExportMarkdown}
          onExportPDF={handleNoteExportPDF}
          onTogglePin={handleNoteTogglePin}
          onToggleFavorite={handleNoteToggleFavorite}
          onDelete={handleNoteDelete}
        />
      )}

      {/* Folder Picker Modal */}
      {folderPickerState && (
        <FolderPickerModal
          isOpen={folderPickerState.isOpen}
          onClose={handleFolderPickerClose}
          onSelect={handleFolderPickerSelect}
          title={folderPickerState.itemType === 'folder' ? 'Move Folder to...' : 'Move Note to...'}
          currentFolderId={folderPickerState.currentFolderId}
          excludeFolderId={folderPickerState.excludeFolderId}
          itemType={folderPickerState.itemType}
        />
      )}

      {/* Delete Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={!!folderToDelete}
        onClose={() => setFolderToDelete(null)}
        onConfirm={confirmFolderDelete}
        title="Delete Folder"
        message={`Delete folder "${folderToDelete?.name}" and all its contents? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
      <ConfirmDialog
        isOpen={!!noteToDelete}
        onClose={() => setNoteToDelete(null)}
        onConfirm={confirmNoteDelete}
        title="Delete Note"
        message={`Delete "${noteToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};
