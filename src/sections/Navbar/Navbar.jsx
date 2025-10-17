import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

const SECTIONS = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

const Navbar = () => { 
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');
    const navMenuRef = useRef(null);
    const mobileToggleRef = useRef(null);

    // Handle scroll to change navbar style With debouncing for better performance
    useEffect(() => {
        let timeOutId;

        const handleScroll = () => {
            clearTimeout(timeOutId);
            timeOutId = setTimeout(() => {
                // ScrollY replaces pageYOffset in modern design
                setIsScrolled(window.scrollY > 100);

                // Determine active section and Update based on scroll position
                const current = SECTIONS.find(section => {
                    const element = document.getElementById(section.toLowerCase());
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        return rect.top <= 200 && rect.bottom >= 200;
                    }
                    return false;
                });

                if (current) {
                    setActiveSection(current);
                }
            }, 10); // Debounce delay
        };

        // We will use passive listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            clearTimeout(timeOutId);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Mobile menu toggle handler in order to close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navMenuRef.current && !navMenuRef.current.contains(e.target) &&
                mobileToggleRef.current && !mobileToggleRef.current.contains(e.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close mobile menu on escape key press
    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };
        
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMobileMenuOpen]);

        const handleNavClick = (sectionID) => {
            setIsMobileMenuOpen(false);
            const section = document.getElementById(sectionID.toLowerCase());
            if (section) {
                const navbarHeight = 80;
                const elementPosition = section.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        };

        return (
                    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.navContainer}>
                <div className={styles.navLogo}>
                    <span className={styles.logoText}>
                        &lt;Dev<span className={styles.highlight}>/&gt;</span>
                    </span>
                </div>
                
                <ul 
                    ref={navMenuRef}
                    className={`${styles.navMenu} ${isMobileMenuOpen ? styles.active : ''}`}
                >
                    {SECTIONS.map(section => (
                        <li key={section} className={styles.navItem}>
                            <a
                                href={`#${section}`}
                                className={`${styles.navLink} ${activeSection === section ? styles.activeLink : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(section);
                                }}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className={styles.navActions}>
                    {/* Theme toggle will be added when ThemeContext is ready */}
                    {/* <button
                        className={styles.themeToggle}
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
                    </button> */}
                    <button
                        ref={mobileToggleRef}
                        className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.active : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;