'use client';

import { useState, useEffect } from 'react';
import { requestNotificationPermission, onMessageListener } from '@/lib/messaging';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function PushNotificationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [notification, setNotification] = useState<{title: string, body: string} | null>(null);

  useEffect(() => {
    // Check if we should show the prompt
    const hasPrompted = localStorage.getItem('pushPrompted');
    const hasPermission = 'Notification' in window && Notification.permission === 'granted';
    
    if (!hasPrompted && !hasPermission && 'serviceWorker' in navigator) {
      // Delay showing the prompt slightly to not overwhelm on load
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
      return () => clearTimeout(timer);
    }

    // Listen for foreground messages if permission is granted
    if (hasPermission) {
      const listen = async () => {
        const payload: any = await onMessageListener();
        if (payload?.notification) {
          setNotification({
            title: payload.notification.title,
            body: payload.notification.body
          });
          // Auto-hide foreground notification after 5 seconds
          setTimeout(() => setNotification(null), 5000);
        }
      };
      listen();
    }
  }, []);

  const handleEnable = async () => {
    setShowPrompt(false);
    localStorage.setItem('pushPrompted', 'true');
    await requestNotificationPermission();
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pushPrompted', 'true'); // Don't ask again
  };

  return (
    <>
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="mt-1">
                  <Bell className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-zinc-100 font-medium text-sm">Stay Updated</h3>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Enable notifications to hear about our new bespoke collections, seasonal discounts, and order updates.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button 
                      onClick={handleEnable}
                      className="text-xs bg-amber-500 text-black px-4 py-1.5 rounded font-medium hover:bg-amber-400 transition-colors"
                    >
                      Enable
                    </button>
                    <button 
                      onClick={handleDismiss}
                      className="text-xs text-zinc-400 px-4 py-1.5 rounded font-medium hover:bg-zinc-800 transition-colors"
                    >
                      Not Now
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={handleDismiss} className="text-zinc-500 hover:text-zinc-300">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Foreground Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 right-4 md:w-80 bg-zinc-900/90 backdrop-blur-sm border border-amber-500/30 p-4 rounded-lg shadow-2xl z-50"
          >
            <div className="flex items-start gap-3">
              <img src="/icon.svg" alt="Logo" className="w-6 h-6" />
              <div className="flex-1">
                <h4 className="text-zinc-100 text-sm font-medium">{notification.title}</h4>
                <p className="text-zinc-400 text-xs mt-1">{notification.body}</p>
              </div>
              <button onClick={() => setNotification(null)} className="text-zinc-500 hover:text-zinc-300">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
