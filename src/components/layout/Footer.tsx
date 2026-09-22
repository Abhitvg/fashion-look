'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '@/lib/analytics';
import { Link } from '@/i18n/routing';
import { serviceLocations } from '@/lib/locations';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-atelier-dark text-foreground/70 border-t border-gold/10">
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <span className="text-2xl font-serif tracking-widest text-gold uppercase">Fashion Look</span>
            <p className="text-xs text-ivory/60 max-w-xs leading-relaxed font-light mt-4">
              {t('description')}
            </p>
            <p className="text-xs tracking-[0.2em] text-gold/70 uppercase mt-4 italic">{t('established')}</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-ivory mb-2">{t('explore')}</h4>
            <Link href="/#services" className="text-sm text-ivory/60 hover:text-gold transition-colors font-light">{t('services')}</Link>
            <Link href="/#calculator" className="text-sm text-ivory/60 hover:text-gold transition-colors font-light">{t('calculator')}</Link>
            <Link href="/#gifts" className="text-sm text-ivory/60 hover:text-gold transition-colors font-light">{t('gifts')}</Link>
            <Link href="/#locations" className="text-sm text-ivory/60 hover:text-gold transition-colors font-light">{t('locations')}</Link>
            <Link href="/style-guide" className="text-sm text-ivory/60 hover:text-gold transition-colors font-light">{t('styleGuide')}</Link>
          </div>

          {/* Areas We Serve */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-ivory mb-2">Areas We Serve</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {serviceLocations.map((loc) => (
                <Link 
                  key={loc.slug} 
                  href={`/locations/${loc.slug}`} 
                  className="text-sm text-ivory/60 hover:text-gold transition-colors font-light"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Seawoods Store */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-ivory mb-2">Seawoods Atelier</h4>
            <div className="flex items-start gap-2 text-sm text-ivory/60 font-light">
              <MapPin size={14} className="text-gold/70 mt-0.5 shrink-0" />
              <span>Shop No. 5, Fashion Look, Plot No. 144, Seawoods West, Sector 44, Seawoods, Navi Mumbai, Maharashtra 400706</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-ivory/60 font-light">
              <Phone size={14} className="text-gold/70 shrink-0" />
              <a href="tel:+918108014945" className="hover:text-gold transition-colors">+91 81080 14945</a>
            </div>
            <button
              onClick={() => openWhatsApp("https://wa.me/918108014945?text=Hello%20Fashion%20Look!", 'whatsapp_cta_faq')}
              className="flex items-center gap-2 text-sm text-[#25D366] hover:text-[#25D366]/80 transition-colors cursor-pointer w-fit"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </button>
          </div>

        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-ivory/5">
        <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-[0.2em] uppercase text-ivory/60">
            &copy; {new Date().getFullYear()} Fashion Look Tailors & Gifting Fabrics. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-[10px] tracking-[0.15em] text-ivory/60 hover:text-gold transition-colors uppercase">
              Privacy Policy
            </Link>
            <Link href="/refund-policy" className="text-[10px] tracking-[0.15em] text-ivory/60 hover:text-gold transition-colors uppercase">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
