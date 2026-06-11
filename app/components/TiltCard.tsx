"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  // Mouse position values normalized between -0.5 and 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 25,
  });

  // Highlight positions (percentages for gradient)
  const sheenX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), {
    stiffness: 150,
    damping: 25,
  });
  const sheenY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), {
    stiffness: 150,
    damping: 25,
  });

  // Track cursor position to display custom glare radial gradient
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalizing coordinates relative to center of the card
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    const normalizedX = (relativeX / width) - 0.5;
    const normalizedY = (relativeY / height) - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
    setMousePosition({ x: relativeX, y: relativeY });
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    x.set(0);
    y.set(0);
  };

  // Combine transforms: 3D rotation and perspective
  const transformStyle = useTransform(
    [rotateX, rotateY],
    ([rX, rY]) => `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isMobile ? "none" : transformStyle,
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden transition-shadow duration-300 ${
        hovering && !isMobile ? "shadow-2xl shadow-indigo-500/10" : ""
      } ${className}`}
    >
      {/* Dynamic light reflection (Sheen / Glare) */}
      {!isMobile && hovering && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 80%)`,
          }}
        />
      )}
      <div className="h-full w-full pointer-events-auto select-none" style={{ transform: isMobile ? "none" : "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
