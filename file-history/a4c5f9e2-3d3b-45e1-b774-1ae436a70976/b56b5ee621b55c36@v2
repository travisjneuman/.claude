/**
 * Undo Store
 *
 * Manages undo actions for delete operations across the platform
 * - Notes, folders, kanban tasks, calendar events
 * - Shows toast notifications with undo buttons
 * - Auto-expires actions after 10 seconds
 */

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../services/logger';

const log = logger.module('UndoStore');

/**
 * Undo Action - represents a single undoable action
 */
export interface UndoAction {
  id: string;
  message: string; // Display message in toast (e.g., "Note deleted")
  undoFn: () => void; // Function to restore the deleted item
  expiresAt: number; // Timestamp when action expires (ms)
}

/**
 * Toast Data - for rendering UndoToast components
 */
export interface UndoToast {
  id: string;
  message: string;
  onUndo: () => void;
}

/**
 * Undo Store State
 */
interface UndoStore {
  // State
  actions: Map<string, UndoAction>; // Map of action ID -> UndoAction
  toasts: UndoToast[]; // Active toast notifications

  // Actions
  addUndoAction: (message: string, undoFn: () => void, duration?: number) => string;
  executeUndo: (id: string) => void;
  dismissToast: (id: string) => void;
  clearExpiredActions: () => void;
  clearAllActions: () => void;
}

/**
 * Default duration for undo actions (10 seconds)
 */
const DEFAULT_UNDO_DURATION = 10000; // 10 seconds

/**
 * Create the Undo store
 * NOTE: This store is NOT persisted - undo actions are temporary
 */
export const useUndoStore = create<UndoStore>((set, get) => ({
  // Initial state
  actions: new Map(),
  toasts: [],

  /**
   * Add a new undo action
   * Returns the action ID
   */
  addUndoAction: (message, undoFn, duration = DEFAULT_UNDO_DURATION) => {
    const id = uuidv4();
    const expiresAt = Date.now() + duration;

    const action: UndoAction = {
      id,
      message,
      undoFn,
      expiresAt,
    };

    // Create toast for this action
    const toast: UndoToast = {
      id,
      message,
      onUndo: () => get().executeUndo(id),
    };

    set((state) => {
      const newActions = new Map(state.actions);
      newActions.set(id, action);

      return {
        actions: newActions,
        toasts: [...state.toasts, toast],
      };
    });

    // Auto-expire after duration
    setTimeout(() => {
      get().dismissToast(id);
    }, duration);

    log.debug('Undo action added', { id, message });
    return id;
  },

  /**
   * Execute an undo action (restore deleted item)
   */
  executeUndo: (id) => {
    const action = get().actions.get(id);
    if (!action) {
      log.warn('Undo action not found', { id });
      return;
    }

    // Execute the undo function
    try {
      action.undoFn();
      log.debug('Undo executed', { id, message: action.message });
    } catch (error) {
      log.error('Undo failed', { id, error });
    }

    // Remove action and toast
    get().dismissToast(id);
  },

  /**
   * Dismiss a toast (without undoing)
   * Permanently removes the action
   */
  dismissToast: (id) => {
    set((state) => {
      const newActions = new Map(state.actions);
      newActions.delete(id);

      return {
        actions: newActions,
        toasts: state.toasts.filter((toast) => toast.id !== id),
      };
    });
    log.debug('Toast dismissed', { id });
  },

  /**
   * Clear expired actions
   * Called periodically to clean up old actions
   */
  clearExpiredActions: () => {
    const now = Date.now();
    const expiredIds: string[] = [];

    get().actions.forEach((action) => {
      if (action.expiresAt <= now) {
        expiredIds.push(action.id);
      }
    });

    if (expiredIds.length > 0) {
      set((state) => {
        const newActions = new Map(state.actions);
        expiredIds.forEach((id) => newActions.delete(id));

        return {
          actions: newActions,
          toasts: state.toasts.filter((toast) => !expiredIds.includes(toast.id)),
        };
      });
      log.debug('Cleared expired undo actions', { count: expiredIds.length });
    }
  },

  /**
   * Clear all undo actions
   * Used for cleanup or testing
   */
  clearAllActions: () => {
    set({ actions: new Map(), toasts: [] });
    log.debug('All undo actions cleared');
  },
}));

/**
 * Selector hooks for optimized re-renders
 */
export const useUndoToasts = () => useUndoStore((state) => state.toasts);
export const useHasUndoActions = () => useUndoStore((state) => state.actions.size > 0);
