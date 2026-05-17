"use client";

import { useState, useEffect, useRef } from "react";
import ScrollyCanvas from "../layout/ScrollyCanvas";
import Overlay from "../layout/Overlay";

export default function HeroSection() {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 3;
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    // We attach the listeners to the window, but conditionally trap logic
    const handleWheel = (e) => {
      // 1. If user has scrolled down the page natively, let them be
      // Reverse behavior: when they scroll up natively and reach the top (scrollY <= 10),
      // they will be able to re-enter the Hero states on their next scroll.
      if (window.scrollY > 10) return;

      // 2. If at final frame and scrolling down, smoothly auto-scroll into the next section
      if (activeStep === totalSteps && e.deltaY > 0) {
        e.preventDefault();
        if (isAnimatingRef.current) return;
        
        isAnimatingRef.current = true;
        const nextSection = document.getElementById("about");
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }
        
        // Release the lock after the smooth scroll completes
        setTimeout(() => (isAnimatingRef.current = false), 1200);
        return;
      }

      // 3. Otherwise, we trap the scroll to trigger our cinematic frames
      e.preventDefault();

      if (isAnimatingRef.current) return;
      if (Math.abs(e.deltaY) < 15) return; // ignore tiny trackpad jitters

      if (e.deltaY > 0 && activeStep < totalSteps) {
        isAnimatingRef.current = true;
        setActiveStep((s) => s + 1);
        setTimeout(() => (isAnimatingRef.current = false), 1200);
      } else if (e.deltaY < 0 && activeStep > 0) {
        isAnimatingRef.current = true;
        setActiveStep((s) => s - 1);
        setTimeout(() => (isAnimatingRef.current = false), 1200);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (window.scrollY > 10) return;
      
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // If at final frame and swiping up (scrolling down page), smoothly auto-scroll
      if (activeStep === totalSteps && deltaY > 0) {
        e.preventDefault();
        if (isAnimatingRef.current) return;
        
        isAnimatingRef.current = true;
        const nextSection = document.getElementById("about");
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }
        
        setTimeout(() => (isAnimatingRef.current = false), 1200);
        return;
      }

      e.preventDefault();

      if (isAnimatingRef.current) return;
      if (Math.abs(deltaY) < 30) return; // swipe threshold

      if (deltaY > 0 && activeStep < totalSteps) {
        isAnimatingRef.current = true;
        setActiveStep((s) => s + 1);
        setTimeout(() => (isAnimatingRef.current = false), 1200);
      } else if (deltaY < 0 && activeStep > 0) {
        isAnimatingRef.current = true;
        setActiveStep((s) => s - 1);
        setTimeout(() => (isAnimatingRef.current = false), 1200);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeStep]);

  return (
    <section id="home" className="relative w-full h-screen bg-transparent">
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden">
        <ScrollyCanvas activeStep={activeStep} />
        <Overlay activeStep={activeStep} />
      </div>
    </section>
  );
}
