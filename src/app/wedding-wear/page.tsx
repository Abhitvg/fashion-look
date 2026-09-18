import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Wear & Sherwanis | Fashion Look",
  description: "Bespoke wedding wear, sherwanis, and bandhgalas tailored for your special day.",
};

export default function WeddingWearPage() {
  return (
    <div className="min-h-screen bg-atelier pt-32 pb-24">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <header className="mb-24 text-center">
          <p className="font-sans text-gold text-sm tracking-[0.2em] uppercase mb-4">
            The Groom's Wardrobe
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory uppercase tracking-wide">
            Your Wedding.<br />Tailored.
          </h1>
          <div className="mt-8 h-px w-24 bg-gold mx-auto opacity-30" />
        </header>

        <section className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src="/images/sherwani/sherwani.jpg"
              alt="Bespoke Sherwani"
              fill
              className="object-cover rounded-sm"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="lg:pl-12">
            <h2 className="font-serif text-4xl text-ivory mb-6 tracking-wide uppercase">Bespoke Sherwanis</h2>
            <p className="font-sans text-muted leading-relaxed mb-8">
              A wedding requires attire that commands presence while remaining comfortable throughout the day. Our bespoke sherwanis are crafted from the finest silks, brocades, and velvets, featuring intricate embroidery tailored specifically to your taste.
            </p>
            <ul className="space-y-4 mb-8 text-ivory/80 font-sans tracking-wide">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-gold rounded-full" /> Custom Embroidery Design</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-gold rounded-full" /> Premium Fabric Selection</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-gold rounded-full" /> Matching Safa & Mojaris</li>
            </ul>
            <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-atelier">
              <Link href="/book">Plan Your Wedding Look</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
