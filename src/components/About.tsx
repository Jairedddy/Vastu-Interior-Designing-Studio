import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';

const About: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0d0d0d] overflow-hidden">
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          opacity: 0;
          animation: fade-in-up 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* Parallax Background Image */}
      <div className="fixed inset-0 z-0 h-screen overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
            filter: 'brightness(0.3) contrast(1.1)'
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000" 
            alt="Studio" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#0d0d0d]/80 to-[#0d0d0d]" />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-40 pb-60 px-8 md:px-20">
        <div className="max-w-screen-2xl mx-auto">
          {/* Hero Section */}
          <div className="mb-40 md:mb-60">
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <span className="text-[10px] tracking-[0.6em] uppercase opacity-40 mb-8 block">
                Studio of Spatial Intent
              </span>
            </div>
            <h1 className="text-6xl md:text-[12rem] font-serif italic tracking-tight leading-[0.9] mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
              We Architect <br /> Silence.
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-60 max-w-3xl animate-fade-in" style={{ animationDelay: '500ms' }}>
              Vastu is a private interior design studio that curates spaces where materiality, light, and form converge to create environments of profound tranquility.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-20 md:gap-32 mb-40 md:mb-60">
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '700ms' }}>
              <SectionHeader
                label="Our Story"
                title="Founded on the principle that space is the ultimate luxury."
                showBorder={true}
              />
            </div>
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '900ms' }}>
              <p className="text-lg font-light leading-relaxed opacity-70">
                Since our inception, we have been committed to creating interiors that serve as sanctuaries—spaces that allow for both contemplation and connection. Our work is rooted in the belief that true design excellence lies not in decoration, but in the careful orchestration of emptiness and form.
              </p>
              <p className="text-lg font-light leading-relaxed opacity-70">
                We approach each project as a unique narrative, where materials tell stories, light shapes emotion, and silence becomes the canvas for life's most meaningful moments.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-16 md:gap-24 mb-40 md:mb-60">
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
              <div key={idx} className="animate-fade-in" style={{ animationDelay: `${1100 + idx * 200}ms` }}>
                <div className="mb-8">
                  <span className="text-[8rem] md:text-[12rem] font-serif italic opacity-[0.03] leading-none block select-none">
                    {value.number}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif italic mb-6 leading-tight">
                  {value.title}
                </h3>
                <p className="text-base font-light leading-relaxed opacity-60">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Locations */}
          <div className="border-t border-[rgba(245,242,237,0.1)] pt-20 animate-fade-in" style={{ animationDelay: '1700ms' }}>
            <SectionHeader
              label="Presence"
              title=""
              showBorder={false}
              className="mb-12"
            />
            <div className="grid md:grid-cols-3 gap-12 md:gap-20">
              {[
                { city: 'Mumbai', address: 'Worli, Mumbai 400018', country: 'India' },
                { city: 'New Delhi', address: 'Lutyens, New Delhi 110001', country: 'India' },
                { city: 'Dubai', address: 'Downtown, Dubai', country: 'UAE' }
              ].map((location, idx) => (
                <div key={idx} className="group">
                  <div className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-4">
                    Studio {location.city}
                  </div>
                  <div className="text-lg md:text-xl font-light opacity-70 mb-2">
                    {location.address}
                  </div>
                  <div className="text-sm font-light opacity-40">
                    {location.country}
                  </div>
                  <div className="h-px w-0 bg-[#8c7e6d] mt-6 group-hover:w-full transition-all duration-1000" />
                </div>
              ))}
            </div>
          </div>

          {/* Closing Statement */}
          <div className="mt-40 md:mt-60 text-center animate-fade-in" style={{ animationDelay: '1900ms' }}>
            <h2 className="text-6xl md:text-[15rem] font-serif italic opacity-[0.03] select-none tracking-tighter whitespace-nowrap mb-20">
              SILENCE IS ARCHITECTURE
            </h2>
            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-50 max-w-2xl mx-auto">
              We invite you to experience spaces where design serves silence, and silence serves life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
