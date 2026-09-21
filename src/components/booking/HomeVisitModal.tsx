'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useState } from 'react';

interface HomeVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HomeVisitModal({ isOpen, onClose }: HomeVisitModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'Home/Office (Mumbai/Navi Mumbai)',
    date: '',
    time: '',
    garment: 'Two-Piece Suit',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format message for WhatsApp
    const message = `*New Booking Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Garment:* ${formData.garment}%0A*Preferred Location:* ${formData.location}%0A*Preferred Date:* ${formData.date}%0A*Preferred Time:* ${formData.time}%0A%0AHello Fashion Look, I would like to confirm this appointment.`;
    
    // Open WhatsApp with pre-filled message to the requested number
    window.open(`https://wa.me/918108014945?text=${message}`, '_blank');
    onClose();
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
              className="w-full max-w-lg bg-atelier border border-gold/20 shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="bg-atelier-dark px-6 py-4 flex justify-between items-center border-b border-gold/10">
                <div>
                  <h3 className="text-xl font-serif text-ivory tracking-wide">Book a Consultation</h3>
                  <p className="text-xs text-ivory/50 tracking-widest uppercase mt-1">Master Tailor Home Visit</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-ivory/50 hover:text-gold transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs text-ivory/70 tracking-widest uppercase">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-atelier-soft border border-ivory/10 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none transition-colors"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-ivory/70 tracking-widest uppercase">Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-atelier-soft border border-ivory/10 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none transition-colors"
                      placeholder="+91"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-ivory/70 tracking-widest uppercase">Garment Type</label>
                  <select
                    value={formData.garment}
                    onChange={(e) => setFormData({ ...formData, garment: e.target.value })}
                    className="w-full bg-atelier-soft border border-ivory/10 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none transition-colors appearance-none"
                  >
                    <option>Two-Piece Suit</option>
                    <option>Three-Piece Suit</option>
                    <option>Sherwani</option>
                    <option>Tuxedo</option>
                    <option>Safari Suit</option>
                    <option>Pathani</option>
                    <option>Other / Multiple Items</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-ivory/70 tracking-widest uppercase">Location Preference</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-atelier-soft border border-ivory/10 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none transition-colors appearance-none"
                  >
                    <option>Home/Office (Mumbai/Navi Mumbai)</option>
                    <option>Seawoods Atelier</option>
                    <option>Govandi Studio</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs text-ivory/70 tracking-widest uppercase">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-atelier-soft border border-ivory/10 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-ivory/70 tracking-widest uppercase">Preferred Time</label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-atelier-soft border border-ivory/10 px-4 py-2.5 text-sm text-ivory focus:border-gold/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-gold text-black py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors"
                >
                  <Send size={16} />
                  Request Booking via WhatsApp
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
