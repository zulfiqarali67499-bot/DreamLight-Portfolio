import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue ,AnimatePresence} from "framer-motion"
import "./CustomCursor.css";

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState("default");

  // Mouse coordinates - Use x/y for better GPU performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the outer ring
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = (e) => {
      // Check if the element or its parent is clickable
      if (e.target.closest("a, button, input, .clickable, .project-card")) {
        setCursorType("hovered");
      }
    };

    const handleMouseLeave = () => setCursorType("default");
    const handleMouseDown = () => setCursorType("clicked");
    const handleMouseUp = () => setCursorType("hovered");

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseEnter);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseEnter);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Inner Sharp Dot */}
      <motion.div
        className="cursor-dot"
        style={{ 
          x: mouseX, 
          y: mouseY,
          translateX: "-50%", // Properly centering
          translateY: "-50%" 
        }}
        animate={{
          scale: cursorType === "clicked" ? 0.6 : 1,
          opacity: cursorType === "hovered" ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      
      {/* Outer Fluid Ring */}
      <motion.div
        className="cursor-ring"
        style={{ 
          x: ringX, 
          y: ringY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          width: cursorType === "hovered" ? 100 : 35,
          height: cursorType === "hovered" ? 100 : 35,
          backgroundColor: cursorType === "hovered" ? "rgba(255, 255, 255, 0.1)" : "transparent",
          borderColor: cursorType === "hovered" ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)",
          borderWidth: cursorType === "hovered" ? "1px" : "2px",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.8 }}
      >
        {/* Elite "VIEW" text reveal */}
        <AnimatePresence>
          {cursorType === "hovered" && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.5 }}
              className="cursor-text"
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CustomCursor;