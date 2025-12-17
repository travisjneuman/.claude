/**
 * Task Summary Widget
 *
 * Shows overview of tasks: due today, in progress, completed
 */

import React from 'react';
import { BaseWidget } from './BaseWidget';
import { useKanbanStore } from '../../stores/useKanbanStore';
import { useNavigate } from 'react-router-dom';

export const TaskSummaryWidget: React.FC = () => {
  const { tasks } = useKanbanStore();
  const navigate = useNavigate();

  const dueToday = tasks.filter((t) => {
    if (!t.dueDate) return false;
    const due = new Date(t.dueDate);
    const today = new Date();
    return due.toDateString() === today.toDateString();
  });

  const inProgress = tasks.filter((t) => t.status === 'inprogress');
  const completed = tasks.filter((t) => t.status === 'done');

  return (
    <BaseWidget title="Tasks" icon="✅">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-3xl font-bold text-status-warning">{dueToday.length}</div>
            <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Due Today</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-blue">{inProgress.length}</div>
            <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">In Progress</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-status-success">{completed.length}</div>
            <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Completed</div>
          </div>
        </div>
        <button
          onClick={() => navigate('/tasks')}
          className="w-full px-4 py-2 bg-accent-blue hover:bg-accent-blue-hover text-white rounded-button font-medium transition-all duration-standard ease-smooth"
        >
          View All Tasks →
        </button>
      </div>
    </BaseWidget>
  );
};
