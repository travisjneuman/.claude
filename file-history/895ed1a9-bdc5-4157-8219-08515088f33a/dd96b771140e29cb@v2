import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragContext, type DragContextValue } from '../hooks/useDragHandle';

interface SortableWidgetProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component to make dashboard widgets sortable via drag-drop
 * Uses @dnd-kit for drag-drop functionality
 *
 * Features:
 * - Entire widget header is draggable (cursor changes to grab hand)
 * - No visible icon - cursor change is the only indicator
 * - Visual feedback during drag (opacity change)
 * - Accessible keyboard support
 *
 * Note: Resize is handled via Widget Manager modal, not hover buttons
 */
export const SortableWidget: React.FC<SortableWidgetProps> = ({ id, children, className = '' }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Provide drag context to children (Widget header will consume this)
  const dragContext: DragContextValue = {
    attributes,
    listeners,
    isDragging,
  };

  return (
    <DragContext.Provider value={dragContext}>
      <div
        ref={setNodeRef}
        style={style}
        className={`sortable-widget relative group ${className}`}
      >
        {/* Widget Content - drag is handled by Widget header via context */}
        {children}
      </div>
    </DragContext.Provider>
  );
};
