import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { galleries } from '../data/mockData';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredGallery, setFilteredGallery] = useState(galleries);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredGallery(galleries);
    } else {
      setFilteredGallery(galleries.filter((item) => item.category === selectedCategory));
    }
  }, [selectedCategory]);

  const galleryCategories = [
    { id: 'all', name: 'Semua' },
    { id: 'beach', name: 'Pantai' },
    { id: 'mountain', name: 'Gunung' },
    { id: 'culture', name: 'Budaya' },
    { id: 'island', name: 'Pulau' },
    { id: 'diving', name: 'Diving' },
    { id: 'wildlife', name: 'Wildlife' },
    { id: 'lake', name: 'Danau' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-custom text-white py-20">
        <div className="section-container text-center" data-aos="fade-up">
          <h1 className="heading-primary text-white mb-4">Galeri Kami</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Jelajahi keindahan destinasi wisata melalui koleksi foto perjalanan kami
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-container">
        <div className="bg-white p-6 rounded-xl shadow-md mb-8" data-aos="fade-up">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-semibold text-secondary">Filter Kategori</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-secondary shadow-md'
                    : 'bg-gray-100 text-text hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mb-6" data-aos="fade-up">
          <p className="text-text-light">
            Menampilkan <span className="font-semibold text-secondary">{filteredGallery.length}</span> foto
          </p>
        </div>

        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGallery.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 aspect-square"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                    <span className="inline-block bg-primary text-secondary text-xs font-semibold px-2 py-1 rounded">
                      {galleryCategories.find((cat) => cat.id === item.category)?.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20" data-aos="fade-up">
            <p className="text-xl text-text-light">Tidak ada foto di kategori ini</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="section-container bg-secondary text-white">
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-6">Ingin Mengalami Sendiri?</h2>
          <p className="text-xl mb-8">
            Jadilah bagian dari petualangan berikutnya dan ciptakan momen indah Anda sendiri
          </p>
          <a href="/booking" className="btn-primary inline-block">
            Mulai Booking Sekarang
          </a>
        </div>
      </section>
    </div>
  );
}

export default Gallery;
