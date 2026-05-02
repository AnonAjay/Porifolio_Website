"use client";

import { motion, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }) {
  // Parallax Text Animations mapped to scroll progress
  
  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -150]);

  // Section 2: 25% to 55%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.55], [100, -100]);

  // Section 3: 55% to 85%
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.85], [100, -100]);

  // We need to import useTransform from framer-motion inside this scope since we didn't initially
  // but let's actually just do it cleanly below
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-center">
      {/* Container holding the sticky overlay content */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 text-white drop-shadow-2xl">
            My Name.
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 font-light tracking-wide max-w-lg">
            Creative Developer.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-start justify-center p-12 md:p-24 text-left max-w-4xl mx-auto w-full"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-2xl">
            I build digital <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">experiences.</span>
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center p-12 md:p-24 text-right max-w-4xl mx-auto w-full"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-2xl">
            Bridging design <br/>and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">engineering.</span>
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
