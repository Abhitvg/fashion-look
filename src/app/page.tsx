import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";
import { BookingForm } from "@/components/booking/BookingForm";
import { SuitConfigurator } from "@/components/configurator/SuitConfigurator";

export default function Home() {
  return (
    <>
      {/* 1. Cinematic Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero.jpg"
            alt="Bespoke tailoring"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-atelier/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-6 block">
            MADE FOR YOU.
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-ivory mb-8 leading-tight">
            Master Bespoke <br className="hidden md:block" />
            <span className="italic">Men's Tailoring</span>
          </h1>
          <p className="text-ivory/80 text-sm md:text-base max-w-2xl mx-auto mb-10 font-sans tracking-widest uppercase">
            Precisely Yours Since 1998
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-atelier font-sans tracking-widest uppercase rounded-none px-8">
              <Link href="/book">Book a Private Appointment</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gold text-gold hover:bg-gold hover:text-atelier font-sans tracking-widest uppercase rounded-none px-8">
              <Link href="/mens-tailoring">Explore Tailoring →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Our Legacy */}
      <section className="py-24 md:py-32 bg-atelier">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Images */}
            <div className="relative h-[500px] md:h-[600px] w-full mt-10 md:mt-0">
              {/* Main Image (Tafshir) */}
              <div className="absolute right-0 top-0 h-full w-[85%] rounded-2xl overflow-hidden border border-gold/10">
                <Image
                  src="/images/team/tafshir-shaikh.jpg"
                  alt="Master Tailor Tafshir Shaikh"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Floating Image (Shop) */}
              <div className="absolute left-0 bottom-10 h-[60%] w-[60%] md:w-[55%] rounded-2xl overflow-hidden shadow-2xl border border-gold/10 z-10">
                <Image
                  src="/images/atelier/shop.jpg"
                  alt="Fashion Look Atelier"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="max-w-xl">
              <h2 className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4 font-sans">
                OUR LEGACY
              </h2>
              <div className="mb-8">
                <h3 className="text-4xl md:text-5xl font-serif text-ivory mb-2">
                  Master Tailor
                </h3>
                <h3 className="text-4xl md:text-5xl font-serif text-ivory italic">
                  Tafshir Shaikh
                </h3>
              </div>
              
              <p className="text-ivory/70 text-base md:text-lg leading-relaxed mb-6">
                With 15+ years of bespoke craftsmanship, Master Tailor Tafshir Shaikh leads the atelier at Fashion Look. Every garment that leaves our shop is a testament to meticulous precision and an unyielding dedication to the perfect fit.
              </p>
              
              <p className="text-ivory/70 text-base md:text-lg leading-relaxed mb-10">
                Our flagship studio in Seawoods offers a sanctuary for the modern gentleman — featuring an extensive curation of world-class fabrics from Raymond, Siyaram's, and Reid &amp; Taylor, in a premium setting designed to make your bespoke journey unforgettable.
              </p>
              
              <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-atelier font-sans font-medium tracking-wide rounded-full px-8 h-12">
                <Link href="/book">Consult with the Master</Link>
              </Button>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. Why Bespoke / 4. Perfect Fit Process */}
      <section className="py-24 bg-atelier-soft border-y border-gold/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
              The Process
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-ivory mb-6">
              The Journey of a Bespoke Suit
            </h3>
            <p className="text-ivory/70 text-lg">
              From the first consultation to the final fitting, every step is a testament to our dedication to perfection.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Consultation', desc: 'Discuss your style, lifestyle, and select from our library of premium fabrics.' },
              { num: '02', title: 'Measurement', desc: 'Over 20 precise measurements taken to create your unique digital and physical pattern.' },
              { num: '03', title: 'Baste Fitting', desc: 'A trial with the skeleton of your suit to perfect the drape and balance.' },
              { num: '04', title: 'Final Delivery', desc: 'The finished masterpiece, pressed and ready for your momentous occasion.' },
            ].map((step) => (
              <div key={step.num} className="relative p-8 border border-gold/10 bg-atelier/50 hover:bg-atelier transition-colors group">
                <span className="text-gold/20 font-serif text-6xl absolute top-4 right-6 group-hover:text-gold/40 transition-colors">
                  {step.num}
                </span>
                <h4 className="text-xl font-serif text-ivory mt-12 mb-4 relative z-10">{step.title}</h4>
                <p className="text-ivory/60 text-sm leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Tailoring Services */}
      <section id="collections" className="py-24 md:py-32 bg-atelier">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
                Our Services
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-ivory">
                Wardrobe Excellence
              </h3>
            </div>
            <Button variant="link" className="hidden md:inline-flex">
              View All Services →
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <Link href={service.href} key={service.id} className="group block relative overflow-hidden h-[500px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-atelier via-atelier/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <h4 className="text-3xl font-serif text-ivory mb-3">{service.title}</h4>
                  <p className="text-ivory/70 mb-6 max-w-md line-clamp-2">{service.description}</p>
                  <span className="text-gold uppercase tracking-widest text-sm font-medium flex items-center gap-2">
                    Explore <span className="transition-transform group-hover:translate-x-2">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. The Gift Experience */}
      <section className="py-24 bg-atelier-soft border-t border-gold/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center flex-row-reverse">
            <div className="order-2 md:order-1 max-w-xl">
              <h2 className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
                The Ultimate Present
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-ivory mb-6">
                The Gift of Bespoke
              </h3>
              <p className="text-ivory/70 text-lg leading-relaxed mb-8">
                Gift a sartorial experience. Our beautifully presented bespoke gift boxes allow the recipient to embark on their own tailoring journey, choosing their fabrics and styling details.
              </p>
              <Button asChild>
                <Link href="/#gift-boxes">Explore Gift Boxes</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2 relative h-[500px] w-full">
              <Image
                src="/images/gift-boxes/gift-box.jpg"
                alt="Fashion Look Gift Box"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. The Real Atelier */}
      <section className="relative py-32 bg-atelier overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/atelier/premium-atelier.jpg"
            alt="Fashion Look Atelier Interior"
            fill
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-atelier via-transparent to-atelier" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <h2 className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
            Our Sanctuaries
          </h2>
          <h3 className="text-4xl md:text-6xl font-serif text-ivory mb-8">
            Step Into Our World
          </h3>
          <p className="text-ivory/80 text-lg max-w-2xl mx-auto mb-12">
            Dark walnut interiors, the scent of fine wool, and the quiet hum of creation. Visit our boutiques in Navi Mumbai and Mumbai.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/stores">Discover Our Stores</Link>
          </Button>
        </div>
      </section>



      {/* Layered Configurator */}
      <SuitConfigurator />

      {/* CTA Section */}
      <section id="book" className="py-24 md:py-32 bg-atelier-soft border-t border-gold/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-6">
                Begin Your Journey
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ivory mb-8 leading-tight">
                Book a Personal Fitting
              </h3>
              <p className="text-ivory/70 text-lg mb-8 max-w-lg">
                Visit our atelier in Navi Mumbai or Mumbai for a personalized consultation. Let our master tailors craft a garment that perfectly reflects your individual style and measurements.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center shrink-0">
                    <span className="text-gold font-serif text-lg">1</span>
                  </div>
                  <div>
                    <h4 className="text-ivory font-medium">Style Consultation</h4>
                    <p className="text-ivory/60 text-sm">Discuss your needs, select from 500+ premium fabrics.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center shrink-0">
                    <span className="text-gold font-serif text-lg">2</span>
                  </div>
                  <div>
                    <h4 className="text-ivory font-medium">Precise Measurement</h4>
                    <p className="text-ivory/60 text-sm">20+ data points taken for a flawless anatomical fit.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gold/5 blur-3xl rounded-full z-0"></div>
              <div className="relative z-10">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
