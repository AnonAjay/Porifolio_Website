"use client";

import { motion } from "framer-motion";

export default function Overlay({ activeStep }) {

  // TEXT COLORS (change freely)
  const primaryColor = "#ffffff";          // white works best over visuals
  const accentColor = "#FF6F61";           // your coral accent
  const secondaryAccent = "#E8D5FF";       // lavender accent

  /*
  ============================================
  🎬 ANIMATION LOGIC (STATE-BASED CINEMATIC PHYSICS)
  ============================================
  */

  const springTransition = {
    type: "spring",
    stiffness: 35, // heavier cinematic feel
    damping: 20,   // micro-settling without bouncing
    restDelta: 0.001
  };

  /*
  ============================================
  🎨 UI RENDER
  ============================================
  */

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ================= SECTION 1 (CENTER HERO) ================= */}
        <motion.div
          initial={false}
          animate={{
            opacity: activeStep === 0 ? 1 : 0,
            y: activeStep === 0 ? 0 : -80,
            scale: activeStep === 0 ? 1 : 0.985,
            filter: activeStep === 0 ? "blur(0px)" : "blur(4px)"
          }}
          transition={springTransition}
          className="absolute top-[78%] left-[31%] -translate-x-1/2 -translate-y-1/2 text-center px-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Ajay Preet Singh
          </h1>

          <p className="text-lg md:text-2xl font-medium mt-4 text-white/90 drop-shadow-md">
            Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6F61] to-[#FFC1A6]">
              Intelligent Systems
            </span>{" "}
            & Digital Experiences
          </p>
        </motion.div>

        {/* ================= SECTION 2 (LEFT CONTROLLED) ================= */}
        <motion.div
          initial={false}
          animate={{
            opacity: activeStep === 1 ? 1 : 0,
            y: activeStep === 1 ? 0 : (activeStep < 1 ? 80 : -80),
            scale: activeStep === 1 ? 1 : 0.985,
            filter: activeStep === 1 ? "blur(0px)" : "blur(4px)"
          }}
          transition={springTransition}
          className="absolute top-[43%] left-[6%] -translate-y-1/2"
        >
          <div className="max-w-xl text-left">
            <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-white drop-shadow-2xl">
              I design and build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6F61] to-[#FFC1A6]">
                scalable digital systems.
              </span>
            </h2>
          </div>
        </motion.div>

        {/* ================= SECTION 3 (RIGHT CONTROLLED) ================= */}
        <motion.div
          initial={false}
          animate={{
            opacity: activeStep === 2 ? 1 : 0,
            y: activeStep === 2 ? 0 : (activeStep < 2 ? 80 : -80),
            scale: activeStep === 2 ? 1 : 0.985,
            filter: activeStep === 2 ? "blur(0px)" : "blur(4px)"
          }}
          transition={springTransition}
          className="absolute top-[27%] right-[6%] -translate-y-1/2"
        >
          <div className="max-w-xl text-right">
            <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-white drop-shadow-2xl">
              Where data, design, <br />
              and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8D5FF] to-[#FFC1A6]">
                engineering converge.
              </span>
            </h2>
          </div>
        </motion.div>

        {/* ================= SECTION 4 (BOTTOM RIGHT FINAL) ================= */}
        <motion.div
          initial={false}
          animate={{
            opacity: activeStep === 3 ? 1 : 0,
            y: activeStep === 3 ? 0 : 80,
            scale: activeStep === 3 ? 1 : 0.985,
            filter: activeStep === 3 ? "blur(0px)" : "blur(4px)"
          }}
          transition={springTransition}
          className="absolute bottom-[12%] right-[8%]"
        >
          <div className="max-w-xl text-right">
            <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-white drop-shadow-2xl">
              AI-powered web <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6F61] to-[#FFC1A6]">
                experiences that scale.
              </span>
            </h2>
          </div>
        </motion.div>

      </div>
    </div>
  );
}