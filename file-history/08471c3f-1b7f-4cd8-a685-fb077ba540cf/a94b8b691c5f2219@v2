/**
 * useTags Hook
 *
 * Custom hook for tag operations across notes
 * Provides utilities for:
 * - Getting all unique tags
 * - Counting notes per tag
 * - Filtering notes by tags
 */

import { useMemo } from 'react';
import { useNotesStore } from '../stores/useNotesStore';

export interface TagCount {
  tag: string;
  count: number;
}

/**
 * Get all unique tags across all notes
 */
export function useTags() {
  const notes = useNotesStore((state) => state.notes);

  return useMemo(() => {
    const tagSet = new Set<string>();
    Object.values(notes).forEach((note) => {
      if (!note.isArchived) {
        note.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [notes]);
}

/**
 * Get tag counts (number of notes per tag)
 */
export function useTagCounts(): TagCount[] {
  const notes = useNotesStore((state) => state.notes);

  return useMemo(() => {
    const tagCounts = new Map<string, number>();

    Object.values(notes).forEach((note) => {
      if (!note.isArchived) {
        note.tags.forEach((tag) => {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
      }
    });

    return Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count); // Sort by count descending
  }, [notes]);
}

/**
 * Get notes that have ALL specified tags (AND logic)
 */
export function useNotesWithTags(tags: string[]) {
  const notes = useNotesStore((state) => state.notes);

  return useMemo(() => {
    if (tags.length === 0) {
      return Object.values(notes).filter((note) => !note.isArchived);
    }

    return Object.values(notes).filter((note) => {
      if (note.isArchived) return false;
      // Note must have ALL specified tags (AND logic)
      return tags.every((tag) => note.tags.includes(tag));
    });
  }, [notes, tags]);
}

/**
 * Get recently used tags (last 10, most recently added)
 */
export function useRecentTags(limit = 10): string[] {
  const notes = useNotesStore((state) => state.notes);

  return useMemo(() => {
    const recentTags: string[] = [];
    const tagSet = new Set<string>();

    // Sort notes by updatedAt descending
    const sortedNotes = Object.values(notes)
      .filter((note) => !note.isArchived)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    // Collect tags from most recent notes
    for (const note of sortedNotes) {
      for (const tag of note.tags) {
        if (!tagSet.has(tag)) {
          tagSet.add(tag);
          recentTags.push(tag);
          if (recentTags.length >= limit) {
            return recentTags;
          }
        }
      }
    }

    return recentTags;
  }, [notes, limit]);
}
