import React, { useRef } from 'react';
import { useSmoothScroll } from './useSmoothScroll';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContent } from '../lib/content';
import { Window } from './Window';
import { EntryView } from './EntryView';
import { useIsDesktop } from './hooks';

export const FolderWindow: React.FC = () => {
  const { folder: slug, entry: entrySlug } = useParams();
  const { content } = useContent();
  const desktop = useIsDesktop();
  const nav = useNavigate();

  const detailRef = useRef<HTMLDivElement>(null);
  const folder = content.folders.find((f) => f.slug === slug);
  const entries = content.entries.filter((e) => e.folder === slug).sort((a, b) => a.sort - b.sort);

  useSmoothScroll(detailRef, [entrySlug, slug, desktop]);

  if (!folder) {
    return (
      <Window title="Not found">
        <p className="p-6">That folder does not exist. Press Esc to return to the desktop.</p>
      </Window>
    );
  }

  const single = entries.length === 1;
  const selected = entries.find((e) => e.slug === entrySlug) ?? (desktop || single ? entries[0] : undefined);
  const showList = !single && (desktop || !selected);

  return (
    <Window
      title={folder.label}
      fullScreen={!desktop}
      onBack={!desktop && selected && !single ? () => nav(`/f/${folder.slug}`) : undefined}
    >
      <div className="flex h-full">
        {showList && (
          <nav aria-label={`${folder.label} entries`} className="scroll-thin w-full shrink-0 overflow-y-auto border-[#1F2430] bg-[#F9EFDD] md:w-72 md:border-r-2">
            <ul>
              {entries.map((e) => {
                const active = selected?.id === e.id;
                return (
                  <li key={e.id}>
                    <Link
                      to={`/f/${folder.slug}/${e.slug}`}
                      aria-current={active ? 'page' : undefined}
                      className={`block border-b border-[#1F2430]/15 px-4 py-3 ${active ? 'bg-[#FFFBF4] font-semibold' : 'hover:bg-[#FFFBF4]/70'}`}
                    >
                      <span className="block text-sm leading-snug">{e.title}</span>
                      <span className="block text-xs text-[#1F2430]/60">{[e.org, e.period].filter(Boolean).join(' · ')}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
        {(selected && (desktop || !showList)) && (
          <div ref={detailRef} className="scroll-thin min-w-0 flex-1 overflow-y-auto">
            <div className="p-5 md:p-6">
              <EntryView key={selected.id} entry={selected} />
            </div>
          </div>
        )}
      </div>
    </Window>
  );
};
