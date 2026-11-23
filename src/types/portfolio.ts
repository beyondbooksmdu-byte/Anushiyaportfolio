export type PlaceholderKind =
  | 'portrait'
  | 'about'
  | 'project'
  | 'market-research'
  | 'competitor-analysis'
  | 'usp'
  | 'sitemap'
  | 'wireframe'
  | 'final-design'
  | 'seo';

export interface LightboxData {
  title: string;
  subtitle?: string;
  imageUrl: string | null;
  placeholderLabel: string;
  aspectClass?: string;
}

export interface ContactDetails {
  phone: string;
  whatsappUrl: string;
  email: string;
  linkedin: string;
  instagram: string;
}
