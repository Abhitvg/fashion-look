import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Gift Boxes | Fashion Look",
  description: "Give the gift of bespoke tailoring with Fashion Look's curated luxury gift boxes.",
};

export default function GiftBoxesPage() {
  return (
    <div className="min-h-screen bg-atelier pt-32 pb-24">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <header className="mb-24 text-center">
          <p className="font-sans text-gold text-sm tracking-[0.2em] uppercase mb-4">
            The Art of Giving
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory uppercase tracking-wide">
            Gift Boxes
          </h1>
          <div className="mt-8 h-px w-24 bg-gold mx-auto opacity-30" />
        </header>

        <section className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <div className="relative aspect-square w-full">
            <Image
              src="/images/gift-boxes/gift-box.jpg"
              alt="Luxury Gift Box"
              fill
              className="object-cover rounded-sm"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="lg:pl-12">
            <h2 className="font-serif text-4xl text-ivory mb-6 tracking-wide uppercase">The Signature Box</h2>
            <p className="font-sans text-muted leading-relaxed mb-8">
              A meticulously curated gifting experience. Each signature box includes premium unstitched fabric, an elegant tie, a pocket square, cufflinks, and a personalized message card. It is an invitation for the recipient to visit our atelier and have the fabric tailored to their exact specifications.
            </p>
            <Button asChild className="bg-gold hover:bg-gold-light text-atelier font-sans tracking-widest uppercase rounded-none px-8 py-6">
              <a href="https://wa.me/919876543210?text=Hello%20Fashion%20Look,%20I'd%20like%20to%20inquire%20about%20the%20Signature%20Gift%20Box." target="_blank" rel="noopener noreferrer">
                Inquire on WhatsApp
              </a>
            </Button>
            <div className="mt-6">
              <Link href="/custom-box" className="text-gold hover:text-gold-light font-sans text-sm tracking-widest uppercase transition-colors">
                Or Build a Custom Box →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
