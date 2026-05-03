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

const PROJECTS = [
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
  {
    id: 3,
    title: "Zenith Architecture",
    problem: "Global enterprise client required a secure, multi-tenant cloud framework for sensitive AI agents.",
    solution: "Designed a zero-trust agentic framework with isolated execution environments and robust auditing.",
    impact: "Successfully passed 3 major security audits and onboarded 50+ enterprise teams.",
    tech: ["Node.js", "Kubernetes", "AWS", "gRPC"],
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
  },
];

function ProjectCard({ project, index, isActive }) {
  // Stacking effect: Cards behind the active one are scaled down and moved down
  const stackEffect = {
    initial: { scale: 0.9, opacity: 0, y: 40 },
    animate: {
      scale: 1 - index * 0.05,
      opacity: 1 - index * 0.25,
      y: index * 20,
      zIndex: 10 - index,
    },
    exit: { scale: 1.1, opacity: 0, y: -40 }
  };

  return (
    <motion.div
      layout
      initial={stackEffect.initial}
      animate={stackEffect.animate}
      exit={stackEffect.exit}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-white/40 bg-white/60 backdrop-blur-xl shadow-2xl ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Left — Content */}
        <div className="p-8 md:p-12 flex flex-col justify-between order-2 lg:order-1">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#FF6F61] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Case Study 0{project.id}
              </span>
            </div>

            <h3 className="text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-8 tracking-tight">
              {project.title}
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-[11px] font-bold text-[#FF6F61] uppercase tracking-widest mb-2">The Problem</h4>
                <p className="text-[#1A1A1A]/70 text-sm md:text-base leading-relaxed font-light">{project.problem}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-[#FF6F61] uppercase tracking-widest mb-2">The Solution</h4>
                <p className="text-[#1A1A1A]/70 text-sm md:text-base leading-relaxed font-light">{project.solution}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-[#FF6F61] uppercase tracking-widest mb-2">The Impact</h4>
                <p className="text-[#1A1A1A]/70 text-sm md:text-base leading-relaxed font-light font-medium">{project.impact}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map(t => (
                <span key={t} className="text-[10px] font-semibold text-[#1A1A1A]/50 bg-white/80 border border-black/5 px-2.5 py-1 rounded-md">{t}</span>
              ))}
            </div>
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-[#1A1A1A] font-bold text-sm group"
            >
              View Full Architecture
              <ArrowUpRight className="w-4 h-4 text-[#FF6F61] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>
          </div>
        </div>

        {/* Right — Image */}
        <div className="relative h-64 lg:h-auto order-1 lg:order-2 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent lg:hidden" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % PROJECTS.length);
  const prev = () => setIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  // We show current and the next few in the stack
  const visibleProjects = [];
  for (let i = 0; i < PROJECTS.length; i++) {
    const projectIndex = (index + i) % PROJECTS.length;
    visibleProjects.push({ ...PROJECTS[projectIndex], stackIndex: i });
  }

  return (
    <section id="projects" className="relative min-h-screen py-32 px-8 md:px-20 bg-[#FDF8F5] overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6F61]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col items-center">

        <div className="w-full flex items-end justify-between mb-16">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1A1A1A] mb-4">
              Case Studies
            </h2>
            <p className="text-base text-[#1A1A1A]/50 font-light">
              Deep dives into complex systems built with precision and scalability.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-4">
            <button
              onClick={prev}
              className="p-4 rounded-full border border-black/5 bg-white/40 backdrop-blur-md text-[#1A1A1A] transition-all hover:bg-[#FF6F61] hover:text-white hover:border-[#FF6F61] shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-4 rounded-full border border-black/5 bg-white/40 backdrop-blur-md text-[#1A1A1A] transition-all hover:bg-[#FF6F61] hover:text-white hover:border-[#FF6F61] shadow-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stacked Container */}
        <div className="relative w-full aspect-[4/5] md:aspect-[16/10] lg:aspect-[16/9]">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={project.stackIndex}
                isActive={project.stackIndex === 0}
              />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
