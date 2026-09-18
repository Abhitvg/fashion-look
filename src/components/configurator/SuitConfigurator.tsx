"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const fabrics = [
  { id: "navy", name: "Midnight Navy", color: "#1a2238" },
  { id: "charcoal", name: "Charcoal Grey", color: "#36454F" },
  { id: "burgundy", name: "Deep Burgundy", color: "#4A0404" },
  { id: "olive", name: "Olive Green", color: "#4B5320" },
];

const lapels = [
  { id: "notch", name: "Notch Lapel" },
  { id: "peak", name: "Peak Lapel" },
  { id: "shawl", name: "Shawl Collar" },
];

const buttons = [
  { id: "two", name: "Two Button" },
  { id: "three", name: "Three Button" },
  { id: "double", name: "Double Breasted" },
];

export function SuitConfigurator() {
  const [fabric, setFabric] = useState(fabrics[0]);
  const [lapel, setLapel] = useState(lapels[0]);
  const [buttonStyle, setButtonStyle] = useState(buttons[0]);

  return (
    <section className="py-24 bg-atelier border-t border-gold/10 overflow-hidden" id="configurator">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
            Bespoke Studio
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-ivory">
            Design Your Suit
          </h3>
          <p className="text-ivory/70 mt-4 max-w-xl mx-auto">
            Experience our tailoring possibilities. Select your preferred fabric, lapel, and styling.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Visualizer (Left) */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-[300px] h-[500px] md:w-[400px] md:h-[600px] bg-atelier-soft border border-gold/10 p-8">
              {/* Silhouette Placeholder - In production, this would use absolute positioned transparent PNG layers */}
              <div 
                className="w-full h-full relative transition-colors duration-700 ease-in-out"
                style={{ backgroundColor: fabric.color }}
              >
                <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('/images/suits/suit-formal.jpg')] bg-cover bg-center" />
                <div className="absolute inset-x-0 top-1/3 text-center mix-blend-difference text-ivory/80 font-serif text-lg uppercase tracking-widest border-y border-ivory/20 py-4 px-2 bg-black/40 backdrop-blur-sm">
                  {fabric.name} <br/>
                  <span className="text-sm font-sans normal-case tracking-normal opacity-80 mt-2 block">{lapel.name} • {buttonStyle.name}</span>
                </div>
                
                {/* Visual indicator of lapel choice */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-48 border-b-2 border-ivory/30 flex justify-between">
                  <div className={`w-12 h-full border-r border-ivory/30 transition-all ${lapel.id === 'peak' ? '-rotate-12 transform origin-top-right' : ''} ${lapel.id === 'shawl' ? 'rounded-br-full' : ''}`} />
                  <div className={`w-12 h-full border-l border-ivory/30 transition-all ${lapel.id === 'peak' ? 'rotate-12 transform origin-top-left' : ''} ${lapel.id === 'shawl' ? 'rounded-bl-full' : ''}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Controls (Right) */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div>
              <h4 className="text-ivory font-serif text-2xl mb-6 flex items-center justify-between border-b border-gold/10 pb-4">
                <span>01. Fabric</span>
                <span className="text-gold text-sm font-sans tracking-widest uppercase">{fabric.name}</span>
              </h4>
              <div className="flex gap-4">
                {fabrics.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFabric(f)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${fabric.id === f.id ? 'border-gold scale-110' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: f.color }}
                    aria-label={f.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-ivory font-serif text-2xl mb-6 flex items-center justify-between border-b border-gold/10 pb-4">
                <span>02. Lapel</span>
                <span className="text-gold text-sm font-sans tracking-widest uppercase">{lapel.name}</span>
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {lapels.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setLapel(l)}
                    className={`py-3 px-4 border text-sm transition-colors ${lapel.id === l.id ? 'border-gold bg-gold/10 text-gold' : 'border-gold/20 text-ivory/60 hover:border-gold/50'}`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-ivory font-serif text-2xl mb-6 flex items-center justify-between border-b border-gold/10 pb-4">
                <span>03. Style</span>
                <span className="text-gold text-sm font-sans tracking-widest uppercase">{buttonStyle.name}</span>
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {buttons.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setButtonStyle(b)}
                    className={`py-3 px-4 border text-sm transition-colors ${buttonStyle.id === b.id ? 'border-gold bg-gold/10 text-gold' : 'border-gold/20 text-ivory/60 hover:border-gold/50'}`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Button size="lg" className="w-full">
                Bring this design to life
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
