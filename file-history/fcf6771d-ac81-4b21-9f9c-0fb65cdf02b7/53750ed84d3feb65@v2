import React, { useState } from 'react';
import { useAutomationStore } from '../../stores/useAutomationStore';
import type {
  AutomationTriggerType,
  AutomationActionType,
} from '../../types/automation';
import { toast } from '../../stores/useToastStore';

interface RuleBuilderProps {
  onClose: () => void;
}

export const RuleBuilder: React.FC<RuleBuilderProps> = ({ onClose }) => {
  const { addRule } = useAutomationStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [triggerType, setTriggerType] = useState<AutomationTriggerType>('task.created');
  const [actionType, setActionType] = useState<AutomationActionType>('move_task');
  const [actionConfig, setActionConfig] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.warning('Please enter a rule name');
      return;
    }

    addRule({
      name: name.trim(),
      description: description.trim() || undefined,
      trigger: { type: triggerType },
      conditions: [], // MVP: No conditions yet
      actions: [
        {
          type: actionType,
          config: actionConfig,
        },
      ],
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
          Rule Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Auto-archive completed tasks"
          className="w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description..."
          rows={2}
          className="w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue outline-none resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
          When (Trigger) *
        </label>
        <select
          value={triggerType}
          onChange={(e) => setTriggerType(e.target.value as AutomationTriggerType)}
          className="w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue outline-none"
        >
          <option value="task.created">Task is created</option>
          <option value="task.moved">Task is moved</option>
          <option value="task.completed">Task is completed</option>
          <option value="task.updated">Task is updated</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
          Then (Action) *
        </label>
        <select
          value={actionType}
          onChange={(e) => {
            setActionType(e.target.value as AutomationActionType);
            setActionConfig({}); // Reset config when action changes
          }}
          className="w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue outline-none"
        >
          <option value="move_task">Move task to status</option>
          <option value="set_priority">Set priority</option>
          <option value="add_tag">Add tag</option>
          <option value="remove_tag">Remove tag</option>
          <option value="add_comment">Add comment</option>
          <option value="archive">Archive task</option>
        </select>
      </div>

      {/* Action Configuration */}
      {actionType === 'move_task' && (
        <div>
          <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
            Move to Status
          </label>
          <select
            value={actionConfig.status || ''}
            onChange={(e) => setActionConfig({ status: e.target.value })}
            className="w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue outline-none"
          >
            <option value="">Select status...</option>
            <option value="backlog">Backlog</option>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="review">In Review</option>
            <option value="done">Done</option>
          </select>
        </div>
      )}

      {actionType === 'set_priority' && (
        <div>
          <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
            Set Priority
          </label>
          <select
            value={actionConfig.priority || ''}
            onChange={(e) => setActionConfig({ priority: e.target.value })}
            className="w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue outline-none"
          >
            <option value="">Select priority...</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      )}

      {(actionType === 'add_tag' || actionType === 'remove_tag') && (
        <div>
          <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
            Tag
          </label>
          <input
            type="text"
            value={actionConfig.tag || ''}
            onChange={(e) => setActionConfig({ tag: e.target.value })}
            placeholder="e.g., urgent"
            className="w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue outline-none"
          />
        </div>
      )}

      {actionType === 'add_comment' && (
        <div>
          <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2">
            Comment Text
          </label>
          <textarea
            value={actionConfig.text || ''}
            onChange={(e) => setActionConfig({ text: e.target.value })}
            placeholder="e.g., Automatically moved by automation"
            rows={2}
            className="w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue outline-none resize-none"
          />
        </div>
      )}

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-accent-blue text-white text-sm font-medium rounded-lg hover:bg-accent-blue/90 transition-colors"
        >
          Create Rule
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-surface-light-elevated dark:bg-surface-dark-elevated text-text-light-primary dark:text-text-dark-primary text-sm font-medium rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
