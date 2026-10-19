import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/initialData';

export const FooterSection: React.FC = () => {
  return (
    <footer className="py-16 px-4 bg-[#0a0c10] border-t border-[#262017] text-center relative overflow-hidden pb-28">
      <div className="max-w-xl mx-auto relative z-10">
        {/* Monogram */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#181c27] border border-[#d4af37]/40 shadow-inner mb-4">
          <span className="font-cinzel text-lg text-[#ecd599] font-bold">R &amp; K</span>
        </div>

        <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#a89d8f] mb-1">
          Terima Kasih Atas Doa &amp; Kehadiran Anda
        </p>

        <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-[#f5f1ea] font-medium mb-4">
          {WEDDING_CONFIG.groom.shortName} &amp; {WEDDING_CONFIG.bride.shortName}
        </h3>

        <p className="font-serif-cormorant text-xs sm:text-sm text-[#b0a597] italic leading-relaxed mb-6">
          &ldquo;Dan semoga Allah SWT senantiasa melimpahkan berkah, kedamaian, dan cinta kasih dalam keluarga kita semua. Aamiin ya Rabbal Alamin.&rdquo;
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-[#7e7467]">
          <span>Dibuat dengan</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>untuk Momen Bahagia Kami</span>
        </div>
      </div>
    </footer>
  );
};
