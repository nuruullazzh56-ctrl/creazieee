import React from 'react';
import { Instagram, Heart } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/initialData';

export const CoupleSection: React.FC = () => {
  return (
    <section id="mempelai" className="relative py-20 px-4 bg-[#0d0e12] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-2">
            Mempelai Yang Berbahagia
          </p>
          <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-[#f5f1ea] font-medium tracking-wide">
            Sang Pengantin
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-[#9c9183] mt-3 max-w-md mx-auto">
            Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta&apos;ala, kami bermaksud melangsungkan ikatan suci pernikahan:
          </p>
        </div>

        {/* Couple Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Mempelai Pria (Groom) */}
          <div className="flex flex-col items-center text-center group">
            {/* Photo with double frame */}
            <div className="relative mb-6">
              <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={WEDDING_CONFIG.groom.photo}
                  alt={WEDDING_CONFIG.groom.fullName}
                  className="w-full h-full object-cover object-top filter contrast-105"
                />
              </div>
              {/* Outer decorative ring */}
              <div className="absolute -inset-2.5 rounded-t-full rounded-b-3xl border border-[#d4af37]/25 pointer-events-none transition-transform duration-500 group-hover:scale-105" />
            </div>

            <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-[#f5f1ea] font-semibold mb-1">
              {WEDDING_CONFIG.groom.fullName}
            </h3>
            <span className="font-cinzel text-xs text-[#d4af37] tracking-widest uppercase mb-3">
              Mempelai Pria
            </span>

            <p className="text-xs sm:text-sm text-[#b0a597] leading-relaxed max-w-xs mb-3">
              {WEDDING_CONFIG.groom.childOrder} dari:
              <br />
              <strong className="text-[#e2dacd]">{WEDDING_CONFIG.groom.father}</strong>
              <br />
              &amp; <strong className="text-[#e2dacd]">{WEDDING_CONFIG.groom.mother}</strong>
            </p>

            <a
              href={`https://instagram.com/${WEDDING_CONFIG.groom.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b1e28] hover:bg-[#282d3c] border border-[#3b3428] text-xs text-[#ecd599] transition shadow-sm"
            >
              <Instagram className="w-3.5 h-3.5 text-rose-400" />
              <span>{WEDDING_CONFIG.groom.instagram}</span>
            </a>
          </div>

          {/* Central Heart (on mobile it shows between, on desktop visually connects) */}
          <div className="md:hidden flex items-center justify-center my-[-10px]">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
              <div className="w-9 h-9 rounded-full bg-[#1c1f2a] border border-[#d4af37]/50 flex items-center justify-center">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400/50 animate-pulse" />
              </div>
              <div className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
            </div>
          </div>

          {/* Mempelai Wanita (Bride) */}
          <div className="flex flex-col items-center text-center group">
            {/* Photo with double frame */}
            <div className="relative mb-6">
              <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={WEDDING_CONFIG.bride.photo}
                  alt={WEDDING_CONFIG.bride.fullName}
                  className="w-full h-full object-cover object-top filter contrast-105"
                />
              </div>
              {/* Outer decorative ring */}
              <div className="absolute -inset-2.5 rounded-t-full rounded-b-3xl border border-[#d4af37]/25 pointer-events-none transition-transform duration-500 group-hover:scale-105" />
            </div>

            <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-[#f5f1ea] font-semibold mb-1">
              {WEDDING_CONFIG.bride.fullName}
            </h3>
            <span className="font-cinzel text-xs text-[#d4af37] tracking-widest uppercase mb-3">
              Mempelai Wanita
            </span>

            <p className="text-xs sm:text-sm text-[#b0a597] leading-relaxed max-w-xs mb-3">
              {WEDDING_CONFIG.bride.childOrder} dari:
              <br />
              <strong className="text-[#e2dacd]">{WEDDING_CONFIG.bride.father}</strong>
              <br />
              &amp; <strong className="text-[#e2dacd]">{WEDDING_CONFIG.bride.mother}</strong>
            </p>

            <a
              href={`https://instagram.com/${WEDDING_CONFIG.bride.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b1e28] hover:bg-[#282d3c] border border-[#3b3428] text-xs text-[#ecd599] transition shadow-sm"
            >
              <Instagram className="w-3.5 h-3.5 text-rose-400" />
              <span>{WEDDING_CONFIG.bride.instagram}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
