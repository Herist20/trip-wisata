import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, ArrowRight, Users, Award, TrendingUp, Shield, CheckCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { tourPackages, testimonials, features, contactInfo } from '../data/mockData';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('features-highlights');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const statsHighlights = [
    {
      icon: Users,
      value: '500+',
      label: 'Happy Travelers',
      description: 'Pelanggan puas dengan layanan kami'
    },
    {
      icon: MapPin,
      value: '20+',
      label: 'Destinasi',
      description: 'Pilihan destinasi menarik di Indonesia'
    },
    {
      icon: Award,
      value: '100%',
      label: 'Tour Guide Profesional',
      description: 'Bersertifikat dan berpengalaman'
    },
    {
      icon: TrendingUp,
      value: '4.9/5',
      label: 'Rating Kepuasan',
      description: 'Dari review pelanggan kami'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80)',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/75 to-secondary-dark/85"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Trust Badges */}
          <div
            className="flex flex-wrap justify-center gap-4 mb-8"
            data-aos="fade-down"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-white text-sm font-semibold">Verified Tour Operator</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-white text-sm font-semibold">Best Price Guarantee</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Jelajahi Keindahan
            <br />
            <span className="text-primary">Indonesia</span> Bersama Kami
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Paket wisata terpercaya dengan pengalaman tak terlupakan,
            harga terbaik, dan pelayanan profesional
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Link
              to="/tours"
              className="group px-8 py-4 bg-primary hover:bg-primary-light text-secondary font-bold rounded-full text-lg shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Lihat Paket Tour
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/booking"
              className="group px-8 py-4 bg-transparent hover:bg-white border-2 border-white text-white hover:text-secondary font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Hubungi Kami
            </Link>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToContent}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer group"
            data-aos="fade-up"
            data-aos-delay="400"
            aria-label="Scroll to content"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                Scroll untuk lebih lanjut
              </span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </button>
        </div>
      </section>

      {/* Features Highlights with Glassmorphism */}
      <section id="features-highlights" className="relative -mt-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsHighlights.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/90 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-3xl font-bold text-secondary mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-lg font-semibold text-secondary mb-2">
                      {stat.label}
                    </p>
                    <p className="text-sm text-text-light">
                      {stat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Trust Building */}
      <section className="relative section-container bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23024F83' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Side - Content (Mobile: First) */}
          <div className="order-2 lg:order-1" data-aos="fade-right">
            {/* Small Tag */}
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-secondary uppercase tracking-wide">
                Mengapa Memilih Kami
              </span>
            </div>

            {/* Accent Line */}
            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-primary-light rounded-full mb-6"></div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6 leading-tight">
              Pengalaman Wisata
              <br />
              <span className="text-primary">Terbaik di Indonesia</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-text-light mb-10 leading-relaxed">
              Kami berkomitmen memberikan pengalaman liburan yang tak terlupakan dengan
              layanan profesional, harga transparan, dan dukungan penuh dari awal hingga
              akhir perjalanan Anda. Kepuasan dan kenyamanan Anda adalah prioritas utama kami.
            </p>

            {/* Keunggulan List */}
            <div className="space-y-6">
              {[
                {
                  icon: Users,
                  title: 'Tour Guide Profesional & Berpengalaman',
                  description: 'Tim tour guide bersertifikat dengan pengetahuan mendalam tentang destinasi dan budaya lokal',
                  number: '01'
                },
                {
                  icon: Shield,
                  title: 'Harga Transparan Tanpa Biaya Tersembunyi',
                  description: 'Semua biaya dijelaskan dengan jelas di awal, tidak ada biaya tambahan yang mengejutkan',
                  number: '02'
                },
                {
                  icon: CheckCircle,
                  title: 'Asuransi Perjalanan Included',
                  description: 'Setiap paket tour sudah termasuk asuransi perjalanan untuk keamanan dan ketenangan pikiran Anda',
                  number: '03'
                },
                {
                  icon: Award,
                  title: 'Flexible Cancellation Policy',
                  description: 'Kebijakan pembatalan yang fleksibel dengan refund penuh hingga 7 hari sebelum keberangkatan',
                  number: '04'
                },
                {
                  icon: MessageCircle,
                  title: '24/7 Customer Support',
                  description: 'Tim customer support kami siap membantu Anda kapan saja, sebelum, selama, dan setelah perjalanan',
                  number: '05'
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="group flex gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    {/* Number Badge & Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        {/* Number Badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-secondary font-bold text-xs rounded-full flex items-center justify-center shadow-lg z-10">
                          {item.number}
                        </div>

                        {/* Icon Container */}
                        <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-7 h-7 text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Image (Mobile: Second) */}
          <div className="order-1 lg:order-2" data-aos="fade-left">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"
                  alt="Professional Tour Guide helping tourists"
                  className="w-full h-[600px] object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent"></div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl" data-aos="zoom-in" data-aos-delay="200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-secondary">4.9/5</p>
                    <p className="text-sm text-text-light">Customer Rating</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl" data-aos="zoom-in" data-aos-delay="300">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-secondary">500+</p>
                    <p className="text-sm text-text-light">Happy Travelers</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 -top-8 -right-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Tours Section - Premium Design */}
      <section className="section-container bg-white">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Paket Tour Populer Kami
          </h2>
          <p className="text-lg md:text-xl text-text-light max-w-3xl mx-auto">
            Pilihan terbaik untuk liburan impian Anda dengan harga terjangkau dan layanan premium
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourPackages.slice(0, 6).map((tour, index) => (
            <div
              key={tour.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Image with Overlay Gradient */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay from Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Badge (Best Seller / New) */}
                {tour.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-primary text-secondary font-bold px-4 py-1.5 rounded-full text-sm shadow-lg">
                      {tour.badge}
                    </span>
                  </div>
                )}

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-semibold text-secondary">{tour.durationShort}</span>
                  </div>
                </div>

                {/* Location Overlay at Bottom */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-white font-medium text-sm">{tour.destination}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Tour Title */}
                <h3 className="text-2xl font-bold text-secondary mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {tour.title}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(tour.rating)
                            ? 'fill-primary text-primary'
                            : 'fill-gray-300 text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-secondary">{tour.rating}</span>
                  <span className="text-sm text-text-light">({tour.reviews} reviews)</span>
                </div>

                {/* Highlights with Checkmarks */}
                <div className="space-y-2 mb-5">
                  {tour.highlights.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-text-light">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5"></div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-text-light mb-1">Starting from</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        ${tour.priceUSD}
                      </span>
                      <span className="text-sm text-text-light line-through">
                        ${Math.round(tour.priceUSD * 1.3)}
                      </span>
                    </div>
                    <p className="text-xs text-text-light mt-1">per person</p>
                  </div>

                  <Link
                    to={`/booking?tour=${tour.id}`}
                    className="group/btn bg-secondary hover:bg-primary text-white hover:text-secondary font-semibold px-5 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    <span className="flex items-center gap-2">
                      Lihat Detail
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16" data-aos="fade-up">
          <Link
            to="/tours"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-secondary to-secondary-light hover:from-primary hover:to-primary-light text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Lihat Semua Paket Tour
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
          <p className="text-sm text-text-light mt-4">
            Lebih dari 20+ destinasi menarik menanti Anda
          </p>
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

      {/* Floating WhatsApp Button */}
      <a
        href={contactInfo.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Chat on WhatsApp"
        data-aos="zoom-in"
        data-aos-delay="500"
      >
        <div className="relative">
          {/* Pulsing Ring Animation */}
          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>

          {/* Main Button */}
          <div className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white p-4 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-110 flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />

            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
              Chat dengan Kami di WhatsApp
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-secondary"></div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Home;
