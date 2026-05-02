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
      desc: "An in-depth look at how the new React Compiler is redefining performance standards by automating memoization.",
      type: "hero-card" 
    },
    { 
      id: 2, 
      title: "Glassmorphism 2026", 
      category: "UI Design", 
      date: "April 2026", 
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200", 
      desc: "Mastering depth and light with multi-layered blur.",
      type: "vertical-card"
    },
    { 
      id: 3, 
      title: "The Future of Node.js at Scale", 
      category: "Backend", 
      date: "April 2026", 
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200", 
      desc: "Handling millions of requests with distributed worker threads and high-performance native support.",
      type: "wide-banner" 
    }
  ];

  return (
    <section className="elite-blog-container">
      <div className="ambient-glow" />
      
      <div className="wrapper">
        <header className="blog-head">
          <div className="title-area">
            <span className="pre-title">Curated Knowledge</span>
            <h2>Digital <span>Manifesto</span></h2>
          </div>
          <p>Documenting high-end engineering and international UI/UX standards.</p>
        </header>

        <div className="master-bento-grid">
          {blogs.map((blog, index) => (
            <motion.div 
              key={blog.id}
              className={`bento-item ${blog.type}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div className="media-box">
                <img src={blog.image} alt={blog.title} />
                <div className="glass-label">{blog.category}</div>
              </div>

              <div className="content-box">
                <div className="meta-row">
                  <span className="date-tag">{blog.date}</span>
                  <div className="line-sep" />
                  <span className="reading-time">5 MIN READ</span>
                </div>
                <h3>{blog.title}</h3>
                <p>{blog.desc}</p>
                <NavLink to={`/blog/${blog.id}`} className="elite-link">
                  <span>LEARN MORE</span>
                  <div className="arrow-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </NavLink>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;