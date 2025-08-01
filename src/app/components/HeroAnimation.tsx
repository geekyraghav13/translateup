// PASTE THIS FINAL, CORRECTED CODE INTO app/components/HeroAnimation.tsx

"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { MessageSquare, Camera, Mic, BookOpen, WifiOff, History, Star } from 'lucide-react';
import Image from 'next/image';

// THE FIX: Define a specific TypeScript interface for our feature objects.
interface Feature {
  icon: React.ElementType;
  title: string;
  x: string;
  y: string;
}

// Use the new `Feature` interface instead of `any`.
const Card = ({ scrollYProgress, index, feature }: { scrollYProgress: MotionValue<number>, index: number, feature: Feature }) => {
    const start = 0.8 + index * 0.02;
    const end = 0.9 + index * 0.02;

    const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
    const scale = useTransform(scrollYProgress, [start, end], [0.5, 1]);
    
    const x = useTransform(scrollYProgress, [start, end], ["0%", feature.x]);
    const y = useTransform(scrollYProgress, [start, end], ["0%", feature.y]);

    return (
        <motion.div 
            key={feature.title} 
            className="absolute z-30 w-56 p-4 rounded-xl bg-gray-900/80 border border-gray-700 backdrop-blur-md"
            style={{ opacity, scale, x, y }}
        >
            <feature.icon className="w-8 h-8 mb-2 text-purple-400" />
            <h3 className="text-lg font-bold text-white">{feature.title}</h3>
        </motion.div>
    );
};


export const HeroAnimation = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const initialTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const mainAnimationOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const phoneX = useTransform(scrollYProgress, [0.4, 0.6], ['-30vw', '0vw']);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);
  const rotate = useTransform(scrollYProgress, [0.6, 0.75], [90, 0]);
  
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(phoneX, springConfig);
  const smoothRotate = useSpring(rotate, springConfig);
  const scale = useTransform(scrollYProgress, [0.15, 0.95, 1], [0.8, 1, 0.9]);
  
 const features = [
    { icon: Camera, title: "Camera Translation", x: "-100%", y: "-250%" },
    { icon: MessageSquare, title: "Text Translation", x: "-200%", y: "-100%" },
    { icon: Mic, title: "Voice Conversation", x: "250%", y: "-250%" },
    { icon: BookOpen, title: "Dictionary", x: "-280%", y: "100%" },
    { icon: WifiOff, title: "Offline Mode", x: "350%", y: "0%" },
    { icon: History, title: "History", x: "-100%", y: "130%" },

  ];
  return (
    <section ref={targetRef} className="relative h-[600vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: initialTextOpacity }}
          className="absolute inset-0 flex items-center justify-center z-50"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text p-2">
            Speak the World&apos;s Languages.
          </h1>
        </motion.div>
        <motion.div style={{ opacity: mainAnimationOpacity }} className="absolute inset-0">
            <motion.div 
                style={{ opacity: textOpacity }} 
                className="absolute top-1/2 -translate-y-1/2 right-[10%] w-auto max-w-sm text-white z-40"
            >
                <h1 className="text-4xl md:text-5xl font-bold">TranslateUp</h1>
                <p className="text-lg md:text-xl text-gray-300 mt-4">
                    AI-powered translation for text, voice, and camera.
                </p>
                <a
                    href="https://play.google.com/store/apps/details?id=com.hindi.english.translate.language.word.dictionary"
                    target="_blank" rel="noopener noreferrer" className="inline-block mt-6"
                >
                    <Image src="/google-play-badge.png" alt="Get it on Google Play" width={180} height={68} />
                </a>
            </motion.div>
            <motion.div style={{ rotate: smoothRotate, scale, x: smoothX }} className="absolute left-1/2 top-0 bottom-0 flex items-center z-20 w-[300px] h-[600px] md:w-[350px] md:h-[700px] my-auto">
              <div className="relative w-full h-full">
                <Image 
                    src="/app-screenshot.png" 
                    fill 
                    style={{ objectFit: 'contain' }} 
                    alt="TranslateUp App Screenshot" 
                    priority
                />
                <div className="absolute inset-0 border-[14px] border-gray-800 rounded-[50px] pointer-events-none"></div>
              </div>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              {features.map((feature, index) => (
                  <Card key={index} index={index} feature={feature} scrollYProgress={scrollYProgress} />
              ))}
            </div>
        </motion.div>
      </div>
    </section>
  );
};