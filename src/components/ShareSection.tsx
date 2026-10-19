import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Send, QrCode } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/initialData';

interface ShareSectionProps {
  currentGuestName: string;
}

export const ShareSection: React.FC<ShareSectionProps> = ({ currentGuestName }) => {
  const [recipientName, setRecipientName] = useState(currentGuestName || 'Sahabat Terkasih');
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  // Current base URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://wedding.example.com';
  const personalizedUrl = `${baseUrl}?to=${encodeURIComponent(recipientName.trim())}`;

  const invitationMessage = `*Undangan Pernikahan Digital*\n\nKepada Yth. Bapak/Ibu/Saudara/i\n*${recipientName.trim()}*\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk menghadiri pernikahan kami:\n\n*${WEDDING_CONFIG.groom.fullName}*\n&\n*${WEDDING_CONFIG.bride.fullName}*\n\n📅 Waktu: ${WEDDING_CONFIG.displayDate}\n📍 Lokasi: ${WEDDING_CONFIG.events.resepsi.locationName}\n\nDetail acara, galeri foto, peta lokasi, dan konfirmasi kehadiran (RSVP) dapat diakses melalui tautan berikut:\n${personalizedUrl}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(personalizedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(invitationMessage)}`;
    window.open(waUrl, '_blank');
  };

  const handleShareTelegram = () => {
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(personalizedUrl)}&text=${encodeURIComponent(`Undangan Pernikahan ${WEDDING_CONFIG.groom.shortName} & ${WEDDING_CONFIG.bride.shortName}`)}`;
    window.open(tgUrl, '_blank');
  };

  return (
    <section id="bagikan" className="py-20 px-4 bg-[#0d0e12] relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-2">
            Bagikan Kebahagiaan
          </p>
          <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-[#f5f1ea] font-medium tracking-wide">
            Bagikan Tautan Undangan
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-[#9c9183] mt-3 max-w-md mx-auto">
            Buat tautan personal khusus untuk tamu Anda, lalu bagikan dengan mudah ke WhatsApp atau media sosial.
          </p>
        </div>

        {/* Share Generator Card */}
        <div className="bg-[#161922] border border-[#3f3525] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* Input nama tamu khusus */}
          <div className="mb-6">
            <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-2">
              Nama Tamu yang Dituju
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Contoh: Bpk. Bambang Pamungkas & Keluarga"
              className="w-full bg-[#1e2330] border border-[#3b3428] rounded-xl px-4 py-3 text-sm text-[#f5f1ea] placeholder-stone-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
            />
            <p className="text-[11px] text-[#7d756b] mt-1.5 italic">
              Nama ini akan otomatis terpampang indah di sampul amplop undangan saat link dibuka.
            </p>
          </div>

          {/* Generated URL Box */}
          <div className="mb-6">
            <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-2">
              Tautan Undangan Khusus
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={personalizedUrl}
                className="w-full bg-[#13151d] border border-[#2f281e] rounded-xl px-3.5 py-2.5 text-xs text-[#dcd4c7] font-mono focus:outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#222736] hover:bg-[#2c3346] border border-[#443828] text-xs font-semibold text-[#ecd599] transition active:scale-95"
                title="Salin Tautan"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Bagikan ke WhatsApp</span>
            </button>

            <button
              onClick={() => setShowQr(!showQr)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#202534] hover:bg-[#2a3144] border border-[#433827] text-[#ecd599] font-semibold text-xs sm:text-sm transition active:scale-95"
            >
              <QrCode className="w-4 h-4 text-[#d4af37]" />
              <span>{showQr ? 'Tutup Kode QR' : 'Tampilkan Kode QR'}</span>
            </button>
          </div>

          {/* QR Code Container */}
          {showQr && (
            <div className="p-5 rounded-2xl bg-[#13151d] border border-[#3b3427] text-center mb-6 animate-in fade-in duration-200">
              <p className="text-xs font-cinzel uppercase text-[#ecd599] mb-3">
                Scan Undangan untuk: {recipientName}
              </p>
              <div className="bg-white p-3 rounded-xl inline-block shadow-md">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(personalizedUrl)}`}
                  alt="QR Code Undangan"
                  className="w-40 h-40"
                />
              </div>
              <p className="text-[11px] text-stone-400 mt-2">
                Dapat dicetak pada souvenir atau meja registrasi resepsi.
              </p>
            </div>
          )}

          {/* Other social platforms */}
          <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#29231b]">
            <span className="text-[11px] text-stone-500 font-cinzel">Media Lain:</span>
            <button
              onClick={handleShareTelegram}
              className="px-3 py-1 rounded-full bg-[#1b1f2b] hover:bg-[#252b3d] text-xs text-stone-300 transition flex items-center gap-1.5"
            >
              <Send className="w-3 h-3 text-sky-400" /> Telegram
            </button>
            <button
              onClick={() => {
                const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(personalizedUrl)}`;
                window.open(fbUrl, '_blank');
              }}
              className="px-3 py-1 rounded-full bg-[#1b1f2b] hover:bg-[#252b3d] text-xs text-stone-300 transition flex items-center gap-1.5"
            >
              <Share2 className="w-3 h-3 text-blue-400" /> Facebook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
