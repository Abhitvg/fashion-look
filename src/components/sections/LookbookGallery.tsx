'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const LOOKBOOK_IMAGES = [
  {
    src: '/images/hero/06d2a98f-1dad-4adb-ab0e-c992be1b8665.png',
    alt: 'Master Tailor Consultation',
    className: 'md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]',
  },
  {
    src: '/images/hero/hero2.png',
    alt: 'Premium Fabric Selection',
    className: 'md:col-span-1 md:row-span-1 h-[300px]',
  },
  {
    src: '/images/hero/0be6241a-e62c-4118-9cba-7c76ac3c8641.png',
    alt: 'Precision Stitching',
    className: 'md:col-span-1 md:row-span-1 h-[300px]',
  },
  {
    src: '/images/hero/e83ec53e-9796-42a0-a299-35c4819573e4.png',
    alt: 'Tailoring Details',
    className: 'md:col-span-1 md:row-span-2 h-[400px] md:h-[600px]',
  },
  {
    src: '/images/hero/2868b5f6-1e83-429d-88e4-672483668930.png',
    alt: 'Bespoke Suit Fitting',
    className: 'md:col-span-2 md:row-span-1 h-[300px]',
  },
];

export default function LookbookGallery() {
  return (
    <section className="py-24 md:py-32 bg-black border-t border-ivory/5">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">The Atelier Vibe</p>
          <h2 className="text-3xl md:text-4xl font-serif text-ivory tracking-wider uppercase">
            Inspiration Gallery
          </h2>
          <div className="h-px w-16 bg-gold/40 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
          {LOOKBOOK_IMAGES.map((image, i) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`relative overflow-hidden group border border-ivory/5 hover:border-gold/30 transition-colors duration-500 ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
