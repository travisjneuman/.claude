/**
 * Twitch Streamers Widget
 * Track your favorite Twitch streamers
 */

import React, { useState } from 'react';
import { BaseWidget } from './BaseWidget';
import { useWidgetStore } from '../../stores/useWidgetStore';

interface TwitchWidgetProps {
  widgetId?: string;
}

export const TwitchWidget: React.FC<TwitchWidgetProps> = ({ widgetId = 'twitch' }) => {
  const streamers = useWidgetStore((state) => state.widgetSettings[widgetId]?.streamers) || [];
  const updateWidgetSettings = useWidgetStore((state) => state.updateWidgetSettings);
  const [input, setInput] = useState('');

  const addStreamer = () => {
    if (input.trim()) {
      updateWidgetSettings(widgetId, { streamers: [...streamers, input.trim()] });
      setInput('');
    }
  };

  const removeStreamer = (streamer: string) => {
    updateWidgetSettings(widgetId, { streamers: streamers.filter((s: string) => s !== streamer) });
  };

  return (
    <BaseWidget title="Twitch" icon="🎮">
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addStreamer()}
            placeholder="Streamer name..."
            className="flex-1 px-3 py-2 text-sm rounded-button bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue transition-all duration-standard ease-smooth"
          />
          <button onClick={addStreamer} className="px-4 py-2 bg-accent-blue hover:bg-accent-blue-hover text-white rounded-button text-sm font-medium transition-all duration-standard ease-smooth">
            Add
          </button>
        </div>

        <div className="space-y-2">
          {streamers.map((streamer: string, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-surface-light-elevated dark:bg-surface-dark rounded-button transition-all duration-standard ease-smooth">
              <a href={`https://twitch.tv/${streamer}`} target="_blank" rel="noopener noreferrer" className="text-sm text-text-light-primary dark:text-text-dark-primary hover:text-accent-blue">
                {streamer}
              </a>
              <button onClick={() => removeStreamer(streamer)} className="text-xs text-status-error hover:underline">
                Remove
              </button>
            </div>
          ))}
        </div>

        {streamers.length === 0 && (
          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary text-center py-4">
            Add streamers to track
          </p>
        )}
      </div>
    </BaseWidget>
  );
};
