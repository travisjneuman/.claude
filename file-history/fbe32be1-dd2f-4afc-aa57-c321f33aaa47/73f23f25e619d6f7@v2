/**
 * Event Reminders Service
 * Handles scheduling and triggering browser notifications for calendar event reminders
 */

import type { CalendarEvent } from '../types';
import { parse, differenceInMinutes } from 'date-fns';
import { logger } from './logger';

const log = logger.module('EventReminders');

// Store active reminder timeouts
const activeReminders = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Request notification permission from the user
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    log.warn('Browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

/**
 * Show a browser notification for an event reminder
 */
const showNotification = (event: CalendarEvent, minutesBefore: number): void => {
  if (Notification.permission !== 'granted') {
    log.warn('Notification permission not granted');
    return;
  }

  const timeLabel = minutesBefore === 0
    ? 'now'
    : minutesBefore < 60
      ? `in ${minutesBefore} minutes`
      : minutesBefore === 60
        ? 'in 1 hour'
        : `in ${Math.floor(minutesBefore / 60)} hours`;

  const title = minutesBefore === 0
    ? `Event starting: ${event.title}`
    : `Reminder: ${event.title}`;

  const body = minutesBefore === 0
    ? `${event.title} is starting now`
    : `${event.title} starts ${timeLabel}`;

  const options: NotificationOptions = {
    body,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: `event-${event.id}-${minutesBefore}`,
    requireInteraction: false,
    silent: false,
  };

  const notification = new Notification(title, options);

  // Auto-close notification after 10 seconds
  setTimeout(() => {
    notification.close();
  }, 10000);

  // Handle notification click (could navigate to calendar)
  notification.onclick = () => {
    window.focus();
    notification.close();
  };
};

/**
 * Calculate milliseconds until a reminder should trigger
 */
const calculateReminderDelay = (
  eventDate: string,
  eventTime: string | undefined,
  minutesBefore: number
): number => {
  const dateStr = eventTime
    ? `${eventDate} ${eventTime}`
    : `${eventDate} 00:00`;

  const eventDateTime = parse(dateStr, 'yyyy-MM-dd HH:mm', new Date());
  const reminderTime = new Date(eventDateTime.getTime() - minutesBefore * 60 * 1000);
  const now = new Date();

  return reminderTime.getTime() - now.getTime();
};

/**
 * Schedule a single reminder for an event
 */
const scheduleReminder = (
  event: CalendarEvent,
  eventDate: string,
  minutesBefore: number
): void => {
  const delay = calculateReminderDelay(eventDate, event.startTime, minutesBefore);

  // Only schedule if reminder is in the future
  if (delay <= 0) {
    return;
  }

  // Don't schedule reminders more than 24 hours in advance (browser may kill timeout)
  const maxDelay = 24 * 60 * 60 * 1000; // 24 hours
  if (delay > maxDelay) {
    return;
  }

  const reminderId = `${event.id}-${eventDate}-${minutesBefore}`;

  // Cancel existing reminder if any
  if (activeReminders.has(reminderId)) {
    clearTimeout(activeReminders.get(reminderId)!);
  }

  // Schedule new reminder
  const timeoutId = setTimeout(() => {
    showNotification(event, minutesBefore);
    activeReminders.delete(reminderId);
  }, delay);

  activeReminders.set(reminderId, timeoutId);
};

/**
 * Schedule all reminders for an event
 */
export const scheduleEventReminders = (event: CalendarEvent, eventDate: string): void => {
  if (!event.reminders || event.reminders.length === 0) {
    return;
  }

  event.reminders.forEach((minutesBefore) => {
    scheduleReminder(event, eventDate, minutesBefore);
  });
};

/**
 * Cancel all reminders for a specific event
 */
export const cancelEventReminders = (eventId: string): void => {
  // Find all reminders for this event
  const reminderIds = Array.from(activeReminders.keys()).filter((id) =>
    id.startsWith(`${eventId}-`)
  );

  // Clear timeouts and remove from map
  reminderIds.forEach((reminderId) => {
    const timeoutId = activeReminders.get(reminderId);
    if (timeoutId) {
      clearTimeout(timeoutId);
      activeReminders.delete(reminderId);
    }
  });
};

/**
 * Cancel all active reminders (useful for cleanup)
 */
export const cancelAllReminders = (): void => {
  activeReminders.forEach((timeoutId) => {
    clearTimeout(timeoutId);
  });
  activeReminders.clear();
};

/**
 * Reschedule all reminders for upcoming events
 * Call this on app load to restore reminders after page refresh
 */
export const rescheduleAllReminders = (
  events: Record<string, CalendarEvent[]>
): void => {
  // Cancel existing reminders
  cancelAllReminders();

  // Get current date
  const now = new Date();

  // Schedule reminders for events in the next 7 days
  Object.entries(events).forEach(([dateKey, dayEvents]) => {
    const eventDate = parse(dateKey, 'yyyy-MM-dd', new Date());
    const daysUntilEvent = differenceInMinutes(eventDate, now) / (60 * 24);

    // Only schedule for events within next 7 days
    if (daysUntilEvent < 0 || daysUntilEvent > 7) {
      return;
    }

    dayEvents.forEach((event) => {
      // Skip recurring instances (they'll be handled by parent event)
      if (event.recurrenceId) {
        return;
      }

      scheduleEventReminders(event, dateKey);
    });
  });
};

/**
 * Get formatted reminder label for UI
 */
export const getReminderLabel = (minutes: number): string => {
  if (minutes === 0) return 'At time of event';
  if (minutes === 5) return '5 minutes before';
  if (minutes === 15) return '15 minutes before';
  if (minutes === 30) return '30 minutes before';
  if (minutes === 60) return '1 hour before';
  if (minutes === 1440) return '1 day before';
  if (minutes === 10080) return '1 week before';

  // Custom minutes
  if (minutes < 60) return `${minutes} minutes before`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)} hours before`;
  return `${Math.floor(minutes / 1440)} days before`;
};

/**
 * Common reminder options for UI
 */
export const REMINDER_OPTIONS = [
  { value: 0, label: 'At time of event' },
  { value: 5, label: '5 minutes before' },
  { value: 15, label: '15 minutes before' },
  { value: 30, label: '30 minutes before' },
  { value: 60, label: '1 hour before' },
  { value: 1440, label: '1 day before' },
  { value: 10080, label: '1 week before' },
];
