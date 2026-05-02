import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './UniversalCTA.css';

const UniversalCTA = () => {
  const location = useLocation();
  const containerRef = useRef(null);

  // Mouse Tracking with Spring Physics for "Liquid" Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const getPageName = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return 'Dream'; // Default for Home if somehow called
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const spotlightBackground = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(168, 85, 247, 0.12), transparent 80%)`
  );

  return (
    <section 
      className="elite-cta-section" 
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* Interactive Spotlight Layer - Smoother Movement */}
      <motion.div 
        className="spotlight-overlay"
        style={{ background: spotlightBackground }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="elite-content-wrapper"
      >
        {/* Modern Location Tag with Pulse Effect */}
        <div className="elite-badge">
          <span className="live-status"></span>
          <p>Currently on /{getPageName()}</p>
        </div>

        <h2 className="elite-heading">
          Elevate your <span className="text-shimmer">{getPageName()}</span> <br /> 
          into a <span className="gradient-highlight">Digital Masterpiece.</span>
        </h2>

        <p className="elite-lead">
          We don’t just build websites; we architect high-performance digital 
          assets that demand attention and drive results.
        </p>

        <div className="elite-action-group">
          {/* ELITE BUTTON: With Magnetic Hover Vibe */}
          <motion.button 
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.25)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="prime-btn"
            onClick={() => window.location.href = 'mailto:your-email@example.com'}
          >
            <span>Secure a Consultation</span>
            <motion.svg 
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </motion.svg>
          </motion.button>
          
          <p className="availability-note">Limited availability for Q3 2026</p>
        </div>
      </motion.div>

      {/* Background Architectural Elements */}
      <div className="grid-overlay"></div>
    </section>
  );
};

export default UniversalCTA;