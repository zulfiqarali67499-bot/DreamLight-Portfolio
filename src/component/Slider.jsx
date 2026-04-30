import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import React, { useRef } from 'react'; // useEffect ki zaroorat nahi agar sirf mouse move hai

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './Slider.css';
const slide = [
  { title: "Web Dev", text: "Build fast, responsive, and modern websites", img: "/web.png" },
  { title: "App Design", text: "Create intuitive, engaging interfaces", img: "/app.png" },
  { title: "Backend Systems", text: "Develop secure and scalable systems", img: "/b.png" },
  { title: "Coding Animation", text: "Add smooth interactive & cool animations", img: "/animate.png" },
];

const Slider = () => {
  const cardRef = useRef(null);

  // ERROR FIX: Ye functions define hona zaroori hain
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <section className="head5">
      <div 
        className="text-content" 
        ref={cardRef} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
      >
        <h2>Smart Solutions for Modern Web</h2>
        <p>DreamLight delivers innovative digital solutions to elevate your online presence. We specialize in modern web development and high-performance applications.</p>
        <button className="view-btn">View Portfolio</button>
      </div>

      <Swiper
      modules={[Autoplay, Pagination, Navigation]}
  spaceBetween={30}
  slidesPerView={1} // Default mobile
  loop={true}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  breakpoints={{
    // Mobile (Landscape)
    480: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    // Tablet
    768: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    // Laptop / Desktop
    1024: {
      slidesPerView: 2, // Yahan 2 cards fix kar diye hain
      spaceBetween: 30,
    }
  }}
        className="mySwiper"
      >
        {slide.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="card-item">
              <img src={item.img} alt={item.title}/>
              <div className="card-info">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <button className="read-more">Read More</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;