/**
 * Tab Manager Widget
 * Manage browser tabs and quick links
 */

import React, { useState } from 'react';
import { BaseWidget } from './BaseWidget';
import { useWidgetStore } from '../../stores/useWidgetStore';

interface TabManagerWidgetProps {
  widgetId?: string;
}

export const TabManagerWidget: React.FC<TabManagerWidgetProps> = ({ widgetId = 'tabmanager' }) => {
  const tabs = useWidgetStore((state) => state.widgetSettings[widgetId]?.tabs) || [];
  const updateWidgetSettings = useWidgetStore((state) => state.updateWidgetSettings);
  const [input, setInput] = useState({ name: '', url: '' });

  const addTab = () => {
    if (input.name.trim() && input.url.trim()) {
      updateWidgetSettings(widgetId, { tabs: [...tabs, input] });
      setInput({ name: '', url: '' });
    }
  };

  const removeTab = (idx: number) => {
    updateWidgetSettings(widgetId, { tabs: tabs.filter((_: any, i: number) => i !== idx) });
  };

  return (
    <BaseWidget title="Tab Manager" icon="🗂️">
      <div className="space-y-3">
        <div className="space-y-2">
          <input
            type="text"
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
            placeholder="Tab name..."
            className="w-full px-3 py-2 text-sm rounded-button bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue transition-all duration-standard ease-smooth"
          />
          <div className="flex gap-2">
            <input
              type="url"
              value={input.url}
              onChange={(e) => setInput({ ...input, url: e.target.value })}
              placeholder="URL..."
              className="flex-1 px-3 py-2 text-sm rounded-button bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue transition-all duration-standard ease-smooth"
            />
            <button onClick={addTab} className="px-4 py-2 bg-accent-blue hover:bg-accent-blue-hover text-white rounded-button text-sm font-medium transition-all duration-standard ease-smooth">
              Add
            </button>
          </div>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {tabs.map((tab: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-surface-light-elevated dark:bg-surface-dark rounded-button transition-all duration-standard ease-smooth">
              <a href={tab.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-sm text-text-light-primary dark:text-text-dark-primary hover:text-accent-blue truncate">
                {tab.name}
              </a>
              <button onClick={() => removeTab(idx)} className="text-xs text-status-error hover:underline ml-2">
                Remove
              </button>
            </div>
          ))}
        </div>

        {tabs.length === 0 && (
          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary text-center py-4">
            Add quick links to manage
          </p>
        )}
      </div>
    </BaseWidget>
  );
};
