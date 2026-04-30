import React from 'react';
import { motion } from 'framer-motion';
import "./Form.css"
const Form = () => {
  // Animation Variants for inputs
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="head7">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Let's Build Something Amazing
      </motion.h1>
      
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Let's bring your vision to life
      </motion.h3>
      
      <motion.div 
        className="form-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2>Contact Me</h2>
        
        <motion.form 
          action="#" 
          method='post'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
        >
          <div className="input-group">
            <motion.div className="field" variants={itemVariants}>
              <label htmlFor="fname">Full Name</label>
              <input type="text" id="fname" placeholder='Ali Haider' required/> 
            </motion.div>
            <motion.div className="field" variants={itemVariants}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder='example@gmail.com' required/>
            </motion.div>
          </div>

          <div className="input-group">
            <motion.div className="field" variants={itemVariants}>
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" placeholder='+92 300 0000000'/> 
            </motion.div>
            <motion.div className="field" variants={itemVariants}>
              <label htmlFor='project'>Project Type</label>
              <select id="project"> 
                <option value="Web">Website Development</option>
                <option value="app">App Development</option>
                <option value="digital">Digital Marketing</option>
                <option value="graphic">Graphic Design</option>
              </select>
            </motion.div>
          </div>

          <motion.div className="field full-width" variants={itemVariants}>
            <label>Message Details</label>
            <textarea rows="5" placeholder='Tell me about your project...'></textarea>
          </motion.div>

          <motion.input 
            type="submit" 
            value="Send Message" 
            className="submit-btn"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          />
        </motion.form>
      </motion.div>
    </section>
  );
}

export default Form;