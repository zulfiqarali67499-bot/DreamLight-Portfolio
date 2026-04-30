import React, { useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import './Footer.css'; 

const UltraFooter = () => {
  const [isHovered, setIsHovered] = useState(null);
  const { scrollYProgress } = useScroll();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Github', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Twitter', url: '#' },
    { name: 'Instagram', url: '#' }
  ];

  return (
    <footer className="footer-container">
      <div className="footer-glow" />

      <div className="footer-main">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="footer-grid"
        >
          {/* Brand Section */}
          <div className="brand-section">
            <motion.h2 
              whileHover={{ letterSpacing: "5px" }}
              className="footer-logo"
            >
              DREAMLIGHT
            </motion.h2>
            <p className="footer-tagline">
              Architecting seamless Full Stack solutions with a touch of modern design.
            </p>
          </div>

          {/* Social Links */}
          <div className="footer-links">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
                whileHover={{ y: -5 }}
                className="f-link"
                style={{
                  color: isHovered === index ? 'white' : '#8892b0',
                  textShadow: isHovered === index ? '0 0 15px #2d2d83' : 'none'
                }}
              >
                {link.name}
                {isHovered === index && (
                  <motion.div layoutId="underline" className="f-underline" />
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div className="footer-bottom">
          <p>© 2026 DESIGNED BY ALI SHAIR</p>
          <div className="f-status">
            <motion.span 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="f-dot"
            ></motion.span> 
            Available for Freelance
          </div>
        </div>
      </div>

      {/* Floating Scroll Button */}
      <motion.div 
        className="scroll-btn"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={scrollToTop}
      >
        <svg width="50" height="50" viewBox="0 0 60 60">
          <motion.circle
            cx="30" cy="30" r="28"
            stroke="#2d2d83"
            strokeWidth="3"
            fill="transparent"
            style={{ 
              pathLength: scrollYProgress, 
              rotate: -90, 
              originX: "50%", 
              originY: "50%" 
            }}
          />
          <path d="M22 34L30 26L38 34" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
    </footer>
  );
};

export default UltraFooter;