"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Database, Cpu, Brain, Send } from "lucide-react";

const PIPELINE_STAGES = [
  { 
    id: "data", 
    label: "Data", 
    icon: <Database className="w-6 h-6" />,
    tools: ["PostgreSQL", "Redis", "Kafka", "Vector DBs"] 
  },
  { 
    id: "processing", 
    label: "Processing", 
    icon: <Cpu className="w-6 h-6" />,
    tools: ["Go", "Node.js", "Python", "Kubernetes"] 
  },
  { 
    id: "intelligence", 
    label: "Intelligence", 
    icon: <Brain className="w-6 h-6" />,
    tools: ["LLMs", "LangChain", "PyTorch", "Agents"] 
  },
  { 
    id: "delivery", 
    label: "Delivery", 
    icon: <Send className="w-6 h-6" />,
    tools: ["React/Next.js", "Three.js", "Framer Motion", "Vercel"] 
  }
];

function PipelineNode({ stage, index, total, hoveredId, setHoveredId }) {
  const nodeRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  function handleMouseMove(e) {
    if (!nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHoveredId(null);
  }

  const isHovered = hoveredId === stage.id;

  return (
    <div className="relative flex flex-col items-center">
      {/* Stage Number */}
      <div className={`absolute -top-8 text-[10px] font-bold tracking-[0.2em] transition-colors duration-500 ${isHovered ? 'text-[#FF6F61]' : 'text-[#1A1A1A]/20'}`}>
        STAGE 0{index + 1}
      </div>

      {/* Node Card */}
      <motion.div
        ref={nodeRef}
        onMouseMove={(e) => { handleMouseMove(e); setHoveredId(stage.id); }}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 1000 }}
        whileHover={{ scale: 1.08 }}
        className={`w-32 h-32 md:w-44 md:h-44 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-500 border ${
          isHovered 
            ? 'bg-white/70 border-[#FF6F61] shadow-[0_20px_50px_rgba(255,111,97,0.15)]' 
            : 'bg-white/40 border-white/30 shadow-lg'
        } backdrop-blur-md z-20`}
      >
        <div className={`transition-all duration-500 transform ${isHovered ? 'text-[#FF6F61] scale-110' : 'text-[#1A1A1A]/40'}`}>
          {stage.icon}
        </div>
        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${isHovered ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/30'}`}>
          {stage.label}
        </span>

        {/* Inner Subtle Glow */}
        {isHovered && (
          <motion.div
            layoutId="inner-glow"
            className="absolute inset-0 bg-gradient-to-br from-[#FF6F61]/5 to-transparent rounded-3xl pointer-events-none"
          />
        )}
      </motion.div>

      {/* Tool List Reveal */}
      <div className="absolute top-full mt-6 h-32 pointer-events-none">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-2"
            >
              {stage.tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-1.5 bg-white/90 border border-[#FF6F61]/20 rounded-full text-[10px] font-bold text-[#1A1A1A]/70 shadow-sm whitespace-nowrap"
                >
                  {tool}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Stage Indicator Dot */}
      {isHovered && (
        <motion.div
          layoutId="active-dot"
          className="absolute -bottom-4 w-1.5 h-1.5 bg-[#FF6F61] rounded-full shadow-[0_0_10px_#FF6F61]"
        />
      )}
    </div>
  );
}

export default function TechStack() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="tech-stack" className="relative min-h-[80vh] flex flex-col justify-center py-32 px-8 md:px-20 bg-[#FDF8F5] overflow-hidden">
      {/* Background Pipeline Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #1A1A1A 0.5px, transparent 0)`, backgroundSize: "40px 40px" }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <header className="mb-24 text-center max-w-2xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold text-[#FF6F61] uppercase tracking-[0.3em] mb-4 block"
          >
            System Pipeline
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6 tracking-tight"
          >
            Intelligent Workflow
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base text-[#1A1A1A]/50 font-light"
          >
            A cohesive architectural journey through the technical stages that transform raw data into delivered intelligence.
          </motion.p>
        </header>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 mt-12 pb-32">
          
          {/* Connecting Lines (Desktop) */}
          <div className="hidden lg:block absolute top-[4.5rem] md:top-[5.5rem] left-0 w-full h-[2px] bg-[#1A1A1A]/5 -z-0">
             {/* Dynamic Progress Line */}
             {hoveredId && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(PIPELINE_STAGES.findIndex(s => s.id === hoveredId) + 1) * 25}%` 
                  }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF6F61] to-[#FFC1A6] shadow-[0_0_10px_rgba(255,111,97,0.3)]"
                />
             )}
          </div>

          {PIPELINE_STAGES.map((stage, index) => (
            <PipelineNode 
              key={stage.id} 
              stage={stage} 
              index={index} 
              total={PIPELINE_STAGES.length}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* Decorative Text */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[120px] font-bold text-[#1A1A1A]/[0.02] select-none pointer-events-none whitespace-nowrap">
        ARCHITECTURAL STACK
      </div>
    </section>
  );
}
