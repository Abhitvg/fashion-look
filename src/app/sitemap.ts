import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fashion-look.in';
  const locales = ['en', 'hi', 'mr', 'ur'];
  const routes = ['', '/style-guide', '/privacy', '/refund-policy'];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  for (const route of routes) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
        // Since we have multiple locales, providing alternates is technically best, 
        // but adding the raw localized URLs here ensures Google crawls them.
      });
    }
  }
  
  return sitemapEntries;
}
