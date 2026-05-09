"use client";

import { motion } from "framer-motion";
import { MISSIONS, CONNECTIONS } from "../../data/experience";

export default function EvolutionGraph({ activeId, hoveredId, isInView, onNodeClick, onNodeHover, onNodeLeave, icons }) {
  return (
    <svg viewBox="0 0 800 400" className="w-full h-full relative z-10 overflow-visible">
      <defs>
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {CONNECTIONS.map((conn, i) => {
        const from = MISSIONS.find(m => m.id === conn.from);
        const to = MISSIONS.find(m => m.id === conn.to);
        const isActive = activeId === from.id || activeId === to.id;
        const isHovered = hoveredId === from.id || hoveredId === to.id;

        return (
          <motion.path
            key={`conn-${i}`}
            d={`M ${from.x} ${from.y} C ${(from.x + to.x) / 2} ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x} ${to.y}`}
            fill="none"
            stroke="#FF6F61"
            strokeWidth={isActive || isHovered ? 2.5 : 1}
            strokeDasharray={isActive || isHovered ? "none" : "4 4"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { 
              pathLength: 1, 
              opacity: isActive || isHovered ? 0.8 : 0.15 
            } : {}}
            transition={{ duration: 1.5, delay: i * 0.2 }}
          />
        );
      })}

      {MISSIONS.map((m, i) => {
        const isActive = activeId === m.id;
        const isHovered = hoveredId === m.id;
        const Icon = icons[m.iconName];

        return (
          <g key={m.id} 
            className="cursor-pointer"
            onMouseEnter={() => onNodeHover(m.id)}
            onMouseLeave={onNodeLeave}
            onClick={() => onNodeClick(m.id)}
          >
            {(isActive || isHovered) && (
              <motion.circle
                cx={m.x}
                cy={m.y}
                r="25"
                fill="#FF6F61"
                fillOpacity="0.15"
                filter="url(#nodeGlow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}

            <motion.circle
              cx={m.x}
              cy={m.y}
              r={isActive ? 18 : 14}
              fill="white"
              stroke="#FF6F61"
              strokeWidth={isActive ? 3 : 1.5}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: "spring", delay: 0.5 + i * 0.1 }}
            />

            <foreignObject x={m.x - 8} y={m.y - 8} width="16" height="16" className="pointer-events-none">
              <div className={`flex items-center justify-center w-full h-full ${isActive ? "text-[#FF6F61]" : "text-gray-400"}`}>
                <Icon size={12} />
              </div>
            </foreignObject>

            <motion.text
              x={m.x}
              y={m.y + 35}
              textAnchor="middle"
              className={`text-[9px] font-bold uppercase tracking-widest ${isActive ? "fill-gray-900" : "fill-gray-400"}`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              {m.phase}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}
