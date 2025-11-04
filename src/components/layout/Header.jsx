import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll event for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle keyboard navigation for mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }

      // Trap focus within mobile menu
      if (e.key === 'Tab') {
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        if (!mobileMenu) return;

        const focusableElements = mobileMenu.querySelectorAll(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/tours', label: 'Tour Packages' },
    { to: '/booking', label: 'Booking' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About Us' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-secondary/80 backdrop-blur-sm shadow-md'
        }`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group relative z-10"
              aria-label="Tour Bali - Go to homepage"
            >
              <div className="relative">
                <h1 className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                  isScrolled ? 'text-secondary' : 'text-white'
                }`}>
                  Tour<span className={`${isScrolled ? 'text-primary' : 'text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]'}`}>Bali</span>
                </h1>
                <div className={`absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full`} aria-hidden="true"></div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `relative font-semibold transition-all duration-300 group ${
                    isActive
                      ? 'text-primary'
                      : isScrolled
                        ? 'text-secondary hover:text-primary'
                        : 'text-white hover:text-primary'
                  }`}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </>
                  )}
                </NavLink>
              ))}

              {/* CTA Button */}
              <Link
                to="/booking"
                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? 'bg-primary text-secondary hover:bg-primary-dark shadow-md hover:shadow-xl'
                    : 'bg-primary text-secondary hover:bg-primary-light shadow-lg hover:shadow-xl'
                }`}
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 z-50 ${
                isMenuOpen
                  ? 'bg-secondary text-white'
                  : isScrolled
                    ? 'text-secondary hover:bg-secondary/10'
                    : 'text-white hover:bg-white/20'
              }`}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation - Slide from right */}
      <aside
        id="mobile-menu"
        data-mobile-menu
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-secondary">
              Tour<span className="text-primary">Bali</span>
            </h2>
            <button
              onClick={toggleMenu}
              className="p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={toggleMenu}
                  className={({ isActive }) => `block py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-secondary shadow-md'
                      : 'text-text hover:bg-secondary/5 hover:text-primary'
                  }`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile CTA Button */}
            <div className="mt-6 px-4">
              <Link
                to="/booking"
                onClick={toggleMenu}
                className="block w-full py-3 px-6 bg-primary text-secondary text-center font-semibold rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-text-light text-center">
              Explore the beauty of Indonesia
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Header;
