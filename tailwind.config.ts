import type { Config } from 'tailwindcss';
import { tokens } from './src/lib/design-tokens';

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
      },
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.shadows,
      fontFamily: {
        display: tokens.typography.fontFamily.display,
        body: tokens.typography.fontFamily.body,
        mono: tokens.typography.fontFamily.mono,
      },
      fontSize: {
        xs: tokens.typography.fontSize.xs,
        sm: tokens.typography.fontSize.sm,
        base: tokens.typography.fontSize.base,
        lg: tokens.typography.fontSize.lg,
        xl: tokens.typography.fontSize.xl,
        '2xl': tokens.typography.fontSize['2xl'],
        '3xl': tokens.typography.fontSize['3xl'],
        '4xl': tokens.typography.fontSize['4xl'],
        '5xl': tokens.typography.fontSize['5xl'],
        '6xl': tokens.typography.fontSize['6xl'],
        '7xl': tokens.typography.fontSize['7xl'],
        '8xl': tokens.typography.fontSize['8xl'],
        '9xl': tokens.typography.fontSize['9xl'],
      },
      fontWeight: tokens.typography.fontWeight,
      letterSpacing: tokens.typography.letterSpacing,
      zIndex: tokens.zIndex,
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
