/**
 * useFolderTreeKeyboard Hook
 *
 * Keyboard navigation for folder tree in Notes page.
 * Part of the Notes Page Revolution - Phase 4.
 *
 * Shortcuts:
 * - ↓/J: Next folder
 * - ↑/K: Previous folder
 * - →/L: Expand folder or enter
 * - ←/H: Collapse folder or go to parent
 * - Enter: Select folder
 * - Home: First folder
 * - End: Last folder
 * - ?: Toggle keyboard shortcuts help
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { FolderNode } from '../components/notes/FolderTreeNode';

interface UseFolderTreeKeyboardProps {
  /** Flat list of folder nodes for navigation */
  folders: FolderNode[];
  /** Currently active folder ID */
  activeFolderId: string | null;
  /** Set of expanded folder IDs */
  expandedFolderIds: Set<string>;
  /** Callback to select a folder */
  onSelect: (id: string | null) => void;
  /** Callback to toggle folder expanded state */
  onToggleExpanded: (id: string) => void;
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
}

interface FlattenedFolder {
  id: string;
  name: string;
  depth: number;
  hasChildren: boolean;
  parentId: string | null;
}

/**
 * Flatten folder tree for linear navigation
 */
function flattenFolders(
  nodes: FolderNode[],
  expandedIds: Set<string>,
  depth: number = 0,
  parentId: string | null = null
): FlattenedFolder[] {
  const result: FlattenedFolder[] = [];

  for (const node of nodes) {
    result.push({
      id: node.id,
      name: node.name,
      depth,
      hasChildren: Boolean(node.children && node.children.length > 0),
      parentId,
    });

    // Only include children if folder is expanded
    if (node.children && node.children.length > 0 && expandedIds.has(node.id)) {
      result.push(...flattenFolders(node.children, expandedIds, depth + 1, node.id));
    }
  }

  return result;
}

export function useFolderTreeKeyboard({
  folders,
  activeFolderId,
  expandedFolderIds,
  onSelect,
  onToggleExpanded,
  enabled = true,
}: UseFolderTreeKeyboardProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Flatten folders for linear navigation
  const flatFolders = useMemo(
    () => flattenFolders(folders, expandedFolderIds),
    [folders, expandedFolderIds]
  );

  // Sync focused index with active folder
  useEffect(() => {
    if (activeFolderId === null) {
      setFocusedIndex(-1);
    } else {
      const index = flatFolders.findIndex((f) => f.id === activeFolderId);
      if (index !== -1) {
        setFocusedIndex(index);
      }
    }
  }, [activeFolderId, flatFolders]);

  // Get folder at current focus
  const getFocusedFolder = useCallback(() => {
    return focusedIndex >= 0 && focusedIndex < flatFolders.length
      ? flatFolders[focusedIndex]
      : null;
  }, [focusedIndex, flatFolders]);

  // Handle keyboard events
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const folder = getFocusedFolder();

      switch (e.key.toLowerCase()) {
        case 'arrowdown':
        case 'j':
          e.preventDefault();
          if (focusedIndex < flatFolders.length - 1) {
            const newIndex = focusedIndex + 1;
            setFocusedIndex(newIndex);
            onSelect(flatFolders[newIndex].id);
          } else if (focusedIndex === -1 && flatFolders.length > 0) {
            // If "All Notes" is selected, move to first folder
            setFocusedIndex(0);
            onSelect(flatFolders[0].id);
          }
          break;

        case 'arrowup':
        case 'k':
          e.preventDefault();
          if (focusedIndex > 0) {
            const newIndex = focusedIndex - 1;
            setFocusedIndex(newIndex);
            onSelect(flatFolders[newIndex].id);
          } else if (focusedIndex === 0) {
            // Move to "All Notes"
            setFocusedIndex(-1);
            onSelect(null);
          }
          break;

        case 'arrowright':
        case 'l':
          e.preventDefault();
          if (folder && folder.hasChildren) {
            if (!expandedFolderIds.has(folder.id)) {
              // Expand folder
              onToggleExpanded(folder.id);
            } else if (flatFolders.length > focusedIndex + 1) {
              // Already expanded, move to first child
              const nextFolder = flatFolders[focusedIndex + 1];
              if (nextFolder.parentId === folder.id) {
                setFocusedIndex(focusedIndex + 1);
                onSelect(nextFolder.id);
              }
            }
          }
          break;

        case 'arrowleft':
        case 'h':
          e.preventDefault();
          if (folder) {
            if (folder.hasChildren && expandedFolderIds.has(folder.id)) {
              // Collapse folder
              onToggleExpanded(folder.id);
            } else if (folder.parentId) {
              // Go to parent
              const parentIndex = flatFolders.findIndex((f) => f.id === folder.parentId);
              if (parentIndex !== -1) {
                setFocusedIndex(parentIndex);
                onSelect(flatFolders[parentIndex].id);
              }
            } else {
              // No parent, go to "All Notes"
              setFocusedIndex(-1);
              onSelect(null);
            }
          }
          break;

        case 'enter':
        case ' ':
          e.preventDefault();
          // Select is already done via arrow navigation
          // But if a folder has children, toggle expansion
          if (folder && folder.hasChildren) {
            onToggleExpanded(folder.id);
          }
          break;

        case 'home':
          e.preventDefault();
          setFocusedIndex(-1);
          onSelect(null);
          break;

        case 'end':
          e.preventDefault();
          if (flatFolders.length > 0) {
            const lastIndex = flatFolders.length - 1;
            setFocusedIndex(lastIndex);
            onSelect(flatFolders[lastIndex].id);
          }
          break;

        case '?':
          e.preventDefault();
          setShowHelp((prev) => !prev);
          break;

        case 'escape':
          e.preventDefault();
          setShowHelp(false);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    enabled,
    focusedIndex,
    flatFolders,
    expandedFolderIds,
    getFocusedFolder,
    onSelect,
    onToggleExpanded,
  ]);

  return {
    focusedIndex,
    focusedFolderId: getFocusedFolder()?.id ?? null,
    showHelp,
    closeHelp: () => setShowHelp(false),
    setFocusedIndex,
  };
}
