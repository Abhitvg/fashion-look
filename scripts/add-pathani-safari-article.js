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
  if (!serviceAccountStr) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY in .env.local");
  
  const serviceAccount = JSON.parse(serviceAccountStr);

  initializeApp({
    credential: cert(serviceAccount)
  });
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error.message);
  process.exit(1);
}

const db = getFirestore("default");

const post = {
  slug: 'pathani-vs-safari-suits',
  title: 'Pathani Suits vs. Safari Suits: Which One Fits Your Occasion?',
  description: 'Two very different garments that both read as "custom-tailored ease" — here\'s how to know which one you actually need.',
  content: `
    <p><em>Two very different garments that both read as "custom-tailored ease" — here's how to know which one you actually need.</em></p>
    <p>Both the Pathani suit and the safari suit have a reputation for effortless, put-together style — but they're built for almost opposite contexts. Confusing the two is a common styling mistake.</p>
    
    <h2>The Pathani Suit: Festive, Relaxed, Traditional</h2>
    <p>The Pathani suit — a loose kurta paired with matching straight-cut trousers — is rooted in traditional South Asian menswear. It's built for comfort and movement, typically in breathable cotton or linen blends.</p>
    
    <p><strong>Best suited for:</strong></p>
    <ul>
      <li>Festival wear (Eid, religious occasions)</li>
      <li>Prayer and community gatherings</li>
      <li>Casual family functions</li>
      <li>Everyday comfortable wear in warmer months</li>
    </ul>
    
    <p>At Fashion Look, the Classic Pathani suit is available in cotton and linen, starting from ₹3,500.</p>
    
    <p><strong>What to look for in fabric:</strong> Breathability matters more than structure here. Cotton and linen blends drape naturally and stay comfortable through long wear — heavier fabrics work against the garment's purpose.</p>
    
    <h2>The Safari Suit: Structured, Professional, Boardroom-Ready</h2>
    <p>The safari suit is a different category entirely — a structured, tailored suit with a boxier silhouette, defined shoulders, and functional pockets. It reads as smart-casual to formal, depending on fabric and styling, and has become a favored alternative to the traditional Western suit among Indian executives who want a distinct, professional look.</p>
    
    <p><strong>Best suited for:</strong></p>
    <ul>
      <li>Corporate and boardroom settings</li>
      <li>Executive events and conferences</li>
      <li>Professionals who want a look distinct from the standard Western suit</li>
    </ul>
    
    <p>At Fashion Look, the Executive Safari Suit starts from ₹4,500.</p>
    
    <p><strong>What to look for in fabric:</strong> Structure matters here — a fabric with enough body to hold the shoulder and pocket shaping is essential. This is a garment where a stiffer, higher-thread-count fabric outperforms something soft and drapey.</p>
    
    <h2>Side-by-Side Comparison</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; border-color: #333;">
      <thead>
        <tr>
          <th></th>
          <th>Pathani Suit</th>
          <th>Safari Suit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Occasion</strong></td>
          <td>Festive, casual, religious</td>
          <td>Corporate, executive</td>
        </tr>
        <tr>
          <td><strong>Fabric</strong></td>
          <td>Cotton, linen</td>
          <td>Structured wool or blended suiting</td>
        </tr>
        <tr>
          <td><strong>Silhouette</strong></td>
          <td>Loose, relaxed</td>
          <td>Fitted, structured</td>
        </tr>
        <tr>
          <td><strong>Starting price at Fashion Look</strong></td>
          <td>₹3,500</td>
          <td>₹4,500</td>
        </tr>
      </tbody>
    </table>
    
    <h2>A Common Mistake: Choosing by Trend, Not Occasion</h2>
    <p>Both garments have had moments of renewed popularity, which sometimes leads people to order one for the wrong occasion — a safari suit at a casual family gathering can look overly formal, while a Pathani suit in a boardroom reads as too relaxed. Matching the garment to the actual occasion matters more than following a styling trend.</p>
    
    <h2>Frequently Asked Questions</h2>
    <p><strong>Can a safari suit be worn to a wedding function?</strong><br>
    It can work for a daytime or less formal wedding event, but for the main ceremony, a sherwani or formal suit is generally more appropriate.</p>
    
    <p><strong>Is the Pathani suit only for religious occasions?</strong><br>
    No — it's equally suited to casual family functions and everyday warm-weather wear, not exclusively religious contexts.</p>
    
    <p><strong>Which is more customizable in terms of fit?</strong><br>
    Both are fully custom-tailored at Fashion Look, so fit customization is available for either — the difference is in the garment's inherent silhouette, not the level of tailoring precision.</p>
    
    <hr />
    <p><em>Fashion Look — Custom Pathani and safari suit tailoring since 1998. Seawoods West, Navi Mumbai.</em></p>
  `,
  date: '2026-09-23',
  author: 'Editorial Team',
  image: '/images/tafshir-shaikh.png', 
  readTime: '5 min read',
};

async function addArticle() {
  try {
    console.log("Adding new article...");
    await db.collection('journal').doc(post.slug).set({
      ...post,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    });
    console.log(`Success! Added article ${post.slug}.`);
    process.exit(0);
  } catch(e) {
    console.error("Failed:", e);
    process.exit(1);
  }
}

addArticle();
