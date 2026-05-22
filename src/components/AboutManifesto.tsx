import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageSquare, Handshake, Compass } from 'lucide-react';
import { HeroTheme } from '../types';

interface AboutManifestoProps {
  theme: HeroTheme;
}

export const AboutManifesto: React.FC<AboutManifestoProps> = ({ theme }) => {
  const textContrastColor = theme === 'light' ? 'text-black' : 'text-white';
  const textMutedColor = theme === 'light' ? 'text-black/70' : 'text-white/70';
  const borderContrastColor = theme === 'light' ? 'border-black/10' : 'border-white/10';

  const pilares = [
    {
      title: "Trabalhar com a gente é trabalhar do lado da gente.",
      description: "Gostamos de criar juntos e fazemos questão que acompanhe cada passo do nosso processo criativo.",
      icon: <Handshake className="text-nomos-pink shrink-0" size={24} />,
      label: "01 / Parceria de Negócio"
    },
    {
      title: "Somamos visão estratégica com sensibilidade criativa.",
      description: "Pensamos de ponta a ponta para o seu negócio ter relevância e ficar na lembrança.",
      icon: <Compass className="text-nomos-pink shrink-0" size={24} />,
      label: "02 / Equilíbrio de Forças"
    },
    {
      title: "Relacionamento próximo, sem firula.",
      description: "Aqui, firmamos uma parceria com trocas sinceras, respeito e muito carinho com a marca que você quer construir.",
      icon: <MessageSquare className="text-nomos-pink shrink-0" size={24} />,
      label: "03 / Sem Firulas"
    }
  ];

  return (
    <section 
      id="sobre" 
      className={`w-full py-20 md:py-28 px-5 sm:px-8 md:px-12 border-t transition-colors duration-700 ${borderContrastColor}`}
    >
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
        
        {/* Core Description Column & Strategic Text block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left column (col-span 5): Small category label & bold core statement */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-2 text-nomos-pink uppercase text-[10px] sm:text-xs tracking-widest font-black">
              <span>// Quem Somos /. Manifesto</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-bold uppercase tracking-tight leading-tight ${textContrastColor}`}>
              CRIATIVIDADE & ESTRATÉGIA <br />Se encontram para dar
              <span className="italic font-normal text-nomos-pink"> forma a marcas consistentes.</span>
            </h2>
          </div>

          {/* Right column (col-span 7): Deep paragraphs about Nomos philosophy as on presentation Page 3 */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base leading-relaxed select-none">
            <p className={textMutedColor}>
              Somos um estúdio de criação e estratégia completo, onde criatividade e estratégia se encontram para dar forma a marcas consistentes e memoráveis. Atuamos desde o planejamento estratégico até a execução criativa, desenvolvendo identidade verbal, visual e conteúdos que fortalecem o posicionamento das empresas.
            </p>
            <p className={theme === 'light' ? 'text-black font-semibold' : 'text-white font-semibold'}>
              Mais do que criar, pensamos a marca como um todo: propósito, voz, imagem e presença, transformando negócios em referências que se destacam e permanecem.
            </p>

            {/* Custom stylized Highlight block inspired by Slide 5/6 */}
            <div className="p-4 rounded-xl border border-dashed border-nomos-pink/30 bg-nomos-pink/[0.02]">
              <p className="text-xs uppercase tracking-widest font-black text-nomos-pink mb-1">
                // Nosso Direcionamento
              </p>
              <p className={`text-xs uppercase tracking-wider font-semibold leading-relaxed ${textContrastColor}`}>
                Somos um <span className="text-nomos-pink">ecossistema criativo</span> que busca os melhores direcionamentos para a comunicação da sua empresa.
              </p>
            </div>
          </div>
        </div>

        {/* The Three Core Columns Grid inspired by slide 6 of the PDF */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-8 border-t border-current/5">
          {pilares.map((pilar, index) => (
            <div 
              key={index} 
              className="space-y-4 md:space-y-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif italic text-sm text-nomos-pink font-semibold uppercase">
                    {pilar.label}
                  </span>
                  <div className="p-2 rounded-lg bg-nomos-pink/5 group-hover:bg-nomos-pink/15 transition-colors duration-300">
                    {pilar.icon}
                  </div>
                </div>

                <h3 className={`font-serif text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight leading-snug group-hover:text-nomos-pink transition-colors duration-300 ${textContrastColor}`}>
                  {pilar.title}
                </h3>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed ${textMutedColor}`}>
                {pilar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
