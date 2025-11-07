import { useEffect, useState } from 'react';

/**
 * Custom hook for animating a counter from 0 to a target value
 * @param {number} target - The final value to count up to
 * @param {number} duration - Animation duration in milliseconds (default: 2000ms)
 * @param {boolean} isVisible - Trigger to start the animation
 * @returns {number} - The current animated count value
 */
const useCounterAnimation = (target, duration = 2000, isVisible) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Only start animation when the element becomes visible
        if (!isVisible) return;

        let start = null;
        let animationFrame;

        /**
         * Animation function using requestAnimationFrame for smooth performance
         * @param {number} timestamp - Current animation frame timestamp
         */
        const animate = (timestamp) => {
            // Initialize start time on first frame
            if (!start) start = timestamp;
            
            // Calculate animation progress (0 to 1)
            const progress = timestamp - start;
            
            // Calculate current value based on progress, capped at target
            const value = Math.min(progress / duration, 1) * target;
            setCount(Math.floor(value));

            // Continue animation if we haven't reached the duration
            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        // Start the animation
        animationFrame = requestAnimationFrame(animate);

        // Cleanup function: Cancel animation frame to prevent memory leaks
        // This runs when component unmounts or when dependencies change
        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [target, duration, isVisible]); // Re-run effect when these values change

    return count;
};

export default useCounterAnimation;