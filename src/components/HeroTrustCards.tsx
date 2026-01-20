import React from 'react';
import { motion } from 'framer-motion';

export interface TrustCardProps {
  /** Icon element */
  icon: React.ReactNode;
  /** Main label/text */
  label: string;
  /** Subtitle or additional info */
  subtitle?: string;
  /** Animation delay in seconds */
  delay?: number;
}

/**
 * Individual Trust Card Component
 */
const TrustCard: React.FC<TrustCardProps> = ({ icon, label, subtitle, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center space-y-2 px-4"
    >
      <div className="text-[#8c7e6d] mb-2">
        {icon}
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#f5f2ed] font-light">
        {label}
      </div>
      {subtitle && (
        <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#b8b0a3] opacity-60">
          {subtitle}
        </div>
      )}
    </motion.div>
  );
};

/**
 * HeroTrustCards Component
 * Displays trust indicators: awards, verified listings, response time
 */
const HeroTrustCards: React.FC = () => {
  const trustCards = [
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      label: 'Award Winning',
      subtitle: 'Design Excellence',
      delay: 1.0,
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      label: 'Verified Listings',
      subtitle: '100% Authentic',
      delay: 1.2,
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Avg Response',
      subtitle: '10 Minutes',
      delay: 1.4,
    },
  ];

  return (
    <div className="hidden md:flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-12 md:mt-16">
      {trustCards.map((card, index) => (
        <TrustCard
          key={index}
          icon={card.icon}
          label={card.label}
          subtitle={card.subtitle}
          delay={card.delay}
        />
      ))}
    </div>
  );
};

export default HeroTrustCards;
