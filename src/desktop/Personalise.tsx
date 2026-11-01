import React from 'react';
import { WALLPAPERS, useWallpaper } from './wallpaper';

/** Wallpaper dots, shared by phone layouts. */
export const Personalise: React.FC = () => {
  const wp = useWallpaper();
  return (
    <div className="hand-box mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-2 border-[#1F2430] bg-[#FFF6E6]/90 px-3 py-2">
      <div className="flex items-center gap-1.5" role="group" aria-label="Wallpaper">
        <span className="mr-1 font-mono text-[10px] uppercase text-[#1F2430]/55">Wallpaper</span>
        {WALLPAPERS.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => wp.set(w.id)}
            aria-label={`Wallpaper: ${w.label}`}
            aria-pressed={wp.id === w.id}
            title={w.label}
            className={`h-6 w-6 rounded-full border-2 ${wp.id === w.id ? 'border-[#E8552F] ring-2 ring-[#E8552F]/40' : 'border-[#1F2430]'}`}
            style={{ background: w.swatch }}
          />
        ))}
      </div>
    </div>
  );
};
