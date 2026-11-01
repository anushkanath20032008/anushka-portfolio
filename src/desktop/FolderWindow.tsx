import React, { useRef } from 'react';
import { useSmoothScroll } from './useSmoothScroll';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, MotionConfig } from 'motion/react';
import { useContent } from '../lib/content';
import { Window } from './Window';
import { EntryView } from './EntryView';
import { FolderTabs } from './FolderTabs';
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
      <div className="flex h-full flex-col">
        <FolderTabs active={folder.slug} />
        <div className="flex min-h-0 flex-1">
        {showList && (
          <nav aria-label={`${folder.label} entries`} className="scroll-thin w-full shrink-0 overflow-y-auto border-[#1F2430] bg-[#F9EFDD] md:w-80 md:border-r-2">
            <MotionConfig reducedMotion="user">
              <div className="px-4 pb-2 pt-4">
                <motion.h2
                  key={folder.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-5xl leading-[0.9] tracking-tight"
                >
                  {folder.label}
                </motion.h2>
                <p className="mt-1 font-hand text-xl text-[#E8552F]">
                  {entries.length} {entries.length === 1 ? 'thing' : 'things'} in here ↓
                </p>
              </div>
              <ul className="px-2 pb-4">
                {entries.map((e, i) => {
                  const active = selected?.id === e.id;
                  return (
                    <motion.li
                      key={e.id}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, type: 'spring', stiffness: 260, damping: 22 }}
                      className="relative"
                    >
                      {active && (
                        <motion.span
                          layoutId="entry-marker"
                          aria-hidden
                          className="absolute inset-0 rounded-md border-2 border-[#1F2430] bg-[#F6D774] paper-shadow"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                      <Link
                        to={`/f/${folder.slug}/${e.slug}`}
                        aria-current={active ? 'page' : undefined}
                        className="relative my-1 flex items-start gap-3 rounded-md px-3 py-2.5 transition-transform hover:translate-x-1"
                      >
                        <span className="mt-0.5 font-hand text-2xl font-bold leading-none text-[#1F2430]/45">{String(i + 1).padStart(2, '0')}</span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold leading-snug">{e.title}</span>
                          <span className="block text-xs text-[#1F2430]/65">{[e.org, e.period].filter(Boolean).join(' · ')}</span>
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </MotionConfig>
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
      </div>
    </Window>
  );
};
