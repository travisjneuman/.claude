/**
 * Import types for migrating data from competing productivity tools
 */

export type ImportSource =
  | 'trello'
  | 'asana'
  | 'todoist'
  | 'clickup'
  | 'monday'
  | 'notion'
  | 'generic-json'
  | 'generic-csv';

export interface ImportTask {
  title: string;
  description?: string;
  dueDate?: string; // YYYY-MM-DD
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  status?: 'backlog' | 'todo' | 'inprogress' | 'review' | 'done';
  completed?: boolean;
  // Optional fields from some platforms
  estimatedHours?: number;
  progress?: number;
  checklist?: Array<{ text: string; completed: boolean }>;
}

export interface ImportResult {
  success: boolean;
  tasksImported: number;
  tagsCreated: string[];
  errors: string[];
  warnings: string[];
}

export interface ImportPreview {
  source: ImportSource;
  taskCount: number;
  sample: ImportTask[]; // First 10 tasks
  newTags: string[]; // Tags that don't exist yet
  warnings: string[];
}
