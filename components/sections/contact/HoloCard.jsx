import React, { useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Github, Linkedin, Twitter, MessageSquare, FileText, ChevronRight, Activity } from "lucide-react";

const ICON_MAP = { Github, Linkedin, Twitter, MessageSquare, FileText };

const THEME_STYLES = {
  github: {
    bg: "bg-gray-900",
    border: "border-gray-700/50",
    text: "text-gray-100",
    glow: "from-gray-500/20 via-gray-600/10 to-transparent",
    accent: "bg-gray-100",
    textAccent: "text-gray-300"
  },
  linkedin: {
    bg: "bg-slate-950/80",
    border: "border-blue-500/50",
    text: "text-white",
    glow: "from-blue-500/40 via-cyan-400/20 to-transparent",
    accent: "bg-blue-500",
    textAccent: "text-blue-400"
  },
  twitter: {
    bg: "bg-[#0A0A0A]/90",
    border: "border-gray-600/40",
    text: "text-white",
    glow: "from-gray-400/20 via-gray-600/10 to-transparent",
    accent: "bg-white",
    textAccent: "text-gray-300"
  },
  discord: {
    bg: "bg-indigo-950/80",
    border: "border-[#5865F2]/50",
    text: "text-white",
    glow: "from-[#5865F2]/40 via-purple-500/20 to-transparent",
    accent: "bg-[#5865F2]",
    textAccent: "text-[#5865F2]"
  },
  resume: {
    bg: "bg-[#FDF8F5]",
    border: "border-[#FF6F61]/20",
    text: "text-[#1A1A1A]",
    glow: "from-[#FF6F61]/20 via-[#FF6F61]/5 to-transparent",
    accent: "bg-[#FF6F61]",
    textAccent: "text-[#FF6F61]"
  }
};

export default function HoloCard({ activeNode }) {
  const cardRef = useRef(null);

  // Physics - Heavier and more luxurious
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 30 });

  // Specular Glare Tracking
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 30 });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 30 });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;

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
      className="w-full max-w-[360px] aspect-[5/7] mx-auto relative rounded-[2rem] overflow-hidden shadow-2xl group border border-white/10"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className={`absolute inset-0 w-full h-full flex flex-col justify-between p-8 border backdrop-blur-3xl transition-colors duration-700 ${currentTheme.bg} ${currentTheme.border}`}
        >
          {/* Base Holographic Gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[2rem]">
            <div className={`absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br ${currentTheme.glow} opacity-60 mix-blend-screen rotate-12`} />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[100px] rounded-full" />
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className={`text-[9px] uppercase tracking-[0.2em] font-bold mb-2 ${currentTheme.textAccent}`}>
                  {activeNode.systemLabel}
                </div>
                <h3 className={`text-2xl font-black tracking-tight ${currentTheme.text}`}>
                  {activeNode.platform}
                </h3>
              </div>
              <div className={`p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 ${currentTheme.text} shadow-xl`}>
                {React.createElement(ICON_MAP[activeNode.logo] || Activity, { size: 24 })}
              </div>
            </div>

            {/* Narrative Description */}
            <div className="my-6">
              <p className={`text-sm leading-relaxed ${currentTheme.text} opacity-80 font-light`}>
                "{activeNode.description}"
              </p>
            </div>

            {/* SocialMetadata Grid */}
            <div className="flex flex-col gap-3 mb-6 p-4 rounded-xl bg-black/10 border border-white/5 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className={`text-[9px] uppercase tracking-widest font-bold opacity-50 ${currentTheme.text}`}>Status</span>
                <span className={`text-[10px] font-bold flex items-center gap-2 ${currentTheme.textAccent}`}>
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentTheme.accent}`} />
                  {activeNode.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-[9px] uppercase tracking-widest font-bold opacity-50 ${currentTheme.text}`}>Active Since</span>
                <span className={`text-[10px] font-bold ${currentTheme.text}`}>{activeNode.activeSince}</span>
              </div>
              {activeNode.metadata.slice(0, 2).map((meta, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className={`text-[9px] uppercase tracking-widest font-bold opacity-50 ${currentTheme.text}`}>{meta.label}</span>
                  <span className={`text-[10px] font-bold ${currentTheme.text}`}>{meta.value}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-white/10">
              <motion.a
                href={activeNode.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors shadow-lg ${currentTheme.accent} text-white hover:opacity-90`}
              >
                Access Node
              </motion.a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Layer 2: Noise Texture */}
      <div
        className="absolute inset-0 z-20 mix-blend-overlay pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      />

      {/* Layer 3: Specular Glare Hotspot */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: glareBackground }}
      />

      {/* Layer 5: Edge Fresnel Lighting */}
      <div className="absolute inset-0 z-40 rounded-[2rem] border-[1px] border-white/20 pointer-events-none mix-blend-overlay" />
    </motion.div>
  );
}
