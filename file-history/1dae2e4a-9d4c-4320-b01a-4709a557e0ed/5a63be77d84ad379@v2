/**
 * Tasks Summary Widget
 *
 * Displays task statistics: Due Today, In Progress, Completed
 * Focused widget for task overview with navigation to full Kanban view
 */

import React from 'react';
import { BaseWidget } from './BaseWidget';
import { useKanbanStore } from '../../stores/useKanbanStore';
import { useNavigate } from 'react-router-dom';

export const TasksSummaryWidget: React.FC = () => {
  const { tasks } = useKanbanStore();
  const navigate = useNavigate();

  // Task statistics
  const dueToday = tasks.filter((t) => {
    if (!t.dueDate) return false;
    const due = new Date(t.dueDate);
    const today = new Date();
    return due.toDateString() === today.toDateString();
  });

  // Count tasks that are in backlog or todo status
  const todo = tasks.filter((t) => t.status === 'todo' || t.status === 'backlog');
  const inProgress = tasks.filter((t) => t.status === 'inprogress' || t.status === 'review');
  const completed = tasks.filter((t) => t.status === 'done');

  return (
    <BaseWidget title="Tasks Summary" icon="📊">
      <div className="flex flex-col h-full min-h-[160px]">
        {/* Task Counts Grid */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-status-warning">
              {dueToday.length}
            </div>
            <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
              Due Today
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-status-info">
              {todo.length}
            </div>
            <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
              To Do
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-blue">
              {inProgress.length}
            </div>
            <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
              In Progress
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-status-success">
              {completed.length}
            </div>
            <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
              Completed
            </div>
          </div>
        </div>

        {/* View All Button - pushed to bottom */}
        <button
          onClick={() => navigate('/tasks')}
          className="w-full mt-auto px-4 py-2.5 bg-accent-blue hover:bg-accent-blue-hover text-white rounded-button transition-all duration-standard ease-smooth text-sm font-medium"
        >
          View All Tasks →
        </button>
      </div>
    </BaseWidget>
  );
};
