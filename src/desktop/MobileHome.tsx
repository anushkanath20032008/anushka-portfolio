import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContent } from '../lib/content';
import { FolderIcon } from './FolderIcon';
import { Dock } from './Dock';
import { useClock } from './hooks';
import { ThemedWallpaper } from './wallpaper';
import { Personalise } from './Personalise';

/** Phone-style home screen: same folders, three per row, dock pinned to the bottom. */
export const MobileHome: React.FC = () => {
  const { content } = useContent();
  const nav = useNavigate();
  const { time, date } = useClock();
  const folders = [...content.folders].sort((a, b) => a.sort - b.sort);

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#F9D9B4] pb-28">
      <div className="fixed inset-0"><ThemedWallpaper /></div>
      <div className="relative z-10 px-4 pt-3">
        <div className="flex justify-between font-mono text-xs font-semibold text-[#1F2430]">
          <span>{time}</span>
          <Link to="/skim" className="underline underline-offset-2">
            Skim mode
          </Link>
        </div>
        <div className="mt-4 text-[#1F2430]">
          <p className="font-mono text-xs text-[#1F2430]/60">{date}</p>
          <h1 className="font-hand text-5xl font-bold leading-[0.9]">{content.profile.name}</h1>
          <p className="mt-2 text-base font-semibold">{content.profile.headline}</p>
          <p className="mt-1 text-sm text-[#1F2430]/75">{content.profile.positioning}</p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-y-2">
          {folders.map((f) => (
            <div key={f.slug} className="flex justify-center">
              <FolderIcon iconKey={f.iconKey} label={f.label} size={70} onOpen={() => nav(`/f/${f.slug}`)} />
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {content.now.map((n) => (
            <Link key={n.id} to={`/now/${n.id}`} className="block rounded-xl border-2 border-[#1F2430] bg-[#FFFBF4] p-3 text-[#1F2430] paper-shadow">
              <p className="font-mono text-[10px] uppercase tracking-wide text-[#E8552F]">{n.kind === 'building' ? 'building' : n.kind === 'role' ? 'new role' : 'now'}</p>
              <p className="font-hand text-2xl leading-none">{n.label}</p>
              <p className="text-xs text-[#1F2430]/70">{n.statusText}</p>
            </Link>
          ))}
        </div>
        <Personalise />
      </div>
      <Dock mobile />
    </div>
  );
};
