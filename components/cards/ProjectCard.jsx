"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TechPill from "../ui/TechPill";

export default function ProjectCard({ project, index, total, isFront }) {
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
              {[
                { label: "Problem", text: project.problem },
                { label: "Solution", text: project.solution },
                { label: "Impact", text: project.impact, bold: true }
              ].map((item) => (
                <div key={item.label}>
                  <h4 className="text-[10px] font-bold text-[#FF6F61] uppercase tracking-widest mb-1">{item.label}</h4>
                  <p className={`text-[#1A1A1A]/70 text-sm leading-relaxed ${item.bold ? 'font-medium' : 'font-light'} line-clamp-2 md:line-clamp-none`}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map(t => (
                <TechPill key={t} text={t} />
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
