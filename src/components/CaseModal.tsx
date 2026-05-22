import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Tag } from 'lucide-react';
import { ProjectItem, HeroTheme } from '../types';
import { SiteSettings } from '../hooks/useSiteSettings';

interface CaseModalProps {
  projectTitle: string | null;
  projects: ProjectItem[];
  theme: HeroTheme;
  settings: SiteSettings;
  onClose: () => void;
}

export const CaseModal: React.FC<CaseModalProps> = ({ projectTitle, projects, theme, settings, onClose }) => {
  const project = projects.find(p => p.title === projectTitle);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-[5vh] z-50 w-full sm:w-[90vw] md:w-[720px] max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
              theme === 'light' ? 'bg-[#F7F4EF]' : 'bg-[#0D0D0D]'
            }`}
          >
            {/* Image header */}
            <div className="relative h-[240px] sm:h-[320px] w-full overflow-hidden rounded-t-3xl">
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#E9007F] transition-colors"
              >
                <X size={16} strokeWidth={2.5} />
              </button>

              {/* Category + year */}
              <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
                <span className="bg-black/70 backdrop-blur-md text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-white/10">
                  {project.category}
                </span>
                <span className="font-mono text-xs font-semibold bg-white/95 text-black px-2.5 py-0.5 rounded-full shadow-sm">
                  {project.year}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`}>
                  {project.title}
                </h2>
                <p className="text-nomos-pink text-[10px] font-bold uppercase tracking-widest mt-1">
                  {project.category}
                </p>
              </div>

              <p className={`text-sm leading-relaxed ${
                theme === 'light' ? 'text-black/70' : 'text-white/70'
              }`}>
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                      theme === 'light'
                        ? 'bg-black/[0.04] border-black/10 text-black/60'
                        : 'bg-white/[0.04] border-white/10 text-white/60'
                    }`}
                  >
                    <Tag size={8} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className={`pt-4 border-t flex flex-col sm:flex-row gap-3 items-center justify-between ${
                theme === 'light' ? 'border-black/10' : 'border-white/10'
              }`}>
                <p className={`text-[10px] uppercase tracking-widest font-bold ${
                  theme === 'light' ? 'text-black/40' : 'text-white/40'
                }`}>
                  Quer um projeto como esse?
                </p>
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=Olá+Nomos%2C+vi+o+case+${encodeURIComponent(project.title)}+e+tenho+interesse.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#E9007F] hover:bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300"
                >
                  <span>Falar com a Nomos</span>
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
