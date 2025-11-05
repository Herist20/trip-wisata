import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import ChatBot from '../common/ChatBot';

function Layout() {
  const location = useLocation();
  const { t } = useTranslation('common');

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
    announcement.textContent = t('aria.navigatedTo', { page: pageTitle });
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to Content Link for Accessibility */}
      <a href="#main-content" className="skip-to-content">
        {t('aria.skipToContent')}
      </a>

      <Header />

      <main id="main-content" className="flex-grow pt-20 page-transition" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}

export default Layout;
