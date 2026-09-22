import { notFound } from 'next/navigation';
import { serviceLocations, getLocationBySlug } from '@/lib/locations';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Script from 'next/script';
import { Link } from '@/i18n/routing';
import { MapPin, Star, Shield } from 'lucide-react';

type Props = {
  params: Promise<{ locale: string; city: string }>;
};

// Generate static params for all locations
export async function generateStaticParams() {
  const locales = ['en', 'hi', 'mr', 'ur'];
  const params: { locale: string; city: string }[] = [];

  locales.forEach((locale) => {
    serviceLocations.forEach((location) => {
      params.push({ locale, city: location.slug });
    });
  });

  return params;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    return {};
  }

  return {
    title: `Bespoke Tailor in ${location.name} | Custom Suits & Sherwanis`,
    description: location.description,
    alternates: {
      canonical: `https://www.fashion-look.in/en/locations/${location.slug}`,
    }
  };
}

export default async function LocationPage({ params }: Props) {
  const { locale, city } = await params;
  setRequestLocale(locale);

  const location = getLocationBySlug(city);

  if (!location) {
    notFound();
  }

  // Generate LocalBusiness JSON-LD for this specific geography (GEO optimization)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Fashion Look - Custom Tailors serving ${location.name}`,
    "image": "https://www.fashion-look.in/images/store-front.jpg",
    "description": location.description,
    "telephone": "+91-81080-14945",
    "priceRange": "₹4500 - ₹25000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop No. 5, Plot No. 144, Seawoods West, Sector 44",
      "addressLocality": "Navi Mumbai",
      "addressRegion": "MH",
      "postalCode": "400706",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.lat.toString(),
      "longitude": location.lng.toString()
    },
    "areaServed": {
      "@type": "City",
      "name": location.name
    },
    "url": `https://www.fashion-look.in/${locale}/locations/${location.slug}`
  };

  return (
    <main className="min-h-screen bg-atelier pt-24 pb-16">
      {/* Schema Injection */}
      <Script
        id={`local-schema-${location.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-gold mb-4">
            <MapPin size={20} />
            <span className="text-sm tracking-widest uppercase font-semibold">Serving {location.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ivory mb-6 leading-tight">
            Premium Bespoke Tailoring in <span className="text-gold italic">{location.name}</span>
          </h1>
          <p className="text-lg text-ivory/70 leading-relaxed">
            {location.description}
          </p>
        </div>

        {/* Unique Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-atelier-soft border border-ivory/10 p-8 text-center flex flex-col items-center">
            <Star className="text-gold w-8 h-8 mb-4" />
            <h3 className="text-xl font-serif text-ivory mb-2">Specialty</h3>
            <p className="text-ivory/60 text-sm">{location.popularService}</p>
          </div>
          <div className="bg-atelier-soft border border-gold/30 p-8 text-center flex flex-col items-center transform md:-translate-y-4">
            <MapPin className="text-gold w-8 h-8 mb-4" />
            <h3 className="text-xl font-serif text-gold mb-2">Local Focus</h3>
            <p className="text-ivory/80 text-sm">{location.usp}</p>
          </div>
          <div className="bg-atelier-soft border border-ivory/10 p-8 text-center flex flex-col items-center">
            <Shield className="text-gold w-8 h-8 mb-4" />
            <h3 className="text-xl font-serif text-ivory mb-2">Guarantee</h3>
            <p className="text-ivory/60 text-sm">6-Month Craftsmanship Warranty</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-atelier-dark border border-gold/20 p-10 md:p-16 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-ivory mb-4">Ready to elevate your wardrobe in {location.name}?</h2>
          <p className="text-ivory/70 mb-8 max-w-2xl mx-auto">
            Book a complimentary home visit or schedule an appointment at our Seawoods atelier. Our master tailors bring the complete bespoke experience directly to you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/#booking"
              className="px-8 py-4 bg-gold text-black text-sm tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors w-full sm:w-auto"
            >
              Book Home Visit
            </Link>
            <Link 
              href="/#contact"
              className="px-8 py-4 bg-transparent border border-ivory/30 text-ivory text-sm tracking-widest uppercase font-semibold hover:border-gold hover:text-gold transition-colors w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
