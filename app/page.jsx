"use client";

import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import TechStackSection from "../components/sections/TechStackSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ConnectSection from "../components/sections/ConnectSection";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-transparent">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TechStackSection />
      <ExperienceSection />
      <ConnectSection />
      <Footer />
    </main>
  );
}
