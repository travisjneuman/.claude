import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DailyNotesSettings } from '../services/dailyNotes';
import { DEFAULT_DAILY_NOTES_SETTINGS } from '../services/dailyNotes';
import type { FieldDefinition } from '../types/customFields';
import type { Member } from '../types';
import { nanoid } from 'nanoid';

export type TimeFormat = '12h' | '24h';
export type TemperatureUnit = 'fahrenheit' | 'celsius';

// Notes Layout Preferences (Notes Page Revolution)
export type NotesViewMode = 'split' | 'editor-only' | 'list-only';
export type NotesLayoutStyle = 'three-column' | 'file-tree' | 'tabbed-sidebar';

export interface NotesLayoutSettings {
  viewMode: NotesViewMode;
  layoutStyle: NotesLayoutStyle; // User's preferred layout architecture
  sidebarWidth: number;          // 200-500px (for single sidebar layouts)
  folderPaneWidth: number;       // 200-400px (for three-column: folders column)
  notesPaneWidth: number;        // 250-500px (for three-column: notes list column)
  folderPaneHeight: number;      // 20-80 (percentage, for stacked folder/notes)
}

export interface CustomFieldDefinitions {
  tasks: FieldDefinition[];
  notes: FieldDefinition[];
}

export interface PomodoroSettings {
  focusDuration: number;       // Minutes (default: 25)
  shortBreakDuration: number;  // Minutes (default: 5)
  longBreakDuration: number;   // Minutes (default: 15)
  sessionsUntilLongBreak: number; // Default: 4
  autoStartBreaks: boolean;    // Auto-start break timer
  autoStartFocus: boolean;     // Auto-start next focus after break
  soundEnabled: boolean;       // Play sound on timer end
  notificationsEnabled: boolean; // Show desktop notifications
}

export interface AutoTrackingSettings {
  enabled: boolean;            // Enable automatic time tracking
  autoStartThreshold: number;  // Seconds of context stability before auto-tracking
  autoStopOnIdle: boolean;     // Stop timer when idle detected
}

export type CelebrationIntensity = 'off' | 'subtle' | 'medium' | 'intense';

export interface CelebrationSettings {
  celebrationIntensity: CelebrationIntensity; // Animation intensity
  showAchievements: boolean;   // Show achievement banners
  playSound: boolean;          // Play sound effects (opt-in)
  soundVolume: number;         // 0-100
}

export interface RecentCommand {
  id: string;        // Command ID
  name: string;      // Display name
  icon: string;      // Icon emoji
  executedAt: string; // ISO timestamp
}

export interface CommandPaletteSettings {
  preferredSearchEngine: string; // ID of preferred external search engine
  recentCommands: RecentCommand[]; // Last 5 executed commands
}

export interface SettingsState {
  // User Profile
  displayName: string;
  email: string;

  // Display preferences
  timeFormat: TimeFormat;
  temperatureUnit: TemperatureUnit;

  // Daily Notes
  dailyNotes: DailyNotesSettings;

  // Custom Fields (P2 #3)
  customFieldDefinitions: CustomFieldDefinitions;

  // Pomodoro Timer (P2)
  pomodoroSettings: PomodoroSettings;

  // Automatic Time Tracking (P2)
  autoTrackingSettings: AutoTrackingSettings;

  // Celebration Settings (Phase 2 Quick Wins)
  celebrationSettings: CelebrationSettings;

  // Task Management (Phase 1.2)
  autoShiftDependentTasks: boolean; // Auto-shift dependent tasks when dates change

  // Kanban WIP Limits (Phase 3.3)
  enforceWipLimits: boolean; // Enforce WIP limits strictly (prevent moves vs warnings)

  // Team Members (Phase 3.1)
  members: Member[];

  // People List (P2 - for Person custom field type)
  peopleList: string[]; // Simple list of person names for autocomplete

  // Tag Colors (P2 - Tags feature)
  tagColors: Record<string, string>; // tag name → color (semantic token)

  // Onboarding (Phase 1.3)
  onboardingComplete: boolean; // First-time onboarding completed

  // Natural Language Date Shortcuts (Phase 2 Quick Wins)
  enableDateShortcuts: boolean; // Enable @tomorrow, +3d shortcuts

  // Synapse Settings (neural search interface)
  commandPalette: CommandPaletteSettings;

  // Notes Layout Settings (Notes Page Revolution)
  notesLayout: NotesLayoutSettings;

  // Actions
  setDisplayName: (name: string) => void;
  setEmail: (email: string) => void;
  setTimeFormat: (format: TimeFormat) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setDailyNotesSettings: (settings: Partial<DailyNotesSettings>) => void;
  setAutoShiftDependentTasks: (enabled: boolean) => void;
  setEnforceWipLimits: (enabled: boolean) => void;
  setOnboardingComplete: (complete: boolean) => void;
  setEnableDateShortcuts: (enabled: boolean) => void;

  // Tag color actions (P2)
  setTagColor: (tag: string, color: string) => void;
  removeTagColor: (tag: string) => void;

  // Pomodoro settings actions
  setPomodoroSettings: (settings: Partial<PomodoroSettings>) => void;

  // Auto-tracking settings actions
  setAutoTrackingSettings: (settings: Partial<AutoTrackingSettings>) => void;

  // Celebration settings actions
  setCelebrationSettings: (settings: Partial<CelebrationSettings>) => void;

  // Custom field actions
  addFieldDefinition: (target: 'tasks' | 'notes', field: Omit<FieldDefinition, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFieldDefinition: (target: 'tasks' | 'notes', fieldId: string, changes: Partial<FieldDefinition>) => void;
  deleteFieldDefinition: (target: 'tasks' | 'notes', fieldId: string) => void;

  // Member actions
  addMember: (member: Omit<Member, 'id' | 'createdAt'>) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  deleteMember: (id: string) => void;

  // People list actions (P2)
  addPerson: (name: string) => void;
  removePerson: (name: string) => void;
  updatePerson: (oldName: string, newName: string) => void;

  // Command palette actions
  setCommandPaletteSettings: (settings: Partial<CommandPaletteSettings>) => void;
  addRecentCommand: (command: Omit<RecentCommand, 'executedAt'>) => void;
  clearRecentCommands: () => void;

  // Notes layout actions
  setNotesLayout: (settings: Partial<NotesLayoutSettings>) => void;
}

/**
 * Global Settings Store
 *
 * Persisted user preferences for:
 * - Time format (12h/24h)
 * - Temperature unit (F/C)
 * - Daily notes configuration
 *
 * Used by:
 * - HeaderClock component
 * - Weather widgets (WeatherMap, Weather, WeatherForecast)
 * - TimeTracking page (if applicable)
 * - Daily notes feature (Notes page, Sidebar)
 */
const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
  soundEnabled: true,
  notificationsEnabled: true,
};

const DEFAULT_AUTO_TRACKING_SETTINGS: AutoTrackingSettings = {
  enabled: false,
  autoStartThreshold: 30, // 30 seconds
  autoStopOnIdle: true,
};

const DEFAULT_CELEBRATION_SETTINGS: CelebrationSettings = {
  celebrationIntensity: 'medium',
  showAchievements: true,
  playSound: false, // Opt-in (default: off)
  soundVolume: 50,  // 0-100
};

const DEFAULT_COMMAND_PALETTE_SETTINGS: CommandPaletteSettings = {
  preferredSearchEngine: 'google', // Default to Google
  recentCommands: [], // No recent commands initially
};

const DEFAULT_NOTES_LAYOUT_SETTINGS: NotesLayoutSettings = {
  viewMode: 'split',           // Default: show sidebar + editor
  layoutStyle: 'file-tree',    // Default: Obsidian/VS Code style
  sidebarWidth: 280,           // Default: 280px (for file-tree and tabbed layouts)
  folderPaneWidth: 220,        // Default: 220px (folders column in three-column)
  notesPaneWidth: 300,         // Default: 300px (notes list column in three-column)
  folderPaneHeight: 40,        // Default: 40% for folder pane (tabbed layout)
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // User Profile (defaults)
      displayName: '',
      email: '',

      // Default: 12-hour time, Fahrenheit
      timeFormat: '12h',
      temperatureUnit: 'fahrenheit',
      dailyNotes: DEFAULT_DAILY_NOTES_SETTINGS,
      customFieldDefinitions: {
        tasks: [],
        notes: [],
      },
      pomodoroSettings: DEFAULT_POMODORO_SETTINGS,
      autoTrackingSettings: DEFAULT_AUTO_TRACKING_SETTINGS,
      celebrationSettings: DEFAULT_CELEBRATION_SETTINGS,
      autoShiftDependentTasks: true, // Default: enabled
      enforceWipLimits: false, // Default: soft limits (warnings only)
      members: [], // Default: no members
      peopleList: [], // Default: no people
      tagColors: {}, // Default: no tag colors
      onboardingComplete: false, // Default: show onboarding for new users
      enableDateShortcuts: true, // Default: enabled (opt-out)
      commandPalette: DEFAULT_COMMAND_PALETTE_SETTINGS,
      notesLayout: DEFAULT_NOTES_LAYOUT_SETTINGS,

      setDisplayName: (name) => set({ displayName: name }),
      setEmail: (email) => set({ email: email }),
      setTimeFormat: (format) => set({ timeFormat: format }),
      setTemperatureUnit: (unit) => set({ temperatureUnit: unit }),
      setDailyNotesSettings: (settings) =>
        set((state) => ({
          dailyNotes: { ...state.dailyNotes, ...settings },
        })),
      setAutoShiftDependentTasks: (enabled) => set({ autoShiftDependentTasks: enabled }),
      setEnforceWipLimits: (enabled) => set({ enforceWipLimits: enabled }),
      setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),
      setEnableDateShortcuts: (enabled) => set({ enableDateShortcuts: enabled }),

      // Pomodoro settings
      setPomodoroSettings: (settings) =>
        set((state) => ({
          pomodoroSettings: { ...state.pomodoroSettings, ...settings },
        })),

      // Auto-tracking settings
      setAutoTrackingSettings: (settings) =>
        set((state) => ({
          autoTrackingSettings: { ...state.autoTrackingSettings, ...settings },
        })),

      // Celebration settings
      setCelebrationSettings: (settings) =>
        set((state) => ({
          celebrationSettings: { ...state.celebrationSettings, ...settings },
        })),

      // Custom field management
      addFieldDefinition: (target, field) =>
        set((state) => {
          const now = new Date();
          const newField: FieldDefinition = {
            ...field,
            id: nanoid(),
            createdAt: now,
            updatedAt: now,
          };

          return {
            customFieldDefinitions: {
              ...state.customFieldDefinitions,
              [target]: [...state.customFieldDefinitions[target], newField],
            },
          };
        }),

      updateFieldDefinition: (target, fieldId, changes) =>
        set((state) => ({
          customFieldDefinitions: {
            ...state.customFieldDefinitions,
            [target]: state.customFieldDefinitions[target].map((field) =>
              field.id === fieldId
                ? { ...field, ...changes, updatedAt: new Date() }
                : field
            ),
          },
        })),

      deleteFieldDefinition: (target, fieldId) =>
        set((state) => ({
          customFieldDefinitions: {
            ...state.customFieldDefinitions,
            [target]: state.customFieldDefinitions[target].filter(
              (field) => field.id !== fieldId
            ),
          },
        })),

      // Member management
      addMember: (member) =>
        set((state) => {
          const newMember: Member = {
            ...member,
            id: nanoid(),
            createdAt: new Date().toISOString(),
          };
          return { members: [...state.members, newMember] };
        }),

      updateMember: (id, updates) =>
        set((state) => ({
          members: state.members.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        })),

      deleteMember: (id) =>
        set((state) => ({
          members: state.members.filter((m) => m.id !== id),
        })),

      // People list management (P2)
      addPerson: (name) =>
        set((state) => {
          // Prevent duplicates
          if (state.peopleList.includes(name)) {
            return state;
          }
          return { peopleList: [...state.peopleList, name] };
        }),

      removePerson: (name) =>
        set((state) => ({
          peopleList: state.peopleList.filter((p) => p !== name),
        })),

      updatePerson: (oldName, newName) =>
        set((state) => ({
          peopleList: state.peopleList.map((p) => (p === oldName ? newName : p)),
        })),

      // Tag color actions (P2)
      setTagColor: (tag, color) =>
        set((state) => ({
          tagColors: { ...state.tagColors, [tag]: color },
        })),

      removeTagColor: (tag) =>
        set((state) => {
          const { [tag]: removed, ...rest } = state.tagColors;
          return { tagColors: rest };
        }),

      // Command palette settings
      setCommandPaletteSettings: (settings) =>
        set((state) => ({
          commandPalette: { ...state.commandPalette, ...settings },
        })),

      addRecentCommand: (command) =>
        set((state) => {
          const newCommand: RecentCommand = {
            ...command,
            executedAt: new Date().toISOString(),
          };

          // Remove existing entry for this command (to move it to top)
          const filtered = (state.commandPalette.recentCommands || []).filter(
            (c) => c.id !== command.id
          );

          // Add to front, limit to 5
          const updated = [newCommand, ...filtered].slice(0, 5);

          return {
            commandPalette: {
              ...state.commandPalette,
              recentCommands: updated,
            },
          };
        }),

      clearRecentCommands: () =>
        set((state) => ({
          commandPalette: {
            ...state.commandPalette,
            recentCommands: [],
          },
        })),

      // Notes layout settings
      setNotesLayout: (settings) =>
        set((state) => ({
          notesLayout: { ...state.notesLayout, ...settings },
        })),
    }),
    {
      name: 'settings-storage',
    }
  )
);

/**
 * Helper functions for formatting
 */

/**
 * Format temperature with unit
 */
export function formatTemperature(
  tempF: number,
  unit: TemperatureUnit,
  showUnit = true
): string {
  if (unit === 'celsius') {
    const tempC = Math.round((tempF - 32) * (5 / 9));
    return showUnit ? `${tempC}°C` : `${tempC}°`;
  }
  return showUnit ? `${tempF}°F` : `${tempF}°`;
}

/**
 * Format time with format preference
 */
export function formatTime(date: Date, format: TimeFormat): string {
  if (format === '24h') {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
