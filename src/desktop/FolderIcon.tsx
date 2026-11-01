import React from 'react';
import { motion } from 'motion/react';

const INK = '#1F2430';
const PAPER = '#FFF6E6';

// Folder colour per icon key; keeps the desktop varied but in one warm family.
const COLORS: Record<string, string> = {
  work: '#F4A27B',
  builds: '#8FD0B8',
  education: '#9FB6EE',
  internships: '#F2CF6E',
  academic: '#F3A6BA',
  competitions: '#B9DB8B',
  achievements: '#F6B65C',
  certifications: '#A7D3E8',
  extra: '#E5A6D8',
  skills: '#C3B4F0',
};

const stroke = { stroke: INK, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

/** Little illustrated object that peeks out of each folder and animates on hover. */
const Glyph: React.FC<{ k: string }> = ({ k }) => {
  switch (k) {
    case 'work':
      return (
        <g {...stroke}>
          <rect x="28" y="12" width="40" height="32" rx="4" fill={PAPER} />
          <motion.path
            d="M33 38 L42 29 L50 33 L63 19"
            fill="none"
            stroke="#E8552F"
            variants={{ rest: { pathLength: 0.35 }, hover: { pathLength: 1 } }}
            transition={{ duration: 0.5 }}
          />
          <path d="M33 20 h14 M33 24 h8" />
        </g>
      );
    case 'builds':
      return (
        <g {...stroke} fill="none">
          <rect x="26" y="12" width="44" height="32" rx="4" fill={PAPER} />
          <path d="M39 22 L33 28 L39 34 M57 22 L63 28 L57 34 M52 20 L44 36" />
        </g>
      );
    case 'education':
      return (
        <g {...stroke}>
          <path d="M48 12 L72 22 L48 32 L24 22 Z" fill={PAPER} />
          <path d="M34 28 v9 c8 6 20 6 28 0 v-9" fill="none" />
          <path d="M72 22 v12" fill="none" />
        </g>
      );
    case 'internships':
      return (
        <g {...stroke}>
          <rect x="35" y="12" width="26" height="34" rx="4" fill={PAPER} />
          <circle cx="48" cy="24" r="5" fill="#F2CF6E" />
          <path d="M40 36 h16 M42 41 h12" fill="none" />
          <path d="M44 12 v-4 h8 v4" fill="none" />
        </g>
      );
    case 'academic':
      return (
        <g {...stroke}>
          <path d="M24 38 Q36 30 48 36 Q60 30 72 38 V16 Q60 10 48 16 Q36 10 24 16 Z" fill={PAPER} />
          <path d="M48 16 V36" fill="none" />
        </g>
      );
    case 'competitions':
      return (
        <g {...stroke}>
          <path d="M37 12 h22 v12 a11 11 0 0 1 -22 0 Z" fill="#F6D774" />
          <path d="M37 16 h-5 a5 6 0 0 0 5 8 M59 16 h5 a5 6 0 0 1 -5 8" fill="none" />
          <path d="M48 35 v6 M40 44 h16" fill="none" />
        </g>
      );
    case 'achievements':
      return (
        <motion.g
          {...stroke}
          style={{ transformOrigin: '48px 10px' }}
          variants={{ rest: { rotate: 0 }, hover: { rotate: [0, 10, -10, 6, 0] } }}
          transition={{ duration: 0.8 }}
        >
          <path d="M40 8 L46 28 M56 8 L50 28" fill="none" stroke="#E8552F" />
          <circle cx="48" cy="34" r="11" fill="#F6D774" />
          <path d="M48 28 l2 4 4 .6 -3 3 .8 4 -3.8 -2 -3.8 2 .8 -4 -3 -3 4 -.6 Z" fill={PAPER} strokeWidth={1.4} />
        </motion.g>
      );
    case 'certifications':
      return (
        <g {...stroke}>
          <rect x="26" y="14" width="44" height="30" rx="3" fill={PAPER} />
          <path d="M33 22 h30 M33 28 h18" fill="none" />
          <circle cx="60" cy="36" r="5" fill="#E8552F" />
        </g>
      );
    case 'extra':
      return (
        <g {...stroke}>
          <path d="M48 42 C28 30 30 14 40 14 C45 14 48 18 48 20 C48 18 51 14 56 14 C66 14 68 30 48 42 Z" fill="#F08AA0" />
        </g>
      );
    case 'skills':
    default:
      return (
        <g {...stroke}>
          <path d="M48 10 L53 24 L68 26 L57 36 L60 50 L48 43 L36 50 L39 36 L28 26 L43 24 Z" fill="#F6D774" transform="translate(0,-4) scale(.95) translate(2.5,0)" />
        </g>
      );
  }
};

interface Props {
  iconKey: string;
  label: string;
  tilt?: number;
  onOpen: () => void;
  size?: number;
}

export const FolderIcon: React.FC<Props> = ({ iconKey, label, tilt = 0, onOpen, size = 96 }) => {
  const color = COLORS[iconKey] ?? '#F4A27B';
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${label}`}
      className="group flex flex-col items-center gap-1 rounded-xl p-2 outline-none focus-visible:ring-2 focus-visible:ring-[#E8552F]"
      style={{ rotate: tilt, width: size + 24 }}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={{ scale: 0.96 }}
    >
      <svg viewBox="0 0 96 84" width={size} height={(size * 84) / 96} aria-hidden="true" className="overflow-visible">
        {/* back panel with tab */}
        <path d="M6 20 Q6 12 14 12 H34 L42 20 H84 Q90 20 90 26 V72 Q90 78 84 78 H12 Q6 78 6 72 Z" fill={color} {...stroke} />
        <path d="M6 20 Q6 12 14 12 H34 L42 20 H84 Q90 20 90 26 V32 H6 Z" fill="#000" opacity="0.08" />
        {/* peeking object */}
        <motion.g variants={{ rest: { y: 8 }, hover: { y: -6 } }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}>
          <Glyph k={iconKey} />
        </motion.g>
        {/* front panel */}
        <motion.path
          d="M6 36 Q6 30 12 30 H84 Q90 30 90 36 V72 Q90 78 84 78 H12 Q6 78 6 72 Z"
          fill={color}
          {...stroke}
          style={{ transformOrigin: '48px 78px' }}
          variants={{ rest: { scaleY: 1, skewX: 0 }, hover: { scaleY: 0.9, skewX: -3 } }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        />
        <path d="M14 70 H40" stroke={INK} strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
      </svg>
      <span className="font-hand text-[17px] leading-[1.05] text-[#1F2430] text-center max-w-[110px] rounded-md bg-[#FFF6E6]/85 px-1.5 py-0.5">{label}</span>
    </motion.button>
  );
};
