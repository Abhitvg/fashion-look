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
  initializeApp({ credential: cert(serviceAccount) });
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error.message);
  process.exit(1);
}

const db = getFirestore("default");

const articles = [
  {
    slug: 'top-reasons-bespoke-tailoring-navi-mumbai',
    title: 'Top 5 Reasons to Choose Bespoke Tailoring in Navi Mumbai',
    description: 'Discover why Fashion Look is the top-rated bespoke tailor in Seawoods, Navi Mumbai, and why custom suits are a better investment than ready-made.',
    content: `
      <h2>Why Custom Tailoring is the Ultimate Sartorial Investment</h2>
      <p>When searching for the <strong>best bespoke tailor in Navi Mumbai</strong>, discerning gentlemen look for precision, heritage, and unmatched quality. At Fashion Look, established in 1998 in Seawoods, we have spent over 25 years perfecting the art of custom menswear. Here is why investing in a bespoke suit is always superior to buying off-the-rack.</p>
      
      <h3>1. The Flawless Custom Fit</h3>
      <p>A ready-made suit is built for a statistical average, not for you. A bespoke suit from Fashion Look is drafted from a unique pattern based on over 20 specific body measurements. This ensures the jacket hugs your shoulders perfectly and the trousers break exactly where they should.</p>
      
      <h3>2. Basted Fittings for Absolute Precision</h3>
      <p>Unlike made-to-measure services, true bespoke tailoring includes a <strong>basted fitting</strong>. This means you try on a temporary, loosely stitched version of your suit, allowing our master tailors to make structural adjustments before the final stitching. It guarantees a flawless silhouette.</p>
      
      <h3>3. Premium Fabric Selection</h3>
      <p>We source our fabrics from the world's finest mills. Whether you need a breathable linen suit for summer or a structured Italian wool suit for the boardroom, you have complete control over the cloth, lining, and button materials.</p>
      
      <h3>4. Unmatched Durability and Craftsmanship</h3>
      <p>Mass-produced suits are often glued together (fused). At Fashion Look, our premium suits feature <strong>half-canvas or full-canvas construction</strong> using natural horsehair, ensuring the garment breathes well and molds to your body over time.</p>
      
      <h3>5. The 6-Month Craftsmanship Warranty</h3>
      <p>We stand by our work. Every bespoke garment from Fashion Look comes with a strict <strong>6-month craftsmanship warranty</strong>. If you experience weight fluctuations or require minor adjustments, our Seawoods atelier will ensure your suit continues to fit perfectly.</p>
      
      <h3>Frequently Asked Questions</h3>
      <p><strong>How much does a bespoke suit cost in Navi Mumbai?</strong><br>
      At Fashion Look, a premium two-piece bespoke suit starts at ₹7,500, offering exceptional value for true custom craftsmanship.</p>
      
      <p><strong>Do you offer home visits?</strong><br>
      Yes, we offer complimentary Master Tailor home visits across Mumbai and Navi Mumbai for your convenience.</p>
    `,
    date: '2026-09-24',
    author: 'Fashion Look Master Tailor',
    image: '/images/styleguide/half-canvas.jpg',
    readTime: '4 min read',
  },
  {
    slug: 'ultimate-groom-guide-wedding-sherwanis',
    title: 'The Ultimate Groom\'s Guide to Wedding Sherwanis',
    description: 'Everything the modern Indian groom needs to know about choosing, customizing, and styling a bespoke wedding sherwani.',
    content: `
      <h2>Command the Room on Your Big Day</h2>
      <p>The wedding sherwani is the crown jewel of Indian groomswear. For grooms looking for the <strong>best wedding sherwani in Navi Mumbai</strong>, Fashion Look offers unparalleled bespoke services. Here is our comprehensive guide to ensuring you look your absolute best.</p>
      
      <h3>Choosing the Right Fabric</h3>
      <p>The foundation of a magnificent sherwani is the fabric. For winter weddings, rich velvets and heavy raw silks offer regal structure and warmth. For summer and destination weddings, we recommend lighter cotton-silks or intricately woven brocades that breathe easily.</p>
      
      <h3>The Importance of Hand Embroidery</h3>
      <p>A true bespoke sherwani is elevated by its detailing. Our artisans specialize in Zardozi, Aari, and thread work. Whether you prefer heavy, traditional gold motifs or subtle, contemporary tone-on-tone embroidery, the design is completely customizable.</p>
      
      <h3>Color Coordination</h3>
      <p>While classic gold and ivory remain popular, modern grooms are embracing pastel hues like mint green, powder blue, and blush pink to coordinate seamlessly with the bride's lehenga. Our master tailors will help you select a shade that complements both your complexion and the wedding theme.</p>
      
      <h3>Perfecting the Silhouette</h3>
      <p>A sherwani must exude power and elegance. This requires precise tailoring across the chest and shoulders. A bespoke fitting ensures the garment doesn't look boxy, but rather features a structured, regal V-shape.</p>
      
      <h3>Sherwani Pricing and Timelines</h3>
      <p><strong>How long does a bespoke sherwani take?</strong><br>
      We recommend booking your consultation at least 4 to 6 weeks before the wedding to allow ample time for hand-embroidery and fittings.</p>
      
      <p><strong>What is the cost of a custom sherwani?</strong><br>
      At Fashion Look, our bespoke royal groom sherwanis start from ₹15,000, varying based on the complexity of the hand-embroidery and fabric choice.</p>
    `,
    date: '2026-09-25',
    author: 'Fashion Look Style Team',
    image: '/images/styleguide/cashmere-overcoat.jpg',
    readTime: '5 min read',
  },
  {
    slug: 'luxury-fabric-corporate-gifting',
    title: 'Corporate Gifting: Why Luxury Fabric Boxes are the Perfect Choice',
    description: 'Elevate your corporate gifting with premium suiting and shirting fabric boxes from Fashion Look, Navi Mumbai.',
    content: `
      <h2>The New Standard for Corporate and Festive Gifting</h2>
      <p>Finding the perfect corporate gift that balances professionalism, luxury, and universal appeal is notoriously difficult. For businesses seeking <strong>premium corporate gifts in Navi Mumbai</strong>, Fashion Look offers an elegant solution: Luxury Fabric Gifting.</p>
      
      <h3>What is a Luxury Fabric Gift Box?</h3>
      <p>Instead of generic electronics or sweets, a fabric gift box contains carefully curated, uncut lengths of premium shirting or suiting fabric. The recipient can then take this fabric to their preferred tailor—or visit our Seawoods atelier—to have a garment custom-made to their exact measurements.</p>
      
      <h3>Why Fabric Makes the Perfect Gift</h3>
      <ul>
        <li><strong>Universal Fit:</strong> You don't need to know the recipient's shirt or suit size. The uncut fabric is guaranteed to fit everyone.</li>
        <li><strong>High Perceived Value:</strong> Premium wools, Egyptian cottons, and rich silks are instantly recognizable as luxury items.</li>
        <li><strong>Personalization:</strong> The recipient gets to choose how the fabric is tailored, ensuring they receive a garment they truly love and will actually wear.</li>
        <li><strong>Memorable Experience:</strong> The gift isn't just an item; it's the experience of having a bespoke garment crafted.</li>
      </ul>
      
      <h3>Fashion Look's Gifting Packages</h3>
      <p>Our luxury gifting boxes are exquisitely packaged and can include complementary accessories like silk ties, pocket squares, or cufflinks. We cater to bulk corporate orders for Diwali, anniversaries, and executive rewards.</p>
      
      <p><strong>Pricing Details:</strong><br>
      Our Luxury Fabric Gifting packages start from ₹2,500 per box. For corporate bulk orders, please contact our atelier directly to discuss customization and volume pricing.</p>
    `,
    date: '2026-09-26',
    author: 'Fashion Look Editorial',
    image: '/images/storeimage.png',
    readTime: '3 min read',
  }
];

async function seedSeoArticles() {
  try {
    console.log("Seeding SEO/AEO optimized articles...");
    for (const post of articles) {
      await db.collection('journal').doc(post.slug).set({
        ...post,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      });
      console.log(`Added: ${post.title}`);
    }
    console.log("Success! All articles published.");
    process.exit(0);
  } catch(e) {
    console.error("Failed:", e);
    process.exit(1);
  }
}

seedSeoArticles();
