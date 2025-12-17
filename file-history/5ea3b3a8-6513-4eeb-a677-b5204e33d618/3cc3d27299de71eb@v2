/**
 * Phantom Shell State Management
 *
 * Manages:
 * - Terminal instance and state
 * - WebContainer lifecycle
 * - Project files (virtual filesystem)
 * - Command history
 * - AI integration state
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createSyncedStorage } from '../lib/syncedStorage';
import { logger } from '../services/logger';
import type { Terminal as XTerm } from '@xterm/xterm';

const log = logger.module('PhantomShellStore');

// ==================== TYPES ====================

// FileSystemTree type for WebContainer (defined here to avoid dependency)
export interface FileSystemTree {
  [name: string]: FileNode | DirectoryNode;
}

interface FileNode {
  file: {
    contents: string;
  };
}

interface DirectoryNode {
  directory: FileSystemTree;
}

export interface PhantomProject {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  files: FileSystemTree;
  metadata: {
    framework?: string;       // 'react' | 'vue' | 'next' | 'node' | etc.
    packageManager?: 'npm' | 'pnpm' | 'yarn';
    nodeVersion?: string;
  };
}

export interface CommandHistoryEntry {
  command: string;
  timestamp: string;
  output?: string;
  exitCode?: number;
}

export interface PhantomShellState {
  // Terminal
  terminalInstance: XTerm | null;
  isTerminalReady: boolean;

  // WebContainer (Phase 2)
  isWebContainerReady: boolean;
  isWebContainerBooting: boolean;
  webContainerError: string | null;

  // Projects
  projects: Record<string, PhantomProject>;
  activeProjectId: string | null;

  // Command History
  commandHistory: CommandHistoryEntry[];
  historyIndex: number;

  // Dev Server
  devServerUrl: string | null;
  devServerPort: number | null;
  isDevServerRunning: boolean;

  // UI State
  isPanelOpen: boolean;
  showPreview: boolean;
  splitRatio: number;  // 0-100, percentage for terminal vs preview

  // AI Integration
  isAIProcessing: boolean;
  lastAICommand: string | null;
}

export interface PhantomShellActions {
  // Terminal
  setTerminalInstance: (terminal: XTerm | null) => void;
  setTerminalReady: (ready: boolean) => void;
  writeToTerminal: (data: string) => void;
  clearTerminal: () => void;

  // WebContainer
  setWebContainerReady: (ready: boolean) => void;
  setWebContainerBooting: (booting: boolean) => void;
  setWebContainerError: (error: string | null) => void;

  // Projects
  createProject: (project: Omit<PhantomProject, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateProject: (id: string, updates: Partial<PhantomProject>) => void;
  deleteProject: (id: string) => void;
  setActiveProject: (id: string | null) => void;

  // Command History
  addToHistory: (entry: Omit<CommandHistoryEntry, 'timestamp'>) => void;
  navigateHistory: (direction: 'up' | 'down') => string | null;
  clearHistory: () => void;

  // Dev Server
  setDevServer: (url: string | null, port: number | null) => void;
  setDevServerRunning: (running: boolean) => void;

  // UI
  setPanelOpen: (open: boolean) => void;
  togglePanel: () => void;
  setShowPreview: (show: boolean) => void;
  setSplitRatio: (ratio: number) => void;

  // AI
  setAIProcessing: (processing: boolean) => void;
  setLastAICommand: (command: string | null) => void;

  // Utilities
  reset: () => void;
}

// ==================== INITIAL STATE ====================

const initialState: PhantomShellState = {
  terminalInstance: null,
  isTerminalReady: false,

  isWebContainerReady: false,
  isWebContainerBooting: false,
  webContainerError: null,

  projects: {},
  activeProjectId: null,

  commandHistory: [],
  historyIndex: -1,

  devServerUrl: null,
  devServerPort: null,
  isDevServerRunning: false,

  isPanelOpen: false,
  showPreview: false,
  splitRatio: 70,

  isAIProcessing: false,
  lastAICommand: null,
};

// ==================== STORE ====================

export const usePhantomShellStore = create<PhantomShellState & PhantomShellActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Terminal Actions
      setTerminalInstance: (terminal) => {
        set({ terminalInstance: terminal, isTerminalReady: terminal !== null });
      },

      setTerminalReady: (ready) => set({ isTerminalReady: ready }),

      writeToTerminal: (data) => {
        const { terminalInstance } = get();
        if (terminalInstance) {
          terminalInstance.write(data);
        }
      },

      clearTerminal: () => {
        const { terminalInstance } = get();
        if (terminalInstance) {
          terminalInstance.clear();
        }
      },

      // WebContainer Actions
      setWebContainerReady: (ready) => set({ isWebContainerReady: ready }),
      setWebContainerBooting: (booting) => set({ isWebContainerBooting: booting }),
      setWebContainerError: (error) => set({ webContainerError: error }),

      // Project Actions
      createProject: (projectData) => {
        const id = `project-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
        const now = new Date().toISOString();
        const project: PhantomProject = {
          ...projectData,
          id,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          projects: { ...state.projects, [id]: project },
          activeProjectId: id,
        }));

        log.info('Project created', { id, name: project.name });
        return id;
      },

      updateProject: (id, updates) => {
        set((state) => {
          const project = state.projects[id];
          if (!project) {
            log.warn('Project not found for update', { id });
            return state;
          }

          return {
            projects: {
              ...state.projects,
              [id]: {
                ...project,
                ...updates,
                updatedAt: new Date().toISOString(),
              },
            },
          };
        });
      },

      deleteProject: (id) => {
        set((state) => {
          const { [id]: _deleted, ...remaining } = state.projects;
          const newActiveId = state.activeProjectId === id
            ? Object.keys(remaining)[0] || null
            : state.activeProjectId;

          log.info('Project deleted', { id });
          return {
            projects: remaining,
            activeProjectId: newActiveId,
          };
        });
      },

      setActiveProject: (id) => set({ activeProjectId: id }),

      // Command History Actions
      addToHistory: (entry) => {
        set((state) => ({
          commandHistory: [
            ...state.commandHistory.slice(-999), // Keep last 1000 commands
            { ...entry, timestamp: new Date().toISOString() },
          ],
          historyIndex: -1, // Reset history navigation
        }));
      },

      navigateHistory: (direction) => {
        const { commandHistory, historyIndex } = get();
        if (commandHistory.length === 0) return null;

        let newIndex: number;
        if (direction === 'up') {
          newIndex = historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        } else {
          newIndex = historyIndex === -1
            ? -1
            : Math.min(commandHistory.length - 1, historyIndex + 1);
          if (newIndex === commandHistory.length - 1) newIndex = -1;
        }

        set({ historyIndex: newIndex });
        return newIndex === -1 ? null : commandHistory[newIndex]?.command || null;
      },

      clearHistory: () => set({ commandHistory: [], historyIndex: -1 }),

      // Dev Server Actions
      setDevServer: (url, port) => set({ devServerUrl: url, devServerPort: port }),
      setDevServerRunning: (running) => set({ isDevServerRunning: running }),

      // UI Actions
      setPanelOpen: (open) => set({ isPanelOpen: open }),
      togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
      setShowPreview: (show) => set({ showPreview: show }),
      setSplitRatio: (ratio) => set({ splitRatio: Math.max(20, Math.min(80, ratio)) }),

      // AI Actions
      setAIProcessing: (processing) => set({ isAIProcessing: processing }),
      setLastAICommand: (command) => set({ lastAICommand: command }),

      // Reset
      reset: () => {
        const { terminalInstance } = get();
        terminalInstance?.dispose();
        set(initialState);
        log.info('Phantom Shell state reset');
      },
    }),
    {
      name: 'phantom-shell-store',
      storage: createJSONStorage(() => createSyncedStorage()),
      partialize: (state) => ({
        // Only persist these fields (not runtime instances)
        projects: state.projects,
        activeProjectId: state.activeProjectId,
        commandHistory: state.commandHistory.slice(-100), // Only keep last 100 in storage
        isPanelOpen: state.isPanelOpen,
        showPreview: state.showPreview,
        splitRatio: state.splitRatio,
      }),
    }
  )
);

// ==================== SELECTORS ====================

export const selectActiveProject = (state: PhantomShellState): PhantomProject | null => {
  return state.activeProjectId ? state.projects[state.activeProjectId] || null : null;
};

export const selectProjectList = (state: PhantomShellState): PhantomProject[] => {
  return Object.values(state.projects).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
};

export const selectIsReady = (state: PhantomShellState): boolean => {
  return state.isTerminalReady && state.isWebContainerReady;
};
