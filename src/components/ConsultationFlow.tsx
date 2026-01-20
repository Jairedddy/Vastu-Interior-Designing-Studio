import React from 'react';
import SurfaceCard from './SurfaceCard';
import SectionHeader from './SectionHeader';

const ConsultationFlow: React.FC = () => {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    type: '',
    budget: '',
    vision: '',
    email: ''
  });
  const [aiAnalysis, setAiAnalysis] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const nextStep = async () => {
    if (step === 3 && formData.vision) {
      setIsAnalyzing(true);
      setIsAnalyzing(false);
    }
    setStep(prev => prev + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-12">
            <h3 className="text-4xl md:text-6xl font-serif">What narrative are we building?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {['Private Estate', 'Corporate HQ', 'Boutique Hotel', 'Retail Concept'].map(type => (
                <SurfaceCard
                  key={type}
                  onClick={() => { setFormData({...formData, type}); nextStep(); }}
                  elevation={formData.type === type ? 'md' : 'sm'}
                  borderVariant={formData.type === type ? 'accent' : 'primary'}
                  hover={true}
                  className={formData.type === type ? 'bg-[rgba(245,242,237,0.05)]' : ''}
                >
                  <span className="text-xs uppercase tracking-widest opacity-60 block mb-2">Sector</span>
                  <span className="text-xl font-light">{type}</span>
                </SurfaceCard>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-12">
            <h3 className="text-4xl md:text-6xl font-serif">Project Scope</h3>
            <div className="grid md:grid-cols-1 gap-4">
              {['₹5Cr — ₹10Cr', '₹10Cr — ₹50Cr', 'Unlimited / Legacy Project'].map(range => (
                <SurfaceCard
                  key={range}
                  onClick={() => { setFormData({...formData, budget: range}); nextStep(); }}
                  elevation="sm"
                  hover={true}
                  className="flex justify-between items-center"
                >
                  <span className="text-xl font-light">{range}</span>
                  <span className="w-4 h-px bg-[#8c7e6d]" />
                </SurfaceCard>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <h3 className="text-4xl md:text-6xl font-serif">Describe your ideal atmosphere.</h3>
            <textarea 
              autoFocus
              className="w-full bg-transparent border-b border-[#f5f2ed20] py-4 text-2xl font-light focus:outline-none focus:border-[#8c7e6d] transition-all resize-none h-32"
              placeholder="e.g. A silent oasis of raw concrete and filtered morning light..."
              value={formData.vision}
              onChange={(e) => setFormData({...formData, vision: e.target.value})}
            />
            <button 
              onClick={nextStep}
              className="px-12 py-4 bg-[#f5f2ed] text-[#0d0d0d] text-xs uppercase tracking-widest hover:bg-[#8c7e6d] hover:text-[#f5f2ed] transition-all"
            >
              Consult the Oracle
            </button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-12 text-center py-20">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.5em] text-[#8c7e6d]">AI Synthesis</span>
              {isAnalyzing ? (
                <div className="animate-pulse text-2xl italic font-serif opacity-50">Decoding your vision into architectural forms...</div>
              ) : (
                <h3 className="text-3xl md:text-5xl font-serif leading-tight max-w-2xl mx-auto italic">
                  "{aiAnalysis}"
                </h3>
              )}
            </div>
            <div className="max-w-md mx-auto space-y-8">
              <p className="text-sm opacity-60">This vision matches our studio's DNA. Please provide your contact details for an invitation to our private gallery.</p>
              <input 
                type="email" 
                placeholder="Private Email"
                className="w-full bg-transparent border-b border-[#f5f2ed20] py-2 text-center focus:outline-none focus:border-[#8c7e6d]"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <button 
                onClick={() => setStep(5)}
                className="w-full py-4 border border-[#f5f2ed20] text-xs uppercase tracking-widest hover:bg-[#f5f2ed] hover:text-[#0d0d0d] transition-all"
              >
                Request Consultation
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="text-center py-20 md:py-40 px-4">
            <h3 className="text-4xl md:text-6xl font-serif mb-6">Acknowledged.</h3>
            <p className="opacity-60 max-w-sm mx-auto text-sm md:text-base leading-relaxed">Our director will review your vision. We only accept four commissions per solar cycle. You will hear from us shortly.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-12 text-xs uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity"
            >
              Return to Silence
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen pt-40 px-8 pb-20 max-w-5xl mx-auto">
      <div className="mb-20">
        <SectionHeader
          label="The Conversation"
          title=""
          showBorder={false}
        />
      </div>
      <div className="transition-all duration-1000">
        {renderStep()}
      </div>
    </section>
  );
};

export default ConsultationFlow;
