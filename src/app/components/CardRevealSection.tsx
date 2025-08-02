// PASTE THIS UPDATED CODE INTO: src/app/components/CardRevealSection.tsx

"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import styles from './CardRevealSection.module.css';
import Image from 'next/image';

// THE FIX: This now points to your local images in the /public folder
const cardData = [
  { title: "Global Reach", poweredBy: "100+ Languages", imageUrl: "/card-image-1.jpg" },
  { title: "Real-Time Voice", poweredBy: "Conversation Mode", imageUrl: "/card-image-2.jpg" },
  { title: "Instant Camera", poweredBy: "Visual Translation", imageUrl: "/card-image-3.jpg" },
  { title: "Offline Access", poweredBy: "No Internet Needed", imageUrl: "/card-image-4.jpg" },
];

const AnimatedCard = ({ index, scrollYProgress }: { index: number, scrollYProgress: MotionValue<number> }) => {
  const start = 0.1 + index * 0.15;
  const end = start + 0.2;

  const x = useTransform(scrollYProgress, [start, end], ["100vw", "0vw"]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const card = cardData[index];

  return (
    <motion.div style={{ x, opacity }}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image 
            src={card.imageUrl} 
            alt={card.title} 
            fill 
            style={{ objectFit: 'cover' }}
            className={styles.image}
            // Add an error placeholder in case an image is missing
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/000000/FFF?text=Image'; }}
          />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.heading}>{card.title}</p>
          <p>Powered By</p>
          <p>{card.poweredBy}</p>
        </div>
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

  const sectionOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-black">
      <motion.div style={{ opacity: sectionOpacity }} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="flex gap-16">
          {cardData.map((_, index) => (
            <AnimatedCard key={index} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};