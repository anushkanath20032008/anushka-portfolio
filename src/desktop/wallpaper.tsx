import React, { createContext, useContext, useState } from 'react';
import { PaintedWallpaper, type WallpaperId } from './Paint';

export const WALLPAPERS: { id: WallpaperId; label: string; swatch: string }[] = [
  { id: 'marigold', label: 'Marigold', swatch: 'radial-gradient(circle at 50% 50%, #FF9A1F 0 28%, #0B2A20 30%)' },
  { id: 'moonlit', label: 'Moonlit', swatch: 'linear-gradient(135deg, #0A0C26 50%, #FF9A1F 50%)' },
  { id: 'citrus', label: 'Citrus', swatch: 'linear-gradient(135deg, #E3C71A 50%, #F2542D 50%)' },
  { id: 'sol', label: 'Sol', swatch: 'linear-gradient(135deg, #FF6A00 50%, #1F2430 50%)' },
  { id: 'rangoli', label: 'Rangoli', swatch: 'conic-gradient(#E4256B, #F9A11B, #1B8A8F, #6A2C91, #E4256B)' },
  { id: 'blockprint', label: 'Block print', swatch: 'linear-gradient(135deg, #1F3B73 50%, #F26B4F 50%)' },
  { id: 'confetti', label: 'Confetti', swatch: 'linear-gradient(135deg, #FFD0DD 50%, #14B8A6 50%)' },
  { id: 'dawn', label: 'Dawn landscape', swatch: 'linear-gradient(#9DB8E6, #F9D9B4 55%, #4F9A7E 56%)' },
];

const KEY = 'anushka-os-wallpaper-v2';
const read = (): WallpaperId => {
  try {
    const v = localStorage.getItem(KEY) as WallpaperId | null;
    if (v && WALLPAPERS.some((w) => w.id === v)) return v;
  } catch {
    /* storage unavailable */
  }
  return 'marigold';
};

interface Ctx {
  id: WallpaperId;
  set: (id: WallpaperId) => void;
}
const WallpaperContext = createContext<Ctx>({ id: 'marigold', set: () => {} });

export const WallpaperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [id, setId] = useState<WallpaperId>(read);
  const set = (next: WallpaperId) => {
    setId(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  };
  return <WallpaperContext.Provider value={{ id, set }}>{children}</WallpaperContext.Provider>;
};

export const useWallpaper = () => useContext(WallpaperContext);

export const ThemedWallpaper: React.FC<{ className?: string }> = ({ className }) => {
  const { id } = useWallpaper();
  return <PaintedWallpaper variant={id} className={className} />;
};
