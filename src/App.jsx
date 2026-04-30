import React, { useState, useEffect } from 'react';
import Navbar from './component/Navbar';
import Header from './component/Header';
import Card from './component/Card';
import About from './component/About';
import Slider from './component/Slider';
import Silde from './component/Silde';
import Form from './component/Form';
import Footer from './component/Footer';
import FloatingP from './component/FloatingP'; 
import PreLoader from './component/PreLoader';
import { motion, AnimatePresence } from 'framer-motion';
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Forcefully loader ko 3 seconds baad khatam karein
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-wrapper" style={{ background: '#000', minHeight: '100vh', position: 'relative' }}>
      
      {/* 1. Loader Sabse Upar */}
     <AnimatePresence mode="wait">
  {loading && <PreLoader key="loader" />}
</AnimatePresence>
      
      {/* 2. Particles sirf tab jab loading khatam ho (Performance ke liye) */}
      {!loading && <FloatingP />} 
      
      {/* 3. Main Content - Iska z-index check karein */}
      <div style={{ 
        display: loading ? 'none' : 'block',
        position: 'relative',
        zIndex: 10 
      }}>
        <Navbar />
        <Header />
        <Card />
        <Silde />
        <About />
        <Slider />
        <Form />
        <Footer />
      </div>
    </div>
  );
}

export default App;