import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/initialData';

export const QuoteSection: React.FC = () => {
  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-[#0f1115] via-[#14161f] to-[#0f1115] overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Subtle decorative icon */}
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1e2330] border border-[#d4af37]/30 mb-6 shadow-md">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400/20" />
        </div>

        {/* Arabic Quranic Ayah */}
        <div className="mb-6 px-4">
          <p
            className="text-xl sm:text-2xl md:text-3xl leading-[2.2] sm:leading-[2.4] text-[#ecd599] font-serif text-center direction-rtl"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {WEDDING_CONFIG.quote.arabic}
          </p>
        </div>

        {/* Indonesian Translation */}
        <p className="font-serif-cormorant text-base sm:text-lg text-[#dcd4c7] leading-relaxed italic px-4 sm:px-8 mb-4">
          &ldquo;{WEDDING_CONFIG.quote.translation}&rdquo;
        </p>

        {/* Source */}
        <div className="inline-flex items-center gap-2 font-cinzel text-xs text-[#a39480] tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{WEDDING_CONFIG.quote.source}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        </div>

        {/* Ornamental divider line */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]/50" />
          <div className="w-2 h-2 rotate-45 border border-[#d4af37]/60" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]/50" />
        </div>
      </div>
    </section>
  );
};
