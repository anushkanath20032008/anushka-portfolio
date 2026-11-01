import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { BatteryFull, FileText, GraduationCap, Hammer, Mail, Power, Search, Sparkles, Volume2, Wifi, Zap } from 'lucide-react';
import { useContent } from '../lib/content';
import { useClock } from './hooks';
import { FolderIcon } from './FolderIcon';
import { PaintedAvatar, PaintedStart } from './Paint';
import { WALLPAPERS, useWallpaper } from './wallpaper';
import type { NowItem } from '../types';

const nowIcon = (n: NowItem) => (n.kind === 'building' ? Hammer : n.kind === 'role' ? Sparkles : GraduationCap);
const toneFor = (n: NowItem) => (n.kind === 'building' ? '#CDE7DA' : n.kind === 'role' ? '#F6D774' : '#D9E2F8');

const TaskItem: React.FC<{
  to?: string;
  href?: string;
  label: string;
  tone: string;
  active?: boolean;
  live?: boolean;
  badge?: string;
  progress?: number;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}> = ({ to, href, label, tone, active, live, badge, progress, Icon }) => {
  const inner = (
    <motion.span whileHover={{ y: -4, scale: 1.08 }} whileFocus={{ y: -4, scale: 1.08 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }} className="relative flex flex-col items-center">
      <span className="hand-box relative grid h-9 w-9 place-items-center border-2 border-[#1F2430] text-[#1F2430]" style={{ background: tone }}>
        <Icon size={18} strokeWidth={2.2} />
        {live && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full border-2 border-[#1F2430] bg-[#3ECF8E]" aria-hidden />}
        {badge && <span className="absolute -right-2 -top-2 rounded-full border-2 border-[#1F2430] bg-[#E8552F] px-1 text-[9px] font-bold leading-tight text-white">{badge}</span>}
      </span>
      {typeof progress === 'number' && (
        <span className="mt-0.5 block h-[3px] w-8 overflow-hidden rounded-full bg-[#1F2430]/20" aria-hidden>
          <span className="block h-full bg-[#3ECF8E]" style={{ width: `${progress}%` }} />
        </span>
      )}
      {active && <span className="absolute -bottom-1.5 h-[3px] w-4 rounded-full bg-[#E8552F]" aria-hidden />}
    </motion.span>
  );
  const cls = 'rounded-lg p-1 outline-none';
  if (href) return <a href={href} aria-label={label} title={label} className={cls}>{inner}</a>;
  return <Link to={to ?? '/'} aria-label={label} title={label} className={cls}>{inner}</Link>;
};

const StartMenu: React.FC<{ onClose: () => void; onLock: () => void }> = ({ onClose, onLock }) => {
  const { content } = useContent();
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const wp = useWallpaper();
  const folders = useMemo(() => [...content.folders].sort((a, b) => a.sort - b.sort), [content.folders]);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const folderLabel = (slug: string) => folders.find((f) => f.slug === slug)?.label ?? '';
    const hits = [
      ...folders.filter((f) => f.label.toLowerCase().includes(s)).map((f) => ({ key: f.slug, title: f.label, sub: 'Folder', to: `/f/${f.slug}` })),
      ...content.entries
        .filter((e) => `${e.title} ${e.org ?? ''}`.toLowerCase().includes(s))
        .map((e) => ({ key: e.id, title: e.title, sub: folderLabel(e.folder), to: `/f/${e.folder}/${e.slug}` })),
    ];
    return hits.slice(0, 7);
  }, [q, folders, content.entries]);

  const go = (to: string) => {
    onClose();
    nav(to);
  };

  return (
    <>
      <button type="button" aria-label="Close Start menu" className="fixed inset-0 z-[44] cursor-default" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-label="Start menu"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        className="hand-box paper-shadow fixed bottom-16 left-1/2 z-[45] flex max-h-[min(78vh,640px)] w-[min(620px,calc(100vw-1rem))] -translate-x-1/2 flex-col overflow-hidden border-2 border-[#1F2430] bg-[#FFF6E6]/95 backdrop-blur"
      >
        <div className="p-4 pb-2">
          <label className="hand-box flex items-center gap-2 border-2 border-[#1F2430] bg-white/70 px-3 py-2">
            <Search size={16} aria-hidden />
            <span className="sr-only">Search folders and entries</span>
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search folders, roles, builds…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#1F2430]/50" />
          </label>
        </div>

        <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 pb-3">
          {q.trim() ? (
            <ul className="space-y-1">
              {results.length === 0 && <li className="py-6 text-center text-sm text-[#1F2430]/60">Nothing painted there yet.</li>}
              {results.map((r) => (
                <li key={r.key}>
                  <button type="button" onClick={() => go(r.to)} className="flex w-full items-baseline justify-between rounded-lg px-3 py-2 text-left hover:bg-[#1F2430]/10">
                    <span className="text-sm font-semibold">{r.title}</span>
                    <span className="font-mono text-[10px] uppercase text-[#1F2430]/55">{r.sub}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p className="font-hand text-2xl leading-none">Pinned</p>
              <div className="mt-1 grid grid-cols-5 justify-items-center">
                {folders.map((f) => (
                  <FolderIcon key={f.slug} iconKey={f.iconKey} label={f.label} size={44} onOpen={() => go(`/f/${f.slug}`)} />
                ))}
              </div>
              <p className="mt-3 font-hand text-2xl leading-none">Recommended</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {content.now.map((n) => (
                  <button key={n.id} type="button" onClick={() => go(`/now/${n.id}`)} className="hand-box border-2 border-[#1F2430]/70 p-2 text-left hover:-translate-y-0.5" style={{ background: toneFor(n) }}>
                    <p className="font-mono text-[10px] uppercase text-[#1F2430]/60">{n.kind === 'building' ? 'building' : n.kind === 'role' ? 'new role' : 'now'}</p>
                    <p className="font-hand text-xl font-bold leading-none">{n.label}</p>
                    <p className="mt-0.5 text-[11px] leading-snug">{n.statusText}</p>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t-2 border-[#1F2430]/30 px-4 py-2">
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

        <div className="flex items-center justify-between border-t-2 border-[#1F2430] bg-[#F6E3C8] px-4 py-2">
          <div className="flex items-center gap-2">
            <PaintedAvatar size={32} />
            <span className="text-sm font-semibold">{content.profile.name}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <a href={content.profile.linkedin} target="_blank" rel="noopener noreferrer" className="rounded px-2 py-1 hover:bg-[#1F2430]/10">
              LinkedIn
            </a>
            {content.profile.instagram && (
              <a href={content.profile.instagram} target="_blank" rel="noopener noreferrer" className="rounded px-2 py-1 hover:bg-[#1F2430]/10">
                Instagram
              </a>
            )}
            {content.profile.github && (
              <a href={content.profile.github} target="_blank" rel="noopener noreferrer" className="rounded px-2 py-1 hover:bg-[#1F2430]/10">
                GitHub
              </a>
            )}
            <button type="button" onClick={() => { onClose(); onLock(); }} aria-label="Lock" title="Lock" className="grid h-8 w-8 place-items-center rounded-lg hover:bg-[#1F2430]/10">
              <Power size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

/** Painted Windows-style taskbar: Start, search, current roles and builds, tray with clock. */
export const Taskbar: React.FC<{ onLock: () => void }> = ({ onLock }) => {
  const { content } = useContent();
  const { time, short } = useClock();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const role = content.now.find((n) => n.kind === 'role');

  useEffect(() => {
    const on = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', on);
    return () => document.removeEventListener('keydown', on);
  }, []);

  const close = () => {
    setOpen(false);
    btn.current?.focus();
  };

  return (
    <>
      <AnimatePresence>{open && <StartMenu onClose={close} onLock={onLock} />}</AnimatePresence>
      <nav data-dock aria-label="Taskbar" className="no-print fixed inset-x-0 bottom-0 z-[46] grid h-14 grid-cols-[1fr_auto_1fr] items-center border-t-2 border-[#1F2430] bg-[#FFF6E6]/90 px-3 backdrop-blur">
        <div className="hidden min-w-0 xl:block">
          {role && (
            <Link to={`/now/${role.id}`} className="hand-box inline-flex max-w-full items-center gap-2 border-2 border-[#1F2430]/60 bg-[#F6D774]/70 px-2.5 py-1 hover:bg-[#F6D774]">
              <Sparkles size={14} aria-hidden />
              <span className="truncate font-hand text-lg leading-none">{role.statusText}</span>
            </Link>
          )}
        </div>

        <div className="col-start-2 flex items-center gap-1.5">
          <button ref={btn} type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Start" title="Start" className="rounded-lg p-1.5 outline-none transition-transform hover:-translate-y-0.5 hover:bg-[#1F2430]/10">
            <PaintedStart />
          </button>
          <button type="button" onClick={() => setOpen(true)} className="hand-box hidden h-9 w-44 items-center gap-2 border-2 border-[#1F2430]/60 bg-white/60 px-3 text-left text-xs text-[#1F2430]/60 hover:bg-white/90 md:flex">
            <Search size={14} aria-hidden /> Search
          </button>
          <span className="mx-1 h-6 w-px bg-[#1F2430]/30" aria-hidden />
          {content.now.map((n) => (
            <TaskItem
              key={n.id}
              to={`/now/${n.id}`}
              label={n.label}
              tone={toneFor(n)}
              active={pathname === `/now/${n.id}`}
              live={n.kind === 'building'}
              badge={n.kind === 'role' ? 'New' : undefined}
              progress={n.progress}
              Icon={nowIcon(n)}
            />
          ))}
          <span className="mx-1 h-6 w-px bg-[#1F2430]/30" aria-hidden />
          <TaskItem to="/skim" label="Skim mode" tone="#F4A27B" Icon={Zap} />
          <TaskItem to="/skim" label="Resume" tone="#FBD9C6" Icon={FileText} />
          <TaskItem href={`mailto:${content.profile.email}`} label="Mail" tone="#E5E1F5" Icon={Mail} />
        </div>

        <div className="col-start-3 flex items-center justify-self-end gap-3 text-[#1F2430]">
          <div className="hidden items-center gap-2 sm:flex" aria-hidden>
            <Wifi size={15} />
            <Volume2 size={15} />
            <BatteryFull size={17} />
          </div>
          <div className="text-right font-mono text-[11px] leading-tight tabular-nums">
            <div>{time}</div>
            <div className="text-[#1F2430]/65">{short}</div>
          </div>
        </div>
      </nav>
    </>
  );
};
