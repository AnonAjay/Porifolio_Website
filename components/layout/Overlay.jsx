"use client";

import { motion, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }) {


  // MOVEMENT CONTROL (vertical animation)
  const moveRange = 100; // increase/decrease for stronger motion

  // TEXT COLORS (change freely)
  const primaryColor = "#ffffff";          // white works best over visuals
  const accentColor = "#FF6F61";           // your coral accent
  const secondaryAccent = "#E8D5FF";       // lavender accent

  /*
  ============================================
  🎬 ANIMATION LOGIC (DON'T TOUCH UNLESS NEEDED)
  ============================================
  */

  // SECTION 1
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -80]);

  // SECTION 2
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.5], [80, -80]);

  // SECTION 3
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.75], [80, -80]);

  // SECTION 4 (LONGER HOLD)
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.75, 1], [80, 0]);

  /*
  ============================================
  🧠 DEBUG TOOL (OPTIONAL)
  ============================================
  */

  // Uncomment to log scroll position
  // scrollYProgress.on("change", (v) => console.log("Scroll:", v));

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
          style={{ opacity: opacity1, y: y1 }}
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
          style={{ opacity: opacity2, y: y2 }}
          className="absolute top-[50%] left-[6%] -translate-y-1/2"
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
          style={{ opacity: opacity3, y: y3 }}
          className="absolute top-[30%] right-[8%] -translate-y-1/2"
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
          style={{ opacity: opacity4, y: y4 }}
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