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

const articles = [
  {
    slug: 'guide-to-custom-pathani-suits-festive-wear',
    title: 'The Ultimate Guide to Custom Pathani Suits for Festive Wear',
    description: 'Explore the timeless elegance of the Pathani suit. From fabric choices to custom fits, discover why it is the perfect choice for Indian festivals.',
    content: `
      <h2>The Enduring Appeal of the Pathani Suit</h2>
      <p>When it comes to traditional menswear that flawlessly blends comfort, masculinity, and cultural heritage, nothing beats the classic Pathani suit. At Fashion Look, we've tailored thousands of Pathanis for clients across Navi Mumbai, making it one of our most requested garments for Eid, Diwali, and casual family functions.</p>
      
      <h3>What Makes a Pathani Suit Unique?</h3>
      <p>Unlike a standard kurta-pajama, a Pathani suit features a collared kurta with buttoned cuffs and shoulder epaulettes, paired with a matching, straight-cut salwar. It exudes a rugged yet refined aesthetic.</p>
      
      <h3>Choosing the Right Fabric</h3>
      <p>The beauty of a Pathani lies in its drape. We highly recommend:</p>
      <ul>
        <li><strong>Premium Cotton:</strong> Ideal for daily wear and summer festivals. It breathes exceptionally well and holds crisp tailoring.</li>
        <li><strong>Linen Blends:</strong> For a more relaxed, textured look that feels luxurious against the skin.</li>
        <li><strong>Silk Blends:</strong> Reserved for evening events and grand celebrations, offering a subtle sheen.</li>
      </ul>
      
      <h3>The Importance of Custom Tailoring</h3>
      <p>A ready-made Pathani often suffers from disproportionate shoulders or overly baggy trousers. A <strong>custom-tailored Pathani suit</strong> ensures that the shoulders are sharp, the chest has the right amount of ease, and the salwar length is precisely calibrated to your height.</p>
      
      <h3>Frequently Asked Questions</h3>
      <p><strong>How much does a custom Pathani suit cost?</strong><br>
      At Fashion Look, our bespoke Pathani suits start at an accessible ₹3,500, tailored to your exact measurements.</p>
      
      <p><strong>Can I customize the collar and pockets?</strong><br>
      Absolutely. From classic shirt collars to mandarin collars, and from dual chest pockets to hidden side pockets, every detail is up to you.</p>
    `,
    date: '2026-09-27',
    author: 'Fashion Look Master Tailor',
    image: '/images/styleguide/cutaway-collar.jpg',
    readTime: '3 min read',
  },
  {
    slug: 'bespoke-vs-made-to-measure-difference',
    title: 'Bespoke vs. Made-to-Measure: Understanding the Difference',
    description: 'Confused by tailoring terminology? We break down the exact differences between bespoke, made-to-measure, and off-the-rack suits.',
    content: `
      <h2>Decoding Tailoring Terminology</h2>
      <p>In the world of luxury menswear, terms like "bespoke" and "made-to-measure" (MTM) are often used interchangeably by marketers. However, they represent entirely different levels of craftsmanship. Here is the definitive guide to understanding what you are actually paying for.</p>
      
      <h3>1. Off-The-Rack (Ready-to-Wear)</h3>
      <p>These suits are mass-produced in standard sizes (e.g., 38R, 40L) based on a statistical average. They are entirely machine-made, usually feature glued (fused) construction, and require immediate alterations to fit passably well.</p>
      
      <h3>2. Made-to-Measure (MTM)</h3>
      <p>MTM is a significant step up. A tailor takes your basic measurements and modifies a pre-existing standard pattern to fit you better. You get to choose the fabric and some details, but the foundational shape of the suit is already predetermined.</p>
      
      <h3>3. True Bespoke Tailoring</h3>
      <p><strong>Bespoke is the pinnacle of custom menswear.</strong> At Fashion Look, bespoke means:</p>
      <ul>
        <li><strong>A Unique Pattern:</strong> A completely new paper pattern is drafted exclusively for your body.</li>
        <li><strong>Basted Fittings:</strong> The suit is temporarily stitched together (basted) and you try it on. The master tailor makes structural changes directly on your body before final stitching.</li>
        <li><strong>Canvas Construction:</strong> The internal structure utilizes a floating horsehair canvas rather than glue, allowing the suit to mold to your body.</li>
        <li><strong>Unlimited Customization:</strong> Every detail, from the lapel width to the angle of the pockets, is dictated by you.</li>
      </ul>
      
      <h3>Why Fashion Look Chooses Bespoke</h3>
      <p>We believe that true elegance cannot be achieved by modifying a standard template. Our Seawoods atelier is dedicated exclusively to the bespoke process, ensuring that whether you are commissioning a ₹7,500 business suit or a ₹15,000 wedding sherwani, the garment is fundamentally yours.</p>
    `,
    date: '2026-09-28',
    author: 'Fashion Look Editorial',
    image: '/images/styleguide/half-canvas.jpg',
    readTime: '4 min read',
  },
  {
    slug: 'how-to-maintain-and-care-for-bespoke-suit',
    title: 'How to Maintain and Care for Your Bespoke Suit',
    description: 'Expert tips from master tailors on how to clean, store, and preserve your custom suits to ensure they last a lifetime.',
    content: `
      <h2>Protecting Your Sartorial Investment</h2>
      <p>A bespoke suit from Fashion Look is an investment in your personal brand. Crafted from premium fabrics with internal canvas construction, it requires a different level of care than your everyday garments. Follow these master tailor guidelines to ensure your suit lasts for decades.</p>
      
      <h3>1. Brush, Don't Wash</h3>
      <p>The golden rule of suit care: <strong>dry clean as rarely as possible</strong>. The chemicals used in dry cleaning strip natural oils from wool, causing it to become brittle and shiny. Instead, invest in a natural bristle garment brush. Vigorously brush your suit after every wear to remove dust and dirt before it settles into the fibers.</p>
      
      <h3>2. Give it Time to Rest</h3>
      <p>Never wear the same suit two days in a row. Wool is a natural, resilient fiber that needs 24 to 48 hours to recover its shape and shed wrinkles. Rotate your wardrobe.</p>
      
      <h3>3. The Right Way to Hang</h3>
      <p>Throwing your suit over a chair is a cardinal sin. Always hang your jacket on a wide-shouldered wooden hanger that mimics the shape of human shoulders. Wire hangers will permanently distort the shoulder pads and canvas.</p>
      
      <h3>4. Steam, Avoid the Iron</h3>
      <p>If your suit is wrinkled, use a handheld garment steamer. Never apply a hot iron directly to the fabric, as this crushes the fibers and creates an ugly, permanent shine. If you must iron, always use a pressing cloth between the iron and the suit.</p>
      
      <h3>5. Proper Storage</h3>
      <p>For long-term storage, keep your suit in a breathable garment bag (cotton or canvas, never plastic). Ensure your closet is dry and dark to prevent moth damage and sun fading.</p>
      
      <p><em>Need a tune-up? Every Fashion Look bespoke suit comes with a 6-month craftsmanship warranty. Visit our Navi Mumbai atelier for professional pressing and minor adjustments.</em></p>
    `,
    date: '2026-09-29',
    author: 'Fashion Look Style Team',
    image: '/images/storeimage.png',
    readTime: '4 min read',
  },
  {
    slug: 'anatomy-of-a-tuxedo-black-tie-guide',
    title: 'The Anatomy of a Tuxedo: A Guide to Black-Tie Perfection',
    description: 'Master the black-tie dress code. Learn about peak lapels, silk facings, and how to command the room in a bespoke tuxedo.',
    content: `
      <h2>Mastering the Black-Tie Dress Code</h2>
      <p>When an invitation reads "Black Tie," it is an opportunity to look your absolute best. The tuxedo (or dinner jacket) is the uniform of celebration. But what separates a good tuxedo from a great one? Here is the Fashion Look guide to the anatomy of a bespoke tuxedo.</p>
      
      <h3>1. The Lapel: Peak or Shawl</h3>
      <p>The lapel is the defining feature of a tuxedo. It must be faced in silk (either satin or grosgrain). You have two classic choices:</p>
      <ul>
        <li><strong>The Peak Lapel:</strong> Highly formal and authoritative. The upward-pointing peaks broaden the shoulders and narrow the waist, creating a powerful V-shape.</li>
        <li><strong>The Shawl Collar:</strong> Smooth, curved, and elegant. It offers a slightly softer, more vintage aesthetic, popularized by Hollywood icons.</li>
      </ul>
      <p><em>Note: Avoid notch lapels on a tuxedo; they belong on business suits.</em></p>
      
      <h3>2. One Button is Best</h3>
      <p>A classic single-breasted tuxedo jacket should only have one button. This creates a deep "V" that displays your crisp white evening shirt and visually elongates your torso.</p>
      
      <h3>3. The Trousers: The Silk Stripe</h3>
      <p>Tuxedo trousers must feature a single braid or stripe of silk down the outside seam of each leg, matching the silk used on the jacket lapels. Furthermore, they should never have belt loops—trousers should be supported by side adjusters or suspenders.</p>
      
      <h3>4. Pockets and Vents</h3>
      <p>For maximum formality, the jacket should have jetted (besom) pockets without flaps, keeping the lines exceptionally clean. Traditionally, a tuxedo jacket has no vents (slits in the back), though double vents are acceptable in modern tailoring.</p>
      
      <h3>Bespoke Tuxedos in Navi Mumbai</h3>
      <p>At Fashion Look, our Premium Tuxedo package starts at ₹12,000. We meticulously craft every detail, from the satin facings to the hand-finished buttonholes, ensuring you are the best-dressed man in the room.</p>
    `,
    date: '2026-09-30',
    author: 'Fashion Look Master Tailor',
    image: '/images/styleguide/cashmere-overcoat.jpg',
    readTime: '4 min read',
  },
  {
    slug: 'mastering-executive-safari-suit-india',
    title: 'Mastering the Executive Safari Suit: India\'s Boardroom Classic',
    description: 'Why the safari suit remains a powerhouse garment for Indian executives, and how modern bespoke tailoring is reinventing it.',
    content: `
      <h2>The Evolution of the Indian Power Suit</h2>
      <p>While the Western two-piece suit dominates global corporate culture, India has a unique and deeply entrenched sartorial tradition: the Executive Safari Suit. For decades, it has been the uniform of choice for politicians, industrialists, and senior executives who require authority without sacrificing comfort in the subcontinent's climate.</p>
      
      <h3>What Defines a Modern Safari Suit?</h3>
      <p>The traditional safari suit consists of a short-sleeved or long-sleeved jacket worn without a shirt underneath, paired with matching trousers. Key features include:</p>
      <ul>
        <li><strong>Four Patch Pockets:</strong> The hallmark of the safari jacket, originally designed for utility but now a stylistic signature.</li>
        <li><strong>Epaulettes:</strong> Shoulder straps that add military-inspired structure to the upper body.</li>
        <li><strong>Belted Waist:</strong> Either a full belt or a half-belt at the back to cinch the waist and create a masculine silhouette.</li>
      </ul>
      
      <h3>Why Executives Still Choose the Safari</h3>
      <p><strong>Climate Control:</strong> Unlike a standard suit that requires a shirt, tie, and lined jacket, a safari suit is a single layer. When tailored in crisp linen or lightweight wool blends, it offers unmatched breathability.</p>
      <p><strong>Unapologetic Authority:</strong> The structured shoulders and military heritage of the garment project competence and command. It is a distinct look that stands out in a sea of standard grey and navy suits.</p>
      
      <h3>The Fashion Look Approach</h3>
      <p>We have modernized the safari suit for the 21st-century executive. By refining the fit—trimming the sleeves, narrowing the trousers, and ensuring the jacket doesn't look boxy—we create a silhouette that is sharp and contemporary.</p>
      
      <p>Our bespoke Executive Safari Suits start at ₹4,500. Visit our Navi Mumbai atelier to explore our selection of premium structured fabrics perfectly suited for this iconic garment.</p>
    `,
    date: '2026-10-01',
    author: 'Fashion Look Style Team',
    image: '/images/tafshir-shaikh.png',
    readTime: '3 min read',
  }
];

async function seedMoreSeoArticles() {
  try {
    console.log("Seeding 5 more SEO articles...");
    for (const post of articles) {
      await db.collection('journal').doc(post.slug).set({
        ...post,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      });
      console.log(`Added: ${post.title}`);
    }
    console.log("Success! 5 more articles published.");
    process.exit(0);
  } catch(e) {
    console.error("Failed:", e);
    process.exit(1);
  }
}

seedMoreSeoArticles();
