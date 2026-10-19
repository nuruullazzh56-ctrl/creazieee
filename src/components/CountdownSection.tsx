import React, { useState, useEffect } from 'react';
import { CalendarPlus, Clock, Bell } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/initialData';

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const target = new Date(WEDDING_CONFIG.weddingDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToGoogleCalendar = () => {
    // 20261212T010000Z to 20261212T080000Z (UTC for 08:00 - 15:00 WIB)
    const title = encodeURIComponent(`Pernikahan ${WEDDING_CONFIG.groom.shortName} & ${WEDDING_CONFIG.bride.shortName}`);
    const details = encodeURIComponent(
      `Pernikahan Suci ${WEDDING_CONFIG.groom.fullName} & ${WEDDING_CONFIG.bride.fullName}.\nAkad: 08:00 WIB di Masjid Agung Al-Ikhlas\nResepsi: 11:00 WIB di Grand Ballroom The Heritage Palace.`
    );
    const location = encodeURIComponent(`${WEDDING_CONFIG.events.resepsi.locationName}, ${WEDDING_CONFIG.events.resepsi.address}`);
    const dates = "20261212T010000Z/20261212T080000Z";

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gcalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mahligai Cinta//ID',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:Pernikahan ' + WEDDING_CONFIG.groom.shortName + ' & ' + WEDDING_CONFIG.bride.shortName,
      'DESCRIPTION:Pernikahan Suci ' + WEDDING_CONFIG.groom.fullName + ' & ' + WEDDING_CONFIG.bride.fullName,
      'LOCATION:' + WEDDING_CONFIG.events.resepsi.locationName + ', ' + WEDDING_CONFIG.events.resepsi.address,
      'DTSTART:20261212T010000Z',
      'DTEND:20261212T080000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Wedding-${WEDDING_CONFIG.groom.shortName}-${WEDDING_CONFIG.bride.shortName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#0d0e12] via-[#12151d] to-[#0d0e12]">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c202c] border border-[#3d3326] text-xs font-cinzel text-[#d4af37] uppercase tracking-widest mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>Menghitung Hari Bahagia</span>
        </div>

        <h2 className="font-serif-cormorant text-3xl sm:text-4xl text-[#f5f1ea] font-medium tracking-wide mb-2">
          Hitung Mundur Waktu Acara
        </h2>
        <p className="text-xs sm:text-sm text-[#9c9183] max-w-md mx-auto mb-8">
          Setiap detik terasa begitu berharga menuju saat kami mengikrarkan janji sehidup semati.
        </p>

        {/* Countdown Timer Boxes */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg mx-auto mb-8">
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#181c26]/90 border border-[#3e3427] rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl flex flex-col items-center justify-center backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="font-cinzel text-2xl sm:text-4xl font-bold text-[#ecd599] tracking-wider">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs uppercase tracking-widest text-[#9e9282] mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Reminder Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleAddToGoogleCalendar}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ba9325] text-stone-950 font-semibold text-xs sm:text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Simpan ke Google Calendar</span>
          </button>

          <button
            onClick={handleDownloadIcs}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1b1f2a] border border-[#443828] text-[#ecd599] font-medium text-xs sm:text-sm hover:bg-[#252a38] active:scale-95 transition-all"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Download Kalender (iCal)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
