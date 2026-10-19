import React, { useState } from 'react';
import { Gift, CreditCard, Copy, Check, QrCode, MapPin } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/initialData';

export const GiftSection: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showQris, setShowQris] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleCopyAddress = () => {
    const full = `${WEDDING_CONFIG.giftAddress.recipient}\n${WEDDING_CONFIG.giftAddress.phone}\n${WEDDING_CONFIG.giftAddress.address}`;
    navigator.clipboard.writeText(full);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="hadiah" className="py-20 px-4 bg-gradient-to-b from-[#0d0e12] via-[#141722] to-[#0d0e12] relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-2">
            Tanda Kasih
          </p>
          <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-[#f5f1ea] font-medium tracking-wide">
            Amplop Digital &amp; Kado
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-[#9c9183] mt-3 max-w-md mx-auto">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, dapat melalui tautan berikut:
          </p>
        </div>

        {/* Bank Account Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {WEDDING_CONFIG.banks.map((bank, index) => {
            const isCopied = copiedAccount === bank.accountNumber;
            return (
              <div
                key={index}
                className={`relative rounded-2xl p-6 bg-gradient-to-br ${bank.color} border border-[#443828] shadow-2xl overflow-hidden flex flex-col justify-between`}
              >
                {/* Background decorative circles */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-cinzel font-bold text-lg tracking-wider text-[#ecd599]">
                      {bank.bankName}
                    </span>
                    <CreditCard className="w-5 h-5 text-[#ecd599]/70" />
                  </div>

                  <p className="text-[11px] text-stone-300 uppercase tracking-widest mb-1 font-cinzel">
                    Nomor Rekening
                  </p>
                  <p className="text-xl sm:text-2xl font-mono font-bold text-white tracking-widest mb-2">
                    {bank.accountNumber}
                  </p>
                  <p className="text-xs text-[#ecd599] font-medium">
                    a.n {bank.accountHolder}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleCopy(bank.accountNumber, bank.accountNumber)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-semibold text-[#ecd599] border border-[#ecd599]/30 transition"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">Nomor Rekening Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin Nomor Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* QRIS & Gift Delivery Address Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* QRIS Card */}
          <div className="bg-[#161922] border border-[#3b3327] rounded-2xl p-6 shadow-xl flex flex-col items-center text-center justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#1f2535] border border-[#d4af37]/40 flex items-center justify-center mb-3 text-[#ecd599] mx-auto">
                <QrCode className="w-6 h-6" />
              </div>
              <h4 className="font-serif-cormorant text-xl text-[#f5f1ea] font-semibold mb-1">
                Scan QRIS
              </h4>
              <p className="text-xs text-[#9d9283] mb-4">
                Dukungan transfer instan dari GoPay, OVO, Dana, ShopeePay, dan seluruh M-Banking.
              </p>
            </div>

            <button
              onClick={() => setShowQris(!showQris)}
              className="w-full py-2.5 rounded-xl bg-[#202534] hover:bg-[#2a3144] border border-[#433827] text-xs font-semibold text-[#ecd599] transition shadow-sm"
            >
              {showQris ? 'Sembunyikan QRIS' : 'Tampilkan Kode QRIS'}
            </button>
          </div>

          {/* Kirim Kado Fisik */}
          <div className="bg-[#161922] border border-[#3b3327] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#1f2535] border border-[#d4af37]/40 flex items-center justify-center text-[#ecd599] shrink-0">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif-cormorant text-lg text-[#f5f1ea] font-semibold">
                    Kirim Kado Fisik
                  </h4>
                  <span className="text-[10px] text-stone-500">Alamat Penerima</span>
                </div>
              </div>

              <div className="text-xs text-[#cdc3b3] space-y-1 bg-[#1a1e28] p-3 rounded-xl border border-[#2f281e] mb-4">
                <strong className="text-[#ecd599] block">{WEDDING_CONFIG.giftAddress.recipient}</strong>
                <p className="text-[11px] text-stone-400">{WEDDING_CONFIG.giftAddress.phone}</p>
                <p className="text-[11px] leading-relaxed">{WEDDING_CONFIG.giftAddress.address}</p>
              </div>
            </div>

            <button
              onClick={handleCopyAddress}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#202534] hover:bg-[#2a3144] border border-[#433827] text-xs font-semibold text-[#ecd599] transition"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Alamat Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Alamat Kirim</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* QRIS Modal / Expand View */}
        {showQris && (
          <div className="mt-6 p-6 rounded-2xl bg-[#171a24] border border-[#d4af37]/60 shadow-2xl text-center max-w-sm mx-auto animate-in fade-in zoom-in-95 duration-200">
            <h5 className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37] mb-3">
              QRIS Pembayaran Digital
            </h5>
            <div className="bg-white p-4 rounded-xl shadow-inner inline-block mb-3">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=00020101021126580014ID.LINKAJA.WWW01189360091800000000005204581253033605802ID5915RADITYA+KIRANA6007JAKARTA6304ABCD"
                alt="QRIS Wedding"
                className="w-48 h-48 mx-auto"
              />
            </div>
            <p className="text-xs text-stone-300 font-medium">NMID: ID102009281729</p>
            <p className="text-[11px] text-stone-400 mt-0.5">a.n Raditya &amp; Kirana Wedding</p>
          </div>
        )}
      </div>
    </section>
  );
};
