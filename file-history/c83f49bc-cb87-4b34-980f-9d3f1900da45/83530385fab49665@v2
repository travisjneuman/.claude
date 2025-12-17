/**
 * Event Conflict Detection Utility
 * Detects overlapping calendar events to prevent scheduling conflicts
 */

import type { CalendarEvent } from '../types';
import { parse } from 'date-fns';

interface TimeRange {
  start: Date;
  end: Date;
}

/**
 * Parse event date and time into Date objects
 */
function parseEventTime(eventDate: string, startTime?: string, endTime?: string): TimeRange | null {
  // If no times specified, treat as all-day event (no conflicts)
  if (!startTime || !endTime) {
    return null;
  }

  try {
    const start = parse(`${eventDate} ${startTime}`, 'yyyy-MM-dd HH:mm', new Date());
    const end = parse(`${eventDate} ${endTime}`, 'yyyy-MM-dd HH:mm', new Date());

    // Invalid time range (end before start)
    if (end <= start) {
      return null;
    }

    return { start, end };
  } catch {
    return null;
  }
}

/**
 * Check if two time ranges overlap
 */
function timeRangesOverlap(range1: TimeRange, range2: TimeRange): boolean {
  // A overlaps B if: A.start < B.end AND A.end > B.start
  return range1.start < range2.end && range1.end > range2.start;
}

/**
 * Detect conflicts between a new/updated event and existing events on the same day
 *
 * @param eventDate - Date key (YYYY-MM-DD) for the event
 * @param startTime - Start time (HH:MM) of the event
 * @param endTime - End time (HH:MM) of the event
 * @param existingEvents - Array of events on the same day
 * @param excludeEventId - Optional event ID to exclude (for edit scenarios)
 * @returns Array of conflicting events
 */
export function detectConflicts(
  eventDate: string,
  startTime: string | undefined,
  endTime: string | undefined,
  existingEvents: CalendarEvent[],
  excludeEventId?: string
): CalendarEvent[] {
  // Parse new event time range
  const newEventRange = parseEventTime(eventDate, startTime, endTime);

  // No conflicts for all-day events
  if (!newEventRange) {
    return [];
  }

  const conflicts: CalendarEvent[] = [];

  // Check each existing event for conflicts
  for (const event of existingEvents) {
    // Skip the event being edited
    if (excludeEventId && event.id === excludeEventId) {
      continue;
    }

    // Skip recurring event instances (conflicts handled by parent event)
    if (event.recurrenceId && event.recurrenceException !== true) {
      continue;
    }

    // Parse existing event time range
    const existingRange = parseEventTime(eventDate, event.startTime, event.endTime);

    // All-day events don't conflict
    if (!existingRange) {
      continue;
    }

    // Check for overlap
    if (timeRangesOverlap(newEventRange, existingRange)) {
      conflicts.push(event);
    }
  }

  return conflicts;
}

/**
 * Format conflict message for display
 */
export function formatConflictMessage(conflicts: CalendarEvent[]): string {
  if (conflicts.length === 0) {
    return '';
  }

  if (conflicts.length === 1) {
    const event = conflicts[0];
    const timeRange = event.startTime && event.endTime
      ? ` (${event.startTime} - ${event.endTime})`
      : '';
    return `This event conflicts with: "${event.title}"${timeRange}`;
  }

  return `This event conflicts with ${conflicts.length} other events`;
}

/**
 * Get detailed conflict information for display
 */
export function getConflictDetails(conflicts: CalendarEvent[]): string[] {
  return conflicts.map((event) => {
    const timeRange = event.startTime && event.endTime
      ? ` (${event.startTime} - ${event.endTime})`
      : '';
    return `${event.title}${timeRange}`;
  });
}
