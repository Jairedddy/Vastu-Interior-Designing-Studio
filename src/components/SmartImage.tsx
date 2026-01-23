import React, { useState, useRef, useEffect } from 'react';
import { colors } from '../lib/design-tokens';

export interface SmartImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Whether this is a critical image (hero) that should be preloaded */
  critical?: boolean;
  /** Aspect ratio for placeholder (e.g., "16/9") */
  aspectRatio?: string;
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** Object fit CSS property */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** On load callback */
  onLoad?: () => void;
  /** On error callback */
  onError?: () => void;
}

/**
 * SmartImage Component
 * Optimized image component with responsive sets, lazy loading, and blur placeholders
 */
const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  style = {},
  critical = false,
  aspectRatio,
  sizes = '100vw',
  objectFit = 'cover',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [blurDataUrl, setBlurDataUrl] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate blur placeholder (simple base64 encoded tiny image)
  useEffect(() => {
    // Create a tiny 20x20 canvas for blur placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 20;
    canvas.height = 20;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Fill with dark background matching theme
      ctx.fillStyle = colors.background.primary;
      ctx.fillRect(0, 0, 20, 20);
      // Add subtle gradient
      const gradient = ctx.createLinearGradient(0, 0, 20, 20);
      gradient.addColorStop(0, colors.surface.primary);
      gradient.addColorStop(1, colors.background.primary);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 20, 20);
      setBlurDataUrl(canvas.toDataURL());
    }
  }, []);

  // Generate responsive srcset for local images
  const generateSrcSet = (_baseSrc: string): string | undefined => {
    // For external URLs (CDN), browsers handle srcset automatically if provided
    // For local images processed by vite-imagetools, you can use:
    // const src400 = new URL(`${_baseSrc}?w=400&format=webp`, import.meta.url).href;
    // const src800 = new URL(`${_baseSrc}?w=800&format=webp`, import.meta.url).href;
    // return `${src400} 400w, ${src800} 800w, ${_baseSrc} 1200w`;
    
    // For now, return undefined to use src (browsers will still lazy load)
    return undefined;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  // Preload critical images
  useEffect(() => {
    if (critical && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [critical, src]);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.background.primary,
    ...(aspectRatio && { aspectRatio }),
    ...style,
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    transition: 'opacity 0.5s ease-in-out',
    opacity: isLoaded ? 1 : 0,
  };

  const placeholderStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: blurDataUrl ? `url(${blurDataUrl})` : `linear-gradient(to bottom, ${colors.surface.primary}, ${colors.background.primary})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(20px)',
    transform: 'scale(1.1)',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.5s ease-in-out',
  };

  if (hasError) {
    return (
      <div
        className={className}
        style={{
          ...containerStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.surface.primary,
          border: `1px solid ${colors.border.primary}`,
        }}
      >
        <span style={{ color: colors.text.tertiary, fontSize: '12px' }}>
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      {/* Blur Placeholder */}
      {blurDataUrl && (
        <div style={placeholderStyle} aria-hidden="true" />
      )}
      
      {/* Actual Image */}
      <img
        ref={imgRef}
        src={src}
        srcSet={generateSrcSet(src)}
        sizes={sizes}
        alt={alt}
        loading={critical ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        style={imageStyle}
        className={isLoaded ? 'loaded' : 'loading'}
      />
      
      {/* Loading indicator (subtle) */}
      {!isLoaded && !hasError && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '2px',
            height: '2px',
            backgroundColor: colors.brass[50],
            opacity: 0.3,
            borderRadius: '50%',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default SmartImage;
