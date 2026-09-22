'use client';

import { useTranslations } from 'next-intl';
import { Bot } from 'lucide-react';

export default function AEOBlock() {
  const t = useTranslations('AEO');

  return (
    <section id="about" className="bg-atelier border-b border-ivory/5 py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-8 max-w-4xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-atelier-soft border border-gold/20 p-8 shadow-2xl">
          <div className="hidden md:flex shrink-0 w-16 h-16 rounded-full bg-gold/10 items-center justify-center border border-gold/30">
            <Bot className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-gold mb-3 flex items-center gap-2">
              <span className="md:hidden">
                <Bot className="w-4 h-4" />
              </span>
              {t('title')}
            </h2>
            <p className="text-ivory/80 text-base md:text-lg leading-relaxed font-light">
              {t('summary')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
