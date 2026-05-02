import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll lock for better UX
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Service', path: '/services' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <nav className={`premium-nav ${scrolled ? "active" : ""} ${isOpen ? "menu-is-open" : ""}`}>
      <div className="nav-inner">
        
        {/* --- PROFESSIONAL ARCHITECTURAL LOGO --- */}
        <NavLink to="/" className="nav-brand" onClick={() => setIsOpen(false)}>
          <div className="brand-wrapper">
            <div className="logo-symbol">
              <svg viewBox="0 0 40 40" className="symbol-svg">
                <rect className="rect-main" x="5" y="5" width="30" height="30" rx="8" />
                <circle className="circle-inner" cx="20" cy="20" r="6" />
                <path className="accent-line" d="M30 10 L10 30" />
              </svg>
            </div>
            <div className="brand-typography">
              <span className="brand-main">DREAM</span>
              <span className="brand-sub">LIGHT</span>
              <div className="brand-underline"></div>
            </div>
          </div>
        </NavLink>

        {/* --- DESKTOP DOCK (FIXED LOGIC) --- */}
        <div className="desktop-dock-wrapper">
          <LayoutGroup>
            <ul className="desktop-dock">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `dock-item ${isActive ? "active" : ""}`}
                  >
                    {({ isActive }) => (
                      <>
                        <span className="dock-label">{item.name}</span>
                        {isActive && (
                          <motion.div 
                            layoutId="active-pill"
                            className="active-pill"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </LayoutGroup>
        </div>

        {/* --- NAV ACTIONS --- */}
        <div className="nav-end">
          <button className="get-started-btn desktop-only">GET STARTED</button>
          <div className={`hamburger-box ${isOpen ? "is-open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </div>

      {/* --- MOBILE OVERLAY SHEET --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-overlay"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mobile-sheet"
            >
              <div className="mobile-links">
                {navLinks.map((item, i) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <NavLink 
                      to={item.path} 
                      onClick={() => setIsOpen(false)} 
                      className={({ isActive }) => `m-link ${isActive ? "m-active" : ""}`}
                    >
                      <span className="m-num">0{i + 1}</span>
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;