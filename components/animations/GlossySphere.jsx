"use client";

import React, { useId } from "react";

export default function GlossySphere({ 
  size = 200, 
  color = "#FFA885", // midtone coral-peach
  glowColor = "#FFEBE0", // light champagne/ivory
  shadowColor = "#C96847", // terracotta/warm coral shadow
  blur = "blur-none",
  opacity = 1
}) {
  const seed = useId().replace(/:/g, ""); // Safe string for SVG IDs
  
  return (
    <div className={`relative ${blur}`} style={{ width: size, height: size, opacity }}>
      {/* 3D Glossy Sphere SVG */}
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_15px_30px_rgba(201,104,71,0.25)]">
        <defs>
          {/* Main 3D Sphere Volume Gradient */}
          <radialGradient id={`glossyGrad-${seed}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF2EB" /> {/* Highlight base (soft warm ivory) */}
            <stop offset="35%" stopColor={color} /> {/* Midtone (pastel coral-peach) */}
            <stop offset="80%" stopColor={shadowColor} /> {/* Shadow tone */}
            <stop offset="100%" stopColor="#9C4427" /> {/* Dark terminator for rich depth */}
          </radialGradient>

          {/* Top-Left Glossy Specular Highlight */}
          <radialGradient id={`specular-${seed}`} cx="30%" cy="30%" r="35%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Bottom-Right Subsurface Rim Reflection (Ivory light bouncing back) */}
          <radialGradient id={`rimGrad-${seed}`} cx="70%" cy="70%" r="45%">
            <stop offset="0%" stopColor={glowColor} stopOpacity="0.45" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Subsurface Glow */}
        <circle cx="100" cy="100" r="92" fill={color} opacity="0.15" className="blur-[10px]" />

        {/* Base 3D Sphere */}
        <circle cx="100" cy="100" r="90" fill={`url(#glossyGrad-${seed})`} />
        
        {/* Rim Light Reflection */}
        <circle cx="100" cy="100" r="90" fill={`url(#rimGrad-${seed})`} style={{ mixBlendMode: "overlay" }} />

        {/* Elliptical Specular Highlight */}
        <ellipse cx="78" cy="72" rx="35" ry="22" fill={`url(#specular-${seed})`} transform="rotate(-15, 78, 72)" />
      </svg>
    </div>
  );
}
