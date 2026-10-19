import React, { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize2, Minimize2 } from 'lucide-react';
import { GalleryPhoto } from '../types/wedding';

interface LightboxModalProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex
}) => {
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentPhoto = photos[currentIndex];

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, photos.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length, onSelectIndex]);

  // Slideshow auto timer
  useEffect(() => {
    let timer: number | null = null;
    if (isOpen && isPlayingSlideshow) {
      timer = window.setInterval(() => {
        handleNext();
      }, 3500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, isPlayingSlideshow, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlayingSlideshow((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-6 transition-opacity animate-in fade-in duration-200">
      {/* Top Bar Controls */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 z-50 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="font-cinzel text-xs text-[#ecd599] bg-[#1a1c24]/80 px-3 py-1 rounded-full border border-[#3f3525]">
            {currentIndex + 1} / {photos.length}
          </span>
          <span className="text-xs uppercase font-cinzel tracking-wider text-[#9f9485] hidden sm:inline-block">
            {currentPhoto.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Slideshow button */}
          <button
            onClick={() => setIsPlayingSlideshow(!isPlayingSlideshow)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
              isPlayingSlideshow
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-[#1a1c24]/80 border-[#3f3525] text-stone-300 hover:text-white'
            }`}
            title="Mulai / Hentikan Slideshow Otomatis (Spasi)"
          >
            {isPlayingSlideshow ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPlayingSlideshow ? 'Jeda' : 'Slideshow'}</span>
          </button>

          {/* Zoom button */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-full bg-[#1a1c24]/80 border border-[#3f3525] text-stone-300 hover:text-white transition"
            title="Perbesar / Perkecil"
          >
            {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-rose-950/40 border border-rose-800/40 text-rose-300 hover:bg-rose-900/60 transition"
            title="Tutup (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-6 z-40 p-2.5 sm:p-3 rounded-full bg-[#1b1e28]/80 hover:bg-[#282d3c] border border-[#3f3525] text-[#ecd599] transition shadow-2xl active:scale-95"
        title="Foto Sebelumnya"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-6 z-40 p-2.5 sm:p-3 rounded-full bg-[#1b1e28]/80 hover:bg-[#282d3c] border border-[#3f3525] text-[#ecd599] transition shadow-2xl active:scale-95"
        title="Foto Selanjutnya"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Frame */}
      <div className="relative max-w-5xl max-h-[82vh] flex flex-col items-center justify-center p-2">
        <img
          src={currentPhoto.url}
          alt={currentPhoto.title}
          className={`max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-300 ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Caption */}
        <div className="mt-4 text-center max-w-lg px-4">
          <h4 className="font-serif-cormorant text-xl sm:text-2xl text-[#f5f1ea] font-medium">
            {currentPhoto.title}
          </h4>
          <p className="font-serif-cormorant text-xs sm:text-sm text-[#c4b9a9] italic mt-1">
            &ldquo;{currentPhoto.caption}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
