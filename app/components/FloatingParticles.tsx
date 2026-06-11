"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  shape: "circle" | "square" | "triangle";
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate deterministic-looking random particles on client mount to avoid hydration mismatch
    const colors = [
      "bg-indigo-500/10 dark:bg-indigo-500/5",
      "bg-purple-500/10 dark:bg-purple-500/5",
      "bg-blue-500/10 dark:bg-blue-500/5",
    ];
    const shapes: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"];

    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x
      y: Math.random() * 100, // percentage y
      size: Math.random() * 40 + 20, // size between 20px and 60px
      duration: Math.random() * 20 + 20, // float duration between 20s and 40s
      delay: Math.random() * -20, // negative delay so they start scattered in their cycle
      color: colors[i % colors.length],
      shape: shapes[i % shapes.length],
    }));

    setParticles(generated);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => {
        const shapeClass =
          p.shape === "circle"
            ? "rounded-full"
            : p.shape === "square"
            ? "rounded-lg"
            : "clip-triangle";

        return (
          <motion.div
            key={p.id}
            className={`absolute ${p.color} backdrop-blur-[1px]`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              clipPath:
                p.shape === "triangle"
                  ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                  : undefined,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, 40, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
