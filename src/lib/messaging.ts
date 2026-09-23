import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { app, db } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Your VAPID key from Firebase Console -> Project Settings -> Cloud Messaging -> Web Push certificates
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || 'BM2Uv0j51sMFTbTqF0-P2N7Z0W-Kqg4R2nXYK0-gLqW8'; // Placeholder VAPID key, user should update this.

export const requestNotificationPermission = async (): Promise<string | null> => {
  try {
    const supported = await isSupported();
    if (!supported) {
      console.log('Firebase Cloud Messaging is not supported on this browser.');
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const messaging = getMessaging(app);
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      
      if (token) {
        // Save the token to Firestore
        await setDoc(doc(db, 'fcm_tokens', token), {
          token: token,
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }, { merge: true });
        
        return token;
      }
    }
    return null;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return null;
  }
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    isSupported().then((supported) => {
      if (supported) {
        const messaging = getMessaging(app);
        onMessage(messaging, (payload) => {
          resolve(payload);
        });
      }
    });
  });
};
