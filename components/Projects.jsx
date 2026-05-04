"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

/*
============================================
🚀 PREMIUM PROJECT SHOWCASE — STACKED CARDS
============================================
A layered, interactive case study experience.
*/

const ROADMAP_DATA = [
  {
    year: "2024",
    projects: [
      {
        id: 1,
        title: "Neon Nexus",
        problem: "Legacy data ingestion systems were struggling with high-frequency streams, causing 5s+ latency.",
        solution: "Architected a distributed event-driven pipeline using Go and Kafka with a custom-tuned storage layer.",
        impact: "Achieved sub-200ms end-to-end latency and sustained 10x throughput increase.",
        tech: ["Go", "Kafka", "PostgreSQL", "Redis"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "Aura Intelligence",
        problem: "Internal teams lacked real-time visibility into predictive model performance and data drift.",
        solution: "Built an AI monitoring dashboard with real-time observability and automated alerting systems.",
        impact: "Reduced model downtime by 40% and improved data scientists' iteration speed by 2x.",
        tech: ["Python", "TensorFlow", "React", "D3.js"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2500&auto=format&fit=crop",
      },
    ],
  },
  {
    year: "2023",
    projects: [
      {
        id: 3,
        title: "Zenith Architecture",
        problem: "Global enterprise client required a secure, multi-tenant cloud framework for sensitive AI agents.",
        solution: "Designed a zero-trust agentic framework with isolated execution environments and robust auditing.",
        impact: "Successfully passed 3 major security audits and onboarded 50+ enterprise teams.",
        tech: ["Node.js", "Kubernetes", "AWS", "gRPC"],
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
      },
    ],
  },
  {
    year: "2022",
    projects: [
      {
        id: 4,
        title: "Quantum Ledger",
        problem: "Financial transactions required immutable audit trails with sub-millisecond validation.",
        solution: "Implemented a high-performance blockchain-inspired ledger using Rust and WebAssembly.",
        impact: "Handled 1M+ transactions per second with cryptographic certainty.",
        tech: ["Rust", "WASM", "RocksDB", "ZKP"],
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
      },
    ],
  },
];

function ProjectCard({ project, index, total }) {
  // Stacking effect based on the provided requirements
  // index 0 is the active card (at the front)
  const isFront = index === 0;
  
  const variants = {
    enter: { scale: 0.9, opacity: 0, y: 40 },
    center: {
      scale: isFront ? 1 : 0.95 - (index * 0.02),
      opacity: isFront ? 1 : 0.7 - (index * 0.15),
      y: index * 20,
      zIndex: total - index,
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
    },
    exit: { 
      scale: 1.1, 
      opacity: 0, 
      y: -40,
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-white/40 bg-white/40 backdrop-blur-md shadow-2xl ${isFront ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Content Side */}
        <div className="p-8 md:p-12 flex flex-col justify-between order-2 lg:order-1">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#FF6F61] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                0{project.id}
              </span>
              <span className="text-[10px] font-bold text-[#1A1A1A]/40 uppercase tracking-widest">Case Study</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8 tracking-tight">
              {project.title}
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-bold text-[#FF6F61] uppercase tracking-widest mb-1">Problem</h4>
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed font-light line-clamp-2 md:line-clamp-none">{project.problem}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-[#FF6F61] uppercase tracking-widest mb-1">Solution</h4>
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed font-light line-clamp-2 md:line-clamp-none">{project.solution}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-[#FF6F61] uppercase tracking-widest mb-1">Impact</h4>
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed font-medium line-clamp-2 md:line-clamp-none">{project.impact}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map(t => (
                <span key={t} className="text-[10px] font-semibold text-[#1A1A1A]/50 bg-white/60 border border-black/5 px-2.5 py-1 rounded-md">{t}</span>
              ))}
            </div>
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-[#1A1A1A] font-bold text-sm group"
            >
              Full Details
              <ArrowUpRight className="w-4 h-4 text-[#FF6F61] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>
          </div>
        </div>

        {/* Visual Side */}
        <div className="relative h-48 lg:h-auto order-1 lg:order-2 overflow-hidden bg-[#1A1A1A]/5">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDF8F5]/80 via-transparent to-transparent lg:bg-gradient-to-r" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const activeYearData = ROADMAP_DATA[activeYearIndex];
  const projectsCount = activeYearData.projects.length;

  const nextProject = () => {
    setActiveProjectIndex((prev) => (prev + 1) % projectsCount);
  };

  const prevProject = () => {
    setActiveProjectIndex((prev) => (prev - 1 + projectsCount) % projectsCount);
  };

  const setYear = (idx) => {
    setActiveYearIndex(idx);
    setActiveProjectIndex(0);
  };

  // Prepare visible stack: current project is at index 0, others follow
  const visibleStack = [];
  for (let i = 0; i < projectsCount; i++) {
    const pIdx = (activeProjectIndex + i) % projectsCount;
    visibleStack.push({ ...activeYearData.projects[pIdx], stackIdx: i });
  }

  return (
    <section id="projects" className="relative min-h-screen py-24 px-8 md:px-20 bg-[#FDF8F5] overflow-hidden flex flex-col justify-center">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none z-0" 
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #1A1A1A 0.5px, transparent 0)`, backgroundSize: "40px 40px" }} 
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#FF6F61]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <header className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-[#1A1A1A] mb-4"
          >
            Project Roadmap
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-[#1A1A1A]/50 font-light max-w-lg"
          >
            A chronological journey through high-impact systems, architectural challenges, and engineering milestones.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Vertical Timeline */}
          <div className="lg:col-span-3 flex lg:flex-col justify-between lg:justify-center items-center lg:items-start gap-8 py-8 relative">
            {/* Vertical Line (Desktop) */}
            <div className="hidden lg:block absolute left-[11px] top-0 bottom-0 w-[1px] bg-[#1A1A1A]/10" />
            
            {ROADMAP_DATA.map((item, idx) => (
              <button
                key={item.year}
                onClick={() => setYear(idx)}
                className="group relative flex items-center gap-6 z-10"
              >
                {/* Node */}
                <div className={`w-[23px] h-[23px] rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                  activeYearIndex === idx 
                    ? 'border-[#FF6F61] bg-[#FF6F61]' 
                    : 'border-[#1A1A1A]/20 bg-[#FDF8F5] group-hover:border-[#FF6F61]/50'
                }`}>
                  {activeYearIndex === idx && (
                    <motion.div 
                      layoutId="active-dot"
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>

                {/* Label */}
                <span className={`text-lg font-bold transition-all duration-300 ${
                  activeYearIndex === idx ? 'text-[#FF6F61] scale-110' : 'text-[#1A1A1A]/30 group-hover:text-[#1A1A1A]/60'
                }`}>
                  {item.year}
                </span>

                {/* Active Indicator Bar (Desktop) */}
                {activeYearIndex === idx && (
                  <motion.div 
                    layoutId="active-bar"
                    className="hidden lg:block absolute -left-4 w-1 h-8 bg-[#FF6F61] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* RIGHT: Stacked Cards */}
          <div className="lg:col-span-9 relative">
            <div className="relative w-full aspect-[4/5] md:aspect-[16/10] lg:aspect-[16/9] max-w-4xl mx-auto">
              <AnimatePresence mode="popLayout">
                {visibleStack.map((project, i) => (
                  <ProjectCard
                    key={`${activeYearData.year}-${project.id}`}
                    project={project}
                    index={project.stackIdx}
                    total={projectsCount}
                  />
                ))}
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute -bottom-16 right-0 flex gap-4">
                <button
                  onClick={prevProject}
                  disabled={projectsCount <= 1}
                  className={`p-4 rounded-full border border-black/5 bg-white/40 backdrop-blur-md text-[#1A1A1A] transition-all shadow-sm ${
                    projectsCount <= 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#FF6F61] hover:text-white hover:border-[#FF6F61]'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextProject}
                  disabled={projectsCount <= 1}
                  className={`p-4 rounded-full border border-black/5 bg-white/40 backdrop-blur-md text-[#1A1A1A] transition-all shadow-sm ${
                    projectsCount <= 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#FF6F61] hover:text-white hover:border-[#FF6F61]'
                  }`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Counter Indicator */}
              <div className="absolute -bottom-12 left-0 text-[10px] font-bold text-[#1A1A1A]/30 uppercase tracking-[0.2em]">
                {activeProjectIndex + 1} / {projectsCount} PROJECTS in {activeYearData.year}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
