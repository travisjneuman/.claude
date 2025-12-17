/**
 * Clipboard History Widget
 */

import React, { useState } from 'react';
import { BaseWidget } from './BaseWidget';

export const ClipboardWidget: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && !history.includes(text)) {
        setHistory([text, ...history.slice(0, 9)]);
      }
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  };

  const clearHistory = () => setHistory([]);

  return (
    <BaseWidget title="Clipboard" icon="📋">
      <div className="space-y-3">
        <div className="flex gap-2">
          <button onClick={pasteFromClipboard} className="flex-1 px-4 py-2 bg-accent-blue hover:bg-accent-blue-hover text-white rounded-button text-sm font-medium transition-all duration-standard ease-smooth">
            Save Clipboard
          </button>
          <button onClick={clearHistory} className="px-4 py-2 bg-surface-light-elevated dark:bg-surface-dark hover:bg-surface-light dark:hover:bg-surface-dark-elevated text-text-light-primary dark:text-text-dark-primary rounded-button text-sm font-medium transition-all duration-standard ease-smooth">
            Clear
          </button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {history.map((item, idx) => (
            <button
              key={idx}
              onClick={() => copyToClipboard(item)}
              className="w-full text-left p-2 bg-surface-light-elevated dark:bg-surface-dark rounded-button hover:bg-surface-light dark:hover:bg-surface-dark-elevated transition-all duration-standard ease-smooth"
            >
              <p className="text-sm text-text-light-primary dark:text-text-dark-primary line-clamp-2">
                {item}
              </p>
            </button>
          ))}
        </div>

        {history.length === 0 && (
          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary text-center py-4">
            Click "Save Clipboard" to add items
          </p>
        )}
      </div>
    </BaseWidget>
  );
};
