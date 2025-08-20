'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Mock Data for the translated words ---
const translatedWords = [
  { text: 'Hello', position: { top: '10%', left: '10%' } },
  { text: '你好', position: { top: '20%', right: '15%' } },
  { text: 'Bonjour', position: { top: '75%', left: '20%' } },
  { text: 'Hola', position: { bottom: '10%', right: '10%' } },
  { text: 'こんにちは', position: { top: '40%', left: '5%' } },
  { text: '안녕하세요', position: { top: '60%', right: '5%' } },
  { text: 'Guten Tag', position: { top: '85%', left: '45%' } },
  { text: 'Ciao', position: { top: '5%', right: '35%' } },
];

// --- The Main Component ---
const TranslateEffectSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // --- Video Scrubbing Animation ---
  // Map the scroll progress (0 to 1) to the video's duration (0 to 6 seconds)
  const videoTime = useTransform(scrollYProgress, [0, 1], [0, 6]);

  // This effect hook listens for changes in videoTime and updates the video's playback position
  useEffect(() => {
    // We need to make sure the video is ready before we try to update its time
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      const unsubscribe = videoTime.on("change", (latestTime) => {
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA or more
           video.currentTime = latestTime;
        }
      });
      return unsubscribe;
    };
    
    let unsubscribe: (() => void) | undefined;

    if (video.readyState >= 2) {
      unsubscribe = handleCanPlay();
    } else {
      video.addEventListener('canplay', handleCanPlay, { once: true });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoTime]);


  // --- Syncing other animations to the video timeline ---
  const clickPoint = 0.5; // Corresponds to the 3-second mark in the video

  // The flash happens right at the click point
  const flashOpacity = useTransform(
    scrollYProgress,
    [clickPoint - 0.02, clickPoint, clickPoint + 0.02, clickPoint + 0.04],
    [0, 1, 1, 0]
  );

  // The text appears right after the click
  const textOpacity = useTransform(scrollYProgress, [clickPoint + 0.05, clickPoint + 0.2], [0, 1]);
  const textScale = useTransform(scrollYProgress, [clickPoint + 0.05, clickPoint + 0.2], [0.8, 1]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black text-white">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* The Video Player */}
        {/* FIX: Adjusted styling to properly cover and center the video */}
        <video
          ref={videoRef}
          src="/vid.mp4"
          className="absolute top-0 left-0 w-full h-full object-cover"
          playsInline
          muted
          preload="auto"
        />

        {/* The Camera Flash Effect */}
        <motion.div
          style={{ opacity: flashOpacity }}
          className="absolute inset-0 bg-white z-10" // Added z-index
          aria-hidden="true"
        />

        {/* The Translated Words Container */}
        <div className="relative z-20 w-full h-full"> {/* Added relative and z-index */}
          {translatedWords.map((word, index) => (
            <motion.span
              key={index}
              style={{
                opacity: textOpacity,
                scale: textScale,
                ...word.position,
              }}
              className="absolute text-xl md:text-3xl font-semibold bg-black bg-opacity-50 p-2 rounded-lg"
            >
              {word.text}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TranslateEffectSection;
