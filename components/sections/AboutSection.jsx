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
      className="z-20 bg-transparent"
    >
      <GridBackground type="radial" />

      {/* Grounded, top-anchored editorial container instead of dead-centered */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-[clamp(6rem,12vh,10rem)] pb-[clamp(4rem,8vh,8rem)] min-h-screen flex flex-col">
        
        {/* 55% / 45% Fluid Split */}
        <div className="w-full flex flex-col lg:flex-row gap-[clamp(3rem,6vw,8rem)] items-center lg:items-stretch">
          
          {/* VIDEO CONTAINER (55%) */}
          <div className="relative w-full lg:w-[55%] flex items-center justify-center">
            <div className="relative w-full aspect-[4/5] max-h-[85vh] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/30 bg-white/10 backdrop-blur-md">
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ filter: "saturate(0.8) brightness(1.1) contrast(0.9)" }}>
                <source src="/videos/about_me.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(243,198,168,0.4) 0%, transparent 40%)" }} />
              {/* Backlight orb tied to the video container */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FF6F61]/20 blur-[100px] rounded-full -z-10" />
            </div>
          </div>

          {/* CONTENT CONTAINER (45%) */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center max-w-xl lg:max-w-none mx-auto lg:mx-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[clamp(2.5rem,4vw,4.5rem)] font-bold tracking-tight text-[#1A1A1A] mb-[clamp(1.5rem,4vh,3rem)] leading-[1.1]"
            >
              I build <br />
              <span className="relative block min-h-[1.2em] overflow-hidden">
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

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.7, delay: 0.35 }} 
              className="text-[clamp(1rem,1.25vw,1.125rem)] text-[#1A1A1A]/70 leading-relaxed max-w-lg mb-[clamp(2rem,5vh,3.5rem)] font-light"
            >
              {ABOUT_TEXT}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)]">
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
