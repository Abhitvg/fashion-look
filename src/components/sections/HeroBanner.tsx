'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HERO_IMAGES = [
  '/images/hero/hero2.png',
  '/images/hero/hero3.png',
  '/images/hero/2868b5f6-1e83-429d-88e4-672483668930.png'
];

export default function HeroBanner() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const text = 'Hello Fashion Look! I would like to book a consultation for bespoke tailoring.';
    window.open(`https://wa.me/918108014945?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="hero" className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-black">
      {/* Background Image Carousel */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={HERO_IMAGES[currentImage]}
            alt="Fashion Look Bespoke Tailoring Atelier"
            fill
            priority
            className="object-cover object-center md:object-[60%_50%]"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      {/* Dark gradient from left for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-[1] w-full md:w-3/4" />
      {/* Overall subtle darkening */}
      <div className="absolute inset-0 bg-black/20 z-[1]" />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 h-full flex flex-col justify-center">
        
        {/* Main Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-xl pt-20"
        >
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-gold mb-6 font-sans">
            Established 1998 · Navi Mumbai
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-ivory uppercase tracking-widest leading-[1.1] mb-2 flex flex-col">
            <span>Fashion</span>
            <span className="text-gold">Look</span>
          </h1>
          
          <div className="h-px w-24 bg-gold/60 my-8" />
          
          <p className="text-base md:text-xl text-ivory tracking-[0.3em] uppercase font-light mb-6">
            Cloth & Stitching
          </p>
          
          <p className="text-sm md:text-base text-ivory/70 tracking-wider max-w-md mb-12 font-light leading-relaxed normal-case">
            Premium bespoke tailoring for the modern Indian gentleman.<br />
            Suits, sherwanis, and luxury fabric gifting —<br />
            crafted with precision, fitted to perfection.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <button
              onClick={handleWhatsApp}
              className="px-8 py-4 bg-gold text-black font-semibold text-xs tracking-widest uppercase hover:bg-gold-light transition-all duration-300 flex items-center gap-2"
            >
              Book Appointment <span>→</span>
            </button>
            <button
              onClick={scrollToServices}
              className="px-8 py-4 border border-ivory/30 text-ivory font-light text-xs tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-300"
            >
              Explore Services
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements (Visible on lg screens) */}
      <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none container mx-auto">
        {/* Top Middle Floating Box */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-1/4 left-[40%]"
        >
          <div className="text-center">
            <h3 className="text-lg tracking-[0.2em] text-gold font-serif mb-6 uppercase leading-relaxed">
              A Well<br />Tailored Life
            </h3>
            <div className="text-[10px] tracking-[0.2em] text-gold/60 uppercase">
              Fashion Look<br />Since 1998
            </div>
          </div>
        </motion.div>

        {/* Right Side Floating Text */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute right-8 top-1/3 flex flex-col items-start gap-12"
        >
          <div className="text-ivory">
            <h3 className="text-sm tracking-[0.3em] font-serif uppercase leading-[2]">
              Tradition<br />Meets<br />Modern<br />Style
            </h3>
          </div>
          
          <div className="w-8 h-px bg-gold/50" />
          
          <div className="text-ivory/60">
            <p className="text-[10px] tracking-[0.2em] uppercase leading-[2]">
              Custom Fit<br />Timeless<br />Elegance
            </p>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
