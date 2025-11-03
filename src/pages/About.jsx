import { useEffect } from 'react';
import { Award, Users, MapPin, Heart, Target, Eye, Shield, ThumbsUp } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const stats = [
    { icon: Users, value: '10,000+', label: 'Wisatawan Bahagia' },
    { icon: MapPin, value: '50+', label: 'Destinasi' },
    { icon: Award, value: '15+', label: 'Penghargaan' },
    { icon: Heart, value: '98%', label: 'Kepuasan Pelanggan' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Komitmen',
      description: 'Kami berkomitmen memberikan pengalaman wisata terbaik dengan standar layanan tertinggi.',
    },
    {
      icon: Shield,
      title: 'Kepercayaan',
      description: 'Keamanan dan kenyamanan Anda adalah prioritas utama kami dalam setiap perjalanan.',
    },
    {
      icon: ThumbsUp,
      title: 'Kualitas',
      description: 'Hanya menawarkan destinasi dan layanan berkualitas tinggi yang telah terverifikasi.',
    },
    {
      icon: Heart,
      title: 'Pelayanan',
      description: 'Melayani dengan sepenuh hati untuk memastikan kepuasan dan kebahagiaan Anda.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-custom text-white py-20">
        <div className="section-container text-center" data-aos="fade-up">
          <h1 className="heading-primary text-white mb-4">Tentang Kami</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Mitra terpercaya untuk perjalanan wisata impian Anda di seluruh Indonesia
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"
              alt="About Us"
              className="rounded-xl shadow-2xl"
            />
          </div>
          <div data-aos="fade-left">
            <h2 className="heading-secondary">Cerita Kami</h2>
            <p className="text-text-light mb-4 leading-relaxed">
              Berawal dari kecintaan terhadap keindahan Indonesia, kami mendirikan Trip Wisata pada tahun 2015
              dengan visi untuk memperkenalkan pesona nusantara kepada lebih banyak orang. Dari satu paket tour
              sederhana, kini kami telah melayani ribuan wisatawan bahagia.
            </p>
            <p className="text-text-light mb-4 leading-relaxed">
              Dengan tim profesional yang berpengalaman lebih dari 10 tahun di industri pariwisata, kami memahami
              setiap detail yang dibutuhkan untuk menciptakan pengalaman wisata yang sempurna. Setiap destinasi
              dipilih dengan cermat, setiap layanan dirancang dengan teliti.
            </p>
            <p className="text-text-light leading-relaxed">
              Kami tidak hanya mengajak Anda berwisata, tetapi menghadirkan pengalaman yang berkesan, pengetahuan
              budaya yang mendalam, dan kenangan indah yang akan Anda bawa pulang.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-container bg-secondary text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <p className="text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-container bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md" data-aos="fade-up">
            <div className="flex items-center mb-4">
              <Eye className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-2xl font-bold text-secondary">Visi Kami</h3>
            </div>
            <p className="text-text-light leading-relaxed">
              Menjadi perusahaan travel terdepan di Indonesia yang memberikan pengalaman wisata berkualitas
              tinggi, terjangkau, dan berkesan bagi setiap pelanggan, serta turut mempromosikan kekayaan
              budaya dan alam Indonesia ke kancah internasional.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-2xl font-bold text-secondary">Misi Kami</h3>
            </div>
            <ul className="text-text-light space-y-2 leading-relaxed">
              <li>• Menyediakan paket wisata berkualitas dengan harga kompetitif</li>
              <li>• Memberikan pelayanan profesional dan ramah</li>
              <li>• Menjaga kepuasan dan keamanan pelanggan</li>
              <li>• Mendukung pariwisata berkelanjutan</li>
              <li>• Memberdayakan komunitas lokal</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-container">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="heading-secondary">Nilai-Nilai Kami</h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Prinsip yang menjadi fondasi setiap layanan yang kami berikan
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">{value.title}</h3>
              <p className="text-text-light text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="section-container bg-gray-50">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="heading-secondary">Tim Profesional Kami</h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Berpengalaman lebih dari 10 tahun di industri pariwisata
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Andi Wijaya', role: 'CEO & Founder', image: 'https://i.pravatar.cc/300?img=12' },
            { name: 'Siti Rahman', role: 'Operations Manager', image: 'https://i.pravatar.cc/300?img=45' },
            { name: 'Budi Setiawan', role: 'Tour Coordinator', image: 'https://i.pravatar.cc/300?img=33' },
            { name: 'Dewi Kusuma', role: 'Customer Relations', image: 'https://i.pravatar.cc/300?img=25' },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-bold text-secondary mb-1">{member.name}</h3>
                <p className="text-sm text-text-light">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
