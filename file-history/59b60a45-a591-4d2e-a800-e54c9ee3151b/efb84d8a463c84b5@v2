/**
 * Date utility functions for calendar and task management
 */

/**
 * Format a date object to YYYY-MM-DD string
 */
export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

/**
 * Parse YYYY-MM-DD string to Date object
 */
export function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Get the legacy date key format from v1 (YYYY-M-D without padding)
 * Used for backward compatibility with localStorage data
 * @deprecated Use getStandardDateKey() instead - this uses 0-indexed month which causes bugs
 */
export function getLegacyDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

/**
 * Get standard date key format (YYYY-M-D with 1-indexed month)
 * Replaces getLegacyDateKey with correct month indexing
 */
export function getStandardDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;  // Convert 0-indexed to 1-indexed
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Get the first day of the month
 */
export function getFirstDayOfMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

/**
 * Get the number of days in a month
 */
export function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Get the number of days in the previous month
 */
export function getDaysInPrevMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}

/**
 * Get the start of the week (Sunday) for a given date
 */
export function getStartOfWeek(date: Date): Date {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  start.setHours(0, 0, 0, 0);
  return start;
}

/**
 * Get the end of the week (Saturday) for a given date
 */
export function getEndOfWeek(date: Date): Date {
  const end = new Date(date);
  end.setDate(end.getDate() + (6 - end.getDay()));
  end.setHours(23, 59, 59, 999);
  return end;
}

/**
 * Format a date for display (e.g., "January 15, 2025")
 */
export function formatDateLong(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a date for display (e.g., "Jan 15")
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Check if a date is between two other dates (inclusive)
 */
export function isDateBetween(date: Date, start: Date, end: Date): boolean {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);

  const normalizedStart = new Date(start);
  normalizedStart.setHours(0, 0, 0, 0);

  const normalizedEnd = new Date(end);
  normalizedEnd.setHours(0, 0, 0, 0);

  return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd;
}
