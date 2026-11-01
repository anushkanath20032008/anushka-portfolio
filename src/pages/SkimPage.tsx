import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Download, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { useContent } from '../lib/content';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mt-6">
    <h2 className="mb-3 border-b-2 border-[#1F2430] pb-1">
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
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: [-1.5, 1.2, -0.8, 1.6][i % 4] }}
                transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.05 * i }}
                whileHover={{ rotate: 0, y: -4, scale: 1.04 }}
                className="rounded-xl border-2 border-[#1F2430] p-3 paper-shadow"
                style={{ background: ['#FFFBF4', '#FBD9C6', '#CDE7DA', '#D9E2F8'][i % 4] }}
              >
                <p className="font-hand text-4xl font-bold leading-none">{m.value}</p>
                <p className="text-sm font-semibold">{m.label}</p>
                {m.sublabel && <p className="text-xs text-[#1F2430]/65">{m.sublabel}</p>}
              </motion.div>
            ))}
          </div>
        </Section>

        <Section title="Right now">
          <ul className="space-y-1 text-sm">
            {content.now.map((n) => (
              <li key={n.id}>
                <span className="font-semibold">{n.label}:</span> {n.statusText}
              </li>
            ))}
          </ul>
        </Section>

        {crowe && (
          <Section title="Experience">
            <p className="font-semibold">
              {crowe.org} · {crowe.role}
            </p>
            <p className="text-xs text-[#1F2430]/65">{[crowe.period, crowe.location].filter(Boolean).join(' · ')}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {crowe.body.groups?.flatMap((g) => g.bullets.slice(0, 2)).map((b) => <li key={b}>{b}</li>)}
            </ul>
            <p className="mt-2 text-xs">
              <Link to="/f/work-experience" className="no-print underline underline-offset-2">
                Full experience on the desktop
              </Link>
            </p>
          </Section>
        )}

        <Section title="Builds">
          <ul className="space-y-1 text-sm">
            {builds.map((b) => (
              <li key={b.id}>
                <span className="font-semibold">{b.title}</span>
                {b.status ? ` (${b.status})` : ''}: {b.body.summary}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Education">
          <ul className="space-y-1 text-sm">
            {education.map((e) => (
              <li key={e.id}>
                <span className="font-semibold">{e.org}</span>, {e.title} ({e.period})
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
};
