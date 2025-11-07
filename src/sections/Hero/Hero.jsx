import React, { useEffect, useRef } from 'react';
import useTypingEffect from '../../hooks/typingEffectAnimation.js';
import styles from './Hero.module.css';

// Constants
const PARTICLE_COUNT = 50;
const SCROLL_OFFSET = 80;
const TYPING_SPEED = 100;
const TYPING_PAUSE = 2000;
const DEVELOPER_NAME = "Emmanuel Binen";
const DEVELOPER_EMAIL = "emmanuelbinen@outlook.com";

const TYPING_ROLES = [
    'Full-Stack Developer',
    'Frontend Specialist',
    'Backend Engineer',
    'UI/UX Enthusiast',
    'Problem Solver'
];

const SOCIAL_LINKS = [
    { href: 'https://github.com/Emmanuelbinen', icon: 'fab fa-github', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/emmanuelbinen/', icon: 'fab fa-linkedin', label: 'LinkedIn' },
    { href: 'https://twitter.com/yourusername', icon: 'fab fa-twitter', label: 'Twitter' },
    { href: `mailto:${DEVELOPER_EMAIL}`, icon: 'fas fa-envelope', label: 'Email' }
];

const Hero = () => {
    const particlesRef = useRef(null);
    const typingText = useTypingEffect(TYPING_ROLES, TYPING_SPEED, TYPING_PAUSE);

    // Initialize particles animation
    useEffect(() => {
        const particlesContainer = particlesRef.current;
        if (!particlesContainer) return;

        const fragment = document.createDocumentFragment();

        // Create particles with random properties
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = document.createElement('div');
            particle.className = styles.particle;
            
            const size = Math.random() * 100 + 50;
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            Object.assign(particle.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${startX}px`,
                top: `${startY}px`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`
            });
            
            fragment.appendChild(particle);
        }

        particlesContainer.appendChild(fragment);

        // Cleanup on unmount
        return () => {
            particlesContainer.innerHTML = '';
        };
    }, []);

    // Smooth scroll to about section
    const handleScrollDown = (e) => {
        e.preventDefault();
        const aboutSection = document.getElementById('about');
        
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - SCROLL_OFFSET;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={styles.hero} id="home">
            {/* Animated background particles */}
            <div className={styles.heroBackground}>
                <div className={styles.particles} ref={particlesRef} />
            </div>

            {/* Main hero content */}
            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <h1 className={styles.heroTitle}>
                        <span className={styles.greeting}>Hi, I'm</span>
                        <span className={styles.name}>{DEVELOPER_NAME}</span>
                    </h1>
                    
                    <h2 className={styles.heroSubtitle}>
                        <span className={styles.typingText}>{typingText}</span>
                        <span className={styles.cursor}>|</span>
                    </h2>
                    
                    <p className={styles.heroDescription}>
                        Crafting exceptional digital experiences with modern technologies and AI.
                        <br />
                        Building scalable, user-centric applications that solve real-world problems.
                    </p>

                    {/* Call-to-action buttons */}
                    <div className={styles.heroButtons}>
                        <a 
                            href="#projects" 
                            className={`${styles.btn} ${styles.btnPrimary}`}
                        >
                            <i className="fas fa-code"></i> View Projects
                        </a>
                        <a 
                            href="https://drive.google.com/file/d/YOUR_GOOGLE_DRIVE_FILE_ID/view" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`${styles.btn} ${styles.btnSecondary}`}
                        >
                            <i className="fas fa-file-pdf"></i> View Resume
                        </a>
                    </div>

                    {/* Social media links */}
                    <div className={styles.socialLinks}>
                        {SOCIAL_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                aria-label={link.label}
                            >
                                <i className={link.icon}></i>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Profile image */}
                <div className={styles.heroImage}>
                    <div className={styles.imageContainer}>
                        <div className={styles.imageWrapper}>
                            <img 
                                src="https://via.placeholder.com/400x400/FF0000/FFFFFF?text=Your+Photo" 
                                alt={`${DEVELOPER_NAME} - Developer Profile`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className={styles.scrollIndicator}>
                <a 
                    href="#about" 
                    onClick={handleScrollDown} 
                    aria-label="Scroll down to about section"
                >
                    <i className="fas fa-chevron-down"></i>
                </a>
            </div>
        </section>
    );
};

export default Hero;