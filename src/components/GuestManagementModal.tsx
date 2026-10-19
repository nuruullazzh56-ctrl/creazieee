import React, { useState } from 'react';
import {
  X,
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Search,
  Plus,
  Download,
  MessageCircle,
  QrCode,
  Trash2,
  Check,
  UserCheck,
  Filter,
  Share2
} from 'lucide-react';
import { Guest } from '../types/wedding';
import { WEDDING_CONFIG } from '../data/initialData';

interface GuestManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  guests: Guest[];
  onAddGuest: (newGuest: Omit<Guest, 'id' | 'updatedAt'>) => void;
  onToggleCheckIn: (guestId: string) => void;
  onDeleteGuest: (guestId: string) => void;
}

export const GuestManagementModal: React.FC<GuestManagementModalProps> = ({
  isOpen,
  onClose,
  guests,
  onAddGuest,
  onToggleCheckIn,
  onDeleteGuest
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // New guest form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Guest['category']>('Sahabat');
  const [formPhone, setFormPhone] = useState('');
  const [formPax, setFormPax] = useState(2);
  const [formTable, setFormTable] = useState('T-01');

  if (!isOpen) return null;

  // Real-time calculation metrics
  const totalGuests = guests.length;
  const attendingGuests = guests.filter((g) => g.status === 'hadir');
  const totalPaxAttending = attendingGuests.reduce((acc, curr) => acc + (curr.pax || 1), 0);
  const declinedGuests = guests.filter((g) => g.status === 'tidak_hadir').length;
  const pendingGuests = guests.filter((g) => g.status === 'menunggu' || g.status === 'ragu').length;
  const checkedInGuests = guests.filter((g) => g.checkedIn).length;

  // Filtered list
  const filteredGuests = guests.filter((g) => {
    const matchSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      (g.tableNumber && g.tableNumber.toLowerCase().includes(search.toLowerCase())) ||
      (g.phone && g.phone.includes(search));

    const matchStatus =
      statusFilter === 'all' ? true : g.status === statusFilter;

    const matchCategory =
      categoryFilter === 'all' ? true : g.category === categoryFilter;

    return matchSearch && matchStatus && matchCategory;
  });

  const handleCreateGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    onAddGuest({
      name: formName.trim(),
      category: formCategory,
      pax: formPax,
      status: 'menunggu',
      session: 'keduanya',
      phone: formPhone.trim(),
      tableNumber: formTable.trim(),
      checkedIn: false
    });

    setFormName('');
    setFormPhone('');
    setShowAddForm(false);
  };

  const exportToCSV = () => {
    const headers = ['Nama Tamu', 'Kategori', 'Status RSVP', 'Jumlah Orang (Pax)', 'Sesi', 'Meja', 'No WhatsApp', 'Sudah Check In', 'Pesan Doa'];
    const rows = guests.map((g) => [
      `"${g.name}"`,
      `"${g.category}"`,
      `"${g.status}"`,
      g.pax,
      `"${g.session}"`,
      `"${g.tableNumber || '-'}"`,
      `"${g.phone || '-'}"`,
      g.checkedIn ? 'Sudah' : 'Belum',
      `"${(g.wishes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `daftar_tamu_rsvp_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openWhatsAppInvite = (guest: Guest) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    const personalUrl = `${baseUrl}?to=${encodeURIComponent(guest.name)}`;
    const msg = `Halo ${guest.name},\n\nKami mengundang Anda ke pernikahan kami (${WEDDING_CONFIG.groom.shortName} & ${WEDDING_CONFIG.bride.shortName}) pada ${WEDDING_CONFIG.displayDate}.\n\nBuka undangan resmi & RSVP Anda di sini:\n${personalUrl}\n\nTerima kasih!`;
    const targetPhone = guest.phone ? guest.phone.replace(/[^0-9]/g, '') : '';
    const waUrl = targetPhone
      ? `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(msg)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#13161f] border border-[#3f3525] rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-[#2d271f] flex items-center justify-between bg-[#161a26]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#ecd599]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-cormorant text-2xl font-bold text-[#f5f1ea] leading-tight">
                Sistem Manajemen Tamu &amp; RSVP
              </h3>
              <p className="text-xs text-stone-400">
                Pantau konfirmasi kehadiran real-time &amp; kelola meja resepsi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#222838] hover:bg-[#2c3348] border border-[#443828] text-xs font-semibold text-[#ecd599] transition"
              title="Unduh file Excel / CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1f222d] text-stone-400 hover:text-white transition"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-time Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 sm:p-6 bg-[#0f1118] border-b border-[#262017]">
          {/* Total Tamu */}
          <div className="bg-[#171b26] p-3.5 rounded-xl border border-[#30291f]">
            <span className="text-[10px] font-cinzel uppercase text-stone-400 tracking-wider block">
              Total Undangan
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-white">{totalGuests}</span>
              <span className="text-xs text-stone-400">Kontak</span>
            </div>
          </div>

          {/* Konfirmasi Hadir */}
          <div className="bg-[#102419] p-3.5 rounded-xl border border-emerald-900/60">
            <span className="text-[10px] font-cinzel uppercase text-emerald-400 tracking-wider block">
              Konfirmasi Hadir
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-emerald-300">{attendingGuests.length}</span>
              <span className="text-xs text-emerald-400/80">({totalPaxAttending} Jiwa)</span>
            </div>
          </div>

          {/* Tidak Hadir */}
          <div className="bg-[#261317] p-3.5 rounded-xl border border-rose-900/60">
            <span className="text-[10px] font-cinzel uppercase text-rose-400 tracking-wider block">
              Berhalangan
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-rose-300">{declinedGuests}</span>
              <span className="text-xs text-rose-400/80">Tamu</span>
            </div>
          </div>

          {/* Belum Respon */}
          <div className="bg-[#261f10] p-3.5 rounded-xl border border-amber-900/60">
            <span className="text-[10px] font-cinzel uppercase text-amber-400 tracking-wider block">
              Belum Respon
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-amber-300">{pendingGuests}</span>
              <span className="text-xs text-amber-400/80">Tamu</span>
            </div>
          </div>

          {/* Check-In di Tempat */}
          <div className="col-span-2 sm:col-span-1 bg-[#151c2c] p-3.5 rounded-xl border border-sky-900/60">
            <span className="text-[10px] font-cinzel uppercase text-sky-400 tracking-wider block">
              Check-In Resepsi
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-sky-300">{checkedInGuests}</span>
              <span className="text-xs text-sky-400/80">Hadir</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="p-4 sm:p-6 space-y-4 flex-1 overflow-y-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama tamu, nomor meja (T-04), atau no HP..."
                className="w-full bg-[#181c27] border border-[#3b3327] rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-[#f5f1ea] placeholder-stone-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Filter by Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#181c27] border border-[#3b3327] rounded-xl px-3 py-2 text-xs text-[#ecd599] focus:outline-none"
            >
              <option value="all">Semua Status RSVP</option>
              <option value="hadir">Hadir ({attendingGuests.length})</option>
              <option value="tidak_hadir">Berhalangan ({declinedGuests})</option>
              <option value="ragu">Masih Ragu</option>
              <option value="menunggu">Menunggu Konfirmasi</option>
            </select>

            {/* Filter by Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#181c27] border border-[#3b3327] rounded-xl px-3 py-2 text-xs text-[#ecd599] focus:outline-none"
            >
              <option value="all">Semua Kategori</option>
              <option value="VIP">VIP</option>
              <option value="Keluarga">Keluarga</option>
              <option value="Sahabat">Sahabat</option>
              <option value="Rekan Kerja">Rekan Kerja</option>
            </select>

            {/* Add Guest Button */}
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ba9325] text-stone-950 font-bold text-xs shadow-md hover:brightness-110 transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Tamu</span>
            </button>
          </div>

          {/* Add Guest Form (Collapsible) */}
          {showAddForm && (
            <form onSubmit={handleCreateGuest} className="p-4 sm:p-5 rounded-2xl bg-[#1a1f2c] border border-[#d4af37]/40 shadow-xl space-y-4 animate-in fade-in">
              <h4 className="text-xs font-cinzel uppercase text-[#ecd599] tracking-wider font-semibold">
                Tambah Daftar Tamu Undangan Baru
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Nama Tamu & Gelar"
                    className="w-full bg-[#12141c] border border-[#3b3328] rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Guest['category'])}
                    className="w-full bg-[#12141c] border border-[#3b3328] rounded-lg px-3 py-1.5 text-xs text-white"
                  >
                    <option value="VIP">VIP</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="Sahabat">Sahabat</option>
                    <option value="Rekan Kerja">Rekan Kerja</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">No. WhatsApp</label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="628123456789"
                    className="w-full bg-[#12141c] border border-[#3b3328] rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">Estimasi Pax (Orang)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formPax}
                    onChange={(e) => setFormPax(Number(e.target.value))}
                    className="w-full bg-[#12141c] border border-[#3b3328] rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">Nomor Meja</label>
                  <input
                    type="text"
                    value={formTable}
                    onChange={(e) => setFormTable(e.target.value)}
                    placeholder="Contoh: VIP-01 / T-05"
                    className="w-full bg-[#12141c] border border-[#3b3328] rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#252a39] text-xs text-stone-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#d4af37] text-stone-950 font-bold text-xs hover:bg-[#e6c14f]"
                >
                  Simpan Tamu
                </button>
              </div>
            </form>
          )}

          {/* Guests Table */}
          <div className="border border-[#2f281e] rounded-2xl overflow-hidden bg-[#151822]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1a1e2a] text-[#ecd599] font-cinzel text-[10px] uppercase tracking-wider border-b border-[#2d271f]">
                  <tr>
                    <th className="py-3 px-4">Nama Tamu</th>
                    <th className="py-3 px-3">Kategori</th>
                    <th className="py-3 px-3">Status RSVP</th>
                    <th className="py-3 px-3 text-center">Pax</th>
                    <th className="py-3 px-3 text-center">Meja</th>
                    <th className="py-3 px-3 text-center">Check-In</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262118]">
                  {filteredGuests.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-stone-400">
                        Tidak ada tamu yang sesuai kriteria pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredGuests.map((guest) => (
                      <tr key={guest.id} className="hover:bg-[#1c2130] transition-colors">
                        {/* Nama */}
                        <td className="py-3 px-4">
                          <strong className="text-white block font-medium">{guest.name}</strong>
                          {guest.phone && (
                            <span className="text-[10px] text-stone-400">{guest.phone}</span>
                          )}
                        </td>

                        {/* Kategori */}
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#202534] border border-[#3b3428] text-[10px] text-[#ecd599]">
                            {guest.category}
                          </span>
                        </td>

                        {/* Status RSVP */}
                        <td className="py-3 px-3">
                          {guest.status === 'hadir' && (
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Hadir
                            </span>
                          )}
                          {guest.status === 'tidak_hadir' && (
                            <span className="inline-flex items-center gap-1 text-rose-400 font-medium">
                              <XCircle className="w-3.5 h-3.5" /> Berhalangan
                            </span>
                          )}
                          {guest.status === 'ragu' && (
                            <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                              <HelpCircle className="w-3.5 h-3.5" /> Ragu
                            </span>
                          )}
                          {guest.status === 'menunggu' && (
                            <span className="inline-flex items-center gap-1 text-stone-400 font-medium">
                              <Clock className="w-3.5 h-3.5" /> Menunggu
                            </span>
                          )}
                        </td>

                        {/* Pax */}
                        <td className="py-3 px-3 text-center font-bold text-stone-200">
                          {guest.status === 'tidak_hadir' ? 0 : guest.pax}
                        </td>

                        {/* Meja */}
                        <td className="py-3 px-3 text-center">
                          <span className="px-1.5 py-0.5 rounded bg-[#1f2433] text-[11px] font-mono text-stone-300">
                            {guest.tableNumber || '-'}
                          </span>
                        </td>

                        {/* Check-In Toggle */}
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => onToggleCheckIn(guest.id)}
                            className={`p-1.5 rounded-lg border transition ${
                              guest.checkedIn
                                ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                                : 'bg-[#1b202c] border-stone-700 text-stone-500 hover:text-stone-300'
                            }`}
                            title={guest.checkedIn ? 'Batalkan Check-In' : 'Tandai Sudah Hadir di Resepsi'}
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openWhatsAppInvite(guest)}
                              className="p-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/70 text-emerald-300 border border-emerald-800/40 transition"
                              title="Kirim Undangan WhatsApp Khusus Tamu Ini"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => onDeleteGuest(guest.id)}
                              className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-900/30 transition"
                              title="Hapus Tamu"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
