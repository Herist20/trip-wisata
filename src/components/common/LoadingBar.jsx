import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Start loading when route changes
    setLoading(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    // Complete loading after a short delay
    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
    }, 800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100]">
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-primary via-primary-light to-secondary transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            boxShadow: '0 0 10px rgba(255, 214, 10, 0.5)',
          }}
        ></div>
      </div>
    </div>
  );
}

export default LoadingBar;
