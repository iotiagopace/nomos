import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProcessStep, HeroTheme } from '../types';

interface ProcessRowProps {
  steps: ProcessStep[];
  theme: HeroTheme;
  onStepClick?: (stepIndex: number) => void;
}

export const ProcessRow: React.FC<ProcessRowProps> = ({ steps, theme, onStepClick }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Animation parameters
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const textContrastColor = theme === 'light' ? 'text-black' : 'text-white';
  const textMutedColor = theme === 'light' ? 'text-black/60' : 'text-white/60';

  return (
    <div className="w-full px-5 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col justify-center">
      {/* Editorial subtitle label */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-4 flex items-center space-x-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-nomos-pink inline-block animate-ping" />
        <span className="uppercase text-[10px] sm:text-xs font-bold tracking-widest text-nomos-pink">
          Nossa Metodologia / O Jeito Nomos de Fazer
        </span>
      </motion.div>

      {/* Process list wrapper */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        {/* Desktop View: Horizontal continuous line of premium text methodology */}
        <div className="hidden lg:flex flex-wrap items-center justify-start gap-y-4 xl:gap-x-1">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <motion.div
                variants={itemVariants}
                className="relative group cursor-pointer py-2"
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
                onClick={() => onStepClick && onStepClick(index)}
              >
                <div className="flex items-center space-x-2 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="font-serif italic text-xs text-nomos-pink font-semibold">
                    {step.number}
                  </span>
                  <span className={`text-[11px] xl:text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                    activeStep === index ? 'text-nomos-pink' : textContrastColor
                  }`}>
                    {step.name}
                  </span>
                </div>

                {/* Micro tooltip detail on hover */}
                {step.subtitle && (
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: activeStep === index ? 1 : 0, y: activeStep === index ? 0 : 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -bottom-4 left-4 whitespace-nowrap text-[9px] uppercase tracking-wider font-semibold text-nomos-pink bg-black/80 px-2 py-0.5 rounded border border-white/10 z-10 pointer-events-none"
                  >
                    {step.subtitle}
                  </motion.span>
                )}
              </motion.div>

              {/* Pink slash and dot separator /. */}
              {index < steps.length - 1 && (
                <motion.span 
                  variants={itemVariants}
                  className="mx-3 xl:mx-4 font-bold text-sm tracking-widest text-nomos-pink select-none font-sans"
                >
                  /.
                </motion.span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Tablet View: Elegant multi-row split grid */}
        <div className="hidden sm:grid lg:hidden grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="border-l border-nomos-pink/30 pl-4 py-1 flex flex-col justify-start group cursor-pointer hover:border-nomos-pink/80 transition-colors"
              onClick={() => onStepClick && onStepClick(index)}
            >
              <div className="flex items-baseline space-x-2">
                <span className="font-serif italic text-xs text-nomos-pink font-semibold">
                  {step.number}
                </span>
                <span className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 group-hover:text-nomos-pink ${textContrastColor}`}>
                  {step.name}
                </span>
              </div>
              {step.subtitle && (
                <p className={`text-[10px] tracking-wider mt-1 ease-in-out duration-300 group-hover:text-white uppercase ${textMutedColor}`}>
                  {step.subtitle}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile View: High impact vertical stacks mimicking original brand design documents */}
        <div className="flex sm:hidden flex-col space-y-3.5 pt-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="flex items-center space-x-3 border-b border-white/5 pb-2 last:border-b-0 cursor-pointer group hover:pl-1 transition-all"
              onClick={() => onStepClick && onStepClick(index)}
            >
              <span className="font-serif italic text-xs text-nomos-pink font-medium">
                {step.number}
              </span>
              <div className="flex flex-wrap items-baseline gap-1">
                <span className={`text-[11px] font-bold tracking-widest uppercase ${textContrastColor}`}>
                  {step.name}
                </span>
                <span className="text-nomos-pink font-bold text-xs">/.</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
