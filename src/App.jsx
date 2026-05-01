import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// components
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import FloatingP from './component/FloatingP'; 
import PreLoader from './component/PreLoader';
import UniversalCTA from './component/UniversalCTA';

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
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Logic 1: Har route change par 3 second ka loader chalega
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Logic 2: Scroll lock jab tak loading ho rahi hai
  useEffect(() => {
    if (loading) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
      
      // Loader khatam hotay hi top par scroll
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <div className="app-container" style={{ 
      background: '#010101', 
      minHeight: '100vh', 
      width: '100%',
      overflowX: 'hidden' 
    }}>
      
      <AnimatePresence mode="wait">
        {loading ? (
          <PreLoader key="loader" />
        ) : (
          <motion.div 
            key="main-app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <FloatingP /> 
            <Navbar />
            
            {/* Logic 3: UniversalCTA Home ("/") par show nahi hoga, baqi sab par hoga */}
            {location.pathname !== "/" && (
              <div style={{ position: 'relative', zIndex: 5 }}>
                <UniversalCTA />
              </div>
            )}

            <main style={{ minHeight: '80vh' }}>
              <Suspense fallback={null}>
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
                    <Route path="/blog/:id" element={<PageWrapper pageKey={location.pathname}><BlogDetails /></PageWrapper>} />
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