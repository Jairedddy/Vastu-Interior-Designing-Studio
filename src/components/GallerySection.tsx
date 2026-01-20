import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { GalleryImage } from '../types';
import { colors, spacing, typography } from '../lib/design-tokens';
import GalleryMasonry from './GalleryMasonry';
import GalleryLightbox from './GalleryLightbox';
import SectionHeader from './SectionHeader';
import SmartImage from './SmartImage';

/**
 * GallerySection Component
 * Editorial-style gallery with film-strip carousel and masonry layout
 */
const GallerySection: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [filmStripIndex, setFilmStripIndex] = useState(0);

  // Transform project data into gallery images with metadata
  const galleryImages: GalleryImage[] = useMemo(() => {
    const images: GalleryImage[] = [];
    
    PROJECTS.forEach((project) => {
      // Generate square footage if not provided (mock data)
      const squareFootage = project.squareFootage || 
        (project.category === 'Residential' ? 3500 + Math.random() * 2000 :
         project.category === 'Commercial' ? 8000 + Math.random() * 5000 :
         5000 + Math.random() * 3000);

      project.gallery.forEach((imageUrl, idx) => {
        images.push({
          src: imageUrl,
          alt: `${project.title} - ${project.location} - Image ${idx + 1}`,
          neighborhood: project.location.split(',')[0], // Extract neighborhood
          squareFootage: Math.round(squareFootage),
          yearBuilt: project.year,
          projectId: project.id,
        });
      });
    });
    
    return images;
  }, []);

  // Featured images for film strip (first image from each project)
  const featuredImages = useMemo(() => {
    return PROJECTS.map((project) => ({
      src: project.gallery[0] || project.imageUrl,
      alt: project.title,
      projectId: project.id,
      title: project.title,
    }));
  }, []);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextFilmStrip = () => {
    setFilmStripIndex((prev) => (prev + 1) % featuredImages.length);
  };

  const prevFilmStrip = () => {
    setFilmStripIndex((prev) => (prev - 1 + featuredImages.length) % featuredImages.length);
  };

  const goToFilmStripImage = (index: number) => {
    setFilmStripIndex(index);
    // Find the corresponding image in gallery and open lightbox
    const project = PROJECTS[index];
    if (project && project.gallery.length > 0) {
      const galleryIndex = galleryImages.findIndex(
        (img) => img.projectId === project.id && img.src === project.gallery[0]
      );
      if (galleryIndex !== -1) {
        handleImageClick(galleryIndex);
      }
    }
  };

  return (
    <section className="relative min-h-screen" style={{ backgroundColor: colors.background.primary, paddingTop: spacing[40], paddingBottom: spacing[40], paddingLeft: spacing[8], paddingRight: spacing[8] }}>
      <div className="max-w-screen-2xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          label="Editorial Gallery"
          title="Curated Perspectives"
          subtitle="A visual narrative of spaces where materiality meets intention."
          align="left"
          className="mb-20"
        />

        {/* Film Strip Carousel - Featured Highlights */}
        <div style={{ marginBottom: spacing[32] }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="h-px" style={{ width: spacing[12], backgroundColor: colors.border.hairline }} />
              <span className="text-[10px] uppercase font-light" style={{ 
                letterSpacing: typography.letterSpacing.mega, 
                color: colors.brass[50] 
              }}>
                Featured Highlights
              </span>
            </div>
            
            {/* Navigation */}
            <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={prevFilmStrip}
                  className="p-2 border transition-all group"
                  style={{ 
                    borderColor: colors.border.primary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.border.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border.primary;
                  }}
                  aria-label="Previous featured image"
                >
                  <svg className="w-4 h-4 transition-colors" style={{ color: colors.text.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextFilmStrip}
                  className="p-2 border transition-all group"
                  style={{ 
                    borderColor: colors.border.primary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.border.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border.primary;
                  }}
                  aria-label="Next featured image"
                >
                  <svg className="w-4 h-4 transition-colors" style={{ color: colors.text.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <span className="text-xs font-light" style={{ color: colors.text.tertiary }}>
                {filmStripIndex + 1} / {featuredImages.length}
              </span>
            </div>
          </div>

          {/* Film Strip Container */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={filmStripIndex}
                className="cursor-pointer group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => goToFilmStripImage(filmStripIndex)}
              >
                <div className="relative aspect-[21/9] overflow-hidden" style={{ backgroundColor: colors.surface.primary }}>
                  <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <SmartImage
                      src={featuredImages[filmStripIndex].src}
                      alt={featuredImages[filmStripIndex].alt}
                      className="w-full h-full"
                      aspectRatio="21/9"
                      sizes="100vw"
                      objectFit="cover"
                    />
                  </div>
                  
                  {/* Overlay with title */}
                  <div className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to top, ${colors.background.primary}E6, transparent)` }}>
                    <div className="absolute bottom-0 left-0 right-0" style={{ padding: spacing[8] }}>
                      <div className="text-[10px] uppercase mb-2" style={{ 
                        letterSpacing: typography.letterSpacing.wide, 
                        color: colors.brass[50] 
                      }}>
                        {PROJECTS[filmStripIndex]?.category}
                      </div>
                      <h3 className="text-2xl md:text-4xl font-serif italic" style={{ color: colors.text.primary }}>
                        {featuredImages[filmStripIndex].title}
                      </h3>
                    </div>
                  </div>

                  {/* Film strip edge effect */}
                  <div className="absolute inset-0 border-t-2 border-b-2 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ borderColor: colors.border.accent }} />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Film Strip Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {featuredImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setFilmStripIndex(index)}
                  className="h-px transition-all duration-300"
                  style={{
                    width: index === filmStripIndex ? spacing[12] : spacing[6],
                    backgroundColor: index === filmStripIndex 
                      ? colors.border.accent 
                      : colors.border.secondary,
                  }}
                  onMouseEnter={(e) => {
                    if (index !== filmStripIndex) {
                      e.currentTarget.style.backgroundColor = colors.border.primary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== filmStripIndex) {
                      e.currentTarget.style.backgroundColor = colors.border.secondary;
                    }
                  }}
                  aria-label={`Go to featured image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Masonry Gallery */}
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-12">
            <div className="h-px" style={{ width: spacing[12], backgroundColor: colors.border.hairline }} />
            <span className="text-[10px] uppercase font-light" style={{ 
              letterSpacing: typography.letterSpacing.mega, 
              color: colors.brass[50] 
            }}>
              Complete Collection
            </span>
          </div>
          
          <GalleryMasonry images={galleryImages} onImageClick={handleImageClick} />
        </div>
      </div>

      {/* Lightbox */}
      <GalleryLightbox
        images={galleryImages}
        open={lightboxOpen}
        index={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
};

export default GallerySection;
