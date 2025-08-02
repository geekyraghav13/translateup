// PASTE THIS CORRECTED CODE INTO: src/app/components/AnimatedButton.tsx

"use client";

import styles from './AnimatedButton.module.css';

export const AnimatedButton = () => {
  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );

  return (
    <a 
      href="https://play.google.com/store/apps/details?id=com.hindi.english.translate.language.word.dictionary"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
    >
      Get Started
      <div className={styles.button__icon_wrapper}>
        {/* THE FIX: The two icons are now siblings, as the CSS expects */}
        <span className={styles.button__icon_svg}>
          <ArrowIcon />
        </span>
        <span className={styles.button__icon_svg_copy}>
          <ArrowIcon />
        </span>
      </div>
    </a>
  );
};