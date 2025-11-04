import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, X, Loader2, MapPin, Clock, Star, CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { tourPackages } from '../data/mockData';
import TourCard from '../components/tours/TourCard';
import FilterSidebar from '../components/tours/FilterSidebar';
import { SkeletonCard } from '../components/common/Skeleton';
import { EmptyTours } from '../components/common/EmptyState';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Tours() {
  const [filters, setFilters] = useState({
    destinations: [],
    durationRange: [1, 7],
    priceRange: [99, 1499],
    categories: [],
    rating: null,
  });

  const [sortBy, setSortBy] = useState('popular');
  const [filteredTours, setFilteredTours] = useState([]);
  const [displayedTours, setDisplayedTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewTour, setQuickViewTour] = useState(null);
  const toursPerPage = 9;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    setIsLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      let filtered = [...tourPackages];

      // Filter by destinations
      if (filters.destinations.length > 0) {
        filtered = filtered.filter((tour) =>
          filters.destinations.includes(tour.destination)
        );
      }

      // Filter by duration
      filtered = filtered.filter(
        (tour) =>
          tour.durationDays >= filters.durationRange[0] &&
          tour.durationDays <= filters.durationRange[1]
      );

      // Filter by price
      filtered = filtered.filter(
        (tour) =>
          tour.priceUSD >= filters.priceRange[0] &&
          tour.priceUSD <= filters.priceRange[1]
      );

      // Filter by categories
      if (filters.categories.length > 0) {
        filtered = filtered.filter((tour) =>
          filters.categories.includes(tour.category)
        );
      }

      // Filter by rating
      if (filters.rating) {
        filtered = filtered.filter((tour) => tour.rating >= filters.rating);
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.priceUSD - b.priceUSD);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.priceUSD - a.priceUSD);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'duration':
          filtered.sort((a, b) => a.durationDays - b.durationDays);
          break;
        case 'popular':
        default:
          filtered.sort((a, b) => b.reviews - a.reviews);
          break;
      }

      setFilteredTours(filtered);
      setCurrentPage(1);
      setIsLoading(false);
    }, 500);
  }, [filters, sortBy]);

  // Pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * toursPerPage;
    const endIndex = startIndex + toursPerPage;
    setDisplayedTours(filteredTours.slice(startIndex, endIndex));
  }, [filteredTours, currentPage]);

  const handleFilterChange = (filterKey, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      destinations: [],
      durationRange: [1, 7],
      priceRange: [99, 1499],
      categories: [],
      rating: null,
    });
    setSortBy('popular');
  };

  const handleApplyFilters = () => {
    setShowMobileFilters(false);
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const totalPages = Math.ceil(filteredTours.length / toursPerPage);
  const hasMore = currentPage < totalPages;

  // Quick View Modal
  const QuickViewModal = ({ tour, onClose }) => {
    if (!tour) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 text-secondary p-2 rounded-full shadow-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Tour Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            {/* Tour Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-4xl font-bold mb-2">{tour.title}</h2>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-lg">{tour.destination}</span>
              </div>
            </div>
          </div>

          {/* Tour Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-xl text-secondary mb-4">Tour Information</h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(tour.rating)
                            ? 'fill-primary text-primary'
                            : 'fill-gray-300 text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-secondary">{tour.rating}</span>
                  <span className="text-text-light">({tour.reviews} reviews)</span>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-text-light">{tour.duration}</span>
                </div>

                {/* Description */}
                <p className="text-text-light mb-6">{tour.description}</p>

                {/* Highlights */}
                <div>
                  <h4 className="font-semibold text-secondary mb-3">Tour Highlights</h4>
                  <div className="space-y-2">
                    {tour.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-text-light">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-xl text-secondary mb-4">Booking Information</h3>

                {/* Price */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl mb-6">
                  <p className="text-sm text-text-light mb-2">Starting from</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-primary">${tour.priceUSD}</span>
                    <span className="text-lg text-text-light line-through">
                      ${Math.round(tour.priceUSD * 1.3)}
                    </span>
                  </div>
                  <p className="text-sm text-text-light">per person</p>
                </div>

                {/* Departure Dates */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-secondary">Next Departures</h4>
                  </div>
                  <div className="space-y-2">
                    {tour.departureDates.map((date, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-text-light">
                          {new Date(date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                        {tour.availability <= 10 && (
                          <span className="text-xs font-semibold text-red-500">
                            {tour.availability} slots left
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to={`/tours/${tour.id}`}
                    className="block w-full bg-secondary hover:bg-secondary-light text-white font-bold py-4 rounded-xl text-center transition-all duration-300 shadow-lg"
                  >
                    View Full Details
                  </Link>
                  <Link
                    to={`/booking?tour=${tour.id}`}
                    className="block w-full bg-primary hover:bg-primary-light text-secondary font-bold py-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Book Now
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative h-72 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary-light/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-white/80 mb-4" data-aos="fade-down">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary font-semibold">Tour Packages</span>
          </nav>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-aos="fade-up">
            Jelajahi Paket Tour Kami
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Temukan destinasi impian Anda dari 24+ pilihan paket tour menarik di seluruh Indonesia
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              onApplyFilters={handleApplyFilters}
              isMobile={false}
            />
          </div>

          {/* Mobile Filter Button */}
          {showMobileFilters && (
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              onApplyFilters={handleApplyFilters}
              isMobile={true}
              onClose={() => setShowMobileFilters(false)}
            />
          )}

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl shadow-md">
              <div>
                <p className="text-text-light">
                  Menampilkan{' '}
                  <span className="font-bold text-secondary">{filteredTours.length}</span> paket
                  tour
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-colors"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                </button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="popular">Populer</option>
                  <option value="price-low">Harga: Rendah ke Tinggi</option>
                  <option value="price-high">Harga: Tinggi ke Rendah</option>
                  <option value="rating">Rating Tertinggi</option>
                  <option value="duration">Durasi Terpendek</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredTours.length > 0 ? (
              <>
                {/* Tours Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                  {displayedTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} onQuickView={setQuickViewTour} />
                  ))}
                </div>

                {/* Load More / Pagination */}
                {hasMore && (
                  <div className="text-center">
                    <button
                      onClick={handleLoadMore}
                      className="inline-flex items-center gap-2 bg-secondary hover:bg-primary text-white hover:text-secondary font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg btn-animate hover-lift"
                    >
                      Load More Tours
                      <Loader2 className="w-5 h-5" />
                    </button>
                    <p className="text-sm text-text-light mt-4">
                      Showing {displayedTours.length} of {filteredTours.length} tours
                    </p>
                  </div>
                )}
              </>
            ) : (
              // Empty State
              <div className="bg-white rounded-2xl shadow-lg" data-aos="fade-up">
                <EmptyTours filters={filters} onReset={handleResetFilters} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewTour && (
        <QuickViewModal tour={quickViewTour} onClose={() => setQuickViewTour(null)} />
      )}
    </div>
  );
}

export default Tours;
