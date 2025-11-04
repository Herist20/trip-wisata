import { Search, Package, Image, ShoppingCart, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EmptyGallery({ searchQuery, onReset }) {
  return (
    <div className="text-center py-20 animate-fade-in-up">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
        <Image className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">
        {searchQuery ? 'Tidak ada foto ditemukan' : 'Galeri kosong'}
      </h3>
      <p className="text-text-light mb-6 max-w-md mx-auto">
        {searchQuery
          ? `Tidak menemukan hasil untuk "${searchQuery}". Coba ubah kata kunci pencarian Anda.`
          : 'Belum ada foto di kategori ini. Silakan pilih kategori lain.'}
      </p>
      {searchQuery && onReset && (
        <button
          onClick={onReset}
          className="btn-primary btn-animate inline-flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          Reset Pencarian
        </button>
      )}
    </div>
  );
}

export function EmptyTours({ filters, onReset }) {
  return (
    <div className="text-center py-20 animate-fade-in-up">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
        <Package className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">
        Tidak ada tour yang sesuai
      </h3>
      <p className="text-text-light mb-6 max-w-md mx-auto">
        Tidak menemukan paket tour yang sesuai dengan filter Anda. Coba ubah
        kriteria pencarian atau hapus beberapa filter.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {onReset && (
          <button
            onClick={onReset}
            className="btn-outline btn-animate inline-flex items-center gap-2"
          >
            Reset Filter
          </button>
        )}
        <Link
          to="/tours"
          className="btn-primary btn-animate inline-flex items-center gap-2"
        >
          <Package className="w-5 h-5" />
          Lihat Semua Tour
        </Link>
      </div>
    </div>
  );
}

export function EmptyBooking() {
  return (
    <div className="text-center py-20 animate-fade-in-up">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
        <ShoppingCart className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">
        Belum ada tour dipilih
      </h3>
      <p className="text-text-light mb-6 max-w-md mx-auto">
        Pilih paket tour favorit Anda untuk memulai proses booking dan
        petualangan yang tak terlupakan!
      </p>
      <Link
        to="/tours"
        className="btn-primary btn-animate inline-flex items-center gap-2"
      >
        <Package className="w-5 h-5" />
        Jelajahi Paket Tour
      </Link>
    </div>
  );
}

export function EmptySearch({ query }) {
  return (
    <div className="text-center py-20 animate-fade-in-up">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
        <Search className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">
        Tidak ada hasil untuk &quot;{query}&quot;
      </h3>
      <p className="text-text-light mb-6 max-w-md mx-auto">
        Coba gunakan kata kunci yang berbeda atau lebih umum
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-text-light">Saran pencarian:</span>
        <button className="px-4 py-1 bg-gray-100 text-secondary rounded-full text-sm hover:bg-gray-200 transition-colors">
          Bali
        </button>
        <button className="px-4 py-1 bg-gray-100 text-secondary rounded-full text-sm hover:bg-gray-200 transition-colors">
          Pantai
        </button>
        <button className="px-4 py-1 bg-gray-100 text-secondary rounded-full text-sm hover:bg-gray-200 transition-colors">
          Gunung
        </button>
      </div>
    </div>
  );
}

export function NetworkError({ onRetry }) {
  return (
    <div className="text-center py-20 animate-fade-in-up">
      <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
        <AlertCircle className="w-16 h-16 text-red-500" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">
        Koneksi Terputus
      </h3>
      <p className="text-text-light mb-6 max-w-md mx-auto">
        Terjadi kesalahan saat memuat data. Pastikan koneksi internet Anda
        stabil.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary btn-animate inline-flex items-center gap-2"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}

export default {
  EmptyGallery,
  EmptyTours,
  EmptyBooking,
  EmptySearch,
  NetworkError,
};
