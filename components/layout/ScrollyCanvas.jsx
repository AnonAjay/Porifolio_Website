"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useSpring, useMotionValue } from "framer-motion";

const FRAME_COUNT = 144;

const currentFrame = (index) =>
  `/images/Light-Mode-Intro/frame_${index.toString().padStart(3, "0")}_delay-0.055s.png`;

export default function ScrollyCanvas({ activeStep }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const previousFrameRef = useRef(-1);

  // Cinematic keyframes mapping to activeStep
  const keyframes = [0, 48 , 96, 143];
  const targetFrame = useMotionValue(keyframes[0]);

  // Cinematic grounded spring physics
  const smoothFrame = useSpring(targetFrame, {
    stiffness: 26,
    damping: 18,
    mass: 0.9,
    restSpeed: 0.01,
    restDelta: 0.0001
  });

  // Update the target frame whenever the step changes
  useEffect(() => {
    targetFrame.set(keyframes[activeStep] || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, targetFrame]);

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
      drawCanvas(Math.round(smoothFrame.get()));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const verticalOffset = 65; // 🔥 adjust this manually (try 50 → 120)

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2 + verticalOffset;
    } else {
      // Canvas is taller than image
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetY = verticalOffset;
      offsetX = (width - drawWidth) / 2;
    }

    // Clear and draw
    context.clearRect(0, 0, width, height);
    context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(smoothFrame, "change", (latest) => {
    const targetFrameValue = targetFrame.get();

    // Soft deterministic completion
    if (Math.abs(latest - targetFrameValue) < 0.2) {
      if (previousFrameRef.current !== targetFrameValue) {
        previousFrameRef.current = targetFrameValue;
        requestAnimationFrame(() => drawCanvas(targetFrameValue));
      }
      return;
    }

    // Normal interpolation
    const frame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latest))); // 👈 safety clamp
    if (frame !== previousFrameRef.current) {
      previousFrameRef.current = frame;
      requestAnimationFrame(() => drawCanvas(frame));
    }
  });

  return (
    <div
      className="absolute inset-0 w-full min-h-screen pointer-events-none z-0"
      style={{
        background: `
          radial-gradient(circle at 70% 30%, rgba(255,111,97,0.25), transparent 60%),
          linear-gradient(135deg, #0D0D0D 0%, #1A0F0A 40%, #2A140C 100%)
        `
      }}
    >
      <div
        className="relative flex justify-center items-center w-full h-full"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-[100vh] object-cover object-center"
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
