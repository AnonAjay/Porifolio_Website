"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CapabilityCard({ title, text, icon, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.15 * index, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 1000, rotateX, rotateY }}
      className="group relative bg-white/40 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-lg cursor-default transition-shadow duration-300 hover:shadow-2xl hover:bg-white/60"
    >
      <div className="absolute -top-px -right-px w-16 h-16 bg-gradient-to-bl from-[#FF6F61]/20 to-transparent rounded-tr-xl rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <motion.span style={{ display: "block" }} className="text-2xl mb-3" whileHover={{ scale: 1.2, rotate: 10 }}>{icon}</motion.span>
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-[#1A1A1A]/60 leading-relaxed font-light">{text}</p>
      </div>
    </motion.div>
  );
}
