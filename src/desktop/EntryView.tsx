import React, { useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { ExternalLink, Paperclip, X } from 'lucide-react';
import type { Entry } from '../types';

const STICKERS = ['#FBD9C6', '#CDE7DA', '#D9E2F8', '#F6D774', '#F2C6DE'];
const TILT = [-2.5, 1.8, -1.2, 2.6, -2];

const Sticker: React.FC<{ children: React.ReactNode; i?: number; tone?: string }> = ({ children, i = 0, tone }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
    whileInView={{ opacity: 1, scale: 1, rotate: TILT[i % TILT.length] }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 380, damping: 16, delay: Math.min(i, 8) * 0.05 }}
    whileHover={{ scale: 1.12, rotate: 0, y: -2 }}
    className="inline-block cursor-default rounded-full border-2 border-[#1F2430] px-3 py-0.5 text-xs font-semibold"
    style={{ background: tone ?? STICKERS[i % STICKERS.length] }}
  >
    {children}
  </motion.span>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.h3
    initial={{ backgroundSize: '0% 100%' }}
    whileInView={{ backgroundSize: '100% 100%' }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="marker-hl mb-2 inline-block font-hand text-2xl font-bold leading-none"
  >
    {children}
  </motion.h3>
);

const Gallery: React.FC<{ images: NonNullable<Entry['body']['images']> }> = ({ images }) => {
  const [open, setOpen] = useState<number | null>(null);
  const url = (src: string) => `${import.meta.env.BASE_URL}${src}`;
  return (
    <div className="my-6">
      <Label>Take a look</Label>
      <div className="grid gap-6 sm:grid-cols-2">
        {images.map((im, i) => (
          <motion.figure
            key={im.src}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: TILT[i + 1] }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 150, damping: 14, delay: i * 0.1 }}
            whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
            className="tape relative cursor-zoom-in rounded-md border-2 border-[#1F2430] bg-[#FFFBF4] p-2 pb-1 paper-shadow"
            onClick={() => setOpen(i)}
          >
            <img src={url(im.src)} alt={im.alt} loading="lazy" className="aspect-[16/10] w-full rounded-sm border border-[#1F2430]/30 object-cover" style={{ objectPosition: im.pos ?? 'center' }} />
            {im.caption && <figcaption className="px-1 pt-1 font-hand text-xl leading-tight">{im.caption}</figcaption>}
          </motion.figure>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-label={images[open].alt}
            className="fixed inset-0 z-[80] grid cursor-zoom-out place-items-center bg-[#1F2430]/80 p-4"
          >
            <button aria-label="Close image" className="absolute right-4 top-4 rounded-full border-2 border-[#1F2430] bg-[#FFFBF4] p-1.5">
              <X size={18} />
            </button>
            <motion.img initial={{ scale: 0.85 }} animate={{ scale: 1 }} src={url(images[open].src)} alt={images[open].alt} className="max-h-[88vh] max-w-[94vw] rounded-md border-2 border-[#1F2430] bg-white object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GapSystemResult: React.FC<{ e: Entry }> = ({ e }) => {
  const { gap, system, result } = e.body;
  const cards = [
    { k: 'The gap', v: gap, c: '#FBD9C6' },
    { k: 'The system', v: system, c: '#CDE7DA' },
    { k: 'The result', v: result, c: '#D9E2F8' },
  ].filter((x) => x.v);
  if (!cards.length) return null;
  return (
    <div className="my-6 grid gap-5 md:grid-cols-3">
      {cards.map((c, i) => (
        <motion.div
          key={c.k}
          initial={{ opacity: 0, y: 28, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: TILT[i] }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 160, damping: 14, delay: i * 0.12 }}
          whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
          className="tape relative rounded-lg border-2 border-[#1F2430] p-4 paper-shadow"
          style={{ background: c.c }}
        >
          <p className="font-hand text-2xl font-bold leading-none">{c.k}</p>
          <p className="mt-1.5 text-sm leading-relaxed">{c.v}</p>
        </motion.div>
      ))}
    </div>
  );
};

const Timeline: React.FC<{ items: string[] }> = ({ items }) => (
  <ol className="relative ml-1.5 border-l-2 border-dashed border-[#1F2430]/40 pl-5">
    {items.map((b, i) => (
      <motion.li
        key={b}
        initial={{ opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.05 }}
        whileHover={{ x: 4 }}
        className="relative pb-3 text-sm leading-relaxed last:pb-0"
      >
        <span
          aria-hidden
          className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-[#1F2430]"
          style={{ background: STICKERS[i % STICKERS.length] }}
        />
        {b}
      </motion.li>
    ))}
  </ol>
);

export const EntryView: React.FC<{ entry: Entry }> = ({ entry: e }) => {
  const meta = [e.org, e.role, e.period, e.location].filter(Boolean);
  return (
    <MotionConfig reducedMotion="user">
      <article className="text-[#1F2430]">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative mb-5 rounded-lg border-2 border-[#1F2430] bg-[#FFFBF4] p-4 pl-5 paper-shadow"
        >
          <Paperclip aria-hidden size={26} className="absolute -top-3 left-4 -rotate-12 text-[#1F2430]/70" />
          <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
            <h2 className="font-display text-4xl leading-[0.95] tracking-tight md:text-5xl">{e.title}</h2>
            {e.status && (
              <motion.span
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="mt-1 rounded-full border-2 border-[#1F2430] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide"
                style={{ background: e.status === 'live' ? '#CDE7DA' : '#F6D774' }}
              >
                {e.status}
              </motion.span>
            )}
          </div>
          {meta.length > 0 && (
            <p className="mt-2 flex flex-wrap gap-x-2 font-hand text-xl leading-tight text-[#1F2430]/75">
              {meta.map((m, i) => (
                <span key={m}>
                  {i > 0 && <span aria-hidden className="mr-2 text-[#E8552F]">✦</span>}
                  {m}
                </span>
              ))}
            </p>
          )}
        </motion.header>

        {e.body.summary && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base leading-relaxed first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8]"
          >
            {e.body.summary}
          </motion.p>
        )}

        <GapSystemResult e={e} />

        {e.body.images && e.body.images.length > 0 && <Gallery images={e.body.images} />}

        {e.body.metrics && e.body.metrics.length > 0 && (
          <div className="my-4 flex flex-wrap gap-2.5">
            {e.body.metrics.map((m, i) => (
              <Sticker key={m} i={i + 3}>
                {m}
              </Sticker>
            ))}
          </div>
        )}

        {e.body.groups?.map((g) => (
          <section key={g.title} className="mt-6">
            <Label>{g.title}</Label>
            <Timeline items={g.bullets} />
          </section>
        ))}

        {e.body.bullets && (
          <div className="mt-5">
            <Timeline items={e.body.bullets} />
          </div>
        )}

        {e.body.links && (
          <div className="mt-6 flex flex-wrap gap-2">
            {e.body.links.map((l) => (
              <motion.a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, rotate: -1.5 }}
                whileTap={{ y: 2, boxShadow: '0px 0px 0 #1F2430' }}
                className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#1F2430] bg-[#E8552F] px-3.5 py-2 text-sm font-semibold text-white paper-shadow"
              >
                {l.label} <ExternalLink size={14} aria-hidden />
              </motion.a>
            ))}
          </div>
        )}

        {e.body.tags && (
          <div className="mt-6">
            <Label>Tools &amp; themes</Label>
            <div className="flex flex-wrap gap-2">
              {e.body.tags.map((t, i) => (
                <Sticker key={t} i={i}>
                  {t}
                </Sticker>
              ))}
            </div>
          </div>
        )}
      </article>
    </MotionConfig>
  );
};
