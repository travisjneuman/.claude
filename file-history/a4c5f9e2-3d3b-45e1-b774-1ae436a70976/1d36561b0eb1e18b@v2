/**
 * Error Notifications Hook
 * Connects the error service to React components for displaying error toasts
 */

import { useState, useEffect, useCallback } from 'react';
import { errorService, ErrorSeverity } from '../services/errorService';
import type { AppError } from '../services/errorService';

interface ErrorNotification extends AppError {
  /** Whether the notification is visible */
  visible: boolean;
}

/**
 * Hook to manage error notifications in React components
 */
export function useErrorNotifications(maxVisible: number = 3) {
  const [notifications, setNotifications] = useState<ErrorNotification[]>([]);

  // Subscribe to error service
  useEffect(() => {
    const unsubscribe = errorService.subscribe((error) => {
      const notification: ErrorNotification = {
        ...error,
        visible: true,
      };

      setNotifications((prev) => {
        // Add new notification, limit to maxVisible
        const updated = [...prev, notification].slice(-maxVisible);
        return updated;
      });

      // Auto-dismiss non-critical errors
      if (error.severity !== ErrorSeverity.CRITICAL) {
        const timeout = errorService.getAutoDismissTimeout();
        setTimeout(() => {
          dismissNotification(error.id);
        }, timeout);
      }
    });

    return unsubscribe;
  }, [maxVisible]);

  // Dismiss a notification
  const dismissNotification = useCallback((errorId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === errorId ? { ...n, visible: false } : n))
    );

    // Remove from array after animation
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== errorId));
    }, 300);
  }, []);

  // Dismiss all notifications
  const dismissAll = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, visible: false })));
    setTimeout(() => {
      setNotifications([]);
    }, 300);
  }, []);

  // Get visible notifications only
  const visibleNotifications = notifications.filter((n) => n.visible);

  return {
    notifications: visibleNotifications,
    dismissNotification,
    dismissAll,
    hasNotifications: visibleNotifications.length > 0,
  };
}
