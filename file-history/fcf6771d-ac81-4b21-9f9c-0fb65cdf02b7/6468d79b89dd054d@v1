/**
 * FolderContextMenu Component
 *
 * Right-click context menu for folders.
 * Provides quick access to folder operations.
 *
 * Features:
 * - New Subfolder
 * - Rename
 * - Move to (opens folder picker)
 * - Delete
 */

import React, { useEffect, useRef } from 'react';
import { FolderPlus, Edit2, FolderInput, Trash2 } from 'lucide-react';

export interface FolderContextMenuProps {
  x: number;
  y: number;
  folderId: string;
  folderName: string;
  onClose: () => void;
  onCreateSubfolder: (parentId: string) => void;
  onRename: (id: string, currentName: string) => void;
  onMoveTo: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}

export const FolderContextMenu: React.FC<FolderContextMenuProps> = ({
  x,
  y,
  folderId,
  folderName,
  onClose,
  onCreateSubfolder,
  onRename,
  onMoveTo,
  onDelete,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Adjust position to keep menu in viewport
  const adjustedPosition = React.useMemo(() => {
    const menuWidth = 200;
    const menuHeight = 180;
    const padding = 8;

    let adjustedX = x;
    let adjustedY = y;

    // Adjust horizontal position
    if (x + menuWidth > window.innerWidth - padding) {
      adjustedX = window.innerWidth - menuWidth - padding;
    }

    // Adjust vertical position
    if (y + menuHeight > window.innerHeight - padding) {
      adjustedY = window.innerHeight - menuHeight - padding;
    }

    return { x: adjustedX, y: adjustedY };
  }, [x, y]);

  const menuItems = [
    {
      label: 'New Subfolder',
      icon: FolderPlus,
      onClick: () => {
        onCreateSubfolder(folderId);
        onClose();
      },
    },
    {
      label: 'Rename',
      icon: Edit2,
      onClick: () => {
        onRename(folderId, folderName);
        onClose();
      },
    },
    {
      label: 'Move to...',
      icon: FolderInput,
      onClick: () => {
        onMoveTo(folderId);
        onClose();
      },
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: () => {
        onDelete(folderId, folderName);
        onClose();
      },
      danger: true,
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-[180px] py-1 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg"
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y,
      }}
      role="menu"
      aria-label="Folder context menu"
    >
      {menuItems.map((item) => (
        <button
          key={item.label}
          onClick={item.onClick}
          className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
            item.danger
              ? 'text-accent-red hover:bg-accent-red/10 dark:hover:bg-accent-red/20'
              : 'text-text-light-primary dark:text-text-dark-primary hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated'
          }`}
          role="menuitem"
        >
          <item.icon className="w-4 h-4" />
          {item.label}
        </button>
      ))}
    </div>
  );
};
