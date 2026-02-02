/**
 * Estate Noir Design System Tokens
 * Premium design tokens for luxury real estate application
 */

// Base Colors - Onyx/Ivory/Brass Palette
export const colors = {
  // Primary Palette
  onyx: {
    50: '#1a1a1a',
    100: '#0d0d0d', // Primary background
    200: '#050505',
  },
  ivory: {
    50: '#f5f2ed', // Primary text
    100: '#e8e4dd',
    200: '#d4cec4',
    300: '#b8b0a3',
  },
  brass: {
    50: '#8c7e6d', // Primary accent
    100: '#a69582',
    200: '#c4b5a0',
    300: '#6b5f52',
  },
  
  // Semantic Colors
  background: {
    primary: '#0d0d0d',
    secondary: '#1a1a1a',
    tertiary: '#050505',
  },
  surface: {
    primary: '#1a1a1a',
    secondary: '#0d0d0d',
    elevated: '#2a2a2a',
  },
  text: {
    primary: '#f5f2ed',
    secondary: '#e8e4dd',
    tertiary: '#b8b0a3',
    muted: '#8c7e6d',
  },
  border: {
    primary: 'rgba(245, 242, 237, 0.1)',
    secondary: 'rgba(245, 242, 237, 0.05)',
    accent: '#8c7e6d',
    hairline: 'rgba(140, 126, 109, 0.3)',
  },
  accent: {
    primary: '#8c7e6d',
    hover: '#a69582',
    glow: 'rgba(140, 126, 109, 0.15)',
  },
} as const;

// Spacing Scale (4px base unit)
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  60: '15rem',    // 240px
  80: '20rem',    // 320px
} as const;

// Border Radius Scale
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

// Shadow Tokens
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  accent: '0 0 20px rgba(140, 126, 109, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  glow: '0 0 30px rgba(140, 126, 109, 0.2)',
} as const;

// Typography Scale
export const typography = {
  fontFamily: {
    display: ['VastuDisplay', 'Georgia', 'serif'],
    body: ['VastuBody', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    accent: ['VastuAccent', 'VastuDisplay', 'Georgia', 'serif'],
    mono: ['ui-monospace', 'monospace'],
  },
  fontSize: {
    xs: ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],      // 10px
    sm: ['0.75rem', { lineHeight: '1.25rem', letterSpacing: '0.05em' }],   // 12px
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],          // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0' }],        // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0' }],         // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],     // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],  // 36px
    '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.03em' }],          // 48px
    '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.03em' }],        // 60px
    '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],         // 72px
    '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.04em' }],          // 96px
    '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.05em' }],           // 128px
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    ultra: '0.4em',
    mega: '0.6em',
  },
} as const;

// Icon Tokens
export const icons = {
  size: {
    xs: '0.75rem',   // 12px
    sm: '1rem',      // 16px
    base: '1.25rem', // 20px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '2.5rem',    // 40px
  },
  strokeWidth: {
    hairline: '0.5',
    thin: '1',
    base: '1.2',
    medium: '1.5',
    bold: '2',
  },
} as const;

// Signature Accents
export const accents = {
  hairline: {
    width: '1px',
    color: 'rgba(140, 126, 109, 0.3)',
  },
  grain: {
    opacity: '0.03',
    pattern: 'url("https://www.transparenttextures.com/patterns/stardust.png")',
  },
  glow: {
    primary: 'rgba(140, 126, 109, 0.15)',
    soft: 'rgba(245, 242, 237, 0.1)',
  },
} as const;

// Z-Index Scale
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  hero: 20,
  content: 30,
  overlay: 50,
} as const;

// Export all tokens as a single object for easy access
export const tokens = {
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
  icons,
  accents,
  zIndex,
} as const;

// Type exports for TypeScript
export type ColorToken = typeof colors;
export type SpacingToken = typeof spacing;
export type BorderRadiusToken = typeof borderRadius;
export type ShadowToken = typeof shadows;
export type TypographyToken = typeof typography;
