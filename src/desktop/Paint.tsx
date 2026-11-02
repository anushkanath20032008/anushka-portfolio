import React from 'react';

/** Shared SVG filters that give flat shapes a hand-painted edge. Render once near the app root. */
export const PaintDefs: React.FC = () => (
  <svg width="0" height="0" className="pointer-events-none absolute" aria-hidden focusable="false">
    <defs>
      {/* gentle wobble so repeating patterns still look hand-painted */}
      <filter id="brushM" x="-2%" y="-2%" width="104%" height="104%">
        <feTurbulence type="fractalNoise" baseFrequency="0.018 0.022" numOctaves="2" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      {/* wobbly brush edge for large shapes */}
      <filter id="brush" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="3" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="18" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      {/* tighter wobble for small marks and icons */}
      <filter id="brushS" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="9" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      {/* watercolour bleed: soft edge plus wobble */}
      <filter id="bleed" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="2" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="26" xChannelSelector="R" yChannelSelector="G" result="d" />
        <feGaussianBlur in="d" stdDeviation="5" />
      </filter>
      {/* cold-press paper grain */}
      <filter id="grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0.36  0 0 0 0 0.28  0 0 0 0 0.2  0 0 0 0.55 0" />
      </filter>
    </defs>
  </svg>
);

const FLOWER_COLORS = ['#E8552F', '#F6D774', '#F08AA0', '#FFF6E6', '#9FB6EE'];

/** Hand-painted landscape: dawn sky, drifting brush clouds, layered hills, wildflowers, paper grain. */
const DawnWallpaper: React.FC<{ className?: string }> = ({ className = '' }) => {
  const flowers = Array.from({ length: 46 }, (_, i) => ({
    x: (i * 137) % 1600,
    y: 748 + ((i * 53) % 130),
    r: 4 + ((i * 7) % 5),
    c: FLOWER_COLORS[i % FLOWER_COLORS.length],
  }));
  return (
    <svg className={`absolute inset-0 h-full w-full ${className}`} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden focusable="false">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9DB8E6" />
          <stop offset="0.42" stopColor="#E9C4C6" />
          <stop offset="0.68" stopColor="#F9D9B4" />
          <stop offset="1" stopColor="#FBE9C8" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#sky)" />

      {/* long dry-brush streaks across the sky */}
      <g filter="url(#brush)" stroke="#FFF6E6" strokeLinecap="round" fill="none">
        <path d="M-40 140 C300 90 640 170 980 120" strokeWidth="22" opacity="0.28" />
        <path d="M400 250 C700 210 1000 280 1320 230" strokeWidth="16" opacity="0.22" />
        <path d="M80 330 C340 300 520 350 760 320" strokeWidth="12" opacity="0.25" />
      </g>

      {/* sun with watercolour halo */}
      <g filter="url(#bleed)">
        <circle cx="1170" cy="360" r="230" fill="#FFE9B0" opacity="0.4" />
        <circle cx="1170" cy="360" r="125" fill="#FFD36E" />
      </g>

      {/* clouds drift slowly */}
      <g className="paint-drift" filter="url(#brush)" fill="#FFF6E6">
        <g opacity="0.85">
          <ellipse cx="300" cy="190" rx="130" ry="34" />
          <ellipse cx="380" cy="165" rx="90" ry="32" />
          <ellipse cx="230" cy="170" rx="70" ry="26" />
        </g>
        <g opacity="0.7">
          <ellipse cx="800" cy="110" rx="110" ry="26" />
          <ellipse cx="870" cy="92" rx="70" ry="24" />
        </g>
        <g opacity="0.75">
          <ellipse cx="1400" cy="205" rx="120" ry="28" />
          <ellipse cx="1340" cy="185" rx="70" ry="24" />
        </g>
      </g>

      {/* birds */}
      <g stroke="#1F2430" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#brushS)">
        <path d="M640 250 q14 -16 28 0 q14 -16 28 0" />
        <path d="M720 290 q10 -12 20 0 q10 -12 20 0" />
        <path d="M560 300 q8 -10 16 0 q8 -10 16 0" />
      </g>

      {/* hills, far to near */}
      <g filter="url(#brush)">
        <path d="M0 560 C200 500 380 540 560 520 C760 495 900 440 1100 480 C1300 520 1450 470 1600 500 L1600 900 L0 900 Z" fill="#B7CDBE" />
        <path d="M0 650 C180 590 360 640 560 610 C800 575 980 650 1200 620 C1380 595 1500 630 1600 610 L1600 900 L0 900 Z" fill="#86BBA0" />
        <path d="M0 740 C220 690 420 740 640 715 C900 685 1100 760 1350 730 C1470 716 1550 730 1600 725 L1600 900 L0 900 Z" fill="#4F9A7E" />
        <path d="M0 820 C300 780 600 830 900 805 C1200 780 1400 830 1600 810 L1600 900 L0 900 Z" fill="#2E7B68" />
      </g>
      {/* lighter wash strokes on the hills */}
      <g filter="url(#bleed)" fill="#FFF6E6" opacity="0.18">
        <ellipse cx="420" cy="640" rx="260" ry="22" />
        <ellipse cx="1150" cy="690" rx="300" ry="24" />
        <ellipse cx="700" cy="770" rx="320" ry="20" />
      </g>

      {/* wildflowers dabbed on */}
      <g filter="url(#brushS)">
        {flowers.map((f, i) => (
          <circle key={i} cx={f.x} cy={f.y} r={f.r} fill={f.c} />
        ))}
      </g>

      {/* paper grain over everything */}
      <rect width="1600" height="900" filter="url(#grain)" opacity="0.45" style={{ mixBlendMode: 'multiply' }} />
    </svg>
  );
};

/** Painted portrait placeholder: a woman with long dark hair, in gouache. */
const PaintedAvatarArt: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden focusable="false">
    <defs>
      <clipPath id="avatar-clip">
        <circle cx="60" cy="60" r="56" />
      </clipPath>
    </defs>
    <g clipPath="url(#avatar-clip)">
      <g filter="url(#brushS)">
        <circle cx="60" cy="60" r="56" fill="#F9D9B4" />
        {/* long hair behind the shoulders */}
        <path d="M26 56 C22 20 46 8 62 8 C82 8 98 24 94 58 C93 82 100 100 104 116 L18 116 C24 100 28 80 26 56 Z" fill="#2B2230" />
        {/* kurta */}
        <path d="M14 112 C18 88 38 80 60 80 C82 80 102 88 106 112 C92 124 28 124 14 112 Z" fill="#E8552F" />
        <path d="M46 82 C52 94 68 94 74 82" stroke="#F6D774" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* neck and face */}
        <path d="M49 68 h22 v14 c-6 6 -16 6 -22 0 Z" fill="#E9B48C" />
        <ellipse cx="60" cy="50" rx="20" ry="24" fill="#F0BF99" />
        {/* hair parting and fringe */}
        <path d="M38 46 C38 26 52 20 62 21 C74 22 84 32 82 48 C78 36 70 30 60 29 C50 30 42 36 38 46 Z" fill="#2B2230" />
        {/* earrings */}
        <circle cx="39.5" cy="60" r="2.6" fill="#F6D774" />
        <circle cx="80.5" cy="60" r="2.6" fill="#F6D774" />
        {/* bindi, eyes, smile */}
        <circle cx="60" cy="38" r="2.2" fill="#E4256B" />
        <path d="M49 51 q4 -3 8 0 M63 51 q4 -3 8 0" stroke="#2B2230" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M52 62 q8 6 16 0" stroke="#B5384A" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      </g>
    </g>
    <circle cx="60" cy="60" r="56" fill="none" stroke="#1F2430" strokeWidth="3" filter="url(#brushS)" />
  </svg>
);

/** Real photo in a hand-inked circle; falls back to the painted avatar if the file is missing. */
export const PaintedAvatar: React.FC<{ size?: number }> = ({ size = 120 }) => {
  const [failed, setFailed] = React.useState(false);
  if (failed) return <PaintedAvatarArt size={size} />;
  return (
    <span
      className="inline-block shrink-0 overflow-hidden rounded-full border-[3px] border-[#1F2430] bg-[#F9D9B4] align-middle"
      style={{ width: size, height: size }}
    >
      <img
        src={`${import.meta.env.BASE_URL}img/me.jpg`}
        alt=""
        width={size}
        height={size}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
        style={{ objectPosition: '50% 90%', transform: 'scale(1.6)', transformOrigin: '50% 40%' }}
      />
    </span>
  );
};

/** Start button: four dabs of paint. */
export const PaintedStart: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden focusable="false" filter="url(#brushS)">
    <rect x="3" y="3" width="12" height="12" rx="3" fill="#E8552F" stroke="#1F2430" strokeWidth="1.6" />
    <rect x="17" y="3" width="12" height="12" rx="3" fill="#F6D774" stroke="#1F2430" strokeWidth="1.6" />
    <rect x="3" y="17" width="12" height="12" rx="3" fill="#8FD0B8" stroke="#1F2430" strokeWidth="1.6" />
    <rect x="17" y="17" width="12" height="12" rx="3" fill="#9FB6EE" stroke="#1F2430" strokeWidth="1.6" />
  </svg>
);

const petals = (n: number, rot: number, cy: number, rx: number, ry: number, fill: string) =>
  Array.from({ length: n }, (_, i) => <ellipse key={`${fill}${i}`} cx="0" cy={cy} rx={rx} ry={ry} fill={fill} transform={`rotate(${rot + (i * 360) / n})`} />);

const PatternArt: React.FC<{ variant: 'rangoli' | 'blockprint' | 'confetti'; className?: string }> = ({ variant, className = '' }) => (
  <svg className={`absolute inset-0 h-full w-full ${className}`} aria-hidden focusable="false">
    <defs>
      {/* rangoli: mandala tiles in saffron, magenta, teal and indigo */}
      <pattern id="pt-rangoli" width="200" height="200" patternUnits="userSpaceOnUse">
        <rect width="200" height="200" fill="#FFE9C7" />
        <g transform="translate(100 100)">
          {petals(8, 0, -50, 12, 27, '#E4256B')}
          {petals(8, 22.5, -34, 7, 17, '#F9A11B')}
          <circle r="30" fill="#1B8A8F" />
          <circle r="21" fill="#FFE9C7" />
          <circle r="11" fill="#6A2C91" />
          {Array.from({ length: 16 }, (_, i) => (
            <circle key={i} cx="0" cy="-80" r="3.5" fill="#2B3A9E" transform={`rotate(${i * 22.5})`} />
          ))}
        </g>
        {[[0, 0], [200, 0], [0, 200], [200, 200]].map(([x, y]) => (
          <g key={`${x}${y}`} transform={`translate(${x} ${y})`}>
            <path d="M0 -26 L19 0 L0 26 L-19 0 Z" fill="#F9A11B" />
            <circle r="7" fill="#1B8A8F" />
          </g>
        ))}
        {[[100, 0], [100, 200], [0, 100], [200, 100]].map(([x, y]) => (
          <g key={`f${x}${y}`} transform={`translate(${x} ${y})`}>
            <circle r="11" fill="#6A2C91" />
            <circle r="5" fill="#FFE9C7" />
          </g>
        ))}
      </pattern>

      {/* block print: paisley and blossoms on indigo */}
      <g id="paisley">
        <path d="M0 -44 C30 -34 40 2 24 26 C10 46 -20 44 -28 20 C-34 2 -16 -10 0 -6 C12 -3 14 12 5 16 C-4 20 -13 12 -8 5 C-30 8 -34 -24 0 -44 Z" />
      </g>
      <pattern id="pt-blockprint" width="220" height="220" patternUnits="userSpaceOnUse">
        <rect width="220" height="220" fill="#1F3B73" />
        <g transform="translate(62 72) rotate(18)">
          <use href="#paisley" fill="#F26B4F" />
          <circle cx="4" cy="14" r="9" fill="#FFE9C7" />
          <circle cx="4" cy="14" r="4" fill="#1F3B73" />
          <circle cx="-4" cy="-18" r="3.5" fill="#F2B632" />
        </g>
        <g transform="translate(172 182) rotate(198)">
          <use href="#paisley" fill="#F2B632" />
          <circle cx="4" cy="14" r="9" fill="#F26B4F" />
          <circle cx="4" cy="14" r="4" fill="#FFE9C7" />
          <circle cx="-4" cy="-18" r="3.5" fill="#FFE9C7" />
        </g>
        {([[172, 60, '#F8B4C8'], [62, 182, '#8FD0B8']] as [number, number, string][]).map(([x, y, c]) => (
          <g key={`${x}`} transform={`translate(${x} ${y})`}>
            {petals(5, 0, -12, 7, 12, c)}
            <circle r="5" fill="#F2B632" />
          </g>
        ))}
        {[[10, 10], [210, 10], [10, 210], [210, 210], [112, 126]].map(([x, y]) => (
          <circle key={`d${x}${y}`} cx={x} cy={y} r="4" fill="#FFE9C7" />
        ))}
      </pattern>

      {/* confetti: playful memphis shapes on pink */}
      <pattern id="pt-confetti" width="260" height="260" patternUnits="userSpaceOnUse">
        <rect width="260" height="260" fill="#FFD0DD" />
        <path d="M30 40 L62 40 L46 12 Z" fill="#14B8A6" />
        <path d="M150 190 L184 190 L167 160 Z" fill="#14B8A6" />
        <path d="M120 40 q14 -22 28 0 t28 0 t28 0" stroke="#2B3A9E" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M20 170 q14 -22 28 0 t28 0" stroke="#F26B4F" strokeWidth="7" fill="none" strokeLinecap="round" />
        <circle cx="220" cy="110" r="16" fill="#FFD23F" />
        <circle cx="90" cy="120" r="10" fill="#6A2C91" />
        <circle cx="30" cy="236" r="7" fill="#2B3A9E" />
        <path d="M200 230 a22 22 0 0 1 44 0 Z" fill="#F26B4F" />
        <path d="M100 210 h26 M113 197 v26" stroke="#1F2430" strokeWidth="6" strokeLinecap="round" />
        <path d="M232 30 l18 18 M250 30 l-18 18" stroke="#FFD23F" strokeWidth="6" strokeLinecap="round" />
        <rect x="64" y="86" width="20" height="20" rx="4" fill="#FFFFFF" transform="rotate(20 74 96)" />
      </pattern>
    </defs>
    <g filter="url(#brushM)">
      <rect x="-40" y="-40" width="6000" height="4000" fill={`url(#pt-${variant})`} />
    </g>
    <rect width="100%" height="100%" fill="#FFF6E6" opacity="0.62" />
    <rect width="100%" height="100%" filter="url(#grain)" opacity="0.35" style={{ mixBlendMode: 'multiply' }} />
  </svg>
);

export type WallpaperId = 'dawn' | 'rangoli' | 'blockprint' | 'confetti';

export const PaintedWallpaper: React.FC<{ variant?: WallpaperId; className?: string }> = ({ variant = 'dawn', className }) =>
  variant === 'dawn' ? <DawnWallpaper className={className} /> : <PatternArt variant={variant} className={className} />;
