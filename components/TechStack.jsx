"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Zap, Info } from "lucide-react";
import SystemPipeline from "./SystemPipeline";

export default function TechStack() {
  const [activeTech, setActiveTech] = useState(null);

  return (
    <section id="tech-stack" className="relative min-h-screen w-full bg-[#FDF8F5] overflow-hidden flex flex-col">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #1A1A1A 0.5px, transparent 0)`, backgroundSize: "40px 40px" }} 
      />

      {/* Main Content Area */}
      <div className="relative flex-1 w-full z-10 flex flex-col">
        {/* Header Overlay */}
        <div className="pt-24 px-12 md:px-20 pointer-events-none z-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold text-[#FF6F61] uppercase tracking-[0.3em] mb-4 block"
          >
            Engineering Workflow
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 tracking-tight"
          >
            System Pipeline
          </motion.h2>
          <motion.p className="text-sm text-[#1A1A1A]/40 font-light max-w-xl">
            A high-fidelity representation of the technical ecosystem. From core architectural input through neural processing to specialized production outputs.
          </motion.p>
        </div>

        {/* Pipeline Visualization Wrapper */}
        <div className="flex-1 w-full relative min-h-[600px]">
          <SystemPipeline />
        </div>
      </div>

      {/* Bottom Branding Decor */}
      <div className="absolute bottom-8 left-8 text-[10px] font-bold text-[#1A1A1A]/20 uppercase tracking-[0.5em] pointer-events-none z-20">
        Technical Workflow Architecture
      </div>

      {/* Footer / Meta Info */}
      <div className="absolute bottom-8 right-8 flex items-center gap-6 z-20">
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-bold text-[#FF6F61] uppercase tracking-widest">System Status</span>
          <span className="text-[10px] font-medium text-[#1A1A1A]/40">Active & Optimizing</span>
        </div>
      </div>
    </section>
  );
}
