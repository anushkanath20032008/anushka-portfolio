import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { Entry } from '../types';

const Chip: React.FC<{ children: React.ReactNode; tone?: string }> = ({ children, tone = '#FFF6E6' }) => (
  <span className="rounded-full border-2 border-[#1F2430] px-2.5 py-0.5 text-xs font-medium" style={{ background: tone }}>
    {children}
  </span>
);

const GapSystemResult: React.FC<{ e: Entry }> = ({ e }) => {
  const { gap, system, result } = e.body;
  if (!gap && !system && !result) return null;
  const cards = [
    { k: 'Gap I saw', v: gap, c: '#FBD9C6' },
    { k: 'System I built', v: system, c: '#CDE7DA' },
    { k: 'Result', v: result, c: '#D9E2F8' },
  ].filter((x) => x.v);
  return (
    <div className="my-4 grid gap-3 md:grid-cols-3">
      {cards.map((c) => (
        <div key={c.k} className="rounded-xl border-2 border-[#1F2430] p-3" style={{ background: c.c }}>
          <p className="font-hand text-xl leading-none mb-1">{c.k}</p>
          <p className="text-sm leading-relaxed">{c.v}</p>
        </div>
      ))}
    </div>
  );
};

export const EntryView: React.FC<{ entry: Entry }> = ({ entry: e }) => {
  const meta = [e.org, e.role, e.period, e.location].filter(Boolean);
  return (
    <article className="text-[#1F2430]">
      <header className="mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-semibold leading-tight">{e.title}</h2>
          {e.status && <Chip tone={e.status === 'live' ? '#CDE7DA' : '#F6D774'}>{e.status}</Chip>}
        </div>
        {meta.length > 0 && <p className="mt-1 text-sm text-[#1F2430]/70">{meta.join(' · ')}</p>}
      </header>

      {e.body.summary && <p className="leading-relaxed">{e.body.summary}</p>}

      <GapSystemResult e={e} />

      {e.body.metrics && e.body.metrics.length > 0 && (
        <div className="my-3 flex flex-wrap gap-2">
          {e.body.metrics.map((m) => (
            <Chip key={m} tone="#F6D774">
              {m}
            </Chip>
          ))}
        </div>
      )}

      {e.body.groups?.map((g) => (
        <section key={g.title} className="mt-4">
          <h3 className="font-hand text-2xl leading-none mb-1">{g.title}</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed">
            {g.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      ))}

      {e.body.bullets && (
        <ul className="mt-3 list-disc pl-5 space-y-1 text-sm leading-relaxed">
          {e.body.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}

      {e.body.links && (
        <div className="mt-4 flex flex-wrap gap-2">
          {e.body.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#1F2430] bg-[#E8552F] px-3 py-1.5 text-sm font-semibold text-white paper-shadow hover:translate-x-px hover:translate-y-px"
            >
              {l.label} <ExternalLink size={14} aria-hidden />
            </a>
          ))}
        </div>
      )}

      {e.body.tags && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {e.body.tags.map((t) => (
            <Chip key={t} tone="#EFE6D4">
              {t}
            </Chip>
          ))}
        </div>
      )}
    </article>
  );
};
