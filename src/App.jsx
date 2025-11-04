import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Booking from './pages/Booking';
import About from './pages/About';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';
import LoadingBar from './components/common/LoadingBar';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    // Initialize AOS globally
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
    });
  }, []);

  return (
    <Router>
      <LoadingBar />
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
    </Router>
  );
}

export default App;
