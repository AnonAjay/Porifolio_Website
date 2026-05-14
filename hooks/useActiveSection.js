"use client";

import { useState, useEffect } from "react";

export default function useActiveSection(sectionIds, threshold = 0.5) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = [];

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      threshold,
      rootMargin: "-20% 0% -20% 0%", // Adjust to trigger in the middle of the screen
    };

    const observer = new IntersectionObserver(callback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds, threshold]);

  return activeSection;
}
