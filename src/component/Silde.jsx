import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Slide.css";

const Slide = () => {
  const stats = [
    { target: 3, suffix: "+", label: "Years in Tech", sub: "Continuous Innovation", color: "#3b82f6" },
    { target: 45, suffix: "+", label: "Global Projects", sub: "High-end Solutions", color: "#8b5cf6" },
    { target: 100, suffix: "%", label: "Commitment", sub: "Quality Guaranteed", color: "#10b981" },
  ];

  return (
    <section className="data-hub-section">
      <div className="hub-container">
        <div className="hub-grid">
          {stats.map((stat, i) => (
            <StatWidget key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatWidget = ({ stat, index }) => {
  const [displayCount, setDisplayCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = stat.target;
      const duration = 2000; // 2 Seconds animation
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayCount(end);
          clearInterval(timer);
        } else {
          setDisplayCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, stat.target]);

  return (
    <motion.div 
      ref={ref}
      className="hub-widget"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
    >
      <div className="widget-top">
        <span className="widget-id">0{index + 1}</span>
        <div className="status-dot" style={{ background: stat.color, boxShadow: `0 0 15px ${stat.color}` }}></div>
      </div>

      <div className="widget-main">
        <h3 className="widget-number">{displayCount}{stat.suffix}</h3>
        <p className="widget-label">{stat.label}</p>
        <span className="widget-sub">{stat.sub}</span>
      </div>

      <div className="progress-track">
        <motion.div 
          className="progress-fill" 
          style={{ background: stat.color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ duration: 2.2, ease: "circOut" }}
        />
      </div>
    </motion.div>
  );
};

export default Slide;