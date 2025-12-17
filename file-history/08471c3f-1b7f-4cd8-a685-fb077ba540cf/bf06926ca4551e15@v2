/**
 * Analytics Store
 * Manages analytics dashboard preferences and period selection
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createSyncedStorage } from '../lib/syncedStorage';

export type AnalyticsPeriod = 'today' | 'week' | 'month' | 'year' | 'custom';

export interface DateRange {
  start: Date;
  end: Date;
}

interface AnalyticsStore {
  // Period selection
  period: AnalyticsPeriod;
  customRange: DateRange | null;

  // Actions
  setPeriod: (period: AnalyticsPeriod) => void;
  setCustomRange: (range: DateRange) => void;

  // Helpers
  getDateRange: () => DateRange;
}

/**
 * Get date range for a given period
 */
function getDateRangeForPeriod(period: AnalyticsPeriod, customRange: DateRange | null): DateRange {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (period) {
    case 'today':
      return {
        start: today,
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999),
      };

    case 'week':
      // Start of current week (Sunday)
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      return { start: weekStart, end: weekEnd };

    case 'month':
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
      return { start: monthStart, end: monthEnd };

    case 'year':
      const yearStart = new Date(today.getFullYear(), 0, 1);
      const yearEnd = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
      return { start: yearStart, end: yearEnd };

    case 'custom':
      if (customRange) {
        return customRange;
      }
      // Fallback to this week if no custom range set
      return getDateRangeForPeriod('week', null);

    default:
      return getDateRangeForPeriod('week', null);
  }
}

export const useAnalyticsStore = create<AnalyticsStore>()(
  persist(
    (set, get) => ({
      // Initial state
      period: 'week',
      customRange: null,

      // Actions
      setPeriod: (period) => set({ period }),

      setCustomRange: (range) => set({ customRange: range, period: 'custom' }),

      getDateRange: () => {
        const { period, customRange } = get();
        return getDateRangeForPeriod(period, customRange);
      },
    }),
    {
      name: 'analytics-preferences',
      storage: createJSONStorage(() => createSyncedStorage()),
      version: 1,
    }
  )
);
