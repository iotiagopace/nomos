import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  theme?: 'light' | 'dark';
  logoUrl?: string; // Option for custom logo override
}

export const Logo: React.FC<LogoProps> = ({ className = '', theme = 'dark', logoUrl }) => {
  const [imageError, setImageError] = useState(false);

  // Use the correct attached Nomos logo products:
  // - input_file_0.png: White horizontal logo with the pink slash in the "n" and pink dot at the end (Perfect for dark theme)
  // - input_file_2.png: Black horizontal logo with the pink slash in the "n" and pink dot at the end (Perfect for light theme)
  const resolvedLogoUrl = logoUrl || (theme === 'light' ? '/input_file_2.png' : '/input_file_0.png');

  // If a custom image URL was specifically passed or if the user wants static brand assets,
  // we can fall back to the image. However, to support the requested hover-interaction (slash tilting, dot expanding)
  // with sharp vector rendering, we provide an optimized interactive typographic wordmark.
  const useTypographicInteractiveLogo = !logoUrl;

  if (!useTypographicInteractiveLogo && !imageError) {
    return (
      <div className={`flex items-center select-none ${className}`}>
        <img 
          src={resolvedLogoUrl} 
          alt="Nomos Estúdio" 
          className="h-7 sm:h-8 md:h-9 lg:h-10 w-auto object-contain transition-colors duration-500"
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Premium interactive typographic logo showing the brand identity perfectly
  const textColor = theme === 'light' ? 'text-black' : 'text-white';

  return (
    <div 
      className={`group flex items-baseline font-serif tracking-tight cursor-pointer select-none ${className}`}
      title="Nomos Estúdio"
    >
      {/* Letter 'n' with interactive tilting slash */}
      <span className="relative inline-block text-2xl sm:text-3xl md:text-4xl font-extrabold lowercase mr-[2px]">
        {/* Slanted Slash Element: tilts slightly from 20deg to 38deg on hover, scaling slightly for a premium feel */}
        <span className="absolute -left-[5px] sm:-left-[6px] top-[-3px] sm:top-[-4px] text-nomos-pink text-[1.1em] font-light origin-center rotate-[20deg] group-hover:rotate-[38deg] group-hover:scale-y-115 transition-transform duration-500 ease-out select-none">
          /
        </span>
        <span className={`${textColor} transition-colors duration-500`}>n</span>
      </span>

      {/* Letters 'omos' with smooth color interpolation */}
      <span className={`text-2xl sm:text-3xl md:text-4xl font-extrabold lowercase tracking-tight transition-colors duration-500 ease-in-out ${textColor}`}>
        omos
      </span>

      {/* Pink Dot with hover scale expansion */}
      <span className="inline-block text-nomos-pink text-3xl sm:text-4xl md:text-5xl font-black leading-none ml-[2px] origin-bottom group-hover:scale-[1.55] transition-transform duration-500 ease-out">
        .
      </span>
    </div>
  );
};


