'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';

const STORES = [
  {
    name: 'Seawoods Atelier',
    address: 'Shop No. 5, Fashion Look, Plot No. 144, Seawoods West, Sector 44, Seawoods, Navi Mumbai, Maharashtra 400706',
    phone: '+91 8108014945',
    hours: 'Mon–Sat: 10:00 AM – 9:00 PM · Sun: 11:00 AM – 7:00 PM',
    whatsapp: '918108014945',
    mapUrl: 'https://maps.app.goo.gl/scL6gQtQSfXqwwfy5?g_st=ia',
  }
];

export default function StoreLocations() {
  return (
    <section id="locations" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">Visit Us</p>
          <h2 className="text-3xl md:text-4xl font-serif text-ivory tracking-wider uppercase">
            Our Stores
          </h2>
          <div className="h-px w-16 bg-gold/40 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {STORES.map((store, i) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="border border-ivory/5 bg-atelier-soft overflow-hidden hover:border-gold/20 transition-all duration-500"
            >
              {/* Map */}
              <div className="h-52 md:h-64 w-full bg-atelier-dark relative">
                <iframe
                  src={store.mapUrl}
                  className="absolute inset-0 w-full h-full border-0 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map for ${store.name}`}
                />
              </div>

              {/* Details */}
              <div className="p-8 md:p-10 space-y-5">
                <h3 className="text-xl md:text-2xl font-serif text-gold tracking-wide">{store.name}</h3>

                <div className="space-y-3 text-sm text-ivory/60">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold/60 mt-0.5 shrink-0" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gold/60 shrink-0" />
                    <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="hover:text-gold transition-colors">{store.phone}</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-gold/60 mt-0.5 shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <a
                    href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent('Hello Fashion Look! I would like to book an appointment.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold text-black text-sm font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${store.phone.replace(/\s/g, '')}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-ivory/20 text-ivory text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-colors"
                  >
                    <Phone size={16} />
                    Call
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Storefront Image */}
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
