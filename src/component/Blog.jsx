import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Blog.css';

const Blog = () => {
  const blogs = [
    { 
      id: 1, 
      title: "The Evolution of React 19", 
      category: "Architecture", 
      date: "May 2026", 
      image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1200", 
      desc: "How the new compiler automates re-rendering for high-end web applications." 
    },
    { 
      id: 2, 
      title: "Glassmorphism in 2026", 
      category: "UI Design", 
      date: "May 2026", 
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200", 
      desc: "Creating depth using multi-layered blur and dynamic mesh gradients for premium UI." 
    },
    { 
      id: 3, 
      title: "Node.js at Scale", 
      category: "Backend", 
      date: "May 2026", 
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200", 
      desc: "Handling millions of concurrent requests with distributed worker threads." 
    }
  ];

  // Mouse Move tracking for the glow effect
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="blog-page-wrapper">
      <div className="stars-overlay"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="modern-blog-grid"
      >
        {blogs.map((blog) => (
          <motion.div 
            key={blog.id}
            variants={itemVariants}
            className="premium-card"
            onMouseMove={handleMouseMove}
          >
            <div className="image-wrapper">
              <div className="category-overlay">{blog.category}</div>
              <img src={blog.image} alt={blog.title} loading="lazy" />
            </div>
            
            <div className="card-info">
              <div className="card-meta">
                <span>{blog.date}</span>
                <span className="dot"></span>
                <span>5 min read</span>
              </div>
              <h3>{blog.title}</h3>
              <p>{blog.desc}</p>
              <NavLink to={`/blog/${blog.id}`} className="fancy-link">
                CASE STUDY <span>→</span>
              </NavLink>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Blog;