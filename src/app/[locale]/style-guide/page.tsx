import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import StyleGuideContent from '@/components/style-guide/StyleGuideContent';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }, { locale: 'mr' }, { locale: 'ur' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Bespoke Style Guide | Fashion Look Tailors",
    description: "Discover the art of bespoke tailoring. Explore suit architectures, shirt styles, and the fine details like lapels, shoulders, and cuffs.",
    alternates: {
      canonical: `https://www.fashion-look.in/${locale}/style-guide`,
    }
  };
}

export default function StyleGuidePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  // We cannot use useTranslations for the title here because it's a Server Component,
  // but we can pass translations to Client Components if needed.
  // Actually, wait, useTranslations WORKS in Server Components in next-intl if setup correctly!
  const t = useTranslations('StyleGuide');

  return (
    <main className="min-h-screen bg-atelier">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ivory mb-6 tracking-wide">
            {t('title')}
          </h1>
          <p className="text-ivory/60 font-light leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Dynamic Filterable Content Hub */}
      <StyleGuideContent />
    </main>
  );
}
