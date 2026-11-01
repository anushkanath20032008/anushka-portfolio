import { describe, expect, it } from 'vitest';
import { loadContent, mapEntry } from './content';
import { SNAPSHOT } from '../data/snapshot';

const fakeClient = (tables: Record<string, any>) => ({
  from: (t: string) => ({
    select: () => Promise.resolve(tables[t] ?? { data: null, error: new Error('missing') }),
  }),
});

describe('loadContent', () => {
  it('returns the snapshot when no client is configured', async () => {
    const r = await loadContent(null);
    expect(r.source).toBe('snapshot');
    expect(r.content).toBe(SNAPSHOT);
  });

  it('falls back per table when a table errors', async () => {
    const client = fakeClient({
      folders: { data: [{ slug: 'x', label: 'X', icon_key: 'work', sort: 1, source: 'added' }], error: null },
    });
    const r = await loadContent(client);
    expect(r.source).toBe('supabase');
    expect(r.content.folders).toHaveLength(1);
    expect(r.content.entries).toEqual(SNAPSHOT.entries);
  });

  it('falls back to the snapshot on timeout', async () => {
    const never = { from: () => ({ select: () => new Promise(() => {}) }) };
    const r = await loadContent(never, 20);
    expect(r.source).toBe('snapshot');
  });
});

describe('mapEntry', () => {
  it('maps snake_case rows and defaults body', () => {
    const e = mapEntry({ id: 'a', folder_slug: 'f', slug: 's', title: 'T', sort: 2, org: null });
    expect(e.folder).toBe('f');
    expect(e.org).toBeUndefined();
    expect(e.body).toEqual({});
  });
});

describe('snapshot integrity', () => {
  it('every entry points at a real folder', () => {
    const slugs = new Set(SNAPSHOT.folders.map((f) => f.slug));
    for (const e of SNAPSHOT.entries) expect(slugs.has(e.folder)).toBe(true);
  });
  it('has no fashion collection material', () => {
    expect(JSON.stringify(SNAPSHOT).toLowerCase()).not.toContain('gaanth');
  });
  it('uses corrected dates', () => {
    const crowe = SNAPSHOT.entries.find((e) => e.id === 'crowe')!;
    expect(crowe.period).toContain("Jul'24");
    expect(crowe.period).toContain("Jun'26");
  });
});
