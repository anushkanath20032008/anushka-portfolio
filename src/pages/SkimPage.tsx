import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Download, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { useContent } from '../lib/content';
import { LearningCurve } from '../desktop/LearningCurve';

const PALETTE = ['#FBE58A', '#BFE5D0', '#F7C3D1', '#D9E2F8', '#FBD9C6'];
const TILT = [-1.8, 1.4, -1, 1.9, -1.5];

/** A sticky-note / tile card with tape or a pin, springing in and straightening on hover. */
const Tile: React.FC<{ i?: number; tone?: string; pin?: boolean; className?: string; children: React.ReactNode }> = ({ i = 0, tone, pin, className = '', children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, rotate: 0 }}
    whileInView={{ opacity: 1, y: 0, rotate: TILT[i % TILT.length] }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 170, damping: 14, delay: (i % 3) * 0.08 }}
    whileHover={{ rotate: 0, y: -4, scale: 1.02 }}
    className={`skim-tile relative rounded-md border-2 border-[#1F2430] p-4 paper-shadow ${className}`}
    style={{ background: tone ?? PALETTE[i % PALETTE.length] }}
  >
    {pin ? (
      <span aria-hidden className="no-print absolute -top-2.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#1F2430] bg-[#E8552F]" />
    ) : (
      <span aria-hidden className="no-print absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 rotate-[-3deg] border border-[#1F2430]/15 bg-[#F6D774]/80" />
    )}
    {children}
  </motion.div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="mb-4">
      <span className="marker-hl font-hand text-3xl font-bold leading-none">{title}</span>
    </h2>
    {children}
  </section>
);

/** One-screen recruiter view that also prints cleanly as a one-pager. */
export const SkimPage: React.FC = () => {
  const { content } = useContent();
  const { profile } = content;
  const crowe = content.entries.find((e) => e.id === 'crowe');
  const builds = content.entries.filter((e) => e.folder === 'builds').sort((a, b) => a.sort - b.sort);
  const education = content.entries.filter((e) => e.folder === 'education').sort((a, b) => a.sort - b.sort);

  return (
    <div className="skim-root wallpaper fixed inset-0 overflow-y-auto text-[#1F2430]">
      <div className="relative z-10 mx-auto max-w-4xl px-5 py-6">
        <nav className="no-print flex flex-wrap items-center justify-between gap-2">
          <Link to="/" className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#1F2430] bg-[#FFFBF4] px-3 py-1.5 text-sm font-semibold paper-shadow">
            <ArrowLeft size={14} /> Back to desktop
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#1F2430] bg-[#E8552F] px-3 py-1.5 text-sm font-semibold text-white paper-shadow"
          >
            <Download size={14} /> Save as PDF
          </button>
        </nav>

        <header className="mt-6">
          <h1 className="font-display text-7xl leading-[0.88] tracking-tight sm:text-8xl">{profile.name}</h1>
          <p className="mt-2 text-xl font-semibold">{profile.headline}</p>
          <p className="mt-1 text-[#1F2430]/75">{profile.positioning}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed">{profile.summary}</p>
          <LearningCurve className="no-print mt-4 max-w-xs" />
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 underline underline-offset-2">
              <Mail size={14} /> {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline underline-offset-2">
              <Linkedin size={14} /> LinkedIn
            </a>
            {profile.instagram && (
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline underline-offset-2">
                <Instagram size={14} /> Instagram
              </a>
            )}
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline underline-offset-2">
                <Github size={14} /> GitHub
              </a>
            )}
            <span>{profile.location}</span>
          </p>
        </header>

        <Section title="Numbers">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {content.metrics.map((m, i) => (
              <Tile key={m.label} i={i + 2} tone={['#FFFBF4', '#FBD9C6', '#CDE7DA', '#D9E2F8'][i % 4]} pin={i % 2 === 0}>
                <p className="font-hand text-4xl font-bold leading-none">{m.value}</p>
                <p className="text-sm font-semibold">{m.label}</p>
                {m.sublabel && <p className="text-xs text-[#1F2430]/65">{m.sublabel}</p>}
              </Tile>
            ))}
          </div>
        </Section>

        <Section title="Right now">
          <div className="grid gap-5 sm:grid-cols-3">
            {content.now.map((n, i) => (
              <Tile key={n.id} i={i}>
                <p className="font-mono text-[10px] uppercase tracking-wide text-[#1F2430]/60">{n.kind === 'building' ? 'building' : n.kind === 'role' ? 'new role' : 'now'}</p>
                <p className="font-hand text-2xl font-bold leading-[0.95]">{n.label}</p>
                <p className="mt-1 text-sm leading-snug">{n.statusText}</p>
              </Tile>
            ))}
          </div>
        </Section>

        {crowe && (
          <Section title="Experience">
            <Tile pin tone="#FFFBF4">
              <p className="font-display text-3xl leading-none">{crowe.org}</p>
              <p className="mt-1 font-hand text-xl leading-tight">{[crowe.role, crowe.period, crowe.location].filter(Boolean).join(' · ')}</p>
              {crowe.body.summary && <p className="mt-2 text-sm leading-relaxed">{crowe.body.summary}</p>}
              {crowe.body.metrics && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {crowe.body.metrics.map((m, i) => (
                    <span key={m} className="rounded-full border-2 border-[#1F2430] px-2.5 py-0.5 text-xs font-semibold" style={{ background: PALETTE[i % PALETTE.length] }}>
                      {m}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-3 text-xs">
                <Link to="/f/work-experience" className="no-print underline underline-offset-2">
                  Full experience on the desktop
                </Link>
              </p>
            </Tile>
          </Section>
        )}

        <Section title="Builds">
          <div className="grid gap-5 sm:grid-cols-2">
            {builds.map((b, i) => (
              <Tile key={b.id} i={i + 1} pin={i % 2 === 1}>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-2xl leading-none">{b.title}</p>
                  {b.status && <span className="rounded-full border-2 border-[#1F2430] bg-[#FFFBF4] px-2 py-0 text-[10px] font-bold uppercase tracking-wide">{b.status}</span>}
                </div>
                <p className="mt-1.5 text-sm leading-snug">{b.body.summary}</p>
              </Tile>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="grid gap-5 sm:grid-cols-3">
            {education.map((e, i) => (
              <Tile key={e.id} i={i + 3} tone={['#D9E2F8', '#FBD9C6', '#CDE7DA'][i % 3]}>
                <p className="font-display text-xl leading-tight">{e.org}</p>
                <p className="text-sm leading-snug">{e.title}</p>
                <p className="mt-1 font-hand text-lg leading-none text-[#1F2430]/70">{e.period}</p>
              </Tile>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};
