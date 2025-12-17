/**
 * Time Formatting Utilities
 * Helper functions for formatting time durations and timestamps
 */

interface FormatDurationOptions {
  showSeconds?: boolean;
  short?: boolean; // If true, use "2h 30m" instead of "2:30:00"
}

/**
 * Format duration in seconds to HH:MM:SS or HH:MM format
 * @param seconds - Duration in seconds
 * @param options - Formatting options
 * @returns Formatted string (e.g., "2:34:18" or "2h 30m")
 */
export function formatDuration(
  seconds: number,
  options: FormatDurationOptions = {}
): string {
  const { showSeconds = true, short = false } = options;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (short) {
    // Short format: "2h 30m" or "30m" or "45s"
    if (hours > 0) {
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
    if (minutes > 0) {
      return `${minutes}m`;
    }
    return `${secs}s`;
  }

  // Standard format: "2:34:18" or "2:34"
  const hoursStr = hours.toString().padStart(2, '0');
  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = secs.toString().padStart(2, '0');

  if (showSeconds) {
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }
  return `${hoursStr}:${minutesStr}`;
}

/**
 * Format a Date object to time string
 * @param date - Date to format
 * @param format - Time format (12h or 24h)
 * @returns Formatted time string (e.g., "2:30 PM" or "14:30")
 */
export function formatTime(date: Date, format: '12h' | '24h' = '24h'): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (format === '12h') {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12; // Convert 0 to 12
    const minutesStr = minutes.toString().padStart(2, '0');
    return `${displayHours}:${minutesStr} ${period}`;
  }

  // 24h format
  const hoursStr = hours.toString().padStart(2, '0');
  const minutesStr = minutes.toString().padStart(2, '0');
  return `${hoursStr}:${minutesStr}`;
}

/**
 * Format a date range (start - end)
 * @param start - Start date
 * @param end - End date (optional, if omitted shows "ongoing")
 * @param format - Time format
 * @returns Formatted range string (e.g., "9:00 AM - 11:30 AM")
 */
export function formatTimeRange(
  start: Date,
  end: Date | null,
  format: '12h' | '24h' = '24h'
): string {
  const startStr = formatTime(start, format);
  if (!end) {
    return `${startStr} - ongoing`;
  }
  const endStr = formatTime(end, format);
  return `${startStr} - ${endStr}`;
}

/**
 * Get relative time string (e.g., "2 hours ago", "just now")
 * @param date - Date to compare against now
 * @returns Relative time string
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return 'just now';
  }
  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  }
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  }
  if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }

  // More than a week: show actual date
  return date.toLocaleDateString();
}

/**
 * Calculate duration between two dates in seconds
 * @param start - Start date
 * @param end - End date (defaults to now if omitted)
 * @returns Duration in seconds
 */
export function calculateDuration(start: Date, end: Date = new Date()): number {
  const diffMs = end.getTime() - start.getTime();
  return Math.floor(diffMs / 1000);
}

/**
 * Parse duration string to seconds
 * Supports formats like "2h 30m", "1.5h", "90m", "30"
 * @param input - Duration string
 * @returns Duration in seconds, or null if invalid
 */
export function parseDuration(input: string): number | null {
  const trimmed = input.trim().toLowerCase();

  // Match patterns like "2h 30m 15s"
  const complexMatch = trimmed.match(/(?:(\d+(?:\.\d+)?)h)?\s*(?:(\d+(?:\.\d+)?)m)?\s*(?:(\d+(?:\.\d+)?)s)?/);
  if (complexMatch) {
    const hours = parseFloat(complexMatch[1] || '0');
    const minutes = parseFloat(complexMatch[2] || '0');
    const seconds = parseFloat(complexMatch[3] || '0');
    return Math.floor(hours * 3600 + minutes * 60 + seconds);
  }

  // Match simple number (assumes hours)
  const numberMatch = trimmed.match(/^(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    const hours = parseFloat(numberMatch[1]);
    return Math.floor(hours * 3600);
  }

  return null;
}
