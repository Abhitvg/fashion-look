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
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  initializeApp({ credential: cert(serviceAccount) });
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error.message);
  process.exit(1);
}

const db = getFirestore("default");

const updates = {
  'pathani-vs-safari-suits': { cover: '/images/journal/safari-suit.jpg', inline: '/images/journal/pathani-suit.jpg' },
  'top-reasons-bespoke-tailoring-navi-mumbai': { cover: '/images/journal/master-tailor.jpg', inline: null },
  'ultimate-groom-guide-wedding-sherwanis': { cover: '/images/journal/wedding-sherwani.jpg', inline: null },
  'luxury-fabric-corporate-gifting': { cover: '/images/journal/fabric-gift-box.jpg', inline: null },
  'guide-to-custom-pathani-suits-festive-wear': { cover: '/images/journal/pathani-suit.jpg', inline: null },
  'bespoke-vs-made-to-measure-difference': { cover: '/images/journal/bespoke-vs-mtm.jpg', inline: null },
  'how-to-maintain-and-care-for-bespoke-suit': { cover: '/images/journal/suit-care.jpg', inline: null },
  'anatomy-of-a-tuxedo-black-tie-guide': { cover: '/images/journal/tuxedo.jpg', inline: null },
  'mastering-executive-safari-suit-india': { cover: '/images/journal/safari-suit.jpg', inline: null }
};

async function run() {
  try {
    for (const [slug, imgPaths] of Object.entries(updates)) {
      const docRef = db.collection('journal').doc(slug);
      const doc = await docRef.get();
      if (doc.exists) {
        const data = doc.data();
        let newContent = data.content;
        
        // Add cover image inside content too for full visual impact
        // Only if not already added
        if (!newContent.includes('class="article-inline-image"')) {
            let imagesHtml = `<img src="${imgPaths.cover}" alt="Cover Image" class="article-inline-image" style="width: 100%; border-radius: 8px; margin-bottom: 24px; max-height: 500px; object-fit: cover;" />`;
            if (imgPaths.inline) {
                imagesHtml += `<img src="${imgPaths.inline}" alt="Inline Image" class="article-inline-image" style="width: 100%; border-radius: 8px; margin-bottom: 24px; margin-top: 24px; max-height: 500px; object-fit: cover;" />`;
            }
            newContent = imagesHtml + newContent;
        }

        await docRef.update({
          image: imgPaths.cover,
          content: newContent,
          updatedAt: new Date().getTime()
        });
        console.log(`Updated images for: ${slug}`);
      }
    }
    console.log("Success! Updated all article images.");
    process.exit(0);
  } catch(e) {
    console.error("Failed:", e);
    process.exit(1);
  }
}

run();
