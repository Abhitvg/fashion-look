'use client';

import { StyleCategory } from '@/lib/style-guide-data';
import { useTranslations } from 'next-intl';

interface Props {
  activeCategory: StyleCategory | 'all';
  onCategorySelect: (category: StyleCategory | 'all') => void;
}

export default function StyleCategoryMenu({ activeCategory, onCategorySelect }: Props) {
  const t = useTranslations('StyleGuide');

  const categories: { id: StyleCategory | 'all', label: string }[] = [
    { id: 'all', label: t('categories.all') || 'All Collections' },
    { id: 'suits', label: t('categories.suits') || 'Suits & Tuxedos' },
    { id: 'shirts', label: t('categories.shirts') || 'Shirts' },
    { id: 'outerwear', label: t('categories.outerwear') || 'Outerwear' },
    { id: 'details', label: t('categories.details') || 'Bespoke Details' }
  ];

  return (
    <div className="sticky top-[72px] z-40 bg-atelier/95 backdrop-blur-md border-b border-ivory/10 py-4 mb-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 sm:gap-4 md:justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`whitespace-nowrap px-4 py-2 text-xs md:text-sm uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === category.id 
                  ? 'border-gold text-gold bg-gold/5' 
                  : 'border-transparent text-ivory/60 hover:text-ivory hover:border-ivory/20'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
