import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileText, Hammer, GraduationCap, Mail, Sparkles, Zap } from 'lucide-react';
import { useContent } from '../lib/content';
import type { NowItem } from '../types';

const nowIcon = (n: NowItem) => (n.kind === 'building' ? Hammer : n.kind === 'role' ? Sparkles : GraduationCap);

const DockItem: React.FC<{
  to?: string;
  href?: string;
  label: string;
  tone: string;
  live?: boolean;
  badge?: string;
  progress?: number;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}> = ({ to, href, label, tone, live, badge, progress, Icon }) => {
  const inner = (
    <motion.span
      whileHover={{ y: -8, scale: 1.12 }}
      whileFocus={{ y: -8, scale: 1.12 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className="relative flex flex-col items-center"
    >
      <span className="relative grid h-12 w-12 place-items-center rounded-xl border-2 border-[#1F2430] text-[#1F2430]" style={{ background: tone }}>
        <Icon size={22} strokeWidth={2.2} />
        {live && <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full border-2 border-[#1F2430] bg-[#3ECF8E]" aria-hidden />}
        {badge && <span className="absolute -right-2 -top-2 rounded-full border-2 border-[#1F2430] bg-[#E8552F] px-1.5 text-[10px] font-bold text-white">{badge}</span>}
      </span>
      {typeof progress === 'number' && (
        <span className="mt-1 block h-1 w-10 overflow-hidden rounded-full bg-[#1F2430]/20" aria-hidden>
          <span className="block h-full bg-[#3ECF8E]" style={{ width: `${progress}%` }} />
        </span>
      )}
      <span className="mt-0.5 text-[10px] font-semibold leading-none text-[#1F2430]">{label}</span>
    </motion.span>
  );
  const cls = 'rounded-xl p-1 outline-none';
  if (href) return <a href={href} aria-label={label} className={cls}>{inner}</a>;
  return <Link to={to ?? '/'} aria-label={label} className={cls}>{inner}</Link>;
};

export const Dock: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  const { content } = useContent();
  return (
    <nav
      data-dock
      aria-label="Dock"
      className={`no-print fixed bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-end gap-2 rounded-2xl border-2 border-[#1F2430] bg-[#FFFBF4]/85 px-3 pb-1.5 pt-2.5 backdrop-blur paper-shadow ${mobile ? 'w-[calc(100%-1.5rem)] justify-around gap-1 px-2' : ''}`}
    >
      {content.now.map((n) => (
        <DockItem
          key={n.id}
          to={`/now/${n.id}`}
          label={n.short ?? (n.label.length > 12 ? n.label.split(' ')[0] : n.label)}
          tone={n.kind === 'building' ? '#CDE7DA' : n.kind === 'role' ? '#F6D774' : '#D9E2F8'}
          live={n.kind === 'building'}
          badge={n.kind === 'role' ? 'New' : undefined}
          progress={n.progress}
          Icon={nowIcon(n)}
        />
      ))}
      <span className="mb-4 h-8 w-px bg-[#1F2430]/30" aria-hidden />
      <DockItem to="/skim" label="Skim" tone="#F4A27B" Icon={Zap} />
      {!mobile && <DockItem to="/skim" label="Resume" tone="#FBD9C6" Icon={FileText} />}
      <DockItem href={`mailto:${content.profile.email}`} label="Mail" tone="#E5E1F5" Icon={Mail} />
    </nav>
  );
};
