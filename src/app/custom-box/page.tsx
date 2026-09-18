"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CustomBoxPage() {
  const [selectedFabric, setSelectedFabric] = useState<string>("Premium Shirting");
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const accessories = ["Tie", "Pocket Square", "Cufflinks"];
  const fabrics = ["Premium Shirting", "Luxury Suiting", "Brocade Silk"];

  const handleAccessoryToggle = (item: string) => {
    setSelectedAccessories(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const getWhatsAppLink = () => {
    const text = `Hello Fashion Look, I'd like to configure a custom gift box.\n\nFabric: ${selectedFabric}\nAccessories: ${selectedAccessories.length ? selectedAccessories.join(", ") : "None"}\nMessage: ${message || "None"}`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-atelier pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 text-center">
          <p className="font-sans text-gold text-sm tracking-[0.2em] uppercase mb-4">
            Made Personal
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-wide">
            Build Your Box
          </h1>
          <div className="mt-8 h-px w-24 bg-gold mx-auto opacity-30" />
        </header>

        <div className="grid lg:grid-cols-2 gap-12 bg-atelier-soft border border-white/5 p-8 md:p-12 rounded-sm shadow-2xl">
          <div className="space-y-10">
            {/* Step 1: Fabric */}
            <div>
              <h3 className="font-serif text-xl text-ivory mb-4 tracking-wide uppercase">01. Select Fabric</h3>
              <div className="space-y-2">
                {fabrics.map((fabric) => (
                  <button
                    key={fabric}
                    onClick={() => setSelectedFabric(fabric)}
                    className={`w-full text-left px-4 py-3 border font-sans text-sm tracking-wider uppercase transition-colors ${
                      selectedFabric === fabric
                        ? "border-gold text-gold bg-gold/5"
                        : "border-white/10 text-ivory/70 hover:border-white/30"
                    }`}
                  >
                    {fabric}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Accessories */}
            <div>
              <h3 className="font-serif text-xl text-ivory mb-4 tracking-wide uppercase">02. Add Accessories</h3>
              <div className="space-y-2">
                {accessories.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleAccessoryToggle(item)}
                    className={`w-full text-left px-4 py-3 border font-sans text-sm tracking-wider uppercase transition-colors ${
                      selectedAccessories.includes(item)
                        ? "border-gold text-gold bg-gold/5"
                        : "border-white/10 text-ivory/70 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item}</span>
                      <div className={`w-4 h-4 border ${selectedAccessories.includes(item) ? "bg-gold border-gold" : "border-white/30"}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Message */}
            <div>
              <h3 className="font-serif text-xl text-ivory mb-4 tracking-wide uppercase">03. Personalized Message</h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter a message for the recipient..."
                className="w-full h-32 bg-transparent border border-white/10 text-ivory p-4 font-sans focus:border-gold outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-12">
            <div className="relative aspect-square w-full mb-8 rounded-sm overflow-hidden opacity-80">
               <Image
                 src="/images/gift-boxes/gift-box.jpg"
                 alt="Custom Box Preview"
                 fill
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-atelier/80 to-transparent flex items-end p-6">
                 <div>
                   <p className="font-sans text-gold text-xs tracking-widest uppercase mb-1">Your Configuration</p>
                   <p className="font-serif text-xl text-ivory">{selectedFabric}</p>
                   {selectedAccessories.length > 0 && (
                     <p className="font-sans text-sm text-ivory/70 mt-1">+ {selectedAccessories.join(", ")}</p>
                   )}
                 </div>
               </div>
            </div>

            <div className="mt-auto">
              <Button asChild className="w-full bg-gold hover:bg-gold-light text-atelier font-sans tracking-widest uppercase rounded-none px-8 py-6">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  Confirm Box via WhatsApp →
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
