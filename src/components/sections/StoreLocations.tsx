'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function StoreLocations() {
  const t = useTranslations('Stores');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stores = [
    {
      key: 'seawoods',
      image: "/images/media_1789384474296.png",
      phone: "+91 7738876404",
      mapsLink: "https://maps.app.goo.gl/wY4L4UaD1Zf9Fh3N6"
    }
  ];

  return (
    <section id="locations" className="py-24 md:py-32 bg-[#0A0A0A] text-ivory relative" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">{t('sectionTop')}</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-wider uppercase">{t('sectionTitle')}</h2>
          <div className="w-16 h-px bg-gold/50 mx-auto mt-8" />
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {stores.map((store, i) => (
            <motion.div
              key={store.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="border border-ivory/5 bg-atelier-soft overflow-hidden hover:border-gold/20 transition-all duration-500 grid grid-cols-1 md:grid-cols-2"
            >
              {/* Store Image */}
              <div className="h-64 md:h-full w-full bg-atelier-dark relative overflow-hidden group min-h-[300px]">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image
                  src={store.image}
                  alt={t(`items.${store.key}.name`)}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Content Side */}
              <div className="w-full p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <h3 className="text-3xl font-serif mb-8 text-gold uppercase tracking-wide">
                  {t(`items.${store.key}.name`)}
                </h3>

                <div className="space-y-6 flex-grow">
                  <div className="flex items-start gap-4 text-ivory/70">
                    <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <p className="text-sm font-light leading-relaxed">
                      {t(`items.${store.key}.address`)}
                    </p>
                  </div>

                  <div className="flex items-start gap-4 text-ivory/70">
                    <Clock className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <p className="text-sm font-light">
                      {t(`items.${store.key}.hours`)}
                    </p>
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <a
                    href={store.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-white/20 text-xs tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Direction
                  </a>
                  <a
                    href={`tel:${store.phone.replace(/[^0-9+]/g, '')}`}
                    className="px-6 py-3 bg-gold text-black text-xs tracking-[0.2em] font-medium uppercase hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {t('callButton')}
                  </a>
                  <a
                    href={`https://wa.me/${store.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-white/20 text-xs tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2"
                  >
                    {t('whatsappButton')}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="border border-ivory/5 bg-atelier-soft overflow-hidden hidden lg:block relative h-full min-h-[400px]"
          >
            <Image
              src="/images/storeimage.png"
              alt="Fashion Look Storefront"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
