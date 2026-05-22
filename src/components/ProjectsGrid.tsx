import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { ArrowUpRight, FolderHeart, Sparkles, MoveRight, ArrowRightLeft } from 'lucide-react';
import { ProjectItem, HeroTheme } from '../types';

interface ProjectsGridProps {
  theme: HeroTheme;
  onProjectClick: (title: string) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ theme, onProjectClick }) => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('Todos');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Creative projects list for Nomos Estúdio
  const projects: ProjectItem[] = [
    {
      id: 'lume',
      title: 'Lume Café',
      category: 'Posicionamento & Identidade',
      year: '2026',
      imageUrl: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=85',
      description: 'Construção verbal e estética para cafeteria especial que visa transformar manhãs em rituais.',
      tags: ['Branding', 'Estratégia', 'Visual'],
    },
    {
      id: 'kairos',
      title: 'Kairós Editorial',
      category: 'Voz de Marca & Editorial',
      year: '2025',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=85',
      description: 'Série literária com foco em expressividade tipográfica de alto impacto dita do jeito certo.',
      tags: ['Editorial', 'Verbal', 'Tipografia'],
    },
    {
      id: 'planalto',
      title: 'Planalto Sul',
      category: 'Experiência & Presença',
      year: '2026',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85',
      description: 'Branding imobiliário refinado para empreendimento de alto padrão no interior do estado.',
      tags: ['Digital', 'Estratégia', 'Branding'],
    },
    {
      id: 'soma',
      title: 'SOMA Cosméticos',
      category: 'Design de Embalagem',
      year: '2025',
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85',
      description: 'Design de produto sustentável com material tátil de alta qualidade e paleta minimalista.',
      tags: ['Embalagem', 'Visual', 'Sustentável'],
    },
  ];

  // Dynamically query all available filter tags
  const allTags = ['Todos', ...Array.from(new Set(projects.flatMap(p => p.tags)))];

  const filteredProjects = selectedTag === 'Todos' 
    ? projects 
    : projects.filter(p => p.tags.includes(selectedTag));

  // Horizontal scroll controls
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const textContrastColor = theme === 'light' ? 'text-black' : 'text-white';
  const textMutedColor = theme === 'light' ? 'text-black/60' : 'text-white/60';
  const bgContrastColor = theme === 'light' ? 'bg-[#F7F4EF]' : 'bg-black';
  const borderContrastColor = theme === 'light' ? 'border-black/10' : 'border-white/10';

  return (
    <section 
      id="criacao" 
      className={`w-full py-20 px-5 sm:px-8 md:px-12 border-t transition-colors duration-700 ${borderContrastColor} ${bgContrastColor}`}
    >
      {/* Editorial Title Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center space-x-2 text-nomos-pink uppercase text-[10px] sm:text-xs tracking-widest font-black mb-3">
            <Sparkles size={12} className="animate-spin duration-3000" />
            <span>Nossos Projetos /. Portfólio</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase ${textContrastColor}`}>
            Marcas com <br />
            <span className="italic font-normal text-nomos-pink">voz & memória</span>
          </h2>
        </div>

        {/* Dynamic Filter Row */}
        <div className="flex flex-wrap gap-2 py-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full border transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-nomos-pink border-nomos-pink text-white'
                  : theme === 'light'
                    ? 'border-black/10 text-black/70 hover:border-black hover:text-black'
                    : 'border-white/10 text-white/70 hover:border-white hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Slide assistance tip */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-[10px] tracking-widest uppercase font-bold text-nomos-pink inline-flex items-center space-x-1.5`}>
          <ArrowRightLeft size={10} />
          <span>Arraste ou use o scroll lateral para navegar</span>
        </span>
        
        {/* Scroll helper buttons */}
        <div className="hidden sm:flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
              theme === 'light' 
                ? 'border-black/10 hover:bg-black/5 text-black' 
                : 'border-white/10 hover:bg-white/5 text-white'
            }`}
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
              theme === 'light' 
                ? 'border-black/10 hover:bg-black/5 text-black' 
                : 'border-white/10 hover:bg-white/5 text-white'
            }`}
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Draggable / Scroll Row Grid with Framer Motion */}
      <div 
        ref={scrollContainerRef}
        className="w-full overflow-x-auto flex gap-6 pb-8 snap-x snap-mandatory scrollbar-none scroll-smooth pr-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const isHovered = activeProject === project.id;
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="min-w-[290px] sm:min-w-[360px] md:min-w-[420px] max-w-[450px] snap-start flex-shrink-0 group relative overflow-hidden rounded-2xl border transition-all duration-300 pointer-events-auto cursor-pointer"
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
                style={{
                  borderColor: isHovered ? '#E9007F' : theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
                  backgroundColor: theme === 'light' ? '#FFFFFF' : '#0B0B0B',
                }}
              >
                {/* 1. Image viewport wrapper with hover-to-reveal zoom/clip */}
                <div className="relative h-[220px] sm:h-[280px] w-full overflow-hidden">
                  
                  {/* Static placeholder backdrop if image fails to load */}
                  <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                    <span className="font-serif italic text-sm text-neutral-400">Nomos Visuals</span>
                  </div>

                  {/* High Quality project image with secure referrers */}
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover origin-center select-none pointer-events-none"
                    animate={{
                      scale: isHovered ? 1.08 : 1.0,
                    }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  />

                  {/* Dark overlay styled to make the text on top readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80" />

                  {/* Year Tag & Category Badge */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                    <span className="bg-black/70 backdrop-blur-md text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-white/10">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-nomos-pink font-semibold bg-white/95 text-black px-2.5 py-0.5 rounded-full shadow-sm">
                      {project.year}
                    </span>
                  </div>

                  {/* Dynamic hovering details (reveal overlay) */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onProjectClick(project.title);
                      }}
                      className="bg-[#E9007F] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center space-x-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
                    >
                      <span>Ver Projeto</span>
                      <ArrowUpRight size={14} className="stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* 2. Text layout section with bold typography */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-serif text-xl sm:text-2xl font-bold transition-colors ${
                        isHovered ? 'text-nomos-pink' : textContrastColor
                      }`}>
                        {project.title}
                      </h3>
                      <p className={`text-[10px] tracking-widest uppercase font-bold ${textMutedColor} mt-1`}>
                        {project.category}
                      </p>
                    </div>
                    
                    {/* Compact Interactive Accent Arrow */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isHovered ? 'bg-nomos-pink text-white scale-110' : 'bg-neutral-800 text-neutral-400 group-hover:text-white'
                    }`}>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${textMutedColor}`}>
                    {project.description}
                  </p>

                  {/* Project specific tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                          theme === 'light' 
                            ? 'bg-black/[0.02] border-black/5 text-black/60' 
                            : 'bg-white/[0.02] border-white/5 text-white/60'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Supporting call out bottom banner */}
      <div className={`mt-10 border border-dashed ${borderContrastColor} rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6`}>
        <div className="text-center sm:text-left">
          <p className={`uppercase text-[10px] tracking-widest font-black text-nomos-pink mb-1`}>
            // Tem um desafio de marca para nós?
          </p>
          <p className={`text-xs uppercase font-bold tracking-wider leading-relaxed ${textContrastColor}`}>
            Trabalhar com a gente é trabalhar do lado da gente.
          </p>
        </div>

        <a
          href="https://wa.me/5517992723486?text=Olá+Nomos%2C+estou+interessado+em+desenvolver+nosso+posicionamento+estratégico."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black hover:bg-nomos-pink text-white border border-neutral-800 hover:border-nomos-pink text-xs uppercase font-bold tracking-widest px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2"
        >
          <span>Criar do nosso lado</span>
          <MoveRight size={14} className="stroke-[2.5]" />
        </a>
      </div>
    </section>
  );
};
