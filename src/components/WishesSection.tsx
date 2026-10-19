import React, { useState } from 'react';
import { MessageSquareHeart, Heart, Send, Search, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { WishMessage } from '../types/wedding';

interface WishesSectionProps {
  wishes: WishMessage[];
  onAddWish: (name: string, message: string) => void;
  onLikeWish: (id: string) => void;
}

export const WishesSection: React.FC<WishesSectionProps> = ({
  wishes,
  onAddWish,
  onLikeWish
}) => {
  const [quickName, setQuickName] = useState('');
  const [quickMessage, setQuickMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickName.trim() && quickMessage.trim()) {
      onAddWish(quickName.trim(), quickMessage.trim());
      setQuickMessage('');
    }
  };

  const filteredWishes = wishes.filter(
    (w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: WishMessage['status']) => {
    switch (status) {
      case 'hadir':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] text-emerald-300">
            <CheckCircle2 className="w-3 h-3" /> Hadir
          </span>
        );
      case 'tidak_hadir':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-[10px] text-rose-300">
            <XCircle className="w-3 h-3" /> Berhalangan
          </span>
        );
      case 'ragu':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-[10px] text-amber-300">
            <HelpCircle className="w-3 h-3" /> Masih Ragu
          </span>
        );
    }
  };

  return (
    <section id="ucapan" className="py-20 px-4 bg-[#0d0e12] relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-2">
            Buku Tamu Digital
          </p>
          <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-[#f5f1ea] font-medium tracking-wide">
            Untaian Doa &amp; Ucapan
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-[#9c9183] mt-3 max-w-md mx-auto">
            Doa restu dan ketulusan kata dari Anda adalah kado terindah bagi awal bahtera rumah tangga kami.
          </p>
        </div>

        {/* Quick Send Message Box */}
        <div className="bg-[#161922] border border-[#3d3326] rounded-2xl p-5 sm:p-6 mb-8 shadow-xl">
          <h3 className="font-cinzel text-xs font-semibold text-[#ecd599] tracking-wider uppercase mb-3 flex items-center gap-2">
            <MessageSquareHeart className="w-4 h-4 text-[#d4af37]" />
            <span>Kirim Pesan Doa Singkat</span>
          </h3>

          <form onSubmit={handleQuickSubmit} className="space-y-3">
            <input
              type="text"
              required
              placeholder="Nama Anda..."
              value={quickName}
              onChange={(e) => setQuickName(e.target.value)}
              className="w-full bg-[#1e2330] border border-[#3b3428] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#f5f1ea] placeholder-stone-500 focus:outline-none focus:border-[#d4af37]"
            />
            <textarea
              rows={2}
              required
              placeholder="Tuliskan harapan & doa untuk Raditya & Kirana..."
              value={quickMessage}
              onChange={(e) => setQuickMessage(e.target.value)}
              className="w-full bg-[#1e2330] border border-[#3b3428] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#f5f1ea] placeholder-stone-500 focus:outline-none focus:border-[#d4af37] resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ba9325] text-stone-950 font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Doa</span>
              </button>
            </div>
          </form>
        </div>

        {/* Search Bar & Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <span className="text-xs text-[#a39786] font-cinzel tracking-wider">
            Total {wishes.length} Doa &amp; Ucapan Diterima
          </span>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari ucapan teman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#171a24] border border-[#3b3327] rounded-full pl-9 pr-4 py-1.5 text-xs text-[#f5f1ea] placeholder-stone-500 focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Wishes List (Scrollable Feed) */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {filteredWishes.length === 0 ? (
            <div className="text-center py-10 bg-[#14161f] rounded-2xl border border-[#2f281e]">
              <p className="text-sm text-stone-400">Belum ada ucapan yang cocok dengan pencarian.</p>
            </div>
          ) : (
            filteredWishes.map((item) => (
              <div
                key={item.id}
                className="bg-[#161922] border border-[#382f23] rounded-2xl p-4 sm:p-5 shadow-md hover:border-[#d4af37]/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    {/* Initials Avatar */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2a241c] to-[#161821] border border-[#d4af37]/40 flex items-center justify-center font-cinzel text-xs font-bold text-[#ecd599] shrink-0">
                      {item.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#f5f1ea] leading-tight">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-stone-500">{item.timestamp}</span>
                    </div>
                  </div>

                  <div>{getStatusBadge(item.status)}</div>
                </div>

                <p className="text-xs sm:text-sm text-[#cdc3b3] leading-relaxed mb-3 pl-11">
                  &ldquo;{item.message}&rdquo;
                </p>

                {/* Like Button */}
                <div className="flex justify-end pt-2 border-t border-[#262b3a]/50">
                  <button
                    onClick={() => onLikeWish(item.id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1e2330] hover:bg-[#282f42] text-xs text-rose-300 border border-[#3b3428] transition group"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500/20 text-rose-400 group-hover:scale-125 transition-transform" />
                    <span className="text-[11px] font-medium">{item.likes}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
