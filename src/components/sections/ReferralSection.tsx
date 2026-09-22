'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, CheckCircle, ArrowRight, Share2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function ReferralSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/referral/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to generate code');
      
      setCode(data.code);
      trackEvent('referral_code_generated');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    trackEvent('referral_code_copied');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    if (!code) return;
    const text = `Hi! I get my bespoke suits tailored at Fashion Look in Seawoods. Use my referral code *${code}* when booking via WhatsApp to get ₹300 off your first garment! 👔✨\n\nBook here: https://wa.me/918108014945`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="referrals" className="py-24 bg-[#0A0A0A] border-y border-gold/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full max-h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <Gift size={20} className="text-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-ivory tracking-wider uppercase mb-4">
              Share the Craft
            </h2>
            <p className="text-sm text-ivory/60 font-light leading-relaxed mb-8">
              Bespoke tailoring is a tradition best shared. Invite a friend to Fashion Look and you will both be rewarded.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-ivory">They get ₹300 off</p>
                  <p className="text-xs text-ivory/50">their first bespoke garment</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-ivory">You get ₹500 off</p>
                  <p className="text-xs text-ivory/50">your next garment when they book</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form/Code Area */}
          <div className="flex-1 w-full max-w-md bg-atelier border border-ivory/10 p-8 shadow-2xl">
            {!code ? (
              <form onSubmit={handleGenerate} className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold tracking-widest text-gold uppercase mb-2">Get Your Invite Code</h3>
                
                {error && <p className="text-xs text-red-400 bg-red-400/10 p-3 rounded">{error}</p>}
                
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border border-ivory/20 px-4 py-3 text-sm text-ivory focus:outline-none focus:border-gold transition-colors placeholder:text-ivory/30"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Number (10 digits)"
                  required
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-transparent border border-ivory/20 px-4 py-3 text-sm text-ivory focus:outline-none focus:border-gold transition-colors placeholder:text-ivory/30"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 px-6 py-4 bg-gold text-black text-xs tracking-widest font-semibold uppercase text-center hover:bg-gold-light transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Generating...' : 'Generate Code'} <ArrowRight size={14} />
                </button>
                <p className="text-[10px] text-ivory/40 text-center mt-2 font-light">
                  No login required. Your code is tied to your phone number.
                </p>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-6"
              >
                <h3 className="text-sm font-semibold tracking-widest text-gold uppercase">Your Exclusive Code</h3>
                
                <div className="w-full bg-gold/10 border-2 border-dashed border-gold/40 p-6 relative group">
                  <p className="text-4xl font-serif text-gold tracking-widest">{code}</p>
                </div>
                
                <div className="flex w-full gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 py-3 border border-ivory/20 text-xs tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={shareOnWhatsApp}
                    className="flex-1 py-3 bg-[#25D366] text-white text-xs tracking-widest uppercase hover:bg-[#20bd5a] transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Share2 size={14} /> Share
                  </button>
                </div>
                
                <p className="text-xs text-ivory/50 font-light leading-relaxed">
                  Tell your friend to send this code when they message us on WhatsApp.
                </p>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
