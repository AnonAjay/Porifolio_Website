"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PHRASES, CAPABILITIES, ABOUT_TEXT } from "../../data/about";
import CapabilityCard from "../cards/CapabilityCard";
import GridBackground from "../common/GridBackground";
import SectionWrapper from "../layout/SectionWrapper";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <SectionWrapper 
      id="about" 
      ref={sectionRef} 
      className="z-20" 
      style={{ background: "linear-gradient(to right, #F3C6A8 0%, #FDF8F5 50%, #F5F5F5 100%)" }}
    >
      {/* Background Video */}
      <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden pointer-events-none z-0 opacity-80">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover" style={{ filter: "saturate(0.8) brightness(1.1) contrast(0.9)" }}>
          <source src="/videos/about_me.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to right, transparent 80%, #FDF8F5 100%)" }} />
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to right, rgba(243,198,168,0.3) 0%, transparent 100%)" }} />
      </div>

      <GridBackground type="radial" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24 min-h-screen flex flex-col justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative min-h-[500px] w-full flex items-center justify-center scale-[0.85] lg:scale-100">
          <div className="absolute w-[450px] h-[450px] bg-[#FF6F61]/5 blur-[100px] rounded-full -z-10" />
        </div>

        <div className="flex flex-col">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] mb-12 leading-[1.2]"
          >
            I build <br />
            <span className="relative block min-h-[1.4em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={PHRASES[phraseIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6F61] to-[#FFC1A6] whitespace-nowrap"
                >
                  {PHRASES[phraseIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.35 }} className="text-base md:text-lg text-[#1A1A1A]/70 leading-relaxed max-w-xl mb-12 font-light">
            {ABOUT_TEXT}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CAPABILITIES.map((cap, i) => (
              <CapabilityCard key={cap.title} {...cap} index={i} />
            ))}
          </div>
        </div>
      </div>
      </div>
    </SectionWrapper>
  );
}
