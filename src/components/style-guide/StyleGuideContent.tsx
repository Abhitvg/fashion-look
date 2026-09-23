'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MoveRight, Loader2, ArrowLeft } from 'lucide-react';
import { getStyleGuideData, StyleGuideCategory, StyleGuideItem } from '@/lib/style-guide-data';
import StyleCategoryMenu from './StyleCategoryMenu';

export default function StyleGuideContent() {
  const t = useTranslations('StyleGuide');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [categories, setCategories] = useState<StyleGuideCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStyleGuideData();
      setCategories(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const allItems: StyleGuideItem[] = categories.flatMap(cat => cat.items);
  const filteredItems = allItems.filter(item => 
    activeCategory === 'all' ? true : item.categoryId === activeCategory
  );

  return (
    <div className="pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 pt-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ivory/50 hover:text-gold transition-colors mb-6 group/back">
          <ArrowLeft size={16} className="group-hover/back:-translate-x-1 transition-transform" />
          {t('backToHome') || 'Back'}
        </Link>
      </div>

      <StyleCategoryMenu activeCategory={activeCategory as any} onCategorySelect={setActiveCategory} />
      
      <div className="container mx-auto px-4 md:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-gold animate-spin mb-4" />
            <p className="text-ivory/50">Loading Style Guide...</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                key={item.id} 
                className="group flex flex-col h-full border border-ivory/5 bg-atelier-dark/30 hover:border-gold/30 transition-all duration-500 overflow-hidden"
              >
                
                {/* Image Container */}
                <div className="relative w-full h-80 bg-atelier-dark overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-atelier-dark via-transparent to-transparent opacity-60"></div>
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/50 backdrop-blur-sm border border-ivory/20 text-ivory px-3 py-1 text-[10px] uppercase tracking-widest">
                      {item.categoryName}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-serif text-ivory tracking-wide group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  
                  <p className="text-ivory/50 font-light text-sm leading-relaxed mb-8 flex-grow">
                    {item.description}
                  </p>

                  <div className="mt-auto">
                    <Link href="/#services" className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors group/btn">
                      {t('readMore') || 'Explore Services'}
                      <MoveRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        )}
      </div>
    </div>
  );
}
