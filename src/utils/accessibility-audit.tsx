/**
 * Accessibility Audit Setup
 * Integrates @axe-core/react for development-time accessibility auditing
 * 
 * Usage: Import and call initializeAccessibilityAudit() in main.tsx during development
 */

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Initialize accessibility auditing in development mode
 * Call this function in main.tsx when in development
 */
export function initializeAccessibilityAudit() {
  if (import.meta.env.DEV) {
    import('@axe-core/react').then((axe) => {
      axe.default(React, ReactDOM, 1000, {
        rules: {
          // Focus on color contrast and text accessibility
          'color-contrast': { enabled: true },
          'color-contrast-enhanced': { enabled: true },
          'link-name': { enabled: true },
          'button-name': { enabled: true },
          'image-alt': { enabled: true },
        },
      });
    }).catch((err) => {
      // Silently fail if axe-core is not available
      console.warn('Accessibility audit not available:', err);
    });
  }
}
