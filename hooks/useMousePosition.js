"use client";

import { useState, useEffect } from "react";

export default function useMousePosition(ref) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (ref && ref.current) {
        const { clientX, clientY } = e;
        ref.current.style.setProperty("--mouse-x", `${clientX}px`);
        ref.current.style.setProperty("--mouse-y", `${clientY}px`);
        setMousePosition({ x: clientX, y: clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [ref]);

  return mousePosition;
}
