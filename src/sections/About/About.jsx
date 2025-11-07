//import { useEffect, useRef, useState } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import useCounterAnimation from '../../hooks/useCounterAnimation';
import styles from './About.module.css';

const About = () => {
    const [ref, isVisible] = useScrollAnimation();
    const projectsCount = useCounterAnimation(50, 2000, isVisible);
    const yearsCount = useCounterAnimation(5, 2000, isVisible);
    const clientsCount = useCounterAnimation(30, 2000, isVisible);

    return (
        <section 
            className={`${styles.about} ${isVisible ? 'visible' : ''}`} 
            id="about" 
            ref={ref}
        >
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">About Me</h2>
                    <div className="title-underline" />
                </div>
                <div className={styles.aboutContent}>
                    <div className={styles.aboutImage}>
                        <div className={styles.aboutImageWrapper}>
                            <img 
                                src="https://via.placeholder.com/500x600/FF0000/FFFFFF?text=Professional+Photo" 
                                alt="About Me" 
                            />
                            <div className={styles.imageOverlay} />
                        </div>
                    </div>
                    <div className={styles.aboutText}>
                        <h3 className={styles.aboutSubtitle}>
                            Full-Stack Developer & Problem Solver
                        </h3>
                        <p className={styles.aboutDescription}>
                            I'm a passionate full-stack developer with over 5 years of experience building web applications 
                            that solve real-world problems. My expertise spans across modern frontend frameworks, robust backend 
                            systems, and cloud infrastructure.
                        </p>
                        <p className={styles.aboutDescription}>
                            I believe in writing clean, maintainable code and creating intuitive user experiences. 
                            Whether it's architecting scalable microservices or crafting pixel-perfect interfaces, 
                            I bring dedication and creativity to every project.
                        </p>
                        <div className={styles.aboutStats}>
                            <div className={styles.statItem}>
                                <h4 className={styles.statNumber}>{projectsCount}+</h4>
                                <p className={styles.statLabel}>Projects Completed</p>
                            </div>
                            <div className={styles.statItem}>
                                <h4 className={styles.statNumber}>{yearsCount}+</h4>
                                <p className={styles.statLabel}>Years Experience</p>
                            </div>
                            <div className={styles.statItem}>
                                <h4 className={styles.statNumber}>{clientsCount}+</h4>
                                <p className={styles.statLabel}>Happy Clients</p>
                            </div>
                        </div>
                        <a href="#contact" className={`${styles.btn} ${styles.btnPrimary}`}>
                            Get In Touch
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;