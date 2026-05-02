import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import './BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const articles = {
    1: {
      title: "The Evolution of React 19 & Compiler",
      category: "Architecture",
      date: "May 02, 2026",
      tags: ["React", "Performance", "Frontend"],
      image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1200",
      content: "React 19 is not just an update; it's a paradigm shift. The new compiler automates memoization, allowing developers to focus on logic rather than optimization. This structural change ensures that high-end web applications maintain a smooth 60fps experience even under heavy computation."
    }
  };

  const post = articles[id] || articles[1];

  return (
    <div className="blog-detail-root">
      {/* Dynamic Progress Bar */}
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} />

      <div className="detail-wrapper">
        <header className="detail-nav">
          <NavLink to="/blog" className="back-link-elite">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>BACK TO JOURNAL</span>
          </NavLink>
        </header>

        <main className="article-layout">
          {/* Left Sidebar: Meta Info */}
          <aside className="article-sidebar">
            <div className="meta-sticky">
              <div className="author-card">
                <div className="avatar"></div>
                <div className="info">
                  <p className="label">WRITTEN BY</p>
                  <p className="name">Elite Developer</p>
                </div>
              </div>
              <div className="meta-stats">
                <div className="stat">
                  <p className="label">PUBLISHED</p>
                  <p className="value">{post.date}</p>
                </div>
                <div className="stat">
                  <p className="label">READING TIME</p>
                  <p className="value">8 MIN READ</p>
                </div>
              </div>
              <div className="tag-cloud">
                {post.tags?.map(tag => <span key={tag} className="tag">#{tag}</span>)}
              </div>
            </div>
          </aside>

          {/* Center: Main Content */}
          <section className="article-body">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="article-intro"
            >
              <span className="cat-badge">{post.category}</span>
              <h1>{post.title}</h1>
            </motion.div>

            <div className="main-image-container">
              <img src={post.image} alt={post.title} />
              <div className="img-overlay"></div>
            </div>

            <div className="rich-text">
              <p className="drop-cap">
                {post.content}
              </p>
              
              <h3>Engineering Standards</h3>
              <p>In the world of high-end digital experiences, performance is not a feature—it's a requirement. We focus on building interfaces that feel as fluid as natural physics.</p>
              
              <div className="premium-quote">
                "Design is not just what it looks like and feels like. Design is how it works."
              </div>

              <p>When implementing these solutions at scale, we prioritize clean code and modular architecture above all else, ensuring that every interaction is cinematic and purposeful.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default BlogDetails;