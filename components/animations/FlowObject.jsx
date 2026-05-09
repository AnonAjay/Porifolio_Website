"use client";

import { motion } from "framer-motion";
import { TECH_LOGOS } from "../../data/skills";

export default function FlowObject({ path, delay, tech, active }) {
  const Logo = TECH_LOGOS[tech] || (() => <circle r="4" fill="currentColor" />);

  return (
    <motion.g
      initial={{ offsetDistance: "0%", opacity: 0, scale: 0 }}
      animate={{
        offsetDistance: "100%",
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 1, 0.8],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ offsetPath: `path('${path}')` }}
      className={active ? "text-[#FF6F61]" : "text-gray-300"}
    >
      <rect x="-12" y="-12" width="24" height="24" rx="6" fill="white" className="shadow-sm" stroke="currentColor" strokeWidth="1" fillOpacity="0.9" />
      <Logo width="14" height="14" x="-7" y="-7" />
    </motion.g>
  );
}
