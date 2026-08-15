import type { SiteContent } from '@/types/content';

export function buildRestaurantStructuredData(content: SiteContent, baseUrl: URL): Record<string, unknown> {
  const { settings, businessHours } = content;
  const openingHoursSpecification = settings.hoursVerified
    ? businessHours
        .filter((entry) => !entry.closed && entry.opens && entry.closes)
        .map((entry) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][entry.day],
          opens: entry.opens,
          closes: entry.closes,
        }))
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': new URL('/#restaurant', baseUrl).toString(),
    name: settings.name,
    description: settings.description,
    url: new URL('/', baseUrl).toString(),
    telephone: settings.telephone,
    image: new URL('/og-default.svg', baseUrl).toString(),
    priceRange: settings.priceRange,
    servesCuisine: ['와플', '분식', '디저트'],
    menu: new URL('/menu', baseUrl).toString(),
    acceptsReservations: false,
    hasMap: settings.links.naverPlace,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.streetAddress,
      addressLocality: settings.addressLocality,
      addressRegion: settings.addressRegion,
      postalCode: settings.postalCode,
      addressCountry: 'KR',
    },
    openingHoursSpecification,
    potentialAction: {
      '@type': 'OrderAction',
      target: settings.links.order,
      deliveryMethod: 'https://purl.org/goodrelations/v1#DeliveryModePickUp',
    },
  };
}
