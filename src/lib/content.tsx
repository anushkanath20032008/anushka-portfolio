import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Content, Entry, Folder, Metric, NowItem, Profile, Skill } from '../types';
import { SNAPSHOT } from '../data/snapshot';

type Row = Record<string, any>;

export const mapProfile = (r: Row): Profile => ({
  name: r.name,
  headline: r.headline,
  positioning: r.positioning,
  summary: r.summary,
  email: r.email,
  linkedin: r.linkedin,
  instagram: r.instagram ?? undefined,
  github: r.github ?? undefined,
  location: r.location,
  resumeUrl: r.resume_url ?? undefined,
});

export const mapFolder = (r: Row): Folder => ({
  slug: r.slug,
  label: r.label,
  iconKey: r.icon_key,
  sort: r.sort,
  source: r.source,
});

export const mapEntry = (r: Row): Entry => ({
  id: r.id,
  folder: r.folder_slug,
  slug: r.slug,
  title: r.title,
  org: r.org ?? undefined,
  role: r.role ?? undefined,
  period: r.period ?? undefined,
  location: r.location ?? undefined,
  kind: r.kind ?? undefined,
  status: r.status ?? undefined,
  sort: r.sort,
  body: r.body ?? {},
});

export const mapMetric = (r: Row): Metric => ({ label: r.label, value: r.value, sublabel: r.sublabel ?? undefined });

export const mapNow = (r: Row): NowItem => ({
  id: r.id,
  label: r.label,
  kind: r.kind,
  statusText: r.status_text,
  short: r.short_label ?? undefined,
  progress: r.progress ?? undefined,
  detail: r.detail ?? undefined,
});

export const mapSkill = (r: Row): Skill => ({ group: r.group, name: r.name });

const bySort = <T extends { sort?: number }>(a: T, b: T) => (a.sort ?? 0) - (b.sort ?? 0);

export interface FetchLike {
  from: (table: string) => any;
}

/** Fetch every table; any failing table falls back to its snapshot slice. */
export async function loadContent(client: FetchLike | null, timeoutMs = 4000): Promise<{ content: Content; source: 'supabase' | 'snapshot' }> {
  if (!client) return { content: SNAPSHOT, source: 'snapshot' };

  const q = (table: string) =>
    Promise.resolve(client.from(table).select('*')).then((res: any) => {
      if (res.error || !Array.isArray(res.data) || res.data.length === 0) throw res.error ?? new Error(`${table} empty`);
      return res.data as Row[];
    });

  const work = (async () => {
    const [profile, folders, entries, metrics, now, skills] = await Promise.allSettled([
      q('profile'),
      q('folders'),
      q('entries'),
      q('metrics'),
      q('now_items'),
      q('skills'),
    ]);
    const ok = <T,>(r: PromiseSettledResult<Row[]>, map: (x: Row) => T, fb: T[]): T[] => (r.status === 'fulfilled' ? r.value.map(map) : fb);
    const content: Content = {
      profile: profile.status === 'fulfilled' ? mapProfile(profile.value[0]) : SNAPSHOT.profile,
      folders: ok(folders, mapFolder, SNAPSHOT.folders).sort(bySort),
      entries: ok(entries, mapEntry, SNAPSHOT.entries).sort(bySort),
      metrics: ok(metrics, mapMetric, SNAPSHOT.metrics),
      now: ok(now, mapNow, SNAPSHOT.now),
      skills: ok(skills, mapSkill, SNAPSHOT.skills),
    };
    const anyOk = [profile, folders, entries, metrics, now, skills].some((r) => r.status === 'fulfilled');
    return { content, source: (anyOk ? 'supabase' : 'snapshot') as 'supabase' | 'snapshot' };
  })();

  const timeout = new Promise<{ content: Content; source: 'snapshot' }>((resolve) =>
    setTimeout(() => resolve({ content: SNAPSHOT, source: 'snapshot' }), timeoutMs),
  );
  return Promise.race([work, timeout]);
}

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const client = url && key ? createClient(url, key) : null;

interface Ctx {
  content: Content;
  source: 'supabase' | 'snapshot';
}
const ContentContext = createContext<Ctx>({ content: SNAPSHOT, source: 'snapshot' });

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Render the snapshot immediately so the desktop never waits on the network.
  const [state, setState] = useState<Ctx>({ content: SNAPSHOT, source: 'snapshot' });
  useEffect(() => {
    let alive = true;
    loadContent(client).then((r) => alive && setState(r));
    return () => {
      alive = false;
    };
  }, []);
  return <ContentContext.Provider value={state}>{children}</ContentContext.Provider>;
};

export const useContent = () => useContext(ContentContext);
