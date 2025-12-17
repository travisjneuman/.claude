// Utility function for merging Tailwind CSS classes
// This is commonly used with shadcn/ui and other component libraries
// Copy this to your project's lib/utils.ts file

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// If you don't have clsx and tailwind-merge installed, run:
// npm install clsx tailwind-merge

// Example usage:
// cn('px-4 py-2', 'bg-blue-500', { 'text-white': true, 'font-bold': false })
// Result: 'px-4 py-2 bg-blue-500 text-white'
