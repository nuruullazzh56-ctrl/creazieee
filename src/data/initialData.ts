import { Guest, WishMessage, GalleryPhoto } from '../types/wedding';

export const WEDDING_CONFIG = {
  groom: {
    fullName: "Raditya Pratama, S.T.",
    shortName: "Radit",
    father: "Bpk. Bambang Suwito",
    mother: "Ibu Hj. Endang Sulastri",
    childOrder: "Putra pertama",
    instagram: "@radityaprtm",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "Pria pekerja keras yang menemukan ketenangan dan rumah dalam senyum hangat Kirana."
  },
  bride: {
    fullName: "Kirana Larasati, S.Ds.",
    shortName: "Kirana",
    father: "Bpk. Ir. H. Hendra Gunawan",
    mother: "Ibu Dra. Hj. Maya Safitri",
    childOrder: "Putri kedua",
    instagram: "@kiranalrst",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Pencinta seni dan kehangatan keluarga yang siap melangkah bersama belahan jiwanya."
  },
  weddingDate: "2026-12-12T08:00:00+07:00",
  displayDate: "Sabtu, 12 Desember 2026",
  quote: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    translation: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu merasa tenang tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.",
    source: "QS. Ar-Rum: 21"
  },
  events: {
    akad: {
      title: "Akad Nikah",
      date: "Sabtu, 12 Desember 2026",
      time: "08:00 - 10:00 WIB",
      locationName: "Masjid Agung Al-Ikhlas",
      address: "Jl. Cipete III No. 10, Kebayoran Baru, Jakarta Selatan",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9926871038166!2d106.79720517503814!3d-6.264757693723788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1a26be4fbfb%3A0xe543eef6cbe4580b!2sMasjid%20Agung%20Al-Azhar!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
      mapsDirectUrl: "https://maps.google.com/?q=Masjid+Agung+Al-Azhar+Jakarta",
      notes: "Mohon kehadiran tepat waktu untuk kelancaran prosesi ijab kabul yang sakral."
    },
    resepsi: {
      title: "Resepsi Pernikahan",
      date: "Sabtu, 12 Desember 2026",
      time: "11:00 - 15:00 WIB",
      locationName: "Grand Ballroom The Heritage Palace",
      address: "Jl. Jend. Sudirman Kav. 52-53, Senayan, Jakarta Pusat",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.368735235896!2d106.8041926750376!3d-6.215003393772861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1505c2a0bfd%3A0x6b1cfb6a0ad99eef!2sThe%20Ritz-Carlton%20Jakarta%2C%20Pacific%20Place!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
      mapsDirectUrl: "https://maps.google.com/?q=The+Ritz+Carlton+Jakarta+Pacific+Place",
      notes: "Sesi ramah tamah, santap siang, dan perayaan bersama keluarga serta sahabat."
    }
  },
  dressCode: {
    title: "Dress Code Acara",
    description: "Kami menganjurkan para tamu mengenakan pakaian bernuansa warna berikut:",
    colors: [
      { name: "Champagne Gold", hex: "#D4AF37", border: "#f3e5ab" },
      { name: "Emerald Velvet", hex: "#1B4D3E", border: "#2E7D63" },
      { name: "Warm Terracotta", hex: "#C86D51", border: "#E08F76" },
      { name: "Navy & Black Tie", hex: "#1A2238", border: "#303F69" },
    ]
  },
  banks: [
    {
      bankName: "BCA",
      accountNumber: "8420194821",
      accountHolder: "RADITYA PRATAMA",
      logo: "BCA",
      color: "from-blue-900 to-indigo-950"
    },
    {
      bankName: "Bank Mandiri",
      accountNumber: "1370019283741",
      accountHolder: "KIRANA LARASATI",
      logo: "MANDIRI",
      color: "from-amber-800 to-stone-900"
    }
  ],
  giftAddress: {
    recipient: "Raditya & Kirana (Keluarga Bpk Hendra Gunawan)",
    phone: "+62 812-3456-7890",
    address: "Cluster Lavender No. 28, Bintaro Jaya Sektor 9, Pondok Aren, Tangerang Selatan 15229"
  }
};

export const INITIAL_STORIES = [
  {
    year: "2020",
    title: "Pertemuan Pertama",
    desc: "Bermula dari perjumpaan tidak sengaja di ruang perpustakaan kampus saat sama-sama mempersiapkan tugas akhir. Diskusi ringan tentang desain dan arsitektur berlanjut menjadi obrolan hangat setiap senja.",
    icon: "sparkles"
  },
  {
    year: "2022",
    title: "Menjalin Komitmen",
    desc: "Menyadari bahwa visi dan nilai hidup kami seirama, kami memutuskan untuk saling mendampingi, mendukung karir satu sama lain, dan melewati berbagai dinamika kehidupan bersama.",
    icon: "heart"
  },
  {
    year: "2025",
    title: "Momen Lamaran di Bromo",
    desc: "Berlatar matahari terbit di lautan pasir Bromo, Radit mengutarakan niat sucinya untuk melangkah ke pelaminan, yang disambut dengan haru dan senyum penuh bahagia oleh Kirana.",
    icon: "ring"
  },
  {
    year: "2026",
    title: "Menuju Mahligai Pernikahan",
    desc: "Dengan restu kedua orang tua dan sanak keluarga, kami siap mengikrarkan janji suci pernikahan untuk memulai babak terindah dalam kehidupan berumah tangga.",
    icon: "crown"
  }
];

export const INITIAL_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    title: "Tatapan Penuh Makna",
    category: "prewedding",
    caption: "Dalam setiap pandangan, kutemukan alasan untuk terus melangkah bersama.",
    orientation: "landscape"
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    title: "Kehangatan Tradisi",
    category: "prewedding",
    caption: "Menghormati akar budaya luhur Nusantara yang mempersatukan dua keluarga.",
    orientation: "portrait"
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    title: "Tawa di Bawah Mentari",
    category: "momen",
    caption: "Hari di mana semesta merestui setiap doa yang kami panjatkan perlahan.",
    orientation: "landscape"
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
    title: "Cincin Pengikat Janji",
    category: "lamaran",
    caption: "Simbol komitmen tulus yang akan kami jaga seumur hidup.",
    orientation: "portrait"
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
    title: "Langkah Pertama",
    category: "prewedding",
    caption: "Berjalan beriringan menapaki masa depan yang penuh harapan indah.",
    orientation: "landscape"
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80",
    title: "Senyum Bahagia Keluarga",
    category: "lamaran",
    caption: "Pelukan restu dari orang tua tercinta yang tiada tara nilainya.",
    orientation: "portrait"
  }
];

export const INITIAL_GUESTS: Guest[] = [
  {
    id: "g-01",
    name: "Dr. H. Ahmad Fauzi & Keluarga",
    category: "VIP",
    pax: 2,
    status: "hadir",
    session: "keduanya",
    phone: "681288991122",
    tableNumber: "VIP-01",
    wishes: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru!",
    checkedIn: true,
    updatedAt: "2026-10-18T10:15:00Z"
  },
  {
    id: "g-02",
    name: "Dimas Anggara & Partner",
    category: "Sahabat",
    pax: 2,
    status: "hadir",
    session: "resepsi",
    phone: "681312345678",
    tableNumber: "T-04",
    wishes: "Akhirnya bro Radit sold out! Selamat ya kalian berdua, langgeng sampai kakek nenek!",
    checkedIn: false,
    updatedAt: "2026-10-18T11:20:00Z"
  },
  {
    id: "g-03",
    name: "Siti Rahmawati, M.Sc.",
    category: "Rekan Kerja",
    pax: 1,
    status: "hadir",
    session: "resepsi",
    phone: "681555667788",
    tableNumber: "T-07",
    wishes: "Selamat Kirana dan Raditya! Semoga selalu dilimpahi sakinah, mawaddah, wa rahmah.",
    checkedIn: false,
    updatedAt: "2026-10-18T12:05:00Z"
  },
  {
    id: "g-04",
    name: "Keluarga Besar Bpk. H. Sukardi",
    category: "Keluarga",
    pax: 4,
    status: "hadir",
    session: "keduanya",
    phone: "681722334455",
    tableNumber: "K-02",
    wishes: "Doa terbaik dari keluarga Yogya. Semoga lancar sampai hari H!",
    checkedIn: false,
    updatedAt: "2026-10-18T13:40:00Z"
  },
  {
    id: "g-05",
    name: "Andi Wijaya & Istri",
    category: "Rekan Kerja",
    pax: 2,
    status: "ragu",
    session: "resepsi",
    phone: "681899001122",
    tableNumber: "T-08",
    wishes: "Semoga dilancarkan acaranya bro! Kami usahakan hadir setelah dinas luar kota.",
    checkedIn: false,
    updatedAt: "2026-10-18T14:10:00Z"
  },
  {
    id: "g-06",
    name: "Bayu Pratama",
    category: "Sahabat",
    pax: 0,
    status: "tidak_hadir",
    session: "resepsi",
    phone: "681944556677",
    tableNumber: "-",
    wishes: "Mohon maaf sekali Radit & Kirana, bertepatan dengan tugas lapangan di Papua. Doa tulus selalu menyertai!",
    checkedIn: false,
    updatedAt: "2026-10-18T15:00:00Z"
  },
  {
    id: "g-07",
    name: "Anisa Putri Lestari",
    category: "Sahabat",
    pax: 1,
    status: "menunggu",
    session: "resepsi",
    phone: "681233445566",
    tableNumber: "T-05",
    checkedIn: false,
    updatedAt: "2026-10-18T16:00:00Z"
  }
];

export const INITIAL_WISHES: WishMessage[] = [
  {
    id: "w-01",
    name: "Dr. H. Ahmad Fauzi & Keluarga",
    message: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khoir. Semoga Allah SWT senantiasa meridhoi pernikahan ananda berdua hingga akhir hayat.",
    status: "hadir",
    timestamp: "10 menit yang lalu",
    likes: 12
  },
  {
    id: "w-02",
    name: "Dimas Anggara",
    message: "Selamat ya bro Raditya & Kirana! Bahagia banget lihat kalian akhirnya berlabuh di pelaminan. Doa terbaik untuk petualangan baru kalian berdua!",
    status: "hadir",
    timestamp: "35 menit yang lalu",
    likes: 8
  },
  {
    id: "w-03",
    name: "Siti Rahmawati, M.Sc.",
    message: "Happy Wedding Kirana cantik & Radit! Semoga pernikahannya senantiasa dipenuhi cinta kasih, rezeki melimpah, dan keturunan yang sholeh/sholehah.",
    status: "hadir",
    timestamp: "1 jam yang lalu",
    likes: 5
  },
  {
    id: "w-04",
    name: "Bayu Pratama",
    message: "Selamat menempuh hidup baru sahabatku! Mohon maaf belum bisa hadir langsung, tapi doa terbaik dan kado spesial sudah meluncur!",
    status: "tidak_hadir",
    timestamp: "2 jam yang lalu",
    likes: 4
  }
];
