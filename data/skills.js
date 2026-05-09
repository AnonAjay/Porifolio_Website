import React from "react";

export const TECH_LOGOS = {
  PyTorch: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  TensorFlow: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  ScikitLearn: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  React: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 12c-4.4 0-8-1.8-8-4s3.6-4 8-4 8 1.8 8 4-3.6 4-8 4z" />
      <path d="M12 12c-4.4 0-8-1.8-8-4s3.6-4 8-4 8 1.8 8 4-3.6 4-8 4z" transform="rotate(60 12 12)" />
      <path d="M12 12c-4.4 0-8-1.8-8-4s3.6-4 8-4 8 1.8 8 4-3.6 4-8 4z" transform="rotate(120 12 12)" />
    </svg>
  ),
  Nextjs: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m16 8-4 10-4-10" />
    </svg>
  ),
  Nodejs: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Docker: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 12.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .5-.5h19.5a.5.5 0 0 1 .5.5v2.5z" />
      <path d="M5 7h3V4H5v3zM9 7h3V4H9v3zM13 7h3V4h-3v3zM17 7h3V4h-3v3z" />
    </svg>
  ),
  K8s: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l8.5 3.5v11L12 20l-8.5-3.5v-11z" />
      <path d="M12 6l5 2v5l-5 2-5-2V8z" />
    </svg>
  ),
  Rust: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  ),
  LangChain: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
};

export const SKILL_CATEGORIES = [
  {
    id: "ml",
    title: "ML Engineering",
    y: 100,
    tech: ["PyTorch", "TensorFlow", "ScikitLearn"],
    expertise: "Predictive Pipelines & Neural Architectures",
    projects: [
      "Custom CNN image classification systems",
      "Predictive customer behavior modeling",
      "End-to-end model deployment pipelines",
    ],
    details: "Built high-performance inference engines and automated training workflows.",
  },
  {
    id: "fullstack",
    title: "Full Stack",
    y: 230,
    tech: ["React", "Nextjs", "Nodejs"],
    expertise: "Scalable Web Systems & Responsive UX",
    projects: [
      "Next.js high-performance dashboards",
      "RESTful API architecture with Node.js",
      "State-driven interactive user interfaces",
    ],
    details: "Focus on performance, accessibility, and seamless system integration.",
  },
  {
    id: "genai",
    title: "GenAI",
    y: 370,
    tech: ["LangChain", "LLMs", "Vector DBs"],
    expertise: "Agentic Systems & Prompt Orchestration",
    projects: [
      "LangChain-based multi-agent workflows",
      "RAG pipelines with Vector Databases",
      "Autonomous prompt-engineered assistants",
    ],
    details: "Specializing in context-aware intelligence and automated reasoning.",
  },
  {
    id: "systems",
    title: "Systems",
    y: 500,
    tech: ["Docker", "K8s", "Rust"],
    expertise: "Infrastructure & Low-level Optimization",
    projects: [
      "Containerized microservices with Docker",
      "K8s orchestration and load balancing",
      "Performance-critical systems in Rust",
    ],
    details: "Architecting resilient, distributed, and highly available infrastructures.",
  },
];
