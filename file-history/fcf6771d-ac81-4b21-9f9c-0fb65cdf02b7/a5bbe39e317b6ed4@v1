/**
 * useNotesListKeyboard Hook
 *
 * Keyboard navigation for notes list in Notes page.
 * Part of the Notes Page Revolution - Phase 4.
 *
 * Shortcuts:
 * - ↓/J: Next note
 * - ↑/K: Previous note
 * - Enter: Open note in editor
 * - F: Toggle favorite
 * - P: Toggle pin
 * - D: Delete (with confirm)
 * - Space: Toggle selection (bulk mode)
 * - Home: First note
 * - End: Last note
 * - Escape: Clear selection / close help
 */

import { useState, useEffect, useCallback } from 'react';
import type { Note } from '../types/notes';

interface UseNotesListKeyboardProps {
  /** List of notes to navigate */
  notes: Note[];
  /** Currently active note ID */
  activeNoteId: string | null;
  /** Callback to select a note */
  onSelect: (id: string) => void;
  /** Callback to toggle favorite */
  onToggleFavorite: (id: string) => void;
  /** Callback to toggle pin */
  onTogglePin: (id: string) => void;
  /** Callback to delete note (should show confirm) */
  onDelete: (note: Note) => void;
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Whether in selection mode for bulk operations */
  isSelectionMode?: boolean;
  /** Callback to toggle selection */
  onToggleSelection?: (id: string) => void;
}

export function useNotesListKeyboard({
  notes,
  activeNoteId,
  onSelect,
  onToggleFavorite,
  onTogglePin,
  onDelete,
  enabled = true,
  isSelectionMode = false,
  onToggleSelection,
}: UseNotesListKeyboardProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [pendingDeleteNote, setPendingDeleteNote] = useState<Note | null>(null);

  // Sync focused index with active note
  useEffect(() => {
    if (activeNoteId === null) {
      setFocusedIndex(-1);
    } else {
      const index = notes.findIndex((n) => n.id === activeNoteId);
      if (index !== -1) {
        setFocusedIndex(index);
      }
    }
  }, [activeNoteId, notes]);

  // Get note at current focus
  const getFocusedNote = useCallback(() => {
    return focusedIndex >= 0 && focusedIndex < notes.length ? notes[focusedIndex] : null;
  }, [focusedIndex, notes]);

  // Confirm delete callback
  const confirmDelete = useCallback(() => {
    if (pendingDeleteNote) {
      onDelete(pendingDeleteNote);
      setPendingDeleteNote(null);
      // Move focus to next note or previous if at end
      if (focusedIndex >= notes.length - 1) {
        setFocusedIndex(Math.max(0, notes.length - 2));
      }
    }
  }, [pendingDeleteNote, onDelete, focusedIndex, notes.length]);

  // Cancel delete callback
  const cancelDelete = useCallback(() => {
    setPendingDeleteNote(null);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.contentEditable === 'true')
      ) {
        return;
      }

      // Ignore if a dialog is pending
      if (pendingDeleteNote) {
        if (e.key === 'Escape') {
          e.preventDefault();
          cancelDelete();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          confirmDelete();
        }
        return;
      }

      const note = getFocusedNote();

      switch (e.key.toLowerCase()) {
        case 'arrowdown':
        case 'j':
          e.preventDefault();
          if (focusedIndex < notes.length - 1) {
            const newIndex = focusedIndex + 1;
            setFocusedIndex(newIndex);
            onSelect(notes[newIndex].id);
          } else if (focusedIndex === -1 && notes.length > 0) {
            // No selection, select first
            setFocusedIndex(0);
            onSelect(notes[0].id);
          }
          break;

        case 'arrowup':
        case 'k':
          e.preventDefault();
          if (focusedIndex > 0) {
            const newIndex = focusedIndex - 1;
            setFocusedIndex(newIndex);
            onSelect(notes[newIndex].id);
          }
          break;

        case 'enter':
          e.preventDefault();
          if (note) {
            onSelect(note.id);
          }
          break;

        case 'f':
          // Toggle favorite
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            if (note) {
              onToggleFavorite(note.id);
            }
          }
          break;

        case 'p':
          // Toggle pin
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            if (note) {
              onTogglePin(note.id);
            }
          }
          break;

        case 'd':
          // Delete (show confirm)
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            if (note) {
              setPendingDeleteNote(note);
            }
          }
          break;

        case ' ':
          // Toggle selection (in bulk mode)
          e.preventDefault();
          if (isSelectionMode && note && onToggleSelection) {
            onToggleSelection(note.id);
          }
          break;

        case 'home':
          e.preventDefault();
          if (notes.length > 0) {
            setFocusedIndex(0);
            onSelect(notes[0].id);
          }
          break;

        case 'end':
          e.preventDefault();
          if (notes.length > 0) {
            const lastIndex = notes.length - 1;
            setFocusedIndex(lastIndex);
            onSelect(notes[lastIndex].id);
          }
          break;

        case 'escape':
          e.preventDefault();
          // Could clear selection or close something
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
    notes,
    pendingDeleteNote,
    getFocusedNote,
    onSelect,
    onToggleFavorite,
    onTogglePin,
    isSelectionMode,
    onToggleSelection,
    confirmDelete,
    cancelDelete,
  ]);

  return {
    focusedIndex,
    focusedNoteId: getFocusedNote()?.id ?? null,
    pendingDeleteNote,
    confirmDelete,
    cancelDelete,
    setFocusedIndex,
  };
}
