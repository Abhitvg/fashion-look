const fs = require('fs');

if (fs.existsSync('.env.local')) {
  const envConfig = fs.readFileSync('.env.local', 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1];
      let val = match[2];
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[key] = val;
    }
  });
}

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

try {
  const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountStr) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY");
  const serviceAccount = JSON.parse(serviceAccountStr);
  initializeApp({ credential: cert(serviceAccount) });
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error.message);
  process.exit(1);
}

const db = getFirestore("default");

const journalData = [
  {
    slug: 'how-to-choose-wedding-sherwani',
    title: 'How to Choose the Perfect Wedding Sherwani',
    description: 'A comprehensive guide for grooms on selecting the right fabric, cut, and color for a bespoke wedding sherwani.',
    content: `
      <h2>The Importance of a Bespoke Sherwani</h2>
      <p>Your wedding day is one of the most important milestones of your life. While the bride's outfit often takes center stage, the groom's sherwani is equally crucial. A well-tailored sherwani exudes regality, confidence, and cultural pride.</p>
      
      <h2>1. Fabric is Everything</h2>
      <p>The foundation of any great sherwani is the fabric. For winter weddings, heavy silks, velvets, and brocades are ideal. For summer weddings, lighter cotton-silks and blended fabrics ensure you stay comfortable without sacrificing style.</p>
      
      <h2>2. The Right Cut</h2>
      <p>A bespoke sherwani should fit like a second skin. At Fashion Look, our master tailors ensure that the shoulders sit perfectly, the chest has enough breathing room, and the length complements your height.</p>
      
      <h2>3. Color Coordination</h2>
      <p>Gone are the days when grooms only wore red or gold. Today, pastel shades like mint green, powder blue, and ivory are incredibly popular. It's essential to coordinate your sherwani with the bride's lehenga.</p>
    `,
    date: '2026-09-10',
    author: 'Tafshir Shaikh',
    image: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=800&auto=format&fit=crop',
    readTime: '4 min read',
  },
  {
    slug: 'the-art-of-bespoke-suiting',
    title: 'The Art of Bespoke Suiting',
    description: 'Discover what makes a bespoke suit truly unique, from half-canvas construction to working surgeon cuffs.',
    content: `
      <h2>What is Bespoke?</h2>
      <p>Bespoke tailoring is the ultimate expression of personal style. Unlike made-to-measure, a bespoke suit is drafted from scratch based on your exact measurements, ensuring a flawless fit and unparalleled comfort.</p>
      
      <h2>The Details Matter</h2>
      <p>From the choice of lapel (peak or notch) to the type of pockets and the color of the lining, every detail is customizable. Working buttonholes on the sleeves, hand-stitched lapels, and a perfect break on the trousers are the hallmarks of a true bespoke suit.</p>
    `,
    date: '2026-09-15',
    author: 'Editorial Team',
    image: 'https://images.unsplash.com/photo-1594938298596-ec65b50373d5?q=80&w=800&auto=format&fit=crop',
    readTime: '3 min read',
  }
];

async function seedJournal() {
  try {
    console.log("Seeding journal data...");
    for (const post of journalData) {
      await db.collection('journal').doc(post.slug).set({
        ...post,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      });
    }
    console.log(`Success! Seeded ${journalData.length} journal posts.`);
    process.exit(0);
  } catch(e) {
    console.error("Migration failed:", e);
    process.exit(1);
  }
}

seedJournal();
