'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-atelier-dark text-foreground/70 py-16 border-t border-atelier-soft">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col space-y-4">
          <span className="text-2xl font-serif tracking-widest text-gold uppercase">Fashion Look</span>
          <p className="text-sm tracking-wider uppercase">{t('subtitle')}</p>
          <p className="text-xs tracking-wider opacity-60 max-w-xs">{t('description')}</p>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-semibold tracking-widest uppercase text-foreground">{t('explore')}</h4>
          <a href="#services" className="text-sm hover:text-gold transition-colors">{t('services')}</a>
          <a href="#calculator" className="text-sm hover:text-gold transition-colors">{t('calculator')}</a>
          <a href="#gifts" className="text-sm hover:text-gold transition-colors">{t('gifts')}</a>
        </div>

        {/* Contact */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-semibold tracking-widest uppercase text-foreground">{t('contact')}</h4>
          <p className="text-sm">Seawoods Store: +91 99307 24040</p>
          <p className="text-sm">Govandi Store: +91 97734 83120</p>
          <p className="text-sm mt-4 italic text-foreground/50">{t('established')}</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-atelier-soft text-center text-xs tracking-widest uppercase opacity-50">
        &copy; {new Date().getFullYear()} Fashion Look. All Rights Reserved.
      </div>
    </footer>
  );
}
