import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Accessibility, ArrowRight, BatteryFull, ChevronUp, Power, Wifi } from 'lucide-react';
import { useContent } from '../lib/content';
import { useClock } from './hooks';
import { PaintedAvatar } from './Paint';
import { ThemedWallpaper } from './wallpaper';
import BlurText from '../reactbits/BlurText';

type Stage = 'lock' | 'signin' | 'welcome';

const Tray: React.FC<{ tone?: string }> = ({ tone = '#FFF6E6' }) => (
  <div className="flex items-center gap-4" style={{ color: tone }} aria-hidden>
    <Wifi size={18} />
    <Accessibility size={18} />
    <BatteryFull size={20} />
    <Power size={18} />
  </div>
);

/**
 * Painted take on the Windows flow: lock screen with a big clock, slide it up to reveal PIN sign-in,
 * a short "Welcome", then the desktop. The PIN is decorative so recruiters are never blocked.
 */
export const LockScreen: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const { content } = useContent();
  const { time, date } = useClock();
  const [stage, setStage] = useState<Stage>('lock');
  const [pin, setPin] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number>();
  const done = useRef(false);

  const reveal = useCallback(() => setStage((s) => (s === 'lock' ? 'signin' : s)), []);

  useEffect(() => {
    if (stage !== 'lock') return;
    const on = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.metaKey || e.ctrlKey || e.altKey) return;
      reveal();
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [stage, reveal]);

  useEffect(() => {
    if (stage !== 'signin') return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 500);
    return () => window.clearTimeout(t);
  }, [stage]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    onUnlock();
  }, [onUnlock]);

  const signIn = () => {
    if (stage !== 'signin') return;
    setStage('welcome');
    timer.current = window.setTimeout(finish, 3200);
  };

  const skip = () => {
    window.clearTimeout(timer.current);
    finish();
  };

  const Skip = (
    <button type="button" onClick={skip} className="rounded-md px-2 py-1 text-xs text-[#FFF6E6]/80 underline underline-offset-4 hover:text-[#FFF6E6]">
      Skip to desktop
    </button>
  );

  return (
    <motion.div className="fixed inset-0 z-[60] overflow-hidden text-[#1F2430]" exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6, ease: 'easeOut' } }}>
      {/* Sign-in layer, revealed as the lock layer slides up */}
      <div className={`absolute inset-0 bg-[#2B2230] ${stage === 'lock' ? 'invisible' : ''}`}>
        <ThemedWallpaper className="scale-110 blur-xl brightness-90" />
        <div className="absolute inset-0 bg-[#2B2230]/25" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
          <AnimatePresence mode="wait">
            {stage !== 'welcome' ? (
              <motion.form
                key="signin"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: stage === 'signin' ? 1 : 0, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ delay: stage === 'signin' ? 0.25 : 0, duration: 0.5 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  signIn();
                }}
                className="flex flex-col items-center"
              >
                <PaintedAvatar size={132} />
                <h1 className="mt-3 font-hand text-5xl font-bold text-[#FFF6E6]">{content.profile.name}</h1>
                <label className="mt-5 flex w-72 items-center rounded-lg border-2 border-[#1F2430] bg-[#FFF6E6] hand-box">
                  <span className="sr-only">PIN</span>
                  <input
                    ref={inputRef}
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="PIN"
                    tabIndex={stage === 'signin' ? 0 : -1}
                    className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-center text-lg tracking-[0.4em] text-[#1F2430] outline-none placeholder:tracking-normal placeholder:text-[#1F2430]/50"
                  />
                  <button type="submit" aria-label="Sign in" tabIndex={stage === 'signin' ? 0 : -1} className="m-1 grid h-9 w-9 place-items-center rounded-md bg-[#E8552F] text-white hover:brightness-110">
                    <ArrowRight size={18} />
                  </button>
                </label>
                <p className="mt-3 text-sm text-[#FFF6E6]/85">Any PIN works. Or just press Enter.</p>
                <BlurText text={content.profile.headline} animateBy="words" delay={90} className="mt-8 max-w-sm justify-center font-hand text-3xl text-[#F6D774]" />
              </motion.form>
            ) : (
              <motion.div key="welcome" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center" role="status">
                <PaintedAvatar size={96} />
                <p className="mt-4 font-hand text-6xl font-bold text-[#FFF6E6]">Welcome</p>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="mt-3 font-hand text-3xl font-semibold text-[#F6D774]">
                  Professional side-hustle collector.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }} className="mt-1 max-w-sm px-4 text-center text-sm text-[#FFF6E6]/90">
                  Think masala dabba: a pinch of everything, and somehow it all ends up in the dish.
                </motion.p>
                <div className="mt-5 flex gap-2" aria-hidden>
                  {[0, 1, 2, 3].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2.5 w-2.5 rounded-full bg-[#F6D774]"
                      animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="absolute bottom-5 left-5 z-10">{Skip}</div>
        <div className="absolute bottom-5 right-6 z-10">
          <Tray />
        </div>
      </div>

      {/* Lock layer: click, press any key, wheel up or drag up to slide away */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Locked. Click or press any key to sign in."
        onClick={reveal}
        onWheel={(e) => e.deltaY > 8 && reveal()}
        drag={stage === 'lock' ? 'y' : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDragEnd={(_, info) => info.offset.y < -70 && reveal()}
        initial={false}
        animate={{ y: stage === 'lock' ? 0 : '-100%' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        style={{ pointerEvents: stage === 'lock' ? 'auto' : 'none' }}
        className="absolute inset-0 cursor-pointer outline-none"
      >
        <ThemedWallpaper />
        <div className="relative z-10 flex h-full flex-col items-center px-6 pt-[8vh] text-center"><div className="hand-box flex flex-col items-center bg-[#FFF6E6]/80 px-8 pb-4 pt-5 backdrop-blur-sm">
          <p className="font-hand text-[clamp(6rem,19vw,13rem)] font-bold leading-[0.8] text-[#1F2430]" aria-label={`Time ${time}`}>
            {time}
          </p>
          <svg viewBox="0 0 300 16" className="mt-2 w-56" aria-hidden filter="url(#brushS)">
            <path d="M4 9 C60 2 120 14 180 7 C220 3 260 10 296 6" stroke="#E8552F" strokeWidth="6" strokeLinecap="round" fill="none" />
          </svg>
          <p className="mt-2 font-hand text-4xl font-semibold text-[#1F2430]">{date}</p>
        </div></div>

        <div className="absolute bottom-7 left-7 z-10 hidden max-w-xs text-left md:block text-[#FFF6E6] [text-shadow:0_1px_6px_rgba(20,30,28,0.6)]">
          <p className="font-hand text-4xl font-bold leading-none">{content.profile.name}</p>
          <p className="mt-1 text-sm">{content.profile.positioning}</p>
        </div>

        <div className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center px-4 text-center text-[#FFF6E6]"><div className="flex flex-col items-center rounded-2xl bg-[#1F2430]/60 px-4 py-1.5">
          <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 1.8, repeat: Infinity }} aria-hidden>
            <ChevronUp size={24} />
          </motion.span>
          <span className="text-sm">Click, press any key, or swipe up to sign in</span>
        </div></div>

        <div className="absolute bottom-7 right-7 z-10 hidden sm:block">
          <Tray />
        </div>
        <div className="absolute left-5 top-4 z-10" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={skip} className="rounded-md px-2 py-1 text-xs text-[#1F2430]/70 underline underline-offset-4 hover:text-[#1F2430]">
            Skip to desktop
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
