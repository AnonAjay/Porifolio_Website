"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  ChevronRight, 
  Binary, 
  FlaskConical, 
  Box, 
  Layers, 
  Target,
  GitBranch
} from "lucide-react";
import { MISSIONS } from "../../data/experience";
import EvolutionGraph from "../animations/EvolutionGraph";
import SectionHeader from "../common/SectionHeader";
import GridBackground from "../common/GridBackground";
import TechPill from "../ui/TechPill";
import SectionWrapper from "../layout/SectionWrapper";

const ICON_MAP = { Binary, FlaskConical, Box, Layers, Target };

export default function ExperienceSection() {
  const [activeId, setActiveId] = useState("05");
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const activeMission = useMemo(() => 
    MISSIONS.find(m => m.id === activeId) || MISSIONS[MISSIONS.length - 1],
    [activeId]
  );

  return (
    <SectionWrapper 
      id="experience"
      ref={sectionRef}
      className="bg-[#FDF8F5] font-['Inter']"
    >
      <div className="max-w-7xl w-full">
        <SectionHeader 
          accent="Capability Progression"
          title="Engineering Evolution Map"
          subtitle="A topological visualization of technical capability growth and architectural maturity."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[600px]">
          {/* LEFT: GRAPH */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] shadow-xl shadow-[#FF6F61]/5 border border-gray-100 p-8 relative overflow-hidden flex items-center justify-center">
            <GridBackground type="linear" opacity="opacity-[0.03]" />
            <EvolutionGraph 
              activeId={activeId}
              hoveredId={hoveredId}
              isInView={isInView}
              icons={ICON_MAP}
              onNodeClick={setActiveId}
              onNodeHover={setHoveredId}
              onNodeLeave={() => setHoveredId(null)}
            />
          </div>

          {/* RIGHT: PANEL */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="h-full bg-white rounded-[2.5rem] shadow-xl shadow-[#FF6F61]/5 border border-gray-100 p-10 flex flex-col"
              >
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-[#FF6F61]/10 text-[#FF6F61] text-[9px] font-bold rounded-full uppercase tracking-widest">
                      {activeMission.period}
                    </span>
                    <GitBranch size={14} className="text-gray-300" />
                    <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">Mission {activeMission.id}</span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-2 leading-tight">{activeMission.role}</h3>
                  <p className="text-lg text-[#FF6F61] font-bold tracking-tight">{activeMission.company}</p>
                </div>

                <div className="space-y-8 flex-1">
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Architectural Focus</h4>
                    <p className="text-gray-600 font-medium leading-relaxed italic">"{activeMission.focus}"</p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Systems Built</h4>
                    <div className="space-y-2">
                      {activeMission.systems.map((s, i) => (
                        <div key={i} className="flex items-center gap-3 group">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6F61] group-hover:scale-150 transition-transform" />
                          <span className="text-sm text-gray-700 font-bold">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Core Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeMission.tech.map((t, i) => (
                        <TechPill key={i} text={t} variant="evolution" />
                      ))}
                    </div>
                  </div>

                  <div className="p-5 bg-[#FDF8F5] rounded-2xl border border-gray-100/50">
                    <h4 className="text-[10px] font-bold text-[#FF6F61] uppercase tracking-[0.2em] mb-2">Lesson Learned</h4>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">{activeMission.lessons}</p>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-50">
                  <motion.button whileHover={{ x: 5 }} className="flex items-center gap-2 text-[#FF6F61] font-bold text-xs uppercase tracking-widest">
                    Deep Dive Case Study <ChevronRight size={14} />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center gap-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6F61] animate-pulse" />
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Evolutionary Topology Activated</span>
      </div>
    </SectionWrapper>
  );
}
