"use client";

import SectionWrapper from "../layout/SectionWrapper";

export default function HeroSection() {
  return (
    <SectionWrapper id="home" className="flex flex-col justify-center items-center text-center px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900">
          Hero Section
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
          Clean structural skeleton baseline.
        </p>
      </div>
    </SectionWrapper>
  );
}
