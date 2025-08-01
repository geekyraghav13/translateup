// PASTE THIS UPDATED CODE INTO YOUR app/page.tsx FILE

"use client"; 

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { HeroAnimation } from './components/HeroAnimation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AdvancedTextAnimation } from './components/AdvancedTextAnimation';
import { CardRevealSection } from './components/CardRevealSection'; // 1. Import the new component
import { AnimatedButton } from './components/AnimatedButton';

const TestimonialCard = ({ text, author, role }: { text: string, author: string, role: string }) => (
  <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
    <p className="text-gray-300 mb-4">{text}</p>
    <div>
      <p className="font-semibold text-white">{author}</p>
      <p className="text-sm text-purple-400">{role}</p>
    </div>
  </div>
);

export default function TranslateUpLandingPage() {
  const { scrollYProgress } = useScroll();

  const testimonialsOpacity = useTransform(
    scrollYProgress,
    [0.95, 1], // Adjusted timing for the new, longer page
    [0, 1]
  );
  
  return (
    <div className="bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="TranslateUp Logo" width={32} height={32} />
            <span className="text-xl font-bold text-white">TranslateUp</span>
          </div>
          <AnimatedButton />
        </div>
      </header>

      <main>
        <AdvancedTextAnimation />
        
        {/* 2. Add the new card section here */}
        <CardRevealSection />

        <HeroAnimation />

        <motion.div style={{ opacity: testimonialsOpacity }}>
            <section id="testimonials" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Loved by Users Worldwide</h2>
                <p className="text-gray-400 mt-2">Don&apos;t just take our word for it.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <TestimonialCard
                    text="&quot;This is the best translator app I've ever used. The camera translation is a lifesaver for traveling!&quot;"
                    author="Aarav Sharma"
                    role="Frequent Traveler"
                />
                <TestimonialCard
                    text="&quot;Incredibly accurate and fast. The conversation mode works like a charm. Highly recommended.&quot;"
                    author="Priya Patel"
                    role="Language Student"
                />
                <TestimonialCard
                    text="&quot;A must-have app. The UI is clean, and the AI translation feels much more natural than other apps I've tried.&quot;"
                    author="Rohan Das"
                    role="Tech Enthusiast"
                />
                </div>
            </div>
            </section>
            
            <footer id="contact" className="py-12 border-t border-gray-800">
            <div className="container mx-auto px-6 text-center text-gray-500">
                <div className="flex justify-center items-center space-x-2 mb-4">
                <Image src="/logo.svg" alt="TranslateUp Logo" width={24} height={24} />
                <span className="text-lg font-bold text-gray-400">TranslateUp</span>
                </div>
                <div className="space-x-6 mb-4">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
                <a href="mailto:support@translateup.app" className="hover:text-white">Contact</a>
                </div>
                <p suppressHydrationWarning={true}>
                    &copy; {new Date().getFullYear()} TranslateUp. All rights reserved.
                </p>
            </div>
            </footer>
        </motion.div>
      </main>
    </div>
  );
}