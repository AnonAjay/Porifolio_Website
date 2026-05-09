"use client";

import { motion } from "framer-motion";

export default function SectionHeader({ title, subtitle, accent, align = "left" }) {
  return (
    <header className={`mb-16 ${align === "center" ? "text-center" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-2"
      >
        {accent && (
          <span className="text-[#FF6F61] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-2">
            {accent}
          </span>
        )}
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none">
          {title}
        </h2>
        {subtitle && (
          <p className={`text-gray-500 max-w-xl text-base font-medium leading-relaxed ${align === "center" ? "mx-auto" : ""}`}>
            {subtitle}
          </p>
        )}
      </motion.div>
    </header>
  );
}
