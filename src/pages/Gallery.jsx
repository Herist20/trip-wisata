import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search,
  SortDesc,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Download,
  Share2,
  Grid3x3,
  List,
  Eye,
} from 'lucide-react';
import { galleryImages } from '../data/mockData';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [displayedImages, setDisplayedImages] = useState(12);
  const [filteredImages, setFilteredImages] = useState([]);
  const [likedImages, setLikedImages] = useState(new Set());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const lightboxRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  // Filter categories
  const categories = [
    { id: 'all', name: 'All Photos', count: galleryImages.length },
    {
      id: 'beach',
      name: 'Beach & Islands',
      count: galleryImages.filter((img) => img.category === 'beach').length,
    },
    {
      id: 'mountain',
      name: 'Mountains & Hiking',
      count: galleryImages.filter((img) => img.category === 'mountain').length,
    },
    {
      id: 'cultural',
      name: 'Cultural Heritage',
      count: galleryImages.filter((img) => img.category === 'cultural').length,
    },
    {
      id: 'adventure',
      name: 'Adventure & Activities',
      count: galleryImages.filter((img) => img.category === 'adventure').length,
    },
    {
      id: 'culinary',
      name: 'Food & Culinary',
      count: galleryImages.filter((img) => img.category === 'culinary').length,
    },
  ];

  // Filter and sort images
  useEffect(() => {
    let result = [...galleryImages];

    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter((img) => img.category === activeFilter);
    }

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (img) =>
          img.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.tourPackage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        result.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        break;
      case 'popular':
        result.sort((a, b) => b.likes - a.likes);
        break;
      case 'mostLiked':
        result.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }

    setFilteredImages(result);
  }, [activeFilter, searchQuery, sortBy]);

  // Handle like toggle
  const toggleLike = (imageId) => {
    setLikedImages((prev) => {
      const newLikes = new Set(prev);
      if (newLikes.has(imageId)) {
        newLikes.delete(imageId);
      } else {
        newLikes.add(imageId);
      }
      return newLikes;
    });
  };

  // Open lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Navigate lightbox
  const navigateLightbox = useCallback(
    (direction) => {
      if (direction === 'next') {
        setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
      } else {
        setCurrentImageIndex((prev) =>
          prev === 0 ? filteredImages.length - 1 : prev - 1
        );
      }
    },
    [filteredImages.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, navigateLightbox]);

  // Load more functionality
  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedImages((prev) => prev + 12);
      setIsLoading(false);
    }, 500);
  };

  // Share functionality
  const handleShare = async (image) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.location,
          text: image.caption,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const currentImage = filteredImages[currentImageIndex];
  const visibleImages = filteredImages.slice(0, displayedImages);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Collage Background */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Collage Background */}
        <div className="absolute inset-0 grid grid-cols-6 gap-1">
          {galleryImages.slice(0, 24).map((img, idx) => (
            <div key={idx} className="relative overflow-hidden">
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover opacity-40"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/80 to-primary/90"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            data-aos="fade-up"
          >
            Galeri Perjalanan Kami
          </h1>
          <p
            className="text-xl md:text-2xl text-white/90"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Momen indah dari setiap petualangan
          </p>
        </div>
      </section>

      {/* Search and Controls */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari lokasi, tour package..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white cursor-pointer focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="recent">Recent</option>
                  <option value="popular">Popular</option>
                  <option value="mostLiked">Most Liked</option>
                </select>
                <SortDesc className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 ${
                    viewMode === 'grid'
                      ? 'bg-primary text-secondary'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 border-l ${
                    viewMode === 'list'
                      ? 'bg-primary text-secondary'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveFilter(category.id);
                  setDisplayedImages(12);
                }}
                className="relative px-6 py-3 whitespace-nowrap font-medium transition-colors group"
              >
                <span
                  className={`${
                    activeFilter === category.id
                      ? 'text-secondary'
                      : 'text-gray-600 group-hover:text-secondary'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-sm">({category.count})</span>
                </span>
                {/* Green underline for active tab */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-primary transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100'
                  }`}
                ></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-text-light">
            Menampilkan{' '}
            <span className="font-semibold text-secondary">
              {Math.min(displayedImages, filteredImages.length)}
            </span>{' '}
            dari{' '}
            <span className="font-semibold text-secondary">
              {filteredImages.length}
            </span>{' '}
            foto
          </p>
        </div>

        {/* Masonry Grid */}
        {filteredImages.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
                : 'grid grid-cols-1 gap-6'
            }
          >
            {visibleImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative break-inside-avoid cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={index % 12 * 50}
                onClick={() => openLightbox(index)}
              >
                {/* Image Card */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Image */}
                  <img
                    src={image.url}
                    alt={image.caption}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Quick View Button */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full">
                        <Eye className="w-8 h-8 text-secondary" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-start gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-white font-bold text-lg mb-1">
                            {image.location}
                          </h3>
                          <p className="text-white/90 text-sm">
                            {image.tourPackage}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(image.id);
                          }}
                          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              likedImages.has(image.id)
                                ? 'fill-red-500 text-red-500'
                                : 'text-white'
                            }`}
                          />
                          <span className="text-white text-sm font-medium">
                            {image.likes + (likedImages.has(image.id) ? 1 : 0)}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20" data-aos="fade-up">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-secondary mb-2">
              Tidak ada foto ditemukan
            </h3>
            <p className="text-text-light">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
          </div>
        )}

        {/* Load More Button */}
        {displayedImages < filteredImages.length && (
          <div className="text-center mt-12" data-aos="fade-up">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="bg-secondary hover:bg-secondary-light text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </div>
              ) : (
                `Muat Lebih Banyak (${filteredImages.length - displayedImages} tersisa)`
              )}
            </button>
          </div>
        )}

        {/* Skeleton Loading State */}
        {isLoading && (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 mt-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid animate-pulse"
              >
                <div className="bg-gray-200 rounded-2xl w-full h-64"></div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-50"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image Container */}
          <div
            className="max-w-6xl max-h-[85vh] mx-auto px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage.url}
              alt={currentImage.caption}
              className="max-w-full max-h-[70vh] object-contain mx-auto rounded-lg shadow-2xl"
            />

            {/* Caption and Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mt-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="text-2xl font-bold text-white">
                      {currentImage.location}
                    </h3>
                  </div>
                  <p className="text-white/90 text-lg mb-2">
                    {currentImage.caption}
                  </p>
                  <p className="text-white/70">
                    Tour: {currentImage.tourPackage}
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Photo by {currentImage.photographer}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => toggleLike(currentImage.id)}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedImages.has(currentImage.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-white'
                      }`}
                    />
                    <span className="text-white font-medium">
                      {currentImage.likes +
                        (likedImages.has(currentImage.id) ? 1 : 0)}
                    </span>
                  </button>

                  <button
                    onClick={() => handleShare(currentImage)}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Share</span>
                  </button>

                  <a
                    href={currentImage.url}
                    download
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Download</span>
                  </a>
                </div>
              </div>

              {/* Image Counter */}
              <div className="text-center mt-4">
                <span className="text-white/80 text-sm">
                  {currentImageIndex + 1} / {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
