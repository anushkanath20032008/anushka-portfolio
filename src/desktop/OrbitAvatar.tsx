import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BarChart3, Code2, Music2, Palette, Sparkles, Camera } from 'lucide-react';
import { PaintedAvatar } from './Paint';
import { usePrefersReducedMotion } from './hooks';

const ORBIT = [
  { Icon: Music2, bg: '#F2C6DE' },
  { Icon: Code2, bg: '#CDE7DA' },
  { Icon: BarChart3, bg: '#D9E2F8' },
  { Icon: Palette, bg: '#FBD9C6' },
  { Icon: Camera, bg: '#F6D774' },
  { Icon: Sparkles, bg: '#FFF6E6' },
];

/** Profile photo with a GSAP-driven orbit of "side-hustle" stickers; the photo tilts toward the pointer. */
export const OrbitAvatar: React.FC<{ size?: number }> = ({ size = 132 }) => {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const radius = size / 2 + 26;
  const box = radius * 2 + 34;

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-orbit]', { rotation: 360, duration: 26, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      gsap.to('[data-sticker]', { rotation: -360, duration: 26, ease: 'none', repeat: -1 });
      gsap.to('[data-ring]', { rotation: -360, duration: 40, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      gsap.from('[data-sticker]', { scale: 0, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'back.out(2.4)', delay: 0.4 });
      gsap.to('[data-photo]', { y: -5, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true });
    }, el);

    const rx = gsap.quickTo(el.querySelector('[data-tilt]'), 'rotationY', { duration: 0.5, ease: 'power3.out' });
    const ry = gsap.quickTo(el.querySelector('[data-tilt]'), 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      rx(((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 50);
      ry(-((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * 50);
    };
    window.addEventListener('pointermove', move);
    return () => {
      window.removeEventListener('pointermove', move);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <div ref={root} className="relative grid place-items-center" style={{ width: box, height: box, perspective: 600 }} aria-hidden>
      <div data-ring className="absolute rounded-full border-2 border-dashed border-[#F6D774]/70" style={{ width: radius * 2, height: radius * 2 }} />
      <div data-orbit className="absolute inset-0">
        {ORBIT.map(({ Icon, bg }, i) => {
          const a = (i / ORBIT.length) * Math.PI * 2;
          return (
            <span
              key={i}
              data-sticker
              className="absolute grid h-8 w-8 place-items-center rounded-full border-2 border-[#1F2430] text-[#1F2430]"
              style={{ background: bg, left: box / 2 + Math.cos(a) * radius - 16, top: box / 2 + Math.sin(a) * radius - 16 }}
            >
              <Icon size={15} />
            </span>
          );
        })}
      </div>
      <div data-tilt style={{ transformStyle: 'preserve-3d' }}>
        <div data-photo>
          <PaintedAvatar size={size} />
        </div>
      </div>
    </div>
  );
};
