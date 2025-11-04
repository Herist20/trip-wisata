import { useEffect } from 'react';

/**
 * Custom hook to trap focus within a modal or dialog
 * @param {boolean} isActive - Whether the focus trap is active
 * @param {React.RefObject} containerRef - Reference to the container element
 */
function useFocusTrap(isActive, containerRef) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    // Store the element that had focus before opening
    const previouslyFocusedElement = document.activeElement;

    // Get all focusable elements
    const getFocusableElements = () => {
      return container.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
    };

    // Focus first element
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Handle keyboard events
    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // If shift + tab on first element, focus last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // If tab on last element, focus first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Cleanup: restore focus when unmounting
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedElement && previouslyFocusedElement.focus) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isActive, containerRef]);
}

export default useFocusTrap;
