/**
 * useReducedMotion Hook
 *
 * Detects user preference for reduced motion (prefers-reduced-motion).
 * Part of the Notes Page Revolution - Phase 6.
 *
 * Usage:
 * const prefersReducedMotion = useReducedMotion();
 * if (prefersReducedMotion) {
 *   // Skip animations or use instant transitions
 * }
 */

import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Hook that returns true if the user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  // Default to false during SSR
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);

    // Set initial value
    setPrefersReducedMotion(mediaQueryList.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
      return () => mediaQueryList.removeEventListener('change', handleChange);
    } else {
      // Legacy browsers (Safari < 14)
      mediaQueryList.addListener(handleChange);
      return () => mediaQueryList.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Get animation duration based on reduced motion preference
 */
export function getAnimationDuration(
  normalDuration: number,
  prefersReducedMotion: boolean
): number {
  return prefersReducedMotion ? 0 : normalDuration;
}

/**
 * Get animation config for framer-motion based on reduced motion preference
 */
export function getMotionConfig(prefersReducedMotion: boolean) {
  if (prefersReducedMotion) {
    return {
      transition: { duration: 0 },
      initial: false,
    };
  }
  return {};
}
