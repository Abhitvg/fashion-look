import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bespoke Suits | Fashion Look",
  description: "Discover the craftsmanship behind Fashion Look bespoke suits. Tailoring that begins with you.",
};

export default function BespokeSuitsPage() {
  return (
    <div className="min-h-screen bg-atelier pt-32 pb-24">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <header className="mb-24 text-center">
          <p className="font-sans text-gold text-sm tracking-[0.2em] uppercase mb-4">
            The Pinnacle of Craft
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory uppercase tracking-wide">
            Bespoke Suits
          </h1>
          <div className="mt-8 h-px w-24 bg-gold mx-auto opacity-30" />
        </header>

        {/* Introduction */}
        <section className="max-w-3xl mx-auto text-center mb-32">
          <p className="font-serif text-2xl md:text-3xl text-ivory/90 leading-relaxed mb-8">
            "Good tailoring isn't about making clothes smaller or larger. It's about understanding proportion."
          </p>
          <p className="font-sans text-muted leading-relaxed">
            A Fashion Look bespoke suit is a collaboration between tailor and client. From the initial consultation where we understand your needs, through the selection of premium fabrics, to the meticulous hand-finishing, every step is executed with precision.
          </p>
        </section>

        {/* Gallery / Detail */}
        <section className="grid md:grid-cols-2 gap-6 mb-32">
          <div className="relative aspect-square">
            <Image
              src="/images/suits/suit-formal.jpg"
              alt="Suit Details"
              fill
              className="object-cover rounded-sm"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-square">
            <Image
              src="/images/atelier/premium-atelier.jpg"
              alt="The Atelier"
              fill
              className="object-cover rounded-sm"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-atelier-soft py-20 px-6 border border-white/5">
          <h2 className="font-serif text-3xl text-ivory uppercase tracking-wide mb-6">
            Begin Your Bespoke Journey
          </h2>
          <Button asChild className="bg-gold hover:bg-gold-light text-atelier font-sans tracking-widest uppercase rounded-none px-8 py-6">
            <Link href="/book">Book an Appointment</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
