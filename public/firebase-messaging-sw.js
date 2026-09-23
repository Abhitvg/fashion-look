importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// This uses process.env theoretically, but in service workers injected at runtime, we have to hardcode or fetch.
// For simplicity in the public folder, we initialize with the same config.
// The user should replace these with their actual values if they change.
const firebaseConfig = {
  apiKey: "AIzaSyCipnms0EwydsHXH4bxOeaE26sIKnCPsi4",
  authDomain: "fashion-look-484b2.firebaseapp.com",
  projectId: "fashion-look-484b2",
  storageBucket: "fashion-look-484b2.firebasestorage.app",
  messagingSenderId: "925043698954",
  appId: "1:925043698954:web:e9d398afc32a6e6df11ef3",
  measurementId: "G-QSWH7QGDDT"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'Fashion Look';
  const notificationOptions = {
    body: payload.notification?.body,
    icon: '/icon.svg',
    image: payload.notification?.image,
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const clickAction = event.notification.data?.click_action || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === clickAction && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, open a new window/tab
      if (clients.openWindow) {
        return clients.openWindow(clickAction);
      }
    })
  );
});
