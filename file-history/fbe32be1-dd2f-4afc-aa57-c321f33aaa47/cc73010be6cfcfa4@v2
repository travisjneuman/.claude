import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// In-memory store for IndexedDB mock
const indexedDBStore = new Map<string, string>();

// Mock IndexedDB service
vi.mock('../src/services/indexedDB', () => ({
  indexedDBService: {
    isSupported: () => true,
    isReady: () => true,
    init: vi.fn().mockResolvedValue(undefined),
    getItem: vi.fn((key: string) => Promise.resolve(indexedDBStore.get(key) || null)),
    setItem: vi.fn((key: string, value: string) => {
      indexedDBStore.set(key, value);
      return Promise.resolve();
    }),
    removeItem: vi.fn((key: string) => {
      indexedDBStore.delete(key);
      return Promise.resolve();
    }),
    getAllKeys: vi.fn(() => Promise.resolve(Array.from(indexedDBStore.keys()))),
    getAllData: vi.fn(() => Promise.resolve(Object.fromEntries(indexedDBStore))),
    clear: vi.fn(() => {
      indexedDBStore.clear();
      return Promise.resolve();
    }),
    getObject: vi.fn((key: string) => {
      const value = indexedDBStore.get(key);
      return Promise.resolve(value ? JSON.parse(value) : null);
    }),
    setObject: vi.fn((key: string, value: unknown) => {
      indexedDBStore.set(key, JSON.stringify(value));
      return Promise.resolve();
    }),
  },
}));

// Mock save status actions (used by syncedStorage)
vi.mock('../src/stores/useSaveStatus', () => ({
  saveStatusActions: {
    setSaving: vi.fn(),
    setSaved: vi.fn(),
    setError: vi.fn(),
  },
}));

// Mock event reminders service (used by calendar store)
vi.mock('../src/services/eventReminders', () => ({
  scheduleEventReminders: vi.fn(),
  cancelEventReminders: vi.fn(),
}));

// Mock window.matchMedia (for theme store)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Cleanup after each test
afterEach(() => {
  cleanup();
  // Clear localStorage to prevent test interference
  localStorage.clear();
  // Clear IndexedDB mock store
  indexedDBStore.clear();
});

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});
