import { useEffect, type RefObject } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from './hooks';

/** Lenis smooth scrolling for a scrollable element (wrapper) holding one content child. */
export function useSmoothScroll(wrapper: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = wrapper.current;
    if (!el || reduced) return;
    const content = (el.firstElementChild as HTMLElement) ?? el;
    const lenis = new Lenis({ wrapper: el, content, duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);
}
