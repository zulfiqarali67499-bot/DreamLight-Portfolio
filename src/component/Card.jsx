import React from 'react';
import { motion } from 'framer-motion';
import { LuBinary, LuLayers, LuCpu } from "react-icons/lu"; // More modern icons
import { FiArrowUpRight } from "react-icons/fi";
import "./Card.css"

const Card = () => {
  const services = [
    { 
      id: "01",
      icon: <LuBinary />, 
      title: "Core Engineering", 
      desc: "Architecting high-performance backends with Node.js and PHP. Focus on data integrity and 99.9% uptime logic.",
      color: "#3b82f6"
    },
    { 
      id: "02",
      icon: <LuLayers />, 
      title: "Full-Stack Design", 
      desc: "Bridging pixel-perfect UI with robust React architecture. Every pixel is calculated, every interaction is fluid.",
      color: "#8b5cf6"
    },
    { 
      id: "03",
      icon: <LuCpu />, 
      title: "System Strategy", 
      desc: "Optimizing cloud deployments and database queries. Scaling digital products from MVP to enterprise level.",
      color: "#06b6d4"
    },
  ];

  return (
    <section className="ultra-section">
      <div className="section-noise"></div>
      
      <div className="content-wrapper">
        <div className="header-stack">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mini-label"
          >
            AVAILABLE FOR PROJECTS
          </motion.div>
          <h1 className="main-title">Premium <span>Full-Stack</span> <br /> Solutions</h1>
        </div>

        <div className="elite-bento-grid">
          {services.map((s, i) => (
            <motion.div 
              className="bento-card" 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* The Border Beam Animation */}
              <div className="border-beam"></div>
              
              <div className="bento-inner">
                <div className="top-meta">
                  <span className="id-tag">/ {s.id}</span>
                  <div className="icon-sphere" style={{'--brand-color': s.color}}>{s.icon}</div>
                </div>

                <div className="mid-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>

                <div className="bottom-meta">
                  <button className="expand-btn">
                    Details <FiArrowUpRight />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Card;