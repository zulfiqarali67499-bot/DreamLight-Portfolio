import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// components
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import FloatingP from './component/FloatingP'; 
import PreLoader from './component/PreLoader';
import UniversalCTA from './component/UniversalCTA';
import CustomCursor from './component/CustomCursor';

// FIXED: Home page components are now direct imports to prevent the 2s blank gap
import Header from './component/Header';
import Card from './component/Card';
import About from './component/About';
import Silde from './component/Silde';
import Slider from './component/Slider';
import Form from './component/Form';

// Lazy loading only for secondary pages
const Blog = lazy(() => import('./component/Blog'));
const BlogDetails = lazy(() => import('./component/BlogDetails'));

// Standardized Page Transition
const PageWrapper = ({ children, pageKey }) => (
  <motion.div
    key={pageKey}
    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Loader Logic
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200); // Optimized timing
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Body Scroll & Top Logic
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [loading]);

  return (
    <div className="app-container" style={{ background: '#010101', minHeight: '100vh', width: '100%', position: 'relative' }}>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading ? (
          <PreLoader key="global-loader" />
        ) : (
          <motion.div 
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FloatingP /> 
            <Navbar />
            
            {location.pathname !== "/" && <UniversalCTA />}

            <main style={{ minHeight: '80vh' }}>
              <Suspense fallback={<div style={{ height: '100vh', background: '#010101' }} />}>
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={
                      <PageWrapper pageKey="home">
                        <Header />
                        <Card />
                        <Silde />
                        <About />
                        <Slider />
                        <Form />
                      </PageWrapper>
                    } />
                    <Route path="/about" element={<PageWrapper pageKey="about"><About /></PageWrapper>} />
                    <Route path="/services" element={<PageWrapper pageKey="services"><Card /></PageWrapper>} />
                    <Route path="/contact" element={<PageWrapper pageKey="contact"><Form /></PageWrapper>} />
                    <Route path="/blog" element={<PageWrapper pageKey="blog"><Blog /></PageWrapper>} />
                    <Route path="/blog/:id" element={<PageWrapper pageKey="blog-details"><BlogDetails /></PageWrapper>} />
                  </Routes>
                </AnimatePresence>
              </Suspense>
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;