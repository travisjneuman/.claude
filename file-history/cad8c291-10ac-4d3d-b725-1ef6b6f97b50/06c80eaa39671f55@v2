import { useEffect } from 'react';

interface UseEscapeKeyOptions {
  enabled: boolean;        // Is ESC handling enabled?
  onEscape: () => void;    // Callback when ESC pressed
  priority?: number;       // z-index priority (higher = first)
}

/**
 * Custom hook for handling ESC key with priority system
 *
 * Prevents multiple ESC handlers from conflicting by using capture phase
 * and a priority system based on z-index values.
 *
 * @example
 * // Modal with high priority (z-50)
 * useEscapeKey({ enabled: isOpen, onEscape: onClose, priority: 50 });
 *
 * // AI Terminal with medium priority (z-40)
 * useEscapeKey({ enabled: isOpen, onEscape: onClose, priority: 40 });
 */
export function useEscapeKey({ enabled, onEscape, priority = 0 }: UseEscapeKeyOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Early return if event was already processed
        if (e.defaultPrevented) return;

        // Check if a higher priority handler already processed this event
        const currentPriority = (e as any)._escPriority || -1;

        if (priority > currentPriority) {  // ✅ Only strictly higher priority wins
          // Mark this priority on the event
          (e as any)._escPriority = priority;

          // Stop event from reaching lower priority handlers
          e.stopPropagation();
          e.preventDefault();

          // Execute callback
          onEscape();
        }
      }
    };

    // Use capture phase to handle event before it bubbles
    document.addEventListener('keydown', handleEscape, { capture: true });
    return () => document.removeEventListener('keydown', handleEscape, { capture: true });
  }, [enabled, onEscape, priority]);
}
