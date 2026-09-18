'use client';

import { useState } from 'react';

const GARMENTS = [
  { id: '2piece', name: 'Two-Piece Formal Suit', stitch: 7500, fabric: 3.0, extraFabric: 0 },
  { id: '3piece', name: 'Three-Piece Suit', stitch: 9500, fabric: 3.0, extraFabric: 0.5 },
  { id: 'tuxedo', name: 'Premium Tuxedo', stitch: 12000, fabric: 3.0, extraFabric: 0 },
  { id: 'sherwani', name: 'Royal Groom Sherwani', stitch: 15000, fabric: 3.5, extraFabric: 0 },
  { id: 'pathani', name: 'Classic Pathani', stitch: 3500, fabric: 4.5, extraFabric: 0 },
  { id: 'safari', name: 'Executive Safari Suit', stitch: 4500, fabric: 3.0, extraFabric: 0 },
];

const SILHOUETTES = [
  { id: 'slim', name: 'Slim Fit - Modern & Tapered', extraFabric: 0 },
  { id: 'regular', name: 'Regular Fit - Classic Comfort', extraFabric: 0.2 },
  { id: 'relaxed', name: 'Relaxed Fit - Traditional Drape', extraFabric: 0.5 },
];

const FABRIC_TIERS = [
  { id: 'premium', name: 'Premium House Blends', pricePerM: 800, desc: 'Durable, wrinkle-resistant everyday luxury' },
  { id: 'luxury', name: 'Luxury Italian Wool', pricePerM: 2500, desc: 'Super 120s fine wool for exquisite drape' },
  { id: 'bespoke', name: 'Bespoke Silk/Cashmere', pricePerM: 6500, desc: 'The ultimate statement in tailoring' },
];

export default function Calculator() {
  const [garment, setGarment] = useState(GARMENTS[0]);
  const [silhouette, setSilhouette] = useState(SILHOUETTES[0]);
  const [tier, setTier] = useState(FABRIC_TIERS[0]);

  const totalFabric = garment.fabric + garment.extraFabric + silhouette.extraFabric;
  const fabricCost = Math.round(totalFabric * tier.pricePerM);
  const totalCost = garment.stitch + fabricCost;

  const handleWhatsApp = () => {
    const text = `Hello Fashion Look! I would like a quote for:\n\n` +
      `🔹 Garment: ${garment.name}\n` +
      `🔹 Silhouette: ${silhouette.name}\n` +
      `🔹 Fabric Tier: ${tier.name}\n` +
      `\nEstimated Total: ₹${totalCost.toLocaleString('en-IN')}`;
    
    window.open(`https://wa.me/919930724040?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
      
      {/* SELECTIONS */}
      <div className="lg:col-span-2 space-y-12">
        {/* Garment */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-widest text-gold uppercase">1. Select Garment</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {GARMENTS.map(g => (
              <button 
                key={g.id}
                onClick={() => setGarment(g)}
                className={`p-4 border text-left transition-all duration-300 ${garment.id === g.id ? 'border-gold bg-gold/5' : 'border-atelier-soft hover:border-gold/50'}`}
              >
                <div className="font-serif text-lg text-foreground">{g.name}</div>
                <div className="text-xs text-foreground/50 mt-2">Stitching: ₹{g.stitch.toLocaleString('en-IN')}</div>
                <div className="text-xs text-foreground/50">Base Fabric: {g.fabric}m</div>
              </button>
            ))}
          </div>
        </div>

        {/* Silhouette */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-widest text-gold uppercase">2. Select Silhouette</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SILHOUETTES.map(s => (
              <button 
                key={s.id}
                onClick={() => setSilhouette(s)}
                className={`p-4 border text-left transition-all duration-300 ${silhouette.id === s.id ? 'border-gold bg-gold/5' : 'border-atelier-soft hover:border-gold/50'}`}
              >
                <div className="font-serif text-lg text-foreground">{s.name.split(' - ')[0]}</div>
                <div className="text-xs text-foreground/50 mt-2">{s.name.split(' - ')[1]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Fabric Tier */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-widest text-gold uppercase">3. Select Fabric Tier</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FABRIC_TIERS.map(t => (
              <button 
                key={t.id}
                onClick={() => setTier(t)}
                className={`p-4 border text-left transition-all duration-300 ${tier.id === t.id ? 'border-gold bg-gold/5' : 'border-atelier-soft hover:border-gold/50'}`}
              >
                <div className="font-serif text-lg text-foreground">{t.name}</div>
                <div className="text-gold mt-1 text-sm">₹{t.pricePerM.toLocaleString('en-IN')} / m</div>
                <div className="text-xs text-foreground/50 mt-2">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* QUOTE SUMMARY */}
      <div className="relative">
        <div className="sticky top-32 p-8 border border-gold/30 bg-atelier shadow-2xl">
          <h3 className="text-2xl font-serif text-gold mb-6 uppercase tracking-widest border-b border-gold/20 pb-4">Estimated Investment</h3>
          
          <div className="space-y-4 mb-8 text-sm">
            <div className="flex justify-between items-start">
              <span className="text-foreground/70">Garment</span>
              <span className="text-right text-foreground font-medium max-w-[60%]">{garment.name}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-foreground/70">Silhouette</span>
              <span className="text-right text-foreground font-medium max-w-[60%]">{silhouette.name.split(' - ')[0]}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-foreground/70">Fabric Quality</span>
              <span className="text-right text-foreground font-medium max-w-[60%]">{tier.name}</span>
            </div>
            <div className="pt-4 border-t border-atelier-soft mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-foreground/70">Stitching Cost</span>
                <span className="text-foreground">₹{garment.stitch.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/70">Fabric Cost ({totalFabric}m)</span>
                <span className="text-foreground">₹{fabricCost.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gold/30 pt-6 mb-8">
            <div className="flex justify-between items-end">
              <span className="text-sm tracking-widest uppercase text-foreground/70">Total Estimate</span>
              <span className="text-3xl font-serif text-gold">₹{totalCost.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-foreground/40 mt-2 text-right">*Final price determined after physical measurement</p>
          </div>

          <button 
            onClick={handleWhatsApp}
            className="w-full py-4 bg-gold text-atelier-dark font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors"
          >
            Consult Master Tailor
          </button>
        </div>
      </div>
    </div>
  );
}
