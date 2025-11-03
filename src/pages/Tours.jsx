import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, Filter } from 'lucide-react';
import { tourPackages, categories } from '../data/mockData';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Tours() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredTours, setFilteredTours] = useState(tourPackages);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredTours(tourPackages);
    } else {
      setFilteredTours(tourPackages.filter((tour) => tour.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-custom text-white py-20">
        <div className="section-container text-center" data-aos="fade-up">
          <h1 className="heading-primary text-white mb-4">Paket Tour Kami</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Temukan destinasi impian Anda dari berbagai pilihan paket tour menarik
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
            {categories.map((category) => (
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

        {/* Tours Grid */}
        <div className="mb-6" data-aos="fade-up">
          <p className="text-text-light">
            Menampilkan <span className="font-semibold text-secondary">{filteredTours.length}</span> paket tour
          </p>
        </div>

        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour, index) => (
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
                  <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {categories.find((cat) => cat.id === tour.category)?.name}
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
                  <p className="text-text-light text-sm mb-4 line-clamp-2">{tour.description}</p>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {tour.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-text-light text-xs px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
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
        ) : (
          <div className="text-center py-20" data-aos="fade-up">
            <p className="text-xl text-text-light">Tidak ada paket tour di kategori ini</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Tours;
