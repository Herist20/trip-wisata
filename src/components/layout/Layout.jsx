import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Announce page change to screen readers
    const pageTitle = document.title;
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Navigated to ${pageTitle}`;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to Content Link for Accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-grow pt-20 page-transition" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
