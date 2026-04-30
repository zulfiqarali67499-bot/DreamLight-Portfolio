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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 18; 
    const rotateY = (x - centerX) / 18;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  useEffect(() => {
    const typed = new Typed(".auto", {
      strings: [
        "Full Stack Developer",
        "UI/UX Enthusiast",
        "React.js Specialist",
        "Creative Coder"
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true
    });
    return () => { typed.destroy(); };
  }, []);

  return (
    <section className='head1'>
      {/* Background Layer */}
      <div className="bg-blur-1"></div>
      <div className="bg-blur-2"></div>
      <FloatingP />

      {/* Left Content Section */}
      <motion.div 
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="content"
      >
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Crafting Seamless <br /> Digital Experiences
        </motion.h1>
        
        <h2>
          Hi, I'm <span style={{color: '#fff', fontWeight: '700'}}>Ali Shair</span>. <br />I'm a <br />
          <span className='auto'></span>
        </h2>
        
        <p>
          Expertise in building scalable web applications with a focus on 
          high-end UI/UX and seamless performance. Delivering modern solutions 
          for clients worldwide.
        </p>
        
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#contact"
        >
          Start a Project
        </motion.a>
      </motion.div>

      {/* Right 3D Image Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="image"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img src="/Futuristic 3D UI design concept.png" alt="Ali Shair Portfolio UI" />
        <div className="card-shine"></div>
      </motion.div>
    </section>
  );
}

export default Header;