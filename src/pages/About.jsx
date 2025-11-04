import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Handshake, Star, Leaf, Heart, TrendingUp, Users, MapPin, Award,
  Mail, Linkedin, Calendar, CheckCircle, ArrowRight, Shield, Target
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {
  const [counts, setCounts] = useState({
    travelers: 0,
    destinations: 0,
    guides: 0,
    rating: 0,
  });
  const [hasCounted, setHasCounted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
          setHasCounted(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasCounted]);

  const animateCounters = () => {
    const targets = {
      travelers: 500,
      destinations: 20,
      guides: 15,
      rating: 4.9,
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        travelers: Math.floor(targets.travelers * progress),
        destinations: Math.floor(targets.destinations * progress),
        guides: Math.floor(targets.guides * progress),
        rating: parseFloat((targets.rating * progress).toFixed(1)),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);
  };

  const timeline = [
    { year: 2015, event: 'Founded', description: 'Dimulai dengan 2 paket tour dan passion yang besar' },
    { year: 2018, event: 'Expansion', description: 'Berkembang ke 10 destinasi di seluruh Indonesia' },
    { year: 2020, event: 'Digital Transformation', description: 'Launching sistem booking online untuk kemudahan pelanggan' },
    { year: 2024, event: 'Major Milestone', description: '20+ destinasi dan 500+ pelanggan bahagia' },
  ];

  const values = [
    {
      icon: Handshake,
      title: 'Integrity',
      description: 'Kami beroperasi dengan kejujuran dan transparansi penuh. Tidak ada biaya tersembunyi, semua informasi disampaikan dengan jelas kepada setiap pelanggan.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'Komitmen kami adalah memberikan layanan terbaik di kelasnya. Setiap detail perjalanan dirancang untuk melampaui ekspektasi Anda.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Kami peduli pada kelestarian alam dan budaya. Setiap tour dirancang untuk mendukung pariwisata berkelanjutan dan memberdayakan komunitas lokal.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Heart,
      title: 'Customer-Centric',
      description: 'Kepuasan Anda adalah prioritas utama kami. Tim kami siap 24/7 untuk memastikan setiap perjalanan Anda berjalan sempurna.',
      color: 'from-red-500 to-red-600',
    },
  ];

  const team = [
    {
      name: 'Andi Wijaya',
      position: 'CEO & Founder',
      bio: 'Dengan 15+ tahun pengalaman di industri pariwisata, Andi memimpin visi perusahaan untuk memberikan pengalaman wisata terbaik.',
      image: 'https://i.pravatar.cc/400?img=12',
      linkedin: 'https://linkedin.com',
      email: 'andi@tripwisata.com',
    },
    {
      name: 'Siti Rahman',
      position: 'Operations Manager',
      bio: 'Bertanggung jawab atas operasional harian dan memastikan setiap tour berjalan lancar dengan standar kualitas tertinggi.',
      image: 'https://i.pravatar.cc/400?img=45',
      linkedin: 'https://linkedin.com',
      email: 'siti@tripwisata.com',
    },
    {
      name: 'Made Prasetya',
      position: 'Senior Tour Guide',
      bio: 'Dengan pengetahuan mendalam tentang budaya Indonesia, Made telah memandu 200+ tour dengan rating sempurna.',
      image: 'https://i.pravatar.cc/400?img=33',
      linkedin: 'https://linkedin.com',
      email: 'made@tripwisata.com',
    },
    {
      name: 'Dewi Kusuma',
      position: 'Senior Tour Guide',
      bio: 'Berpengalaman 10 tahun sebagai tour guide, Dewi ahli dalam cultural tours dan adventure expeditions.',
      image: 'https://i.pravatar.cc/400?img=25',
      linkedin: 'https://linkedin.com',
      email: 'dewi@tripwisata.com',
    },
  ];

  const partners = [
    { name: 'Ministry of Tourism', logo: '🏛️' },
    { name: 'ASITA Member', logo: '🌏' },
    { name: 'Verified Tour Operator', logo: '✓' },
    { name: 'Green Tourism Certified', logo: '🌿' },
    { name: 'Trip Advisor Partner', logo: '🦉' },
    { name: 'Safety First Certified', logo: '🛡️' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#024F83]/95 via-[#024F83]/90 to-[#01395d]/95"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            data-aos="fade-up"
          >
            Tentang Kami
          </h1>
          <p
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Mewujudkan Impian Perjalanan Anda Sejak 2015
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Image */}
            <div className="order-2 lg:order-1" data-aos="fade-right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
                  alt="Our Story"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2" data-aos="fade-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-secondary uppercase tracking-wide">
                  Our Journey
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 leading-tight">
                Perjalanan Kami Dimulai dengan Passion
              </h2>

              <div className="space-y-4 text-text-light leading-relaxed">
                <p>
                  Berawal dari kecintaan mendalam terhadap keindahan Indonesia, kami mendirikan Trip
                  Wisata pada tahun 2015 dengan visi sederhana namun mulia: memperkenalkan pesona
                  nusantara kepada lebih banyak orang. Dari sebuah kantor kecil dan dua paket tour
                  pertama, kami memulai perjalanan yang luar biasa ini.
                </p>
                <p>
                  Setiap destinasi yang kami tawarkan dipilih dengan cermat, setiap pengalaman
                  dirancang dengan detail. Kami tidak hanya ingin mengajak Anda berwisata, tetapi
                  menghadirkan petualangan yang berkesan, pengetahuan budaya yang mendalam, dan
                  kenangan indah yang akan Anda bawa pulang selamanya.
                </p>
                <p>
                  Dengan tim profesional yang memiliki pengalaman lebih dari 10 tahun di industri
                  pariwisata, kami memahami bahwa setiap traveler memiliki kebutuhan dan impian yang
                  unik. Itulah mengapa kami selalu berusaha memberikan layanan yang personal,
                  fleksibel, dan melebihi ekspektasi.
                </p>
                <p>
                  Hari ini, dengan bangga kami melayani ratusan wisatawan setiap tahunnya, membawa
                  mereka menjelajahi 20+ destinasi menakjubkan di seluruh Indonesia. Dan perjalanan
                  kami masih terus berlanjut, dengan semangat yang sama seperti hari pertama.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-20" data-aos="fade-up">
            <h3 className="text-2xl md:text-3xl font-bold text-secondary text-center mb-12">
              Timeline Perjalanan Kami
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-primary to-transparent"></div>

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-100 hover:border-primary transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="text-2xl font-bold text-primary">{item.year}</span>
                        </div>
                        <h4 className="text-xl font-bold text-secondary mb-2">{item.event}</h4>
                        <p className="text-text-light">{item.description}</p>
                      </div>
                    </div>

                    {/* Circle */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg z-10 relative">
                        <CheckCircle className="w-8 h-8 text-secondary" />
                      </div>
                    </div>

                    {/* Spacer for alignment */}
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Prinsip fundamental yang menjadi fondasi setiap layanan dan keputusan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <IconComponent className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary mb-4">{value.title}</h3>
                  <p className="text-text-light leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Tim Profesional Kami
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Bertemu dengan orang-orang berdedikasi yang membuat setiap perjalanan Anda istimewa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Social Links - Show on hover */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.position}</p>
                  <p className="text-sm text-text-light leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements/Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-br from-secondary to-secondary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center" data-aos="fade-up" data-aos-delay="0">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-secondary" />
              </div>
              <p className="text-5xl font-bold text-white mb-2">{counts.travelers}+</p>
              <p className="text-lg text-white/90">Happy Travelers</p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-secondary" />
              </div>
              <p className="text-5xl font-bold text-white mb-2">{counts.destinations}+</p>
              <p className="text-lg text-white/90">Destinations</p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-secondary" />
              </div>
              <p className="text-5xl font-bold text-white mb-2">{counts.guides}</p>
              <p className="text-lg text-white/90">Professional Guides</p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-secondary" />
              </div>
              <p className="text-5xl font-bold text-white mb-2">{counts.rating}/5</p>
              <p className="text-lg text-white/90">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Partners */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Sertifikasi & Partner
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Terpercaya dan diakui oleh berbagai lembaga pariwisata terkemuka
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="text-6xl mb-4 grayscale group-hover:grayscale-0 transition-all">
                  {partner.logo}
                </div>
                <p className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
            <div className="bg-white p-6 rounded-xl border-2 border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-secondary">Licensed & Insured</h3>
              </div>
              <p className="text-sm text-text-light">
                Terdaftar resmi dengan asuransi perjalanan lengkap
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-secondary">Quality Assured</h3>
              </div>
              <p className="text-sm text-text-light">
                Standar kualitas internasional dalam setiap layanan
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-secondary">Sustainable Tourism</h3>
              </div>
              <p className="text-sm text-text-light">
                Komitmen pada pariwisata berkelanjutan dan ramah lingkungan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary-light to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-secondary mb-6"
            data-aos="fade-up"
          >
            Siap Memulai Petualangan Anda?
          </h2>
          <p
            className="text-lg text-secondary/80 max-w-2xl mx-auto mb-10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Bergabunglah dengan ratusan traveler yang telah mempercayai kami untuk mewujudkan
            impian perjalanan mereka
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Link
              to="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary hover:bg-secondary-light text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-xl"
            >
              Hubungi Kami
              <Mail className="w-5 h-5" />
            </Link>
            <Link
              to="/tours"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-secondary font-bold rounded-xl transition-all transform hover:scale-105 shadow-xl"
            >
              Lihat Paket Tour
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
