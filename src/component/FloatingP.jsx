import React, { useEffect, useRef } from 'react';

const FloatingP = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null, radius: 150 });
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = (Math.random() * 0.5 - 0.25);
        this.speedY = (Math.random() * 0.5 - 0.25);
        this.density = (Math.random() * 30) + 1; // Movement weight
      }

      update() {
        // Auto Movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Screen Wrap
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;

        // Mouse Interaction (The "Break/Push" Effect)
        if (mouse.current.x !== null) {
          let dx = mouse.current.x - this.x;
          let dy = mouse.current.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.current.radius) {
            // Magnetic Repulsion: Mouse particles ko push karega
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.current.radius - distance) / mouse.current.radius;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const density = window.innerWidth < 768 ? 40 : 100;
      for (let i = 0; i < density; i++) {
        particles.push(new Particle());
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

const drawLines = () => {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        let opacity = 1 - (distance / 150);
        
        let midX = (particles[i].x + particles[j].x) / 2;
        let midY = (particles[i].y + particles[j].y) / 2;
        let mDx = mouse.current.x - midX;
        let mDy = mouse.current.y - midY;
        let mDist = Math.sqrt(mDx * mDx + mDy * mDy);

        // --- COLOR TEZ KARNE KE LIYE YAHAN CHANGE KIYA ---
        // Base opacity 0.4 rakhi hai taake lines wazeh nazar aayein
        let finalOpacity = mDist < 80 ? opacity * 0.2 : opacity * 0.4; 
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${finalOpacity})`;
        ctx.lineWidth = mDist < 80 ? 0.5 : 1.2; // Line thori moti aur wazeh kar di
        
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
};

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      drawLines();
      requestRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    handleResize();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -2, 
        pointerEvents: 'none',
        background: 'transparent'
      }} 
    />
  );
};

export default FloatingP;