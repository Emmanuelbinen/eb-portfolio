import { useRef, useEffect, useState } from 'react';

/**
 * Custom hook that detects when an element becomes visible in the viewport
 * Uses IntersectionObserver API for efficient scroll-based visibility detection
 * 
 * @param {number} threshold - Percentage of element visibility (0-1) before triggering (default: 0.2 = 20%)
 * @param {string} rootMargin - Margin around viewport to trigger earlier/later (default: '0px 0px -100px 0px')
 * @returns {[React.RefObject, boolean]} Tuple of [ref to attach to element, visibility state]
 */
const useScrollAnimation = (threshold = 0.2, rootMargin = '0px 0px -100px 0px') => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        // Create IntersectionObserver to watch when element enters viewport
        const observer = new IntersectionObserver(
            entries => {
                // Loop through all observed elements (typically just one in this case)
                entries.forEach(entry => {
                    // Check if element is intersecting with viewport
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { 
                threshold,    // Element must be X% visible before triggering
                rootMargin    // Adjust viewport bounds (negative = shrink, positive = expand)
            }
        );

        // Store ref in variable for cleanup function
        const currentRef = domRef.current;
        
        // Start observing the element if it exists
        if (currentRef) {
            observer.observe(currentRef);
        }

        // Cleanup: Stop observing when component unmounts or dependencies change
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, rootMargin]); // Re-run if threshold or rootMargin changes

    // Return ref to attach to element and current visibility state
    return [domRef, isVisible];
};

export default useScrollAnimation;