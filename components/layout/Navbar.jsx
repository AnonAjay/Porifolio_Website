"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  MessageSquare, 
  FileText, 
  ChevronDown, 
  Menu, 
  X as CloseIcon,
  Sun,
  Moon
} from "lucide-react";
import useActiveSection from "../../hooks/useActiveSection";
import { getSectionAccent } from "../../data/sectionTheme";
import { SOCIAL_NODES } from "../../data/socials";
import { useTheme } from "../context/ThemeContext";

const ICON_MAP = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  discord: MessageSquare,
  resume: FileText,
};

const NAV_LINKS = [
  { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Tech Stack", href: "#skills", id: "skills" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Connect", href: "#connect", id: "connect" },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export default function Navbar() {
  const activeSection = useActiveSection(SECTION_IDS, 0.4);
  const activeSectionAccent = getSectionAccent(activeSection);
  const { theme, toggleTheme, mounted } = useTheme();
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const connectRef = useRef(null);

  // Close dropdown when clicking outside or pressing Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (connectRef.current && !connectRef.current.contains(event.target)) {
        setIsConnectOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsConnectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 md:px-12 lg:px-16 py-6 md:py-8 flex items-center justify-between transition-all duration-300 font-sans">
      {/* LEFT: WORDMARK LOGO */}
      <Link 
        href="#home" 
        className="group inline-flex items-center text-xl md:text-2xl font-bold tracking-tight text-[#111111] dark:text-neutral-200"
      >
        <span>Ajay Preet Singh</span>
        <motion.span
          className="inline-block ml-0.5"
          animate={{ color: activeSectionAccent }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          .
        </motion.span>
      </Link>

      {/* RIGHT: DESKTOP NAVIGATION LINKS & THEME TOGGLE */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.id || (activeSection === "contact" && link.id === "connect");
          const isHovered = hoveredNavItem === link.id;
          const itemAccent = getSectionAccent(link.id);
          const isConnect = link.id === "connect";

          const textColorStyle = isActive
            ? { color: activeSectionAccent }
            : isHovered
            ? { color: itemAccent }
            : undefined;

          if (isConnect) {
            return (
              <div 
                key={link.name} 
                ref={connectRef}
                className="relative py-2"
                onMouseEnter={() => {
                  setHoveredNavItem(link.id);
                  setIsConnectOpen(true);
                }}
                onMouseLeave={() => {
                  setHoveredNavItem(null);
                  setIsConnectOpen(false);
                }}
              >
                <button
                  onClick={() => setIsConnectOpen((prev) => !prev)}
                  style={textColorStyle}
                  className={`inline-flex items-center gap-1.5 transition-all duration-250 ease-out hover:-translate-y-[1px] ${
                    isActive
                      ? "font-semibold"
                      : !isHovered
                      ? "text-[#111111] dark:text-neutral-200"
                      : ""
                  }`}
                  aria-expanded={isConnectOpen}
                >
                  <span>{link.name}</span>
                  <motion.div
                    animate={{ rotate: isConnectOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                  >
                    <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                  </motion.div>

                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{ backgroundColor: activeSectionAccent }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                {/* VERTICAL CONNECT DROPDOWN MENU */}
                <AnimatePresence>
                  {isConnectOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-2 w-56 p-1.5 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-200/80 dark:border-neutral-800 flex flex-col gap-0.5 z-50 overflow-hidden"
                    >
                      {SOCIAL_NODES.map((node, index) => {
                        const IconComponent = ICON_MAP[node.id] || Github;
                        return (
                          <motion.a
                            key={node.id}
                            href={node.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ delay: index * 0.03, duration: 0.15 }}
                            className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 text-[#111111] dark:text-neutral-200 transition-all group/item"
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 group-hover/item:scale-110 transition-transform"
                              >
                                <IconComponent className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold text-[#111111] dark:text-neutral-100 leading-tight">
                                  {node.platform}
                                </span>
                                <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
                                  {node.category || node.status}
                                </span>
                              </div>
                            </div>
                          </motion.a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <div 
              key={link.name} 
              className="relative py-2"
              onMouseEnter={() => setHoveredNavItem(link.id)}
              onMouseLeave={() => setHoveredNavItem(null)}
            >
              <Link
                href={link.href}
                style={textColorStyle}
                className={`relative inline-block transition-all duration-250 ease-out hover:-translate-y-[1px] ${
                  isActive
                    ? "font-semibold"
                    : !isHovered
                    ? "text-[#111111] dark:text-neutral-200"
                    : ""
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{ backgroundColor: activeSectionAccent }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </div>
          );
        })}

        {/* THEME TOGGLE BUTTON */}
        <button
          onClick={toggleTheme}
          className="ml-2 p-2 rounded-full text-[#111111] dark:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
          aria-label="Toggle light / dark theme"
          title="Toggle Light / Dark mode"
        >
          {mounted && theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
          )}
        </button>
      </nav>

      {/* MOBILE MENU & TOGGLE */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-[#111111] dark:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
          aria-label="Toggle light / dark theme"
        >
          {mounted && theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
          )}
        </button>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-[#111111] dark:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 px-6 py-6 flex flex-col gap-5 md:hidden z-50 shadow-xl"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id || (activeSection === "contact" && link.id === "connect");
              const itemAccent = getSectionAccent(link.id);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={isActive ? { color: itemAccent } : undefined}
                  className={`text-base font-medium tracking-wide flex items-center justify-between ${
                    isActive ? "font-semibold" : "text-[#111111] dark:text-neutral-200"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: itemAccent }}
                    />
                  )}
                </Link>
              );
            })}

            {/* MOBILE CONNECT SOCIALS LIST */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Connect Endpoints
              </span>
              <div className="grid grid-cols-2 gap-2">
                {SOCIAL_NODES.map((node) => {
                  const IconComponent = ICON_MAP[node.id] || Github;
                  return (
                    <a
                      key={node.id}
                      href={node.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[#111111] dark:text-neutral-200 text-xs font-medium"
                    >
                      <IconComponent className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                      <span>{node.platform}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
