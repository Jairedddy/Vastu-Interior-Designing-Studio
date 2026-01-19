import React, { useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { GalleryImage } from '../types';

export interface GalleryLightboxProps {
  images: GalleryImage[];
  open: boolean;
  index: number;
  onClose: () => void;
}

/**
 * GalleryLightbox Component
 * Custom-styled lightbox with keyboard navigation and pinch zoom
 */
const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ images, open, index, onClose }) => {
  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Convert GalleryImage to Lightbox slides with captions
  const slides = images.map((image) => ({
    src: image.src,
    alt: image.alt,
    description: `${image.neighborhood} • ${image.squareFootage.toLocaleString()} sqft • ${image.yearBuilt}`,
  }));

  return (
    <>
      <Lightbox
        open={open}
        close={onClose}
        index={index}
        slides={slides}
        render={{
          buttonPrev: (props) => {
            if (!props) return null;
            const { disabled = false, onClick } = props;
            return (
              <button
                onClick={onClick}
                disabled={disabled}
                className="yal-slide-btn yal-slide-btn-prev"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            );
          },
          buttonNext: (props) => {
            if (!props) return null;
            const { disabled = false, onClick } = props;
            return (
              <button
                onClick={onClick}
                disabled={disabled}
                className="yal-slide-btn yal-slide-btn-next"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          },
          buttonClose: (props) => {
            if (!props) return null;
            const { onClick } = props;
            return (
              <button
                onClick={onClick}
                className="yal-slide-btn yal-slide-btn-close"
                aria-label="Close lightbox"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            );
          },
        }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        carousel={{ finite: false }}
        zoom={{ maxZoomPixelRatio: 3, zoomInMultiplier: 2, doubleTapDelay: 300 }}
      />
      
      {/* Custom Styles */}
      <style>{`
        /* Lightbox backdrop */
        .yal-slide {
          background-color: #0d0d0d !important;
        }
        
        /* Lightbox container */
        .yal-container {
          background-color: #0d0d0d !important;
        }
        
        /* Navigation buttons */
        .yal-slide-btn {
          background-color: rgba(26, 26, 26, 0.8) !important;
          border: 1px solid rgba(245, 242, 237, 0.1) !important;
          color: #f5f2ed !important;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        
        .yal-slide-btn:hover {
          background-color: rgba(140, 126, 109, 0.2) !important;
          border-color: #8c7e6d !important;
        }
        
        .yal-slide-btn:active {
          transform: scale(0.95);
        }
        
        /* Close button */
        .yal-slide-btn-close {
          top: 1.5rem !important;
          right: 1.5rem !important;
        }
        
        /* Prev/Next buttons */
        .yal-slide-btn-prev,
        .yal-slide-btn-next {
          width: 3rem !important;
          height: 3rem !important;
        }
        
        /* Caption */
        .yal-slide-description {
          color: #f5f2ed !important;
          background-color: rgba(26, 26, 26, 0.9) !important;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-top: 1px solid rgba(140, 126, 109, 0.2) !important;
          padding: 1.5rem !important;
          font-size: 0.875rem !important;
          font-weight: 300 !important;
          letter-spacing: 0.05em !important;
          text-transform: uppercase !important;
        }
        
        /* Image */
        .yal-slide-image {
          object-fit: contain !important;
        }
        
        /* Thumbnails (if enabled) */
        .yal-thumbnail {
          border: 1px solid rgba(245, 242, 237, 0.1) !important;
        }
        
        .yal-thumbnail:hover {
          border-color: #8c7e6d !important;
        }
        
        .yal-thumbnail-active {
          border-color: #8c7e6d !important;
        }
      `}</style>
    </>
  );
};

export default GalleryLightbox;
