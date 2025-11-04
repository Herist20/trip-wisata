import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin, Star, Share2, Heart, ChevronLeft, ChevronRight, X, Clock, Calendar,
  Users, Minus, Plus, Check, XIcon, Info, AlertCircle, ThumbsUp, Verified,
  Home, ChevronDown, ChevronUp, Shield, RotateCcw, Sparkles, Image as ImageIcon
} from 'lucide-react';
import { tourPackages, tourDetails } from '../data/mockData';
import AOS from 'aos';
import 'aos/dist/aos.css';

function TourDetail() {
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
          <h2 className="text-2xl font-bold text-secondary mb-4">Tour Not Found</h2>
          <Link to="/tours" className="text-primary hover:underline">
            Back to Tours
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
      alert('Link copied to clipboard!');
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
          <nav className="flex items-center gap-2 text-sm text-text-light">
            <Link to="/" className="hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/tours" className="hover:text-primary transition-colors">
              Tours
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-secondary font-medium truncate">{tour.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg" data-aos="fade-up">
              {/* Main Image */}
              <div className="relative h-96 md:h-[500px] overflow-hidden group cursor-pointer"
                onClick={() => setShowLightbox(true)}>
                <img
                  src={details.gallery[selectedImage]}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                {tour.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-secondary font-bold px-4 py-2 rounded-full text-sm shadow-lg flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-secondary" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                >
                  <ChevronRight className="w-6 h-6 text-secondary" />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-5 gap-2 p-4 bg-gray-50">
                {details.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
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
            <div className="bg-white rounded-2xl p-6 shadow-lg" data-aos="fade-up">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
                    {tour.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-text-light">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="font-medium">{tour.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{tour.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-3 border-2 border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`p-3 border-2 rounded-xl transition-all ${
                      isSaved
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 hover:border-primary hover:text-primary'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-primary' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 pb-4 border-b">
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
                <span className="font-bold text-lg text-secondary">{tour.rating}</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-primary hover:underline font-medium"
                >
                  ({tour.reviews} reviews)
                </button>
              </div>
            </div>

            {/* Info Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden" data-aos="fade-up">
              {/* Tab Navigation */}
              <div className="flex border-b overflow-x-auto">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'itinerary', label: 'Itinerary' },
                  { id: 'inclusions', label: 'Inclusions' },
                  { id: 'requirements', label: 'Requirements' },
                  { id: 'reviews', label: 'Reviews' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 font-semibold whitespace-nowrap transition-all ${
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
              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-4">About This Tour</h3>
                      <div className="prose prose-lg max-w-none text-text-light">
                        {details.fullDescription.split('\n\n').map((para, idx) => (
                          <p key={idx} className="mb-4">{para}</p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-4">Tour Highlights</h3>
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
                        Meeting Point & Time
                      </h3>
                      <div className="space-y-2 text-text-light">
                        <p><strong>Location:</strong> {details.meetingPoint}</p>
                        <p><strong>Time:</strong> {details.meetingTime}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Itinerary Tab */}
                {activeTab === 'itinerary' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-secondary mb-4">Day by Day Itinerary</h3>
                    {details.itinerary.map((day) => (
                      <div key={day.day} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleDay(day.day)}
                          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary text-secondary rounded-full flex items-center justify-center font-bold text-lg">
                              {day.day}
                            </div>
                            <div className="text-left">
                              <h4 className="font-bold text-secondary">Day {day.day}</h4>
                              <p className="text-sm text-text-light">{day.title}</p>
                            </div>
                          </div>
                          {expandedDays.includes(day.day) ? (
                            <ChevronUp className="w-6 h-6 text-text-light" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-text-light" />
                          )}
                        </button>

                        {expandedDays.includes(day.day) && (
                          <div className="p-6 bg-gray-50 border-t space-y-4">
                            {/* Activities Timeline */}
                            <div className="space-y-3">
                              {day.activities.map((activity, idx) => (
                                <div key={idx} className="flex gap-3">
                                  <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-semibold">
                                      {activity.time}
                                    </div>
                                    {idx < day.activities.length - 1 && (
                                      <div className="w-0.5 h-8 bg-gray-300"></div>
                                    )}
                                  </div>
                                  <p className="text-text-light pt-2 flex-1">{activity.description}</p>
                                </div>
                              ))}
                            </div>

                            {/* Meals & Accommodation */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                              <div className="flex items-center gap-2 text-text-light">
                                <div className="text-2xl">🍽️</div>
                                <div>
                                  <p className="text-xs text-text-light/60 font-semibold uppercase">Meals</p>
                                  <p className="font-medium">{day.meals.join(', ')}</p>
                                </div>
                              </div>
                              {day.accommodation && (
                                <div className="flex items-center gap-2 text-text-light">
                                  <div className="text-2xl">🏨</div>
                                  <div>
                                    <p className="text-xs text-text-light/60 font-semibold uppercase">Accommodation</p>
                                    <p className="font-medium">{day.accommodation}</p>
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
                        What's Included
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
                        What's Not Included
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
                          Age Requirement
                        </h4>
                        <p className="text-text-light">{details.requirements.age}</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-xl">
                        <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                          <Users className="w-5 h-5 text-green-600" />
                          Fitness Level
                        </h4>
                        <p className="text-text-light">{details.requirements.fitness}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-secondary mb-3">What to Bring</h4>
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
                        Dress Code
                      </h4>
                      <p className="text-text-light">{details.requirements.dressCode}</p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-xl">
                      <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        Health Notice
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
                        <p className="text-text-light">{details.reviewStats.total} reviews</p>
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
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-sm">Helpful ({review.helpful})</span>
                          </button>
                        </div>
                      ))}
                    </div>

                    <button className="w-full py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors">
                      Write a Review
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
                  <p className="text-sm text-text-light mb-2">From</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">${tour.priceUSD}</span>
                    <span className="text-lg text-text-light line-through">
                      ${Math.round(tour.priceUSD * 1.3)}
                    </span>
                  </div>
                  <p className="text-sm text-text-light">per person</p>
                </div>

                {/* Date Selector */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-secondary mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Select Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  >
                    <option value="">Choose departure date</option>
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
                    <span className="text-sm font-semibold text-secondary">Adults</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 border-2 border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
                      >
                        <Minus className="w-4 h-4 mx-auto" />
                      </button>
                      <span className="text-lg font-bold text-secondary w-8 text-center">{adults}</span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 border-2 border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
                      >
                        <Plus className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-secondary">Children</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 border-2 border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
                      >
                        <Minus className="w-4 h-4 mx-auto" />
                      </button>
                      <span className="text-lg font-bold text-secondary w-8 text-center">{children}</span>
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 border-2 border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
                      >
                        <Plus className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-light">Subtotal</span>
                    <span className="text-2xl font-bold text-secondary">${subtotal.toFixed(2)}</span>
                  </div>
                  {children > 0 && (
                    <p className="text-xs text-text-light">
                      ({adults} adults × ${tour.priceUSD} + {children} children × ${childPrice.toFixed(2)})
                    </p>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link
                    to={`/booking?tour=${tour.id}&adults=${adults}&children=${children}&date=${selectedDate}`}
                    className="block w-full bg-primary hover:bg-primary-light text-secondary font-bold py-4 rounded-xl text-center transition-all transform hover:scale-105 shadow-lg"
                  >
                    Book Now
                  </Link>
                  <Link
                    to="/booking"
                    className="block w-full border-2 border-secondary text-secondary font-semibold py-3 rounded-xl text-center hover:bg-secondary hover:text-white transition-all"
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Trust Elements */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <RotateCcw className="w-4 h-4 text-primary" />
                    <span>Free cancellation up to 7 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>Secure payment</span>
                  </div>
                </div>
              </div>

              {/* Availability Alert */}
              {tour.availability <= 10 && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-pulse">
                  <p className="text-sm font-semibold text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Only {tour.availability} slots left!
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
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <img
            src={details.gallery[selectedImage]}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain"
          />

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {selectedImage + 1} / {details.gallery.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default TourDetail;
