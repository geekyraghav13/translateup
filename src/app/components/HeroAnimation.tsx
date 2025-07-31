// PASTE THIS FINAL, TESTED CODE INTO app/components/HeroAnimation.tsx

"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, Camera, Mic } from 'lucide-react';
import Image from 'next/image';

export const HeroAnimation = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Scene 1: Initial Text Opacity
  const initialTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Scene 2: Two-Column Layout Opacity
  const mainContentOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  // Scene 3: The Phone's movement from left to center
  // This happens between 30% and 70% of the scroll
  const phoneX = useTransform(scrollYProgress, [0.3, 0.7], ["-30vw", "0vw"]);
  
  // Scene 3: The right-side text fades out as the phone moves
  const rightColumnOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);

  // Scene 4: The feature cards appear at the very end
  const getCardOpacity = (index: number) => {
    const start = 0.8 + index * 0.05;
    const end = 0.9 + index * 0.05;
    return useTransform(scrollYProgress, [start, end], [0, 1]);
  };

  const features = [
    { icon: MessageSquare, title: "Text Translation", position: "left" },
    { icon: Camera, title: "Camera Translation", position: "top" },
    { icon: Mic, title: "Voice Conversation", position: "right" },
  ];

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* SCENE 1: The initial text */}
        <motion.div
          style={{ opacity: initialTextOpacity }}
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center">
            Speak the World's Languages.
          </h1>
        </motion.div>

        {/* This container holds all subsequent scenes */}
        <motion.div 
            style={{ opacity: mainContentOpacity }}
            className="absolute inset-0"
        >
            {/* SCENE 2 & 3: The Phone, which starts left and moves center */}
            <motion.div 
                style={{ x: phoneX }}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[300px] h-[600px] md:w-[350px] md:h-[700px] z-10"
            >
                <div className="relative w-full h-full">
                    <Image src="/app-screenshot.png" fill style={{ objectFit: 'contain' }} alt="App" priority/>
                    <div className="absolute inset-0 border-[14px] border-gray-800 rounded-[50px] pointer-events-none"></div>
                </div>
            </motion.div>
            
            {/* SCENE 2 & 3: The right-side column, which fades out */}
            <motion.div 
                style={{ opacity: rightColumnOpacity }}
                className="absolute top-1/2 -translate-y-1/2 right-[5vw] lg:right-[10vw] w-[40vw] max-w-md"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white">TranslateUp</h2>
                <p className="text-lg text-gray-400 mt-4">
                    Advanced AI translation for text, voice, and camera.
                </p>
                <a
                    href="https://play.google.com/store/apps/details?id=com.hindi.english.translate.language.word.dictionary"
                    target="_blank" rel="noopener noreferrer" className="inline-block mt-6"
                >
                    <Image src="/google-play-badge.png" alt="Get it on Google Play" width={180} height={68} />
                </a>
            </motion.div>

            {/* SCENE 4: The feature cards that appear around the centered phone */}
            {features.map((feature, index) => {
                let positionClass = "";
                if (feature.position === 'left') positionClass = "left-[5vw] lg:left-[15vw]";
                if (feature.position === 'top') positionClass = "top-[10vh] left-1/2 -translate-x-1/2";
                if (feature.position === 'right') positionClass = "right-[5vw] lg:right-[15vw]";

                return (
                    <motion.div
                        key={feature.title}
                        style={{ opacity: getCardOpacity(index) }}
                        className={`absolute top-1/2 -translate-y-1/2 w-56 p-4 rounded-xl bg-gray-900/80 border border-gray-700 backdrop-blur-md ${positionClass}`}
                    >
                        <feature.icon className="w-8 h-8 mb-2 text-purple-400" />
                        <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                    </motion.div>
                );
            })}
        </motion.div>
      </div>
    </section>
  );
};