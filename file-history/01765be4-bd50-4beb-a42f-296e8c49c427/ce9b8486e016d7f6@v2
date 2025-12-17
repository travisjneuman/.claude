import { useEffect, useState, useCallback } from 'react';
import type { Task } from '../types';

interface KeyboardState {
  selectedColumn: number;
  selectedTaskIndex: number;
  showHelp: boolean;
  pendingDeleteTask: Task | null;
}

interface UseKanbanKeyboardProps {
  columns: string[]; // Changed from TaskStatus[] to support dynamic columns
  tasks: Task[];
  onAddTask: (column: string) => void; // Changed from TaskStatus to string
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

/**
 * Custom hook for Kanban keyboard shortcuts
 *
 * Shortcuts:
 * - N: New task in current column
 * - J/K: Navigate down/up through tasks
 * - H/L: Navigate left/right through columns
 * - E: Edit selected task
 * - D: Delete selected task
 * - ?: Toggle keyboard shortcuts help
 * - Escape: Clear selection
 */
export const useKanbanKeyboard = ({
  columns,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: UseKanbanKeyboardProps) => {
  const [state, setState] = useState<KeyboardState>({
    selectedColumn: 0,
    selectedTaskIndex: -1,
    showHelp: false,
    pendingDeleteTask: null,
  });

  // Get tasks for current column
  const getColumnTasks = useCallback(
    (columnIndex: number) => {
      const status = columns[columnIndex];
      return tasks.filter((task) => task.status === status);
    },
    [columns, tasks]
  );

  // Get currently selected task
  const getSelectedTask = useCallback(() => {
    const columnTasks = getColumnTasks(state.selectedColumn);
    return columnTasks[state.selectedTaskIndex] || null;
  }, [state.selectedColumn, state.selectedTaskIndex, getColumnTasks]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const columnTasks = getColumnTasks(state.selectedColumn);

      switch (e.key.toLowerCase()) {
        case 'n':
          // New task in current column
          e.preventDefault();
          onAddTask(columns[state.selectedColumn]);
          break;

        case 'j':
          // Navigate down
          e.preventDefault();
          if (state.selectedTaskIndex < columnTasks.length - 1) {
            setState((prev) => ({
              ...prev,
              selectedTaskIndex: prev.selectedTaskIndex + 1,
            }));
          }
          break;

        case 'k':
          // Navigate up
          e.preventDefault();
          if (state.selectedTaskIndex > 0) {
            setState((prev) => ({
              ...prev,
              selectedTaskIndex: prev.selectedTaskIndex - 1,
            }));
          } else if (state.selectedTaskIndex === -1 && columnTasks.length > 0) {
            // If no task selected, select first task
            setState((prev) => ({ ...prev, selectedTaskIndex: 0 }));
          }
          break;

        case 'h':
          // Navigate left (previous column)
          e.preventDefault();
          if (state.selectedColumn > 0) {
            const newColumn = state.selectedColumn - 1;
            const newColumnTasks = getColumnTasks(newColumn);
            setState((prev) => ({
              ...prev,
              selectedColumn: newColumn,
              selectedTaskIndex: newColumnTasks.length > 0 ? 0 : -1,
            }));
          }
          break;

        case 'l':
          // Navigate right (next column)
          e.preventDefault();
          if (state.selectedColumn < columns.length - 1) {
            const newColumn = state.selectedColumn + 1;
            const newColumnTasks = getColumnTasks(newColumn);
            setState((prev) => ({
              ...prev,
              selectedColumn: newColumn,
              selectedTaskIndex: newColumnTasks.length > 0 ? 0 : -1,
            }));
          }
          break;

        case 'e':
          // Edit selected task
          e.preventDefault();
          const taskToEdit = getSelectedTask();
          if (taskToEdit) {
            onEditTask(taskToEdit);
          }
          break;

        case 'd':
          // Delete selected task - show confirm dialog
          e.preventDefault();
          const taskToDelete = getSelectedTask();
          if (taskToDelete) {
            setState((prev) => ({
              ...prev,
              pendingDeleteTask: taskToDelete,
            }));
          }
          break;

        case '?':
          // Toggle help
          e.preventDefault();
          setState((prev) => ({ ...prev, showHelp: !prev.showHelp }));
          break;

        case 'escape':
          // Clear selection / close help / cancel pending delete
          e.preventDefault();
          setState((prev) => ({
            ...prev,
            selectedTaskIndex: -1,
            showHelp: false,
            pendingDeleteTask: null,
          }));
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    state.selectedColumn,
    state.selectedTaskIndex,
    columns,
    getColumnTasks,
    getSelectedTask,
    onAddTask,
    onEditTask,
    onDeleteTask,
  ]);

  // Confirm delete callback
  const confirmDelete = useCallback(() => {
    if (state.pendingDeleteTask) {
      onDeleteTask(state.pendingDeleteTask.id);
      setState((prev) => ({
        ...prev,
        pendingDeleteTask: null,
        selectedTaskIndex: Math.max(0, prev.selectedTaskIndex - 1),
      }));
    }
  }, [state.pendingDeleteTask, onDeleteTask]);

  // Cancel delete callback
  const cancelDelete = useCallback(() => {
    setState((prev) => ({ ...prev, pendingDeleteTask: null }));
  }, []);

  return {
    selectedColumn: state.selectedColumn,
    selectedTaskIndex: state.selectedTaskIndex,
    selectedTaskId: getSelectedTask()?.id,
    showHelp: state.showHelp,
    closeHelp: () => setState((prev) => ({ ...prev, showHelp: false })),
    pendingDeleteTask: state.pendingDeleteTask,
    confirmDelete,
    cancelDelete,
  };
};
