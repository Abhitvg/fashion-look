'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface LookbookGalleryProps {
  limit?: number;
  showViewAll?: boolean;
}

const LOOKBOOK_IMAGES = [
  {
    src: '/images/hero/hero2.png',
    altKey: 'item1',
    className: 'md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]',
  },
  {
    src: '/images/2e71e062-f95f-4830-b665-0a6b9c735ec2.png',
    altKey: 'item2',
    className: 'md:col-span-1 md:row-span-1 h-[300px]',
  },
  {
    src: '/images/4261d996-9ea9-49c7-971d-1339879347e8.png',
    altKey: 'item3',
    className: 'md:col-span-1 md:row-span-1 h-[300px]',
  },
  {
    src: '/images/hero/hero3.png',
    altKey: 'item4',
    className: 'md:col-span-1 md:row-span-2 h-[400px] md:h-[600px]',
  },
  {
    src: '/images/a0459aa7-67cc-4e7e-9a3c-5cca4c8813d3.png',
    altKey: 'item5',
    className: 'md:col-span-2 md:row-span-1 h-[300px]',
  },
  {
    src: '/images/gallery/generations.png',
    altKey: 'item6',
    className: 'md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]',
  },
  {
    src: '/images/gallery/royal_groom.png',
    altKey: 'item7',
    className: 'md:col-span-1 md:row-span-2 h-[400px] md:h-[600px]',
  },
  {
    src: '/images/gallery/timeless_style.png',
    altKey: 'item8',
    className: 'md:col-span-2 md:row-span-1 h-[300px]',
  },
  {
    src: '/images/gallery/royal_groom_2.png',
    altKey: 'item9',
    className: 'md:col-span-1 md:row-span-2 h-[400px] md:h-[600px]',
  },
  {
    src: '/images/gallery/royal_groom_3.png',
    altKey: 'item10',
    className: 'md:col-span-2 md:row-span-1 h-[300px]',
  },
  {
    src: '/images/gallery/bespoke_formal.png',
    altKey: 'item11',
    className: 'md:col-span-2 md:row-span-1 h-[300px]',
  },
  {
    src: '/images/gallery/family_bespoke.png',
    altKey: 'item12',
    className: 'md:col-span-1 md:row-span-2 h-[400px] md:h-[600px]',
  },
  {
    src: '/images/gallery/bespoke_formal_2.png',
    altKey: 'item13',
    className: 'md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]',
  },
  {
    src: '/images/gallery/bespoke_formal_boy.png',
    altKey: 'item14',
    className: 'md:col-span-1 md:row-span-2 h-[400px] md:h-[600px]',
  },
  {
    src: '/images/gallery/indian_elegance_older.png',
    altKey: 'item15',
    className: 'md:col-span-2 md:row-span-1 h-[300px]',
  },
  {
    src: '/images/gallery/bespoke_ethnic_boy.png',
    altKey: 'item16',
    className: 'md:col-span-1 md:row-span-1 h-[300px]',
  },
  {
    src: '/images/gallery/bespoke_formal_3.png',
    altKey: 'item17',
    className: 'md:col-span-1 md:row-span-1 h-[300px]',
  },
  {
    src: '/images/gallery/bespoke_ethnic_2.png',
    altKey: 'item18',
    className: 'md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]',
  },
  {
    src: '/images/gallery/royal_sherwani_4.png',
    altKey: 'item19',
    className: 'md:col-span-1 md:row-span-2 h-[400px] md:h-[600px]',
  }
];

export default function LookbookGallery({ limit, showViewAll = false }: LookbookGalleryProps = {}) {
  const t = useTranslations('Gallery');
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });
  
  const displayImages = limit ? LOOKBOOK_IMAGES.slice(0, limit) : LOOKBOOK_IMAGES;

  return (
    <section id="gallery" className="py-24 md:py-32 bg-black border-t border-ivory/5">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">{t('sectionTop')}</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-wider uppercase">{t('sectionTitle')}</h2>
          <div className="w-16 h-px bg-gold/50 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
          {displayImages.map((image, i) => (
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
                alt={t(`items.${image.altKey}`)}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
        
        {showViewAll && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <Link 
              href="/gallery"
              className="inline-block border border-gold/50 text-gold px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-black transition-colors duration-300"
            >
              {t('viewFullGallery', { fallback: 'View Full Gallery' })}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
