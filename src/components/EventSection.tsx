import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ExternalLink, Navigation, Sparkles, Shirt } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/initialData';

export const EventSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resepsi' | 'akad'>('resepsi');

  const currentEvent = WEDDING_CONFIG.events[activeTab];

  return (
    <section id="acara" className="py-20 px-4 bg-[#0d0e12] relative overflow-hidden">
      {/* Decorative background light */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-rose-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-2">
            Rangkaian Acara &amp; Lokasi
          </p>
          <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-[#f5f1ea] font-medium tracking-wide">
            Waktu &amp; Tempat Pelaksanaan
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-[#9c9183] mt-3 max-w-md mx-auto">
            Merupakan kehormatan bagi kami atas kehadiran dan doa restu Bapak/Ibu/Saudara/i pada momen istimewa ini.
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* Card: Akad Nikah */}
          <div
            onClick={() => setActiveTab('akad')}
            className={`cursor-pointer rounded-2xl p-6 sm:p-7 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              activeTab === 'akad'
                ? 'bg-[#181c27] border-[#d4af37] shadow-xl shadow-amber-950/20 ring-1 ring-[#d4af37]/40'
                : 'bg-[#13151d] border-[#2f281e] hover:border-[#4b3e2b] opacity-90'
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#d4af37]/10 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-cinzel text-xs tracking-widest uppercase text-[#d4af37] px-3 py-1 rounded-full bg-[#202534] border border-[#3f3525]">
                  Prosesi Sakral
                </span>
                {activeTab === 'akad' && (
                  <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                    <Sparkles className="w-3 h-3" /> Peta Aktif
                  </span>
                )}
              </div>

              <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-[#f5f1ea] font-semibold mb-3">
                {WEDDING_CONFIG.events.akad.title}
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm text-[#ccc4b6] mb-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>{WEDDING_CONFIG.events.akad.date}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>{WEDDING_CONFIG.events.akad.time}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f0ebd9] block">{WEDDING_CONFIG.events.akad.locationName}</strong>
                    <span className="text-[#968b7c] text-xs">{WEDDING_CONFIG.events.akad.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#8c8172] italic border-t border-[#2d271f] pt-3 mt-2">
              {WEDDING_CONFIG.events.akad.notes}
            </p>
          </div>

          {/* Card: Resepsi Pernikahan */}
          <div
            onClick={() => setActiveTab('resepsi')}
            className={`cursor-pointer rounded-2xl p-6 sm:p-7 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              activeTab === 'resepsi'
                ? 'bg-[#181c27] border-[#d4af37] shadow-xl shadow-amber-950/20 ring-1 ring-[#d4af37]/40'
                : 'bg-[#13151d] border-[#2f281e] hover:border-[#4b3e2b] opacity-90'
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#d4af37]/10 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-cinzel text-xs tracking-widest uppercase text-[#d4af37] px-3 py-1 rounded-full bg-[#202534] border border-[#3f3525]">
                  Perayaan Resepsi
                </span>
                {activeTab === 'resepsi' && (
                  <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                    <Sparkles className="w-3 h-3" /> Peta Aktif
                  </span>
                )}
              </div>

              <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-[#f5f1ea] font-semibold mb-3">
                {WEDDING_CONFIG.events.resepsi.title}
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm text-[#ccc4b6] mb-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>{WEDDING_CONFIG.events.resepsi.date}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>{WEDDING_CONFIG.events.resepsi.time}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f0ebd9] block">{WEDDING_CONFIG.events.resepsi.locationName}</strong>
                    <span className="text-[#968b7c] text-xs">{WEDDING_CONFIG.events.resepsi.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#8c8172] italic border-t border-[#2d271f] pt-3 mt-2">
              {WEDDING_CONFIG.events.resepsi.notes}
            </p>
          </div>
        </div>

        {/* Interactive Location Map Box */}
        <div className="bg-[#151720] border border-[#3d3326] rounded-2xl overflow-hidden shadow-2xl p-5 sm:p-6 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#d4af37] block">
                Peta Lokasi ({currentEvent.title})
              </span>
              <h4 className="text-base sm:text-lg font-semibold text-[#f5f1ea]">
                {currentEvent.locationName}
              </h4>
            </div>

            <a
              href={currentEvent.mapsDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ba9325] text-stone-950 font-semibold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Petunjuk Arah Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Google Maps Container */}
          <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-[#3b3225]">
            <iframe
              title={`Peta Lokasi ${currentEvent.title}`}
              src={currentEvent.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay hint */}
            <div className="absolute bottom-3 left-3 bg-[#11131a]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#3d3326] text-[11px] text-[#e0d6c5] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{currentEvent.address}</span>
            </div>
          </div>
        </div>

        {/* Dress Code Section */}
        <div className="bg-gradient-to-br from-[#161822] to-[#12141a] border border-[#382f23] rounded-2xl p-6 text-center max-w-xl mx-auto shadow-lg">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#202534] border border-[#d4af37]/40 mb-3 text-[#ecd599]">
            <Shirt className="w-5 h-5" />
          </div>
          <h4 className="font-serif-cormorant text-xl sm:text-2xl text-[#f5f1ea] font-semibold mb-1">
            {WEDDING_CONFIG.dressCode.title}
          </h4>
          <p className="text-xs text-[#9d9283] mb-5">
            {WEDDING_CONFIG.dressCode.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {WEDDING_CONFIG.dressCode.colors.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-10 h-10 rounded-full border-2 shadow-md transition-transform hover:scale-110"
                  style={{ backgroundColor: c.hex, borderColor: c.border }}
                />
                <span className="text-[11px] text-[#c9bfae] font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
