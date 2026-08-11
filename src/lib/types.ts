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
