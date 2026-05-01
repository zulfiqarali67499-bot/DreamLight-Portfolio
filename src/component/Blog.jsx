import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion'; // Library import karna zaroori hai
import './Blog.css';

const Blog = () => {
  const blogs = [
    { id: 1, title: "The Evolution of React 19", category: "Architecture", date: "May 12, 2026", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800", desc: "Deep dive into the new compiler and how it automates re-rendering." },
    { id: 2, title: "Glassmorphism in 2026", category: "UI Design", date: "May 10, 2026", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800", desc: "Creating depth using multi-layered blur and dynamic mesh gradients." },
    { id: 3, title: "Node.js at Scale", category: "Backend", date: "May 08, 2026", image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800", desc: "Handling millions of concurrent requests with distributed worker threads." }
  ];

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="blog-page-wrapper">
      <div className="stars-overlay"></div>

      <section className="blog-hero-section">
        {/* Hero Text Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text-container"
        >
          <span className="premium-tag">Technical Journal</span>
          <h1 className="hero-h1">The <span className="glow-text">Future</span> of Code.</h1>
          <p className="hero-p">Exploring high-performance engineering and futuristic design.</p>
        </motion.div>
      </section>

      <main className="grid-container">
        {/* Is div par stagger effect lagega taake cards ek ek karke ayen */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="modern-blog-grid"
        >
          {blogs.map((blog) => (
            <motion.div 
              key={blog.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }} // Hover par halka sa upar
              className="premium-card"
            >
              <div className="image-wrapper">
                <img src={blog.image} alt={blog.title} />
                <div className="category-overlay">{blog.category}</div>
              </div>
              <div className="card-info">
                <div className="card-meta">
                  <span className="dot"></span>
                  <span className="date">{blog.date}</span>
                </div>
                <h3>{blog.title}</h3>
                <p>{blog.desc}</p>
                <NavLink to={`/blog/${blog.id}`} className="fancy-link">
                  Read More <span className="arrow-icon">→</span>
                </NavLink>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Blog;