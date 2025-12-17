import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createSyncedStorage } from '../lib/syncedStorage';

/**
 * Time Tracking Panel Store
 * Manages UI preferences for the sidebar time tracking panel
 */

export type EntryDisplayDensity = 'compact' | 'normal' | 'comfortable';
export type TimeFormat = '12h' | '24h';

interface TimeTrackingPanelState {
  // Panel layout preferences
  recentEntriesHeight: number; // Height of recent entries list in pixels (0-400px)
  visibleEntries: number; // Number of entries visible before scrolling (3-10)
  showMiniSummary: boolean; // Show today's total at bottom

  // Display preferences
  entryDisplayDensity: EntryDisplayDensity;
  timeFormat: TimeFormat;
  showSeconds: boolean; // Show seconds in time display

  // Panel state
  isPanelCollapsed: boolean; // User can collapse the panel section
  hasManuallyResized: boolean; // Track if user manually resized panel
  autoExpandEnabled: boolean; // Enable auto-expand when entries are added

  // Actions
  setRecentEntriesHeight: (height: number) => void;
  setVisibleEntries: (count: number) => void;
  setShowMiniSummary: (show: boolean) => void;
  setEntryDisplayDensity: (density: EntryDisplayDensity) => void;
  setTimeFormat: (format: TimeFormat) => void;
  setShowSeconds: (show: boolean) => void;
  togglePanelCollapsed: () => void;
  setHasManuallyResized: (value: boolean) => void;
  setAutoExpandEnabled: (value: boolean) => void;

  // Reset to defaults
  resetToDefaults: () => void;
}

const DEFAULT_STATE = {
  recentEntriesHeight: 0, // Start at 0px - fully closed, auto-expand when entries added
  visibleEntries: 5, // Show 5 entries
  showMiniSummary: true,
  entryDisplayDensity: 'normal' as EntryDisplayDensity,
  timeFormat: '24h' as TimeFormat,
  showSeconds: true,
  isPanelCollapsed: false,
  hasManuallyResized: false, // Track manual resize
  autoExpandEnabled: true, // Enable auto-expand by default
};

export const useTimeTrackingPanelStore = create<TimeTrackingPanelState>()(
  persist(
    (set) => ({
      // Initial state
      ...DEFAULT_STATE,

      // Actions
      setRecentEntriesHeight: (height) => {
        // Clamp between 0px and 400px
        const clampedHeight = Math.min(Math.max(height, 0), 400);
        set({ recentEntriesHeight: clampedHeight });
      },

      setVisibleEntries: (count) => {
        // Clamp between 3 and 10
        const clampedCount = Math.min(Math.max(count, 3), 10);
        set({ visibleEntries: clampedCount });
      },

      setShowMiniSummary: (show) => set({ showMiniSummary: show }),

      setEntryDisplayDensity: (density) => set({ entryDisplayDensity: density }),

      setTimeFormat: (format) => set({ timeFormat: format }),

      setShowSeconds: (show) => set({ showSeconds: show }),

      togglePanelCollapsed: () =>
        set((state) => ({ isPanelCollapsed: !state.isPanelCollapsed })),

      setHasManuallyResized: (value) => set({ hasManuallyResized: value }),

      setAutoExpandEnabled: (value) => set({ autoExpandEnabled: value }),

      resetToDefaults: () => set(DEFAULT_STATE),
    }),
    {
      name: 'time-tracking-panel-settings',
      storage: createJSONStorage(() => createSyncedStorage()),
    }
  )
);
