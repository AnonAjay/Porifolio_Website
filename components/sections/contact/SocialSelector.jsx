import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, MessageSquare, FileText } from "lucide-react";

const ICON_MAP = { Github, Linkedin, Twitter, MessageSquare, FileText };

export default function SocialSelector({ data, activeId, onSelect }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {data.map((node) => {
        const Icon = ICON_MAP[node.logo];
        const isActive = activeId === node.id;
        
        return (
          <motion.button
            key={node.id}
            onClick={() => onSelect(node.id)}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left ${
              isActive 
                ? "bg-white/80 border-[#FF6F61]/30 shadow-lg shadow-[#FF6F61]/5" 
                : "bg-white/40 border-white/20 hover:bg-white/60 hover:border-white/40"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-xl flex items-center justify-center transition-colors ${
                isActive ? "bg-[#FF6F61]/10 text-[#FF6F61]" : "bg-gray-100 text-gray-500"
              }`}>
                {Icon && <Icon size={20} />}
              </div>
              <div>
                <div className={`font-bold text-sm tracking-tight transition-colors ${
                  isActive ? "text-gray-900" : "text-gray-600"
                }`}>
                  {node.platform}
                </div>
                <div className={`text-[10px] uppercase tracking-widest font-bold mt-1 transition-colors ${
                  isActive ? "text-[#FF6F61]" : "text-gray-400"
                }`}>
                  {node.systemLabel}
                </div>
              </div>
            </div>
            
            {isActive && (
              <motion.div 
                layoutId="activeIndicator"
                className="w-1.5 h-1.5 rounded-full bg-[#FF6F61] animate-pulse"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
