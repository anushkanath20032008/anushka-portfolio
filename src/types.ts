export interface Profile {
  name: string;
  headline: string;
  positioning: string;
  summary: string;
  email: string;
  linkedin: string;
  instagram?: string;
  github?: string;
  location: string;
  resumeUrl?: string;
}

export interface Folder {
  slug: string;
  label: string;
  iconKey: string;
  sort: number;
  source: 'master-cv' | 'added';
}

export interface EntryLink {
  label: string;
  url: string;
}

export interface EntryBody {
  summary?: string;
  bullets?: string[];
  groups?: { title: string; bullets: string[] }[];
  metrics?: string[];
  links?: EntryLink[];
  tags?: string[];
  gap?: string;
  system?: string;
  result?: string;
  images?: { src: string; alt: string; caption?: string; pos?: string }[];
}

export interface Entry {
  id: string;
  folder: string;
  slug: string;
  title: string;
  org?: string;
  role?: string;
  period?: string;
  location?: string;
  kind?: string;
  status?: string;
  sort: number;
  body: EntryBody;
}

export interface Metric {
  label: string;
  value: string;
  sublabel?: string;
}

export interface NowItem {
  id: string;
  label: string;
  kind: 'building' | 'role' | 'note';
  statusText: string;
  short?: string;
  progress?: number;
  detail?: string;
}

export interface Skill {
  group: 'business' | 'technical';
  name: string;
}

export interface Content {
  profile: Profile;
  folders: Folder[];
  entries: Entry[];
  metrics: Metric[];
  now: NowItem[];
  skills: Skill[];
}
