"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Terminal as TerminalIcon,
  ChevronRight, 
  Cpu, 
  Workflow,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  Slack as SlackIcon,
  Mail
} from "lucide-react";
import { CHANNELS, BOOT_MESSAGES } from "../../data/socials";
import ChannelCard from "../cards/ChannelCard";
import GridBackground from "../common/GridBackground";
import useMousePosition from "../../hooks/useMousePosition";

const ICON_MAP = { Github, Linkedin, Twitter, MessageSquare, SlackIcon, Mail };

export default function ContactSection() {
  const [hoveredId, setHoveredId] = useState(null);
  const [bootIndex, setBootIndex] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  useMousePosition(sectionRef);

  useEffect(() => {
    if (isInView && bootIndex < BOOT_MESSAGES.length) {
      const timer = setTimeout(() => {
        setBootIndex(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else if (bootIndex === BOOT_MESSAGES.length) {
      setIsBooted(true);
    }
  }, [isInView, bootIndex]);

  return (
    <section 
      ref={sectionRef}
      className="w-full min-h-screen bg-[#FDF8F5] py-24 px-6 md:px-12 flex flex-col items-center justify-center font-['Inter'] relative"
    >
      <GridBackground type="linear" />

      <div className="max-w-7xl w-full flex flex-col items-stretch bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl shadow-[#FF6F61]/5 overflow-hidden relative z-10">
        {/* HEADER */}
        <div className="border-b border-gray-50 p-8 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="h-4 w-[1px] bg-gray-200 mx-2" />
            <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
              <TerminalIcon size={14} className="text-[#FF6F61]" />
              System Connection Hub
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">ONLINE</span>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-8 md:p-12 space-y-16">
          <div className="space-y-2 min-h-[120px]">
            {BOOT_MESSAGES.slice(0, bootIndex).map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
                <span className="text-[#FF6F61] font-black text-xs">{">"}</span>
                <span className={`text-xs font-bold tracking-tight ${i === BOOT_MESSAGES.length - 1 ? "text-gray-900" : "text-gray-400"}`}>
                  {msg}
                  {i === bootIndex - 1 && !isBooted && (
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="ml-1 inline-block w-1 h-3 bg-[#FF6F61] align-middle" />
                  )}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHANNELS.map((channel, i) => (
              <ChannelCard 
                key={channel.id}
                channel={{...channel, icon: ICON_MAP[channel.iconName]}}
                index={i}
                isHovered={hoveredId === channel.id}
                onHover={setHoveredId}
                onLeave={() => setHoveredId(null)}
              />
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isBooted ? { opacity: 1, y: 0 } : {}} className="flex flex-col md:flex-row items-center justify-between gap-12 pt-12 border-t border-gray-50">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <h3 className="text-3xl font-black text-gray-900 tracking-tight leading-none">Let's architect intelligent <span className="text-[#FF6F61]">systems</span>.</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">Open to ambitious engineering collaborations, AI infrastructure projects, and creative system design.</p>
            </div>
            <motion.button whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }} className="px-10 py-5 bg-gray-900 text-white rounded-2xl shadow-xl flex items-center gap-4 transition-all hover:bg-[#FF6F61]" onClick={() => window.location.href = "mailto:contact@example.com"}>
              <span className="text-xs font-bold uppercase tracking-widest">Open Connection Channel</span>
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        </div>

        {/* FOOTER */}
        <div className="bg-gray-50/80 border-t border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex gap-12">
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Current Focus</span>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-900">
                <Cpu size={12} className="text-[#FF6F61]" /> AI Systems • Full Stack • ML Infrastructure
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Built With</span>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-900">
                <Workflow size={12} className="text-[#FF6F61]" /> Next.js • Framer Motion • Systems Thinking
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1">
            <span className="text-gray-900 font-black tracking-tighter text-base uppercase">Anon Ajay</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">Engineering ideas into systems.</span>
          </div>
        </div>
      </div>

      <motion.div className="fixed left-0 w-full h-[2px] bg-[#FF6F61]/5 z-50 pointer-events-none" animate={{ top: ["0%", "100%"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
      <div className="mt-12 text-[10px] font-bold text-gray-300 uppercase tracking-widest text-center">&copy; {new Date().getFullYear()} — SYSTEM ARCHITECTURE ARCHIVE — ALL RIGHTS RESERVED</div>
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0" style={{ background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 111, 97, 0.08), transparent 80%)" }} />
    </section>
  );
}
