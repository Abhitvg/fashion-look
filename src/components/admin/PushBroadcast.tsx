'use client';

import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Send, Users } from 'lucide-react';

export default function PushBroadcast() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [clickAction, setClickAction] = useState('/');
  
  const [subscribers, setSubscribers] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error', msg: string} | null>(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const q = query(collection(db, 'fcm_tokens'));
        const snapshot = await getDocs(q);
        setSubscribers(snapshot.size);
      } catch (err) {
        console.error("Error fetching subscribers:", err);
      }
    };
    fetchSubscribers();
  }, []);

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !body) return;
    if (subscribers === 0) {
      setStatus({ type: 'error', msg: 'No subscribers to send to.' });
      return;
    }

    if (!confirm(`Are you sure you want to broadcast this to ${subscribers} devices?`)) return;

    setIsSending(true);
    setStatus(null);

    try {
      const response = await fetch('/api/admin/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          body,
          image,
          clickAction
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setStatus({ type: 'success', msg: `Successfully sent to ${result.successCount} devices.` });
        setTitle('');
        setBody('');
        setImage('');
        setClickAction('/');
      } else {
        setStatus({ type: 'error', msg: result.error || 'Failed to send broadcast.' });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', msg: 'An unexpected error occurred.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-2xl bg-atelier-soft border border-ivory/10 p-6 mx-auto mt-8">
      <div className="flex items-center justify-between border-b border-ivory/10 pb-4 mb-6">
        <h2 className="text-xl font-serif text-ivory flex items-center gap-2">
          <Send className="text-gold w-5 h-5" />
          Push Broadcast
        </h2>
        <div className="flex items-center gap-2 text-ivory/60 bg-black px-4 py-2 rounded-full text-sm">
          <Users className="w-4 h-4" />
          <span>{subscribers} Active Subscribers</span>
        </div>
      </div>

      <form onSubmit={handleBroadcast} className="space-y-5">
        <div>
          <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Notification Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g. New Bespoke Collection" 
            className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" 
            required 
            maxLength={65}
          />
        </div>
        
        <div>
          <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Message Body</label>
          <textarea 
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            rows={3} 
            placeholder="e.g. Discover our latest Italian wool suits."
            className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" 
            required 
            maxLength={200}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Image URL (Optional)</label>
            <input 
              type="url" 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              placeholder="https://..." 
              className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" 
            />
          </div>
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Click Target URL</label>
            <input 
              type="text" 
              value={clickAction} 
              onChange={(e) => setClickAction(e.target.value)} 
              placeholder="e.g. /en/style-guide" 
              className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" 
            />
          </div>
        </div>

        {status && (
          <div className={`p-3 text-sm ${status.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {status.msg}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSending || subscribers === 0}
          className="w-full bg-gold text-black uppercase tracking-widest py-3 font-medium hover:bg-ivory transition-colors disabled:opacity-50"
        >
          {isSending ? 'Sending Broadcast...' : 'Broadcast Now'}
        </button>
      </form>
    </div>
  );
}
