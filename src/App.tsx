import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ProjectExhibition from './components/ProjectExhibition';
import About from './components/About';
import ConsultationFlow from './components/ConsultationFlow';
import { AppView } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('hero');
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0d0d0d] z-[200] flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="h-px w-20 bg-[#f5f2ed] mx-auto animate-pulse" />
          <h1 className="text-xs uppercase tracking-[0.8em] font-light animate-pulse">Vastu</h1>
        </div>
      </div>
    );
  }

  return (
    <main className={`relative w-full ${view === 'hero' ? 'min-h-[120vh]' : 'min-h-screen'}`}>
      <Navigation currentView={view} onNavigate={setView} />

      <div className="transition-all duration-1000 ease-in-out">
        {view === 'hero' && (
          <>
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden sticky top-0 bg-[#0d0d0d]">
              <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] grain-overlay" />
              <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-110 will-change-transform"
                  style={{
                    transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
                    filter: 'contrast(1.1) brightness(0.7)'
                  }}
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-a-minimalist-design-and-a-view-40118-large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
              </div>

              <div className="relative z-30 text-center px-6">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] mb-12 block opacity-60 animate-reveal" style={{ animationDelay: '400ms' }}>
                  Studio of Spatial Intent
                </span>
                <h1 className="text-5xl md:text-9xl font-serif italic mb-12 tracking-tight animate-reveal">
                  Architecting <br /> Silence.
                </h1>
                <div className="animate-reveal" style={{ animationDelay: '800ms' }}>
                  <button 
                    onClick={() => setView('exhibition')}
                    className="group relative inline-flex items-center space-x-4 py-4 px-1"
                  >
                    <span className="text-[10px] uppercase tracking-[0.4em] group-hover:opacity-60 transition-opacity">Enter Exhibition</span>
                    <span className="w-12 h-px bg-[#f5f2ed] transition-all duration-500 group-hover:w-24" />
                  </button>
                </div>
              </div>

              <div className="absolute bottom-12 w-full px-12 flex justify-between items-end text-[8px] md:text-[10px] tracking-[0.3em] uppercase opacity-40 animate-reveal z-30" style={{ animationDelay: '1200ms' }}>
                <div>© 2024 Vastu Studios</div>
                <div className="text-right">Private Residence & Commercial Legacies</div>
              </div>
            </section>
            <div className="h-[20vh] bg-transparent pointer-events-none" />
          </>
        )}

        {view === 'exhibition' && (
          <ProjectExhibition onRequestConsultation={() => setView('consultation')} />
        )}

        {view === 'about' && <About />}
        {view === 'consultation' && <ConsultationFlow />}
      </div>

      <style>{`
        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .grain-overlay {
          background-image: url("https://www.transparenttextures.com/patterns/stardust.png");
        }
        .animate-reveal {
          opacity: 0;
          animation: reveal 2.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </main>
  );
};

export default App;