
import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems: { id: AppView; label: string }[] = [
    { id: 'hero', label: 'Index' },
    { id: 'exhibition', label: 'Exhibition' },
    { id: 'about', label: 'About' },
    { id: 'consultation', label: 'Conversation' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-10 pointer-events-none">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto pointer-events-auto">
        {/* Brand */}
        <button 
          onClick={() => onNavigate('hero')}
          className="text-xs tracking-[0.4em] uppercase font-light transition-opacity hover:opacity-50"
        >
          Vastu
        </button>

        {/* Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="group flex flex-col items-end space-y-1.5 focus:outline-none"
        >
          <span className={`h-px bg-[#f5f2ed] transition-all duration-500 ${isOpen ? 'w-8 translate-y-[7px] rotate-45' : 'w-8'}`} />
          <span className={`h-px bg-[#f5f2ed] transition-all duration-500 ${isOpen ? 'w-0 opacity-0' : 'w-5'}`} />
          <span className={`h-px bg-[#f5f2ed] transition-all duration-500 ${isOpen ? 'w-8 -translate-y-[7px] -rotate-45' : 'w-3 group-hover:w-8'}`} />
        </button>
      </div>

      {/* Overlay Menu */}
      <div className={`fixed inset-0 bg-[#0d0d0d] transition-all duration-700 ease-in-out z-[-1] pointer-events-auto flex items-center justify-center ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <div className="flex flex-col items-center space-y-8">
          {menuItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsOpen(false);
              }}
              className="group overflow-hidden relative"
            >
              <span className={`text-4xl md:text-7xl font-serif tracking-tight transition-transform duration-500 block ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} style={{ transitionDelay: `${idx * 100}ms` }}>
                {item.label}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#8c7e6d] group-hover:w-full transition-all duration-500" />
            </button>
          ))}
        </div>
        
        <div className="absolute bottom-12 text-[10px] tracking-[0.3em] uppercase opacity-40">
          Mumbai • New Delhi • Dubai
        </div>
      </div>
    </nav>
  );
};

export default Navigation;