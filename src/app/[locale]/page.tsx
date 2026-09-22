import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/sections/HeroBanner';
import HeritageBand from '@/components/sections/HeritageBand';
import LookbookGallery from '@/components/sections/LookbookGallery';
import ServicesGrid from '@/components/sections/ServicesGrid';
import CraftsmanshipStory from '@/components/sections/CraftsmanshipStory';
import ProcessSteps from '@/components/sections/ProcessSteps';
import Calculator from '@/components/calculator/Calculator';
import Testimonials from '@/components/sections/Testimonials';
import GiftBoxBuilder from '@/components/gifts/GiftBoxBuilder';
import StoreLocations from '@/components/sections/StoreLocations';
import WhatsAppFAB from '@/components/ui/WhatsAppFAB';
import ScrollReveal from '@/components/layout/ScrollReveal';

export default async function HomePage() {
  const t = await getTranslations('Index');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* 1. HERO */}
        <HeroBanner />

        {/* 2. HERITAGE STATS BAND */}
        <HeritageBand />

        {/* 3. LOOKBOOK GALLERY */}
        <LookbookGallery />

        {/* 4. BESPOKE SERVICES */}
        <ServicesGrid />

        {/* 4. CRAFTSMANSHIP STORY */}
        <CraftsmanshipStory />

        {/* 5. OUR PROCESS */}
        <ProcessSteps />

        {/* 5. ATELIER CALCULATOR */}
        <section id="calculator" className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">Transparent Pricing</p>
                <h2 className="text-3xl md:text-4xl font-serif text-ivory tracking-wider uppercase">
                  Atelier Calculator
                </h2>
                <div className="h-px w-16 bg-gold/40 mx-auto mt-6" />
                <p className="text-sm text-ivory/40 mt-6 max-w-lg mx-auto font-light leading-relaxed">
                  Build your garment from scratch. Select garment type, silhouette, and fabric tier — 
                  see your investment instantly. Final pricing confirmed after physical measurement.
                </p>
              </div>
              <Calculator />
            </ScrollReveal>
          </div>
        </section>

        {/* 6. TESTIMONIALS */}
        <Testimonials />

        {/* 7. LUXURY GIFTING */}
        <section id="gifts" className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">Corporate & Festive</p>
                <h2 className="text-3xl md:text-4xl font-serif text-ivory tracking-wider uppercase">
                  Luxury Fabric Gifting
                </h2>
                <div className="h-px w-16 bg-gold/40 mx-auto mt-6" />
                <p className="text-sm text-ivory/40 mt-6 max-w-lg mx-auto font-light leading-relaxed">
                  Curate a bespoke gift box with premium fabrics, silk accessories, and a personal touch. 
                  Perfect for Diwali, weddings, corporate milestones, and celebrations.
                </p>
              </div>
              <GiftBoxBuilder />
            </ScrollReveal>
          </div>
        </section>

        {/* 8. STORE LOCATIONS */}
        <StoreLocations />
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
