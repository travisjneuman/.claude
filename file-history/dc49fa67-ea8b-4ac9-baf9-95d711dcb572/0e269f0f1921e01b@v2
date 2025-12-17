/**
 * Color Utility Functions
 *
 * Provides luminance detection and contrast calculation for smart UI adaptation.
 * Used to determine when light/dark mode overrides are needed for backgrounds.
 */

/**
 * Parses a CSS color string to RGB values.
 * Supports: hex (#fff, #ffffff), rgb(), rgba()
 */
export function parseColor(color: string): { r: number; g: number; b: number } | null {
  // Handle hex colors
  const hexMatch = color.match(/^#([a-f\d]{3,8})$/i);
  if (hexMatch) {
    let hex = hexMatch[1];
    // Expand shorthand (#fff -> #ffffff)
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    // Handle 4/8 character hex (with alpha)
    if (hex.length === 4) {
      hex = hex.slice(0, 3).split('').map(c => c + c).join('');
    }
    if (hex.length === 8) {
      hex = hex.slice(0, 6);
    }
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }

  // Handle rgb/rgba colors
  const rgbMatch = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }

  // Handle named colors (basic set for gradients)
  const namedColors: Record<string, { r: number; g: number; b: number }> = {
    white: { r: 255, g: 255, b: 255 },
    black: { r: 0, g: 0, b: 0 },
    red: { r: 255, g: 0, b: 0 },
    green: { r: 0, g: 128, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
    yellow: { r: 255, g: 255, b: 0 },
    orange: { r: 255, g: 165, b: 0 },
    purple: { r: 128, g: 0, b: 128 },
    pink: { r: 255, g: 192, b: 203 },
    cyan: { r: 0, g: 255, b: 255 },
    magenta: { r: 255, g: 0, b: 255 },
    gray: { r: 128, g: 128, b: 128 },
    grey: { r: 128, g: 128, b: 128 },
  };

  const normalized = color.toLowerCase().trim();
  if (namedColors[normalized]) {
    return namedColors[normalized];
  }

  return null;
}

/**
 * Calculate relative luminance of a color (0-1 scale).
 * Uses WCAG 2.0 formula for perceptual brightness.
 *
 * @param color RGB color object
 * @returns Luminance value between 0 (black) and 1 (white)
 */
export function calculateLuminance(color: { r: number; g: number; b: number }): number {
  // Convert to sRGB
  const rsRGB = color.r / 255;
  const gsRGB = color.g / 255;
  const bsRGB = color.b / 255;

  // Apply gamma correction
  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  // Calculate luminance (human perception weighted)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Extracts colors from a CSS gradient string.
 *
 * @param gradient CSS gradient string (e.g., "linear-gradient(to right, #fff, #000)")
 * @returns Array of parsed RGB colors
 */
export function extractGradientColors(gradient: string): Array<{ r: number; g: number; b: number }> {
  const colors: Array<{ r: number; g: number; b: number }> = [];

  // Match hex colors
  const hexMatches = gradient.match(/#[a-f\d]{3,8}/gi);
  if (hexMatches) {
    for (const hex of hexMatches) {
      const parsed = parseColor(hex);
      if (parsed) colors.push(parsed);
    }
  }

  // Match rgb/rgba colors
  const rgbMatches = gradient.match(/rgba?\([^)]+\)/gi);
  if (rgbMatches) {
    for (const rgb of rgbMatches) {
      const parsed = parseColor(rgb);
      if (parsed) colors.push(parsed);
    }
  }

  return colors;
}

/**
 * Determines if a gradient or color value is "light" (needs dark text).
 * Analyzes all colors in the gradient and uses weighted average.
 *
 * @param value CSS gradient or color string
 * @param threshold Luminance threshold (default 0.5 - higher = stricter)
 * @returns true if background is light and needs dark text
 */
export function isLightBackground(value: string, threshold = 0.5): boolean {
  // Handle solid colors
  const solidColor = parseColor(value);
  if (solidColor) {
    return calculateLuminance(solidColor) > threshold;
  }

  // Handle gradients
  const gradientColors = extractGradientColors(value);
  if (gradientColors.length === 0) {
    return false; // Unknown format, assume dark
  }

  // Calculate average luminance of all gradient colors
  const avgLuminance = gradientColors.reduce((sum, color) => {
    return sum + calculateLuminance(color);
  }, 0) / gradientColors.length;

  return avgLuminance > threshold;
}

/**
 * Determines if a gradient or color value is "dark" (needs light text).
 *
 * @param value CSS gradient or color string
 * @param threshold Luminance threshold (default 0.3)
 * @returns true if background is dark and needs light text
 */
export function isDarkBackground(value: string, threshold = 0.3): boolean {
  // Handle solid colors
  const solidColor = parseColor(value);
  if (solidColor) {
    return calculateLuminance(solidColor) < threshold;
  }

  // Handle gradients
  const gradientColors = extractGradientColors(value);
  if (gradientColors.length === 0) {
    return true; // Unknown format, assume dark
  }

  // Calculate average luminance
  const avgLuminance = gradientColors.reduce((sum, color) => {
    return sum + calculateLuminance(color);
  }, 0) / gradientColors.length;

  return avgLuminance < threshold;
}

/**
 * Gets the appropriate content class based on background luminance.
 * Returns a class that forces light or dark text styling.
 *
 * @param backgroundValue CSS gradient or color string
 * @returns CSS class name for content styling
 */
export function getContentContrastClass(backgroundValue: string): 'light-content' | 'dark-content' | null {
  if (!backgroundValue || backgroundValue === 'none') {
    return null;
  }

  // Light backgrounds need dark text
  if (isLightBackground(backgroundValue)) {
    return 'dark-content';
  }

  // Dark backgrounds need light text (but this is usually the default in dark mode)
  if (isDarkBackground(backgroundValue)) {
    return 'light-content';
  }

  return null;
}
