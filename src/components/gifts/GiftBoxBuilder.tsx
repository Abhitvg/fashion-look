'use client';

import { useState } from 'react';
import GiftBoxScene from '@/components/3d/GiftBoxScene';

const BOXES = [
  { id: 'matte', name: 'Premium Matte Black Box', price: 500, desc: 'Sleek, minimalist matte finish with subtle branding' },
  { id: 'velvet', name: 'Royal Velvet Box', price: 1200, desc: 'Luxurious velvet exterior with satin interior lining' },
  { id: 'wood', name: 'Handcrafted Wooden Chest', price: 2500, desc: 'Artisan carved walnut wood with brass fittings' },
];

const FABRICS = [
  { id: 'shirting', name: 'Premium Shirting Collection', detail: '2.5m Egyptian Cotton', price: 2000 },
  { id: 'suiting', name: 'Executive Suiting Combo', detail: '3m Super 120s Wool + 2.5m Cotton', price: 5500 },
  { id: 'bespoke', name: 'Bespoke Tuxedo Fabric Set', detail: '3m Italian Velvet + 2.5m Silk', price: 12000 },
];

const ACCESSORIES = [
  { id: 'none', name: 'No Accessories', price: 0 },
  { id: 'cufflinks', name: 'Silver Cufflinks', price: 800 },
  { id: 'tie', name: 'Silk Tie & Pocket Square', price: 1500 },
  { id: 'full', name: 'Full Accessory Set', price: 2500 },
];

const MESSAGES = [
  { id: 'standard', name: 'Standard Gift Tag', price: 0 },
  { id: 'custom', name: 'Custom Handwritten Note', price: 50 },
];

export default function GiftBoxBuilder() {
  const [step, setStep] = useState(1);
  const [box, setBox] = useState(BOXES[0]);
  const [fabric, setFabric] = useState(FABRICS[0]);
  const [accessory, setAccessory] = useState(ACCESSORIES[0]);
  const [message, setMessage] = useState(MESSAGES[0]);
  const [qty, setQty] = useState(1);

  const unitPrice = box.price + fabric.price + accessory.price + message.price;
  const total = unitPrice * qty;

  const handleWhatsApp = () => {
    const text = `Hello Fashion Look! I would like to order a custom gift box:\n\n` +
      `📦 Box: ${box.name}\n` +
      `🧵 Fabric: ${fabric.name} (${fabric.detail})\n` +
      `✨ Accessory: ${accessory.name}\n` +
      `💌 Message: ${message.name}\n` +
      `📊 Quantity: ${qty}\n\n` +
      `Total Estimate: ₹${total.toLocaleString('en-IN')}`;
    
    window.open(`https://wa.me/919930724040?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
      
      {/* BUILDER STEPS */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Step Indicator */}
        <div className="flex border-b border-atelier-soft mb-8">
          {[1, 2, 3, 4].map(s => (
            <button 
              key={s} 
              onClick={() => setStep(s)}
              className={`flex-1 py-4 text-center text-sm font-semibold tracking-widest uppercase transition-colors ${step === s ? 'text-gold border-b-2 border-gold' : 'text-foreground/50 hover:text-foreground/80'}`}
            >
              Step {s}
            </button>
          ))}
        </div>

        {/* Step 1: Box */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-serif text-foreground mb-6">Select Your Box</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BOXES.map(b => (
                <button 
                  key={b.id} onClick={() => { setBox(b); setTimeout(() => setStep(2), 300); }}
                  className={`p-6 border text-left transition-all duration-300 ${box.id === b.id ? 'border-gold bg-gold/5' : 'border-atelier-soft hover:border-gold/50'}`}
                >
                  <div className="font-serif text-lg text-foreground">{b.name}</div>
                  <div className="text-gold mt-1 text-sm">+₹{b.price.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-foreground/50 mt-4">{b.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Fabric */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-serif text-foreground mb-6">Select Fabric Collection</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FABRICS.map(f => (
                <button 
                  key={f.id} onClick={() => { setFabric(f); setTimeout(() => setStep(3), 300); }}
                  className={`p-6 border text-left transition-all duration-300 ${fabric.id === f.id ? 'border-gold bg-gold/5' : 'border-atelier-soft hover:border-gold/50'}`}
                >
                  <div className="font-serif text-lg text-foreground">{f.name}</div>
                  <div className="text-gold mt-1 text-sm">+₹{f.price.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-foreground/50 mt-4">{f.detail}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Accessories */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-serif text-foreground mb-6">Add Accessories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACCESSORIES.map(a => (
                <button 
                  key={a.id} onClick={() => { setAccessory(a); setTimeout(() => setStep(4), 300); }}
                  className={`p-6 border text-left transition-all duration-300 ${accessory.id === a.id ? 'border-gold bg-gold/5' : 'border-atelier-soft hover:border-gold/50'}`}
                >
                  <div className="font-serif text-lg text-foreground">{a.name}</div>
                  <div className="text-gold mt-1 text-sm">+{a.price === 0 ? 'Included' : `₹${a.price.toLocaleString('en-IN')}`}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Message */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-serif text-foreground mb-6">Personalize Note</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MESSAGES.map(m => (
                <button 
                  key={m.id} onClick={() => setMessage(m)}
                  className={`p-6 border text-left transition-all duration-300 ${message.id === m.id ? 'border-gold bg-gold/5' : 'border-atelier-soft hover:border-gold/50'}`}
                >
                  <div className="font-serif text-lg text-foreground">{m.name}</div>
                  <div className="text-gold mt-1 text-sm">+{m.price === 0 ? 'Included' : `₹${m.price.toLocaleString('en-IN')}`}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SUMMARY */}
      <div className="relative">
        <div className="sticky top-32 p-8 border border-gold/30 bg-atelier shadow-2xl">
          <h3 className="text-2xl font-serif text-gold mb-6 uppercase tracking-widest border-b border-gold/20 pb-4">Your Box</h3>
          
          {/* 3D Preview */}
          <div className="w-full h-64 bg-atelier-dark mb-8 rounded-sm flex items-center justify-center border border-atelier-soft/50 relative overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent transition-opacity duration-1000"></div>
             <GiftBoxScene boxType={box.id} />
          </div>

          <div className="space-y-4 mb-8 text-sm">
            <div className="flex justify-between items-start">
              <span className="text-foreground/70">Box</span>
              <span className="text-right text-foreground font-medium max-w-[60%]">{box.name}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-foreground/70">Fabric</span>
              <span className="text-right text-foreground font-medium max-w-[60%]">{fabric.name}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-foreground/70">Accessory</span>
              <span className="text-right text-foreground font-medium max-w-[60%]">{accessory.name}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-foreground/70">Message</span>
              <span className="text-right text-foreground font-medium max-w-[60%]">{message.name}</span>
            </div>
          </div>

          <div className="border-t border-gold/30 pt-6 mb-8">
            
            <div className="flex justify-between items-center mb-6">
               <span className="text-sm tracking-widest uppercase text-foreground/70">Quantity</span>
               <div className="flex items-center space-x-4">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-full border border-atelier-soft flex items-center justify-center hover:border-gold transition-colors">-</button>
                  <span className="text-lg font-serif">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-full border border-atelier-soft flex items-center justify-center hover:border-gold transition-colors">+</button>
               </div>
            </div>

            <div className="flex justify-between items-end">
              <span className="text-sm tracking-widest uppercase text-foreground/70">Total</span>
              <span className="text-3xl font-serif text-gold">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button 
            onClick={handleWhatsApp}
            className="w-full py-4 bg-gold text-atelier-dark font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors"
          >
            Order Gift Box
          </button>
        </div>
      </div>
    </div>
  );
}
