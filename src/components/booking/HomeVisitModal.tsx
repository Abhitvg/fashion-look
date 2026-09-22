'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface HomeVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HomeVisitModal({ isOpen, onClose }: HomeVisitModalProps) {
  const t = useTranslations('Modal');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: t('locations.home'),
    date: '',
    time: '',
    garment: t('garments.twoPiece'),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/book-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      setIsSuccess(true);
      
      // After showing success for 3 seconds, redirect to WhatsApp
      setTimeout(() => {
        const message = `*New Booking Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Garment:* ${formData.garment}%0A*Preferred Location:* ${formData.location}%0A*Preferred Date:* ${formData.date}%0A*Preferred Time:* ${formData.time}%0A%0AHello Fashion Look, I would like to confirm this appointment.`;
        window.open(`https://wa.me/918108014945?text=${message}`, '_blank');
        onClose();
        setIsSuccess(false); // reset for next time
        setFormData({ ...formData, name: '', phone: '', date: '', time: '' }); // clear sensitive info
      }, 3000);
      
    } catch {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-atelier border border-gold/20 shadow-2xl overflow-hidden pointer-events-auto relative"
            >
              {/* Header */}
              <div className="bg-atelier-dark px-6 py-4 flex justify-between items-center border-b border-gold/10">
                <div>
                  <h3 className="text-xl font-serif text-ivory tracking-wide">{t('title')}</h3>
                  <p className="text-xs text-ivory/50 tracking-widest uppercase mt-1">{t('subtitle')}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-ivory/50 hover:text-gold transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form or Success State */}
              {isSuccess ? (
                <div className="p-10 flex flex-col items-center justify-center space-y-4 text-center">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-2"
                  >
                    <CheckCircle2 className="w-8 h-8 text-gold" />
                  </motion.div>
                  <h4 className="text-2xl font-serif text-ivory tracking-wide">Thank You!</h4>
                  <p className="text-sm text-ivory/70">
                    Your request has been received securely.
                    <br /><br />
                    Redirecting you to WhatsApp to confirm your details with our master tailor...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs text-ivory/70 tracking-widest uppercase">{t('name')}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-atelier-soft border border-ivory/10 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none transition-colors"
                        placeholder={t('namePlaceholder')}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-ivory/70 tracking-widest uppercase">{t('phone')}</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-atelier-soft border border-ivory/10 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none transition-colors"
                        placeholder={t('phonePlaceholder')}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-ivory/70 tracking-widest uppercase">{t('garment')}</label>
                    <select
                      value={formData.garment}
                      onChange={(e) => setFormData({ ...formData, garment: e.target.value })}
                      className="w-full bg-atelier-soft border border-ivory/10 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none transition-colors appearance-none"
                      disabled={isSubmitting}
                    >
                      <option>{t('garments.twoPiece')}</option>
                      <option>{t('garments.threePiece')}</option>
                      <option>{t('garments.sherwani')}</option>
                      <option>{t('garments.tuxedo')}</option>
                      <option>{t('garments.safari')}</option>
                      <option>{t('garments.pathani')}</option>
                      <option>{t('garments.other')}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-ivory/70 tracking-widest uppercase">{t('location')}</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-atelier-soft border border-ivory/10 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none transition-colors appearance-none"
                      disabled={isSubmitting}
                    >
                      <option>{t('locations.home')}</option>
                      <option>{t('locations.seawoods')}</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs text-ivory/70 tracking-widest uppercase">{t('date')}</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-atelier-soft border border-ivory/10 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none transition-colors"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-ivory/70 tracking-widest uppercase">{t('time')}</label>
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-atelier-soft border border-ivory/10 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none transition-colors"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-gold text-black py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} className={isSubmitting ? 'animate-pulse' : ''} />
                    {isSubmitting ? 'Sending...' : t('submit')}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
