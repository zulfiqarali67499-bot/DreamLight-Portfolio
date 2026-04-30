import React from 'react';
import { motion } from 'framer-motion';
import "./About.css"
const About = () => {
  return (
    <section className="head3">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Full Stack Mastery
      </motion.h1>

      <div className="about">
        <motion.div 
          className="about-pic"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="circle">
            {/* Aap yahan coding background ya VS Code ka screenshot laga sakte hain */}
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000" alt="Full Stack Coding" />
          </div>
        </motion.div>

        <motion.div 
          className="about-me"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h4>Architecting Seamless Solutions</h4>
          <p>
            As a dedicated Full Stack Developer, I bridge the gap between elegant user interfaces 
            and robust server-side logic. My expertise spans the entire development lifecycle, 
            from crafting responsive <strong>React</strong> frontends with <strong>Tailwind CSS</strong> to 
            engineering scalable <strong>Node.js</strong> and <strong>PHP</strong> backends. 
            I specialize in building high-performance APIs and managing complex <strong>MySQL</strong> databases 
            to ensure data integrity and speed.
            <br /><br />
            My approach focuses on writing modular, clean code that is not only functional 
            but also future-proof. Whether it's integrating real-time features or 
            optimizing database queries, I strive to deliver digital experiences that 
            are visually stunning and technically flawless.
          </p>
          <button className="read-more-btn">Explore My Stack</button>
        </motion.div>
      </div>
    </section>
  );
}

export default About;