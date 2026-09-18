import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Calculator from '@/components/calculator/Calculator';
import GiftBoxBuilder from '@/components/gifts/GiftBoxBuilder';
import HeroScene from '@/components/3d/HeroScene';
import ScrollReveal from '@/components/layout/ScrollReveal';

export default async function HomePage() {
  const t = await getTranslations('Index');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section id="hero" className="relative h-screen flex items-center justify-center bg-atelier-dark overflow-hidden">
          <HeroScene />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pointer-events-none">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-gold uppercase tracking-widest mb-6">
              {t('title')}
            </h1>
            <div className="h-px w-24 bg-gold mx-auto mb-6"></div>
            <p className="text-sm md:text-base text-foreground/80 uppercase tracking-[0.3em]">
              Precisely Yours Since 1998
            </p>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <ScrollReveal>
              <h2 className="text-3xl font-serif text-gold text-center tracking-widest uppercase mb-16">Bespoke Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Service Cards placeholder */}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CALCULATOR SECTION */}
        <section id="calculator" className="py-24 bg-atelier-soft border-y border-atelier-soft/50">
          <div className="container mx-auto px-4 md:px-8">
            <ScrollReveal>
              <h2 className="text-3xl font-serif text-gold text-center tracking-widest uppercase mb-16">Atelier Calculator</h2>
              <Calculator />
            </ScrollReveal>
          </div>
        </section>

        {/* GIFTS SECTION */}
        <section id="gifts" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <ScrollReveal>
              <h2 className="text-3xl font-serif text-gold text-center tracking-widest uppercase mb-16">Luxury Gifting</h2>
              <GiftBoxBuilder />
            </ScrollReveal>
          </div>
        </section>

        {/* LOCATIONS SECTION */}
        <section id="locations" className="py-24 bg-atelier-soft">
          <div className="container mx-auto px-4 md:px-8">
            <ScrollReveal>
              <h2 className="text-3xl font-serif text-gold text-center tracking-widest uppercase mb-16">Our Stores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Store Cards */}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
