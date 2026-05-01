import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Is list mein 'Home' ka path humne '/' rakha hai aur baqi ka slug banaya hai
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Service', path: '/services' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const menuVariants = {
    closed: { opacity: 0, x: "100%", transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
    opened: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
  };

  const containerVariants = {
    opened: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const linkVariants = {
    opened: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 20 }
  };

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <nav className={`nav ${scrolled ? "active" : ""}`}>
        <div className="nav-container">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="logo"
          >
            <img src="/logo.png" alt="Dreamlight" />
            <h1>Dreamlight</h1>
          </motion.div>

          <ul className="desktop-menu">
            {navLinks.map((item, i) => (
              <motion.li 
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {/* <a> ki jagah NavLink use kiya */}
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
                >
                  {item.name}
                </NavLink>
              </motion.li>
            ))}
          </ul>

          <div className="nav-actions">
            <div className="get desktop-only">
              <button>GET STARTED</button>
            </div>
            <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              variants={menuVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="mobile-menu-overlay"
            >
              <motion.ul variants={containerVariants} className="mobile-links">
                {navLinks.map((item) => (
                  <motion.li key={item.name} variants={linkVariants}>
                    {/* Mobile menu mein NavLink */}
                    <NavLink 
                      to={item.path} 
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => (isActive ? "mobile-item active" : "mobile-item")}
                    >
                      {item.name}
                    </NavLink>
                  </motion.li>
                ))}
                <motion.li variants={linkVariants}>
                  <button className="mobile-get-btn">GET STARTED</button>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default Navbar;