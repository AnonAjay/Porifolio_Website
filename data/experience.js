export const MISSIONS = [
  {
    id: "01",
    phase: "ML Foundations",
    company: "Research Phase",
    period: "2023",
    role: "ML Researcher",
    x: 100, y: 150,
    systems: ["Predictive Analysis Framework", "Statistical Modeling Hub"],
    tech: ["Python", "NumPy", "Scikit-Learn"],
    focus: "Mathematical modeling and data-driven insights.",
    lessons: "Understanding foundational statistics is critical for robust ML.",
    iconName: "Binary"
  },
  {
    id: "02",
    phase: "CNN Systems",
    company: "IIT Kanpur",
    period: "2023 - 2024",
    role: "Deep Learning Intern",
    x: 300, y: 100,
    systems: ["Image Recognition Engine", "Behavioral Analysis CNN"],
    tech: ["PyTorch", "OpenCV", "Matplotlib"],
    focus: "Computer Vision and Deep Neural Architectures.",
    lessons: "Neural network depth requires careful gradient management.",
    iconName: "FlaskConical"
  },
  {
    id: "03",
    phase: "AI Deployment",
    company: "System Scaling",
    period: "2024",
    role: "Inference Engineer",
    x: 250, y: 300,
    systems: ["Containerized Model Service", "Flask API Gateway"],
    tech: ["Docker", "Flask", "PostgreSQL"],
    focus: "Bridging ML models with production environments.",
    lessons: "Latency in inference is as important as accuracy in training.",
    iconName: "Box"
  },
  {
    id: "04",
    phase: "Full Stack Systems",
    company: "Enterprise Dev",
    period: "2024",
    role: "Full Stack Architect",
    x: 500, y: 200,
    systems: ["Next.js Dashboard", "Distributed Backend"],
    tech: ["Next.js", "React", "Node.js"],
    focus: "End-to-end architecture and system synchronization.",
    lessons: "Modular architecture prevents technical debt in scaling.",
    iconName: "Layers"
  },
  {
    id: "05",
    phase: "GenAI & Agents",
    company: "Autonomous AI",
    period: "2025",
    role: "AI Systems Lead",
    x: 700, y: 250,
    systems: ["Multi-Agent Orchestrator", "Semantic Search RAG"],
    tech: ["LangChain", "OpenAI", "VectorDB"],
    focus: "Autonomous intelligence and cognitive systems.",
    lessons: "Agentic reasoning requires strict validation loops.",
    iconName: "Target"
  }
];

export const CONNECTIONS = [
  { from: "01", to: "02" },
  { from: "02", to: "04" },
  { from: "01", to: "03" },
  { from: "03", to: "04" },
  { from: "04", to: "05" }
];
