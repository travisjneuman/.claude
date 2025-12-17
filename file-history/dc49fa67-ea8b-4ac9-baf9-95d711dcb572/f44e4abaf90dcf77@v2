import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { indexedDBService } from '../services/indexedDB';

/**
 * Uptime Store - Enhanced Website Monitoring
 *
 * Features:
 * - Uptime history tracking with IndexedDB persistence
 * - Response time tracking for sparkline graphs
 * - Uptime percentage calculation (24h, 7d, 30d)
 * - Last checked timestamps
 */

export interface UptimeCheck {
  timestamp: number;
  isUp: boolean;
  responseTime: number | null; // ms, null if failed
}

export interface MonitoredSite {
  url: string;
  name: string; // Display name (extracted from URL)
  checks: UptimeCheck[];
  lastChecked: number | null;
  isCurrentlyUp: boolean;
}

interface UptimeState {
  sites: MonitoredSite[];
  checkIntervalMs: number;
  maxHistoryDays: number;

  // Actions
  addSite: (url: string) => void;
  removeSite: (url: string) => void;
  recordCheck: (url: string, isUp: boolean, responseTime: number | null) => void;
  clearHistory: (url: string) => void;
  clearAllHistory: () => void;
}

// Helper to extract display name from URL
function extractSiteName(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

// Helper to prune old history entries
function pruneOldChecks(checks: UptimeCheck[], maxDays: number): UptimeCheck[] {
  const cutoff = Date.now() - maxDays * 24 * 60 * 60 * 1000;
  return checks.filter((check) => check.timestamp >= cutoff);
}

// IndexedDB storage adapter for Zustand persist
const indexedDBStorage = {
  getItem: async (name: string) => {
    const value = await indexedDBService.getItem(name);
    return value;
  },
  setItem: async (name: string, value: string) => {
    await indexedDBService.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await indexedDBService.removeItem(name);
  },
};

export const useUptimeStore = create<UptimeState>()(
  persist(
    (set, get) => ({
      sites: [],
      checkIntervalMs: 60000, // 1 minute
      maxHistoryDays: 30,

      addSite: (url: string) => {
        const { sites } = get();
        // Normalize URL
        let normalizedUrl = url.trim();
        if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
          normalizedUrl = 'https://' + normalizedUrl;
        }

        // Check if already exists
        if (sites.some((s) => s.url === normalizedUrl)) {
          return;
        }

        const newSite: MonitoredSite = {
          url: normalizedUrl,
          name: extractSiteName(normalizedUrl),
          checks: [],
          lastChecked: null,
          isCurrentlyUp: false,
        };

        set({ sites: [...sites, newSite] });
      },

      removeSite: (url: string) => {
        set({ sites: get().sites.filter((s) => s.url !== url) });
      },

      recordCheck: (url: string, isUp: boolean, responseTime: number | null) => {
        const { sites, maxHistoryDays } = get();
        const now = Date.now();

        set({
          sites: sites.map((site) => {
            if (site.url !== url) return site;

            const newCheck: UptimeCheck = {
              timestamp: now,
              isUp,
              responseTime,
            };

            // Add new check and prune old ones
            const updatedChecks = pruneOldChecks([...site.checks, newCheck], maxHistoryDays);

            return {
              ...site,
              checks: updatedChecks,
              lastChecked: now,
              isCurrentlyUp: isUp,
            };
          }),
        });
      },

      clearHistory: (url: string) => {
        set({
          sites: get().sites.map((site) =>
            site.url === url
              ? { ...site, checks: [], lastChecked: null, isCurrentlyUp: false }
              : site
          ),
        });
      },

      clearAllHistory: () => {
        set({
          sites: get().sites.map((site) => ({
            ...site,
            checks: [],
            lastChecked: null,
            isCurrentlyUp: false,
          })),
        });
      },
    }),
    {
      name: 'uptime-storage',
      storage: createJSONStorage(() => indexedDBStorage),
    }
  )
);

/**
 * Calculate uptime percentage for a given time window
 */
export function calculateUptimePercentage(
  checks: UptimeCheck[],
  hoursBack: number
): number | null {
  const cutoff = Date.now() - hoursBack * 60 * 60 * 1000;
  const relevantChecks = checks.filter((c) => c.timestamp >= cutoff);

  if (relevantChecks.length === 0) return null;

  const upCount = relevantChecks.filter((c) => c.isUp).length;
  return Math.round((upCount / relevantChecks.length) * 100);
}

/**
 * Get average response time for recent checks
 */
export function getAverageResponseTime(
  checks: UptimeCheck[],
  hoursBack: number = 24
): number | null {
  const cutoff = Date.now() - hoursBack * 60 * 60 * 1000;
  const relevantChecks = checks.filter(
    (c) => c.timestamp >= cutoff && c.responseTime !== null
  );

  if (relevantChecks.length === 0) return null;

  const sum = relevantChecks.reduce((acc, c) => acc + (c.responseTime || 0), 0);
  return Math.round(sum / relevantChecks.length);
}

/**
 * Get response time data for sparkline (last N checks)
 */
export function getResponseTimeSparklineData(
  checks: UptimeCheck[],
  maxPoints: number = 20
): number[] {
  const successfulChecks = checks
    .filter((c) => c.responseTime !== null)
    .slice(-maxPoints);

  return successfulChecks.map((c) => c.responseTime || 0);
}

/**
 * Format relative time (e.g., "2m ago", "1h ago")
 */
export function formatRelativeTime(timestamp: number | null): string {
  if (!timestamp) return 'Never';

  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}
