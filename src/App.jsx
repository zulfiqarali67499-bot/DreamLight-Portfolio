import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
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
import Blog from './component/Blog';
import BlogDetails from './component/BlogDetails';

// Pages (Naye pages jo aapne banaye hain)
// Agar aapne alag files nahi banayi, to aap current components ko hi use kar sakte hain
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app-wrapper" style={{ background: '#000', minHeight: '100vh', position: 'relative' }}>
        
        {/* 1. Loader */}
        <AnimatePresence mode="wait">
          {loading && <PreLoader key="loader" />}
        </AnimatePresence>
        
        {/* 2. Particles (Sirf Loading ke baad) */}
        {!loading && <FloatingP />} 
        
        {/* 3. Main Routing Content */}
        {!loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <Navbar />
            
            <Routes>
              {/* Home Page: Saare main sections yahan dikhenge */}
              <Route path="/" element={
                <>
                  <Header />
                  <Card />
                  <Silde />
                  <About />
                  <Slider />
                  <Form />
                </>
              } />

              {/* Individual Pages (User direct bhi ja sakta hai) */}
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Card />} /> {/* Cards ko as a service use kar sakte hain */}
              <Route path="/contact" element={<Form />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
            </Routes>

            <Footer />
          </motion.div>
        )}
      </div>
    </Router>
  );
}

export default App;