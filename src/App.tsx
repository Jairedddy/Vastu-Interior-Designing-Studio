import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProjectExhibition from './components/ProjectExhibition';
import About from './components/About';
import ConsultationFlow from './components/ConsultationFlow';
import HeroCinematic from './components/HeroCinematic';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [location.pathname]);

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
    <main className={`relative w-full ${location.pathname === '/' ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <Navigation />

      <div className="transition-all duration-1000 ease-in-out">
        <Routes>
          <Route path="/" element={<HeroCinematic />} />
          <Route path="/exhibition" element={<ProjectExhibition />} />
          <Route path="/about" element={<About />} />
          <Route path="/consultation" element={<ConsultationFlow />} />
        </Routes>
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