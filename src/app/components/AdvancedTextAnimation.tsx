// PASTE THIS CORRECTED CODE INTO: app/components/AdvancedTextAnimation.tsx

"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const AdvancedTextAnimation = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { mass: 0.1, stiffness: 100, damping: 10 };

  // --- Animation Timeline Fixes ---
  
  // 1. First text fades in immediately at the top, then fades out.
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.1, 0.2], ["0%", "-50%"]);
  const smoothText1Y = useSpring(text1Y, springConfig);

  // 2. Second text fades in to replace it.
  const text2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.45], [0, 1, 1]);
  const text2Y = useTransform(scrollYProgress, [0.2, 0.3], ["50%", "0%"]);
  const smoothText2Y = useSpring(text2Y, springConfig);
  
  // 3. The entire container zooms IN and fades out.
  const containerScale = useTransform(scrollYProgress, [0.5, 0.7], [1, 20]);
  const containerOpacity = useTransform(scrollYProgress, [0.5, 0.65], [1, 0]);


  return (
    <section ref={targetRef} className="relative h-[250vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
            style={{ scale: containerScale, opacity: containerOpacity }} 
            className="relative text-5xl md:text-7xl font-bold text-center w-full h-24"
        >
          {/* First Line */}
          <motion.h1 style={{ y: smoothText1Y, opacity: text1Opacity }} className="absolute inset-0 flex items-center justify-center text-white">
            YOUR ROUTE YOUR WAY
          </motion.h1>
          
          {/* Second Line */}
          <motion.div
            style={{ y: smoothText2Y, opacity: text2Opacity }}
            className="absolute inset-0 flex items-center justify-center gap-x-4 md:gap-x-8 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text"
          >
            DOWNLOAD TRANSLATE
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};