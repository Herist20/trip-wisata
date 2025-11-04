import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';
import LoadingBar from './components/common/LoadingBar';
import { prefetchDNS, clearExpiredCache } from './utils/performance';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Tours = lazy(() => import('./pages/Tours'));
const TourDetail = lazy(() => import('./pages/TourDetail'));
const Booking = lazy(() => import('./pages/Booking'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-secondary font-semibold">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    // Initialize AOS globally
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
    });

    // Prefetch DNS for external domains
    prefetchDNS([
      'https://images.unsplash.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ]);

    // Clear expired cache on app load
    clearExpiredCache();
  }, []);

  return (
    <Router>
      <LoadingBar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tours" element={<Tours />} />
            <Route path="tours/:id" element={<TourDetail />} />
            <Route path="booking" element={<Booking />} />
            <Route path="about" element={<About />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
