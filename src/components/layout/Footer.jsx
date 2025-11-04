import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle, Clock } from 'lucide-react';
import { contactInfo } from '../../data/mockData';

function Footer() {
  const currentYear = new Date().getFullYear();

  const popularTours = [
    { name: 'Bali Paradise Tour', id: 1 },
    { name: 'Bromo Sunrise Adventure', id: 2 },
    { name: 'Komodo Island Expedition', id: 3 },
    { name: 'Raja Ampat Diving', id: 4 },
    { name: 'Yogyakarta Heritage', id: 5 },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-secondary via-secondary-dark to-[#012540] text-white">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Column 1: Brand & Social */}
          <div className="space-y-5">
            {/* Logo & Tagline */}
            <div>
              <Link to="/" className="inline-block group">
                <h3 className="text-2xl font-bold mb-1">
                  Tour<span className="text-primary">Bali</span>
                </h3>
                <p className="text-sm text-white/70 group-hover:text-primary transition-colors mb-3">
                  Explore the Beauty of Bali
                </p>
                {/* Logo Image */}
                <img
                  src="/images/logo-asita.webp"
                  alt="Tour Bali Logo"
                  className="h-24 w-auto object-contain mt-2 opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </Link>
            </div>

            {/* Description */}
            <p className="text-sm text-white/80 leading-relaxed">
              Mitra terpercaya untuk perjalanan wisata impian Anda di seluruh Indonesia dengan
              layanan terbaik dan harga terjangkau.
            </p>

            {/* Social Media Icons */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-white/90">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href={contactInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/10 hover:bg-primary p-2.5 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 group-hover:text-secondary transition-colors" />
                </a>
                <a
                  href={contactInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/10 hover:bg-primary p-2.5 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 group-hover:text-secondary transition-colors" />
                </a>
                <a
                  href={contactInfo.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/10 hover:bg-primary p-2.5 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 group-hover:text-secondary transition-colors" />
                </a>
                <a
                  href={contactInfo.social.email}
                  className="group bg-white/10 hover:bg-primary p-2.5 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 group-hover:text-secondary transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-white/80 hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tours"
                  className="text-white/80 hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="text-white/80 hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
                  Booking
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-white/80 hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/80 hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link
                  to="/terms"
                  className="text-white/80 hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-white/80 hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Tours */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold text-white">Popular Tours</h4>
            <ul className="space-y-3">
              {popularTours.map((tour) => (
                <li key={tour.id}>
                  <Link
                    to="/tours"
                    className="text-white/80 hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300"></span>
                    {tour.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                to="/tours"
                className="inline-flex items-center text-primary hover:text-primary-light text-sm font-semibold group"
              >
                View All Tours
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white/60 text-xs mb-1">Office Address</p>
                  <span className="text-white/80 text-sm leading-relaxed">{contactInfo.address}</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white/60 text-xs mb-1">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-white/80 hover:text-primary transition-colors text-sm"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white/60 text-xs mb-1">Phone</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-white/80 hover:text-primary transition-colors text-sm"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white/60 text-xs mb-1">WhatsApp</p>
                  <a
                    href={contactInfo.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-primary transition-colors text-sm"
                  >
                    {contactInfo.whatsapp}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white/60 text-xs mb-1">Working Hours</p>
                  <span className="text-white/80 text-sm">{contactInfo.workingHours}</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-white/70">
              &copy; {currentYear} <span className="text-white font-semibold">Tour Bali</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-white/70">
              <span>Made with</span>
              <span className="text-primary text-lg">♥</span>
              <span>in Bali</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
