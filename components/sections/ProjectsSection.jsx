"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ROADMAP_DATA } from "../../data/projects";
import ProjectCard from "../cards/ProjectCard";
import SectionHeader from "../common/SectionHeader";
import GridBackground from "../common/GridBackground";

export default function ProjectsSection() {
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const activeYearData = ROADMAP_DATA[activeYearIndex];
  const projectsCount = activeYearData.projects.length;

  const nextProject = () => setActiveProjectIndex((prev) => (prev + 1) % projectsCount);
  const prevProject = () => setActiveProjectIndex((prev) => (prev - 1 + projectsCount) % projectsCount);

  const setYear = (idx) => {
    setActiveYearIndex(idx);
    setActiveProjectIndex(0);
  };

  const visibleStack = [];
  for (let i = 0; i < projectsCount; i++) {
    const pIdx = (activeProjectIndex + i) % projectsCount;
    visibleStack.push({ ...activeYearData.projects[pIdx], stackIdx: i });
  }

  return (
    <section id="projects" className="relative min-h-screen py-24 px-8 md:px-20 bg-[#FDF8F5] overflow-hidden flex flex-col justify-center">
      <GridBackground type="radial" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#FF6F61]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <SectionHeader 
          title="Project Roadmap"
          subtitle="A chronological journey through high-impact systems, architectural challenges, and engineering milestones."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: Vertical Timeline */}
          <div className="lg:col-span-3 flex lg:flex-col justify-between lg:justify-center items-center lg:items-start gap-8 py-8 relative">
            <div className="hidden lg:block absolute left-[11px] top-0 bottom-0 w-[1px] bg-[#1A1A1A]/10" />
            
            {ROADMAP_DATA.map((item, idx) => (
              <button
                key={item.year}
                onClick={() => setYear(idx)}
                className="group relative flex items-center gap-6 z-10"
              >
                <div className={`w-[23px] h-[23px] rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                  activeYearIndex === idx ? 'border-[#FF6F61] bg-[#FF6F61]' : 'border-[#1A1A1A]/20 bg-[#FDF8F5] group-hover:border-[#FF6F61]/50'
                }`}>
                  {activeYearIndex === idx && <motion.div layoutId="active-dot" className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`text-lg font-bold transition-all duration-300 ${activeYearIndex === idx ? 'text-[#FF6F61] scale-110' : 'text-[#1A1A1A]/30 group-hover:text-[#1A1A1A]/60'}`}>
                  {item.year}
                </span>
                {activeYearIndex === idx && <motion.div layoutId="active-bar" className="hidden lg:block absolute -left-4 w-1 h-8 bg-[#FF6F61] rounded-full" />}
              </button>
            ))}
          </div>

          {/* RIGHT: Stacked Cards */}
          <div className="lg:col-span-9 relative">
            <div className="relative w-full aspect-[4/5] md:aspect-[16/10] lg:aspect-[16/9] max-w-4xl mx-auto">
              <AnimatePresence mode="popLayout">
                {visibleStack.map((project) => (
                  <ProjectCard
                    key={`${activeYearData.year}-${project.id}`}
                    project={project}
                    index={project.stackIdx}
                    total={projectsCount}
                    isFront={project.stackIdx === 0}
                  />
                ))}
              </AnimatePresence>

              {/* Navigation */}
              <div className="absolute -bottom-16 right-0 flex gap-4">
                {[
                  { icon: ChevronLeft, action: prevProject },
                  { icon: ChevronRight, action: nextProject }
                ].map((btn, i) => (
                  <button
                    key={i}
                    onClick={btn.action}
                    disabled={projectsCount <= 1}
                    className={`p-4 rounded-full border border-black/5 bg-white/40 backdrop-blur-md text-[#1A1A1A] transition-all shadow-sm ${
                      projectsCount <= 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#FF6F61] hover:text-white hover:border-[#FF6F61]'
                    }`}
                  >
                    <btn.icon className="w-6 h-6" />
                  </button>
                ))}
              </div>

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
