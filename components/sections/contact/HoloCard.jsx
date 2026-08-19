import React, { useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Github, Linkedin, Twitter, MessageSquare, FileText, Activity } from "lucide-react";

const ICON_MAP = { Github, Linkedin, Twitter, MessageSquare, FileText };

const THEME_STYLES = {
  github: {
    bg: "bg-gradient-to-br from-gray-800 to-gray-900",
    border: "border-gray-500/30",
    text: "text-gray-100",
    glow: "from-gray-400/20 via-gray-500/10 to-transparent",
    accent: "bg-gray-100 text-gray-900",
    textAccent: "text-gray-400",
    shadow: "shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
  },
  linkedin: {
    bg: "bg-gradient-to-br from-slate-800 to-slate-950",
    border: "border-blue-400/30",
    text: "text-white",
    glow: "from-blue-400/30 via-cyan-300/10 to-transparent",
    accent: "bg-blue-500 text-white",
    textAccent: "text-blue-300",
    shadow: "shadow-[0_30px_60px_rgba(59,130,246,0.25)]"
  },
  twitter: {
    bg: "bg-gradient-to-br from-[#1a1a1a] to-black",
    border: "border-gray-600/40",
    text: "text-white",
    glow: "from-gray-300/20 via-gray-500/10 to-transparent",
    accent: "bg-white text-black",
    textAccent: "text-gray-400",
    shadow: "shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
  },
  discord: {
    bg: "bg-gradient-to-br from-indigo-900 to-slate-900",
    border: "border-[#5865F2]/40",
    text: "text-white",
    glow: "from-[#5865F2]/30 via-purple-400/10 to-transparent",
    accent: "bg-[#5865F2] text-white",
    textAccent: "text-indigo-300",
    shadow: "shadow-[0_30px_60px_rgba(88,101,242,0.3)]"
  },
  resume: {
    bg: "bg-gradient-to-br from-[#EAE0D5] to-[#D5C6B8]",
    border: "border-white/40",
    text: "text-[#1A1A1A]",
    glow: "from-white/60 via-white/20 to-transparent",
    accent: "bg-[#1A1A1A] text-white",
    textAccent: "text-[#1A1A1A]/50",
    shadow: "shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
  }
};

export default function HoloCard({ activeNode }) {
  const cardRef = useRef(null);

  // Physics - Softer, heavier, cinematic glide
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 70, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 70, damping: 20 });

  // Specular Glare Tracking
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [100, 0]), { stiffness: 70, damping: 20 });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [100, 0]), { stiffness: 70, damping: 20 });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 50%)`;

  // Holographic Light Sweep Tracking
  const sweepX = useSpring(useTransform(x, [-0.5, 0.5], [-100, 200]), { stiffness: 50, damping: 20 });
  const sweepBackground = useMotionTemplate`linear-gradient(105deg, transparent calc(${sweepX}% - 15%), rgba(255,255,255,0.3) ${sweepX}%, transparent calc(${sweepX}% + 15%))`;

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

  const currentTheme = THEME_STYLES[activeNode.theme] || THEME_STYLES.github;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1500, rotateX, rotateY }}
      className={`w-full max-w-[480px] aspect-[1.6/1] mx-auto relative rounded-2xl overflow-hidden group cursor-pointer ${currentTheme.shadow} transition-shadow duration-700`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className={`absolute inset-0 w-full h-full p-8 transition-colors duration-700 ${currentTheme.bg}`}
        >
          {/* Base Holographic Gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
            <div className={`absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br ${currentTheme.glow} opacity-80 mix-blend-screen rotate-12`} />
          </div>

          <div className="relative z-10 flex h-full gap-6">
            {/* LEFT COLUMN: Identity */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 ${currentTheme.text} shadow-sm`}>
                    {React.createElement(ICON_MAP[activeNode.logo] || Activity, { size: 18 })}
                  </div>
                  <div className={`text-[8px] uppercase tracking-[0.25em] font-bold ${currentTheme.textAccent}`}>
                    {activeNode.systemLabel}
                  </div>
                </div>
                <h3 className={`text-2xl font-black tracking-tight ${currentTheme.text} mt-4`}>
                  {activeNode.platform}
                </h3>
                <p className={`text-[11px] mt-3 leading-relaxed ${currentTheme.text} opacity-70 font-medium max-w-[200px]`}>
                  &quot;{activeNode.description}&quot;
                </p>
              </div>

              <div className="mt-auto">
                <span className={`text-[8px] uppercase tracking-widest font-bold opacity-50 ${currentTheme.text}`}>Status</span>
                <div className={`text-[10px] font-bold flex items-center gap-2 mt-1 ${currentTheme.textAccent}`}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-current" />
                  {activeNode.status}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Data & Action */}
            <div className="w-[140px] flex flex-col justify-between border-l border-white/10 pl-6">
              <div className="flex flex-col gap-4">
                <div>
                  <span className={`block text-[8px] uppercase tracking-widest font-bold opacity-50 ${currentTheme.text} mb-1`}>Active Since</span>
                  <span className={`block text-[10px] font-bold ${currentTheme.text}`}>{activeNode.activeSince}</span>
                </div>
                {activeNode.metadata.slice(0, 2).map((meta, i) => (
                  <div key={i}>
                    <span className={`block text-[8px] uppercase tracking-widest font-bold opacity-50 ${currentTheme.text} mb-1`}>{meta.label}</span>
                    <span className={`block text-[10px] font-bold ${currentTheme.text}`}>{meta.value}</span>
                  </div>
                ))}
              </div>

              <motion.a
                href={activeNode.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-2.5 rounded text-[9px] font-bold uppercase tracking-widest transition-all shadow-lg text-center ${currentTheme.accent} hover:opacity-90 mt-4`}
              >
                Access
              </motion.a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Layer 2: Brushed Noise Texture (Horizontal stretch for brushed metal) */}
      <div
        className="absolute inset-0 z-20 mix-blend-overlay pointer-events-none opacity-20"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.1 2%22 numOctaves=%221%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      />

      {/* Layer 3: Specular Glare Hotspot */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: glareBackground }}
      />
      
      {/* Layer 4: Holo Light Sweep */}
      <motion.div
        className="absolute inset-0 z-40 pointer-events-none mix-blend-screen opacity-0 group-hover:opacity-70 transition-opacity duration-500"
        style={{ background: sweepBackground }}
      />

      {/* Layer 5: Thick Edge Fresnel Lighting */}
      <div className={`absolute inset-0 z-50 rounded-2xl border-t-[1.5px] border-l-[1px] border-white/40 pointer-events-none mix-blend-overlay ${currentTheme.border}`} />
      <div className="absolute inset-0 z-50 rounded-2xl border-b-[2px] border-r-[1px] border-black/40 pointer-events-none mix-blend-overlay" />
    </motion.div>
  );
}
