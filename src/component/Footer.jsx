import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';
import './Footer.css'; 

const UltraFooter = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [greeting, setGreeting] = useState("Hello");
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good Morning");
    else if (hours < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const handleScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.4);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  };

  return (
    <footer className="footer-container">
      <div className="noise-overlay" />
      <div className="footer-mesh" />
      
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="liquid-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
        </filter>
      </svg>

      <div className="footer-content">
        <div className="footer-top-row">
          <div className="brand-box">
            <span className="time-greet">{greeting}, you're visiting</span>
            <h2 className="footer-logo">DREAMLIGHT<span>.</span></h2>
            <div className="founder-tag">
               <span className="by">by</span> <span className="name">Ali Shair</span>
            </div>
            <p className="footer-tagline">Crafting premium digital interfaces with high-end animations and cinematic interactions.</p>
          </div>

          <div className="cta-box">
            <p>Ready to level up?</p>
            <a href="mailto:contact@dreamlight.com" className="email-link">Start a Project</a>
          </div>
        </div>

        <div className="footer-middle-row">
          <div className="nav-group">
            <span className="group-label">Expertise</span>
            <div className="links-grid">
              <span className="nav-item">Full Stack Dev</span>
              <span className="nav-item">UI/UX Design</span>
              <span className="nav-item">Motion Graphics</span>
            </div>
          </div>

          <div className="nav-group">
            <span className="group-label">Connect</span>
            <div className="links-grid">
              {['LinkedIn', 'Github', 'Instagram', 'Twitter'].map(item => (
                <a key={item} href="#" className="nav-item">{item}</a>
              ))}
            </div>
          </div>

          <div className="status-group">
            <div className="f-status-pill">
              <motion.span 
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="f-dot"
              />
              <span className="status-text">Taking Commissions 2026</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="legal">
             <span className="bold-white">DREAMLIGHT PORTFOLIO</span>
             <span className="separator">|</span>
             <span>© 2026</span>
          </div>
          <div className="local-time">
            Sialkot, PK — {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScroll && (
          <motion.div 
            className="magnetic-area"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <motion.div 
              className="scroll-btn-elite"
              style={{ x: mouseX, y: mouseY }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="liquid-wrap">
                <svg width="68" height="68" className="progress-svg">
                  <circle cx="34" cy="34" r="31" className="circle-bg" strokeWidth="2" />
                  <motion.circle
                    cx="34" cy="34" r="31"
                    className="progress-bar"
                    strokeWidth="3"
                    style={{ pathLength: smoothProgress }}
                  />
                </svg>
              </div>
              <div className="arrow-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default UltraFooter;