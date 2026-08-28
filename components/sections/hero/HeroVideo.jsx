"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring } from "framer-motion";

/**
 * Reusable Hero phase configuration for Light Mode.
 * Start and End define the normalized [0, 1] virtual timeline slice.
 */
export const LIGHT_HERO_PHASES = [
  {
    id: "phase-1",
    src: "/videos/Light-Mode-Videos/webm/phase-1.webm",
    start: 0.0,
    end: 0.333,
  },
  {
    id: "phase-2",
    src: "/videos/Light-Mode-Videos/webm/phase-2.webm",
    start: 0.333,
    end: 0.666,
  },
  {
    id: "phase-3",
    src: "/videos/Light-Mode-Videos/webm/phase-3.webm",
    start: 0.666,
    end: 1.0,
  },
];

export default function HeroVideo({
  containerRef,
  phases = LIGHT_HERO_PHASES,
  onPhaseChange,
}) {
  const videoRefs = useRef([]);
  const activePhaseRef = useRef(0);
  const latestProgressRef = useRef(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  // Track scroll progress of the hero container [0, 1]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Responsive spring for smooth seeking feel without lagging
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    mass: 0.15,
    restDelta: 0.0001,
  });

  // Perform seek for a given normalized global progress [0, 1]
  const performSeek = useCallback(
    (rawProgress) => {
      const progress = Math.max(0, Math.min(1, rawProgress));
      latestProgressRef.current = progress;

      // 1. Determine active phase from virtual timeline
      let currentPhaseIdx = phases.length - 1;
      for (let i = 0; i < phases.length; i++) {
        const { start, end } = phases[i];
        if (progress >= start && (progress < end || i === phases.length - 1)) {
          currentPhaseIdx = i;
          break;
        }
      }

      // Handle phase boundary transition
      if (currentPhaseIdx !== activePhaseRef.current) {
        activePhaseRef.current = currentPhaseIdx;
        setActivePhaseIndex(currentPhaseIdx);
        onPhaseChange?.(currentPhaseIdx + 1);
      }

      // 2. Compute exact timestamp for the active phase
      const currentPhase = phases[currentPhaseIdx];
      const phaseRange = currentPhase.end - currentPhase.start;
      const normalizedPhaseProgress = Math.max(
        0,
        Math.min(1, (progress - currentPhase.start) / phaseRange)
      );

      const activeVideo = videoRefs.current[currentPhaseIdx];
      if (activeVideo && activeVideo.readyState >= 1 && activeVideo.duration) {
        let targetTime;
        if (currentPhaseIdx === phases.length - 1 && progress >= 0.998) {
          // Final frame stability at 100% scroll progress
          targetTime = Math.max(0, activeVideo.duration - 0.03);
        } else {
          targetTime = normalizedPhaseProgress * activeVideo.duration;
        }

        // Apply seek if timestamp delta is meaningful
        if (Math.abs(activeVideo.currentTime - targetTime) > 0.012) {
          activeVideo.currentTime = targetTime;
        }
      }
    },
    [phases, onPhaseChange]
  );

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Ensure all video elements remain strictly paused and muted
    phases.forEach((_, idx) => {
      const video = videoRefs.current[idx];
      if (video) {
        video.muted = true;
        video.volume = 0;
        video.playsInline = true;
        video.loop = false;
        video.autoplay = false;
        video.pause();
      }
    });

    if (prefersReducedMotion) return;

    // Subscribe to smooth scroll progress changes
    const unsubscribe = smoothProgress.on("change", (latest) => {
      performSeek(latest);
    });

    // Initial seek sync
    performSeek(smoothProgress.get());

    return () => {
      unsubscribe();
    };
  }, [phases, smoothProgress, performSeek]);

  // Handle metadata load to prime videos as they become ready
  const handleMetadataLoaded = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = true;
      video.volume = 0;
      video.pause();
      if (index === activePhaseRef.current) {
        performSeek(latestProgressRef.current);
      }
    }
  };

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {phases.map((phaseItem, index) => {
        const isActive = index === activePhaseIndex;

        return (
          <video
            key={phaseItem.id}
            ref={(el) => (videoRefs.current[index] = el)}
            src={phaseItem.src}
            muted
            playsInline
            loop={false}
            autoPlay={false}
            preload="auto"
            onLoadedMetadata={() => handleMetadataLoaded(index)}
            className={`w-auto h-auto max-w-full max-h-full absolute inset-0 m-auto transition-opacity duration-150 ease-out ${
              isActive
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <source src={phaseItem.src} type="video/webm" />
          </video>
        );
      })}
    </div>
  );
}
