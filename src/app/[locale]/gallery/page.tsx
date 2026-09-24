import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LookbookGallery from '@/components/sections/LookbookGallery';
import WhatsAppFAB from '@/components/ui/WhatsAppFAB';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }, { locale: 'mr' }, { locale: 'ur' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Inspiration Gallery | Fashion Look Tailors",
    description: "Browse our extensive lookbook of bespoke suits, tuxedos, sherwanis, and luxury ethnic wear custom tailored in Navi Mumbai.",
    alternates: {
      canonical: `https://www.fashion-look.in/${locale}/gallery`,
    }
  };
}

export default function GalleryPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 bg-black">
        {/* The LookbookGallery component handles its own section title and padding */}
        <LookbookGallery />
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
