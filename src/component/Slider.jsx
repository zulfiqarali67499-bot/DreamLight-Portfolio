import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Modules mein Autoplay lazmi hona chahiye
import { Autoplay, EffectCoverflow, Pagination, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import './Slider.css';

const Slider = () => {
  const slides = [
    { id: "01", title: "Full Stack Logic", cat: "Node.js & Express", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200" },
    { id: "02", title: "React Architecture", cat: "Component Design", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200" },
    { id: "03", title: "Cloud Systems", cat: "DevOps & AWS", img: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1200" },
    { id: "04", title: "UI Algorithms", cat: "Framer Motion", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200" },
  ];

  return (
    <section className="elite-engine-section">
      <div className="grid-master-layout">
        
        {/* Info Card Section */}
        <div className="content-lock-zone">
          <div className="dev-glass-card">
            <div className="dev-tag">System Architect // 2026</div>
            <h1>Next-Gen <br /> <span>Logic</span> <br /> Systems</h1>
            <p>Developing high-performance backends and cinematic frontends.</p>
            <button className="primary-dev-btn">Initialize Project</button>
          </div>
        </div>

        {/* Swiper Section with Autoplay */}
        <div className="swiper-lock-zone">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={false}
            slidesPerView={'auto'}
            loop={true}
            spaceBetween={80}
            // AUTO PLAY SETTINGS
            autoplay={{
              delay: 2500, // 2.5 seconds baad change hogi
              disableOnInteraction: false, // User slide change kare tab bhi auto chalta rahe
              pauseOnMouseEnter: true, // Mouse le jane par ruk jaye (Professional touch)
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Autoplay, Pagination, Keyboard]}
            className="locked-swiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="locked-slide">
                <div className="inner-visual-card">
                  <div className="img-wrap">
                    <img src={slide.img} alt={slide.title} />
                  </div>
                  <div className="info-wrap">
                    <span className="slide-num">{slide.id}</span>
                    <h3>{slide.title}</h3>
                    <div className="hover-line"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default Slider;