import type { PageSeo, SiteContent } from '@/types/content';

interface SeoFallback {
  title: string;
  description: string;
}

export function resolvePageSeo(
  content: SiteContent,
  path: string,
  fallback: SeoFallback,
): PageSeo {
  return content.pageSeo.find((entry) => entry.path === path) ?? {
    path,
    ...fallback,
  };
}
