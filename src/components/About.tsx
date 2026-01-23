import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import SmartImage from './SmartImage';
import { colors } from '../lib/design-tokens';

const About: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen" style={{ backgroundColor: colors.background.primary, overflow: 'hidden' }}>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes reveal-slow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          opacity: 0;
          animation: fade-in-up 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-reveal-slow {
          opacity: 0;
          animation: reveal-slow 2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* Subtle Background Texture */}
      <div className="fixed inset-0 z-0 h-screen overflow-hidden opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.3}px) scale(1.05)`,
            filter: 'brightness(0.2) contrast(1.2)'
          }}
        >
          <SmartImage
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000"
            alt="Studio"
            className="w-full h-full"
            sizes="100vw"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 md:pt-40 pb-40 md:pb-60 px-8 md:px-20">
        <div className="max-w-screen-2xl mx-auto">
          {/* Hero Section */}
          <div className="mb-32 md:mb-48">
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-6 mb-8">
                <div className="h-px w-12" style={{ backgroundColor: colors.border.hairline }} />
                <span className="text-[10px] tracking-[0.6em] uppercase" style={{ color: colors.brass[50], opacity: 0.6 }}>
                  Studio of Spatial Intent
                </span>
              </div>
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-serif italic tracking-tight leading-[0.92] mb-8 animate-fade-in" style={{ animationDelay: '300ms', color: colors.text.primary }}>
              We Architect <br /> Silence.
            </h1>
            <p className="text-lg md:text-xl font-light leading-relaxed max-w-2xl animate-fade-in" style={{ animationDelay: '500ms', color: colors.text.secondary, opacity: 0.8 }}>
              Vastu is a private interior design studio that curates spaces where materiality, light, and form converge to create environments of profound tranquility.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-32 md:mb-48">
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '700ms' }}>
              <SectionHeader
                label="Our Story"
                title="Founded on the principle that space is the ultimate luxury."
                showBorder={true}
              />
            </div>
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '900ms' }}>
              <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: colors.text.secondary, opacity: 0.75 }}>
                Since our inception, we have been committed to creating interiors that serve as sanctuaries—spaces that allow for both contemplation and connection. Our work is rooted in the belief that true design excellence lies not in decoration, but in the careful orchestration of emptiness and form.
              </p>
              <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: colors.text.secondary, opacity: 0.75 }}>
                We approach each project as a unique narrative, where materials tell stories, light shapes emotion, and silence becomes the canvas for life's most meaningful moments.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-12 md:gap-20 mb-32 md:mb-48">
            {[
              {
                number: '01',
                title: 'Material Integrity',
                description: 'We select materials for their inherent character, not their surface appeal. Every stone, wood, and metal is chosen for its ability to age gracefully and hold meaning.'
              },
              {
                number: '02',
                title: 'Spatial Poetry',
                description: 'Our designs prioritize the spaces between objects as much as the objects themselves. We curate emptiness to allow clarity of thought and presence.'
              },
              {
                number: '03',
                title: 'Vernacular Modernism',
                description: 'Rooted in Indian architectural traditions, we execute with contemporary global precision, creating spaces that feel both timeless and distinctly of this moment.'
              }
            ].map((value, idx) => (
              <div key={idx} className="group animate-fade-in" style={{ animationDelay: `${1100 + idx * 200}ms` }}>
                <div className="mb-6 relative">
                  <span className="text-[6rem] md:text-[8rem] font-serif italic leading-none block select-none" style={{ color: colors.text.primary, opacity: 0.03 }}>
                    {value.number}
                  </span>
                  <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-1000" style={{ backgroundColor: colors.border.accent }} />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif italic mb-4 leading-tight" style={{ color: colors.text.primary }}>
                  {value.title}
                </h3>
                <p className="text-sm md:text-base font-light leading-relaxed" style={{ color: colors.text.tertiary, opacity: 0.7 }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Locations */}
          <div className="border-t pt-16 md:pt-20 animate-fade-in" style={{ animationDelay: '1700ms', borderColor: colors.border.primary }}>
            <div className="flex items-center gap-6 mb-12">
              <div className="h-px w-12" style={{ backgroundColor: colors.border.hairline }} />
              <span className="text-[10px] tracking-[0.6em] uppercase" style={{ color: colors.brass[50], opacity: 0.6 }}>
                Presence
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-12 md:gap-20">
              {[
                { city: 'Mumbai', address: 'Worli, Mumbai 400018', country: 'India' },
                { city: 'New Delhi', address: 'Lutyens, New Delhi 110001', country: 'India' },
                { city: 'Dubai', address: 'Downtown, Dubai', country: 'UAE' }
              ].map((location, idx) => (
                <div key={idx} className="group">
                  <div className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: colors.text.tertiary, opacity: 0.5 }}>
                    Studio {location.city}
                  </div>
                  <div className="text-base md:text-lg font-light mb-2" style={{ color: colors.text.secondary, opacity: 0.8 }}>
                    {location.address}
                  </div>
                  <div className="text-sm font-light" style={{ color: colors.text.tertiary, opacity: 0.5 }}>
                    {location.country}
                  </div>
                  <div className="h-px w-0 mt-6 group-hover:w-full transition-all duration-1000" style={{ backgroundColor: colors.border.accent }} />
                </div>
              ))}
            </div>
          </div>

          {/* Closing Statement */}
          <div className="mt-32 md:mt-48 text-center animate-reveal-slow" style={{ animationDelay: '1900ms' }}>
            <p className="text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto" style={{ color: colors.text.secondary, opacity: 0.6 }}>
              We invite you to experience spaces where design serves silence, and silence serves life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
