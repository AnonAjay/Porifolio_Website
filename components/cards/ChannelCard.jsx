"use client";

import { motion } from "framer-motion";
import StatusIndicator from "../common/StatusIndicator";

export default function ChannelCard({ channel, index, isHovered, onHover, onLeave }) {
  const Icon = channel.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.1 }}
      className={`group relative p-6 bg-white border rounded-2xl transition-all duration-500 cursor-pointer overflow-hidden ${
        isHovered ? "border-[#FF6F61] shadow-2xl" : "border-gray-100 hover:border-gray-200"
      }`}
      onMouseEnter={() => onHover(channel.id)}
      onMouseLeave={onLeave}
      onClick={() => window.open(channel.url, "_blank")}
    >
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`p-3 rounded-xl transition-colors duration-500 ${
          isHovered ? "bg-[#FF6F61] text-white" : "bg-gray-50 text-gray-400 group-hover:text-[#FF6F61]"
        }`}>
          <Icon size={24} />
        </div>
        <StatusIndicator label={channel.status} status={channel.status.toLowerCase()} />
      </div>

      <div className="relative z-10">
        <h4 className="text-xs font-bold text-[#FF6F61] uppercase tracking-[0.2em] mb-1">{channel.name}</h4>
        <div className="text-sm font-bold text-gray-900 mb-2 leading-tight">{channel.label}</div>
        <p className="text-xs text-gray-500 leading-relaxed font-medium">
          {channel.desc}
        </p>
      </div>

      {isHovered && (
        <motion.div 
          layoutId="signal"
          className="absolute bottom-0 left-0 h-1 bg-[#FF6F61]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
}
