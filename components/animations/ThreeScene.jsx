"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Html, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const TECH_DATA = [
  { id: "react", name: "React", orbit: 1, radius: 2.2, speed: 0.4, color: "#61DBFB", description: "Primary library for building modern interfaces." },
  { id: "next", name: "Next.js", orbit: 1, radius: 2.2, speed: 0.4, color: "#000000", description: "Meta-framework for production-grade React apps." },
  { id: "go", name: "Go", orbit: 2, radius: 3.8, speed: 0.25, color: "#00ADD8", description: "High-performance backend systems and microservices." },
  { id: "postgres", name: "PostgreSQL", orbit: 2, radius: 3.8, speed: 0.25, color: "#336791", description: "Relational database for robust data persistence." },
  { id: "tensorflow", name: "TensorFlow", orbit: 3, radius: 5.4, speed: 0.15, color: "#FF6F61", description: "Machine learning and neural network architectures." },
  { id: "docker", name: "Docker", orbit: 3, radius: 5.4, speed: 0.15, color: "#2496ED", description: "Containerization for consistent environment delivery." },
  { id: "langchain", name: "LangChain", orbit: 2, radius: 3.8, speed: 0.25, color: "#FF6F61", description: "Framework for building LLM-powered applications." },
  { id: "three", name: "Three.js", orbit: 1, radius: 2.2, speed: 0.4, color: "#FF6F61", description: "Immersive 3D graphics on the web." },
];

function OrbitNode({ tool, index, total, onHover, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const angle = useRef((index / total) * Math.PI * 2);

  useFrame((state, delta) => {
    if (!hovered) {
      angle.current += delta * tool.speed;
    }
    
    const x = Math.cos(angle.current) * tool.radius;
    const z = Math.sin(angle.current) * tool.radius;
    const y = Math.sin(state.clock.elapsedTime + index) * 0.1; // Subtle float

    meshRef.current.position.set(x, y, z);
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(tool);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = "auto";
        }}
        onClick={() => onClick(tool)}
        scale={hovered ? 1.25 : 1}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial 
          color={hovered ? tool.color : "#FFFFFF"} 
          emissive={tool.color}
          emissiveIntensity={hovered ? 2 : 0.2}
          roughness={0.3}
          metalness={0.8}
        />
        
        <Html distanceFactor={10} position={[0, 0.4, 0]}>
          <div className={`px-2 py-1 rounded bg-white/80 backdrop-blur-sm border border-black/5 text-[8px] font-bold uppercase tracking-widest pointer-events-none transition-all duration-300 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            {tool.name}
          </div>
        </Html>
      </mesh>
    </group>
  );
}

function CenterCore() {
  const coreRef = useRef();
  
  useFrame((state) => {
    coreRef.current.rotation.y += 0.005;
    coreRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
  });

  return (
    <mesh ref={coreRef}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial 
        color="#FF6F61" 
        emissive="#FF6F61" 
        emissiveIntensity={0.5} 
        wireframe 
      />
    </mesh>
  );
}

export default function ThreeScene({ onActiveTech }) {
  return (
    <Canvas camera={{ position: [0, 6, 10], fov: 45 }} shadows dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#FF6F61" />

      <group position={[0, -0.5, 0]}>
        <CenterCore />
        
        {TECH_DATA.map((tool, index) => (
          <OrbitNode 
            key={tool.id} 
            tool={tool} 
            index={index} 
            total={TECH_DATA.length} 
            onHover={onActiveTech}
            onClick={onActiveTech}
          />
        ))}

        {/* Orbit Path Visualizers */}
        {[2.2, 3.8, 5.4].map((r, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[r - 0.01, r + 0.01, 128]} />
            <meshBasicMaterial color="#1A1A1A" opacity={0.05} transparent />
          </mesh>
        ))}

        <ContactShadows position={[0, -1.8, 0]} opacity={0.3} scale={15} blur={2} far={4} />
      </group>
    </Canvas>
  );
}
