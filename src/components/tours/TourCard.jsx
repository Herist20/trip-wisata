import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, ArrowRight, CheckCircle, Calendar, Users, Eye } from 'lucide-react';
import { useState } from 'react';

function TourCard({ tour, onQuickView }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
      data-aos="fade-up"
    >
      {/* Image with Overlay Gradient */}
      <div className="relative h-72 overflow-hidden">
        {/* Skeleton Loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        )}

        <img
          src={tour.image}
          alt={tour.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Badge (Best Seller / New) */}
        {tour.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-primary text-secondary font-bold px-4 py-1.5 rounded-full text-sm shadow-lg">
              {tour.badge}
            </span>
          </div>
        )}

        {/* Duration & Availability Badge */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4 text-secondary" />
            <span className="text-sm font-semibold text-secondary">{tour.durationShort}</span>
          </div>
          {tour.availability <= 10 && (
            <div className="flex items-center gap-2 bg-red-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Users className="w-4 h-4 text-white" />
              <span className="text-xs font-semibold text-white">{tour.availability} slots left</span>
            </div>
          )}
        </div>

        {/* Location Overlay at Bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-white font-medium text-sm">{tour.destination}</span>
          </div>
        </div>

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView && onQuickView(tour)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white hover:bg-primary text-secondary hover:text-white px-6 py-3 rounded-full font-semibold shadow-xl flex items-center gap-2 z-20"
        >
          <Eye className="w-5 h-5" />
          Quick View
        </button>
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

        {/* Departure Dates */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-secondary uppercase">Next Departures</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tour.departureDates.slice(0, 3).map((date, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-100 text-secondary px-3 py-1 rounded-full font-medium"
              >
                {formatDate(date)}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5"></div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-text-light mb-1">Starting from</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">${tour.priceUSD}</span>
              <span className="text-sm text-text-light line-through">
                ${Math.round(tour.priceUSD * 1.3)}
              </span>
            </div>
            <p className="text-xs text-text-light mt-1">per person</p>
          </div>

          <Link
            to={`/tours/${tour.id}`}
            className="group/btn bg-secondary hover:bg-primary text-white hover:text-secondary font-semibold px-5 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <span className="flex items-center gap-2">
              View Details
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
