import { createContext, useContext } from 'react';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { useSortable } from '@dnd-kit/sortable';

/**
 * Context to pass drag listeners to child components (Widget header)
 * This allows the Widget header to be the drag handle without icons
 */
export interface DragContextValue {
  attributes: ReturnType<typeof useSortable>['attributes'];
  listeners: SyntheticListenerMap | undefined;
  isDragging: boolean;
}

export const DragContext = createContext<DragContextValue | null>(null);

/**
 * Hook for child components to access drag functionality
 * Used by Widget component to make its header draggable
 */
export const useDragHandle = () => useContext(DragContext);
