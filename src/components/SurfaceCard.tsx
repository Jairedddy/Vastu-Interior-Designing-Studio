import React from 'react';

export interface SurfaceCardProps {
  /** Card content */
  children: React.ReactNode;
  /** Elevation level */
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  /** Show border */
  showBorder?: boolean;
  /** Border variant */
  borderVariant?: 'primary' | 'accent' | 'hairline';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Hover effect */
  hover?: boolean;
}

/**
 * SurfaceCard Component
 * Consistent card styling with subtle elevation and borders
 */
const SurfaceCard: React.FC<SurfaceCardProps> = ({
  children,
  elevation = 'md',
  showBorder = true,
  borderVariant = 'primary',
  padding = 'md',
  className = '',
  onClick,
  hover = false,
}) => {
  const elevationClasses = {
    none: '',
    sm: 'shadow-[0_1px_2px_0_rgba(0,0,0,0.3)]',
    md: 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.4),0_2px_4px_-1px_rgba(0,0,0,0.2)]',
    lg: 'shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5),0_4px_6px_-2px_rgba(0,0,0,0.3)]',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12',
    xl: 'p-12 md:p-16',
  };

  const borderClasses = {
    primary: 'border border-[rgba(245,242,237,0.1)]',
    accent: 'border border-[#8c7e6d]',
    hairline: 'border-t border-b border-[rgba(140,126,109,0.3)]',
  };

  const baseClasses = `
    bg-[#1a1a1a]
    ${showBorder ? borderClasses[borderVariant] : ''}
    ${elevationClasses[elevation]}
    ${paddingClasses[padding]}
    ${hover ? 'transition-all duration-500 hover:bg-[#2a2a2a] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.5),0_10px_10px_-5px_rgba(0,0,0,0.2)]' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default SurfaceCard;
