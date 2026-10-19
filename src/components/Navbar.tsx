import React from 'react';
import { Home, Users, Calendar, Image as ImageIcon, CheckCircle, MessageSquareHeart, Gift, Users2, Share2 } from 'lucide-react';

interface NavbarProps {
  onOpenGuestManagement: () => void;
  guestCount: number;
  totalAttending: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGuestManagement,
  guestCount,
  totalAttending
}) => {
  const navItems = [
    { label: 'Beranda', href: '#beranda', icon: Home },
    { label: 'Mempelai', href: '#mempelai', icon: Users },
    { label: 'Acara', href: '#acara', icon: Calendar },
    { label: 'Galeri', href: '#galeri', icon: ImageIcon },
    { label: 'RSVP', href: '#rsvp', icon: CheckCircle },
    { label: 'Ucapan', href: '#ucapan', icon: MessageSquareHeart },
    { label: 'Hadiah', href: '#hadiah', icon: Gift },
    { label: 'Bagikan', href: '#bagikan', icon: Share2 },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-3 inset-x-0 z-40 flex items-center justify-center px-3 pointer-events-none">
      <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-[#14161d]/90 backdrop-blur-xl border border-[#3b3327] rounded-full shadow-2xl pointer-events-auto max-w-full overflow-x-auto no-scrollbar ring-1 ring-amber-500/20">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="flex flex-col items-center justify-center p-2 sm:px-3 sm:py-2 text-[#a89d8f] hover:text-[#ecd599] hover:bg-[#222633]/80 rounded-full transition-all duration-200 group relative"
              title={item.label}
            >
              <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] sm:text-[10px] font-medium tracking-tight mt-0.5 whitespace-nowrap hidden sm:inline-block">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Guest Management / Organizer Dashboard Button */}
        <div className="h-5 w-[1px] bg-[#3b3327] mx-1" />
        <button
          onClick={onOpenGuestManagement}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 bg-gradient-to-r from-amber-600/30 to-amber-500/20 hover:from-amber-600/50 hover:to-amber-500/40 text-[#ecd599] border border-amber-500/40 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide transition-all shadow-sm"
          title="Manajemen Daftar Tamu & RSVP Real-time"
        >
          <Users2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e6c875]" />
          <span className="whitespace-nowrap flex items-center gap-1">
            <span>Daftar Tamu</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/30 text-[9px] text-amber-200 font-bold border border-amber-400/30">
              {totalAttending}/{guestCount}
            </span>
          </span>
        </button>
      </div>
    </nav>
  );
};
