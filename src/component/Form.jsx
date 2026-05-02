import React from 'react';
import { motion } from 'framer-motion';
import "./Form.css";

const Form = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="elite-contact">
      {/* Dynamic Background Glows */}
      <div className="bg-blur-elements">
        <div className="circle cyan" />
        <div className="circle purple" />
      </div>

      <div className="content-wrap">
        <motion.div 
          className="text-area"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="badge">Direct Inquiry</span>
          <h1>Let’s scale your <span>Digital Presence</span></h1>
          <p>I help brands create high-performance web applications with a focus on premium UI/UX and cinematic interactions.</p>
          
          <div className="contact-stats">
            <div className="stat">
              <span className="stat-val">24h</span>
              <span className="stat-lab">Avg. Response</span>
            </div>
            <div className="stat">
              <span className="stat-val">Global</span>
              <span className="stat-lab">Service Reach</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="form-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="border-glow-animation" />

          <motion.form 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
          >
            <div className="input-flex">
              <motion.div className="glass-field" variants={itemVariants}>
                <input type="text" id="name" placeholder=" " required />
                <label htmlFor="name">Full Name</label>
              </motion.div>
              
              <motion.div className="glass-field" variants={itemVariants}>
                <input type="email" id="email" placeholder=" " required />
                <label htmlFor="email">Email Address</label>
              </motion.div>
            </div>

            <motion.div className="glass-field" variants={itemVariants}>
              <select id="service" required defaultValue="">
                <option value="" disabled hidden></option>
                <option value="web">Full Stack Development</option>
                <option value="uiux">UI/UX & Motion Design</option>
                <option value="saas">SaaS & Enterprise Solutions</option>
                <option value="branding">Personal Branding</option>
              </select>
              <label htmlFor="service">Service Required</label>
            </motion.div>

            <motion.div className="glass-field" variants={itemVariants}>
              <textarea id="message" rows="4" placeholder=" " required></textarea>
              <label htmlFor="message">How can I help you?</label>
            </motion.div>

            <motion.button 
              type="submit"
              className="elite-btn"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="btn-text">INITIALIZE PROJECT</span>
              <div className="btn-glow" />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

export default Form;