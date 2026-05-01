import React from 'react';
import { motion } from 'framer-motion';
import './UniversalCTA.css';

const UniversalCTA = () => {
  // Container animation logic
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Har element ke darmiyan gap
        delayChildren: 0.3,
      },
    },
  };

  // Elements animation logic
  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <div className="universal-cta-container">
      {/* Dynamic Background Blurs */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="cta-glow-element top-left"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="cta-glow-element bottom-right"
      ></motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // Scroll animation trigger
        viewport={{ once: true, amount: 0.3 }} // 30% section nazar aane par start hoga
        className="cta-content-box"
      >
        <motion.span variants={itemVariants} className="cta-subtitle">
          Available for new opportunities
        </motion.span>
        
        <motion.h2 variants={itemVariants} className="cta-heading">
          Let’s build something <span className="gradient-text">extraordinary</span> together.
        </motion.h2>
        
        <motion.p variants={itemVariants} className="cta-description">
          Whether you have a fully-fledged idea or a small spark of inspiration, 
          let’s turn it into a high-performance digital reality.
        </motion.p>

        <motion.div variants={itemVariants} className="cta-button-wrapper">
          <motion.button 
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 40px rgba(0, 223, 216, 0.3)',
              backgroundColor: '#f0f0f0' 
            }}
            whileTap={{ scale: 0.95 }}
            className="cta-main-btn"
            onClick={() => window.location.href = 'mailto:ali@example.com'}
          >
            Start a Conversation
            <span className="btn-arrow">→</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UniversalCTA;