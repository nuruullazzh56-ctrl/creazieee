export interface Guest {
  id: string;
  name: string;
  category: 'Keluarga' | 'Sahabat' | 'Rekan Kerja' | 'VIP' | 'Umum';
  pax: number;
  status: 'hadir' | 'tidak_hadir' | 'ragu' | 'menunggu';
  session: 'akad' | 'resepsi' | 'keduanya';
  phone?: string;
  tableNumber?: string;
  wishes?: string;
  checkedIn: boolean;
  updatedAt: string;
}

export interface WishMessage {
  id: string;
  name: string;
  message: string;
  status: 'hadir' | 'tidak_hadir' | 'ragu';
  timestamp: string;
  likes: number;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: 'prewedding' | 'momen' | 'lamaran';
  caption: string;
  orientation?: 'landscape' | 'portrait';
}

export interface EventDetail {
  title: string;
  date: string;
  time: string;
  locationName: string;
  address: string;
  mapEmbedUrl: string;
  mapsDirectUrl: string;
  calendarEventUrl?: string;
  notes?: string;
}
