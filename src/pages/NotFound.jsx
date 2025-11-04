import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Compass } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function NotFound() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="mb-8" data-aos="zoom-in">
          <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-secondary leading-none animate-fade-in">
            404
          </h1>
        </div>

        {/* Compass Icon */}
        <div className="mb-8" data-aos="fade-up" data-aos-delay="200">
          <div className="inline-block">
            <div className="w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center animate-bounce">
              <Compass className="w-16 h-16 text-secondary animate-rotate" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="mb-8" data-aos="fade-up" data-aos-delay="400">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Oops! Halaman Tidak Ditemukan
          </h2>
          <p className="text-lg text-text-light mb-2">
            Sepertinya Anda tersesat dalam petualangan...
          </p>
          <p className="text-text-light">
            Halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <Link
            to="/"
            className="btn-primary btn-animate inline-flex items-center justify-center gap-2 hover-lift"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-outline btn-animate inline-flex items-center justify-center gap-2 hover-lift"
          >
            <ArrowLeft className="w-5 h-5" />
            Halaman Sebelumnya
          </button>
        </div>

        {/* Helpful Links */}
        <div
          className="mt-12 p-6 bg-white rounded-2xl shadow-lg"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <p className="text-sm font-semibold text-secondary mb-4">
            Mungkin Anda mencari halaman ini?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/tours"
              className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-secondary text-text rounded-lg transition-all hover-scale"
            >
              Paket Tour
            </Link>
            <Link
              to="/gallery"
              className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-secondary text-text rounded-lg transition-all hover-scale"
            >
              Galeri
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-secondary text-text rounded-lg transition-all hover-scale"
            >
              Tentang Kami
            </Link>
            <Link
              to="/booking"
              className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-secondary text-text rounded-lg transition-all hover-scale"
            >
              Booking
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
}

export default NotFound;
