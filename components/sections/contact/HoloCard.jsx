import React, { useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Twitter, MessageSquare, FileText, ChevronRight, Activity } from "lucide-react";

const ICON_MAP = { Github, Linkedin, Twitter, MessageSquare, FileText };

export default function HoloCard({ activeNode }) {
  const cardRef = useRef(null);
  
  // Parallax physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200, rotateX, rotateY }}
      className="w-full aspect-[4/3] lg:aspect-auto lg:h-[550px] relative rounded-[2.5rem] overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className={`absolute inset-0 w-full h-full flex flex-col justify-between p-8 md:p-12 border backdrop-blur-2xl transition-colors duration-500 ${activeNode.theme.bg} ${activeNode.theme.border}`}
        >
          {/* Holographic layered gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[2.5rem]">
            <div className={`absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br ${activeNode.theme.glow} opacity-60 mix-blend-overlay rotate-12`} />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[100px] rounded-full" />
            
            {/* Soft inner glow border */}
            <div className={`absolute inset-0 rounded-[2.5rem] border-[1.5px] bg-gradient-to-br opacity-30 ${activeNode.theme.glow} mix-blend-screen pointer-events-none`} />
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className={`text-[10px] uppercase tracking-[0.3em] font-bold mb-2 ${activeNode.theme.textAccent}`}>
                  {activeNode.systemLabel}
                </div>
                <h3 className={`text-3xl md:text-4xl font-black tracking-tight ${activeNode.theme.text}`}>
                  {activeNode.platform}
                </h3>
                <p className={`text-sm md:text-base font-medium mt-1 opacity-70 ${activeNode.theme.text}`}>
                  {activeNode.username}
                </p>
              </div>
              <div className={`p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 ${activeNode.theme.text} shadow-xl`}>
                {React.createElement(ICON_MAP[activeNode.logo] || Activity, { size: 36 })}
              </div>
            </div>

            {/* Narrative Description */}
            <div className="my-6">
              <p className={`text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-md ${activeNode.theme.text} opacity-80`}>
                "{activeNode.description}"
              </p>
            </div>

            {/* SocialMetadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-6 rounded-2xl bg-black/5 border border-white/5 backdrop-blur-sm">
              {/* Status */}
              <div>
                <div className={`text-[9px] uppercase tracking-widest font-bold opacity-50 mb-1 ${activeNode.theme.text}`}>Status</div>
                <div className={`text-xs font-bold flex items-center gap-2 ${activeNode.theme.textAccent}`}>
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${activeNode.theme.accent}`} />
                  {activeNode.status}
                </div>
              </div>
              {/* Active Since */}
              <div>
                <div className={`text-[9px] uppercase tracking-widest font-bold opacity-50 mb-1 ${activeNode.theme.text}`}>Active Since</div>
                <div className={`text-xs font-bold ${activeNode.theme.text}`}>{activeNode.activeSince}</div>
              </div>
              {/* Dynamic Metadata */}
              {activeNode.metadata.slice(0, 2).map((meta, i) => (
                <div key={i}>
                  <div className={`text-[9px] uppercase tracking-widest font-bold opacity-50 mb-1 ${activeNode.theme.text}`}>{meta.label}</div>
                  <div className={`text-xs font-bold ${activeNode.theme.text}`}>{meta.value}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className={`text-[10px] font-bold uppercase tracking-widest opacity-40 ${activeNode.theme.text}`}>
                Identity Node Verified
              </div>
              <motion.a
                href={activeNode.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-lg ${activeNode.theme.accent} text-white hover:opacity-90`}
              >
                Access Protocol <ChevronRight size={14} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
