import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Send, Heart, Users, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Guest, WishMessage } from '../types/wedding';

interface RsvpSectionProps {
  currentGuestName: string;
  onRsvpSubmit: (guestData: Partial<Guest>, wishText: string) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  currentGuestName,
  onRsvpSubmit
}) => {
  const [name, setName] = useState(currentGuestName);
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [pax, setPax] = useState<number>(1);
  const [session, setSession] = useState<'akad' | 'resepsi' | 'keduanya'>('keduanya');
  const [wishes, setWishes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    onRsvpSubmit(
      {
        name: name.trim(),
        phone: phone.trim(),
        status,
        pax: status === 'tidak_hadir' ? 0 : pax,
        session,
        wishes: wishes.trim()
      },
      wishes.trim()
    );

    setIsSubmitted(true);

    if (status === 'hadir') {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#d4af37', '#e08f76', '#22c55e', '#ffffff']
      });
    }
  };

  return (
    <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-[#0d0e12] via-[#151822] to-[#0d0e12] relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-2">
            Konfirmasi Kehadiran
          </p>
          <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-[#f5f1ea] font-medium tracking-wide">
            Reservasi Tempat (RSVP)
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-[#9c9183] mt-3 max-w-md mx-auto">
            Mohon konfirmasikan kehadiran Bapak/Ibu/Saudara/i untuk memudahkan kami dalam penataan jamuan dan tempat duduk.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-[#171b26]/90 border border-[#3f3525] rounded-3xl p-6 sm:p-9 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Subtle golden corner highlights */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-[#f5f1ea] font-semibold mb-2">
                Terima Kasih, {name}!
              </h3>
              <p className="text-sm text-[#cdc3b4] max-w-sm mx-auto mb-4 leading-relaxed">
                {status === 'hadir'
                  ? `Konfirmasi kehadiran Anda (${pax} Orang) telah berhasil kami catat. Sampai jumpa di hari bahagia kami!`
                  : status === 'tidak_hadir'
                  ? 'Konfirmasi Anda telah kami catat. Terima kasih banyak atas doa dan perhatian yang diberikan.'
                  : 'Konfirmasi Anda telah kami catat. Kami tunggu kabar baik selanjutnya!'}
              </p>

              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#222736] hover:bg-[#2c3346] border border-[#443828] text-xs font-semibold text-[#ecd599] transition shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Perbarui / Ubah Data RSVP</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Bpk. Hendra Gunawan & Istri"
                  className="w-full bg-[#1e2330] border border-[#3b3428] rounded-xl px-4 py-3 text-sm text-[#f5f1ea] placeholder-stone-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
                />
              </div>

              {/* No WhatsApp / Kontak */}
              <div>
                <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-2">
                  Nomor WhatsApp (Opsional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-[#1e2330] border border-[#3b3428] rounded-xl px-4 py-3 text-sm text-[#f5f1ea] placeholder-stone-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
                />
              </div>

              {/* Status Kehadiran Radio Group */}
              <div>
                <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-2">
                  Konfirmasi Kehadiran *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setStatus('hadir')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                      status === 'hadir'
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/50'
                        : 'bg-[#1b202c] border-[#383126] text-[#b0a597] hover:border-[#4b3e2b]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Ya, Hadir</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('tidak_hadir')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                      status === 'tidak_hadir'
                        ? 'bg-rose-950/40 border-rose-500 text-rose-300 ring-1 ring-rose-500/50'
                        : 'bg-[#1b202c] border-[#383126] text-[#b0a597] hover:border-[#4b3e2b]'
                    }`}
                  >
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Tidak Hadir</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('ragu')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                      status === 'ragu'
                        ? 'bg-amber-950/40 border-amber-500 text-amber-300 ring-1 ring-amber-500/50'
                        : 'bg-[#1b202c] border-[#383126] text-[#b0a597] hover:border-[#4b3e2b]'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>Masih Ragu</span>
                  </button>
                </div>
              </div>

              {/* Detail jika Hadir */}
              {status === 'hadir' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#1d222e] border border-[#3d3427]">
                  {/* Jumlah Tamu (Pax) */}
                  <div>
                    <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>Jumlah Orang (Pax)</span>
                    </label>
                    <select
                      value={pax}
                      onChange={(e) => setPax(Number(e.target.value))}
                      className="w-full bg-[#252b3b] border border-[#443828] rounded-xl px-3 py-2.5 text-sm text-[#f5f1ea] focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value={1}>1 Orang</option>
                      <option value={2}>2 Orang</option>
                      <option value={3}>3 Orang</option>
                      <option value={4}>4 Orang</option>
                      <option value={5}>5+ Orang (Keluarga)</option>
                    </select>
                  </div>

                  {/* Sesi Kehadiran */}
                  <div>
                    <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-2">
                      Sesi Acara
                    </label>
                    <select
                      value={session}
                      onChange={(e) => setSession(e.target.value as typeof session)}
                      className="w-full bg-[#252b3b] border border-[#443828] rounded-xl px-3 py-2.5 text-sm text-[#f5f1ea] focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="keduanya">Akad &amp; Resepsi (Keduanya)</option>
                      <option value="resepsi">Resepsi Saja (11:00 - 15:00)</option>
                      <option value="akad">Akad Nikah Saja (08:00 - 10:00)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Kolom Ucapan & Doa Restu */}
              <div>
                <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-2 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Ucapan &amp; Doa Restu</span>
                </label>
                <textarea
                  rows={3}
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="Tuliskan untaian doa dan ucapan selamat untuk kedua mempelai..."
                  className="w-full bg-[#1e2330] border border-[#3b3428] rounded-xl px-4 py-3 text-sm text-[#f5f1ea] placeholder-stone-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f0da98] to-[#c19b26] text-stone-950 font-bold text-sm tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-[0.99] transition-all"
              >
                <Send className="w-4 h-4 text-stone-950" />
                <span>Kirim Konfirmasi RSVP</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
