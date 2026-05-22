import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Menu, Phone, Instagram, Send } from 'lucide-react';
import { Logo } from './Logo';
import { NavLinkItem, HeroTheme } from '../types';
import { SiteSettings } from '../hooks/useSiteSettings';

interface NavigationProps {
  navLinks: NavLinkItem[];
  theme: HeroTheme;
  logoUrl?: string;
  onLinkClick: (sectionId: string) => void;
  toggleTheme: () => void;
  settings: SiteSettings;
}

export const Navigation: React.FC<NavigationProps> = ({
  navLinks,
  theme,
  logoUrl,
  onLinkClick,
  toggleTheme,
  settings,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Nav fadeDown animation parameters
  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const textContrastColor = theme === 'light' ? 'text-black' : 'text-white';
  const borderContrastColor = theme === 'light' ? 'border-black/10' : 'border-white/10';

  return (
    <header className="relative w-full z-40">
      <motion.nav
        variants={navContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between px-5 sm:px-8 md:px-12 pt-5 md:pt-6"
      >
        {/* Left: Nomos Logo */}
        <motion.div variants={navItemVariants} className="z-10">
          <Logo theme={theme} logoUrl={logoUrl} />
        </motion.div>

        {/* Center: Desktop Nav Links */}
        <motion.div 
          variants={navItemVariants} 
          className="hidden md:flex items-center space-x-10"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onLinkClick(link.id)}
              className={`uppercase text-xs font-semibold tracking-widest transition-all duration-300 relative py-1 group ${textContrastColor}`}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-nomos-pink transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </motion.div>

        {/* Right: Hamburger Button & Style Toggle */}
        <div className="flex items-center space-x-4">
          {/* Aesthetic Theme Controller (Light/Dark Switch) */}
          <motion.button
            variants={navItemVariants}
            onClick={toggleTheme}
            className={`hidden sm:flex text-[10px] uppercase font-bold tracking-widest border px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-nomos-pink hover:border-nomos-pink hover:text-white ${
              theme === 'light' 
                ? 'border-black/20 text-black/80 hover:text-white' 
                : 'border-white/20 text-white/80 hover:text-white'
            }`}
            title="Alterar contraste do estúdio"
          >
            Visual: {theme === 'light' ? 'Claro' : 'Escuro'}
          </motion.button>

          {/* 36px Circular Hamburger Menu Button */}
          <motion.button
            variants={navItemVariants}
            onClick={() => setIsMenuOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
              theme === 'light' 
                ? 'bg-black text-white hover:bg-nomos-pink' 
                : 'bg-nomos-pink text-white hover:bg-white hover:text-black'
            }`}
            aria-label="Abrir Menu"
          >
            <div className="flex flex-col space-y-[4px] items-center">
              <span className="w-4 h-[1.5px] bg-current rounded-full" />
              <span className="w-4 h-[1.5px] bg-current rounded-full" />
              <span className="w-4 h-[1.5px] bg-current rounded-full" />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-y-auto"
          >
            {/* Overlay Top Row */}
            <div className="flex items-center justify-between w-full">
              <Logo theme="dark" logoUrl={logoUrl} />
              
              {/* Circular Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-nomos-pink hover:border-nomos-pink transition-all duration-300 group"
              >
                <X size={18} className="text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Overlay Menu Items Stack with Stagger */}
            <div className="flex flex-col justify-center my-auto pl-2 md:pl-10">
              <span className="text-nomos-pink text-xs uppercase tracking-widest font-black mb-4">
                // Menu Do Estúdio
              </span>
              <nav className="flex flex-col gap-6 md:gap-8">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.08, duration: 0.4 }}
                  >
                    <button
                      onClick={() => {
                        onLinkClick(link.id);
                        setIsMenuOpen(false);
                      }}
                      className="group flex items-baseline hover:text-nomos-pink transition-colors duration-300"
                    >
                      <span className="text-2xl sm:text-4xl md:text-5xl font-serif mr-4 text-white/30 group-hover:text-nomos-pink/50 font-light italic">
                        0{idx + 1}
                      </span>
                      <span className="text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight font-serif font-extrabold text-left transition-colors duration-300">
                        {link.label}
                      </span>
                      <ArrowUpRight 
                        size={28} 
                        className="ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-nomos-pink self-center" 
                      />
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Overlay Bottom Contacts */}
            <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-sm text-gray-400">
              <div className="space-y-2">
                <p className="subtitle uppercase text-[10px] tracking-widest text-nomos-pink font-semibold">Contato Direto</p>
                {settings.phone && (
                  <a
                    href={`tel:+${settings.phone.replace(/\D/g,'')}`}
                    className="flex items-center space-x-2 text-white hover:text-nomos-pink transition-colors"
                  >
                    <Phone size={14} />
                    <span>{settings.phone}</span>
                  </a>
                )}
                {settings.instagram && (
                  <a
                    href={settings.instagram.startsWith('http') ? settings.instagram : `https://instagram.com/${settings.instagram.replace('@','')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white hover:text-nomos-pink transition-colors"
                  >
                    <Instagram size={14} />
                    <span>{settings.instagram.startsWith('@') ? settings.instagram : `@${settings.instagram.replace(/.*instagram\.com\//,'')}`}</span>
                  </a>
                )}
              </div>

              {/* Central brand concept statement */}
              <div className="max-w-xs space-y-1">
                <p className="text-white text-xs font-semibold uppercase tracking-wider">Nomos Estúdio</p>
                <p className="text-xs text-justify">
                  “Toda marca tem algo a dizer. E a gente ajuda a dizer do jeito certo.”
                </p>
              </div>

              {/* Bold Pink CTA link inside overflow menu */}
              <div>
                <a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-nomos-pink hover:bg-white hover:text-black text-white font-bold uppercase text-xs tracking-widest px-6 py-3 rounded-full transition-all duration-300"
                >
                  <span>Fale com a gente</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
