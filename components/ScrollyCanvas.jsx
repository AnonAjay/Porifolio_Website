"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 144;

const currentFrame = (index) =>
  `/images/Light-Mode-Intro/frame_${index.toString().padStart(3, "0")}_delay-0.055s.png`;

export default function ScrollyCanvas({ scrollYProgress }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    // Preload images
    const preloadedImages = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        // If it's the first image and it's loaded, draw it immediately
        if (i === 0 && canvasRef.current) {
          drawCanvas(0);
        }
      };
      preloadedImages.push(img);
    }
    imagesRef.current = preloadedImages;

    // Handle window resize to redraw canvas at correct scale
    const handleResize = () => {
      drawCanvas(Math.round(frameIndex.get()));
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const drawCanvas = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext("2d");
    if (!context) return;
    
    const image = imagesRef.current[index];
    if (!image || !image.complete) return;

    // Set canvas dimensions to window size to handle high-DPI and object-fit cover
    const { innerWidth: width, innerHeight: height } = window;
    // Handle High DPI displays
    const dpr = window.devicePixelRatio || 1;
    
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.scale(dpr, dpr);
    }

    // Object-fit: cover logic
    const imgRatio = image.width / image.height;
    const canvasRatio = width / height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      // Canvas is taller than image
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetY = 0;
      offsetX = (width - drawWidth) / 2;
    }

    // Clear and draw
    context.clearRect(0, 0, width, height);
    context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const frame = Math.round(latest);
    requestAnimationFrame(() => drawCanvas(frame));
  });

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{
        background: `
          radial-gradient(circle at 70% 30%, rgba(255,111,97,0.25), transparent 60%),
          linear-gradient(135deg, #0D0D0D 0%, #1A0F0A 40%, #2A140C 100%)
        `
      }}
    >
      <div 
        className="w-full h-full transform translate-x-[5%]"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{
            filter: "contrast(1.05) saturate(1.05)"
          }}
        />
      </div>

      {/* Soft overlay in front of image + optional rim glow */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.3), transparent)",
          boxShadow: "inset 0 0 120px rgba(255,111,97,0.15)"
        }}
      />
    </div>
  );
}
