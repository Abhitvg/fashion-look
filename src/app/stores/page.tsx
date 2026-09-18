import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { stores } from "@/content/stores";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Ateliers | Fashion Look",
  description: "Visit Fashion Look tailoring ateliers in Navi Mumbai (Seawoods) and Mumbai (Govandi) for premium bespoke services.",
};

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-atelier pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <p className="font-sans text-gold text-sm tracking-[0.2em] uppercase mb-4">
            Visit Us
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory uppercase tracking-wide">
            Our Ateliers
          </h1>
          <div className="mt-8 h-px w-24 bg-gold mx-auto opacity-30" />
        </header>

        <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
          {stores.map((store, index) => (
            <div key={store.name} className="flex flex-col">
              <div className="relative aspect-[4/3] w-full mb-10 overflow-hidden group rounded-sm">
                <Image
                  src={index === 0 ? "/images/atelier/premium-atelier.jpg" : store.image} // Using premium image for the primary store
                  alt={`${store.name} Atelier`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
              
              <div className="flex-1 flex flex-col items-center text-center px-4">
                <h2 className="font-serif text-3xl md:text-4xl text-ivory mb-6 tracking-wide uppercase">
                  {store.name}
                </h2>
                
                <div className="space-y-4 mb-8 text-muted font-sans text-sm tracking-wider">
                  <p className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    {store.address}
                  </p>
                  <p className="text-gold/80">{store.hours}</p>
                </div>

                <div className="mt-auto pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href={`https://wa.me/${store.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20Fashion%20Look%20${store.name},%20I'd%20like%20to%20book%20an%20appointment.`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href={store.mapsUrl} target="_blank" rel="noopener noreferrer">
                      <MapPin className="w-4 h-4 mr-2" />
                      Directions
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
