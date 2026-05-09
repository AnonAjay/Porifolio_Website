export const ROADMAP_DATA = [
  {
    year: "2024",
    projects: [
      {
        id: 1,
        title: "Neon Nexus",
        problem: "Legacy data ingestion systems were struggling with high-frequency streams, causing 5s+ latency.",
        solution: "Architected a distributed event-driven pipeline using Go and Kafka with a custom-tuned storage layer.",
        impact: "Achieved sub-200ms end-to-end latency and sustained 10x throughput increase.",
        tech: ["Go", "Kafka", "PostgreSQL", "Redis"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "Aura Intelligence",
        problem: "Internal teams lacked real-time visibility into predictive model performance and data drift.",
        solution: "Built an AI monitoring dashboard with real-time observability and automated alerting systems.",
        impact: "Reduced model downtime by 40% and improved data scientists' iteration speed by 2x.",
        tech: ["Python", "TensorFlow", "React", "D3.js"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2500&auto=format&fit=crop",
      },
    ],
  },
  {
    year: "2023",
    projects: [
      {
        id: 3,
        title: "Zenith Architecture",
        problem: "Global enterprise client required a secure, multi-tenant cloud framework for sensitive AI agents.",
        solution: "Designed a zero-trust agentic framework with isolated execution environments and robust auditing.",
        impact: "Successfully passed 3 major security audits and onboarded 50+ enterprise teams.",
        tech: ["Node.js", "Kubernetes", "AWS", "gRPC"],
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
      },
    ],
  },
  {
    year: "2022",
    projects: [
      {
        id: 4,
        title: "Quantum Ledger",
        problem: "Financial transactions required immutable audit trails with sub-millisecond validation.",
        solution: "Implemented a high-performance blockchain-inspired ledger using Rust and WebAssembly.",
        impact: "Handled 1M+ transactions per second with cryptographic certainty.",
        tech: ["Rust", "WASM", "RocksDB", "ZKP"],
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
      },
    ],
  },
];
