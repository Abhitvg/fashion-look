'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import HomeVisitModal from '../booking/HomeVisitModal';

export default function Header() {
  const t = useTranslations('Navigation');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-atelier/90 backdrop-blur-md border-b border-atelier-soft py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="text-2xl font-serif tracking-widest text-gold group-hover:text-gold-light transition-colors uppercase">
              Fashion Look
            </span>
            <span className="text-[10px] tracking-[0.3em] text-foreground/80 mt-1 uppercase">
              {t('subtitle')}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-8">
            <Link href="#services" className="text-sm tracking-widest uppercase hover:text-gold transition-colors">{t('services')}</Link>
            <Link href="#calculator" className="text-sm tracking-widest uppercase hover:text-gold transition-colors">{t('calculator')}</Link>
            <Link href="/gallery" className="text-sm tracking-widest uppercase hover:text-gold transition-colors">{t('gallery')}</Link>
            <Link href="#gifts" className="text-sm tracking-widest uppercase hover:text-gold transition-colors">{t('gifts')}</Link>
            <Link href="#locations" className="text-sm tracking-widest uppercase hover:text-gold transition-colors">{t('locations')}</Link>
            <Link href="/style-guide" className="text-sm tracking-widest uppercase hover:text-gold transition-colors">{t('styleGuide')}</Link>
            
            <button 
              onClick={() => setModalOpen(true)}
              className="px-5 py-2.5 bg-gold text-black text-xs font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors"
            >
              {t('bookHomeVisit')}
            </button>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="xl:hidden text-foreground hover:text-gold transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div id="mobile-nav" className="absolute top-full left-0 w-full bg-atelier border-b border-atelier-soft flex flex-col p-6 space-y-6 xl:hidden">
            <Link onClick={() => setMobileMenuOpen(false)} href="#services" className="text-lg tracking-widest uppercase hover:text-gold transition-colors">{t('services')}</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="#calculator" className="text-lg tracking-widest uppercase hover:text-gold transition-colors">{t('calculator')}</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/gallery" className="text-lg tracking-widest uppercase hover:text-gold transition-colors">{t('gallery')}</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="#gifts" className="text-lg tracking-widest uppercase hover:text-gold transition-colors">{t('gifts')}</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="#locations" className="text-lg tracking-widest uppercase hover:text-gold transition-colors">{t('locations')}</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/style-guide" className="text-lg tracking-widest uppercase hover:text-gold transition-colors">{t('styleGuide')}</Link>
            
            <button 
              onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }}
              className="w-full py-4 bg-gold text-black text-sm font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors"
            >
              {t('bookHomeVisit')}
            </button>
            <div className="pt-4 border-t border-atelier-soft">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </header>
      
      <HomeVisitModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
