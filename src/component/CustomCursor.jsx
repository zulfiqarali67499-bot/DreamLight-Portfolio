import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import "./CustomCursor.css";

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState("default");

  // Mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the outer ring (Elite Lag Effect)
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.closest("a, button, input, .clickable")) {
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
  }, []);

  return (
    <>
      {/* Inner Sharp Dot */}
      <motion.div
        className="cursor-dot"
        style={{ left: mouseX, top: mouseY }}
        animate={{
          scale: cursorType === "clicked" ? 0.5 : 1,
          opacity: cursorType === "hovered" ? 0 : 1, // Hover par dot gaib ho jayega for clean look
        }}
      />
      
      {/* Outer Fluid Ring */}
      <motion.div
        className="cursor-ring"
        style={{ left: ringX, top: ringY }}
        animate={{
          width: cursorType === "hovered" ? 90 : 30,
          height: cursorType === "hovered" ? 90 : 30,
          backgroundColor: cursorType === "hovered" ? "rgba(255, 255, 255, 0.08)" : "transparent",
          borderColor: cursorType === "hovered" ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.2)",
          borderWidth: cursorType === "hovered" ? "1px" : "1.5px",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        {/* Hover Text (Optional: Adds an elite touch) */}
        {cursorType === "hovered" && (
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="cursor-text"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;