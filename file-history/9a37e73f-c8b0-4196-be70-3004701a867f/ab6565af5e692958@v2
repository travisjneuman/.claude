/**
 * YouTube Channel Stats Widget
 */

import React, { useState } from 'react';
import { BaseWidget } from './BaseWidget';
import { useWidgetStore } from '../../stores/useWidgetStore';

interface YouTubeWidgetProps {
  widgetId?: string;
}

export const YouTubeWidget: React.FC<YouTubeWidgetProps> = ({ widgetId = 'youtube' }) => {
  const channels = useWidgetStore((state) => state.widgetSettings[widgetId]?.channels) || [];
  const updateWidgetSettings = useWidgetStore((state) => state.updateWidgetSettings);
  const [input, setInput] = useState('');

  const addChannel = () => {
    if (input.trim()) {
      updateWidgetSettings(widgetId, { channels: [...channels, input.trim()] });
      setInput('');
    }
  };

  const removeChannel = (channel: string) => {
    updateWidgetSettings(widgetId, { channels: channels.filter((c: string) => c !== channel) });
  };

  return (
    <BaseWidget title="YouTube" icon="📺">
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addChannel()}
            placeholder="@channelname"
            className="flex-1 px-3 py-2 text-sm rounded-button bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue transition-all duration-standard ease-smooth"
          />
          <button onClick={addChannel} className="px-4 py-2 bg-accent-blue hover:bg-accent-blue-hover text-white rounded-button text-sm font-medium transition-all duration-standard ease-smooth">
            Add
          </button>
        </div>

        <div className="space-y-2">
          {channels.map((channel: string, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-surface-light-elevated dark:bg-surface-dark rounded-button transition-all duration-standard ease-smooth">
              <a href={`https://youtube.com/${channel}`} target="_blank" rel="noopener noreferrer" className="text-sm text-text-light-primary dark:text-text-dark-primary hover:text-accent-blue">
                {channel}
              </a>
              <button onClick={() => removeChannel(channel)} className="text-xs text-status-error hover:underline">
                Remove
              </button>
            </div>
          ))}
        </div>

        {channels.length === 0 && (
          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary text-center py-4">
            Add YouTube channels to track
          </p>
        )}
      </div>
    </BaseWidget>
  );
};
