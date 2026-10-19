import React from 'react';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/initialData';

interface HeroSectionProps {
  guestName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ guestName }) => {
  return (
    <section id="beranda" className="relative min-h-[92vh] flex items-center justify-center text-center px-4 py-16 overflow-hidden">
      {/* Background Image with elegant dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80"
          alt="Wedding background"
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-105 scale-105 animate-pulse"
          style={{ animationDuration: '10s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1115]/90 via-[#0f1115]/60 to-[#0f1115]" />
      </div>

      {/* Decorative floral arch pattern / geometric motif */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[320px] sm:w-[480px] h-[520px] sm:h-[620px] border border-[#d4af37]/20 rounded-t-full rounded-b-3xl relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#181a20] border border-[#d4af37]/40 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Subtle Tagline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e222e]/80 border border-[#4a3e2a] text-[#ecd599] text-xs font-cinzel tracking-[0.25em] uppercase mb-5 backdrop-blur-sm shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          The Wedding Celebration
        </div>

        {/* Couple Names */}
        <h1 className="font-serif-cormorant text-4xl sm:text-6xl md:text-7xl text-[#fbf8f2] font-normal leading-tight tracking-wide mb-2 drop-shadow-md">
          {WEDDING_CONFIG.groom.shortName} <span className="font-script-vibes text-5xl sm:text-7xl text-[#ecd599] font-normal mx-1">&</span> {WEDDING_CONFIG.bride.shortName}
        </h1>

        <p className="font-serif-cormorant text-lg sm:text-xl text-[#d1c5b4] italic mb-6">
          {WEDDING_CONFIG.groom.fullName} &amp; {WEDDING_CONFIG.bride.fullName}
        </p>

        {/* Date & Location Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-[#e6ded3] mb-8">
          <div className="flex items-center gap-2 bg-[#1b1e28]/70 border border-[#3d3326] px-4 py-2 rounded-xl backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-[#ecd599]" />
            <span className="font-cinzel tracking-wider">{WEDDING_CONFIG.displayDate}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#1b1e28]/70 border border-[#3d3326] px-4 py-2 rounded-xl backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>Jakarta Selatan, Indonesia</span>
          </div>
        </div>

        {/* Personalized Welcome Card */}
        <div className="w-full max-w-sm bg-gradient-to-b from-[#1b1e28]/90 to-[#14161f]/90 border border-[#4d402b]/60 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
          <p className="text-[11px] uppercase tracking-widest text-[#a89d8f] mb-1 font-cinzel">
            Tamu Yang Terhormat
          </p>
          <p className="text-lg sm:text-xl font-semibold text-[#ecd599] mb-1 tracking-wide">
            {guestName}
          </p>
          <p className="text-xs text-[#a4998b] leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 flex flex-col items-center gap-1.5 opacity-70 animate-bounce">
          <span className="text-[10px] uppercase font-cinzel tracking-[0.2em] text-[#a89d8f]">Gulir Ke Bawah</span>
          <div className="w-5 h-8 border border-[#d4af37]/40 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-[#ecd599] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
