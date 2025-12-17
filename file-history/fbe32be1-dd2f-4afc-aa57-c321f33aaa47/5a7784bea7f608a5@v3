/**
 * Folders Store
 *
 * Zustand store for managing folder hierarchy
 * Persisted to IndexedDB via syncedStorage
 * Supports unlimited nesting depth
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type {
  Folder,
  FolderUpdate,
  FolderTreeNode,
} from '../types/notes';
import { FOLDER_CONSTANTS } from '../types/notes';
import { createSyncedStorage } from '../lib/syncedStorage';
import { logger } from '../services/logger';
// Import at module level - Vite handles circular deps better than CommonJS
import { useNotesStore } from './useNotesStore';

const log = logger.module('FoldersStore');

/**
 * Folders Store State
 */
interface FoldersStore {
  // State
  folders: Record<string, Folder>; // Map of folder ID -> Folder
  activeFolderId: string | null; // Currently selected folder
  expandedFolderIds: Set<string>; // Expanded folders in tree view

  // Actions - CRUD
  createFolder: (params?: Partial<Folder>) => Folder;
  getFolder: (id: string) => Folder | undefined;
  updateFolder: (id: string, updates: FolderUpdate) => void;
  deleteFolder: (id: string, deleteNotes?: boolean) => void;
  duplicateFolder: (id: string) => Folder | null;

  // Actions - Hierarchy
  moveFolder: (folderId: string, newParentId: string | null) => void;
  getChildren: (parentId: string | null) => Folder[];
  getParent: (folderId: string) => Folder | null;
  getPath: (folderId: string) => Folder[];
  getDepth: (folderId: string) => number;
  getFlatTree: () => Folder[];
  getTree: () => FolderTreeNode[];

  // Actions - Expand/Collapse
  toggleExpanded: (id: string) => void;
  expandFolder: (id: string) => void;
  collapseFolder: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  expandPath: (folderId: string) => void; // Expand all ancestors

  // Actions - UI state
  setActiveFolder: (id: string | null) => void;

  // Actions - Utility
  canMoveFolder: (folderId: string, targetParentId: string | null) => boolean;
  isDescendantOf: (folderId: string, ancestorId: string) => boolean;
  exportFolders: () => Folder[];
  importFolders: (folders: Folder[], merge: boolean) => void;
  clearAllFolders: () => void;
}

/**
 * Default folder values
 */
const createDefaultFolder = (overrides?: Partial<Folder>): Folder => {
  const now = new Date();
  return {
    id: uuidv4(),
    parentId: null,
    name: FOLDER_CONSTANTS.DEFAULT_NAME,
    createdAt: now,
    updatedAt: now,
    isExpanded: true, // New folders expanded by default
    ...overrides,
  };
};

/**
 * Build tree structure from flat folder list
 */
const buildTree = (
  folders: Folder[],
  parentId: string | null,
  depth: number = 0,
  notesCountMap: Record<string, number> = {}
): FolderTreeNode[] => {
  const children = folders.filter((f) => f.parentId === parentId);

  return children.map((folder) => {
    const subtree = buildTree(folders, folder.id, depth + 1, notesCountMap);
    const noteCount = notesCountMap[folder.id] || 0;
    const totalNoteCount =
      noteCount + subtree.reduce((sum, child) => sum + child.totalNoteCount, 0);

    return {
      ...folder,
      children: subtree,
      depth,
      path: [], // Will be filled in by getPath if needed
      noteCount,
      totalNoteCount,
    };
  });
};

/**
 * Create the Folders store
 */
export const useFoldersStore = create<FoldersStore>()(
  persist(
    (set, get) => ({
      // Initial state
      folders: {},
      activeFolderId: null,
      expandedFolderIds: new Set<string>(),

      // CRUD Operations
      createFolder: (params) => {
        const newFolder = createDefaultFolder(params);

        // Check max depth
        const depth = get().getDepth(newFolder.parentId || '');
        if (depth >= FOLDER_CONSTANTS.MAX_DEPTH) {
          log.warn('Max folder depth reached', { maxDepth: FOLDER_CONSTANTS.MAX_DEPTH });
          return newFolder; // Return but don't create
        }

        set((state) => ({
          folders: {
            ...state.folders,
            [newFolder.id]: newFolder,
          },
          expandedFolderIds: new Set([
            ...state.expandedFolderIds,
            newFolder.id,
          ]),
          activeFolderId: newFolder.id, // Auto-select new folder
        }));

        // Expand parent folder if it exists
        if (newFolder.parentId) {
          get().expandFolder(newFolder.parentId);
        }

        log.debug('Folder created', { id: newFolder.id });
        return newFolder;
      },

      getFolder: (id) => {
        return get().folders[id];
      },

      updateFolder: (id, updates) => {
        const folder = get().folders[id];
        if (!folder) {
          log.warn('Folder not found', { id });
          return;
        }

        set((state) => ({
          folders: {
            ...state.folders,
            [id]: {
              ...folder,
              ...updates,
              updatedAt: new Date(),
            },
          },
        }));
        log.debug('Folder updated', { id });
      },

      deleteFolder: (id, deleteNotes = false) => {
        // CRITICAL: Handle notes before deleting folder to prevent orphaned notes
        // Get the folder being deleted
        const folder = get().folders[id];
        if (!folder) {
          log.warn('Folder not found for deletion', { id });
          return;
        }

        // Get all descendant folders
        const descendants = get()
          .getFlatTree()
          .filter((f) => get().isDescendantOf(f.id, id));

        // Get all folder IDs that will be deleted (this folder + descendants)
        const foldersToDelete = [id, ...descendants.map(d => d.id)];

        // Handle notes in deleted folders
        try {
          const notesStore = useNotesStore.getState();

          // Get all notes in folders that will be deleted
          const notesInDeletedFolders = notesStore.getAllNotes()
            .filter((note: { folderId: string | null }) =>
              note.folderId && foldersToDelete.includes(note.folderId)
            );

          if (notesInDeletedFolders.length > 0) {
            if (deleteNotes) {
              // Delete all notes in folder and descendants
              const noteIds = notesInDeletedFolders.map((n: { id: string }) => n.id);
              notesStore.deleteNotes(noteIds);
              log.info('Deleted notes from deleted folders', { count: noteIds.length });
            } else {
              // Move notes to parent folder (or root if no parent)
              const newFolderId = folder.parentId || null;
              const noteIds = notesInDeletedFolders.map((n: { id: string }) => n.id);
              notesStore.moveNotesToFolder(noteIds, newFolderId);
              log.info('Moved notes', { count: noteIds.length, targetFolder: newFolderId || 'root' });
            }
          }
        } catch (error) {
          log.error('Error handling notes in deleted folder', { error });
          // Continue with folder deletion even if note handling fails
        }

        // Now safe to delete folders
        set((state) => {
          const { [id]: deleted, ...remainingFolders } = state.folders;

          // Also delete descendants
          descendants.forEach((desc) => {
            delete remainingFolders[desc.id];
          });

          // Remove from expanded set
          const newExpanded = new Set(state.expandedFolderIds);
          newExpanded.delete(id);
          descendants.forEach((desc) => newExpanded.delete(desc.id));

          return {
            folders: remainingFolders,
            expandedFolderIds: newExpanded,
            activeFolderId: state.activeFolderId === id ? null : state.activeFolderId,
          };
        });

        log.info('Folder deleted', { id, descendantCount: descendants.length });
      },

      duplicateFolder: (id) => {
        const original = get().folders[id];
        if (!original) {
          log.warn('Folder not found for duplication', { id });
          return null;
        }

        const duplicate = createDefaultFolder({
          ...original,
          name: `${original.name} (Copy)`,
        });

        set((state) => ({
          folders: {
            ...state.folders,
            [duplicate.id]: duplicate,
          },
        }));

        log.debug('Folder duplicated', { originalId: id, newId: duplicate.id });
        return duplicate;
      },

      // Hierarchy operations
      moveFolder: (folderId, newParentId) => {
        if (!get().canMoveFolder(folderId, newParentId)) {
          log.warn('Cannot move folder', { folderId, targetParentId: newParentId });
          return;
        }

        const folder = get().folders[folderId];
        if (!folder) return;

        set((state) => ({
          folders: {
            ...state.folders,
            [folderId]: {
              ...folder,
              parentId: newParentId,
              updatedAt: new Date(),
            },
          },
        }));

        log.debug('Folder moved', { folderId, newParentId });
      },

      getChildren: (parentId) => {
        return Object.values(get().folders)
          .filter((f) => f.parentId === parentId)
          .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
      },

      getParent: (folderId) => {
        const folder = get().folders[folderId];
        if (!folder || !folder.parentId) return null;
        return get().folders[folder.parentId] || null;
      },

      getPath: (folderId) => {
        const path: Folder[] = [];
        let current: Folder | undefined = get().folders[folderId];

        while (current) {
          path.unshift(current);
          current = current.parentId ? get().folders[current.parentId] : undefined;
        }

        return path;
      },

      getDepth: (folderId) => {
        if (!folderId) return 0;

        let depth = 0;
        let current = get().folders[folderId];

        while (current?.parentId) {
          depth++;
          current = get().folders[current.parentId];

          // Prevent infinite loops
          if (depth > 100) {
            log.error('Circular folder reference detected');
            return depth;
          }
        }

        return depth;
      },

      getFlatTree: () => {
        return Object.values(get().folders).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      },

      getTree: () => {
        const folders = Object.values(get().folders);

        // Get real note counts from Notes store
        const notesCountMap: Record<string, number> = {};
        try {
          const notes = useNotesStore.getState().getAllNotes();

          // Count notes per folder (excluding archived notes)
          notes
            .filter((note: { isArchived: boolean }) => !note.isArchived)
            .forEach((note: { folderId: string | null }) => {
              const folderId = note.folderId || 'root';
              notesCountMap[folderId] = (notesCountMap[folderId] || 0) + 1;
            });
        } catch (error) {
          log.error('Error getting note counts', { error });
          // Continue with empty counts if Notes store not available
        }

        return buildTree(folders, null, 0, notesCountMap);
      },

      // Expand/Collapse
      toggleExpanded: (id) => {
        set((state) => {
          const newExpanded = new Set(state.expandedFolderIds);
          if (newExpanded.has(id)) {
            newExpanded.delete(id);
          } else {
            newExpanded.add(id);
          }
          return { expandedFolderIds: newExpanded };
        });
      },

      expandFolder: (id) => {
        set((state) => ({
          expandedFolderIds: new Set([...state.expandedFolderIds, id]),
        }));
      },

      collapseFolder: (id) => {
        set((state) => {
          const newExpanded = new Set(state.expandedFolderIds);
          newExpanded.delete(id);
          return { expandedFolderIds: newExpanded };
        });
      },

      expandAll: () => {
        const allIds = Object.keys(get().folders);
        set({ expandedFolderIds: new Set(allIds) });
        log.debug('Expanded all folders');
      },

      collapseAll: () => {
        set({ expandedFolderIds: new Set() });
        log.debug('Collapsed all folders');
      },

      expandPath: (folderId) => {
        const path = get().getPath(folderId);
        set((state) => {
          const newExpanded = new Set(state.expandedFolderIds);
          path.forEach((folder) => newExpanded.add(folder.id));
          return { expandedFolderIds: newExpanded };
        });
      },

      // UI state
      setActiveFolder: (id) => {
        set({ activeFolderId: id });
      },

      // Utility
      canMoveFolder: (folderId, targetParentId) => {
        // Can't move to self
        if (folderId === targetParentId) return false;

        // Can't move to own descendant (would create cycle)
        if (targetParentId && get().isDescendantOf(targetParentId, folderId)) {
          return false;
        }

        // Check max depth
        const newDepth = get().getDepth(targetParentId || '') + 1;
        if (newDepth >= FOLDER_CONSTANTS.MAX_DEPTH) {
          return false;
        }

        return true;
      },

      isDescendantOf: (folderId, ancestorId) => {
        let current = get().folders[folderId];
        let iterations = 0;

        while (current?.parentId) {
          if (current.parentId === ancestorId) return true;
          current = get().folders[current.parentId];

          // Prevent infinite loops
          if (iterations++ > 100) {
            log.error('Circular folder reference detected');
            return false;
          }
        }

        return false;
      },

      exportFolders: () => {
        return Object.values(get().folders);
      },

      importFolders: (folders, merge) => {
        if (!merge) {
          // Replace all folders
          set({
            folders: Object.fromEntries(folders.map((f) => [f.id, f])),
            activeFolderId: null,
            expandedFolderIds: new Set(),
          });
          log.info('Imported folders (replace mode)', { count: folders.length });
        } else {
          // Merge with existing folders
          set((state) => {
            const updatedFolders = { ...state.folders };
            folders.forEach((folder) => {
              updatedFolders[folder.id] = folder;
            });
            return { folders: updatedFolders };
          });
          log.info('Imported folders (merge mode)', { count: folders.length });
        }
      },

      clearAllFolders: () => {
        set({
          folders: {},
          activeFolderId: null,
          expandedFolderIds: new Set(),
        });
        log.info('All folders cleared');
      },
    }),
    {
      name: 'folders', // IndexedDB key
      storage: createJSONStorage(() => createSyncedStorage()),
      partialize: (state) => ({
        // Only persist folders, not UI state
        // Convert Set to Array for JSON serialization
        folders: state.folders,
        expandedFolderIds: Array.from(state.expandedFolderIds),
      }),
      // Handle date serialization and Set restoration
      onRehydrateStorage: () => (state) => {
        log.debug('Folders store rehydrating');
        if (state) {
          try {
            // Convert date strings back to Date objects
            if (state.folders && typeof state.folders === 'object') {
              Object.values(state.folders).forEach((folder) => {
                if (typeof folder.createdAt === 'string') {
                  folder.createdAt = new Date(folder.createdAt);
                }
                if (typeof folder.updatedAt === 'string') {
                  folder.updatedAt = new Date(folder.updatedAt);
                }
              });
            } else {
              state.folders = {};
            }

            // CRITICAL: Fix corrupted Set data
            const expandedIds = (state as any).expandedFolderIds;

            if (expandedIds instanceof Set) {
              // Already a Set (shouldn't happen after persist, but just in case)
            } else if (Array.isArray(expandedIds)) {
              // Correct format from our partialize
              state.expandedFolderIds = new Set(expandedIds);
            } else {
              // Corrupted data - plain object or other
              log.warn('Corrupted expandedFolderIds detected, resetting');
              state.expandedFolderIds = new Set<string>();
            }
          } catch (err) {
            log.error('Error during folders store rehydration', { error: err });
            // Reset to safe defaults
            state.folders = {};
            state.expandedFolderIds = new Set<string>();
            state.activeFolderId = null;
          }
        }
        log.info('Folders store rehydrated', { folderCount: state?.folders ? Object.keys(state.folders).length : 0 });
      },
    }
  )
);

/**
 * Selector hooks for optimized re-renders
 */
export const useActiveFolder = () =>
  useFoldersStore((state) => {
    const activeId = state.activeFolderId;
    return activeId ? state.folders[activeId] : null;
  });

export const useFolderTree = () =>
  useFoldersStore((state) => state.getTree());

export const useFolderPath = (folderId: string) =>
  useFoldersStore((state) => state.getPath(folderId));

export const isFolderExpanded = (folderId: string) =>
  useFoldersStore((state) => state.expandedFolderIds.has(folderId));
