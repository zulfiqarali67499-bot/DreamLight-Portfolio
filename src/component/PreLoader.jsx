import "./PreLoader.css"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PreLoader = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="shine-loader"
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <div className="loader-inner">
        {/* Main Shiny Text */}
        <div className="text-wrapper">
          <motion.h1 
            className="shine-text"
            animate={{ 
              opacity: [0.7, 1, 0.7], // Breathing/Blinking Effect
              scale: [0.98, 1, 0.98] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            DREAMLIGHT
          </motion.h1>
          
          {/* Progress Line with Glow */}
          <div className="progress-container">
            <motion.div 
              className="glow-bar"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <span className="percent-text">{percent}%</span>
        </div>
      </div>

      {/* Decorative background light */}
      <div className="bg-aura"></div>
    </motion.div>
  );
};

export default PreLoader;