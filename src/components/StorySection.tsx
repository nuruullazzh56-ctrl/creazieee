import React from 'react';
import { Sparkles, Heart, Gem, Crown } from 'lucide-react';
import { INITIAL_STORIES } from '../data/initialData';

export const StorySection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-[#ecd599]" />;
      case 'heart':
        return <Heart className="w-4 h-4 text-rose-400 fill-rose-400/30" />;
      case 'ring':
        return <Gem className="w-4 h-4 text-amber-300" />;
      case 'crown':
      default:
        return <Crown className="w-4 h-4 text-[#ecd599]" />;
    }
  };

  return (
    <section id="cerita" className="py-20 px-4 bg-gradient-to-b from-[#0d0e12] via-[#141720] to-[#0d0e12] relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-2">
            Perjalanan Kasih
          </p>
          <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-[#f5f1ea] font-medium tracking-wide">
            Kisah Cinta Kami
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-[#9c9183] mt-3 max-w-md mx-auto">
            Setiap kisah cinta itu indah, namun kisah cinta kami adalah yang paling kami syukuri di setiap hembusan nafas.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-[#3d3326] ml-4 sm:ml-32 space-y-10 sm:space-y-12">
          {INITIAL_STORIES.map((item, index) => (
            <div key={index} className="relative pl-6 sm:pl-8 group">
              {/* Year marker on desktop (left of line) */}
              <div className="hidden sm:block absolute -left-28 top-0 text-right w-20">
                <span className="font-cinzel text-lg font-bold text-[#ecd599] group-hover:text-amber-300 transition-colors">
                  {item.year}
                </span>
              </div>

              {/* Icon Node on timeline */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#1e2330] border-2 border-[#d4af37] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#282f42] transition-transform">
                {getIcon(item.icon)}
              </div>

              {/* Story Card */}
              <div className="bg-[#171a24]/90 border border-[#3b3327] rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm group-hover:border-[#d4af37]/60 transition-colors">
                <div className="sm:hidden mb-2">
                  <span className="font-cinzel text-sm font-bold text-[#ecd599] px-2.5 py-0.5 rounded-full bg-[#242b3b] border border-[#433b2f]">
                    {item.year}
                  </span>
                </div>
                <h3 className="font-serif-cormorant text-xl sm:text-2xl text-[#f5f1ea] font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#aba091] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
