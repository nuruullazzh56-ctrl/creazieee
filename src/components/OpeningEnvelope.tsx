import React, { useState } from 'react';
import { Mail, MailOpen, Heart, Sparkles, Music2, Edit3, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { musicPlayer } from '../utils/audio';

interface OpeningEnvelopeProps {
  guestName: string;
  onOpen: () => void;
  onUpdateGuestName: (newName: string) => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({
  guestName,
  onOpen,
  onUpdateGuestName
}) => {
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(guestName);

  const handleOpenInvitation = () => {
    setIsOpenAnimation(true);

    // Trigger romantic confetti blast
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f3e5ab', '#e08f76', '#ffffff']
    });

    // Start background music
    musicPlayer.start();

    // Smooth transition
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateGuestName(tempName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700 ${
        isOpenAnimation ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, #1e1b18 0%, #0d0e12 100%)',
      }}
    >
      {/* Background ambient decorative glow & motif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-600/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-rose-600/10 blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
      </div>

      {/* Main Envelope Card */}
      <div className="relative w-full max-w-md bg-[#16181f]/95 border border-[#3d3326] rounded-2xl shadow-2xl p-6 sm:p-8 text-center backdrop-blur-md overflow-hidden">
        {/* Ornate corner borders */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]/60" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]/60" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]/60" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]/60" />

        {/* Monogram Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#2a241b] to-[#121318] border border-[#d4af37]/50 shadow-inner mb-4 relative">
          <span className="font-cinzel text-xl text-[#ecd599] font-bold tracking-widest">
            R<span className="text-rose-400 font-serif italic text-sm">&</span>K
          </span>
          <Sparkles className="w-4 h-4 text-[#d4af37] absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        {/* Subtitle */}
        <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-1">
          The Wedding Celebration
        </p>

        {/* Couple Names */}
        <h1 className="font-serif-cormorant text-3xl sm:text-4xl text-[#f5f1ea] font-medium tracking-wide mb-1">
          Raditya <span className="font-script-vibes text-4xl sm:text-5xl text-[#ecd599] font-normal mx-1">&</span> Kirana
        </h1>

        <p className="font-cinzel text-xs text-[#a39480] tracking-widest mb-6">
          SABTU, 12 DESEMBER 2026
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
          <Heart className="w-4 h-4 text-rose-400/80 fill-rose-400/30" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
        </div>

        {/* Recipient Invitation Box */}
        <div className="bg-[#1c1f28]/80 border border-[#3b3428] rounded-xl p-4 mb-6 shadow-inner relative group">
          <p className="text-xs uppercase tracking-wider text-[#a89d8f] mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>

          {isEditingName ? (
            <form onSubmit={handleSaveName} className="mt-2 flex items-center justify-center gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
                className="bg-[#242935] text-[#f5f1ea] text-sm px-3 py-1.5 rounded-lg border border-[#d4af37]/50 focus:outline-none focus:ring-1 focus:ring-[#d4af37] text-center w-full"
                placeholder="Tuliskan nama tamu..."
              />
              <button
                type="submit"
                className="bg-[#d4af37] text-stone-900 p-1.5 rounded-lg hover:bg-[#e4c256] transition"
                title="Simpan Nama"
              >
                <Check className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold text-[#ecd599] tracking-wide">
                {guestName}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setTempName(guestName);
                  setIsEditingName(true);
                }}
                className="text-[#8e8272] hover:text-[#ecd599] transition p-1"
                title="Ubah nama tamu (untuk tes link)"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <p className="text-[11px] text-[#7d756b] mt-1 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Action Button: Buka Undangan */}
        <button
          onClick={handleOpenInvitation}
          disabled={isOpenAnimation}
          className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f0da98] to-[#c19b26] p-[1px] shadow-lg shadow-amber-950/40 hover:shadow-amber-700/30 transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[11px] bg-[#1a1714] group-hover:bg-[#201d18] transition-colors duration-300">
            {isOpenAnimation ? (
              <MailOpen className="w-5 h-5 text-[#ecd599] animate-bounce" />
            ) : (
              <Mail className="w-5 h-5 text-[#ecd599] group-hover:scale-110 transition-transform" />
            )}
            <span className="font-cinzel text-sm font-semibold tracking-wider text-[#ecd599] group-hover:text-white transition-colors">
              {isOpenAnimation ? 'Membuka Pintu Kebahagiaan...' : 'Buka Undangan'}
            </span>
          </div>
        </button>

        {/* Music hint */}
        <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-[#7d756b]">
          <Music2 className="w-3.5 h-3.5 text-[#d4af37]/70" />
          <span>Disertai audio latar musik instrumen syahdu</span>
        </div>
      </div>
    </div>
  );
};
