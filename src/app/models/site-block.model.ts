export interface SiteBlock {
  id?: number;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl?: string;
  extra?: string;
  sortOrder: number;
}
