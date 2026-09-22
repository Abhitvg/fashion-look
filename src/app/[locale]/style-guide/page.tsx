import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { styleGuideCoats } from '@/lib/style-guide-data';
import { MoveRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }, { locale: 'mr' }, { locale: 'ur' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Bespoke Outerwear Guide | Fashion Look Tailors",
    description: "Discover the art of outerwear. From timeless overcoats to elegant tuxedos, explore the essential silhouettes that define the modern gentleman's wardrobe.",
    alternates: {
      canonical: `https://www.fashion-look.in/${locale}/style-guide`,
    }
  };
}

export default function StyleGuidePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('StyleGuide');

  return (
    <main className="min-h-screen bg-atelier pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-gold/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ivory mb-6 tracking-wide">
            {t('title')}
          </h1>
          <p className="text-ivory/60 font-light leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-4 md:px-8 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {styleGuideCoats.map((coat, index) => (
            <div key={index} className="group flex flex-col h-full border border-ivory/5 bg-atelier-dark/30 hover:border-gold/30 transition-all duration-500 overflow-hidden">
              
              {/* Image Container */}
              <div className="relative w-full h-80 bg-atelier-dark overflow-hidden">
                <Image
                  src={coat.image}
                  alt={coat.title}
                  fill
                  className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-atelier-dark via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-serif text-ivory tracking-wide group-hover:text-gold transition-colors">
                    {coat.title}
                  </h3>
                  <span className="text-gold/40 text-xs tracking-widest font-mono">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                
                <p className="text-ivory/50 font-light text-sm leading-relaxed mb-8 flex-grow">
                  {coat.description}
                </p>

                <div className="mt-auto">
                  <Link href="/#services" className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors group/btn">
                    {t('readMore') || 'Explore Services'}
                    <MoveRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
