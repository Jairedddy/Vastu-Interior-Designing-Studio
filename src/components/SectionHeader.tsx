import React from 'react';

export interface SectionHeaderProps {
  /** Label text (small uppercase text) */
  label?: string;
  /** Main heading text */
  title?: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Alignment of content */
  align?: 'left' | 'center' | 'right';
  /** Show brass hairline border */
  showBorder?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Optional icon element */
  icon?: React.ReactNode;
}

/**
 * SectionHeader Component
 * Consistent section header with brass hairline borders and typography hierarchy
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  align = 'left',
  showBorder = true,
  className = '',
  icon,
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const alignClass = alignmentClasses[align];

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {/* Label with hairline */}
      {label && (
        <div className={`flex items-center gap-6 mb-6 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
          {showBorder && align !== 'right' && (
            <div className="h-px w-12 bg-[#8c7e6d] opacity-30" />
          )}
          <span className="text-[10px] tracking-[0.6em] uppercase text-[#8c7e6d] font-light">
            {label}
          </span>
          {showBorder && align === 'right' && (
            <div className="h-px w-12 bg-[#8c7e6d] opacity-30" />
          )}
        </div>
      )}

      {/* Icon (if provided) */}
      {icon && (
        <div className="mb-6 text-[#8c7e6d]">
          {icon}
        </div>
      )}

      {/* Main Title */}
      {title && (
        <h2 className="text-4xl md:text-6xl font-serif italic leading-tight mb-6 text-[#f5f2ed]">
          {title}
        </h2>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="text-lg md:text-xl font-light leading-relaxed text-[#e8e4dd] opacity-70 max-w-3xl">
          {subtitle}
        </p>
      )}

      {/* Bottom hairline border */}
      {showBorder && (
        <div className={`h-px w-20 bg-[#8c7e6d] opacity-30 mt-8 ${align === 'center' ? 'mx-auto' : ''}`} />
      )}
    </div>
  );
};

export default SectionHeader;
