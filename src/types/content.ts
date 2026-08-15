export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface BusinessHoursEntry {
  day: DayOfWeek;
  label: string;
  closed: boolean;
  opens?: string;
  closes?: string;
  lastOrder?: string;
}

export interface SpecialHoursEntry {
  date: string;
  label?: string;
  closed: boolean;
  opens?: string;
  closes?: string;
  lastOrder?: string;
}

export interface ExternalLinks {
  order: string;
  naverPlace: string;
  naverMap: string;
  kakaoMap: string;
  googleMaps: string;
  kakaoChat?: string;
  blog?: string;
}

export interface SiteSettings {
  name: string;
  description: string;
  address: string;
  addressRegion: string;
  addressLocality: string;
  streetAddress: string;
  postalCode?: string;
  telephone: string;
  telephoneHref: string;
  priceRange: string;
  takeawayOnly: boolean;
  hoursVerified: boolean;
  links: ExternalLinks;
}

export type MenuStatus = 'available' | 'soldOut' | 'seasonEnded' | 'unverified';

export interface MenuCategory {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  status: MenuStatus;
  seasonal: boolean;
  featured: boolean;
  preparationMinutes?: number;
  allergens: string[];
  imageUrl?: string;
  imageAlt?: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  expiresAt?: string;
  importance: 'normal' | 'important';
  href?: string;
}

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  canonical?: string;
  shareImageUrl?: string;
}

export interface SiteContent {
  settings: SiteSettings;
  businessHours: BusinessHoursEntry[];
  specialHours: SpecialHoursEntry[];
  categories: MenuCategory[];
  menuItems: MenuItem[];
  announcements: Announcement[];
  pageSeo: PageSeo[];
}
