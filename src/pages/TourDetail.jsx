import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin, Star, Share2, Heart, ChevronLeft, ChevronRight, X, Clock, Calendar,
  Users, Minus, Plus, Check, XIcon, Info, AlertCircle, ThumbsUp, Verified,
  Home, ChevronDown, ChevronUp, Shield, RotateCcw, Sparkles, Image as ImageIcon
} from 'lucide-react';
import { tourPackages, tourDetails } from '../data/mockData';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

function TourDetail() {
  const { t } = useTranslation('tourDetail');
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = tourPackages.find((t) => t.id === parseInt(id));
  const details = tourDetails[parseInt(id)];

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [expandedDays, setExpandedDays] = useState([1]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    window.scrollTo(0, 0);
  }, []);

  if (!tour || !details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary mb-4">{t('notFound.title')}</h2>
          <Link to="/tours" className="text-primary hover:underline">
            {t('notFound.backToTours')}
          </Link>
        </div>
      </div>
    );
  }

  const childPrice = tour.priceUSD * 0.7; // 70% of adult price
  const subtotal = adults * tour.priceUSD + children * childPrice;

  const toggleDay = (day) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour.title,
        text: tour.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('booking.linkCopied'));
    }
  };

  // Lightbox Navigation
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % details.gallery.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + details.gallery.length) % details.gallery.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-text-light overflow-x-auto scrollbar-hide">
            <Link to="/" className="hover:text-primary transition-colors flex items-center justify-center flex-shrink-0">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400" />
            <Link to="/tours" className="hover:text-primary transition-colors flex items-center flex-shrink-0 whitespace-nowrap">
              {t('breadcrumb.tours')}
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400" />
            <span className="text-secondary font-medium truncate flex items-center">{tour.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg" data-aos="fade-up">
              {/* Main Image */}
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden group cursor-pointer"
                onClick={() => setShowLightbox(true)}>
                <img
                  src={details.gallery[selectedImage]}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                {tour.badge && (
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4">
                    <span className="bg-primary text-secondary font-bold px-2.5 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-xs sm:text-sm shadow-lg flex items-center gap-1 sm:gap-1.5 md:gap-2">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                      {tour.badge}
                    </span>
                  </div>
                )}

                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <div className="bg-white/90 p-4 rounded-full">
                    <ImageIcon className="w-8 h-8 text-secondary" />
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10 flex items-center justify-center"
                  aria-label={t('aria.previousImage')}
                >
                  <ChevronLeft className="w-6 h-6 text-secondary flex-shrink-0" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10 flex items-center justify-center"
                  aria-label={t('aria.nextImage')}
                >
                  <ChevronRight className="w-6 h-6 text-secondary flex-shrink-0" />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 sm:gap-2 p-2 sm:p-3 md:p-4 bg-gray-50">
                {details.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-14 sm:h-16 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tour Header */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg" data-aos="fade-up">
              <div className="flex items-start justify-between gap-2 sm:gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-2 sm:mb-3">
                    {tour.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-text-light">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{tour.destination}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <span>{tour.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={handleShare}
                    className="p-3 border-2 border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                    aria-label={t('aria.shareTour')}
                  >
                    <Share2 className="w-5 h-5 flex-shrink-0" />
                  </button>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`p-3 border-2 rounded-xl transition-all flex items-center justify-center ${
                      isSaved
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 hover:border-primary hover:text-primary'
                    }`}
                    aria-label={t('aria.saveTour')}
                  >
                    <Heart className={`w-5 h-5 flex-shrink-0 ${isSaved ? 'fill-primary' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 pb-3 sm:pb-4 border-b">
                <div className="flex items-center gap-0.5 sm:gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < Math.floor(tour.rating)
                          ? 'fill-primary text-primary'
                          : 'fill-gray-300 text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-base sm:text-lg text-secondary">{tour.rating}</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-primary hover:underline font-medium text-sm sm:text-base"
                >
                  ({tour.reviews} {t('tabs.reviews').toLowerCase()})
                </button>
              </div>
            </div>

            {/* Info Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden" data-aos="fade-up">
              {/* Tab Navigation */}
              <div className="flex border-b overflow-x-auto scrollbar-hide">
                {[
                  { id: 'overview', label: t('tabs.overview') },
                  { id: 'itinerary', label: t('tabs.itinerary') },
                  { id: 'inclusions', label: t('tabs.inclusions') },
                  { id: 'requirements', label: t('tabs.requirements') },
                  { id: 'reviews', label: t('tabs.reviews') },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 sm:px-4 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                      activeTab === tab.id
                        ? 'text-primary border-b-2 border-primary bg-primary/5'
                        : 'text-text-light hover:text-secondary hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-5 md:p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-secondary mb-3 sm:mb-4">{t('overview.aboutTour')}</h3>
                      <div className="prose prose-lg max-w-none text-text-light">
                        {details.fullDescription.split('\n\n').map((para, idx) => (
                          <p key={idx} className="mb-4">{para}</p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-secondary mb-3 sm:mb-4">{t('overview.tourHighlights')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tour.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-text-light">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-primary" />
                        {t('overview.meetingPointTitle')}
                      </h3>
                      <div className="space-y-2 text-text-light">
                        <p><strong>{t('overview.location')}</strong> {details.meetingPoint}</p>
                        <p><strong>{t('overview.time')}</strong> {details.meetingTime}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Itinerary Tab */}
                {activeTab === 'itinerary' && (
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-secondary mb-3 sm:mb-4">{t('itinerary.title')}</h3>
                    {details.itinerary.map((day) => (
                      <div key={day.day} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleDay(day.day)}
                          className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
                            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-primary text-secondary rounded-full flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0">
                              {day.day}
                            </div>
                            <div className="text-left">
                              <h4 className="font-bold text-secondary text-sm sm:text-base">{t('itinerary.day')} {day.day}</h4>
                              <p className="text-xs sm:text-sm text-text-light line-clamp-1">{day.title}</p>
                            </div>
                          </div>
                          {expandedDays.includes(day.day) ? (
                            <ChevronUp className="w-6 h-6 text-text-light flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-text-light flex-shrink-0" />
                          )}
                        </button>

                        {expandedDays.includes(day.day) && (
                          <div className="p-4 sm:p-5 md:p-6 bg-gray-50 border-t space-y-3 sm:space-y-4">
                            {/* Activities Timeline */}
                            <div className="space-y-2.5 sm:space-y-3">
                              {day.activities.map((activity, idx) => (
                                <div key={idx} className="flex gap-2 sm:gap-2.5 md:gap-3">
                                  <div className="flex flex-col items-center flex-shrink-0">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                                      {activity.time}
                                    </div>
                                    {idx < day.activities.length - 1 && (
                                      <div className="w-0.5 h-6 sm:h-8 bg-gray-300"></div>
                                    )}
                                  </div>
                                  <p className="text-text-light text-sm sm:text-base pt-1.5 sm:pt-2 flex-1">{activity.description}</p>
                                </div>
                              ))}
                            </div>

                            {/* Meals & Accommodation */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t">
                              <div className="flex items-center gap-2 text-text-light">
                                <div className="text-xl sm:text-2xl">🍽️</div>
                                <div>
                                  <p className="text-xs text-text-light/60 font-semibold uppercase">{t('itinerary.meals')}</p>
                                  <p className="font-medium text-sm sm:text-base">{day.meals.join(', ')}</p>
                                </div>
                              </div>
                              {day.accommodation && (
                                <div className="flex items-center gap-2 text-text-light">
                                  <div className="text-xl sm:text-2xl">🏨</div>
                                  <div>
                                    <p className="text-xs text-text-light/60 font-semibold uppercase">{t('itinerary.accommodation')}</p>
                                    <p className="font-medium text-sm sm:text-base">{day.accommodation}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Inclusions Tab */}
                {activeTab === 'inclusions' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                        <Check className="w-6 h-6 text-primary" />
                        {t('inclusions.included')}
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(details.inclusions).map(([category, items]) => (
                          <div key={category}>
                            <h4 className="font-semibold text-secondary capitalize mb-2">
                              {category.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-text-light">
                                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                        <XIcon className="w-6 h-6 text-red-500" />
                        {t('inclusions.excluded')}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {details.exclusions.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-text-light">
                            <XIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Requirements Tab */}
                {activeTab === 'requirements' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                          <Info className="w-5 h-5 text-blue-600" />
                          {t('requirements.ageRequirement')}
                        </h4>
                        <p className="text-text-light">{details.requirements.age}</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-xl">
                        <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                          <Users className="w-5 h-5 text-green-600" />
                          {t('requirements.fitnessLevel')}
                        </h4>
                        <p className="text-text-light">{details.requirements.fitness}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-secondary mb-3">{t('requirements.whatToBring')}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {details.requirements.whatToBring.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-text-light">
                            <Check className="w-4 h-4 text-primary" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-xl">
                      <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        {t('requirements.dressCode')}
                      </h4>
                      <p className="text-text-light">{details.requirements.dressCode}</p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-xl">
                      <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        {t('requirements.healthNotice')}
                      </h4>
                      <p className="text-text-light">{details.requirements.health}</p>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {/* Rating Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">
                          {details.reviewStats.average}
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(details.reviewStats.average)
                                  ? 'fill-primary text-primary'
                                  : 'fill-gray-300 text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-text-light">{details.reviewStats.total} {t('tabs.reviews').toLowerCase()}</p>
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => {
                          const count = details.reviewStats.breakdown[stars];
                          const percentage = (count / details.reviewStats.total) * 100;
                          return (
                            <div key={stars} className="flex items-center gap-3">
                              <span className="text-sm text-text-light w-8">{stars}★</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-all"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-text-light w-12">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Review List */}
                    <div className="space-y-6">
                      {details.customerReviews.map((review) => (
                        <div key={review.id} className="border-2 border-gray-100 rounded-xl p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-secondary">{review.name}</h4>
                                {review.verified && (
                                  <Verified className="w-4 h-4 text-blue-500 fill-blue-500" />
                                )}
                              </div>
                              <p className="text-sm text-text-light">{review.tourDate}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'fill-primary text-primary'
                                      : 'fill-gray-300 text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <h5 className="font-bold text-secondary mb-2">{review.title}</h5>
                          <p className="text-text-light mb-4">{review.review}</p>

                          {review.images.length > 0 && (
                            <div className="flex gap-2 mb-4">
                              {review.images.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt="Review"
                                  className="w-24 h-24 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          )}

                          <button className="flex items-center gap-2 text-text-light hover:text-primary transition-colors">
                            <ThumbsUp className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">{t('reviews.helpful')} ({review.helpful})</span>
                          </button>
                        </div>
                      ))}
                    </div>

                    <button className="w-full py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors">
                      {t('reviews.writeReview')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Booking Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100" data-aos="fade-left">
                {/* Price */}
                <div className="mb-6">
                  <p className="text-sm text-text-light mb-2">{t('booking.from')}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">${tour.priceUSD}</span>
                    <span className="text-lg text-text-light line-through">
                      ${Math.round(tour.priceUSD * 1.3)}
                    </span>
                  </div>
                  <p className="text-sm text-text-light">{t('booking.perPerson')}</p>
                </div>

                {/* Date Selector */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-secondary mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {t('booking.selectDate')}
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary appearance-none bg-white cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '20px'
                    }}
                  >
                    <option value="">{t('booking.selectDatePlaceholder')}</option>
                    {tour.departureDates.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Participants */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-secondary">{t('booking.adults')}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 border-2 border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-bold text-secondary w-8 text-center">{adults}</span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 border-2 border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-secondary">{t('booking.children')}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 border-2 border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-bold text-secondary w-8 text-center">{children}</span>
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 border-2 border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-light">{t('booking.subtotal')}</span>
                    <span className="text-2xl font-bold text-secondary">${subtotal.toFixed(2)}</span>
                  </div>
                  {children > 0 && (
                    <p className="text-xs text-text-light">
                      ({adults} {t('booking.adults').toLowerCase()} × ${tour.priceUSD} + {children} {t('booking.children').toLowerCase()} × ${childPrice.toFixed(2)})
                    </p>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link
                    to={`/booking?tour=${tour.id}&adults=${adults}&children=${children}&date=${selectedDate}`}
                    className="block w-full bg-primary hover:bg-primary-light text-secondary font-bold py-4 rounded-xl text-center transition-all transform hover:scale-105 shadow-lg"
                  >
                    {t('booking.proceedToBooking')}
                  </Link>
                  <Link
                    to="/booking"
                    className="block w-full border-2 border-secondary text-secondary font-semibold py-3 rounded-xl text-center hover:bg-secondary hover:text-white transition-all"
                  >
                    {t('booking.contactUs')}
                  </Link>
                </div>

                {/* Trust Elements */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <RotateCcw className="w-4 h-4 text-primary" />
                    <span>{t('booking.freeCancelDesc')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <Check className="w-4 h-4 text-primary" />
                    <span>{t('booking.instantConfirmDesc')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>{t('booking.securePayment')}</span>
                  </div>
                </div>
              </div>

              {/* Availability Alert */}
              {tour.availability <= 10 && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-pulse">
                  <p className="text-sm font-semibold text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {t('availabilityAlert', { count: tour.availability })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors flex items-center justify-center"
          >
            <X className="w-8 h-8 flex-shrink-0" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-12 h-12 flex-shrink-0" />
          </button>

          <img
            src={details.gallery[selectedImage]}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain"
          />

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors flex items-center justify-center"
          >
            <ChevronRight className="w-12 h-12 flex-shrink-0" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {t('lightbox.imageCounter', { current: selectedImage + 1, total: details.gallery.length })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TourDetail;
