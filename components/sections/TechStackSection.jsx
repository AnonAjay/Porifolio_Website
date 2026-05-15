"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Activity, 
  Workflow, 
  ChevronRight,
  Cpu
} from "lucide-react";
import { SKILL_CATEGORIES } from "../../data/skills";
import NeuralProcessor from "../animations/NeuralProcessor";
import FlowObject from "../animations/FlowObject";
import SectionHeader from "../common/SectionHeader";
import GridBackground from "../common/GridBackground";
import SectionWrapper from "../layout/SectionWrapper";

export default function TechStackSection() {
  const [hoveredOutput, setHoveredOutput] = useState(null);
  const [isNeuralHovered, setIsNeuralHovered] = useState(false);
  const [isRootHovered, setIsRootHovered] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <SectionWrapper 
      id="skills"
      ref={containerRef}
      className="bg-[#FDF8F5] font-['Inter']"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24 min-h-screen flex flex-col items-center justify-center">
      <SectionHeader 
        accent="Engineering Intelligence"
        title="Technical Processing Pipeline"
        subtitle="An automated architecture for transforming conceptual inputs into specialized engineering outputs through advanced neural processing."
        align="center"
      />

      <div className="relative w-full max-w-6xl aspect-[16/9] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <GridBackground type="dots" opacity="opacity-[0.03]" />

        <svg viewBox="0 0 1000 600" className="w-full h-full relative z-10">
          <defs>
            <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6F61" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#FF6F61" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF6F61" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* AMBIENT PARTICLES */}
          {isInView && Array.from({ length: 15 }).map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              r={Math.random() * 2 + 1}
              fill="#FF6F61"
              opacity="0.1"
              initial={{ x: Math.random() * 1000, y: Math.random() * 600 }}
              animate={{ y: [null, Math.random() * 600], x: [null, Math.random() * 1000] }}
              transition={{ duration: 20 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {/* SYSTEM ROOT */}
          <g onMouseEnter={() => setIsRootHovered(true)} onMouseLeave={() => setIsRootHovered(false)} className="cursor-pointer">
            {[0, 1, 2].map((i) => (
              <motion.circle key={i} cx="100" cy="300" r={40 + i * 15} fill="none" stroke="#FF6F61" strokeWidth="1"
                initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: [0.3, 0.1, 0], scale: [0.8, 1.5, 2] } : {}}
                transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
              />
            ))}
            <motion.circle cx="100" cy="300" r="35" fill="white" stroke="#FF6F61" strokeWidth="2" animate={isRootHovered ? { scale: 1.1 } : { scale: 1 }} className="shadow-lg" />
            <Activity x="88" y="288" size={24} className="text-[#FF6F61]" />
            <text x="100" y="360" textAnchor="middle" className="text-[10px] font-bold tracking-tighter fill-gray-400 uppercase">SYSTEM ROOT</text>
          </g>

          <path d="M 140 300 L 280 300" stroke="#FF6F61" strokeWidth="2" strokeDasharray="4 4" opacity={isRootHovered ? 0.8 : 0.2} />
          {isInView && <FlowObject path="M 140 300 L 280 300" delay={0} tech="Nodejs" active={isRootHovered} />}

          {/* NEURAL PROCESSOR */}
          <NeuralProcessor isInView={isInView} isHovered={isNeuralHovered} />

          {/* PIPES & OUTPUTS */}
          {SKILL_CATEGORIES.map((cat, idx) => {
            const path = `M 500 300 C 650 300, 700 ${cat.y}, 820 ${cat.y}`;
            const isHovered = hoveredOutput === cat.id;
            const isActive = isHovered || hoveredOutput === null;

            return (
              <g key={cat.id}>
                <path d={path} fill="none" stroke="#FF6F61" strokeWidth={isHovered ? 4 : 2} opacity={isActive ? 0.15 : 0.05} />
                {isHovered && (
                  <motion.path d={path} fill="none" stroke="url(#pipeGradient)" strokeWidth="4" strokeDasharray="50 150"
                    animate={{ strokeDashoffset: [-200, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
                {isInView && isActive && cat.tech.map((t, tIdx) => (
                  <FlowObject key={t} path={path} delay={tIdx * 1.5 + idx * 0.5} tech={t} active={isHovered} />
                ))}

                <g onMouseEnter={() => setHoveredOutput(cat.id)} onMouseLeave={() => setHoveredOutput(null)} className="cursor-pointer">
                  <motion.rect x="820" y={cat.y - 45} width="160" height="90" rx="16" fill="white" stroke="#FF6F61" strokeWidth={isHovered ? 3 : 1}
                    animate={isHovered ? { x: 815, width: 170, height: 100, y: cat.y - 50 } : { x: 820, width: 160, height: 90, y: cat.y - 45 }}
                  />
                  <g transform={`translate(835, ${cat.y - 20})`}>
                    <text className="text-[12px] font-bold fill-gray-900">{cat.title}</text>
                    <rect y="8" width="20" height="2" fill="#FF6F61" rx="1" />
                  </g>
                  <g transform={`translate(835, ${cat.y + 10})`}>
                    {cat.tech.map((t, i) => (
                      <motion.rect key={i} x={i * 22} y="0" width="18" height="18" rx="4" fill="#FF6F61" fillOpacity={isHovered ? 1 : 0.1}
                        initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: 1 + i * 0.1 }}
                      />
                    ))}
                  </g>

                  {isHovered && (
                    <motion.foreignObject x="580" y={cat.y - 100} width="220" height="200" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-[#FF6F61]/20 text-left">
                        <div className="flex items-center gap-2 mb-3">
                          <Workflow size={16} className="text-[#FF6F61]" />
                          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{cat.expertise}</h4>
                        </div>
                        <p className="text-[11px] text-gray-600 mb-4 leading-relaxed">{cat.details}</p>
                        <div className="space-y-2">
                          {cat.projects.map((p, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <ChevronRight size={10} className="mt-1 text-[#FF6F61]" />
                              <span className="text-[10px] text-gray-700 font-medium">{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.foreignObject>
                  )}
                </g>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-50 overflow-hidden">
          <motion.div className="h-full bg-[#FF6F61]" initial={{ width: "0%" }} animate={isInView ? { width: "100%" } : {}} transition={{ duration: 2 }} />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1 }} className="mt-8 flex items-center gap-6">
        {[
          { label: "Real-time Inference: Active", color: "bg-green-500" },
          { label: "System Latency: 14ms", color: "bg-blue-500" },
          { label: "Throughput: 1.2GB/s", color: "bg-[#FF6F61]" }
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${stat.color}`} />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </motion.div>
      </div>
    </SectionWrapper>
  );
}
