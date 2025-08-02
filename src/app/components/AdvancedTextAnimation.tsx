// PASTE THIS UPDATED CODE INTO: app/components/AdvancedTextAnimation.tsx

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

  const text1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.2, 0.3], ["0%", "-50%"]);
  const smoothText1Y = useSpring(text1Y, springConfig);

  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.55], [0, 1, 1]);
  const text2Y = useTransform(scrollYProgress, [0.3, 0.4], ["50%", "0%"]);
  const smoothText2Y = useSpring(text2Y, springConfig);
  
  const containerScale = useTransform(scrollYProgress, [0.6, 0.8], [1, 20]);
  const containerOpacity = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]);

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.04,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  const line1 = "YOUR ROUTE YOUR WAY";

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
            style={{ scale: containerScale, opacity: containerOpacity }} 
            className="relative text-4xl md:text-6xl font-bold text-center w-full h-24"
        >
          {/* First Line with all new effects */}
          <motion.h1 
            style={{ y: smoothText1Y, opacity: text1Opacity }} 
            className="absolute inset-0 flex items-center justify-center"
            variants={sentence}
            initial="hidden"
            animate="visible"
          >
            {/* This wrapper creates the continuous jumping animation */}
            <motion.div
              className="flex bg-gradient-to-r from-purple-800 via-purple-400 to-purple-800 bg-[length:200%_auto] animate-fast-gradient text-transparent bg-clip-text"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {line1.split("").map((char, index) => (
                <motion.span key={char + "-" + index} variants={letter}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          </motion.h1>
          
          {/* Second Line */}
          <motion.div
            style={{ y: smoothText2Y, opacity: text2Opacity }}
            className="absolute inset-0 flex items-center justify-center gap-x-4 md:gap-x-8 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text"
          >
            DOWNLOAD TRANSLATE
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};