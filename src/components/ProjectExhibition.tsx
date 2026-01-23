
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import ListingMap from './ListingMap';
import SmartImage from './SmartImage';

const ProjectExhibition: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingToDetails, setIsScrollingToDetails] = useState(false);
  
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Auto-collapse when scrolling to top (but not if we're currently scrolling to details)
      if (isExpanded && !isScrollingToDetails && currentScrollY < 50) {
        setIsExpanded(false);
      }
      
      // Reset scrolling flag once we've scrolled past a threshold
      if (isScrollingToDetails && currentScrollY > 100) {
        setIsScrollingToDetails(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded, isScrollingToDetails]);

  const nextProject = () => {
    if (isTransitioning || isExpanded) return;
    setDirection('next');
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setPrevIndex(null);
    }, 1800);
  };

  const prevProject = () => {
    if (isTransitioning || isExpanded) return;
    setDirection('prev');
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setPrevIndex(null);
    }, 1800);
  };

  const handleShowDetails = () => {
    setIsExpanded(true);
    setIsScrollingToDetails(true);
    
    // Wait a bit for the DOM to update, then scroll
    setTimeout(() => {
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: window.innerHeight * 0.4, behavior: 'smooth' });
      }
      
      // Reset scrolling flag after scroll completes (smooth scroll takes ~500ms)
      setTimeout(() => {
        setIsScrollingToDetails(false);
      }, 800);
    }, 100);
  };

  const currentProject = PROJECTS[currentIndex];
  const previousProject = prevIndex !== null ? PROJECTS[prevIndex] : null;

  return (
    <section className={`relative w-full bg-background-primary ${isExpanded ? 'min-h-screen' : 'h-screen overflow-hidden'}`}>
      <style>{`
        @keyframes project-cinematic-zoom {
          from { transform: scale(1.05); }
          to { transform: scale(1.15); }
        }
        @keyframes recede-blur {
          0% { transform: scale(1.1); filter: blur(0px); opacity: 1; }
          100% { transform: scale(0.95); filter: blur(40px); opacity: 0; }
        }
        @keyframes curtain-wipe-right {
          0% { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes curtain-wipe-left {
          0% { clip-path: inset(0 0 0 100%); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes text-reveal-fade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-project-zoom {
          animation: project-cinematic-zoom 20s ease-out infinite alternate;
        }
        .animate-recede-blur {
          animation: recede-blur 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-curtain-next {
          animation: curtain-wipe-right 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-curtain-prev {
          animation: curtain-wipe-left 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-text-delayed {
          opacity: 0;
          animation: text-reveal-fade 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .material-reveal-container {
          clip-path: inset(100% 0 0 0);
          transition: clip-path 1.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .material-reveal-container.revealed {
          clip-path: inset(0 0 0 0);
        }
      `}</style>
      
      {/* Parallax Hero Image */}
      <div className={`${isExpanded ? 'fixed' : 'absolute'} inset-0 z-0 h-screen overflow-hidden`}>
        {previousProject && !isExpanded && (
          <div className="absolute inset-0 z-0">
            <SmartImage
              src={previousProject.imageUrl}
              alt=""
              className="w-full h-full animate-recede-blur"
              objectFit="cover"
              sizes="100vw"
            />
          </div>
        )}

        <div 
          key={currentProject.id}
          className={`absolute inset-0 z-10 overflow-hidden ${isTransitioning ? (direction === 'next' ? 'animate-curtain-next' : 'animate-curtain-prev') : ''}`}
        >
          <div 
            className="w-full h-full animate-project-zoom will-change-transform"
            style={{ 
              transform: isExpanded ? `translateY(${scrollY * 0.4}px)` : 'none',
              filter: isExpanded ? `brightness(${Math.max(0.1, 0.6 - scrollY / 1000)})` : 'none'
            }}
          >
            <SmartImage
              src={currentProject.imageUrl}
              alt={currentProject.title}
              className="w-full h-full"
              critical={currentIndex === 0}
              sizes="100vw"
              objectFit="cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-transparent to-transparent opacity-60" />
        </div>
      </div>

      {/* Hero Text Overlay */}
      <div className={`relative h-screen flex flex-col justify-end px-8 md:px-20 pb-20 md:pb-32 max-w-screen-2xl mx-auto z-20 transition-opacity duration-700 ${isExpanded && scrollY > 200 ? 'opacity-0' : 'opacity-100'}`}>
        <div className={`transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div className={`flex items-center space-x-4 mb-6 ${!isTransitioning ? 'animate-text-delayed' : ''}`} style={{ animationDelay: '100ms' }}>
            <span className="text-xs tracking-[0.4em] uppercase text-text-primary text-shadow-sm opacity-80">{currentProject.id} / 04</span>
            <span className="h-px w-12 bg-brass-50 opacity-60" />
            <span className="text-xs tracking-[0.4em] uppercase text-text-primary text-shadow-sm opacity-80">{currentProject.category}</span>
          </div>
          
          <div className="mb-12">
            <h2 className={`text-5xl md:text-8xl font-serif max-w-4xl tracking-tight leading-[0.9] cursor-default transition-all duration-700 text-text-primary text-shadow-md ${!isTransitioning ? 'animate-text-delayed' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
              {currentProject.title}
            </h2>
            <p className={`hidden md:block text-sm md:text-base font-light leading-relaxed text-text-primary text-shadow-sm opacity-90 mt-4 max-w-2xl ${!isTransitioning ? 'animate-text-delayed' : 'opacity-0'}`} style={{ animationDelay: '500ms' }}>
              {currentProject.description}
            </p>
          </div>
          
          <div className="flex justify-between items-end border-t border-primary pt-12">
            <div className="flex flex-col space-y-10 items-start">
              <div className={`text-[10px] tracking-[0.4em] uppercase text-text-primary text-shadow-sm ${!isTransitioning ? 'animate-text-delayed' : 'opacity-0'}`} style={{ animationDelay: '700ms' }}>
                {currentProject.location} — {currentProject.year}
              </div>
              
              {!isExpanded && (
                <button 
                  onClick={handleShowDetails}
                  className={`group flex items-center space-x-6 text-[10px] uppercase tracking-[0.6em] text-text-primary text-shadow-sm md:hover:text-accent-primary transition-all ${!isTransitioning ? 'animate-text-delayed' : 'opacity-0'}`}
                  style={{ animationDelay: '900ms' }}
                >
                  <span className="md:group-hover:-translate-x-2 transition-transform duration-500">Show Details</span>
                  <span className="w-10 h-px bg-border-primary md:group-hover:bg-accent-primary md:group-hover:w-20 transition-all duration-700" />
                </button>
              )}
            </div>
            
            {!isExpanded && (
              <div className="flex space-x-4 md:space-x-6 mb-20 md:mb-0">
                <button 
                  onClick={prevProject} 
                  disabled={isTransitioning}
                  className={`group relative p-3 md:p-4 border border-primary rounded-full transition-all duration-500 text-text-primary overflow-hidden ${isTransitioning ? 'opacity-20 cursor-default' : 'hover:border-accent-primary'}`}
                  aria-label="Previous project"
                >
                  <div className="absolute inset-0 bg-accent-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                  onClick={nextProject} 
                  disabled={isTransitioning}
                  className={`group relative p-3 md:p-4 border border-primary rounded-full transition-all duration-500 text-text-primary overflow-hidden ${isTransitioning ? 'opacity-20 cursor-default' : 'hover:border-accent-primary'}`}
                  aria-label="Next project"
                >
                  <div className="absolute inset-0 bg-accent-primary translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content Flow */}
      {isExpanded && (
        <div ref={detailsRef} className="relative z-30 pt-40 bg-background-primary">
          {/* Narrative Section */}
          <section className="py-60 px-8 md:px-20 max-w-screen-xl mx-auto grid md:grid-cols-2 gap-24 items-start">
            <div className="space-y-16">
              <h2 className="text-4xl md:text-6xl font-serif italic leading-[1.1]">
                Curating the <br /> silent threshold.
              </h2>
              <div className="flex items-center space-x-6">
                <div className="w-12 h-px bg-accent-primary" />
                <div className="text-[10px] tracking-[0.6em] uppercase text-accent-primary text-muted-large">The Design Ethos</div>
              </div>
            </div>
            <div className="space-y-10">
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-text-primary opacity-95">
                {currentProject.description} We approached this project as a series of visual frames, where each transition reveals a new material narrative.
              </p>
              <p className="text-lg font-light leading-relaxed text-text-secondary opacity-80">
                The spatial configuration prioritizes natural circulation and indirect lighting, ensuring that the architecture serves as a backdrop for both silence and conversation. Every material choice was guided by longevity and tactile resonance.
              </p>
            </div>
          </section>

          {/* Cinematic Gallery */}
          <section className="px-8 md:px-20 pb-40 space-y-40">
            {currentProject.gallery.map((img, idx) => (
              <div 
                key={idx} 
                className={`relative overflow-hidden aspect-[16/9] w-full group ${idx % 2 === 0 ? 'md:pr-32' : 'md:pl-32'}`}
              >
                <div 
                  className="w-full h-full overflow-hidden"
                >
                  <div className="w-full h-full transition-transform duration-[3s] group-hover:scale-105">
                    <SmartImage
                      src={img}
                      alt={`${currentProject.title} detail ${idx}`}
                      className="w-full h-full"
                      aspectRatio="16/9"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="absolute top-10 right-10 md:top-20 md:right-20 pointer-events-none">
                  <span className="text-[8px] tracking-[0.5em] uppercase text-text-tertiary text-shadow-sm opacity-60">Interior Perspective — 0{idx + 1}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Artistic Materials Showcase */}
          <section className="py-80 bg-background-primary overflow-hidden">
            <div className="px-8 md:px-20 max-w-screen-2xl mx-auto">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-48 border-b border-[#f5f2ed10] pb-24">
                <div className="overflow-hidden">
                  <h3 className="text-7xl md:text-[12rem] font-serif italic tracking-tighter leading-none mb-8 opacity-90 animate-reveal" style={{ animationDelay: '100ms' }}>Matter.</h3>
                </div>
                <div className="max-w-md md:text-right">
                  <span className="text-[10px] tracking-[0.6em] uppercase text-accent-primary text-muted-large block mb-6">Inventory of Fragments</span>
                  <p className="text-xl font-light leading-relaxed text-text-tertiary opacity-70">
                    We select materials not for their surface value, but for their ability to hold shadow and record time. 
                  </p>
                </div>
              </div>
              
              {/* Staggered Material Plates */}
              <div className="space-y-[40vh]">
                {currentProject.materials.map((mat, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col ${idx % 2 === 0 ? 'items-start' : 'items-end'} relative w-full group`}
                  >
                    {/* Floating Material Number */}
                    <div className={`absolute ${idx % 2 === 0 ? 'right-0' : 'left-0'} top-0 text-[10rem] font-serif opacity-[0.03] select-none pointer-events-none`}>
                      0{idx + 1}
                    </div>

                    <div className={`relative ${idx % 2 === 0 ? 'w-full md:w-3/5' : 'w-full md:w-2/3'} overflow-hidden shadow-2xl`}>
                      <div className="aspect-[4/5] md:aspect-[16/10] overflow-hidden">
                        <div className="w-full h-full transition-all duration-[2.5s] ease-out group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0">
                          <SmartImage
                            src={mat.imageUrl}
                            alt={mat.name}
                            className="w-full h-full"
                            sizes="(max-width: 768px) 100vw, 60vw"
                            objectFit="cover"
                          />
                        </div>
                      </div>
                      
                      {/* Subtle Overlay Label */}
                      <div className={`absolute bottom-0 ${idx % 2 === 0 ? 'left-0' : 'right-0'} p-12 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent w-full md:w-auto`}>
                        <div className="flex flex-col space-y-4">
                          <span className="text-[10px] uppercase tracking-[0.6em] text-accent-primary text-muted-large">Composition</span>
                          <h4 className="text-4xl md:text-6xl font-serif italic tracking-tight text-text-primary">{mat.name}</h4>
                          <div className="h-px bg-border-primary w-12 group-hover:w-full transition-all duration-1000" />
                        </div>
                      </div>
                    </div>

                    {/* Meta Info Staggered */}
                    <div className={`mt-12 ${idx % 2 === 0 ? 'md:pl-24' : 'md:pr-24'} max-w-xs text-text-tertiary opacity-70 text-xs tracking-[0.4em] uppercase leading-relaxed font-light`}>
                      Sourced meticulously to maintain the project's tonal equilibrium. Tactile response: {idx === 0 ? 'Thermal & Raw' : 'Soft & Diffuse'}.
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Location Map Section */}
          {currentProject.coordinates && (
            <section className="py-40 bg-background-primary">
              <div className="px-8 md:px-20 max-w-screen-2xl mx-auto mb-12">
                <div className="flex items-center gap-6 mb-8">
                  <div className="h-px w-12 bg-accent-primary opacity-50" />
                  <span className="text-[10px] uppercase tracking-[0.6em] text-accent-primary text-muted-large font-light">
                    Location Context
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-serif italic mb-4 text-text-primary">
                  {currentProject.location}
                </h3>
                <p className="text-base font-light text-text-secondary opacity-85 max-w-2xl">
                  Precise location and neighborhood context.
                </p>
              </div>
              
              {/* Map Container with Borders */}
              <div className="px-8 md:px-20 max-w-screen-2xl mx-auto">
                <div 
                  className="relative overflow-hidden"
                    style={{
                      border: `1px solid var(--color-border-hairline)`,
                      borderRadius: '4px',
                      backgroundColor: 'var(--color-background-primary)',
                      boxShadow: 'var(--shadow-md)',
                    }}
                >
                  {/* Top border accent */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-px z-10 bg-border-hairline opacity-70"
                  />
                  
                  {/* Map */}
                  <div className="w-full" style={{ height: '500px' }}>
                    <ListingMap
                      focusedProject={currentProject}
                      zoom={14}
                    />
                  </div>
                  
                  {/* Bottom border accent */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-px z-10 bg-border-hairline opacity-70"
                  />
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      {/* Floating Action Button (FAB) for Consultation */}
      {!isExpanded && (
        <button 
          onClick={() => navigate('/consultation')}
          className="fixed bottom-8 md:bottom-12 right-8 md:right-12 z-50 group flex items-center space-x-5 bg-transparent"
        >
          <div className="flex flex-col items-end opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 group-hover:translate-x-0">
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-text-primary text-shadow-sm">Begin</span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-text-secondary text-shadow-sm opacity-70">Conversation</span>
          </div>
          <div className="w-14 h-14 rounded-full border border-primary flex items-center justify-center relative overflow-hidden transition-all duration-700 hover:border-accent-primary bg-background-primary/30 backdrop-blur-xl">
            <div className="absolute inset-0 bg-accent-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <svg className="w-5 h-5 relative z-10 text-text-primary group-hover:text-background-primary transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </button>
      )}

      {/* Side Counter */}
      {!isExpanded && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col space-y-8 items-center opacity-30 z-30">
          {PROJECTS.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-px transition-all duration-700 ${idx === currentIndex ? 'h-12 bg-text-primary' : 'h-6 bg-border-primary'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectExhibition;
