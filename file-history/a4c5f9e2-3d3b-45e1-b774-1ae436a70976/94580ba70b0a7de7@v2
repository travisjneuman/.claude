/**
 * Auto-Save Service - Local-First
 *
 * Automatically backs up data to local file system when changes are detected
 * Uses File System Access API with debouncing to avoid excessive saves
 */

import { autoSave as autoSaveToLocal, getDirectoryHandle, saveDirectoryHandle } from './brainBackup';
import { logger } from './logger';

const log = logger.module('AutoSave');

// Debounce settings
const SAVE_DELAY_MS = 30000; // 30 seconds after last change
const MIN_SAVE_INTERVAL_MS = 60000; // Minimum 1 minute between saves

/**
 * Auto-Save Manager
 * Watches for data changes and automatically creates local backups
 */
class AutoSaveManager {
  private saveTimer: ReturnType<typeof setTimeout> | null = null;
  private lastSaveTime: number = 0;
  private isEnabled: boolean = false;
  private localDirectory: FileSystemDirectoryHandle | null = null;
  private handleChange = (_event?: Event): void => {
    void this.processChangeEvent();
  };

  /**
   * Initialize auto-save with preferences
   */
  async initialize(): Promise<void> {
    const { loadPreferences } = await import('./backupPreferences');
    const preferences = await loadPreferences();

    // Try to restore directory handle from IndexedDB
    const savedHandle = await getDirectoryHandle();
    if (savedHandle) {
      this.localDirectory = savedHandle;
      log.info('Restored directory handle from previous session');
    }

    if (preferences.autoSaveEnabled) {
      this.isEnabled = true;
      log.info('Auto-save initialized');
    }

    // Start watching for changes if enabled and directory is available
    if (this.isEnabled && this.localDirectory) {
      this.startWatching();
    }
  }

  /**
   * Watch for data changes
   * Triggers save on data modifications
   */
  private startWatching(): void {
    // Watch for storage events (cross-tab communication)
    window.addEventListener('storage', this.handleChange);

    // Watch for custom events from stores
    window.addEventListener('data-changed', this.handleChange);

    log.debug('Watching for data changes');
  }

  /**
   * Stop watching for changes
   */
  private stopWatching(): void {
    window.removeEventListener('storage', this.handleChange);
    window.removeEventListener('data-changed', this.handleChange);

    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
      this.saveTimer = null;
    }

    log.debug('Stopped watching for changes');
  }

  /**
   * Handle data change event
   */
  private async processChangeEvent(): Promise<void> {
    if (!this.isEnabled) {
      return;
    }

    // Clear existing timer
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
    }

    // Set new timer (debounce)
    this.saveTimer = setTimeout(() => {
      void this.performSave();
    }, SAVE_DELAY_MS);

    log.debug('Change detected, save scheduled');
  }

  /**
   * Perform the actual save
   */
  private async performSave(): Promise<void> {
    // Check minimum interval
    const now = Date.now();
    if (now - this.lastSaveTime < MIN_SAVE_INTERVAL_MS) {
      log.debug('Save skipped (too soon since last save)');
      return;
    }

    if (this.isEnabled && this.localDirectory) {
      await this.saveToLocal();
    }

    this.lastSaveTime = now;
  }

  /**
   * Save to local directory using File System Access API
   */
  private async saveToLocal(): Promise<void> {
    if (!this.localDirectory) {
      log.warn('No local directory configured');
      return;
    }

    try {
      log.debug('Saving to local directory');
      await autoSaveToLocal(this.localDirectory);
      log.info('Local auto-save successful');
    } catch (error) {
      log.error('Local auto-save failed', { error });
    }
  }

  /**
   * Enable local auto-save
   */
  async enableLocal(directory: FileSystemDirectoryHandle): Promise<void> {
    this.localDirectory = directory;
    this.isEnabled = true;

    // Save directory handle to IndexedDB for persistence
    await saveDirectoryHandle(directory);

    const { savePreferences } = await import('./backupPreferences');
    await savePreferences({ autoSaveEnabled: true });

    if (!this.saveTimer) {
      this.startWatching();
    }

    log.info('Local auto-save enabled');
  }

  /**
   * Disable local auto-save
   */
  async disableLocal(): Promise<void> {
    this.isEnabled = false;
    this.localDirectory = null;

    const { savePreferences } = await import('./backupPreferences');
    await savePreferences({ autoSaveEnabled: false });

    this.stopWatching();

    log.info('Local auto-save disabled');
  }

  /**
   * Manually trigger a save now
   */
  async saveNow(): Promise<void> {
    if (this.isEnabled && this.localDirectory) {
      await this.saveToLocal();
      this.lastSaveTime = Date.now();
    } else {
      throw new Error('Auto-save not enabled or no directory configured');
    }
  }

  /**
   * Set the local directory
   */
  setLocalDirectory(directory: FileSystemDirectoryHandle): void {
    this.localDirectory = directory;
  }
}

// Export singleton instance
export const autoSaveManager = new AutoSaveManager();
