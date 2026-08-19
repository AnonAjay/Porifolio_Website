export const SECTION_ACCENTS = {
  home: {
    id: "home",
    name: "Home",
    color: "#a855f7", // Purple / Lavender
    darkColor: "#c084fc",
  },
  about: {
    id: "about",
    name: "About",
    color: "#ff6f61", // Coral / Peach
    darkColor: "#ff8a7a",
  },
  projects: {
    id: "projects",
    name: "Projects",
    color: "#3b82f6", // Blue
    darkColor: "#60a5fa",
  },
  skills: {
    id: "skills",
    name: "Tech Stack",
    color: "#10b981", // Emerald
    darkColor: "#34d399",
  },
  "tech-stack": {
    id: "skills",
    name: "Tech Stack",
    color: "#10b981",
    darkColor: "#34d399",
  },
  experience: {
    id: "experience",
    name: "Experience",
    color: "#f59e0b", // Amber
    darkColor: "#fbbf24",
  },
  connect: {
    id: "connect",
    name: "Connect",
    color: "#ec4899", // Pink / Rose
    darkColor: "#f472b6",
  },
  contact: {
    id: "connect",
    name: "Connect",
    color: "#ec4899",
    darkColor: "#f472b6",
  },
};

export const DEFAULT_ACCENT = SECTION_ACCENTS.home.color;

export function getSectionAccent(sectionId) {
  if (!sectionId) return DEFAULT_ACCENT;
  const section = SECTION_ACCENTS[sectionId.toLowerCase()];
  return section ? section.color : DEFAULT_ACCENT;
}
