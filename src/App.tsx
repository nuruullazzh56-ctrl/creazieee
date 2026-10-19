/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { HeroSection } from './components/HeroSection';
import { QuoteSection } from './components/QuoteSection';
import { CoupleSection } from './components/CoupleSection';
import { CountdownSection } from './components/CountdownSection';
import { EventSection } from './components/EventSection';
import { StorySection } from './components/StorySection';
import { GallerySection } from './components/GallerySection';
import { RsvpSection } from './components/RsvpSection';
import { WishesSection } from './components/WishesSection';
import { GiftSection } from './components/GiftSection';
import { ShareSection } from './components/ShareSection';
import { FooterSection } from './components/FooterSection';
import { Navbar } from './components/Navbar';
import { AudioPlayerButton } from './components/AudioPlayerButton';
import { GuestManagementModal } from './components/GuestManagementModal';

import { Guest, WishMessage } from './types/wedding';
import { INITIAL_GUESTS, INITIAL_WISHES } from './data/initialData';

const STORAGE_GUESTS_KEY = 'wedding_guests_data_v1';
const STORAGE_WISHES_KEY = 'wedding_wishes_data_v1';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan Terhormat');
  const [isManagementOpen, setIsManagementOpen] = useState(false);

  // Load or initialize Guests state
  const [guests, setGuests] = useState<Guest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_GUESTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_GUESTS;
  });

  // Load or initialize Wishes state
  const [wishes, setWishes] = useState<WishMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_WISHES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_WISHES;
  });

  // Read URL query parameter "?to=..." on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to');
      if (toParam && toParam.trim()) {
        setGuestName(toParam.trim());
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_GUESTS_KEY, JSON.stringify(guests));
    } catch {
      // Ignore storage errors
    }
  }, [guests]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WISHES_KEY, JSON.stringify(wishes));
    } catch {
      // Ignore storage errors
    }
  }, [wishes]);

  // Handle RSVP Submission
  const handleRsvpSubmit = (guestData: Partial<Guest>, wishText: string) => {
    const existingIndex = guests.findIndex(
      (g) => g.name.toLowerCase() === (guestData.name || '').toLowerCase()
    );

    const now = new Date().toISOString();

    if (existingIndex !== -1) {
      // Update existing guest
      const updated = [...guests];
      updated[existingIndex] = {
        ...updated[existingIndex],
        ...guestData,
        updatedAt: now
      };
      setGuests(updated);
    } else {
      // Add new guest
      const newGuest: Guest = {
        id: `g-${Date.now()}`,
        name: guestData.name || guestName,
        category: 'Umum',
        pax: guestData.pax ?? 1,
        status: guestData.status ?? 'hadir',
        session: guestData.session ?? 'keduanya',
        phone: guestData.phone || '',
        wishes: wishText,
        checkedIn: false,
        updatedAt: now
      };
      setGuests([newGuest, ...guests]);
    }

    // Add to wishes list if provided
    if (wishText.trim()) {
      const newWish: WishMessage = {
        id: `w-${Date.now()}`,
        name: guestData.name || guestName,
        message: wishText.trim(),
        status: guestData.status as WishMessage['status'] || 'hadir',
        timestamp: 'Baru saja',
        likes: 1
      };
      setWishes([newWish, ...wishes]);
    }
  };

  // Add quick wish from guestbook
  const handleAddWish = (name: string, message: string) => {
    const newWish: WishMessage = {
      id: `w-${Date.now()}`,
      name,
      message,
      status: 'hadir',
      timestamp: 'Baru saja',
      likes: 1
    };
    setWishes([newWish, ...wishes]);
  };

  // Like a wish message
  const handleLikeWish = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  // Add guest from management dashboard
  const handleAddGuestFromDashboard = (newGuestData: Omit<Guest, 'id' | 'updatedAt'>) => {
    const newGuest: Guest = {
      ...newGuestData,
      id: `g-${Date.now()}`,
      updatedAt: new Date().toISOString()
    };
    setGuests([newGuest, ...guests]);
  };

  // Toggle check-in at reception
  const handleToggleCheckIn = (guestId: string) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, checkedIn: !g.checkedIn } : g))
    );
  };

  // Delete guest
  const handleDeleteGuest = (guestId: string) => {
    setGuests((prev) => prev.filter((g) => g.id !== guestId));
  };

  // Metrics for navbar badge
  const totalAttending = guests.filter((g) => g.status === 'hadir').length;

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e8e4dc] font-body selection:bg-[#c5a880]/30 selection:text-[#f8f5ee] relative">
      {/* Cover / Opening Envelope Screen */}
      {!isOpened && (
        <OpeningEnvelope
          guestName={guestName}
          onOpen={() => setIsOpened(true)}
          onUpdateGuestName={(newName) => setGuestName(newName)}
        />
      )}

      {/* Main Wedding Content */}
      <main className={`transition-opacity duration-700 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
        {/* Floating Audio Toggle */}
        <AudioPlayerButton />

        {/* Hero Section */}
        <HeroSection guestName={guestName} />

        {/* Ayat Suci & Wedding Quote */}
        <QuoteSection />

        {/* Groom & Bride Profiles */}
        <CoupleSection />

        {/* Event Schedule & Google Maps Location */}
        <EventSection />

        {/* Countdown Timer */}
        <CountdownSection />

        {/* Love Story Timeline */}
        <StorySection />

        {/* Interactive Photo Gallery with Lightbox */}
        <GallerySection />

        {/* RSVP Form */}
        <RsvpSection
          currentGuestName={guestName}
          onRsvpSubmit={handleRsvpSubmit}
        />

        {/* Digital Guestbook & Wishes */}
        <WishesSection
          wishes={wishes}
          onAddWish={handleAddWish}
          onLikeWish={handleLikeWish}
        />

        {/* Digital Cash Envelope & Gift */}
        <GiftSection />

        {/* Share Invitation Link & WhatsApp */}
        <ShareSection currentGuestName={guestName} />

        {/* Footer */}
        <FooterSection />

        {/* Mobile & Desktop Floating Bottom Dock Navbar */}
        <Navbar
          onOpenGuestManagement={() => setIsManagementOpen(true)}
          guestCount={guests.length}
          totalAttending={totalAttending}
        />

        {/* Real-Time Guest List Management Modal */}
        <GuestManagementModal
          isOpen={isManagementOpen}
          onClose={() => setIsManagementOpen(false)}
          guests={guests}
          onAddGuest={handleAddGuestFromDashboard}
          onToggleCheckIn={handleToggleCheckIn}
          onDeleteGuest={handleDeleteGuest}
        />
      </main>
    </div>
  );
}
