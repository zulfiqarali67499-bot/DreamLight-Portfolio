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

// Pages (Lazy loading)
const Header = lazy(() => import('./component/Header'));
const Card = lazy(() => import('./component/Card'));
const About = lazy(() => import('./component/About'));
const Slider = lazy(() => import('./component/Slider'));
const Silde = lazy(() => import('./component/Silde'));
const Form = lazy(() => import('./component/Form'));
const Blog = lazy(() => import('./component/Blog'));
const BlogDetails = lazy(() => import('./component/BlogDetails'));

// Page Transition Wrapper
const PageWrapper = ({ children, pageKey }) => (
  <motion.div
    key={pageKey}
    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Logic: Har route change par premium loader
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5s is perfect for professional feel

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Scroll Lock & Scroll to Top
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
    <div className="app-container" style={{ 
      background: '#010101', 
      minHeight: '100vh', 
      width: '100%',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      
      {/* ELITE CURSOR: Top-most layer */}
      <CustomCursor />

      {/* Main Orchestrator */}
      <AnimatePresence mode="wait">
        {loading ? (
          /* PreLoader must have an 'exit' property in its own component 
             to match the 'portal' effect we discussed */
          <PreLoader key="global-loader" />
        ) : (
          <motion.div 
            key="main-app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <FloatingP /> 
            <Navbar />
            
            {/* UniversalCTA Visibility Logic */}
            {location.pathname !== "/" && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                style={{ position: 'relative', zIndex: 5 }}
              >
                <UniversalCTA />
              </motion.div>
            )}

            <main style={{ minHeight: '80vh' }}>
              <Suspense fallback={null}>
                {/* Internal Page Transitions */}
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

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;