'use client';

import { motion } from 'framer-motion';
import { MessageCircle, MapPin, Gift, Clock, CheckCircle } from 'lucide-react';
import { openWhatsApp } from '@/lib/analytics';

const STEPS = [
  {
    icon: MessageCircle,
    step: '01',
    title: 'WhatsApp to Book',
    desc: 'Send us a message with your preferred date and garment type. We confirm your slot within 2 hours.',
  },
  {
    icon: MapPin,
    step: '02',
    title: 'Tailor Visits You',
    desc: 'Your master tailor arrives at your home or office across Navi Mumbai — with our full fabric swatch collection.',
  },
  {
    icon: Gift,
    step: '03',
    title: 'Delivered to Your Door',
    desc: 'After a basted fitting at our Seawoods atelier, your finished garment is hand-delivered. No errands, no hassle.',
  },
];

const COVERAGE = [
  'Seawoods', 'Kharghar', 'Vashi', 'Nerul',
  'Panvel', 'CBD Belapur', 'Airoli', 'Kopar Khairane',
  'Sanpada', 'Ulwe',
];

export default function HomeVisitSection() {
  return (
    <section id="home-visit" className="py-24 md:py-32 bg-[#0A0A0A] border-y border-ivory/5">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">Complimentary Service</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-wider uppercase">
            The Atelier Comes to You
          </h2>
          <div className="w-16 h-px bg-gold/50 mx-auto mt-8" />
          <p className="text-sm text-ivory/50 mt-8 max-w-xl mx-auto font-light leading-relaxed">
            No need to travel. Our master tailors bring the full Fashion Look experience — 
            fabric swatches, consultation, and precision measurement — directly to your home or office 
            across Navi Mumbai. <span className="text-gold">No additional fee.</span>
          </p>
        </motion.div>

        {/* 3-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-20 max-w-5xl mx-auto">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="relative text-center p-8 border border-ivory/5 bg-atelier-soft hover:border-gold/20 transition-colors duration-500"
              >
                {/* Step number */}
                <div className="absolute top-6 right-8 text-4xl font-serif text-gold/8 leading-none select-none">
                  {step.step}
                </div>

                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                  <Icon size={20} className="text-gold" />
                </div>
                <h3 className="text-lg font-serif uppercase tracking-wide mb-3">{step.title}</h3>
                <p className="text-sm text-ivory/50 font-light leading-relaxed">{step.desc}</p>

                {/* Connector line (between cards on desktop) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gold/20 z-10" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Coverage Area + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto border border-ivory/5 bg-atelier-soft p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Coverage */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <MapPin size={14} className="text-gold" />
                <p className="text-xs tracking-[0.3em] uppercase text-gold">Coverage Area</p>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {COVERAGE.map((area) => (
                  <div key={area} className="flex items-center gap-2">
                    <CheckCircle size={11} className="text-gold/60 flex-shrink-0" />
                    <span className="text-xs text-ivory/60 font-light">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Key details + CTA */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 p-4 border border-gold/10 bg-gold/3">
                <Clock size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-ivory/70 font-light">Typical visit duration</p>
                  <p className="text-sm text-ivory mt-0.5">45 – 60 minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 border border-gold/10">
                <Gift size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-ivory/70 font-light">Home visit fee</p>
                  <p className="text-sm text-gold font-medium mt-0.5">Complimentary</p>
                </div>
              </div>
              <button
                onClick={() => openWhatsApp("https://wa.me/918108014945?text=Hi%20Fashion%20Look!%20I%20would%20like%20to%20book%20a%20home%20visit%20for%20bespoke%20tailoring.", 'whatsapp_cta_homevisit')}
                className="mt-2 px-6 py-4 bg-gold text-black text-xs tracking-widest font-semibold uppercase text-center hover:bg-gold-light transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Book a Home Visit <span>→</span>
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
