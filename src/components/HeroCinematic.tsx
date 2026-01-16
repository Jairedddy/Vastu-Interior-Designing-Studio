import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroCinematic: React.FC = () => {
  const navigate = useNavigate();
  // Art-directed images: different sources for mobile vs desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const desktopVideo = "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-a-minimalist-design-and-a-view-40118-large.mp4";
  const mobileImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80";
  
  // Light leak overlay gradient
  const lightLeakStyle = {
    background: `
      radial-gradient(circle at 20% 30%, rgba(140, 126, 109, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(245, 242, 237, 0.1) 0%, transparent 50%),
      linear-gradient(135deg, transparent 0%, rgba(140, 126, 109, 0.05) 50%, transparent 100%)
    `,
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0d0d0d]">
      {/* Grain overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] grain-overlay" />
      
      {/* Background layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isMobile ? (
          <img
            src={mobileImage}
            alt="Luxury property"
            className="w-full h-full object-cover scale-110"
            style={{
              filter: 'contrast(1.1) brightness(0.7)',
            }}
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110 will-change-transform"
            style={{
              filter: 'contrast(1.1) brightness(0.7)',
            }}
          >
            <source src={desktopVideo} type="video/mp4" />
          </video>
        )}
        
        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        
        {/* Light leak overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={lightLeakStyle}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-30 text-center px-6 max-w-6xl mx-auto">
        {/* Subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] md:text-xs uppercase tracking-[0.6em] mb-8 md:mb-12 block"
        >
          Studio of Spatial Intent
        </motion.span>

        {/* Editorial headline with highlight accent */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-8xl lg:text-9xl font-serif italic mb-8 md:mb-12 tracking-tight leading-[1.1]"
        >
          <span className="relative inline-block">
            Architecting
            <span className="absolute bottom-2 left-0 right-0 h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-[#8c7e6d] to-transparent opacity-40" />
          </span>
          <br />
          <span className="text-[#f5f2ed]">Silence.</span>
        </motion.h1>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
        >
          {/* Primary CTA */}
          <button
            onClick={() => navigate('/consultation')}
            className="group relative inline-flex items-center space-x-4 py-4 px-1 hover:space-x-6 transition-all duration-500"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] group-hover:opacity-60 transition-opacity">
              Book Consultation
            </span>
            <span className="w-12 h-px bg-[#f5f2ed] transition-all duration-500 group-hover:w-24 group-hover:bg-[#8c7e6d]" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => navigate('/exhibition')}
            className="group relative inline-flex items-center space-x-4 py-4 px-1 hover:space-x-6 transition-all duration-500 opacity-70 hover:opacity-100"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] group-hover:opacity-60 transition-opacity">
              Browse Projects
            </span>
            <span className="w-8 h-px bg-[#8c7e6d]/50 transition-all duration-500 group-hover:w-16 group-hover:bg-[#8c7e6d]" />
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-8 md:bottom-12 w-full px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[8px] md:text-[10px] tracking-[0.3em] uppercase z-30"
      >
        <div>© 2024 Vastu Studios</div>
        <div className="text-center sm:text-right">Private Residence & Commercial Legacies</div>
      </motion.div>
    </section>
  );
};

export default HeroCinematic;
