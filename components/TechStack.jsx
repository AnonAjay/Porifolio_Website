"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Zap, Info } from "lucide-react";

// Dynamic import to fix SSR issues with Three.js
const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#FDF8F5]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#FF6F61]/20 border-t-[#FF6F61] rounded-full animate-spin" />
        <span className="text-[10px] font-bold text-[#1A1A1A]/30 uppercase tracking-widest">Initializing 3D Workspace</span>
      </div>
    </div>
  ),
});

export default function TechStack() {
  const [activeTech, setActiveTech] = useState(null);

  return (
    <section id="tech-stack" className="relative h-screen min-h-[700px] w-full bg-[#FDF8F5] overflow-hidden flex flex-col md:flex-row">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #1A1A1A 0.5px, transparent 0)`, backgroundSize: "40px 40px" }} 
      />

      {/* Main Content Area */}
      <div className="relative flex-1 h-full z-10 flex flex-col">
        {/* Header Overlay */}
        <div className="absolute top-12 left-12 md:top-24 md:left-20 pointer-events-none z-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold text-[#FF6F61] uppercase tracking-[0.3em] mb-4 block"
          >
            System Distribution
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 tracking-tight"
          >
            Tech Stack Orbit
          </motion.h2>
          <motion.p className="text-sm text-[#1A1A1A]/40 font-light max-w-sm">
             An interactive representation of core capabilities orbiting a central engineering core. Hover to pause and inspect.
          </motion.p>
        </div>

        {/* 3D Scene Wrapper */}
        <div className="flex-1 w-full relative">
          <ThreeScene onActiveTech={setActiveTech} />
        </div>
      </div>

      {/* Detail Panel Overlay (Side or Bottom depending on screen) */}
      <AnimatePresence>
        {activeTech && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute bottom-12 right-12 md:top-0 md:right-0 md:bottom-0 w-[calc(100%-6rem)] md:w-[400px] md:h-full bg-white/80 backdrop-blur-2xl border-l border-white/40 shadow-2xl z-50 overflow-hidden m-4 md:m-0 rounded-3xl md:rounded-none"
          >
            <div className="p-8 md:p-12 h-full flex flex-col justify-center">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: activeTech.color + '20', color: activeTech.color }}
                  >
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">{activeTech.name}</h3>
                    <p className="text-[10px] font-bold text-[#FF6F61] uppercase tracking-widest">Orbit Tier {activeTech.orbit}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTech(null)}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-[#1A1A1A]/30 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <Info className="w-3 h-3" /> Description
                  </h4>
                  <p className="text-[#1A1A1A]/70 text-sm leading-relaxed font-light">
                    {activeTech.description}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-black/[0.02] border border-black/[0.03]">
                  <h4 className="text-[10px] font-bold text-[#1A1A1A]/30 uppercase tracking-[0.2em] mb-3">System Context</h4>
                  <p className="text-[11px] text-[#1A1A1A]/50 italic">
                    Integral to the development of multi-tenant architectures and intelligent agentic frameworks within this ecosystem.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-black/[0.05] flex justify-between items-center">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#1A1A1A]/20 uppercase tracking-[0.2em]">Stability Index</span>
                    <span className="text-[11px] font-bold text-[#1A1A1A]/40 mt-0.5">Production Ready</span>
                 </div>
                 <motion.button
                   whileHover={{ x: 5 }}
                   className="flex items-center gap-2 text-[#FF6F61] font-bold text-xs"
                 >
                    Documentation <ExternalLink className="w-3 h-3" />
                 </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Branding Decor */}
      <div className="absolute bottom-8 left-8 text-[10px] font-bold text-[#1A1A1A]/20 uppercase tracking-[0.5em] pointer-events-none z-20">
        Engineering Orbital System
      </div>
    </section>
  );
}
