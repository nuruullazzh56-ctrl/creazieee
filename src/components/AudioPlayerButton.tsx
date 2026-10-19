import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { musicPlayer } from '../utils/audio';

export const AudioPlayerButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsPlaying(musicPlayer.getIsPlaying());
  }, []);

  const handleToggle = () => {
    const newState = musicPlayer.toggle();
    setIsPlaying(newState);
  };

  return (
    <div className="fixed top-5 right-5 z-40">
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Hentikan Musik' : 'Putar Musik'}
        className={`relative flex items-center justify-center w-11 h-11 rounded-full border shadow-xl backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? 'bg-[#221d17]/90 border-[#d4af37] text-[#ecd599] shadow-amber-950/40 ring-2 ring-[#d4af37]/30'
            : 'bg-[#181a20]/80 border-stone-700 text-stone-400 hover:text-stone-200'
        }`}
        title={isPlaying ? 'Jeda Musik Latar' : 'Putar Musik Latar'}
      >
        {isPlaying ? (
          <div className="relative">
            <Volume2 className="w-5 h-5 text-[#ecd599] animate-pulse" />
            <Music className="w-3 h-3 text-[#d4af37] absolute -top-2.5 -right-2 animate-bounce" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-stone-400" />
        )}
      </button>
    </div>
  );
};
