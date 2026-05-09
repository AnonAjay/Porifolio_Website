"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Brain,
  Layers,
  Sparkles,
  Code2,
  Database,
  Network,
  Server,
  Bot,
  Terminal,
  Globe,
  LineChart,
} from "lucide-react";

const CATEGORIES = [
  {
    id: "ml",
    title: "ML Engineering",
    icons: [Brain, Database, LineChart],
    y: 100,
    tech: ["PyTorch", "TensorFlow", "Scikit-Learn"],
  },
  {
    id: "fullstack",
    title: "Full Stack",
    icons: [Globe, Code2, Layers],
    y: 230,
    tech: ["React", "Next.js", "Node.js"],
  },
  {
    id: "genai",
    title: "GenAI",
    icons: [Sparkles, Bot, Terminal],
    y: 370,
    tech: ["LLMs", "LangChain", "Vector DBs"],
  },
  {
    id: "systems",
    title: "Systems",
    icons: [Cpu, Network, Server],
    y: 500,
    tech: ["Docker", "K8s", "Rust"],
  },
];

const FlowBall = ({ path, delay }) => (
  <motion.circle
    r="6"
    fill="#FF6F61"
    initial={{ offsetDistance: "0%" }}
    animate={{ offsetDistance: "100%" }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    style={{ offsetPath: `path('${path}')` }}
  />
);

export default function SystemPipeline() {
  const [hoveredOutput, setHoveredOutput] = useState(null);
  const [isNeuralHovered, setIsNeuralHovered] = useState(false);

  const [counts, setCounts] = useState({
    ml: 3,
    fullstack: 3,
    genai: 3,
    systems: 3,
  });

  // simulate incoming data
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) => ({
        ml: Math.min(prev.ml + 1, 6),
        fullstack: Math.min(prev.fullstack + 1, 6),
        genai: Math.min(prev.genai + 1, 6),
        systems: Math.min(prev.systems + 1, 6),
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const neuralNodes = useMemo(
    () => [
      { x: 300, y: 250 },
      { x: 350, y: 350 },
      { x: 400, y: 220 },
      { x: 420, y: 380 },
      { x: 320, y: 450 },
      { x: 450, y: 300 },
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
        if (dist < 150) {
          connections.push({
            from: neuralNodes[i],
            to: neuralNodes[j],
          });
        }
      }
    }
    return connections;
  }, [neuralNodes]);

  return (
    <div className="w-full h-[600px] flex items-center justify-center">
      <svg viewBox="0 0 1000 600" className="w-full max-w-6xl">

        {/* CORE INPUT */}
        <circle cx="80" cy="300" r="40" fill="white" stroke="#FF6F61" />
        <circle cx="80" cy="300" r="30" fill="#FF6F61" />

        {/* FLOW TO NEURAL */}
        <path d="M120 300 L280 300" stroke="#FF6F61" strokeDasharray="4 4" opacity="0.4" />
        <FlowBall path="M120 300 L280 300" delay={0} />
        <FlowBall path="M120 300 L280 300" delay={1.5} />

        {/* NEURAL NETWORK */}
        <g
          onMouseEnter={() => setIsNeuralHovered(true)}
          onMouseLeave={() => setIsNeuralHovered(false)}
        >
          {neuralConnections.map((c, i) => (
            <line
              key={i}
              x1={c.from.x}
              y1={c.from.y}
              x2={c.to.x}
              y2={c.to.y}
              stroke="#FF6F61"
              opacity={isNeuralHovered ? 0.6 : 0.2}
            />
          ))}

          {neuralNodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x}
              cy={n.y}
              r="5"
              fill={isNeuralHovered ? "#FF6F61" : "white"}
              stroke="#FF6F61"
              animate={isNeuralHovered ? { scale: [1, 1.3, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          ))}
        </g>

        {/* PIPE + OUTPUT */}
        {CATEGORIES.map((cat, idx) => {
          const path = `M 450 300 C 600 300, 650 ${cat.y}, 800 ${cat.y}`;
          const active = hoveredOutput === cat.id || !hoveredOutput;

          return (
            <g key={cat.id}>
              <path
                d={path}
                fill="none"
                stroke="#FF6F61"
                strokeWidth={hoveredOutput === cat.id ? 3 : 1.5}
                opacity={active ? 1 : 0.1}
              />

              {active && (
                <>
                  <FlowBall path={path} delay={0} />
                  <FlowBall path={path} delay={1.5} />
                </>
              )}

              {/* injection pulse */}
              <motion.circle
                cx="800"
                cy={cat.y}
                r="5"
                fill="#FF6F61"
                animate={{
                  scale: [0, 1.3, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.5,
                }}
              />

              {/* OUTPUT CARD */}
              <g
                onMouseEnter={() => setHoveredOutput(cat.id)}
                onMouseLeave={() => setHoveredOutput(null)}
              >
                <rect
                  x="820"
                  y={cat.y - 40}
                  width="160"
                  height="80"
                  rx="12"
                  fill="white"
                  stroke="#FF6F61"
                />

                <text x="830" y={cat.y - 10} fontSize="12">
                  {cat.title}
                </text>

                {/* STACKING BALLS */}
                {Array.from({ length: counts[cat.id] }).map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={840 + (i % 4) * 12}
                    cy={cat.y + 5 + Math.floor(i / 4) * 12}
                    r="4"
                    fill="#FF6F61"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                ))}

                {/* ICONS */}
                <foreignObject x="830" y={cat.y + 20} width="120" height="30">
                  <div className="flex gap-2 text-gray-400">
                    {cat.icons.map((Icon, i) => (
                      <Icon key={i} size={14} />
                    ))}
                  </div>
                </foreignObject>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}