import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Slide.css"
const Slide = () => {
  const slides = [
    { target: 3, suffix: "+", h4: "Years of Experience" },
    { target: 10, suffix: "+", h4: "Projects Completed" },
    { target: 5, suffix: "+", h4: "Happy Clients" },
    { target: 100, suffix: "%", h4: "Client Satisfaction" },
  ];

  const [counts, setCounts] = useState(slides.map(() => 0));

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = duration / frameRate;

    const intervals = slides.map((item, index) => {
      const step = item.target / totalFrames;
      let current = 0;

      return setInterval(() => {
        current += step;
        if (current >= item.target) {
          current = item.target;
          clearInterval(intervals[index]);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(current);
          return newCounts;
        });
      }, frameRate);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="head6-container">
      <div className="head6">
        {slides.map((item, index) => (
          <motion.div 
            className="slide" 
            key={index}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <h3>
              {counts[index]}
              {item.suffix}
            </h3>
            <h4>{item.h4}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Slide;