export type PublicationType = 'article' | 'chapter';

export interface Publication {
  id: string;
  type: PublicationType;
  year: number;
  yearLabel?: string;
  authors: string;
  title: string;
  journal?: string;
  bookTitle?: string;
  publisher?: string;
  isbn?: string;
  url?: string;
  ranking?: string;
  volume?: string;
  pages?: string;
  doi?: string;
  database?: string;
  category?: string;
  quartile?: string;
  position?: string;
  impactFactor?: string;
  firstAuthor?: boolean;
  authorPosition?: number;
  totalAuthors?: number;
}

export type ConferenceScope = 'International' | 'National';
export type ConferenceType = 'Oral' | 'Poster';

export interface Conference {
  id: number;
  year: number;
  scope: ConferenceScope;
  type: ConferenceType;
  title: string;
  eventName: string;
  location: string;
}

export type ChartData = {
  year: string;
  count: number;
}[];

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectEcosystemPart {
  icon: string;
  title: string;
  description: string;
  stats?: { value: string; label: string }[];
  link?: ProjectLink;
}

export interface Project {
  id: string;
  flagshipLabel: string;
  name: string;
  tagline: string;
  links: ProjectLink[];
  problem: { title: string; description: string };
  solution: { title: string; description: string };
  stack: { title: string; technologies: string[] };
  ecosystem?: { title: string; intro: string; parts: ProjectEcosystemPart[] };
  features: { icon: string; title: string; description: string }[];
  galleryTitle: string;
  galleries: { title: string; images: { image: string; caption: string }[] }[];
  dataAnalystNote: { title: string; description: string };
  credit: string;
}
