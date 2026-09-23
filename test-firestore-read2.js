const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCipnms0EwydsHXH4bxOeaE26sIKnCPsi4",
  authDomain: "fashion-look-484b2.firebaseapp.com",
  projectId: "fashion-look-484b2",
  storageBucket: "fashion-look-484b2.firebasestorage.app",
  messagingSenderId: "925043698954",
  appId: "1:925043698954:web:e9d398afc32a6e6df11ef3",
  measurementId: "G-QSWH7QGDDT"
};

const app = initializeApp(firebaseConfig);
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
