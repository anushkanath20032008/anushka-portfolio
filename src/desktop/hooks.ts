import { useEffect, useState } from 'react';

export function useMedia(query: string, initial = false): boolean {
  const get = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : initial);
  const [match, setMatch] = useState(get);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [query]);
  return match;
}

export const useIsDesktop = () => useMedia('(min-width: 768px)', true);
export const usePrefersReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)', false);

export function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);
  return {
    time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
    date: now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }),
    short: now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
  };
}

const KEY = 'anushka-os-unlocked';
export const readUnlocked = (): boolean => {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};
export const writeUnlocked = () => {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* storage can be unavailable; unlock still works for this visit */
  }
};
export const clearUnlocked = () => {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
};
