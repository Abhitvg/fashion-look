import { GalleryMasonry } from "@/components/ui/GalleryMasonry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Fashion Look",
  description: "Explore the Fashion Look gallery featuring bespoke suits, sherwanis, premium fabrics, and our Navi Mumbai atelier.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-atelier pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 md:mb-24 text-center">
          <p className="font-sans text-gold text-sm tracking-[0.2em] uppercase mb-4">
            The Atelier
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory uppercase tracking-wide">
            Our Work
          </h1>
          <div className="mt-8 h-px w-24 bg-gold mx-auto opacity-30" />
        </header>

        <GalleryMasonry />
      </div>
    </div>
  );
}
