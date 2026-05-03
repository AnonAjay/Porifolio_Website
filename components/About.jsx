"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

/*
============================================
🧠 SYSTEM ARCHITECT — ABOUT SECTION
============================================
Dynamic System Pipeline + Dynamic Rotating Headline + 3D Cards.
*/

// Phrases for the rotating headline
const PHRASES = [
  "Intelligent Systems",
  "Scalable Architectures",
  "AI-Driven Solutions",
  "Secure Agentic Frameworks",
  "End-to-End Pipelines",
];

// Capability cards data
const CAPABILITIES = [
  {
    title: "AI Systems",
    text: "LLM orchestration, agent workflows, intelligent pipelines",
    icon: "⚡",
  },
  {
    title: "System Design",
    text: "Scalable backend architectures and real-time systems",
    icon: "🏗️",
  },
  {
    title: "AI Security",
    text: "Prompt injection defense and agent safety frameworks",
    icon: "🛡️",
  },
  {
    title: "Data Intelligence",
    text: "Predictive analytics and feature-driven modeling",
    icon: "📊",
  },
];

function CapabilityCard({ title, text, icon, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.15 * index, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 1000, rotateX, rotateY }}
      className="group relative bg-white/40 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-lg cursor-default transition-shadow duration-300 hover:shadow-2xl hover:bg-white/60"
    >
      <div className="absolute -top-px -right-px w-16 h-16 bg-gradient-to-bl from-[#FF6F61]/20 to-transparent rounded-tr-xl rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <motion.span style={{ display: "block" }} className="text-2xl mb-3" whileHover={{ scale: 1.2, rotate: 10 }}>{icon}</motion.span>
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-[#1A1A1A]/60 leading-relaxed font-light">{text}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
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
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center px-8 md:px-20 py-24 z-20 overflow-hidden" 
      style={{ 
        background: "linear-gradient(to right, #F3C6A8 0%, #FDF8F5 50%, #F5F5F5 100%)" 
      }}
    >
      {/* Background Video with Blending */}
      <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden pointer-events-none z-0 opacity-80">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: "saturate(0.8) brightness(1.1) contrast(0.9)" }}
        >
          <source src="/videos/about_me.mp4" type="video/mp4" />
        </video>
        
        {/* Right Edge Blend Overlay */}
        <div className="absolute inset-0 z-10" 
          style={{ background: "linear-gradient(to right, transparent 80%, #FDF8F5 100%)" }} 
        />
        
        {/* Left Light Fade Overlay */}
        <div className="absolute inset-0 z-10" 
          style={{ background: "linear-gradient(to right, rgba(243,198,168,0.3) 0%, transparent 100%)" }} 
        />
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" 
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #1A1A1A 0.5px, transparent 0)`, backgroundSize: "32px 32px" }} 
      />
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT — Background Visual Space */}
        <div className="relative min-h-[500px] w-full flex items-center justify-center scale-[0.85] lg:scale-100">
          {/* Ambient Glow behind the area */}
          <div className="absolute w-[450px] h-[450px] bg-[#FF6F61]/5 blur-[100px] rounded-full -z-10" />
        </div>

        {/* RIGHT — Content */}
        <div className="flex flex-col">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] mb-12 leading-[1.2]"
          >
            I build <br />
            <span className="relative block h-[1.2em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={PHRASES[phraseIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6F61] to-[#FFC1A6] whitespace-nowrap"
                >
                  {PHRASES[phraseIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }} className="text-base md:text-lg text-[#1A1A1A]/70 leading-relaxed max-w-xl mb-12 font-light">
            I architect AI-driven systems that transform complex data into secure, scalable, and human-centric solutions. From predictive pipelines to agentic AI security frameworks, my focus is building systems that endure.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CAPABILITIES.map((cap, i) => (
              <CapabilityCard key={cap.title} {...cap} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
