import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { useContent } from '../lib/content';
import { FolderIcon } from './FolderIcon';
import { Taskbar } from './Taskbar';
import { LearningCurve } from './LearningCurve';
import { ThemedWallpaper } from './wallpaper';
import { useMedia, usePrefersReducedMotion } from './hooks';
import Magnet from '../reactbits/Magnet';
import BlurText from '../reactbits/BlurText';

const NOTE_COLORS = ['#FBE58A', '#BFE5D0', '#F7C3D1'];
const TILTS = [-3, 2, -1.5, 2.5, -2, 1.5, -2.5, 1, -1, 2];

const Toast: React.FC<{ show: boolean }> = ({ show }) => {
  const { content } = useContent();
  const nav = useNavigate();
  const [open, setOpen] = useState(true);
  const item = content.now.find((n) => n.kind === 'role');
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setOpen(false), 7500);
    return () => clearTimeout(t);
  }, [show]);
  return (
    <AnimatePresence>
      {show && open && item && (
        <motion.div
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 220, damping: 22 }}
          role="status"
          className="fixed bottom-[4.5rem] right-4 z-[47] w-72 border-2 border-[#1F2430] bg-[#FFFBF4] p-3 paper-shadow hand-box"
        >
          <button onClick={() => setOpen(false)} aria-label="Dismiss notification" className="absolute right-2 top-2 text-[#1F2430]/60 hover:text-[#1F2430]">
            <X size={14} />
          </button>
          <p className="font-mono text-[10px] uppercase tracking-wide text-[#E8552F]">New</p>
          <button onClick={() => nav(`/now/${item.id}`)} className="mt-0.5 text-left">
            <p className="font-hand text-2xl leading-none text-[#1F2430]">{item.statusText}</p>
            <p className="text-xs text-[#1F2430]/70">{item.label}</p>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NowNotes: React.FC<{ className: string; note: string }> = ({ className, note }) => {
  const { content } = useContent();
  return (
    <section aria-label="Now" className={className}>
      {content.now.map((n, i) => (
        <Link
          key={n.id}
          to={`/now/${n.id}`}
          data-note
          className={`block border border-[#1F2430]/40 p-3 text-[#1F2430] shadow-[3px_4px_0_rgba(31,36,48,0.25)] transition-transform hover:-translate-y-1 hover:rotate-0 ${note}`}
          style={{ background: NOTE_COLORS[i % NOTE_COLORS.length], transform: `rotate(${TILTS[(i + 3) % TILTS.length]}deg)` }}
        >
          <p className="font-mono text-[10px] uppercase tracking-wide text-[#1F2430]/60">{n.kind === 'building' ? 'building' : n.kind === 'role' ? 'new role' : 'now'}</p>
          <p className="font-hand text-2xl font-bold leading-[0.95]">{n.label}</p>
          <p className="mt-1 text-xs leading-snug">{n.statusText}</p>
        </Link>
      ))}
    </section>
  );
};

export const Desktop: React.FC<{ unlocked: boolean; onLock: () => void }> = ({ unlocked, onLock }) => {
  const { content } = useContent();
  const nav = useNavigate();
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const shortScreen = useMedia('(max-height: 760px)');
  const iconSize = shortScreen ? 58 : 76;
  const folders = [...content.folders].sort((a, b) => a.sort - b.sort);

  // GSAP entrance: icons pop in with a stagger, greeting rises, notes drop, dock slides up.
  useLayoutEffect(() => {
    if (!unlocked || reduced || !root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });
      tl.from('[data-icon]', { scale: 0.3, rotate: -14, y: 40, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'back.out(1.8)' }, 0)
        .from('[data-greet] > *', { y: 28, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' }, 0.2)
        .from('[data-note]', { y: -60, rotate: () => gsap.utils.random(-14, 14), opacity: 0, stagger: 0.14, duration: 0.9, ease: 'elastic.out(1, 0.55)' }, 0.55)
        .from('[data-dock]', { y: 90, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.5);
    }, root);
    return () => ctx.revert();
  }, [unlocked, reduced]);

  return (
    <div ref={root} className="fixed inset-0 overflow-hidden bg-[#F9D9B4]">
      <ThemedWallpaper />

      {/* Desktop icons */}
      <div
        className="absolute bottom-[3.75rem] left-3 top-3 z-10 grid grid-flow-col content-start gap-x-1 sm:left-6"
        style={{ gridTemplateRows: `repeat(auto-fill, ${iconSize + 46}px)`, gridAutoColumns: `${iconSize + 40}px` }}
      >
        {folders.map((f, i) => (
          <div key={f.slug} data-icon>
            <Magnet padding={40} magnetStrength={5} disabled={reduced}>
              <FolderIcon iconKey={f.iconKey} label={f.label} tilt={TILTS[i % TILTS.length]} size={iconSize} onOpen={() => nav(`/f/${f.slug}`)} />
            </Magnet>
          </div>
        ))}
      </div>

      {/* Right column: greeting card, then the "now" notes underneath so they never overlap */}
      <div className="absolute bottom-[4.5rem] right-6 top-8 z-10 hidden w-[min(440px,36vw)] flex-col gap-5 lg:flex xl:right-16">
        <section data-greet aria-label="Introduction" className="tape min-h-0 bg-[#FFF6E6]/90 p-5 text-[#1F2430] backdrop-blur-sm hand-box">
          <p className="font-hand text-2xl text-[#E8552F]">hi, I'm ↓</p>
          <h1 className="font-display text-6xl leading-[0.9] tracking-tight [@media(min-height:800px)]:text-7xl">{content.profile.name}</h1>
          <BlurText text={content.profile.headline} animateBy="words" delay={90} className="mt-3 font-hand text-3xl font-bold leading-tight" />
          <p className="mt-2 text-sm text-[#1F2430]/75">{content.profile.positioning}</p>
          <LearningCurve row className="mt-3 hidden rounded-lg border-2 border-dashed border-[#1F2430]/40 bg-[#FFFBF4]/70 p-2 [@media(min-height:820px)]:flex" />
          <div className="mt-4 flex gap-2">
            <Link to="/skim" className="rounded-lg border-2 border-[#1F2430] bg-[#E8552F] px-3 py-1.5 text-sm font-semibold text-white paper-shadow">
              Skim in 10 seconds
            </Link>
            <Link to="/f/work-experience" className="rounded-lg border-2 border-[#1F2430] bg-[#FFFBF4] px-3 py-1.5 text-sm font-semibold paper-shadow">
              Open experience
            </Link>
          </div>
        </section>
        <NowNotes className="mt-auto grid grid-cols-3 gap-3" note="min-w-0" />
      </div>

      {/* Between md and lg there is no greeting card, so the notes sit bottom-right on their own */}
      <NowNotes className="absolute bottom-20 right-6 z-10 hidden gap-4 md:flex lg:hidden" note="w-44" />

      <Toast show={unlocked} />
      <Taskbar onLock={onLock} />
    </div>
  );
};
