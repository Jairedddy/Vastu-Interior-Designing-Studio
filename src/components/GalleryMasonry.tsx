import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GalleryImage } from '../types';
import SmartImage from './SmartImage';

export interface GalleryMasonryProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

/**
 * GalleryMasonry Component
 * Displays images in a masonry layout with editorial captions
 */
const GalleryMasonry: React.FC<GalleryMasonryProps> = ({ images, onImageClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="gallery-masonry-container">
      <style>{`
        .gallery-masonry-container {
          column-count: 1;
          column-gap: 1.5rem;
        }
        
        @media (min-width: 768px) {
          .gallery-masonry-container {
            column-count: 2;
          }
        }
        
        @media (min-width: 1024px) {
          .gallery-masonry-container {
            column-count: 3;
          }
        }
        
        @media (min-width: 1280px) {
          .gallery-masonry-container {
            column-count: 4;
          }
        }
        
        .gallery-masonry-item {
          break-inside: avoid;
          margin-bottom: 1.5rem;
          page-break-inside: avoid;
        }
      `}</style>
      
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="gallery-masonry-item group relative overflow-hidden cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onImageClick(index)}
        >
          {/* Image */}
          <div className="relative w-full overflow-hidden bg-[#1a1a1a]">
            <div className="w-full transition-transform duration-700 ease-out group-hover:scale-105">
              <SmartImage
                src={image.src}
                alt={image.alt}
                className="w-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                objectFit="cover"
              />
            </div>
            
            {/* Gradient overlay for caption readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Editorial Caption - Reveals on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: hoveredIndex === index ? 1 : 0,
              y: hoveredIndex === index ? 0 : 20,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-2">
              {/* Neighborhood */}
              <div className="text-[10px] uppercase tracking-[0.4em] text-[#8c7e6d] font-light">
                {image.neighborhood}
              </div>
              
              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-[#f5f2ed] font-light">
                <span>{image.squareFootage.toLocaleString()} sqft</span>
                <span className="h-px w-4 bg-[#8c7e6d] opacity-40" />
                <span>{image.yearBuilt}</span>
              </div>
            </div>
          </motion.div>

          {/* Subtle border on hover */}
          <div className="absolute inset-0 border border-[#8c7e6d] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
};

export default GalleryMasonry;
