import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Men's Tailoring | Fashion Look",
  description: "Explore Fashion Look's core bespoke tailoring services including suits, shirts, trousers, and blazers.",
};

export default function MensTailoringPage() {
  return (
    <div className="min-h-screen bg-atelier pt-32 pb-24">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <header className="mb-24 text-center">
          <p className="font-sans text-gold text-sm tracking-[0.2em] uppercase mb-4">
            Our Expertise
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory uppercase tracking-wide">
            Men's Tailoring
          </h1>
          <div className="mt-8 h-px w-24 bg-gold mx-auto opacity-30" />
        </header>

        <div className="space-y-32">
          {/* Section 1 */}
          <section className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/images/suits/suit-formal.jpg"
                alt="Bespoke Suits"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="lg:pl-12">
              <h2 className="font-serif text-4xl text-ivory mb-6 tracking-wide uppercase">Bespoke Suits</h2>
              <p className="font-sans text-muted leading-relaxed mb-8">
                Every bespoke suit begins with an understanding of your proportions, posture, and preferences. Crafted meticulously over weeks, our suits feature hand-stitched lapels, floating canvases, and functioning buttonholes. The result is a garment that drapes flawlessly and feels distinctly yours.
              </p>
              <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-atelier">
                <Link href="/bespoke-suits">Discover Bespoke Suits</Link>
              </Button>
            </div>
          </section>

          {/* Section 2 */}
          <section className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 lg:pr-12">
              <h2 className="font-serif text-4xl text-ivory mb-6 tracking-wide uppercase">Premium Shirting</h2>
              <p className="font-sans text-muted leading-relaxed mb-8">
                A perfectly tailored shirt is the foundation of any wardrobe. We offer a curated selection of Egyptian cottons, linens, and twills. Choose your collar style, cuff configuration, and monogram detailing to create a shirt that balances comfort with sharp precision.
              </p>
              <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-atelier">
                <Link href="/book">Book a Consultation</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[3/4] w-full">
              <Image
                src="/images/tailoring/safari.jpg"
                alt="Premium Shirting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
