import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

import { fallbackContent } from '@/data/fallback';
import type { SiteContent } from '@/types/content';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION ?? '2026-08-15';

const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: false })
  : null;

const imageBuilder = client ? createImageUrlBuilder(client) : null;

const contentQuery = `{
  "settings": *[_type == "siteSettings"][0]{
    name, description, address, addressRegion, addressLocality, streetAddress,
    postalCode, telephone, telephoneHref, priceRange, takeawayOnly, hoursVerified,
    links
  },
  "businessHours": *[_type == "businessHours"] | order(day asc){
    day, label, closed, opens, closes, lastOrder
  },
  "specialHours": *[_type == "specialHours"] | order(date asc){
    date, label, closed, opens, closes, lastOrder
  },
  "categories": *[_type == "menuCategory"] | order(order asc){
    "id": coalesce(slug.current, _id), title, description, order
  },
  "menuItems": *[_type == "menuItem"] | order(category->order asc, order asc){
    "id": coalesce(slug.current, _id),
    "categoryId": category->slug.current,
    name, price, description, status, seasonal, featured, preparationMinutes,
    allergens, image, "imageAlt": coalesce(imageAlt, image.alt), updatedAt
  },
  "announcements": *[_type == "announcement" && (!defined(expiresAt) || expiresAt >= now())] | order(publishedAt desc){
    "id": coalesce(slug.current, _id), title, summary, publishedAt, expiresAt, importance, href
  },
  "pageSeo": *[_type == "pageSeo"]{
    path, title, description, canonical, shareImage
  }
}`;

type RawContent = Omit<Partial<SiteContent>, 'menuItems' | 'pageSeo'> & {
  menuItems?: Array<SiteContent['menuItems'][number] & { image?: unknown }>;
  pageSeo?: Array<SiteContent['pageSeo'][number] & { shareImage?: unknown }>;
};

let contentPromise: Promise<SiteContent> | undefined;

export function sanityIsConfigured(): boolean {
  return Boolean(client);
}

export function getSiteContent(): Promise<SiteContent> {
  contentPromise ??= loadContent();
  return contentPromise;
}

async function loadContent(): Promise<SiteContent> {
  if (!client) return fallbackContent;

  try {
    const raw = await client.fetch<RawContent>(contentQuery);
    const menuItems = raw.menuItems?.map(({ image, ...item }) => ({
      ...item,
      imageUrl: image && imageBuilder ? imageBuilder.image(image).width(960).height(720).fit('crop').auto('format').url() : undefined,
    }));
    const pageSeo = raw.pageSeo?.map(({ shareImage, ...seo }) => ({
      ...seo,
      shareImageUrl: shareImage && imageBuilder
        ? imageBuilder.image(shareImage).width(1200).height(630).fit('crop').auto('format').url()
        : undefined,
    }));

    return {
      settings: {
        ...fallbackContent.settings,
        ...raw.settings,
        links: {
          ...fallbackContent.settings.links,
          ...raw.settings?.links,
        },
      },
      businessHours: raw.businessHours?.length ? raw.businessHours : fallbackContent.businessHours,
      specialHours: raw.specialHours ?? fallbackContent.specialHours,
      categories: raw.categories?.length ? raw.categories : fallbackContent.categories,
      menuItems: menuItems?.length ? menuItems : fallbackContent.menuItems,
      announcements: raw.announcements ?? fallbackContent.announcements,
      pageSeo: pageSeo ?? fallbackContent.pageSeo,
    };
  } catch (error) {
    console.warn('Sanity 콘텐츠를 불러오지 못해 확인된 로컬 기준값을 사용합니다.', error);
    return fallbackContent;
  }
}
