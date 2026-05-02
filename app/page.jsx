"use client";

import { useScroll } from "framer-motion";
import { useEffect } from "react";
import ScrollyCanvas from "../components/ScrollyCanvas";
import Overlay from "../components/Overlay";
import Projects from "../components/Projects";

export default function Home() {
  // Global scroll progress
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Smooth scroll enabled natively via CSS or just letting browser handle it,
    // but we can ensure window is at top on reload
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative bg-[#121212]">
      {/* 
        The Scrollytelling Section
        Height is 500vh to give a long scrolling duration for the 144 frames
      */}
      <section className="relative w-full h-[900vh]">
        <div className="sticky top-0 h-screen w-full">
          <ScrollyCanvas scrollYProgress={scrollYProgress} />
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* 
        The Projects Section
        Flows naturally after the 500vh scroll section
      */}
      <Projects />
    </main>
  );
}
