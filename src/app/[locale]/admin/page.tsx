'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Lock, ShieldCheck, Loader2, CalendarHeart, Gift, PenTool, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import JournalCMS from '@/components/admin/JournalCMS';
import PushBroadcast from '@/components/admin/PushBroadcast';

type Booking = {
  id: string;
  name: string;
  phone: string;
  garmentType: string;
  locationPref: string;
  preferredDate: string;
  preferredTime: string;
  createdAt: Date | { toDate: () => Date } | string | null;
};

type Referral = {
  id: string;
  name: string;
  phone: string;
  redemptions: number;
  createdAt: Date | { toDate: () => Date } | string | null;
};

export default function AdminDashboard() {
  const t = useTranslations('Admin');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookings' | 'referrals' | 'journal' | 'push'>('bookings');
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  // Handle Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'fashionadmin') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPasscode('');
    }
  };

  // Real-time Firestore Listeners
  useEffect(() => {
    if (!isAuthenticated) return;

    const qBookings = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubBookings = onSnapshot(qBookings, (querySnapshot) => {
      const data: Booking[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Booking);
      });
      setBookings(data);
      if (activeTab === 'bookings') setLoading(false);
    });

    const qReferrals = query(collection(db, 'referrals'), orderBy('createdAt', 'desc'));
    const unsubReferrals = onSnapshot(qReferrals, (querySnapshot) => {
      const data: Referral[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Referral);
      });
      setReferrals(data);
      if (activeTab === 'referrals') setLoading(false);
    });

    return () => {
      unsubBookings();
      unsubReferrals();
    };
  }, [isAuthenticated, activeTab]);

  const formatDate = (timestamp: Date | { toDate: () => Date } | string | null) => {
    if (!timestamp) return 'N/A';
    if (typeof timestamp === 'object' && 'toDate' in timestamp) {
      return timestamp.toDate().toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    }
    return new Date(timestamp).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-atelier-soft border border-ivory/10 p-8 w-full max-w-md flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
            <Lock className="text-gold w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif text-ivory mb-2">{t('title')}</h1>
          <p className="text-ivory/50 text-sm mb-8 text-center">{t('subtitle')}</p>
          
          <form onSubmit={handleLogin} className="w-full">
            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder={t('passcode')}
                  className="w-full bg-black border border-ivory/20 text-ivory px-4 py-3 focus:outline-none focus:border-gold transition-colors text-center tracking-widest"
                  autoFocus
                />
                {error && <p className="text-red-400 text-xs mt-2 text-center">{t('incorrect')}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-black font-medium tracking-widest uppercase py-3 hover:bg-ivory transition-colors"
              >
                {t('submit')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ivory/10 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="text-gold w-6 h-6" />
              <h1 className="text-3xl font-serif text-ivory tracking-wider uppercase">{t('title')}</h1>
            </div>
            <p className="text-ivory/50 text-sm tracking-wide">{t('subtitle')} — Connected via Firestore</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs text-ivory/40 uppercase tracking-widest">Live Sync Active</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => { setActiveTab('bookings'); setLoading(true); }}
            className={`flex items-center gap-2 px-6 py-3 border text-xs tracking-widest uppercase transition-colors ${
              activeTab === 'bookings'
                ? 'border-gold text-gold bg-gold/10'
                : 'border-ivory/20 text-ivory/50 hover:text-ivory hover:border-ivory/50'
            }`}
          >
            <CalendarHeart size={16} />
            {t('tabs.bookings')}
          </button>
          <button
            onClick={() => { setActiveTab('referrals'); setLoading(true); }}
            className={`flex items-center gap-2 px-6 py-3 border text-xs tracking-widest uppercase transition-colors ${
              activeTab === 'referrals'
                ? 'border-gold text-gold bg-gold/10'
                : 'border-ivory/20 text-ivory/50 hover:text-ivory hover:border-ivory/50'
            }`}
          >
            <Gift size={16} />
            {t('tabs.referrals')}
          </button>
          <button
            onClick={() => { setActiveTab('journal'); setLoading(false); }}
            className={`flex items-center gap-2 px-6 py-3 border text-xs tracking-widest uppercase transition-colors ${
              activeTab === 'journal'
                ? 'border-gold text-gold bg-gold/10'
                : 'border-ivory/20 text-ivory/50 hover:text-ivory hover:border-ivory/50'
            }`}
          >
            <PenTool size={16} />
            Journal CMS
          </button>
          <button
            onClick={() => { setActiveTab('push'); setLoading(false); }}
            className={`flex items-center gap-2 px-6 py-3 border text-xs tracking-widest uppercase transition-colors ${
              activeTab === 'push'
                ? 'border-gold text-gold bg-gold/10'
                : 'border-ivory/20 text-ivory/50 hover:text-ivory hover:border-ivory/50'
            }`}
          >
            <Radio size={16} />
            Push Broadcast
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-gold animate-spin mb-4" />
            <p className="text-ivory/50">Syncing database...</p>
          </div>
        ) : activeTab === 'bookings' ? (
          bookings.length === 0 ? (
            <div className="bg-atelier-soft border border-ivory/5 p-12 text-center">
              <p className="text-ivory/50">{t('empty')}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-ivory/10 text-gold/70 text-xs uppercase tracking-widest">
                    <th className="p-4 font-normal">{t('columns.date')}</th>
                    <th className="p-4 font-normal">{t('columns.name')}</th>
                    <th className="p-4 font-normal">{t('columns.phone')}</th>
                    <th className="p-4 font-normal">{t('columns.garment')}</th>
                    <th className="p-4 font-normal">{t('columns.preference')}</th>
                    <th className="p-4 font-normal">{t('columns.schedule')}</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-ivory/5 hover:bg-ivory/[0.02] transition-colors">
                      <td className="p-4 text-ivory/50 whitespace-nowrap">{formatDate(b.createdAt)}</td>
                      <td className="p-4 text-ivory font-medium whitespace-nowrap">{b.name}</td>
                      <td className="p-4 text-gold whitespace-nowrap">{b.phone}</td>
                      <td className="p-4 text-ivory/80 whitespace-nowrap">{b.garmentType}</td>
                      <td className="p-4 text-ivory/80 whitespace-nowrap">{b.locationPref}</td>
                      <td className="p-4 text-ivory/80 whitespace-nowrap">
                        {b.preferredDate} <br />
                        <span className="text-ivory/40 text-xs">{b.preferredTime}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : activeTab === 'referrals' ? (
          referrals.length === 0 ? (
            <div className="bg-atelier-soft border border-ivory/5 p-12 text-center">
              <p className="text-ivory/50">{t('emptyReferrals')}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-ivory/10 text-gold/70 text-xs uppercase tracking-widest">
                    <th className="p-4 font-normal">{t('columns.refCreated')}</th>
                    <th className="p-4 font-normal">{t('columns.refCode')}</th>
                    <th className="p-4 font-normal">{t('columns.refName')}</th>
                    <th className="p-4 font-normal">{t('columns.refPhone')}</th>
                    <th className="p-4 font-normal">{t('columns.refRedemptions')}</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {referrals.map((r) => (
                    <tr key={r.id} className="border-b border-ivory/5 hover:bg-ivory/[0.02] transition-colors">
                      <td className="p-4 text-ivory/50 whitespace-nowrap">{formatDate(r.createdAt)}</td>
                      <td className="p-4 text-gold font-bold tracking-widest whitespace-nowrap">{r.id}</td>
                      <td className="p-4 text-ivory font-medium whitespace-nowrap">{r.name}</td>
                      <td className="p-4 text-ivory/80 whitespace-nowrap">{r.phone}</td>
                      <td className="p-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs ${r.redemptions > 0 ? 'bg-green-500/20 text-green-400' : 'bg-ivory/10 text-ivory/50'}`}>
                          {r.redemptions} {r.redemptions === 1 ? 'time' : 'times'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : activeTab === 'journal' ? (
          <JournalCMS />
        ) : activeTab === 'push' ? (
          <PushBroadcast />
        ) : null}
      </div>
    </div>
  );
}
