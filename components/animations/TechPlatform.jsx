"use client";

import React, { useState } from "react";
import { motion, useTransform } from "framer-motion";

export default function TechPlatform({ 
  category, 
  scrollProgress, 
  isAnyHovered, 
  setHoveredId 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { id, level, title, tech, expertise, details, color } = category;

  // Assembly scroll mapping: Bottom layer enters first, top layer last
  // Each platform starts below, rises into place, and separates vertically
  const startProgress = (level - 1) * 0.15; 
  const endProgress = startProgress + 0.3;

  // Y-translation to rise from below
  const y = useTransform(
    scrollProgress, 
    [0, startProgress, endProgress, 1], 
    [400, 300, (5 - level) * -65 - 80, (5 - level) * -65 - 80] // Isometric stacked positions
  );

  // Opacity fade in
  const opacity = useTransform(
    scrollProgress, 
    [0, startProgress, startProgress + 0.1, 1], 
    [0, 0, 1, 1]
  );

  // 3D tilt perspective rotation (tilt plates slightly back for isometric styling)
  const rotateX = 60; // Fixed flat angle
  const rotateZ = -45; // Fixed isometric spin angle

  return (
    <motion.div
      style={{ 
        y, 
        opacity,
        transformStyle: "preserve-3d",
        z: isHovered ? 60 : 0 // Push up in 3D space on hover
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        setHoveredId(id);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredId(null);
      }}
      className="absolute left-1/2 -ml-[180px] w-[360px] h-[160px] cursor-pointer transition-all duration-300 pointer-events-auto"
    >
      {/* 3D Glass Platform Plate */}
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered 
            ? `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px ${color}40`
            : "0 15px 30px -10px rgba(0,0,0,0.3)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          transform: `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full rounded-2xl border bg-black/40 border-white/10 backdrop-blur-md relative overflow-hidden flex flex-col justify-between p-5"
      >
        {/* Subtle Cybernetic Grid overlay inside platform */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />

        {/* Emissive platform edge glow matching layer color */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[2px] transition-all duration-500"
          style={{ 
            background: `linear-gradient(to right, transparent, ${color}, transparent)`,
            boxShadow: `0 0 15px ${color}`
          }}
        />

        {/* Level indicator / tech label */}
        <div className="flex justify-between items-start z-10">
          <span 
            className="text-[9px] font-black tracking-[0.2em] uppercase transition-colors"
            style={{ color: isHovered ? color : "#888888" }}
          >
            SYSTEM MODULE 0{level}
          </span>
          <span className="text-[9px] font-bold text-gray-500 tracking-wider">
            L{level}_ONLINE
          </span>
        </div>

        {/* Platform Title */}
        <div className="z-10 mt-2">
          <h4 className="text-base font-black text-white tracking-tight uppercase">
            {title}
          </h4>
          <p className="text-[10px] text-gray-400 font-medium tracking-wide mt-0.5">
            {expertise}
          </p>
        </div>

        {/* Technology Tags - float up on hover */}
        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0.4, y: isHovered ? -5 : 0 }}
          className="flex flex-wrap gap-1.5 mt-3 z-10"
        >
          {tech.map((t, idx) => (
            <span 
              key={idx} 
              className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-300"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
