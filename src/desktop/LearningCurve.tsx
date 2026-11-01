import React from 'react';
import { motion } from 'motion/react';

/** Hand-drawn "learning curve" doodle: the line draws itself, then the slope arrow pulses. */
export const LearningCurve: React.FC<{ className?: string; row?: boolean }> = ({ className = '', row }) => (
  <figure className={`${row ? 'flex items-center gap-3' : ''} ${className}`}>
    <svg viewBox="0 0 260 120" role="img" aria-label="A learning curve getting steeper over time" className={row ? 'w-36 shrink-0' : 'w-full'}>
      <g filter="url(#brushS)" fill="none" stroke="#1F2430" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8 V104 H246" />
        <path d="M12 16 L18 7 L24 16" />
        <path d="M238 98 L247 104 L238 110" />
      </g>
      <motion.path
        d="M22 100 C70 98 110 96 150 80 C190 62 205 34 240 10"
        fill="none"
        stroke="#E8552F"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#brushS)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.6, ease: 'easeInOut' }}
      />
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: [1, 1.25, 1] }}
        transition={{ delay: 2.4, duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
        style={{ transformOrigin: '240px 10px' }}
      >
        <circle cx="240" cy="10" r="5.5" fill="#F6D774" stroke="#1F2430" strokeWidth="2" />
      </motion.g>
      <text x="26" y="20" fontFamily="Caveat, cursive" fontSize="17" fill="#1F2430">what I know</text>
      <text x="176" y="117" fontFamily="Caveat, cursive" fontSize="17" fill="#1F2430">time</text>
      <text x="96" y="64" fontFamily="Caveat, cursive" fontSize="19" fill="#E8552F" transform="rotate(-9 96 64)">steeper, please</text>
    </svg>
    <figcaption className={`font-hand leading-tight ${row ? 'text-lg' : 'mt-1 text-xl'}`}>
      Chasing a steeper learning curve. Ready for the 4 AM starts and the 20-hour days.
    </figcaption>
  </figure>
);
