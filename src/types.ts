export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

export interface ProcessStep {
  name: string;
  subtitle?: string;
  number: string;
}

export type HeroTheme = 'light' | 'dark';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  description: string;
  tags: string[];
}
