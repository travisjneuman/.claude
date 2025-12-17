import { indexedDBService } from './indexedDB';
import { logger } from './logger';

const log = logger.module('StorageMigration');

/**
 * Storage Migration Service
 *
 * Provides explicit migration utilities for Settings page.
 * Note: Auto-migration already happens via syncedStorage.ts on first read,
 * but this service allows users to:
 * - See migration status
 * - Manually trigger migration of all data
 * - View migration results
 */

export interface MigrationResult {
  success: boolean;
  migratedKeys: string[];
  skippedKeys: string[];
  errors: string[];
  alreadyMigrated: boolean;
}

/**
 * Check if migration is needed
 * Compares localStorage keys with IndexedDB keys to find unmigrated data
 */
export async function needsMigration(): Promise<boolean> {
  try {
    // Check if there are localStorage keys that aren't in IndexedDB
    const localKeys = Object.keys(localStorage);

    if (localKeys.length === 0) {
      return false; // Nothing to migrate
    }

    const indexedKeys = await indexedDBService.getAllKeys();

    // Find localStorage keys not in IndexedDB
    const unmigrated = localKeys.filter((key) => !indexedKeys.includes(key));

    return unmigrated.length > 0;
  } catch (error) {
    log.error('Failed to check migration status', { error });
    return false;
  }
}

/**
 * Migrate all localStorage data to IndexedDB
 * This is idempotent - running multiple times is safe
 */
export async function migrateAllData(): Promise<MigrationResult> {
  const result: MigrationResult = {
    success: true,
    migratedKeys: [],
    skippedKeys: [],
    errors: [],
    alreadyMigrated: false,
  };

  try {
    log.info('Starting localStorage to IndexedDB migration');

    // Get all localStorage keys
    const keys = Object.keys(localStorage);
    log.debug('Found keys in localStorage', { count: keys.length });

    if (keys.length === 0) {
      result.alreadyMigrated = true;
      log.info('No data in localStorage (already migrated or fresh install)');
      return result;
    }

    // Get existing IndexedDB keys
    const indexedKeys = await indexedDBService.getAllKeys();

    for (const key of keys) {
      try {
        // Check if already in IndexedDB
        if (indexedKeys.includes(key)) {
          result.skippedKeys.push(key);
          log.debug('Skipped (already in IndexedDB)', { key });
          continue;
        }

        // Migrate to IndexedDB
        const value = localStorage.getItem(key);
        if (value === null) continue;

        await indexedDBService.setItem(key, value);
        result.migratedKeys.push(key);
        log.debug('Migrated', { key });
      } catch (error) {
        log.error('Failed to migrate key', { key, error });
        result.errors.push(`${key}: ${error}`);
        result.success = false;
      }
    }

    // Log summary
    log.info('Migration complete', { migrated: result.migratedKeys.length, skipped: result.skippedKeys.length });

    // Mark migration as complete
    if (result.migratedKeys.length > 0 || result.skippedKeys.length > 0) {
      await indexedDBService.setItem('__migration_completed', new Date().toISOString());
    }

    return result;
  } catch (error) {
    log.error('Migration failed', { error });
    result.success = false;
    result.errors.push(String(error));
    return result;
  }
}

/**
 * Get migration status
 * Returns whether migration has been completed and if migration is needed
 */
export async function getMigrationStatus(): Promise<{
  completed: boolean;
  completedAt: string | null;
  needsMigration: boolean;
}> {
  try {
    const completed = await indexedDBService.getItem('__migration_completed');
    const needs = await needsMigration();

    return {
      completed: completed !== null,
      completedAt: completed,
      needsMigration: needs,
    };
  } catch (error) {
    log.error('Failed to get migration status', { error });
    return {
      completed: false,
      completedAt: null,
      needsMigration: false,
    };
  }
}

/**
 * Clear localStorage after successful migration
 * CAUTION: Only call this after verifying IndexedDB migration was successful
 * This is optional - localStorage can coexist with IndexedDB
 */
export function clearLocalStorageAfterMigration(): void {
  log.warn('Clearing localStorage (migration complete)');
  localStorage.clear();
}
