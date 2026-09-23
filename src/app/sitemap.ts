import { MetadataRoute } from 'next';
import { serviceLocations } from '@/lib/locations';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fashion-look.in';
  const locales = ['en', 'hi', 'mr', 'ur'];
  
  // Base routes
  const baseRoutes = ['', '/style-guide', '/privacy', '/refund-policy'];
  
  // Dynamic location routes
  const locationRoutes = serviceLocations.map(loc => `/locations/${loc.slug}`);
  
  const allRoutes = [...baseRoutes, ...locationRoutes];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  for (const route of allRoutes) {
    const isHome = route === '';
    const isLocation = route.startsWith('/locations');
    
    let priority = 0.8;
    if (isHome) priority = 1;
    if (isLocation) priority = 0.9;
    
    // Generate alternates for each locale
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${baseUrl}/${locale}${route}`;
    }
    
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: isHome ? 'daily' : 'weekly',
        priority,
        alternates: {
          languages,
        },
      });
    }
  }
  
  return sitemapEntries;
}
