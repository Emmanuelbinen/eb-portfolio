import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that creates a typing animation effect cycling through multiple texts
 * 
 * @param {string[]} texts - Array of strings to cycle through
 * @param {number} [speed=100] - Milliseconds per character when typing
 * @param {number} [pauseDuration=2000] - Milliseconds to pause after typing completes
 * @returns {string} The current displayed text with typing effect
 */
const useTypingEffect = (texts, speed = 100, pauseDuration = 2000) => {
  // Current text being displayed to the user
  const [displayText, setDisplayText] = useState('');
  
  // Index of the current text in the texts array
  const [textIndex, setTextIndex] = useState(0);
  
  // Index of the current character being typed/deleted
  const [charIndex, setCharIndex] = useState(0);
  
  // Whether we're currently deleting characters
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Use ref to store timer ID to prevent stale closures
  const timerRef = useRef(null);

  useEffect(() => {
    // Early return if texts array is empty
    if (!texts || texts.length === 0) {
      return;
    }

    const currentText = texts[textIndex] || '';
    
    // Deleting speed is half of typing speed (faster)
    const deletingSpeed = speed / 2;

    /**
     * Main animation logic
     * Handles typing, deleting, and transitioning between texts
     */
    const animate = () => {
      // TYPING MODE: Add characters one by one
      if (!isDeleting && charIndex < currentText.length) {
        timerRef.current = setTimeout(() => {
          setDisplayText((prev) => prev + currentText[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, speed);
      } 
      // DELETING MODE: Remove characters one by one (faster than typing)
      else if (isDeleting && charIndex > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        }, deletingSpeed);
      } 
      // COMPLETED TYPING: Pause before deleting
      else if (!isDeleting && charIndex === currentText.length) {
        timerRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      } 
      // COMPLETED DELETING: Move to next text
      else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        // Loop back to first text after reaching the end
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    };

    animate();

    // Cleanup: Clear timeout on unmount or when dependencies change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [charIndex, isDeleting, textIndex, texts, speed, pauseDuration]);

  return displayText;
};

export default useTypingEffect;