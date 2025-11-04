import { useState, useRef, useEffect } from 'react';

/**
 * Optimized Image Component with:
 * - Lazy loading
 * - WebP support with fallback
 * - Responsive images (srcSet)
 * - Blur placeholder
 * - Intersection Observer
 */
function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  sizes,
  priority = false,
  placeholder = true,
  onLoad,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  // Generate WebP URL (if using Unsplash, it auto-converts)
  const getWebPUrl = (url) => {
    if (!url) return '';
    // For Unsplash images, add fm=webp parameter
    if (url.includes('unsplash.com')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}fm=webp&q=80`;
    }
    return url;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (url) => {
    if (!url || !url.includes('unsplash.com')) return undefined;

    const widths = [400, 800, 1200, 1600];
    return widths
      .map((w) => `${url}&w=${w}&fm=webp&q=80 ${w}w`)
      .join(', ');
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {placeholder && !isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      )}

      {/* Actual image - only render when in view */}
      {isInView && (
        <picture>
          {/* WebP source */}
          <source
            type="image/webp"
            srcSet={generateSrcSet(src) || getWebPUrl(src)}
            sizes={sizes}
          />

          {/* Fallback to original format */}
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            width={width}
            height={height}
            {...props}
          />
        </picture>
      )}
    </div>
  );
}

export default OptimizedImage;
