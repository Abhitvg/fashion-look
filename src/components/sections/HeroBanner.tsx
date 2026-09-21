'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroBanner() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const text = 'Hello Fashion Look! I would like to book a consultation for bespoke tailoring.';
    window.open(`https://wa.me/918108014945?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero/atelier.jpg"
        alt="Fashion Look Bespoke Tailoring Atelier"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-[1]" />
      
      {/* Gold Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] z-[2]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-gold/80 mb-6 font-sans">
            Established 1998 · Navi Mumbai
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-ivory uppercase tracking-wider leading-[1.1] mb-4 flex flex-col sm:flex-row items-center justify-center gap-x-4 sm:gap-x-6">
            <span>Fashion</span>
            <span className="text-gold">Look</span>
          </h1>
          <div className="h-px w-20 bg-gold/60 mx-auto my-8" />
          <p className="text-sm text-ivory/50 tracking-widest max-w-lg mx-auto mb-12 font-light leading-relaxed normal-case">
            Premium bespoke tailoring for the modern Indian gentleman. Suits, sherwanis, and luxury fabric gifting — crafted with precision, fitted to perfection.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleWhatsApp}
            className="px-10 py-4 bg-gold text-black font-semibold text-sm tracking-widest uppercase hover:bg-gold-light transition-all duration-300 min-w-[240px]"
          >
            Book Appointment
          </button>
          <button
            onClick={scrollToServices}
            className="px-10 py-4 border border-ivory/30 text-ivory font-light text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-300 min-w-[240px]"
          >
            Explore Services
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        onClick={scrollToServices}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-2">Scroll</span>
        <ChevronDown size={18} className="text-gold/60" />
      </motion.div>
    </section>
  );
}
