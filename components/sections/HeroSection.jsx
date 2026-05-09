"use client";

import ScrollyCanvas from "../layout/ScrollyCanvas";
import Overlay from "../layout/Overlay";

export default function HeroSection({ scrollYProgress }) {
  return (
    <section id="home" className="relative w-full h-[900vh]">
      <div className="sticky top-0 h-screen w-full">
        <ScrollyCanvas scrollYProgress={scrollYProgress} />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
