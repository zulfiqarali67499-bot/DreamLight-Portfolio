import React from 'react';
import { motion } from 'framer-motion';
import "./About.css"

const About = () => {
  const stats = [
    { label: "Projects Built", val: "40+" },
    { label: "Happy Clients", val: "15+" },
    { label: "Code Commits", val: "1.2k" }
  ];

  return (
    <section className="elite-about-wrap">
      {/* Dynamic Background Elements */}
      <div className="glow-orb-1"></div>
      <div className="glow-orb-2"></div>

      <div className="elite-container">
        <div className="elite-grid">
          
          {/* LEFT SIDE: The High-End Visual */}
          <motion.div 
            className="visual-core"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="image-stack">
              <div className="glass-overlay-card"></div>
              <div className="main-image-frame">
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200" alt="Full Stack Workspace" />
              </div>
              {/* Floating Stat Widget */}
              <motion.div 
                className="floating-widget"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="widget-icon">⚡</div>
                <div className="widget-text">
                  <span>Innovation</span>
                  <p>Driven by Logic</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: The Narrative */}
          <div className="narrative-core">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="elite-label">// WHO I AM</span>
              <h2 className="elite-heading">Architecting the <span>Digital Future</span></h2>
              
              <div className="bio-block">
                <p>
                  As a <strong>Full Stack Specialist</strong>, I don't just write code; I engineer 
                  high-fidelity digital experiences. I bridge the gap between 
                  <em> premium design</em> and <em>complex server-side logic</em>.
                </p>
                <p>
                  My focus is on <strong>performance</strong>, <strong>scalability</strong>, and 
                  <strong>clean architecture</strong>, ensuring every project is as functional as it is beautiful.
                </p>
              </div>

              {/* Counter Stats */}
              <div className="stats-row">
                {stats.map((stat, i) => (
                  <div key={i} className="stat-box">
                    <span className="stat-val">{stat.val}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="action-row">
                <button className="btn-premium">Hire My Expertise</button>
                <div className="stack-icons">
                  <i className="fab fa-react"></i>
                  <i className="fab fa-node-js"></i>
                  <i className="fab fa-php"></i>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;