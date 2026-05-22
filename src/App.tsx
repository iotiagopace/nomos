import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, MapPin, Clock, Calendar, CheckCircle, ArrowDown } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { ProcessRow } from './components/ProcessRow';
import { HeroContent } from './components/HeroContent';
import { AboutManifesto } from './components/AboutManifesto';
import { StrategySection } from './components/StrategySection';
import { ProjectsGrid } from './components/ProjectsGrid';
import { CaseModal } from './components/CaseModal';
import { NavLinkItem, ProcessStep, HeroTheme, ProjectItem } from './types';
import { useProjects } from './hooks/useProjects';
import { useServices } from './hooks/useServices';
import { useSiteSettings } from './hooks/useSiteSettings';

export default function App() {
  // Theme state: defaults to light (an elegant, clean cream overlay over grayscale/ambient footage)
  // as suggested by the editorial guidelines, with a dark mode option.
  const [theme, setTheme] = useState<HeroTheme>('light');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const { projects } = useProjects();
  const { services } = useServices();
  const { settings } = useSiteSettings();

  const videoRef = useRef<HTMLVideoElement>(null);

  // Nav links configuration as requested
  const navLinks: NavLinkItem[] = [
    { id: 'sobre', label: 'Sobre', href: '#sobre' },
    { id: 'estrategia', label: 'Estratégia', href: '#estrategia' },
    { id: 'criacao', label: 'Criação', href: '#criacao' },
    { id: 'contato', label: 'Contato', href: '#contato' },
  ];

  // Creative process list as requested
  const processSteps: ProcessStep[] = [
    { number: '01', name: 'Imersão', subtitle: 'Mergulho de marca' },
    { number: '02', name: 'Diagnóstico', subtitle: 'Análise de cenário' },
    { number: '03', name: 'Estratégia', subtitle: 'Criação de posicionamento' },
    { number: '04', name: 'Direção Criativa', subtitle: 'Definição de caminhos' },
    { number: '05', name: 'Criação e Revisão', subtitle: 'Execução sem firulas' },
    { number: '06', name: 'Finalização', subtitle: 'Entrega e ativação' },
  ];

  // Update Brazilian local clock (São José do Rio Preto / São Paulo time)
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat('pt-BR', options);
      setCurrentTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    triggerNotification(`Contraste alterado para modo: ${newTheme === 'light' ? 'Editorial Claro' : 'Contraste Escuro'}`);
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
        triggerNotification('Vídeo pausado');
      } else {
        videoRef.current.play().catch(() => {});
        setIsVideoPlaying(true);
        triggerNotification('Vídeo em reprodução');
      }
    }
  };

  const triggerNotification = (msg: string) => {
    setNotificationMessage(msg);
    setShowNotification(true);
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 2800);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Define exact responsive breathing-room offsets depending on screen width
      const headerOffset = window.innerWidth < 768 ? 32 : 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleLinkClick = (id: string) => {
    triggerNotification(`Navegando para seção: ${id.toUpperCase()}`);
    scrollToSection(id);
  };

  const scrollDown = () => {
    scrollToSection('sobre');
  };

  const handleStepClick = (stepIndex: number) => {
    const mapping = [
      { section: 'sobre', label: 'Imersão (Sobre Nós)' },
      { section: 'sobre', label: 'Diagnóstico (Sobre Nós)' },
      { section: 'estrategia', label: 'Estratégia' },
      { section: 'estrategia', label: 'Direção Criativa' },
      { section: 'criacao', label: 'Criação e Revisão (Portfólio)' },
      { section: 'criacao', label: 'Finalização (Portfólio)' },
    ];
    
    if (mapping[stepIndex]) {
      triggerNotification(`Etapa: ${mapping[stepIndex].label}`);
      scrollToSection(mapping[stepIndex].section);
    }
  };

  return (
    <div className={`w-full min-h-screen transition-colors duration-700 ease-in-out relative ${
      theme === 'light' ? 'bg-[#F7F4EF]' : 'bg-black'
    }`}>
      
      {/* SECTION 1: Standard Full screen Atmospheric Hero Area */}
      <section className="relative min-h-[100vh] w-full flex flex-col justify-between overflow-hidden">
        
        {/* 1.1 Dynamic Video Background Wrapper */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
          <video
            ref={videoRef}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4"
            className="absolute inset-0 w-full h-full object-cover object-center md:object-left"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* 1.2-A: Blending overlay to shade/color the video background beautifully */}
        <div 
          className={`absolute inset-0 w-full h-full z-1 transition-all duration-700 ease-in-out ${
            theme === 'light'
              ? 'bg-[#F7F4EF]/5 mix-blend-normal'
              : 'bg-black/15 mix-blend-multiply'
          }`}
        />

        {/* 1.2-B: Asymmetric Editorial legibility fade in from left (transparent for absolute motion clarity) to right (solid for typography) */}
        <div 
          className={`absolute inset-0 w-full h-full z-1 transition-all duration-700 ease-in-out bg-gradient-to-b md:bg-gradient-to-r ${
            theme === 'light'
              ? 'from-transparent via-[#F7F4EF]/30 to-[#F7F4EF] md:via-[#F7F4EF]/20 md:to-[#F7F4EF]'
              : 'from-transparent via-black/30 to-black md:via-black/20 md:to-black'
          }`}
        />

        {/* Subtle paper grain element overlay inside light model for rich editorial tactile textures */}
        {theme === 'light' && (
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-5 z-2 bg-repeat animate-[pulse_10s_infinite_alternate]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
        )}

        {/* 1.3 Top Navigation */}
        <div className="relative z-50 w-full">
          <Navigation
            navLinks={navLinks}
            theme={theme}
            onLinkClick={handleLinkClick}
            toggleTheme={toggleTheme}
            settings={settings}
          />
        </div>

        {/* 1.4 Middle Process Section */}
        <div className="relative z-10 w-full">
          <ProcessRow steps={processSteps} theme={theme} onStepClick={handleStepClick} />
        </div>

        {/* 1.5 Bottom Main Core Message & CTAs */}
        <div className="relative z-10 w-full">
          <HeroContent theme={theme} settings={settings} />
        </div>

        {/* 1.6 Precision Margin Widgets (Time / Video Controllers / Location Coordinates) */}
        <div className="w-full px-5 sm:px-8 md:px-12 pb-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] md:text-xs font-semibold tracking-widest uppercase select-none opacity-80 z-10">
          
          {/* Location & Clock widgets (São José do Rio Preto, Brazil timezone synced) */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-center sm:text-left">
            <div className={`flex items-center space-x-2 ${theme === 'light' ? 'text-black/60' : 'text-white/60'}`}>
              <MapPin size={12} className="text-nomos-pink" />
              <span>S.J. do Rio Preto, BR</span>
            </div>
            
            <div className={`flex items-center space-x-2 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              <Clock size={12} className="text-nomos-pink animate-pulse" />
              <span>Local Time: {currentTime || 'Calculando...'}</span>
            </div>
          </div>

          {/* Scoll Down Indicator Link */}
          <button 
            onClick={scrollDown}
            className={`hidden lg:flex items-center space-x-2 text-nomos-pink cursor-pointer animate-bounce py-1 px-3 rounded-full hover:bg-nomos-pink/5 border border-transparent hover:border-nomos-pink/20 transition-all`}
          >
            <span>Ver Trabalhos</span>
            <ArrowDown size={12} />
          </button>

          {/* Video performance controller badges */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleVideoPlayback}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border transition-all duration-300 ${
                theme === 'light' 
                  ? 'border-black/10 hover:border-nomos-pink hover:bg-black/5 text-black animate-none' 
                  : 'border-white/10 hover:border-nomos-pink hover:bg-white/5 text-white animate-none'
              }`}
              title={isVideoPlaying ? "Pausar atmosfera visual" : "Reproduzir atmosfera visual"}
            >
              {isVideoPlaying ? <Pause size={10} /> : <Play size={10} />}
              <span>Atmosfera: {isVideoPlaying ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

      </section>

      {/* SECTION 1.5: Manifesto / Strategic brand pillars derived from pdf context */}
      <AboutManifesto theme={theme} />

      {/* SECTION 1.7: Strategy section displaying step by step understanding before visuals */}
      <StrategySection theme={theme} services={services} />

      {/* SECTION 2: Premium Projects Gallery Grid containing horizontal hover structures */}
      <ProjectsGrid
        theme={theme}
        projects={projects}
        settings={settings}
        onProjectClick={(projectTitle) => setSelectedProject(projectTitle)}
      />

      {/* FOOTER: Professional brand metadata representation */}
      <footer id="contato" className={`w-full py-12 px-5 sm:px-8 md:px-12 border-t text-center ${
        theme === 'light' ? 'border-black/5 text-black/50 bg-[#F4F1EC]' : 'border-white/5 text-white/50 bg-[#060606]'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] tracking-widest uppercase font-bold text-nomos-pink">
            Nomos Estúdio © 2026 /. Todos os direitos reservados.
          </p>
          <p className="text-[9px] tracking-widest uppercase max-w-sm leading-relaxed">
            Criatividade e estratégia de verdade. Da imersão ao refinamento sem firulas desinteressantes.
          </p>
          <p className="text-[9px] tracking-widest uppercase">
            Desenvolvido por{' '}
            <a
              href="https://metry.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nomos-pink hover:opacity-70 transition-opacity"
            >
              metry.cc
            </a>
          </p>
        </div>
      </footer>

      {/* Case Study Modal */}
      <CaseModal
        projectTitle={selectedProject}
        projects={projects}
        theme={theme}
        settings={settings}
        onClose={() => setSelectedProject(null)}
      />

      {/* Dynamic Action Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 bg-[#E9007F] text-white px-5 py-3 rounded-xl shadow-[0_10px_30px_rgba(233,0,127,0.35)] flex items-center space-x-3 text-xs uppercase font-bold tracking-widest border border-white/20"
          >
            <CheckCircle size={14} className="stroke-[2.5]" />
            <span>{notificationMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

