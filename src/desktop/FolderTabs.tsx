import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../lib/content';
import { FOLDER_COLORS } from './FolderIcon';
import { usePrefersReducedMotion } from './hooks';

/** Scrollable strip of every folder, so you can hop between them without closing the window. */
export const FolderTabs: React.FC<{ active: string }> = ({ active }) => {
  const { content } = useContent();
  const reduced = usePrefersReducedMotion();
  const strip = useRef<HTMLDivElement>(null);
  const folders = [...content.folders].sort((a, b) => a.sort - b.sort);

  useEffect(() => {
    const el = strip.current?.querySelector<HTMLElement>('[aria-current="page"]');
    el?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
  }, [active, reduced]);

  const by = (dx: number) => strip.current?.scrollBy({ left: dx, behavior: reduced ? 'auto' : 'smooth' });

  return (
    <div className="flex items-center border-b-2 border-[#1F2430] bg-[#F6E3C8]/60">
      <button type="button" onClick={() => by(-220)} aria-label="Scroll folders left" className="grid h-10 w-8 shrink-0 place-items-center hover:bg-[#1F2430]/10">
        <ChevronLeft size={16} />
      </button>
      <nav
        ref={strip}
        aria-label="All folders"
        // Let a plain mouse wheel scroll the strip sideways.
        onWheel={(e) => {
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) strip.current?.scrollBy({ left: e.deltaY });
        }}
        className="scrollbar-none flex min-w-0 flex-1 gap-1.5 overflow-x-auto py-1.5"
        style={{ scrollbarWidth: 'none' }}
      >
        {folders.map((f) => {
          const on = f.slug === active;
          return (
            <Link
              key={f.slug}
              to={`/f/${f.slug}`}
              aria-current={on ? 'page' : undefined}
              className={`hand-box flex shrink-0 items-center gap-1.5 border-2 px-2.5 py-1 text-sm ${on ? 'border-[#1F2430] bg-[#FFFBF4] font-semibold' : 'border-transparent hover:bg-[#FFFBF4]/70'}`}
            >
              <span className="h-3 w-3 rounded-sm border-2 border-[#1F2430]" style={{ background: FOLDER_COLORS[f.iconKey] ?? '#F4A27B' }} aria-hidden />
              <span className="whitespace-nowrap">{f.label}</span>
            </Link>
          );
        })}
      </nav>
      <button type="button" onClick={() => by(220)} aria-label="Scroll folders right" className="grid h-10 w-8 shrink-0 place-items-center hover:bg-[#1F2430]/10">
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
