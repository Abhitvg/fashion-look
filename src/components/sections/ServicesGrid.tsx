'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { openWhatsApp } from '@/lib/analytics';

const services = [
  {
    id: "formalSuit",
    image: "/images/services/formal_suit_premium_1790074047608.jpg",
    key: "formalSuit"
  },
  {
    id: "sherwani",
    image: "/images/services/sherwani_premium_1790074071073.jpg",
    key: "sherwani"
  },
  {
    id: "tuxedo",
    image: "/images/services/tuxedo_premium_1790074100036.jpg",
    key: "tuxedo"
  },
  {
    id: "pathani",
    image: "/images/services/pathani_premium_1790074118250.jpg",
    key: "pathani"
  },
  {
    id: "safari",
    image: "/images/services/safari_premium_1790074235825.jpg",
    key: "safari"
  },
  {
    id: "gifting",
    image: "/images/services/gifting_premium_1790074250010.jpg",
    key: "gifting"
  }
];

export default function ServicesGrid() {
  const t = useTranslations('Services');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-[#0A0A0A] text-ivory relative" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">{t('sectionTop')}</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-wider uppercase">{t('sectionTitle')}</h2>
          <div className="w-16 h-px bg-gold/50 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col h-full bg-[#111] border border-white/5 group hover:border-gold/30 transition-colors duration-500"
            >
              <div className="relative h-[400px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image
                  src={service.image}
                  alt={t(`items.${service.key}.title`)}
                  fill
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif mb-4 uppercase tracking-wide group-hover:text-gold transition-colors duration-300">
                  {t(`items.${service.key}.title`)}
                </h3>
                <p className="text-sm text-ivory/60 leading-relaxed mb-8 flex-grow font-light">
                  {t(`items.${service.key}.desc`)}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                  <div>
                    <p className="text-[10px] text-ivory/40 uppercase tracking-widest mb-1">{t('fromPrice')}</p>
                    <p className="text-lg text-gold">{t(`items.${service.key}.price`)} <span className="text-[10px] text-ivory/30 align-top">*</span></p>
                    <p className="text-[9px] text-ivory/25 mt-1 font-light tracking-wide">*Final price after measurement</p>
                  </div>
                  
                  <button 
                    onClick={() => openWhatsApp(`https://wa.me/918108014945?text=Hello%20Fashion%20Look!%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(t(`items.${service.key}.title`))}`, 'whatsapp_cta_service')}
                    className="text-xs uppercase tracking-widest text-ivory hover:text-gold transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    {t('enquireNow')} <span className="text-gold">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
