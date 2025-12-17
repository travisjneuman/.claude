/**
 * Analytics Calculation Utilities
 * Pure functions for calculating metrics from store data
 */

import { isWithinInterval, differenceInHours, differenceInDays, startOfDay, endOfDay } from 'date-fns';
import type { Task, TaskPriority, TaskStatus } from '../types';
import type { TimeEntry } from '../types';
import type { CalendarEvent } from '../types';
import type { Note } from '../types/notes';
import type { DateRange } from '../stores/useAnalyticsStore';

// ==================== TASK METRICS ====================

/**
 * Calculate task completion rate
 */
export function calculateCompletionRate(tasks: Task[], dateRange: DateRange): number {
  const tasksInRange = tasks.filter((task) => {
    const createdAt = new Date(task.created);
    return isWithinInterval(createdAt, dateRange);
  });

  const completedTasks = tasksInRange.filter((task) => task.status === 'done');

  if (tasksInRange.length === 0) return 0;
  return (completedTasks.length / tasksInRange.length) * 100;
}

/**
 * Get task count by priority
 */
export function getTasksByPriority(tasks: Task[], dateRange: DateRange): Record<TaskPriority, number> {
  const tasksInRange = tasks.filter((task) => {
    const createdAt = new Date(task.created);
    return isWithinInterval(createdAt, dateRange);
  });

  return {
    high: tasksInRange.filter((t) => t.priority === 'high').length,
    medium: tasksInRange.filter((t) => t.priority === 'medium').length,
    low: tasksInRange.filter((t) => t.priority === 'low').length,
  };
}

/**
 * Get task count by status
 */
export function getTasksByStatus(tasks: Task[], dateRange: DateRange): Record<TaskStatus, number> {
  const tasksInRange = tasks.filter((task) => {
    const createdAt = new Date(task.created);
    return isWithinInterval(createdAt, dateRange);
  });

  return {
    backlog: tasksInRange.filter((t) => t.status === 'backlog').length,
    todo: tasksInRange.filter((t) => t.status === 'todo').length,
    inprogress: tasksInRange.filter((t) => t.status === 'inprogress').length,
    review: tasksInRange.filter((t) => t.status === 'review').length,
    done: tasksInRange.filter((t) => t.status === 'done').length,
  };
}

/**
 * Calculate average task completion time (in hours)
 */
export function calculateAvgCompletionTime(tasks: Task[], dateRange: DateRange): number {
  const completedTasks = tasks.filter((task) => {
    if (task.status !== 'done' || !task.lastCompletedAt) return false;
    const completedAt = new Date(task.lastCompletedAt);
    return isWithinInterval(completedAt, dateRange);
  });

  if (completedTasks.length === 0) return 0;

  const totalHours = completedTasks.reduce((sum, task) => {
    const created = new Date(task.created);
    const completed = new Date(task.lastCompletedAt!);
    return sum + differenceInHours(completed, created);
  }, 0);

  return totalHours / completedTasks.length;
}

/**
 * Get overdue task count
 */
export function getOverdueTaskCount(tasks: Task[]): number {
  const now = new Date();
  return tasks.filter((task) => {
    if (task.status === 'done' || !task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate < now;
  }).length;
}

// ==================== TIME TRACKING METRICS ====================

/**
 * Calculate total time tracked (in seconds)
 */
export function calculateTotalTimeTracked(entries: TimeEntry[], dateRange: DateRange): number {
  return entries
    .filter((entry) => {
      const startTime = new Date(entry.startTime);
      return isWithinInterval(startTime, dateRange);
    })
    .reduce((sum, entry) => sum + entry.duration, 0);
}

/**
 * Get time by project breakdown (in seconds)
 */
export function getTimeByProject(entries: TimeEntry[], dateRange: DateRange): Record<string, number> {
  const entriesInRange = entries.filter((entry) => {
    const startTime = new Date(entry.startTime);
    return isWithinInterval(startTime, dateRange);
  });

  return entriesInRange.reduce((acc, entry) => {
    const projectId = entry.projectId || 'No Project';
    acc[projectId] = (acc[projectId] || 0) + entry.duration;
    return acc;
  }, {} as Record<string, number>);
}

/**
 * Get hourly distribution (0-23 hours, total seconds per hour)
 */
export function getHourlyDistribution(entries: TimeEntry[], dateRange: DateRange): number[] {
  const hourly = new Array(24).fill(0);

  entries
    .filter((entry) => {
      const startTime = new Date(entry.startTime);
      return isWithinInterval(startTime, dateRange);
    })
    .forEach((entry) => {
      const hour = new Date(entry.startTime).getHours();
      hourly[hour] += entry.duration;
    });

  return hourly;
}

/**
 * Calculate average session duration (in seconds)
 */
export function calculateAvgSessionDuration(entries: TimeEntry[], dateRange: DateRange): number {
  const entriesInRange = entries.filter((entry) => {
    const startTime = new Date(entry.startTime);
    return isWithinInterval(startTime, dateRange);
  });

  if (entriesInRange.length === 0) return 0;

  const totalDuration = entriesInRange.reduce((sum, entry) => sum + entry.duration, 0);
  return totalDuration / entriesInRange.length;
}

// ==================== CALENDAR METRICS ====================

/**
 * Get total event count
 */
export function getEventCount(events: Record<string, CalendarEvent[]>, dateRange: DateRange): number {
  let count = 0;

  Object.entries(events).forEach(([dateKey, eventList]) => {
    const [year, month, day] = dateKey.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 1-indexed in dateKey

    if (isWithinInterval(date, dateRange)) {
      count += eventList.length;
    }
  });

  return count;
}

/**
 * Calculate meeting time vs focus time (in hours)
 * Assumes events with "meeting" in title or description are meetings
 */
export function getMeetingVsFocusTime(events: Record<string, CalendarEvent[]>, dateRange: DateRange): {
  meetingHours: number;
  focusHours: number;
} {
  let meetingHours = 0;
  let totalHours = 0;

  Object.entries(events).forEach(([dateKey, eventList]) => {
    const [year, month, day] = dateKey.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    if (isWithinInterval(date, dateRange)) {
      eventList.forEach((event) => {
        if (event.startTime && event.endTime) {
          const start = new Date(`${dateKey} ${event.startTime}`);
          const end = new Date(`${dateKey} ${event.endTime}`);
          const duration = differenceInHours(end, start);

          totalHours += duration;

          const isMeeting = event.title.toLowerCase().includes('meeting') ||
            (event.description && event.description.toLowerCase().includes('meeting'));

          if (isMeeting) {
            meetingHours += duration;
          }
        }
      });
    }
  });

  return {
    meetingHours,
    focusHours: totalHours - meetingHours,
  };
}

// ==================== NOTES METRICS ====================

/**
 * Get notes created count
 */
export function getNotesCreatedCount(notes: Record<string, Note>, dateRange: DateRange): number {
  return Object.values(notes).filter((note) => {
    const createdAt = new Date(note.createdAt);
    return isWithinInterval(createdAt, dateRange);
  }).length;
}

/**
 * Calculate average note length (in characters)
 */
export function calculateAvgNoteLength(notes: Record<string, Note>, dateRange: DateRange): number {
  const notesInRange = Object.values(notes).filter((note) => {
    const createdAt = new Date(note.createdAt);
    return isWithinInterval(createdAt, dateRange);
  });

  if (notesInRange.length === 0) return 0;

  const totalLength = notesInRange.reduce((sum, note) => sum + note.content.length, 0);
  return Math.round(totalLength / notesInRange.length);
}

/**
 * Get most used tags with counts
 */
export function getMostUsedTags(notes: Record<string, Note>, dateRange: DateRange, limit: number = 10): Array<{ tag: string; count: number }> {
  const notesInRange = Object.values(notes).filter((note) => {
    const createdAt = new Date(note.createdAt);
    return isWithinInterval(createdAt, dateRange);
  });

  const tagCounts: Record<string, number> = {};

  notesInRange.forEach((note) => {
    if (note.tags) {
      note.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

// ==================== TREND CALCULATIONS ====================

/**
 * Get daily data points for a metric over the date range
 */
export function getDailyTrend<T>(
  data: T[],
  dateRange: DateRange,
  getDate: (item: T) => Date,
  getValue: (items: T[]) => number
): Array<{ date: string; value: number }> {
  const days = differenceInDays(dateRange.end, dateRange.start) + 1;
  const trend: Array<{ date: string; value: number }> = [];

  for (let i = 0; i < days; i++) {
    const currentDay = new Date(dateRange.start);
    currentDay.setDate(currentDay.getDate() + i);

    const dayStart = startOfDay(currentDay);
    const dayEnd = endOfDay(currentDay);

    const itemsForDay = data.filter((item) => {
      const itemDate = getDate(item);
      return isWithinInterval(itemDate, { start: dayStart, end: dayEnd });
    });

    trend.push({
      date: currentDay.toISOString().split('T')[0],
      value: getValue(itemsForDay),
    });
  }

  return trend;
}
