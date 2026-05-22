import React from 'react';
import { motion } from 'motion/react';
import { Ear,Compass, Zap, Lightbulb } from 'lucide-react';
import { HeroTheme } from '../types';

interface StrategySectionProps {
  theme: HeroTheme;
}

export const StrategySection: React.FC<StrategySectionProps> = ({ theme }) => {
  const isLight = theme === 'light';
  
  // Design values based on the requested visual style
  const bgStyle = isLight ? 'bg-[#FFFFFF] text-black' : 'bg-[#0E0E0E] text-white';
  const textContrastColor = isLight ? 'text-black' : 'text-white';
  const textMutedColor = isLight ? 'text-black/70' : 'text-white/70';
  const borderContrastColor = isLight ? 'border-black/10' : 'border-white/10';
  const cardBgStyle = isLight ? 'bg-[#F9F7F2]' : 'bg-[#161616]';

  const cards = [
    {
      title: "1. Escuta",
      description: "Entendemos o negócio, o público, o mercado e os sinais que já existem na marca.",
      icon: <Ear size={20} className="text-nomos-pink" />
    },
    {
      title: "2. Direção",
      description: "Organizamos posicionamento, voz, narrativa e presença para dar clareza ao caminho.",
      icon: <Compass size={20} className="text-nomos-pink" />
    },
    {
      title: "3. Criação com sentido",
      description: "Transformamos estratégia em escolhas visuais, verbais e criativas mais consistentes.",
      icon: <Zap size={20} className="text-nomos-pink" />
    }
  ];

  return (
    <section 
      id="estrategia" 
      className={`w-full py-20 sm:py-28 px-5 sm:px-8 md:px-12 border-t transition-colors duration-700 ${borderContrastColor} ${bgStyle}`}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Upper Editorial Title Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center space-x-2 text-nomos-pink uppercase text-[10px] sm:text-xs tracking-widest font-black mb-3">
              <span className="w-1.5 h-1.5 bg-nomos-pink rounded-full" />
              <span>// Métodos /. Estratégia</span>
            </div>
            <h2 className={`font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight ${textContrastColor}`}>
              Estratégia
            </h2>
          </div>
          
          <div className="lg:col-span-8">
            <p className="font-sans text-lg sm:text-xl md:text-2xl font-light tracking-wide text-nomos-pink uppercase">
              Antes de criar, a gente entende.
            </p>
          </div>
        </div>

        {/* Editorial Layout: Strategic Core Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-8 border-t border-current/5">
          
          {/* Main paragraphs */}
          <div className="lg:col-span-8 space-y-6 text-sm sm:text-base leading-relaxed select-none">
            <p className={textMutedColor}>
              Mergulhamos no universo da marca para identificar o que ela carrega, o que precisa comunicar e como pode ocupar um lugar mais claro na memória das pessoas.
            </p>
            <p className={textContrastColor}>
              A estratégia é o ponto de partida para transformar intenção em direção. É onde organizamos posicionamento, voz, narrativa, presença e caminhos criativos para que cada escolha tenha sentido.
            </p>
            <p className={textMutedColor}>
              Não criamos apenas para ficar bonito. Criamos para construir marca, gerar reconhecimento e sustentar uma comunicação que faça sentido para o negócio e para quem ele quer alcançar.
            </p>
          </div>

          {/* Sincere Callout - "Trabalhar de perto" */}
          <div className="lg:col-span-4 flex">
            <div className="w-full p-6 sm:p-8 rounded-2xl border border-dashed border-nomos-pink/40 bg-nomos-pink/[0.02] flex flex-col justify-between self-start">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-nomos-pink mb-2 block">
                  // O Segredo da Nomos
                </span>
                <p className={`text-xs uppercase font-bold tracking-wider leading-relaxed ${textContrastColor}`}>
                  “Não acreditamos no acaso. Toda marca forte surge de uma reflexão minuciosa.”
                </p>
              </div>
              <div className="mt-6 flex items-center space-x-2 text-[10px] tracking-widest font-black text-nomos-pink">
                <span>COORDENAÇÃO ESTRATÉGICA</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Small Editorial grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:border-nomos-pink hover:-translate-y-1 flex flex-col justify-between gap-6 group ${borderContrastColor} ${cardBgStyle}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {card.icon}
                  <span className="text-[10px] font-mono tracking-widest text-nomos-pink font-semibold">
                    [ DIREÇÃO_0{idx + 1} ]
                  </span>
                </div>
                
                <h3 className={`font-serif text-lg sm:text-xl font-bold uppercase tracking-tight group-hover:text-nomos-pink transition-colors ${textContrastColor}`}>
                  {card.title}
                </h3>
              </div>
              
              <p className={`text-xs sm:text-sm leading-relaxed ${textMutedColor}`}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
