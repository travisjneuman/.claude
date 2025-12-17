/**
 * Navigation Expansion Store
 *
 * FOUNDATIONAL: Manages expanded/collapsed state of sidebar navigation items.
 * This architecture allows any nav item to have sub-pages by adding `children`.
 * Persists to localStorage so expansion state survives page refresh.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NavExpansionStore {
  /** Array of parent paths that are currently expanded */
  expandedPaths: string[];

  /** Toggle expansion state for a nav item */
  toggleExpanded: (path: string) => void;

  /** Check if a nav item is expanded */
  isExpanded: (path: string) => boolean;

  /** Expand a nav item (useful for programmatic control) */
  expand: (path: string) => void;

  /** Collapse a nav item */
  collapse: (path: string) => void;

  /** Initialize default expanded state for items with defaultExpanded: true */
  initializeDefaults: (defaultPaths: string[]) => void;
}

export const useNavExpansionStore = create<NavExpansionStore>()(
  persist(
    (set, get) => ({
      expandedPaths: [], // All collapsed by default (P2 #3 Phase 6A)

      toggleExpanded: (path) =>
        set((state) => ({
          expandedPaths: state.expandedPaths.includes(path)
            ? state.expandedPaths.filter((p) => p !== path)
            : [...state.expandedPaths, path],
        })),

      isExpanded: (path) => get().expandedPaths.includes(path),

      expand: (path) =>
        set((state) => ({
          expandedPaths: state.expandedPaths.includes(path)
            ? state.expandedPaths
            : [...state.expandedPaths, path],
        })),

      collapse: (path) =>
        set((state) => ({
          expandedPaths: state.expandedPaths.filter((p) => p !== path),
        })),

      initializeDefaults: (defaultPaths) =>
        set((state) => {
          // Only add defaults that aren't already in the list
          const newPaths = defaultPaths.filter(
            (p) => !state.expandedPaths.includes(p)
          );
          return newPaths.length > 0
            ? { expandedPaths: [...state.expandedPaths, ...newPaths] }
            : state;
        }),
    }),
    {
      name: 'nav-expansion-state',
      version: 1,
    }
  )
);
