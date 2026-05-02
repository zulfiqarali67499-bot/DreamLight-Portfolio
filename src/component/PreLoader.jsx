import "./PreLoader.css"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PreLoader = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100));
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="elite-portal-wrapper"
      initial={{ opacity: 1 }}
      // Exit Logic: Center Collapse + Blur + Scaling down to zero
      exit={{ 
        scale: 0,
        opacity: 0,
        filter: "blur(20px)",
        transition: { 
          duration: 0.7, 
          ease: [0.76, 0, 0.24, 1] // Professional "In-out" easing
        } 
      }}
    >
      <div className="elite-core">
        <motion.div 
          className="content-gate"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Shiny Elite Text */}
          <h1 className="ultra-shine-text">DREAMLIGHT</h1>

          <div className="status-container">
            <div className="elite-progress-track">
              <motion.div 
                className="elite-progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ ease: "circOut" }}
              />
            </div>
            
            <div className="meta-labels">
              <span className="label-left">CORE_ESTABLISHED</span>
              <span className="percent-indicator">{percent}%</span>
              <span className="label-right">V.2.0.26</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Aura that also collapses */}
      <div className="portal-aura"></div>
    </motion.div>
  );
};

export default PreLoader;