import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import "./Header.css";
import FloatingP from './FloatingP';

const Header = () => {
  const cardRef = useRef();

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Smooth 3D tilt effect
    const rotateX = (y - 0.5) * -20; 
    const rotateY = (x - 0.5) * 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  useEffect(() => {
    const typed = new Typed(".auto", {
      strings: ["Full Stack Developer", "UI/UX Specialist", "React Expert"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    });
    return () => { typed.destroy(); };
  }, []);

  return (
    <section className='head1'>
      <div className="bg-blur-1"></div>
      <div className="bg-blur-2"></div>
      <FloatingP />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="content"
      >
        <div className="badge">Available for Hire</div>
        <h1 className="hero-title">
          Crafting <span className="gradient-text">Digital</span> <br /> 
          Masterpieces
        </h1>
        
        <h2 className="hero-subtitle">
          Hi, I'm <span className="name-highlight">Ali Shair</span>. <br />
          <span className='auto'></span>
        </h2>
        
        <p className="hero-desc">
          I build high-performance, visually stunning web applications. 
          Turning complex problems into elegant, user-centric solutions.
        </p>
        
        <div className="btn-group">
          <motion.a whileHover={{ y: -5 }} href="#contact" className="btn-primary">
            Start a Project
          </motion.a>
          <motion.a whileHover={{ y: -5 }} href="#work" className="btn-secondary">
            View Work
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="image-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="glass-card">
          <img src="/Futuristic 3D UI design concept.png" alt="Portfolio UI" />
          <div className="card-overlay"></div>
        </div>
      </motion.div>
    </section>
  );
}

export default Header;