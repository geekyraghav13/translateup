// PASTE THIS CORRECTED CODE INTO: src/app/components/CardRevealSection.tsx

"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import styles from './CardRevealSection.module.css';

const cardData = [
  { title: "Global Reach", poweredBy: "100+ Languages" },
  { title: "Real-Time Voice", poweredBy: "Conversation Mode" },
  { title: "Instant Camera", poweredBy: "Visual Translation" },
  { title: "Offline Access", poweredBy: "No Internet Needed" },
];

// A new, dedicated component for each card to handle its own animation
const AnimatedCard = ({ index, scrollYProgress }: { index: number, scrollYProgress: MotionValue<number> }) => {
  // Each card's animation is staggered based on its index.
  // Card 0 animates between 10% and 30% scroll, Card 1 between 25% and 45%, etc.
  const start = 0.1 + index * 0.15;
  const end = start + 0.2;

  // Animate each card individually from off-screen right (100vw) to its final position (0vw).
  const x = useTransform(scrollYProgress, [start, end], ["100vw", "0vw"]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const card = cardData[index];

  return (
    // This motion.div handles the animation for a single card
    <motion.div style={{ x, opacity }}>
      <div className={styles.card}>
        <p className={styles.heading}>{card.title}</p>
        <p>Powered By</p>
        <p>{card.poweredBy}</p>
      </div>
    </motion.div>
  );
};

export const CardRevealSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // This will fade out the entire section at the end of the scroll
  const sectionOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-black">
      <motion.div style={{ opacity: sectionOpacity }} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* This container uses flexbox to space out the cards correctly once they arrive */}
        <div className="flex gap-16">
          {cardData.map((_, index) => (
            <AnimatedCard key={index} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};