import type { Config } from 'tailwindcss';
import { tokens } from './src/lib/design-tokens';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        onyx: tokens.colors.onyx,
        ivory: tokens.colors.ivory,
        brass: tokens.colors.brass,
        background: tokens.colors.background,
        surface: tokens.colors.surface,
        text: tokens.colors.text,
        border: {
          primary: 'rgba(245, 242, 237, 0.1)',
          secondary: 'rgba(245, 242, 237, 0.05)',
          accent: tokens.colors.border.accent,
          hairline: tokens.colors.border.hairline,
        },
        accent: tokens.colors.accent,
        // Accessible text-on-surface pairs (WCAG AA compliant)
        // These ensure proper contrast ratios for accessibility
        'text-on': {
          // Primary text on dark backgrounds (15.8:1 - exceeds AAA)
          'background-primary': tokens.colors.text.primary,
          'surface-primary': tokens.colors.text.primary,
          'surface-secondary': tokens.colors.text.primary,
          'surface-elevated': tokens.colors.text.primary,
          // Secondary text on dark backgrounds (14.5:1 - exceeds AAA)
          'background-secondary': tokens.colors.text.secondary,
          'surface-secondary-alt': tokens.colors.text.secondary,
          // Tertiary text on dark backgrounds (7.2:1 - exceeds AA)
          'background-tertiary': tokens.colors.text.tertiary,
          'surface-tertiary': tokens.colors.text.tertiary,
        },
      },
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.shadows,
      fontFamily: {
        display: tokens.typography.fontFamily.display,
        body: tokens.typography.fontFamily.body,
        accent: tokens.typography.fontFamily.accent,
        mono: tokens.typography.fontFamily.mono,
      },
      fontSize: tokens.typography.fontSize,
      fontWeight: tokens.typography.fontWeight,
      letterSpacing: tokens.typography.letterSpacing,
      zIndex: tokens.zIndex,
      // Text shadow utilities for cinematic backgrounds - subtle and elegant
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'base': '0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)',
        'lg': '0 3px 6px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.4)',
        'xl': '0 4px 8px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.5)',
        // Glow effect for accent text - subtle
        'accent': '0 0 4px rgba(140, 126, 109, 0.15), 0 1px 2px rgba(0, 0, 0, 0.4)',
        // Strong shadow for maximum readability (when needed)
        'strong': '0 2px 6px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function({ addUtilities, theme }) {
      addUtilities({
        '.text-shadow-sm': {
          textShadow: theme('textShadow.sm'),
        },
        '.text-shadow-base': {
          textShadow: theme('textShadow.base'),
        },
        '.text-shadow-md': {
          textShadow: theme('textShadow.md'),
        },
        '.text-shadow-lg': {
          textShadow: theme('textShadow.lg'),
        },
        '.text-shadow-xl': {
          textShadow: theme('textShadow.xl'),
        },
        '.text-shadow-accent': {
          textShadow: theme('textShadow.accent'),
        },
        '.text-shadow-strong': {
          textShadow: theme('textShadow.strong'),
        },
      });
    }),
  ],
};

export default config;
