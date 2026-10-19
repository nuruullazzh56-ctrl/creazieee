import React, { useState } from 'react';
import { Image as ImageIcon, Eye, Heart, Sparkles } from 'lucide-react';
import { GalleryPhoto } from '../types/wedding';
import { INITIAL_PHOTOS } from '../data/initialData';
import { LightboxModal } from './LightboxModal';

export const GallerySection: React.FC = () => {
  const [photos] = useState<GalleryPhoto[]>(INITIAL_PHOTOS);
  const [filter, setFilter] = useState<'semua' | 'prewedding' | 'momen' | 'lamaran'>('semua');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = filter === 'semua'
    ? photos
    : photos.filter((p) => p.category === filter);

  const openLightbox = (photoId: string) => {
    const idx = photos.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setActiveLightboxIndex(idx);
    }
  };

  return (
    <section id="galeri" className="py-20 px-4 bg-[#0d0e12] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-2">
            Momen Berharga
          </p>
          <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-[#f5f1ea] font-medium tracking-wide">
            Galeri Foto Kami
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-[#9c9183] mt-3 max-w-md mx-auto">
            Setiap jepretan kamera mengabadikan ketulusan senyum, rasa syukur, dan cinta yang tumbuh di antara kami.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'semua', label: 'Semua Momen' },
            { id: 'prewedding', label: 'Pre-Wedding' },
            { id: 'momen', label: 'Momen Manis' },
            { id: 'lamaran', label: 'Prosesi Lamaran' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-cinzel tracking-wider transition-all duration-300 ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#ba9325] text-stone-950 font-bold shadow-md'
                  : 'bg-[#181c26] text-[#b0a597] border border-[#3b3327] hover:border-[#d4af37]/50 hover:text-[#ecd599]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo.id)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#161922] border border-[#3d3326] shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-[#d4af37]/60 aspect-[4/5]"
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] font-cinzel tracking-widest uppercase text-[#d4af37] mb-1">
                  {photo.category}
                </span>
                <h4 className="font-serif-cormorant text-xl text-[#f5f1ea] font-medium leading-tight">
                  {photo.title}
                </h4>
                <p className="font-serif-cormorant text-xs text-[#d1c5b4] italic mt-1 line-clamp-2">
                  &ldquo;{photo.caption}&rdquo;
                </p>

                {/* View button hint on hover */}
                <div className="mt-3 flex items-center gap-2 text-xs text-[#ecd599] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Ukuran Penuh</span>
                </div>
              </div>

              {/* Top corner badge */}
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 backdrop-blur-md text-[#ecd599] opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-3.5 h-3.5 fill-rose-500/50 text-rose-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Gallery footer hint */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#8c8273] inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Ketuk salah satu foto untuk membuka galeri layar penuh &amp; slideshow</span>
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <LightboxModal
          photos={photos}
          currentIndex={activeLightboxIndex}
          isOpen={activeLightboxIndex !== null}
          onClose={() => setActiveLightboxIndex(null)}
          onSelectIndex={(newIdx) => setActiveLightboxIndex(newIdx)}
        />
      )}
    </section>
  );
};
