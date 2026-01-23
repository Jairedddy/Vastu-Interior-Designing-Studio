import React from 'react';
import SurfaceCard from './SurfaceCard';
import SectionHeader from './SectionHeader';

const ConsultationFlow: React.FC = () => {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    type: '',
    timeline: '',
    vision: '',
    email: '',
    customType: '',
    customTimeline: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    if (!formData.email.trim() || !formData.vision.trim()) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formData.type,
          timeline: formData.timeline,
          vision: formData.vision,
          email: formData.email,
          customType: formData.customType,
          customTimeline: formData.customTimeline,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStep(5);
      } else {
        setSubmitError(data.message || 'Failed to send consultation request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to send consultation request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-12">
            <h3 className="text-4xl md:text-6xl font-serif">What narrative are we building?</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {['Residential', 'Commercial'].map(type => (
                <SurfaceCard
                  key={type}
                  onClick={() => { setFormData({...formData, type, customType: ''}); nextStep(); }}
                  elevation={formData.type === type ? 'md' : 'sm'}
                  borderVariant={formData.type === type ? 'accent' : 'primary'}
                  hover={true}
                  className={formData.type === type ? 'bg-[rgba(245,242,237,0.05)]' : ''}
                >
                  <span className="text-xs uppercase tracking-widest opacity-60 block mb-2">Sector</span>
                  <span className="text-xl font-light">{type}</span>
                </SurfaceCard>
              ))}
              <SurfaceCard
                onClick={() => { setFormData({...formData, type: 'Other', customType: ''}); }}
                elevation={formData.type === 'Other' ? 'md' : 'sm'}
                borderVariant={formData.type === 'Other' ? 'accent' : 'primary'}
                hover={true}
                className={formData.type === 'Other' ? 'bg-[rgba(245,242,237,0.05)]' : ''}
              >
                <span className="text-xs uppercase tracking-widest opacity-60 block mb-2">Sector</span>
                <span className="text-xl font-light">Other</span>
              </SurfaceCard>
            </div>
            {formData.type === 'Other' && (
              <div className="mt-8 space-y-4 animate-fade-in">
                <input
                  type="text"
                  placeholder="Please specify your project type..."
                  className="w-full bg-transparent border-b border-[#f5f2ed20] py-4 text-xl font-light focus:outline-none focus:border-[#8c7e6d] transition-all"
                  value={formData.customType}
                  onChange={(e) => setFormData({...formData, customType: e.target.value})}
                  autoFocus
                />
                <button
                  onClick={nextStep}
                  disabled={!formData.customType.trim()}
                  className="px-12 py-4 bg-[#f5f2ed] text-[#0d0d0d] text-xs uppercase tracking-widest hover:bg-[#8c7e6d] hover:text-[#f5f2ed] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 md:space-y-8">
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif">When do you envision this space?</h3>
            <div className="grid md:grid-cols-1 gap-3 md:gap-4">
              {[
                { label: 'Immediate', description: 'Within 6 months' },
                { label: 'Near Future', description: '6-12 months' },
                { label: 'Planning Phase', description: '12+ months' }
              ].map(option => (
                <SurfaceCard
                  key={option.label}
                  onClick={() => { setFormData({...formData, timeline: option.label, customTimeline: ''}); nextStep(); }}
                  elevation={formData.timeline === option.label ? 'md' : 'sm'}
                  borderVariant={formData.timeline === option.label ? 'accent' : 'primary'}
                  hover={true}
                  className={`flex justify-between items-center ${formData.timeline === option.label ? 'bg-[rgba(245,242,237,0.05)]' : ''}`}
                >
                  <div className="flex flex-col">
                    <span className="text-xl font-light">{option.label}</span>
                    <span className="text-sm font-light opacity-50 mt-1">{option.description}</span>
                  </div>
                  <span className="w-4 h-px bg-[#8c7e6d]" />
                </SurfaceCard>
              ))}
              <SurfaceCard
                onClick={() => { setFormData({...formData, timeline: 'Other', customTimeline: ''}); }}
                elevation={formData.timeline === 'Other' ? 'md' : 'sm'}
                borderVariant={formData.timeline === 'Other' ? 'accent' : 'primary'}
                hover={true}
                className={`flex justify-between items-center ${formData.timeline === 'Other' ? 'bg-[rgba(245,242,237,0.05)]' : ''}`}
              >
                <span className="text-xl font-light">Other</span>
                <span className="w-4 h-px bg-[#8c7e6d]" />
              </SurfaceCard>
            </div>
            {formData.timeline === 'Other' && (
              <div className="mt-8 space-y-4 animate-fade-in">
                <input
                  type="text"
                  placeholder="Please specify your timeline..."
                  className="w-full bg-transparent border-b border-[#f5f2ed20] py-4 text-xl font-light focus:outline-none focus:border-[#8c7e6d] transition-all"
                  value={formData.customTimeline}
                  onChange={(e) => setFormData({...formData, customTimeline: e.target.value})}
                  autoFocus
                />
                <button
                  onClick={nextStep}
                  disabled={!formData.customTimeline.trim()}
                  className="px-12 py-4 bg-[#f5f2ed] text-[#0d0d0d] text-xs uppercase tracking-widest hover:bg-[#8c7e6d] hover:text-[#f5f2ed] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            )}
            <button
              onClick={prevStep}
              className="flex items-center gap-3 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity mt-6 md:mt-8"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
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
            <div className="flex items-center gap-8">
              <button 
                onClick={nextStep}
                disabled={!formData.vision.trim()}
                className="px-12 py-4 bg-[#f5f2ed] text-[#0d0d0d] text-xs uppercase tracking-widest hover:bg-[#8c7e6d] hover:text-[#f5f2ed] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
              <button
                onClick={prevStep}
                className="flex items-center gap-3 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-12 text-center py-20">
            <div className="max-w-md mx-auto space-y-8">
              <p className="text-lg font-light opacity-80">Please provide your contact details for an invitation to our private gallery.</p>
              <input 
                type="email" 
                placeholder="Private Email"
                className="w-full bg-transparent border-b border-[#f5f2ed20] py-4 text-xl font-light text-center focus:outline-none focus:border-[#8c7e6d] transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                autoFocus
              />
              {submitError && (
                <div className="text-sm text-red-400 opacity-80 text-center">
                  {submitError}
                </div>
              )}
              <div className="flex items-center justify-center gap-8">
                <button 
                  onClick={handleSubmit}
                  disabled={!formData.email.trim() || isSubmitting}
                  className="px-12 py-4 bg-[#f5f2ed] text-[#0d0d0d] text-xs uppercase tracking-widest hover:bg-[#8c7e6d] hover:text-[#f5f2ed] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Request Consultation'}
                </button>
                <button
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="flex items-center gap-3 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity disabled:opacity-30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              </div>
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
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
      <div className={step === 2 ? 'mb-8 md:mb-12' : 'mb-20'}>
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
