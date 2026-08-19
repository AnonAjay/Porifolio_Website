"use client";

export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[100] w-full h-full mix-blend-overlay opacity-[var(--grain-opacity,0.04)] transition-opacity duration-700"
    >
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
