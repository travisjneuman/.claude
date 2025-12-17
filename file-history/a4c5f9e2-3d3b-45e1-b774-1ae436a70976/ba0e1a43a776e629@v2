/**
 * Focus Trap Hook
 * Traps focus within a container element (e.g., modal dialogs)
 * Required for WCAG 2.1 accessibility compliance
 *
 * Features:
 * - Traps Tab/Shift+Tab navigation within container
 * - Focuses first focusable element on mount
 * - Restores focus to trigger element on unmount
 * - Handles escape key to close
 */

import { useEffect, useRef, useCallback } from 'react';

/** Selector for all focusable elements */
const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

interface UseFocusTrapOptions {
  /** Whether the focus trap is active */
  isActive: boolean;
  /** Callback when escape key is pressed */
  onEscape?: () => void;
  /** Whether to focus first element on mount (default: true) */
  autoFocus?: boolean;
  /** Whether to restore focus on unmount (default: true) */
  restoreFocus?: boolean;
}

/**
 * Hook to trap focus within a container element
 * @param options Configuration options
 * @returns Ref to attach to the container element
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  options: UseFocusTrapOptions
) {
  const { isActive, onEscape, autoFocus = true, restoreFocus = true } = options;

  const containerRef = useRef<T>(null);
  const previousActiveElement = useRef<Element | null>(null);

  // Get all focusable elements within the container
  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];
    const elements = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    return Array.from(elements).filter(
      (el) => el.offsetParent !== null // Filter out hidden elements
    );
  }, []);

  // Handle Tab key navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive || !containerRef.current) return;

      // Handle Escape key
      if (event.key === 'Escape' && onEscape) {
        event.preventDefault();
        event.stopPropagation();
        onEscape();
        return;
      }

      // Only handle Tab key for focus trapping
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      // Shift+Tab on first element -> go to last
      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      // Tab on last element -> go to first
      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      // If focus is outside the container, bring it back
      if (!containerRef.current.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    },
    [isActive, onEscape, getFocusableElements]
  );

  // Setup and cleanup
  useEffect(() => {
    if (!isActive) return;

    // Store the currently focused element to restore later
    previousActiveElement.current = document.activeElement;

    // Focus first focusable element
    if (autoFocus) {
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else if (containerRef.current) {
          // If no focusable elements, focus the container itself
          containerRef.current.setAttribute('tabindex', '-1');
          containerRef.current.focus();
        }
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [isActive, autoFocus, getFocusableElements]);

  // Add keyboard event listener
  useEffect(() => {
    if (!isActive) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, handleKeyDown]);

  // Restore focus on deactivation
  useEffect(() => {
    if (isActive) return;

    // Only restore when becoming inactive (not on initial mount)
    if (restoreFocus && previousActiveElement.current instanceof HTMLElement) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [isActive, restoreFocus]);

  return containerRef;
}

/**
 * Hook to announce screen reader messages
 * Creates a visually hidden live region for announcements
 */
export function useScreenReaderAnnounce() {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    // Create a temporary live region
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement is read
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  return announce;
}
