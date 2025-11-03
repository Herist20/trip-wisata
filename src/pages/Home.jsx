import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, ArrowRight } from 'lucide-react';
import { tourPackages, testimonials, features } from '../data/mockData';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-secondary-light to-primary">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center text-white px-4" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Jelajahi Indonesia Bersama Kami
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Temukan pengalaman wisata terbaik dengan harga terjangkau dan pelayanan premium
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/tours" className="btn-primary">
              Lihat Paket Tour
            </Link>
            <Link to="/about" className="btn-outline bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white">
              Tentang Kami
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-container bg-gray-50">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="heading-secondary">Mengapa Memilih Kami?</h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Kami memberikan layanan terbaik untuk pengalaman wisata yang tak terlupakan
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary text-2xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">{feature.title}</h3>
              <p className="text-text-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Tours Section */}
      <section className="section-container">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="heading-secondary">Paket Tour Populer</h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Pilihan destinasi favorit wisatawan dengan rating terbaik
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourPackages.slice(0, 6).map((tour, index) => (
            <div
              key={tour.id}
              className="card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-primary text-secondary font-bold px-3 py-1 rounded-full">
                  <Star className="inline w-4 h-4 mb-1" /> {tour.rating}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-2">{tour.title}</h3>
                <div className="flex items-center text-text-light mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{tour.destination}</span>
                </div>
                <div className="flex items-center text-text-light mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{tour.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-text-light">Mulai dari</span>
                    <p className="text-2xl font-bold text-primary">
                      Rp {tour.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <Link
                    to={`/booking?tour=${tour.id}`}
                    className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-light transition-colors"
                  >
                    Pesan
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12" data-aos="fade-up">
          <Link to="/tours" className="btn-secondary inline-flex items-center gap-2">
            Lihat Semua Tour <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-container bg-gray-50">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="heading-secondary">Apa Kata Mereka?</h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Testimoni dari pelanggan yang telah merasakan pengalaman bersama kami
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-md"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold text-secondary">{testimonial.name}</h4>
                  <p className="text-sm text-text-light">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-text-light text-sm">{testimonial.comment}</p>
              <p className="text-xs text-primary mt-2 font-semibold">{testimonial.tour}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container bg-gradient-custom text-white">
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-6">Siap Untuk Petualangan Berikutnya?</h2>
          <p className="text-xl mb-8">
            Hubungi kami sekarang dan dapatkan penawaran spesial untuk paket tour impian Anda
          </p>
          <Link to="/booking" className="btn-primary inline-block">
            Mulai Booking Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
