"use client";

import SectionWrapper from "../layout/SectionWrapper";

export default function TechStackSection() {
  return (
    <SectionWrapper id="skills" className="flex flex-col justify-center items-center text-center px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Tech Stack
        </h2>
        <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Clean structural section container placeholder.
        </p>
      </div>
    </SectionWrapper>
  );
}
