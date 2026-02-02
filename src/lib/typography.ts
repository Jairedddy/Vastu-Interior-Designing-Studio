/**
 * Typography Utility Functions
 * Estate Noir Design System - Premium Typography Utilities
 * 
 * Provides utility functions for consistent typography usage across components
 */

import { typography } from './design-tokens';

/**
 * Font Family Utilities
 */
export const fontFamilies = {
  display: typography.fontFamily.display.join(', '),
  body: typography.fontFamily.body.join(', '),
  accent: typography.fontFamily.accent.join(', '),
  mono: typography.fontFamily.mono.join(', '),
} as const;

/**
 * Font Size Utilities
 * Returns formatted font size with line height and letter spacing
 */
export const getFontSize = (size: keyof typeof typography.fontSize): string => {
  const [fontSize, { lineHeight, letterSpacing }] = typography.fontSize[size];
  return `${fontSize} / ${lineHeight} ${fontSize}`;
};

/**
 * Font Size CSS Object
 * Returns CSS object with fontSize, lineHeight, and letterSpacing
 */
export const getFontSizeCSS = (size: keyof typeof typography.fontSize) => {
  const [fontSize, { lineHeight, letterSpacing }] = typography.fontSize[size];
  return {
    fontSize,
    lineHeight,
    letterSpacing,
  };
};

/**
 * Font Weight Utilities
 */
export const fontWeights = {
  light: typography.fontWeight.light,
  normal: typography.fontWeight.normal,
  medium: typography.fontWeight.medium,
  semibold: typography.fontWeight.semibold,
  bold: typography.fontWeight.bold,
} as const;

/**
 * Letter Spacing Utilities
 */
export const letterSpacings = {
  tighter: typography.letterSpacing.tighter,
  tight: typography.letterSpacing.tight,
  normal: typography.letterSpacing.normal,
  wide: typography.letterSpacing.wide,
  wider: typography.letterSpacing.wider,
  widest: typography.letterSpacing.widest,
  ultra: typography.letterSpacing.ultra,
  mega: typography.letterSpacing.mega,
} as const;

/**
 * Typography Presets
 * Pre-configured typography styles for common use cases
 */
export const typographyPresets = {
  // Display Presets
  hero: {
    fontFamily: fontFamilies.display,
    fontSize: typography.fontSize['7xl'][0],
    lineHeight: typography.fontSize['7xl'][1].lineHeight,
    letterSpacing: typography.fontSize['7xl'][1].letterSpacing,
    fontWeight: fontWeights.bold,
  },
  h1: {
    fontFamily: fontFamilies.display,
    fontSize: typography.fontSize['5xl'][0],
    lineHeight: typography.fontSize['5xl'][1].lineHeight,
    letterSpacing: typography.fontSize['5xl'][1].letterSpacing,
    fontWeight: fontWeights.bold,
  },
  h2: {
    fontFamily: fontFamilies.display,
    fontSize: typography.fontSize['4xl'][0],
    lineHeight: typography.fontSize['4xl'][1].lineHeight,
    letterSpacing: typography.fontSize['4xl'][1].letterSpacing,
    fontWeight: fontWeights.semibold,
  },
  h3: {
    fontFamily: fontFamilies.display,
    fontSize: typography.fontSize['3xl'][0],
    lineHeight: typography.fontSize['3xl'][1].lineHeight,
    letterSpacing: typography.fontSize['3xl'][1].letterSpacing,
    fontWeight: fontWeights.semibold,
  },
  h4: {
    fontFamily: fontFamilies.display,
    fontSize: typography.fontSize['2xl'][0],
    lineHeight: typography.fontSize['2xl'][1].lineHeight,
    letterSpacing: typography.fontSize['2xl'][1].letterSpacing,
    fontWeight: fontWeights.medium,
  },
  
  // Body Presets
  body: {
    fontFamily: fontFamilies.body,
    fontSize: typography.fontSize.base[0],
    lineHeight: typography.fontSize.base[1].lineHeight,
    letterSpacing: typography.fontSize.base[1].letterSpacing,
    fontWeight: fontWeights.normal,
  },
  bodyLarge: {
    fontFamily: fontFamilies.body,
    fontSize: typography.fontSize.lg[0],
    lineHeight: typography.fontSize.lg[1].lineHeight,
    letterSpacing: typography.fontSize.lg[1].letterSpacing,
    fontWeight: fontWeights.normal,
  },
  bodySmall: {
    fontFamily: fontFamilies.body,
    fontSize: typography.fontSize.sm[0],
    lineHeight: typography.fontSize.sm[1].lineHeight,
    letterSpacing: typography.fontSize.sm[1].letterSpacing,
    fontWeight: fontWeights.normal,
  },
  
  // Accent Presets
  accent: {
    fontFamily: fontFamilies.accent,
    fontSize: typography.fontSize.base[0],
    lineHeight: typography.fontSize.base[1].lineHeight,
    letterSpacing: letterSpacings.wide,
    fontWeight: fontWeights.medium,
  },
  accentLarge: {
    fontFamily: fontFamilies.accent,
    fontSize: typography.fontSize.xl[0],
    lineHeight: typography.fontSize.xl[1].lineHeight,
    letterSpacing: letterSpacings.wider,
    fontWeight: fontWeights.medium,
  },
  
  // Caption Presets
  caption: {
    fontFamily: fontFamilies.body,
    fontSize: typography.fontSize.xs[0],
    lineHeight: typography.fontSize.xs[1].lineHeight,
    letterSpacing: typography.fontSize.xs[1].letterSpacing,
    fontWeight: fontWeights.normal,
  },
  captionSmall: {
    fontFamily: fontFamilies.body,
    fontSize: typography.fontSize.xs[0],
    lineHeight: typography.fontSize.xs[1].lineHeight,
    letterSpacing: letterSpacings.wider,
    fontWeight: fontWeights.light,
  },
} as const;

/**
 * Apply Typography Preset
 * Returns a CSS object for use in styled components or inline styles
 */
export const applyTypographyPreset = (
  preset: keyof typeof typographyPresets
): React.CSSProperties => {
  return typographyPresets[preset] as React.CSSProperties;
};

/**
 * Get Responsive Font Size
 * Returns font size adjusted for different breakpoints
 */
export const getResponsiveFontSize = (
  baseSize: keyof typeof typography.fontSize,
  breakpoints?: {
    sm?: keyof typeof typography.fontSize;
    md?: keyof typeof typography.fontSize;
    lg?: keyof typeof typography.fontSize;
  }
): string => {
  const base = typography.fontSize[baseSize][0];
  
  if (!breakpoints) {
    return base;
  }
  
  // This would typically be used with CSS media queries
  // For now, returns base size - implement responsive logic as needed
  return base;
};

/**
 * Type exports
 */
export type FontFamily = keyof typeof fontFamilies;
export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof fontWeights;
export type LetterSpacing = keyof typeof letterSpacings;
export type TypographyPreset = keyof typeof typographyPresets;
