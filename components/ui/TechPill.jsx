"use client";

export default function TechPill({ text, variant = "default" }) {
  const variants = {
    default: "text-[10px] font-semibold text-[#1A1A1A]/50 bg-white/60 border border-black/5 px-2.5 py-1 rounded-md",
    evolution: "px-3 py-1.5 bg-[#FDF8F5] text-gray-600 text-[10px] font-bold rounded-lg border border-gray-100",
    terminal: "px-3 py-1.5 bg-gray-50 text-gray-600 text-[10px] font-bold rounded-lg border border-gray-100"
  };

  return (
    <span className={variants[variant]}>
      {text}
    </span>
  );
}
