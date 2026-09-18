"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type GarmentType = "Suit" | "Shirt" | "Trouser" | "Sherwani" | "Waistcoat";

const GARMENT_ESTIMATES: Record<GarmentType, { fabricMeters: number, costPerMeter: number, stitchingCost: number }> = {
  "Suit": { fabricMeters: 3.5, costPerMeter: 3500, stitchingCost: 12000 },
  "Shirt": { fabricMeters: 1.6, costPerMeter: 1200, stitchingCost: 1500 },
  "Trouser": { fabricMeters: 1.3, costPerMeter: 1500, stitchingCost: 1800 },
  "Sherwani": { fabricMeters: 4.5, costPerMeter: 5000, stitchingCost: 18000 },
  "Waistcoat": { fabricMeters: 1.2, costPerMeter: 2000, stitchingCost: 3500 },
};

export default function FabricCalculatorPage() {
  const [garment, setGarment] = useState<GarmentType>("Suit");
  const [quantity, setQuantity] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const estimate = GARMENT_ESTIMATES[garment];
  const totalFabric = estimate.fabricMeters * quantity;
  const fabricCost = totalFabric * estimate.costPerMeter;
  const totalStitchingCost = estimate.stitchingCost * quantity;
  const totalCost = fabricCost + totalStitchingCost;

  return (
    <div className="min-h-screen bg-atelier pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <p className="font-sans text-gold text-sm tracking-[0.2em] uppercase mb-4">
            Bespoke Planning
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-wide">
            Fabric Calculator
          </h1>
          <div className="mt-8 h-px w-24 bg-gold mx-auto opacity-30" />
        </header>

        <div className="grid md:grid-cols-2 gap-12 bg-atelier-soft border border-white/5 p-8 md:p-12 rounded-sm shadow-2xl">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-sans tracking-widest text-muted uppercase mb-4">Select Garment</label>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(GARMENT_ESTIMATES) as GarmentType[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => { setGarment(g); setShowResult(false); }}
                    className={`px-4 py-3 border text-sm tracking-wider uppercase transition-colors ${
                      garment === g
                        ? "border-gold text-gold bg-gold/5"
                        : "border-white/10 text-ivory/70 hover:border-white/30"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-sans tracking-widest text-muted uppercase mb-4">Quantity</label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => { setQuantity(parseInt(e.target.value) || 1); setShowResult(false); }}
                className="bg-transparent border-white/10 text-ivory rounded-none focus:border-gold"
              />
            </div>

            <Button
              onClick={() => setShowResult(true)}
              className="w-full bg-gold hover:bg-gold-light text-atelier py-6 font-sans tracking-widest uppercase rounded-none"
            >
              Calculate Estimate
            </Button>
          </div>

          <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-12">
            {showResult ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <p className="text-sm tracking-widest text-muted uppercase mb-1">Estimated Fabric</p>
                  <p className="font-serif text-3xl text-ivory">{totalFabric.toFixed(1)} Meters</p>
                </div>
                
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <div className="flex justify-between text-sm tracking-wider text-ivory/70">
                    <span>Fabric Estimate</span>
                    <span>₹{fabricCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm tracking-wider text-ivory/70">
                    <span>Stitching Estimate</span>
                    <span>₹{totalStitchingCost.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm tracking-widest text-muted uppercase mb-1">Estimated Sartorial Cost</p>
                  <p className="font-serif text-4xl text-gold">₹{totalCost.toLocaleString()}</p>
                </div>

                <div className="bg-brand-red/10 border border-brand-red/20 p-4 rounded-sm mt-6">
                  <p className="text-ivory/50 text-xs italic mt-6 leading-relaxed">
                    *Prices shown are indicative estimates. Final pricing may vary based on fabric selection, measurements, design, embroidery, accessories, customization and other requirements. Please confirm the final price with Fashion Look.
                  </p>
                </div>
                
                <div className="border-t border-gold/10 p-8 text-center bg-atelier">
                  <p className="text-ivory/60 text-sm mb-4">Would you like to proceed with these requirements?</p>
                  <Button asChild className="w-full bg-gold hover:bg-gold-light text-atelier font-sans tracking-widest uppercase rounded-none">
                  <a href={`https://wa.me/918108014945?text=Hello%20Fashion%20Look,%20I%20used%20the%20fabric%20calculator%20for%20${quantity}%20${garment}(s)%20and%20would%20like%20to%20inquire%20about%20the%20estimated%20cost.`} target="_blank" rel="noopener noreferrer">
                    INQUIRE ON WHATSAPP →
                  </a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center">
                  <span className="font-serif text-2xl text-ivory">?</span>
                </div>
                <p className="text-sm tracking-widest text-ivory uppercase">
                  Select options to calculate
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
