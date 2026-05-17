"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";
import { SOCIAL_NODES } from "../../data/socials";
import GridBackground from "../common/GridBackground";
import SectionWrapper from "../layout/SectionWrapper";
import SocialSelector from "./contact/SocialSelector";
import HoloCard from "./contact/HoloCard";
import useMousePosition from "../../hooks/useMousePosition";
import GlossySphere from "../animations/GlossySphere";

export default function ContactSection() {
  const [activeId, setActiveId] = useState(SOCIAL_NODES[0].id);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  useMousePosition(sectionRef);

  const activeNode = SOCIAL_NODES.find(n => n.id === activeId);

  return (
    <SectionWrapper 
      id="contact"
      ref={sectionRef}
      className="bg-transparent font-['Inter'] relative"
    >
      <GridBackground type="linear" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-[clamp(4rem,10vh,8rem)] min-h-screen flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF6F61]" />
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            </div>
            <div className="h-4 w-[1px] bg-gray-200" />
            <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
              <TerminalIcon size={14} className="text-[#FF6F61]" />
              Network Interface
            </div>
          </div>
          <h2 className="text-[clamp(2.5rem,4vw,4.5rem)] font-bold tracking-tight text-[#1A1A1A] leading-[1.1]">
            Identity Access <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6F61] to-[#FFC1A6]">
              Modules
            </span>
          </h2>
        </div>

        {/* Split Layout Container */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start w-full">
          {/* LEFT: Selector */}
          <div className="w-full lg:w-1/3 shrink-0">
            <SocialSelector data={SOCIAL_NODES} activeId={activeId} onSelect={setActiveId} />
          </div>

          {/* RIGHT: HoloCard */}
          <div className="w-full lg:w-2/3 flex flex-col justify-center relative min-h-[400px]">
            {/* Sphere 1: Primary Background (Large, partially behind card, soft blur) */}
            <motion.div
              animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-[20%] pointer-events-none z-0"
            >
              <GlossySphere size={240} color="#FFA885" glowColor="#FFEBE0" shadowColor="#C96847" blur="blur-[16px]" opacity={0.65} />
            </motion.div>
            
            {/* Sphere 2: Upper-Right Support (Medium, subtle blur) */}
            <motion.div
              animate={{ y: [0, -15, 0], x: [0, -15, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              className="absolute top-[-10%] right-[10%] pointer-events-none z-0"
            >
              <GlossySphere size={150} color="#FFBFA3" glowColor="#FFF5F0" shadowColor="#D68060" blur="blur-[4px]" opacity={0.8} />
            </motion.div>

            {/* Sphere 3: Lower-Left Support (Small, sharp focus in foreground) */}
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 left-[-8%] pointer-events-none z-20"
            >
              <GlossySphere size={100} color="#FFA885" glowColor="#FFEBE0" shadowColor="#C96847" blur="blur-none" opacity={0.9} />
            </motion.div>

            <div className="relative z-10 w-full">
              <HoloCard activeNode={activeNode} />
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-16 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
          &copy; {new Date().getFullYear()} — SYSTEM ARCHITECTURE ARCHIVE — EXTERNAL NODES
        </div>
      </div>

      <motion.div className="fixed left-0 w-full h-[2px] bg-[#FF6F61]/5 z-50 pointer-events-none" animate={{ top: ["0%", "100%"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0" style={{ background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 111, 97, 0.08), transparent 80%)" }} />
    </SectionWrapper>
  );
}
