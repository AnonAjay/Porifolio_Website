"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export default function NeuralProcessor({ isInView, isHovered }) {
  const [activeSignals, setActiveSignals] = useState([]);

  const neuralNodes = useMemo(
    () => [
      { x: 320, y: 300, label: "Core" },
      { x: 380, y: 220, label: "Logic" },
      { x: 440, y: 280, label: "Process" },
      { x: 400, y: 380, label: "Data" },
      { x: 480, y: 350, label: "Output" },
      { x: 350, y: 420, label: "Inference" },
      { x: 450, y: 200, label: "Neural" },
    ],
    []
  );

  const neuralConnections = useMemo(() => {
    const connections = [];
    for (let i = 0; i < neuralNodes.length; i++) {
      for (let j = i + 1; j < neuralNodes.length; j++) {
        const dist = Math.hypot(
          neuralNodes[i].x - neuralNodes[j].x,
          neuralNodes[i].y - neuralNodes[j].y
        );
        if (dist < 130) {
          connections.push({ from: neuralNodes[i], to: neuralNodes[j] });
        }
      }
    }
    return connections;
  }, [neuralNodes]);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveSignals((prev) => {
        const next = [...prev, Math.floor(Math.random() * neuralConnections.length)];
        return next.slice(-5);
      });
    }, 800);
    return () => clearInterval(interval);
  }, [isInView, neuralConnections.length]);

  return (
    <g>
      {neuralConnections.map((c, i) => {
        const isActive = activeSignals.includes(i) || isHovered;
        return (
          <g key={i}>
            <line
              x1={c.from.x}
              y1={c.from.y}
              x2={c.to.x}
              y2={c.to.y}
              stroke="#FF6F61"
              strokeWidth={isActive ? 2 : 0.5}
              opacity={isActive ? 0.6 : 0.1}
            />
            {activeSignals.includes(i) && (
              <motion.circle
                r="2"
                fill="#FF6F61"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 0.8, ease: "linear" }}
                style={{ offsetPath: `path('M ${c.from.x} ${c.from.y} L ${c.to.x} ${c.to.y}')` }}
              />
            )}
          </g>
        );
      })}

      {neuralNodes.map((n, i) => (
        <motion.g key={i} initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: 0.5 + i * 0.1 }}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="6"
            fill="white"
            stroke="#FF6F61"
            strokeWidth="2"
            animate={isHovered ? { 
              scale: [1, 1.2, 1],
            } : { 
              scale: [1, 1.05, 1],
            }}
            transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
          />
          <text x={n.x} y={n.y + 15} textAnchor="middle" className="text-[7px] font-medium fill-gray-400 uppercase">
            {n.label}
          </text>
        </motion.g>
      ))}
    </g>
  );
}
