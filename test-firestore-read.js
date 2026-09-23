const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const fs = require('fs');

const envLocal = fs.readFileSync('.env.local', 'utf8');
let config = {};
envLocal.split('\n').forEach(line => {
  const match = line.match(/^NEXT_PUBLIC_FIREBASE_([A-Z_]+)=(.*)$/);
  if (match) {
    let key = match[1];
    let val = match[2].trim();
    if (val.startsWith("'") || val.startsWith('"')) val = val.slice(1, -1);
    
    if (key === 'PROJECT_ID') config.projectId = val;
    else if (key === 'API_KEY') config.apiKey = val;
    else if (key === 'AUTH_DOMAIN') config.authDomain = val;
    else if (key === 'STORAGE_BUCKET') config.storageBucket = val;
    else if (key === 'MESSAGING_SENDER_ID') config.messagingSenderId = val;
    else if (key === 'APP_ID') config.appId = val;
  }
});

const app = initializeApp(config);
// We initialized getFirestore with databaseId "default" in the app, but here we can just test if the default db is reachable
const db = getFirestore(app, "default");

async function testRead() {
  try {
    console.log("Attempting to read from 'styleGuide' collection as a public client...");
    const snapshot = await getDocs(collection(db, 'styleGuide'));
    console.log(`Success! Found ${snapshot.size} documents.`);
    snapshot.forEach(doc => {
      console.log(`- ${doc.id}:`, doc.data().title);
    });
  } catch (error) {
    console.error("Failed to read:", error.message);
  }
}

testRead();
