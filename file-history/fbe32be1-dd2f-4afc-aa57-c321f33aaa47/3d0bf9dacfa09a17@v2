/**
 * Storage Migration Service
 *
 * Handles migration from localStorage to IndexedDB
 * Runs automatically on app startup
 */

import { indexedDBService } from './indexedDB';
import { logger } from './logger';

const log = logger.module('Migration');

const MIGRATION_FLAG = 'storage-migrated-to-indexeddb';
const STORAGE_KEYS = [
  'kanban-tasks',
  'calendar-events',
  'weather-data',
  'theme-storage',
  'map-storage',
  'gantt-storage',
  'risk-storage',
  'resource-storage',
];

/**
 * Check if migration is needed
 */
export const isMigrationNeeded = (): boolean => {
  // If migration flag exists, migration already completed
  if (localStorage.getItem(MIGRATION_FLAG)) {
    return false;
  }

  // Check if any data exists in localStorage
  for (const key of STORAGE_KEYS) {
    if (localStorage.getItem(key)) {
      return true;
    }
  }

  return false;
};

/**
 * Migrate all data from localStorage to IndexedDB
 */
export const migrateToIndexedDB = async (): Promise<{
  success: boolean;
  migratedKeys: string[];
  errors: string[];
}> => {
  const migratedKeys: string[] = [];
  const errors: string[] = [];

  log.info('Starting migration from localStorage to IndexedDB');

  // Check if IndexedDB is supported
  if (!indexedDBService.isSupported()) {
    errors.push('IndexedDB not supported in this browser');
    return { success: false, migratedKeys, errors };
  }

  try {
    // Initialize IndexedDB
    await indexedDBService.init();

    // Migrate each storage key
    for (const key of STORAGE_KEYS) {
      try {
        const value = localStorage.getItem(key);
        if (value) {
          await indexedDBService.setItem(key, value);
          migratedKeys.push(key);
          log.debug('Migrated key', { key });
        }
      } catch (error) {
        const errorMsg = `Failed to migrate ${key}: ${error}`;
        errors.push(errorMsg);
        log.error('Migration failed for key', { key, error });
      }
    }

    // Set migration flag
    localStorage.setItem(MIGRATION_FLAG, 'true');

    log.info('Migration complete', { migratedCount: migratedKeys.length });
    return { success: true, migratedKeys, errors };
  } catch (error) {
    const errorMsg = `Migration failed: ${error}`;
    errors.push(errorMsg);
    log.error('Migration failed', { error });
    return { success: false, migratedKeys, errors };
  }
};

/**
 * Force re-migration (for testing or recovery)
 */
export const forceMigration = async (): Promise<void> => {
  localStorage.removeItem(MIGRATION_FLAG);
  await migrateToIndexedDB();
};

/**
 * Get migration status
 */
export const getMigrationStatus = (): {
  migrated: boolean;
  needsMigration: boolean;
  keysInLocalStorage: string[];
} => {
  const migrated = !!localStorage.getItem(MIGRATION_FLAG);
  const keysInLocalStorage = STORAGE_KEYS.filter((key) =>
    localStorage.getItem(key)
  );
  const needsMigration = !migrated && keysInLocalStorage.length > 0;

  return {
    migrated,
    needsMigration,
    keysInLocalStorage,
  };
};
