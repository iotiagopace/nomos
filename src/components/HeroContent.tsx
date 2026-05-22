import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { HeroTheme } from '../types';

interface HeroContentProps {
  theme: HeroTheme;
}

export const HeroContent: React.FC<HeroContentProps> = ({ theme }) => {
  const textContrastColor = theme === 'light' ? 'text-black' : 'text-white';
  const textMutedColor = theme === 'light' ? 'text-black/70' : 'text-white/70';

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: customDelay,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const slideUpLineVariants = {
    hidden: { y: '110%' },
    visible: (wordIndex: number) => ({
      y: 0,
      transition: {
        delay: 0.4 + wordIndex * 0.14,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingLines = ['DIZER', 'DO JEITO', 'CERTO'];

  return (
    <div className="w-full px-5 sm:px-8 md:px-12 pb-8 md:pb-12 space-y-8 md:space-y-12">
      
      {/* ROW A: Tagline & CTA Link */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-current/10 pt-6 sm:pt-8 gap-4 select-none">
        
        {/* Left: Tagline */}
        <motion.div
          custom={0.1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[280px]"
        >
          <p className={`uppercase text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest leading-relaxed ${textMutedColor}`}>
            Toda marca tem algo a dizer.
            <br />
            <span className={theme === 'light' ? 'text-black' : 'text-white'}>
              A gente ajuda a dizer do jeito certo.
            </span>
          </p>
        </motion.div>

        {/* Right: CTA Link */}
        <motion.div
          custom={0.25}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <a
            href="https://wa.me/5517992723486?text=Ol%C3%A1%21+Encontrei+a+Nomos+Est%C3%Badio+atrav%C3%A9s+do+site+e+gostaria+de+bater+um+papo."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 text-nomos-pink text-base sm:text-xl md:text-2xl font-bold uppercase tracking-widest relative overflow-hidden py-1 whitespace-nowrap"
          >
            <span>Fale com a gente</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight size={24} className="stroke-[2.5]" />
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-nomos-pink transition-all duration-300 group-hover:w-full" />
          </a>
        </motion.div>
      </div>

      {/* ROW B: Studio Description & Large Editorial Title */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        
        {/* Left column (col-span 4): Studio Description */}
        <motion.div
          custom={0.4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="md:col-span-5 order-2 md:order-1 flex justify-start md:justify-end"
        >
          <div className="w-full max-w-[340px] md:text-right border-l-2 md:border-l-0 md:border-r-2 border-nomos-pink/80 pl-4 md:pl-0 md:pr-4 py-1 select-none">
            <p className={`text-[11px] sm:text-xs md:text-sm uppercase tracking-widest font-semibold leading-tight ${textContrastColor}`}>
              Estúdio de criação e estratégia para marcas que querem ter voz, presença e memória.
            </p>
            <p className="text-[10px] sm:text-xs tracking-wider text-nomos-pink font-serif italic mt-2 uppercase font-medium">
              São José do Rio Preto, SP
            </p>
          </div>
        </motion.div>

        {/* Right column (col-span 7): Main word Reveal */}
        <div className="md:col-span-7 text-right order-1 md:order-2 select-none relative">
          
          {/* Subtle branding decorative ribbon behind typography to provide structure */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 md:w-80 h-[2px] bg-gradient-to-r from-transparent to-nomos-pink/50 pointer-events-none -z-10" />

          <div className="flex flex-col items-end">
            {headingLines.map((line, index) => (
              <div 
                key={line} 
                className="overflow-hidden flex items-end justify-end"
                style={{ 
                  fontSize: 'clamp(2.4rem, 10vw, 9rem)',
                  height: '0.95em'
                }}
              >
                <motion.h1
                  custom={index}
                  variants={slideUpLineVariants}
                  initial="hidden"
                  animate="visible"
                  // Using clamp sizing for ultra-expressive editorial scaling as requested
                  style={{ 
                    fontSize: '1em',
                    lineHeight: '0.88',
                    letterSpacing: '-0.04em'
                  }}
                  className={`font-black uppercase tracking-tight text-right flex items-baseline ${textContrastColor}`}
                >
                  {/* For the third word (CERTO), render the special magenta brand detail */}
                  {index === 2 ? (
                    <>
                      <span>{line}</span>
                      <span className="text-nomos-pink text-[1.25em] font-black leading-none drop-shadow-[0_2px_10px_rgba(233,0,127,0.4)] ml-1">
                        .
                      </span>
                    </>
                  ) : (
                    <span>{line}</span>
                  )}
                </motion.h1>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
