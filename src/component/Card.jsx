import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaMobileAlt, FaRocket, FaPaintBrush } from "react-icons/fa";
import "./Card.css"
const Card = () => {
  const cardData = [
    { icon: <FaCode size={32} />, title: "Web Development", para: "Dreamlight delivers modern, responsive, and high-performance web development solutions tailored to your business needs.", btn: "Read More" },
    { icon: <FaMobileAlt size={32} />, title: "App Development", para: "Dreamlight builds high-performance, user-friendly mobile applications tailored to your business goals.", btn: "Read More" },
    { icon: <FaPaintBrush size={32} />, title: "UI/UX Design", para: "Dreamlight designs intuitive and visually engaging UI/UX experiences that enhance user satisfaction.", btn: "Read More" },
  ];

  // Container animation for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="head2">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Build Your Dream <br /> Website with Dreamlight
      </motion.h1>

      <motion.div 
        className="card-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {cardData.map((e, index) => (
          <motion.div 
            className="card-1" 
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: -10, 
              transition: { duration: 0.3 } 
            }}
          >
            <div className="icon-box">{e.icon}</div>
            <h2>{e.title}</h2>
            <p>{e.para}</p>
            <a href="#" className='read'>{e.btn}</a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Card;