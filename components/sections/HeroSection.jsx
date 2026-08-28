"use client";

import { useRef } from "react";
import SectionWrapper from "../layout/SectionWrapper";
import HeroVideo from "./hero/HeroVideo";

export default function HeroSection() {
  const containerRef = useRef(null);

  return (
    <SectionWrapper
      id="home"
      ref={containerRef}
      className="relative w-full h-[300vh] !overflow-visible p-0"
    >
      {/* Sticky Cinematic Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center text-center px-6">
        {/* Cinematic Multi-Phase Scrubbed Video Layer */}
        <HeroVideo containerRef={containerRef} />

        {/* Hero Content Layer */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 pointer-events-none select-none">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Hero Section
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Clean structural skeleton baseline.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
