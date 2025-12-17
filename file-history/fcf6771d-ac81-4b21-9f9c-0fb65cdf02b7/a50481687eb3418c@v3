/**
 * NotesLayout Component
 *
 * Main layout router for the Notes page.
 * Part of the Notes Page Revolution.
 *
 * Features:
 * - Routes between 3 layout styles based on user preference
 * - Three-column (Apple Notes/Bear style)
 * - File tree (Obsidian/VS Code style)
 * - Tabbed sidebar (Notion style)
 * - Mobile drawer fallback for all layouts
 * - Keyboard shortcuts for layout switching
 */

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSettingsStore, type NotesLayoutStyle } from '../../stores/useSettingsStore';
import { ThreeColumnLayout } from './ThreeColumnLayout';
import { FileTreeLayout } from './FileTreeLayout';
import { TabbedSidebarLayout } from './TabbedSidebarLayout';
import { LayoutSwitcher } from './LayoutSwitcher';
import { FolderSidebar } from './FolderSidebar';
import { NotesList } from './NotesList';

export interface NotesLayoutProps {
  /** Content to render in the editor pane */
  children: React.ReactNode;
  /** Active tag filters */
  activeTags: string[];
  /** Callback to add a tag filter */
  onAddTag: (tag: string) => void;
  /** Callback to remove a tag filter */
  onRemoveTag: (tag: string) => void;
  /** Callback to clear all tag filters */
  onClearAllTags: () => void;
  /** Callback to open tag manager modal */
  onOpenTagManager: () => void;
  /** Callback to open template library modal */
  onOpenTemplateLibrary: () => void;
  /** Callback to open export modal */
  onOpenExportModal: () => void;
}

// Layout style cycle order
const LAYOUT_STYLE_CYCLE: NotesLayoutStyle[] = ['three-column', 'file-tree', 'tabbed-sidebar'];

export const NotesLayout: React.FC<NotesLayoutProps> = ({
  children,
  activeTags,
  onAddTag,
  onRemoveTag,
  onClearAllTags,
  onOpenTagManager,
  onOpenTemplateLibrary,
  onOpenExportModal,
}) => {
  // Mobile drawer state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isLayoutSwitcherOpen, setIsLayoutSwitcherOpen] = useState(false);

  // Get layout preferences from settings store
  const notesLayout = useSettingsStore((state) => state.notesLayout);
  const setNotesLayout = useSettingsStore((state) => state.setNotesLayout);

  const { layoutStyle } = notesLayout;

  // Cycle through layout styles (Cmd+Shift+L)
  const cycleLayoutStyle = useCallback(() => {
    const currentIndex = LAYOUT_STYLE_CYCLE.indexOf(layoutStyle);
    const nextIndex = (currentIndex + 1) % LAYOUT_STYLE_CYCLE.length;
    setNotesLayout({ layoutStyle: LAYOUT_STYLE_CYCLE[nextIndex] });
  }, [layoutStyle, setNotesLayout]);

  // Toggle mobile drawer
  const toggleMobileDrawer = useCallback(() => {
    setIsMobileDrawerOpen((prev) => !prev);
  }, []);

  // Close mobile drawer
  const closeMobileDrawer = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, []);

  // Open layout settings
  const openLayoutSettings = useCallback(() => {
    setIsLayoutSwitcherOpen(true);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+Shift+L cycles through layout styles
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'l') {
        e.preventDefault();
        cycleLayoutStyle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cycleLayoutStyle]);

  // Common props for all layouts
  const layoutProps = {
    children,
    activeTags,
    onAddTag,
    onRemoveTag,
    onClearAllTags,
    onOpenTagManager,
    onOpenTemplateLibrary,
    onOpenExportModal,
    onOpenLayoutSettings: openLayoutSettings,
  };

  // Render the appropriate layout based on user preference
  const renderLayout = () => {
    // On mobile, always show mobile drawer + editor
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (isMobile) {
      return (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileDrawer}
            className="fixed top-20 left-4 z-30 p-2 bg-surface-light dark:bg-surface-dark-elevated border border-border-light dark:border-border-dark rounded-lg shadow-lg hover:bg-surface-light-elevated dark:hover:bg-surface-dark transition-colors"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5 text-text-light-secondary dark:text-text-dark-secondary" />
          </button>

          {/* Mobile drawer overlay */}
          <AnimatePresence>
            {isMobileDrawerOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/50 z-40"
                  onClick={closeMobileDrawer}
                  aria-hidden="true"
                />

                {/* Drawer */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="fixed left-0 top-0 bottom-0 w-80 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark z-50 flex flex-col"
                >
                  {/* Close button */}
                  <button
                    onClick={closeMobileDrawer}
                    className="absolute top-4 right-4 p-1.5 hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated rounded-lg transition-colors"
                    aria-label="Close sidebar menu"
                  >
                    <X className="w-5 h-5 text-text-light-secondary dark:text-text-dark-secondary" />
                  </button>

                  {/* Mobile sidebar content */}
                  <div className="flex-1 flex flex-col min-h-0 pt-12">
                    <div className="h-1/2 overflow-hidden border-b border-border-light dark:border-border-dark">
                      <FolderSidebar
                        activeTags={activeTags}
                        onAddTag={onAddTag}
                        onRemoveTag={onRemoveTag}
                        onClearAllTags={onClearAllTags}
                        onOpenTagManager={onOpenTagManager}
                      />
                    </div>
                    <div className="h-1/2 min-h-0 overflow-hidden">
                      <NotesList
                        activeTags={activeTags}
                        onOpenTemplateLibrary={onOpenTemplateLibrary}
                        onOpenExportModal={onOpenExportModal}
                      />
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      );
    }

    // Desktop: render selected layout
    switch (layoutStyle) {
      case 'three-column':
        return <ThreeColumnLayout {...layoutProps} />;
      case 'file-tree':
        return <FileTreeLayout {...layoutProps} />;
      case 'tabbed-sidebar':
        return <TabbedSidebarLayout {...layoutProps} />;
      default:
        return <ThreeColumnLayout {...layoutProps} />;
    }
  };

  return (
    <>
      {/* Desktop layout detection wrapper */}
      <div className="hidden md:flex flex-1 min-h-0 overflow-hidden">
        {renderLayout()}
      </div>

      {/* Mobile layout (always uses drawer) */}
      <div className="md:hidden flex-1 flex flex-col min-h-0 overflow-hidden relative">
        {/* Mobile menu button */}
        <button
          onClick={toggleMobileDrawer}
          className="fixed top-20 left-4 z-30 p-2 bg-surface-light dark:bg-surface-dark-elevated border border-border-light dark:border-border-dark rounded-lg shadow-lg hover:bg-surface-light-elevated dark:hover:bg-surface-dark transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5 text-text-light-secondary dark:text-text-dark-secondary" />
        </button>

        {/* Mobile drawer overlay */}
        <AnimatePresence>
          {isMobileDrawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={closeMobileDrawer}
                aria-hidden="true"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed left-0 top-0 bottom-0 w-80 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark z-50 flex flex-col"
              >
                {/* Close button */}
                <button
                  onClick={closeMobileDrawer}
                  className="absolute top-4 right-4 p-1.5 hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated rounded-lg transition-colors"
                  aria-label="Close sidebar menu"
                >
                  <X className="w-5 h-5 text-text-light-secondary dark:text-text-dark-secondary" />
                </button>

                {/* Mobile sidebar content */}
                <div className="flex-1 flex flex-col min-h-0 pt-12">
                  <div className="h-1/2 overflow-hidden border-b border-border-light dark:border-border-dark">
                    <FolderSidebar
                      activeTags={activeTags}
                      onAddTag={onAddTag}
                      onRemoveTag={onRemoveTag}
                      onClearAllTags={onClearAllTags}
                      onOpenTagManager={onOpenTagManager}
                    />
                  </div>
                  <div className="h-1/2 min-h-0 overflow-hidden">
                    <NotesList
                      activeTags={activeTags}
                      onOpenTemplateLibrary={onOpenTemplateLibrary}
                      onOpenExportModal={onOpenExportModal}
                    />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>

      {/* Layout Switcher Modal */}
      <LayoutSwitcher
        isOpen={isLayoutSwitcherOpen}
        onClose={() => setIsLayoutSwitcherOpen(false)}
      />
    </>
  );
};
