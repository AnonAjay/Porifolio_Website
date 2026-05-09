"use client";

import { motion } from "framer-motion";

export default function StatusIndicator({ label, status = "active", color = "#FF6F61" }) {
  const statusColors = {
    active: "bg-green-500",
    online: "bg-blue-500",
    ready: "bg-[#FF6F61]",
    secure: "bg-green-500",
    idle: "bg-gray-400"
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${statusColors[status] || "bg-[#FF6F61]"}`} />
      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
  );
}
