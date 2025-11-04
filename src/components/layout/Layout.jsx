import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 page-transition">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
