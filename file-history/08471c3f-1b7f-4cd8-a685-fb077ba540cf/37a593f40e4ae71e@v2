/**
 * Gantt View Utilities
 * Date calculations and positioning algorithms for timeline rendering
 */

import { differenceInDays, addDays, startOfDay, endOfDay } from 'date-fns';

export type ZoomLevel = 'day' | 'week' | 'month';

/**
 * Pixels per day for each zoom level
 */
export const PIXELS_PER_DAY: Record<ZoomLevel, number> = {
  day: 40,
  week: 8,
  month: 2,
};

/**
 * Row height for swimlanes
 */
export const ROW_HEIGHT = 60;

/**
 * Header height for timeline scale
 */
export const HEADER_HEIGHT = 50;

/**
 * Task bar height within row
 */
export const TASK_BAR_HEIGHT = 40;

/**
 * Convert date to pixel position on timeline
 */
export function dateToX(
  date: Date,
  scaleStart: Date,
  zoom: ZoomLevel
): number {
  const daysDiff = differenceInDays(startOfDay(date), startOfDay(scaleStart));
  return daysDiff * PIXELS_PER_DAY[zoom];
}

/**
 * Convert pixel position to date
 */
export function xToDate(
  x: number,
  scaleStart: Date,
  zoom: ZoomLevel
): Date {
  const days = Math.round(x / PIXELS_PER_DAY[zoom]);
  return addDays(scaleStart, days);
}

/**
 * Calculate task bar width from start/end dates
 */
export function calculateBarWidth(
  startDate: Date,
  endDate: Date,
  zoom: ZoomLevel
): number {
  const days = differenceInDays(endOfDay(endDate), startOfDay(startDate));
  // Minimum 1 day width
  return Math.max(days + 1, 1) * PIXELS_PER_DAY[zoom];
}

/**
 * Get timeline bounds (start/end dates) based on tasks
 * Adds padding before/after for better UX
 */
export function getTimelineBounds(tasks: Array<{ startDate?: string | null; dueDate?: string | null }>) {
  const dates: Date[] = [];

  tasks.forEach((task) => {
    if (task.startDate && task.startDate !== null) dates.push(new Date(task.startDate));
    if (task.dueDate && task.dueDate !== null) dates.push(new Date(task.dueDate));
  });

  if (dates.length === 0) {
    // Default to 30 days centered on today
    const today = new Date();
    return {
      start: addDays(today, -15),
      end: addDays(today, 15),
    };
  }

  // Find min/max dates and add padding
  const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

  return {
    start: addDays(minDate, -7), // 1 week padding before
    end: addDays(maxDate, 7), // 1 week padding after
  };
}

/**
 * Get default start date for task with only due date
 * Assumes 1-day duration
 */
export function getDefaultStartDate(dueDate: Date): Date {
  return startOfDay(dueDate);
}

/**
 * Get default due date for task with only start date
 * Assumes 1-day duration
 */
export function getDefaultDueDate(startDate: Date): Date {
  return endOfDay(startDate);
}

/**
 * Validate date range (start must be <= end)
 */
export function isValidDateRange(startDate: Date, dueDate: Date): boolean {
  return startDate.getTime() <= dueDate.getTime();
}

/**
 * Snap date to grid based on zoom level
 */
export function snapToGrid(date: Date): Date {
  // Always snap to start of day for simplicity
  return startOfDay(date);
}
