/**
 * Performance Optimization Utilities
 */

/**
 * Debounce function - delays execution until after wait time has elapsed
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function - ensures function runs at most once per interval
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit = 100) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Lazy load images using Intersection Observer
 * @param {string} selector - CSS selector for images
 */
export function lazyLoadImages(selector = 'img[data-src]') {
  const images = document.querySelectorAll(selector);

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

/**
 * Preload critical resources
 * @param {Array} resources - Array of resource URLs
 * @param {string} type - Resource type (image, script, style, font)
 */
export function preloadResources(resources, type = 'image') {
  resources.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = type;
    link.href = url;
    if (type === 'font') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
}

/**
 * Measure and log performance metrics (only when needed)
 * Pass callback to receive metrics without console logging
 */
export function measurePerformance(callback = null) {
  if (!window.performance) return;

  // Wait for page to be fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      const metrics = {
        pageLoadTime,
        connectTime,
        renderTime,
      };

      // Only log if no callback provided (for debugging)
      if (!callback && import.meta.env.DEV) {
        // Minimal logging in dev mode
        // Remove this block in production
      }

      // Call callback with metrics if provided
      if (callback) {
        callback(metrics);
      }

      // Web Vitals tracking without logging
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (callback) {
            callback({ lcp: lastEntry.renderTime || lastEntry.loadTime });
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (callback) {
              callback({ fid: entry.processingStart - entry.startTime });
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      }
    }, 0);
  });
}

/**
 * Cache data in localStorage with expiry
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 * @param {number} expiryMinutes - Expiry time in minutes
 */
export function cacheData(key, data, expiryMinutes = 60) {
  const item = {
    value: data,
    expiry: new Date().getTime() + expiryMinutes * 60 * 1000,
  };
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    // Silently fail if localStorage is unavailable
    return false;
  }
  return true;
}

/**
 * Get cached data from localStorage
 * @param {string} key - Storage key
 * @returns {any|null} Cached data or null if expired/not found
 */
export function getCachedData(key) {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date().getTime();

    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  } catch (e) {
    return null;
  }
}

/**
 * Clear expired cache items
 */
export function clearExpiredCache() {
  const now = new Date().getTime();
  Object.keys(localStorage).forEach((key) => {
    try {
      const item = JSON.parse(localStorage.getItem(key));
      if (item && item.expiry && now > item.expiry) {
        localStorage.removeItem(key);
      }
    } catch (e) {
      // Skip non-JSON items
    }
  });
}

/**
 * Prefetch DNS for external domains
 * @param {Array} domains - Array of domain URLs
 */
export function prefetchDNS(domains) {
  domains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get network information if available
 * @returns {Object|null}
 */
export function getNetworkInfo() {
  if (!navigator.connection) return null;

  return {
    effectiveType: navigator.connection.effectiveType,
    downlink: navigator.connection.downlink,
    rtt: navigator.connection.rtt,
    saveData: navigator.connection.saveData,
  };
}

/**
 * Load script dynamically
 * @param {string} src - Script URL
 * @param {boolean} async - Load asynchronously
 * @returns {Promise}
 */
export function loadScript(src, async = true) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

/**
 * Report Web Vitals to analytics
 * @param {Function} callback - Callback function to receive metrics
 */
export function reportWebVitals(callback) {
  if (!callback || typeof callback !== 'function') return;

  // You can integrate with libraries like web-vitals
  // For now, we'll log the metrics
  if ('PerformanceObserver' in window) {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        callback({ name: 'FCP', value: entry.startTime });
      });
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Time to First Byte
    const navigationTiming = performance.getEntriesByType('navigation')[0];
    if (navigationTiming) {
      callback({
        name: 'TTFB',
        value: navigationTiming.responseStart - navigationTiming.requestStart,
      });
    }
  }
}

export default {
  debounce,
  throttle,
  lazyLoadImages,
  preloadResources,
  measurePerformance,
  cacheData,
  getCachedData,
  clearExpiredCache,
  prefetchDNS,
  prefersReducedMotion,
  getNetworkInfo,
  loadScript,
  reportWebVitals,
};
